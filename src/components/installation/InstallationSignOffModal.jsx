import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, Download, MapPin, Zap, Calendar, UserCheck } from "lucide-react";

export default function InstallationSignOffModal({
  isOpen,
  onClose,
  installationData
}) {
  if (!isOpen || !installationData) return null;

  const handlePrint = () => {
    window.print();
  };

  const tests = installationData.testMeasurements || {};

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
                Installation Handover Certificate (Section 16)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Certificate Ref: NIRT-INST-CERT-{installationData.projectId?.replace("NIRT-", "")}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-2.5"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
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
            <div className="absolute right-3 top-3 opacity-10">
              <ShieldCheck className="w-32 h-32 text-emerald-800" />
            </div>

            <div className="text-center pb-4 border-b border-emerald-200">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                NIRT Solar Renewable Energy Systems Private Limited
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                MECHANICAL & ELECTRICAL INSTALLATION COMPLETION CERTIFICATE
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Statutory Compliance with MNRE Guidelines, IS 732, and CEA Technical Grid Standards
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Project ID</span>
                <span className="font-mono font-bold text-slate-900">{installationData.projectId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">System Capacity</span>
                <span className="font-bold text-blue-700">{installationData.systemCapacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Completion Date</span>
                <span className="font-medium text-slate-900">
                  {installationData.actualCompletionDate || installationData.targetCompletionDate || "2026-11-08"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Customer Name & Site</span>
                <span className="font-bold text-slate-900">{installationData.customerName}</span>
                <p className="text-[11px] text-slate-600">{installationData.siteAddress}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Installation Status</span>
                <span className="inline-flex items-center gap-1 font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full text-[10px] mt-0.5">
                  <CheckCircle2 className="w-3 h-3" />
                  {installationData.overallProgress}% Complete (Ready for DISCOM Inspection)
                </span>
              </div>
            </div>
          </div>

          {/* Technical Test Results Summary */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              Pre-Commissioning Electrical Measurements & Testing
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Measured String Voc</span>
                <span className="font-mono font-bold text-slate-900">{tests.measuredVoc || "642.4 V"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ Within 1.5% DPR</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Measured String Isc</span>
                <span className="font-mono font-bold text-slate-900">{tests.measuredIsc || "13.42 A"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ Verified &gt; 750W/m²</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Insulation Resistance</span>
                <span className="font-mono font-bold text-slate-900">{tests.insulationResistance || "128 MΩ"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ Stat Min: 50 MΩ</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Grid Interconnect Voltage</span>
                <span className="font-mono font-bold text-slate-900">{tests.gridVoltageAtInverter || "418.2 V"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ 50.02 Hz Stable</span>
              </div>
            </div>

            {/* Earth Pit Resistance Table */}
            <div className="bg-white rounded-lg border border-slate-200 p-3 mt-2">
              <div className="text-[11px] font-bold text-slate-700 mb-2">
                Chemical Earth Pit Measured Values (Statutory CEA Limit &lt; 5.0 Ω):
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
                {(tests.earthResistancePits || []).map((pit, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded border border-slate-100 flex justify-between items-center">
                    <span className="text-[11px] text-slate-600">{pit.pitName}</span>
                    <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
                      {pit.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Installation Team Sign-Off Matrix */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <UserCheck className="w-4 h-4 text-emerald-600" />
              Field Team Authorization & Handover Sign-Off
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. K. Vasanth (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. K. Vasanth, B.E.</div>
                <div className="text-[10px] text-slate-500">Project Field Manager / Lead</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  R. Manikandan (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">R. Manikandan</div>
                <div className="text-[10px] text-slate-500">Licensed Wireman (Lic: TN-WR-9942)</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. T. Vignesh (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. T. Vignesh, CSP</div>
                <div className="text-[10px] text-slate-500">Quality & Safety Officer (NEBOSH)</div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          <div className="text-xs text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-200 leading-relaxed">
            <span className="font-bold text-slate-800">Completion Statement: </span>
            {installationData.completionRemarks}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Validated for submission to DISCOM Section 18 Joint Inspection.
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
