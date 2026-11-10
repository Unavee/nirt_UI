import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Calendar, Gift, FileText, Building2, DollarSign } from "lucide-react";
import { SUBSIDY_STAGES } from "@/data/subsidyData";

export default function UpdateSubsidyModal({
  isOpen,
  onClose,
  subsidyData,
  onUpdateSubsidy
}) {
  if (!isOpen || !subsidyData) return null;

  const [status, setStatus] = useState(subsidyData.currentStatus || "approved");
  const [appNumber, setAppNumber] = useState(subsidyData.application?.portalApplicationNumber || "");
  const [approvalDate, setApprovalDate] = useState(subsidyData.application?.approvalDate || "");
  const [receiptDate, setReceiptDate] = useState(subsidyData.application?.receiptDate || "");
  const [actualReceived, setActualReceived] = useState(subsidyData.actualSubsidyReceived || 78000);
  const [dbtUtr, setDbtUtr] = useState(subsidyData.application?.dbtUtrNumber || "");
  const [remarks, setRemarks] = useState(subsidyData.auditRemarks || "");

  const handleSave = (e) => {
    e.preventDefault();

    const selectedStage = SUBSIDY_STAGES.find(s => s.id === status);
    const stepNum = selectedStage ? selectedStage.step : 5;

    const updated = {
      ...subsidyData,
      currentStatus: status,
      statusStep: stepNum,
      actualSubsidyReceived: status === "subsidy_received" ? Number(actualReceived) : subsidyData.actualSubsidyReceived,
      application: {
        ...subsidyData.application,
        portalApplicationNumber: appNumber,
        approvalDate,
        receiptDate: status === "subsidy_received" ? (receiptDate || new Date().toISOString().split("T")[0]) : null,
        dbtUtrNumber: dbtUtr
      },
      auditRemarks: remarks
    };

    onUpdateSubsidy(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Update PM Surya Ghar Subsidy Stage
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {subsidyData.projectId} • CFA Cap: ₹{subsidyData.eligibleAmount?.toLocaleString()}
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
          {/* Stage Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              National Portal Subsidy Stage
            </label>
            <select
              value={status}
              onChange={(e) => {
                const newSt = e.target.value;
                setStatus(newSt);
                if (newSt === "approved" && !approvalDate) {
                  setApprovalDate(new Date().toISOString().split("T")[0]);
                }
                if (newSt === "subsidy_received" && !receiptDate) {
                  setReceiptDate(new Date().toISOString().split("T")[0]);
                }
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {SUBSIDY_STAGES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} — {st.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Application Number */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              National Portal Application Number
            </label>
            <input
              type="text"
              value={appNumber}
              onChange={(e) => setAppNumber(e.target.value)}
              placeholder="e.g. PMSGY-TN-SLM-2026-90412"
              className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
            />
          </div>

          {/* Dates Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Approval Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={approvalDate || ""}
                  onChange={(e) => setApprovalDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bank Credit Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={receiptDate || ""}
                  onChange={(e) => setReceiptDate(e.target.value)}
                  disabled={status !== "subsidy_received"}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono disabled:bg-slate-50 disabled:text-slate-400"
                />
              </div>
            </div>
          </div>

          {/* Actual Received Amount & DBT UTR */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Subsidy Disbursed (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  value={actualReceived}
                  onChange={(e) => setActualReceived(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono font-bold"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                PFMS / DBT Reference UTR
              </label>
              <input
                type="text"
                value={dbtUtr}
                onChange={(e) => setDbtUtr(e.target.value)}
                placeholder="e.g. PFMS-DBT-2026-7789012"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
              />
            </div>
          </div>

          {/* Audit Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Subsidy Audit Remarks & Verification Notes
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Bank passbook verified on PFMS, joint commissioning report cleared..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
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
              <span>Save Subsidy Status</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
