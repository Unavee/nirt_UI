import React from "react";
import {
  CreditCard,
  DollarSign,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Send,
  Award,
  Building2,
  TrendingUp,
  FileText,
  MessageSquare,
  Mail,
  ShieldCheck,
  CheckSquare
} from "lucide-react";
import { PAYMENT_LIFECYCLE_STATUSES } from "@/data/finalPaymentData";

export default function FinalPaymentManagementView({
  paymentData,
  onOpenRecordModal,
  onOpenReminderModal,
  onOpenNocModal
}) {
  if (!paymentData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <CreditCard className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Payment Record Found</h3>
      </div>
    );
  }

  const milestones = paymentData.milestones || [];
  const reminders = paymentData.remindersSent || [];
  const bank = paymentData.bankAccountDetails || {};
  const totalReceived = paymentData.advanceReceived + paymentData.otherPayments;
  const percentCollected = Math.min(100, Math.round((totalReceived / paymentData.totalProjectValue) * 100));

  const getStatusBadge = (status) => {
    switch (status) {
      case "fully_paid":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "FULLY PAID (ZERO DUES)"
        };
      case "overdue":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "OVERDUE (REMINDER SENT)"
        };
      case "partially_paid":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />,
          label: "PARTIALLY PAID"
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
          label: "PENDING"
        };
    }
  };

  const badge = getStatusBadge(paymentData.overallStatus);

  return (
    <div className="space-y-6">
      {/* 1. Top Header & 4 BFRD Metric Cards */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {paymentData.projectId}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                {badge.icon}
                <span>{badge.label}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                Due Date: <strong className="text-slate-800">{paymentData.paymentDueDate}</strong>
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Commercial Settlement & Final Milestone Payment (Section 20)
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{paymentData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{paymentData.capacity}</strong></span>
              <span>•</span>
              <span>Consumer #{paymentData.consumerNumber}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenRecordModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Record Payment</span>
            </button>
            <button
              onClick={onOpenReminderModal}
              className="px-4 py-2.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Reminder</span>
            </button>
            <button
              onClick={onOpenNocModal}
              className="px-4 py-2.5 text-xs font-bold text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4 text-emerald-600" />
              <span>No-Dues Certificate</span>
            </button>
          </div>
        </div>

        {/* The 4 Mandatory BFRD Section 20 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
          {/* 1. Project Value */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">1. Total Project Value</span>
            <div className="text-xl font-mono font-black text-slate-900 mt-1">
              ₹{paymentData.totalProjectValue.toLocaleString()}
            </div>
            <span className="text-[10px] text-slate-500 block mt-0.5">Commercial Contract Value</span>
          </div>

          {/* 2. Advance Received */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">2. 80% Advance Received</span>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">
              ₹{paymentData.advanceReceived.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">✓ Cleared via RTGS (80%)</span>
          </div>

          {/* 3. Other Payments */}
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">3. Other Payments Received</span>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">
              ₹{paymentData.otherPayments.toLocaleString()}
            </div>
            <span className="text-[10px] text-emerald-600 font-semibold block mt-0.5">✓ 10% On Installation</span>
          </div>

          {/* 4. Balance Amount */}
          <div className="p-4 rounded-xl bg-blue-50/40 border border-blue-200">
            <span className="text-[10px] uppercase font-bold text-blue-700 block">4. Outstanding Balance</span>
            <div className="text-xl font-mono font-black text-blue-700 mt-1">
              ₹{paymentData.balanceAmount.toLocaleString()}
            </div>
            <span className="text-[10px] text-blue-600 font-semibold block mt-0.5">
              {paymentData.balanceAmount === 0 ? "✓ 100% Settled (Zero Dues)" : "Due on Net Metering (10%)"}
            </span>
          </div>
        </div>

        {/* Overall Collection Progress Bar */}
        <div className="mt-6 pt-4 border-t border-slate-100">
          <div className="flex justify-between items-center text-xs font-semibold mb-2">
            <span className="text-slate-700">Financial Collection Progress</span>
            <span className="font-mono text-blue-700 font-bold">
              ₹{totalReceived.toLocaleString()} / ₹{paymentData.totalProjectValue.toLocaleString()} ({percentCollected}%)
            </span>
          </div>
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-emerald-600 h-3 rounded-full transition-all duration-500"
              style={{ width: `${percentCollected}%` }}
            />
          </div>
        </div>
      </div>

      {/* 2. Three Milestone Breakdown Ledger */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <CreditCard className="w-4 h-4 text-blue-600" />
          Contractual Payment Milestones (80% - 10% - 10% Standard)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {milestones.map((ms) => {
            const isPaid = ms.status === "Paid";

            return (
              <div
                key={ms.id}
                className={`p-4 rounded-xl border flex flex-col justify-between transition-all ${
                  isPaid ? "bg-emerald-50/30 border-emerald-200" : "bg-blue-50/20 border-blue-200"
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {ms.percentage}% Stage
                    </span>
                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        isPaid ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-blue-100 text-blue-800 border-blue-300"
                      }`}
                    >
                      {ms.status}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-slate-900">{ms.title}</h3>
                  <div className="text-lg font-mono font-black text-slate-900 mt-2">
                    ₹{ms.amount.toLocaleString()}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200/80 text-[11px] space-y-1">
                  {isPaid ? (
                    <>
                      <p className="text-emerald-700 font-semibold">✓ Paid on: {ms.paidDate}</p>
                      <p className="font-mono text-slate-500 truncate">Ref: {ms.referenceUtr}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-blue-700 font-semibold">Target Due: {ms.dueDate}</p>
                      <button
                        onClick={onOpenRecordModal}
                        className="mt-2 w-full py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-lg transition-colors"
                      >
                        Settle Milestone
                      </button>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Automated Reminders & Banking Info */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Automated Reminders History */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <Send className="w-4 h-4 text-blue-600" />
                Automated Payment Reminders Dispatched ({reminders.length})
              </h2>
              <button
                onClick={onOpenReminderModal}
                className="px-2.5 py-1 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
              >
                + Send New
              </button>
            </div>
            <div className="space-y-2.5">
              {reminders.map((rem) => (
                <div key={rem.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[10px] text-slate-500 flex items-center gap-1">
                      {rem.channel === "WhatsApp" ? <MessageSquare className="w-3.5 h-3.5 text-emerald-600" /> : <Mail className="w-3.5 h-3.5 text-blue-600" />}
                      {rem.channel} • {rem.sentAt}
                    </span>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {rem.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-800">{rem.subject}</div>
                  <div className="text-[10px] text-slate-500">
                    Recipient: {rem.recipient} • Sent by: {rem.sentBy}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500">
            Reminders auto-escalate if payment remains pending beyond due date.
          </div>
        </div>

        {/* Bank Virtual Account & RTGS Settlement Box */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4 text-blue-600" />
              NIRT Escrow Bank Account & Virtual UPI
            </h2>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Account Name:</span>
                <strong className="text-slate-800">{bank.accountName}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Bank & Branch:</span>
                <strong className="text-slate-800">{bank.bankName} • {bank.branch}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">Account Number:</span>
                <strong className="font-mono text-blue-700 text-sm">{bank.accountNumber}</strong>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-200">
                <span className="text-slate-500">IFSC Code:</span>
                <strong className="font-mono text-slate-800">{bank.ifsc}</strong>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-500">Instant UPI VPA:</span>
                <strong className="font-mono text-emerald-700">{bank.upiId}</strong>
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-500">Zero Dues unlocks Section 21 Subsidy</span>
            <button
              onClick={onOpenNocModal}
              className="px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>Generate NOC</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
