"use client";

import React, { useState } from "react";
import { useRole } from "@/context/RoleContext";
import { X, ShieldAlert, ArrowRight, Check } from "lucide-react";

export function EditWithReasonModal({ 
  isOpen, 
  onClose, 
  project = null, 
  fieldName = "Sanctioned Load (kW)", 
  currentValue = "5 kW", 
  stepName = "Step 02: Qualification",
  onSaved = () => {} 
}) {
  const { activeRole, addAuditEntry } = useRole();
  const [newValue, setNewValue] = useState("");
  const [reason, setReason] = useState("");
  const [error, setError] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newValue.trim()) {
      setError("Please specify the revised new value.");
      return;
    }
    if (!reason.trim() || reason.trim().length < 8) {
      setError("Mandatory Reason must be clear (minimum 8 characters).");
      return;
    }

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: project?.id || "NIRT-2610-0042",
      clientName: project?.clientName || "Sri Vignesh Textiles",
      step: stepName,
      field: fieldName,
      oldValue: currentValue,
      newValue: newValue,
      reason: reason
    });

    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      onSaved({ fieldName, newValue, reason });
      onClose();
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="flex items-start justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
              <ShieldAlert className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 tracking-tight">
                Mandatory Edit with Reason
              </h3>
              <p className="text-xs text-slate-500">System Audit Log Protocol</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="apple-button p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Target Field:</span>
              <span className="font-semibold text-slate-800">{fieldName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Current Saved Value:</span>
              <span className="font-mono font-medium text-slate-900">{currentValue}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Authorizing Staff:</span>
              <span className="text-slate-800">{activeRole.title.split("/")[0]}</span>
            </div>
          </div>

          {error && (
            <p className="text-xs text-rose-600 bg-rose-50 p-2.5 rounded-xl border border-rose-200">
              {error}
            </p>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              New Corrected Value <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              value={newValue}
              onChange={(e) => {
                setNewValue(e.target.value);
                setError("");
              }}
              placeholder="e.g. 25 kW or Corrected Consumer #"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-slate-700">
              Mandatory Operational Reason for Edit <span className="text-rose-500">*</span>
            </label>
            <textarea
              rows={3}
              value={reason}
              onChange={(e) => {
                setReason(e.target.value);
                setError("");
              }}
              placeholder="State the verifiable reason (e.g. Typo corrected based on latest EB card physical verification)"
              className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={isSuccess}
              className={`apple-button w-full py-3 px-4 rounded-2xl text-sm font-semibold text-white shadow-md flex items-center justify-center space-x-2 transition-all ${
                isSuccess 
                  ? "bg-emerald-600 shadow-emerald-600/20" 
                  : "bg-slate-900 hover:bg-black shadow-slate-900/20"
              }`}
            >
              {isSuccess ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Audit Entry Recorded & Saved</span>
                </>
              ) : (
                <>
                  <span>Save Update to Audit Log</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
