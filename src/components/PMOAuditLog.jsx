"use client";

import { useState } from "react";
import { ShieldCheck, Lock, Search, Filter, AlertCircle, FileText } from "lucide-react";

export const MOCK_AUDIT_LOGS = [
  {
    id: "LOG-10492",
    timestamp: "2026-11-03 18:42:10 IST",
    staffName: "Suresh Kumar",
    role: "Accounts & Commercial Finance",
    projectId: "NIRT-2410-001",
    customerName: "Salem Textiles Ltd",
    action: "Verified 80% Advance Bank UTR (Ref: ICIC0006119882)",
    stageTransition: "Customer Confirmed → Advance Cleared (BOM Unlocked)",
    ipAddress: "192.168.1.42 (Salem HQ)"
  },
  {
    id: "LOG-10491",
    timestamp: "2026-11-03 16:15:30 IST",
    staffName: "Karthik R.",
    role: "Field Sales Representative",
    projectId: "NIRT-2410-003",
    customerName: "Dr. Selvam Residence",
    action: "Dropped Lead to Unqualified (Reason: Weak/Fragile Asbestos Roof)",
    stageTransition: "Lead Qualification → Unqualified Archive",
    ipAddress: "192.168.1.18 (Mobile App)"
  },
  {
    id: "LOG-10490",
    timestamp: "2026-11-03 14:05:22 IST",
    staffName: "Mano P.",
    role: "Site Survey Engineer",
    projectId: "NIRT-2410-002",
    customerName: "Sri Murugan Agro Farm",
    action: "Uploaded Technical Feasibility & SLD Drawing (3-Ph LT Confirmed)",
    stageTransition: "Survey Scheduled → Feasibility Approved",
    ipAddress: "192.168.1.25 (Field Tablet)"
  },
  {
    id: "LOG-10489",
    timestamp: "2026-11-03 11:30:15 IST",
    staffName: "Praveen V.",
    role: "Purchase & Inventory Store",
    projectId: "NIRT-2410-001",
    customerName: "Salem Textiles Ltd",
    action: "Generated Material Dispatch Challan (545W Mono PERC + 20kW Inverter)",
    stageTransition: "Material Staging → Dispatched to Site",
    ipAddress: "192.168.1.12 (Warehouse)"
  },
  {
    id: "LOG-10488",
    timestamp: "2026-11-03 10:12:00 IST",
    staffName: "Dinesh K.",
    role: "Liaison & DISCOM Desk",
    projectId: "NIRT-2409-044",
    customerName: "Kavitha Residence",
    action: "Uploaded TANGEDCO Net-Meter Joint Commissioning Report (JCR)",
    stageTransition: "DISCOM Inspection → Net Meter Synchronized",
    ipAddress: "192.168.1.33 (Salem Town Office)"
  },
  {
    id: "LOG-10487",
    timestamp: "2026-11-03 09:40:18 IST",
    staffName: "Suresh Kumar",
    role: "Accounts & Commercial Finance",
    projectId: "NIRT-2409-044",
    customerName: "Kavitha Residence",
    action: "Cleared Final 10% Milestone (Ledger Balance = Rs. 0.00 ZERO DUE)",
    stageTransition: "Net Meter Synchronized → Final Invoiced & Settled",
    ipAddress: "192.168.1.42 (Salem HQ)"
  },
  {
    id: "LOG-10486",
    timestamp: "2026-11-02 17:22:45 IST",
    staffName: "Deepa N.",
    role: "PM Surya Ghar Subsidy Desk",
    projectId: "NIRT-2409-038",
    customerName: "Senthil Kumar Home",
    action: "Logged PM Surya Ghar National Portal Token & Verified DBT Credit (Rs. 78,000)",
    stageTransition: "Subsidy Claim Filed → Permanent Project Archive",
    ipAddress: "192.168.1.19 (Salem HQ)"
  }
];

export default function PMOAuditLog() {
  const [search, setSearch] = useState("");

  const filteredLogs = MOCK_AUDIT_LOGS.filter(log =>
    log.projectId.toLowerCase().includes(search.toLowerCase()) ||
    log.customerName.toLowerCase().includes(search.toLowerCase()) ||
    log.staffName.toLowerCase().includes(search.toLowerCase()) ||
    log.action.toLowerCase().includes(search.toLowerCase()) ||
    log.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mt-6">
      <div className="p-4 bg-slate-900 text-white flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              System Audit Trail & Governance Log
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded border border-emerald-500/30">
                PMO Exclusive
              </span>
            </h3>
            <p className="text-xs text-slate-400">Append-only immutable event ledger. Zero edit or deletion permitted.</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs bg-rose-500/20 text-rose-300 px-2.5 py-1 rounded border border-rose-500/30 font-medium">
            <Lock className="w-3.5 h-3.5" />
            <span>Delete Action: Prohibited by Security Policy</span>
          </div>
        </div>
      </div>

      <div className="p-3 bg-slate-50 border-b border-slate-200 flex items-center gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by Project ID, Customer, Staff Name, or Action..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>
        <div className="text-xs text-slate-500">
          Showing <span className="font-semibold text-slate-900">{filteredLogs.length}</span> logged actions
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="bg-slate-100 text-slate-600 uppercase font-semibold text-[10px] tracking-wider border-b border-slate-200">
            <tr>
              <th className="py-2.5 px-3">Timestamp (IST)</th>
              <th className="py-2.5 px-3">Actor & Role</th>
              <th className="py-2.5 px-3">Project & Customer</th>
              <th className="py-2.5 px-3">Action Executed</th>
              <th className="py-2.5 px-3">Stage Transition</th>
              <th className="py-2.5 px-3 text-right">Delete Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-50/80 transition-colors">
                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-500 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-2.5 px-3">
                  <div className="font-semibold text-slate-900">{log.staffName}</div>
                  <div className="text-[10px] text-slate-500">{log.role}</div>
                </td>
                <td className="py-2.5 px-3">
                  <span className="font-mono text-sky-700 font-semibold">{log.projectId}</span>
                  <div className="text-[11px] text-slate-600">{log.customerName}</div>
                </td>
                <td className="py-2.5 px-3 font-medium text-slate-800">{log.action}</td>
                <td className="py-2.5 px-3">
                  <span className="text-[10px] bg-slate-100 text-slate-700 px-2 py-0.5 rounded border border-slate-200">
                    {log.stageTransition}
                  </span>
                </td>
                <td className="py-2.5 px-3 text-right">
                  <span className="inline-flex items-center gap-1 text-[10px] text-slate-400 bg-slate-100 px-2 py-0.5 rounded border border-slate-200 cursor-not-allowed select-none">
                    <Lock className="w-3 h-3 text-slate-400" />
                    Locked (No Delete)
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
