import React from "react";
import {
  IndianRupee,
  CreditCard,
  Clock,
  AlertTriangle,
  Landmark,
  CheckCircle2,
  TrendingUp,
  Percent,
  Calendar,
  Layers,
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function FinancialDashboardView({ data }) {
  const { kpis, paymentMilestoneBreakdown, agingAnalysis } = data;

  return (
    <div className="space-y-6">
      {/* 6 Primary BFRD Section 26 Financial Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Total Order Value
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-800">
              <IndianRupee className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              ₹2.48 Cr
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              48 active contracts
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Amount Received
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              ₹1.92 Cr
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
              {kpis.realizationRate}% cash realized
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Outstanding
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-blue-700">
              ₹56.0 L
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">
              Milestone locked
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider font-mono">
              Overdue Amount
            </span>
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-rose-900">
              ₹4.20 L
            </div>
            <div className="text-[10px] text-rose-700 font-medium mt-0.5">
              2 projects past due
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Subsidy Claimed
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Landmark className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-indigo-700">
              ₹34.2 L
            </div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
              14 claims on Portal
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
              Subsidy Credited
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-900">
              ₹28.4 L
            </div>
            <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
              Direct to consumer
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Milestone Receipts Breakdown & Accounts Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Milestone Receipts Breakdown Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Payment Milestone Realization Ledger
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Accounts Dept
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Milestone Gate</th>
                  <th className="py-3 px-3 text-right">Billed</th>
                  <th className="py-3 px-3 text-right">Realized</th>
                  <th className="py-3 px-3 text-right">Balance</th>
                  <th className="py-3 px-4 text-right">Control Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {paymentMilestoneBreakdown.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      <span>{item.milestone}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono text-slate-700">
                      {item.billed}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {item.collected}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-blue-700">
                      {item.pending}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700">
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Receivables Aging Buckets (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Clock className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Accounts Receivable Aging Analysis
            </h4>
          </div>

          <div className="space-y-3">
            {agingAnalysis.map((bucket, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${bucket.color}`}
              >
                <div>
                  <span className="font-mono text-xs font-bold block">
                    {bucket.bucket}
                  </span>
                  <span className="text-[10px] opacity-80 font-medium">
                    {bucket.count} Invoices in tranche
                  </span>
                </div>
                <div className="text-right">
                  <span className="text-sm font-black font-mono block">
                    {bucket.amount}
                  </span>
                  <span className="text-[10px] uppercase font-bold opacity-75">
                    {idx === 0 ? "Normal Term" : idx === 1 ? "Notice Sent" : "Overdue Escalated"}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80 text-xs">
            <div className="flex items-center space-x-1.5 text-emerald-950 font-bold mb-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>Step 07 Hard-Lock Protection</span>
            </div>
            <p className="text-[11px] text-emerald-800 leading-relaxed">
              Zero unauthorized procurement or dispatch can occur before 80% advance realization, eliminating bad debts.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
