import React, { useState } from "react";
import { 
  X, CheckCircle2, AlertTriangle, ShieldCheck, 
  RotateCcw, FileText, User, Calendar, Clock, 
  Building, IndianRupee, ArrowRight
} from "lucide-react";
import Portal from "@/components/Portal";
import { useRole } from "@/context/RoleContext";

export default function ApprovalDecisionModal({
  isOpen,
  request,
  onClose,
  onSubmitDecision
}) {
  const { activeRole } = useRole();
  const [decision, setDecision] = useState("Approved");
  const [remarks, setRemarks] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  if (!isOpen || !request) return null;

  const currentDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const currentTime = new Date().toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit"
  }) + " IST";

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!remarks.trim()) {
      setErrorMsg("Please provide an explicit remark or justification before recording your decision.");
      return;
    }

    const decisionRecord = {
      approver: activeRole?.title?.split("/")[0]?.trim() || "Er. A. Syed",
      approverRole: activeRole?.title || "Super Admin / Management",
      date: currentDate,
      time: currentTime,
      decision,
      remarks: remarks.trim()
    };

    onSubmitDecision(request.id, decisionRecord);
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                  {request.id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                  Section 33 • Approval Action
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                {request.title}
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Project: {request.projectId} • {request.customerName} ({request.branch})
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            
            {/* Request Summary Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Requisition Summary
              </span>
              <div className="grid grid-cols-2 gap-2 text-slate-700 font-mono text-[11px]">
                <div>
                  <span className="text-slate-400 block text-[9px]">REQUESTED BY:</span>
                  <strong>{request.requestedBy.name} ({request.requestedBy.role})</strong>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">DATE & TIME:</span>
                  <strong>{request.requestedBy.date} • {request.requestedBy.time}</strong>
                </div>
              </div>
            </div>

            {/* 3 Decision Choice Buttons */}
            <div>
              <label className="font-bold text-slate-800 block mb-1.5">
                Select Your Decision (Recorded to Permanent Audit Log)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setDecision("Approved")}
                  className={`p-3 rounded-2xl text-center border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all ${
                    decision === "Approved"
                      ? "bg-emerald-600 text-white border-emerald-600 shadow-sm"
                      : "bg-white text-emerald-800 border-emerald-200 hover:bg-emerald-50"
                  }`}
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Request</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision("Returned for Changes")}
                  className={`p-3 rounded-2xl text-center border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all ${
                    decision === "Returned for Changes"
                      ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                      : "bg-white text-blue-800 border-blue-200 hover:bg-blue-50"
                  }`}
                >
                  <RotateCcw className="w-4 h-4" />
                  <span>Request Revisions</span>
                </button>

                <button
                  type="button"
                  onClick={() => setDecision("Rejected")}
                  className={`p-3 rounded-2xl text-center border font-bold text-xs flex flex-col items-center justify-center space-y-1 transition-all ${
                    decision === "Rejected"
                      ? "bg-rose-600 text-white border-rose-600 shadow-sm"
                      : "bg-white text-rose-800 border-rose-200 hover:bg-rose-50"
                  }`}
                >
                  <AlertTriangle className="w-4 h-4" />
                  <span>Reject Request</span>
                </button>
              </div>
            </div>

            {/* Mandatory Remarks */}
            <div>
              <label className="font-bold text-slate-800 block mb-1">
                Decision Remarks & Justification <span className="text-rose-600">* (Mandatory)</span>
              </label>
              <textarea
                rows={3}
                value={remarks}
                onChange={(e) => {
                  setRemarks(e.target.value);
                  if (errorMsg) setErrorMsg("");
                }}
                placeholder={
                  decision === "Approved"
                    ? "Enter commercial / engineering clearance justification, reference PO/UTR if applicable..."
                    : decision === "Returned for Changes"
                    ? "Specify the exact pricing, drawing, or document amendments required from the applicant..."
                    : "State the mandatory rejection reason for PMO compliance record..."
                }
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
              />
              {errorMsg && (
                <p className="text-[11px] text-rose-600 font-semibold mt-1">{errorMsg}</p>
              )}
            </div>

            {/* 5 Traceable Parameters Live Preview */}
            <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80 text-[11px] font-mono space-y-1">
              <span className="font-bold text-blue-900 block text-[10px] uppercase">
                Traceable Audit Snapshot Recorded
              </span>
              <div className="grid grid-cols-2 gap-x-2 gap-y-1 text-slate-700">
                <div>Approver: <strong>{activeRole?.title?.split("/")[0] || "Er. A. Syed"}</strong></div>
                <div>Role: <strong>{activeRole?.title || "Super Admin"}</strong></div>
                <div>Date: <strong>{currentDate}</strong></div>
                <div>Time: <strong>{currentTime}</strong></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className={`apple-button px-5 py-2.5 rounded-xl text-xs font-bold text-white shadow-sm flex items-center space-x-2 ${
                  decision === "Approved" ? "bg-emerald-600 hover:bg-emerald-700"
                    : decision === "Returned for Changes" ? "bg-blue-600 hover:bg-blue-700"
                    : "bg-rose-600 hover:bg-rose-700"
                }`}
              >
                <ShieldCheck className="w-4 h-4 text-white" />
                <span>Confirm & Sign Decision ({decision})</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </Portal>
  );
}
