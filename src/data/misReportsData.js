// BFRD Section 27: Management MIS Reports Data Store
// Defines all 22 statutory downloadable reports required by BFRD Pages 18–19.
// Supports Excel/CSV and PDF formatting across Sales, Projects, Finance, and Operations.

export const MIS_REPORT_CATEGORIES = [
  { id: "all", label: "All 22 Reports" },
  { id: "sales_lead", label: "Sales & Leads (1-6)" },
  { id: "project_exec", label: "Project Execution (7-10)" },
  { id: "supply_field", label: "Supply Chain & Site (11-15)" },
  { id: "finance_subsidy", label: "Finance & Subsidy (16-18)" },
  { id: "governance", label: "Governance & MIS (19-22)" }
];

export const STATUTORY_MIS_REPORTS = [
  // 1. Lead Report
  {
    id: "rep-01",
    num: 1,
    title: "Lead Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Daily Real-time",
    description: "Comprehensive registry of all customer inquiries, contact details, branch allocations, and sourcing channels.",
    recordsCount: 142,
    columns: ["Lead ID", "Consumer Name", "Phone", "Circle", "Source", "Date Received", "Status"],
    sampleRows: [
      ["NIRT-LD-26-0142", "K. R. Sundaram", "+91 94432 18920", "Salem HQ", "National Portal", "10 Oct 2026", "Converted"],
      ["NIRT-LD-26-0141", "Dr. K. Arumugam", "+91 98427 33410", "Salem", "Direct Walk-in", "11 Oct 2026", "Site Survey"],
      ["NIRT-LD-26-0140", "S. Meenakshi", "+91 97891 44520", "Namakkal", "Referral", "11 Oct 2026", "Proposal Sent"],
      ["NIRT-LD-26-0139", "G. Soundararajan", "+91 94421 88390", "Coimbatore", "National Portal", "12 Oct 2026", "Confirmed"],
      ["NIRT-LD-26-0138", "M. Palaniswamy", "+91 98422 11920", "Erode", "Field Campaign", "12 Oct 2026", "Qualified"]
    ]
  },
  // 2. Lead Conversion Report
  {
    id: "rep-02",
    num: 2,
    title: "Lead Conversion Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Weekly",
    description: "Funnel transition metrics from inquiry $\\to$ qualified $\\to$ survey $\\to$ proposal $\\to$ confirmed work order.",
    recordsCount: 48,
    columns: ["Source Channel", "Total Leads", "Qualified", "Proposals", "Won Orders", "Conversion %"],
    sampleRows: [
      ["PM Surya Ghar National Portal", "52", "42", "38", "24", "46.2%"],
      ["Direct Walk-in / Showroom", "34", "26", "20", "12", "35.3%"],
      ["Customer & Dealer Referrals", "30", "22", "18", "10", "33.3%"],
      ["Social Media & Web Inquiries", "16", "8", "6", "2", "12.5%"],
      ["Field Awareness Rural Camps", "10", "4", "2", "0", "0.0%"]
    ]
  },
  // 3. Sales Report
  {
    id: "rep-03",
    num: 3,
    title: "Sales Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Monthly / MTD",
    description: "Booked order values, capacity booked in kWp, salesperson quotas, and revenue realization by division.",
    recordsCount: 48,
    columns: ["Sales Executive", "Circle", "Deals Closed", "Capacity Booked", "Order Value", "Quota Achieved"],
    sampleRows: [
      ["S. Rajkumar", "Salem HQ", "21 Orders", "124.5 kWp", "₹1,08,50,000", "112%"],
      ["K. Mohanraj", "Namakkal", "14 Orders", "78.0 kWp", "₹72,40,000", "98%"],
      ["P. Vignesh", "Erode", "9 Orders", "52.5 kWp", "₹46,20,000", "88%"],
      ["R. Suresh", "Coimbatore", "4 Orders", "22.0 kWp", "₹21,00,000", "75%"]
    ]
  },
  // 4. Customer Report
  {
    id: "rep-04",
    num: 4,
    title: "Customer Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Monthly",
    description: "Central customer master roster: consumer numbers, tariff category, sanctioned load, and installed capacity.",
    recordsCount: 48,
    columns: ["Customer Code", "Consumer Name", "EB Service No", "Tariff", "Sanctioned Load", "Installed kWp"],
    sampleRows: [
      ["CUST-SLM-0089", "K. R. Sundaram", "04-219-002-1482", "LT Tariff 1A", "5 kW", "3.3 kWp"],
      ["CUST-SLM-0088", "Dr. K. Arumugam", "04-219-005-0912", "LT Tariff 2B", "15 kW", "10.0 kWp"],
      ["CUST-NMK-0042", "S. Meenakshi", "05-182-001-3819", "LT Tariff 1A", "6 kW", "5.0 kWp"],
      ["CUST-CBE-0027", "G. Soundararajan", "03-102-008-4102", "LT Tariff 3A", "20 kW", "15.0 kWp"]
    ]
  },
  // 5. Site Survey Report
  {
    id: "rep-05",
    num: 5,
    title: "Site Survey Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Weekly",
    description: "Roof technical audits, shadow analysis indices, parapet clearances, and structural feasibility approvals.",
    recordsCount: 78,
    columns: ["Survey ID", "Project ID", "Surveyor", "Roof Type", "Area (Sq Ft)", "Shading Index", "Feasibility"],
    sampleRows: [
      ["SRV-2026-0042", "NIRT-26-0042", "K. Murali", "RCC Flat Roof", "504 Sq Ft", "0.0% (Zero Shade)", "Approved Cat A"],
      ["SRV-2026-0041", "NIRT-26-0041", "K. Murali", "Metal Sheet Profile", "1,200 Sq Ft", "1.2% Partial", "Approved Cat A"],
      ["SRV-2026-0040", "NIRT-26-0040", "M. Saravanan", "Clay Tile Slope", "450 Sq Ft", "4.8% Tree Shade", "Approved Cat B"]
    ]
  },
  // 6. Proposal Report
  {
    id: "rep-06",
    num: 6,
    title: "Proposal Report",
    category: "sales_lead",
    categoryLabel: "Sales & Leads",
    frequency: "Weekly",
    description: "Issued commercial proposals, system sizing specifications, BOM costs, revisions history, and discount records.",
    recordsCount: 74,
    columns: ["Proposal Ref", "Customer Name", "Capacity", "Quoted Value", "Subsidy Benefit", "Version", "Status"],
    sampleRows: [
      ["PROP-2026-0042-v1.2", "K. R. Sundaram", "3.3 kWp", "₹2,15,000", "₹78,000 DBT", "v1.2", "Accepted"],
      ["PROP-2026-0041-v1.0", "Dr. K. Arumugam", "10.0 kWp", "₹5,40,000", "₹78,000 DBT", "v1.0", "Under Review"],
      ["PROP-2026-0040-v2.0", "S. Meenakshi", "5.0 kWp", "₹2,95,000", "₹78,000 DBT", "v2.0", "Accepted"]
    ]
  },
  // 7. Project Status Report
  {
    id: "rep-07",
    num: 7,
    title: "Project Status Report",
    category: "project_exec",
    categoryLabel: "Project Execution",
    frequency: "Real-time Daily",
    description: "Status snapshot of all active projects mapped across the canonical 15-stage project lifecycle pipeline.",
    recordsCount: 48,
    columns: ["Project ID", "Customer Name", "Circle", "Capacity", "Current Stage (1-15)", "Progress %", "Overall Status"],
    sampleRows: [
      ["NIRT-26-0042", "K. R. Sundaram", "Salem HQ", "3.3 kWp", "Stage 15: Subsidy Claim", "95%", "ACTIVE (Closure Gate)"],
      ["NIRT-26-0041", "Dr. K. Arumugam", "Salem", "10.0 kWp", "Stage 09: Procurement", "45%", "ACTIVE"],
      ["NIRT-26-0040", "S. Meenakshi", "Namakkal", "5.0 kWp", "Stage 11: Installation", "65%", "ACTIVE"],
      ["NIRT-26-0039", "G. Soundararajan", "Coimbatore", "15.0 kWp", "Stage 13: Net Metering", "80%", "ACTIVE"]
    ]
  },
  // 8. Project Delay Report
  {
    id: "rep-08",
    num: 8,
    title: "Project Delay Report",
    category: "project_exec",
    categoryLabel: "Project Execution",
    frequency: "Weekly Alert",
    description: "Identification of SLA breaches, bottlenecks, days delayed past baseline target, and responsible department.",
    recordsCount: 3,
    columns: ["Project ID", "Customer Name", "Bottleneck Stage", "Days Overdue", "Responsible Desk", "Root Cause"],
    sampleRows: [
      ["NIRT-26-0038", "Dr. K. Arumugam", "DISCOM Sanction", "6 Days Overdue", "Liaisoning Desk", "AEE transfer at Salem section"],
      ["NIRT-26-0035", "S. Meenakshi", "Material Delivery", "4 Days Overdue", "Store Logistics", "Transporter mechanical issue"],
      ["NIRT-26-0029", "G. Soundararajan", "Net Meter Sync", "8 Days Overdue", "DISCOM Meter Dept", "3-Phase bi-directional meter shortage"]
    ]
  },
  // 9. DISCOM Application Report
  {
    id: "rep-09",
    num: 9,
    title: "DISCOM Application Report",
    category: "project_exec",
    categoryLabel: "Project Execution",
    frequency: "Weekly",
    description: "Statutory tracking of TANGEDCO/TNEB portal applications, fee payments, and technical feasibility sanctions.",
    recordsCount: 38,
    columns: ["Application No", "Project ID", "Consumer No", "Section Office", "Applied kW", "Sanction Date", "Status"],
    sampleRows: [
      ["TN-SLM-2026-TF-0492", "NIRT-26-0042", "04-219-002-1482", "Salem West", "3.3 kW", "20 Oct 2026", "Sanction Issued"],
      ["TN-SLM-2026-TF-0488", "NIRT-26-0041", "04-219-005-0912", "Salem East", "10.0 kW", "22 Oct 2026", "Sanction Issued"],
      ["TN-NMK-2026-TF-0312", "NIRT-26-0040", "05-182-001-3819", "Namakkal Rural", "5.0 kW", "25 Oct 2026", "Processing"]
    ]
  },
  // 10. Technical Feasibility Report
  {
    id: "rep-10",
    num: 10,
    title: "Technical Feasibility Report",
    category: "project_exec",
    categoryLabel: "Project Execution",
    frequency: "Bi-Weekly",
    description: "Distribution transformer (DT) loading parameters, grid capacity headroom, and HT/LT connection approvals.",
    recordsCount: 38,
    columns: ["Feasibility Ref", "Project ID", "DT Code & Capacity", "DT Loading %", "Approved kW", "Inspector"],
    sampleRows: [
      ["TF-SLM-2026-0182", "NIRT-26-0042", "DT-SW-100kVA", "42.5% Load", "3.3 kW", "Er. K. Natarajan (AEE)"],
      ["TF-SLM-2026-0179", "NIRT-26-0041", "DT-SE-250kVA", "61.0% Load", "10.0 kW", "Er. M. Senthil (AEE)"],
      ["TF-NMK-2026-0145", "NIRT-26-0040", "DT-NR-160kVA", "54.2% Load", "5.0 kW", "Er. R. Govindaraj (AEE)"]
    ]
  },
  // 11. Procurement Report
  {
    id: "rep-11",
    num: 11,
    title: "Procurement Report",
    category: "supply_field",
    categoryLabel: "Supply Chain & Site",
    frequency: "Weekly",
    description: "Purchase Orders released to Tier-1 OEMs, module/inverter serial allocations, and lead time monitoring.",
    recordsCount: 42,
    columns: ["PO Number", "Project ID", "OEM Supplier", "Component Spec", "Quantity", "PO Value", "Status"],
    sampleRows: [
      ["PO-2026-0089", "NIRT-26-0042", "Waaree Energies", "550W Mono PERC Bifacial", "6 Nos", "₹59,400", "GRN Cleared"],
      ["PO-2026-0090", "NIRT-26-0042", "Deye Inverters", "3.3 kW Single Phase", "1 No", "₹38,500", "GRN Cleared"],
      ["PO-2026-0084", "NIRT-26-0041", "Waaree Energies", "550W Mono PERC Bifacial", "18 Nos", "₹1,78,200", "In Transit"]
    ]
  },
  // 12. Material Pending Report
  {
    id: "rep-12",
    num: 12,
    title: "Material Pending Report",
    category: "supply_field",
    categoryLabel: "Supply Chain & Site",
    frequency: "Daily / Real-time",
    description: "Store inventory deficits, unissued BoM line items, and consignment dispatch pendencies.",
    recordsCount: 4,
    columns: ["Project ID", "Consumer Name", "Pending Component", "Required Qty", "Store Location", "Hold Reason"],
    sampleRows: [
      ["NIRT-26-0041", "Dr. K. Arumugam", "DC Surge Protection Devices", "2 Nos", "Salem Central Store", "Supplier batch transit"],
      ["NIRT-26-0035", "S. Meenakshi", "Solar DC Cable 4 sq mm (Red)", "80 Mtr", "Namakkal Sub-Store", "Allocated from HQ"],
      ["NIRT-26-0029", "G. Soundararajan", "Polycarbonate Meter Box", "1 No", "Coimbatore Store", "PO released"]
    ]
  },
  // 13. Installation Report
  {
    id: "rep-13",
    num: 13,
    title: "Installation Report",
    category: "supply_field",
    categoryLabel: "Supply Chain & Site",
    frequency: "Weekly",
    description: "Mechanical structure erection, module clamping, inverter mounting, and DC/AC cable dressing milestones.",
    recordsCount: 32,
    columns: ["Install ID", "Project ID", "Technician Team", "Structure Tilt", "Array Voc", "Earth Pit Ω", "Status"],
    sampleRows: [
      ["INS-2026-0042", "NIRT-26-0042", "Team Alpha (M. Saravanan)", "12° South", "298.4 V", "2.14 Ω", "Complete 10/10"],
      ["INS-2026-0040", "NIRT-26-0040", "Team Beta (K. Murugesan)", "11° South", "302.1 V", "3.10 Ω", "Wiring In-Progress"],
      ["INS-2026-0037", "NIRT-26-0037", "Team Gamma (R. Selvam)", "12° South", "295.0 V", "2.80 Ω", "Complete 10/10"]
    ]
  },
  // 14. Inspection Report
  {
    id: "rep-14",
    num: 14,
    title: "Inspection Report",
    category: "supply_field",
    categoryLabel: "Supply Chain & Site",
    frequency: "Weekly",
    description: "TANGEDCO AEE and CEIG joint testing, anti-islanding trip confirmation (<0.20s), and Joint Commissioning Reports.",
    recordsCount: 28,
    columns: ["Report No", "Project ID", "Inspect Office", "Officer Name", "Anti-Island Trip", "Inspection Date", "Result"],
    sampleRows: [
      ["JCR-2026-0042", "NIRT-26-0042", "TANGEDCO Salem West", "Er. K. Natarajan", "0.18 Sec (< 0.20s)", "03 Nov 2026", "Passed ✓"],
      ["JCR-2026-0036", "NIRT-26-0036", "TANGEDCO Namakkal", "Er. R. Govindaraj", "0.19 Sec (< 0.20s)", "28 Oct 2026", "Passed ✓"],
      ["JCR-2026-0031", "NIRT-26-0031", "CEIG Coimbatore", "Er. S. Ramanathan", "0.17 Sec (< 0.20s)", "22 Oct 2026", "Passed ✓"]
    ]
  },
  // 15. Net Metering Report
  {
    id: "rep-15",
    num: 15,
    title: "Net Metering Report",
    category: "supply_field",
    categoryLabel: "Supply Chain & Site",
    frequency: "Weekly",
    description: "Bi-directional energy meter installation, serial numbers, seal numbers, and baseline import/export readings.",
    recordsCount: 26,
    columns: ["Meter Serial", "Project ID", "Meter Make & Class", "Baseline Export", "Seal 1 (Optical)", "Sync Date", "Format NM-1"],
    sampleRows: [
      ["24088192", "NIRT-26-0042", "L&T ER300P (Class 1.0)", "00000.0 kWh", "TNEB-SLM-9481", "04 Nov 2026", "Verified ✓"],
      ["24088188", "NIRT-26-0036", "Secure Premier 300", "00000.0 kWh", "TNEB-NMK-8821", "29 Oct 2026", "Verified ✓"],
      ["24088145", "NIRT-26-0031", "L&T ER300P (Class 0.5s)", "00000.0 kWh", "TNEB-CBE-7712", "23 Oct 2026", "Verified ✓"]
    ]
  },
  // 16. Payment Outstanding Report
  {
    id: "rep-16",
    num: 16,
    title: "Payment Outstanding Report",
    category: "finance_subsidy",
    categoryLabel: "Finance & Subsidy",
    frequency: "Weekly Accounts",
    description: "Accounts receivable aging schedule, pending customer milestone balances, and overdue reminder logs.",
    recordsCount: 14,
    columns: ["Project ID", "Customer Name", "Total Value", "Received", "Balance Due", "Due Date", "Aging Status"],
    sampleRows: [
      ["NIRT-26-0041", "Dr. K. Arumugam", "₹5,40,000", "₹4,32,000", "₹1,08,000", "15 Nov 2026", "Due on Erection"],
      ["NIRT-26-0040", "S. Meenakshi", "₹2,95,000", "₹2,36,000", "₹59,000", "18 Nov 2026", "Due on Sync"],
      ["NIRT-26-0038", "P. Somasundaram", "₹4,20,000", "₹3,36,000", "₹84,000", "02 Nov 2026", "Overdue 8 Days"],
      ["NIRT-26-0034", "R. Venkatachalam", "₹3,80,000", "₹3,04,000", "₹76,000", "01 Nov 2026", "Overdue 9 Days"]
    ]
  },
  // 17. Subsidy Report
  {
    id: "rep-17",
    num: 17,
    title: "Subsidy Report (PM Surya Ghar)",
    category: "finance_subsidy",
    categoryLabel: "Finance & Subsidy",
    frequency: "Weekly",
    description: "National Portal application numbers, Central Financial Assistance (CFA) amounts, PFMS status, and DBT credits.",
    recordsCount: 22,
    columns: ["App Reference", "Project ID", "Consumer Name", "CFA Amount", "PFMS Account", "Portal Stage", "DBT Credit Date"],
    sampleRows: [
      ["PMSGY-TN-2026-98214", "NIRT-26-0042", "K. R. Sundaram", "₹78,000", "SBI A/c ...4891", "Stage 6: Sanctioned", "10 Nov 2026 (Reflected)"],
      ["PMSGY-TN-2026-98188", "NIRT-26-0036", "M. Palaniswamy", "₹78,000", "IOB A/c ...3102", "Stage 7: Credited", "04 Nov 2026"],
      ["PMSGY-TN-2026-98142", "NIRT-26-0031", "G. Soundararajan", "₹78,000", "Canara A/c ...9921", "Stage 7: Credited", "29 Oct 2026"]
    ]
  },
  // 18. Project Closure Report
  {
    id: "rep-18",
    num: 18,
    title: "Project Closure Report",
    category: "finance_subsidy",
    categoryLabel: "Finance & Subsidy",
    frequency: "Monthly",
    description: "Audit trail of closed projects with 14/14 checklist verification, warranty package issuance, and customer CSAT.",
    recordsCount: 19,
    columns: ["Closure Cert ID", "Project ID", "Consumer Name", "Capacity", "Closure Date", "CSAT Rating", "Sign-Off Officer"],
    sampleRows: [
      ["NOC-2026-0042", "NIRT-26-0042", "K. R. Sundaram", "3.3 kWp", "09 Nov 2026", "5/5 Stars", "G. Venkatesh (PMO)"],
      ["NOC-2026-0036", "NIRT-26-0036", "M. Palaniswamy", "5.0 kWp", "01 Nov 2026", "5/5 Stars", "G. Venkatesh (PMO)"],
      ["NOC-2026-0031", "NIRT-26-0031", "G. Soundararajan", "15.0 kWp", "25 Oct 2026", "4.8/5 Stars", "G. Venkatesh (PMO)"]
    ]
  },
  // 19. Employee Performance Report
  {
    id: "rep-19",
    num: 19,
    title: "Employee Performance Report",
    category: "governance",
    categoryLabel: "Governance & MIS",
    frequency: "Monthly",
    description: "Employee activity responsibility matrix completion ratios, SLA adherence, and lead/project turnaround times.",
    recordsCount: 16,
    columns: ["Employee Name", "Role / Department", "Assigned Tasks", "Completed on Time", "SLA Adherence %", "Rating"],
    sampleRows: [
      ["S. Rajkumar", "Sales Manager", "42 Tasks", "39", "92.8%", "Exceeds Target (A+)"],
      ["K. Murali", "Feasibility Engineer", "38 Tasks", "36", "94.7%", "Exceeds Target (A+)"],
      ["M. Saravanan", "EPC Lead Technician", "56 Tasks", "54", "96.4%", "Outstanding (A+)"],
      ["S. Priya", "DISCOM Liaison Desk", "48 Tasks", "44", "91.6%", "Meets Target (A)"]
    ]
  },
  // 20. Customer Complaint Report
  {
    id: "rep-20",
    num: 20,
    title: "Customer Complaint Report",
    category: "governance",
    categoryLabel: "Governance & MIS",
    frequency: "Monthly",
    description: "Service tickets, inverter communication failures, generation drops, resolution turnaround times, and CSAT.",
    recordsCount: 8,
    columns: ["Ticket ID", "Project ID", "Category", "Reported Date", "Resolved Date", "Resolution Turnaround", "Status"],
    sampleRows: [
      ["TKT-2026-0091", "NIRT-26-0042", "Inverter WiFi Sync", "05 Nov 2026", "05 Nov 2026", "1.2 Hours", "Resolved ✓"],
      ["TKT-2026-0084", "NIRT-26-0033", "Generation Drop", "28 Oct 2026", "29 Oct 2026", "18.5 Hours", "Resolved ✓"],
      ["TKT-2026-0072", "NIRT-26-0028", "Earthing Check", "20 Oct 2026", "21 Oct 2026", "14.0 Hours", "Resolved ✓"]
    ]
  },
  // 21. Project-wise Profitability Report
  {
    id: "rep-21",
    num: 21,
    title: "Project-wise Profitability Report",
    category: "governance",
    categoryLabel: "Governance & MIS",
    frequency: "Monthly Financial",
    description: "Direct gross margin analysis per project (Contract Value minus BoM Cost, Civil/Electrical Labor, and Liaison Fees).",
    recordsCount: 19,
    columns: ["Project ID", "Capacity", "Contract Revenue", "Direct BoM Cost", "EPC Labor & Fees", "Gross Margin (₹)", "Margin %"],
    sampleRows: [
      ["NIRT-26-0042", "3.3 kWp", "₹2,15,000", "₹1,32,000", "₹28,500", "₹54,500", "25.3%"],
      ["NIRT-26-0036", "5.0 kWp", "₹2,95,000", "₹1,84,000", "₹36,000", "₹75,000", "25.4%"],
      ["NIRT-26-0031", "15.0 kWp", "₹8,40,000", "₹5,20,000", "₹92,000", "₹2,28,000", "27.1%"]
    ]
  },
  // 22. Monthly Management MIS
  {
    id: "rep-22",
    num: 22,
    title: "Monthly Management MIS",
    category: "governance",
    categoryLabel: "Governance & MIS",
    frequency: "Monthly Board Pack",
    description: "Consolidated executive governance packet summarizing business intake, collections, commissioned capacity, and EBITDA.",
    recordsCount: 12,
    columns: ["Month", "New Leads", "Order Book Value", "Cash Collected", "kWp Commissioned", "Gross Margin %", "Executive Status"],
    sampleRows: [
      ["Oct 2026", "48 Leads", "₹44.2 Lakhs", "₹42.8 Lakhs", "48.0 kWp", "25.8%", "Approved by Board"],
      ["Sep 2026", "56 Leads", "₹56.4 Lakhs", "₹51.2 Lakhs", "52.0 kWp", "26.1%", "Approved by Board"],
      ["Aug 2026", "44 Leads", "₹42.0 Lakhs", "₹38.5 Lakhs", "44.0 kWp", "25.2%", "Approved by Board"],
      ["Jul 2026", "41 Leads", "₹33.8 Lakhs", "₹31.0 Lakhs", "41.0 kWp", "24.8%", "Approved by Board"]
    ]
  }
];
