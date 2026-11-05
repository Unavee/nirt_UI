import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Printer, Truck, Package, FileText, AlertCircle, ArrowUpRight } from "lucide-react";

export default function MaterialIssueModal({
  isOpen,
  onClose,
  item,
  projectId = "NIRT-26-0042",
  onConfirmIssue
}) {
  if (!isOpen || !item) return null;

  const currentAvailable = item.availableQty || 0;
  const currentPending = item.pendingQty ?? Math.max(0, item.requiredQty - item.issuedQty);

  const [issueQty, setIssueQty] = useState(Math.min(currentAvailable, currentPending > 0 ? currentPending : item.requiredQty));
  const [gatePassNo, setGatePassNo] = useState(`GP-SLM-2026-${projectId.replace("NIRT-26-", "")}-${Math.floor(10 + Math.random() * 90)}`);
  const [issuedTo, setIssuedTo] = useState("M. Saravanan (Senior Installation Lead)");
  const [contractorTeam, setContractorTeam] = useState("Salem EPC Installation Team #1");
  const [issueDate, setIssueDate] = useState(new Date().toISOString().split("T")[0]);
  const [vehicleNo, setVehicleNo] = useState("TN-30-AW-1928 (Site Utility Van)");
  const [storesOfficer, setStoresOfficer] = useState("V. Thangavel (Central Warehouse Keeper)");
  const [notes, setNotes] = useState("Materials picked from shelf, kitted and inspected prior to gate pass outward.");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Close on Escape key
  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      return () => window.removeEventListener("keydown", handleKeyDown);
    }
  }, [isOpen, onClose]);

  const numIssue = parseFloat(issueQty) || 0;
  const newAvailable = Math.max(0, currentAvailable - numIssue);
  const newIssued = (item.issuedQty || 0) + numIssue;
  const newPending = Math.max(0, (item.requiredQty || 0) - newIssued);
  const newShortage = Math.max(0, newPending - newAvailable);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numIssue <= 0) {
      setError("Please specify a valid quantity to issue.");
      return;
    }
    if (numIssue > currentAvailable) {
      setError(`Cannot issue ${numIssue} ${item.unit}. Only ${currentAvailable} ${item.unit} available in warehouse.`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const updatedItem = {
        ...item,
        availableQty: newAvailable,
        issuedQty: newIssued,
        pendingQty: newPending,
        shortageQty: newShortage,
        stage: newPending === 0 ? "issued" : "allocated",
        gatePassNumber: gatePassNo,
        issuedTo: issuedTo,
        issueDate: issueDate,
        notes: notes
      };

      onConfirmIssue(updatedItem);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Truck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Store Gate Pass (MIS)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  GP No: {gatePassNo}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Issue Materials to Installation Team
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              type="button"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg shadow-sm transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Gate Pass</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Live Inventory Movement Calculation Bar */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Store Available Stock</span>
            <strong className="text-slate-900 font-mono text-sm">{currentAvailable} {item.unit}</strong>
          </div>
          <div className="text-slate-400">&minus;</div>
          <div>
            <span className="text-[10px] text-blue-700 uppercase font-bold block">Issuing in this Pass</span>
            <strong className="text-blue-700 font-mono text-sm">{numIssue} {item.unit}</strong>
          </div>
          <div className="text-slate-400">=</div>
          <div className="p-1.5 px-3 rounded-lg bg-white border border-blue-200">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Warehouse Balance After</span>
            <strong className="text-indigo-900 font-mono text-sm font-black">{newAvailable} {item.unit}</strong>
          </div>
          <div className="p-1.5 px-3 rounded-lg bg-emerald-50 border border-emerald-200">
            <span className="text-[10px] text-emerald-700 uppercase font-bold block">Total Issued to Site</span>
            <strong className="text-emerald-800 font-mono text-sm font-black">{newIssued} / {item.requiredQty} {item.unit}</strong>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-800">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Item Specification Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Material Item</span>
                <strong className="text-sm font-bold text-slate-900">{item.material}</strong>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-slate-200 text-slate-800">
                Bin: {item.warehouseBin}
              </span>
            </div>
            <div className="text-slate-600 text-xs">
              Spec: <span className="font-medium text-slate-800">{item.specification}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              <span>Required BoM: <strong className="text-slate-800">{item.requiredQty} {item.unit}</strong></span>
              <span>Already Issued: <strong className="text-slate-800">{item.issuedQty} {item.unit}</strong></span>
              <span>Pending Issue: <strong className="text-blue-700 font-bold">{currentPending} {item.unit}</strong></span>
            </div>
          </div>

          {/* Issue Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quantity to Issue ({item.unit}) *
              </label>
              <input
                type="number"
                step="any"
                max={currentAvailable}
                value={issueQty}
                onChange={(e) => setIssueQty(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Dispatch / Outward Date *
              </label>
              <input
                type="date"
                value={issueDate}
                onChange={(e) => setIssueDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Personnel and Vehicle */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Issued To (Technician / Site Lead) *
              </label>
              <input
                type="text"
                value={issuedTo}
                onChange={(e) => setIssuedTo(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Contractor Team / Agency
              </label>
              <input
                type="text"
                value={contractorTeam}
                onChange={(e) => setContractorTeam(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Dispatch Transport / Van Vehicle No
              </label>
              <input
                type="text"
                value={vehicleNo}
                onChange={(e) => setVehicleNo(e.target.value)}
                placeholder="e.g. TN-30-AW-1928"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Stores Officer Authorization
              </label>
              <input
                type="text"
                value={storesOfficer}
                onChange={(e) => setStoresOfficer(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Gate Pass Notes / Kitting Remarks
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2 print:hidden">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isSubmitting ? "Generating Gate Pass..." : "Issue Gate Pass & Outward"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
