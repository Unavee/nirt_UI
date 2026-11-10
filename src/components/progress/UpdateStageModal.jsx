import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Calendar, FileText, UserCheck, Activity } from "lucide-react";
import { BFRD_PROGRESS_STAGES } from "@/data/projectProgressData";

export default function UpdateStageModal({
  isOpen,
  onClose,
  targetStage,
  projectId,
  onSaveStage
}) {
  if (!isOpen || !targetStage) return null;

  const stageMeta = BFRD_PROGRESS_STAGES.find(s => s.id === targetStage.id) || {};

  const [status, setStatus] = useState(targetStage.status || "pending");
  const [startDate, setStartDate] = useState(targetStage.startDate || new Date().toISOString().split("T")[0]);
  const [completionDate, setCompletionDate] = useState(targetStage.completionDate || "");
  const [referenceDoc, setReferenceDoc] = useState(targetStage.referenceDoc || "");
  const [remarks, setRemarks] = useState(targetStage.remarks || "");

  const handleSave = (e) => {
    e.preventDefault();
    onSaveStage({
      ...targetStage,
      status,
      startDate: status === "pending" ? null : startDate,
      completionDate: status === "completed" ? (completionDate || new Date().toISOString().split("T")[0]) : null,
      referenceDoc,
      remarks
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Update Milestone Stage {targetStage.stageNumber}: {stageMeta.name}
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {projectId} • {stageMeta.department}
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
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Stage Status */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Milestone Status
            </label>
            <select
              value={status}
              onChange={(e) => {
                const newSt = e.target.value;
                setStatus(newSt);
                if (newSt === "completed" && !completionDate) {
                  setCompletionDate(new Date().toISOString().split("T")[0]);
                }
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              <option value="completed">✅ Completed & Verified</option>
              <option value="in_progress">⚙️ In Progress</option>
              <option value="pending">⏳ Pending (Not Started)</option>
              <option value="delayed">⚠️ Delayed / SLA Escalation</option>
            </select>
          </div>

          {/* Dates Row */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Start Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={startDate || ""}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Completion Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={completionDate || ""}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  disabled={status !== "completed"}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Reference Document / Transaction */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reference Document / ID / UTR Number
            </label>
            <div className="relative">
              <FileText className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                value={referenceDoc}
                onChange={(e) => setReferenceDoc(e.target.value)}
                placeholder="e.g. Sanction #TNEB-FS-2026-0814 or UTR: HDFC..."
                className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
              />
            </div>
          </div>

          {/* Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Progress Remarks & Milestone Audit Notes
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="Milestone verification details or reasons for delay..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Responsible Team Info */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span>Responsible: <strong>{stageMeta.responsibleRole}</strong></span>
            <span className="font-mono text-blue-700 font-bold">SLA: {stageMeta.slaDays} Days</span>
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
              <span>Update Stage</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
