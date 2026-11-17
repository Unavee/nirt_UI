import React, { useState, useEffect } from "react";
import { 
  ShieldCheck, Search, Filter, Download, Printer, 
  Calendar, Clock, User, ArrowRight, FileText, 
  AlertTriangle, CheckCircle2, History, Layers, 
  Eye, Laptop, Smartphone, Building, Sparkles, X
} from "lucide-react";
import { MASTER_AUDIT_LOGS } from "@/data/auditTrailData";
import { useRole } from "@/context/RoleContext";
import Portal from "@/components/Portal";

export default function AuditTrailPage() {
  const { auditLogs } = useRole();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState("all");
  const [activeLogDetail, setActiveLogDetail] = useState(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setActiveLogDetail(null);
      }
    };
    if (activeLogDetail) {
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeLogDetail]);

  const liveLogs = auditLogs.map((entry) => {
    const [datePart, timePart] = String(entry.timestamp || "").split(",");
    const date = datePart?.trim() || "-";
    const time = timePart?.trim() || "-";
    const isFinancial = /advance|payment|utr|invoice|balance/i.test(
      `${entry.field || ""} ${entry.step || ""} ${entry.newValue || ""}`
    );

    return {
      id: entry.id,
      projectId: entry.projectId,
      entityType: isFinancial ? "Payment" : "Project",
      entityName: entry.clientName,
      createdBy: { name: entry.staffName, role: entry.role, date, time },
      modifiedBy: {
        name: entry.staffName,
        role: entry.role,
        branch: "Live CRM session",
        device: "Web CRM"
      },
      fieldModified: entry.field || entry.step,
      date,
      time,
      previousValue: entry.oldValue,
      newValue: entry.newValue,
      reason: entry.reason,
      source: "live"
    };
  });

  const logs = [...liveLogs, ...MASTER_AUDIT_LOGS];

  // Statistics
  const totalEvents = logs.length;
  const financialEvents = logs.filter(l => l.entityType === "Payment" || l.fieldModified.includes("Value") || l.fieldModified.includes("Advance")).length;
  const stageGateEvents = logs.filter(l => l.fieldModified.includes("Stage") || l.fieldModified.includes("Conversion")).length;
  const uniqueModifiers = new Set(logs.map(l => l.modifiedBy.name)).size;

  // Filtered Logs
  const filteredLogs = logs.filter(log => {
    const q = searchQuery.toLowerCase();
    const matchQuery = 
      log.projectId.toLowerCase().includes(q) ||
      log.entityName.toLowerCase().includes(q) ||
      log.modifiedBy.name.toLowerCase().includes(q) ||
      log.createdBy.name.toLowerCase().includes(q) ||
      log.fieldModified.toLowerCase().includes(q) ||
      log.reason.toLowerCase().includes(q);

    const matchEntity = selectedEntity === "all" || log.entityType.toLowerCase() === selectedEntity.toLowerCase();
    const matchStaff = selectedStaff === "all" || log.modifiedBy.name.toLowerCase().includes(selectedStaff.toLowerCase());

    return matchQuery && matchEntity && matchStaff;
  });

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header Card */}
      <div className="glass-surface p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Section 34 • Governance & Accountability
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Strictly Append-Only Ledger
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Audit Trail Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable tracking of record creation, field modifications, previous vs. new values, and management authorizations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => window.print()}
            className="apple-button px-4 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 flex items-center space-x-1.5 shadow-2xs print:hidden"
          >
            <Printer className="w-3.5 h-3.5 text-slate-500" />
            <span>Print Ledger</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">Total Audit Records</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{totalEvents}</div>
          <span className="text-[10px] text-blue-600 font-medium">Immutable logged mutations</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">Financial & Advance Edits</span>
          <div className="text-2xl font-black text-emerald-700 font-mono">{financialEvents}</div>
          <span className="text-[10px] text-emerald-600 font-medium">Bank UTR & pricing revisions</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">Stage Gate Authorizations</span>
          <div className="text-2xl font-black text-indigo-700 font-mono">{stageGateEvents}</div>
          <span className="text-[10px] text-indigo-600 font-medium">Pipeline transition approvals</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">Active Modifiers</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{uniqueModifiers}</div>
          <span className="text-[10px] text-slate-500 font-medium">Accountable staff members</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="glass-surface p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search record ID, staff, field, reason..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Dropdowns */}
        <div className="flex items-center space-x-2 w-full md:w-auto overflow-x-auto justify-end">
          <select
            value={selectedEntity}
            onChange={(e) => setSelectedEntity(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
          >
            <option value="all">All Entity Types</option>
            <option value="payment">Financial & Payments</option>
            <option value="proposal">Proposals & BOM</option>
            <option value="project">Projects & Stage-Gates</option>
            <option value="lead">Sales Leads</option>
            <option value="user">Users & RBAC Roles</option>
            <option value="service">Customer Service & O&M</option>
          </select>

          <select
            value={selectedStaff}
            onChange={(e) => setSelectedStaff(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
          >
            <option value="all">All Modifiers</option>
            <option value="Lakshmi">A. Lakshmi (Accounts)</option>
            <option value="Syed">Er. A. Syed (Super Admin)</option>
            <option value="Karthik">S. Karthik (PMO)</option>
            <option value="Rajkumar">Rajkumar S (Sales)</option>
            <option value="Thangavel">V. Thangavel (Liaison)</option>
            <option value="Saravanan">M. Saravanan (EPC Lead)</option>
          </select>
        </div>

      </div>

      {/* Main Audit Trail Data Table - High Density */}
      <div className="glass-surface rounded-2xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/70 text-slate-500 uppercase tracking-wider text-[10px] font-bold font-mono">
                <th className="py-2.5 px-3">Record / Entity</th>
                <th className="py-2.5 px-3">Action By</th>
                <th className="py-2.5 px-3">Field Modified</th>
                <th className="py-2.5 px-3">Change Diff (Previous → New)</th>
                <th className="py-2.5 px-3">Reason / Authorization</th>
                <th className="py-2.5 px-3 text-right">Inspect</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map(log => (
                <tr 
                  key={log.id} 
                  className="group hover:bg-slate-50/75 transition-colors cursor-pointer"
                  onClick={() => setActiveLogDetail(log)}
                >
                  {/* 1. Record / Entity */}
                  <td className="py-2 px-3 font-mono">
                    <div className="flex items-center space-x-1.5">
                      <span className="font-bold text-blue-700 text-xs">{log.projectId}</span>
                      <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-600 border border-slate-200/80">
                        {log.entityType}
                      </span>
                    </div>
                    <span className="text-[11px] text-slate-500 truncate max-w-[150px] block font-sans">
                      {log.entityName}
                    </span>
                  </td>

                  {/* 2. Action By (Consolidated Actor + Timestamp) */}
                  <td className="py-2 px-3 whitespace-nowrap">
                    <div className="font-semibold text-slate-900 leading-tight">
                      {log.modifiedBy.name}
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                      {log.date} • {log.time}
                    </div>
                  </td>

                  {/* 3. Field Modified */}
                  <td className="py-2 px-3 max-w-[180px]">
                    <span className="font-semibold text-slate-800 text-xs block truncate" title={log.fieldModified}>
                      {log.fieldModified}
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono block">
                      {log.id}
                    </span>
                  </td>

                  {/* 4. Change Diff (Inline Previous → New) */}
                  <td className="py-2 px-3 max-w-[280px]">
                    <div className="flex items-center space-x-1.5 font-mono text-[11px] truncate">
                      <span 
                        className="line-through text-rose-500/90 shrink-0 truncate max-w-[120px]" 
                        title={log.previousValue}
                      >
                        {log.previousValue || "(empty)"}
                      </span>
                      <span className="text-slate-400 shrink-0">→</span>
                      <span 
                        className="text-emerald-700 font-semibold truncate max-w-[130px]" 
                        title={log.newValue}
                      >
                        {log.newValue || "(empty)"}
                      </span>
                    </div>
                  </td>

                  {/* 5. Reason / Authorization */}
                  <td className="py-2 px-3 max-w-[220px]">
                    <p className="text-slate-600 text-[11px] leading-snug truncate" title={log.reason}>
                      {log.reason}
                    </p>
                  </td>

                  {/* 6. Subtle Hover-Only Inspect Button */}
                  <td className="py-2 px-3 text-right" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setActiveLogDetail(log)}
                      className="p-1 rounded-md text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-40 group-hover:opacity-100"
                      title="Inspect in Detail Drawer"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* AUDIT INSPECTION RIGHT-SIDE SLIDE-OVER DRAWER */}
      {activeLogDetail && (
        <Portal>
          <div className="fixed inset-0 z-[9999] overflow-hidden">
            {/* Backdrop Overlay with click-to-close */}
            <div
              onClick={() => setActiveLogDetail(null)}
              className="absolute inset-0 bg-slate-950/45 backdrop-blur-[1px] transition-opacity animate-in fade-in duration-200"
            />

            {/* Slide-over Drawer Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <aside
                aria-label="Audit Log Details"
                className="w-screen max-w-lg bg-white border-l border-slate-200 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-250 ease-out"
              >
                {/* Drawer Header */}
                <div className="px-6 py-5 border-b border-slate-200/80 bg-slate-50/70 flex items-start justify-between">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                        {activeLogDetail.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200">
                        {activeLogDetail.entityType}
                      </span>
                    </div>
                    <h3 className="text-base font-bold text-slate-900 tracking-tight">
                      {activeLogDetail.fieldModified}
                    </h3>
                    <p className="text-xs text-slate-500 font-mono">
                      Record: <span className="text-blue-700 font-bold">{activeLogDetail.projectId}</span> • {activeLogDetail.entityName}
                    </p>
                  </div>
                  <button
                    onClick={() => setActiveLogDetail(null)}
                    className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 rounded-lg transition-colors"
                    title="Close Drawer (Esc)"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Content Body (No internal box stacking) */}
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">
                  {/* Meta-data: Tight 2-column clean grid */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-3">
                      Audit Metadata & Provenance
                    </h4>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-3.5 text-xs">
                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">1. Created By</span>
                        <span className="font-semibold text-slate-900 block mt-0.5">{activeLogDetail.createdBy.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono block">{activeLogDetail.createdBy.role}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{activeLogDetail.createdBy.date} • {activeLogDetail.createdBy.time}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">2. Modified By</span>
                        <span className="font-semibold text-slate-900 block mt-0.5">{activeLogDetail.modifiedBy.name}</span>
                        <span className="text-[11px] text-slate-500 font-mono block">{activeLogDetail.modifiedBy.role}</span>
                        <span className="text-[10px] text-slate-400 font-mono block mt-0.5">{activeLogDetail.modifiedBy.branch} • {activeLogDetail.modifiedBy.device}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Timestamp</span>
                        <span className="font-semibold font-mono text-slate-800 block mt-0.5">{activeLogDetail.date}</span>
                        <span className="text-[11px] text-slate-500 font-mono block">{activeLogDetail.time}</span>
                      </div>

                      <div>
                        <span className="text-[11px] text-slate-400 block font-medium">Field Modified</span>
                        <span className="font-semibold text-slate-900 block mt-0.5">{activeLogDetail.fieldModified}</span>
                        <span className="text-[10px] text-slate-500 font-mono block">Log Source: {activeLogDetail.source || "System"}</span>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Previous vs New Value: Side-by-Side Split Pane */}
                  <div>
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono mb-2.5">
                      Value Comparison (Diff)
                    </h4>
                    <div className="grid grid-cols-2 gap-3">
                      {/* Left: Previous Value */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 text-rose-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider">Previous Value</span>
                        </div>
                        <div className="p-3 rounded-lg bg-rose-50/70 border border-rose-200/80 text-rose-900 font-mono text-xs break-words line-through min-h-[72px]">
                          {activeLogDetail.previousValue || "(empty)"}
                        </div>
                      </div>

                      {/* Right: New Value */}
                      <div className="space-y-1">
                        <div className="flex items-center space-x-1.5 text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider">New Value</span>
                        </div>
                        <div className="p-3 rounded-lg bg-emerald-50/70 border border-emerald-200/80 text-emerald-900 font-mono text-xs font-semibold break-words min-h-[72px]">
                          {activeLogDetail.newValue || "(empty)"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <hr className="border-slate-100" />

                  {/* Reason & Authorization Justification */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 font-mono">
                      Reason & Authorization Justification
                    </h4>
                    <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200/70 text-slate-700 text-xs leading-relaxed">
                      {activeLogDetail.reason}
                    </div>
                  </div>
                </div>

                {/* Drawer Footer Actions */}
                <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                  <span className="text-[11px] text-slate-400 font-mono">
                    Press <kbd className="px-1.5 py-0.5 rounded border border-slate-200 bg-white text-[10px]">Esc</kbd> to exit
                  </span>
                  <button
                    onClick={() => setActiveLogDetail(null)}
                    className="apple-button px-4 py-2 rounded-md text-xs font-semibold bg-slate-900 text-white hover:bg-slate-800 transition-colors shadow-2xs"
                  >
                    Close Inspector
                  </button>
                </div>
              </aside>
            </div>
          </div>
        </Portal>
      )}

    </div>
  );
}
