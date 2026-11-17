import React, { useState } from "react";
import { 
  Headset, Plus, Search, Filter, AlertTriangle, 
  CheckCircle2, Clock, Wrench, ShieldAlert, Zap, 
  Cpu, Sun, Scale, User, ArrowRight, Kanban, List, 
  ExternalLink, Sparkles, Building, Phone, ChevronRight
} from "lucide-react";
import { 
  COMPLAINT_CATEGORIES, 
  TICKET_STAGES, 
  INITIAL_SERVICE_TICKETS 
} from "@/data/serviceTicketsData";
import ComplaintTicketModal from "@/components/service/ComplaintTicketModal";
import TicketLifecycleModal from "@/components/service/TicketLifecycleModal";

export default function ServiceComplaintsPage() {
  const [tickets, setTickets] = useState(INITIAL_SERVICE_TICKETS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCircle, setSelectedCircle] = useState("all");
  const [viewMode, setViewMode] = useState("kanban"); // "kanban" | "table"

  // Modals state
  const [isNewTicketOpen, setIsNewTicketOpen] = useState(false);
  const [selectedTicketForLifecycle, setSelectedTicketForLifecycle] = useState(null);

  // Stats calculation
  const totalActive = tickets.filter(t => t.stage !== "closure").length;
  const criticalCount = tickets.filter(t => t.priority === "Critical" && t.stage !== "closure").length;
  const inActionCount = tickets.filter(t => t.stage === "action").length;
  const pendingSignoffCount = tickets.filter(t => t.stage === "customer_confirmation").length;
  const warrantyClaimsCount = tickets.filter(t => t.category === "warranty").length;

  // Filtered tickets
  const filteredTickets = tickets.filter(t => {
    const matchesQuery = 
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.projectId.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || t.category === selectedCategory;
    const matchesCircle = selectedCircle === "all" || t.branch.toLowerCase().includes(selectedCircle.toLowerCase());

    return matchesQuery && matchesCategory && matchesCircle;
  });

  const handleAddNewTicket = (newTkt) => {
    setTickets([newTkt, ...tickets]);
  };

  const handleUpdateTicket = (updatedTkt) => {
    setTickets(tickets.map(t => t.id === updatedTkt.id ? updatedTkt : t));
    setSelectedTicketForLifecycle(updatedTkt);
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header with Slim Inline Metrics Bar */}
      <div className="glass-surface p-4 sm:p-5 rounded-2xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 font-mono">
              Section 35 • Customer Service
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              O&M Desk
            </span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight mt-1">
            Customer Service & Complaint Management
          </h1>

          {/* Slim Horizontal Text Status Bar (Replaces 5 tall boxes) */}
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-2 text-xs font-mono">
            <span className="text-slate-600">
              Active: <strong className="text-slate-900 font-bold">{totalActive}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-rose-600">
              Critical: <strong className="text-rose-700 font-bold">{criticalCount}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-indigo-600">
              In Field: <strong className="text-indigo-700 font-bold">{inActionCount}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-emerald-600">
              Pending Sign-off: <strong className="text-emerald-700 font-bold">{pendingSignoffCount}</strong>
            </span>
            <span className="text-slate-300">|</span>
            <span className="text-slate-500">
              Warranty: <strong className="text-slate-700 font-bold">{warrantyClaimsCount}</strong>
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2.5">
          <button
            onClick={() => setIsNewTicketOpen(true)}
            className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm flex items-center space-x-2 whitespace-nowrap"
          >
            <Plus className="w-4 h-4 text-emerald-400" />
            <span>Raise Service Ticket</span>
          </button>
        </div>
      </div>

      {/* Filter & View Switcher Bar */}
      <div className="glass-surface p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search ticket #, customer, plant ID, issue..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Dropdown Filters */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto justify-end">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
          >
            <option value="all">All 7 Categories</option>
            {COMPLAINT_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.label}</option>
            ))}
          </select>

          <select
            value={selectedCircle}
            onChange={(e) => setSelectedCircle(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
          >
            <option value="all">All Circles</option>
            <option value="salem">Salem Circle</option>
            <option value="namakkal">Namakkal Circle</option>
            <option value="erode">Erode Circle</option>
          </select>

          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-0.5 rounded-xl border border-slate-200">
            <button
              onClick={() => setViewMode("kanban")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                viewMode === "kanban" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
              title="6-Stage Kanban Board"
            >
              <Kanban className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setViewMode("table")}
              className={`p-1.5 rounded-lg text-xs font-semibold flex items-center space-x-1 ${
                viewMode === "table" ? "bg-white text-slate-900 shadow-2xs font-bold" : "text-slate-500 hover:text-slate-900"
              }`}
              title="Tabular Ledger"
            >
              <List className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

      </div>

      {/* VIEW 1: 6-STAGE NARROW KANBAN BOARD */}
      {viewMode === "kanban" ? (
        <div className="overflow-x-auto pb-4">
          <div className="flex space-x-3.5 min-w-[1200px]">
            {TICKET_STAGES.map((stage, idx) => {
              const stageTickets = filteredTickets.filter(t => t.stage === stage.id);

              return (
                <div key={stage.id} className="w-[280px] shrink-0 flex flex-col space-y-2.5">
                  {/* Column Header */}
                  <div className="p-2.5 rounded-xl bg-white border border-slate-200/90 shadow-2xs flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono font-bold text-slate-400">0{idx + 1}</span>
                      <h3 className="font-bold text-slate-900 text-xs">{stage.shortLabel}</h3>
                    </div>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-700 border border-slate-200">
                      {stageTickets.length}
                    </span>
                  </div>

                  {/* Cards Lane */}
                  <div className="space-y-2.5">
                    {stageTickets.map((ticket) => {
                      // Priority Left Border Color
                      const priorityBorder =
                        ticket.priority === "Critical"
                          ? "border-l-4 border-l-rose-500"
                          : ticket.priority === "High"
                          ? "border-l-4 border-l-amber-500"
                          : "border-l-4 border-l-blue-500";

                      // Initials for avatar
                      const initials = ticket.assignedTechnician
                        .split(" ")
                        .map((n) => n[0])
                        .filter(Boolean)
                        .slice(0, 2)
                        .join("")
                        .toUpperCase();

                      return (
                        <div
                          key={ticket.id}
                          onClick={() => setSelectedTicketForLifecycle(ticket)}
                          className={`p-3 rounded-xl bg-white border border-slate-200/80 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all cursor-pointer group space-y-2 ${priorityBorder}`}
                        >
                          {/* Tightly stacked Ticket ID & Category */}
                          <div className="flex items-center justify-between text-[10px] font-mono">
                            <span className="font-bold text-slate-600 group-hover:text-blue-700 transition-colors">
                              {ticket.id}
                            </span>
                            <span className="px-1.5 py-0.2 rounded bg-slate-100 text-slate-600 font-semibold text-[9px] truncate max-w-[110px]">
                              {ticket.categoryLabel?.split(" ")[0]}
                            </span>
                          </div>

                          {/* Title */}
                          <h4 className="font-semibold text-slate-900 text-xs leading-snug group-hover:text-blue-600 transition-colors line-clamp-2">
                            {ticket.title}
                          </h4>

                          {/* Customer & Location */}
                          <div className="text-[11px] text-slate-500 truncate font-medium">
                            {ticket.customerName} • <span className="font-mono text-[10px] text-slate-400">{ticket.branch}</span>
                          </div>

                          {/* Footer: Plant ID & Assignee Avatar */}
                          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                            <span className="text-[10px] font-mono text-slate-400">
                              {ticket.projectId}
                            </span>

                            {/* Assignee Avatar Circle in Bottom Right */}
                            <div
                              className="w-6 h-6 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-700 shadow-2xs group-hover:bg-blue-50 group-hover:text-blue-700 group-hover:border-blue-200 transition-colors"
                              title={`Assigned Lead: ${ticket.assignedTechnician}`}
                            >
                              {initials}
                            </div>
                          </div>
                        </div>
                      );
                    })}

                    {stageTickets.length === 0 && (
                      <div className="p-5 rounded-xl border border-dashed border-slate-200 text-center text-slate-400 text-xs">
                        No tickets
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* VIEW 2: TABULAR REGISTRY */
        <div className="glass-surface rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs min-w-[1000px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                  <th className="py-3 px-4">Ticket ID</th>
                  <th className="py-3 px-4">Customer & Plant</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Issue Summary</th>
                  <th className="py-3 px-4">Current Stage (1-6)</th>
                  <th className="py-3 px-4">Assigned Lead</th>
                  <th className="py-3 px-4">Priority</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-medium">
                {filteredTickets.map(ticket => (
                  <tr key={ticket.id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-blue-700">
                      {ticket.id}
                    </td>

                    <td className="py-3.5 px-4">
                      <div className="font-bold text-slate-900">{ticket.customerName}</div>
                      <div className="text-[10px] font-mono text-slate-500">{ticket.projectId} • {ticket.branch}</div>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-800 border border-slate-200">
                        {ticket.categoryLabel}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 max-w-[280px]">
                      <div className="font-semibold text-slate-800 text-xs truncate">{ticket.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{ticket.description}</div>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                        {ticket.stage.toUpperCase()}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-slate-700 font-semibold">
                      {ticket.assignedTechnician}
                    </td>

                    <td className="py-3.5 px-4">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        ticket.priority === "Critical" ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : ticket.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {ticket.priority}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => setSelectedTicketForLifecycle(ticket)}
                        className="apple-button px-3 py-1 rounded-lg text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white shadow-2xs"
                      >
                        Manage
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* MODAL 1: RAISE NEW COMPLAINT */}
      <ComplaintTicketModal
        isOpen={isNewTicketOpen}
        onClose={() => setIsNewTicketOpen(false)}
        onSubmitTicket={handleAddNewTicket}
      />

      {/* MODAL 2: 6-STAGE LIFECYCLE MANAGEMENT */}
      <TicketLifecycleModal
        isOpen={!!selectedTicketForLifecycle}
        ticket={selectedTicketForLifecycle}
        onClose={() => setSelectedTicketForLifecycle(null)}
        onUpdateTicket={handleUpdateTicket}
      />

    </div>
  );
}
