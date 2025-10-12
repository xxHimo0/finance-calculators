// src/App.js
import React, { useState, useEffect, useMemo } from "react";
import { Calculator, PiggyBank, TrendingUp, Home, Clock, BarChart2, Moon, Sun } from "lucide-react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { motion } from "framer-motion";

/*
  Upgraded Finance Calculators App
  - Paste this file over src/App.js
  - Install: lucide-react recharts framer-motion
*/

export default function App() {
  const [active, setActive] = useState("loan");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen transition-colors duration-500 ${dark ? "bg-gradient-to-b from-gray-900 to-gray-800 text-gray-100" : "bg-gradient-to-b from-sky-50 via-white to-blue-50 text-gray-900"}`}>
      <div className="max-w-5xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-500">
              💰 Finance & Money Tools
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">Fast calculators & charts — loans, savings, investments, retirement and more.</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDark(!dark)}
              className="p-2 rounded-lg bg-white/80 dark:bg-gray-700 shadow hover:scale-105 transition"
              aria-label="Toggle dark mode"
            >
              {dark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </div>
        </header>

        {/* Navigation (tabs) */}
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
          ].map(btn => (
            <button
              key={btn.id}
              onClick={() => setActive(btn.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-full text-sm font-medium transition-shadow ${active === btn.id ? "bg-blue-600 text-white shadow-lg" : "bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border hover:bg-blue-50"}`}
            >
              {btn.icon}
              {btn.label}
            </button>
          ))}
        </nav>

        {/* Main card */}
        <motion.div initial={{opacity:0, y:6}} animate={{opacity:1, y:0}} transition={{duration:0.35}} className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-2xl shadow-xl p-6">
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

        {/* Tips & FAQ */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <FinanceTipCard />
          <FAQCard />
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Finance & Money Tools — built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}

/* ---------------------------
   Helper components & UI bits
   --------------------------- */

function CardHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <p className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</p>}
    </div>
  );
}

function InputRow({ label, value, onChange, placeholder }) {
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{label}</div>
      <input
        type="number"
        value={value}
        placeholder={placeholder}
        onChange={e => onChange(e.target.value === "" ? "" : Number(e.target.value))}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </label>
  );
}

function ResultRow({ label, value, color = "blue" }) {
  return (
    <div className="mt-4 text-center">
      <div className="text-sm text-gray-500 dark:text-gray-400">{label}</div>
      <div className={`text-2xl font-bold text-${color === "green" ? "green-600" : "blue-600"} dark:text-${color === "green" ? "green-400" : "blue-400"}`}>
        ${typeof value === "number" ? value.toLocaleString(undefined, {minimumFractionDigits:2, maximumFractionDigits:2}) : value}
      </div>
    </div>
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
  const monthlyPayment = monthlyRate === 0 ? (amount / n) : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const total = monthlyPayment * n;
  const totalInterest = total - amount;

  return (
    <div>
      <CardHeader title="Loan Calculator" subtitle="Find monthly payments for a loan" />
      <InputRow label="Loan amount ($)" value={amount} onChange={val => setAmount(val)} />
      <InputRow label="Annual interest rate (%)" value={apr} onChange={val => setApr(val)} />
      <InputRow label="Term (years)" value={years} onChange={val => setYears(val)} />
      <div className="flex gap-3 mt-4">
        <button onClick={() => { setAmount(10000); setApr(5); setYears(3); }} className="px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg">Reset</button>
        <button onClick={() => navigator.share?.({ title: "Loan calc", url: window.location.href })} className="px-3 py-2 bg-blue-600 text-white rounded-lg">Share</button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
          <div className="text-sm text-gray-500">Monthly</div>
          <div className="font-bold text-lg">${monthlyPayment.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
          <div className="text-sm text-gray-500">Total Paid</div>
          <div className="font-bold">${total.toFixed(2)}</div>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
          <div className="text-sm text-gray-500">Total Interest</div>
          <div className="font-bold text-red-600">${totalInterest.toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

function MortgageCalculator() {
  const [price, setPrice] = useState(300000);
  const [down, setDown] = useState(60000);
  const [apr, setApr] = useState(4.5);
  const [term, setTerm] = useState(30);

  const principal = price - down;
  const monthlyRate = apr / 100 / 12;
  const n = term * 12;
  const monthlyPayment = monthlyRate === 0 ? (principal / n) : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));

  return (
    <div>
      <CardHeader title="Mortgage Calculator" subtitle="Estimate your monthly mortgage payment" />
      <InputRow label="Home price ($)" value={price} onChange={v => setPrice(v)} />
      <InputRow label="Down payment ($)" value={down} onChange={v => setDown(v)} />
      <InputRow label="Annual rate (%)" value={apr} onChange={v => setApr(v)} />
      <InputRow label="Term (years)" value={term} onChange={v => setTerm(v)} />

      <ResultRow label={`Estimated monthly payment`} value={monthlyPayment} />
    </div>
  );
}

function SavingsCalculator() {
  const [goal, setGoal] = useState(20000);
  const [monthly, setMonthly] = useState(500);
  const [annual, setAnnual] = useState(5);

  // months to reach goal (approx)
  const r = annual / 100 / 12;
  const monthsNeeded = r === 0 ? Math.ceil(goal / monthly) : Math.ceil(Math.log(1 + (r * goal) / monthly) / Math.log(1 + r));
  const yearsApprox = (monthsNeeded / 12).toFixed(1);

  // build timeline for chart (cap to 120 months)
  const timeline = useMemo(() => {
    const arr = [];
    let bal = 0;
    for (let m = 1; m <= Math.min(monthsNeeded, 240); m++) {
      bal = bal * (1 + r) + monthly;
      arr.push({ month: m, balance: Number(bal.toFixed(2)) });
    }
    return arr;
  }, [monthly, r, monthsNeeded]);

  return (
    <div>
      <CardHeader title="Savings Goal" subtitle="Estimate how long until you reach a goal" />
      <InputRow label="Goal amount ($)" value={goal} onChange={v => setGoal(v)} />
      <InputRow label="Monthly deposit ($)" value={monthly} onChange={v => setMonthly(v)} />
      <InputRow label="Estimated annual return (%)" value={annual} onChange={v => setAnnual(v)} />

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <ResultRow label="Months required (approx)" value={monthsNeeded} color="green" />
          <div className="text-sm mt-2 text-gray-500">(~{yearsApprox} years)</div>
        </div>

        <div className="h-40 bg-white dark:bg-gray-800 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={timeline}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#10B981" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

  const series = useMemo(() => {
    const arr = [];
    let balance = initial;
    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + r) + monthly;
      arr.push({ month: m, balance: Number(balance.toFixed(2)) });
    }
    return arr;
  }, [initial, monthly, r, months]);

  const final = series.length ? series[series.length - 1].balance : initial;

  return (
    <div>
      <CardHeader title="Investment Growth" subtitle="See projected growth with monthly contributions" />
      <InputRow label="Initial investment ($)" value={initial} onChange={v => setInitial(v)} />
      <InputRow label="Monthly contribution ($)" value={monthly} onChange={v => setMonthly(v)} />
      <InputRow label="Expected annual return (%)" value={annual} onChange={v => setAnnual(v)} />
      <InputRow label="Years" value={years} onChange={v => setYears(v)} />

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <ResultRow label={`Estimated value after ${years} years`} value={final} color="green" />
          <div className="text-sm mt-2 text-gray-500">Total contributed: ${(initial + monthly * months).toLocaleString()}</div>
        </div>

        <div className="h-48 bg-white dark:bg-gray-800 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={series}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="balance" stroke="#F59E0B" dot={false} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
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

  const future = savings * Math.pow(1 + r, months) + (monthly * (Math.pow(1 + r, months) - 1)) / r;

  return (
    <div>
      <CardHeader title="Retirement Planner" subtitle="Estimate retirement savings by target age" />
      <InputRow label="Current age" value={age} onChange={v => setAge(v)} />
      <InputRow label="Target retirement age" value={retire} onChange={v => setRetire(v)} />
      <InputRow label="Current savings ($)" value={savings} onChange={v => setSavings(v)} />
      <InputRow label="Monthly contribution ($)" value={monthly} onChange={v => setMonthly(v)} />
      <InputRow label="Expected annual return (%)" value={annual} onChange={v => setAnnual(v)} />

      <ResultRow label={`Estimated savings at age ${retire}`} value={future} color="green" />
    </div>
  );
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState(1000);
  const [rate, setRate] = useState(5);
  const [times, setTimes] = useState(12);
  const [years, setYears] = useState(5);

  const final = principal * Math.pow(1 + (rate / 100) / times, times * years);

  return (
    <div>
      <CardHeader title="Compound Interest" subtitle="Compound interest formula (A = P(1 + r/n)^(n*t))" />
      <InputRow label="Principal ($)" value={principal} onChange={v => setPrincipal(v)} />
      <InputRow label="Annual rate (%)" value={rate} onChange={v => setRate(v)} />
      <InputRow label="Times compounded per year (n)" value={times} onChange={v => setTimes(v)} />
      <InputRow label="Years (t)" value={years} onChange={v => setYears(v)} />
      <ResultRow label="Future value" value={final} color="green" />
    </div>
  );
}

function ROICalculator() {
  const [gain, setGain] = useState(2000);
  const [cost, setCost] = useState(10000);

  const roi = ((gain - cost) / cost) * 100;

  return (
    <div>
      <CardHeader title="Return on Investment (ROI)" subtitle="Simple ROI calculation" />
      <InputRow label="Gain from investment ($)" value={gain} onChange={v => setGain(v)} />
      <InputRow label="Cost of investment ($)" value={cost} onChange={v => setCost(v)} />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">ROI</div>
        <div className="text-2xl font-bold">{!isFinite(roi) ? "—" : roi.toFixed(2) + "%"}</div>
      </div>
    </div>
  );
}

function DebtToIncomeCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [monthlyDebt, setMonthlyDebt] = useState(1200);

  const dti = (monthlyDebt / monthlyIncome) * 100;

  return (
    <div>
      <CardHeader title="Debt-to-Income (DTI)" subtitle="Used by lenders to assess ability to repay" />
      <InputRow label="Monthly income ($)" value={monthlyIncome} onChange={v => setMonthlyIncome(v)} />
      <InputRow label="Monthly debt payments ($)" value={monthlyDebt} onChange={v => setMonthlyDebt(v)} />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">DTI</div>
        <div className="text-2xl font-bold">{dti.toFixed(1)}%</div>
      </div>
    </div>
  );
}

function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(18);
  const [payment, setPayment] = useState(200);

  const r = apr / 100 / 12;
  const months = Math.log(payment / (payment - balance * r)) / Math.log(1 + r);
  const monthsDisplay = !isFinite(months) || months < 0 ? "∞" : Math.ceil(months);

  return (
    <div>
      <CardHeader title="Credit Card Payoff" subtitle="Estimate months to pay off at current payment" />
      <InputRow label="Balance ($)" value={balance} onChange={v => setBalance(v)} />
      <InputRow label="Annual interest rate (%)" value={apr} onChange={v => setApr(v)} />
      <InputRow label="Monthly payment ($)" value={payment} onChange={v => setPayment(v)} />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">Months to pay off</div>
        <div className="text-2xl font-bold">{monthsDisplay}</div>
      </div>
    </div>
  );
}

/* ---------------------------
   Tips and FAQ cards
   --------------------------- */

function FinanceTipCard() {
  const tips = [
    "Pay yourself first — save at least 10% of your income.",
    "Build an emergency fund covering 3–6 months of expenses.",
    "Automate contributions — set it and forget it.",
    "Avoid carrying high-interest credit card balances.",
    "Diversify investments across asset types.",
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold mb-2">💡 Tip of the moment</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 italic">“{tip}”</p>
      <p className="mt-3 text-xs text-gray-500 dark:text-gray-400">Useful tips improve retention and SEO.</p>
    </div>
  );
}

function FAQCard() {
  const faqs = [
    { q: "Are these calculators accurate?", a: "They use standard financial formulas. Results are estimates — check exact amounts with your provider." },
    { q: "Is my data saved?", a: "No — calculations run locally in your browser." },
    { q: "Can I use for business?", a: "Yes — these tools work for personal and small business planning." },
  ];

  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold mb-3">❓ Frequently asked</h3>
      <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
        {faqs.map((f, i) => (
          <div key={i}>
            <div className="font-medium">{f.q}</div>
            <div className="text-gray-500">{f.a}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
