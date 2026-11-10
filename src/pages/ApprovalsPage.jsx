import React, { useState } from "react";
import { 
  ShieldCheck, CheckCircle2, RotateCcw, AlertTriangle, 
  Search, Filter, Printer, FileText, ShoppingCart, 
  IndianRupee, CheckSquare, Clock, User, Calendar, 
  ArrowRight, Building, Sparkles, ChevronRight
} from "lucide-react";
import { 
  APPROVAL_WORKFLOW_TYPES, 
  INITIAL_APPROVAL_REQUESTS 
} from "@/data/approvalsData";
import ApprovalDecisionModal from "@/components/approvals/ApprovalDecisionModal";

export default function ApprovalsPage() {
  const [requests, setRequests] = useState(INITIAL_APPROVAL_REQUESTS);
  const [activeWorkflowTab, setActiveWorkflowTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedRequestForDecision, setSelectedRequestForDecision] = useState(null);

  // Stats calculation
  const totalPending = requests.filter(r => r.status === "Pending Approval").length;
  const proposalPending = requests.filter(r => r.workflowType === "proposal" && r.status === "Pending Approval").length;
  const purchasePending = requests.filter(r => r.workflowType === "purchase" && r.status === "Pending Approval").length;
  const paymentPending = requests.filter(r => r.workflowType === "payment" && r.status === "Pending Approval").length;
  const completionPending = requests.filter(r => r.workflowType === "completion" && r.status === "Pending Approval").length;

  // Filtered requests
  const filteredRequests = requests.filter(req => {
    const q = searchQuery.toLowerCase();
    const matchesQuery = 
      req.id.toLowerCase().includes(q) ||
      req.title.toLowerCase().includes(q) ||
      req.customerName.toLowerCase().includes(q) ||
      req.projectId.toLowerCase().includes(q);

    const matchesWorkflow = activeWorkflowTab === "all" || req.workflowType === activeWorkflowTab;
    const matchesStatus = statusFilter === "all" || req.status === statusFilter;

    return matchesQuery && matchesWorkflow && matchesStatus;
  });

  const handleDecisionSubmit = (requestId, decisionRecord) => {
    setRequests(prev => prev.map(req => {
      if (req.id === requestId) {
        return {
          ...req,
          status: decisionRecord.decision,
          history: [decisionRecord, ...req.history]
        };
      }
      return req;
    }));
  };

  return (
    <div className="space-y-6 pb-16">
      
      {/* Top Header Card */}
      <div className="glass-surface p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              Section 33 • Governance System
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              4 Corporate Workflows
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Role-Based Approval & Verification Center
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Traceable decision checkpoints for Proposals, Purchase Requests (PR to PO), Subcontractor Payments, and Handover Verifications.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            disabled
            title="Printing is disabled by System Governance policy"
            className="apple-button px-4 py-2.5 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed flex items-center space-x-1.5 shadow-none opacity-60"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Print Register (Disabled)</span>
          </button>
        </div>
      </div>

      {/* 5 KPI Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">Pending Decisions</span>
          <div className="text-2xl font-black text-blue-700 font-mono">{totalPending}</div>
          <span className="text-[10px] text-blue-600 font-medium">Awaiting management review</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">1. Proposals Pending</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{proposalPending}</div>
          <span className="text-[10px] text-slate-500 font-medium">Proposal → Customer Gate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">2. Purchase Requisitions</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{purchasePending}</div>
          <span className="text-[10px] text-slate-500 font-medium">PR → Vendor PO Gate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">3. Payment Releases</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{paymentPending}</div>
          <span className="text-[10px] text-slate-500 font-medium">Request → Disburse Gate</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs space-y-1">
          <span className="text-[10px] font-bold uppercase text-slate-400 font-mono block">4. Final Closures</span>
          <div className="text-2xl font-black text-slate-900 font-mono">{completionPending}</div>
          <span className="text-[10px] text-slate-500 font-medium">Completion → Verify Gate</span>
        </div>
      </div>

      {/* 4 Workflow Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 sm:space-x-4 text-xs font-medium overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        <button
          onClick={() => setActiveWorkflowTab("all")}
          className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all text-xs font-semibold ${
            activeWorkflowTab === "all"
              ? "bg-slate-900 text-white shadow-xs font-bold"
              : "text-slate-500 hover:text-slate-900 hover:bg-white"
          }`}
        >
          All Approval Workflows ({requests.length})
        </button>

        {APPROVAL_WORKFLOW_TYPES.map(wf => {
          const count = requests.filter(r => r.workflowType === wf.id && r.status === "Pending Approval").length;
          return (
            <button
              key={wf.id}
              onClick={() => setActiveWorkflowTab(wf.id)}
              className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all text-xs font-semibold flex items-center space-x-1.5 ${
                activeWorkflowTab === wf.id
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "text-slate-500 hover:text-slate-900 hover:bg-white"
              }`}
            >
              <span>{wf.label}</span>
              {count > 0 && (
                <span className="px-1.5 py-0.2 rounded-full text-[9px] font-bold bg-blue-500 text-white">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Filter Bar */}
      <div className="glass-surface p-3 sm:p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        
        {/* Search */}
        <div className="relative w-full md:w-80">
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search request ID, project, customer, title..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
          />
        </div>

        {/* Status Filter Dropdown */}
        <div className="flex items-center space-x-2 w-full md:w-auto justify-end">
          <span className="text-slate-400 font-medium">Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
          >
            <option value="all">All Statuses ({requests.length})</option>
            <option value="Pending Approval">Pending Approval ({totalPending})</option>
            <option value="Approved">Approved</option>
            <option value="Returned for Changes">Returned for Changes</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>

      </div>

      {/* Approval Requests Cards Grid */}
      <div className="grid grid-cols-1 gap-4">
        {filteredRequests.map(req => {
          const isPending = req.status === "Pending Approval";
          const isApproved = req.status === "Approved";
          const isReturned = req.status === "Returned for Changes";
          const isRejected = req.status === "Rejected";

          return (
            <div
              key={req.id}
              className="p-5 sm:p-6 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all space-y-4"
            >
              
              {/* Header Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                    {req.id}
                  </span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                    {req.workflowType === "proposal" ? "Workflow 1: Proposal"
                      : req.workflowType === "purchase" ? "Workflow 2: Purchase (PR→PO)"
                      : req.workflowType === "payment" ? "Workflow 3: Payment"
                      : "Workflow 4: Completion"}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                    isApproved ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                      : isPending ? "bg-blue-50 text-blue-700 border border-blue-200 animate-pulse"
                      : isReturned ? "bg-indigo-50 text-indigo-700 border border-indigo-200"
                      : "bg-rose-50 text-rose-700 border border-rose-200"
                  }`}>
                    {req.status}
                  </span>
                </div>

                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono text-slate-400">
                    Requested by: <strong>{req.requestedBy.name}</strong> ({req.requestedBy.role}) on {req.requestedBy.date}
                  </span>
                </div>
              </div>

              {/* Title & Customer Information */}
              <div>
                <h3 className="font-bold text-slate-900 text-base">{req.title}</h3>
                <div className="text-xs text-slate-500 font-mono mt-0.5">
                  Project: <strong className="text-blue-700">{req.projectId}</strong> • Customer: <strong className="text-slate-800">{req.customerName}</strong> ({req.customerCode}) • {req.branch}
                </div>
              </div>

              {/* Workflow-Specific Parameters Summary Card */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                {req.workflowType === "proposal" && (
                  <>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Proposed Capacity</span>
                      <strong className="text-emerald-700 text-sm block">{req.details.capacityKw} kWp</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Total Project Value</span>
                      <strong className="text-slate-900 text-sm block">₹{req.details.totalValue.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Structure Type</span>
                      <span className="text-slate-700 font-semibold block truncate">{req.details.structureType}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Concession / Rebate</span>
                      <span className="text-blue-700 font-semibold block truncate">{req.details.discountApplied}</span>
                    </div>
                  </>
                )}

                {req.workflowType === "purchase" && (
                  <>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Target Vendor</span>
                      <strong className="text-slate-900 block truncate">{req.details.vendorName}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Requisition Value</span>
                      <strong className="text-slate-900 text-sm block">₹{req.details.requisitionAmount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Material Scope</span>
                      <span className="text-slate-700 font-semibold block truncate">{req.details.materialDescription}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Payment Terms</span>
                      <span className="text-emerald-700 font-semibold block truncate">{req.details.paymentTerms}</span>
                    </div>
                  </>
                )}

                {req.workflowType === "payment" && (
                  <>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Payee Subcontractor</span>
                      <strong className="text-slate-900 block truncate">{req.details.subcontractor}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Gross Bill Amount</span>
                      <strong className="text-slate-900 text-sm block">₹{req.details.billAmount.toLocaleString()}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Progress Verified</span>
                      <span className="text-emerald-700 font-semibold block truncate">{req.details.stageCompletionPercent}</span>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">10% Retention Withheld</span>
                      <span className="text-slate-600 font-semibold block">₹{req.details.retentionAmount?.toLocaleString()}</span>
                    </div>
                  </>
                )}

                {req.workflowType === "completion" && (
                  <>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Commissioned Capacity</span>
                      <strong className="text-emerald-700 text-sm block">{req.details.systemCapacityKw} kWp</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Grid Synchronization</span>
                      <strong className="text-slate-900 block">{req.details.discomSynchronizationDate}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Earthing Pit Test</span>
                      <strong className="text-blue-700 block">{req.details.earthPitReading}</strong>
                    </div>
                    <div>
                      <span className="text-[9px] uppercase font-bold text-slate-400 block">Ledger Outstanding</span>
                      <strong className="text-emerald-800 block truncate">{req.details.ledgerOutstanding}</strong>
                    </div>
                  </>
                )}
              </div>

              {/* 5-Point Traceable Decision Record Card */}
              {req.history && req.history.length > 0 && (
                <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-800 font-mono flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Traceable Approval Decision Record (Section 33 Standard)</span>
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800">
                      DECISION: {req.history[0].decision.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-mono text-slate-700 pt-1">
                    <div>
                      <span className="text-slate-400 block text-[9px]">1. APPROVER:</span>
                      <strong>{req.history[0].approver}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">ROLE:</span>
                      <span>{req.history[0].approverRole}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">2. DATE:</span>
                      <strong>{req.history[0].date}</strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[9px]">3. TIME:</span>
                      <strong>{req.history[0].time}</strong>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-emerald-200/60">
                    <span className="text-slate-400 block text-[9px] font-mono">5. APPROVAL REMARKS & AUTHORIZATION JUSTIFICATION:</span>
                    <p className="text-slate-800 font-medium text-xs mt-0.5 italic">
                      "{req.history[0].remarks}"
                    </p>
                  </div>
                </div>
              )}

              {/* Bottom Action Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pt-2 border-t border-slate-100 text-xs">
                <div className="text-[11px] text-slate-500 font-mono">
                  <span className="text-slate-400">Next Action:</span> <strong>{req.nextStep}</strong>
                </div>

                {isPending && (
                  <button
                    onClick={() => setSelectedRequestForDecision(req)}
                    className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black flex items-center space-x-1.5 shadow-sm"
                  >
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Review & Record Decision</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
                  </button>
                )}
              </div>

            </div>
          );
        })}

        {filteredRequests.length === 0 && (
          <div className="p-8 rounded-3xl bg-white border border-slate-200 text-center text-slate-400 text-xs">
            No approval requests match the current filters.
          </div>
        )}
      </div>

      {/* DECISION ACTION MODAL */}
      <ApprovalDecisionModal
        isOpen={!!selectedRequestForDecision}
        request={selectedRequestForDecision}
        onClose={() => setSelectedRequestForDecision(null)}
        onSubmitDecision={handleDecisionSubmit}
      />

    </div>
  );
}
