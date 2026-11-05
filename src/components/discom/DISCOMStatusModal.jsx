import React, { useState } from "react";
import { X, CheckCircle2, AlertCircle, Building2, Zap, FileText, ArrowRight, ShieldCheck, AlertTriangle } from "lucide-react";
import { DISCOM_STATUS_STAGES, DISCOM_LIST } from "../../data/discomApplicationsData";

export default function DISCOMStatusModal({
  isOpen,
  onClose,
  discomApp,
  project,
  onUpdateDISCOM
}) {
  const [status, setStatus] = useState(discomApp?.applicationStatus || "approved");
  const [appNumber, setAppNumber] = useState(discomApp?.applicationNumber || "TANG/SLM/2026/0411");
  const [appDate, setAppDate] = useState(discomApp?.applicationDate || "2026-10-14");
  const [discomName, setDiscomName] = useState(discomApp?.discom || DISCOM_LIST[0]);
  const [divisionSection, setDivisionSection] = useState(discomApp?.divisionSection || "Salem Urban / Fairlands Section - O&M");
  const [capacity, setCapacity] = useState(discomApp?.appliedCapacityKw || 3.3);
  const [feeAmount, setFeeAmount] = useState(discomApp?.applicationFee || 1180);
  const [feeUtr, setFeeUtr] = useState(discomApp?.feePayment?.utr || "TANGEDCO-PAY-984128");
  const [feeMode, setFeeMode] = useState(discomApp?.feePayment?.mode || "Online Net Banking");

  // Approval fields
  const [approvalDate, setApprovalDate] = useState(discomApp?.approvalDate || "2026-10-25");
  const [sanctionNumber, setSanctionNumber] = useState(discomApp?.sanctionOrderNumber || "TANG/SLM/AEE/TECH-SANCTION/2026/1089");
  const [officer, setOfficer] = useState(discomApp?.officerInCharge || "Er. K. Murugan, AEE / O&M");

  // Rejection fields
  const [rejectionReason, setRejectionReason] = useState(discomApp?.rejectionDetails?.reasonCode || "Transformer capacity quota exhausted on DT-04");
  const [rejectionRemarks, setRejectionRemarks] = useState(discomApp?.rejectionDetails?.remarks || "");
  const [remarks, setRemarks] = useState(discomApp?.remarks || "Technical feasibility verified.");

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

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const updated = {
        ...discomApp,
        applicationStatus: status,
        applicationNumber: appNumber,
        applicationDate: appDate,
        discom: discomName,
        divisionSection: divisionSection,
        appliedCapacityKw: parseFloat(capacity) || 3.3,
        sanctionedCapacityKw: status === "approved" ? parseFloat(capacity) : discomApp?.sanctionedCapacityKw,
        applicationFee: parseFloat(feeAmount) || 1180,
        feePayment: {
          mode: feeMode,
          utr: feeUtr,
          paymentDate: appDate,
          receiptNumber: discomApp?.feePayment?.receiptNumber || "RCPT-TANG-8921",
          status: "Paid & Verified"
        },
        approvalDate: status === "approved" ? approvalDate : null,
        sanctionOrderNumber: status === "approved" ? sanctionNumber : null,
        officerInCharge: officer,
        rejectionDetails: {
          hasRejection: status === "rejected",
          reasonCode: status === "rejected" ? rejectionReason : "",
          remarks: status === "rejected" ? rejectionRemarks : "",
          noticeDate: status === "rejected" ? new Date().toISOString().split("T")[0] : null,
          resubmissionDate: status === "resubmission" ? new Date().toISOString().split("T")[0] : null
        },
        remarks: remarks
      };

      onUpdateDISCOM(updated);
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
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Section 12
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Consumer No: {discomApp?.consumerNumber || project?.consumerNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Update DISCOM Application & Lifecycle Stage
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
          {/* Status Stage Selector (All 7 Stages) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Application Lifecycle Stage (Section 12 Workflow) *
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {DISCOM_STATUS_STAGES.map((st) => {
                const isSelected = status === st.id;
                return (
                  <button
                    type="button"
                    key={st.id}
                    onClick={() => setStatus(st.id)}
                    className={`p-2.5 rounded-xl border text-left transition-all ${
                      isSelected
                        ? st.id === "approved"
                          ? "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-200 text-emerald-900 font-bold"
                          : st.id === "rejected"
                          ? "bg-rose-50 border-rose-300 ring-2 ring-rose-200 text-rose-900 font-bold"
                          : "bg-blue-50 border-blue-300 ring-2 ring-blue-200 text-blue-900 font-bold"
                        : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100 font-medium"
                    }`}
                  >
                    <div className="text-[10px] font-mono text-slate-400">Stage {st.step}</div>
                    <div className="text-xs mt-0.5">{st.label}</div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Row 1: Application Number & Filing Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                DISCOM Application Number *
              </label>
              <input
                type="text"
                value={appNumber}
                onChange={(e) => setAppNumber(e.target.value)}
                placeholder="e.g. TANG/SLM/2026/0411"
                className="w-full text-xs font-mono font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Application Filing Date *
              </label>
              <input
                type="date"
                value={appDate}
                onChange={(e) => setAppDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Row 2: DISCOM & Division/Section */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                DISCOM Authority
              </label>
              <select
                value={discomName}
                onChange={(e) => setDiscomName(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {DISCOM_LIST.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Division / Section
              </label>
              <input
                type="text"
                value={divisionSection}
                onChange={(e) => setDivisionSection(e.target.value)}
                placeholder="e.g. Salem Urban / Fairlands Section"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 3: Applied Capacity & Fee Details */}
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Applied Capacity (kWp)
              </label>
              <input
                type="number"
                step="0.1"
                value={capacity}
                onChange={(e) => setCapacity(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Application Fee (₹)
              </label>
              <input
                type="number"
                value={feeAmount}
                onChange={(e) => setFeeAmount(e.target.value)}
                placeholder="1180"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Fee Payment UTR / Ref
              </label>
              <input
                type="text"
                value={feeUtr}
                onChange={(e) => setFeeUtr(e.target.value)}
                placeholder="e.g. TANG-PAY-984128"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Conditional Approval Box */}
          {status === "approved" && (
            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Technical Feasibility Sanction Order Details</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                    Approval Date *
                  </label>
                  <input
                    type="date"
                    value={approvalDate}
                    onChange={(e) => setApprovalDate(e.target.value)}
                    className="w-full text-xs bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                    Sanction Order Number *
                  </label>
                  <input
                    type="text"
                    value={sanctionNumber}
                    onChange={(e) => setSanctionNumber(e.target.value)}
                    placeholder="e.g. TANG/SLM/AEE/TECH-SANCTION/2026/1089"
                    className="w-full text-xs font-mono bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                  />
                </div>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-emerald-900 mb-1">
                  Sanctioning Officer & Designation
                </label>
                <input
                  type="text"
                  value={officer}
                  onChange={(e) => setOfficer(e.target.value)}
                  placeholder="e.g. Er. K. Murugan, AEE / O&M / Fairlands"
                  className="w-full text-xs bg-white border border-emerald-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* Conditional Rejection Box */}
          {status === "rejected" && (
            <div className="p-4 rounded-xl border border-rose-200 bg-rose-50/50 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-rose-900 uppercase tracking-wider">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>DISCOM Rejection & Deficiency Details</span>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  Rejection Reason Code *
                </label>
                <select
                  value={rejectionReason}
                  onChange={(e) => setRejectionReason(e.target.value)}
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg px-2.5 py-1.5 text-slate-800"
                >
                  <option value="Transformer capacity quota exhausted on DT">Transformer capacity quota exhausted (&gt;75% DT hosting limit)</option>
                  <option value="Mismatch in Consumer Name vs Property Deed">Mismatch in Consumer Name vs Property Deed / Tax Receipt</option>
                  <option value="SLD Drawing non-compliant with CEA standards">SLD Drawing non-compliant with CEA standards</option>
                  <option value="Arrears pending on EB Service Number">Arrears / Tariff dispute pending on EB Service Number</option>
                  <option value="Inverter model not on TANGEDCO Empanelled ALMM list">Inverter model not on TANGEDCO Empanelled ALMM list</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-rose-900 mb-1">
                  Inspector Deficiency Notes & Correction Plan
                </label>
                <textarea
                  value={rejectionRemarks}
                  onChange={(e) => setRejectionRemarks(e.target.value)}
                  rows={2}
                  placeholder="Detail the specific deficiency note and required actions for resubmission..."
                  className="w-full text-xs bg-white border border-rose-300 rounded-lg p-2 text-slate-800"
                />
              </div>
            </div>
          )}

          {/* General Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              DISCOM Liaison Remarks & Field Notes
            </label>
            <textarea
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              rows={2}
              placeholder="Record any communications with AEE / AE, inspection schedule, or quota details..."
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
              <span>{isSubmitting ? "Updating..." : "Save DISCOM Record"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
