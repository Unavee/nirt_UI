// NIRT Solar EPC - Canonical Operational Model
// Strictly Redesigned According to Client Spreadsheet Specification:
// NIRT RENEWABLE ENERGY PRIVATE LIMITED
// 1. Sales Pipeline (7 Open, 3 Closed)
// 2. Project Execution Pipeline (12 Open, 2 Closed)
// 3. Subsidy Flow Pipeline (3 Open, 1 Closed)

export const STEP_CHECKLIST = [
  { number: 1, id: "step_01", title: "Lead Inward & Intake", phase: "sales", owner: "Sales Executive", gate: "Deduplicated lead profile created" },
  { number: 2, id: "step_02", title: "Lead Qualification (Viability)", phase: "sales", owner: "Sales Executive", gate: "Viability category / drop reason recorded" },
  { number: 3, id: "step_03", title: "Site Survey & Feasibility Audit", phase: "sales", owner: "Site Surveyor", gate: "Survey report and 4 mandatory photos verified" },
  { number: 4, id: "step_04", title: "System Design & Engineering DPR", phase: "sales", owner: "Design Engineer", gate: "SLD and roof layout released" },
  { number: 5, id: "step_05", title: "Commercial Quotation Sizing", phase: "sales", owner: "Sales Executive", gate: "Formal quotation dispatched" },
  { number: 6, id: "step_06", title: "Customer Order Confirmation", phase: "sales", owner: "Sales / Customer", gate: "Signed work order and project ID generated" },
  { number: 7, id: "step_07", title: "80% Advance Receipt", phase: "execution", owner: "Accounts Executive", gate: "Bank UTR verified; procurement lock released" },
  { number: 8, id: "step_08", title: "Registration & KYC Assembly", phase: "execution", owner: "Liaison Officer", gate: "Complete KYC package assembled" },
  { number: 9, id: "step_09", title: "DISCOM Portal Filing", phase: "execution", owner: "Liaison Officer", gate: "Online application acknowledged" },
  { number: 10, id: "step_10", title: "Technical Feasibility Sanction", phase: "execution", owner: "Liaison / DISCOM", gate: "Grid feasibility sanctioned" },
  { number: 11, id: "step_11", title: "Vendor PO Issuance", phase: "execution", owner: "Procurement Executive", gate: "Factory PO released after advance" },
  { number: 12, id: "step_12", title: "Warehouse QC & GRN", phase: "execution", owner: "Store Executive", gate: "Materials QC passed and tagged to project" },
  { number: 13, id: "step_13", title: "Material Dispatch to Site", phase: "execution", owner: "Store / Logistics", gate: "Full BOM delivered to site" },
  { number: 14, id: "step_14", title: "Civil Structure & Module Mounting", phase: "execution", owner: "EPC Site Engineer", gate: "Mechanical structure signed off" },
  { number: 15, id: "step_15", title: "Electrical Cabling & Inverter Setup", phase: "execution", owner: "EPC Site Engineer", gate: "Electrical safety signed off" },
  { number: 16, id: "step_16", title: "10% On-Installation Receipt", phase: "execution", owner: "Accounts Executive", gate: "90% cumulative funds reconciled" },
  { number: 17, id: "step_17", title: "Net Meter Application, Inspection & Sync", phase: "execution", owner: "Liaison / DISCOM", gate: "Net meter installed and grid synchronised" },
  { number: 18, id: "step_18", title: "10% Final Balance Collection", phase: "execution", owner: "Accounts Executive", gate: "Customer balance is zero" },
  { number: 19, id: "step_19", title: "PM Surya Ghar Subsidy Submission", phase: "subsidy", owner: "Subsidy Desk", gate: "National portal claim lodged and verified" },
  { number: 20, id: "step_20", title: "DBT Credit & Formal Closure", phase: "subsidy", owner: "Central PMO", gate: "Subsidy credited and project closed" }
];

export const CHECKLIST_BY_NUMBER = Object.fromEntries(
  STEP_CHECKLIST.map((step) => [step.number, step])
);

const stage = ({
  id,
  number,
  title,
  shortTitle,
  description,
  owner,
  department,
  slaDays,
  checklist = [],
  gateRule,
  formStep = null,
  formFields = null,
  upload = null,
  uploadRequired = false,
  confirmOnly = false,
  actionLabel,
  isHardGate = false,
  isClosure = false,
  outcome = "open",
  requiresAdvance = false,
  nextStage = null,
  ownsPipeline = null
}) => ({
  id,
  number,
  title,
  shortTitle: shortTitle || title,
  description,
  responsibleRole: owner,
  department,
  slaDays,
  checklist,
  inputs: checklist.map((n) => CHECKLIST_BY_NUMBER[n]?.title).filter(Boolean),
  uploads: upload ? [upload] : [],
  gateRule,
  formStep,
  formFields,
  upload,
  uploadRequired,
  confirmOnly,
  actionLabel,
  isHardGate,
  isClosure,
  outcome,
  requiresAdvance,
  nextStage,
  ownsPipeline
});

export const PIPELINES = {
  sales: {
    id: "sales",
    code: "1",
    tabNumber: 1,
    title: "Sales Pipeline",
    titleLong: "1. Sales Pipeline",
    description: "New enquiry to deal confirmation. 7 open stages and 3 closed stages per client specification.",
    stepsRange: "Stages 01-07 · 3 Closed",
    color: "blue",
    openStagesLabel: "open stages (7)",
    closedStagesLabel: "closed stages (3)",
    stages: [
      stage({
        id: "sales_new_enquiry",
        number: 1,
        title: "New enquiry",
        shortTitle: "New enquiry",
        description: "Capture deduplicated lead with customer profile, phone, site address and EB connection details.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        checklist: [1],
        gateRule: "Customer name, phone, site address and EB consumer number captured",
        formStep: "01",
        upload: "Optional lead card / enquiry document",
        actionLabel: "Log Enquiry",
        nextStage: "sales_contacted"
      }),
      stage({
        id: "sales_contacted",
        number: 2,
        title: "Contacted",
        shortTitle: "Contacted",
        description: "First meaningful conversation completed; confirm customer intent, roof type and decision maker.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 2,
        checklist: [1],
        gateRule: "Contact outcome and next follow-up date recorded",
        formFields: [
          { id: "contactOutcome", label: "Contact Outcome", type: "select", options: ["Interested - qualify now", "Interested - follow up later", "Not interested", "Could not reach"] },
          { id: "contactPerson", label: "Decision Maker / Contact Person", type: "text", placeholder: "e.g. Owner / Plant Manager" },
          { id: "followUpDate", label: "Next Follow-up Date", type: "date" }
        ],
        upload: "Call note / WhatsApp enquiry screenshot",
        actionLabel: "Record Contact",
        nextStage: "sales_qualified"
      }),
      stage({
        id: "sales_qualified",
        number: 3,
        title: "Qualified",
        shortTitle: "Qualified",
        description: "Validate consumption, sanctioned load, roof viability and budget. Categorize into Cat A/B/C or reject.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        checklist: [2],
        gateRule: "Viability category A/B/C recorded or lead dropped with reason",
        formStep: "02",
        actionLabel: "Qualify Lead",
        nextStage: "sales_site_visit_scheduled"
      }),
      stage({
        id: "sales_site_visit_scheduled",
        number: 4,
        title: "Site Visit Scheduled",
        shortTitle: "Site Visit Scheduled",
        description: "Book rooftop engineering site survey with customer and assign qualified field surveyor.",
        owner: "Sales / Survey Coordinator",
        department: "Technical Field Survey",
        slaDays: 1,
        checklist: [3],
        gateRule: "Visit date, assigned surveyor and terrace access confirmed",
        formFields: [
          { id: "visitDate", label: "Site Visit Date & Time", type: "datetime-local" },
          { id: "surveyorName", label: "Assigned Surveyor", type: "text", placeholder: "e.g. M. Saravanan" },
          { id: "accessNotes", label: "Site Access / Safety Notes", type: "text", placeholder: "e.g. Staircase terrace access; 3-phase LT meter on GF" }
        ],
        upload: "Visit confirmation / customer WhatsApp acknowledgement",
        actionLabel: "Confirm Visit",
        nextStage: "sales_site_visit_completed"
      }),
      stage({
        id: "sales_site_visit_completed",
        number: 5,
        title: "Site Visit Completed",
        shortTitle: "Site Visit Completed",
        description: "Rooftop measurements, shadow analysis, 4 mandatory site photos and engineering SLD DPR completed.",
        owner: "Site Surveyor / Design Engineer",
        department: "Technical Field Survey",
        slaDays: 3,
        checklist: [3, 4],
        gateRule: "Survey report, 4 photos, SLD and roof layout verified",
        formStep: "03",
        upload: "Survey report + 4 mandatory site photos",
        uploadRequired: true,
        actionLabel: "Submit Survey & Design",
        nextStage: "sales_quotation_sent"
      }),
      stage({
        id: "sales_quotation_sent",
        number: 6,
        title: "Quotation Sent",
        shortTitle: "Quotation Sent",
        description: "Issue formal commercial proposal with BoM equipment, PM Surya Ghar subsidy estimate and payment terms.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 2,
        checklist: [5],
        gateRule: "Formal quotation PDF dispatched and customer logged",
        formStep: "05",
        upload: "Formal quotation PDF / customer delivery proof",
        actionLabel: "Send Quotation",
        nextStage: "sales_negotiation"
      }),
      stage({
        id: "sales_negotiation",
        number: 7,
        title: "Negotiation",
        shortTitle: "Negotiation",
        description: "Resolve commercial or technical objections, adjust payment slabs, and lock final contract terms.",
        owner: "Sales Executive / MD",
        department: "Sales & Business Development",
        slaDays: 5,
        checklist: [5, 6],
        gateRule: "Final contract value and payment terms approved",
        formStep: "05",
        upload: "Revised quotation / negotiation meeting minutes",
        actionLabel: "Lock Final Terms",
        nextStage: "sales_deal_confirmed"
      })
    ],
    closedStages: [
      stage({
        id: "sales_deal_confirmed",
        number: 8,
        title: "Deal Confirmed",
        shortTitle: "Deal Confirmed",
        description: "Work order signed by customer. Advance payment requested; project handed over to Project Execution Pipeline.",
        owner: "Sales / Central PMO",
        department: "Sales & Central PMO",
        slaDays: 1,
        checklist: [6],
        gateRule: "Signed work order and project ID generated",
        formStep: "06",
        upload: "Signed customer work order copy",
        uploadRequired: true,
        actionLabel: "Confirm Deal & Handover",
        outcome: "won",
        nextStage: "exec_advance_pending"
      }),
      stage({
        id: "sales_not_feasible",
        number: 9,
        title: "Not Feasible",
        shortTitle: "Not Feasible",
        description: "Site or grid conditions make the rooftop project technically unviable (insufficient area / transformer overload).",
        owner: "Site Surveyor / Technical",
        department: "Technical Field Survey",
        slaDays: 1,
        checklist: [2, 3],
        gateRule: "Technical unviability reason and shadow calculation recorded",
        formStep: "02",
        outcome: "lost"
      }),
      stage({
        id: "sales_lost",
        number: 10,
        title: "Lost",
        shortTitle: "Lost",
        description: "Customer declined, chose a competitor or cancelled the solar installation.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        checklist: [2],
        gateRule: "Mandatory loss reason and remarks recorded per governance",
        formStep: "02",
        outcome: "lost"
      })
    ]
  },

  execution: {
    id: "execution",
    code: "2",
    tabNumber: 2,
    title: "Project Execution Pipeline",
    titleLong: "2. Project Execution Pipeline",
    description: "From advance payment to final collection and system activation. 12 open stages and 2 closed stages per client specification.",
    stepsRange: "Stages 01-12 · 2 Closed",
    color: "indigo",
    openStagesLabel: "open stages (12)",
    closedStagesLabel: "closed stages (2)",
    stages: [
      stage({
        id: "exec_advance_pending",
        number: 1,
        title: "Advance Payment Pending",
        shortTitle: "Advance Pending",
        description: "Awaiting customer 80% advance payment. Procurement lock remains active until verified.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 3,
        checklist: [7],
        gateRule: "80% advance UTR verified by Accounts",
        formStep: "07",
        upload: "Bank credit counterfoil / receipt advice",
        uploadRequired: true,
        actionLabel: "Record 80% Advance",
        isHardGate: true,
        nextStage: "exec_advance_received"
      }),
      stage({
        id: "exec_advance_received",
        number: 2,
        title: "Advance Received",
        shortTitle: "Advance Received",
        description: "80% advance reconciled in bank. Tax receipt issued; unlocks loan processing and registration.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 1,
        checklist: [7],
        gateRule: "Advance reconciled and formal tax receipt issued",
        confirmOnly: true,
        actionLabel: "Confirm Advance Received",
        isHardGate: true,
        nextStage: "exec_loan_processing"
      }),
      stage({
        id: "exec_loan_processing",
        number: 3,
        title: "Loan Processing",
        shortTitle: "Loan Processing",
        description: "Solar bank / NBFC financing assistance or verification. Mark self-funded if customer pays directly.",
        owner: "Accounts / Customer",
        department: "Finance & Accounts",
        slaDays: 7,
        checklist: [8],
        gateRule: "Bank loan sanction letter received or marked self-funded",
        formFields: [
          { id: "loanRequired", label: "Financing Type", type: "select", options: ["Customer Direct / Self-Funded", "SBI / Nationalised Bank Solar Loan", "NBFC / Solar Fintech Partner"] },
          { id: "lenderName", label: "Bank / NBFC Name", type: "text", placeholder: "e.g. State Bank of India (Salem Town Branch)", optional: true },
          { id: "loanReference", label: "Loan Application / Sanction Ref", type: "text", placeholder: "e.g. SBI-SOLAR-2026-1182", optional: true },
          { id: "sanctionedLoanAmount", label: "Sanctioned Loan Amount (₹)", type: "number", placeholder: "e.g. 150000", optional: true }
        ],
        upload: "Bank loan sanction letter (if applicable)",
        actionLabel: "Save Loan Status",
        nextStage: "exec_registration"
      }),
      stage({
        id: "exec_registration",
        number: 4,
        title: "Registration",
        shortTitle: "Registration",
        description: "Customer KYC assembly and DISCOM / PM Surya Ghar portal consumer registration.",
        owner: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [8, 9, 10],
        gateRule: "Complete KYC package uploaded and portal registration completed",
        formStep: "08",
        formFields: [
          { id: "portalAppId", label: "TANGEDCO Portal Application ID", type: "text", placeholder: "e.g. TANGEDCO-2026-APP-4401" },
          { id: "submissionDate", label: "Application Submission Date", type: "date" },
          { id: "sanctionRefNo", label: "Feasibility Sanction Ref #", type: "text", placeholder: "e.g. TNEB/SE/FEAS/2026/8910" },
          { id: "sanctionedKw", label: "Sanctioned Solar Capacity (kW)", type: "number", placeholder: "e.g. 5" }
        ],
        upload: "KYC Package (Aadhaar, EB Bill, Cheque) + DISCOM Receipt",
        uploadRequired: true,
        actionLabel: "Complete Registration",
        isHardGate: true,
        nextStage: "exec_material_planning"
      }),
      stage({
        id: "exec_material_planning",
        number: 5,
        title: "Material Planning",
        shortTitle: "Material Planning",
        description: "Release Tier-1 factory purchase orders (modules, inverter, HDGI structure, DC cabling) and warehouse GRN.",
        owner: "Procurement / Store",
        department: "Supply Chain & Warehouse",
        slaDays: 5,
        checklist: [11, 12],
        gateRule: "PO released to vendors and materials received in warehouse with serial tags",
        formFields: [
          { id: "poNumber", label: "Purchase Order (PO) #", type: "text", placeholder: "e.g. NIRT-PO-2026-088" },
          { id: "vendorName", label: "Tier-1 Vendor / Manufacturer", type: "text", placeholder: "e.g. Waaree / Vikram Solar / Sungrow" },
          { id: "grnNumber", label: "Goods Receipt Note (GRN) #", type: "text", placeholder: "e.g. GRN-2026-0419" },
          { id: "serialNumbers", label: "Module & Inverter Serials", type: "text", placeholder: "e.g. MOD-8891001 to MOD-8891018, INV-SG-991" },
          { id: "qcStatus", label: "Warehouse QC Status", type: "select", options: ["QC Passed (Full BoM Staged)", "QC On Hold", "Defective Material Replaced"] }
        ],
        upload: "Vendor PO + QC pass sheet / delivery challan",
        uploadRequired: true,
        actionLabel: "Release PO & GRN",
        requiresAdvance: true,
        nextStage: "exec_material_dispatched"
      }),
      stage({
        id: "exec_material_dispatched",
        number: 6,
        title: "Material Dispatched",
        shortTitle: "Material Dispatched",
        description: "Dispatch complete BoM kit to customer rooftop site with stamped delivery challan and e-way bill.",
        owner: "Store / Logistics",
        department: "Warehouse & Logistics",
        slaDays: 2,
        checklist: [13],
        gateRule: "Full BoM delivered to site and receiver sign-off obtained",
        formStep: "13",
        upload: "Stamped site delivery challan / e-way bill",
        uploadRequired: true,
        actionLabel: "Confirm Site Delivery",
        requiresAdvance: true,
        nextStage: "exec_installation_in_progress"
      }),
      stage({
        id: "exec_installation_in_progress",
        number: 7,
        title: "Installation In Progress",
        shortTitle: "Installation In Progress",
        description: "Civil mounting structure erection, module clamping, inverter installation, and chemical earthing pits.",
        owner: "EPC Site Engineer",
        department: "Field Construction Ops",
        slaDays: 7,
        checklist: [14, 15],
        gateRule: "Mechanical clamping, DC string cabling, and earth resistance (< 5.0 Ω) signed off",
        formStep: "14",
        upload: "Structure photos + earth resistance test report (< 5.0 Ω)",
        uploadRequired: true,
        actionLabel: "Submit Installation Log",
        nextStage: "exec_installation_completed"
      }),
      stage({
        id: "exec_installation_completed",
        number: 8,
        title: "Installation Completed",
        shortTitle: "Installation Completed",
        description: "Installation complete and tested. Customer sign-off obtained; collect 10% on-installation milestone.",
        owner: "EPC / Accounts",
        department: "Field Construction Ops",
        slaDays: 3,
        checklist: [15, 16],
        gateRule: "Customer installation sign-off + 10% milestone collection",
        formStep: "16",
        upload: "Signed installation handover + bank credit advice",
        uploadRequired: true,
        actionLabel: "Complete Installation & Collect 10%",
        isHardGate: true,
        nextStage: "exec_eb_application_submitted"
      }),
      stage({
        id: "exec_eb_application_submitted",
        number: 9,
        title: "EB Application Submitted",
        shortTitle: "EB App Submitted",
        description: "Submit formal net-meter installation and safety inspection application to TANGEDCO / CEIG office.",
        owner: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [17],
        gateRule: "Bi-directional net-meter application acknowledgement received from EB",
        formFields: [
          { id: "netMeterAppNo", label: "TANGEDCO Net Meter App #", type: "text", placeholder: "e.g. TNEB-NM-2026-441" },
          { id: "submissionDate", label: "EB Filing Date", type: "date" },
          { id: "subDivisionOffice", label: "DISCOM Sub-Division Office", type: "text", placeholder: "e.g. Salem West Urban O&M" },
          { id: "feederName", label: "11kV Feeder Line Name", type: "text", placeholder: "e.g. Fairlands Feeder #2" }
        ],
        upload: "EB Application Acknowledgement Copy",
        uploadRequired: true,
        actionLabel: "Confirm EB Filing",
        nextStage: "exec_eb_inspection_pending"
      }),
      stage({
        id: "exec_eb_inspection_pending",
        number: 10,
        title: "EB Inspection Pending",
        shortTitle: "EB Inspection Pending",
        description: "TANGEDCO Assistant Engineer (AE) physical rooftop inspection, polarity test, and Joint Commissioning Report (JCR).",
        owner: "Liaison / DISCOM",
        department: "DISCOM Liaison",
        slaDays: 7,
        checklist: [17],
        gateRule: "Official DISCOM inspection cleared and JCR signed by EB AE",
        formFields: [
          { id: "inspectionDate", label: "Physical Inspection Date", type: "date" },
          { id: "inspectingOfficer", label: "Inspecting Officer Name & Designation", type: "text", placeholder: "e.g. Er. K. Ramesh (AE / O&M)" },
          { id: "jcrNumber", label: "Joint Commissioning Report (JCR) #", type: "text", placeholder: "e.g. JCR-SLM-2026-0088" },
          { id: "inspectionRemarks", label: "Inspection Status / Remarks", type: "select", options: ["Passed - Meter sanctioned", "Minor queries cleared on-site", "Re-inspection required"] }
        ],
        upload: "DISCOM Joint Commissioning Report (JCR) copy",
        uploadRequired: true,
        actionLabel: "Record Inspection Sign-off",
        nextStage: "exec_system_activated"
      }),
      stage({
        id: "exec_system_activated",
        number: 11,
        title: "System Activated",
        shortTitle: "System Activated",
        description: "Bi-directional net meter installed, anti-islanding tested, and rooftop solar plant synchronised to the grid.",
        owner: "Liaison / EPC",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [17],
        gateRule: "Bi-directional meter serial, initial reading and grid synchronisation date recorded",
        formStep: "17",
        upload: "Net-meter photo + signed synchronisation slip",
        uploadRequired: true,
        actionLabel: "Confirm Grid Synchronisation",
        isClosure: true,
        nextStage: "exec_final_payment_pending"
      }),
      stage({
        id: "exec_final_payment_pending",
        number: 12,
        title: "Final Payment Pending",
        shortTitle: "Final Payment Pending",
        description: "Collect final 10% balance payment and issue zero-balance tax invoice voucher to customer.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 5,
        checklist: [18],
        gateRule: "Customer balance is ₹0.00 and final tax invoice issued",
        formStep: "18",
        upload: "Final tax invoice + zero balance receipt voucher",
        uploadRequired: true,
        actionLabel: "Record Final Settlement",
        isHardGate: true,
        nextStage: "exec_project_completed"
      })
    ],
    closedStages: [
      stage({
        id: "exec_project_completed",
        number: 13,
        title: "Project Completed",
        shortTitle: "Project Completed",
        description: "Installation, grid synchronisation, and final commercial payment completed. Hand over to Subsidy Flow Pipeline.",
        owner: "Central PMO",
        department: "Central Project Management Office",
        slaDays: 1,
        checklist: [18, 19],
        gateRule: "Technical + commercial triple closure completed",
        confirmOnly: true,
        actionLabel: "Complete Project & Start Subsidy",
        isClosure: true,
        outcome: "won",
        nextStage: "subsidy_applied"
      }),
      stage({
        id: "exec_on_hold",
        number: 14,
        title: "On Hold",
        shortTitle: "On Hold",
        description: "Project temporarily paused due to customer terrace renovation, loan delay, or DISCOM grid upgrade.",
        owner: "Project Coordinator",
        department: "Central Project Management Office",
        slaDays: 0,
        checklist: [],
        gateRule: "Written reason and expected restart date recorded",
        confirmOnly: true,
        actionLabel: "Resume Project",
        outcome: "paused"
      })
    ]
  },

  subsidy: {
    id: "subsidy",
    code: "3",
    tabNumber: 3,
    title: "Subsidy Flow Pipeline",
    titleLong: "3. Subsidy Flow Pipeline",
    description: "PM Surya Ghar national portal claim processing, DISCOM verification and direct DBT disbursement to customer.",
    stepsRange: "Stages 01-03 · 1 Closed",
    color: "emerald",
    openStagesLabel: "open stages (3)",
    closedStagesLabel: "closed stages (1)",
    stages: [
      stage({
        id: "subsidy_applied",
        number: 1,
        title: "Subsidy Applied",
        shortTitle: "Subsidy Applied",
        description: "Lodge subsidy claim on PM Surya Ghar National Portal with JCR, meter photo, inverter serial and bank passbook.",
        owner: "Subsidy Coordinator",
        department: "Government Subsidy Desk",
        slaDays: 2,
        checklist: [19],
        gateRule: "National portal application reference # and acknowledgement receipt captured",
        formStep: "19",
        upload: "National Portal Claim Acknowledgement Receipt",
        uploadRequired: true,
        actionLabel: "Lodge Portal Claim",
        nextStage: "subsidy_under_verification"
      }),
      stage({
        id: "subsidy_under_verification",
        number: 2,
        title: "Under Verification",
        shortTitle: "Under Verification",
        description: "DISCOM / National Portal verification in progress. Track verification queries and resolve bank IFSC matches.",
        owner: "Subsidy Coordinator",
        department: "Government Subsidy Desk",
        slaDays: 14,
        checklist: [19],
        gateRule: "Verification status checked on portal and query log updated",
        formFields: [
          { id: "portalStatus", label: "Current Portal Status", type: "select", options: ["Under Verification - Documents in Order", "Query Raised by DISCOM", "Bank Details Re-verified", "Inspection Report Uploaded"] },
          { id: "verificationRef", label: "Portal Verification Ref #", type: "text", placeholder: "e.g. PMSG-TN-2026-VER-091" },
          { id: "lastCheckedDate", label: "Last Portal Check Date", type: "date" },
          { id: "verificationNotes", label: "Verification Field Notes", type: "text", placeholder: "e.g. JCR approved; bank PFMS validation complete" }
        ],
        actionLabel: "Update Verification Log",
        nextStage: "subsidy_approved"
      }),
      stage({
        id: "subsidy_approved",
        number: 3,
        title: "Subsidy Approved",
        shortTitle: "Subsidy Approved",
        description: "Central subsidy claim approved by Ministry / DISCOM. Sanction order issued; awaiting PFMS DBT credit.",
        owner: "Subsidy Coordinator",
        department: "Government Subsidy Desk",
        slaDays: 7,
        checklist: [19, 20],
        gateRule: "Sanction order reference and approved DBT amount (e.g. ₹78,000) recorded",
        formFields: [
          { id: "approvalRef", label: "Subsidy Sanction Order #", type: "text", placeholder: "e.g. PMSG-TN-2026-9901-APR" },
          { id: "approvedAmount", label: "Approved Subsidy Amount (₹)", type: "number", placeholder: "e.g. 78000" },
          { id: "approvalDate", label: "Sanction Date", type: "date" },
          { id: "expectedDbtDate", label: "Expected Direct Benefit Transfer (DBT) Date", type: "date" }
        ],
        upload: "Official Subsidy Sanction Order Copy",
        uploadRequired: true,
        actionLabel: "Record Sanction Order",
        nextStage: "subsidy_received"
      })
    ],
    closedStages: [
      stage({
        id: "subsidy_received",
        number: 4,
        title: "Subsidy Received",
        shortTitle: "Subsidy Received",
        description: "Direct Benefit Transfer (DBT) credited directly into customer bank account. Full project lifecycle complete.",
        owner: "Central PMO",
        department: "Central Project Management Office",
        slaDays: 1,
        checklist: [20],
        gateRule: "Government DBT UTR # verified and customer confirmation obtained",
        formStep: "20",
        upload: "Customer bank passbook statement / DBT credit SMS proof",
        uploadRequired: true,
        actionLabel: "Verify DBT Credit & Final Close",
        isClosure: true,
        outcome: "won"
      })
    ]
  }
};

export const PIPELINE_LIST = Object.values(PIPELINES);

// Backward-compatible Stage ID Aliases mapping older internal keys to client's exact stages
export const STAGE_ALIASES = {
  sales_deal_won: "sales_deal_confirmed",
  exec_registration_kyc: "exec_registration",
  exec_discom_feasibility: "exec_registration",
  exec_eb_application: "exec_eb_application_submitted",
  subsidy_documents_pending: "subsidy_applied",
  installation_progress: "exec_installation_in_progress",
  eb_inspection: "exec_eb_inspection_pending"
};

export const ALL_STAGES = PIPELINE_LIST.flatMap((pipeline) => [
  ...pipeline.stages.map((item) => ({ ...item, pipelineId: pipeline.id, pipelineTitle: pipeline.title, closed: false })),
  ...pipeline.closedStages.map((item) => ({ ...item, pipelineId: pipeline.id, pipelineTitle: pipeline.title, closed: true }))
]);

export const STAGE_BY_ID = Object.fromEntries(ALL_STAGES.map((item) => [item.id, item]));

export function getStageById(stageId) {
  if (!stageId) return null;
  const canonicalId = STAGE_ALIASES[stageId] || stageId;
  return STAGE_BY_ID[canonicalId] || STAGE_BY_ID[stageId] || null;
}

export function getPipelineForStage(stageId) {
  const canonicalId = STAGE_ALIASES[stageId] || stageId;
  const found = ALL_STAGES.find((item) => item.id === canonicalId || item.id === stageId);
  return found ? PIPELINES[found.pipelineId] : PIPELINES.sales;
}

export function getPipelineStage(stageId) {
  const canonicalId = STAGE_ALIASES[stageId] || stageId;
  const item = STAGE_BY_ID[canonicalId] || STAGE_BY_ID[stageId];
  if (!item) return null;
  const pipeline = PIPELINES[item.pipelineId];
  const index = pipeline.stages.findIndex((s) => s.id === item.id);
  return { ...item, index, total: pipeline.stages.length };
}

export function getNextStage(stageId) {
  const canonicalId = STAGE_ALIASES[stageId] || stageId;
  const item = STAGE_BY_ID[canonicalId] || STAGE_BY_ID[stageId];
  if (!item) return null;
  if (!item.nextStage) return null;
  const nextCanonical = STAGE_ALIASES[item.nextStage] || item.nextStage;
  return STAGE_BY_ID[nextCanonical] || STAGE_BY_ID[item.nextStage] || null;
}

export function getClosedStageForOutcome(pipelineId, outcome) {
  const pipeline = PIPELINES[pipelineId];
  if (!pipeline) return null;
  return pipeline.closedStages.find((s) => s.outcome === outcome) || null;
}

export function getStageForStep(stepNumber) {
  return ALL_STAGES.find((item) => item.checklist?.includes(Number(stepNumber))) || ALL_STAGES[0];
}

export function getPipelineStats(projectList) {
  const byPipeline = {};
  PIPELINE_LIST.forEach((pipeline) => {
    const openIds = new Set(pipeline.stages.map((s) => s.id));
    const closedIds = new Set(pipeline.closedStages.map((s) => s.id));
    const open = projectList.filter((p) => {
      const canonical = STAGE_ALIASES[p.stage] || p.stage;
      return openIds.has(canonical);
    });
    const closed = projectList.filter((p) => {
      const canonical = STAGE_ALIASES[p.stage] || p.stage;
      return closedIds.has(canonical);
    });
    byPipeline[pipeline.id] = {
      open: open.length,
      closed: closed.length,
      value: open.reduce((sum, p) => sum + (Number(p.valueNumeric) || 0), 0),
      openIds,
      closedIds
    };
  });
  return byPipeline;
}
