import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, Zap, FileText, Calendar, Building2 } from "lucide-react";

export default function CommissioningReportModal({
  isOpen,
  onClose,
  inspectionData
}) {
  if (!isOpen || !inspectionData) return null;

  const handlePrint = () => {
    window.print();
  };

  const comm = inspectionData.commissioningReport || {};
  const dates = inspectionData.dates || {};

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
                Joint Inspection & Commissioning Report (Section 18)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Report Ref: {comm.reportNumber || "NIRT-COMM-2026-0042"}
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
                Government of Tamil Nadu • TANGEDCO & CEIG Inspection Certificate
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                SOLAR PV GRID SYNCHRONIZATION & JOINT COMMISSIONING REPORT
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Statutory Compliance with Tamil Nadu Electricity Regulatory Commission (TNERC) Net Metering Regulations
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Project ID</span>
                <span className="font-mono font-bold text-slate-900">{inspectionData.projectId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Installed Capacity</span>
                <span className="font-bold text-blue-700">{inspectionData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Commissioning Date</span>
                <span className="font-medium text-slate-900">
                  {dates.commissioningDate || dates.scheduledDate || "2026-11-10"}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Consumer Name & Premise</span>
                <span className="font-bold text-slate-900">{inspectionData.customerName}</span>
                <p className="text-[11px] text-slate-600">{inspectionData.siteAddress}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Interconnection DT</span>
                <span className="font-mono font-bold text-slate-800">{comm.distributionTransformer}</span>
              </div>
            </div>
          </div>

          {/* Technical Test Results Summary */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              Statutory Grid Synchronization & Safety Test Results
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Anti-Islanding Trip Time</span>
                <span className="font-mono font-bold text-emerald-700">{comm.antiIslandingTripTime || "0.18s"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ Standard &lt; 2.0s</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Interconnect Voltage</span>
                <span className="font-mono font-bold text-slate-900">{comm.gridVoltage || "418.2 V"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ Nominal 415V ± 5%</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Grid Frequency</span>
                <span className="font-mono font-bold text-slate-900">{comm.gridFrequency || "50.02 Hz"}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">✓ 50 Hz Synchronized</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Initial Net Meter Reading</span>
                <span className="font-mono font-bold text-blue-700">{comm.initialGenerationReading || "000004.8 kWh"}</span>
                <span className="text-[9px] text-blue-600 block mt-0.5">✓ MRT Calibrated</span>
              </div>
            </div>
          </div>

          {/* Joint Sign-Off Signatures Grid */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3">
              Official Joint Inspection Signatures & Authorization
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. P. Ramasamy (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. P. Ramasamy, M.E.</div>
                <div className="text-[10px] text-slate-500">Assistant Executive Engineer (AEE / MRT)</div>
                <div className="text-[10px] text-blue-700 font-semibold mt-0.5">TANGEDCO Salem South</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. M. Senthil Kumar (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. M. Senthil Kumar, B.E.</div>
                <div className="text-[10px] text-slate-500">Electrical Inspector (CEIG)</div>
                <div className="text-[10px] text-indigo-700 font-semibold mt-0.5">Govt. of Tamil Nadu</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. K. Vasanth (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. K. Vasanth, B.E.</div>
                <div className="text-[10px] text-slate-500">Project Field Lead Engineer</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">NIRT Solar Renewable Energy</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Official Commissioning Document valid for Section 19 Net Metering & Subsidy claim.
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
