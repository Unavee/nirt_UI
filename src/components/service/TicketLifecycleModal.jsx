import React, { useState } from "react";
import { 
  X, CheckCircle2, Clock, User, Phone, MapPin, 
  Wrench, ShieldCheck, ArrowRight, Star, FileText, 
  AlertCircle, Check, Sparkles, Building, Zap, Printer
} from "lucide-react";
import Portal from "@/components/Portal";
import { TICKET_STAGES } from "@/data/serviceTicketsData";

export default function TicketLifecycleModal({
  isOpen,
  ticket,
  onClose,
  onUpdateTicket
}) {
  const [activeStage, setActiveStage] = useState(ticket?.stage || "complaint");
  const [assignedTechnician, setAssignedTechnician] = useState(ticket?.assignedTechnician || "M. Saravanan (EPC Lead)");
  const [actionNotes, setActionNotes] = useState(ticket?.actionNotes || "");
  const [resolutionDetails, setResolutionDetails] = useState(ticket?.resolutionDetails || "");
  const [customerRating, setCustomerRating] = useState(ticket?.rating || 5);
  const [customerFeedback, setCustomerFeedback] = useState(ticket?.customerSignOff?.feedback || "Issue resolved quickly and plant generation restored.");
  const [showPrintView, setShowPrintView] = useState(false);

  if (!isOpen || !ticket) return null;

  const currentStageIndex = TICKET_STAGES.findIndex(s => s.id === activeStage);

  const handleAdvanceStage = (nextStageId) => {
    setActiveStage(nextStageId);
    const updated = {
      ...ticket,
      stage: nextStageId,
      assignedTechnician,
      actionNotes,
      resolutionDetails,
      ...(nextStageId === "customer_confirmation" || nextStageId === "closure" ? {
        customerSignOff: {
          confirmedBy: ticket.customerName,
          mode: "Digital OTP Sign-off",
          date: new Date().toLocaleDateString("en-IN") + " " + new Date().toLocaleTimeString("en-IN"),
          rating: customerRating,
          feedback: customerFeedback
        },
        rating: customerRating
      } : {})
    };

    onUpdateTicket(updated);
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full text-[10px]">
                  {ticket.id}
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-200 font-mono">
                  {ticket.categoryLabel}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                  ticket.priority === "Critical" ? "bg-rose-100 text-rose-800 border border-rose-300"
                    : ticket.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200"
                    : "bg-blue-50 text-blue-700 border border-blue-200"
                }`}>
                  {ticket.priority} Priority
                </span>
              </div>
              <h2 className="text-lg font-bold text-slate-900 mt-1.5">{ticket.title}</h2>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {ticket.customerName} ({ticket.customerCode}) • {ticket.branch} • Plant Ref: {ticket.projectId}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 6-Stage Visual Stepper */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-3 font-mono">
              6-Stage Resolution Lifecycle (BFRD Standard)
            </span>
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs">
              {TICKET_STAGES.map((stg, idx) => {
                const isPassed = idx < currentStageIndex;
                const isCurrent = idx === currentStageIndex;

                return (
                  <div 
                    key={stg.id}
                    className={`p-2 rounded-xl border flex flex-col items-center justify-center transition-all ${
                      isCurrent
                        ? "bg-slate-900 text-white border-slate-900 shadow-xs font-bold"
                        : isPassed
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200 font-semibold"
                        : "bg-white text-slate-400 border-slate-200"
                    }`}
                  >
                    <span className="text-[9px] font-mono block">Step 0{idx + 1}</span>
                    <span className="text-xs font-bold mt-0.5">{stg.shortLabel}</span>
                    {isPassed && <CheckCircle2 className="w-3 h-3 text-emerald-600 mt-1" />}
                    {isCurrent && <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 mt-1 animate-pulse" />}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Plant & Customer Information */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-3.5 rounded-2xl bg-white border border-slate-200 text-xs font-mono">
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Contact Phone</span>
              <span className="font-semibold text-slate-800">{ticket.phone}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">EB Consumer #</span>
              <span className="font-semibold text-slate-800">{ticket.consumerNumber}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Logged Timestamp</span>
              <span className="font-semibold text-slate-800">{ticket.createdDate}</span>
            </div>
            <div>
              <span className="text-[9px] uppercase font-bold text-slate-400 block">Warranty Coverage</span>
              <span className="font-bold text-emerald-700 truncate block">{ticket.warrantyLink}</span>
            </div>
          </div>

          {/* Current Stage Actions Container */}
          <div className="space-y-4 text-xs">
            
            {/* STAGE 1: COMPLAINT -> ASSIGNMENT */}
            {activeStage === "complaint" && (
              <div className="p-4 rounded-2xl bg-blue-50/50 border border-blue-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                    <User className="w-4 h-4 text-blue-600" />
                    <span>Stage 2: Assign Technician / O&M Engineer</span>
                  </h4>
                  <span className="text-[10px] text-blue-700 font-mono font-bold">SLA: 24h Response</span>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Select Field Engineer / Lead</label>
                  <select
                    value={assignedTechnician}
                    onChange={(e) => setAssignedTechnician(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
                  >
                    <option value="M. Saravanan (EPC Field Lead)">M. Saravanan (EPC Field Lead)</option>
                    <option value="K. Murali (Site Survey & O&M)">K. Murali (Site Survey & O&M)</option>
                    <option value="V. Thangavel (Liaison & Metering Officer)">V. Thangavel (Liaison & Metering Officer)</option>
                    <option value="K. Anitha (CRM Executive)">K. Anitha (CRM Executive)</option>
                  </select>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleAdvanceStage("assignment")}
                    className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Assign & Advance to Stage 2</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 2: ASSIGNMENT -> ACTION */}
            {activeStage === "assignment" && (
              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                    <Wrench className="w-4 h-4 text-indigo-600" />
                    <span>Stage 3: Dispatch Technician & Field Inspection Action</span>
                  </h4>
                  <span className="text-[10px] text-indigo-700 font-mono font-bold">Assigned: {assignedTechnician}</span>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Field Diagnostics & Spares Preparation</label>
                  <textarea
                    rows={3}
                    value={actionNotes}
                    onChange={(e) => setActionNotes(e.target.value)}
                    placeholder="e.g. Technician dispatched with digital clamp multimeter, spare 540W module, and Sungrow firmware dongle..."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleAdvanceStage("action")}
                    className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Log Action & Start Diagnosis (Stage 3)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 3: ACTION -> RESOLUTION */}
            {activeStage === "action" && (
              <div className="p-4 rounded-2xl bg-violet-50/50 border border-violet-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-violet-600" />
                    <span>Stage 4: Record Technical Resolution</span>
                  </h4>
                  <span className="text-[10px] text-violet-700 font-mono font-bold">In-Field Work</span>
                </div>
                <div>
                  <label className="font-semibold text-slate-700 block mb-1">Resolution Summary & Test Verifications</label>
                  <textarea
                    rows={3}
                    value={resolutionDetails}
                    onChange={(e) => setResolutionDetails(e.target.value)}
                    placeholder="e.g. Grid frequency settings recalibrated. Error E014 cleared. System generating 24.5 kWh pass verified."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
                  />
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleAdvanceStage("resolution")}
                    className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Mark Technical Fix Complete (Stage 4)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 4: RESOLUTION -> CUSTOMER CONFIRMATION */}
            {activeStage === "resolution" && (
              <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-slate-900 text-xs flex items-center space-x-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Stage 5: Request Customer Confirmation & OTP Sign-off</span>
                  </h4>
                  <span className="text-[10px] text-emerald-700 font-mono font-bold">Verification Gate</span>
                </div>
                <p className="text-xs text-slate-600">
                  Technician resolved the issue. Send OTP or obtain customer confirmation to verify power generation is restored.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Customer Rating (1-5 Stars)</label>
                    <div className="flex items-center space-x-1">
                      {[1, 2, 3, 4, 5].map(star => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setCustomerRating(star)}
                          className={`p-1.5 rounded-lg ${customerRating >= star ? "text-blue-600" : "text-slate-300"}`}
                        >
                          <Star className="w-4 h-4 fill-current" />
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="font-semibold text-slate-700 block mb-1">Customer Feedback Note</label>
                    <input
                      type="text"
                      value={customerFeedback}
                      onChange={(e) => setCustomerFeedback(e.target.value)}
                      className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800"
                    />
                  </div>
                </div>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleAdvanceStage("customer_confirmation")}
                    className="apple-button px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold flex items-center space-x-1.5 shadow-sm"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Customer Confirmed & Satisfied (Stage 5)</span>
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 5: CUSTOMER CONFIRMATION -> CLOSURE */}
            {activeStage === "customer_confirmation" && (
              <div className="p-4 rounded-2xl bg-slate-900 text-white space-y-3">
                <div className="flex justify-between items-center">
                  <h4 className="font-bold text-white text-xs flex items-center space-x-1.5">
                    <Sparkles className="w-4 h-4 text-emerald-400" />
                    <span>Stage 6: Final Ticket Closure & Archive</span>
                  </h4>
                  <span className="text-[10px] text-emerald-400 font-mono font-bold">Confirmed by Customer ✓</span>
                </div>
                <p className="text-xs text-slate-300">
                  Customer has confirmed resolution. Ticket will be locked and archived into the permanent plant service ledger.
                </p>
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => handleAdvanceStage("closure")}
                    className="apple-button px-5 py-2 rounded-xl bg-white text-slate-900 font-bold hover:bg-slate-100 flex items-center space-x-1.5 shadow-sm"
                  >
                    <span>Close Ticket & Archive</span>
                    <Check className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}

            {/* STAGE 6: CLOSURE (CLOSED STATE) */}
            {activeStage === "closure" && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-2">
                <div className="flex items-center space-x-2 font-bold text-xs">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Ticket Closed & Permanently Archived</span>
                </div>
                <p className="text-[11px] text-emerald-800">
                  This service ticket has completed all 6 stages of the BFRD resolution workflow. Customer satisfaction recorded at {ticket.rating || 5}/5 stars.
                </p>
              </div>
            )}

          </div>

          {/* Action Footer */}
          <div className="flex justify-between items-center pt-3 border-t border-slate-100">
            <button
              type="button"
              disabled
              title="Printing disabled by System Governance policy"
              className="apple-button px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed flex items-center space-x-1.5 shadow-none opacity-60"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Work Order (Disabled)</span>
            </button>

            <button
              type="button"
              onClick={onClose}
              className="apple-button px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
            >
              Close Window
            </button>
          </div>

        </div>
      </div>
    </Portal>
  );
}
