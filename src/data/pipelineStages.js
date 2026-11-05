// NIRT Solar EPC - 5 Synchronized Operational Pipelines & 20 Sequential Steps
// Direct extraction from NIRT_Solar_Standard_Process.pdf (Pages 1 & 2)

export const PIPELINES = {
  sales: {
    id: "sales",
    title: "1. Sales & Feasibility Pipeline",
    description: "Lead intake, viability qualification, 4-photo site survey, DPR design, and customer order closing",
    stepsRange: "Steps 01 to 06",
    color: "blue",
    stages: [
      {
        id: "step_01",
        stepNumber: 1,
        title: "Lead Inward & Intake",
        responsibleRole: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        inputs: ["Customer Name", "Phone", "Address", "Circle", "EB Consumer #"],
        uploads: ["Optional Lead Card / Inquiry Document"],
        gateRule: "Deduplicated Lead Profile Created",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_02",
        stepNumber: 2,
        title: "Lead Qualification (Viability)",
        responsibleRole: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        inputs: ["Sanctioned Load", "Monthly Units", "Roof Type", "Status"],
        outcomes: ["Qualified (Cat A/B/C)", "Unqualified (Cat D Dropped)"],
        gateRule: "Viability Profile / Drop Reason Recorded",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_03",
        stepNumber: 3,
        title: "Site Survey & Feasibility Audit",
        responsibleRole: "Site Surveyor",
        department: "Technical Field Survey",
        slaDays: 2,
        inputs: ["Tape Dims (L×W)", "Shadow Azimuth", "AC/DC Cable Meters"],
        uploads: ["4 Mandatory Photos (Roof, EB Meter, DB, Wall)"],
        gateRule: "Complete Survey Report Approved",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_04",
        stepNumber: 4,
        title: "System Design & Engineering DPR",
        responsibleRole: "Design Engineer",
        department: "Design & Engineering",
        slaDays: 1,
        inputs: ["kW Sizing", "Inverter Model", "String Configuration"],
        uploads: ["Single Line Diagram (SLD)", "Roof CAD Layout"],
        gateRule: "Verified SLD & System DPR Released",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_05",
        stepNumber: 5,
        title: "Commercial Quotation Sizing",
        responsibleRole: "Sales Executive",
        department: "Sales & BD",
        slaDays: 1,
        inputs: ["BOM Pricing", "Authorized Discount", "Commercial Terms"],
        uploads: ["Auto-generates Formal PDF Quotation"],
        gateRule: "Formal Quotation Dispatched to Client",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_06",
        stepNumber: 6,
        title: "Customer Order Confirmation",
        responsibleRole: "Sales / Customer",
        department: "Sales & Central PMO",
        slaDays: 1,
        inputs: ["Payment Mode", "Target Delivery Date"],
        uploads: ["Signed Customer Work Order Copy"],
        gateRule: "Project ID Generated (NIRT-XXXX)",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      }
    ]
  },

  approvals: {
    id: "approvals",
    title: "2. Advance & Approvals Pipeline",
    description: "80% upfront advance clearance, KYC digital locker assembly, and TANGEDCO grid feasibility sanction",
    stepsRange: "Steps 07 to 10",
    color: "violet",
    stages: [
      {
        id: "step_07",
        stepNumber: 7,
        title: "80% Advance Receipt Gatekeeper",
        responsibleRole: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 1,
        isHardGate: true,
        inputs: ["Bank UTR", "Amount Received (₹)", "Payment Date", "Mode"],
        uploads: ["Bank Credit Counterfoil / Receipt Advice Slip"],
        gateRule: "Stage 7 Cleared (Hard Procurement Lock Released)",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_08",
        stepNumber: 8,
        title: "Document Locker KYC Assembly",
        responsibleRole: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 2,
        inputs: ["Aadhaar #", "EB Consumer #", "PAN #", "Tax Receipt ID"],
        uploads: ["Aadhaar Copy", "EB Bill", "Cancelled Cheque", "Tax Receipt"],
        gateRule: "Complete KYC Document Package Assembled",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_09",
        stepNumber: 9,
        title: "TANGEDCO DISCOM Portal Filing",
        responsibleRole: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 2,
        inputs: ["Portal Application ID", "Submission Date"],
        uploads: ["DISCOM Acknowledgment Receipt"],
        gateRule: "Online Form 1 Application Verified",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_10",
        stepNumber: 10,
        title: "Technical Feasibility Sanction",
        responsibleRole: "Liaison / DISCOM",
        department: "DISCOM Liaison",
        slaDays: 7,
        inputs: ["Sanction Ref #", "Sanctioned kW Capacity"],
        uploads: ["TANGEDCO Feasibility Sanction Letter"],
        gateRule: "Grid Feasibility Sanctioned by Assistant Engineer",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      }
    ]
  },

  procurement: {
    id: "procurement",
    title: "3. Procurement & Store Pipeline",
    description: "Tier-1 factory PO issuance, warehouse receipt & serial number verification, and site dispatch",
    stepsRange: "Steps 11 to 13",
    color: "teal",
    stages: [
      {
        id: "step_11",
        stepNumber: 11,
        title: "Vendor PO Issuance",
        responsibleRole: "Procurement Exec",
        department: "Supply Chain & Procurement",
        slaDays: 2,
        inputs: ["PO #", "Vendor Name", "Module / Inverter Specs"],
        uploads: ["Vendor Purchase Order PDF"],
        gateRule: "Factory PO Dispatched (Requires Step 07 Advance)",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_12",
        stepNumber: 12,
        title: "Warehouse QC & Inwarding (GRN)",
        responsibleRole: "Store Executive",
        department: "Warehouse & Stores",
        slaDays: 2,
        inputs: ["GRN #", "Module & Inverter Serial Numbers", "QC Status"],
        uploads: ["QC Pass Sheet & Supplier Delivery Challan"],
        gateRule: "Inward GRN Tagged to Project ID",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_13",
        stepNumber: 13,
        title: "Material Dispatch to Site",
        responsibleRole: "Store / Logistics",
        department: "Warehouse & Logistics",
        slaDays: 1,
        inputs: ["Vehicle #", "Driver Phone", "Dispatch Date"],
        uploads: ["Site Delivery Challan / E-way Bill"],
        gateRule: "Full BOM Dispatched & Delivered to Site",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      }
    ]
  },

  execution: {
    id: "execution",
    title: "4. EPC Site Execution Pipeline",
    description: "GI structure erection, module torque clamping, inverter wiring, and TANGEDCO bi-directional net-meter sync",
    stepsRange: "Steps 14 to 17",
    color: "indigo",
    stages: [
      {
        id: "step_14",
        stepNumber: 14,
        title: "Civil Structure & Module Mounting",
        responsibleRole: "EPC Site Engineer",
        department: "Field Construction Ops",
        slaDays: 2,
        inputs: ["Torque Check (Nm)", "Tilt Angle (Deg)", "Alignment"],
        uploads: ["4 Milestone Erection Photos (Legs, Purlins, Panels)"],
        gateRule: "Mechanical Structural Sign-off Recorded",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_15",
        stepNumber: 15,
        title: "Electrical Cabling & Inverter Setup",
        responsibleRole: "EPC Site Engineer",
        department: "Field Construction Ops",
        slaDays: 2,
        inputs: ["Earthing Resistance Ohms (< 5.0 Ω)", "String Polarity"],
        uploads: ["Inverter Display Photo", "Chemical Earth Test Report"],
        gateRule: "Electrical Readiness & Safety Signed Off",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_16",
        stepNumber: 16,
        title: "10% On Installation Receipt",
        responsibleRole: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 1,
        isHardGate: true,
        inputs: ["Installation UTR", "Amount Received (₹)", "Receipt #"],
        uploads: ["Bank Credit Advice / Slip"],
        gateRule: "90% Cumulative Milestone Funds Reconciled",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_17",
        stepNumber: 17,
        title: "TANGEDCO Net Metering & Sync",
        responsibleRole: "Liaison / DISCOM",
        department: "DISCOM Liaison",
        slaDays: 5,
        isClosure: true,
        inputs: ["Bi-directional Net-Meter #", "Grid Sync Date & Time"],
        uploads: ["DISCOM Joint Commissioning Report (JCR) Signed"],
        gateRule: "Technical Closure: Grid Synchronized & Generating Power",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      }
    ]
  },

  subsidy: {
    id: "subsidy",
    title: "5. Closure & Subsidy Pipeline",
    description: "10% final balance collection, PM Surya Ghar claim submission, and direct bank subsidy transfer credit",
    stepsRange: "Steps 18 to 20",
    color: "cyan",
    stages: [
      {
        id: "step_18",
        stepNumber: 18,
        title: "10% Final Balance Collection",
        responsibleRole: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 2,
        isHardGate: true,
        isClosure: true,
        inputs: ["Final UTR", "Receipt #", "Customer Balance Zero Status"],
        uploads: ["Final Commercial Tax Invoice & Zero Balance Voucher"],
        gateRule: "Commercial Closure Achieved (Customer Balance = ₹0.00)",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_19",
        stepNumber: 19,
        title: "PM Surya Ghar Subsidy Submission",
        responsibleRole: "Subsidy Desk",
        department: "Government Subsidy Desk",
        slaDays: 2,
        inputs: ["National Portal Claim Ref #", "Customer Bank IFSC"],
        uploads: ["Combined JCR + Bi-directional Meter Photo"],
        gateRule: "National Portal Subsidy Claim Formally Lodged",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      },
      {
        id: "step_20",
        stepNumber: 20,
        title: "DBT Subsidy Credit & Formal Closure",
        responsibleRole: "Central PMO",
        department: "Central Project Management Office",
        slaDays: 14,
        isClosure: true,
        inputs: ["Subsidy DBT UTR", "Disbursed Sanctioned Amount (₹)"],
        uploads: ["Customer Bank Statement / Passbook Credit Proof"],
        gateRule: "Formal Triple Closure (Technical + Commercial + Subsidy)",
        editRule: "Edit with Reason (Logged to PMO Audit)"
      }
    ]
  }
};
