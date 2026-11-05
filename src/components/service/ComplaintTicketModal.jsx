import React, { useState } from "react";
import { 
  X, Headset, Zap, Cpu, Sun, Scale, ShieldAlert, Wrench, 
  AlertCircle, CheckCircle2, User, Phone, MapPin, Calendar, Clock
} from "lucide-react";
import Portal from "@/components/Portal";
import { COMPLAINT_CATEGORIES } from "@/data/serviceTicketsData";
import { MOCK_PROJECTS } from "@/data/mockProjects";

export default function ComplaintTicketModal({
  isOpen,
  prefilledProject,
  onClose,
  onSubmitTicket
}) {
  const [selectedProjectId, setSelectedProjectId] = useState(prefilledProject?.id || MOCK_PROJECTS[0].id);
  const [category, setCategory] = useState("inverter");
  const [priority, setPriority] = useState("High");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [contactPhone, setContactPhone] = useState(prefilledProject?.phone || "9842178234");
  const [preferredSlot, setPreferredSlot] = useState("Morning (09:00 AM - 01:00 PM)");

  if (!isOpen) return null;

  const currentProject = prefilledProject || MOCK_PROJECTS.find(p => p.id === selectedProjectId) || MOCK_PROJECTS[0];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const catObj = COMPLAINT_CATEGORIES.find(c => c.id === category) || COMPLAINT_CATEGORIES[0];
    const ticketId = `TKT-2026-${Math.floor(100 + Math.random() * 900)}`;

    const newTicket = {
      id: ticketId,
      projectId: currentProject.id,
      customerName: currentProject.customerName,
      customerCode: currentProject.customerCode || "CUST-SLM-0089",
      phone: contactPhone,
      branch: currentProject.branch || "Salem (HQ)",
      consumerNumber: currentProject.consumerNumber || "04-219-002-1482",
      category,
      categoryLabel: catObj.label,
      title,
      description,
      priority,
      stage: "complaint", // 1. Complaint
      assignedTechnician: "Unassigned (Pending PMO Queue)",
      createdDate: new Date().toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
      }) + ", " + new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) + " IST",
      targetResolutionDate: "Within 48h SLA",
      slaStatus: "New Ticket (SLA Active)",
      actionNotes: "",
      resolutionDetails: "",
      customerSignOff: null,
      rating: null,
      warrantyLink: `${currentProject.capacityKw} kWp Turnkey O&M Protection`
    };

    onSubmitTicket(newTicket);
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                  Section 35 • Customer Service
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  Complaint Intake
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1.5">Raise Customer Support Ticket</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Log service, generation, inverter, or warranty claims for post-commissioning customer plants.
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
            
            {/* Project / Customer Selection */}
            {!prefilledProject && (
              <div>
                <label className="font-bold text-slate-700 block mb-1">Select Commissioned Customer Plant</label>
                <select
                  value={selectedProjectId}
                  onChange={(e) => {
                    setSelectedProjectId(e.target.value);
                    const found = MOCK_PROJECTS.find(p => p.id === e.target.value);
                    if (found) setContactPhone(found.phone);
                  }}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                >
                  {MOCK_PROJECTS.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.customerName} ({p.id}) • {p.capacityKw} kWp • {p.branch}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Customer Plant Summary Card */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Customer</span>
                <span className="font-bold text-slate-900 block truncate">{currentProject.customerName}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Project ID</span>
                <span className="font-bold text-blue-700 block truncate">{currentProject.id}</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">System Capacity</span>
                <span className="font-bold text-emerald-700 block">{currentProject.capacityKw} kWp</span>
              </div>
              <div>
                <span className="text-[9px] uppercase font-bold text-slate-400 block">EB Consumer #</span>
                <span className="font-bold text-slate-700 block truncate">{currentProject.consumerNumber || "04-219-002-1482"}</span>
              </div>
            </div>

            {/* 7 Issue Categories Grid */}
            <div>
              <label className="font-bold text-slate-700 block mb-2">
                Complaint Category (Choose from the 7 BFRD Categories)
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {COMPLAINT_CATEGORIES.map(cat => {
                  const isSelected = category === cat.id;
                  return (
                    <button
                      key={cat.id}
                      type="button"
                      onClick={() => setCategory(cat.id)}
                      className={`p-2.5 rounded-2xl text-left border transition-all ${
                        isSelected 
                          ? "bg-slate-900 text-white border-slate-900 shadow-xs" 
                          : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <span className="font-bold text-xs block leading-tight">{cat.label}</span>
                      <span className={`text-[10px] block mt-1 line-clamp-1 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                        {cat.desc}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Priority & Contact */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Issue Severity / Priority</label>
                <div className="grid grid-cols-4 gap-2">
                  {["Low", "Medium", "High", "Critical"].map(p => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPriority(p)}
                      className={`py-1.5 rounded-xl text-xs font-bold border text-center transition-all ${
                        priority === p
                          ? p === "Critical" ? "bg-rose-600 text-white border-rose-600"
                            : p === "High" ? "bg-rose-50 text-rose-700 border-rose-300"
                            : p === "Medium" ? "bg-blue-50 text-blue-700 border-blue-300"
                            : "bg-slate-100 text-slate-800 border-slate-300"
                          : "bg-white text-slate-500 border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Customer Callback Phone</label>
                <input
                  type="text"
                  value={contactPhone}
                  onChange={(e) => setContactPhone(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono font-semibold"
                  placeholder="10-digit mobile number"
                />
              </div>
            </div>

            {/* Complaint Title & Details */}
            <div className="space-y-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Complaint Headline / Summary</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Inverter showing Error E014 or Generation dropped on String 2"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Detailed Symptoms & Inspection Notes</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe when the issue started, meter readings, fault lights observed, or weather conditions..."
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                />
              </div>
            </div>

            {/* 6-Stage Tracking Information Banner */}
            <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
              <div className="text-xs leading-relaxed">
                <strong>Sequential 6-Stage Tracking:</strong> Ticket will begin at <strong>Stage 1 (Complaint)</strong> and route through <em>Assignment ➔ Field Action ➔ Technical Resolution ➔ Customer Confirmation OTP ➔ Closure</em>.
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apple-button px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-sm flex items-center space-x-2"
              >
                <Headset className="w-4 h-4 text-blue-400" />
                <span>Submit Ticket & Generate ID</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
