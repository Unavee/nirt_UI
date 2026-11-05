import React, { useState } from "react";
import {
  Boxes,
  Truck,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  FileText
} from "lucide-react";
import { STORE_LIFECYCLE_STAGES } from "../../data/storeInventoryData";

export default function StoreManagementView({
  inventoryItems,
  project,
  onOpenIssueModal,
  onOpenReturnModal
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStage, setSelectedStage] = useState("all");

  // Calculate 6 Management Visibility Metrics
  const totalRequired = inventoryItems.reduce((acc, curr) => acc + (curr.requiredQty || 0), 0);
  const totalAvailable = inventoryItems.reduce((acc, curr) => acc + (curr.availableQty || 0), 0);
  const totalIssued = inventoryItems.reduce((acc, curr) => acc + (curr.issuedQty || 0), 0);
  const totalPending = inventoryItems.reduce((acc, curr) => acc + Math.max(0, (curr.requiredQty || 0) - (curr.issuedQty || 0)), 0);
  const totalReturned = inventoryItems.reduce((acc, curr) => acc + (curr.returnedQty || 0), 0);
  const totalShortage = inventoryItems.reduce((acc, curr) => {
    const pending = Math.max(0, (curr.requiredQty || 0) - (curr.issuedQty || 0));
    const shortage = Math.max(0, pending - (curr.availableQty || 0));
    return acc + shortage;
  }, 0);

  const filteredItems = inventoryItems.filter((item) => {
    const matchesStage = selectedStage === "all" || item.stage === selectedStage;
    const matchesSearch =
      !searchQuery ||
      item.material.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.specification.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.warehouseBin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.gatePassNumber && item.gatePassNumber.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStage && matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Console Top Container */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 mt-0.5">
              <Boxes className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Section 15
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Project: {project.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Store & Warehouse Inventory Management
              </h3>
              <p className="text-xs text-slate-500">
                End-to-end material flow: Required &rarr; Purchased &rarr; Received &rarr; Allocated &rarr; Issued &rarr; Installed with Gate Pass accountability.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            <span className="text-xs font-semibold px-3 py-1.5 rounded-xl bg-slate-100 text-slate-700 border border-slate-200">
              Salem Central Stores
            </span>
          </div>
        </div>

        {/* 6 Mandatory Management Visibility Metric Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-6 gap-3">
          {/* 1. Required */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">1. Required (BoM)</span>
            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">{totalRequired} Units</div>
            <div className="text-[11px] text-slate-500 mt-0.5">{inventoryItems.length} Materials</div>
          </div>

          {/* 2. Available */}
          <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200">
            <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">2. In Store (Available)</span>
            <div className="text-base font-bold text-blue-900 font-mono mt-0.5">{totalAvailable} Units</div>
            <div className="text-[11px] text-blue-700 mt-0.5">Central Warehouse Shelf</div>
          </div>

          {/* 3. Issued */}
          <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
            <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">3. Issued to Site</span>
            <div className="text-base font-bold text-emerald-900 font-mono mt-0.5">{totalIssued} Units</div>
            <div className="text-[11px] text-emerald-700 font-medium mt-0.5">With Gate Passes</div>
          </div>

          {/* 4. Pending */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">4. Pending Issue</span>
            <div className="text-base font-bold text-slate-900 font-mono mt-0.5">{totalPending} Units</div>
            <div className="text-[11px] text-slate-500 mt-0.5">
              {totalPending === 0 ? "100% Dispatched" : "Awaiting Truck"}
            </div>
          </div>

          {/* 5. Returned */}
          <div className="p-3.5 bg-indigo-50/50 rounded-xl border border-indigo-200">
            <span className="text-[10px] font-bold text-indigo-700 uppercase tracking-wider block">5. Surplus Returned</span>
            <div className="text-base font-bold text-indigo-900 font-mono mt-0.5">{totalReturned} Units</div>
            <div className="text-[11px] text-indigo-700 mt-0.5">Restocked via RTS</div>
          </div>

          {/* 6. Shortage */}
          <div className={`p-3.5 rounded-xl border ${
            totalShortage > 0
              ? "bg-rose-50 border-rose-300 text-rose-900"
              : "bg-emerald-50/50 border-emerald-200 text-emerald-900"
          }`}>
            <span className="text-[10px] font-bold uppercase tracking-wider block opacity-70">6. Material Shortage</span>
            <div className="text-base font-bold font-mono mt-0.5">
              {totalShortage > 0 ? `${totalShortage} Shortage Alert` : "0 Shortage"}
            </div>
            <div className="text-[11px] mt-0.5 font-medium">
              {totalShortage > 0 ? "Urgent Re-order Needed" : "Full Stock Adequate"}
            </div>
          </div>
        </div>

        {/* 6-Stage Inventory Movement Lifecycle Stepper */}
        <div>
          <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
            <span>6-Stage Store Lifecycle Movement</span>
            <span className="text-slate-400 font-normal text-[11px]">Warehouse to Site Dispatch</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-6 gap-2">
            {STORE_LIFECYCLE_STAGES.map((st) => (
              <div
                key={st.id}
                className="p-2.5 rounded-xl border border-slate-200 bg-slate-50 text-xs space-y-0.5"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-mono text-slate-400">0{st.step}</span>
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                </div>
                <div className="font-bold text-slate-900">{st.label.replace(/^\d+\.\s*/, "")}</div>
                <div className="text-[10px] text-slate-500 leading-tight">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Search & Stage Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
          <div className="relative w-full sm:w-80">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search material, spec, bin, or Gate Pass..."
              className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto">
            {["all", "allocated", "issued", "installed"].map((st) => (
              <button
                key={st}
                onClick={() => setSelectedStage(st)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors ${
                  selectedStage === st
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {st === "all" ? "All Stages" : st.charAt(0).toUpperCase() + st.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Main Store Inventory Table */}
        <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                <tr>
                  <th className="p-3.5 border-r border-slate-200">Material & Storage Bin</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Required</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Available in Store</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Issued to Site</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Pending Issue</th>
                  <th className="p-3.5 border-r border-slate-200 text-center">Returned</th>
                  <th className="p-3.5 border-r border-slate-200">Current Stage</th>
                  <th className="p-3.5 text-right">Store Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredItems.map((item) => {
                  const pending = Math.max(0, item.requiredQty - item.issuedQty);
                  const shortage = Math.max(0, pending - item.availableQty);

                  return (
                    <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                      {/* Material & Bin */}
                      <td className="p-3.5 border-r border-slate-100 max-w-xs">
                        <div className="font-bold text-slate-900">{item.material}</div>
                        <div className="text-[11px] text-slate-500 line-clamp-1" title={item.specification}>
                          {item.specification}
                        </div>
                        <div className="text-[10px] text-blue-700 font-mono mt-1">
                          📍 {item.warehouseBin}
                        </div>
                      </td>

                      {/* Required */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono font-bold text-slate-900">
                        {item.requiredQty} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                      </td>

                      {/* Available */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono font-bold text-blue-700">
                        {item.availableQty} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                      </td>

                      {/* Issued */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono font-bold text-emerald-700">
                        {item.issuedQty} <span className="text-[10px] text-slate-400 font-normal">{item.unit}</span>
                        {item.gatePassNumber && (
                          <div className="text-[9px] text-slate-400 font-mono mt-0.5">{item.gatePassNumber}</div>
                        )}
                      </td>

                      {/* Pending */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono">
                        <span className={`font-bold ${pending > 0 ? "text-blue-700" : "text-slate-400"}`}>
                          {pending} {item.unit}
                        </span>
                      </td>

                      {/* Returned */}
                      <td className="p-3.5 border-r border-slate-100 text-center font-mono">
                        <span className={`font-bold ${item.returnedQty > 0 ? "text-indigo-700" : "text-slate-400"}`}>
                          {item.returnedQty || 0} {item.unit}
                        </span>
                        {item.returnSlipNumber && (
                          <div className="text-[9px] text-indigo-600 font-mono mt-0.5">{item.returnSlipNumber}</div>
                        )}
                      </td>

                      {/* Stage Pill */}
                      <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                        <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit ${
                          item.stage === "installed"
                            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                            : item.stage === "issued"
                            ? "bg-blue-50 text-blue-800 border-blue-200"
                            : "bg-slate-100 text-slate-700 border-slate-200"
                        }`}>
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          <span>{item.stage.toUpperCase()}</span>
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="p-3.5 text-right whitespace-nowrap">
                        <div className="flex items-center justify-end gap-1.5">
                          {/* Issue Gate Pass */}
                          <button
                            onClick={() => onOpenIssueModal(item)}
                            className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1"
                            title="Issue Store Gate Pass (Outward)"
                          >
                            <Truck className="w-3.5 h-3.5" />
                            <span>Issue</span>
                          </button>

                          {/* Return Surplus */}
                          <button
                            onClick={() => onOpenReturnModal(item)}
                            className="px-2 py-1 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors flex items-center gap-1"
                            title="Record Surplus Return (RTS)"
                          >
                            <RotateCcw className="w-3 h-3 text-slate-500" />
                            <span>RTS</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
