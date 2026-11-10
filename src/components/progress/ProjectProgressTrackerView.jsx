import React, { useState } from "react";
import {
  Activity,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Layers,
  FileText,
  UserCheck,
  ChevronRight,
  TrendingUp,
  ShieldCheck,
  Zap,
  Award
} from "lucide-react";
import { BFRD_PROGRESS_STAGES } from "@/data/projectProgressData";

export default function ProjectProgressTrackerView({
  progressData,
  onOpenUpdateModal
}) {
  const [filter, setFilter] = useState("all");

  if (!progressData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <Activity className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Progress Record Found</h3>
      </div>
    );
  }

  const stages = progressData.stages || [];
  const completedCount = stages.filter(s => s.status === "completed").length;
  const inProgressCount = stages.filter(s => s.status === "in_progress").length;
  const pendingCount = stages.filter(s => s.status === "pending").length;
  const delayedCount = stages.filter(s => s.status === "delayed").length;
  const totalStages = BFRD_PROGRESS_STAGES.length; // 15
  const overallPercentage = Math.round((completedCount / totalStages) * 100);

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "Completed"
        };
      case "in_progress":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />,
          label: "In Progress"
        };
      case "delayed":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "Delayed"
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-400" />,
          label: "Pending"
        };
    }
  };

  const filteredStages = BFRD_PROGRESS_STAGES.filter((meta) => {
    const stageData = stages.find(s => s.id === meta.id) || { status: "pending" };
    if (filter === "all") return true;
    return stageData.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Overview & Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {progressData.projectId}
              </span>
              <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-50 text-blue-800 border-blue-200 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                <span>STAGE {progressData.currentStageNumber} OF 15</span>
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                🎯 Target Handover: {progressData.targetHandoverDate}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              End-to-End 15-Stage Project Progress Tracker
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{progressData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{progressData.capacity}</strong></span>
              <span>•</span>
              <span>BFRD Section 17 Standard Governance</span>
            </p>
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Overall Progress</span>
              <span className="text-2xl font-mono font-black text-blue-700">{overallPercentage}%</span>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 font-bold">
              <TrendingUp className="w-7 h-7" />
            </div>
          </div>
        </div>

        {/* 4 Summary Stat Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">1. Completed</span>
            <div className="text-xl font-mono font-bold text-emerald-700 mt-1">
              {completedCount} <span className="text-xs font-normal text-slate-500">/ 15 Stages</span>
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">✓ Ahead of Schedule</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">2. In Progress</span>
            <div className="text-xl font-mono font-bold text-blue-700 mt-1">
              {inProgressCount} <span className="text-xs font-normal text-slate-500">Stage Active</span>
            </div>
            <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">⚙️ Stage 10: Installation</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">3. Pending</span>
            <div className="text-xl font-mono font-bold text-slate-700 mt-1">
              {pendingCount} <span className="text-xs font-normal text-slate-500">Upcoming</span>
            </div>
            <span className="text-[10px] text-slate-500 font-semibold block mt-0.5">Inspection to Handover</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">4. SLA Health</span>
            <div className="text-xl font-mono font-bold text-emerald-700 mt-1">
              {delayedCount === 0 ? "0 Delays" : `${delayedCount} Delayed`}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">✓ 100% On-Time Execution</span>
          </div>
        </div>

        {/* 15-Stage Horizontal Stepper */}
        <div className="mt-6 pt-6 border-t border-slate-100">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-blue-600" />
              15-Stage Lifecycle Flow
            </span>
            <span className="text-xs font-mono text-slate-500">
              {completedCount} of 15 completed ({overallPercentage}%)
            </span>
          </div>

          <div className="relative overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="flex items-center min-w-[900px] justify-between">
              {BFRD_PROGRESS_STAGES.map((meta, idx) => {
                const stageData = stages.find(s => s.id === meta.id) || { status: "pending" };
                const isCompleted = stageData.status === "completed";
                const isInProgress = stageData.status === "in_progress";

                return (
                  <div key={meta.id} className="flex items-center flex-1 last:flex-none">
                    <div
                      onClick={() => onOpenUpdateModal(stageData)}
                      className="group cursor-pointer flex flex-col items-center text-center relative"
                      title={`${meta.stageNumber}. ${meta.name} (${stageData.status})`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold transition-all shadow-xs ${
                          isCompleted
                            ? "bg-emerald-600 text-white"
                            : isInProgress
                            ? "bg-blue-600 text-white ring-4 ring-blue-100"
                            : "bg-slate-200 text-slate-600 group-hover:bg-slate-300"
                        }`}
                      >
                        {isCompleted ? <CheckCircle2 className="w-4 h-4" /> : meta.stageNumber}
                      </div>
                      <span className="text-[10px] font-medium text-slate-600 mt-1 max-w-[60px] truncate block">
                        {meta.name.split(" ")[0]}
                      </span>
                    </div>

                    {idx < BFRD_PROGRESS_STAGES.length - 1 && (
                      <div
                        className={`h-0.5 flex-1 mx-1 transition-colors ${
                          isCompleted ? "bg-emerald-500" : "bg-slate-200"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* 2. 15-Stage Detail Ledger Table */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Activity className="w-4 h-4 text-blue-600" />
              15 Sequential Stages & Regulatory Milestones
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Click any stage row or button to update status, completion dates, and audit remarks
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: "all", label: `All (15)` },
              { id: "completed", label: `Completed (${completedCount})` },
              { id: "in_progress", label: `In Progress (${inProgressCount})` },
              { id: "pending", label: `Pending (${pendingCount})` }
            ].map((f) => (
              <button
                key={f.id}
                onClick={() => setFilter(f.id)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors ${
                  filter === f.id
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3.5 border-r border-slate-200 text-center w-12">#</th>
                  <th className="p-3.5 border-r border-slate-200">Lifecycle Milestone</th>
                  <th className="p-3.5 border-r border-slate-200">Department & Responsible Role</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">SLA</th>
                  <th className="p-3.5 border-r border-slate-200">Dates (Start / Done)</th>
                  <th className="p-3.5 border-r border-slate-200">Reference Doc / UTR</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Status</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredStages.map((meta) => {
                  const stageData = stages.find(s => s.id === meta.id) || {
                    stageNumber: meta.stageNumber,
                    id: meta.id,
                    status: "pending",
                    startDate: null,
                    completionDate: null,
                    referenceDoc: "Awaiting Preceding Stage",
                    remarks: ""
                  };
                  const badge = getStatusBadge(stageData.status);

                  return (
                    <tr key={meta.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Step Number */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono font-bold text-slate-700">
                        {meta.stageNumber}
                      </td>

                      {/* Stage Name */}
                      <td className="p-3.5 border-r border-slate-100 max-w-xs">
                        <div className="font-bold text-slate-900">{meta.name}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1">{meta.description}</div>
                      </td>

                      {/* Department & Role */}
                      <td className="p-3.5 border-r border-slate-100">
                        <div className="font-semibold text-slate-800">{meta.department}</div>
                        <div className="text-[11px] text-slate-500">{meta.responsibleRole}</div>
                      </td>

                      {/* SLA */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono font-semibold text-slate-700">
                        {meta.slaDays}d
                      </td>

                      {/* Dates */}
                      <td className="p-3.5 border-r border-slate-100 font-mono text-[11px]">
                        {stageData.completionDate ? (
                          <div className="text-emerald-700 font-semibold">Done: {stageData.completionDate}</div>
                        ) : stageData.startDate ? (
                          <div className="text-blue-700 font-semibold">Started: {stageData.startDate}</div>
                        ) : (
                          <span className="text-slate-400">Scheduled</span>
                        )}
                      </td>

                      {/* Reference Doc */}
                      <td className="p-3.5 border-r border-slate-100 font-mono text-[11px] text-slate-700">
                        <span className="bg-slate-100 px-2 py-0.5 rounded border border-slate-200">
                          {stageData.referenceDoc || "—"}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="p-3.5 border-r border-slate-100 text-center whitespace-nowrap">
                        <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${badge.bg}`}>
                          {badge.icon}
                          <span>{badge.label}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <button
                          onClick={() => onOpenUpdateModal(stageData)}
                          className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors inline-flex items-center gap-1"
                        >
                          <span>Update</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
