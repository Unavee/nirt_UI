"use client";

import { useState, useEffect } from "react";
import Portal from "@/components/Portal";
import { 
  X, 
  CheckCircle2, 
  UserX, 
  Flame, 
  Clock, 
  Calendar, 
  AlertTriangle, 
  ShieldCheck,
  Check
} from "lucide-react";

const STANDARD_DROP_REASONS = [
  "Reason 1: Disputed Property / No Landlord NOC (Tenant without owner consent)",
  "Reason 2: Structurally Unsafe Roof or Foundation (Fragile / Asbestos sheet / Corroded structure)",
  "Reason 3: Permanent Sun Obstruction (< 100 sq.ft clear area / Tall adjacent buildings)",
  "Reason 4: Local Grid Transformer Saturated (TANGEDCO DT has zero remaining solar capacity)",
  "Reason 5: Out of Territory / Unviable Logistics (Beyond operational service radius)"
];

const QUALIFICATION_CATEGORIES = [
  {
    id: "A",
    title: "Category A: Hot / Ready to Buy",
    sub: "Decision maker verified, funds ready, target survey within 24h",
    icon: Flame,
    badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-300"
  },
  {
    id: "B",
    title: "Category B: Warm / High Potential",
    sub: "Evaluating proposal, decision expected within 15 days",
    icon: Clock,
    badgeColor: "bg-blue-100 text-blue-800 border-blue-300"
  },
  {
    id: "C",
    title: "Category C: Future Pipeline",
    sub: "Budgeting phase or building under construction (30+ days)",
    icon: Calendar,
    badgeColor: "bg-violet-100 text-violet-800 border-violet-300"
  }
];

export default function QualificationModal({
  isOpen,
  project,
  onClose,
  onQualifySuccess,
  onDisqualifySuccess
}) {
  const [activeTab, setActiveTab] = useState("qualified"); // "qualified" | "unqualified"
  const [selectedCat, setSelectedCat] = useState("A");
  const [sanctionedLoad, setSanctionedLoad] = useState("5.0");
  const [monthlyUnits, setMonthlyUnits] = useState("450");
  const [roofType, setRoofType] = useState("RCC Flat Slab");
  const [selectedDropReason, setSelectedDropReason] = useState(STANDARD_DROP_REASONS[0]);
  const [dropNotes, setDropNotes] = useState("");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      setActiveTab("qualified");
      setSelectedCat("A");
      setSanctionedLoad(String(project?.sanctionedLoad || "5.0").replace(/[^0-9.]/g, "") || "5.0");
      setMonthlyUnits("450");
      setRoofType(project?.roofType || "RCC Flat Slab");
      setSelectedDropReason(STANDARD_DROP_REASONS[0]);
      setDropNotes("");
    } else {
      setIsMounted(false);
    }
  }, [isOpen, project]);

  if (!isOpen || !project) return null;

  const handleQualifySubmit = (e) => {
    e.preventDefault();
    onQualifySuccess({
      projectId: project.id,
      qualificationStatus: "Qualified",
      category: selectedCat,
      categoryLabel: QUALIFICATION_CATEGORIES.find((c) => c.id === selectedCat)?.title,
      sanctionedLoadKw: parseFloat(sanctionedLoad) || 5.0,
      monthlyUnits: parseInt(monthlyUnits, 10) || 450,
      roofType: roofType,
      qualifiedAt: new Date().toISOString()
    });
    onClose();
  };

  const handleDisqualifySubmit = (e) => {
    e.preventDefault();
    if (!dropNotes.trim()) return;

    onDisqualifySuccess({
      projectId: project.id,
      customerName: project.customerName,
      district: project.district,
      capacityKw: project.capacityKw,
      totalValue: project.totalValue,
      disqualificationReason: selectedDropReason,
      disqualificationNotes: dropNotes.trim(),
      disqualifiedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 transition-opacity duration-150">
        <div
          className={`bg-white border border-zinc-300 max-w-lg w-full p-6 shadow-2xl space-y-4 rounded-none transform transition-[transform,opacity] duration-180 ease-out ${
            isMounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ transformOrigin: "center" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono bg-black text-white font-bold px-2 py-0.5 uppercase tracking-wider">
                  Step 02: Lead Qualification
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Viability Assessment Gate
                </span>
              </div>
              <h3 className="font-bold text-base text-zinc-950 mt-1">
                {project.id}: {project.customerName}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-black p-1 transition-colors active:scale-[0.95]"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Dual Outcome Tabs */}
          <div className="grid grid-cols-2 border border-zinc-200 bg-zinc-100 p-1">
            <button
              type="button"
              onClick={() => setActiveTab("qualified")}
              className={`py-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer rounded-none active:scale-[0.98] ${
                activeTab === "qualified"
                  ? "bg-white text-black shadow-xs font-black"
                  : "text-zinc-600 hover:text-black"
              }`}
            >
              <CheckCircle2 className={`w-3.5 h-3.5 ${activeTab === "qualified" ? "text-emerald-600" : "text-zinc-400"}`} />
              <span>1. Mark Qualified (Cat A / B / C)</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("unqualified")}
              className={`py-2 text-xs font-bold transition-all flex items-center justify-center space-x-1.5 cursor-pointer rounded-none active:scale-[0.98] ${
                activeTab === "unqualified"
                  ? "bg-white text-rose-700 shadow-xs font-black"
                  : "text-zinc-600 hover:text-rose-700"
              }`}
            >
              <UserX className={`w-3.5 h-3.5 ${activeTab === "unqualified" ? "text-rose-600" : "text-zinc-400"}`} />
              <span>2. Mark Unqualified (Drop Lead)</span>
            </button>
          </div>

          {/* TAB 1: QUALIFIED LEAD */}
          {activeTab === "qualified" && (
            <form onSubmit={handleQualifySubmit} className="space-y-4">
              <div>
                <label className="text-zinc-900 font-bold text-xs block mb-1.5">
                  Select Lead Classification Category:
                </label>
                <div className="space-y-2">
                  {QUALIFICATION_CATEGORIES.map((cat) => {
                    const isSelected = selectedCat === cat.id;
                    const Icon = cat.icon;
                    return (
                      <label
                        key={cat.id}
                        onClick={() => setSelectedCat(cat.id)}
                        className={`block p-2.5 border cursor-pointer transition-all ${
                          isSelected
                            ? "border-black bg-zinc-50 shadow-2xs"
                            : "border-zinc-200 hover:border-zinc-300 bg-white"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <input
                              type="radio"
                              name="leadCat"
                              checked={isSelected}
                              onChange={() => setSelectedCat(cat.id)}
                              className="w-3.5 h-3.5 text-black focus:ring-black"
                            />
                            <span className="font-bold text-xs text-zinc-950 flex items-center space-x-1.5">
                              <Icon className="w-3.5 h-3.5 text-zinc-700" />
                              <span>{cat.title}</span>
                            </span>
                          </div>
                          <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 border ${cat.badgeColor}`}>
                            Cat {cat.id}
                          </span>
                        </div>
                        <p className="text-[11px] text-zinc-500 font-sans mt-1 ml-5">
                          {cat.sub}
                        </p>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Physical Parameters Input */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 bg-zinc-50 border border-zinc-200 text-xs">
                <div>
                  <label className="text-zinc-700 font-bold text-[10px] uppercase block mb-1">
                    Sanctioned Load (kW):
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    min="1"
                    required
                    value={sanctionedLoad}
                    onChange={(e) => setSanctionedLoad(e.target.value)}
                    className="w-full border border-zinc-300 p-1.5 bg-white text-base md:text-xs font-mono font-bold focus:border-black outline-none rounded-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-700 font-bold text-[10px] uppercase block mb-1">
                    Monthly Units (kWh):
                  </label>
                  <input
                    type="number"
                    min="50"
                    required
                    value={monthlyUnits}
                    onChange={(e) => setMonthlyUnits(e.target.value)}
                    className="w-full border border-zinc-300 p-1.5 bg-white text-base md:text-xs font-mono font-bold focus:border-black outline-none rounded-none"
                  />
                </div>

                <div>
                  <label className="text-zinc-700 font-bold text-[10px] uppercase block mb-1">
                    Roof / Site Type:
                  </label>
                  <select
                    value={roofType}
                    onChange={(e) => setRoofType(e.target.value)}
                    className="w-full border border-zinc-300 p-1.5 bg-white text-base md:text-xs font-semibold focus:border-black outline-none rounded-none"
                  >
                    <option value="RCC Flat Slab">RCC Flat Slab</option>
                    <option value="Industrial Metal Shed">Industrial Metal Shed</option>
                    <option value="Farm Land / Ground Mount">Farm Land / Ground</option>
                    <option value="Tiled Sloped Roof">Tiled Sloped Roof</option>
                  </select>
                </div>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-zinc-200 flex justify-between items-center">
                <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Schedules Step 03 Site Survey</span>
                </span>

                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={onClose}
                    className="border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 rounded-none active:scale-[0.97] transition-transform duration-150"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-black hover:bg-zinc-800 text-white px-5 py-2 text-xs font-bold rounded-none shadow-xs active:scale-[0.97] transition-transform duration-150 flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Check className="w-3.5 h-3.5" />
                    <span>Confirm Qualified &rarr; Advance</span>
                  </button>
                </div>
              </div>
            </form>
          )}

          {/* TAB 2: UNQUALIFIED LEAD (DROP REASON) */}
          {activeTab === "unqualified" && (
            <form onSubmit={handleDisqualifySubmit} className="space-y-4 text-xs">
              <div>
                <label className="text-zinc-900 font-bold block mb-1">
                  Mandatory Disqualification Root Cause:
                </label>
                <select
                  value={selectedDropReason}
                  onChange={(e) => setSelectedDropReason(e.target.value)}
                  className="w-full border border-zinc-300 p-2.5 bg-white text-base md:text-xs font-semibold focus:border-black outline-none rounded-none"
                >
                  {STANDARD_DROP_REASONS.map((r, i) => (
                    <option key={i} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-zinc-900 font-bold block mb-1">
                  Technical / Field Reason Notes (Mandatory):
                </label>
                <textarea
                  rows={3}
                  required
                  value={dropNotes}
                  onChange={(e) => setDropNotes(e.target.value)}
                  placeholder="Explain why this lead cannot proceed (e.g. Asbestos sheet fragile and cannot support mounting rails / Tenant without landlord consent / Local transformer has 0 kW solar quota)..."
                  className="w-full border border-zinc-300 p-2.5 text-base md:text-xs focus:border-black outline-none rounded-none"
                />
              </div>

              <div className="p-3 bg-rose-50 border border-rose-200 text-rose-800 space-y-1">
                <div className="flex items-center space-x-1.5 font-bold text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  <span>Archive Notice (BFRD Section 6 Compliance):</span>
                </div>
                <p className="text-[10px] text-rose-700 leading-relaxed font-sans">
                  This lead will be moved to the <strong>Unqualified Leads Archive</strong> to protect sales velocity. If this was marked by mistake, use <strong>Edit with Reason</strong> from the archive to restore it.
                </p>
              </div>

              {/* Actions */}
              <div className="pt-2 border-t border-zinc-200 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 rounded-none active:scale-[0.97] transition-transform duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-700 text-white px-5 py-2 text-xs font-bold rounded-none shadow-xs active:scale-[0.97] transition-transform duration-150 flex items-center space-x-1.5 cursor-pointer"
                >
                  <UserX className="w-3.5 h-3.5" />
                  <span>Confirm Disqualification &amp; Archive</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </Portal>
  );
}
