// Home
import React from "react";
import {
  TrendingUp,
  Target,
  Network,
  History,
  MessageCircle,
  ArrowRightCircle,
  Clock,
} from "lucide-react";
import { useApp } from "../contexts/Context";

const HomePage: React.FC = () => {
  const {
    sessions,

    handleContinueSession,
    goHistory,
    openWeakPoints,
    openMap,
    goThemeInput,
  } = useApp();

  const currentMonth = new Date().getMonth();
  const monthSessions = sessions.filter((s) => {
    const sessionDate = new Date(s.timestamp);
    return sessionDate.getMonth() === currentMonth;
  });
  const monthlyThreadCount = monthSessions.length;
  const maxThreads = 30;

  const totalNodes = sessions.reduce(
    (sum, s) => sum + s.understandingMap.nodes.length,
    0
  );

  const recentSessions = sessions.slice(0, 2);
  const weeklyNodesBefore =
    recentSessions[1]?.understandingMap.nodes.length || 0;
  const weeklyNodesAfter =
    recentSessions[0]?.understandingMap.nodes.length || totalNodes;

  const weakPointCount = sessions.reduce(
    (sum, s) =>
      sum + s.weakPoints.filter((wp) => wp.studyStatus !== "done").length,
    0
  );

  const lastSession = sessions[0];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-6xl mx-auto px-6 py-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white rounded-xl p-5 shadow-md border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <TrendingUp className="text-indigo-600" size={22} />
                  <h3 className="font-semibold text-gray-800 text-sm">
                    今週の成長
                  </h3>
                </div>
                <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                  理解マップ
                </span>
              </div>
              <p className="text-2xl font-bold text-indigo-600">
                {weeklyNodesBefore} → {weeklyNodesAfter} ノード
              </p>
              <p className="text-xs text-gray-600 mt-2">
                新しく {Math.max(0, weeklyNodesAfter - weeklyNodesBefore)}{" "}
                個の概念を「つながった知識」にできました。
              </p>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-md border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Network className="text-emerald-600" size={22} />
                  <h3 className="font-semibold text-gray-800 text-sm">
                    理解ノードの合計
                  </h3>
                </div>
              </div>
              <p className="text-2xl font-bold text-emerald-600">
                {totalNodes} ノード
              </p>
              <p className="text-xs text-gray-600 mt-2">
                テーマ同士の「つながり」が可視化されています。
                マップから俯瞰してみましょう。
              </p>
              <button
                onClick={() => openMap("all")}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 hover:text-emerald-800"
              >
                理解マップを開く
                <ArrowRightCircle size={14} />
              </button>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-md border border-indigo-100">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <Target className="text-rose-500" size={22} />
                  <h3 className="font-semibold text-gray-800 text-sm">
                    弱点の残り
                  </h3>
                </div>
              </div>
              <p className="text-2xl font-bold text-rose-500">
                {weakPointCount} 個
              </p>
              <p className="text-xs text-gray-600 mt-2">
                「あとここだけ埋めれば伸びる」ポイントです。
                1つずつ潰していきましょう。
              </p>
              <button
                onClick={() => openWeakPoints("all")}
                className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-rose-600 hover:text-rose-700"
              >
                弱点リストを見る
                <ArrowRightCircle size={14} />
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-5 shadow-md border border-indigo-100">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageCircle className="text-purple-600" size={22} />
                <h3 className="font-semibold text-gray-800 text-sm">
                  今月のスレッド数
                </h3>
              </div>
              <div>
                <span className="text-2xl font-bold text-purple-600">
                  {monthlyThreadCount}
                </span>
                <span className="text-sm text-gray-600"> / {maxThreads}</span>
              </div>
            </div>
            <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all"
                style={{
                  width: `${(monthlyThreadCount / maxThreads) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {lastSession && (
              <div className="lg:col-span-2 bg-white rounded-xl p-5 shadow-md border border-indigo-100">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Clock className="text-indigo-500" size={20} />
                    <h3 className="font-semibold text-gray-800 text-sm">
                      前回の続きから再開
                    </h3>
                  </div>
                  <span className="text-[10px] text-gray-500">
                    直近のセッション
                  </span>
                </div>

                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500">テーマ</p>
                    <p className="text-base font-semibold text-gray-900">
                      {lastSession.theme || "テーマ未設定"}
                    </p>
                    <p className="text-xs text-gray-600 mt-1">
                      {lastSession.timestamp}
                    </p>
                  </div>
                  <button
                    onClick={() => handleContinueSession(lastSession.id)}
                    className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-indigo-600 text-white text-sm font-semibold shadow hover:bg-indigo-700 transition"
                  >
                    <MessageCircle size={16} />
                    <span>このテーマを続ける</span>
                  </button>
                </div>
              </div>
            )}

            <div
              className={`bg-indigo-600 rounded-xl p-5 shadow-lg text-white flex flex-col justify-between ${
                !lastSession ? "lg:col-span-3" : ""
              }`}
            >
              <div>
                <h3 className="mt-1 font-semibold text-lg">
                  新しいテーマを
                  <br />
                  AIに「教えてみる」
                </h3>
              </div>
              <button
                onClick={() => goThemeInput()}
                className="mt-4 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-white text-indigo-700 text-sm font-semibold hover:bg-indigo-50 transition"
              >
                <ArrowRightCircle size={18} />
                <span>新しく説明を始める</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 shadow-md border border-gray-100">
            <h3 className="text-sm font-semibold text-gray-800 mb-2">
              最近の学習ログ
            </h3>
            {sessions.length === 0 ? (
              <p className="text-sm text-gray-500 text-center py-4">
                まだ学習履歴がありません
              </p>
            ) : (
              <ul className="space-y-2">
                {sessions.slice(0, 3).map((session) => (
                  <li
                    key={session.id}
                    className="flex flex-col border-b last:border-b-0 border-gray-100 pb-2 last:pb-0"
                  >
                    <span className="text-xs text-gray-700 leading-snug">
                      「{session.theme}」で{session.weakPoints.length}
                      つの弱点を特定、
                      {session.understandingMap.nodes.length}
                      個のノードを作成しました。
                    </span>
                  </li>
                ))}
              </ul>
            )}
            <button
              onClick={goHistory}
              className="inline-flex items-center justify-center gap-2 mt-3 px-4 py-2.5 rounded-lg border border-gray-200 bg-gray-50 text-sm font-medium text-gray-700 hover:bg-gray-100 transition w-full"
            >
              <History size={16} />
              <span>すべての履歴を見る</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
