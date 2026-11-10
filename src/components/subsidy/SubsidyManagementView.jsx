import React from "react";
import {
  Gift,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Building2,
  ExternalLink,
  Award,
  FileText,
  DollarSign,
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import { SUBSIDY_STAGES } from "@/data/subsidyData";

export default function SubsidyManagementView({
  subsidyData,
  onOpenUpdateModal,
  onOpenSanctionModal
}) {
  if (!subsidyData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <Gift className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Subsidy Record Found</h3>
      </div>
    );
  }

  const app = subsidyData.application || {};
  const bank = subsidyData.customerBankDetails || {};
  const docs = subsidyData.documents || [];
  const currentStageMeta = SUBSIDY_STAGES.find(s => s.id === subsidyData.currentStatus) || SUBSIDY_STAGES[4];

  const getStatusBadge = (status) => {
    switch (status) {
      case "subsidy_received":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "SUBSIDY RECEIVED (DBT CREDITED)"
        };
      case "subsidy_released":
      case "approved":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Award className="w-3.5 h-3.5 text-blue-600" />,
          label: status.replace("_", " ").toUpperCase()
        };
      case "under_verification":
      case "submitted":
      case "application":
        return {
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          icon: <Clock className="w-3.5 h-3.5 text-indigo-600 animate-spin" />,
          label: status.replace("_", " ").toUpperCase()
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
          label: "ELIGIBILITY CHECK"
        };
    }
  };

  const badge = getStatusBadge(subsidyData.currentStatus);

  return (
    <div className="space-y-6">
      {/* 1. Header Overview & 7-Stage Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {app.portalApplicationNumber || "PMSGY Application"}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                {badge.icon}
                <span>{badge.label}</span>
              </span>
              <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-100">
                ☀️ {subsidyData.schemeName}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              PM Surya Ghar National Portal Subsidy (DBT) Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{subsidyData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{subsidyData.capacity}</strong></span>
              <span>•</span>
              <span>EB Consumer #{subsidyData.consumerNumber}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpdateModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Gift className="w-4 h-4" />
              <span>Update Subsidy Stage</span>
            </button>
            <button
              onClick={onOpenSanctionModal}
              className="px-4 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>View Sanction Advice</span>
            </button>
          </div>
        </div>

        {/* 7-Stage Stepper */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Statutory 7-Stage Subsidy Lifecycle (BFRD Section 21)
            </span>
            <span className="text-xs font-mono text-blue-700 font-bold">
              Step {subsidyData.statusStep || 5} of 7: {currentStageMeta.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {SUBSIDY_STAGES.map((st) => {
              const isPast = st.step < (subsidyData.statusStep || 5);
              const isCurrent = st.step === (subsidyData.statusStep || 5);

              return (
                <div
                  key={st.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? "bg-blue-50/80 border-blue-300 ring-2 ring-blue-100"
                      : isPast
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-slate-50/50 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-center mb-1.5">
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center font-mono">
                        {st.step}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{st.label}</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Top 4 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 pt-4 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">1. Subsidy Eligibility</span>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">
              {subsidyData.subsidyEligibility}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">✓ PM Surya Ghar Scheme</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">2. Eligible Amount (CFA Cap)</span>
            <div className="text-xl font-mono font-black text-blue-700 mt-1">
              ₹{subsidyData.eligibleAmount.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Max Central Subsidy Cap</span>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">3. Expected Subsidy</span>
            <div className="text-xl font-mono font-black text-slate-900 mt-1">
              ₹{subsidyData.expectedSubsidy.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Sanction Order Approved</span>
          </div>

          <div className="p-4 rounded-xl bg-emerald-50/40 border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800 block">4. Actual Subsidy Received</span>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">
              ₹{subsidyData.actualSubsidyReceived.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">
              {subsidyData.currentStatus === "subsidy_received" ? "✓ Credited via PFMS DBT" : "Under Treasury Release"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. PFMS Bank Details & Documents */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Bank & PFMS Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              Beneficiary Bank & PFMS DBT Clearance
            </h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Beneficiary Name:</span>
                <strong className="text-slate-800">{bank.accountHolderName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Bank & Branch:</span>
                <strong className="text-slate-800">{bank.bankName} • {bank.branch}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Account Number:</span>
                <strong className="font-mono text-slate-900">{bank.accountNumber}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">IFSC Code:</span>
                <strong className="font-mono text-slate-800">{bank.ifsc}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">PFMS Status:</span>
                <span className="font-semibold text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {bank.pfmsStatus}
                </span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Direct Treasury to Beneficiary Transfer</span>
            <span className="font-mono font-bold text-blue-700">{app.dbtUtrNumber}</span>
          </div>
        </div>

        {/* Statutory Documents Locker */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Statutory Subsidy Dossier Checklist ({docs.length} Uploaded)
            </h2>
            <div className="space-y-2.5">
              {docs.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{doc.title}</div>
                    <div className="text-[10px] font-mono text-slate-500">{doc.referenceNumber} • {doc.date}</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">All 4 mandatory documents approved</span>
            <button
              onClick={onOpenSanctionModal}
              className="px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Official Sanction Order</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
