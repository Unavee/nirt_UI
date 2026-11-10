import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, CreditCard, Building2, Calendar } from "lucide-react";

export default function NoDuesCertificateModal({
  isOpen,
  onClose,
  paymentData
}) {
  if (!isOpen || !paymentData) return null;

  const handlePrint = () => {
    window.print();
  };

  const noc = paymentData.noDuesCertificate || {};
  const totalReceived = paymentData.advanceReceived + paymentData.otherPayments;
  const isZeroBalance = paymentData.balanceAmount === 0;

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
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Accounts Settlement & No-Dues Certificate (NOC)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Certificate Ref: {noc.certificateNumber || `NIRT-NOC-2026-${paymentData.projectId?.replace("NIRT-", "")}`}
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

        {/* Certificate Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 print:p-0">
          {/* Certificate Banner */}
          <div className="border-2 border-emerald-600/30 bg-emerald-50/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="text-center pb-4 border-b border-emerald-200">
              <div className="text-[10px] font-black uppercase tracking-widest text-emerald-800">
                NIRT Solar Renewable Energy Systems Private Limited • Accounts Division
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                COMMERCIAL SETTLEMENT & NO-OBJECTION NO-DUES CLEARANCE (NOC)
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Official Certification of 100% Payment Reconciliation for Grid-Connected Solar Rooftop EPC
              </p>
            </div>

            {/* Project Details Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Project ID</span>
                <span className="font-mono font-bold text-slate-900">{paymentData.projectId}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Capacity</span>
                <span className="font-bold text-blue-700">{paymentData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Clearance Date</span>
                <span className="font-medium text-slate-900">
                  {noc.issuedDate || new Date().toISOString().split("T")[0]}
                </span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Customer Name</span>
                <span className="font-bold text-slate-900">{paymentData.customerName}</span>
                <p className="text-[11px] text-slate-600">Consumer #{paymentData.consumerNumber}</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Account Clearance</span>
                <span className="font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded text-[11px] inline-flex items-center gap-1 mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>100% Reconciled</span>
                </span>
              </div>
            </div>
          </div>

          {/* Mathematical Reconciliation Ledger matching BFRD Example */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
              Statutory Commercial Reconciliation Ledger (BFRD Section 20 Standard)
            </div>
            <div className="p-4 space-y-3 text-xs">
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">1. Total Agreed Project Contract Value</span>
                <strong className="font-mono text-slate-900 text-sm">₹{paymentData.totalProjectValue.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">2. 80% Upfront Advance Payment (Cleared via RTGS)</span>
                <strong className="font-mono text-emerald-700 text-sm">(-) ₹{paymentData.advanceReceived.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center py-1.5 border-b border-slate-100">
                <span className="text-slate-600">3. Other Milestone Payments (10% Installation + 10% Commissioning)</span>
                <strong className="font-mono text-emerald-700 text-sm">(-) ₹{paymentData.otherPayments.toLocaleString()}</strong>
              </div>
              <div className="flex justify-between items-center py-2 bg-slate-50 px-3 rounded-lg border border-slate-200">
                <span className="font-bold text-slate-800">4. Outstanding Balance Amount Due</span>
                <strong className={`font-mono text-base ${isZeroBalance ? "text-emerald-700" : "text-blue-700"}`}>
                  ₹{paymentData.balanceAmount.toLocaleString()}
                </strong>
              </div>
            </div>
          </div>

          {/* Milestone Details */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-2 text-xs">
            <h4 className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              Reconciled Milestones Breakdown
            </h4>
            <div className="space-y-1.5">
              {paymentData.milestones.map((ms) => (
                <div key={ms.id} className="flex justify-between items-center p-2 rounded bg-white border border-slate-200">
                  <div>
                    <span className="font-semibold text-slate-800">{ms.title}</span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Ref: {ms.referenceUtr || "Pending"} • Paid: {ms.paidDate || "Scheduled"}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-900">₹{ms.amount.toLocaleString()}</span>
                    <span className={`text-[10px] font-bold block ${ms.status === "Paid" ? "text-emerald-700" : "text-blue-700"}`}>
                      {ms.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signatures */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  A. Lakshmi (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">A. Lakshmi</div>
                <div className="text-[10px] text-slate-500">Accounts & Billing Manager</div>
                <div className="text-[10px] text-emerald-700 font-semibold mt-0.5">NIRT Solar Energy Systems</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. S. Prakash (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. S. Prakash, Director</div>
                <div className="text-[10px] text-slate-500">PMO & Commercial Operations</div>
                <div className="text-[10px] text-blue-700 font-semibold mt-0.5">Commercial Directorate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Certified document required to unlock Section 21 PM Surya Ghar Subsidy Claim.
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
