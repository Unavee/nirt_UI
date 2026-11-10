import React, { useState } from "react";
import { X, CheckCircle2, ShieldCheck, Printer, Download, Truck, Package, FileText, AlertTriangle } from "lucide-react";

export default function GoodsReceiptModal({
  isOpen,
  onClose,
  item,
  projectId = "NIRT-26-0042",
  onConfirmReceipt
}) {
  if (!isOpen || !item) return null;

  const totalOrdered = item.quantity || 1;
  const alreadyReceived = item.quantityReceived || 0;
  const currentPending = Math.max(0, totalOrdered - alreadyReceived);

  const [receivedNow, setReceivedNow] = useState(currentPending);
  const [deliveryDate, setDeliveryDate] = useState(new Date().toISOString().split("T")[0]);
  const [vehicleNumber, setVehicleNumber] = useState("TN-30-BB-4891");
  const [carrierName, setCarrierName] = useState("VRL Logistics / Direct Dispatch");
  const [location, setLocation] = useState(item.deliveryLocation || "Salem Central Warehouse (Bay 1)");
  const [qaStatus, setQaStatus] = useState("Pass");
  const [inspectorName, setInspectorName] = useState("M. Saravanan (Quality & Stores Lead)");
  const [inspectionRemarks, setInspectionRemarks] = useState("Physical visual check & packaging seal intact. Zero transit damage.");
  const [grnNumber] = useState(item.grnNumber || `GRN-SLM-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const numReceivedNow = parseFloat(receivedNow) || 0;
  const newTotalReceived = alreadyReceived + numReceivedNow;
  const newRemainingPending = Math.max(0, totalOrdered - newTotalReceived);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      const updatedItem = {
        ...item,
        actualDeliveryDate: deliveryDate,
        quantityReceived: newTotalReceived,
        pendingQuantity: newRemainingPending,
        purchaseStatus: newRemainingPending === 0 ? "Delivered & QA Cleared" : "Partially Received",
        deliveryLocation: location,
        grnNumber: grnNumber,
        notes: `${inspectionRemarks} (QA: ${qaStatus})`
      };

      onConfirmReceipt(updatedItem);
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
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Goods Receipt Note (GRN)
                </span>
                <span className="text-xs font-mono text-slate-500">
                  GRN: {grnNumber}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                Record Material Inward & Quality Clearance
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

        {/* Live Material Balance Bar */}
        <div className="bg-blue-50/70 border-b border-blue-100 px-6 py-3 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Ordered BoM Qty</span>
            <strong className="text-slate-900 font-mono text-sm">{totalOrdered} {item.unit}</strong>
          </div>
          <div className="text-slate-400">&minus;</div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Already Received</span>
            <strong className="text-slate-700 font-mono text-sm">{alreadyReceived} {item.unit}</strong>
          </div>
          <div className="text-slate-400">&minus;</div>
          <div>
            <span className="text-[10px] text-blue-700 uppercase font-bold block">Receiving in this GRN</span>
            <strong className="text-blue-700 font-mono text-sm">{numReceivedNow} {item.unit}</strong>
          </div>
          <div className="text-slate-400">=</div>
          <div className="p-1.5 px-3 rounded-lg bg-white border border-blue-200">
            <span className="text-[10px] text-slate-500 uppercase font-bold block">Remaining Pending</span>
            <strong className="text-indigo-900 font-mono text-sm font-black">{newRemainingPending} {item.unit}</strong>
          </div>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1 text-slate-800">
          {/* Item Specification Card */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50 space-y-1.5 text-xs">
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Material Item</span>
                <strong className="text-sm font-bold text-slate-900">{item.material}</strong>
              </div>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                PO: {item.poNumber}
              </span>
            </div>
            <div className="text-slate-600 text-xs">
              Spec: <span className="font-medium text-slate-800">{item.specification}</span>
            </div>
            <div className="flex justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-200">
              <span>Vendor: <strong className="text-slate-700">{item.vendor}</strong></span>
              <span>Project ID: <strong className="font-mono text-slate-700">{projectId}</strong></span>
            </div>
          </div>

          {/* Receiving Details Inputs */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quantity Delivering Now ({item.unit}) *
              </label>
              <input
                type="number"
                step="any"
                max={totalOrdered}
                value={receivedNow}
                onChange={(e) => setReceivedNow(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Actual Inward / Delivery Date *
              </label>
              <input
                type="date"
                value={deliveryDate}
                onChange={(e) => setDeliveryDate(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Logistics & Inward Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Vehicle / Consignment LR No
              </label>
              <input
                type="text"
                value={vehicleNumber}
                onChange={(e) => setVehicleNumber(e.target.value)}
                placeholder="e.g. TN-30-BB-4891"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Transporter / Logistics Carrier
              </label>
              <input
                type="text"
                value={carrierName}
                onChange={(e) => setCarrierName(e.target.value)}
                placeholder="e.g. VRL Logistics"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Receiving Storage Location / Bay
            </label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Salem Central Warehouse (Bay 3) or Site Staging"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* QA Inspection Group */}
          <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>Stores Inward Quality Inspection (QA)</span>
              </span>
              <select
                value={qaStatus}
                onChange={(e) => setQaStatus(e.target.value)}
                className="text-xs font-bold px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-800"
              >
                <option value="Pass">QA Status: Pass</option>
                <option value="Conditional Pass">QA Status: Conditional Pass</option>
                <option value="Fail / Damaged">QA Status: Fail / Damaged</option>
              </select>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <input
                type="text"
                value={inspectorName}
                onChange={(e) => setInspectorName(e.target.value)}
                placeholder="Inspector Name & Role"
                className="w-full text-xs bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
              <textarea
                value={inspectionRemarks}
                onChange={(e) => setInspectionRemarks(e.target.value)}
                rows={2}
                placeholder="Inspection remarks regarding packaging, seals, serial numbers, flash reports..."
                className="w-full text-xs bg-white border border-slate-300 rounded-lg p-2 text-slate-800"
              />
            </div>
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
              <span>{isSubmitting ? "Processing GRN..." : "Confirm Inward & Generate GRN"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
