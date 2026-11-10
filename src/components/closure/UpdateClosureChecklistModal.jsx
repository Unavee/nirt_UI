import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Award, Star, FileText, UserCheck, ShieldCheck } from "lucide-react";
import { BFRD_CLOSURE_CHECKLIST } from "@/data/projectClosureData";

export default function UpdateClosureChecklistModal({
  isOpen,
  onClose,
  closureData,
  onSaveClosure
}) {
  if (!isOpen || !closureData) return null;

  const [checklist, setChecklist] = useState(closureData.checklistState || {});
  const [rating, setRating] = useState(closureData.customerFeedback?.rating || 5);
  const [review, setReview] = useState(closureData.customerFeedback?.review || "");
  const [closureStatus, setClosureStatus] = useState(closureData.closureStatus || "closed");

  const toggleItem = (id) => {
    setChecklist((prev) => {
      const current = prev[id] || { checked: false };
      return {
        ...prev,
        [id]: {
          ...current,
          checked: !current.checked,
          verifiedDate: !current.checked ? new Date().toISOString().split("T")[0] : null
        }
      };
    });
  };

  const handleSave = (e) => {
    e.preventDefault();

    // Check if all 14 mandatory items are checked
    const allChecked = BFRD_CLOSURE_CHECKLIST.every(item => checklist[item.id]?.checked);
    const newStatus = allChecked ? "closed" : "pending_closure";

    const updated = {
      ...closureData,
      closureStatus: newStatus,
      actualClosureDate: newStatus === "closed" ? new Date().toISOString().split("T")[0] : null,
      checklistState: checklist,
      customerFeedback: {
        ...closureData.customerFeedback,
        rating,
        review
      }
    };

    onSaveClosure(updated);
    onClose();
  };

  const checkedCount = BFRD_CLOSURE_CHECKLIST.filter(item => checklist[item.id]?.checked).length;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                14-Point Project Closure Audit Checklist
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {closureData.projectId} • {checkedCount} of 14 Completed
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
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Progress Header */}
          <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl flex items-center justify-between text-xs">
            <span className="font-semibold text-slate-700">
              Mandatory Closure Governance Gate (BFRD Section 22):
            </span>
            <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
              checkedCount === 14 ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"
            }`}>
              {checkedCount}/14 Cleared
            </span>
          </div>

          {/* Checklist Items */}
          <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
            {BFRD_CLOSURE_CHECKLIST.map((item) => {
              const isChecked = !!checklist[item.id]?.checked;

              return (
                <div
                  key={item.id}
                  onClick={() => toggleItem(item.id)}
                  className={`p-3 rounded-xl border flex items-start gap-3 cursor-pointer transition-all select-none ${
                    isChecked
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-white border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => {}} // handled by parent onClick
                    className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 shrink-0 mt-0.5"
                  />
                  <div className="flex-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-slate-900">{item.title}</span>
                      <span className="text-[10px] font-mono text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                        {item.sectionRef}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Customer Feedback Rating (CSAT) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800">
                14. Customer Feedback & CSAT Rating
              </span>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    type="button"
                    key={star}
                    onClick={() => setRating(star)}
                    className="p-1 hover:scale-110 transition-transform"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        star <= rating ? "text-emerald-500 fill-emerald-500" : "text-slate-300"
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-[11px] text-slate-500 mb-1">
                Customer Testimonial Statement
              </label>
              <textarea
                rows={2}
                value={review}
                onChange={(e) => setReview(e.target.value)}
                placeholder="Customer review regarding installation and savings..."
                className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800"
              />
            </div>
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
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Closure Audit</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
