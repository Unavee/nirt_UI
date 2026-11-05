// Section 10: Advance Payment Management Data
// Captures full payment transaction history with the 10 mandatory parameters:
// 1. Project ID
// 2. Invoice number
// 3. Payment date
// 4. Amount
// 5. Payment mode
// 6. Transaction/reference number
// 7. Bank details
// 8. GST details
// 9. Balance amount
// 10. Payment status
// Includes automatic calculation: Total Project Value - Amount Received = Balance Amount
// Plus uploadable and retrievable digital payment receipts.

export const PAYMENT_MODES = [
  "RTGS / NEFT",
  "UPI (Instant)",
  "Cheque Clearance",
  "Demand Draft (DD)",
  "Net Banking Transfer",
  "Direct Bank Deposit"
];

export const PAYMENT_STATUSES = [
  { id: "Reconciled", label: "Reconciled & Cleared", color: "emerald" },
  { id: "Received", label: "Payment Received", color: "blue" },
  { id: "Pending Verification", label: "Pending Bank Verification", color: "slate" },
  { id: "Bounced", label: "Bounced / Failed", color: "rose" }
];

export const INITIAL_PAYMENTS = [
  {
    id: "REC-SLM-2026-0042",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    invoiceNumber: "INV-2026-0042-01",
    paymentDate: "2026-10-19",
    paymentTime: "11:42 IST",
    amount: 150000,
    paymentMode: "RTGS / NEFT",
    referenceNumber: "ICIC202610190042",
    bankDetails: {
      bankName: "ICICI Bank Ltd",
      branch: "Salem Main Branch",
      accountNumber: "XXXX-XXXX-4091",
      ifsc: "ICIC0000042",
      payerAccount: "HDFC Bank (A/c ...5128)"
    },
    gstDetails: {
      isGstApplicable: true,
      gstin: "33AABCN1234F1Z8",
      rate: 18,
      taxableAmount: 127118.64,
      cgst: 11440.68,
      sgst: 11440.68,
      hsnSacCode: "995461"
    },
    totalProjectValue: 215000,
    balanceAmount: 65000,
    paymentStatus: "Reconciled",
    receiptFileName: "ICICI_RTGS_Counterfoil_150000.pdf",
    receiptFileSize: "1.4 MB",
    receiptUploadedAt: "19 Oct 2026, 12:05 IST",
    recordedBy: "A. Lakshmi (Accounts Manager)",
    milestoneTag: "80% Upfront Booking Advance",
    notes: "Full 80% advance required per commercial policy received. Hard Lock 1 cleared for procurement."
  },
  {
    id: "REC-SLM-2026-0043",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerCode: "CUST-SLM-0089",
    invoiceNumber: "INV-2026-0042-02",
    paymentDate: "2026-11-04",
    paymentTime: "16:15 IST",
    amount: 21500,
    paymentMode: "UPI (Instant)",
    referenceNumber: "UPI-431109823491",
    bankDetails: {
      bankName: "State Bank of India (SBI)",
      branch: "Fairlands Branch, Salem",
      accountNumber: "XXXX-XXXX-8921",
      ifsc: "SBIN0001289",
      payerAccount: "Google Pay UPI ID: sengottaiyan@okhdfcbank"
    },
    gstDetails: {
      isGstApplicable: true,
      gstin: "33AABCN1234F1Z8",
      rate: 18,
      taxableAmount: 18220.34,
      cgst: 1639.83,
      sgst: 1639.83,
      hsnSacCode: "995461"
    },
    totalProjectValue: 215000,
    balanceAmount: 43500,
    paymentStatus: "Reconciled",
    receiptFileName: "UPI_Payment_Advice_21500.pdf",
    receiptFileSize: "680 KB",
    receiptUploadedAt: "04 Nov 2026, 16:30 IST",
    recordedBy: "A. Lakshmi (Accounts Manager)",
    milestoneTag: "10% Material Dispatch Advance",
    notes: "10% milestone upon MMS structure arrival at Salem site. Cleared for electrical installation."
  }
];
