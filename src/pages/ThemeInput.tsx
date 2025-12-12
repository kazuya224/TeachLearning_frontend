import React from "react";
import { Sparkles } from "lucide-react";
import { useApp } from "../contexts/Context";

const THEME_EXAMPLES = [
  "HTTP",
  "Cookie",
  "セッション管理",
  "REST API",
  "データベース設計",
  "React Hooks",
];

const ThemeInputPage: React.FC = () => {
  const { themeInput, setThemeInput, handleStartChatFromThemeInput } = useApp();

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-indigo-50 to-purple-50">
      <div className="flex-1 overflow-y-auto p-6 flex items-center justify-center">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-xl p-8 shadow-xl border-2 border-indigo-200">
            <label className="block text-lg font-bold text-gray-800 mb-4">
              学習テーマ
            </label>
            <input
              type="text"
              value={themeInput}
              onChange={(e) => setThemeInput(e.target.value)}
              onKeyPress={(e) =>
                e.key === "Enter" && handleStartChatFromThemeInput()
              }
              placeholder="例: HTTP、Cookie、REST API、データベース設計..."
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-lg"
              autoFocus
            />
            <button
              onClick={handleStartChatFromThemeInput}
              disabled={!themeInput.trim()}
              className={`w-full mt-6 py-4 rounded-lg font-bold text-lg transition-all flex items-center justify-center gap-2 ${
                themeInput.trim()
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              チャットを開始
            </button>
          </div>

          <div className="mt-8 bg-white rounded-xl p-6 shadow-md">
            <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
              <Sparkles size={20} className="text-indigo-600" />
              テーマ例
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {THEME_EXAMPLES.map((example) => (
                <button
                  key={example}
                  onClick={() => setThemeInput(example)}
                  className="bg-gray-50 hover:bg-indigo-50 border border-gray-200 hover:border-indigo-300 rounded-lg p-3 text-sm text-gray-700 hover:text-indigo-700 transition-all text-left"
                >
                  {example}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeInputPage;
