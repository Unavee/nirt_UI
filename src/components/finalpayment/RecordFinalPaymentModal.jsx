import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, DollarSign, Calendar, FileText, CreditCard, Building2 } from "lucide-react";
import { PAYMENT_MODES } from "@/data/paymentsData";

export default function RecordFinalPaymentModal({
  isOpen,
  onClose,
  paymentData,
  onSavePayment
}) {
  if (!isOpen || !paymentData) return null;

  const [milestoneId, setMilestoneId] = useState("MS-03");
  const targetMilestone = paymentData.milestones.find(m => m.id === milestoneId) || paymentData.milestones[2];

  const [amount, setAmount] = useState(targetMilestone?.amount || paymentData.balanceAmount || 250000);
  const [paymentMode, setPaymentMode] = useState("RTGS / NEFT");
  const [referenceUtr, setReferenceUtr] = useState("");
  const [paymentDate, setPaymentDate] = useState(new Date().toISOString().split("T")[0]);
  const [bankName, setBankName] = useState("HDFC Bank Ltd");
  const [notes, setNotes] = useState("");

  const handleMilestoneChange = (id) => {
    setMilestoneId(id);
    const m = paymentData.milestones.find(ms => ms.id === id);
    if (m) {
      setAmount(m.amount);
    }
  };

  const handleSave = (e) => {
    e.preventDefault();

    const amtNumber = Number(amount) || 0;
    const receiptNo = `REC-SLM-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    // Update milestones
    const updatedMilestones = paymentData.milestones.map((ms) => {
      if (ms.id === milestoneId) {
        return {
          ...ms,
          status: "Paid",
          paidDate: paymentDate,
          referenceUtr: referenceUtr || `UTR-${Date.now().toString().slice(-8)}`,
          receiptNo,
          paymentMode
        };
      }
      return ms;
    });

    // Recalculate financial balances
    const newOtherPayments = paymentData.otherPayments + (milestoneId === "MS-03" ? amtNumber : 0);
    const newTotalReceived = paymentData.advanceReceived + newOtherPayments;
    const newBalance = Math.max(0, paymentData.totalProjectValue - newTotalReceived);

    const isFullyPaid = newBalance === 0;

    const updatedPaymentData = {
      ...paymentData,
      otherPayments: newOtherPayments,
      balanceAmount: newBalance,
      overallStatus: isFullyPaid ? "fully_paid" : "partially_paid",
      milestones: updatedMilestones,
      noDuesCertificate: isFullyPaid ? {
        isIssued: true,
        certificateNumber: `NIRT-NOC-2026-${paymentData.projectId?.replace("NIRT-", "")}`,
        issuedDate: paymentDate,
        issuedBy: "A. Lakshmi (Accounts Manager)",
        remarks: "100% project amount settled. No outstanding customer dues."
      } : paymentData.noDuesCertificate
    };

    onSavePayment(updatedPaymentData);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs">
              <CreditCard className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Record Final Milestone Payment Settlement
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {paymentData.projectId} • Balance: ₹{paymentData.balanceAmount?.toLocaleString()}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="p-6 space-y-4">
          {/* Milestone Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Milestone Stage to Settle
            </label>
            <select
              value={milestoneId}
              onChange={(e) => handleMilestoneChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
            >
              {paymentData.milestones.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.title} — ₹{m.amount.toLocaleString()} ({m.status})
                </option>
              ))}
            </select>
          </div>

          {/* Amount & Mode */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Amount Received (₹)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-slate-400 font-bold text-xs">₹</span>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full text-xs pl-8 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono font-bold focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Payment Mode
              </label>
              <select
                value={paymentMode}
                onChange={(e) => setPaymentMode(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 font-medium"
              >
                {PAYMENT_MODES.map((mode) => (
                  <option key={mode} value={mode}>{mode}</option>
                ))}
              </select>
            </div>
          </div>

          {/* UTR & Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Bank UTR / Transaction Reference
              </label>
              <input
                type="text"
                value={referenceUtr}
                onChange={(e) => setReferenceUtr(e.target.value)}
                placeholder="e.g. HDFC2026110988102"
                required
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono uppercase"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Receipt Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={paymentDate}
                  onChange={(e) => setPaymentDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Bank & Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Receiving Bank Account
            </label>
            <input
              type="text"
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Reconciliation Remarks
            </label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="e.g. 100% full final settlement received post Net Metering energization..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800"
            />
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Record Settlement</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
