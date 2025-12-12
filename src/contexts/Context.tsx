import React, {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import { useNavigate } from "react-router-dom";

import type {
  ChatMessage,
  UnderstandingNode,
  SessionData,
  StudyStatus,
} from "../types/learning";

import {
  INITIAL_CHAT_MESSAGES,
  INITIAL_WEAK_POINTS,
  INITIAL_UNDERSTANDING_MAP,
} from "../constants/learningInitialData";

interface AppContextType {
  // ===== 状態 =====
  selectedTheme: string | null;
  sessions: SessionData[];
  chatMessages: ChatMessage[];
  inputText: string;
  isAnalyzing: boolean;
  isAnalyzed: boolean;
  themeInput: string;
  selectedNode: UnderstandingNode | null;
  expandedNodes: string[];
  currentTurn: number;
  canAnalyze: boolean;

  // ===== セット系アクション =====
  setSelectedTheme: (theme: string | null) => void;
  setSessions: React.Dispatch<React.SetStateAction<SessionData[]>>;
  setChatMessages: React.Dispatch<React.SetStateAction<ChatMessage[]>>;
  setInputText: React.Dispatch<React.SetStateAction<string>>;
  setIsAnalyzing: (analyzing: boolean) => void;
  setIsAnalyzed: (analyzed: boolean) => void;
  setThemeInput: (input: string) => void;
  setSelectedNode: (node: UnderstandingNode | null) => void;
  setExpandedNodes: React.Dispatch<React.SetStateAction<string[]>>;

  // ===== ドメインハンドラー =====
  handleSend: () => void;
  handleAnalyze: () => void;
  handleUpdateStudyStatus: (id: string, newStatus: StudyStatus) => void;
  handleNodeClick: (node: UnderstandingNode | null) => void;

  // ===== 画面遷移を含むハンドラー =====
  handleStartChatWithTheme: (concept: string) => void;
  handleStartChatFromThemeInput: () => void;
  handleContinueSession: (sessionId: string) => void;
  openWeakPoints: (sessionId: string) => void;
  openMap: (sessionId: string) => void;
  goHistory: () => void;
  goHome: () => void;
  goThemeInput: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const navigate = useNavigate();

  const [selectedTheme, setSelectedTheme] = useState<string | null>(null);
  const [sessions, setSessions] = useState<SessionData[]>([]);
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>(
    INITIAL_CHAT_MESSAGES
  );
  const [inputText, setInputText] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isAnalyzed, setIsAnalyzed] = useState(false);
  const [themeInput, setThemeInput] = useState("");
  const [selectedNode, setSelectedNode] = useState<UnderstandingNode | null>(
    null
  );
  const [expandedNodes, setExpandedNodes] = useState<string[]>(["center"]);

  // ラリー数（user/assistant で2メッセージ=1ラリー前提）
  const currentTurn = Math.ceil(chatMessages.length / 2);
  const canAnalyze = currentTurn >= 3 && !isAnalyzed;

  // ===== 共通リセット =====
  const resetChatForTheme = (theme: string) => {
    setSelectedTheme(theme);
    setChatMessages(INITIAL_CHAT_MESSAGES);
    setIsAnalyzed(false);
    setIsAnalyzing(false);
    setSelectedNode(null);
    setExpandedNodes(["center"]);
  };

  // ===== チャット送信 =====
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

  const handleSend = async () => {
    if (!inputText.trim()) return;

    // ユーザーメッセージ追加
    setChatMessages((prev) => {
      const userTurn = Math.ceil((prev.length + 1) / 2);
      const userMessage: ChatMessage = {
        role: "user",
        text: inputText,
        turn: userTurn,
      };
      return [...prev, userMessage];
    });
    const userMessageText = inputText;
    setInputText("");

    // AI chat
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: "gpt-4.1-mini",
          messages: [
            {
              role: "system",
              content: `あなたは優しいIT講師です。ユーザーはテーマ「${
                selectedTheme ?? "未設定"
              }」についてAIに説明しながら理解を深めようとしています。難しすぎず、足りないところを優しく質問してください。`,
            },
            ...chatMessages.map((m) => ({
              role: m.role,
              content: m.text,
            })),
            { role: "user", content: userMessageText },
          ],
        }),
      });
      if (!res.ok) {
        throw new Error(`API error: ${res.status}`);
      }
      const data = await res.json();
      const assistantText =
        data.choices?.[0]?.message?.content ??
        "すみません、うまく回答を生成できませんでした。もう一度試してみてください。";

      setChatMessages((prev) => {
        const aiTurn = Math.ceil((prev.length + 1) / 2);
        const aiMessage: ChatMessage = {
          role: "assistant",
          text: assistantText,
          turn: aiTurn,
        };
        return [...prev, aiMessage];
      });
    } catch (e) {
      console.error(e);
      setChatMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "エラーが発生しました。APIキーやネットワークを確認してください。",
          turn: Math.ceil((prev.length + 1) / 2),
        },
      ]);
    }
  };

  // ===== 解析＆セッション作成（＋結果画面に遷移） =====
  const handleAnalyze = () => {
    if (!canAnalyze || isAnalyzing) return;

    setIsAnalyzing(true);

    setTimeout(() => {
      setIsAnalyzing(false);
      setIsAnalyzed(true);

      const newSession: SessionData = {
        id: Date.now().toString(),
        theme: selectedTheme ?? "",
        timestamp: new Date().toLocaleString("ja-JP"),
        chatMessages: [...chatMessages],
        weakPoints: [...INITIAL_WEAK_POINTS],
        understandingMap: JSON.parse(JSON.stringify(INITIAL_UNDERSTANDING_MAP)),
      };

      setSessions((prev) => [newSession, ...prev]);

      // 弱点リスト画面へ遷移
      navigate(`/weakpoints`);
    }, 2500);
  };

  // ===== 弱点の学習ステータス更新 =====
  const handleUpdateStudyStatus = (id: string, newStatus: StudyStatus) => {
    setSessions((prev) =>
      prev.map((session) => ({
        ...session,
        weakPoints: session.weakPoints.map((wp) =>
          wp.id === id ? { ...wp, studyStatus: newStatus } : wp
        ),
      }))
    );
  };

  // ===== 理解マップのノードクリック =====
  const handleNodeClick = (node: UnderstandingNode | null) => {
    setSelectedNode(node);
    if (node && !expandedNodes.includes(node.id)) {
      setExpandedNodes((prev) => [...prev, node.id]);
    }
  };

  // ===== 新しいテーマでチャット開始（コンセプトから） =====
  const handleStartChatWithTheme = (concept: string) => {
    resetChatForTheme(concept);
    navigate("/chat");
  };

  // ===== 新しいテーマでチャット開始（入力欄から） =====
  const handleStartChatFromThemeInput = () => {
    if (!themeInput.trim()) return;
    resetChatForTheme(themeInput);
    navigate("/chat");
  };

  // ===== セッションを続きから（履歴などから） =====
  const handleContinueSession = (sessionId: string) => {
    const session = sessions.find((s) => s.id === sessionId);
    if (!session) return;

    setSelectedTheme(session.theme);
    setChatMessages([...session.chatMessages]);
    setIsAnalyzed(false);
    setIsAnalyzing(false);
    setSelectedNode(null);
    setExpandedNodes(["center"]);
    navigate("/chat");
  };

  // ===== 画面遷移系 =====
  const openWeakPoints = (sessionId: string) => {
    navigate(`/weakpoints/${sessionId}`);
  };

  const openMap = (sessionId: string) => {
    navigate(`/map/${sessionId}`);
  };

  const goHistory = () => {
    navigate("/history");
  };

  const goHome = () => {
    navigate("/");
  };

  const goThemeInput = () => {
    navigate("/theme-input");
  };

  return (
    <AppContext.Provider
      value={{
        selectedTheme,
        sessions,
        chatMessages,
        inputText,
        isAnalyzing,
        isAnalyzed,
        themeInput,
        selectedNode,
        expandedNodes,
        currentTurn,
        canAnalyze,
        setSelectedTheme,
        setSessions,
        setChatMessages,
        setInputText,
        setIsAnalyzing,
        setIsAnalyzed,
        setThemeInput,
        setSelectedNode,
        setExpandedNodes,
        handleSend,
        handleAnalyze,
        handleUpdateStudyStatus,
        handleNodeClick,
        handleStartChatWithTheme,
        handleStartChatFromThemeInput,
        handleContinueSession,
        openWeakPoints,
        openMap,
        goHistory,
        goHome,
        goThemeInput,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
};
