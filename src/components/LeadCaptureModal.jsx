"use client";

import { useState } from "react";
import Portal from "@/components/Portal";
import { 
  X, 
  UserPlus, 
  AlertTriangle, 
  CheckCircle2, 
  ShieldCheck, 
  Zap, 
  MapPin, 
  Phone, 
  Home, 
  Building2, 
  Factory, 
  Wheat,
  Calculator,
  IndianRupee,
  Sparkles,
  Plus
} from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockProjects";

const DISTRICTS = [
  "Salem",
  "Namakkal",
  "Erode",
  "Dharmapuri",
  "Coimbatore",
  "Karur",
  "Tirupur",
  "Krishnagiri"
];

const LEAD_SOURCES = [
  "Direct Enquiry",
  "Website",
  "Phone Call",
  "WhatsApp",
  "Referral",
  "Existing Customer",
  "Exhibition / Expo",
  "Digital Marketing",
  "Employee Reference",
  "Channel Partner",
  "PM Surya Ghar National Portal",
  "Other Sources"
];

const BUILDING_TYPES = [
  "Independent House / Villa",
  "Apartment / Residential Complex",
  "Commercial Complex / Office",
  "Factory / Industrial Shed",
  "Farmhouse / Agricultural Pump",
  "Educational / Hospital"
];

const ROOF_TYPES = [
  "RCC Flat Concrete Roof",
  "Sloped Metal / Tin Sheet",
  "Traditional Clay Tiled Roof",
  "Elevated Superstructure Needed",
  "Ground Mounted Solar"
];

const CATEGORIES = [
  { id: "Residential", label: "Residential", sub: "PM Surya Ghar", icon: Home },
  { id: "Commercial", label: "Commercial", sub: "SME / Offices", icon: Building2 },
  { id: "Industrial", label: "Industrial", sub: "Textile / Steel", icon: Factory },
  { id: "Agricultural", label: "Agriculture", sub: "Solar Pumps", icon: Wheat },
];

export default function LeadCaptureModal({ isOpen, onClose, onLeadCreated }) {
  const [formData, setFormData] = useState({
    customerName: "",
    mobile: "",
    email: "",
    ebConsumerNumber: "",
    district: "Salem",
    category: "Residential",
    source: "WhatsApp",
    buildingType: "Independent House / Villa",
    roofType: "RCC Flat Concrete Roof",
    estimatedCapacity: 3.3,
    monthlyBill: 4500,
    assignedEngineer: "Rajkumar S (Technical Sales Engineer)",
    remarks: ""
  });

  const [districtsList, setDistrictsList] = useState(DISTRICTS);
  const [isAddingCustomCircle, setIsAddingCustomCircle] = useState(false);
  const [customCircleName, setCustomCircleName] = useState("");
  const [mobileError, setMobileError] = useState(null);
  const [ebError, setEbError] = useState(null);

  const handleSaveCustomCircle = () => {
    const trimmed = customCircleName.trim();
    if (!trimmed) return;

    const formatted = trimmed.charAt(0).toUpperCase() + trimmed.slice(1).replace(/\s+Circle$/i, "");
    if (!districtsList.includes(formatted)) {
      setDistrictsList((prev) => [...prev, formatted]);
    }
    setFormData((prev) => ({ ...prev, district: formatted }));
    setCustomCircleName("");
    setIsAddingCustomCircle(false);
  };

  // Live duplicate checking (Questionnaire Q12)
  const handleMobileChange = (e) => {
    const val = e.target.value.replace(/\D/g, "").slice(0, 10);
    setFormData((prev) => ({ ...prev, mobile: val }));

    if (val.length === 10) {
      const existing = MOCK_PROJECTS.find((p) => p.customerPhone && p.customerPhone.replace(/\D/g, "") === val);
      if (existing) {
        setMobileError(`Duplicate Mobile! Registered as ${existing.id} (${existing.customerName}).`);
        return;
      }
    }
    setMobileError(null);
  };

  const handleEbChange = (e) => {
    const val = e.target.value.trim();
    setFormData((prev) => ({ ...prev, ebConsumerNumber: val }));

    if (val.length >= 8) {
      const cleanVal = val.replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
      const existing = MOCK_PROJECTS.find(
        (p) => p.ebConsumerNumber && p.ebConsumerNumber.replace(/[^a-zA-Z0-9]/g, "").toLowerCase() === cleanVal
      );
      if (existing) {
        setEbError(`Duplicate EB No! Assigned to ${existing.id} (${existing.customerName}).`);
        return;
      }
    }
    setEbError(null);
  };

  // Real-time calculations
  const cap = parseFloat(formData.estimatedCapacity) || 0;
  const estimatedCost = Math.round(cap * 65000);
  const isResidential = formData.category === "Residential";
  const subsidyAmount = isResidential ? (cap >= 3 ? 78000 : cap >= 2 ? 60000 : 30000) : 0;
  const netPayable = Math.max(0, estimatedCost - subsidyAmount);
  const annualSavings = Math.round(cap * 4.2 * 300 * 7.5);
  const paybackYears = annualSavings > 0 ? (netPayable / annualSavings).toFixed(1) : "3.5";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (mobileError || ebError || !formData.customerName || formData.mobile.length !== 10) return;

    const newId = `NIRT-2026-00${MOCK_PROJECTS.length + 1}`;
    const newLead = {
      id: newId,
      customerName: formData.customerName,
      customerPhone: `+91 ${formData.mobile}`,
      customerEmail: formData.email || `${formData.customerName.toLowerCase().replace(/\s+/g, ".")}@gmail.com`,
      ebConsumerNumber: formData.ebConsumerNumber,
      district: formData.district,
      category: formData.category,
      buildingType: formData.buildingType,
      roofType: formData.roofType,
      monthlyBill: Number(formData.monthlyBill) || 0,
      capacityKw: cap,
      totalValue: estimatedCost,
      currentStageId: "lead_captured",
      stage: "lead_captured",
      pipeline: "sales",
      salesLead: formData.assignedEngineer,
      leadSource: formData.source,
      remarks: formData.remarks || "Standard intake via " + formData.source,
      dateCreated: new Date().toISOString().split("T")[0],
      discomStatus: "Not Applied",
      subsidyStatus: isResidential ? "Eligible (Surya Ghar)" : "Not Applicable",
      paymentStatus: "Payment Pending"
    };

    onLeadCreated(newLead);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <Portal>
      <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-xs flex items-center justify-center z-[9999] p-2 sm:p-4">
        <div className="fixed inset-0 w-full h-full cursor-pointer" onClick={onClose} />

        <div className="relative bg-white border border-zinc-300 max-w-4xl w-full shadow-2xl overflow-hidden z-10 flex flex-col max-h-[95vh] animate-in fade-in duration-150">
          
          {/* Header */}
          <div className="px-4 py-3 sm:px-6 sm:py-4 border-b border-zinc-200 flex justify-between items-center bg-zinc-50 shrink-0">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <div className="w-8 h-8 bg-black text-white flex items-center justify-center font-bold text-sm shrink-0">
                <UserPlus className="w-4 h-4" />
              </div>
              <div className="min-w-0">
                <h3 className="font-bold text-sm sm:text-base text-black tracking-tight truncate">Provision New Solar Deal</h3>
                <p className="text-[10px] sm:text-[11px] text-zinc-500 font-mono truncate">
                  Salem HQ • TANGEDCO Feasibility &amp; RTS Intake
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Form & Live Financial Simulation Side-by-Side */}
          <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-zinc-200">
              
              {/* Form Input Columns (8 Cols) */}
              <div className="lg:col-span-8 p-4 sm:p-6 space-y-4 sm:space-y-5 text-xs">
                
                {/* Deduplication Warning Banner */}
                {(mobileError || ebError) && (
                  <div className="p-3 bg-red-50 border border-red-300 text-red-900 space-y-1">
                    <div className="font-bold flex items-center space-x-1.5">
                      <AlertTriangle className="w-4 h-4 text-red-600 shrink-0" />
                      <span>Duplicate Prevention Lock</span>
                    </div>
                    {mobileError && <p className="text-[11px]">{mobileError}</p>}
                    {ebError && <p className="text-[11px]">{ebError}</p>}
                  </div>
                )}

                {/* Section 1: Customer Identity & Lead Source */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    01. Customer Identity &amp; Lead Source (BRD §5.1)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Customer Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. K. Sundaramoorthy"
                        value={formData.customerName}
                        onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1 flex justify-between">
                        <span>Mobile (10 Digits) <span className="text-red-500">*</span></span>
                        {formData.mobile.length === 10 && !mobileError && (
                          <span className="text-emerald-600 font-mono text-[10px] flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Validated</span>
                          </span>
                        )}
                      </label>
                      <div className="relative">
                        <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 font-mono text-xs">
                          +91
                        </span>
                        <input
                          type="tel"
                          required
                          placeholder="98427 12345"
                          value={formData.mobile}
                          onChange={handleMobileChange}
                          className={`w-full border p-2.5 pl-11 bg-white text-xs focus:outline-hidden ${
                            mobileError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-black"
                          }`}
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Customer Email
                      </label>
                      <input
                        type="email"
                        placeholder="e.g. sundar.solar@gmail.com"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Lead Acquisition Source (BRD §5.1)
                      </label>
                      <select
                        value={formData.source}
                        onChange={(e) => setFormData({ ...formData, source: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black font-medium"
                      >
                        {LEAD_SOURCES.map((src) => (
                          <option key={src} value={src}>{src}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Installation Category, Building & Roof Type */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    02. Project Category, Building &amp; Roof Structure (BRD §5.1)
                  </span>
                  
                  {/* Category Selection */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {CATEGORIES.map((cat) => {
                      const Icon = cat.icon;
                      const isSelected = formData.category === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() => setFormData({ ...formData, category: cat.id })}
                          className={`p-3 text-left border transition-all cursor-pointer ${
                            isSelected
                              ? "border-black bg-zinc-950 text-white"
                              : "border-zinc-200 bg-white hover:border-zinc-400 text-zinc-900"
                          }`}
                        >
                          <Icon className={`w-4 h-4 mb-1.5 ${isSelected ? "text-white" : "text-zinc-500"}`} />
                          <div className="font-bold text-xs">{cat.label}</div>
                          <div className={`text-[10px] font-mono ${isSelected ? "text-zinc-300" : "text-zinc-400"}`}>
                            {cat.sub}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Building & Roof Type Dropdowns */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Type of Building
                      </label>
                      <select
                        value={formData.buildingType}
                        onChange={(e) => setFormData({ ...formData, buildingType: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black"
                      >
                        {BUILDING_TYPES.map((bt) => (
                          <option key={bt} value={bt}>{bt}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Roof Surface Type
                      </label>
                      <select
                        value={formData.roofType}
                        onChange={(e) => setFormData({ ...formData, roofType: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black"
                      >
                        {ROOF_TYPES.map((rt) => (
                          <option key={rt} value={rt}>{rt}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 3: TANGEDCO & District Information */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    03. TANGEDCO Grid Jurisdiction &amp; Consumption (BRD §5.1)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1 flex justify-between">
                        <span>EB Consumer Number <span className="text-red-500">*</span></span>
                        {formData.ebConsumerNumber.length >= 8 && !ebError && (
                          <span className="text-emerald-600 font-mono text-[10px]">Unique ✓</span>
                        )}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. 04-205-014-9821"
                        value={formData.ebConsumerNumber}
                        onChange={handleEbChange}
                        className={`w-full border p-2.5 bg-white text-xs font-mono focus:outline-hidden ${
                          ebError ? "border-red-500 bg-red-50" : "border-zinc-300 focus:border-black"
                        }`}
                      />
                    </div>

                    <div>
                      <div className="flex justify-between items-center mb-1">
                        <label className="text-zinc-700 font-semibold">
                          Distribution Circle
                        </label>
                        {!isAddingCustomCircle && (
                          <button
                            type="button"
                            onClick={() => setIsAddingCustomCircle(true)}
                            className="text-[10px] font-mono text-zinc-600 hover:text-black font-semibold flex items-center space-x-1 cursor-pointer transition-colors"
                          >
                            <Plus className="w-3 h-3 text-black" />
                            <span>Add Circle</span>
                          </button>
                        )}
                      </div>

                      {isAddingCustomCircle ? (
                        <div className="flex items-center space-x-1.5 animate-in fade-in duration-100">
                          <input
                            type="text"
                            autoFocus
                            placeholder="Enter circle name (e.g. Dindigul)"
                            value={customCircleName}
                            onChange={(e) => setCustomCircleName(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                handleSaveCustomCircle();
                              }
                            }}
                            className="flex-1 border border-black p-2 bg-white text-xs font-mono focus:outline-hidden"
                          />
                          <button
                            type="button"
                            onClick={handleSaveCustomCircle}
                            disabled={!customCircleName.trim()}
                            className="bg-black hover:bg-zinc-800 disabled:bg-zinc-200 text-white px-3 py-2 text-xs font-semibold cursor-pointer transition-colors"
                          >
                            Save
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setIsAddingCustomCircle(false);
                              setCustomCircleName("");
                            }}
                            className="border border-zinc-300 hover:bg-zinc-100 text-zinc-600 p-2 text-xs cursor-pointer"
                            title="Cancel"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <select
                          value={formData.district}
                          onChange={(e) => {
                            if (e.target.value === "__add_new__") {
                              setIsAddingCustomCircle(true);
                            } else {
                              setFormData({ ...formData, district: e.target.value });
                            }
                          }}
                          className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black cursor-pointer font-mono"
                        >
                          {districtsList.map((d) => (
                            <option key={d} value={d}>{d} Circle</option>
                          ))}
                          <option value="__add_new__" className="font-semibold text-black bg-zinc-100">
                            + Add Custom Circle...
                          </option>
                        </select>
                      )}
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Approx. Monthly Bill (₹)
                      </label>
                      <input
                        type="number"
                        min="500"
                        step="500"
                        placeholder="4500"
                        value={formData.monthlyBill}
                        onChange={(e) => setFormData({ ...formData, monthlyBill: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs font-mono focus:outline-hidden focus:border-black"
                      />
                    </div>
                  </div>
                </div>

                {/* Section 4: Solar Sizing, Staff Assignment & Remarks */}
                <div className="space-y-3">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-zinc-400 block">
                    04. Solar Sizing, Team Assignment &amp; Remarks (BRD §5.1)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Proposed Capacity (kW)
                      </label>
                      <input
                        type="number"
                        step="0.5"
                        min="1"
                        max="500"
                        value={formData.estimatedCapacity}
                        onChange={(e) => setFormData({ ...formData, estimatedCapacity: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs font-mono font-bold focus:outline-hidden focus:border-black"
                      />
                    </div>

                    <div>
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Assign Technical Sales / Survey Lead
                      </label>
                      <select
                        value={formData.assignedEngineer}
                        onChange={(e) => setFormData({ ...formData, assignedEngineer: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black"
                      >
                        <option value="Rajkumar S (Technical Sales Engineer)">Rajkumar S (Sales Team Lead)</option>
                        <option value="K. Murali (Site Survey Specialist)">K. Murali (Site Survey Team)</option>
                        <option value="S. Vignesh (Sales & Survey Lead)">S. Vignesh (Salem Circle)</option>
                        <option value="P. Ramesh (Sales Engineer)">P. Ramesh (Erode Circle)</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="text-zinc-700 block font-semibold mb-1">
                        Initial Intake Remarks &amp; Site Observations
                      </label>
                      <textarea
                        rows={2}
                        placeholder="e.g. 3-phase connection available, client interested in bifacial panels, roof has water tank obstacle at NW corner..."
                        value={formData.remarks}
                        onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                        className="w-full border border-zinc-300 p-2.5 bg-white text-xs focus:outline-hidden focus:border-black resize-none"
                      />
                    </div>
                  </div>
                </div>

              </div>

              {/* Live Financial Sizing & Subsidy Card (4 Cols) */}
              <div className="lg:col-span-4 p-6 bg-zinc-50 flex flex-col justify-between space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2 border-b border-zinc-200 pb-2">
                    <Calculator className="w-4 h-4 text-black" />
                    <span className="font-bold text-xs uppercase tracking-wide text-black">
                      Sizing
                    </span>
                  </div>

                  <div className="space-y-3">
                    <div className="p-3 bg-white border border-zinc-200 space-y-1">
                      <span className="text-[10px] text-zinc-400 font-mono uppercase block">Estimated Gross Value</span>
                      <div className="text-lg font-mono font-black text-black">
                        ₹{(estimatedCost / 100000).toFixed(2)} Lakhs
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        Base benchmark: ₹65,000 / kW (inc. GST)
                      </span>
                    </div>

                    {isResidential && (
                      <div className="p-3 bg-white border border-emerald-200 space-y-1">
                        <span className="text-[10px] text-emerald-700 font-mono font-bold uppercase block flex items-center space-x-1">
                          {/* <Sparkles className="w-3 h-3 text-emerald-600" /> */}
                          <span>PM Surya Ghar Subsidy</span>
                        </span>
                        <div className="text-base font-mono font-bold text-emerald-800">
                          - ₹{subsidyAmount.toLocaleString()}
                        </div>
                        <span className="text-[10px] text-emerald-700 font-mono block">
                          Direct DBT credit to customer bank A/C
                        </span>
                      </div>
                    )}

                    <div className="p-3 bg-white border border-zinc-200 space-y-2 text-[11px] font-mono">
                      <div className="flex justify-between text-zinc-600">
                        <span>Roof Area Required:</span>
                        <strong className="text-black">~{Math.round(cap * 100)} sq.ft</strong>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Net Customer Outlay:</span>
                        <strong className="text-black">₹{netPayable.toLocaleString()}</strong>
                      </div>
                      <div className="flex justify-between text-zinc-600">
                        <span>Estimated Payback:</span>
                        <strong className="text-emerald-700 font-bold">{paybackYears} Years</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-200 text-[10px] text-zinc-400 font-mono">
                  All captured leads auto-sync with Salem HQ sales dispatch &amp; TANGEDCO portal queue.
                </div>
              </div>

            </div>

            {/* Actions Bar */}
            <div className="px-6 py-4 border-t border-zinc-200 flex justify-between items-center bg-white shrink-0">
              <span className="text-[11px] text-zinc-500 font-mono">
                Mandatory fields marked with <span className="text-red-500">*</span>
              </span>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-zinc-300 px-4 py-2 text-xs font-semibold text-zinc-700 hover:bg-zinc-100 transition-colors cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={!!mobileError || !!ebError || !formData.customerName || formData.mobile.length !== 10}
                  className={`px-5 py-2 text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                    !!mobileError || !!ebError || !formData.customerName || formData.mobile.length !== 10
                      ? "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                      : "bg-black hover:bg-zinc-800 text-white shadow-xs cursor-pointer active:scale-[0.98]"
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Provision &amp; Enqueue Deal</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </Portal>
  );
}
