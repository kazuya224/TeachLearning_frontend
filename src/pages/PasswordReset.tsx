import React, { useState } from "react";
import { Mail, Lock, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";

const PasswordResetPage: React.FC = () => {
  const [step, setStep] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
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

  const handleSendResetMail = async () => {
    setSuccessMessage("");
    if (!validateEmail(email)) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("mock send reset mail", { email });
      setIsLoading(false);
      setSuccessMessage("再設定用のメールを送信しました（デモ）");
      setTimeout(() => {
        setStep(2);
        setSuccessMessage("");
      }, 800);
    }, 1200);
  };

  const handleResetPassword = async () => {
    setSuccessMessage("");
    const isPasswordValid = validatePassword(password);
    const isConfirmPasswordValid = validateConfirmPassword(confirmPassword);
    if (!isPasswordValid || !isConfirmPasswordValid) return;

    setIsLoading(true);
    setTimeout(() => {
      console.log("mock reset password", { email, password });
      setIsLoading(false);
      setSuccessMessage("パスワードを更新しました（デモ）");
    }, 1200);
  };

  const handleGoToLogin = () => {
    console.log("go to login");
  };

  const handleBackToStep1 = () => {
    setStep(1);
    setPassword("");
    setConfirmPassword("");
    setPasswordError("");
    setConfirmPasswordError("");
    setSuccessMessage("");
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <div className="flex items-center justify-center mb-2">
          <Lock className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            パスワードをお忘れの方へ
          </h1>
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          メールアドレスの確認と新しいパスワードの登録を行います
        </p>

        <div className="flex items-center justify-center gap-4 mb-6">
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              step === 1
                ? "bg-indigo-100 border-2 border-indigo-500"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            <Mail
              className={`w-4 h-4 ${
                step === 1 ? "text-indigo-600" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                step === 1 ? "text-indigo-700" : "text-gray-600"
              }`}
            >
              ① メール送信
            </span>
          </div>
          <div
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
              step === 2
                ? "bg-indigo-100 border-2 border-indigo-500"
                : "bg-gray-100 border-2 border-gray-300"
            }`}
          >
            <Lock
              className={`w-4 h-4 ${
                step === 2 ? "text-indigo-600" : "text-gray-500"
              }`}
            />
            <span
              className={`text-sm font-medium ${
                step === 2 ? "text-indigo-700" : "text-gray-600"
              }`}
            >
              ② パスワード登録
            </span>
          </div>
        </div>

        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="text-sm text-green-700">{successMessage}</p>
          </div>
        )}

        {step === 1 ? (
          <>
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

            <button
              onClick={handleSendResetMail}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>送信中...</span>
                </>
              ) : (
                <>
                  <Mail className="w-4 h-4" />
                  <span>再設定メールを送信</span>
                </>
              )}
            </button>

            <button
              onClick={handleGoToLogin}
              className="w-full text-sm text-indigo-600 hover:text-indigo-700 font-medium text-center mt-3"
            >
              ログイン画面に戻る
            </button>
          </>
        ) : (
          <>
            <div className="mb-6 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <p className="text-sm text-gray-700 text-center">
                <span className="font-semibold text-indigo-700">{email}</span>{" "}
                宛に再設定メールを送信しました。
              </p>
            </div>

            <button
              onClick={handleBackToStep1}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-800 mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>メールアドレスの入力に戻る</span>
            </button>

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
                  if (confirmPasswordError)
                    validateConfirmPassword(e.target.value);
                }}
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="パスワードを再入力"
              />
              {confirmPasswordError && (
                <p className="mt-1 text-xs text-red-500">
                  {confirmPasswordError}
                </p>
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
              onClick={handleResetPassword}
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold py-2.5 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>更新中...</span>
                </>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>パスワードを更新する</span>
                </>
              )}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PasswordResetPage;
