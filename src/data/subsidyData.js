// Section 21: Subsidy Management Data
// In strict accordance with BFRD Section 21:
// Tracks the complete subsidy process across the 7 statutory stages:
// Eligibility -> Application -> Submitted -> Under Verification -> Approved -> Subsidy Released -> Subsidy Received
// Tracks: Customer details, Project ID, Eligibility, Eligible amount, Application date/number,
// Documents, Approval date, Expected subsidy, Actual subsidy received, Receipt date, Bank transaction/reference.

export const SUBSIDY_STAGES = [
  { id: "eligibility", label: "1. Eligibility", step: 1, desc: "Tariff verification & PM Surya Ghar CFA eligibility confirmation" },
  { id: "application", label: "2. Application", step: 2, desc: "National Portal registration & DISCOM consumer mapping" },
  { id: "submitted", label: "3. Submitted", step: 3, desc: "Online dossier filed with bank passbook and plant DPR" },
  { id: "under_verification", label: "4. Under Verification", step: 4, desc: "PFMS automated Aadhaar-bank account verification & DISCOM clearance" },
  { id: "approved", label: "5. Approved", step: 5, desc: "MNRE Central Financial Assistance (CFA) sanction order generated" },
  { id: "subsidy_released", label: "6. Subsidy Released", step: 6, desc: "Disbursed by Central Treasury to PFMS payment bridge" },
  { id: "subsidy_received", label: "7. Subsidy Received", step: 7, desc: "Direct Benefit Transfer (DBT) credited into customer's bank account" }
];

export const INITIAL_SUBSIDY_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    consumerNumber: "04-201-002-884",
    phone: "+91 98427 11200",
    email: "sengottaiyan@salemtextiles.co.in",
    capacity: "50 kWp",
    schemeName: "PM Surya Ghar: Muft Bijli Yojana / MNRE Phase-II Scheme",
    subsidyEligibility: "Eligible",
    eligibleAmount: 78000, // ₹78,000 maximum Central Financial Assistance cap
    expectedSubsidy: 78000,
    actualSubsidyReceived: 78000,
    currentStatus: "approved", // eligibility | application | submitted | under_verification | approved | subsidy_released | subsidy_received
    statusStep: 5,
    application: {
      portalApplicationNumber: "PMSGY-TN-SLM-2026-90412",
      applicationDate: "2026-10-25",
      submissionDate: "2026-10-29",
      verificationDate: "2026-11-04",
      approvalDate: "2026-11-09",
      releaseDate: "2026-11-12",
      receiptDate: null,
      discomName: "TANGEDCO Salem South Division",
      nationalPortalUrl: "https://pmsuryaghar.gov.in",
      dbtUtrNumber: "PFMS-DBT-2026-7789012"
    },
    customerBankDetails: {
      accountHolderName: "K. R. Sengottaiyan",
      bankName: "State Bank of India (SBI)",
      accountNumber: "XXXX-XXXX-8921",
      ifsc: "SBIN0001289",
      branch: "Fairlands Branch, Salem",
      pfmsStatus: "Validated (Name & Aadhaar Matched on PFMS)",
      aadhaarLinked: true
    },
    documents: [
      {
        id: "DOC-SUB-01",
        title: "Customer Bank Passbook / Cancelled Cheque",
        referenceNumber: "SBI-CHQ-8921",
        status: "PFMS Validated",
        fileSize: "1.2 MB",
        date: "2026-10-25"
      },
      {
        id: "DOC-SUB-02",
        title: "Joint Commissioning Certificate (Format NM-1 / JMC)",
        referenceNumber: "JMC-SLM-2026-0042",
        status: "DISCOM Approved",
        fileSize: "2.4 MB",
        date: "2026-11-09"
      },
      {
        id: "DOC-SUB-03",
        title: "Geo-Tagged Solar PV Plant Photo with Customer",
        referenceNumber: "GEO-IMG-2026-0042",
        status: "GPS Verified",
        fileSize: "3.1 MB",
        date: "2026-11-05"
      },
      {
        id: "DOC-SUB-04",
        title: "MNRE Direct Benefit Transfer Sanction Order",
        referenceNumber: "MNRE-DBT-ORD-2026-881",
        status: "Sanctioned (₹78,000)",
        fileSize: "1.5 MB",
        date: "2026-11-09"
      }
    ],
    auditRemarks: "Bank details validated on PFMS portal. Joint Inspection report and geo-tagged plant photographs approved by TANGEDCO nodal officer. MNRE sanction order generated for ₹78,000 DBT credit."
  }
};
