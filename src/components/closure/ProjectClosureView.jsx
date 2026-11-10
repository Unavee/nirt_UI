import React from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  Award,
  ShieldCheck,
  Star,
  FileText,
  Calendar,
  Building2,
  Zap,
  Wrench,
  ThumbsUp,
  Download,
  CheckSquare
} from "lucide-react";
import { BFRD_CLOSURE_CHECKLIST } from "@/data/projectClosureData";

export default function ProjectClosureView({
  closureData,
  onOpenChecklistModal,
  onOpenCertModal
}) {
  if (!closureData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <CheckCircle2 className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Closure Record Found</h3>
      </div>
    );
  }

  const checklist = closureData.checklistState || {};
  const feedback = closureData.customerFeedback || {};
  const warranty = closureData.warrantyPackage || {};
  const cert = closureData.closureCertificate || {};

  const checkedCount = BFRD_CLOSURE_CHECKLIST.filter(item => checklist[item.id]?.checked).length;
  const isFullyClosed = checkedCount === BFRD_CLOSURE_CHECKLIST.length;
  const percentage = Math.round((checkedCount / BFRD_CLOSURE_CHECKLIST.length) * 100);

  return (
    <div className="space-y-6">
      {/* 1. Top Header & Closure Status Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {closureData.projectId}
              </span>
              <span
                className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${
                  isFullyClosed
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-blue-50 text-blue-800 border-blue-200"
                }`}
              >
                {isFullyClosed ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> : <Clock className="w-3.5 h-3.5 text-blue-600" />}
                <span>{isFullyClosed ? "CLOSED & COMMISSIONED" : "PENDING CLOSURE"}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                EB Consumer #{closureData.consumerNumber}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Solar EPC Project Handover & Formal Closure (Section 22)
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{closureData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{closureData.capacity}</strong></span>
              <span>•</span>
              <span>Target Handover: <strong className="text-slate-800">{closureData.targetHandoverDate}</strong></span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenChecklistModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckSquare className="w-4 h-4" />
              <span>Audit Closure Checklist</span>
            </button>
            <button
              onClick={onOpenCertModal}
              className="px-4 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Closure Certificate</span>
            </button>
          </div>
        </div>

        {/* 14-Point Progress Bar */}
        <div className="mt-6">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-700">14-Point Mandatory BFRD Closure Checklist Compliance</span>
            <span className="font-mono text-emerald-700 font-bold">
              {checkedCount} / {BFRD_CLOSURE_CHECKLIST.length} Completed ({percentage}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentage}%` }}
            />
          </div>
          <p className="text-[11px] text-slate-500 mt-2 font-mono">
            {isFullyClosed ? "✓ All 14 statutory activities verified and archived." : "⚠️ Awaiting completion of remaining activities before final sign-off."}
          </p>
        </div>
      </div>

      {/* 2. The 14 Mandatory BFRD Checklist Items Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              Mandatory Project Closure Checklist (BFRD Section 22 Standard)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Every item must be completed and audited before a project is marked Closed in the CRM
            </p>
          </div>
          <button
            onClick={onOpenChecklistModal}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            Edit Checklist
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {BFRD_CLOSURE_CHECKLIST.map((item) => {
            const state = checklist[item.id] || { checked: false };

            return (
              <div
                key={item.id}
                className={`p-3.5 rounded-xl border flex items-start gap-3 transition-all ${
                  state.checked
                    ? "bg-emerald-50/30 border-emerald-200"
                    : "bg-slate-50/50 border-slate-200"
                }`}
              >
                <div className="shrink-0 mt-0.5">
                  {state.checked ? (
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  ) : (
                    <Clock className="w-4 h-4 text-slate-400" />
                  )}
                </div>

                <div className="flex-1 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-900">{item.title}</span>
                    <span className="text-[10px] font-mono text-slate-500 bg-white px-2 py-0.5 rounded border border-slate-200">
                      {item.sectionRef}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 mt-1 leading-relaxed">{item.description}</p>
                  {state.checked && state.verifiedBy && (
                    <div className="text-[10px] text-emerald-700 font-mono mt-1.5 pt-1.5 border-t border-emerald-100">
                      ✓ Verified by {state.verifiedBy} ({state.verifiedDate || "Approved"})
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Warranty Package & Customer CSAT Feedback */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Warranty Package Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-blue-600" />
              Statutory Warranty & Performance Commitments
            </h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Solar PV Modules:</span>
                <strong className="text-slate-800">{warranty.moduleWarranty}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Solar Inverter:</span>
                <strong className="text-slate-800">{warranty.inverterWarranty}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">O&M Workmanship:</span>
                <strong className="text-slate-800">{warranty.workmanshipWarranty}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Generation Guarantee:</span>
                <strong className="font-mono text-emerald-700 font-bold">{warranty.generationGuarantee}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">24x7 Customer Support:</span>
                <strong className="font-mono text-blue-700">{warranty.supportHelpline}</strong>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
            <span>Handover Dossier Handed to Client</span>
            <span className="font-mono text-slate-700">Ref: {cert.certificateNumber}</span>
          </div>
        </div>

        {/* Customer CSAT Review Card */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <ThumbsUp className="w-4 h-4 text-emerald-600" />
                Customer Feedback & Testimonial
              </h2>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-4 h-4 text-emerald-500 fill-emerald-500" />
                ))}
                <span className="text-xs font-mono font-bold text-slate-800 ml-1">5.0 / 5.0</span>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200 space-y-2 text-xs">
              <p className="text-slate-700 italic font-serif leading-relaxed">
                "{feedback.review}"
              </p>
              <div className="pt-2 text-[11px] text-slate-500 flex justify-between items-center">
                <span>Signed by: <strong className="text-slate-800">{feedback.signedBy}</strong></span>
                <span className="font-mono font-bold text-emerald-700">NPS: {feedback.netPromoterScore}/10</span>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Section 22 Final Deliverable</span>
            <button
              onClick={onOpenCertModal}
              className="px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Official Handover Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
