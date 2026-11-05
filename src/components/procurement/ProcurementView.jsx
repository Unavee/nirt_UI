import React, { useState } from "react";
import {
  ShoppingCart,
  Plus,
  Search,
  Filter,
  Truck,
  CheckCircle2,
  Clock,
  Building,
  Package,
  Layers,
  FileText,
  AlertCircle,
  Edit2
} from "lucide-react";
import { MATERIAL_CATEGORIES, PURCHASE_STATUSES } from "../../data/procurementData";

export default function ProcurementView({
  procurementItems,
  project,
  onOpenAddModal,
  onOpenEditModal,
  onOpenGRNModal
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const totalItems = procurementItems.length;
  const deliveredItems = procurementItems.filter(i => i.purchaseStatus === "Delivered & QA Cleared").length;
  const totalPendingUnits = procurementItems.reduce((acc, curr) => acc + (curr.pendingQuantity || 0), 0);
  const totalPos = new Set(procurementItems.map(i => i.poNumber).filter(Boolean)).size;

  const filteredItems = procurementItems.filter((item) => {
    const matchesCat = selectedCategory === "all" || item.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || item.purchaseStatus === selectedStatus;
    const matchesSearch =
      !searchQuery ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.poNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Console Top Card */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 mt-0.5">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Section 14
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Project: {project.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Procurement Management & Bill of Materials (BoM)
              </h3>
              <p className="text-xs text-slate-500">
                12 major solar equipment categories, vendor purchase orders, material fulfillment tracking, and GRN quality inspections.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenAddModal}
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all self-start sm:self-auto"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Material Requisition</span>
          </button>
        </div>

        {/* 4 KPI Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total BoM Items</span>
            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
              {totalItems} Line Items
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">12 Categories Covered</div>
          </div>

          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Purchase Orders Issued</span>
            <div className="text-base font-bold text-blue-900 font-mono mt-0.5">
              {totalPos} Active POs
            </div>
            <div className="text-[11px] text-blue-700 mt-0.5">Empanelled Manufacturers</div>
          </div>

          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Delivered & Cleared</span>
            <div className="text-base font-bold text-emerald-900 font-mono mt-0.5">
              {deliveredItems} / {totalItems} Items
            </div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
              {Math.round((deliveredItems / (totalItems || 1)) * 100)}% Fulfilled
            </div>
          </div>

          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Pending Balance Qty</span>
            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
              {totalPendingUnits} Units
            </div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {totalPendingUnits === 0 ? "All Materials Inwarded" : "Awaiting Dispatch"}
            </div>
          </div>
        </div>

        {/* 12-Category Scrollable Filter Bar */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
            <span>Filter by Material Category (12 Major Solar Items)</span>
            <span className="text-slate-400 font-normal">Section 14 Material Classification</span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setSelectedCategory("all")}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                selectedCategory === "all"
                  ? "bg-slate-900 text-white"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <span>All Materials</span>
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                {procurementItems.length}
              </span>
            </button>

            {MATERIAL_CATEGORIES.map((cat) => {
              const count = procurementItems.filter(i => i.category === cat.id).length;
              const isSelected = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                    isSelected
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                  }`}
                >
                  <span>{cat.label}</span>
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                    isSelected ? "bg-white/30 text-white" : "bg-slate-200 text-slate-700"
                  }`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search & Status Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search material, vendor, spec, or PO..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
            {["all", "PO Issued", "In Transit", "Delivered & QA Cleared"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStatus(st)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedStatus === st
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "all" ? "All Statuses" : st}
              </button>
            ))}
          </div>
        </div>

        {/* Main Procurement Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3.5 border-r border-slate-200">Material & Specification</th>
                  <th className="p-3.5 border-r border-slate-200">Category</th>
                  <th className="p-3.5 border-r border-slate-200">Ordered Qty</th>
                  <th className="p-3.5 border-r border-slate-200">Dates (PR / PO / Required)</th>
                  <th className="p-3.5 border-r border-slate-200">Vendor & PO #</th>
                  <th className="p-3.5 border-r border-slate-200">Delivery Status</th>
                  <th className="p-3.5 border-r border-slate-200">Received vs Pending</th>
                  <th className="p-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const isComplete = item.quantityReceived >= item.quantity;
                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Material & Spec */}
                      <td className="p-3.5 border-r border-slate-100 max-w-xs">
                        <div className="font-bold text-slate-900">{item.material}</div>
                        <div className="text-[11px] text-slate-600 leading-snug mt-0.5 line-clamp-2" title={item.specification}>
                          {item.specification}
                        </div>
                        {item.deliveryLocation && (
                          <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
                            <Truck className="w-3 h-3 text-slate-400" />
                            <span>{item.deliveryLocation}</span>
                          </div>
                        )}
                      </td>

                      {/* Category Badge */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                          {item.categoryLabel}
                        </span>
                      </td>

                      {/* Ordered Qty */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap font-mono font-bold text-slate-900">
                        {item.quantity} <span className="text-slate-500 font-normal text-[11px]">{item.unit}</span>
                      </td>

                      {/* Dates */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap text-[11px] text-slate-600 space-y-0.5">
                        <div>Req: <strong className="text-slate-800">{item.requiredDate}</strong></div>
                        <div>PO: <span className="text-slate-500 font-mono">{item.purchaseOrderDate}</span></div>
                        <div className="text-slate-400 text-[10px]">PR: {item.purchaseRequestDate}</div>
                      </td>

                      {/* Vendor & PO */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{item.vendor}</div>
                        <div className="text-[11px] font-mono text-blue-700 mt-0.5">{item.poNumber}</div>
                      </td>

                      {/* Delivery Status */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                        <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full border flex items-center gap-1 w-fit ${
                          item.purchaseStatus === "Delivered & QA Cleared"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : item.purchaseStatus === "In Transit"
                            ? "bg-indigo-50 text-indigo-800 border-indigo-200"
                            : "bg-blue-50 text-blue-800 border-blue-200"
                        }`}>
                          {item.purchaseStatus === "Delivered & QA Cleared" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                          <span>{item.purchaseStatus}</span>
                        </span>
                        <div className="text-[10px] text-slate-400 font-mono mt-1">
                          Actual: {item.actualDeliveryDate || "In Transit"}
                        </div>
                      </td>

                      {/* Received vs Pending */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap font-mono">
                        <div className="flex items-center gap-2">
                          <span className="text-emerald-700 font-bold">
                            {item.quantityReceived} {item.unit}
                          </span>
                          <span className="text-slate-300">/</span>
                          <span className={`text-xs ${item.pendingQuantity > 0 ? "text-blue-700 font-bold" : "text-slate-400"}`}>
                            {item.pendingQuantity} Pending
                          </span>
                        </div>
                        {item.grnNumber && (
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            GRN: {item.grnNumber}
                          </div>
                        )}
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => onOpenGRNModal(item)}
                            className="px-2.5 py-1 text-xs font-semibold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1"
                            title="Record Goods Receipt Note"
                          >
                            <Truck className="w-3.5 h-3.5 text-emerald-600" />
                            <span>GRN</span>
                          </button>

                          <button
                            onClick={() => onOpenEditModal(item)}
                            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                            title="Edit Material Details"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredItems.length === 0 && (
            <div className="p-8 text-center text-slate-500 space-y-2">
              <Package className="w-8 h-8 text-slate-300 mx-auto" />
              <p className="text-xs font-semibold text-slate-700">No materials found matching this filter</p>
              <button
                onClick={onOpenAddModal}
                className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:underline"
              >
                + Add material item to BoM
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
