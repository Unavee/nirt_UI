import React, { useState } from "react";
import { X, CheckCircle2, RotateCcw, Printer, Package, AlertCircle } from "lucide-react";

export default function MaterialReturnModal({
  isOpen,
  onClose,
  item,
  projectId = "NIRT-26-0042",
  onConfirmReturn
}) {
  if (!isOpen || !item) return null;

  const [returnQty, setReturnQty] = useState(1);
  const [returnDate, setReturnDate] = useState(new Date().toISOString().split("T")[0]);
  const [returnReason, setReturnReason] = useState("Job completed surplus — unused original length");
  const [condition, setCondition] = useState("Reusable A-Grade Stock");
  const [bin, setBin] = useState(item.warehouseBin || "Warehouse Salem • Drum Stand #04");
  const [returnedBy, setReturnedBy] = useState("M. Saravanan (Senior Installation Lead)");
  const [rtsNumber] = useState(item.returnSlipNumber || `RTS-SLM-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [notes, setNotes] = useState("Physical inspection completed; item cleaned, tagged, and restocked to shelf.");
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

  const numReturn = parseFloat(returnQty) || 0;
  const newReturnedTotal = (item.returnedQty || 0) + numReturn;
  const newAvailableTotal = (item.availableQty || 0) + numReturn;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (numReturn <= 0) {
      setError("Please specify a valid return quantity.");
      return;
    }
    if (numReturn > item.issuedQty) {
      setError(`Cannot return ${numReturn} ${item.unit}. Only ${item.issuedQty} ${item.unit} was issued to site.`);
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const updatedItem = {
        ...item,
        returnedQty: newReturnedTotal,
        availableQty: newAvailableTotal,
        returnSlipNumber: rtsNumber,
        returnDate: returnDate,
        notes: `Returned: ${numReturn} ${item.unit} (${returnReason}). Restocked to ${bin}.`
      };

      onConfirmReturn(updatedItem);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col print:m-0 print:p-0 print:border-none print:shadow-none print:max-w-none">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50/80 print:hidden">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <RotateCcw className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Return-to-Store (RTS) Voucher
                </span>
                <span className="text-xs font-mono text-slate-500">
                  RTS: {rtsNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Restock Unused Surplus to Central Store
              </h3>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              disabled
              type="button"
              title="Printing disabled by System Governance policy"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-400 bg-slate-100 border border-slate-200 rounded-lg shadow-none cursor-not-allowed opacity-60"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Disabled</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors ml-1"
            >
              <X className="w-5 h-5" />
            </button>
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

          {/* Item Meta */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1 text-xs">
            <div className="font-bold text-slate-900 text-sm">{item.material}</div>
            <div className="text-slate-600 text-[11px]">{item.specification}</div>
            <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              <span>Total Issued to Site: <strong className="text-slate-800">{item.issuedQty} {item.unit}</strong></span>
              <span>Previously Returned: <strong className="text-emerald-700">{item.returnedQty || 0} {item.unit}</strong></span>
            </div>
          </div>

          {/* Return Quantity & Date */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Surplus Quantity Returned ({item.unit}) *
              </label>
              <input
                type="number"
                step="any"
                max={item.issuedQty}
                value={returnQty}
                onChange={(e) => setReturnQty(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Return Date *
              </label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Return Reason & Stock Condition */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Return Reason
              </label>
              <select
                value={returnReason}
                onChange={(e) => setReturnReason(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Job completed surplus — unused original length">Job completed surplus — unused original length</option>
                <option value="Design optimization / route reduction">Design optimization / route reduction</option>
                <option value="Spare safety buffer reclaimed">Spare safety buffer reclaimed</option>
                <option value="Model mismatch / exchange">Model mismatch / exchange</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Material Stock Condition
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Reusable A-Grade Stock">Reusable A-Grade Stock</option>
                <option value="Testing & Re-tagging Required">Testing & Re-tagging Required</option>
                <option value="Scrap / Decommissioned">Scrap / Decommissioned</option>
              </select>
            </div>
          </div>

          {/* Restock Storage Bin */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Restock Storage Bin / Warehouse Rack
            </label>
            <input
              type="text"
              value={bin}
              onChange={(e) => setBin(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Returned By (Technician / Site Lead)
            </label>
            <input
              type="text"
              value={returnedBy}
              onChange={(e) => setReturnedBy(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              <span>{isSubmitting ? "Restocking..." : "Confirm Return & Restock Store"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
