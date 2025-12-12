// src/components/layout/AppSidebar.tsx
import React from "react";
import {
  Home,
  MessageCircle,
  List,
  Network,
  History as HistoryIcon,
} from "lucide-react";
import type { Screen } from "../types/learning";

interface AppSidebarProps {
  currentScreen: Screen;
  onChangeScreen: (screen: Screen) => void;
}

const navItems: { id: string; label: string; icon: any; screen: Screen }[] = [
  { id: "home", label: "ホーム", icon: Home, screen: "home" },
  { id: "chat", label: "チャット", icon: MessageCircle, screen: "themeInput" },
  { id: "weakpoints", label: "弱点リスト", icon: List, screen: "weakpoints" },
  { id: "map", label: "理解マップ", icon: Network, screen: "map" },
  { id: "history", label: "履歴", icon: HistoryIcon, screen: "history" },
];

const AppSidebar: React.FC<AppSidebarProps> = ({
  currentScreen,
  onChangeScreen,
}) => {
  return (
    <aside className="w-56 bg-gray-900 text-gray-100 flex flex-col border-r border-gray-800">
      <div className="h-16 flex items-center px-4 border-b border-gray-800 font-bold text-sm tracking-wide">
        学習ナビゲーション
      </div>
      <nav className="flex-1 py-4 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = currentScreen === item.screen;
          return (
            <button
              key={item.id}
              onClick={() => onChangeScreen(item.screen)}
              className={`w-full flex items-center gap-3 px-4 py-2 text-sm transition-colors ${
                active
                  ? "bg-indigo-600 text-white"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <Icon size={18} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default AppSidebar;
