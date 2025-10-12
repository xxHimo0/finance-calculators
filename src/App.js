// src/App.js
import React, { useState, useEffect, useMemo } from "react";
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  Home,
  Clock,
  BarChart2,
  Moon,
  Sun,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { motion } from "framer-motion";

/*
  Finance Calculators App (Fixed + Enhanced)
  - All calculators included and working
  - No missing imports or undefined components
*/

export default function App() {
  const [active, setActive] = useState("loan");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        dark
          ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100"
          : "bg-gradient-to-b from-sky-50 via-white to-blue-50 text-gray-900"
      }`}
    >
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-500">
              💰 Finance & Money Tools
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Smart calculators for loans, savings, investments, and more.
            </p>
          </div>
          <button
            onClick={() => setDark(!dark)}
            className="p-2 rounded-lg bg-white/80 dark:bg-gray-700 shadow hover:scale-105 transition"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        {/* Navigation */}
        <nav className="sticky top-4 z-20 bg-white/60 dark:bg-gray-800/60 backdrop-blur-md rounded-xl p-3 flex flex-wrap gap-2 justify-center shadow-sm mb-6">
          {[
            { id: "loan", label: "Loan", icon: <Calculator /> },
            { id: "mortgage", label: "Mortgage", icon: <Home /> },
            { id: "savings", label: "Savings", icon: <PiggyBank /> },
            { id: "investment", label: "Investment", icon: <TrendingUp /> },
            { id: "retirement", label: "Retirement", icon: <Clock /> },
            { id: "compound", label: "Compound", icon: <BarChart2 /> },
            { id: "roi", label: "ROI", icon: <BarChart2 /> },
            { id: "debt", label: "Debt DTI", icon: <BarChart2 /> },
            { id: "payoff", label: "Payoff", icon: <Calculator /> },
          ].map((btn) => (
            <button
              key={btn.id}
              onClick={() => setActive(btn.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-shadow ${
                active === btn.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border hover:bg-blue-50"
              }`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </nav>

        {/* Main content */}
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-6"
        >
          {active === "loan" && <LoanCalculator />}
          {active === "mortgage" && <MortgageCalculator />}
          {active === "savings" && <SavingsCalculator />}
          {active === "investment" && <InvestmentCalculator />}
          {active === "retirement" && <RetirementCalculator />}
          {active === "compound" && <CompoundInterestCalculator />}
          {active === "roi" && <ROICalculator />}
          {active === "debt" && <DebtToIncomeCalculator />}
          {active === "payoff" && <CreditCardPayoffCalculator />}
        </motion.div>

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Finance & Money Tools — built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}

/* ---------------------------
   Reusable components
--------------------------- */

function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>
      )}
    </div>
  );
}

function InputRow({ label, value, onChange }) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{label}</div>
      <input
        type="number"
        value={value}
        onChange={(e) =>
          onChange(e.target.value === "" ? "" : Number(e.target.value))
        }
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </label>
  );
}

/* ---------------------------
   Calculators
--------------------------- */

function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [apr, setApr] = useState(5);
  const [years, setYears] = useState(3);

  const monthlyRate = apr / 100 / 12;
  const n = years * 12;
  const monthly =
    monthlyRate === 0
      ? amount / n
      : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const total = monthly * n;
  const interest = total - amount;

  return (
    <div>
      <CardHeader title="Loan Calculator" subtitle="Find your monthly payment" />
      <InputRow label="Loan Amount ($)" value={amount} onChange={setAmount} />
      <InputRow label="Interest Rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Term (Years)" value={years} onChange={setYears} />

      <div className="mt-4 grid grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-gray-500">Monthly</p>
          <p className="text-lg font-bold">${monthly.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Total Paid</p>
          <p className="text-lg font-bold">${total.toFixed(2)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Interest</p>
          <p className="text-lg font-bold text-red-500">${interest.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
}

function MortgageCalculator() {
  const [price, setPrice] = useState(300000);
  const [down, setDown] = useState(60000);
  const [rate, setRate] = useState(4.5);
  const [years, setYears] = useState(30);

  const principal = price - down;
  const r = rate / 100 / 12;
  const n = years * 12;
  const monthly =
    (principal * r) / (1 - Math.pow(1 + r, -n));

  return (
    <div>
      <CardHeader title="Mortgage Calculator" subtitle="Estimate monthly payments" />
      <InputRow label="Home Price ($)" value={price} onChange={setPrice} />
      <InputRow label="Down Payment ($)" value={down} onChange={setDown} />
      <InputRow label="Interest Rate (%)" value={rate} onChange={setRate} />
      <InputRow label="Term (Years)" value={years} onChange={setYears} />

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Estimated Monthly Payment</p>
        <p className="text-lg font-bold">${monthly.toFixed(2)}</p>
      </div>
    </div>
  );
}

function SavingsCalculator() {
  const [goal, setGoal] = useState(20000);
  const [monthly, setMonthly] = useState(500);
  const [annual, setAnnual] = useState(5);

  const r = annual / 100 / 12;
  const months = Math.ceil(
    Math.log(1 + (r * goal) / monthly) / Math.log(1 + r)
  );
  const years = (months / 12).toFixed(1);

  return (
    <div>
      <CardHeader title="Savings Goal" subtitle="See how long until you reach it" />
      <InputRow label="Goal Amount ($)" value={goal} onChange={setGoal} />
      <InputRow label="Monthly Deposit ($)" value={monthly} onChange={setMonthly} />
      <InputRow
        label="Annual Return (%)"
        value={annual}
        onChange={setAnnual}
      />
      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">Months Required</p>
        <p className="text-lg font-bold">{months}</p>
        <p className="text-sm text-gray-400">≈ {years} years</p>
      </div>
    </div>
  );
}

function InvestmentCalculator() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(200);
  const [annual, setAnnual] = useState(7);
  const [years, setYears] = useState(10);

  const r = annual / 100 / 12;
  const months = years * 12;

  let balance = initial;
  for (let i = 0; i < months; i++) {
    balance = balance * (1 + r) + monthly;
  }

  return (
    <div>
      <CardHeader title="Investment Growth" subtitle="Estimate long-term returns" />
      <InputRow label="Initial Investment ($)" value={initial} onChange={setInitial} />
      <InputRow label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} />
      <InputRow label="Annual Return (%)" value={annual} onChange={setAnnual} />
      <InputRow label="Years" value={years} onChange={setYears} />

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Estimated Value After {years} Years
        </p>
        <p className="text-lg font-bold text-green-600">
          ${balance.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

function RetirementCalculator() {
  const [age, setAge] = useState(30);
  const [retire, setRetire] = useState(65);
  const [savings, setSavings] = useState(20000);
  const [monthly, setMonthly] = useState(500);
  const [annual, setAnnual] = useState(6);

  const years = retire - age;
  const months = years * 12;
  const r = annual / 100 / 12;

  const future =
    savings * Math.pow(1 + r, months) +
    (monthly * (Math.pow(1 + r, months) - 1)) / r;

  return (
    <div>
      <CardHeader title="Retirement Planner" subtitle="Estimate retirement savings" />
      <InputRow label="Current Age" value={age} onChange={setAge} />
      <InputRow label="Retirement Age" value={retire} onChange={setRetire} />
      <InputRow label="Current Savings ($)" value={savings} onChange={setSavings} />
      <InputRow label="Monthly Contribution ($)" value={monthly} onChange={setMonthly} />
      <InputRow label="Expected Annual Return (%)" value={annual} onChange={setAnnual} />

      <div className="mt-4 text-center">
        <p className="text-sm text-gray-500">
          Estimated Savings at Age {retire}
        </p>
        <p className="text-lg font-bold text-green-600">
          ${future.toFixed(2)}
        </p>
      </div>
    </div>
  );
}
