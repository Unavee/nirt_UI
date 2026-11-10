// Section 17: Project Progress Tracking Data
// In strict accordance with BFRD Section 17:
// The CRM should have a project progress tracker tracking the 15 key lifecycle stages:
// Lead -> Site Survey -> Proposal -> Customer Confirmation -> Advance -> Documentation ->
// DISCOM Application -> Technical Feasibility -> Procurement -> Installation -> Inspection ->
// Net Metering -> Final Payment -> Subsidy -> Project Closure.

export const BFRD_PROGRESS_STAGES = [
  {
    stageNumber: 1,
    id: "lead",
    name: "Lead Inward & Intake",
    department: "Sales & Marketing",
    responsibleRole: "Sales Executive (R. Sundaram)",
    slaDays: 1,
    description: "Lead deduplication, consumer number capture, and initial rooftop consultation."
  },
  {
    stageNumber: 2,
    id: "site_survey",
    name: "Site Survey & Audit",
    department: "Engineering Field Ops",
    responsibleRole: "Site Surveyor (M. Saravanan)",
    slaDays: 2,
    description: "Rooftop shadow analysis, azimuth, 4-photo audit, and electrical cable routing."
  },
  {
    stageNumber: 3,
    id: "proposal",
    name: "Proposal & Quotation",
    department: "Design & Sales",
    responsibleRole: "Design Engineer (Er. S. Deepa)",
    slaDays: 1,
    description: "Detailed Project Report (DPR), equipment sizing, and commercial quotation delivery."
  },
  {
    stageNumber: 4,
    id: "customer_confirmation",
    name: "Customer Confirmation",
    department: "Sales & PMO",
    responsibleRole: "Sales Lead (R. Sundaram)",
    slaDays: 2,
    description: "Signed work order, payment terms agreement, and formal project handover."
  },
  {
    stageNumber: 5,
    id: "advance_payment",
    name: "80% Advance Payment",
    department: "Finance & Accounts",
    responsibleRole: "Accounts Officer (C. Shanmugam)",
    slaDays: 2,
    description: "80% project advance receipt verification, UTR recording, and financial milestone clearance."
  },
  {
    stageNumber: 6,
    id: "documentation",
    name: "Documentation & KYC",
    department: "Liaison & Legal",
    responsibleRole: "Liaison Officer (P. Murugesan)",
    slaDays: 2,
    description: "Aadhaar, EB bill, property tax receipt, and DISCOM affidavit assembly."
  },
  {
    stageNumber: 7,
    id: "discom_application",
    name: "DISCOM Application",
    department: "Regulatory Liaison",
    responsibleRole: "Liaison Officer (P. Murugesan)",
    slaDays: 3,
    description: "Statutory online filing on TANGEDCO/TNEB portal with registration fee UTR."
  },
  {
    stageNumber: 8,
    id: "technical_feasibility",
    name: "Technical Feasibility",
    department: "DISCOM & Technical",
    responsibleRole: "Liaison Lead (P. Murugesan)",
    slaDays: 7,
    description: "Distribution Transformer (DT) 75% hosting quota review and official sanction issuance."
  },
  {
    stageNumber: 9,
    id: "procurement",
    name: "Procurement Management",
    department: "Supply Chain & Purchase",
    responsibleRole: "Procurement Manager (Er. A. Karthik)",
    slaDays: 5,
    description: "12-category solar BoM issuance, vendor purchase orders, and warehouse GRN inwarding."
  },
  {
    stageNumber: 10,
    id: "installation",
    name: "Installation & Site Erection",
    department: "Project Execution",
    responsibleRole: "Project Field Manager (Er. K. Vasanth)",
    slaDays: 7,
    description: "Civil pedestals, MMS structure, 92x PV panels, inverter, DC/AC cabling, and earth pits."
  },
  {
    stageNumber: 11,
    id: "inspection_commissioning",
    name: "Inspection & Commissioning",
    department: "DISCOM & Quality",
    responsibleRole: "Field Manager (Er. K. Vasanth)",
    slaDays: 5,
    description: "CEIG & DISCOM AE joint site inspection, safety test verification, and CEIG sanction."
  },
  {
    stageNumber: 12,
    id: "net_metering",
    name: "Net Metering Installation",
    department: "DISCOM Metering MRT",
    responsibleRole: "Liaison Officer (P. Murugesan)",
    slaDays: 4,
    description: "Bi-directional net meter testing, calibration, and grid synchronization."
  },
  {
    stageNumber: 13,
    id: "final_payment",
    name: "Final Payment Settlement",
    department: "Finance & Accounts",
    responsibleRole: "Accounts Officer (C. Shanmugam)",
    slaDays: 3,
    description: "Remaining milestone billing (10% post installation + 10% post commissioning)."
  },
  {
    stageNumber: 14,
    id: "subsidy",
    name: "Subsidy Claim (DBT)",
    department: "Government Liaison",
    responsibleRole: "Subsidy Specialist (K. Priya)",
    slaDays: 14,
    description: "PM Surya Ghar National Portal DBT claim submission, inspection cert upload, and disbursement."
  },
  {
    stageNumber: 15,
    id: "project_closure",
    name: "Project Handover & Closure",
    department: "PMO & Quality",
    responsibleRole: "Project Director (Er. S. Prakash)",
    slaDays: 2,
    description: "O&M manual handover, warranty cards, customer orientation, and final project sign-off."
  }
];

export const INITIAL_PROJECT_PROGRESS_MAP = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan",
    capacity: "50 kWp",
    currentStageNumber: 10,
    overallPercent: 67, // (10 in progress / 15 stages)
    targetHandoverDate: "2026-11-20",
    stages: [
      {
        stageNumber: 1,
        id: "lead",
        status: "completed",
        startDate: "2026-10-15",
        completionDate: "2026-10-15",
        referenceDoc: "Lead ID: LEAD-2026-SLM-088",
        remarks: "Customer walk-in converted with EB consumer #04-201-002-884."
      },
      {
        stageNumber: 2,
        id: "site_survey",
        status: "completed",
        startDate: "2026-10-16",
        completionDate: "2026-10-17",
        referenceDoc: "Survey Dossier: SRV-2026-0042",
        remarks: "4 mandatory photos verified. 12° optimal South-facing orientation approved."
      },
      {
        stageNumber: 3,
        id: "proposal",
        status: "completed",
        startDate: "2026-10-18",
        completionDate: "2026-10-19",
        referenceDoc: "Proposal #NIRT-PROP-2026-0042-R2",
        remarks: "50 kWp commercial proposal with 92x TOPCon panels and Growatt inverter accepted."
      },
      {
        stageNumber: 4,
        id: "customer_confirmation",
        status: "completed",
        startDate: "2026-10-20",
        completionDate: "2026-10-21",
        referenceDoc: "Work Order #WO-SLM-2026-0042",
        remarks: "Signed customer agreement registered and Project ID NIRT-26-0042 initialized."
      },
      {
        stageNumber: 5,
        id: "advance_payment",
        status: "completed",
        startDate: "2026-10-22",
        completionDate: "2026-10-23",
        referenceDoc: "UTR: HDFC20261022987102",
        remarks: "₹20,00,000 (80% advance payment) cleared in HDFC escrow account."
      },
      {
        stageNumber: 6,
        id: "documentation",
        status: "completed",
        startDate: "2026-10-24",
        completionDate: "2026-10-25",
        referenceDoc: "Document Locker (10/10 Verified)",
        remarks: "Aadhaar, EB card, property title, and notarized net-metering affidavit locked."
      },
      {
        stageNumber: 7,
        id: "discom_application",
        status: "completed",
        startDate: "2026-10-26",
        completionDate: "2026-10-27",
        referenceDoc: "DISCOM App #TNEB-SLM-2026-9941",
        remarks: "Submitted to TANGEDCO Salem South Division. Statutory fee ₹5,000 paid."
      },
      {
        stageNumber: 8,
        id: "technical_feasibility",
        status: "completed",
        startDate: "2026-10-28",
        completionDate: "2026-10-30",
        referenceDoc: "Sanction #TNEB-FS-2026-SLM-0814",
        remarks: "250 kVA DT-04 has 82 kW available quota. 50 kW capacity approved without LT augmentation."
      },
      {
        stageNumber: 9,
        id: "procurement",
        status: "completed",
        startDate: "2026-10-30",
        completionDate: "2026-11-01",
        referenceDoc: "PO #NIRT-PO-2026-0042",
        remarks: "All 12 material categories received via GRN and kitted in Salem Central Warehouse."
      },
      {
        stageNumber: 10,
        id: "installation",
        status: "in_progress",
        startDate: "2026-11-01",
        completionDate: null,
        referenceDoc: "Gate Pass #GP-SLM-2026-0042-01",
        remarks: "Civil, MMS, PV array, and cabling complete (92% progress). Pre-commissioning testing ongoing."
      },
      {
        stageNumber: 11,
        id: "inspection_commissioning",
        status: "pending",
        startDate: null,
        completionDate: null,
        referenceDoc: "Target: 2026-11-10",
        remarks: "Inspection dossier prepared for DISCOM Assistant Executive Engineer (AEE)."
      },
      {
        stageNumber: 12,
        id: "net_metering",
        status: "pending",
        startDate: null,
        completionDate: null,
        referenceDoc: "Awaiting Meter Allotment",
        remarks: "Bi-directional L&T Net Meter requisition submitted to MRT division."
      },
      {
        stageNumber: 13,
        id: "final_payment",
        status: "pending",
        startDate: null,
        completionDate: null,
        referenceDoc: "Invoice #INV-2026-0042-F",
        remarks: "Balance ₹5,00,000 milestone invoice scheduled upon net metering energization."
      },
      {
        stageNumber: 14,
        id: "subsidy",
        status: "pending",
        startDate: null,
        completionDate: null,
        referenceDoc: "PM Surya Ghar Portal",
        remarks: "National Portal DBT application registered. Subsidy eligibility ₹78,000 confirmed."
      },
      {
        stageNumber: 15,
        id: "project_closure",
        status: "pending",
        startDate: null,
        completionDate: null,
        referenceDoc: "O&M Dossier & Warranty",
        remarks: "Customer handover ceremony and 5-year comprehensive O&M activation pending."
      }
    ]
  }
};
