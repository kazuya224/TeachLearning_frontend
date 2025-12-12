// src/components/screens/HistoryScreen.tsx

import React from "react";
import { History, MessageCircle, Target, Network, Play } from "lucide-react";
import { useApp } from "../contexts/Context";

const HistoryPage: React.FC = () => {
  const { sessions, openWeakPoints, openMap, handleContinueSession } = useApp();

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {sessions.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <History size={48} className="mx-auto mb-4 opacity-50" />
            <p className="text-lg font-semibold mb-2">まだ履歴がありません</p>
            <p className="text-sm">チャットを解析すると履歴が保存されます</p>
          </div>
        ) : (
          sessions.map((session) => (
            <div
              key={session.id}
              className="bg-white rounded-lg p-4 shadow-md border-2 border-gray-200"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold text-gray-800">
                  {session.theme ?? "テーマ未設定"}
                </h3>
                <span className="text-xs text-gray-500">
                  {session.timestamp}
                </span>
              </div>

              <div className="flex gap-4 text-sm text-gray-600 mb-3 flex-wrap">
                <span>💬 {session.chatMessages?.length ?? 0}メッセージ</span>
                <span>
                  🎯 弱点{" "}
                  {
                    session.weakPoints.filter((wp) => wp.studyStatus !== "done")
                      .length
                  }
                  /{session.weakPoints.length}件
                </span>
                <span>🗺️ ノード {session.understandingMap.nodes.length}件</span>
              </div>

              {session.chatMessages && session.chatMessages.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-3 mb-3 max-h-48 overflow-y-auto border border-gray-200">
                  <p className="text-xs font-semibold text-gray-700 mb-2">
                    チャット履歴
                  </p>
                  <div className="space-y-2">
                    {session.chatMessages.slice(0, 6).map((msg, idx) => (
                      <div
                        key={idx}
                        className={`text-xs ${
                          msg.role === "user" ? "text-right" : "text-left"
                        }`}
                      >
                        <span
                          className={`inline-block px-2 py-1 rounded ${
                            msg.role === "user"
                              ? "bg-indigo-100 text-indigo-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {msg.role === "user" ? "👤" : "🤖"}{" "}
                          {msg.text.substring(0, 50)}
                          {msg.text.length > 50 ? "..." : ""}
                        </span>
                      </div>
                    ))}
                    {session.chatMessages.length > 6 && (
                      <p className="text-xs text-gray-500 text-center mt-2">
                        他 {session.chatMessages.length - 6}件のメッセージ
                      </p>
                    )}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-4 gap-2 mb-2">
                <button
                  onClick={() => openWeakPoints(session.id)}
                  className="bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Target size={16} />
                  弱点を見る
                </button>
                <button
                  onClick={() => openMap(session.id)}
                  className="bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Network size={16} />
                  マップを見る
                </button>

                <button
                  onClick={() => (window.location.href = `/chat/${session.id}`)}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  チャット履歴
                </button>
                <button
                  onClick={() => handleContinueSession(session.id)}
                  className="bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Play size={16} />
                  続きから説明
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryPage;
