import React, { useState } from "react";
import {
  MessageSquare,
  Phone,
  Mail,
  Share2,
  Users,
  Wrench,
  AlertTriangle,
  Clock,
  Calendar,
  CheckCircle2,
  Plus,
  Search,
  Filter,
  ArrowUpRight,
  UserCheck,
  Send
} from "lucide-react";
import { COMMUNICATION_CHANNELS } from "../../data/communicationData";

export default function CustomerCommunicationView({
  logs = [],
  project,
  onOpenLogModal
}) {
  const [selectedChannel, setSelectedChannel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLogs = logs.filter((log) => {
    const matchesChannel =
      selectedChannel === "all" || log.channel === selectedChannel;
    const matchesSearch =
      searchQuery === "" ||
      log.subject?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.remarks?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.staffPerson?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.customerContact?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesChannel && matchesSearch;
  });

  const totalLogs = logs.length;
  const whatsappCount = logs.filter((l) => l.channel === "WhatsApp").length;
  const callCount = logs.filter((l) => l.channel === "Phone Call" || l.channel === "Customer Meeting").length;
  const pendingActionCount = logs.filter((l) => l.status === "Action Pending").length;

  const getChannelBadge = (channel) => {
    switch (channel) {
      case "WhatsApp":
        return {
          icon: <Share2 className="w-3.5 h-3.5 text-emerald-600" />,
          classes: "bg-emerald-50 text-emerald-700 border-emerald-200"
        };
      case "Phone Call":
        return {
          icon: <Phone className="w-3.5 h-3.5 text-blue-600" />,
          classes: "bg-blue-50 text-blue-700 border-blue-200"
        };
      case "Email":
        return {
          icon: <Mail className="w-3.5 h-3.5 text-indigo-600" />,
          classes: "bg-indigo-50 text-indigo-700 border-indigo-200"
        };
      case "Customer Meeting":
        return {
          icon: <Users className="w-3.5 h-3.5 text-violet-600" />,
          classes: "bg-violet-50 text-violet-700 border-violet-200"
        };
      case "Service Request":
        return {
          icon: <Wrench className="w-3.5 h-3.5 text-cyan-600" />,
          classes: "bg-cyan-50 text-cyan-700 border-cyan-200"
        };
      case "Complaint":
        return {
          icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />,
          classes: "bg-rose-50 text-rose-700 border-rose-200"
        };
      default:
        return {
          icon: <MessageSquare className="w-3.5 h-3.5 text-slate-600" />,
          classes: "bg-slate-50 text-slate-700 border-slate-200"
        };
    }
  };

  const handleQuickWhatsApp = () => {
    const rawNumber = project?.phone ? project.phone.replace(/[^0-9]/g, "") : "919443218920";
    const text = encodeURIComponent(
      `Dear ${project?.customerName || "Customer"}, greetings from NIRT Solar! We are tracking your rooftop solar project (${project?.id || "NIRT-26-0042"}). For any query or technical assistance, our support team is available.`
    );
    window.open(`https://wa.me/${rawNumber}?text=${text}`, "_blank");
  };

  const handleQuickEmail = () => {
    const subject = encodeURIComponent(`NIRT Solar Project Update - ${project?.id || "NIRT-26-0042"}`);
    const body = encodeURIComponent(`Dear ${project?.customerName || "Customer"},\n\nRegarding your rooftop solar system installation at ${project?.branch || "Salem"}...`);
    window.location.href = `mailto:sundaram.kr@gmail.com?subject=${subject}&body=${body}`;
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                BFRD Section 23
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                Omnichannel Audit Ledger
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Customer Communication & Interaction History
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Mandatory BFRD audit trail: Date – Communication Type – Person – Subject – Remarks – Next Action.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleQuickWhatsApp}
              className="apple-button px-3 py-1.5 rounded-xl text-xs font-bold bg-emerald-50 border border-emerald-200 text-emerald-800 hover:bg-emerald-100 flex items-center space-x-1.5 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Dispatch</span>
            </button>
            <button
              onClick={handleQuickEmail}
              className="apple-button px-3 py-1.5 rounded-xl text-xs font-bold bg-indigo-50 border border-indigo-200 text-indigo-800 hover:bg-indigo-100 flex items-center space-x-1.5 shadow-2xs"
            >
              <Mail className="w-3.5 h-3.5 text-indigo-600" />
              <span>Draft Email</span>
            </button>
            <button
              onClick={onOpenLogModal}
              className="apple-button px-3.5 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Log Communication</span>
            </button>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Interactions
            </span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">
              {totalLogs} Touches
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              Full lifecycle history
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="block text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              WhatsApp Updates
            </span>
            <span className="text-lg font-bold text-emerald-900 font-mono mt-0.5 block">
              {whatsappCount} Logs
            </span>
            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
              Automated & manual
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <span className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wider">
              Calls & Meetings
            </span>
            <span className="text-lg font-bold text-blue-900 font-mono mt-0.5 block">
              {callCount} Sessions
            </span>
            <span className="text-[10px] text-blue-700 font-medium mt-0.5 block">
              In-person & phone
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-violet-50/60 border border-violet-200/80">
            <span className="block text-[11px] font-semibold text-violet-800 uppercase tracking-wider">
              Next Action Pending
            </span>
            <span className="text-lg font-bold text-violet-900 font-mono mt-0.5 block">
              {pendingActionCount} Action
            </span>
            <span className="text-[10px] text-violet-700 font-medium mt-0.5 block">
              SLA commitments
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Channel Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {COMMUNICATION_CHANNELS.map((ch) => (
            <button
              key={ch.id}
              onClick={() => setSelectedChannel(ch.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedChannel === ch.id
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {ch.label}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search communications..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Communication Feed / Table */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Communication Timeline Ledger
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
              {filteredLogs.length} Records
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Newest First • Auto Synchronised
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredLogs.map((log) => {
            const badge = getChannelBadge(log.channel);
            return (
              <div
                key={log.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors space-y-3"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                    <span
                      className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-xl text-xs font-semibold border ${badge.classes}`}
                    >
                      {badge.icon}
                      <span>{log.channel}</span>
                    </span>

                    <span className="font-mono text-xs font-bold text-slate-800">
                      {log.type}
                    </span>

                    <span className="text-xs text-slate-400">•</span>

                    <span className="font-mono text-[11px] text-slate-500">
                      Ref: {log.id}
                    </span>

                    <span
                      className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono ${
                        log.status === "Completed"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}
                    >
                      {log.status}
                    </span>
                  </div>

                  <div className="flex items-center space-x-2 text-xs text-slate-500 font-mono">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{log.date}</span>
                  </div>
                </div>

                {/* Subject & Remarks */}
                <div>
                  <h4 className="text-sm font-bold text-slate-900 mb-1">
                    {log.subject}
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed bg-slate-50/70 p-3 rounded-2xl border border-slate-100">
                    {log.remarks}
                  </p>
                </div>

                {/* Participants & Next Action Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1 text-xs">
                  <div className="flex items-start space-x-2 text-slate-600">
                    <UserCheck className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">
                        NIRT Staff & Customer Contact
                      </span>
                      <span className="font-medium text-slate-900">
                        {log.staffPerson}
                      </span>
                      <span className="text-slate-400 mx-1.5">$\leftrightarrow$</span>
                      <span className="font-medium text-slate-700">
                        {log.customerContact}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-start space-x-2 text-slate-600">
                    <ArrowUpRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-blue-700 block font-mono">
                        Next Action ({log.nextActionDate})
                      </span>
                      <span className="font-semibold text-slate-800">
                        {log.nextAction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {filteredLogs.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              No communication records found matching the current filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
