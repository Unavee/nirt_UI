import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, ShieldCheck, Zap, Activity, AlertTriangle, Plus, Trash2 } from "lucide-react";
import { FEASIBILITY_STATUSES } from "../../data/technicalFeasibilityData";

export default function FeasibilityAssessmentModal({
  isOpen,
  onClose,
  feasibilityRecord,
  project,
  onUpdateFeasibility
}) {
  const [status, setStatus] = useState(feasibilityRecord?.feasibilityStatus || "Approved");
  const [appDate, setAppDate] = useState(feasibilityRecord?.feasibilityAppDate || "2026-10-18");
  const [approvedCapacity, setApprovedCapacity] = useState(feasibilityRecord?.approvedCapacityKw || 3.3);
  const [approvalDate, setApprovalDate] = useState(feasibilityRecord?.approvalDate || "2026-10-25");
  const [sanctionRef, setSanctionRef] = useState(feasibilityRecord?.sanctionOrderRef || "TANG/SLM/AEE/TECH-SANCTION/2026/1089");
  const [officer, setOfficer] = useState(feasibilityRecord?.officerInCharge || "Er. K. Murugan, AEE / O&M");

  // Transformer & Grid
  const [dtName, setDtName] = useState(feasibilityRecord?.transformerRequirements?.dtName || "Fairlands DT-04 (11kV / 433V)");
  const [dtRating, setDtRating] = useState(feasibilityRecord?.transformerRequirements?.dtRatingKva || 250);
  const [existingSolar, setExistingSolar] = useState(feasibilityRecord?.transformerRequirements?.existingSolarConnectedKw || 105.5);
  const [voltageDrop, setVoltageDrop] = useState(feasibilityRecord?.lineRequirements?.voltageRegulationDrop || "1.4%");
  const [cableSpec, setCableSpec] = useState(feasibilityRecord?.lineRequirements?.serviceCableSpec || "2-Core 16 sq.mm Aluminium Armoured Cable");
  const [meterType, setMeterType] = useState(feasibilityRecord?.meterRequirements?.meterType || "Bidirectional DLMS Tri-Vector Smart Meter");

  // Additional Requirements list
  const [additionalReqs, setAdditionalReqs] = useState(feasibilityRecord?.additionalRequirements || []);
  const [newReqTitle, setNewReqTitle] = useState("");
  const [newReqCost, setNewReqCost] = useState("");

  // Rejection Details
  const [rejectionReason, setRejectionReason] = useState(feasibilityRecord?.rejectionDetails?.reason || "");
  const [rejectionActions, setRejectionActions] = useState(feasibilityRecord?.rejectionDetails?.correctiveActions || "");

  // DISCOM observations
  const [observations, setObservations] = useState(feasibilityRecord?.discomObservations || "");
  const [remarks, setRemarks] = useState(feasibilityRecord?.remarks || "");

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Add new requirement
  const handleAddRequirement = () => {
    if (!newReqTitle.trim()) return;
    const newReq = {
      id: `REQ-${Math.floor(100 + Math.random() * 900)}`,
      title: newReqTitle,
      desc: "Mandated during technical site inspection by DISCOM AEE.",
      status: "Complied",
      complianceDate: new Date().toISOString().split("T")[0],
      estimatedCost: parseFloat(newReqCost) || 5000
    };
    setAdditionalReqs([...additionalReqs, newReq]);
    setNewReqTitle("");
    setNewReqCost("");
  };

  const handleRemoveRequirement = (id) => {
    setAdditionalReqs(additionalReqs.filter(r => r.id !== id));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const maxHostingKw = dtRating * 0.75;
    const availableQuotaKw = Math.max(0, maxHostingKw - (parseFloat(existingSolar) + parseFloat(approvedCapacity)));

    setTimeout(() => {
      const updated = {
        ...feasibilityRecord,
        feasibilityStatus: status,
        feasibilityAppDate: appDate,
        approvedCapacityKw: parseFloat(approvedCapacity) || 3.3,
        approvalDate: status === "Approved" || status === "Conditional Approval" ? approvalDate : null,
        sanctionOrderRef: sanctionRef,
        officerInCharge: officer,
        additionalRequirements: additionalReqs,
        transformerRequirements: {
          ...feasibilityRecord?.transformerRequirements,
          dtName: dtName,
          dtRatingKva: parseFloat(dtRating),
          maxHostingCapacityKw: maxHostingKw,
          existingSolarConnectedKw: parseFloat(existingSolar),
          availableSolarQuotaKw: availableQuotaKw,
          isDtOverloaded: availableQuotaKw <= 0
        },
        meterRequirements: {
          ...feasibilityRecord?.meterRequirements,
          meterType: meterType
        },
        lineRequirements: {
          ...feasibilityRecord?.lineRequirements,
          voltageRegulationDrop: voltageDrop,
          serviceCableSpec: cableSpec
        },
        discomObservations: observations,
        remarks: remarks,
        rejectionDetails: {
          hasRejection: status === "Rejected",
          reason: status === "Rejected" ? rejectionReason : "",
          discomNoticeDate: status === "Rejected" ? new Date().toISOString().split("T")[0] : null,
          correctiveActions: status === "Rejected" ? rejectionActions : ""
        }
      };

      onUpdateFeasibility(updated);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Section 13
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Consumer No: {feasibilityRecord?.consumerNumber || project?.consumerNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Record Technical Feasibility & Grid Conditions
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {/* Feasibility Status Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Technical Feasibility Status (Section 13) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {FEASIBILITY_STATUSES.map((st) => {
                const isSelected = status === st.id;
                return (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => setStatus(st.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? st.id === "Approved"
                          ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200 text-emerald-900 font-bold"
                          : st.id === "Rejected"
                          ? "bg-rose-50 border-rose-300 ring-2 ring-rose-200 text-rose-900 font-bold"
                          : "bg-blue-50 border-blue-300 ring-2 ring-blue-200 text-blue-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                    }`}
                  >
                    <div className="text-xs font-bold">{st.label}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{st.desc}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 1: Dates & Approved Capacity */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Feasibility App Date *
              </label>
              <input
                type="date"
                value={appDate}
                onChange={(e) => setAppDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Approved Capacity (kWp) *
              </label>
              <input
                type="number"
                step="0.1"
                value={approvedCapacity}
                onChange={(e) => setApprovedCapacity(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Approval Date
              </label>
              <input
                type="date"
                value={approvalDate}
                onChange={(e) => setApprovalDate(e.target.value)}
                disabled={status === "Rejected"}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
              />
            </div>
          </div>

          {/* Transformer Quota Parameters */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>Distribution Transformer (DT) Hosting Quota (75% CEA Limit)</span>
              </span>
              <span className="text-[10px] text-slate-500 font-mono">Max: {dtRating * 0.75} kW</span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">DT Name / Code</label>
                <input
                  type="text"
                  value={dtName}
                  onChange={(e) => setDtName(e.target.value)}
                  placeholder="Fairlands DT-04"
                  className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">DT Rating (kVA)</label>
                <input
                  type="number"
                  value={dtRating}
                  onChange={(e) => setDtRating(e.target.value)}
                  placeholder="250"
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">Existing Solar (kW)</label>
                <input
                  type="number"
                  step="0.5"
                  value={existingSolar}
                  onChange={(e) => setExistingSolar(e.target.value)}
                  placeholder="105.5"
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>
            </div>
          </div>

          {/* Meter & Line Requirements */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bidirectional Meter Requirement
              </label>
              <input
                type="text"
                value={meterType}
                onChange={(e) => setMeterType(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Line Spec & Voltage Regulation
              </label>
              <input
                type="text"
                value={voltageDrop}
                onChange={(e) => setVoltageDrop(e.target.value)}
                placeholder="1.4% (< 3.0% limit)"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Additional Requirements Tracker */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Specific Additional Requirements Mandated by DISCOM
              </span>
              <span className="text-xs text-slate-500 font-mono">
                {additionalReqs.length} Recorded
              </span>
            </div>

            <div className="space-y-1.5">
              {additionalReqs.map((req) => (
                <div key={req.id} className="p-2.5 rounded-lg bg-white border border-slate-200 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{req.title}</div>
                    <div className="text-[11px] text-slate-500">{req.desc}</div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">Est Cost: ₹{req.estimatedCost?.toLocaleString("en-IN")}</div>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleRemoveRequirement(req.id)}
                    className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>

            {/* Quick Add Row */}
            <div className="flex items-center gap-2 pt-1">
              <input
                type="text"
                value={newReqTitle}
                onChange={(e) => setNewReqTitle(e.target.value)}
                placeholder="Add condition e.g. Neutral earthing rod or SPD..."
                className="flex-1 text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
              <input
                type="number"
                value={newReqCost}
                onChange={(e) => setNewReqCost(e.target.value)}
                placeholder="Cost (₹)"
                className="w-24 text-xs font-mono bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
              <button
                type="button"
                onClick={handleAddRequirement}
                className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg transition-colors flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </div>
          </div>

          {/* Conditional Rejection / Deficiency Notice */}
          {status === "Rejected" && (
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Technical Rejection / Network Deficiency Details</span>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  Rejection Reason *
                </label>
                <input
                  type="text"
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  placeholder="e.g. DT-04 has exceeded 75% reverse power hosting threshold"
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                  required={status === "Rejected"}
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  Required Technical Corrective Action
                </label>
                <textarea
                  value={rejectionActions}
                  onChange={(e) => setRejectionActions(e.target.value)}
                  rows={2}
                  placeholder="e.g. Request DT capacity enhancement to 500kVA or shift feeder connection..."
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* DISCOM Observations & Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              DISCOM Field AE Observations & Sanction Remarks
            </label>
            <textarea
              value={observations}
              onChange={(e) => setObservations(e.target.value)}
              rows={2}
              placeholder="Record technical observations made by AEE during field visit..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Saving..." : "Save Feasibility Stage"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
