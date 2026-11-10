import React from "react";
import {
  Compass,
  FileCode,
  Truck,
  Wrench,
  ClipboardCheck,
  Zap,
  Clock,
  User,
  ArrowRight,
  Layers,
  AlertTriangle,
  CheckCircle2
} from "lucide-react";

export default function OperationsDashboardView({ data }) {
  const { kpis, bottleneckStages } = data;

  return (
    <div className="space-y-6">
      {/* 6 Primary BFRD Section 26 Operations Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting Survey
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Compass className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {kpis.awaitingSurvey}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Terrace layout audit
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting Design
            </span>
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-700">
              <FileCode className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-indigo-700">
              {kpis.awaitingDesign}
            </div>
            <div className="text-[10px] text-indigo-600 font-medium mt-0.5">
              SLD & 3D PVsyst DPR
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting PO
            </span>
            <div className="p-1.5 rounded-lg bg-slate-100 text-slate-800">
              <Truck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-slate-900">
              {kpis.awaitingProcurement}
            </div>
            <div className="text-[10px] text-slate-500 font-medium mt-0.5">
              Waaree / Deye orders
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting Install
            </span>
            <div className="p-1.5 rounded-lg bg-blue-50 text-blue-700">
              <Wrench className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-blue-700">
              {kpis.awaitingInstallation}
            </div>
            <div className="text-[10px] text-blue-600 font-medium mt-0.5">
              Site mechanical erection
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting CEIG
            </span>
            <div className="p-1.5 rounded-lg bg-violet-50 text-violet-700">
              <ClipboardCheck className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-violet-700">
              {kpis.awaitingInspection}
            </div>
            <div className="text-[10px] text-violet-600 font-medium mt-0.5">
              Safety & anti-islanding
            </div>
          </div>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
              Awaiting Meter
            </span>
            <div className="p-1.5 rounded-lg bg-teal-50 text-teal-700">
              <Zap className="w-4 h-4" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black font-mono text-teal-700">
              {kpis.awaitingNetMetering}
            </div>
            <div className="text-[10px] text-teal-600 font-medium mt-0.5">
              TANGEDCO bi-dir sync
            </div>
          </div>
        </div>
      </div>

      {/* Operations Bottlenecks & Execution Pipeline Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Layers className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Stage Bottleneck Surveillance & SLA Resolution
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            {kpis.totalPendingWorkpackages} Pending Workpackages Across Active Portfolio
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {bottleneckStages.map((stage, idx) => (
            <div
              key={idx}
              className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                  <span className="font-bold text-sm text-slate-900">
                    {stage.stage}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                    {stage.count} Projects Queue
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                      stage.priority === "High"
                        ? "bg-rose-50 text-rose-700 border border-rose-200"
                        : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {stage.priority} Priority
                  </span>
                </div>

                <p className="text-xs text-slate-500">
                  {stage.desc}
                </p>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-600 font-mono pt-0.5">
                  <div className="flex items-center space-x-1.5">
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    <span>Lead: <strong>{stage.owner}</strong></span>
                  </div>

                  <div className="flex items-center space-x-1.5 text-indigo-700">
                    <Clock className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Target SLA: <strong>{stage.sla}</strong></span>
                  </div>
                </div>
              </div>

              <div className="shrink-0">
                <span className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-50 text-slate-700 border border-slate-200">
                  <span>Queue Monitored</span>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
