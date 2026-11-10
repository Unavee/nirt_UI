import React from "react";
import {
  FileText,
  CheckCircle2,
  IndianRupee,
  CreditCard,
  TrendingUp,
  Award,
  Layers,
  ArrowUpRight,
  Clock,
  UserCheck,
  Building2,
  BarChart3
} from "lucide-react";

export default function SalesDashboardView({ data }) {
  const { kpis, monthlySalesTrend, salesRepLeaderboard } = data;

  return (
    <div className="space-y-6">
      {/* 5 Primary BFRD Section 26 KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Proposals Issued
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {kpis.proposalsIssued}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              SLD DPRs submitted
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Proposals Accepted
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              {kpis.proposalsAccepted}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
              {kpis.proposalsWinRate}% acceptance win rate
            </div>
          </div>
        </div>

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
              48 booked project contracts
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Advance Received
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-blue-700">
              ₹1.92 Cr
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">
              77.4% advance realization
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Pending Payments
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-indigo-700">
              ₹56.0 Lakhs
            </div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
              Milestone & final balances
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Sales Rep Leaderboard & Monthly Trend */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Sales Representatives Table (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Award className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Sales Executive Performance Leaderboard
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Q3 FY26
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Executive Name</th>
                  <th className="py-3 px-3">Division</th>
                  <th className="py-3 px-3 text-right">Orders Closed</th>
                  <th className="py-3 px-3 text-right">Booked Value</th>
                  <th className="py-3 px-4 text-right">Quota %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {salesRepLeaderboard.map((rep, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center space-x-2">
                      <div className="w-6 h-6 rounded-full bg-slate-100 text-slate-700 flex items-center justify-center font-bold text-[10px]">
                        {idx + 1}
                      </div>
                      <span>{rep.name}</span>
                    </td>
                    <td className="py-3.5 px-3 font-mono text-slate-600">
                      {rep.branch}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900">
                      {rep.dealsClosed}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {rep.bookedValue}
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          rep.targetPct >= 100
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-blue-50 text-blue-700 border border-blue-200"
                        }`}
                      >
                        {rep.targetPct}%
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Monthly Booking Velocity (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <BarChart3 className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Monthly Order Booking Velocity (₹ Lakhs)
            </h4>
          </div>

          <div className="space-y-3 pt-1">
            {monthlySalesTrend.map((trend, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{trend.month}</span>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="text-[11px] text-slate-500">
                      {trend.accepted}/{trend.proposals} Deals
                    </span>
                    <span className="font-bold text-slate-900">
                      ₹{trend.orderValue} L
                    </span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"
                    style={{ width: `${(trend.orderValue / 60) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50/60 border border-indigo-200/80 text-xs">
            <div className="flex items-center space-x-1.5 text-indigo-950 font-bold mb-1">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              <span>Record Win Rate (70.3%)</span>
            </div>
            <p className="text-[11px] text-indigo-700 leading-relaxed">
              Fast-track proposal turnarounds under 24 hours have increased customer work order conversions to industry peak levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
