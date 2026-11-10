import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, Star, FileText, Calendar, Building2 } from "lucide-react";
import { BFRD_CLOSURE_CHECKLIST } from "@/data/projectClosureData";

export default function ProjectClosureCertificateModal({
  isOpen,
  onClose,
  closureData
}) {
  if (!isOpen || !closureData) return null;

  const handlePrint = () => {
    window.print();
  };

  const cert = closureData.closureCertificate || {};
  const feedback = closureData.customerFeedback || {};
  const warranty = closureData.warrantyPackage || {};
  const checklist = closureData.checklistState || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Project Handover & Final Closure Certificate (Section 22)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Certificate Ref: {cert.certificateNumber || `NIRT-CLOSE-${closureData.projectId}`}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled
              className="p-1.5 text-slate-400 bg-slate-100 rounded-lg cursor-not-allowed flex items-center gap-1.5 text-xs font-semibold px-2.5 opacity-60"
              title="Printing disabled by System Governance policy"
            >
              <Printer className="w-4 h-4 text-slate-400" />
              <span className="hidden sm:inline">Print Disabled</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 print:p-0">
          {/* Official Document Banner */}
          <div className="border-2 border-emerald-600/30 bg-emerald-50/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="text-center pb-4 border-b border-emerald-200">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                NIRT Solar Renewable Energy Systems Private Limited • Quality & Governance
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                SOLAR ROOFTOP EPC PROJECT HANDOVER & FINAL CLOSURE CERTIFICATE
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Formal Handover under MNRE Standards, CEIG Sanction & TNERC Grid-Connected Regulations
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Project ID</span>
                <span className="font-mono font-bold text-slate-900">{closureData.projectId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Installed Capacity</span>
                <span className="font-bold text-blue-700">{closureData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Formal Closure Date</span>
                <span className="font-medium text-slate-900">{cert.issuedDate || "2026-11-10"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Customer Name & Premise</span>
                <span className="font-bold text-slate-900">{closureData.customerName}</span>
                <p className="text-[11px] text-slate-600">Consumer #{closureData.consumerNumber}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Closure Status</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>14/14 Activities Cleared</span>
                </span>
              </div>
            </div>
          </div>

          {/* 14 Cleared Checkpoints Summary */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              14-Point Statutory Closure Checklist Compliance
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1 font-mono text-[11px]">
              {BFRD_CLOSURE_CHECKLIST.map((item) => (
                <div key={item.id} className="p-2 bg-white rounded border border-slate-200 flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span className="text-slate-800 font-sans truncate">{item.title}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Warranty & Guarantee Package */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white text-xs space-y-2">
            <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
              Statutory Warranty & Performance Commitments
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-slate-700">
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Solar PV Modules:</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{warranty.moduleWarranty}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Solar Inverter:</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{warranty.inverterWarranty}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Workmanship & O&M:</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{warranty.workmanshipWarranty}</p>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100">
                <span className="font-bold text-slate-900 block">Customer 24x7 Support:</span>
                <p className="text-[11px] text-slate-600 mt-0.5">{warranty.supportHelpline}</p>
              </div>
            </div>
          </div>

          {/* Customer Testimonial & Rating */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-bold text-slate-900">Recorded Customer Testimonial</span>
              <div className="flex items-center gap-1 text-emerald-600 font-bold">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star key={s} className="w-3.5 h-3.5 fill-emerald-500 text-emerald-500" />
                ))}
                <span className="ml-1 text-slate-700 font-mono text-[11px]">5.0 / 5.0</span>
              </div>
            </div>
            <p className="text-slate-600 italic font-serif leading-relaxed">
              "{feedback.review}"
            </p>
            <div className="text-right text-[11px] text-slate-500 font-semibold">
              — {feedback.signedBy || closureData.customerName}
            </div>
          </div>

          {/* Executive Sign-Offs */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. S. Prakash (Signed & Sealed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. S. Prakash, Director</div>
                <div className="text-[10px] text-slate-500">Project Operations & Handover Directorate</div>
                <div className="text-[10px] text-emerald-700 font-semibold">NIRT Solar Systems Pvt Ltd</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  K. R. Sengottaiyan (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">K. R. Sengottaiyan</div>
                <div className="text-[10px] text-slate-500">Client Sign-Off & Plant Acceptance</div>
                <div className="text-[10px] text-blue-700 font-semibold">Salem Textiles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Project NIRT-26-0042 officially closed and archived into PMO repository.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
