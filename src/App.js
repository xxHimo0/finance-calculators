// src/App.js
import React, { useState, useEffect, useMemo } from "react";
import {
  Calculator,
  PiggyBank,
  TrendingUp,
  Home,
  BarChart2,
  Moon,
  Sun,
  Car,
  Percent,
  PieChart,
  Layers,
  BookOpen,
  DollarSign,
} from "lucide-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";
import { motion } from "framer-motion";

/*
  Consolidated App.js
  - All calculators included except Retirement
  - Extra calculators added: Budget Planner, Salary Tax Estimator, Currency Converter, Break-Even
  - Tailwind CSS assumed configured
  - Tested for syntax / common lint issues
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
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-green-500">
              💰 Finance & Money Tools
            </h1>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
              Practical calculators — loans, savings, investments, taxes, and more.
            </p>
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

        {/* Tabs */}
        <nav className="sticky top-4 z-20 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl p-3 flex flex-wrap gap-2 justify-center shadow-sm mb-6">
          {[
            { id: "loan", label: "Loan", icon: <Calculator /> },
            { id: "auto", label: "Auto", icon: <Car /> },
            { id: "mortgage", label: "Mortgage", icon: <Home /> },
            { id: "student", label: "Student", icon: <BookOpen /> },
            { id: "savings", label: "Savings", icon: <PiggyBank /> },
            { id: "investment", label: "Investment", icon: <TrendingUp /> },
            { id: "compound", label: "Compound", icon: <BarChart2 /> },
            { id: "inflation", label: "Inflation", icon: <Percent /> },
            { id: "roi", label: "ROI", icon: <PieChart /> },
            { id: "debt", label: "Debt DTI", icon: <Layers /> },
            { id: "payoff", label: "Payoff", icon: <Calculator /> },
            { id: "tax", label: "Tax", icon: <DollarSign /> },
            { id: "currency", label: "Currency", icon: <DollarSign /> },
            { id: "budget", label: "Budget", icon: <PieChart /> },
            { id: "breakeven", label: "Break-Even", icon: <Calculator /> },
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

        {/* Main container */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border border-gray-100 dark:border-gray-700 rounded-3xl shadow-2xl p-6"
        >
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1">
              {active === "loan" && <LoanCalculator />}
              {active === "auto" && <AutoLoanCalculator />}
              {active === "mortgage" && <MortgageCalculator />}
              {active === "student" && <StudentLoanCalculator />}
              {active === "savings" && <SavingsCalculator />}
              {active === "investment" && <InvestmentCalculator />}
              {active === "compound" && <CompoundInterestCalculator />}
              {active === "inflation" && <InflationCalculator />}
              {active === "roi" && <ROICalculator />}
              {active === "debt" && <DebtToIncomeCalculator />}
              {active === "payoff" && <CreditCardPayoffCalculator />}
              {active === "tax" && <SalaryTaxCalculator />}
              {active === "currency" && <CurrencyConverter />}
              {active === "budget" && <BudgetPlanner />}
              {active === "breakeven" && <BreakEvenCalculator />}
            </div>

            <aside className="w-full lg:w-80 flex-shrink-0">
              <div className="mb-4 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 border text-center">
                <div className="text-xs text-gray-500">Ad slot (add AdSense code here)</div>
              </div>

              <FinanceTipCard />
              <MiniSummary />
            </aside>
          </div>
        </motion.div>

        {/* Footer area */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">
          <FAQCard />
          <SEOTextCard />
        </div>

        <footer className="mt-8 text-center text-xs text-gray-500 dark:text-gray-400">
          © {new Date().getFullYear()} Finance & Money Tools — built with React + Tailwind
        </footer>
      </div>
    </div>
  );
}

/* --------------------------
   Shared UI helpers
   -------------------------- */

function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-4">
      <h2 className="text-xl font-semibold">{title}</h2>
      {subtitle && <div className="text-sm text-gray-500 dark:text-gray-400">{subtitle}</div>}
    </div>
  );
}

function InputRow({ label, value, onChange, placeholder }) {
  const safe = value === "" || value === null || value === undefined ? "" : value;
  return (
    <label className="block mb-3">
      <div className="text-sm text-gray-600 dark:text-gray-300 mb-1">{label}</div>
      <input
        type="number"
        value={safe}
        placeholder={placeholder}
        onChange={(e) => {
          const raw = e.target.value;
          onChange(raw === "" ? "" : Number(raw));
        }}
        className="w-full px-3 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-300"
      />
    </label>
  );
}

function Result({ label, value, color }) {
  const formatted = typeof value === "number" && Number.isFinite(value)
    ? "$" + value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
    : value;
  const colorClass =
    color === "red"
      ? "text-red-600 dark:text-red-400"
      : color === "green"
      ? "text-green-600 dark:text-green-400"
      : "text-blue-600 dark:text-blue-400";
  return (
    <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
      <div className="text-sm text-gray-500">{label}</div>
      <div className={`font-bold text-lg ${colorClass}`}>{formatted}</div>
    </div>
  );
}

/* --------------------------
   Calculators
   -------------------------- */

/* Generic Loan */
function LoanCalculator() {
  const [amount, setAmount] = useState(10000);
  const [apr, setApr] = useState(5);
  const [years, setYears] = useState(3);

  const monthlyRate = apr / 100 / 12;
  const n = Math.max(1, years * 12);
  const monthly = monthlyRate === 0 ? amount / n : (amount * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const total = monthly * n;
  const interest = total - amount;

  return (
    <div>
      <SectionHeader title="Loan Calculator" subtitle="Monthly payment estimate" />
      <InputRow label="Loan amount ($)" value={amount} onChange={setAmount} />
      <InputRow label="Annual rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Term (years)" value={years} onChange={setYears} />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Result label="Monthly" value={monthly} />
        <Result label="Total Paid" value={total} />
        <Result label="Total Interest" value={interest} color="red" />
      </div>
    </div>
  );
}

/* Auto Loan — detailed: price, trade-in, fees, down */
function AutoLoanCalculator() {
  const [price, setPrice] = useState(30000);
  const [tradeIn, setTradeIn] = useState(0);
  const [down, setDown] = useState(3000);
  const [fees, setFees] = useState(500);
  const [apr, setApr] = useState(4.5);
  const [years, setYears] = useState(5);

  const financed = Math.max(0, Number(price) - Number(tradeIn) - Number(down) + Number(fees));
  const monthlyRate = apr / 100 / 12;
  const n = Math.max(1, years * 12);
  const monthly = monthlyRate === 0 ? financed / n : (financed * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const total = monthly * n;
  const interest = total - financed;

  return (
    <div>
      <SectionHeader title="Auto Loan Calculator" subtitle="Includes trade-in, down payment and fees" />
      <InputRow label="Vehicle price ($)" value={price} onChange={setPrice} />
      <InputRow label="Trade-in value ($)" value={tradeIn} onChange={setTradeIn} />
      <InputRow label="Down payment ($)" value={down} onChange={setDown} />
      <InputRow label="Fees (tax/title/etc) ($)" value={fees} onChange={setFees} />
      <InputRow label="Annual rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Term (years)" value={years} onChange={setYears} />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Result label="Monthly" value={monthly} />
        <Result label="Total Paid" value={total} />
        <Result label="Interest" value={interest} color="red" />
      </div>
    </div>
  );
}

/* Mortgage */
function MortgageCalculator() {
  const [price, setPrice] = useState(350000);
  const [down, setDown] = useState(70000);
  const [apr, setApr] = useState(4);
  const [term, setTerm] = useState(30);
  const [propertyTax, setPropertyTax] = useState(3000); // annual
  const [insurance, setInsurance] = useState(1200); // annual

  const principal = Math.max(0, Number(price) - Number(down));
  const monthlyRate = apr / 100 / 12;
  const n = Math.max(1, term * 12);
  const monthlyPrincipalInterest = monthlyRate === 0 ? principal / n : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const monthlyTax = Number(propertyTax) / 12;
  const monthlyInsurance = Number(insurance) / 12;
  const estimatedMonthly = monthlyPrincipalInterest + monthlyTax + monthlyInsurance;

  return (
    <div>
      <SectionHeader title="Mortgage Calculator" subtitle="Estimate monthly payment (incl. tax & insurance)" />
      <InputRow label="Home price ($)" value={price} onChange={setPrice} />
      <InputRow label="Down payment ($)" value={down} onChange={setDown} />
      <InputRow label="Annual rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Term (years)" value={term} onChange={setTerm} />
      <InputRow label="Annual property tax ($)" value={propertyTax} onChange={setPropertyTax} />
      <InputRow label="Annual insurance ($)" value={insurance} onChange={setInsurance} />

      <div className="mt-4">
        <Result label="Estimated Monthly Payment" value={estimatedMonthly} />
      </div>
    </div>
  );
}

/* Student loan - supports grace period (simplified) */
function StudentLoanCalculator() {
  const [balance, setBalance] = useState(30000);
  const [apr, setApr] = useState(5);
  const [years, setYears] = useState(10);
  const [graceMonths, setGraceMonths] = useState(6);

  const monthlyRate = apr / 100 / 12;
  const n = Math.max(1, years * 12);
  const accrued = balance * Math.pow(1 + monthlyRate, Math.max(0, Number(graceMonths)));
  const monthly = monthlyRate === 0 ? accrued / n : (accrued * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
  const total = monthly * n;

  return (
    <div>
      <SectionHeader title="Student Loan Calculator" subtitle="Estimate payments after grace period (if interest accrues)" />
      <InputRow label="Current balance ($)" value={balance} onChange={setBalance} />
      <InputRow label="Annual rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Term after graduation (years)" value={years} onChange={setYears} />
      <InputRow label="Grace period (months, interest accrues)" value={graceMonths} onChange={setGraceMonths} />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Result label="Monthly" value={monthly} />
        <Result label="Total Paid" value={total} />
      </div>
    </div>
  );
}

/* Savings */
function SavingsCalculator() {
  const [goal, setGoal] = useState(20000);
  const [monthly, setMonthly] = useState(500);
  const [annual, setAnnual] = useState(5);

  const r = annual / 100 / 12;
  const safeMonthly = Math.max(0, Number(monthly) || 0);

  let monthsNeeded = Infinity;
  if (safeMonthly <= 0) monthsNeeded = Infinity;
  else if (r === 0) monthsNeeded = Math.ceil(Number(goal) / safeMonthly);
  else {
    const numerator = 1 + (r * Number(goal)) / safeMonthly;
    monthsNeeded = numerator <= 0 ? Infinity : Math.ceil(Math.log(numerator) / Math.log(1 + r));
  }

  const timeline = useMemo(() => {
    const arr = [];
    let bal = 0;
    const maxMonths = isFinite(monthsNeeded) ? Math.min(monthsNeeded, 240) : 240;
    for (let m = 1; m <= maxMonths; m++) {
      bal = bal * (1 + r) + safeMonthly;
      arr.push({ month: m, balance: Number(bal.toFixed(2)) });
    }
    return arr;
  }, [safeMonthly, r, monthsNeeded]);

  return (
    <div>
      <SectionHeader title="Savings Goal" subtitle="Estimate how long to reach a goal" />
      <InputRow label="Goal ($)" value={goal} onChange={setGoal} />
      <InputRow label="Monthly deposit ($)" value={monthly} onChange={setMonthly} />
      <InputRow label="Estimated annual return (%)" value={annual} onChange={setAnnual} />

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500">Months required (approx)</div>
          <div className="text-2xl font-bold text-green-600">{isFinite(monthsNeeded) ? monthsNeeded : "∞"}</div>
          <div className="text-sm text-gray-500 mt-1">(~{isFinite(monthsNeeded) ? (monthsNeeded/12).toFixed(1) : "∞"} years)</div>
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

/* Investment */
function InvestmentCalculator() {
  const [initial, setInitial] = useState(5000);
  const [monthly, setMonthly] = useState(200);
  const [annual, setAnnual] = useState(7);
  const [years, setYears] = useState(10);

  const r = annual / 100 / 12;
  const months = Math.max(0, Math.round(years * 12));

  const series = useMemo(() => {
    const arr = [];
    let balance = Number(initial) || 0;
    for (let m = 1; m <= months; m++) {
      balance = balance * (1 + r) + (Number(monthly) || 0);
      arr.push({ month: m, balance: Number(balance.toFixed(2)) });
    }
    return arr;
  }, [initial, monthly, r, months]);

  const final = series.length ? series[series.length - 1].balance : Number(initial) || 0;

  return (
    <div>
      <SectionHeader title="Investment Growth" subtitle="Projected balance with monthly additions" />
      <InputRow label="Initial investment ($)" value={initial} onChange={setInitial} />
      <InputRow label="Monthly contribution ($)" value={monthly} onChange={setMonthly} />
      <InputRow label="Expected annual return (%)" value={annual} onChange={setAnnual} />
      <InputRow label="Years" value={years} onChange={setYears} />

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <Result label={`Estimated value after ${years} years`} value={final} color="green" />
          <div className="text-sm text-gray-500 mt-2">Total contributed: ${(Number(initial) + Number(monthly) * months).toLocaleString()}</div>
        </div>

        <div className="h-48 bg-white dark:bg-gray-800 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={series}>
              <defs>
                <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.8} />
                  <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <XAxis dataKey="month" />
              <YAxis />
              <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
              <Tooltip />
              <Area type="monotone" dataKey="balance" stroke="#F59E0B" fill="url(#colorBalance)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* Compound interest */
function CompoundInterestCalculator() {
  const [p, setP] = useState(1000);
  const [r, setR] = useState(5);
  const [n, setN] = useState(12);
  const [t, setT] = useState(5);

  const future = p * Math.pow(1 + (r / 100) / Math.max(1, n), Math.max(0, n * t));

  return (
    <div>
      <SectionHeader title="Compound Interest" subtitle="A = P(1 + r/n)^(n*t)" />
      <InputRow label="Principal ($)" value={p} onChange={setP} />
      <InputRow label="Annual rate (%)" value={r} onChange={setR} />
      <InputRow label="Times compounded per year" value={n} onChange={setN} />
      <InputRow label="Years" value={t} onChange={setT} />
      <Result label="Future Value" value={future} color="green" />
    </div>
  );
}

/* ROI */
function ROICalculator() {
  const [gain, setGain] = useState(2000);
  const [cost, setCost] = useState(10000);
  const roi = (Number(cost) === 0) ? "—" : (((Number(gain) - Number(cost)) / Number(cost)) * 100);

  return (
    <div>
      <SectionHeader title="Return on Investment" subtitle="(Gain - Cost) / Cost" />
      <InputRow label="Gain ($)" value={gain} onChange={setGain} />
      <InputRow label="Cost ($)" value={cost} onChange={setCost} />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">ROI</div>
        <div className="text-2xl font-bold">{typeof roi === "number" && Number.isFinite(roi) ? roi.toFixed(2) + "%" : roi}</div>
      </div>
    </div>
  );
}

/* Debt-to-Income */
function DebtToIncomeCalculator() {
  const [monthlyIncome, setMonthlyIncome] = useState(4000);
  const [monthlyDebt, setMonthlyDebt] = useState(1200);
  const dti = (Number(monthlyIncome) === 0) ? "—" : ((Number(monthlyDebt) / Number(monthlyIncome)) * 100);

  return (
    <div>
      <SectionHeader title="Debt-to-Income (DTI)" subtitle="Debt payments / Income" />
      <InputRow label="Monthly income ($)" value={monthlyIncome} onChange={setMonthlyIncome} />
      <InputRow label="Monthly debt payments ($)" value={monthlyDebt} onChange={setMonthlyDebt} />
      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">DTI</div>
        <div className="text-2xl font-bold">{typeof dti === "number" && Number.isFinite(dti) ? dti.toFixed(1) + "%" : dti}</div>
      </div>
    </div>
  );
}

/* Credit Card Payoff */
function CreditCardPayoffCalculator() {
  const [balance, setBalance] = useState(5000);
  const [apr, setApr] = useState(18);
  const [payment, setPayment] = useState(200);

  const monthsDisplay = (() => {
    const B = Number(balance) || 0;
    const A = Number(apr) || 0;
    const P = Number(payment) || 0;
    const r = A / 100 / 12;
    if (P <= B * r || P <= 0) return "∞";
    const months = Math.log(P / (P - B * r)) / Math.log(1 + r);
    return isFinite(months) && months > 0 ? Math.ceil(months) : "∞";
  })();

  return (
    <div>
      <SectionHeader title="Credit Card Payoff" subtitle="Estimate months to pay off" />
      <InputRow label="Balance ($)" value={balance} onChange={setBalance} />
      <InputRow label="Annual interest rate (%)" value={apr} onChange={setApr} />
      <InputRow label="Monthly payment ($)" value={payment} onChange={setPayment} />

      <div className="mt-4 text-center">
        <div className="text-sm text-gray-500">Months to pay off</div>
        <div className="text-2xl font-bold">{monthsDisplay}</div>
      </div>
    </div>
  );
}

/* Inflation Impact */
function InflationCalculator() {
  const [amount, setAmount] = useState(1000);
  const [annualInflation, setAnnualInflation] = useState(3);
  const [years, setYears] = useState(10);

  const r = Number(annualInflation) / 100 || 0;
  const purchasingPower = Number(amount) / Math.pow(1 + r, Math.max(0, Number(years)));

  return (
    <div>
      <SectionHeader title="Inflation Impact" subtitle="How purchasing power changes" />
      <InputRow label="Amount today ($)" value={amount} onChange={setAmount} />
      <InputRow label="Annual inflation (%)" value={annualInflation} onChange={setAnnualInflation} />
      <InputRow label="Years" value={years} onChange={setYears} />

      <div className="mt-4">
        <div className="text-sm text-gray-500">Purchasing power after {years} years</div>
        <div className="text-2xl font-bold">${Number(purchasingPower).toFixed(2)}</div>
        <div className="text-sm text-gray-500 mt-1">Lower number = inflation erodes value</div>
      </div>
    </div>
  );
}

/* Break-Even Calculator */
function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState(5000);
  const [pricePerUnit, setPricePerUnit] = useState(50);
  const [variableCostPerUnit, setVariableCostPerUnit] = useState(20);

  const contributionPerUnit = Number(pricePerUnit) - Number(variableCostPerUnit);
  const unitsToBreakEven = contributionPerUnit <= 0 ? Infinity : Math.ceil(Number(fixedCosts) / contributionPerUnit);
  const revenueAtBreakEven = unitsToBreakEven === Infinity ? "—" : (unitsToBreakEven * Number(pricePerUnit));

  return (
    <div>
      <SectionHeader title="Break-Even Calculator" subtitle="Units / revenue needed to cover fixed costs" />
      <InputRow label="Fixed costs ($)" value={fixedCosts} onChange={setFixedCosts} />
      <InputRow label="Price per unit ($)" value={pricePerUnit} onChange={setPricePerUnit} />
      <InputRow label="Variable cost per unit ($)" value={variableCostPerUnit} onChange={setVariableCostPerUnit} />

      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
          <div className="text-sm text-gray-500">Units to break even</div>
          <div className="font-bold text-lg">{unitsToBreakEven === Infinity ? "∞" : unitsToBreakEven}</div>
        </div>
        <div className="p-3 bg-white dark:bg-gray-800 rounded-lg border text-center">
          <div className="text-sm text-gray-500">Revenue at break even</div>
          <div className="font-bold text-lg">{revenueAtBreakEven === "—" ? "—" : "$" + revenueAtBreakEven.toLocaleString()}</div>
        </div>
      </div>
    </div>
  );
}

/* Salary tax estimator (simplified) */
function SalaryTaxCalculator() {
  const [annualGross, setAnnualGross] = useState(60000);

  const tax = useMemo(() => {
    const g = Number(annualGross) || 0;
    if (g <= 11000) return g * 0.10;
    if (g <= 44725) return 11000 * 0.1 + (g - 11000) * 0.12;
    if (g <= 95375) return 11000 * 0.1 + (44725 - 11000) * 0.12 + (g - 44725) * 0.22;
    return g * 0.24;
  }, [annualGross]);

  const monthlyNet = ((Number(annualGross) || 0) - tax) / 12;

  return (
    <div>
      <SectionHeader title="Salary Tax Estimator" subtitle="Very simplified tax example (US-style brackets sample)" />
      <InputRow label="Annual gross income ($)" value={annualGross} onChange={setAnnualGross} />
      <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border text-center">
          <div className="text-sm text-gray-500">Estimated annual tax</div>
          <div className="text-2xl font-bold">${Number(tax).toFixed(2)}</div>
        </div>
        <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border text-center">
          <div className="text-sm text-gray-500">Estimated monthly net</div>
          <div className="text-2xl font-bold">${Number(monthlyNet).toFixed(2)}</div>
        </div>
      </div>
    </div>
  );
}

/* Currency converter (mock rates) */
function CurrencyConverter() {
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState(100);

  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 156.5,
    CAD: 1.36,
  };

  const converted = useMemo(() => {
    const a = Number(amount) || 0;
    const fromRate = rates[from] || 1;
    const toRate = rates[to] || 1;
    const usd = a / fromRate;
    return usd * toRate;
  }, [amount, from, to]);

  return (
    <div>
      <SectionHeader title="Currency Converter (demo rates)" subtitle="Replace with live API for real rates" />
      <div className="grid grid-cols-2 gap-3">
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">From</div>
          <select value={from} onChange={(e) => setFrom(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800">
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
        <label className="block">
          <div className="text-sm text-gray-600 mb-1">To</div>
          <select value={to} onChange={(e) => setTo(e.target.value)} className="w-full p-2 rounded border bg-white dark:bg-gray-800">
            {Object.keys(rates).map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </div>

      <InputRow label="Amount" value={amount} onChange={setAmount} />
      <div className="mt-4">
        <div className="text-sm text-gray-500">Converted amount</div>
        <div className="text-2xl font-bold">${Number(converted.toFixed(2))}</div>
        <div className="text-xs text-gray-500 mt-1">Demo rates — replace with API for live rates.</div>
      </div>
    </div>
  );
}

/* Budget planner */
function BudgetPlanner() {
  const [categories, setCategories] = useState([
    { id: 1, name: "Rent/Mortgage", amount: 1200 },
    { id: 2, name: "Food", amount: 400 },
    { id: 3, name: "Transport", amount: 150 },
  ]);
  const [nextName, setNextName] = useState("");
  const [nextAmount, setNextAmount] = useState(100);

  const total = categories.reduce((s, c) => s + (Number(c.amount) || 0), 0);

  function addCategory() {
    if (!nextName) return;
    setCategories((prev) => [...prev, { id: Date.now(), name: nextName, amount: Number(nextAmount) || 0 }]);
    setNextName("");
    setNextAmount(100);
  }

  function updateCategory(id, key, val) {
    setCategories((prev) => prev.map((c) => (c.id === id ? { ...c, [key]: key === "amount" ? Number(val) || 0 : val } : c)));
  }

  function removeCategory(id) {
    setCategories((prev) => prev.filter((c) => c.id !== id));
  }

  const data = categories.map((c) => ({ name: c.name, value: Number(c.amount) || 0 }));

  return (
    <div>
      <SectionHeader title="Budget Planner" subtitle="Track monthly categories and totals" />
      <div className="space-y-2">
        {categories.map((c) => (
          <div key={c.id} className="flex gap-2 items-center">
            <input className="flex-1 px-2 py-1 rounded border bg-white dark:bg-gray-800" value={c.name} onChange={(e) => updateCategory(c.id, "name", e.target.value)} />
            <input className="w-28 px-2 py-1 rounded border bg-white dark:bg-gray-800" value={c.amount} onChange={(e) => updateCategory(c.id, "amount", e.target.value)} type="number" />
            <button onClick={() => removeCategory(c.id)} className="px-2 py-1 rounded bg-red-100 text-red-700">Remove</button>
          </div>
        ))}

        <div className="flex gap-2 mt-2">
          <input placeholder="Category name" className="flex-1 px-2 py-1 rounded border bg-white dark:bg-gray-800" value={nextName} onChange={(e) => setNextName(e.target.value)} />
          <input className="w-28 px-2 py-1 rounded border bg-white dark:bg-gray-800" type="number" value={nextAmount} onChange={(e) => setNextAmount(Number(e.target.value) || 0)} />
          <button onClick={addCategory} className="px-3 py-1 rounded bg-blue-600 text-white">Add</button>
        </div>
      </div>

      <div className="mt-4 grid md:grid-cols-2 gap-4">
        <div>
          <div className="text-sm text-gray-500">Total monthly spending</div>
          <div className="text-2xl font-bold">${total.toLocaleString()}</div>
        </div>

        <div className="h-40 bg-white dark:bg-gray-800 p-2 rounded-lg">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <XAxis dataKey="name" hide />
              <YAxis hide />
              <Tooltip />
              <Area type="monotone" dataKey="value" stroke="#60A5FA" fill="#BFDBFE" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

/* --------------------------
   Right-side small cards
   -------------------------- */

function FinanceTipCard() {
  const tips = [
    "Pay yourself first — save at least 10% of your income.",
    "Build an emergency fund covering 3–6 months of expenses.",
    "Automate contributions to investing/savings.",
    "Avoid carrying high-interest credit card balances.",
    "Diversify investments across asset types.",
  ];
  const tip = tips[Math.floor(Math.random() * tips.length)];
  return (
    <div className="mb-4 p-3 rounded-lg bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold mb-2">💡 Tip</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300 italic">“{tip}”</p>
      <div className="text-xs text-gray-500 mt-2">Small tips help retention and SEO.</div>
    </div>
  );
}

function MiniSummary() {
  return (
    <div className="p-3 rounded-lg bg-white dark:bg-gray-800 border shadow-sm">
      <div className="text-sm text-gray-500">Quick Links</div>
      <ul className="mt-2 text-sm space-y-1 text-gray-700 dark:text-gray-300">
        <li>Compare calculators</li>
        <li>Save results (coming)</li>
        <li>Email results (coming)</li>
      </ul>
    </div>
  );
}

/* FAQ + SEO */
function FAQCard() {
  const faqs = [
    { q: "Are these calculations accurate?", a: "They use standard financial formulas and are estimates — consult a professional for final decisions." },
    { q: "Do you store my data?", a: "No — everything is calculated in your browser unless you explicitly save or share results." },
    { q: "Are the calculators free?", a: "Yes — supported by ads and optional affiliate links." },
  ];
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold mb-3">❓ Frequently asked</h3>
      <div className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
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

function SEOTextCard() {
  return (
    <div className="p-4 rounded-xl bg-white dark:bg-gray-800 border shadow-sm">
      <h3 className="font-semibold mb-3">About These Tools</h3>
      <p className="text-sm text-gray-600 dark:text-gray-300">
        These calculators help estimate payments, savings timelines, investment growth, and break-even points. They are educational and not a substitute for professional advice.
      </p>
    </div>
  );
}
