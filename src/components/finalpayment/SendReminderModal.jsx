import React, { useState } from "react";
import { X, Send, MessageSquare, Mail, Phone, Calendar, DollarSign, CheckCircle2 } from "lucide-react";

export default function SendReminderModal({
  isOpen,
  onClose,
  paymentData,
  onSendReminder
}) {
  if (!isOpen || !paymentData) return null;

  const [channel, setChannel] = useState("WhatsApp");
  const [amount, setAmount] = useState(paymentData.balanceAmount || 250000);
  const [dueDate, setDueDate] = useState(paymentData.paymentDueDate || "2026-11-15");
  const [customNote, setCustomNote] = useState("");

  const handleSend = (e) => {
    e.preventDefault();

    const newReminder = {
      id: `REM-${Date.now().toString().slice(-4)}`,
      channel,
      sentAt: new Date().toLocaleString("en-IN", { dateStyle: "short", timeStyle: "short" }),
      recipient: channel === "Email" ? paymentData.email : paymentData.phone,
      subject: `Final Milestone Settlement Notice: ₹${Number(amount).toLocaleString()}`,
      amountDemanded: Number(amount),
      status: "Dispatched",
      sentBy: "A. Lakshmi (Accounts Officer)"
    };

    onSendReminder(newReminder);
    onClose();
  };

  const previewMessage = `Dear ${paymentData.customerName},\n\nGreetings from NIRT Solar Renewable Energy Systems. Your 50 kWp Rooftop Solar installation (Consumer #${paymentData.consumerNumber}) has completed Net Metering.\n\nThe final milestone payment of ₹${Number(amount).toLocaleString()} is due on ${dueDate}.\n\nBank Transfer Details:\n• Account: NIRT Solar Systems Pvt Ltd\n• Bank: HDFC Bank Ltd (A/c: 50200088910245)\n• IFSC: HDFC0000214\n• UPI ID: nirtsolar@hdfcbank\n\nThank you for choosing NIRT Solar.`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Generate Automated Payment Reminder
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project: {paymentData.projectId} • Customer: {paymentData.customerName}
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
        <form onSubmit={handleSend} className="p-6 space-y-4">
          {/* Dispatch Channel Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Dispatch Channel
            </label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "WhatsApp", icon: <MessageSquare className="w-4 h-4 text-emerald-600" />, label: "WhatsApp" },
                { id: "Email", icon: <Mail className="w-4 h-4 text-blue-600" />, label: "Email Notice" },
                { id: "SMS", icon: <Phone className="w-4 h-4 text-indigo-600" />, label: "SMS Alert" }
              ].map((ch) => (
                <button
                  type="button"
                  key={ch.id}
                  onClick={() => setChannel(ch.id)}
                  className={`p-3 rounded-xl border text-xs font-bold flex items-center justify-center gap-2 transition-all ${
                    channel === ch.id
                      ? "bg-slate-900 text-white border-slate-900 shadow-xs"
                      : "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  {ch.icon}
                  <span>{ch.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Amount & Due Date */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Demanded Balance (₹)
              </label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono font-bold"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Payment Due Date
              </label>
              <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
              />
            </div>
          </div>

          {/* Recipient Details */}
          <div className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs space-y-1">
            <div className="flex justify-between">
              <span className="text-slate-500">Destination:</span>
              <strong className="font-mono text-slate-800">
                {channel === "Email" ? paymentData.email : paymentData.phone}
              </strong>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-500">Milestone Stage:</span>
              <strong className="text-blue-700">10% Final Settlement Post Net Metering</strong>
            </div>
          </div>

          {/* Message Preview */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Live Notification Preview
            </label>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs font-mono text-slate-700 whitespace-pre-wrap max-h-36 overflow-y-auto leading-relaxed">
              {previewMessage}
            </div>
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
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>Send Notification</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
