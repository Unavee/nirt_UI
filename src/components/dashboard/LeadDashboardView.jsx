import React from "react";
import {
  Users,
  UserCheck,
  UserX,
  Target,
  TrendingUp,
  Percent,
  Sparkles,
  Award,
  Layers,
  ArrowRight,
  Compass,
  CheckCircle2,
  Calendar
} from "lucide-react";

export default function LeadDashboardView({ data }) {
  const { kpis, leadSources, leadStagesFunnel } = data;

  return (
    <div className="space-y-6">
      {/* 6 KPI Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Total Leads
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {kpis.totalLeads}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Cumulative intake
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              New Leads
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Sparkles className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-indigo-700">
              {kpis.newLeads}
            </div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
              Unassigned inquiries
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Qualified
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <UserCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-blue-700">
              {kpis.qualifiedLeads}
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">
              Cat A & B feasible
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Lost Leads
            </span>
            <div className="p-1.5 rounded-lg bg-rose-50 text-rose-700">
              <UserX className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-rose-700">
              {kpis.lostLeads}
            </div>
            <div className="text-[10px] text-rose-600 font-medium mt-0.5">
              Low sanction / shade
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Converted
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              {kpis.convertedLeads}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
              Work orders confirmed
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
              Conversion %
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <Percent className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-900">
              {kpis.conversionRate}%
            </div>
            <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">
              +4.2% vs industry avg
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Lead Source Performance Table & Conversion Funnel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Lead Source Performance Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Target className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Lead Source Performance & Conversion
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              BFRD §26 Mandate
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Channel / Lead Source</th>
                  <th className="py-3 px-3 text-right">Intake</th>
                  <th className="py-3 px-3 text-right">Converted</th>
                  <th className="py-3 px-3 text-right">Win %</th>
                  <th className="py-3 px-4 text-right">Order Value</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {leadSources.map((source, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{source.source}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-700">
                      {source.count}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {source.converted}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          source.rate >= 35
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : source.rate > 0
                            ? "bg-blue-50 text-blue-700 border border-blue-200"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {source.rate}%
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {source.value}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right: Intake to Confirmation Funnel (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Compass className="w-4 h-4 text-indigo-600" />
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Inward Qualification Funnel
            </h4>
          </div>

          <div className="space-y-3.5 pt-1">
            {leadStagesFunnel.map((stage, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700">{stage.stage}</span>
                  <div className="flex items-center space-x-2 font-mono">
                    <span className="font-bold text-slate-900">{stage.count}</span>
                    <span className="text-[10px] text-slate-400">({stage.pct}%)</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-2.5 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 transition-all duration-500"
                    style={{ width: `${stage.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-xs space-y-1">
            <div className="flex items-center space-x-1.5 text-blue-900 font-bold">
              <Award className="w-4 h-4 text-blue-600" />
              <span>National Portal Highest Conversion</span>
            </div>
            <p className="text-[11px] text-blue-700 leading-relaxed">
              PM Surya Ghar National Portal leads convert at <strong>46.2%</strong> with average 1.8-day qualification velocity.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
