// Section 34: Enterprise Audit Trail & Governance Data
// Records the 7 mandatory BFRD parameters:
// 1. Who created the record
// 2. Who modified the record
// 3. What was modified
// 4. Date
// 5. Time
// 6. Previous value
// 7. New value
// + Audit justification / authorization reason

export const MASTER_AUDIT_LOGS = [
  {
    id: "AUD-2026-9045",
    projectId: "NIRT-26-0042",
    entityType: "Payment",
    entityName: "K. Sengottaiyan (Fairlands, Salem)",
    createdBy: {
      name: "Rajkumar S",
      role: "Sales Executive",
      date: "12 Oct 2026",
      time: "10:30 AM IST"
    },
    modifiedBy: {
      name: "A. Lakshmi",
      role: "Accounts & Commercial Finance",
      branch: "Salem (HQ)",
      device: "Edge 130 • Windows 11"
    },
    fieldModified: "80% Advance Receipt & Bank UTR Verification",
    date: "05 Nov 2026",
    time: "11:42:15 AM IST",
    previousValue: "Pending Verification (₹0.00 Received)",
    newValue: "Verified ₹1,50,000 via NEFT (UTR: ICIC0006119882)",
    reason: "Bank credit counterfoil verified against Salem Main Branch statement; released procurement gate lock."
  },
  {
    id: "AUD-2026-9044",
    projectId: "NIRT-26-0042",
    entityType: "Proposal",
    entityName: "K. Sengottaiyan (Fairlands, Salem)",
    createdBy: {
      name: "P. Vijayakumar",
      role: "Sales Lead",
      date: "12 Oct 2026",
      time: "10:30 AM IST"
    },
    modifiedBy: {
      name: "Er. A. Syed",
      role: "Super Admin / Technical Sales Lead",
      branch: "Salem (HQ)",
      device: "Chrome 131 • Windows 11"
    },
    fieldModified: "MMS Structure Type & Clearance Height",
    date: "02 Nov 2026",
    time: "03:15:20 PM IST",
    previousValue: "Flush HDGI Structure (0.3m Parapet Flush)",
    newValue: "Elevated HDGI (1.5m Terrace Utility Clearance)",
    reason: "Site survey shadow audit flagged parapet shadow on southern string; elevated structure authorized by client."
  },
  {
    id: "AUD-2026-9043",
    projectId: "NIRT-26-0042",
    entityType: "Proposal",
    entityName: "K. Sengottaiyan (Fairlands, Salem)",
    createdBy: {
      name: "P. Vijayakumar",
      role: "Sales Lead",
      date: "12 Oct 2026",
      time: "10:30 AM IST"
    },
    modifiedBy: {
      name: "Rajkumar S",
      role: "Sales Executive",
      branch: "Salem (HQ)",
      device: "Chrome Mobile • Android 14"
    },
    fieldModified: "Total Project Value (₹)",
    date: "02 Nov 2026",
    time: "03:18:45 PM IST",
    previousValue: "₹2,62,000 (v1.1 Standard BOM)",
    newValue: "₹2,75,396 (v1.2 Elevated TOPCon Specification)",
    reason: "Upgraded MMS BOM to 80-micron elevated hot-dip galvanized columns; applied authorized 3% goodwill rebate."
  },
  {
    id: "AUD-2026-9042",
    projectId: "NIRT-26-0043",
    entityType: "Project",
    entityName: "Sri Murugan Tex Processors (SIPCOT, Erode)",
    createdBy: {
      name: "P. Vignesh",
      role: "Sales Executive",
      date: "28 Sep 2026",
      time: "11:00 AM IST"
    },
    modifiedBy: {
      name: "V. Thangavel",
      role: "Liaison & Documentation Officer",
      branch: "Erode",
      device: "Chrome 131 • Windows 10"
    },
    fieldModified: "TANGEDCO Grid Feasibility Sanction #",
    date: "04 Nov 2026",
    time: "04:30:10 PM IST",
    previousValue: "Application Pending DISCOM Processing",
    newValue: "TANG/ERD/2026/0884 (Feasibility Sanctioned 25 kW)",
    reason: "Obtained formal grid synchronization sanction from Superintending Engineer, Erode Electricity Distribution Circle."
  },
  {
    id: "AUD-2026-9041",
    projectId: "NIRT-26-0044",
    entityType: "Lead",
    entityName: "P. Shanmugam (Paramathi Velur, Namakkal)",
    createdBy: {
      name: "K. Anitha",
      role: "CRM Executive",
      date: "01 Nov 2026",
      time: "09:45 AM IST"
    },
    modifiedBy: {
      name: "K. Murali",
      role: "Site Survey Engineer",
      branch: "Namakkal",
      device: "PWA Mobile • Android 14"
    },
    fieldModified: "Assessed Rooftop Usable Area & Feasibility",
    date: "03 Nov 2026",
    time: "01:20:00 PM IST",
    previousValue: "Estimated 250 Sq.ft (Self-Reported)",
    newValue: "Verified 410 Sq.ft Usable (RCC Flat Roof)",
    reason: "Completed physical tape dimensioning (12.2m x 3.1m); 4 mandatory geo-tagged photos uploaded."
  },
  {
    id: "AUD-2026-9040",
    projectId: "NIRT-EMP-005",
    entityType: "User",
    entityName: "Rajkumar S (Staff Account)",
    createdBy: {
      name: "Er. A. Syed",
      role: "Super Admin",
      date: "01 Jan 2026",
      time: "09:00 AM IST"
    },
    modifiedBy: {
      name: "Dr. G. Khaja Nazeemudin",
      role: "Management / Executive",
      branch: "Salem (HQ)",
      device: "Safari 18 • macOS Sonoma"
    },
    fieldModified: "Operational Pipeline Access Scope",
    date: "01 Nov 2026",
    time: "10:15:30 AM IST",
    previousValue: "Pipeline 1: Sales Only",
    newValue: "Pipeline 1: Sales & Pipeline 2: Approvals Access",
    reason: "Authorized cross-pipeline visibility for high-value industrial client negotiation and document collection."
  },
  {
    id: "AUD-2026-9039",
    projectId: "NIRT-26-0045",
    entityType: "Project",
    entityName: "V. Rajalakshmi (Hasthampatti, Salem)",
    createdBy: {
      name: "Rajkumar S",
      role: "Sales Executive",
      date: "04 Nov 2026",
      time: "02:10 PM IST"
    },
    modifiedBy: {
      name: "S. Karthik",
      role: "Project Manager (Central PMO)",
      branch: "Salem (HQ)",
      device: "Chrome 131 • Windows 11"
    },
    fieldModified: "Lead-to-Project Conversion & Stage Gate",
    date: "06 Nov 2026",
    time: "01:50:00 AM IST",
    previousValue: "Step 06: Customer Order Confirmation (Sales)",
    newValue: "Step 07: 80% Advance Receipt Gatekeeper (Approvals)",
    reason: "Section 9 Customer Confirmation completed. Signed work order WO-NIRT-2026-5528 filed; assigned PMO execution lead."
  },
  {
    id: "AUD-2026-9038",
    projectId: "TKT-2026-0081",
    entityType: "Service",
    entityName: "K. Sengottaiyan (Sungrow Inverter E014)",
    createdBy: {
      name: "K. Anitha",
      role: "CRM Executive",
      date: "05 Nov 2026",
      time: "09:15 AM IST"
    },
    modifiedBy: {
      name: "M. Saravanan",
      role: "EPC & O&M Field Lead",
      branch: "Salem (HQ)",
      device: "Field Mobile • Android 13"
    },
    fieldModified: "Service Ticket Stage & Grid Code Firmware",
    date: "05 Nov 2026",
    time: "03:40:22 PM IST",
    previousValue: "Stage 2: Technician Assignment",
    newValue: "Stage 3: Field Action in Progress",
    reason: "On-site multimeter diagnosis conducted. AC grid voltage measured at 248V; updated inverter CEA 2019 grid code settings."
  }
];
