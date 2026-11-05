import React, { useState } from "react";
import { 
  CheckCircle2, ShieldCheck, Calendar, User, Zap, 
  IndianRupee, Briefcase, Clock, FileText, ArrowRight, X, 
  AlertCircle, Printer, Download, Sparkles, Building, Phone, Mail
} from "lucide-react";
import Portal from "@/components/Portal";

export default function CustomerConfirmationModal({
  isOpen,
  proposal,
  project,
  onClose,
  onConfirmConversion
}) {
  const [salesperson, setSalesperson] = useState(project?.salesRep || "Rajkumar S");
  const [projectManager, setProjectManager] = useState(project?.assignedEngineer?.split("(")[0]?.trim() || "S. Karthik");
  const [confirmationMode, setConfirmationMode] = useState("Signed Physical Work Order");
  const [workOrderRef, setWorkOrderRef] = useState(`WO-NIRT-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  const [targetDays, setTargetDays] = useState(30);
  const [confirmedSuccessData, setConfirmedSuccessData] = useState(null);

  if (!isOpen) return null;

  // Auto-generate identifiers
  const generatedProjectId = project?.id?.startsWith("NIRT-") ? project.id : `NIRT-26-00${Math.floor(45 + Math.random() * 50)}`;
  const districtCode = (project?.district || project?.branch || "Salem").substring(0, 3).toUpperCase();
  const generatedCustomerId = project?.customerCode || `CUST-${districtCode}-${Math.floor(100 + Math.random() * 900)}`;
  
  const registrationDate = new Date().toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const completionDateObj = new Date();
  completionDateObj.setDate(completionDateObj.getDate() + Number(targetDays));
  const expectedCompletionDate = completionDateObj.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });

  const confirmedCapacity = proposal?.capacityKw || project?.capacityKw || 5.4;
  const confirmedValue = proposal?.totalProjectValue || project?.totalValue || 275396;
  const customerPayable = proposal?.customerPayable || (confirmedValue - (project?.subsidyEligible || 78000));

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const confirmedRecord = {
      projectId: generatedProjectId,
      customerId: generatedCustomerId,
      registrationDate,
      confirmedCapacity: `${confirmedCapacity} kWp`,
      projectValue: confirmedValue,
      customerPayable,
      salesperson,
      projectManager,
      expectedCompletionDate,
      confirmationMode,
      workOrderRef,
      targetDays,
      status: "Confirmed Project",
      pipeline: "approvals",
      stage: "step_07",
      stageName: "80% Advance Receipt Gatekeeper"
    };

    setConfirmedSuccessData(confirmedRecord);
    if (onConfirmConversion) {
      onConfirmConversion(confirmedRecord);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-2xl w-full p-6 sm:p-7 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  Section 9 • Customer Order Confirmation
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  Lead-to-Project Conversion
                </span>
              </div>
              <h2 className="text-xl font-bold text-slate-900 mt-1.5">
                {confirmedSuccessData ? "Project Confirmed & Converted Successfully!" : "Convert Lead to Confirmed Project"}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {confirmedSuccessData 
                  ? "Commercial acceptance verified. Official project registration certificate generated below."
                  : "Customer accepted proposal. System will lock commercial parameters, assign PMO lead, and advance to Stage 7."}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="p-1.5 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {!confirmedSuccessData ? (
            /* CONVERSION FORM */
            <form onSubmit={handleFormSubmit} className="space-y-5 text-xs">
              
              {/* Customer Info Pill */}
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Customer Name & Contact</span>
                  <div className="font-bold text-slate-900 text-sm">{project?.customerName || "K. Sengottaiyan"}</div>
                  <div className="text-[11px] text-slate-500 font-mono">{project?.phone || "9842178234"} • {project?.address || "Salem Circle"}</div>
                </div>
                <div className="sm:text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Proposal Selected</span>
                  <div className="font-mono font-bold text-blue-700">Revision {proposal?.version || "v1.2"} (Accepted)</div>
                  <div className="text-[11px] text-emerald-700 font-semibold">DBT Subsidy: ₹{(proposal?.subsidy || 78000).toLocaleString()}</div>
                </div>
              </div>

              {/* 8 Generated Parameters Grid Preview */}
              <div>
                <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-700 mb-2 font-mono flex items-center space-x-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-blue-600" />
                  <span>The 8 Core Project Governance Parameters</span>
                </h4>
                
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 p-4 rounded-2xl bg-blue-50/40 border border-blue-100">
                  {/* 1. Unique Project ID */}
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/60 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">1. Unique Project ID</span>
                    <span className="font-mono font-bold text-blue-700 text-xs sm:text-sm block truncate">{generatedProjectId}</span>
                  </div>

                  {/* 2. Customer ID */}
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/60 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">2. Customer ID</span>
                    <span className="font-mono font-bold text-slate-800 text-xs sm:text-sm block truncate">{generatedCustomerId}</span>
                  </div>

                  {/* 3. Confirmed Capacity */}
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/60 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">3. Confirmed Capacity</span>
                    <span className="font-mono font-bold text-emerald-700 text-xs sm:text-sm block">{confirmedCapacity} kWp</span>
                  </div>

                  {/* 4. Project Value */}
                  <div className="bg-white p-2.5 rounded-xl border border-blue-200/60 shadow-2xs">
                    <span className="text-[9px] font-bold uppercase text-slate-400 block font-mono">4. Project Value</span>
                    <span className="font-mono font-bold text-slate-900 text-xs sm:text-sm block">₹{confirmedValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Personnel Assignment & Expected Dates */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* 5. Salesperson */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    5. Salesperson (Closing Executive)
                  </label>
                  <select
                    value={salesperson}
                    onChange={(e) => setSalesperson(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="Rajkumar S">Rajkumar S (Technical Sales)</option>
                    <option value="P. Vijayakumar">P. Vijayakumar (Sales Lead)</option>
                    <option value="K. Anitha">K. Anitha (CRM Executive)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">Responsible for proposal negotiation and client acceptance.</p>
                </div>

                {/* 6. Project Manager */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    6. Project Manager (Execution In-Charge)
                  </label>
                  <select
                    value={projectManager}
                    onChange={(e) => setProjectManager(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                  >
                    <option value="S. Karthik">S. Karthik (Central PMO Lead)</option>
                    <option value="M. Saravanan">M. Saravanan (EPC Execution Lead)</option>
                    <option value="Er. A. Syed">Er. A. Syed (Super Admin)</option>
                  </select>
                  <p className="text-[10px] text-slate-400 mt-1">Responsible for EPC execution, stage-gate clearances, and commissioning.</p>
                </div>

                {/* 7. Project Registration Date */}
                <div>
                  <label className="font-bold text-slate-700 block mb-1">
                    7. Project Registration Date
                  </label>
                  <div className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-700 font-mono font-semibold flex items-center justify-between">
                    <span>{registrationDate}</span>
                    <Calendar className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Timestamp marking conversion from Lead to Confirmed Project.</p>
                </div>

                {/* 8. Expected Completion Date */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="font-bold text-slate-700">8. Expected Completion Date</label>
                    <div className="flex items-center space-x-1 font-mono text-[10px]">
                      <span className="text-slate-400">SLA:</span>
                      <button
                        type="button"
                        onClick={() => setTargetDays(30)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${targetDays === 30 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        30d
                      </button>
                      <button
                        type="button"
                        onClick={() => setTargetDays(45)}
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${targetDays === 45 ? "bg-slate-900 text-white" : "bg-slate-100 text-slate-600"}`}
                      >
                        45d
                      </button>
                    </div>
                  </div>
                  <div className="w-full px-3 py-2 rounded-xl border border-emerald-200 bg-emerald-50/60 text-emerald-800 font-mono font-bold flex items-center justify-between">
                    <span>{expectedCompletionDate} ({targetDays} Days SLA)</span>
                    <Clock className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Standard turnkey handover timeline commitment.</p>
                </div>
              </div>

              {/* Acceptance Details & Reference */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-100">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Acceptance Mode</label>
                  <select
                    value={confirmationMode}
                    onChange={(e) => setConfirmationMode(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
                  >
                    <option value="Signed Physical Work Order">Signed Physical Work Order</option>
                    <option value="Customer Portal OTP E-Signature">Customer Portal OTP E-Signature</option>
                    <option value="Formal Email Authorization">Formal Email Authorization</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">Customer Work Order Reference #</label>
                  <input
                    type="text"
                    value={workOrderRef}
                    onChange={(e) => setWorkOrderRef(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono font-semibold"
                  />
                </div>
              </div>

              {/* Stage Transition Notice */}
              <div className="p-3.5 rounded-2xl bg-blue-50/80 border border-blue-200 text-blue-900 flex items-start space-x-2.5">
                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs leading-relaxed">
                  <strong>Automatic Pipeline Transition:</strong> Upon clicking Confirm, this project is converted from Sales Pipeline (Step 06) into <strong>Pipeline 2: Advance & Approvals (Step 07: 80% Advance Receipt Gatekeeper)</strong>.
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
                  className="apple-button px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm flex items-center space-x-2"
                >
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>Confirm Project & Move to Next Stage</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 text-slate-400" />
                </button>
              </div>
            </form>
          ) : (
            /* OFFICIAL CONFIRMATION CERTIFICATE (AFTER SUCCESS) */
            <div className="space-y-6">
              
              {/* Printable Certificate Card */}
              <div className="p-6 rounded-3xl bg-white border-2 border-slate-900 shadow-sm space-y-5 print:border-none print:shadow-none">
                
                {/* Header with NIRT Branding */}
                <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                  <div>
                    <div className="text-lg font-black text-slate-900 tracking-tight font-mono">NIRT ENERGIES PRIVATE LIMITED</div>
                    <div className="text-[10px] text-slate-500 font-mono">Commercial EPC CRM System • Official Customer Confirmation Certificate</div>
                  </div>
                  <div className="text-right">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
                      STATUS: CONFIRMED PROJECT
                    </span>
                    <div className="text-[10px] font-mono text-slate-500 mt-1">Ref: {confirmedSuccessData.workOrderRef}</div>
                  </div>
                </div>

                {/* 8 Master Parameters Table */}
                <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs font-mono">
                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">1. UNIQUE PROJECT ID</span>
                    <span className="font-bold text-blue-700 text-sm">{confirmedSuccessData.projectId}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">2. CUSTOMER ID</span>
                    <span className="font-bold text-slate-800 text-sm">{confirmedSuccessData.customerId}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">3. PROJECT REGISTRATION DATE</span>
                    <span className="font-bold text-slate-800">{confirmedSuccessData.registrationDate}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">4. CONFIRMED CAPACITY</span>
                    <span className="font-bold text-emerald-700">{confirmedSuccessData.confirmedCapacity}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">5. PROJECT VALUE</span>
                    <span className="font-bold text-slate-900">₹{confirmedSuccessData.projectValue.toLocaleString()} (Payable: ₹{confirmedSuccessData.customerPayable.toLocaleString()})</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">6. SALESPERSON (CLOSER)</span>
                    <span className="font-bold text-slate-800">{confirmedSuccessData.salesperson}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">7. PROJECT MANAGER (PMO)</span>
                    <span className="font-bold text-slate-800">{confirmedSuccessData.projectManager}</span>
                  </div>

                  <div className="py-1 border-b border-slate-100">
                    <span className="text-slate-400 block text-[10px]">8. EXPECTED COMPLETION DATE</span>
                    <span className="font-bold text-emerald-800">{confirmedSuccessData.expectedCompletionDate} ({confirmedSuccessData.targetDays} Days SLA)</span>
                  </div>
                </div>

                {/* Handover & Stage Gate Notice */}
                <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs">
                  <div className="font-bold flex items-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Transferred to Pipeline 2: Advance & Approvals</span>
                  </div>
                  <p className="text-[11px] text-emerald-800 mt-1">
                    Lead successfully closed and locked. Project handoff initiated to {confirmedSuccessData.projectManager}. Step 07 (80% Advance Payment Gatekeeper) is now active and awaiting accounts verification.
                  </p>
                </div>
              </div>

              {/* Success Action Buttons */}
              <div className="flex flex-col sm:flex-row justify-between items-center gap-3 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={handlePrintCertificate}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 w-full sm:w-auto justify-center shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>Print Confirmation Certificate</span>
                </button>

                <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
                  <button
                    type="button"
                    onClick={onClose}
                    className="apple-button px-5 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-slate-800 shadow-sm flex items-center space-x-1.5 w-full sm:w-auto justify-center"
                  >
                    <span>View Project in Pipeline 2</span>
                    <ArrowRight className="w-3.5 h-3.5 ml-1" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
}
