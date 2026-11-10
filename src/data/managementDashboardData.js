// BFRD Section 26: Management Dashboard Data Store
// Defines authoritative management metrics across all 5 canonical pillars:
// 1. Lead Dashboard (Total, New, Qualified, Lost, Converted, Conversion %, Lead Sources)
// 2. Sales Dashboard (Proposals Issued, Accepted, Total Project Value, Advance Received, Pending Payments)
// 3. Project Dashboard (Total Projects, In Progress, Delayed, Completed, kW Under Execution, kW Commissioned)
// 4. Financial Dashboard (Total Project Value, Amount Received, Amount Outstanding, Overdue Amount, Subsidy Receivable, Subsidy Received)
// 5. Operations Dashboard (Awaiting Survey, Design, Procurement, Installation, Inspection, Net Metering)

export const MANAGEMENT_DASHBOARD_DATA = {
  // 1. LEAD DASHBOARD METRICS & SOURCES
  leadDashboard: {
    kpis: {
      totalLeads: 142,
      newLeads: 28,
      qualifiedLeads: 64,
      lostLeads: 18,
      convertedLeads: 48,
      conversionRate: 33.8, // 48 / 142
      avgQualificationDays: 1.8
    },
    leadSources: [
      { source: "PM Surya Ghar National Portal", count: 52, converted: 24, rate: 46.2, value: "₹1.12 Cr" },
      { source: "Direct Walk-in / Showroom (Salem HQ)", count: 34, converted: 12, rate: 35.3, value: "₹58.5 L" },
      { source: "Customer & Word-of-Mouth Referrals", count: 30, converted: 10, rate: 33.3, value: "₹49.2 L" },
      { source: "Social Media & Meta Solar Ads", count: 16, converted: 2, rate: 12.5, value: "₹14.8 L" },
      { source: "Field Awareness Expo / Rural Camps", count: 10, converted: 0, rate: 0.0, value: "₹0.0 L" }
    ],
    leadStagesFunnel: [
      { stage: "Total Inward Inquiries", count: 142, pct: 100 },
      { stage: "Consumer & Roof Qualified", count: 96, pct: 67.6 },
      { stage: "Site Survey Completed", count: 78, pct: 54.9 },
      { stage: "Engineering Proposal Issued", count: 74, pct: 52.1 },
      { stage: "Confirmed Customer Work Order", count: 48, pct: 33.8 }
    ]
  },

  // 2. SALES DASHBOARD METRICS & PIPELINE
  salesDashboard: {
    kpis: {
      proposalsIssued: 74,
      proposalsAccepted: 52,
      proposalsWinRate: 70.3,
      totalProjectValue: 24800000, // ₹2.48 Cr
      advanceReceived: 19200000, // ₹1.92 Cr (77.4%)
      pendingPayments: 5600000, // ₹56.0 L
      averageDealSize: 516666 // ₹5.16 L avg
    },
    monthlySalesTrend: [
      { month: "Jun", proposals: 8, accepted: 5, orderValue: 24.5 },
      { month: "Jul", proposals: 11, accepted: 7, orderValue: 33.8 },
      { month: "Aug", proposals: 14, accepted: 9, orderValue: 42.0 },
      { month: "Sep", proposals: 16, accepted: 12, orderValue: 56.4 },
      { month: "Oct", proposals: 12, accepted: 9, orderValue: 44.2 },
      { month: "Nov (MTD)", proposals: 13, accepted: 10, orderValue: 47.1 }
    ],
    salesRepLeaderboard: [
      { name: "S. Rajkumar", branch: "Salem HQ", dealsClosed: 21, bookedValue: "₹1.08 Cr", targetPct: 112 },
      { name: "K. Mohanraj", branch: "Namakkal", dealsClosed: 14, bookedValue: "₹72.4 L", targetPct: 98 },
      { name: "P. Vignesh", branch: "Erode", dealsClosed: 9, bookedValue: "₹46.2 L", targetPct: 88 },
      { name: "R. Suresh", branch: "Coimbatore", dealsClosed: 4, bookedValue: "₹21.0 L", targetPct: 75 }
    ]
  },

  // 3. PROJECT DASHBOARD METRICS & PORTFOLIO
  projectDashboard: {
    kpis: {
      totalProjects: 48,
      projectsInProgress: 26,
      projectsDelayed: 3,
      projectsCompleted: 19,
      capacityUnderExecutionKw: 185.5,
      capacityCommissionedKw: 312.0,
      totalCapacityPortfolioKw: 497.5,
      onTimeCompletionRate: 94.2
    },
    projectsByCircle: [
      { circle: "Salem (HQ)", active: 11, completed: 8, delayed: 1, capacityKw: 198.5 },
      { circle: "Namakkal", active: 6, completed: 5, delayed: 1, capacityKw: 124.0 },
      { circle: "Erode", active: 4, completed: 3, delayed: 0, capacityKw: 88.5 },
      { circle: "Coimbatore", active: 3, completed: 2, delayed: 1, capacityKw: 56.5 },
      { circle: "Dharmapuri", active: 2, completed: 1, delayed: 0, capacityKw: 30.0 }
    ],
    delayedProjectsList: [
      { id: "NIRT-26-0038", customer: "Dr. K. Arumugam", circle: "Salem", capacity: "10 kWp", stage: "DISCOM Sanction", delayDays: 6, reason: "AEE transfer at Salem West section" },
      { id: "NIRT-26-0035", customer: "S. Meenakshi", circle: "Namakkal", capacity: "5 kWp", stage: "Material Delivery", delayDays: 4, reason: "Transporter delay from Hosur depot" },
      { id: "NIRT-26-0029", customer: "G. Soundararajan", circle: "Coimbatore", capacity: "15 kWp", stage: "Net Metering", delayDays: 8, reason: "3-Phase bi-directional meter stock shortage" }
    ]
  },

  // 4. FINANCIAL DASHBOARD METRICS & CASHFLOW
  financialDashboard: {
    kpis: {
      totalProjectValue: 24800000, // ₹2.48 Cr
      amountReceived: 19200000, // ₹1.92 Cr
      amountOutstanding: 5600000, // ₹56.0 L
      overdueAmount: 420000, // ₹4.20 L
      subsidyReceivable: 3420000, // ₹34.2 L
      subsidyReceived: 2840000, // ₹28.4 L
      realizationRate: 77.4
    },
    paymentMilestoneBreakdown: [
      { milestone: "80% Advance at Confirmation", billed: "₹1.98 Cr", collected: "₹1.92 Cr", pending: "₹6.0 L", status: "Hard Lock" },
      { milestone: "10% Pre-Commissioning Interim", billed: "₹24.8 L", collected: "₹21.2 L", pending: "₹3.6 L", status: "On-Track" },
      { milestone: "10% Final Project Closure", billed: "₹24.8 L", collected: "₹18.4 L", pending: "₹6.4 L", status: "Due on Sync" },
      { milestone: "PM Surya Ghar DBT Subsidy", billed: "₹34.2 L", collected: "₹28.4 L", pending: "₹5.8 L", status: "Direct Bank Credit" }
    ],
    agingAnalysis: [
      { bucket: "0 - 15 Days", amount: "₹38.5 Lakhs", count: 18, color: "text-blue-700 bg-blue-50 border-blue-200" },
      { bucket: "16 - 30 Days", amount: "₹13.3 Lakhs", count: 6, color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
      { bucket: "31 - 45 Days", amount: "₹4.2 Lakhs", count: 2, color: "text-rose-700 bg-rose-50 border-rose-200" },
      { bucket: "> 45 Days", amount: "₹0.00", count: 0, color: "text-emerald-700 bg-emerald-50 border-emerald-200" }
    ]
  },

  // 5. OPERATIONS DASHBOARD METRICS & BOTTLENECK ANALYSIS
  operationsDashboard: {
    kpis: {
      awaitingSurvey: 4,
      awaitingDesign: 3,
      awaitingProcurement: 4,
      awaitingInstallation: 6,
      awaitingInspection: 3,
      awaitingNetMetering: 5,
      totalPendingWorkpackages: 25
    },
    bottleneckStages: [
      { stage: "Awaiting Site Survey", count: 4, sla: "48 Hours", owner: "K. Murali (Feasibility)", priority: "Medium", desc: "Qualified leads Cat A awaiting site dimensional survey & drone shadow audit." },
      { stage: "Awaiting Engineering Design", count: 3, sla: "24 Hours", owner: "R. Prakash (Design Desk)", priority: "Medium", desc: "Survey logs submitted; Single Line Diagram (SLD) & 3D PVsyst sizing in progress." },
      { stage: "Awaiting Procurement / PO", count: 4, sla: "48 Hours", owner: "R. Kannan (Procurement)", priority: "High", desc: "80% advance cleared; Purchase Orders pending release to Waaree & Deye distributors." },
      { stage: "Awaiting Installation & Erection", count: 6, sla: "5 Days", owner: "M. Saravanan (EPC Lead)", priority: "High", desc: "Materials staged at consumer terrace; installation team scheduled for mechanical erection." },
      { stage: "Awaiting CEIG / DISCOM Inspection", count: 3, sla: "7 Days", owner: "S. Priya (Liaisoning)", priority: "High", desc: "Installation completed; awaiting TANGEDCO AEE / CEIG safety inspection appointment." },
      { stage: "Awaiting Net Meter Synchronisation", count: 5, sla: "5 Days", owner: "S. Priya (Liaisoning)", priority: "High", desc: "Work completion report filed on portal; bi-directional meter testing & seal sync pending." }
    ]
  }
};
