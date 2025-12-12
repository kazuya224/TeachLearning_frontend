import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "../contexts/Context";

import HomePage from "../pages/Home";
import ThemeInputPage from "../pages/ThemeInput";
import ChatPage from "../pages/Chat";
import WeakPointsPage from "../pages/WeakPoints";
import MapPage from "../pages/Map";
import HistoryPage from "../pages/History";

import AppLayout from "../conponents/Layout";
import PaymentPage from "../pages/Payment";
import LoginPage from "../pages/Login";
import SignupPage from "../pages/Signup";
import PasswordSetupPage from "../pages/PasswordSetup";
import PasswordResetPage from "../pages/PasswordReset";

const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          <Route path="/" element={<AppLayout />}>
            <Route path="login" element={<LoginPage />} />
            <Route path="signup" element={<SignupPage />} />
            <Route path="password-setup" element={<PasswordSetupPage />} />
            <Route path="password-reset" element={<PasswordResetPage />} />
            <Route path="payment" element={<PaymentPage />} />
            <Route index element={<HomePage />} />
            <Route path="home" element={<HomePage />} />
            <Route path="theme-input" element={<ThemeInputPage />} />
            <Route path="chat" element={<ChatPage />} />
            <Route path="weakpoints" element={<WeakPointsPage />} />
            <Route path="weakpoints/:sessionId" element={<WeakPointsPage />} />
            <Route path="map" element={<MapPage />} />
            <Route path="map/:sessionId" element={<MapPage />} />
            <Route path="history" element={<HistoryPage />} />
          </Route>
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
};

export default AppRouter;
