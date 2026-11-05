import React, { useState, useEffect } from "react";
import { X, CheckCircle2, AlertCircle, ShoppingCart, Calendar, Building, Package, Layers } from "lucide-react";
import { MATERIAL_CATEGORIES, PURCHASE_STATUSES, EMPANELLED_VENDORS } from "../../data/procurementData";

export default function ProcurementModal({
  isOpen,
  onClose,
  targetItem = null,
  projectId = "NIRT-26-0042",
  onSaveItem
}) {
  const isEdit = !!targetItem;

  const [category, setCategory] = useState(targetItem?.category || "solar_modules");
  const [material, setMaterial] = useState(targetItem?.material || "Solar Modules");
  const [specification, setSpecification] = useState(targetItem?.specification || "");
  const [quantity, setQuantity] = useState(targetItem?.quantity || 1);
  const [unit, setUnit] = useState(targetItem?.unit || "Nos");
  const [requiredDate, setRequiredDate] = useState(targetItem?.requiredDate || new Date().toISOString().split("T")[0]);
  const [prDate, setPrDate] = useState(targetItem?.purchaseRequestDate || new Date().toISOString().split("T")[0]);
  const [poDate, setPoDate] = useState(targetItem?.purchaseOrderDate || new Date().toISOString().split("T")[0]);
  const [poNumber, setPoNumber] = useState(targetItem?.poNumber || `PO-2026-${projectId.replace("NIRT-26-", "")}-${Math.floor(10 + Math.random() * 90)}`);
  const [vendor, setVendor] = useState(targetItem?.vendor || EMPANELLED_VENDORS[0]);
  const [expectedDate, setExpectedDate] = useState(targetItem?.expectedDeliveryDate || "");
  const [actualDate, setActualDate] = useState(targetItem?.actualDeliveryDate || "");
  const [receivedQty, setReceivedQty] = useState(targetItem?.quantityReceived ?? 0);
  const [status, setStatus] = useState(targetItem?.purchaseStatus || "PO Issued");
  const [deliveryLocation, setDeliveryLocation] = useState(targetItem?.deliveryLocation || "Salem Central Warehouse (Bay 1)");
  const [notes, setNotes] = useState(targetItem?.notes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (targetItem) {
        setCategory(targetItem.category || "solar_modules");
        setMaterial(targetItem.material || "");
        setSpecification(targetItem.specification || "");
        setQuantity(targetItem.quantity || 1);
        setUnit(targetItem.unit || "Nos");
        setRequiredDate(targetItem.requiredDate || "");
        setPrDate(targetItem.purchaseRequestDate || "");
        setPoDate(targetItem.purchaseOrderDate || "");
        setPoNumber(targetItem.poNumber || "");
        setVendor(targetItem.vendor || EMPANELLED_VENDORS[0]);
        setExpectedDate(targetItem.expectedDeliveryDate || "");
        setActualDate(targetItem.actualDeliveryDate || "");
        setReceivedQty(targetItem.quantityReceived ?? 0);
        setStatus(targetItem.purchaseStatus || "PO Issued");
        setDeliveryLocation(targetItem.deliveryLocation || "Salem Central Warehouse");
        setNotes(targetItem.notes || "");
        setError("");
      } else {
        setCategory("solar_modules");
        setMaterial("Solar Modules");
        setSpecification("");
        setQuantity(1);
        setUnit("Nos");
        setRequiredDate(new Date().toISOString().split("T")[0]);
        setPrDate(new Date().toISOString().split("T")[0]);
        setPoDate(new Date().toISOString().split("T")[0]);
        setPoNumber(`PO-2026-${projectId.replace("NIRT-26-", "")}-${Math.floor(10 + Math.random() * 90)}`);
        setVendor(EMPANELLED_VENDORS[0]);
        setExpectedDate("");
        setActualDate("");
        setReceivedQty(0);
        setStatus("PO Issued");
        setDeliveryLocation("Salem Central Warehouse");
        setNotes("");
        setError("");
      }
    }
  }, [isOpen, targetItem, projectId]);

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

  if (!isOpen) return null;

  // Auto-calculated pending quantity: Quantity - Quantity Received
  const numQty = parseFloat(quantity) || 0;
  const numReceived = parseFloat(receivedQty) || 0;
  const calculatedPending = Math.max(0, numQty - numReceived);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!material.trim()) {
      setError("Please specify the material name.");
      return;
    }
    if (numQty <= 0) {
      setError("Quantity must be greater than zero.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    setTimeout(() => {
      const categoryObj = MATERIAL_CATEGORIES.find(c => c.id === category);

      const savedItem = {
        id: targetItem?.id || `MAT-26-${Math.floor(100 + Math.random() * 900)}`,
        projectId: projectId,
        material: material,
        category: category,
        categoryLabel: categoryObj?.label || "Project Material",
        specification: specification,
        quantity: numQty,
        unit: unit,
        requiredDate: requiredDate,
        purchaseRequestDate: prDate,
        purchaseOrderDate: poDate,
        poNumber: poNumber,
        vendor: vendor,
        expectedDeliveryDate: expectedDate,
        actualDeliveryDate: actualDate,
        quantityReceived: numReceived,
        pendingQuantity: calculatedPending,
        purchaseStatus: numReceived >= numQty ? "Delivered & QA Cleared" : status,
        deliveryLocation: deliveryLocation,
        notes: notes
      };

      onSaveItem(savedItem);
      setIsSubmitting(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  Section 14
                </span>
                <span className="text-xs font-mono text-slate-500">
                  Project: {projectId}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {isEdit ? "Update Material Procurement & PO" : "Add Material Requisition (BoM)"}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Live Calculation Banner */}
        <div className="bg-blue-50/60 border-b border-blue-100 px-6 py-2.5 flex items-center justify-between text-xs">
          <div className="flex items-center gap-4">
            <span>Ordered: <strong className="font-mono text-slate-900">{numQty} {unit}</strong></span>
            <span>&minus;</span>
            <span>Received: <strong className="font-mono text-emerald-700">{numReceived} {unit}</strong></span>
            <span>=</span>
            <span>
              Pending Balance: <strong className="font-mono text-blue-700 font-bold">{calculatedPending} {unit}</strong>
            </span>
          </div>
          <span className="text-[11px] text-slate-500 font-mono">
            {numReceived >= numQty && numQty > 0 ? "100% Fulfilled" : `${Math.round((numReceived / (numQty || 1)) * 100)}% Received`}
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Row 1: Category & Material Name */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Material Category (12 Major Solar Categories) *
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  const found = MATERIAL_CATEGORIES.find(c => c.id === e.target.value);
                  if (found) setMaterial(found.label.replace(/^\d+\.\s*/, ""));
                }}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {MATERIAL_CATEGORIES.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Material Title / Component *
              </label>
              <input
                type="text"
                value={material}
                onChange={(e) => setMaterial(e.target.value)}
                placeholder="e.g. Solar Modules"
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Specification */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Technical Specification (Brand, Rating, Standard) *
            </label>
            <input
              type="text"
              value={specification}
              onChange={(e) => setSpecification(e.target.value)}
              placeholder="e.g. Waaree 550Wp Bi-facial TOPCon Glass-to-Glass (ALMM Listed)"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Row 2: Quantities & Units */}
          <div className="grid grid-cols-4 gap-2.5">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Quantity *
              </label>
              <input
                type="number"
                step="any"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Unit
              </label>
              <select
                value={unit}
                onChange={(e) => setUnit(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Nos">Nos</option>
                <option value="Set">Set</option>
                <option value="Sets">Sets</option>
                <option value="Metres">Metres</option>
                <option value="Pairs">Pairs</option>
                <option value="Blocks">Blocks</option>
                <option value="Lot">Lot</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Qty Received
              </label>
              <input
                type="number"
                step="any"
                value={receivedQty}
                onChange={(e) => setReceivedQty(e.target.value)}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-emerald-800 font-bold focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Pending Qty
              </label>
              <input
                type="number"
                value={calculatedPending}
                disabled
                className="w-full text-xs font-mono bg-slate-100 border border-slate-200 rounded-xl px-3 py-2 text-blue-700 font-bold cursor-not-allowed"
              />
            </div>
          </div>

          {/* Row 3: Vendor & PO Number */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Empanelled Vendor *
              </label>
              <select
                value={vendor}
                onChange={(e) => setVendor(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {EMPANELLED_VENDORS.map((v) => (
                  <option key={v} value={v}>
                    {v}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Purchase Order (PO) Number *
              </label>
              <input
                type="text"
                value={poNumber}
                onChange={(e) => setPoNumber(e.target.value)}
                placeholder="e.g. PO-2026-0042-01"
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          {/* Row 4: Dates (PR Date, PO Date, Required Date) */}
          <div className="grid grid-cols-3 gap-2.5">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                PR Request Date
              </label>
              <input
                type="date"
                value={prDate}
                onChange={(e) => setPrDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                PO Order Date
              </label>
              <input
                type="date"
                value={poDate}
                onChange={(e) => setPoDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Required at Site Date
              </label>
              <input
                type="date"
                value={requiredDate}
                onChange={(e) => setRequiredDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          {/* Row 5: Delivery Dates */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Expected Delivery Date (ETA)
              </label>
              <input
                type="date"
                value={expectedDate}
                onChange={(e) => setExpectedDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-600 uppercase mb-1">
                Actual Delivery Date
              </label>
              <input
                type="date"
                value={actualDate}
                onChange={(e) => setActualDate(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800"
              />
            </div>
          </div>

          {/* Row 6: Purchase Status & Location */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Purchase Order Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                {PURCHASE_STATUSES.map((st) => (
                  <option key={st.id} value={st.id}>
                    {st.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Delivery Location
              </label>
              <input
                type="text"
                value={deliveryLocation}
                onChange={(e) => setDeliveryLocation(e.target.value)}
                placeholder="Salem Warehouse / Site"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Quality & Inspection Notes */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Material Quality & Receiving Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={2}
              placeholder="Record batch serial numbers, test reports, or warehouse bay allocation..."
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
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
              <span>{isSubmitting ? "Saving..." : isEdit ? "Update Material Record" : "Add to BoM"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
