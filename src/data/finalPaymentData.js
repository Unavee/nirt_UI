// Section 20: Final Payment Management Data
// In strict accordance with BFRD Section 20:
// The system should automatically calculate the outstanding customer amount.
// Example:
// Project Value: ₹2,50,000
// Advance Received: ₹1,00,000
// Other Payments: ₹50,000
// Balance: ₹1,00,000
// Payment statuses: Pending | Partially Paid | Fully Paid | Overdue
// Generates payment reminders (WhatsApp / Email / SMS)
// Dedicated Accounts team payment settlement dashboard.

export const PAYMENT_LIFECYCLE_STATUSES = [
  { id: "pending", label: "Pending", color: "slate", desc: "No payment received yet" },
  { id: "partially_paid", label: "Partially Paid", color: "blue", desc: "Advance or interim milestone received; balance outstanding" },
  { id: "fully_paid", label: "Fully Paid", color: "emerald", desc: "100% of project value cleared; zero dues" },
  { id: "overdue", label: "Overdue", color: "rose", desc: "Payment deadline breached; SLA reminder triggered" }
];

export const INITIAL_FINAL_PAYMENT_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    consumerNumber: "04-201-002-884",
    phone: "+91 98427 11200",
    email: "sengottaiyan@salemtextiles.co.in",
    capacity: "50 kWp",
    totalProjectValue: 2500000, // ₹25,00,000
    advanceReceived: 2000000,    // ₹20,00,000 (80% Advance)
    otherPayments: 250000,       // ₹2,50,000 (10% Post Installation)
    balanceAmount: 250000,       // ₹2,50,000 (10% Final upon Net Metering)
    overallStatus: "partially_paid", // pending | partially_paid | fully_paid | overdue
    paymentDueDate: "2026-11-15",
    paymentTerms: "80% Upfront Advance, 10% On Material Installation, 10% On Net Metering & Commissioning",
    bankAccountDetails: {
      bankName: "HDFC Bank Ltd",
      accountName: "NIRT Solar Renewable Energy Systems Pvt Ltd",
      accountNumber: "50200088910245",
      ifsc: "HDFC0000214",
      branch: "Salem Main Branch",
      upiId: "nirtsolar@hdfcbank"
    },
    milestones: [
      {
        id: "MS-01",
        title: "80% Upfront Booking & Procurement Advance",
        percentage: 80,
        amount: 2000000,
        status: "Paid",
        dueDate: "2026-10-23",
        paidDate: "2026-10-23",
        referenceUtr: "HDFC20261022987102",
        receiptNo: "REC-SLM-2026-0042",
        paymentMode: "RTGS"
      },
      {
        id: "MS-02",
        title: "10% On Physical Rooftop Installation & Testing",
        percentage: 10,
        amount: 250000,
        status: "Paid",
        dueDate: "2026-11-05",
        paidDate: "2026-11-05",
        referenceUtr: "ICIC20261105009182",
        receiptNo: "REC-SLM-2026-0043",
        paymentMode: "NEFT"
      },
      {
        id: "MS-03",
        title: "10% Final Settlement Upon Net Metering & Grid Sync",
        percentage: 10,
        amount: 250000,
        status: "Pending",
        dueDate: "2026-11-15",
        paidDate: null,
        referenceUtr: null,
        receiptNo: null,
        paymentMode: null
      }
    ],
    remindersSent: [
      {
        id: "REM-01",
        channel: "WhatsApp",
        sentAt: "2026-11-08 10:30 AM",
        recipient: "+91 98427 11200",
        subject: "10% Final Milestone Demand Notice upon Net Metering",
        amountDemanded: 250000,
        status: "Delivered & Read",
        sentBy: "A. Lakshmi (Accounts Officer)"
      },
      {
        id: "REM-02",
        channel: "Email",
        sentAt: "2026-11-08 10:32 AM",
        recipient: "sengottaiyan@salemtextiles.co.in",
        subject: "Invoice #INV-2026-0042-03: Final Net Metering Payment Due",
        amountDemanded: 250000,
        status: "Sent with PDF Invoice",
        sentBy: "Automated Billing Engine"
      }
    ],
    noDuesCertificate: {
      isIssued: false,
      certificateNumber: null,
      issuedDate: null,
      issuedBy: null,
      remarks: "Pending clearance of final ₹2,50,000 milestone invoice."
    }
  }
};
