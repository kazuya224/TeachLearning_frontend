import React from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import AppHeader from "./Header";
import AppSidebar from "./Sidebar";
import { useApp } from "../contexts/Context";
import type { Screen } from "../types/learning";

const AppLayout: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedTheme } = useApp();

  const getCurrentScreen = (): Screen => {
    const path = location.pathname;
    if (path === "/" || path === "/home") return "home";
    if (path === "/theme-input") return "themeInput";
    if (path === "/chat") return "chat";
    if (path.startsWith("/weakpoints")) return "weakpoints";
    if (path.startsWith("/map")) return "map";
    if (path === "/history") return "history";
    return "home";
  };

  return (
    <div className="w-full h-screen bg-gray-100 flex">
      <AppSidebar
        currentScreen={getCurrentScreen()}
        onChangeScreen={(screen) => {
          if (screen === "home") navigate("/");
          else navigate(`/${screen === "themeInput" ? "theme-input" : screen}`);
        }}
      />

      <div className="flex-1 flex flex-col">
        <AppHeader
          currentScreen={getCurrentScreen()}
          selectedTheme={selectedTheme}
        />

        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AppLayout;
