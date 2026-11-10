import React from "react";
import {
  FolderKanban,
  Layers,
  AlertTriangle,
  CheckCircle2,
  Zap,
  TrendingUp,
  MapPin,
  Clock,
  ArrowRight,
  ShieldAlert,
  Building2
} from "lucide-react";
import { Link } from "react-router-dom";

export default function ProjectDashboardView({ data }) {
  const { kpis, projectsByCircle, delayedProjectsList } = data;

  return (
    <div className="space-y-6">
      {/* 6 Primary BFRD Section 26 Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Total Projects
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-800">
              <FolderKanban className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {kpis.totalProjects}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Cumulative registry
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              In Progress
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-blue-700">
              {kpis.projectsInProgress}
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">
              Pipelines P1 through P4
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-rose-50/60 border border-rose-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-rose-800 uppercase tracking-wider font-mono">
              Delayed (&gt;SLA)
            </span>
            <div className="p-1.5 rounded-lg bg-rose-100 text-rose-800">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-rose-900">
              {kpis.projectsDelayed}
            </div>
            <div className="text-[10px] text-rose-700 font-medium mt-0.5">
              Escalated to PMO
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Completed
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-700">
              {kpis.projectsCompleted}
            </div>
            <div className="text-[10px] text-emerald-600 font-medium mt-0.5">
              Triple closed & handed
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Under Execution
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-indigo-700">
              {kpis.capacityUnderExecutionKw} kW
            </div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
              12 live site work orders
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-200 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-emerald-800 uppercase tracking-wider font-mono">
              Commissioned
            </span>
            <div className="p-1.5 rounded-lg bg-emerald-100 text-emerald-800">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-emerald-900">
              {kpis.capacityCommissionedKw} kW
            </div>
            <div className="text-[10px] text-emerald-700 font-medium mt-0.5">
              Grid-synchronized peak
            </div>
          </div>
        </div>
      </div>

      {/* Grid: Circle Distribution Table & Delayed Projects Callout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Circle Distribution Table (7 Cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <MapPin className="w-4 h-4 text-blue-600" />
              <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Project Distribution Across Regional Circles
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-mono">
              Tamil Nadu
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/70 text-slate-500 font-mono text-[10px] uppercase border-b border-slate-100">
                <tr>
                  <th className="py-3 px-4">Circle Division</th>
                  <th className="py-3 px-3 text-right">Active</th>
                  <th className="py-3 px-3 text-right">Completed</th>
                  <th className="py-3 px-3 text-right">Delayed</th>
                  <th className="py-3 px-4 text-right">Installed kWp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {projectsByCircle.map((circle, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-slate-900 flex items-center space-x-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span>{circle.circle}</span>
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-blue-700">
                      {circle.active}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-bold text-emerald-700">
                      {circle.completed}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          circle.delayed > 0
                            ? "bg-rose-50 text-rose-700 border border-rose-200"
                            : "bg-slate-100 text-slate-400"
                        }`}
                      >
                        {circle.delayed}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right font-mono font-bold text-slate-900">
                      {circle.capacityKw} kW
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Delayed Projects Escalation Panel (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl border border-slate-200/90 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center space-x-2">
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
                Critical Delayed Projects (SLA Breach)
              </h4>
            </div>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200 font-mono">
              {delayedProjectsList.length} Active
            </span>
          </div>

          <div className="space-y-3">
            {delayedProjectsList.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-rose-50/40 border border-rose-100 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-xs font-bold text-slate-900">
                      {item.id}
                    </span>
                    <span className="text-xs font-medium text-slate-600">
                      • {item.customer}
                    </span>
                  </div>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-800 font-mono">
                    +{item.delayDays}d Overdue
                  </span>
                </div>

                <div className="flex items-center justify-between text-xs text-slate-600 font-mono">
                  <span>Circle: {item.circle}</span>
                  <span>Stage: <strong>{item.stage}</strong></span>
                </div>

                <p className="text-[11px] text-slate-500 italic">
                  Cause: {item.reason}
                </p>
              </div>
            ))}
          </div>

          <Link
            to="/pipelines"
            className="w-full py-2.5 rounded-xl text-xs font-bold bg-slate-900 hover:bg-black text-white flex items-center justify-center space-x-1.5 transition-colors shadow-2xs"
          >
            <span>Open 5-Pipeline Escalation Board</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
