import { useState } from "react";
import { MASTER_DATA, NIRT_COMPANY } from "@/data/masterData";
import { 
  Calculator, 
  Zap, 
  Printer,
  CheckCircle2,
  AlertTriangle,
  X,
  FileText,
  Download,
  Building2,
  ShieldCheck
} from "lucide-react";

export default function SolarCalculatorPage() {
  const [monthlyBill, setMonthlyBill] = useState(3500);
  const [sanctionedLoadKw, setSanctionedLoadKw] = useState(3.0);
  const [tariffPerUnit, setTariffPerUnit] = useState(7.5);
  const [selectedRoof, setSelectedRoof] = useState(MASTER_DATA.roofTypes[0]);
  const [selectedModule, setSelectedModule] = useState(MASTER_DATA.solarModules[0]);
  const [selectedCategory, setSelectedCategory] = useState("residential");
  const [showProposalModal, setShowProposalModal] = useState(false);

  // Sizing Calculations
  const monthlyUnits = Math.round(monthlyBill / tariffPerUnit);
  const dailyUnits = monthlyUnits / 30;
  const rawKwNeeded = dailyUnits / 4.2;
  const capacityKw = rawKwNeeded <= 1.5 ? 1.0 : rawKwNeeded <= 2.5 ? 2.0 : rawKwNeeded <= 3.8 ? 3.3 : rawKwNeeded <= 6 ? 5.0 : Math.round(rawKwNeeded);

  const panelWattage = selectedModule.wattage;
  const panelCount = Math.ceil((capacityKw * 1000) / panelWattage);
  const roofAreaSqft = Math.round(panelCount * 28);

  const baseCostPerWatt = capacityKw <= 3 ? 65 : capacityKw <= 10 ? 58 : 52;
  const totalSystemCost = Math.round(capacityKw * 1000 * baseCostPerWatt);

  // PM Surya Ghar Direct Benefit Transfer (DBT) Subsidy
  let subsidyAmount = 0;
  if (selectedCategory === "residential") {
    if (capacityKw <= 1.2) subsidyAmount = 30000;
    else if (capacityKw <= 2.2) subsidyAmount = 60000;
    else subsidyAmount = 78000;
  }

  const netCustomerCost = totalSystemCost - subsidyAmount;
  const annualGenerationUnits = Math.round(capacityKw * 4.2 * 365);
  const annualSavingsRs = Math.round(annualGenerationUnits * tariffPerUnit);
  const paybackYears = (netCustomerCost / annualSavingsRs).toFixed(1);

  // TANGEDCO Grid Compliance Check
  const requiresLoadEnhancement = capacityKw > sanctionedLoadKw;

  return (
    <div className="space-y-8 pb-12">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200">
        <div>
          <h2 className="text-2xl font-bold text-black tracking-tight">
            Solar Sizing & Proposal ROI Engine
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Dynamic system sizing, PM Surya Ghar DBT modeling & customer quotation generator
          </p>
        </div>

        <button
          onClick={() => setShowProposalModal(true)}
          className="bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-semibold flex items-center space-x-2 transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] shadow-xs"
        >
          <Printer className="w-4 h-4" />
          <span>Generate Proposal PDF</span>
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Customer Parameters */}
        <div className="lg:col-span-5 p-6 bg-white border border-zinc-200 shadow-xs space-y-6">
          <h3 className="font-bold text-sm text-black border-b border-zinc-200 pb-3">
            Customer Input Parameters
          </h3>

          {/* Monthly Bill Input */}
          <div className="space-y-2.5">
            <div className="flex justify-between text-xs">
              <span className="font-semibold text-zinc-800">Average Monthly EB Bill:</span>
              <strong className="text-black font-mono text-base">₹{monthlyBill.toLocaleString("en-IN")}</strong>
            </div>
            <input
              type="range"
              min="1000"
              max="50000"
              step="500"
              value={monthlyBill}
              onChange={(e) => setMonthlyBill(Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-zinc-400 font-mono">
              <span>₹1,000 (Low)</span>
              <span>₹15,000 (Medium)</span>
              <span>₹50,000 (Heavy)</span>
            </div>
          </div>

          {/* Sanctioned Load Input */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <label className="font-semibold text-black">
                Existing TANGEDCO Sanctioned Load:
              </label>
              <span className="font-mono font-bold text-black">{sanctionedLoadKw} kW</span>
            </div>
            <input
              type="number"
              min="1"
              max="100"
              step="0.5"
              value={sanctionedLoadKw}
              onChange={(e) => setSanctionedLoadKw(Number(e.target.value))}
              className="w-full border border-zinc-200 p-2.5 text-xs font-mono bg-white focus:outline-hidden focus:border-black"
            />
          </div>

          {/* Category Selector */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-black block">
              Consumer Category:
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setSelectedCategory("residential")}
                className={`py-2 px-3 text-xs font-semibold transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] border ${
                  selectedCategory === "residential"
                    ? "bg-black text-white border-black"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                Residential (PM Surya Ghar)
              </button>
              <button
                type="button"
                onClick={() => setSelectedCategory("commercial")}
                className={`py-2 px-3 text-xs font-semibold transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] border ${
                  selectedCategory === "commercial"
                    ? "bg-black text-white border-black"
                    : "bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50"
                }`}
              >
                C&I / Agricultural (No Subsidy)
              </button>
            </div>
          </div>

          {/* Roof Type Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-black block">
              Roof Structure Type:
            </label>
            <select
              value={selectedRoof}
              onChange={(e) => setSelectedRoof(e.target.value)}
              className="w-full border border-zinc-200 p-2.5 text-xs bg-white focus:outline-hidden focus:border-black cursor-pointer"
            >
              {MASTER_DATA.roofTypes.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          {/* Module Brand Selection */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-black block">
              Solar Module Specification:
            </label>
            <select
              value={selectedModule.model}
              onChange={(e) => {
                const found = MASTER_DATA.solarModules.find((m) => m.model === e.target.value);
                if (found) setSelectedModule(found);
              }}
              className="w-full border border-zinc-200 p-2.5 text-xs bg-white focus:outline-hidden focus:border-black cursor-pointer"
            >
              {MASTER_DATA.solarModules.map((m) => (
                <option key={m.model} value={m.model}>
                  {m.brand} — {m.model} ({m.wattage}W)
                </option>
              ))}
            </select>
          </div>

          <div className="pt-3 border-t border-zinc-100 flex justify-between text-xs text-zinc-600 font-mono">
            <span>TANGEDCO Grid Tariff:</span>
            <strong className="text-black">₹{tariffPerUnit} / kWh</strong>
          </div>

          {/* Sanctioned Load Warning Alert */}
          {requiresLoadEnhancement && (
            <div className="p-3 bg-blue-50 border border-blue-200 text-blue-950 text-xs space-y-1">
              <div className="flex items-center space-x-1.5 font-bold">
                <AlertTriangle className="w-4 h-4 text-blue-700" />
                <span>TANGEDCO Sanctioned Load Notice</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Proposed {capacityKw} kW exceeds sanctioned load ({sanctionedLoadKw} kW). TANGEDCO net-metering regulations mandate a Load Enhancement application before technical feasibility sanction.
              </p>
            </div>
          )}

        </div>

        {/* Right Column: Sizing Results */}
        <div className="lg:col-span-7 space-y-6">
          
          <div className="p-6 bg-white border border-zinc-200 shadow-xs space-y-6">
            <div className="border-b border-zinc-200 pb-4 flex justify-between items-center">
              <div>
                <span className="text-[10px] font-mono bg-zinc-100 border border-zinc-200 text-zinc-800 px-2 py-0.5 font-bold uppercase">
                  Engineered Sizing Proposal
                </span>
                <h3 className="text-xl font-bold text-black mt-1">
                  Proposed: {capacityKw} kWp Grid-Tied System
                </h3>
              </div>
              <div className="w-10 h-10 bg-zinc-50 border border-zinc-200 flex items-center justify-center text-black">
                <Zap className="w-5 h-5" />
              </div>
            </div>

            {/* Quick Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="border border-zinc-200 p-3 bg-zinc-50">
                <span className="text-zinc-500 block text-[10px] font-mono uppercase">Solar Modules</span>
                <strong className="text-base text-black font-mono">{panelCount} Panels</strong>
                <span className="text-[10px] text-zinc-500 block">{panelWattage}W Each</span>
              </div>
              <div className="border border-zinc-200 p-3 bg-zinc-50">
                <span className="text-zinc-500 block text-[10px] font-mono uppercase">Roof Required</span>
                <strong className="text-base text-black font-mono">{roofAreaSqft} sq.ft</strong>
                <span className="text-[10px] text-zinc-500 block">Shadow Free</span>
              </div>
              <div className="border border-zinc-200 p-3 bg-zinc-50">
                <span className="text-zinc-500 block text-[10px] font-mono uppercase">Annual Yield</span>
                <strong className="text-base text-black font-mono">{annualGenerationUnits.toLocaleString("en-IN")}</strong>
                <span className="text-[10px] text-zinc-500 block">Units / Year</span>
              </div>
              <div className="border border-zinc-200 p-3 bg-zinc-50">
                <span className="text-zinc-500 block text-[10px] font-mono uppercase">Inverter Sizing</span>
                <strong className="text-base text-black font-mono">{capacityKw <= 3.3 ? "3.3 kW" : capacityKw <= 5 ? "5.0 kW" : `${capacityKw} kW`}</strong>
                <span className="text-[10px] text-zinc-500 block">{capacityKw <= 3.3 ? "1-Phase" : "3-Phase"}</span>
              </div>
            </div>

            {/* Financial Ledger Breakdown */}
            <div className="border border-zinc-200 p-5 bg-zinc-50 space-y-3 text-xs font-mono">
              <div className="font-semibold text-black uppercase border-b border-zinc-200 pb-2 flex justify-between font-sans">
                <span>Commercial Cost & Subsidy Summary</span>
                <span className="text-[11px] text-zinc-500 font-mono">INR (₹)</span>
              </div>

              <div className="flex justify-between py-1.5 border-b border-zinc-200">
                <span className="text-zinc-600">Total Turnkey Plant Cost (Payable to NIRT):</span>
                <strong className="text-black">₹{totalSystemCost.toLocaleString("en-IN")}</strong>
              </div>

              {selectedCategory === "residential" && (
                <div className="flex justify-between py-1.5 border-b border-zinc-200 text-emerald-800">
                  <span className="font-semibold">Expected Central DBT Subsidy (Credited to Customer Bank):</span>
                  <strong className="text-emerald-800 font-bold">- ₹{subsidyAmount.toLocaleString("en-IN")}</strong>
                </div>
              )}

              <div className="flex justify-between py-3 text-sm bg-white border border-zinc-200 px-4 mt-2">
                <span className="font-bold text-black uppercase font-sans">Net Customer Outlay Post-DBT:</span>
                <strong className="font-bold text-black font-mono text-base">₹{netCustomerCost.toLocaleString("en-IN")}</strong>
              </div>
            </div>

            {/* 80/10/10 Payment Terms Card */}
            <div className="border border-zinc-200 p-4 space-y-2 text-xs">
              <h4 className="font-bold text-black uppercase text-[11px]">NIRT Milestone Payment Schedule:</h4>
              <div className="grid grid-cols-3 gap-2 font-mono text-[11px]">
                <div className="border border-zinc-200 p-2 bg-zinc-50">
                  <span className="text-zinc-500 block text-[10px]">80% Upfront Advance</span>
                  <strong className="text-black font-bold">₹{Math.round(totalSystemCost * 0.8).toLocaleString("en-IN")}</strong>
                </div>
                <div className="border border-zinc-200 p-2 bg-zinc-50">
                  <span className="text-zinc-500 block text-[10px]">10% Site Installation</span>
                  <strong className="text-black font-bold">₹{Math.round(totalSystemCost * 0.1).toLocaleString("en-IN")}</strong>
                </div>
                <div className="border border-zinc-200 p-2 bg-zinc-50">
                  <span className="text-zinc-500 block text-[10px]">10% Net-Meter Sync</span>
                  <strong className="text-black font-bold">₹{Math.round(totalSystemCost * 0.1).toLocaleString("en-IN")}</strong>
                </div>
              </div>
            </div>

            {/* Payback Banner */}
            <div className="p-5 bg-black text-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs shadow-xs">
              <div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-400 block font-mono">Return on Investment</span>
                <div className="text-xl font-bold text-white mt-0.5">Estimated Payback: {paybackYears} Years</div>
                <div className="text-zinc-400 text-xs mt-1">
                  Annual Electricity Savings: ~₹{annualSavingsRs.toLocaleString("en-IN")} / year
                </div>
              </div>

              <div className="text-left sm:text-right border-t sm:border-t-0 sm:border-l border-zinc-800 pt-3 sm:pt-0 sm:pl-5">
                <span className="text-[10px] text-zinc-400 uppercase block font-mono">25-Year Plant Lifetime</span>
                <div className="text-lg font-bold text-white font-mono">~₹{(annualSavingsRs * 25 / 100000).toFixed(1)} Lakhs</div>
                <div className="text-[10px] text-zinc-400">Cumulative Savings</div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Official Proposal Modal */}
      {showProposalModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 max-w-2xl w-full p-6 shadow-xl space-y-5 animate-in fade-in zoom-in-95 duration-150">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 bg-black" />
                  <h4 className="font-bold text-base text-black">{NIRT_COMPANY.legalName}</h4>
                </div>
                <p className="text-xs text-zinc-500">{NIRT_COMPANY.address} • GSTIN: {NIRT_COMPANY.gstin}</p>
              </div>
              <button onClick={() => setShowProposalModal(false)} className="text-zinc-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-4 text-xs font-mono">
              <div className="grid grid-cols-2 gap-3 border border-zinc-200 p-3 bg-zinc-50">
                <div>
                  <span className="text-zinc-400 block text-[10px]">SYSTEM SPECIFICATION</span>
                  <strong className="text-black text-sm">{capacityKw} kWp Grid-Tied</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">MODULE MODEL</span>
                  <strong className="text-black text-sm">{selectedModule.brand} ({panelCount} panels)</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">TURNKEY CONTRACT</span>
                  <strong className="text-black text-sm">₹{totalSystemCost.toLocaleString("en-IN")}</strong>
                </div>
                <div>
                  <span className="text-zinc-400 block text-[10px]">80% ADVANCE DUE</span>
                  <strong className="text-black text-sm">₹{Math.round(totalSystemCost * 0.8).toLocaleString("en-IN")}</strong>
                </div>
              </div>

              {/* Bank Details */}
              <div className="border border-zinc-200 p-3 bg-white space-y-1.5">
                <h5 className="font-bold text-xs font-sans text-black">Bank Remittance Details (80% Advance Gatekeeper):</h5>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-zinc-600">
                  <div>Account Name: <strong className="text-black">{NIRT_COMPANY.legalName}</strong></div>
                  <div>Bank Name: <strong className="text-black">{NIRT_COMPANY.bankDetails.bankName}</strong></div>
                  <div>Account Number: <strong className="text-black">{NIRT_COMPANY.bankDetails.accountNumber}</strong></div>
                  <div>IFSC Code: <strong className="text-black">{NIRT_COMPANY.bankDetails.ifsc}</strong></div>
                </div>
              </div>

              {/* PM Surya Ghar DBT Subsidy Disclaimer */}
              <div className="p-3 bg-zinc-50 border border-zinc-200 text-[11px] font-sans text-zinc-600 space-y-1">
                <strong>PM Surya Ghar DBT Subsidy Clarification:</strong>
                <p>
                  Per MNRE guidelines, the central subsidy (₹{subsidyAmount.toLocaleString("en-IN")}) is disbursed directly to the customer’s Aadhaar-linked bank account within 30 days post grid-synchronization. The customer is obligated to settle 100% of the turnkey EPC contract value directly with NIRT Energy according to the 80/10/10 schedule.
                </p>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2 border-t border-zinc-100">
              <button 
                onClick={() => setShowProposalModal(false)}
                className="border border-zinc-300 px-3.5 py-1.5 text-xs font-semibold hover:bg-zinc-50 transition-transform active:scale-[0.98]"
              >
                Dismiss
              </button>
              <button 
                disabled
                title="Printing is disabled by System Governance policy"
                className="bg-slate-200 border border-slate-300 text-slate-400 px-4 py-1.5 text-xs font-semibold flex items-center space-x-1.5 cursor-not-allowed opacity-60"
              >
                <Printer className="w-3.5 h-3.5 text-slate-400" />
                <span>Print Quotation (Disabled)</span>
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
