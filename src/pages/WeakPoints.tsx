import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { List, MessageCircle, Target, ArrowLeft } from "lucide-react";
import { useApp } from "../contexts/Context";
import type { WeakPoint, StudyStatus } from "../types/learning";
import {
  getAiLevelInfo,
  getStatusColor,
  getStudyStatusInfo,
} from "../utils/learningHelpers";

const WeakPointsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();
  const { sessions, handleUpdateStudyStatus, handleStartChatWithTheme } =
    useApp();

  // const [showSessionList, setShowSessionList] = useState(!sessionId);

  const selectedSession =
    sessionId === "all" ? null : sessions.find((s) => s.id === sessionId);

  const displayWeakPoints: WeakPoint[] =
    sessionId === "all"
      ? sessions
          .flatMap((s) => s.weakPoints)
          .filter((wp) => wp.studyStatus !== "done")
      : selectedSession?.weakPoints.filter((wp) => wp.studyStatus !== "done") ||
        [];

  const allUnconqueredCount = sessions.reduce(
    (count, s) =>
      count + s.weakPoints.filter((wp) => wp.studyStatus !== "done").length,
    0
  );

  // セッション一覧表示
  if (!sessionId) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-6xl mx-auto px-6 py-6 space-y-4">
            <div
              onClick={() => navigate("/weakpoints/all")}
              className="bg-gradient-to-r from-rose-500 to-orange-500 text-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Target size={32} className="flex-shrink-0" />
                  <div className="text-left">
                    <h3 className="text-xl font-bold">全ての弱点を見る</h3>
                    <p className="text-sm opacity-90 mt-1">
                      全セッションの未克服弱点
                    </p>
                  </div>
                </div>
                <div className="bg-white text-rose-600 px-5 py-3 rounded-full font-bold text-xl shadow-md">
                  {allUnconqueredCount}
                </div>
              </div>
            </div>

            {sessions.length === 0 ? (
              <div className="bg-white rounded-xl p-12 shadow-md border border-gray-100 text-center">
                <List size={48} className="mx-auto mb-4 text-gray-300" />
                <p className="text-lg font-semibold text-gray-800 mb-2">
                  まだセッションがありません
                </p>
                <p className="text-sm text-gray-600">
                  セッションを解析すると弱点が表示されます
                </p>
              </div>
            ) : (
              sessions.map((session) => {
                const unconqueredCount = session.weakPoints.filter(
                  (wp) => wp.studyStatus !== "done"
                ).length;
                const conqueredCount =
                  session.weakPoints.length - unconqueredCount;

                return (
                  <div
                    key={session.id}
                    className="bg-white rounded-xl p-5 shadow-md border border-indigo-100 hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-lg font-bold text-gray-800">
                        {session.theme ?? "テーマ未設定"}
                      </h3>
                      <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-full">
                        {session.timestamp}
                      </span>
                    </div>

                    <div className="flex gap-4 text-sm mb-4">
                      <span className="text-rose-600 font-medium">
                        未克服 {unconqueredCount}件
                      </span>
                      <span className="text-emerald-600 font-medium">
                        克服済み {conqueredCount}件
                      </span>
                    </div>

                    <button
                      onClick={() => navigate(`/weakpoints/${session.id}`)}
                      className="w-full bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white py-2.5 rounded-lg font-semibold transition-all shadow flex items-center justify-center gap-2"
                    >
                      <List size={16} />
                      弱点を見る
                    </button>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>
    );
  }

  // 弱点詳細表示
  const studyStatusCounts = {
    todo: displayWeakPoints.filter((wp) => wp.studyStatus === "todo").length,
    doing: displayWeakPoints.filter((wp) => wp.studyStatus === "doing").length,
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="bg-white border-b border-indigo-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <button
            onClick={() => navigate("/weakpoints")}
            className="mb-3 text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 px-3 py-1.5 rounded-lg transition-colors flex items-center gap-2 text-sm font-medium"
          >
            <ArrowLeft size={16} />
            セッション一覧に戻る
          </button>
          <div className="flex items-center justify-between mb-2">
            <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
              <Target size={28} className="text-rose-500" />
              {sessionId === "all"
                ? "全ての弱点"
                : selectedSession?.theme ?? "テーマ未設定"}
            </h1>
          </div>
          <div className="text-sm text-gray-600 flex gap-4">
            <span className="font-medium">
              未着手: {studyStatusCounts.todo}件
            </span>
            <span className="font-medium">
              学習中: {studyStatusCounts.doing}件
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-4">
          {displayWeakPoints.length === 0 ? (
            <div className="bg-white rounded-xl p-12 shadow-md border border-indigo-100 text-center">
              <Target size={48} className="mx-auto mb-4 text-emerald-400" />
              <p className="text-lg font-semibold text-gray-800 mb-2">
                未克服の弱点はありません
              </p>
              <p className="text-sm text-gray-600">
                素晴らしい!全ての弱点を克服しました!
              </p>
            </div>
          ) : (
            displayWeakPoints.map((wp) => {
              const aiLevelInfo = getAiLevelInfo(wp.aiLevel);
              const studyStatusInfo = getStudyStatusInfo(wp.studyStatus);

              return (
                <div
                  key={wp.id}
                  className="bg-white rounded-xl p-6 shadow-md border border-indigo-100 hover:shadow-lg transition-all relative"
                >
                  <div
                    className={`absolute top-5 right-5 ${studyStatusInfo.color} px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {studyStatusInfo.label}
                  </div>

                  <div className="flex items-start gap-4 mb-5 pr-24">
                    <div className="flex flex-col items-center gap-1 pt-1">
                      <span className="text-3xl">{aiLevelInfo.symbol}</span>
                      <span className="text-[10px] text-gray-500 font-semibold whitespace-nowrap">
                        AI診断
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-bold text-xl text-gray-800 mb-2">
                        {wp.concept}
                      </h3>
                      <span
                        className={`inline-block text-xs px-3 py-1 rounded-full ${aiLevelInfo.bgColor} ${aiLevelInfo.color} font-semibold`}
                      >
                        {aiLevelInfo.label}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 pl-14">
                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        弱点理由
                      </p>
                      <p className="text-sm text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-3">
                        {wp.reason}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        関連ラリー
                      </p>
                      <div className="flex gap-2 flex-wrap">
                        {wp.relatedTurns.map((turn: number, idx: number) => (
                          <span
                            key={idx}
                            className="inline-block bg-indigo-50 border border-indigo-200 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium"
                          >
                            #{turn}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        学習アドバイス
                      </p>
                      <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-lg p-3 leading-relaxed">
                        {wp.suggestion}
                      </p>
                    </div>

                    <button
                      onClick={() => handleStartChatWithTheme(wp.concept)}
                      className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <MessageCircle size={18} />
                      この弱点をチャットで学習する
                    </button>

                    <div>
                      <p className="text-xs font-semibold text-gray-500 mb-2">
                        学習状態
                      </p>
                      <div className="flex gap-2">
                        <button
                          onClick={() =>
                            handleUpdateStudyStatus(
                              wp.id,
                              "todo" as StudyStatus
                            )
                          }
                          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                            wp.studyStatus === "todo"
                              ? "bg-gray-200 text-gray-800 shadow-sm border-2 border-gray-300"
                              : "bg-white border border-gray-300 text-gray-600 hover:bg-gray-50"
                          }`}
                        >
                          未着手
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStudyStatus(
                              wp.id,
                              "doing" as StudyStatus
                            )
                          }
                          className={`flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all ${
                            wp.studyStatus === "doing"
                              ? "bg-blue-100 text-blue-800 shadow-sm border-2 border-blue-200"
                              : "bg-white border border-blue-300 text-blue-600 hover:bg-blue-50"
                          }`}
                        >
                          学習中
                        </button>
                        <button
                          onClick={() =>
                            handleUpdateStudyStatus(
                              wp.id,
                              "done" as StudyStatus
                            )
                          }
                          className="flex-1 py-2.5 px-3 rounded-lg text-sm font-semibold transition-all bg-white border border-emerald-300 text-emerald-600 hover:bg-emerald-50"
                        >
                          ✓ 克服済み
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default WeakPointsPage;
