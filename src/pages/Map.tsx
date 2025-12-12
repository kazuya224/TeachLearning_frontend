import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Network, Play, X } from "lucide-react";
import { useApp } from "../contexts/Context";
import type { UnderstandingMap } from "../types/learning";
import {
  getStarColor,
  getStarShadow,
  getStatusSymbol,
} from "../utils/learningHelpers";

const MapPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const {
    sessions,
    selectedNode,
    expandedNodes,
    handleNodeClick,
    setExpandedNodes,
    handleStartChatWithTheme,
  } = useApp();

  const [showSessionList, setShowSessionList] = useState(!sessionId);

  const selectedSession =
    sessionId === "all" ? null : sessions.find((s) => s.id === sessionId);

  const mergedMap: UnderstandingMap =
    sessionId === "all"
      ? {
          center: sessions[0]?.understandingMap.center ?? {
            id: "center",
            concept: "HTTP",
            status: "mastered",
            x: 50,
            y: 50,
            explanation: "",
            relatedTo: [],
          },
          nodes: sessions.flatMap((s) => s.understandingMap.nodes),
        }
      : selectedSession?.understandingMap ?? {
          center: {
            id: "center",
            concept: "HTTP",
            status: "mastered",
            x: 50,
            y: 50,
            explanation: "",
            relatedTo: [],
          },
          nodes: [],
        };

  const handleResetExpanded = () => {
    setExpandedNodes(["center"]);
  };

  // セッション一覧表示
  if (showSessionList || !sessionId) {
    return (
      <div className="flex flex-col h-full">
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
          <button
            onClick={() => navigate("/map/all")}
            className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg p-4 shadow-lg hover:shadow-xl transition-all"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Network size={28} />
                <div className="text-left">
                  <h3 className="text-lg font-bold">全体マップを見る</h3>
                  <p className="text-sm opacity-90">全チャットの知識を統合</p>
                </div>
              </div>
              <div className="bg-white text-purple-600 px-4 py-2 rounded-full font-bold text-lg">
                {sessions.reduce(
                  (sum, s) => sum + s.understandingMap.nodes.length,
                  0
                )}
                ノード
              </div>
            </div>
          </button>

          {sessions.length === 0 ? (
            <div className="text-center py-12 text-white">
              <Network size={48} className="mx-auto mb-4 opacity-50" />
              <p className="text-lg font-semibold mb-2">
                まだチャットがありません
              </p>
              <p className="text-sm opacity-75">
                チャットを解析するとマップが表示されます
              </p>
            </div>
          ) : (
            sessions.map((session) => (
              <div
                key={session.id}
                className="bg-gradient-to-br from-indigo-800 to-purple-800 text-white rounded-lg p-4 shadow-md border-2 border-purple-400"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-bold">
                    {session.theme ?? "テーマ未設定"}
                  </h3>
                  <span className="text-xs opacity-75">
                    {session.timestamp}
                  </span>
                </div>

                <div className="flex gap-4 text-sm mb-3">
                  <span>
                    🗺️ ノード {session.understandingMap.nodes.length}件
                  </span>
                  <span>
                    ◎ 理解済み{" "}
                    {
                      session.understandingMap.nodes.filter(
                        (n) => n.status === "mastered"
                      ).length
                    }
                    件
                  </span>
                </div>

                <button
                  onClick={() => navigate(`/map/${session.id}`)}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Network size={16} />
                  マップを見る
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    );
  }

  // マップ詳細表示
  const visibleNodes = mergedMap.nodes.filter((node) =>
    node.relatedTo.some((parentId) => expandedNodes.includes(parentId))
  );

  const hasChildren = (nodeId: string) =>
    mergedMap.nodes.some((node) => node.relatedTo.includes(nodeId));

  return (
    <div className="flex flex-col h-full">
      <div className="bg-gradient-to-r from-indigo-900 via-purple-900 to-black text-white p-4 shadow-md">
        <button
          onClick={() => navigate("/map")}
          className="mb-2 text-white hover:bg-white hover:bg-opacity-20 px-3 py-1 rounded-lg transition-colors flex items-center gap-2 text-sm"
        >
          ← チャット一覧に戻る
        </button>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold flex items-center gap-2">
              <Network size={24} />
              {sessionId === "all"
                ? "全体マップ - 知識の星座"
                : `${selectedSession?.theme ?? "テーマ未設定"} - 知識の星座`}
            </h1>
            <p className="text-sm opacity-90 mt-1">
              ノードをクリックして階層を展開
            </p>
          </div>
          <button
            onClick={handleResetExpanded}
            className="bg-white bg-opacity-20 hover:bg-opacity-30 px-3 py-1 rounded-lg text-sm transition-colors"
          >
            リセット
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        <div className="relative w-full" style={{ height: "700px" }}>
          <svg
            className="absolute inset-0 w-full h-full"
            style={{ zIndex: 1, pointerEvents: "none" }}
          >
            {visibleNodes.map((node) => {
              const parentNodes = node.relatedTo || [];
              return parentNodes.map((parentId) => {
                if (!expandedNodes.includes(parentId)) return null;

                const parent =
                  parentId === "center"
                    ? mergedMap.center
                    : mergedMap.nodes.find((n) => n.id === parentId);
                if (!parent) return null;

                return (
                  <line
                    key={`${node.id}-${parentId}`}
                    x1={`${parent.x}%`}
                    y1={`${parent.y}%`}
                    x2={`${node.x}%`}
                    y2={`${node.y}%`}
                    stroke="rgba(255,255,255,0.25)"
                    strokeWidth={
                      selectedNode?.id === node.id ||
                      selectedNode?.id === parentId
                        ? 2
                        : 1
                    }
                  />
                );
              });
            })}
          </svg>

          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${mergedMap.center.x}%`,
              top: `${mergedMap.center.y}%`,
              zIndex: 100,
            }}
            onClick={() => handleNodeClick(mergedMap.center)}
          >
            <div
              className={`bg-gradient-to-br from-white via-purple-200 to-purple-400 px-6 py-4 rounded-full font-bold text-lg shadow-[0_0_25px_rgba(147,51,234,1)] border-4 border-white transition-all hover:scale-110 relative ${
                selectedNode?.id === "center"
                  ? "scale-125 shadow-[0_0_35px_rgba(147,51,234,1)]"
                  : ""
              }`}
            >
              <span className="text-purple-900">
                {mergedMap.center.concept}
              </span>
              {hasChildren("center") && expandedNodes.includes("center") && (
                <span
                  className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                  style={{ zIndex: 101 }}
                >
                  ✓
                </span>
              )}
            </div>
          </div>

          {visibleNodes.map((node) => (
            <div
              key={node.id}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all hover:scale-110"
              style={{
                left: `${node.x}%`,
                top: `${node.y}%`,
                zIndex: 100,
              }}
              onClick={() => handleNodeClick(node)}
            >
              <div
                className={`bg-gradient-to-br ${getStarColor(
                  node.status
                )} px-4 py-2 rounded-full font-semibold text-sm ${getStarShadow(
                  node.status
                )} border-2 border-white whitespace-nowrap relative ${
                  selectedNode?.id === node.id ? "scale-125 border-4" : ""
                } ${node.status === "weak" ? "animate-pulse" : ""}`}
                style={{
                  opacity:
                    node.status === "mastered"
                      ? 1
                      : node.status === "partial"
                      ? 0.9
                      : 0.8,
                }}
              >
                <span
                  className={`mr-1 ${
                    node.status === "mastered"
                      ? "text-blue-600"
                      : node.status === "partial"
                      ? "text-blue-400"
                      : node.status === "vague"
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  {getStatusSymbol(node.status)}
                </span>
                <span className="text-gray-800">{node.concept}</span>
                {hasChildren(node.id) && !expandedNodes.includes(node.id) && (
                  <span
                    className="absolute -top-1 -right-1 bg-indigo-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                    style={{ zIndex: 101 }}
                  >
                    +
                  </span>
                )}
                {hasChildren(node.id) && expandedNodes.includes(node.id) && (
                  <span
                    className="absolute -top-1 -right-1 bg-green-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full shadow-lg"
                    style={{ zIndex: 101 }}
                  >
                    ✓
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {selectedNode && (
          <div className="mt-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-lg p-6 shadow-xl border-2 border-purple-400">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <span className="text-3xl">
                  {getStatusSymbol(selectedNode.status)}
                </span>
                <h3 className="text-xl font-bold">{selectedNode.concept}</h3>
              </div>
              <button
                onClick={() => handleNodeClick(null)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            <div
              className={`inline-block px-3 py-1 rounded-full text-xs font-semibold mb-4 ${
                selectedNode.status === "mastered"
                  ? "bg-blue-500"
                  : selectedNode.status === "partial"
                  ? "bg-blue-400"
                  : selectedNode.status === "vague"
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
            >
              {selectedNode.status === "mastered" && "理解済み"}
              {selectedNode.status === "vague" && "曖昧"}
              {selectedNode.status === "weak" && "弱点"}
              {selectedNode.status === "partial" && "部分的理解"}
            </div>

            <p className="text-gray-200 mb-6 leading-relaxed">
              {selectedNode.explanation}
            </p>

            <button
              onClick={() => handleStartChatWithTheme(selectedNode.concept)}
              className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-lg font-semibold hover:from-purple-600 hover:to-pink-600 transition-all shadow-md flex items-center justify-center gap-2"
            >
              <Play size={20} />
              この概念をテーマにチャットを始める
            </button>
          </div>
        )}

        <div className="mt-6 bg-gradient-to-br from-indigo-900 to-purple-900 text-white rounded-lg p-4 shadow-md border border-purple-400">
          <h3 className="font-bold mb-3">凡例</h3>
          <div className="grid grid-cols-2 gap-2 text-sm mb-3">
            <div className="flex items-center gap-2">
              <span className="text-xl text-blue-400">◎</span>
              <span>mastered (理解済み)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-yellow-400">△</span>
              <span>vague (曖昧)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-red-400">✕</span>
              <span>weak (弱点)</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl text-blue-300">○</span>
              <span>partial (部分的理解)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapPage;
