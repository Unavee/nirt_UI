import React, { useState, useEffect } from "react";
import { X, MessageSquare, Phone, Mail, Share2, Users, Wrench, AlertCircle, Calendar, User, Clock, CheckCircle2 } from "lucide-react";

export default function LogCommunicationModal({ isOpen, onClose, onSave, project }) {
  if (!isOpen) return null;

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const [channel, setChannel] = useState("Phone Call");
  const [direction, setDirection] = useState("Outbound");
  const [type, setType] = useState("Follow-up");
  const [staffPerson, setStaffPerson] = useState("S. Priya (Liaisoning Desk)");
  const [customerContact, setCustomerContact] = useState(project?.customerName ? `${project.customerName} (Owner)` : "Customer Contact");
  const [subject, setSubject] = useState("");
  const [remarks, setRemarks] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [nextActionDate, setNextActionDate] = useState("12 Nov 2026");
  const [status, setStatus] = useState("Action Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!subject.trim() || !remarks.trim()) return;

    const newLog = {
      id: `COMM-2026-${Math.floor(100 + Math.random() * 900)}`,
      projectId: project.id,
      customerName: project.customerName,
      phone: project.phone,
      channel,
      type,
      direction,
      date: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata"
      }).format(new Date()) + " IST",
      rawDate: new Date().toISOString(),
      staffPerson,
      customerContact,
      subject: subject.trim(),
      remarks: remarks.trim(),
      nextAction: nextAction.trim() || "No follow-up action required.",
      nextActionDate,
      status
    };

    onSave(newLog);
    onClose();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col">
        {/* Modal Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <MessageSquare className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 font-mono">
                  Customer History
                </span>
                <span className="text-xs text-slate-500 font-mono">Project {project?.id}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                Log Customer Communication
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {/* Channel */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Channel / Medium *
              </label>
              <select
                value={channel}
                onChange={(e) => setChannel(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Phone Call">Phone Call</option>
                <option value="WhatsApp">WhatsApp</option>
                <option value="Email">Email</option>
                <option value="Customer Meeting">Customer Meeting</option>
                <option value="SMS">SMS</option>
                <option value="Service Request">Service Request</option>
                <option value="Complaint">Complaint</option>
              </select>
            </div>

            {/* Direction */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Direction *
              </label>
              <select
                value={direction}
                onChange={(e) => setDirection(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Outbound">Outbound (NIRT $\to$ Customer)</option>
                <option value="Inbound">Inbound (Customer $\to$ NIRT)</option>
                <option value="In-Person">In-Person (On-site visit)</option>
              </select>
            </div>

            {/* Classification */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Communication Type *
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="Follow-up">Milestone Follow-up</option>
                <option value="General Update">General Update</option>
                <option value="Payment Milestone">Payment Milestone</option>
                <option value="Inspection Notice">Inspection Notice</option>
                <option value="Customer Meeting">Customer Meeting</option>
                <option value="Service Request">Service Request</option>
                <option value="Complaint">Complaint / Escalation</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Staff Person */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Responsible Staff / Officer *
              </label>
              <input
                type="text"
                value={staffPerson}
                onChange={(e) => setStaffPerson(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. S. Priya (Liaisoning Desk)"
              />
            </div>

            {/* Customer Contact */}
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Customer Contact Person *
              </label>
              <input
                type="text"
                value={customerContact}
                onChange={(e) => setCustomerContact(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. K. R. Sundaram (Owner)"
              />
            </div>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Communication Subject *
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="e.g. TANGEDCO AEE Inspection schedule confirmation"
            />
          </div>

          {/* Detailed Remarks */}
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Detailed Remarks & Discussion Points *
            </label>
            <textarea
              rows={3}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              required
              className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              placeholder="Record summary of conversation, key decisions made, technical clarifications or customer queries..."
            />
          </div>

          {/* Next Action & Date */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 bg-slate-50 rounded-2xl border border-slate-200/80">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Next Action / Follow-up Commitment *
              </label>
              <input
                type="text"
                value={nextAction}
                onChange={(e) => setNextAction(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="e.g. Transmit Joint Commissioning Report to Salem AEE"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Target Action Date *
              </label>
              <input
                type="text"
                value={nextActionDate}
                onChange={(e) => setNextActionDate(e.target.value)}
                required
                className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
                placeholder="12 Nov 2026"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              <label className="text-xs font-semibold text-slate-700">Action Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="px-2.5 py-1 text-xs rounded-lg border border-slate-200 bg-white font-medium text-slate-800 focus:outline-none"
              >
                <option value="Action Pending">Action Pending</option>
                <option value="Completed">Completed</option>
              </select>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Save Entry to History</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
