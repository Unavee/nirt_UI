import React, { useState } from "react";
import { 
  ShieldCheck, Search, Filter, Download, Printer, 
  Calendar, Clock, User, ArrowRight, FileText, 
  AlertTriangle, CheckCircle2, History, Layers, 
  Eye, Laptop, Smartphone, Building, Sparkles, X
} from "lucide-react";
import { MASTER_AUDIT_LOGS } from "@/data/auditTrailData";
import Portal from "@/components/Portal";

export default function AuditTrailPage() {
  const [logs, setLogs] = useState(MASTER_AUDIT_LOGS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("all");
  const [selectedStaff, setSelectedStaff] = useState("all");
  const [activeLogDetail, setActiveLogDetail] = useState(null);

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
            Enterprise Audit Trail & Mutation Log
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Immutable tracking of record creation, field modifications, previous vs. new values, and management authorizations.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            disabled
            title="Printing is disabled by System Governance policy"
            className="apple-button px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed flex items-center space-x-1.5 shadow-none opacity-60"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Ledger (Disabled)</span>
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

      {/* Main Audit Trail Data Table */}
      <div className="glass-surface rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs min-w-[1200px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                <th className="py-3 px-4">Entity / Record ID</th>
                <th className="py-3 px-4">1. Created By</th>
                <th className="py-3 px-4">2. Modified By</th>
                <th className="py-3 px-4">3. What Was Modified</th>
                <th className="py-3 px-4">4. Date & 5. Time</th>
                <th className="py-3 px-4">6. Previous Value</th>
                <th className="py-3 px-4">7. New Value</th>
                <th className="py-3 px-4">Reason / Authorization</th>
                <th className="py-3 px-4 text-right">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* Entity ID */}
                  <td className="py-3.5 px-4 font-mono">
                    <span className="font-bold text-blue-700 block text-xs">{log.projectId}</span>
                    <span className="text-[10px] text-slate-500 block truncate max-w-[140px] font-sans">
                      {log.entityName}
                    </span>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-bold uppercase bg-slate-100 text-slate-700 border border-slate-200 inline-block mt-0.5">
                      {log.entityType}
                    </span>
                  </td>

                  {/* 1. Who Created */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.createdBy.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{log.createdBy.role}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">Created: {log.createdBy.date}</div>
                  </td>

                  {/* 2. Who Modified */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-slate-900">{log.modifiedBy.name}</div>
                    <div className="text-[10px] text-slate-500 font-mono">{log.modifiedBy.role}</div>
                    <div className="text-[9px] text-slate-400 font-mono mt-0.5">{log.modifiedBy.branch}</div>
                  </td>

                  {/* 3. What Was Modified */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="font-bold text-slate-800 text-xs block leading-snug">
                      {log.fieldModified}
                    </span>
                    <span className="text-[10px] text-blue-600 font-mono block mt-0.5">
                      ID: {log.id}
                    </span>
                  </td>

                  {/* 4. Date & 5. Time */}
                  <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                    <div className="font-semibold text-slate-800">{log.date}</div>
                    <div className="text-[10px] text-slate-400 flex items-center space-x-1 mt-0.5">
                      <Clock className="w-2.5 h-2.5 text-slate-400" />
                      <span>{log.time}</span>
                    </div>
                  </td>

                  {/* 6. Previous Value */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 line-through block truncate">
                      {log.previousValue}
                    </span>
                  </td>

                  {/* 7. New Value */}
                  <td className="py-3.5 px-4 max-w-[180px]">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 block truncate">
                      {log.newValue}
                    </span>
                  </td>

                  {/* Reason */}
                  <td className="py-3.5 px-4 max-w-[200px]">
                    <p className="text-slate-600 text-xs leading-snug line-clamp-2" title={log.reason}>
                      {log.reason}
                    </p>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right">
                    <button
                      onClick={() => setActiveLogDetail(log)}
                      className="apple-button px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white shadow-2xs"
                    >
                      Inspect
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* INSPECTION MODAL */}
      {activeLogDetail && (
        <Portal>
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              
              <div className="flex justify-between items-start border-b border-slate-100 pb-3">
                <div>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    Audit Inspection • {activeLogDetail.id}
                  </span>
                  <h3 className="text-base font-bold text-slate-900 mt-1">
                    {activeLogDetail.fieldModified}
                  </h3>
                  <p className="text-xs text-slate-500 font-mono">
                    Entity: {activeLogDetail.projectId} ({activeLogDetail.entityName})
                  </p>
                </div>
                <button
                  onClick={() => setActiveLogDetail(null)}
                  className="p-1 rounded-lg text-slate-400 hover:text-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* 7 Required Parameters Grid */}
              <div className="space-y-3 text-xs">
                
                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">1. Created By</span>
                    <strong className="text-slate-900 block">{activeLogDetail.createdBy.name}</strong>
                    <span className="text-[10px] text-slate-500 font-mono">{activeLogDetail.createdBy.role}</span>
                    <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{activeLogDetail.createdBy.date} • {activeLogDetail.createdBy.time}</span>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">2. Modified By</span>
                    <strong className="text-slate-900 block">{activeLogDetail.modifiedBy.name}</strong>
                    <span className="text-[10px] text-slate-500 font-mono">{activeLogDetail.modifiedBy.role}</span>
                    <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{activeLogDetail.modifiedBy.branch} • {activeLogDetail.modifiedBy.device}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">3. Field Modified</span>
                    <strong className="text-slate-900">{activeLogDetail.fieldModified}</strong>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">4. Date & 5. Time</span>
                    <strong className="text-slate-900 font-mono">{activeLogDetail.date}</strong>
                    <span className="text-[10px] text-slate-500 font-mono block">{activeLogDetail.time}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div>
                    <span className="text-[10px] font-bold uppercase text-rose-600 font-mono block mb-1">6. Previous Value</span>
                    <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 font-mono line-through">
                      {activeLogDetail.previousValue}
                    </div>
                  </div>

                  <div>
                    <span className="text-[10px] font-bold uppercase text-emerald-700 font-mono block mb-1">7. New Value</span>
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 font-mono font-bold">
                      {activeLogDetail.newValue}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="text-[10px] font-bold uppercase text-slate-500 font-mono block mb-1">Audit Reason & Authorization Justification</span>
                  <div className="p-3.5 rounded-2xl bg-slate-100 border border-slate-200 text-slate-700 leading-relaxed">
                    {activeLogDetail.reason}
                  </div>
                </div>

              </div>

              <div className="flex justify-end pt-2 border-t border-slate-100">
                <button
                  onClick={() => setActiveLogDetail(null)}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white"
                >
                  Close Inspector
                </button>
              </div>

            </div>
          </div>
        </Portal>
      )}

    </div>
  );
}
