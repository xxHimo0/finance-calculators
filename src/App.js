// src/App.js
import React, { useState, useEffect, useMemo } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// (Keep your existing imports for UI icons, recharts, etc.)
// import { Calculator, PiggyBank, ... } from "lucide-react";
// import { LineChart, ... } from "recharts";
// import { motion } from "framer-motion";

/*
  Note: This App uses react-router-dom for separate URLs per calculator
  and react-helmet-async for per-page meta (SEO).
  If you already have the calculators implemented in this file, keep them
  and wrap them as route components below.
*/

/* --------------------------
   Small SEO helper component
   Reuse <SEO title="" description="" slug="" jsonLd={} />
   ---------------------------*/
function SEO({ title, description, slug, jsonLd }) {
  const base = "https://financecalc-demo.vercel.app";
  const url = slug ? `${base}${slug}` : base;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
}

/* --------------------------
   Navigation component
   ---------------------------*/
function TopNav({ dark, setDark }) {
  return (
    <header className="max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
      <div>
        <Link to="/" className="text-2xl font-bold">
          💰 Finance Calculators
        </Link>
        <div className="text-sm text-gray-600">Loan, savings, investment tools</div>
      </div>

      <nav className="flex gap-2 items-center">
        <Link to="/loan-calculator" className="px-3 py-2 rounded hover:bg-gray-100">Loan</Link>
        <Link to="/savings-calculator" className="px-3 py-2 rounded hover:bg-gray-100">Savings</Link>
        <Link to="/investment-calculator" className="px-3 py-2 rounded hover:bg-gray-100">Investment</Link>
        <Link to="/mortgage-calculator" className="px-3 py-2 rounded hover:bg-gray-100">Mortgage</Link>
        <button onClick={() => setDark(!dark)} className="ml-4 px-2 py-1 rounded bg-gray-100">Theme</button>
      </nav>
    </header>
  );
}

/* --------------------------
   Example route components
   Replace the internals with your exact calculators code;
   keep the <SEO> usage to set per-page meta.
   ---------------------------*/

function LoanCalculatorPage() {
  // copy your existing loan calculator implementation here
  // small example:
  const title = "Loan Calculator — Finance Calculators";
  const desc = "Calculate monthly payments, total interest, and loan payoff schedules.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": desc,
    "url": "https://financecalc-demo.vercel.app/loan-calculator"
  };

  // ---- your calculator UI logic here ----
  return (
    <main className="max-w-4xl mx-auto p-4">
      <SEO title={title} description={desc} slug="/loan-calculator" jsonLd={jsonLd} />
      <h1 className="text-2xl font-semibold">Loan Calculator</h1>
      {/* Put your loan calculator UI here (inputs, outputs, chart) */}
      <p className="mt-3 text-sm text-gray-600">Enter loan details to see monthly payments.</p>
      {/* Example small UI: */}
    </main>
  );
}

function SavingsCalculatorPage() {
  const title = "Savings Calculator — Finance Calculators";
  const desc = "Estimate how long until you reach your savings goal with monthly deposits and interest.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": desc,
    "url": "https://financecalc-demo.vercel.app/savings-calculator"
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <SEO title={title} description={desc} slug="/savings-calculator" jsonLd={jsonLd} />
      <h1 className="text-2xl font-semibold">Savings Calculator</h1>
      <p className="mt-3 text-sm text-gray-600">Estimate months to hit a savings goal.</p>
    </main>
  );
}

function InvestmentCalculatorPage() {
  const title = "Investment Calculator — Finance Calculators";
  const desc = "Project investment growth given initial principal, monthly additions, and expected return.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": desc,
    "url": "https://financecalc-demo.vercel.app/investment-calculator"
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <SEO title={title} description={desc} slug="/investment-calculator" jsonLd={jsonLd} />
      <h1 className="text-2xl font-semibold">Investment Calculator</h1>
      <p className="mt-3 text-sm text-gray-600">See how investments can grow over time.</p>
    </main>
  );
}

function MortgageCalculatorPage() {
  const title = "Mortgage Calculator — Finance Calculators";
  const desc = "Estimate monthly mortgage payments including taxes and insurance.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": title,
    "description": desc,
    "url": "https://financecalc-demo.vercel.app/mortgage-calculator"
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <SEO title={title} description={desc} slug="/mortgage-calculator" jsonLd={jsonLd} />
      <h1 className="text-2xl font-semibold">Mortgage Calculator</h1>
      <p className="mt-3 text-sm text-gray-600">Estimate monthly payments including tax/insurance.</p>
    </main>
  );
}

/* Home page */
function HomePage() {
  const title = "Finance Calculators — Free Tools for Loans, Savings & Investments";
  const desc = "Free online finance calculators: loan, savings, investment, mortgage and more.";
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Finance Calculators",
    "url": "https://financecalc-demo.vercel.app/",
    "description": desc
  };

  return (
    <main className="max-w-4xl mx-auto p-4">
      <SEO title={title} description={desc} slug="/" jsonLd={jsonLd} />
      <h1 className="text-3xl font-bold">Finance Calculators</h1>
      <p className="mt-2 text-gray-600">Choose a tool: Loan, Savings, Investment, Mortgage.</p>

      <div className="mt-6 grid sm:grid-cols-2 gap-4">
        <Link to="/loan-calculator" className="block p-4 rounded border hover:shadow">
          <div className="font-semibold">Loan Calculator</div>
          <div className="text-sm text-gray-500">Monthly payments & total interest</div>
        </Link>
        <Link to="/savings-calculator" className="block p-4 rounded border hover:shadow">
          <div className="font-semibold">Savings Calculator</div>
          <div className="text-sm text-gray-500">Months to reach a goal</div>
        </Link>
        <Link to="/investment-calculator" className="block p-4 rounded border hover:shadow">
          <div className="font-semibold">Investment Calculator</div>
          <div className="text-sm text-gray-500">Projected growth with monthly deposits</div>
        </Link>
        <Link to="/mortgage-calculator" className="block p-4 rounded border hover:shadow">
          <div className="font-semibold">Mortgage Calculator</div>
          <div className="text-sm text-gray-500">Estimate mortgage payments</div>
        </Link>
      </div>
    </main>
  );
}

/* --------------------------
   App root with routes
   ---------------------------*/
export default function App() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <div className={`min-h-screen ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <TopNav dark={dark} setDark={setDark} />

      <div className="max-w-6xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/loan-calculator" element={<LoanCalculatorPage />} />
          <Route path="/savings-calculator" element={<SavingsCalculatorPage />} />
          <Route path="/investment-calculator" element={<InvestmentCalculatorPage />} />
          <Route path="/mortgage-calculator" element={<MortgageCalculatorPage />} />

          {/* optional redirects / aliases for SEO-friendly URLs */}
          <Route path="/loan" element={<LoanCalculatorPage />} />
          <Route path="/savings" element={<SavingsCalculatorPage />} />
          <Route path="/investment" element={<InvestmentCalculatorPage />} />
          <Route path="/mortgage" element={<MortgageCalculatorPage />} />

          {/* 404 fallback */}
          <Route path="*" element={<div className="p-4">Page not found — <Link to="/">Go home</Link></div>} />
        </Routes>
      </div>
    </div>
  );
}
