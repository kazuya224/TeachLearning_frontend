import React, { useState } from "react";
import { BookOpen, Eye, EyeOff, Loader2 } from "lucide-react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (value: string): boolean => {
    if (!value) {
      setEmailError("メールアドレスを入力してください");
      return false;
    }
    if (!value.includes("@")) {
      setEmailError("メールアドレスの形式が正しくありません");
      return false;
    }
    setEmailError("");
    return true;
  };

  const validatePassword = (value: string): boolean => {
    if (!value) {
      setPasswordError("パスワードを入力してください");
      return false;
    }
    setPasswordError("");
    return true;
  };

  const handleLogin = async () => {
    setSuccessMessage("");
    const isEmailValid = validateEmail(email);
    const isPasswordValid = validatePassword(password);
    if (!isEmailValid || !isPasswordValid) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("mock login", { email, password });
      setIsLoading(false);
      setSuccessMessage("ログインに成功しました（デモ）");
    }, 1200);
  };

  const handleForgotPassword = () => {
    console.log("go to password reset");
  };

  const handleSignup = () => {
    console.log("go to signup");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-2">
          <BookOpen className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            教える型AI学習アプリ
          </h1>
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          ログインして学習を再開しましょう
        </p>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-700 text-center">
              {successMessage}
            </p>
          </div>
        )}

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            メールアドレス
          </label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (emailError) validateEmail(e.target.value);
            }}
            className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder="example@email.com"
          />
          {emailError && (
            <p className="mt-1 text-xs text-red-500">{emailError}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            パスワード
          </label>
          <div className="relative">
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (passwordError) validatePassword(e.target.value);
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="パスワードを入力"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>
          {passwordError && (
            <p className="mt-1 text-xs text-red-500">{passwordError}</p>
          )}
        </div>

        <button
          onClick={handleLogin}
          disabled={isLoading}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>ログイン中...</span>
            </>
          ) : (
            <span>ログイン</span>
          )}
        </button>

        <button
          onClick={handleForgotPassword}
          className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium text-center mt-3"
        >
          パスワードをお忘れの方はこちら
        </button>
        <button
          onClick={handleSignup}
          className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium text-center mt-2"
        >
          アカウントをお持ちでない方はこちら
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
