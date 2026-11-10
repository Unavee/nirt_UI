import React, { useState } from "react";
import { 
  FileText, Plus, History, CheckCircle2, Clock, 
  ArrowRight, Download, Printer, Shield, Eye, AlertCircle, 
  RefreshCw, X, Layers, Zap, IndianRupee, Save, Split, ShieldCheck
} from "lucide-react";
import CustomerConfirmationModal from "@/components/confirmation/CustomerConfirmationModal";
import Portal from "@/components/Portal";

export default function ProposalManager({ project, onProposalUpdate }) {
  const [activeVersion, setActiveVersion] = useState("v1.2");
  const [showNewRevisionModal, setShowNewRevisionModal] = useState(false);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  
  // 19 BFRD Proposal Parameters with Complete Multi-Revision History
  const [revisions, setRevisions] = useState([
    {
      version: "v1.2",
      status: "Accepted / Active",
      date: "02 Nov 2026, 11:30 IST",
      author: "Er. A. Syed (Technical Sales Lead)",
      reason: "Customer approved 1.5m elevated HDGI structure for terrace utility access; applied MD-authorized 3% goodwill concession.",
      
      // 1. Proposed System Capacity
      capacityKw: 5.4,
      systemType: "Grid-Tied Dual-String Rooftop PV",
      
      // 2. Solar Modules
      module: { 
        make: "Waaree Bi-facial TOPCon Glass-to-Glass", 
        wattage: 540, 
        count: 10, 
        totalWp: 5400,
        warranty: "12-Year Product / 30-Year Linear Yield"
      },
      
      // 3. Inverter
      inverter: { 
        make: "Sungrow Grid-Tied Dual-MPPT", 
        capacity: "5.0 kW", 
        phase: "Single Phase 230V / 50Hz",
        efficiency: "98.4%",
        warranty: "10-Year Replacement Warranty"
      },
      
      // 4. MMS / Structure
      mms: { 
        type: "Elevated HDGI (1.5m Clearance)", 
        coating: "80 Microns Hot-Dip Galvanized Iron", 
        windRating: "150 km/h Wind Speed Certified",
        tiltAngle: "12° South Orientation"
      },
      
      // 5. DC Cables
      dcCables: { 
        make: "Polycab Solar PV 4 sq.mm UV-Resistant Dual-Core", 
        lengthMeters: 65,
        rating: "1500V DC TUV 2PfG 1169 Certified"
      },
      
      // 6. AC Cables
      acCables: { 
        make: "Polycab 4 sq.mm 3-Core Armored Copper", 
        lengthMeters: 25,
        rating: "1100V Heavy Duty IS:1554"
      },
      
      // 7. Earthing
      earthing: { 
        pits: "3 Nos Maintenance-Free Chemical Gel Pits", 
        strip: "25x3 mm GI Strip with copper bonding", 
        resistance: "3.8 Ω (Verified Pass < 5.0 Ω TANGEDCO Standard)" 
      },
      
      // 8. Protection System
      protection: { 
        spd: "DC SPD Type II (1000V DC) + AC SPD Type II (320V AC)", 
        la: "Class A Solid Copper Lightning Arrester (15m radius cone)", 
        breaker: "25A Double Pole MCB + 30mA RCBO Shock Protection" 
      },
      
      // 9 & 10. Installation & Civil Works
      installationCharges: 22000,
      civilWorks: { 
        base: "Surface chipping, column grouting & M20 concrete pedestals", 
        curing: "7-Day chemical water-proofing membrane curing" 
      },
      
      // 11. Other Components
      otherComponents: "TANGEDCO Net Meter Enclosure, Walkway, Fire Extinguisher (CO2 2kg), Danger Cautionary Signages",
      
      // 12. GST (13.8% Composite Rate)
      basePlantCost: 242000,
      gstRate: "13.8% Composite (70% Goods @ 12% + 30% Services @ 18%)",
      gstAmount: 33396,
      
      // 13. Total Project Value
      totalProjectValue: 275396,
      
      // 14. Subsidy (PM Surya Ghar DBT)
      subsidy: 78000,
      
      // 15. Customer Payable Amount
      customerPayable: 197396,
      
      // 16. Payment Terms (Strict NIRT 80/10/10)
      paymentTerms: {
        advance80: 220317,
        dispatch10: 27540,
        netMeter10: 27539
      },
      
      // 17. Expected Generation
      dailyGenerationKwh: 24.3,
      monthlyGenerationKwh: 729,
      annualGenerationKwh: 8748,
      
      // 18. Estimated Savings
      monthlySavingsRs: 5832,
      annualSavingsRs: 69984,
      
      // 19. Payback Period
      paybackYears: "2.8"
    },
    {
      version: "v1.1",
      status: "Superseded",
      date: "28 Oct 2026, 15:45 IST",
      author: "P. Vijayakumar (Sales Engineer)",
      reason: "Initial flush mount revised to elevated after site survey flagged parapet wall shadow analysis.",
      capacityKw: 5.0,
      systemType: "Grid-Tied Single-String Rooftop PV",
      module: { make: "Waaree Mono PERC", wattage: 500, count: 10, totalWp: 5000 },
      inverter: { make: "Growatt Dual-MPPT", capacity: "5.0 kW", phase: "Single Phase 230V" },
      mms: { type: "Flush HDGI Structure", coating: "60 Microns GI", windRating: "130 km/h" },
      totalProjectValue: 262000,
      subsidy: 78000,
      customerPayable: 184000,
      dailyGenerationKwh: 22.5,
      annualSavingsRs: 64800,
      paybackYears: "2.9"
    },
    {
      version: "v1.0",
      status: "Superseded",
      date: "24 Oct 2026, 10:15 IST",
      author: "P. Vijayakumar (Sales Engineer)",
      reason: "Preliminary quotation based on initial customer electricity bill intake before site survey.",
      capacityKw: 4.0,
      systemType: "Grid-Tied Standard Rooftop PV",
      module: { make: "Adani Mono PERC", wattage: 400, count: 10, totalWp: 4000 },
      inverter: { make: "Growatt Single-MPPT", capacity: "4.0 kW", phase: "Single Phase 230V" },
      mms: { type: "Standard Aluminum Rail", coating: "Anodized Aluminum", windRating: "120 km/h" },
      totalProjectValue: 215000,
      subsidy: 78000,
      customerPayable: 137000,
      dailyGenerationKwh: 18.0,
      annualSavingsRs: 51840,
      paybackYears: "3.1"
    }
  ]);

  // Form State for Drafting New Revision
  const [newRevCapacity, setNewRevCapacity] = useState("5.4");
  const [newRevModule, setNewRevModule] = useState("Waaree Bi-facial TOPCon (540Wp)");
  const [newRevInverter, setNewRevInverter] = useState("Sungrow 5.0 kW Dual-MPPT");
  const [newRevMms, setNewRevMms] = useState("Elevated HDGI (1.5m Clearance)");
  const [newRevBaseCost, setNewRevBaseCost] = useState("242000");
  const [newRevDiscount, setNewRevDiscount] = useState("0");
  const [newRevReason, setNewRevReason] = useState("");

  const currentProp = revisions.find(r => r.version === activeVersion) || revisions[0];

  // Handle Creating a New Proposal Revision
  const handleCreateRevision = (e) => {
    e.preventDefault();
    if (!newRevReason.trim()) {
      alert("Please enter the mandatory reason for proposal revision.");
      return;
    }

    const nextVerNumber = (parseFloat(revisions[0].version.replace("v", "")) + 0.1).toFixed(1);
    const capNum = parseFloat(newRevCapacity) || 5.0;
    const baseCostNum = Math.max(0, parseFloat(newRevBaseCost) - (parseFloat(newRevDiscount) || 0));
    const gstCalc = Math.round(baseCostNum * 0.138);
    const totalCalc = baseCostNum + gstCalc;
    const subCalc = capNum >= 3 ? 78000 : capNum >= 2 ? 66000 : 33000;
    const payableCalc = Math.max(0, totalCalc - subCalc);
    const annualSavCalc = Math.round(capNum * 4.5 * 30 * 12 * 8.0);
    const paybackCalc = annualSavCalc > 0 ? (payableCalc / annualSavCalc).toFixed(1) : "3.0";

    const newRevisionObj = {
      version: `v${nextVerNumber}`,
      status: "Accepted / Active",
      date: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata"
      }).format(new Date()) + " IST",
      author: "Er. A. Syed (Technical Sales Lead)",
      reason: newRevReason,
      capacityKw: capNum,
      systemType: `${capNum} kWp Grid-Tied Dual-String Rooftop PV`,
      module: { make: newRevModule, wattage: 540, count: Math.ceil((capNum * 1000) / 540) },
      inverter: { make: newRevInverter, capacity: `${capNum} kW`, phase: "Single Phase 230V" },
      mms: { type: newRevMms, coating: "80 Microns Hot-Dip Galvanized Iron", windRating: "150 km/h" },
      dcCables: { make: "Polycab Solar PV 4 sq.mm Dual-Core", lengthMeters: 65 },
      acCables: { make: "Polycab 4 sq.mm Armored Copper", lengthMeters: 25 },
      earthing: { pits: "3 Nos Chemical Gel Pits", strip: "25x3 mm GI Strip", resistance: "3.8 Ω (< 5.0 Ω Pass)" },
      protection: { spd: "DC SPD Type II + AC SPD Type II", la: "Class A Copper Lightning Arrester" },
      installationCharges: 22000,
      civilWorks: { base: "Surface chipping & M20 pedestals", curing: "7-Day chemical curing" },
      otherComponents: "TANGEDCO Net Meter Enclosure, Walkway, Fire Extinguisher, Signages",
      basePlantCost: baseCostNum,
      gstRate: "13.8% Composite Rate",
      gstAmount: gstCalc,
      totalProjectValue: totalCalc,
      subsidy: subCalc,
      customerPayable: payableCalc,
      paymentTerms: {
        advance80: Math.round(totalCalc * 0.8),
        dispatch10: Math.round(totalCalc * 0.1),
        netMeter10: Math.round(totalCalc * 0.1)
      },
      dailyGenerationKwh: (capNum * 4.5).toFixed(1),
      monthlyGenerationKwh: Math.round(capNum * 4.5 * 30),
      annualGenerationKwh: Math.round(capNum * 4.5 * 365),
      monthlySavingsRs: Math.round(annualSavCalc / 12),
      annualSavingsRs: annualSavCalc,
      paybackYears: paybackCalc
    };

    // Mark previous active revision as superseded
    const updatedRevs = revisions.map(r => ({ ...r, status: "Superseded" }));
    setRevisions([newRevisionObj, ...updatedRevs]);
    setActiveVersion(`v${nextVerNumber}`);
    setShowNewRevisionModal(false);
    setNewRevReason("");
    if (onProposalUpdate) onProposalUpdate(newRevisionObj);
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Card */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 bg-white p-5 rounded-2xl border border-slate-200/80 shadow-xs">
        <div>
          <div className="flex items-center space-x-2.5">
            <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
              Technical & Commercial Proposal (Section 8)
            </h3>
            <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-700 border border-emerald-500/20 text-xs font-bold font-mono">
              {currentProp.version} • {currentProp.status}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-1">
            Engineered bill of materials, statutory taxes, payment gates, generation model, and audit revisions
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowConfirmationModal(true)}
            className="apple-button px-3.5 py-2 rounded-xl text-xs font-bold bg-emerald-600 text-white hover:bg-emerald-700 flex items-center space-x-1.5 shadow-sm"
          >
            <ShieldCheck className="w-3.5 h-3.5 text-white" />
            <span>Customer Confirmation (Sec 9)</span>
          </button>

          <button
            onClick={() => setShowCompareModal(true)}
            className="apple-button px-3 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
            title="Compare Revisions"
          >
            <Split className="w-3.5 h-3.5 text-slate-500" />
            <span>Compare Versions</span>
          </button>

          <button
            disabled
            title="Printing disabled by System Governance policy"
            className="apple-button px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-100 border border-slate-200 text-slate-400 cursor-not-allowed flex items-center space-x-1.5 shadow-none opacity-60"
          >
            <Printer className="w-3.5 h-3.5 text-slate-400" />
            <span>Proposal PDF (Disabled)</span>
          </button>

          <button
            onClick={() => setShowNewRevisionModal(true)}
            className="apple-button px-4 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-black flex items-center space-x-1.5 shadow-xs"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>New Proposal Revision</span>
          </button>
        </div>
      </div>

      {/* Revision Switcher Bar */}
      <div className="flex items-center space-x-2 overflow-x-auto pb-1">
        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider flex items-center space-x-1 mr-1">
          <History className="w-3.5 h-3.5" />
          <span>Revisions:</span>
        </span>
        {revisions.map((rev) => {
          const isSelected = activeVersion === rev.version;
          return (
            <button
              key={rev.version}
              onClick={() => setActiveVersion(rev.version)}
              className={`apple-button px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
                isSelected
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <span>{rev.version}</span>
              <span className={`text-[10px] px-1.5 py-0.2 rounded-md ${
                rev.status.includes("Active") ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-600"
              }`}>
                {rev.status.includes("Active") ? "Active" : "Superseded"}
              </span>
            </button>
          );
        })}
      </div>

      {/* Revision Meta Audit Card */}
      <div className="bg-slate-50 rounded-2xl border border-slate-200/90 p-4 text-xs space-y-1.5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center text-slate-600 gap-1">
          <span>Author: <strong className="text-slate-900">{currentProp.author}</strong></span>
          <span className="font-mono text-slate-400">{currentProp.date}</span>
        </div>
        <div className="text-slate-700">
          <strong className="text-slate-900">Mandatory Reason for Revision: </strong>
          {currentProp.reason}
        </div>
      </div>

      {/* Grid: 19 Parameter Technical & Commercial Display */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Left Column: Technical Bill of Materials (BOM) */}
        <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
          <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
            <Shield className="w-4 h-4 text-blue-600" />
            <span>1. Technical Specifications & Engineered BOM</span>
          </h4>

          <div className="divide-y divide-slate-100 text-xs">
            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">1. Proposed System Capacity</span>
              <strong className="text-slate-900 font-mono text-sm">{currentProp.capacityKw} kWp Grid-Tied</strong>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">2. Solar Modules</span>
              <div className="text-right">
                <strong className="text-slate-900 block">{currentProp.module?.make}</strong>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentProp.module?.count} Panels × {currentProp.module?.wattage}Wp ({currentProp.module?.totalWp || currentProp.capacityKw * 1000} Wp)
                </span>
                {currentProp.module?.warranty && (
                  <span className="text-[10px] text-emerald-600 block">{currentProp.module?.warranty}</span>
                )}
              </div>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">3. Inverter</span>
              <div className="text-right">
                <strong className="text-slate-900 block">{currentProp.inverter?.make}</strong>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentProp.inverter?.capacity} • {currentProp.inverter?.phase}
                </span>
              </div>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">4. MMS / Structure</span>
              <div className="text-right">
                <strong className="text-slate-900 block">{currentProp.mms?.type}</strong>
                <span className="text-[11px] text-slate-400 font-mono">
                  {currentProp.mms?.coating} • Rated {currentProp.mms?.windRating}
                </span>
              </div>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">5. DC Cables</span>
              <strong className="text-slate-900 font-mono text-right">{currentProp.dcCables?.make} ({currentProp.dcCables?.lengthMeters}m)</strong>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">6. AC Cables</span>
              <strong className="text-slate-900 font-mono text-right">{currentProp.acCables?.make} ({currentProp.acCables?.lengthMeters}m)</strong>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">7. Earthing Array</span>
              <div className="text-right">
                <strong className="text-slate-900 block">{currentProp.earthing?.pits}</strong>
                <span className="text-[11px] text-emerald-600 font-mono font-bold">{currentProp.earthing?.resistance}</span>
              </div>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">8. Protection System</span>
              <span className="text-slate-700 text-right max-w-xs">{currentProp.protection?.spd}</span>
            </div>

            <div className="py-2.5 flex justify-between items-center">
              <span className="text-slate-500">9. Installation Charges</span>
              <span className="font-mono text-slate-900 font-semibold">₹{(currentProp.installationCharges || 22000).toLocaleString("en-IN")}</span>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">10. Civil Works</span>
              <span className="text-slate-700 text-right max-w-xs">{currentProp.civilWorks?.base}</span>
            </div>

            <div className="py-2.5 flex justify-between items-start">
              <span className="text-slate-500">11. Other Components</span>
              <span className="text-slate-700 text-right max-w-xs">{currentProp.otherComponents}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Commercial Financial Breakdown, GST & Payback */}
        <div className="space-y-6">
          
          {/* Commercial Pricing & 80/10/10 Terms */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-4 shadow-xs">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <IndianRupee className="w-4 h-4 text-emerald-600" />
              <span>2. Commercial Terms, GST & Subsidy (Items 12–16)</span>
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">Base Turnkey Plant Cost</span>
                <span className="font-mono font-bold text-slate-900">₹{(currentProp.basePlantCost || 242000).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between py-1 border-b border-slate-100">
                <span className="text-slate-600">12. GST (13.8% Composite Rate)</span>
                <span className="font-mono text-slate-900 font-semibold">₹{(currentProp.gstAmount || 33396).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between py-2.5 bg-slate-50 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="font-extrabold text-slate-900 block text-xs">13. Total Project Value</span>
                  <span className="text-[10px] text-slate-400">Gross Turnkey Contract (Payable to NIRT)</span>
                </div>
                <span className="font-mono font-black text-slate-900 text-sm sm:text-base">
                  ₹{(currentProp.totalProjectValue || 275396).toLocaleString("en-IN")}
                </span>
              </div>

              <div className="flex justify-between py-2 text-emerald-700 font-medium">
                <div>
                  <span className="block font-bold">14. PM Surya Ghar Central DBT Subsidy</span>
                  <span className="text-[10px] text-emerald-600">Disbursed to customer bank account post net-metering</span>
                </div>
                <span className="font-mono font-bold text-sm text-emerald-700">- ₹{(currentProp.subsidy || 78000).toLocaleString("en-IN")}</span>
              </div>

              <div className="flex justify-between py-3 bg-emerald-50/80 p-3.5 rounded-xl border border-emerald-200">
                <div>
                  <span className="font-black text-emerald-950 block text-sm">15. Customer Payable Amount</span>
                  <span className="text-[10px] text-emerald-700">Net Effective Investment after DBT Subsidy</span>
                </div>
                <span className="font-mono font-black text-emerald-700 text-base sm:text-lg">
                  ₹{(currentProp.customerPayable || 197396).toLocaleString("en-IN")}
                </span>
              </div>
            </div>

            {/* 16. Payment Terms (Strict NIRT 80/10/10) */}
            <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                16. NIRT Standard 80/10/10 Payment Terms
              </span>
              <div className="grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500 font-bold">80% Advance (Stage 07)</span>
                  <strong className="font-mono text-slate-900 text-xs sm:text-sm">
                    ₹{Math.round(currentProp.totalProjectValue * 0.8).toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500 font-bold">10% Dispatch (Stage 11)</span>
                  <strong className="font-mono text-slate-900 text-xs sm:text-sm">
                    ₹{Math.round(currentProp.totalProjectValue * 0.1).toLocaleString("en-IN")}
                  </strong>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200">
                  <span className="block text-[10px] text-slate-500 font-bold">10% Net Meter (Stage 18)</span>
                  <strong className="font-mono text-slate-900 text-xs sm:text-sm">
                    ₹{Math.round(currentProp.totalProjectValue * 0.1).toLocaleString("en-IN")}
                  </strong>
                </div>
              </div>
            </div>
          </div>

          {/* 17, 18, 19. Generation Modeling & Payback Analytics */}
          <div className="bg-white rounded-2xl border border-slate-200/90 p-5 space-y-3.5 shadow-xs">
            <h4 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider flex items-center space-x-2 border-b border-slate-100 pb-3">
              <Zap className="w-4 h-4 text-violet-600" />
              <span>3. Generation Modeling & Payback Analytics (Items 17–19)</span>
            </h4>

            <div className="grid grid-cols-3 gap-3 text-center">
              <div className="p-3 rounded-xl bg-blue-50/60 border border-blue-100">
                <span className="text-[10px] font-bold text-blue-600 uppercase block">17. Generation</span>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                  {currentProp.dailyGenerationKwh || 24.3}
                </span>
                <span className="text-[10px] text-slate-500 block">kWh / Day</span>
                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                  {(currentProp.annualGenerationKwh || 8748).toLocaleString()} kWh/yr
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50/60 border border-emerald-100">
                <span className="text-[10px] font-bold text-emerald-600 uppercase block">18. Savings</span>
                <span className="text-base sm:text-lg font-black font-mono text-slate-900">
                  ₹{(currentProp.annualSavingsRs || 69984).toLocaleString("en-IN")}
                </span>
                <span className="text-[10px] text-slate-500 block">Per Year</span>
                <span className="text-[9px] text-slate-400 font-mono block mt-0.5">
                  ₹{(currentProp.monthlySavingsRs || 5832).toLocaleString()} /mo
                </span>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50/60 border border-indigo-100">
                <span className="text-[10px] font-bold text-indigo-600 uppercase block">19. Payback</span>
                <span className="text-base sm:text-lg font-black font-mono text-indigo-700">
                  {currentProp.paybackYears || "2.8"}
                </span>
                <span className="text-[10px] text-slate-500 block">Years</span>
                <span className="text-[9px] text-indigo-500 font-medium block mt-0.5">
                  ROI Break-even
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>

      {/* =========================================================================
          MODAL 1: Create New Proposal Revision (v1.x)
          ========================================================================= */}
      {showNewRevisionModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-sm text-slate-900">Draft New Proposal Revision</h4>
                    <span className="text-[11px] text-slate-400">Creates an append-only revision trail</span>
                  </div>
                </div>
                <button onClick={() => setShowNewRevisionModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={handleCreateRevision} className="space-y-4 text-xs">
                
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">1. Proposed Capacity (kWp)</label>
                    <input
                      type="number"
                      step="0.1"
                      value={newRevCapacity}
                      onChange={(e) => setNewRevCapacity(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">Base Plant Cost (₹)</label>
                    <input
                      type="number"
                      value={newRevBaseCost}
                      onChange={(e) => setNewRevBaseCost(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono font-bold focus:outline-hidden focus:border-blue-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">2. Solar Module Specification</label>
                  <select
                    value={newRevModule}
                    onChange={(e) => setNewRevModule(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden bg-white"
                  >
                    <option value="Waaree Bi-facial TOPCon (540Wp)">Waaree Bi-facial TOPCon Glass-to-Glass (540Wp)</option>
                    <option value="Adani Mono PERC (540Wp)">Adani Mono PERC Tier-1 (540Wp)</option>
                    <option value="Vikram Solar TOPCon (550Wp)">Vikram Solar TOPCon Half-Cut (550Wp)</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">3. Inverter Model</label>
                    <select
                      value={newRevInverter}
                      onChange={(e) => setNewRevInverter(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden bg-white"
                    >
                      <option value="Sungrow 5.0 kW Dual-MPPT">Sungrow 5.0 kW Dual-MPPT</option>
                      <option value="Growatt 5.0 kW Single Phase">Growatt 5.0 kW Single Phase</option>
                      <option value="Solis 5.0 kW Dual-MPPT">Solis 5.0 kW Dual-MPPT</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-bold text-slate-700 block mb-1">4. MMS Structure</label>
                    <select
                      value={newRevMms}
                      onChange={(e) => setNewRevMms(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden bg-white"
                    >
                      <option value="Elevated HDGI (1.5m Clearance)">Elevated HDGI (1.5m Clearance)</option>
                      <option value="Flush Mount HDGI (300mm)">Flush Mount HDGI (300mm)</option>
                      <option value="Ground Mount Super Structure">Ground Mount Super Structure</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">MD-Approved Goodwill Discount (₹)</label>
                  <input
                    type="number"
                    value={newRevDiscount}
                    onChange={(e) => setNewRevDiscount(e.target.value)}
                    placeholder="e.g. 5000"
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs font-mono focus:outline-hidden focus:border-blue-500"
                  />
                  <span className="text-[10px] text-slate-400 block mt-0.5">Discounts &gt; 5% require Managing Director authorization.</span>
                </div>

                <div>
                  <label className="font-bold text-slate-900 block mb-1">
                    Mandatory Reason for Revision <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={newRevReason}
                    onChange={(e) => setNewRevReason(e.target.value)}
                    placeholder="e.g. Customer requested 1.5m elevated structure to use terrace space for walking / laundry."
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 text-xs focus:outline-hidden focus:border-blue-500"
                    required
                  />
                </div>

                <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                  <button
                    type="button"
                    onClick={() => setShowNewRevisionModal(false)}
                    className="apple-button px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white hover:bg-black font-semibold flex items-center space-x-1.5"
                  >
                    <Save className="w-3.5 h-3.5" />
                    <span>Save Revision</span>
                  </button>
                </div>

              </form>

            </div>
          </div>
        </Portal>
      )}

      {/* =========================================================================
          MODAL 2: Compare Revisions Side-by-Side
          ========================================================================= */}
      {showCompareModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-200 max-w-3xl w-full p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto animate-in zoom-in-95 duration-150">
              
              <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                <div className="flex items-center space-x-2">
                  <Split className="w-4 h-4 text-violet-600" />
                  <h4 className="font-extrabold text-sm text-slate-900">Side-by-Side Proposal Revision Audit</h4>
                </div>
                <button onClick={() => setShowCompareModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="overflow-x-auto text-xs">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50">
                      <th className="p-3 font-bold text-slate-500">Parameter</th>
                      {revisions.slice(0, 3).map((r) => (
                        <th key={r.version} className="p-3 font-bold text-slate-900">
                          {r.version} ({r.status.includes("Active") ? "Active" : "Archived"})
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Capacity</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 font-mono font-bold text-slate-900">{r.capacityKw} kWp</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Structure Type</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 text-slate-800">{r.mms?.type || "Standard"}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Turnkey Contract Value</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 font-mono font-bold text-slate-900">₹{r.totalProjectValue.toLocaleString("en-IN")}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Net Customer Payable</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 font-mono font-bold text-emerald-700">₹{r.customerPayable.toLocaleString("en-IN")}</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Payback Period</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 font-mono text-indigo-700">{r.paybackYears} Years</td>
                      ))}
                    </tr>
                    <tr>
                      <td className="p-3 font-semibold text-slate-600">Revision Reason</td>
                      {revisions.slice(0, 3).map((r) => (
                        <td key={r.version} className="p-3 text-slate-600 text-[11px] italic">{r.reason}</td>
                      ))}
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="flex justify-end pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowCompareModal(false)}
                  className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold"
                >
                  Close Comparison
                </button>
              </div>

            </div>
          </div>
        </Portal>
      )}

      {/* =========================================================================
          MODAL 3: Official Printable Letterhead Proposal PDF
          ========================================================================= */}
      {showPrintModal && (
        <Portal>
          <div className="fixed inset-0 z-[9999] bg-slate-950/70 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150">
            <div className="bg-white rounded-3xl border border-slate-300 max-w-3xl w-full p-8 shadow-2xl space-y-6 max-h-[92vh] overflow-y-auto animate-in zoom-in-95 duration-150">
              
              {/* Header Letterhead */}
              <div className="flex justify-between items-start border-b-2 border-slate-900 pb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 p-1 flex items-center justify-center shadow-xs">
                    <img src="/brandLogo.png" alt="NIRT Solar Logo" width={40} height={40} className="object-contain" />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-slate-900 tracking-tight leading-none">
                      NIRT RENEWABLE ENERGY PRIVATE LIMITED
                    </h3>
                    <p className="text-[11px] text-slate-500 font-medium mt-1">
                      104/7, 1st Floor, SPC Bhawan, Opp. New Bus Stand, Salem - 636 004, Tamil Nadu
                    </p>
                    <p className="text-[10px] text-slate-400 font-mono">
                      GSTIN: 33AAFCN4764L1Z5 • CIN: U74999TZ2017PTC028477
                    </p>
                  </div>
                </div>
                <button onClick={() => setShowPrintModal(false)} className="text-slate-400 hover:text-slate-700">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Proposal Document Meta */}
              <div className="grid grid-cols-2 gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs">
                <div>
                  <span className="text-slate-400 block text-[10px] font-bold">CLIENT INFORMATION</span>
                  <strong className="text-slate-900 text-sm block">{project?.customerName || "K. Sengottaiyan"}</strong>
                  <span className="text-slate-600 block">{project?.siteAddress || "142/3 Trichy Main Road, Dadagapatty, Salem - 636 006"}</span>
                  <span className="text-slate-500 font-mono text-[11px]">EB No: {project?.consumerNumber || "04-201-008-1420"}</span>
                </div>
                <div className="text-right">
                  <span className="text-slate-400 block text-[10px] font-bold">PROPOSAL REFERENCE</span>
                  <strong className="text-slate-900 text-sm block font-mono">PROP-2026-NIRT-0042</strong>
                  <span className="text-slate-600 block">Version: <strong className="text-emerald-700">{currentProp.version}</strong> ({currentProp.date})</span>
                  <span className="text-slate-500 text-[11px]">Valid Until: 30 Days from issue</span>
                </div>
              </div>

              {/* Technical Specifications Summary */}
              <div className="space-y-2 text-xs">
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5">
                  1. Engineered Technical Summary
                </h5>
                <div className="grid grid-cols-2 gap-2 text-slate-700">
                  <div>Capacity: <strong className="text-slate-900 font-mono">{currentProp.capacityKw} kWp Grid-Tied</strong></div>
                  <div>Modules: <strong className="text-slate-900">{currentProp.module?.make} ({currentProp.module?.count} Nos)</strong></div>
                  <div>Inverter: <strong className="text-slate-900">{currentProp.inverter?.make}</strong></div>
                  <div>Structure: <strong className="text-slate-900">{currentProp.mms?.type}</strong></div>
                  <div>DC Cable: <strong className="text-slate-900">{currentProp.dcCables?.make}</strong></div>
                  <div>Earthing: <strong className="text-slate-900">{currentProp.earthing?.pits}</strong></div>
                </div>
              </div>

              {/* Commercial Pricing Table */}
              <div className="space-y-2 text-xs">
                <h5 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] border-b border-slate-200 pb-1.5">
                  2. Commercial Schedule &amp; Taxes
                </h5>
                <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                  <div className="p-2.5 flex justify-between bg-slate-50 font-semibold">
                    <span>Base EPC Turnkey Value (Modules + Inverter + MMS + Installation)</span>
                    <span className="font-mono">₹{currentProp.basePlantCost.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-2.5 flex justify-between">
                    <span>Composite GST ({currentProp.gstRate})</span>
                    <span className="font-mono">₹{currentProp.gstAmount.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 flex justify-between bg-slate-100 font-black text-slate-900">
                    <span>Total Turnkey Contract Value Payable to NIRT Energy</span>
                    <span className="font-mono text-sm">₹{currentProp.totalProjectValue.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-2.5 flex justify-between text-emerald-700 font-bold">
                    <span>PM Surya Ghar Direct DBT Subsidy (Reimbursed by Central Govt)</span>
                    <span className="font-mono">- ₹{currentProp.subsidy.toLocaleString("en-IN")}</span>
                  </div>
                  <div className="p-3 flex justify-between bg-emerald-50 text-emerald-900 font-black">
                    <span>Net Effective Customer Investment</span>
                    <span className="font-mono text-sm sm:text-base">₹{currentProp.customerPayable.toLocaleString("en-IN")}</span>
                  </div>
                </div>
              </div>

              {/* Payment Terms & Bank Remittance */}
              <div className="border border-slate-200 p-4 rounded-xl bg-slate-50 text-xs space-y-2">
                <span className="font-extrabold text-slate-900 block text-[11px] uppercase tracking-wider">
                  Bank Remittance Details (80% Advance Gatekeeper)
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-600 font-mono text-[11px]">
                  <div>Bank: <strong>ICICI BANK</strong></div>
                  <div>Branch: <strong>SALEM MAIN BRANCH</strong></div>
                  <div>Account No: <strong>611905057857</strong></div>
                  <div>IFSC Code: <strong>ICIC0006119</strong></div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex justify-end space-x-2.5 pt-3 border-t border-slate-100">
                <button
                  onClick={() => setShowPrintModal(false)}
                  className="apple-button px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50 font-semibold text-xs"
                >
                  Dismiss
                </button>
                <button
                  disabled
                  title="Printing disabled by System Governance policy"
                  className="apple-button px-5 py-2 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-semibold text-xs flex items-center space-x-1.5 shadow-none cursor-not-allowed opacity-60"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-400" />
                  <span>Print Disabled</span>
                </button>
              </div>

            </div>
          </div>
        </Portal>
      )}

      {/* SECTION 9: CUSTOMER CONFIRMATION MODAL */}
      <CustomerConfirmationModal
        isOpen={showConfirmationModal}
        proposal={currentProp}
        project={project}
        onClose={() => setShowConfirmationModal(false)}
        onConfirmConversion={(confirmedData) => {
          setRevisions(prev => prev.map(r => r.version === currentProp.version ? { ...r, status: "Accepted & Confirmed" } : r));
          if (onProposalUpdate) onProposalUpdate(confirmedData);
        }}
      />

    </div>
  );
}
