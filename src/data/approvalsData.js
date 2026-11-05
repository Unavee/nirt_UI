// Section 33: Role-Based Approval System Data
// Supports the 4 core corporate approval workflows:
// 1. Proposal -> Approval -> Customer Confirmation
// 2. Purchase Request (PR) -> Approval -> Purchase Order (PO)
// 3. Payment Request -> Approval -> Payment Disbursed
// 4. Project Completion -> Verification -> Closure
// Traceable with: Approver, Date, Time, Decision, Remarks

export const APPROVAL_WORKFLOW_TYPES = [
  { id: "proposal", label: "1. Proposal Approvals", icon: "FileText", desc: "Technical & commercial proposal sign-off before client dispatch" },
  { id: "purchase", label: "2. Purchase PR-to-PO", icon: "ShoppingCart", desc: "Material purchase requisition approval prior to vendor PO release" },
  { id: "payment", label: "3. Payment Releases", icon: "IndianRupee", desc: "Subcontractor / vendor payment verification & disbursement authorization" },
  { id: "completion", label: "4. Handover & Completion", icon: "CheckCircle2", desc: "QA/QC technical inspection verification before formal project closure" }
];

export const INITIAL_APPROVAL_REQUESTS = [
  // WORKFLOW 1: Proposal -> Approval -> Customer Confirmation
  {
    id: "APR-PROP-101",
    workflowType: "proposal",
    title: "Commercial Proposal Revision v1.2 (5.4 kWp TOPCon)",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    branch: "Salem (HQ)",
    requestedBy: {
      name: "Rajkumar S",
      role: "Sales Executive",
      date: "02 Nov 2026",
      time: "02:15 PM IST"
    },
    details: {
      capacityKw: 5.4,
      totalValue: 275396,
      customerPayable: 197396,
      structureType: "Elevated HDGI 1.5m Clearance",
      discountApplied: "3% Goodwill Concession (Authorized by MD)",
      inverter: "Sungrow 5.0 kW Dual-MPPT"
    },
    status: "Approved",
    history: [
      {
        approver: "Dr. G. Khaja Nazeemudin",
        approverRole: "Management / Executive (MD)",
        date: "02 Nov 2026",
        time: "02:45:10 PM IST",
        decision: "Approved",
        remarks: "Elevated structure design is structurally validated for 150 km/h wind load. 3% margin concession approved within MD discretion. Cleared for customer delivery."
      }
    ],
    nextStep: "Customer Order Confirmation (Section 9) via OTP / Signed Work Order"
  },
  {
    id: "APR-PROP-102",
    workflowType: "proposal",
    title: "Commercial Proposal v1.0 (25 kW Industrial LT)",
    projectId: "NIRT-26-0043",
    customerName: "Sri Murugan Tex Processors",
    customerCode: "CUST-ERD-0122",
    branch: "Erode",
    requestedBy: {
      name: "P. Vignesh",
      role: "Sales Lead",
      date: "05 Nov 2026",
      time: "11:30 AM IST"
    },
    details: {
      capacityKw: 25.0,
      totalValue: 1280000,
      customerPayable: 1280000,
      structureType: "Industrial Trapezoidal Metal Sheet Fixture",
      discountApplied: "None (Commercial Tariff)",
      inverter: "Sungrow SG15KTL-M + Solis 10K Dual-Inverter"
    },
    status: "Pending Approval",
    history: [],
    nextStep: "Pending Technical Sales Head sign-off before official client presentation"
  },

  // WORKFLOW 2: Purchase Request -> Approval -> Purchase Order
  {
    id: "APR-PR-201",
    workflowType: "purchase",
    title: "Purchase Request PR-4081: 48x Waaree 545W TOPCon Solar Modules",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    branch: "Salem (HQ)",
    requestedBy: {
      name: "D. Senthil",
      role: "Store & Inventory Team",
      date: "03 Nov 2026",
      time: "09:30 AM IST"
    },
    details: {
      vendorName: "Waaree Energies Authorized Stockist (Coimbatore)",
      materialDescription: "545W Bifacial TOPCon Glass-to-Glass Solar Panels (Pack of 48)",
      requisitionAmount: 522000,
      paymentTerms: "30-Day Credit Line against GST Invoice",
      deliveryWarehouse: "Salem Central Hub (Steel Plant Road)"
    },
    status: "Approved",
    history: [
      {
        approver: "T. Balaji",
        approverRole: "Purchase Lead & Supply Chain Head",
        date: "03 Nov 2026",
        time: "11:20:15 AM IST",
        decision: "Approved",
        remarks: "Verified BOM quota against cleared 80% Advance. Price matched contracted rate at ₹19.90/Wp. Purchase Order PO-9082 issued to vendor."
      }
    ],
    nextStep: "Vendor Purchase Order PO-9082 released; GRN inward inspection awaited"
  },
  {
    id: "APR-PR-202",
    workflowType: "purchase",
    title: "Purchase Request PR-4082: 1x Sungrow 5.0kW Grid-Tied Inverter",
    projectId: "NIRT-26-0045",
    customerName: "V. Rajalakshmi",
    customerCode: "CUST-SLM-0091",
    branch: "Salem (HQ)",
    requestedBy: {
      name: "D. Senthil",
      role: "Store & Inventory Team",
      date: "06 Nov 2026",
      time: "01:15 AM IST"
    },
    details: {
      vendorName: "Sungrow Power India Pvt Ltd",
      materialDescription: "SG5.0RS-ADA Single-Phase Dual MPPT Inverter with WiFi Dongle",
      requisitionAmount: 64500,
      paymentTerms: "Immediate Advance Remittance against Proforma Invoice",
      deliveryWarehouse: "Salem Central Hub"
    },
    status: "Pending Approval",
    history: [],
    nextStep: "Awaiting PMO Lead review of advance payment voucher before releasing PO"
  },

  // WORKFLOW 3: Payment Request -> Approval -> Payment Disbursed
  {
    id: "APR-PAY-301",
    workflowType: "payment",
    title: "Civil Structure Assembly & Column Grouting Subcontractor Bill",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    branch: "Salem (HQ)",
    requestedBy: {
      name: "M. Saravanan",
      role: "Installation Team (Site Engineer)",
      date: "04 Nov 2026",
      time: "04:00 PM IST"
    },
    details: {
      subcontractor: "Sri Sakthi Civil Engineers (Salem)",
      workDescription: "M20 concrete pedestal casting, chemical curing membrane & anchor pull-out test",
      billAmount: 22000,
      stageCompletionPercent: "100% Civil Foundations Done",
      retentionAmount: 2200 // 10% retention until commissioning
    },
    status: "Approved",
    history: [
      {
        approver: "A. Lakshmi",
        approverRole: "Accounts & Commercial Finance",
        date: "05 Nov 2026",
        time: "10:15:00 AM IST",
        decision: "Approved",
        remarks: "Foundation curing cube test report verified (22.5 N/mm²). 10% retention withheld. Approved net disbursement of ₹19,800 via RTGS (Ref: UTIB000188)."
      }
    ],
    nextStep: "Disbursed ₹19,800 to subcontractor; payment voucher posted to financial ledger"
  },
  {
    id: "APR-PAY-302",
    workflowType: "payment",
    title: "Electrical AC/DC Wiring & Inverter Interconnection Milestone Release",
    projectId: "NIRT-26-0043",
    customerName: "Sri Murugan Tex Processors",
    customerCode: "CUST-ERD-0122",
    branch: "Erode",
    requestedBy: {
      name: "M. Saravanan",
      role: "Installation Team (Site Engineer)",
      date: "05 Nov 2026",
      time: "06:30 PM IST"
    },
    details: {
      subcontractor: "PowerTech Electrical Contractors (Perundurai)",
      workDescription: "4 sq.mm DC string wiring, AC armor cable termination, dual earth pit bonding (<3.5Ω)",
      billAmount: 48000,
      stageCompletionPercent: "100% Electrical Wiring Complete",
      retentionAmount: 4800
    },
    status: "Pending Approval",
    history: [],
    nextStep: "Pending Accounts Manager verification of megger insulation test certificate"
  },

  // WORKFLOW 4: Project Completion -> Verification -> Closure
  {
    id: "APR-CLO-401",
    workflowType: "completion",
    title: "Turnkey EPC Handover & Final Project Closure Sign-off",
    projectId: "NIRT-26-0040",
    customerName: "S. Balasubramanian",
    customerCode: "CUST-SLM-0076",
    branch: "Salem (HQ)",
    requestedBy: {
      name: "S. Karthik",
      role: "Project Manager (Central PMO)",
      date: "28 Oct 2026",
      time: "03:30 PM IST"
    },
    details: {
      systemCapacityKw: 4.4,
      discomSynchronizationDate: "24 Oct 2026",
      dbtSubsidyCredited: "₹78,000 Received into Customer Canara Bank Account",
      ledgerOutstanding: "₹0.00 ZERO BALANCE (Fully Reconciled)",
      earthPitReading: "3.2 Ohms (Pass < 5.0 Ohms)",
      customerSignOffCertificate: "Signed Physical JCR with EB AE & Customer Signature"
    },
    status: "Approved",
    history: [
      {
        approver: "Er. A. Syed",
        approverRole: "Super Admin & Head of Engineering",
        date: "29 Oct 2026",
        time: "11:00:20 AM IST",
        decision: "Approved",
        remarks: "Comprehensive inspection passed: Net meter synchronization verified on TANGEDCO billing portal, zero balance on accounts ledger, DBT subsidy credited. Permanent project closure approved."
      }
    ],
    nextStep: "Permanent plant closure locked; moved to 25-Year Post-Commissioning O&M Lifecycle (Section 35)"
  },
  {
    id: "APR-CLO-402",
    workflowType: "completion",
    title: "EPC Plant Handover & Net Meter Synchronization Verification",
    projectId: "NIRT-26-0044",
    customerName: "P. Shanmugam",
    customerCode: "CUST-NMK-0054",
    branch: "Namakkal",
    requestedBy: {
      name: "M. Saravanan",
      role: "Installation Team (Site Engineer)",
      date: "05 Nov 2026",
      time: "05:15 PM IST"
    },
    details: {
      systemCapacityKw: 3.3,
      discomSynchronizationDate: "04 Nov 2026",
      dbtSubsidyCredited: "Claim Lodged on PM Surya Ghar Portal (Token #TN-NMK-991)",
      ledgerOutstanding: "10% Final Retention (₹21,500 due on net meter inspection)",
      earthPitReading: "3.8 Ohms (Pass)",
      customerSignOffCertificate: "Customer OTP Acceptance Verified"
    },
    status: "Pending Approval",
    history: [],
    nextStep: "Pending PMO & Managing Director joint review of final net metering sync document"
  }
];
