import React from "react";
import { Send, Sparkles } from "lucide-react";
import { useApp } from "../contexts/Context";

const ChatPage: React.FC = () => {
  const {
    chatMessages,
    inputText,
    currentTurn,
    canAnalyze,
    isAnalyzing,
    isAnalyzed,
    setInputText,
    handleSend,
    handleAnalyze,
  } = useApp();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {chatMessages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                msg.role === "user"
                  ? "bg-indigo-600 text-white rounded-br-sm"
                  : "bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm"
              }`}
            >
              <div className="text-xs opacity-70 mb-1">
                {msg.role === "user" ? "👤 あなた" : "🤖 AI"}
              </div>
              <div className="text-sm leading-relaxed">{msg.text}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white border-t border-gray-200 p-4 space-y-3">
        <div className="space-y-2">
          <button
            onClick={() => handleAnalyze()}
            disabled={!canAnalyze || isAnalyzing}
            className={`w-full py-3 rounded-lg font-semibold transition-all flex items-center justify-center gap-2 ${
              canAnalyze && !isAnalyzing
                ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 shadow-md"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            <Sparkles size={20} />
            {isAnalyzing ? "解析中..." : "このチャットを解析して結果を見る"}
          </button>
          {currentTurn < 3 && !isAnalyzed && (
            <p className="text-xs text-gray-500 text-center">
              3ラリー以上で解析できます(現在: {currentTurn}ラリー)
            </p>
          )}
        </div>

        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSend()}
            placeholder="メッセージを入力..."
            className="flex-1 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
          />
          <button
            onClick={handleSend}
            className="bg-indigo-600 text-white px-6 py-3 rounded-full hover:bg-indigo-700 transition-colors shadow-md flex items-center gap-2"
          >
            <Send size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
