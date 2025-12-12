import React, { useState } from "react";
import { Lock, Loader2, CheckCircle2 } from "lucide-react";

const PasswordSetupPage: React.FC = () => {
  // デモ用の固定メールアドレス
  const email = "demo-user@example.com";

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (value: string): boolean => {
    if (value.length < 8) {
      setPasswordError("パスワードは8文字以上で入力してください");
      return false;
    }
    if (!/[a-zA-Z]/.test(value)) {
      setPasswordError("パスワードには英字を1文字以上含めてください");
      return false;
    }
    if (!/[0-9]/.test(value)) {
      setPasswordError("パスワードには数字を1文字以上含めてください");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value: string): boolean => {
    if (value !== password) {
      setConfirmPasswordError("パスワードが一致しません");
      return false;
    }
    setConfirmPasswordError("");
    return true;
  };

  const handleSetup = async () => {
    setSuccessMessage("");
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    if (!isPasswordValid || !isConfirmPasswordValid) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("mock setup password", { email, password });
      setIsLoading(false);
      setSuccessMessage("パスワードを設定しました（デモ）");
    }, 1200);
  };

  const handleGoToLogin = () => {
    console.log("go to login");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-2">
          <Lock className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">パスワードの設定</h1>
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          初めてログインするためのパスワードを登録します
        </p>

        <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
          <p className="text-sm text-gray-700 text-center">
            <span className="font-semibold text-indigo-700">{email}</span>{" "}
            宛のパスワードを設定します。
          </p>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            新しいパスワード
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (passwordError) validatePassword(e.target.value);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="パスワードを入力"
          />
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            新しいパスワード（確認）
          </label>
          <input
            id="confirmPassword"
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              if (confirmPasswordError) validateConfirmPassword(e.target.value);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="パスワードを再入力"
          />
          {confirmPasswordError && (
            <p className="mt-1 text-xs text-red-500">{confirmPasswordError}</p>
          )}
        </div>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-sm font-semibold text-gray-700 mb-2">
            パスワードの条件
          </h3>
          <ul className="space-y-1 text-xs text-gray-600">
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
              8文字以上
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-indigo-400 rounded-full"></span>
              英字と数字を含むこと
            </li>
          </ul>
        </div>

        <button
          onClick={handleSetup}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>設定中...</span>
            </>
          ) : (
            <span>パスワードを設定してログイン</span>
          )}
        </button>

        <button
          onClick={handleGoToLogin}
          className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium text-center mt-3"
        >
          すでにパスワードをお持ちの方はこちら
        </button>
      </div>
    </div>
  );
};

export default PasswordSetupPage;
