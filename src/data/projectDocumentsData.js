// Section 30: Document Management System Data
// All project documents stored under Project ID with 11 distinct operational categories:
// 1. Customer Documents
// 2. Technical Documents
// 3. Commercial Documents
// 4. DISCOM Documents
// 5. Procurement Documents
// 6. Installation Documents
// 7. Inspection Documents
// 8. Net Metering Documents
// 9. Payment Documents
// 10. Subsidy Documents
// 11. Closure Documents
// Includes full multi-version control (v1.0, v1.1, v1.2) for living engineering/commercial files.

export const DOCUMENT_CATEGORIES = [
  { id: "customer", label: "1. Customer Documents", icon: "User", desc: "Aadhaar card, PAN, electricity bill, property tax receipt" },
  { id: "technical", label: "2. Technical Documents", icon: "Cpu", desc: "Single Line Diagram (SLD), CAD layout, shadow analysis DPR" },
  { id: "commercial", label: "3. Commercial Documents", icon: "FileText", desc: "Signed proposal, customer work order, quotation revisions" },
  { id: "discom", label: "4. DISCOM Documents", icon: "Building", desc: "TANGEDCO application, registration receipt, feasibility sanction" },
  { id: "procurement", label: "5. Procurement Documents", icon: "ShoppingCart", desc: "Purchase requisitions, vendor POs, delivery challans, warranty bonds" },
  { id: "installation", label: "6. Installation Documents", icon: "Wrench", desc: "Civil base inspection, MMS torque check, cable routing sign-off" },
  { id: "inspection", label: "7. Inspection Documents", icon: "CheckSquare", desc: "Earthing pit test report (<5Ω), megger insulation report, safety audit" },
  { id: "net_metering", label: "8. Net Metering Documents", icon: "Scale", desc: "Bi-directional meter test slip, Joint Commissioning Report (JCR)" },
  { id: "payment", label: "9. Payment Documents", icon: "IndianRupee", desc: "80% advance NEFT receipt, dispatch payment advice, ledger reconciliation" },
  { id: "subsidy", label: "10. Subsidy Documents", icon: "ShieldCheck", desc: "PM Surya Ghar National Portal token, DBT bank claim acknowledgement" },
  { id: "closure", label: "11. Closure Documents", icon: "Award", desc: "Turnkey project completion certificate, customer handover sign-off" },
];

export const INITIAL_PROJECT_DOCUMENTS = [
  // 1. Customer Documents
  {
    id: "DOC-CUST-001",
    projectId: "NIRT-26-0042",
    category: "customer",
    categoryLabel: "Customer Documents",
    name: "Customer Aadhaar Card (Masked)",
    fileName: "Aadhaar_K_Sengottaiyan_masked.pdf",
    fileSize: "1.2 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "Rajkumar S (Sales)",
    date: "12 Oct 2026, 11:20 IST",
    sha256: "8f4a1c9e7b2d5f0a3c8e1d6b9f2a4e7c0d3b6f8a",
    versions: [
      { version: "v1.0", date: "12 Oct 2026, 11:20 IST", author: "Rajkumar S", reason: "Initial KYC document collection", size: "1.2 MB" }
    ]
  },
  {
    id: "DOC-CUST-002",
    projectId: "NIRT-26-0042",
    category: "customer",
    categoryLabel: "Customer Documents",
    name: "TANGEDCO Electricity Bills (Last 3 Months)",
    fileName: "EB_Bills_Aug_Sep_Oct_2026.pdf",
    fileSize: "3.4 MB",
    status: "Verified",
    version: "v1.1",
    hasVersions: true,
    uploadedBy: "Rajkumar S (Sales)",
    date: "14 Oct 2026, 15:40 IST",
    sha256: "2d7b4e9f1a0c8b3d6e5a2f8c0b1d4e7a9c3b5f8e",
    versions: [
      { version: "v1.1", date: "14 Oct 2026, 15:40 IST", author: "Rajkumar S", reason: "Updated with newly generated October bill showing 780 units", size: "3.4 MB" },
      { version: "v1.0", date: "12 Oct 2026, 11:25 IST", author: "Rajkumar S", reason: "Initial upload with August and September bills", size: "2.1 MB" }
    ]
  },
  {
    id: "DOC-CUST-003",
    projectId: "NIRT-26-0042",
    category: "customer",
    categoryLabel: "Customer Documents",
    name: "Property Tax Receipt (Salem Corporation)",
    fileName: "Corporation_Property_Tax_2026_27.pdf",
    fileSize: "1.8 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "Rajkumar S (Sales)",
    date: "13 Oct 2026, 10:15 IST",
    sha256: "5a2f8c0b1d4e7a9c3b5f8e2d7b4e9f1a0c8b3d6e",
    versions: [
      { version: "v1.0", date: "13 Oct 2026, 10:15 IST", author: "Rajkumar S", reason: "Verified property ownership of Fairlands terrace", size: "1.8 MB" }
    ]
  },

  // 2. Technical Documents (Version Controlled)
  {
    id: "DOC-TECH-001",
    projectId: "NIRT-26-0042",
    category: "technical",
    categoryLabel: "Technical Documents",
    name: "Single Line Diagram (SLD Drawing)",
    fileName: "NIRT_26_0042_SLD_Final.dwg.pdf",
    fileSize: "4.2 MB",
    status: "Verified",
    version: "v1.2",
    hasVersions: true,
    uploadedBy: "R. Prakash (Design Lead)",
    date: "02 Nov 2026, 14:15 IST",
    sha256: "e7c0d3b6f8a8f4a1c9e7b2d5f0a3c8e1d6b9f2a4",
    versions: [
      { version: "v1.2", date: "02 Nov 2026, 14:15 IST", author: "R. Prakash", reason: "Updated DC cable sizing and dual-MPPT string grouping after elevated structure revision", size: "4.2 MB" },
      { version: "v1.1", date: "28 Oct 2026, 16:30 IST", author: "R. Prakash", reason: "Adjusted AC circuit breaker rating to 25A Double Pole MCB", size: "4.0 MB" },
      { version: "v1.0", date: "18 Oct 2026, 11:00 IST", author: "R. Prakash", reason: "Initial standard single-line drawing draft", size: "3.8 MB" }
    ]
  },
  {
    id: "DOC-TECH-002",
    projectId: "NIRT-26-0042",
    category: "technical",
    categoryLabel: "Technical Documents",
    name: "Detailed Project Report (DPR) & 3D Shadow Analysis",
    fileName: "DPR_Simulation_HelioScope_5.4kW.pdf",
    fileSize: "6.8 MB",
    status: "Verified",
    version: "v1.1",
    hasVersions: true,
    uploadedBy: "R. Prakash (Design Lead)",
    date: "02 Nov 2026, 15:00 IST",
    sha256: "b9f2a4e7c0d3b6f8a8f4a1c9e7b2d5f0a3c8e1d6",
    versions: [
      { version: "v1.1", date: "02 Nov 2026, 15:00 IST", author: "R. Prakash", reason: "Incorporated 1.5m elevated structure 3D shading model (Annual generation: 8,748 kWh)", size: "6.8 MB" },
      { version: "v1.0", date: "19 Oct 2026, 14:30 IST", author: "R. Prakash", reason: "Initial flush mount simulation", size: "6.1 MB" }
    ]
  },
  {
    id: "DOC-TECH-003",
    projectId: "NIRT-26-0042",
    category: "technical",
    categoryLabel: "Technical Documents",
    name: "Structural Wind Stability Certificate (150 km/h)",
    fileName: "Chartered_Engineer_Wind_Load_Cert.pdf",
    fileSize: "2.5 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "Er. A. Syed (Super Admin)",
    date: "03 Nov 2026, 10:45 IST",
    sha256: "1d6b9f2a4e7c0d3b6f8a8f4a1c9e7b2d5f0a3c8e",
    versions: [
      { version: "v1.0", date: "03 Nov 2026, 10:45 IST", author: "Er. A. Syed", reason: "Certified by Chartered Structural Engineer for cyclone zone compliance", size: "2.5 MB" }
    ]
  },

  // 3. Commercial Documents (Version Controlled)
  {
    id: "DOC-COMM-001",
    projectId: "NIRT-26-0042",
    category: "commercial",
    categoryLabel: "Commercial Documents",
    name: "Customer Technical & Commercial Proposal",
    fileName: "Proposal_NIRT_26_0042_v1_2_Signed.pdf",
    fileSize: "3.1 MB",
    status: "Verified",
    version: "v1.2",
    hasVersions: true,
    uploadedBy: "Er. A. Syed (Technical Sales Lead)",
    date: "02 Nov 2026, 11:30 IST",
    sha256: "0a3c8e1d6b9f2a4e7c0d3b6f8a8f4a1c9e7b2d5f",
    versions: [
      { version: "v1.2", date: "02 Nov 2026, 11:30 IST", author: "Er. A. Syed", reason: "Customer approved 1.5m elevated HDGI structure; applied MD-authorized 3% goodwill concession", size: "3.1 MB" },
      { version: "v1.1", date: "28 Oct 2026, 15:45 IST", author: "P. Vijayakumar", reason: "Initial flush mount revised to elevated after site survey flagged parapet wall shadow analysis", size: "2.9 MB" },
      { version: "v1.0", date: "15 Oct 2026, 10:00 IST", author: "Rajkumar S", reason: "Initial commercial quotation draft", size: "2.7 MB" }
    ]
  },
  {
    id: "DOC-COMM-002",
    projectId: "NIRT-26-0042",
    category: "commercial",
    categoryLabel: "Commercial Documents",
    name: "Customer Confirmed Work Order Agreement",
    fileName: "Work_Order_WO_NIRT_2026_5528_Signed.pdf",
    fileSize: "2.8 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "Rajkumar S (Sales)",
    date: "06 Nov 2026, 01:50 IST",
    sha256: "f0a3c8e1d6b9f2a4e7c0d3b6f8a8f4a1c9e7b2d5",
    versions: [
      { version: "v1.0", date: "06 Nov 2026, 01:50 IST", author: "Rajkumar S", reason: "Section 9 Customer Confirmation signed agreement", size: "2.8 MB" }
    ]
  },

  // 4. DISCOM Documents
  {
    id: "DOC-DISC-001",
    projectId: "NIRT-26-0042",
    category: "discom",
    categoryLabel: "DISCOM Documents",
    name: "TANGEDCO Grid Feasibility Sanction Order",
    fileName: "TANGEDCO_Feasibility_Sanction_SLM_0411.pdf",
    fileSize: "1.6 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "V. Thangavel (Liaison Officer)",
    date: "22 Oct 2026, 12:00 IST",
    sha256: "7b2d5f0a3c8e1d6b9f2a4e7c0d3b6f8a8f4a1c9e",
    versions: [
      { version: "v1.0", date: "22 Oct 2026, 12:00 IST", author: "V. Thangavel", reason: "Approved 5 kW export capacity under Salem Urban Circle", size: "1.6 MB" }
    ]
  },

  // 5. Procurement Documents
  {
    id: "DOC-PROC-001",
    projectId: "NIRT-26-0042",
    category: "procurement",
    categoryLabel: "Procurement Documents",
    name: "Vendor Purchase Order (PO-9082) & Delivery Challan",
    fileName: "Purchase_Order_PO_9082_Waaree_Sungrow.pdf",
    fileSize: "2.2 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "T. Balaji (Purchase Lead)",
    date: "03 Nov 2026, 11:25 IST",
    sha256: "4a1c9e7b2d5f0a3c8e1d6b9f2a4e7c0d3b6f8a8f",
    versions: [
      { version: "v1.0", date: "03 Nov 2026, 11:25 IST", author: "T. Balaji", reason: "Authorized PO released to Waaree and Sungrow authorized stockists", size: "2.2 MB" }
    ]
  },

  // 6. Installation Documents
  {
    id: "DOC-INST-001",
    projectId: "NIRT-26-0042",
    category: "installation",
    categoryLabel: "Installation Documents",
    name: "Civil Foundation & MMS Torque Check Inspection Slip",
    fileName: "Civil_Foundations_MMS_Bolt_Torque_Report.pdf",
    fileSize: "1.9 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "M. Saravanan (EPC Lead)",
    date: "04 Nov 2026, 17:00 IST",
    sha256: "3c8e1d6b9f2a4e7c0d3b6f8a8f4a1c9e7b2d5f0a",
    versions: [
      { version: "v1.0", date: "04 Nov 2026, 17:00 IST", author: "M. Saravanan", reason: "Torque verified at 45 Nm; concrete pedestals cured for 7 days", size: "1.9 MB" }
    ]
  },

  // 7. Inspection Documents
  {
    id: "DOC-INSP-001",
    projectId: "NIRT-26-0042",
    category: "inspection",
    categoryLabel: "Inspection Documents",
    name: "Earthing Pit Resistance Test Certificate (3.4 Ω)",
    fileName: "Earth_Pit_Test_Certificate_3_4_Ohm.pdf",
    fileSize: "1.4 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "M. Saravanan (EPC Lead)",
    date: "05 Nov 2026, 16:30 IST",
    sha256: "6f8a8f4a1c9e7b2d5f0a3c8e1d6b9f2a4e7c0d3b",
    versions: [
      { version: "v1.0", date: "05 Nov 2026, 16:30 IST", author: "M. Saravanan", reason: "Tested with calibrated digital earth resistance meter (Pass < 5.0 Ω)", size: "1.4 MB" }
    ]
  },

  // 8. Net Metering Documents
  {
    id: "DOC-NETM-001",
    projectId: "NIRT-26-0042",
    category: "net_metering",
    categoryLabel: "Net Metering Documents",
    name: "TANGEDCO Joint Commissioning Report (JCR)",
    fileName: "TANGEDCO_JCR_Signed_Commissioning.pdf",
    fileSize: "2.1 MB",
    status: "Pending Review",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "V. Thangavel (Liaison Officer)",
    date: "06 Nov 2026, 02:00 IST",
    sha256: "9f2a4e7c0d3b6f8a8f4a1c9e7b2d5f0a3c8e1d6b",
    versions: [
      { version: "v1.0", date: "06 Nov 2026, 02:00 IST", author: "V. Thangavel", reason: "Signed Joint Commissioning Report with TANGEDCO Assistant Engineer", size: "2.1 MB" }
    ]
  },

  // 9. Payment Documents
  {
    id: "DOC-PAYM-001",
    projectId: "NIRT-26-0042",
    category: "payment",
    categoryLabel: "Payment Documents",
    name: "80% Advance Payment Bank Remittance Receipt (₹1,50,000)",
    fileName: "Bank_Receipt_Advance_80_ICIC0006119.pdf",
    fileSize: "1.1 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "A. Lakshmi (Accounts Team)",
    date: "19 Oct 2026, 11:45 IST",
    sha256: "1c9e7b2d5f0a3c8e1d6b9f2a4e7c0d3b6f8a8f4a",
    versions: [
      { version: "v1.0", date: "19 Oct 2026, 11:45 IST", author: "A. Lakshmi", reason: "NEFT credit verified in Salem Main Branch account (UTR: ICIC0006119882)", size: "1.1 MB" }
    ]
  },

  // 10. Subsidy Documents
  {
    id: "DOC-SUBS-001",
    projectId: "NIRT-26-0042",
    category: "subsidy",
    categoryLabel: "Subsidy Documents",
    name: "PM Surya Ghar National Portal Token Acknowledgement",
    fileName: "PM_Surya_Ghar_Portal_Token_TN_SLM_981.pdf",
    fileSize: "1.3 MB",
    status: "Verified",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "S. Geetha (Subsidy Desk)",
    date: "25 Oct 2026, 14:10 IST",
    sha256: "d3b6f8a8f4a1c9e7b2d5f0a3c8e1d6b9f2a4e7c0",
    versions: [
      { version: "v1.0", date: "25 Oct 2026, 14:10 IST", author: "S. Geetha", reason: "Application registered on national portal; token #TN-SLM-2026-981", size: "1.3 MB" }
    ]
  },

  // 11. Closure Documents
  {
    id: "DOC-CLOS-001",
    projectId: "NIRT-26-0042",
    category: "closure",
    categoryLabel: "Closure Documents",
    name: "Turnkey Project Completion & Handover Certificate",
    fileName: "Turnkey_Project_Completion_Handover_Cert.pdf",
    fileSize: "2.6 MB",
    status: "Pending Review",
    version: "v1.0",
    hasVersions: false,
    uploadedBy: "S. Karthik (PMO)",
    date: "06 Nov 2026, 02:15 IST",
    sha256: "b6f8a8f4a1c9e7b2d5f0a3c8e1d6b9f2a4e7c0d3",
    versions: [
      { version: "v1.0", date: "06 Nov 2026, 02:15 IST", author: "S. Karthik", reason: "Comprehensive handover draft pending final subsidy audit", size: "2.6 MB" }
    ]
  }
];
