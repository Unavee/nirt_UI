import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, Gift, Calendar, Building2, Zap } from "lucide-react";

export default function SubsidySanctionModal({
  isOpen,
  onClose,
  subsidyData
}) {
  if (!isOpen || !subsidyData) return null;

  const handlePrint = () => {
    window.print();
  };

  const app = subsidyData.application || {};
  const bank = subsidyData.customerBankDetails || {};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <Gift className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                PM Surya Ghar DBT Subsidy Sanction & Disbursement Advice
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Sanction Ref: MNRE-DBT-ORD-2026-881
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
          {/* Official Banner */}
          <div className="border-2 border-emerald-600/30 bg-emerald-50/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="text-center pb-4 border-b border-emerald-200">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                Ministry of New and Renewable Energy (MNRE) • Government of India
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                CENTRAL FINANCIAL ASSISTANCE (CFA) DIRECT BENEFIT TRANSFER SANCTION ORDER
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                PM Surya Ghar: Muft Bijli Yojana • National Rooftop Solar DBT Portal
              </p>
            </div>

            {/* Consumer & Application Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Portal Application #</span>
                <span className="font-mono font-bold text-slate-900">{app.portalApplicationNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Installed Capacity</span>
                <span className="font-bold text-blue-700">{subsidyData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Sanction Date</span>
                <span className="font-medium text-slate-900">{app.approvalDate || "2026-11-09"}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Beneficiary Consumer</span>
                <span className="font-bold text-slate-900">{subsidyData.customerName}</span>
                <p className="text-[11px] text-slate-600">DISCOM Consumer #{subsidyData.consumerNumber} • {app.discomName}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Sanction Status</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Approved for PFMS Release</span>
                </span>
              </div>
            </div>
          </div>

          {/* Subsidy Calculation Breakdown */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white text-xs">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-slate-800">
              Central Financial Assistance (CFA) Subsidy Slab Computation
            </div>
            <div className="p-4 space-y-2.5">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">1. First 2 kW Capacity (₹30,000 / kW)</span>
                <strong className="font-mono text-slate-900">₹60,000</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">2. Additional 1 kW Capacity (₹18,000 / kW for 3rd kW)</span>
                <strong className="font-mono text-slate-900">₹18,000</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">3. Beyond 3 kW up to 50 kW (Statutory Max CFA Cap Applicable)</span>
                <strong className="font-mono text-slate-500">Capped at 3 kW</strong>
              </div>
              <div className="flex justify-between py-2 bg-emerald-50/50 px-3 rounded-lg border border-emerald-200">
                <span className="font-bold text-emerald-900">Total Sanctioned Direct Benefit Transfer (DBT) Amount</span>
                <strong className="font-mono text-base text-emerald-700">₹{subsidyData.eligibleAmount.toLocaleString()}</strong>
              </div>
            </div>
          </div>

          {/* Customer Bank PFMS Validation Details */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3 text-xs">
            <h3 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-blue-600" />
              Public Financial Management System (PFMS) Aadhaar-Linked Bank Details
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-mono">Bank Name</span>
                <span className="font-bold text-slate-800">{bank.bankName}</span>
                <span className="text-[10px] text-slate-500 block">{bank.branch}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-mono">Account Number</span>
                <span className="font-mono font-bold text-slate-900">{bank.accountNumber}</span>
                <span className="text-[10px] text-slate-500 block font-mono">IFSC: {bank.ifsc}</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-mono">PFMS Linkage</span>
                <span className="font-bold text-emerald-700">Aadhaar Linked</span>
                <span className="text-[10px] text-emerald-600 block">✓ Validated</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-400 text-[10px] block font-mono">PFMS Reference UTR</span>
                <span className="font-mono font-bold text-blue-700 truncate block">{app.dbtUtrNumber}</span>
                <span className="text-[10px] text-blue-600 block">Payment Bridge</span>
              </div>
            </div>
          </div>

          {/* Authorizations */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  MNRE Nodal Officer (Digitally Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">MNRE Direct Benefit Transfer Cell</div>
                <div className="text-[10px] text-slate-500">Government of India • New Delhi</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. P. Ramasamy (Verified)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. P. Ramasamy, AEE</div>
                <div className="text-[10px] text-slate-500">TANGEDCO DISCOM Nodal Officer</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Official PM Surya Ghar Central Financial Assistance clearance document.
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
