import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Calendar, ShieldCheck, UserCheck, FileText } from "lucide-react";
import { INSPECTION_STATUS_STAGES } from "@/data/inspectionData";

export default function InspectionStatusModal({
  isOpen,
  onClose,
  inspectionData,
  onUpdateInspection
}) {
  if (!isOpen || !inspectionData) return null;

  const [status, setStatus] = useState(inspectionData.currentStatus || "scheduled");
  const [scheduledDate, setScheduledDate] = useState(inspectionData.dates?.scheduledDate || "");
  const [actualInspectionDate, setActualInspectionDate] = useState(
    inspectionData.dates?.actualInspectionDate || new Date().toISOString().split("T")[0]
  );
  const [approvalDate, setApprovalDate] = useState(inspectionData.dates?.approvalDate || "");
  const [commissioningDate, setCommissioningDate] = useState(inspectionData.dates?.commissioningDate || "");
  const [rectificationDone, setRectificationDone] = useState(!inspectionData.rectificationDetails?.required || inspectionData.rectificationDetails?.status === "Resolved");
  const [rectificationNotes, setRectificationNotes] = useState(inspectionData.rectificationDetails?.description || "");
  const [commissioningReading, setCommissioningReading] = useState(inspectionData.commissioningReport?.initialGenerationReading || "000005.0 kWh");

  const handleSave = (e) => {
    e.preventDefault();

    const selectedStage = INSPECTION_STATUS_STAGES.find(s => s.id === status);
    const stepNum = selectedStage ? selectedStage.step : 2;

    const updatedInspection = {
      ...inspectionData,
      currentStatus: status,
      statusStep: stepNum,
      dates: {
        ...inspectionData.dates,
        scheduledDate,
        actualInspectionDate: (status !== "requested" && status !== "scheduled") ? actualInspectionDate : null,
        approvalDate: (status === "approved" || status === "commissioned") ? (approvalDate || new Date().toISOString().split("T")[0]) : null,
        commissioningDate: status === "commissioned" ? (commissioningDate || new Date().toISOString().split("T")[0]) : null
      },
      rectificationDetails: {
        ...inspectionData.rectificationDetails,
        status: rectificationDone ? "Resolved" : "In Progress",
        description: rectificationNotes,
        rectificationEvidenceUploaded: rectificationDone
      },
      commissioningReport: {
        ...inspectionData.commissioningReport,
        initialGenerationReading: commissioningReading,
        status: status === "commissioned" ? "Commissioned & Energized" : inspectionData.commissioningReport?.status
      }
    };

    onUpdateInspection(updatedInspection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Update Inspection & Commissioning Stage
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {inspectionData.projectId} • {inspectionData.capacity}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Status Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Current Statutory Stage
            </label>
            <select
              value={status}
              onChange={(e) => {
                const newSt = e.target.value;
                setStatus(newSt);
                if (newSt === "approved" && !approvalDate) {
                  setApprovalDate(new Date().toISOString().split("T")[0]);
                }
                if (newSt === "commissioned" && !commissioningDate) {
                  setCommissioningDate(new Date().toISOString().split("T")[0]);
                }
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {INSPECTION_STATUS_STAGES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} — {st.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Scheduled Inspection Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={scheduledDate || ""}
                  onChange={(e) => setScheduledDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Actual Inspection Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={actualInspectionDate || ""}
                  onChange={(e) => setActualInspectionDate(e.target.value)}
                  disabled={status === "requested" || status === "scheduled"}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                CEIG Approval Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={approvalDate || ""}
                  onChange={(e) => setApprovalDate(e.target.value)}
                  disabled={status !== "approved" && status !== "commissioned"}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Grid Commissioning Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={commissioningDate || ""}
                  onChange={(e) => setCommissioningDate(e.target.value)}
                  disabled={status !== "commissioned"}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Rectification Checkbox & Description */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                Snag / Rectification Status
              </span>
              <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-emerald-700">
                <input
                  type="checkbox"
                  checked={rectificationDone}
                  onChange={(e) => setRectificationDone(e.target.checked)}
                  className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Mark All Rectifications Resolved</span>
              </label>
            </div>
            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                Rectification Description / Notice
              </label>
              <input
                type="text"
                value={rectificationNotes}
                onChange={(e) => setRectificationNotes(e.target.value)}
                placeholder="e.g. Bilingual 415V caution plate affixed..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Meter Reading */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Initial Net Meter Test Reading (kWh)
            </label>
            <input
              type="text"
              value={commissioningReading}
              onChange={(e) => setCommissioningReading(e.target.value)}
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Inspection Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
