import { useState } from "react";
import { Link } from "react-router-dom";
import { NIRT_COMPANY, MASTER_DATA } from "@/data/masterData";
import { 
  Settings, 
  Save, 
  Check, 
  Lock,
  Users,
  ArrowRight
} from "lucide-react";

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("company");
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = () => {
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
            Settings & Master Data Control
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Configure company branding, approval thresholds, equipment catalog, and role boundaries
          </p>
        </div>

        {savedNotice && (
          <div className="bg-zinc-950 text-white px-3.5 py-2 text-xs font-semibold flex items-center space-x-1.5 animate-in fade-in shadow-2xs">
            <Check className="w-4 h-4" />
            <span>Settings Saved!</span>
          </div>
        )}
      </div>

      {/* Tabs Header */}
      <div className="flex border-b border-zinc-200/80 bg-white p-1 space-x-1 overflow-x-auto shadow-2xs">
        {[
          { id: "company", label: "1. Company Profile & Bank (Annex H)" },
          { id: "catalog", label: "2. Equipment & Roof Catalog (Annex G)" },
          { id: "subsidy", label: "3. PM Surya Ghar Slabs" },
          { id: "approval", label: "4. Approval Matrix (Annex D)" },
          { id: "roles", label: "5. 15 User Roles (Annex C)" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 text-xs font-semibold transition-all ${
              activeTab === tab.id
                ? "bg-zinc-950 text-white shadow-xs"
                : "text-zinc-600 hover:text-black hover:bg-zinc-50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab 1: Company Profile & Bank */}
      {activeTab === "company" && (
        <div className="p-8 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="border-b border-zinc-200/80 pb-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-black">
                Company Details for Document Generation
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Printed automatically on Quotations, Invoices, Receipts, and Handover Certificates
              </p>
            </div>
            <button
              onClick={handleSave}
              className="bg-zinc-950 hover:bg-black text-white px-4 py-2 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm active:scale-[0.99]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Details</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
            
            <div className="space-y-4">
              <div>
                <label className="text-zinc-700 block font-semibold mb-1">Legal Entity Name:</label>
                <input
                  type="text"
                  defaultValue={NIRT_COMPANY.legalName}
                  className="w-full border border-zinc-200 p-2.5 font-bold bg-white focus:outline-hidden focus:border-black"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-700 block font-semibold mb-1 font-mono">CIN Number:</label>
                  <input
                    type="text"
                    defaultValue={NIRT_COMPANY.cin}
                    className="w-full border border-zinc-200 p-2.5 bg-white font-mono focus:outline-hidden focus:border-black"
                  />
                </div>
                <div>
                  <label className="text-zinc-700 block font-semibold mb-1 font-mono">GSTIN:</label>
                  <input
                    type="text"
                    defaultValue={NIRT_COMPANY.gstin}
                    className="w-full border border-zinc-200 p-2.5 bg-white font-mono focus:outline-hidden focus:border-black"
                  />
                </div>
              </div>

              <div>
                <label className="text-zinc-700 block font-semibold mb-1">Registered Office Address:</label>
                <textarea
                  rows="3"
                  defaultValue={NIRT_COMPANY.headOffice}
                  className="w-full border border-zinc-200 p-2.5 bg-white focus:outline-hidden focus:border-black"
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="border border-zinc-200/90 p-5 bg-zinc-50/50 space-y-3">
                <span className="font-semibold text-black block border-b border-zinc-200/80 pb-2">
                  Bank Details for Invoices (ICICI Bank)
                </span>
                <div className="grid grid-cols-2 gap-3.5">
                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase font-mono">Bank Name:</label>
                    <input
                      type="text"
                      defaultValue={NIRT_COMPANY.bankDetails.bank}
                      className="w-full border border-zinc-200 p-2 bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase font-mono">Branch:</label>
                    <input
                      type="text"
                      defaultValue={NIRT_COMPANY.bankDetails.branch}
                      className="w-full border border-zinc-200 p-2 bg-white text-xs"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase font-mono">Account Number:</label>
                    <input
                      type="text"
                      defaultValue={NIRT_COMPANY.bankDetails.accountNumber}
                      className="w-full border border-zinc-200 p-2 bg-white text-xs font-mono font-bold"
                    />
                  </div>
                  <div>
                    <label className="text-zinc-500 block text-[10px] uppercase font-mono">IFSC Code:</label>
                    <input
                      type="text"
                      defaultValue={NIRT_COMPANY.bankDetails.ifsc}
                      className="w-full border border-zinc-200 p-2 bg-white text-xs font-mono font-bold"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-zinc-700 block font-semibold mb-1">Authorised Signatory:</label>
                  <input
                    type="text"
                    defaultValue={NIRT_COMPANY.authorizedSignatory}
                    className="w-full border border-zinc-200 p-2.5 bg-white text-xs"
                  />
                </div>
                <div>
                  <label className="text-zinc-700 block font-semibold mb-1">Designation:</label>
                  <input
                    type="text"
                    defaultValue={NIRT_COMPANY.designation}
                    className="w-full border border-zinc-200 p-2.5 bg-white text-xs"
                  />
                </div>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* Tab 2: Equipment Catalog */}
      {activeTab === "catalog" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <div className="p-6 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
            <div className="border-b border-zinc-200/80 pb-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-black">
                Approved Solar Modules
              </h3>
              <button
                onClick={() => alert("Add module dialog")}
                className="bg-zinc-950 hover:bg-black text-white px-3 py-1.5 text-xs font-semibold transition-colors shadow-2xs"
              >
                + Add Model
              </button>
            </div>

            <div className="border border-zinc-200/80 overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-50/80 border-b border-zinc-200/80 font-semibold text-zinc-700">
                  <tr>
                    <th className="p-3 border-r border-zinc-200/60">Brand</th>
                    <th className="p-3 border-r border-zinc-200/60">Model</th>
                    <th className="p-3 border-r border-zinc-200/60">Wattage</th>
                    <th className="p-3">Warranty</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-zinc-100 font-mono">
                  {MASTER_DATA.solarModules.map((m, idx) => (
                    <tr key={idx}>
                      <td className="p-3 border-r border-zinc-100 font-bold font-sans">{m.brand}</td>
                      <td className="p-3 border-r border-zinc-100">{m.model}</td>
                      <td className="p-3 border-r border-zinc-100">{m.wattage}W</td>
                      <td className="p-3">{m.warrantyYears} yrs</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="p-6 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-4">
            <div className="border-b border-zinc-200/80 pb-3 flex justify-between items-center">
              <h3 className="font-bold text-sm text-black">
                Approved Solar Inverters
              </h3>
              <button
                onClick={() => alert("Add inverter dialog")}
                className="bg-zinc-950 hover:bg-black text-white px-3 py-1.5 text-xs font-semibold transition-colors shadow-2xs"
              >
                + Add Inverter
              </button>
            </div>

            <div className="border border-zinc-200/80 overflow-x-auto text-xs">
              <table className="w-full text-left">
                <thead className="bg-zinc-50/80 border-b border-zinc-200/80 font-semibold text-zinc-700">
                  <tr>
                    <th className="p-3 border-r border-zinc-200/60">Brand</th>
                    <th className="p-3 border-r border-zinc-200/60">Model</th>
                    <th className="p-3 border-r border-zinc-200/60">Rating</th>
                    <th className="p-3">Phase</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-zinc-100 font-mono">
                  {MASTER_DATA.inverters.map((inv, idx) => (
                    <tr key={idx}>
                      <td className="p-3 border-r border-zinc-100 font-bold font-sans">{inv.brand}</td>
                      <td className="p-3 border-r border-zinc-100">{inv.model}</td>
                      <td className="p-3 border-r border-zinc-100">{inv.capacityKw} kW</td>
                      <td className="p-3">{inv.phase}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* Tab 3: Subsidy Slabs */}
      {activeTab === "subsidy" && (
        <div className="p-8 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="border-b border-zinc-200/80 pb-4 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-black">
                PM Surya Ghar: Muft Bijli Yojana Subsidy Slabs
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Central Financial Assistance (CFA) disbursement limits
              </p>
            </div>
            <button
              onClick={handleSave}
              className="bg-zinc-950 hover:bg-black text-white px-4 py-2 text-xs font-semibold transition-all flex items-center space-x-1.5 shadow-sm active:scale-[0.99]"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Slabs</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 text-xs">
            {MASTER_DATA.subsidySlabsPM.map((slab, idx) => (
              <div key={idx} className="border border-zinc-200/80 p-5 bg-zinc-50/50 space-y-2">
                <span className="text-[10px] font-bold uppercase text-zinc-400 font-mono">
                  Slab {idx + 1}: {slab.minKw} kW to {slab.maxKw} kW
                </span>
                <div className="text-3xl font-black text-black font-mono">
                  ₹{slab.subsidyRs.toLocaleString("en-IN")}
                </div>
                <p className="text-zinc-600 text-xs mt-1">{slab.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Approval Matrix */}
      {activeTab === "approval" && (
        <div className="p-8 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="border-b border-zinc-200/80 pb-4">
            <h3 className="font-bold text-base text-black">
              Organizational Approval & Authorization Matrix
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Authority controls signed off in Questionnaire Annexure D
            </p>
          </div>

          <div className="border border-zinc-200/80 overflow-x-auto text-xs">
            <table className="w-full text-left">
              <thead className="bg-zinc-50/80 border-b border-zinc-200/80 font-semibold text-zinc-700">
                <tr>
                  <th className="p-3.5 border-r border-zinc-200/60">Action / Request Type</th>
                  <th className="p-3.5 border-r border-zinc-200/60">Threshold / Trigger</th>
                  <th className="p-3.5 border-r border-zinc-200/60">Authorized Approver</th>
                  <th className="p-3.5">Audit Requirement</th>
                </tr>
              </thead>
              <tbody className="divide-y border-zinc-100">
                <tr>
                  <td className="p-3.5 border-r border-zinc-100 font-semibold">Proposal Price Discount</td>
                  <td className="p-3.5 border-r border-zinc-100 font-mono">&gt; 5% below standard tariff</td>
                  <td className="p-3.5 border-r border-zinc-100 font-medium">CRM Manager / Management</td>
                  <td className="p-3.5 text-zinc-600">Discount justification note logged</td>
                </tr>
                <tr>
                  <td className="p-3.5 border-r border-zinc-100 font-semibold">Procurement PO Creation</td>
                  <td className="p-3.5 border-r border-zinc-100 font-mono">&gt; ₹5,00,000 PO value</td>
                  <td className="p-3.5 border-r border-zinc-100 font-medium">Project Manager & Management</td>
                  <td className="p-3.5 text-zinc-600">Advance payment verified</td>
                </tr>
                <tr>
                  <td className="p-3.5 border-r border-zinc-100 font-semibold">Stage Backwards Regression</td>
                  <td className="p-3.5 border-r border-zinc-100">Reverting any project stage</td>
                  <td className="p-3.5 border-r border-zinc-100 font-medium">CRM Manager</td>
                  <td className="p-3.5 text-zinc-600">Written reason mandatory</td>
                </tr>
                <tr>
                  <td className="p-3.5 border-r border-zinc-100 font-semibold">Project Cancellation</td>
                  <td className="p-3.5 border-r border-zinc-100">Any confirmed project</td>
                  <td className="p-3.5 border-r border-zinc-100 font-medium">Management (COO / Director)</td>
                  <td className="p-3.5 text-zinc-600">Audit trail irreversible</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 5: 15 Roles */}
      {activeTab === "roles" && (
        <div className="p-8 bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] space-y-6">
          <div className="border-b border-zinc-200/80 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-bold text-base text-black">
                User Roles & Permission Boundaries
              </h3>
              <p className="text-xs text-zinc-500 mt-0.5">
                Role configuration from BRD §4 and Questionnaire Annexure C
              </p>
            </div>
            <Link to="/settings/users"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold rounded-xl shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Users className="w-3.5 h-3.5" />
              <span>User & Role Governance Console</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 text-xs">
            {MASTER_DATA.userRoles.map((role, idx) => (
              <div key={idx} className="border border-zinc-200/80 p-5 bg-zinc-50/40 space-y-2.5">
                <div className="flex justify-between items-start">
                  <span className="font-mono text-[10px] font-bold bg-white text-zinc-800 border border-zinc-200 px-1.5 py-0.5">
                    ROLE {idx + 1}
                  </span>
                  <Lock className="w-3.5 h-3.5 text-zinc-400" />
                </div>
                <h4 className="font-bold text-sm text-black">
                  {role.title}
                </h4>
                <p className="text-zinc-600 text-xs leading-relaxed">
                  {role.permissions}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  );
}
