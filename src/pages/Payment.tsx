import React, { useState } from "react";
import { CreditCard, CheckCircle2, Sparkles, Loader2 } from "lucide-react";

type Plan = {
  id: string;
  name: string;
  price: number;
  features: string[];
};

const plans: Plan[] = [
  {
    id: "light",
    name: "ライトプラン",
    price: 780,
    features: ["弱点リストの履歴保存", "理解マップの閲覧回数 無制限"],
  },
  {
    id: "pro",
    name: "プロプラン",
    price: 1280,
    features: [
      "AIフィードバックの詳細表示",
      "セッション履歴のエクスポート",
      "優先サポート",
    ],
  },
];

const PaymentPage: React.FC = () => {
  const [currentPlan, setCurrentPlan] = useState("無料プラン");
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [holderName, setHolderName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [holderNameError, setHolderNameError] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const [expiryError, setExpiryError] = useState("");
  const [cvcError, setCvcError] = useState("");
  const [planError, setPlanError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const validateForm = (): boolean => {
    let isValid = true;

    if (!selectedPlan) {
      setPlanError("プランを選択してください");
      isValid = false;
    } else {
      setPlanError("");
    }

    if (!holderName) {
      setHolderNameError("カード名義を入力してください");
      isValid = false;
    } else {
      setHolderNameError("");
    }

    if (!cardNumber) {
      setCardNumberError("カード番号を入力してください");
      isValid = false;
    } else {
      setCardNumberError("");
    }

    if (!expiry) {
      setExpiryError("有効期限を入力してください");
      isValid = false;
    } else {
      setExpiryError("");
    }

    if (!cvc) {
      setCvcError("セキュリティコードを入力してください");
      isValid = false;
    } else {
      setCvcError("");
    }

    return isValid;
  };

  const handlePayment = async () => {
    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      console.log("mock payment", {
        plan: selectedPlan?.name,
        holderName,
        cardNumber,
        expiry,
        cvc,
      });
      setIsProcessing(false);
      setPaymentSuccess(true);
      if (selectedPlan) {
        setCurrentPlan(selectedPlan.name);
      }
    }, 1500);
  };

  return (
    <div className="bg-gradient-to-br from-indigo-50 to-purple-50 min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-4xl">
        <div className="flex items-center justify-center mb-2">
          <CreditCard className="w-8 h-8 text-indigo-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-800">
            プランを選択してアップグレード
          </h1>
        </div>
        <p className="text-center text-sm text-gray-600 mb-6">
          有料プランで学習体験をさらに充実させましょう
        </p>

        <div className="mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200 text-center">
          <p className="text-sm text-gray-700">
            現在のプラン：
            <span className="font-semibold text-indigo-700">{currentPlan}</span>
          </p>
        </div>

        {paymentSuccess && (
          <div className="mb-6 p-6 bg-green-50 border-2 border-green-300 rounded-xl">
            <div className="flex flex-col items-center gap-3">
              <CheckCircle2 className="w-12 h-12 text-green-600" />
              <p className="text-base font-semibold text-green-800 text-center">
                決済が完了しました（デモ）
              </p>
              <p className="text-sm text-green-700 text-center">
                有料プランが適用された想定です。
              </p>
            </div>
          </div>
        )}

        <div className="mb-8">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            プランを選択
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {plans.map((plan) => (
              <div
                key={plan.id}
                onClick={() => {
                  setSelectedPlan(plan);
                  setPlanError("");
                }}
                className={`p-6 rounded-xl border-2 cursor-pointer transition ${
                  selectedPlan?.id === plan.id
                    ? "border-indigo-500 bg-indigo-50"
                    : "border-gray-200 bg-white hover:border-indigo-300"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-800 mb-2">
                  {plan.name}
                </h3>
                <p className="text-2xl font-bold text-indigo-600 mb-4">
                  月額 ¥{plan.price.toLocaleString()}
                </p>
                <ul className="space-y-2 mb-4">
                  {plan.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-indigo-500 mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  className={`w-full py-2 rounded-lg text-sm font-semibold transition ${
                    selectedPlan?.id === plan.id
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {selectedPlan?.id === plan.id ? "選択中" : "このプランを選択"}
                </button>
              </div>
            ))}
          </div>
          {planError && (
            <p className="mt-2 text-sm text-red-500 text-center">{planError}</p>
          )}
        </div>

        <div className="mb-6 p-4 bg-purple-50 rounded-lg border border-purple-200 flex items-center gap-3">
          <Sparkles className="w-5 h-5 text-purple-600 flex-shrink-0" />
          <p className="text-sm text-purple-800">
            いつでもキャンセル可能 / 初月は日割り計算（デモ）
          </p>
        </div>

        {selectedPlan && (
          <div className="mb-6 p-6 bg-gray-50 rounded-xl border border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              決済情報
            </h2>
            <div className="mb-4 p-4 bg-white rounded-lg border border-indigo-200">
              <p className="text-sm text-gray-700">
                プラン：
                <span className="font-semibold text-indigo-700">
                  {selectedPlan.name}
                </span>
              </p>
              <p className="text-sm text-gray-700">
                金額：
                <span className="font-semibold text-indigo-700">
                  ¥{selectedPlan.price.toLocaleString()}
                </span>{" "}
                / 月
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <label
                  htmlFor="holderName"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  カード名義
                </label>
                <input
                  id="holderName"
                  type="text"
                  value={holderName}
                  onChange={(e) => setHolderName(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="TARO YAMADA"
                />
                {holderNameError && (
                  <p className="mt-1 text-xs text-red-500">{holderNameError}</p>
                )}
              </div>

              <div>
                <label
                  htmlFor="cardNumber"
                  className="block text-sm font-medium text-gray-700 mb-1"
                >
                  カード番号
                </label>
                <input
                  id="cardNumber"
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="**** **** **** 4242"
                />
                {cardNumberError && (
                  <p className="mt-1 text-xs text-red-500">{cardNumberError}</p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="expiry"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    有効期限
                  </label>
                  <input
                    id="expiry"
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="MM/YY"
                  />
                  {expiryError && (
                    <p className="mt-1 text-xs text-red-500">{expiryError}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="cvc"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    セキュリティコード
                  </label>
                  <input
                    id="cvc"
                    type="text"
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="123"
                  />
                  {cvcError && (
                    <p className="mt-1 text-xs text-red-500">{cvcError}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 text-white text-sm font-semibold py-3 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition"
        >
          {isProcessing ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>処理中...</span>
            </>
          ) : (
            <>
              <CreditCard className="w-5 h-5" />
              <span>この内容で決済する（デモ）</span>
            </>
          )}
        </button>

        <p className="mt-4 text-xs text-gray-500 text-center">
          ※この画面はデモ用であり、実際の決済は行われません
        </p>
      </div>
    </div>
  );
};

export default PaymentPage;
