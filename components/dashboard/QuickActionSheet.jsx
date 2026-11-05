"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRole } from "@/context/RoleContext";
import { 
  X, 
  CheckCircle2, 
  Upload, 
  Camera, 
  ShieldAlert, 
  FileText, 
  Check, 
  ArrowRight,
  AlertCircle,
  FileCheck,
  AlertTriangle,
  Flame,
  ArrowUpRight
} from "lucide-react";

export function QuickActionSheet({ isOpen, onClose, defaultAction = null, project = null, onStepComplete = null }) {
  const { activeRole, addAuditEntry } = useRole();
  const [selectedAction, setSelectedAction] = useState(defaultAction || activeRole.operationalActions?.[0]);
  const [formData, setFormData] = useState({});
  const [selectedFileName, setSelectedFileName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (defaultAction) {
      setSelectedAction(defaultAction);
      // Pre-fill initial project data if provided
      const initial = {};
      if (project) {
        initial.projectId = project.id;
        initial.customerName = project.client || project.clientName || "";
        initial.clientName = project.client || project.clientName || "";
        initial.proposedCapacity = project.capacity || "";
        initial.districtCircle = project.district || "";
      }
      setFormData(initial);
      setSelectedFileName("");
      setErrorMessage("");
    } else if (activeRole.operationalActions?.[0]) {
      setSelectedAction(activeRole.operationalActions[0]);
    }
  }, [defaultAction, activeRole, project]);

  if (!isOpen) return null;

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setErrorMessage("");
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFileName(file.name);
      handleInputChange("uploadedDocName", file.name);
    }
  };

  // Full 20-Step Inputs Model with enriched Step 01, Step 02, and Step 05
  function getRequiredFields(stepRaw) {
    const step = String(stepRaw || "").padStart(2, "0");
    switch (step) {
      // -------------------------------------------------------------
      // PIPELINE 1: SALES & FEASIBILITY (Steps 01 - 06)
      // -------------------------------------------------------------
      case "01":
        return [
          { id: "customerName", label: "Customer Full Name", type: "text", placeholder: "" },
          { id: "phone", label: "Primary Phone Number", type: "tel", placeholder: "" },
          { id: "address", label: "Site Address / Village", type: "text", placeholder: "" },
          { id: "circle", label: "Electricity Circle / District", type: "text", placeholder: "" },
          { id: "ebNumber", label: "TANGEDCO EB Consumer #", type: "text", placeholder: "" },
          { id: "leadSource", label: "Where Lead Came From (Acquisition Channel)", type: "select", options: [
            "WhatsApp Campaign",
            "Customer Reference",
            "Direct Walk-in",
            "Electrical Contractor",
            "Digital / Social Media",
            "Local Print / Newspaper Ad",
            "Expo / Trade Fair",
            "Custom / Other Source"
          ]},
          { id: "customLeadSource", label: "Custom Lead Source Name", type: "text", placeholder: "", isCustomSource: true },
          { id: "leadSourceDetails", label: "Source Details / Referrer Name", type: "text", placeholder: "" }
        ];

      case "02":
        return [
          { id: "qualificationStatus", label: "Lead Qualification Status (BFRD §6)", type: "select", options: [
            "New",
            "Contacted",
            "Qualified",
            "Site Survey Required",
            "Not Qualified",
            "Lost",
            "Converted"
          ]},
          { id: "sanctionedLoad", label: "Sanctioned Load (kW)", type: "number", placeholder: "e.g. 5" },
          { id: "monthlyUnits", label: "Monthly Consumption (Units / kWh)", type: "number", placeholder: "e.g. 480" },
          { id: "roofType", label: "Roof Type", type: "select", options: [
            "RCC Concrete Flat Roof",
            "Industrial Metal Shed",
            "Tiled Roof",
            "Ground Mount / Farm",
            "Elevated Superstructure"
          ]},
          { id: "viability", label: "Viability Classification", type: "select", options: [
            "Cat A: Prime Viable (>4kW)",
            "Cat B: Standard Viable (2-3kW)",
            "Cat C: Budget Viable (1-2kW)",
            "Cat D: Dropped / Unqualified"
          ]},
          { id: "dropReason", label: "Mandatory Reason for Loss / Rejection (BFRD §6)", type: "select", options: [
            "Not Applicable (Lead Active/Qualified)",
            "Lead rejected",
            "Customer not interested",
            "Price issue",
            "Technical issue",
            "Competitor selected",
            "Customer postponed",
            "Other reason"
          ]},
          { id: "dropRemarks", label: "Mandatory Reason Details & Field Notes (BFRD §6)", type: "text", placeholder: "e.g. Price too high for customer / Chose competitor offering cheap panel / Weak roof structure." }
        ];

      case "03":
        return [
          { id: "dimensions", label: "Tape Dims: Length × Width (Usable sq.ft)", type: "text", placeholder: "e.g. 30ft × 20ft (600 sq.ft)" },
          { id: "shadowAzimuth", label: "Shadow Deductions & Mumty Height (sq.ft)", type: "text", placeholder: "e.g. 100 sq.ft shadow deduction, True South Orientation" },
          { id: "supplyPhase", label: "Existing Electrical System & Phase", type: "select", options: [
            "Single-Phase LT (230V)",
            "Three-Phase LT (415V)",
            "High Tension HT (11kV / 22kV)"
          ]},
          { id: "connectedLoad", label: "Sanctioned vs Connected Load (kW)", type: "text", placeholder: "e.g. Sanctioned: 5kW | Connected: 4.2kW" },
          { id: "transformerDetails", label: "Distribution Transformer (DT) & Saturation (<70%)", type: "text", placeholder: "e.g. 250 kVA DT (42% loaded, Pass)" },
          { id: "cableMeters", label: "DC & AC Cable Route Distance (Meters)", type: "number", placeholder: "e.g. DC: 28m | AC: 14m" },
          { id: "earthResistance", label: "Chemical Earth Pit Soil Resistance (< 5Ω)", type: "text", placeholder: "e.g. 3.8 Ohms (Pass < 5Ω)" }
        ];

      case "04":
        return [
          { id: "kwSizing", label: "Proposed System Capacity (kW)", type: "number", placeholder: "e.g. 10.0" },
          { id: "inverterModel", label: "Inverter OEM & Model", type: "text", placeholder: "e.g. Sungrow SG10RT 10kW Three-Phase" },
          { id: "strings", label: "String Configuration", type: "text", placeholder: "e.g. 2 Strings × 10 Modules (550Wp TopCon)" }
        ];

      case "05":
        return [
          { id: "proposedKw", label: "Proposed Solar System Capacity (kW)", type: "number", placeholder: "e.g. 5.0" },
          { id: "moduleSelection", label: "Solar Module Selection & Quantity", type: "text", placeholder: "e.g. 10x 550Wp Mono PERC TopCon = 5.5 kWp DC" },
          { id: "inverterSelection", label: "Inverter OEM & Capacity", type: "text", placeholder: "e.g. 5kW Single-Phase Hybrid On-Grid" },
          { id: "structureType", label: "Mounting Structure Specification", type: "select", options: [
            "Standard Hot-Dip Galvanized (HDG) Roof Mount",
            "Elevated Superstructure (>7ft clearance)",
            "Industrial Metal Shed Sheet Clamps",
            "Ground Poured Concrete Piers"
          ]},
          { id: "bomPricing", label: "Gross Equipment BOM Price (₹ Excl. GST)", type: "number", placeholder: "e.g. 240000" },
          { id: "gstRate", label: "Applicable Solar EPC GST Scheme", type: "select", options: [
            "13.8% Composite Solar Scheme (70% Goods @12% + 30% Service @18%)",
            "18% Standard Commercial GST",
            "12% Equipment GST"
          ]},
          { id: "discount", label: "Authorized Commercial Discount (%)", type: "number", placeholder: "e.g. 3.0 (Discounts > 5% require MD sign-off)" },
          { id: "totalQuotedValue", label: "Net Customer Payable Contract Value (₹)", type: "number", placeholder: "e.g. 264926" },
          { id: "estimatedSubsidy", label: "Estimated PM Surya Ghar DBT Subsidy (₹)", type: "select", options: [
            "₹78,000 Central DBT Benefit (3kW and above)",
            "₹60,000 Central DBT Benefit (2kW system)",
            "₹30,000 Central DBT Benefit (1kW system)",
            "₹0.00 Commercial LT / HT Non-Subsidy"
          ]},
          { id: "terms", label: "Commercial Milestone Payment Terms", type: "select", options: [
            "Standard 80% Advance + 10% On Install + 10% Net-Meter",
            "Commercial 70/20/10 with Custom Bank Guarantee",
            "Special Institutional Split Payment"
          ]},
          { id: "validityDays", label: "Quotation Price Validity", type: "select", options: [
            "15 Days (Recommended for commodity module pricing)",
            "30 Days Standard Quotation"
          ]}
        ];

      case "06":
        return [
          { id: "paymentMode", label: "Selected Payment Mode", type: "select", options: [
            "NEFT / RTGS Bank Transfer",
            "Digital UPI / Net Banking",
            "Account Payee Cheque"
          ]},
          { id: "targetDate", label: "Target Installation Date", type: "date" },
          { id: "projectId", label: "Generated Project ID", type: "text", placeholder: "e.g. NIRT-2610-0046" }
        ];

      // -------------------------------------------------------------
      // PIPELINE 2: ADVANCE & APPROVALS (Steps 07 - 10)
      // -------------------------------------------------------------
      case "07":
        return [
          { id: "bankUtr", label: "Bank UTR / Transaction Reference #", type: "text", placeholder: "e.g. ICIC26110599182" },
          { id: "amountPaid", label: "80% Upfront Advance Amount (₹)", type: "number", placeholder: "e.g. 384000" },
          { id: "paymentDate", label: "Bank Credit Date", type: "date" },
          { id: "paymentMode", label: "Payment Clearance Mode", type: "select", options: [
            "Bank NEFT / RTGS",
            "Digital UPI / QR",
            "Cheque Clearance"
          ]}
        ];

      case "08":
        return [
          { id: "aadhaarNo", label: "Customer Aadhaar Number (12 Digits)", type: "text", placeholder: "e.g. 9812-4402-8819" },
          { id: "consumerNo", label: "TANGEDCO EB Consumer #", type: "text", placeholder: "e.g. 04-123-004-981" },
          { id: "panNo", label: "Customer PAN Number", type: "text", placeholder: "e.g. ABCDE1234F" },
          { id: "taxReceiptId", label: "Property Tax Receipt / Assessment ID", type: "text", placeholder: "e.g. TAX-SLM-2026-881" }
        ];

      case "09":
        return [
          { id: "portalAppId", label: "TANGEDCO Form 1 Portal Application ID", type: "text", placeholder: "e.g. TANGEDCO-2026-APP-4401" },
          { id: "submissionDate", label: "Portal Online Submission Date", type: "date" },
          { id: "sectionOffice", label: "DISCOM Distribution Section Office", type: "text", placeholder: "e.g. Salem West Section Office" }
        ];

      case "10":
        return [
          { id: "sanctionRefNo", label: "Technical Feasibility Sanction Ref #", type: "text", placeholder: "e.g. TNEB/SE/FEAS/2026/8910" },
          { id: "sanctionedKw", label: "Sanctioned Solar Capacity (kW)", type: "number", placeholder: "e.g. 10" },
          { id: "sanctionDate", label: "Sanction Issue Date", type: "date" }
        ];

      // -------------------------------------------------------------
      // PIPELINE 3: PROCUREMENT & STORES (Steps 11 - 13)
      // -------------------------------------------------------------
      case "11":
        return [
          { id: "poNumber", label: "Purchase Order (PO) Number", type: "text", placeholder: "e.g. NIRT-PO-2026-088" },
          { id: "vendorName", label: "Tier-1 Vendor / Manufacturer Name", type: "text", placeholder: "e.g. Waaree / Vikram Solar / Sungrow" },
          { id: "moduleInvSpecs", label: "Module & Inverter Technical Specs", type: "text", placeholder: "e.g. 18x 550Wp Mono PERC TopCon + 10kW Inverter" }
        ];

      case "12":
        return [
          { id: "grnNumber", label: "Goods Receipt Note (GRN) #", type: "text", placeholder: "e.g. GRN-2026-0419" },
          { id: "serialNumbers", label: "Module Barcodes & Inverter Serial Numbers", type: "text", placeholder: "e.g. MOD-8891001 to MOD-8891018, INV-SG-991" },
          { id: "qcStatus", label: "Warehouse QC Inspection Status", type: "select", options: [
            "QC Passed (All Verified)",
            "QC On Hold (Minor Transit Damage)",
            "QC Rejected"
          ]}
        ];

      case "13":
        return [
          { id: "vehicleNo", label: "Transport Vehicle Registration #", type: "text", placeholder: "e.g. TN 30 AX 4410" },
          { id: "driverPhone", label: "Driver Mobile Phone Number", type: "tel", placeholder: "e.g. 9443100220" },
          { id: "dispatchDate", label: "Site Dispatch Date", type: "date" }
        ];

      // -------------------------------------------------------------
      // PIPELINE 4: EPC SITE EXECUTION (Steps 14 - 17)
      // -------------------------------------------------------------
      case "14":
        return [
          { id: "torqueNm", label: "Structure Bolt Torque Check (Nm)", type: "number", placeholder: "e.g. 45" },
          { id: "tiltAngleDeg", label: "Structure Tilt Angle (Degrees)", type: "number", placeholder: "e.g. 12" },
          { id: "waterproofing", label: "Roof Penetration Waterproofing", type: "select", options: [
            "EPDM Washer + Chemical Sealant Applied",
            "Non-Penetrating Ballast Mounting",
            "Ground Concrete Piers"
          ]}
        ];

      case "15":
        return [
          { id: "earthResistance", label: "Chemical Earth Pit Resistance (< 5.0 Ω)", type: "text", placeholder: "e.g. 1.8 Ohms" },
          { id: "polarity", label: "String DC Polarity Check", type: "select", options: [
            "Verified Correct (+/- Tested)",
            "Reversed (Rewiring Scheduled)"
          ]},
          { id: "vocIsc", label: "Voc & Isc String Output Test", type: "text", placeholder: "e.g. String 1: 420V / 13.2A, String 2: 420V / 13.1A" }
        ];

      case "16":
        return [
          { id: "installationUtr", label: "10% Installation Bank UTR", type: "text", placeholder: "e.g. HDFC2611058820" },
          { id: "amountPaid", label: "Amount Received (10% Milestone ₹)", type: "number", placeholder: "e.g. 48000" },
          { id: "receiptNo", label: "Accounts Receipt Voucher #", type: "text", placeholder: "e.g. RCP-2026-1102" }
        ];

      case "17":
        return [
          { id: "meterNumber", label: "Bi-Directional Net-Meter Serial #", type: "text", placeholder: "e.g. TNEB-MTR-88910" },
          { id: "syncDate", label: "Grid Synchronization Date & Time", type: "datetime-local" },
          { id: "importExportKwh", label: "Initial Meter Reading (Import / Export kWh)", type: "text", placeholder: "e.g. Import: 124.0 / Export: 0.0" }
        ];

      // -------------------------------------------------------------
      // PIPELINE 5: CLOSURE & SUBSIDY (Steps 18 - 20)
      // -------------------------------------------------------------
      case "18":
        return [
          { id: "finalUtr", label: "Final 10% Settlement Bank UTR", type: "text", placeholder: "e.g. SBIN2611057710" },
          { id: "receiptNo", label: "Final Tax Invoice #", type: "text", placeholder: "e.g. INV-2026-042" },
          { id: "balanceZero", label: "Customer Outstanding Balance Confirmation", type: "select", options: [
            "Customer Balance = ₹0.00 (Fully Settled)",
            "Pending Commercial Dispute Deduction"
          ]}
        ];

      case "19":
        return [
          { id: "portalClaimRef", label: "National Portal Subsidy Claim Reference #", type: "text", placeholder: "e.g. PMSG-TN-2026-9901" },
          { id: "bankIfsc", label: "Customer DBT Bank IFSC Code", type: "text", placeholder: "e.g. SBIN0001234" }
        ];

      case "20":
        return [
          { id: "subsidyDbtUtr", label: "Central Government DBT Subsidy UTR #", type: "text", placeholder: "e.g. GOV-DBT-2611048821" },
          { id: "sanctionedAmount", label: "Disbursed Subsidy Amount (₹)", type: "number", placeholder: "e.g. 78000" },
          { id: "tripleClosureStatus", label: "Triple Closure Gate Verification", type: "select", options: [
            "All 3 Closures Verified: Technical (17) + Commercial (18) + Subsidy (20)",
            "Pending Verification"
          ]}
        ];

      default:
        return [
          { id: "referenceId", label: "Operational Reference / Doc #", type: "text", placeholder: "e.g. REF-2026-001" },
          { id: "notes", label: "Field Verification Notes", type: "text", placeholder: "e.g. Verified according to standard manual" }
        ];
    }
  }

  // Exact Uploads strictly extracted from Page 1 of NIRT_Solar_Standard_Process.pdf
  function getRequiredUpload(stepRaw) {
    const step = String(stepRaw || "").padStart(2, "0");
    switch (step) {
      case "01": return "Optional Lead Card / Inquiry Document (PDF / JPG)";
      case "02": return "None (Outcome automatically categorized into Cat A-D)";
      case "03": return "4 Mandatory Photos: [1] Roof Area, [2] EB Meter, [3] Main DB, [4] Inverter Wall + Terrace 360° Walkthrough Video";
      case "04": return "Single Line Diagram (SLD) & Roof CAD Layout PDF";
      case "05": return "None (Auto-generates Formal PDF Quotation)";
      case "06": return "Signed Customer Work Order Copy (PDF / Scan)";
      case "07": return "Bank Credit Counterfoil / Receipt Advice Slip";
      case "08": return "KYC Package: Aadhaar Copy, EB Bill, Cancelled Cheque, Property Tax Receipt";
      case "09": return "TANGEDCO DISCOM Online Acknowledgment Receipt PDF";
      case "10": return "Official TANGEDCO Feasibility Sanction Letter PDF";
      case "11": return "Vendor Purchase Order (PO) PDF Copy";
      case "12": return "QC Pass Sheet & Supplier Delivery Challan";
      case "13": return "Stamped Site Delivery Challan / E-Way Bill PDF";
      case "14": return "4 Erection Milestone Photos: Structure Legs, Purlins, Modules, Waterproofing";
      case "15": return "Inverter LCD Display Photo & Chemical Earth Pit Test Report";
      case "16": return "Bank Credit Advice / Slip (10% Installation Milestone)";
      case "17": return "DISCOM Commissioning Report (JCR) Signed by TANGEDCO AE";
      case "18": return "Final Commercial Tax Invoice & Zero Balance Voucher";
      case "19": return "Combined JCR Report + Installed Bi-Directional Net-Meter Photo";
      case "20": return "Customer Bank Passbook / DBT Credit Statement Proof";
      default: return "Attach Milestone Proof / Document (PDF, Photo)";
    }
  }

  // Progressive Next-Step Workflow helper (Zero-Confusing Step-by-Step advancement)
  function getProgressiveMilestone(stepRaw, viabilityValue, qualificationStatus) {
    const step = String(stepRaw || "").padStart(2, "0");
    const isTerminal = step === "02" && (
      qualificationStatus === "Not Qualified" ||
      qualificationStatus === "Lost" ||
      qualificationStatus === "Lead rejected" ||
      viabilityValue?.includes("Cat D")
    );

    if (isTerminal) {
      return {
        isTerminal: true,
        badge: "Lead Disqualified / Lost (BFRD §6)",
        nextTitle: "Lead Closed & Formally Archived",
        nextDesc: `Lead status is "${qualificationStatus || "Lost"}". It is stopped from proceeding to Step 03 (Site Survey) and archived in the PMO Audit Log.`,
        buttonText: `Confirm & Archive ${qualificationStatus || "Lost"} Lead`
      };
    }

    const NEXT_STAGE_MAP = {
      "01": { code: "Step 02", name: "Lead Qualification (Viability)" },
      "02": { code: "Step 03", name: "Site Survey & Feasibility Audit" },
      "03": { code: "Step 04", name: "System Design & Engineering DPR" },
      "04": { code: "Step 05", name: "Commercial Quotation Sizing" },
      "05": { code: "Step 06", name: "Customer Order Confirmation" },
      "06": { code: "Step 07", name: "80% Advance Receipt Gatekeeper" },
      "07": { code: "Step 08", name: "Document Locker KYC Assembly" },
      "08": { code: "Step 09", name: "TANGEDCO DISCOM Portal Filing" },
      "09": { code: "Step 10", name: "Technical Feasibility Sanction" },
      "10": { code: "Step 11", name: "Vendor PO Issuance" },
      "11": { code: "Step 12", name: "Warehouse QC & Inwarding (GRN)" },
      "12": { code: "Step 13", name: "Material Dispatch to Site" },
      "13": { code: "Step 14", name: "Civil Structure & Module Mounting" },
      "14": { code: "Step 15", name: "Electrical Cabling & Inverter Setup" },
      "15": { code: "Step 16", name: "10% On Installation Receipt" },
      "16": { code: "Step 17", name: "TANGEDCO Net Metering & Sync" },
      "17": { code: "Step 18", name: "10% Final Balance Collection" },
      "18": { code: "Step 19", name: "PM Surya Ghar Subsidy Submission" },
      "19": { code: "Step 20", name: "DBT Subsidy Credit & Formal Closure" },
      "20": { code: "Complete", name: "Triple Project Closure Achieved ✓" }
    };

    const next = NEXT_STAGE_MAP[step] || { code: "Next Gate", name: "Sequential Pipeline Milestone" };

    return {
      isTerminal: false,
      badge: `Progresses to ${next.code}`,
      nextTitle: next.name,
      nextDesc: `Signing this step authorizes handover and immediately unlocks ${next.code} for the responsible department.`,
      buttonText: `Complete Step ${step} & Advance to ${next.code}`
    };
  }

  const currentAction = selectedAction || activeRole.operationalActions?.[0];
  const currentStep = currentAction?.step;
  const fields = getRequiredFields(currentStep);
  const uploadRequirement = getRequiredUpload(currentStep);
  const isNoUploadRequired = uploadRequirement.startsWith("None");
  const isCatDSelected = currentStep === "02" && (
    formData.qualificationStatus === "Not Qualified" ||
    formData.qualificationStatus === "Lost" ||
    formData.qualificationStatus === "Lead rejected" ||
    formData.viability?.includes("Cat D")
  );
  const milestone = getProgressiveMilestone(currentStep, formData.viability, formData.qualificationStatus);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate inputs
    for (const rf of fields) {
      // Custom lead source is only required if "Custom / Other Source" is selected
      if (rf.id === "customLeadSource" && formData.leadSource !== "Custom / Other Source") {
        continue;
      }
      // If Cat D is selected, dropReason and dropRemarks are strictly mandatory
      if (rf.id === "dropReason" || rf.id === "dropRemarks") {
        if (isCatDSelected && !formData[rf.id]) {
          setErrorMessage(`Please provide: ${rf.label}`);
          return;
        }
      } else if (!formData[rf.id]) {
        // Drop reason not required if not Cat D
        if (rf.id !== "dropReason" && rf.id !== "dropRemarks") {
          setErrorMessage(`Please fill out: ${rf.label}`);
          return;
        }
      }
    }

    // Determine audit log description
    let outcomeReason = "Initial authorized milestone verification";
    let stepTitle = `Step ${currentStep}: ${currentAction?.title}`;
    let newValue = String(formData[fields[0]?.id] || "Submitted");

    if (isCatDSelected) {
      outcomeReason = `Lead Dropped: ${formData.dropReason} • ${formData.dropRemarks || "Unqualified"}`;
      stepTitle = `Step 02: Lead Dropped (Closed)`;
      newValue = "Cat D: Dropped / Pipeline Terminated";
    }

    // Log to System Audit Log
    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: formData.projectId || project?.id || "NIRT-2610-0045",
      clientName: formData.customerName || formData.clientName || project?.client || "Apex Spinning Mill",
      step: stepTitle,
      field: fields[0]?.label || "Operational Record",
      oldValue: isCatDSelected ? "Active Inquiry" : "Pending Creation",
      newValue: newValue,
      reason: outcomeReason
    });

    if (onStepComplete) {
      onStepComplete({
        project: project,
        step: currentStep,
        formData: formData,
        isCatDSelected: isCatDSelected,
        fileName: selectedFileName
      });
    }

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({});
      setSelectedFileName("");
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
      {/* Tap backdrop to close */}
      <div className="fixed inset-0" onClick={onClose} />

      {/* Sheet Modal Container */}
      <div className="relative w-full sm:max-w-xl bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/80 overflow-hidden flex flex-col max-h-[92dvh] pb-safe z-10 animate-in slide-in-from-bottom-6 duration-300">
        
        {/* iOS Drag Handle indicator on mobile */}
        <div className="sm:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mt-2.5 mb-1" />

        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <div className="flex items-center space-x-2.5">
            <span className={`w-2.5 h-2.5 rounded-full ${isCatDSelected ? "bg-rose-500 animate-pulse" : "bg-blue-600"}`} />
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-[10px] font-mono font-bold px-1.5 py-0.2 rounded bg-slate-100 text-slate-700">
                  Step {currentStep}
                </span>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  {currentAction?.title}
                </h3>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                Authorized Role: <span className="font-semibold text-slate-800">{activeRole.title.split("/")[0]}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="apple-button p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4">
          
          {/* Progressive Next Step Preview Banner */}
          <div className={`p-3.5 rounded-2xl border text-xs flex items-start space-x-2.5 ${
            isCatDSelected 
              ? "bg-rose-50 border-rose-200 text-rose-900" 
              : "bg-blue-50/70 border-blue-100 text-blue-900"
          }`}>
            {isCatDSelected ? (
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            ) : (
              <ArrowUpRight className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            )}
            <div>
              <div className="flex items-center space-x-1.5 mb-0.5">
                <span className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded ${
                  isCatDSelected ? "bg-rose-200 text-rose-900" : "bg-blue-200/70 text-blue-900"
                }`}>
                  {milestone.badge}
                </span>
                <strong className="font-bold">{milestone.nextTitle}</strong>
              </div>
              <p className="text-[11px] leading-relaxed opacity-90">
                {milestone.nextDesc}
              </p>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <div className="space-y-3.5">
            {fields.map((field) => {
              // Hide dropReason and dropRemarks if user didn't select Cat D in Step 02
              if (currentStep === "02" && (field.id === "dropReason" || field.id === "dropRemarks") && !isCatDSelected) {
                return null;
              }

              // Hide customLeadSource in Step 01 unless "Custom / Other Source" is selected
              if (field.id === "customLeadSource" && formData.leadSource !== "Custom / Other Source") {
                return null;
              }

              return (
                <div key={field.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-semibold text-slate-700">
                      {field.label}
                    </label>
                    {field.id === "discount" && formData.discount > 5 && (
                      <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.2 rounded border border-rose-200">
                        Requires MD Approval (&gt;5%)
                      </span>
                    )}
                  </div>

                  {field.type === "select" ? (
                    <select
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all"
                    >
                      <option value="">Select option...</option>
                      {field.options.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : field.type === "checkbox" ? (
                    <label className="flex items-start space-x-2.5 p-3 rounded-xl border border-slate-200 bg-slate-50/50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={!!formData[field.id]}
                        onChange={(e) => handleInputChange(field.id, e.target.checked)}
                        className="mt-0.5 w-4 h-4 rounded text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-xs text-slate-700 font-medium leading-tight">
                        {field.labelExtra}
                      </span>
                    </label>
                  ) : (
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.id] || ""}
                      onChange={(e) => handleInputChange(field.id, e.target.value)}
                      className="w-full text-sm px-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Interactive File Upload Area */}
          <div className="mt-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <div 
              onClick={() => !isNoUploadRequired && fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-4 text-center transition-all ${
                isNoUploadRequired
                  ? "border-slate-200 bg-slate-50/40 cursor-default"
                  : selectedFileName
                  ? "border-emerald-300 bg-emerald-50/40 cursor-pointer"
                  : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/50 hover:border-slate-300 cursor-pointer"
              }`}
            >
              {selectedFileName ? (
                <div className="flex items-center justify-center space-x-2 text-emerald-700">
                  <FileCheck className="w-5 h-5 text-emerald-600" />
                  <span className="text-xs font-bold truncate max-w-xs">{selectedFileName}</span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-mono">Ready ✓</span>
                </div>
              ) : (
                <>
                  <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1.5" />
                  <span className="text-xs font-semibold text-slate-700 block">
                    {uploadRequirement}
                  </span>
                  <span className="text-[11px] text-slate-400">
                    {isNoUploadRequired ? "Auto-handled by System" : "Click to browse & upload required file"}
                  </span>
                </>
              )}
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={submitted}
              className={`apple-button w-full py-3 px-4 rounded-2xl text-sm font-semibold text-white shadow-md flex items-center justify-center space-x-2 transition-all ${
                submitted 
                  ? "bg-emerald-600 shadow-emerald-600/20" 
                  : isCatDSelected
                  ? "bg-rose-600 hover:bg-rose-700 shadow-rose-600/20"
                  : "bg-slate-900 hover:bg-black shadow-slate-900/20"
              }`}
            >
              {submitted ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>{isCatDSelected ? "Lead Formally Dropped & Closed" : "Milestone Signed & Logged"}</span>
                </>
              ) : (
                <>
                  <span>{milestone.buttonText}</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
}
