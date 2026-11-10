import React from "react";
import { X, Printer, Download, CheckCircle2, ShieldCheck, Building2, Zap, Calendar, FileText } from "lucide-react";

export default function DISCOMSanctionCertificateModal({ isOpen, onClose, discomApp, project }) {
  if (!isOpen || !discomApp) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Toolbar */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 print:hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
              Technical Feasibility Sanction Order
            </span>
            <span className="text-xs font-mono text-slate-500">
              Ref: {discomApp.sanctionOrderNumber || "TANG/SLM/2026/1089"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              disabled
              title="Printing disabled by System Governance policy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg shadow-none cursor-not-allowed opacity-60"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Disabled</span>
            </button>
            <button
              onClick={() => alert(`Simulating download of Feasibility_Sanction_${discomApp.applicationNumber}.pdf`)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 rounded-lg shadow-sm transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-2"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Paper */}
        <div className="p-8 overflow-y-auto space-y-6 flex-1 bg-white text-slate-900 font-sans">
          {/* Official DISCOM Header */}
          <div className="text-center border-b-2 border-slate-900 pb-5 space-y-1">
            <div className="w-12 h-12 mx-auto rounded-full bg-blue-700 text-white flex items-center justify-center font-black text-lg mb-2 shadow-xs">
              ⚡
            </div>
            <h2 className="text-base font-black tracking-wide text-slate-900 uppercase">
              TAMIL NADU GENERATION AND DISTRIBUTION CORPORATION LIMITED (TANGEDCO)
            </h2>
            <p className="text-xs font-semibold text-slate-700">
              Office of the Assistant Executive Engineer / Operation & Maintenance / Fairlands Section
            </p>
            <p className="text-[11px] text-slate-500">
              Salem Electricity Distribution Circle (SEDC) • Salem - 636016
            </p>
          </div>

          {/* Letter Head Meta */}
          <div className="flex items-center justify-between text-xs border-b border-slate-200 pb-3">
            <div>
              <span className="text-slate-500">Sanction Memo No:</span>
              <div className="font-mono font-bold text-slate-900">{discomApp.sanctionOrderNumber}</div>
            </div>
            <div className="text-right">
              <span className="text-slate-500">Date of Sanction:</span>
              <div className="font-bold text-slate-900">{discomApp.approvalDate || "25 Oct 2026"}</div>
            </div>
          </div>

          {/* Subject & Reference */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
            <div className="flex gap-2">
              <strong className="text-slate-700 whitespace-nowrap">Sub:</strong>
              <span className="text-slate-800 font-medium">
                Electricity — Non-Conventional Energy Sources — Technical Feasibility Sanction for Grid-Interactive Rooftop Solar PV System of <strong>{discomApp.appliedCapacityKw} kWp</strong> under PM Surya Ghar Muft Bijli Yojana — Accorded — Regarding.
              </span>
            </div>
            <div className="flex gap-2 text-slate-600">
              <strong className="text-slate-700 whitespace-nowrap">Ref:</strong>
              <span>
                1. Application No: <strong className="font-mono text-blue-700">{discomApp.applicationNumber}</strong> dated {discomApp.applicationDate}.<br />
                2. Remittance of Application Fee ₹{discomApp.applicationFee} via UTR: <strong className="font-mono text-slate-800">{discomApp.feePayment?.utr}</strong>.
              </span>
            </div>
          </div>

          {/* Consumer & Technical Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden">
            <table className="w-full text-xs">
              <tbody className="divide-y divide-slate-200">
                <tr className="bg-slate-50/70">
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200 w-1/3">1. Consumer Name</td>
                  <td className="p-3 font-bold text-slate-900">{discomApp.customerName || project?.customerName}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200">2. Service Connection No</td>
                  <td className="p-3 font-mono font-bold text-blue-700">{discomApp.consumerNumber}</td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200">3. Distribution Transformer (DT)</td>
                  <td className="p-3 font-semibold text-slate-800">{discomApp.substationTransformer}</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200">4. Tariff & Supply Phase</td>
                  <td className="p-3 text-slate-800">{discomApp.phase}</td>
                </tr>
                <tr className="bg-slate-50/70">
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200">5. Sanctioned Solar Capacity</td>
                  <td className="p-3 font-mono font-bold text-emerald-700 text-sm">
                    {discomApp.sanctionedCapacityKw || discomApp.appliedCapacityKw} kWp (100% of Applied Capacity)
                  </td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-slate-600 border-r border-slate-200">6. Solar EPC Contractor</td>
                  <td className="p-3 font-semibold text-slate-900">NIRT SOLAR EPC PRIVATE LIMITED (Reg: TANG-EMP-2024-88)</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Statutory Conditions */}
          <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/40 space-y-2 text-xs">
            <div className="font-bold text-emerald-900 flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-700" />
              <span>FEASIBILITY SANCTION ORDER ACCORDED</span>
            </div>
            <p className="text-slate-700 leading-relaxed text-[11px]">
              Technical feasibility is hereby granted to install a <strong>{discomApp.appliedCapacityKw} kWp</strong> grid-connected rooftop solar plant at the premises. The distribution transformer capacity is verified within the 75% CEA statutory hosting quota. The applicant must complete the erection of solar panels, inverter, and chemical earthing within <strong>180 days</strong> from the date of this order and intimate work completion for net-metering synchronization.
            </p>
          </div>

          {/* Officer Sign-off Seal */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between text-xs">
            <div>
              <div className="text-[11px] text-slate-400">Station: Salem</div>
              <div className="text-[11px] text-slate-400">Date: {discomApp.approvalDate}</div>
            </div>

            <div className="text-right">
              <div className="w-24 h-10 border border-dashed border-slate-300 rounded-md ml-auto flex items-center justify-center text-[10px] text-slate-400 mb-1">
                Official Seal
              </div>
              <div className="font-bold text-slate-900">{discomApp.officerInCharge || "Er. K. Murugan"}</div>
              <div className="text-[11px] text-slate-500">Assistant Executive Engineer (AEE / O&M)</div>
              <div className="text-[10px] text-slate-400">Fairlands Section, TANGEDCO / Salem</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-slate-200 bg-slate-50 flex items-center justify-between print:hidden">
          <span className="text-xs text-slate-400">
            Section 12 • Statutory DISCOM Sanction
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
