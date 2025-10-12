import React, { useState } from "react";

export default function App() {
  const [activeCalc, setActiveCalc] = useState("loan");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center px-4 py-8">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">
          💰 Finance & Money Calculators
        </h1>
        <p className="text-gray-600">
          Free online tools for smarter financial planning.
        </p>
      </header>

      <nav className="flex flex-wrap justify-center gap-3 mb-8">
        {[
          { id: "loan", label: "Loan Calculator" },
          { id: "savings", label: "Savings Calculator" },
          { id: "investment", label: "Investment Growth" },
          { id: "mortgage", label: "Mortgage Calculator" },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveCalc(item.id)}
            className={`px-4 py-2 rounded-xl font-medium transition ${
              activeCalc === item.id
                ? "bg-blue-600 text-white shadow-md"
                : "bg-white text-gray-800 border hover:bg-blue-50"
            }`}
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
        {activeCalc === "loan" && <LoanCalculator />}
        {activeCalc === "savings" && <SavingsCalculator />}
        {activeCalc === "investment" && <InvestmentCalculator />}
        {activeCalc === "mortgage" && <MortgageCalculator />}
      </div>

      <footer className="mt-8 text-gray-500 text-sm text-center">
        © {new Date().getFullYear()} Finance Calculators. Built with ❤️ using React + Tailwind.
      </footer>
    </div>
  );
}

/* =====================
   Individual Calculators
===================== */

function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [rate, setRate] = useState(5);
  const [years, setYears] = useState(3);

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const payment =
    (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Loan Calculator</h2>
      <Input label="Loan Amount ($)" value={amount} onChange={setAmount} />
      <Input label="Interest Rate (%)" value={rate} onChange={setRate} />
      <Input label="Term (years)" value={years} onChange={setYears} />

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Monthly Payment:{" "}
          <span className="font-bold text-blue-600">
            ${payment ? payment.toFixed(2) : "0.00"}
          </span>
        </p>
      </div>
    </div>
  );
}

function SavingsCalculator() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(200);
  const [rate, setRate] = useState(4);
  const [years, setYears] = useState(10);

  const monthlyRate = rate / 100 / 12;
  const months = years * 12;
  const futureValue =
    initial * Math.pow(1 + monthlyRate, months) +
    (monthly * (Math.pow(1 + monthlyRate, months) - 1)) / monthlyRate;

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Savings Calculator</h2>
      <Input label="Initial Deposit ($)" value={initial} onChange={setInitial} />
      <Input label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} />
      <Input label="Interest Rate (%)" value={rate} onChange={setRate} />
      <Input label="Years" value={years} onChange={setYears} />

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Future Balance:{" "}
          <span className="font-bold text-green-600">
            ${futureValue ? futureValue.toFixed(2) : "0.00"}
          </span>
        </p>
      </div>
    </div>
  );
}

function InvestmentCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(7);
  const [years, setYears] = useState(5);

  const futureValue = principal * Math.pow(1 + rate / 100, years);

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Investment Growth</h2>
      <Input label="Initial Investment ($)" value={principal} onChange={setPrincipal} />
      <Input label="Annual Return (%)" value={rate} onChange={setRate} />
      <Input label="Years" value={years} onChange={setYears} />

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Future Value:{" "}
          <span className="font-bold text-green-600">
            ${futureValue ? futureValue.toFixed(2) : "0.00"}
          </span>
        </p>
      </div>
    </div>
  );
}

function MortgageCalculator() {
  const [homePrice, setHomePrice] = useState(300000);
  const [downPayment, setDownPayment] = useState(60000);
  const [rate, setRate] = useState(4.5);
  const [term, setTerm] = useState(30);

  const principal = homePrice - downPayment;
  const monthlyRate = rate / 100 / 12;
  const months = term * 12;
  const payment =
    (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -months));

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4">Mortgage Calculator</h2>
      <Input label="Home Price ($)" value={homePrice} onChange={setHomePrice} />
      <Input label="Down Payment ($)" value={downPayment} onChange={setDownPayment} />
      <Input label="Interest Rate (%)" value={rate} onChange={setRate} />
      <Input label="Term (years)" value={term} onChange={setTerm} />

      <div className="mt-4 text-center">
        <p className="text-gray-700">
          Monthly Payment:{" "}
          <span className="font-bold text-blue-600">
            ${payment ? payment.toFixed(2) : "0.00"}
          </span>
        </p>
      </div>
    </div>
  );
}

/* ========== Reusable Input Component ========== */
function Input({ label, value, onChange }) {
  return (
    <div className="mb-3">
      <label className="block text-gray-700 text-sm mb-1">{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
        className="w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-400 outline-none"
      />
    </div>
  );
}
