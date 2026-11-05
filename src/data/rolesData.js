// NIRT Solar EPC - 9 Synchronized Roles, Stats, and Charts Data Model
// Extracted with 100% fidelity from NIRT_Solar_Standard_Process.pdf

export const ROLES_DEFINITIONS = [
  {
    id: "managing_director",
    shortCode: "MD",
    title: "Managing Director / Business Owner",
    department: "Executive Strategy & Project Governance",
    pipelineScope: "All 5 Pipelines (Master Oversight)",
    ownedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    badgeColor: "bg-blue-600/10 text-blue-700 border-blue-600/20",
    avatarBg: "from-blue-600 to-indigo-700",
    icon: "ShieldAlert",
    canViewAudit: true,
    stats: [
      { label: "Monthly Sales Booked", value: "₹48.2 Lakhs", change: "+12.4%", trend: "up", helper: "October Target Met" },
      { label: "Active Ongoing Sites", value: "42 Sites", change: "+5 sites", trend: "up", helper: "Across 6 districts" },
      { label: "Profit Margin Yield", value: "22.4 %", change: "+0.8%", trend: "up", helper: "Weighted average" },
      { label: "Cash Stuck in Field", value: "₹0.00", change: "Zero Overdue", trend: "neutral", helper: "Hard Gate Protected" }
    ],
    charts: {
      revenueMargin: {
        title: "Monthly Revenue & Margin Trend",
        type: "bar-line",
        months: [
          { month: "May", revenue: 32, margin: 21 },
          { month: "Jun", revenue: 36, margin: 22 },
          { month: "Jul", revenue: 41, margin: 22 },
          { month: "Aug", revenue: 44, margin: 23 },
          { month: "Oct", revenue: 48.2, margin: 22.4 }
        ]
      },
      customerCategory: {
        title: "Sales by Customer Category",
        type: "donut",
        segments: [
          { label: "Residential PM Surya Ghar", value: 62, color: "#3b82f6" },
          { label: "Commercial LT/HT", value: 28, color: "#8b5cf6" },
          { label: "Solar Water Pumps & Farms", value: 10, color: "#10b981" }
        ]
      },
      systemBalance: {
        title: "5-Pipeline System Balance",
        type: "stacked-bar",
        pipelines: [
          { code: "P1", name: "P1 Sales", count: 18, color: "#3b82f6" },
          { code: "P2", name: "P2 Approvals", count: 9, color: "#8b5cf6" },
          { code: "P3", name: "P3 Procurement", count: 6, color: "#10b981" },
          { code: "P4", name: "P4 Execution", count: 12, color: "#8b5cf6" },
          { code: "P5", name: "P5 Subsidy", count: 7, color: "#06b6d4" }
        ]
      }
    },
    operationalActions: [
      { id: "board_inspect", title: "Master 5-Pipeline Review", desc: "Track progress and stage clearances across all projects", step: "01-20" },
      { id: "discount_auth", title: "Step 05 Discount Authorization", desc: "Sign off commercial discounts >5% on C&I contracts", step: "05" },
      { id: "audit_oversight", title: "Audit Log Review", desc: "Review system edit records and update reasons", step: "ALL" }
    ]
  },
  {
    id: "sales_rep",
    shortCode: "SALES",
    title: "Field Sales Representative",
    department: "Customer Acquisition & Quotation Sizing",
    pipelineScope: "Pipeline 1: Sales & Feasibility",
    ownedSteps: [1, 2, 5, 6],
    badgeColor: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    avatarBg: "from-blue-500 to-indigo-600",
    icon: "Users",
    canViewAudit: false,
    stats: [
      { label: "New Leads Assigned", value: "28 Leads", change: "+8 this week", trend: "up", helper: "Deduplicated intake" },
      { label: "Surveys Booked", value: "8 Sites", change: "+3 today", trend: "up", helper: "Handoff to Survey Eng" },
      { label: "Unqualified / Dropped", value: "6 Inquiries", change: "21.4% Drop", trend: "down", helper: "Logged Cat D reasons" },
      { label: "Deals Won (80% Paid)", value: "₹64.5 Lakhs", change: "6 Closed", trend: "up", helper: "Work Orders Secured" }
    ],
    charts: {
      salesFunnel: {
        title: "Sales Funnel Progression",
        type: "funnel",
        steps: [
          { name: "Inquiries", count: 28, pct: 100 },
          { name: "Qualified", count: 22, pct: 78.5 },
          { name: "Survey Done", count: 14, pct: 50.0 },
          { name: "Quote Sent", count: 10, pct: 35.7 },
          { name: "Won / 80% Paid", count: 6, pct: 21.4 }
        ]
      },
      disqualificationAudit: {
        title: "Step 02 Disqualification Audit",
        type: "donut",
        segments: [
          { label: "No Property Title / NOC", value: 35, color: "#ef4444" },
          { label: "Structurally Unsafe Roof", value: 25, color: "#f97316" },
          { label: "Local Grid Transformer Saturated", value: 20, color: "#64748b" },
          { label: "Extreme Permanent Shadow", value: 20, color: "#a855f7" }
        ]
      },
      leadSources: {
        title: "Lead Source Performance",
        type: "horizontal-bar",
        sources: [
          { source: "WhatsApp Campaigns", value: 32 },
          { source: "Customer References", value: 28 },
          { source: "Direct Walk-ins", value: 22 },
          { source: "Electrical Contractors", value: 18 }
        ]
      }
    },
    operationalActions: [
      { id: "lead_inward", title: "Step 01: Lead Inward & Intake", desc: "Record customer, EB consumer number, circle with deduplication", step: "01" },
      { id: "lead_qualify", title: "Step 02: Lead Qualification", desc: "Assign Cat A/B/C or Drop Cat D with mandatory drop cause", step: "02" },
      { id: "quote_dispatch", title: "Step 05: Sizing & Quotation", desc: "Build equipment BOM, discount terms, and auto-generate PDF", step: "05" },
      { id: "order_confirm", title: "Step 06: Work Order Closing", desc: "Upload signed customer work order and spawn NIRT Project ID", step: "06" }
    ]
  },
  {
    id: "site_surveyor",
    shortCode: "SURVEY",
    title: "Site Survey Engineer",
    department: "Field Feasibility & Electrical Audit",
    pipelineScope: "Pipeline 1: Sales & Feasibility",
    ownedSteps: [3],
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    avatarBg: "from-emerald-500 to-teal-600",
    icon: "Compass",
    canViewAudit: false,
    stats: [
      { label: "Scheduled Surveys Today", value: "6 Sites", change: "Salem & Erode", trend: "neutral", helper: "Field Route Locked" },
      { label: "Surveys Completed MTD", value: "22 Sites", change: "+14 vs last mo", trend: "up", helper: "Full report approved" },
      { label: "Unfeasible / Rejected", value: "2 Sites", change: "8.3% fail", trend: "down", helper: "Heavy tree shading" },
      { label: "Avg Time per Survey", value: "2.4 Days", change: "Target < 3.0d", trend: "up", helper: "SLA Compliant" }
    ],
    charts: {
      roofDistribution: {
        title: "Roof & Ground Distribution",
        type: "donut",
        segments: [
          { label: "RCC Concrete Flat", value: 55, color: "#10b981" },
          { label: "Industrial Metal Shed", value: 25, color: "#3b82f6" },
          { label: "Farm Land / Ground", value: 10, color: "#06b6d4" },
          { label: "Elevated Superstructure", value: 10, color: "#8b5cf6" }
        ]
      },
      supplyPhase: {
        title: "Electrical Supply Phase",
        type: "bar",
        phases: [
          { phase: "Single-Phase LT", value: 50 },
          { phase: "Three-Phase LT", value: 40 },
          { phase: "High Tension (HT 11/22kV)", value: 10 }
        ]
      },
      feasibilityApproval: {
        title: "Feasibility Approval Ratio",
        type: "pie",
        ratios: [
          { label: "Feasible Approved", value: 91, color: "#10b981" },
          { label: "Load Enhancement Needed", value: 6, color: "#6366f1" },
          { label: "Structurally Rejected", value: 3, color: "#ef4444" }
        ]
      }
    },
    operationalActions: [
      { id: "audit_survey", title: "Step 03: Field Survey Report", desc: "Tape dims (L×W), shadow angle, AC/DC cable meters", step: "03" },
      { id: "photo_upload", title: "Step 03: 4 Mandatory Photos", desc: "Upload [1] Roof [2] EB Meter [3] Main DB [4] Inverter Wall", step: "03" },
      { id: "dpr_handoff", title: "Step 04: Engineering SLD Handoff", desc: "Submit verified measurements to CAD DPR Engineer", step: "04" }
    ]
  },
  {
    id: "warehouse_manager",
    shortCode: "STORE",
    title: "Purchase & Warehouse Manager",
    department: "Procurement, QC & Inventory Logistics",
    pipelineScope: "Pipeline 3: Procurement & Store",
    ownedSteps: [11, 12, 13],
    badgeColor: "bg-teal-500/10 text-teal-600 border-teal-500/20",
    avatarBg: "from-teal-500 to-cyan-600",
    icon: "Package",
    canViewAudit: false,
    stats: [
      { label: "Orders Ready to Pack", value: "5 Projects", change: "BOM Allocated", trend: "neutral", helper: "Advance 80% confirmed" },
      { label: "Solar Panels in Stock", value: "180 kW", change: "Min threshold: 50kW", trend: "up", helper: "Tier-1 Mono PERC" },
      { label: "Inverters in Stock", value: "14 Units", change: "Min: 5 units", trend: "up", helper: "Single & 3-Phase Growatt" },
      { label: "Advance 80% Verified", value: "100 %", change: "0 Unfunded", trend: "up", helper: "Zero unverified dispatches" }
    ],
    charts: {
      stockLevels: {
        title: "Warehouse Inventory Stock Level",
        type: "bar",
        inventory: [
          { item: "Mono PERC Panels (kW)", current: 180, min: 50 },
          { item: "String Inverters (Units)", current: 14, min: 5 },
          { item: "Solar DC Cable (100m)", current: 12, min: 4 },
          { item: "Module Mount Sets", current: 22, min: 10 }
        ]
      },
      dispatchTurnaround: {
        title: "Material Dispatch Turnaround",
        type: "donut",
        segments: [
          { label: "Same-Day Dispatch", value: 40, color: "#10b981" },
          { label: "Within 24 Hours", value: 50, color: "#3b82f6" },
          { label: "Within 48 Hours", value: 10, color: "#64748b" }
        ]
      },
      gatekeeperCheck: {
        title: "Step 07 Advance Gatekeeper Enforcement",
        type: "stat-bar",
        verified: 100,
        unfunded: 0,
        label: "100% Dispatched BOMs Verified with Accounts UTR"
      }
    },
    operationalActions: [
      { id: "po_issue", title: "Step 11: Vendor PO Issuance", desc: "Issue PO to Tier-1 suppliers after Step 07 Advance clearance", step: "11" },
      { id: "grn_inward", title: "Step 12: Warehouse QC & GRN", desc: "Verify deliveries, log serial numbers, generate project GRN", step: "12" },
      { id: "site_dispatch", title: "Step 13: Material Dispatch to Site", desc: "Kit full BOM, stamp Delivery Challan, record vehicle & driver", step: "13" }
    ]
  },
  {
    id: "epc_manager",
    shortCode: "EPC",
    title: "EPC Operations Manager",
    department: "Field Construction & Quality Assurance",
    pipelineScope: "Pipeline 4: EPC Site Execution",
    ownedSteps: [14, 15],
    badgeColor: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20",
    avatarBg: "from-indigo-500 to-purple-600",
    icon: "HardHat",
    canViewAudit: false,
    stats: [
      { label: "Active Work Sites", value: "12 Sites", change: "+3 this week", trend: "up", helper: "Salem, Namakkal, Erode" },
      { label: "Structure & Panels Done", value: "8 Sites", change: "Torque inspected", trend: "up", helper: "GI mounting certified" },
      { label: "Inverter Tested & Wired", value: "5 Sites", change: "Ready for 10%", trend: "neutral", helper: "Earth resistance signed" },
      { label: "Zero Site Accidents", value: "420 Days", change: "100% Safe", trend: "up", helper: "Zero safety incidents" }
    ],
    charts: {
      siteMilestones: {
        title: "Active Site Milestones",
        type: "funnel",
        steps: [
          { name: "Structure Erected", count: 12, pct: 100 },
          { name: "Panels Clamped", count: 10, pct: 83.3 },
          { name: "Inverter Wired", count: 8, pct: 66.7 },
          { name: "Tested & Earth Safe", count: 5, pct: 41.7 }
        ]
      },
      earthingResistance: {
        title: "Earthing Resistance Log (≤ 5 Ω)",
        type: "donut",
        segments: [
          { label: "Below 2 Ohms (Optimal)", value: 60, color: "#10b981" },
          { label: "2 to 4 Ohms (Normal)", value: 35, color: "#3b82f6" },
          { label: "4 to 5 Ohms (Acceptable)", value: 5, color: "#8b5cf6" },
          { label: "Above 5 Ohms (FAIL)", value: 0, color: "#ef4444" }
        ]
      },
      crewOutput: {
        title: "Weekly Site Crew Output",
        type: "bar",
        crews: [
          { team: "Team Alpha (Urban)", kw: 18 },
          { team: "Team Beta (Industrial)", kw: 15 },
          { team: "Team Gamma (Rural/Farm)", kw: 12 }
        ]
      }
    },
    operationalActions: [
      { id: "civil_mount", title: "Step 14: Civil Structure & Mounting", desc: "Log torque check Nm, tilt angle, upload 4 erection photos", step: "14" },
      { id: "elec_inverter", title: "Step 15: Electrical & Inverter Wiring", desc: "Verify earth resistance (<5 Ω), polarity, inverter LCD photo", step: "15" },
      { id: "install_trigger", title: "Step 16: Alert Accounts for 10%", desc: "Signal completion to Accounts to collect 10% On Installation", step: "16" }
    ]
  },
  {
    id: "liaison_officer",
    shortCode: "LIAISON",
    title: "TANGEDCO Liaison Officer",
    department: "Utility Approvals & Grid Synchronization",
    pipelineScope: "Pipeline 2 (Approvals) & Pipeline 4 (Sync)",
    ownedSteps: [8, 9, 10, 17],
    badgeColor: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    avatarBg: "from-purple-500 to-pink-600",
    icon: "Building2",
    canViewAudit: false,
    stats: [
      { label: "Applications Filed", value: "16 Sites", change: "Form 1 Portal", trend: "up", helper: "TANGEDCO online queue" },
      { label: "Feasibility Approved", value: "11 Sites", change: "+4 this week", trend: "up", helper: "Transformer quota cleared" },
      { label: "Meters for Install", value: "7 Sites", change: "AE Inspection sched.", trend: "neutral", helper: "Joint inspection set" },
      { label: "Avg Approval Time", value: "12.4 Days", change: "Target < 14d", trend: "up", helper: "Within SLA target" }
    ],
    charts: {
      utilityFunnel: {
        title: "TANGEDCO Utility Funnel",
        type: "funnel",
        steps: [
          { name: "Form 1 Submitted", count: 16, pct: 100 },
          { name: "Feasibility Approved", count: 11, pct: 68.7 },
          { name: "Meter Fee Paid", count: 9, pct: 56.2 },
          { name: "Meter Sync / Live", count: 7, pct: 43.7 }
        ]
      },
      officeSpeed: {
        title: "Approval Speed by Section Office",
        type: "bar",
        offices: [
          { name: "Section Office A", days: 10 },
          { name: "Section Office B", days: 12 },
          { name: "Section Office C", days: 14 },
          { name: "Section Office D", days: 13 }
        ]
      },
      meterReadiness: {
        title: "Bi-Directional Meter Readiness",
        type: "donut",
        segments: [
          { label: "Single-Phase Net Meters", value: 60, count: 12, color: "#8b5cf6" },
          { label: "Three-Phase Net Meters", value: 40, count: 8, color: "#06b6d4" }
        ]
      }
    },
    operationalActions: [
      { id: "kyc_locker", title: "Step 08: KYC Document Locker", desc: "Verify consumer number, Aadhaar, EB card, tax receipt", step: "08" },
      { id: "discom_filing", title: "Step 09: DISCOM Portal Filing", desc: "Submit Form 1 on TANGEDCO portal, log app ID & acknowledgment", step: "09" },
      { id: "grid_feasibility", title: "Step 10: Technical Feasibility", desc: "Obtain sanction reference number and upload official sanction letter", step: "10" },
      { id: "net_meter_sync", title: "Step 17: Net Metering Sync (JCR)", desc: "Witness meter sync, upload Joint Commissioning Report (Technical Closure)", step: "17" }
    ]
  },
  {
    id: "accounts_officer",
    shortCode: "ACCOUNTS",
    title: "Finance & Accounts Officer",
    department: "Commercial Gatekeeper & Milestone Billing",
    pipelineScope: "Commercial Gatekeeper (Pipelines 2, 4, 5)",
    ownedSteps: [7, 16, 18],
    badgeColor: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20",
    avatarBg: "from-emerald-600 to-green-700",
    icon: "IndianRupee",
    canViewAudit: false,
    stats: [
      { label: "Cash Collected MTD", value: "₹78.4 Lakhs", change: "100% Reconciled", trend: "up", helper: "Zero discrepancy" },
      { label: "80% Advances Cleared", value: "18 Projects", change: "+4 this week", trend: "up", helper: "Hard Gate Unlocked" },
      { label: "Overdue Balance", value: "₹0.00", change: "Zero Default", trend: "neutral", helper: "No cash stuck in field" },
      { label: "Tax GST Reconciled", value: "100 % Clean", change: "GSTR-1 Filed", trend: "up", helper: "All e-invoices generated" }
    ],
    charts: {
      cashInflowRatio: {
        title: "80 / 10 / 10 Cash Inflow Ratio",
        type: "donut",
        segments: [
          { label: "80% Upfront Advance", value: 78, color: "#10b981" },
          { label: "10% Assembly Balance", value: 12, color: "#3b82f6" },
          { label: "10% Net-Meter Final", value: 10, color: "#8b5cf6" }
        ]
      },
      paymentModes: {
        title: "Payment Mode Breakdown",
        type: "bar",
        modes: [
          { mode: "Bank NEFT / RTGS", value: 68 },
          { mode: "Digital UPI / QR", value: 22 },
          { mode: "Cheque Clearance", value: 10 }
        ]
      },
      receivablesAging: {
        title: "Customer Receivables Aging",
        type: "bar",
        brackets: [
          { bracket: "Current / Zero Balance", value: 96 },
          { bracket: "Under 7 Days Pending", value: 4 },
          { bracket: "Over 7 Days Past-Due", value: 0 }
        ]
      }
    },
    operationalActions: [
      { id: "advance_gate", title: "Step 07: 80% Advance Gatekeeper", desc: "Verify bank UTR, upload counterfoil, release hard procurement lock", step: "07" },
      { id: "install_gate", title: "Step 16: 10% On Installation Receipt", desc: "Log installation UTR and receipt slip (reaches 90% cumulative funds)", step: "16" },
      { id: "final_settlement", title: "Step 18: 10% Final Settlement (Balance = ₹0)", desc: "Issue Final Tax Invoice & Zero Balance voucher (Commercial Closure)", step: "18" }
    ]
  },
  {
    id: "subsidy_coordinator",
    shortCode: "SUBSIDY",
    title: "Central Subsidy Coordinator",
    department: "PM Surya Ghar Consumer DBT Administration",
    pipelineScope: "Pipeline 5: Closure & Subsidy",
    ownedSteps: [19, 20],
    badgeColor: "bg-cyan-500/10 text-cyan-600 border-cyan-500/20",
    avatarBg: "from-cyan-500 to-blue-600",
    icon: "BadgePercent",
    canViewAudit: false,
    stats: [
      { label: "National Portal Claims", value: "34 Claims", change: "PM Surya Ghar", trend: "up", helper: "Online consumer files" },
      { label: "Grants Approved / Paid", value: "26 Grants", change: "+6 this month", trend: "up", helper: "Beneficiary verified" },
      { label: "Subsidy Benefit Received", value: "₹19.8 Lakhs", change: "Direct to client", trend: "up", helper: "Direct Bank Transfer" },
      { label: "Avg Days to Bank Credit", value: "21.0 Days", change: "National SLA < 30d", trend: "up", helper: "Top 5% turnaround in TN" }
    ],
    charts: {
      claimsByTier: {
        title: "Subsidy Claims by Tier",
        type: "donut",
        segments: [
          { label: "1 kW (₹30,000 benefit)", value: 15, color: "#06b6d4" },
          { label: "2 kW (₹60,000 benefit)", value: 25, color: "#3b82f6" },
          { label: "3 kW+ (₹78,000 benefit)", value: 60, color: "#10b981" }
        ]
      },
      portalStageSpeed: {
        title: "National Portal Stage Speed",
        type: "funnel",
        steps: [
          { name: "Registered", count: 34, pct: 100 },
          { name: "Feasibility Cleared", count: 31, pct: 91.1 },
          { name: "JCR Uploaded", count: 28, pct: 82.3 },
          { name: "Subsidy Disbursed", count: 26, pct: 76.4 }
        ]
      },
      aadhaarVerification: {
        title: "Aadhaar Bank Link Verification",
        type: "pie",
        status: [
          { label: "Verified Bank Account", value: 97, color: "#10b981" },
          { label: "Correction / Re-upload Needed", value: 3, color: "#64748b" },
          { label: "Rejected", value: 0, color: "#ef4444" }
        ]
      }
    },
    operationalActions: [
      { id: "claim_submit", title: "Step 19: National Portal Claim Filing", desc: "Register consumer, upload JCR report, net-meter photo & inverter serial", step: "19" },
      { id: "dbt_verify", title: "Step 20: DBT Subsidy Credit Verification", desc: "Confirm central DBT transfer UTR into customer account statement", step: "20" }
    ]
  },
  {
    id: "project_coordinator",
    shortCode: "PMO",
    title: "Project Coordinator (Central PMO)",
    department: "Central Project Management Office (PMO)",
    pipelineScope: "Central Stage-Gate Governance (All 20 Steps)",
    ownedSteps: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
    badgeColor: "bg-rose-500/10 text-rose-600 border-rose-500/20",
    avatarBg: "from-rose-500 to-red-600",
    icon: "Activity",
    canViewAudit: true,
    stats: [
      { label: "On-Time Completion Rate", value: "96.2 %", change: "+1.8%", trend: "up", helper: "Within SLA targets" },
      { label: "Sites Delayed / Stuck", value: "0 Sites", change: "Zero Red Alerts", trend: "neutral", helper: "No bottleneck bottlenecks" },
      { label: "Audit Log Events MTD", value: "184 Events", change: "System record", trend: "up", helper: "Zero Delete Compliant" },
      { label: "Customer Feedback Score", value: "4.9 / 5.0", change: "42 reviews", trend: "up", helper: "Top rated solar EPC" }
    ],
    charts: {
      pipelineProjects: {
        title: "Projects Across 5 Pipelines",
        type: "horizontal-bar",
        pipelines: [
          { pipeline: "P1: Sales & Feasibility", count: 18, target: 20 },
          { pipeline: "P2: Advance & Approvals", count: 9, target: 10 },
          { pipeline: "P3: Procurement & Stores", count: 6, target: 8 },
          { pipeline: "P4: EPC Site Execution", count: 12, target: 15 },
          { pipeline: "P5: Closure & Subsidy", count: 7, target: 10 }
        ]
      },
      averageHandoverTime: {
        title: "Average Handover Time (TAT)",
        type: "bar",
        tats: [
          { stage: "Lead to Survey", days: 1.8, sla: 2.0 },
          { stage: "Survey to Quote", days: 1.0, sla: 1.0 },
          { stage: "Advance to Pack", days: 2.2, sla: 3.0 },
          { stage: "Install to Meter", days: 12.4, sla: 14.0 }
        ]
      },
      departmentalScore: {
        title: "Departmental On-Time Score",
        type: "scoreboard",
        departments: [
          { name: "Accounts Desk", score: 100, status: "Perfect" },
          { name: "Warehouse & Stores", score: 99, status: "Excellent" },
          { name: "Sales & BD", score: 98, status: "Optimal" },
          { name: "Site Survey", score: 96, status: "Optimal" },
          { name: "Site EPC Crew", score: 95, status: "Good" },
          { name: "TANGEDCO Liaison", score: 92, status: "Normal" }
        ]
      }
    },
    operationalActions: [
      { id: "sla_oversight", title: "Cross-Department SLA Tracking", desc: "Verify handoff timelines: Sales->Survey <24h, Acc->Stores <24h", step: "01-20" },
      { id: "triple_closure", title: "Step 20: Triple Project Closure Sign-off", desc: "Validate Technical (17) + Commercial (18) + Subsidy (20) Closures", step: "20" },
      { id: "audit_ledger", title: "Audit Log Review", desc: "Review all user edits, original vs new values and update reasons", step: "ALL" }
    ]
  }
];

export const INITIAL_SYSTEM_AUDIT_LOG = [
  {
    id: "AUD-9081",
    timestamp: "05 Nov 2026, 14:12 IST",
    staffName: "P. Karthik",
    role: "Field Sales Representative",
    projectId: "NIRT-2610-0042",
    clientName: "Sri Vignesh Textiles",
    step: "Step 01: Lead Inward",
    field: "Sanctioned Load (kW)",
    oldValue: "15 kW",
    newValue: "25 kW",
    reason: "Customer verified latest 3-phase LT electricity card; revised from 15 to 25 kW."
  },
  {
    id: "AUD-9080",
    timestamp: "05 Nov 2026, 11:45 IST",
    staffName: "M. Saravanan",
    role: "Finance & Accounts Officer",
    projectId: "NIRT-2610-0038",
    clientName: "Dr. K. Arulmani",
    step: "Step 07: 80% Advance",
    field: "Bank UTR Number",
    oldValue: "ICIC26104491910",
    newValue: "ICIC26104491911",
    reason: "Typo in the final digit of the NEFT bank confirmation advice slip."
  },
  {
    id: "AUD-9079",
    timestamp: "04 Nov 2026, 16:30 IST",
    staffName: "R. Venkatesh",
    role: "EPC Operations Manager",
    projectId: "NIRT-2610-0035",
    clientName: "Salem Cold Storage",
    step: "Step 15: Electrical Cabling",
    field: "Earth Pit Resistance",
    oldValue: "2.8 Ohms",
    newValue: "1.4 Ohms",
    reason: "Second chemical earth pit added in parallel to reach optimal < 2 Ohms reading."
  },
  {
    id: "AUD-9078",
    timestamp: "04 Nov 2026, 09:20 IST",
    staffName: "S. Priya",
    role: "Central Subsidy Coordinator",
    projectId: "NIRT-2610-0029",
    clientName: "R. Meenakshi Sundaram",
    step: "Step 19: Subsidy Submission",
    field: "Bank IFSC Code",
    oldValue: "SBIN0001234",
    newValue: "SBIN0005678",
    reason: "Customer updated PM Surya Ghar Aadhaar-seeded primary account to main branch."
  }
];

export const INITIAL_FORENSIC_AUDIT_LOG = INITIAL_SYSTEM_AUDIT_LOG;
