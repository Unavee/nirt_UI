// NIRT Solar EPC - Canonical Operational Model
// Strictly Redesigned According to Client Spreadsheet Specification:
// NIRT RENEWABLE ENERGY PRIVATE LIMITED
// 1. Sales Pipeline (7 Open, 3 Closed)
// 2. Project Execution Pipeline (12 Open, 2 Closed)
// 3. Subsidy Flow Pipeline (3 Open, 1 Closed)
//
// Mandatory Fields & Uploads Strictly Derived from:
// Bigin Mandatory Fields Pipeline Recommendation.pdf

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
  // =========================================================================
  // 1. LEAD QUALIFICATION PIPELINE (SALES) - 7 OPEN STAGES, 3 CLOSED
  // =========================================================================
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
        description: "Capture new prospect with contact details, location, requirement type, and EB bill copy.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        checklist: [1],
        gateRule: "Customer Name, Mobile Number, Lead Source, Location, Requirement Type, and EB Bill Copy",
        formFields: [
          { id: "customerName", label: "Customer Name", type: "text", placeholder: "e.g. S. Murugesan", required: true },
          { id: "phone", label: "Mobile Number", type: "tel", placeholder: "e.g. 9842100411", required: true },
          {
            id: "leadSource",
            label: "Lead Source",
            type: "select",
            required: true,
            options: [
              "WhatsApp Campaign",
              "Customer Reference",
              "Direct Walk-in",
              "Electrical Contractor",
              "Digital / Social Media",
              "Local Print / Newspaper Ad",
              "Expo / Trade Fair",
              "Other Source"
            ]
          },
          { id: "location", label: "Location", type: "text", placeholder: "e.g. Salem West, Fairlands", required: true },
          {
            id: "requirementType",
            label: "Requirement Type",
            type: "select",
            required: true,
            options: ["Residential", "Commercial", "Industrial", "Agricultural"]
          }
        ],
        upload: "EB Bill Copy (PDF / Image)",
        uploadRequired: true,
        actionLabel: "Log & Advance Enquiry",
        nextStage: "sales_contacted"
      }),

      stage({
        id: "sales_contacted",
        number: 2,
        title: "Contacted",
        shortTitle: "Contacted",
        description: "First contact established; record discussion notes, preferred capacity and schedule follow-up.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 2,
        checklist: [1],
        gateRule: "Contact Status, Discussion Notes, Preferred Capacity, and Follow-up Date",
        formFields: [
          {
            id: "contactStatus",
            label: "Contact Status",
            type: "select",
            required: true,
            options: [
              "Interested - Qualify Now",
              "Interested - Follow Up Later",
              "Decision Pending with Family",
              "Not Interested",
              "Could Not Reach"
            ]
          },
          { id: "discussionNotes", label: "Discussion Notes", type: "textarea", placeholder: "e.g. Customer interested in 3kW residential rooftop under PM Surya Ghar. Prefers mono-PERC.", required: true },
          { id: "preferredCapacity", label: "Preferred Capacity (kW)", type: "number", placeholder: "e.g. 3.0", required: true },
          { id: "followUpDate", label: "Follow-up Date", type: "date", required: true }
        ],
        upload: "Call / WhatsApp Discussion Proof",
        actionLabel: "Save Contact Notes",
        nextStage: "sales_qualified"
      }),

      stage({
        id: "sales_qualified",
        number: 3,
        title: "Qualified",
        shortTitle: "Qualified",
        description: "Technical & financial pre-qualification: bill analysis, roof & connection viability, and budget intent.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 1,
        checklist: [2],
        gateRule: "Average Monthly EB Bill, Roof Type, Connection Type, Budget Interest, and Interested Capacity",
        formFields: [
          { id: "avgMonthlyEbBill", label: "Average Monthly EB Bill (₹)", type: "number", placeholder: "e.g. 3500", required: true },
          {
            id: "roofType",
            label: "Roof Type",
            type: "select",
            required: true,
            options: [
              "RCC Flat Concrete",
              "Industrial Metal Sheet",
              "Clay Tiled Roof",
              "Asbestos Sheet (Requires Framing)",
              "Elevated Superstructure (>7ft)"
            ]
          },
          {
            id: "connectionType",
            label: "Connection Type",
            type: "select",
            required: true,
            options: [
              "Single Phase (230V LT)",
              "Three Phase (415V LT)",
              "High Tension (HT 11kV/22kV)"
            ]
          },
          {
            id: "budgetInterest",
            label: "Budget Interest",
            type: "select",
            required: true,
            options: [
              "Self-Funded / Full Cash",
              "Bank Solar Loan / EMI",
              "PM Surya Ghar DBT Subsidy Dependent",
              "Commercial Split Milestone"
            ]
          },
          { id: "interestedCapacity", label: "Interested Capacity (kW)", type: "number", placeholder: "e.g. 5.0", required: true }
        ],
        actionLabel: "Qualify Lead",
        nextStage: "sales_site_visit_scheduled"
      }),

      stage({
        id: "sales_site_visit_scheduled",
        number: 4,
        title: "Site Visit Scheduled",
        shortTitle: "Site Visit Scheduled",
        description: "Schedule on-site solar engineering survey with designated field engineer, address and GPS pin.",
        owner: "Sales / Survey Coordinator",
        department: "Technical Field Survey",
        slaDays: 1,
        checklist: [3],
        gateRule: "Site Visit Date, Assigned Engineer, Site Address, and Google Location",
        formFields: [
          { id: "visitDate", label: "Site Visit Date & Time", type: "datetime-local", required: true },
          { id: "assignedEngineer", label: "Assigned Engineer", type: "text", placeholder: "e.g. M. Saravanan", required: true },
          { id: "siteAddress", label: "Site Address", type: "text", placeholder: "e.g. 14/2, Anna Nagar 2nd St, Salem", required: true },
          { id: "googleLocation", label: "Google Location (URL / GPS Pin)", type: "text", placeholder: "e.g. https://maps.app.goo.gl/xy94z or 11.6643, 78.1460", required: true }
        ],
        actionLabel: "Confirm Visit Schedule",
        nextStage: "sales_site_visit_completed"
      }),

      stage({
        id: "sales_site_visit_completed",
        number: 5,
        title: "Site Visit Completed",
        shortTitle: "Site Visit Completed",
        description: "Rooftop engineering assessment, shadow profiling, usable area and suggested solar plant capacity.",
        owner: "Site Surveyor / Design Engineer",
        department: "Technical Field Survey",
        slaDays: 3,
        checklist: [3, 4],
        gateRule: "Site Survey Report, Roof Photos, Shadow Analysis, Available Roof Area, and Suggested System Size",
        formFields: [
          {
            id: "shadowAnalysis",
            label: "Shadow Analysis",
            type: "select",
            required: true,
            options: [
              "Shadow-Free (100% Daylight Clearance)",
              "Minor Morning / Evening Parapet Shadow (<10%)",
              "Moderate Obstacles (Requires String Inverter Dual-MPPT)",
              "Severe Obstacles (>30% Shadow - Elevated Superstructure Required)"
            ]
          },
          { id: "availableRoofArea", label: "Available Roof Area (sq.ft)", type: "number", placeholder: "e.g. 500", required: true },
          { id: "suggestedSystemSize", label: "Suggested System Size (kW)", type: "number", placeholder: "e.g. 5.0", required: true }
        ],
        upload: "Site Survey Report + Roof Photos Bundle",
        uploadRequired: true,
        actionLabel: "Submit Survey & Sizing",
        nextStage: "sales_quotation_sent"
      }),

      stage({
        id: "sales_quotation_sent",
        number: 6,
        title: "Quotation Sent",
        shortTitle: "Quotation Sent",
        description: "Formal commercial proposal dispatched to customer with equipment BoM, cost, and savings calculation.",
        owner: "Sales Executive",
        department: "Sales & Business Development",
        slaDays: 2,
        checklist: [5],
        gateRule: "Quotation Number, Proposal PDF Attached, Final Capacity, Estimated Cost, and Expected Savings",
        formFields: [
          { id: "quotationNumber", label: "Quotation Number", type: "text", placeholder: "e.g. NIRT-QT-2026-0041", required: true },
          { id: "finalCapacity", label: "Final Capacity (kW)", type: "number", placeholder: "e.g. 5.0", required: true },
          { id: "estimatedCost", label: "Estimated Cost (₹)", type: "number", placeholder: "e.g. 260000", required: true },
          { id: "expectedSavings", label: "Expected Savings (₹/Year or Month)", type: "text", placeholder: "e.g. ₹42,000 / Year (350 Units / Month)", required: true }
        ],
        upload: "Proposal PDF Attached",
        uploadRequired: true,
        actionLabel: "Dispatch Quotation",
        nextStage: "sales_negotiation"
      }),

      stage({
        id: "sales_negotiation",
        number: 7,
        title: "Negotiation",
        shortTitle: "Negotiation",
        description: "Address customer feedback, competitive quotes, finalize revised price and target closing date.",
        owner: "Sales Executive / MD",
        department: "Sales & Business Development",
        slaDays: 5,
        checklist: [5, 6],
        gateRule: "Revised Price (if any), Customer Concerns, Competitor Details, and Expected Closing Date",
        formFields: [
          { id: "revisedPrice", label: "Revised Price (if any) (₹)", type: "number", placeholder: "e.g. 250000" },
          { id: "customerConcerns", label: "Customer Concerns", type: "textarea", placeholder: "e.g. Requested additional 5-year inverter warranty; asked about TANGEDCO net-meter timeline.", required: true },
          { id: "competitorDetails", label: "Competitor Details", type: "text", placeholder: "e.g. Local vendor quoted ₹2.3L with tier-2 polycrystalline panels", required: true },
          { id: "expectedClosingDate", label: "Expected Closing Date", type: "date", required: true }
        ],
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
        upload: "Signed Customer Work Order Copy",
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
        description: "Site or electrical infrastructure cannot support solar installation (structure weakness / heavy shade).",
        owner: "Site Surveyor / Technical",
        department: "Technical Field Survey",
        slaDays: 1,
        checklist: [2, 3],
        gateRule: "Technical unviability reason and shadow calculation recorded",
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
        outcome: "lost"
      })
    ]
  },

  // =========================================================================
  // 2. PROJECT EXECUTION PIPELINE - 12 OPEN STAGES, 2 CLOSED
  // =========================================================================
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
        description: "Awaiting customer advance payment; lock final agreed amount, milestone payment terms, and approval.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 3,
        checklist: [7],
        gateRule: "Final Agreed Amount, Payment Terms, and Customer Approval Status",
        formFields: [
          { id: "finalAgreedAmount", label: "Final Agreed Amount (₹)", type: "number", placeholder: "e.g. 260000", required: true },
          {
            id: "paymentTerms",
            label: "Payment Terms",
            type: "select",
            required: true,
            options: [
              "Standard 80% Advance + 10% On Install + 10% Final",
              "Commercial 70% Advance + 20% Install + 10% Net-Meter",
              "100% Upfront Advance",
              "Custom Approved Milestone Terms"
            ]
          },
          {
            id: "customerApprovalStatus",
            label: "Customer Approval Status",
            type: "select",
            required: true,
            options: [
              "Customer Approved & Signed",
              "Approved via WhatsApp / Email Confirmation",
              "Awaiting Final Customer Stamp"
            ]
          }
        ],
        actionLabel: "Confirm Payment Terms",
        isHardGate: true,
        nextStage: "exec_advance_received"
      }),

      stage({
        id: "exec_advance_received",
        number: 2,
        title: "Advance Received",
        shortTitle: "Advance Received",
        description: "Verify advance credit into NIRT bank account with payment mode, date, UTR, and receipt upload.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 1,
        checklist: [7],
        gateRule: "Advance Amount Received, Payment Date, Payment Mode, and Receipt Uploaded",
        formFields: [
          { id: "advanceAmountReceived", label: "Advance Amount Received (₹)", type: "number", placeholder: "e.g. 208000", required: true },
          { id: "paymentDate", label: "Payment Date", type: "date", required: true },
          {
            id: "paymentMode",
            label: "Payment Mode",
            type: "select",
            required: true,
            options: [
              "NEFT / RTGS Bank Transfer",
              "Digital UPI / Net Banking",
              "Account Payee Cheque",
              "Demand Draft"
            ]
          },
          { id: "bankUtr", label: "Bank UTR / Transaction Reference #", type: "text", placeholder: "e.g. ICIC26110599182", required: true }
        ],
        upload: "Advance Payment Receipt / Bank Counterfoil",
        uploadRequired: true,
        actionLabel: "Verify Advance & Release Lock",
        isHardGate: true,
        nextStage: "exec_loan_processing"
      }),

      stage({
        id: "exec_loan_processing",
        number: 3,
        title: "Loan Processing",
        shortTitle: "Loan Processing",
        description: "Facilitate rooftop solar collateral-free bank loan under PM Surya Ghar / nationalized banking desks.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 5,
        checklist: [7],
        gateRule: "Loan Provider, Loan Status, Loan Application Number, and Expected Approval Date",
        formFields: [
          {
            id: "loanProvider",
            label: "Loan Provider",
            type: "select",
            required: true,
            options: [
              "SBI Surya Ghar Solar Loan",
              "Canara Bank Green Energy Loan",
              "Union Bank of India Solar Rooftop",
              "Tata Capital Green Clean Loan",
              "Credit Fair / NBFC Fintech",
              "Self-Financed / Not Applicable (Cash Project)",
              "Other Bank / Institution"
            ]
          },
          {
            id: "loanStatus",
            label: "Loan Status",
            type: "select",
            required: true,
            options: [
              "Application Submitted to Bank",
              "Under Scrutiny / Field Verification",
              "Loan Sanctioned / Inward Ready",
              "Disbursed Directly to NIRT Account",
              "Self-Financed / N/A",
              "Rejected / Replaced by Cash"
            ]
          },
          { id: "loanAppNumber", label: "Loan Application Number", type: "text", placeholder: "e.g. SBI-PMSG-2026-9901 (or N/A for cash)", required: true },
          { id: "expectedApprovalDate", label: "Expected Approval Date", type: "date", required: true }
        ],
        actionLabel: "Update Loan Status",
        nextStage: "exec_registration"
      }),

      stage({
        id: "exec_registration",
        number: 4,
        title: "Registration",
        shortTitle: "Registration",
        description: "Assemble mandatory consumer KYC documentation and property title proofs for DISCOM registration.",
        owner: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [8],
        gateRule: "Aadhaar Copy, PAN Copy, EB Card, Bank Passbook, and Property Proof Uploaded",
        formFields: [
          { id: "ebConsumerNo", label: "TANGEDCO EB Consumer #", type: "text", placeholder: "e.g. 04-123-004-981", required: true },
          {
            id: "aadhaarStatus",
            label: "Aadhaar Copy Status",
            type: "select",
            required: true,
            options: ["Aadhaar Copy Verified", "Pending Re-scan"]
          },
          {
            id: "panStatus",
            label: "PAN Copy Status",
            type: "select",
            required: true,
            options: ["PAN Copy Verified", "Pending"]
          },
          {
            id: "ebCardStatus",
            label: "EB Card Status",
            type: "select",
            required: true,
            options: ["EB White Card / Online Bill Verified", "Pending"]
          },
          {
            id: "bankPassbookStatus",
            label: "Bank Passbook Status",
            type: "select",
            required: true,
            options: ["Bank Passbook / Cancelled Cheque Verified", "Pending"]
          },
          {
            id: "propertyProofStatus",
            label: "Property Proof Uploaded",
            type: "select",
            required: true,
            options: ["Property Tax Receipt Uploaded", "Sale Deed / Patta Copy Uploaded", "Pending"]
          }
        ],
        upload: "Registration Documents Bundle (Aadhaar, PAN, EB Card, Passbook, Property Proof)",
        uploadRequired: true,
        actionLabel: "Complete KYC Registration",
        isHardGate: true,
        nextStage: "exec_material_planning"
      }),

      stage({
        id: "exec_material_planning",
        number: 5,
        title: "Material Planning",
        shortTitle: "Material Planning",
        description: "Release factory purchase orders, verify warehouse inventory, assign installation crew, and confirm funds.",
        owner: "Procurement / Store",
        department: "Supply Chain & Warehouse",
        slaDays: 5,
        checklist: [11, 12],
        gateRule: "BOM Finalized, Material Availability Status, Installation Team Assigned, and Partial Payment Received",
        formFields: [
          {
            id: "bomFinalized",
            label: "BOM Finalized",
            type: "select",
            required: true,
            options: [
              "Yes - BOM Finalized & Approved",
              "Under Revision for Specific Inverter",
              "Pending Structure Engineering Approval"
            ]
          },
          {
            id: "materialAvailabilityStatus",
            label: "Material Availability Status",
            type: "select",
            required: true,
            options: [
              "All Materials in Stock (Ready to Kit)",
              "Tier-1 Modules in Transit from Factory",
              "Inverter Awaiting Dispatch from OEM",
              "HDGI Structure Fabricated & Staged"
            ]
          },
          { id: "installationTeamAssigned", label: "Installation Team Assigned", type: "text", placeholder: "e.g. K. Murugan Civil & Electrical Team", required: true },
          { id: "partialPaymentReceived", label: "Partial Payment Received (₹)", type: "number", placeholder: "e.g. 208000", required: true }
        ],
        upload: "Approved Project BOM Sheet (PDF / Excel)",
        uploadRequired: true,
        actionLabel: "Finalize Material & Stage Kit",
        requiresAdvance: true,
        nextStage: "exec_material_dispatched"
      }),

      stage({
        id: "exec_material_dispatched",
        number: 6,
        title: "Material Dispatched",
        shortTitle: "Material Dispatched",
        description: "Dispatch complete solar BoM kit to customer rooftop site with transport details and verified packing list.",
        owner: "Store / Logistics",
        department: "Warehouse & Logistics",
        slaDays: 2,
        checklist: [13],
        gateRule: "Dispatch Date, Transport Details, and Material Checklist Confirmed",
        formFields: [
          { id: "dispatchDate", label: "Dispatch Date", type: "date", required: true },
          { id: "transportDetails", label: "Transport Details (Vehicle #, Driver Name, Phone & Carrier)", type: "text", placeholder: "e.g. TN 30 AX 4410 (Driver: R. Kumar - 9443100220)", required: true },
          {
            id: "materialChecklistConfirmed",
            label: "Material Checklist Confirmed",
            type: "select",
            required: true,
            options: [
              "100% Complete BOM Kit Verified & Stamped",
              "Partial Dispatch Approved by PMO",
              "Material Discrepancy Found (Holding Dispatch)"
            ]
          }
        ],
        upload: "Stamped Delivery Challan / E-Way Bill",
        uploadRequired: true,
        actionLabel: "Confirm Site Dispatch",
        requiresAdvance: true,
        nextStage: "exec_installation_in_progress"
      }),

      stage({
        id: "exec_installation_in_progress",
        number: 7,
        title: "Installation In Progress",
        shortTitle: "Installation In Progress",
        description: "Rooftop mechanical structure mounting, module clamping, inverter wiring, and earth pit construction.",
        owner: "EPC Site Engineer",
        department: "Field Construction Ops",
        slaDays: 7,
        checklist: [14, 15],
        gateRule: "Installation Start Date, Team Assigned, Daily Progress Notes, and Partial Payment Received",
        formFields: [
          { id: "installationStartDate", label: "Installation Start Date", type: "date", required: true },
          { id: "teamAssigned", label: "Team Assigned", type: "text", placeholder: "e.g. Erode Site Gang 2 (Lead: P. Ramesh)", required: true },
          { id: "dailyProgressNotes", label: "Daily Progress Notes", type: "textarea", placeholder: "e.g. HDGI structure bolted, 10 modules clamped at 12° tilt, 2 chemical earth pits bored.", required: true },
          { id: "partialPaymentReceived", label: "Partial Payment Received (₹)", type: "number", placeholder: "e.g. 208000", required: true }
        ],
        upload: "Site Erection Photos (Structure, Modules, Earth Pit)",
        actionLabel: "Log Daily Progress",
        nextStage: "exec_installation_completed"
      }),

      stage({
        id: "exec_installation_completed",
        number: 8,
        title: "Installation Completed",
        shortTitle: "Installation Completed",
        description: "Mechanical & electrical works completed; obtain customer sign-off and completion photo portfolio.",
        owner: "EPC Site Engineer",
        department: "Field Construction Ops",
        slaDays: 3,
        checklist: [15, 16],
        gateRule: "Completion Photos, Installation Completion Date, and Customer Sign-off",
        formFields: [
          { id: "installationCompletionDate", label: "Installation Completion Date", type: "date", required: true },
          { id: "completionNotes", label: "Completion Notes", type: "textarea", placeholder: "e.g. String Voc/Isc tested, inverter wired to ACDB, earth resistance measured at 1.8 Ohms.", required: true }
        ],
        upload: "Completion Photos & Customer Sign-off Document",
        uploadRequired: true,
        actionLabel: "Submit Completion Sign-off",
        isHardGate: true,
        nextStage: "exec_eb_application_submitted"
      }),

      stage({
        id: "exec_eb_application_submitted",
        number: 9,
        title: "EB Application Submitted",
        shortTitle: "EB App Submitted",
        description: "Submit formal net-meter installation and safety inspection docket on TANGEDCO portal.",
        owner: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [17],
        gateRule: "EB Application Number, Submission Date, and Required Documents Uploaded",
        formFields: [
          { id: "ebApplicationNumber", label: "EB Application Number", type: "text", placeholder: "e.g. TNEB-NM-2026-4410", required: true },
          { id: "submissionDate", label: "Submission Date", type: "date", required: true },
          {
            id: "requiredDocumentsUploaded",
            label: "Required Documents Uploaded",
            type: "select",
            required: true,
            options: [
              "All Required Documents Uploaded to Portal",
              "Sanction Letter Awaiting Acknowledgment Slip",
              "Discrepancy Clarification Resubmitted"
            ]
          }
        ],
        upload: "EB Online Application Acknowledgment PDF",
        uploadRequired: true,
        actionLabel: "Log EB Application",
        nextStage: "exec_eb_inspection_pending"
      }),

      stage({
        id: "exec_eb_inspection_pending",
        number: 10,
        title: "EB Inspection Pending",
        shortTitle: "EB Inspection Pending",
        description: "Coordinate official TANGEDCO / CEIG field engineer visit for earth resistance test and meter release.",
        owner: "Liaison Officer",
        department: "DISCOM Liaison",
        slaDays: 5,
        checklist: [17],
        gateRule: "Inspection Date, Inspector Details, and Pending Corrections",
        formFields: [
          { id: "inspectionDate", label: "Inspection Date", type: "date", required: true },
          { id: "inspectorDetails", label: "Inspector Details (Name, Designation, Section Office)", type: "text", placeholder: "e.g. Er. K. Srinivasan, AE / O&M Salem West", required: true },
          { id: "pendingCorrections", label: "Pending Corrections", type: "text", placeholder: "e.g. None (Inspection Cleared) or Inverter danger tag required", required: true }
        ],
        upload: "Official EB Inspection Report / Defect Clearance Slip",
        actionLabel: "Record Inspection Status",
        nextStage: "exec_system_activated"
      }),

      stage({
        id: "exec_system_activated",
        number: 11,
        title: "System Activated",
        shortTitle: "System Activated",
        description: "Bi-directional net meter installed, anti-islanding validated, system synchronized and customer trained.",
        owner: "Liaison / EPC",
        department: "DISCOM Liaison",
        slaDays: 3,
        checklist: [17],
        gateRule: "Net Meter Installed, Activation Date, Initial Generation Reading, and Customer Training Completed",
        formFields: [
          {
            id: "netMeterInstalled",
            label: "Net Meter Installed",
            type: "select",
            required: true,
            options: [
              "Yes - Bi-directional Meter Installed & Sealed",
              "Meter Dropped Awaiting Final Test",
              "Pending Sync Slip"
            ]
          },
          { id: "netMeterSerial", label: "Net Meter Serial Number", type: "text", placeholder: "e.g. TNEB-MTR-88910", required: true },
          { id: "activationDate", label: "Activation Date", type: "date", required: true },
          { id: "initialGenerationReading", label: "Initial Generation Reading (kWh)", type: "number", placeholder: "e.g. 14.5", required: true },
          {
            id: "customerTrainingCompleted",
            label: "Customer Training Completed",
            type: "select",
            required: true,
            options: [
              "Yes - Customer Trained on Inverter LCD & Mobile App",
              "Training Session Scheduled",
              "Customer Training Video Handed Over"
            ]
          }
        ],
        upload: "Joint Commissioning Report (JCR) + Net Meter Photo",
        uploadRequired: true,
        actionLabel: "Confirm Grid Activation",
        isClosure: true,
        nextStage: "exec_final_payment_pending"
      }),

      stage({
        id: "exec_final_payment_pending",
        number: 12,
        title: "Final Payment Pending",
        shortTitle: "Final Payment Pending",
        description: "Share final tax invoice, track remaining commercial milestone balance and schedule payment.",
        owner: "Accounts Executive",
        department: "Finance & Accounts",
        slaDays: 5,
        checklist: [18],
        gateRule: "Final Invoice Shared, Pending Amount, and Payment Follow-up Date",
        formFields: [
          {
            id: "finalInvoiceShared",
            label: "Final Invoice Shared",
            type: "select",
            required: true,
            options: [
              "Yes - Final Tax Invoice Dispatched to Customer",
              "Invoice Generated - Awaiting Bank Clearance",
              "Invoice Handed Over in Person"
            ]
          },
          { id: "finalInvoiceNumber", label: "Final Tax Invoice Number", type: "text", placeholder: "e.g. INV-2026-0041", required: true },
          { id: "pendingAmount", label: "Pending Amount (₹)", type: "number", placeholder: "e.g. 26000", required: true },
          { id: "paymentFollowUpDate", label: "Payment Follow-up Date", type: "date", required: true }
        ],
        upload: "Final Tax Invoice / Zero Balance Receipt Advice",
        uploadRequired: true,
        actionLabel: "Record Final Payment",
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

  // =========================================================================
  // 3. SUBSIDY FLOW PIPELINE - 3 OPEN STAGES, 1 CLOSED
  // =========================================================================
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
        gateRule: "Portal Application Number, Application Date, and Submitted By",
        formFields: [
          { id: "portalAppNumber", label: "Portal Application Number", type: "text", placeholder: "e.g. PMSG-TN-2026-9901", required: true },
          { id: "applicationDate", label: "Application Date", type: "date", required: true },
          { id: "submittedBy", label: "Submitted By", type: "text", placeholder: "e.g. NIRT Subsidy Desk / Saranya", required: true }
        ],
        upload: "PM Surya Ghar Claim Submission Acknowledgment Slip",
        uploadRequired: true,
        actionLabel: "Lodge Portal Claim",
        nextStage: "subsidy_under_verification"
      }),

      stage({
        id: "subsidy_under_verification",
        number: 2,
        title: "Under Verification",
        shortTitle: "Under Verification",
        description: "DISCOM and Central National Portal verification in progress; address field queries and remarks.",
        owner: "Subsidy Coordinator",
        department: "Government Subsidy Desk",
        slaDays: 14,
        checklist: [19],
        gateRule: "Verification Status, Remarks, and Pending Documents",
        formFields: [
          {
            id: "verificationStatus",
            label: "Verification Status",
            type: "select",
            required: true,
            options: [
              "Under Verification - Documents in Order",
              "Query Raised by DISCOM Inspector",
              "Bank Details / IFSC Re-verified",
              "Approved for DBT Release"
            ]
          },
          { id: "remarks", label: "Remarks", type: "textarea", placeholder: "e.g. JCR approved; bank account validated against PFMS portal.", required: true },
          { id: "pendingDocuments", label: "Pending Documents", type: "text", placeholder: "e.g. None (All verified) or Clarification on meter serial", required: true }
        ],
        actionLabel: "Update Verification Status",
        nextStage: "subsidy_approved"
      }),

      stage({
        id: "subsidy_approved",
        number: 3,
        title: "Subsidy Approved",
        shortTitle: "Subsidy Approved",
        description: "Central subsidy claim approved by Ministry / DISCOM; sanction order issued; awaiting PFMS DBT credit.",
        owner: "Subsidy Coordinator",
        department: "Government Subsidy Desk",
        slaDays: 7,
        checklist: [20],
        gateRule: "Approval Date, Approved Subsidy Amount, and Expected Credit Date",
        formFields: [
          { id: "approvalDate", label: "Approval Date", type: "date", required: true },
          { id: "approvedSubsidyAmount", label: "Approved Subsidy Amount (₹)", type: "number", placeholder: "e.g. 78000", required: true },
          { id: "expectedCreditDate", label: "Expected Credit Date", type: "date", required: true }
        ],
        upload: "Subsidy Approval / Sanction Order Letter",
        uploadRequired: true,
        actionLabel: "Record Subsidy Approval",
        nextStage: "subsidy_received"
      })
    ],
    closedStages: [
      stage({
        id: "subsidy_received",
        number: 4,
        title: "Subsidy Received",
        shortTitle: "Subsidy Received",
        description: "Direct Benefit Transfer (DBT) confirmed in customer bank account. 100% full project lifecycle completed.",
        owner: "Subsidy / Accounts",
        department: "Government Subsidy Desk",
        slaDays: 1,
        checklist: [20],
        gateRule: "DBT credit UTR and customer account credit confirmation",
        formFields: [
          { id: "dbtUtr", label: "DBT Transfer UTR / Reference #", type: "text", placeholder: "e.g. GOV-DBT-2611048821", required: true },
          { id: "creditDate", label: "DBT Credit Date", type: "date", required: true },
          { id: "creditedAmount", label: "Credited Amount (₹)", type: "number", placeholder: "e.g. 78000", required: true }
        ],
        upload: "Customer Bank Passbook Credit Statement Copy",
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
  return pipeline.closedStages.find((s) => s.outcome === outcome) || pipeline.closedStages[0] || null;
}

export function getStageForStep(stepNumber) {
  const num = parseInt(stepNumber, 10);
  if (!Number.isFinite(num)) return null;
  return ALL_STAGES.find((s) => s.checklist?.includes(num)) || null;
}
