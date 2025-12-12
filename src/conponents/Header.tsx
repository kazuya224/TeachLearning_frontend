// src/components/layout/AppHeader.tsx
import React from "react";
import { BookOpen, Sparkles } from "lucide-react";
import type { Screen } from "../types/learning";

interface AppHeaderProps {
  currentScreen: Screen;
  selectedTheme: string | null;
}

const SCREEN_TITLE_MAP: Record<Screen, string> = {
  home: "ダッシュボード",
  themeInput: "学習テーマ入力",
  chat: "学習チャット",
  weakpoints: "弱点リスト",
  map: "理解マップ",
  history: "学習履歴",
};

const AppHeader: React.FC<AppHeaderProps> = ({
  currentScreen,
  selectedTheme,
}) => {
  const title = SCREEN_TITLE_MAP[currentScreen];

  return (
    <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 sticky top-0 z-40">
      <div className="flex items-center gap-3">
        <BookOpen className="text-indigo-600" size={24} />
        <div>
          <p className="text-xs font-semibold text-indigo-600 flex items-center gap-1">
            <Sparkles size={14} />
            教える型AI学習アプリ
          </p>
          <h1 className="text-sm md:text-base font-bold text-gray-900">
            {title}
          </h1>
        </div>
      </div>
    </header>
  );
};

export default AppHeader;
