// Section 12: DISCOM Application Management Data
// Captures complete lifecycle and statutory filing information:
// 1. Application date
// 2. Application number
// 3. Consumer number
// 4. DISCOM
// 5. Division/Section
// 6. Applied capacity
// 7. Application status (7 stages: Not Started -> Application Prepared -> Submitted -> Under Process -> Approved -> Rejected -> Resubmission)
// 8. Application fee
// 9. Payment details
// 10. Documents submitted
// 11. Approval date
// 12. Rejection details
// 13. Remarks

export const DISCOM_STATUS_STAGES = [
  { id: "not_started", label: "Not Started", step: 1, desc: "Awaiting customer KYC & 80% advance" },
  { id: "prepared", label: "Application Prepared", step: 2, desc: "Form filled & SLD drawings attached" },
  { id: "submitted", label: "Submitted", step: 3, desc: "Filed on DISCOM online solar portal" },
  { id: "under_process", label: "Under Process", step: 4, desc: "AE technical feasibility verification" },
  { id: "approved", label: "Approved", step: 5, desc: "Feasibility sanction letter issued" },
  { id: "rejected", label: "Rejected", step: 6, desc: "Deficiency notice / transformer overload" },
  { id: "resubmission", label: "Resubmission", step: 7, desc: "Rectified drawings resubmitted" },
];

export const DISCOM_LIST = [
  "TANGEDCO (Tamil Nadu Generation and Distribution Corp)",
  "BESCOM (Bangalore Electricity Supply Company)",
  "TSSPDCL (Telangana Southern Power Distribution Corp)",
  "APEPDCL (Eastern Power Distribution Company of AP)",
  "MSEDCL (Maharashtra State Electricity Distribution Co)"
];

export const INITIAL_DISCOM_APPLICATIONS = [
  {
    id: "DISCOM-SLM-2026-0042",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    applicationDate: "2026-10-14",
    applicationNumber: "TANG/SLM/2026/0411",
    consumerNumber: "04-219-002-1482",
    discom: "TANGEDCO (Tamil Nadu Generation and Distribution Corp)",
    circle: "Salem Circle",
    divisionSection: "Salem Urban / Fairlands Section - O&M",
    substationTransformer: "Fairlands 11kV SS / 250kVA DT-04 (Available Quota: 82 kW)",
    appliedCapacityKw: 3.3,
    phase: "Single Phase (LT Tariff 1A)",
    applicationStatus: "approved",
    applicationFee: 1180, // ₹1,000 + 18% GST
    feePayment: {
      mode: "Online Net Banking",
      utr: "TANGEDCO-PAY-984128",
      paymentDate: "2026-10-14",
      receiptNumber: "RCPT-TANG-8921",
      status: "Paid & Verified"
    },
    documentsSubmitted: [
      { name: "Consumer Aadhaar Card (Masked)", status: "Verified", date: "14 Oct 2026" },
      { name: "Latest 3 Months EB Consumption Slips", status: "Verified", date: "14 Oct 2026" },
      { name: "Property Tax Assessment / Ownership Deed", status: "Verified", date: "14 Oct 2026" },
      { name: "Approved Single Line Diagram (SLD Drawing v1.2)", status: "Verified", date: "14 Oct 2026" },
      { name: "Rooftop Structure Feasibility & MMS Sign-off", status: "Verified", date: "14 Oct 2026" },
    ],
    approvalDate: "2026-10-25",
    sanctionOrderNumber: "TANG/SLM/AEE/TECH-SANCTION/2026/1089",
    sanctionedCapacityKw: 3.3,
    rejectionDetails: {
      hasRejection: false,
      reasonCode: "",
      remarks: "",
      noticeDate: null,
      resubmissionDate: null
    },
    remarks: "Technical feasibility sanction issued by Salem Urban AEE. Transformer DT-04 capacity quota confirmed and reserved for 180 days.",
    officerInCharge: "Er. K. Murugan, AEE / O&M / Fairlands",
    targetCommissioningDate: "15 Nov 2026"
  }
];
