// BFRD Section 25: Alerts & Notifications Data Store
// Automatic alerts engine for:
// Pending follow-ups, Overdue activities, Pending documents, Pending payments,
// DISCOM delays, Procurement delays, Installation delays, Inspection dates,
// Net metering pending, Subsidy pending, Customer complaints, Project deadlines.

export const INITIAL_ALERTS_DATA = {
  "NIRT-26-0042": [
    {
      id: "ALT-2026-0091",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      category: "subsidy_pending",
      categoryLabel: "Subsidy Claim Tracking",
      severity: "HIGH",
      title: "PM Surya Ghar DBT ₹78,000 Bank Verification Due",
      description: "Subsidy Sanction Advice generated on 08 Nov 2026. Awaiting consumer acknowledgement of ₹78,000 credit in SBI account ending in 4891.",
      dueDate: "12 Nov 2026",
      slaStatus: "Within SLA (2 Days Remaining)",
      escalationLevel: "Liaisoning Desk",
      status: "ACTIVE",
      recommendedAction: "Call consumer to confirm bank SMS receipt",
      actionType: "COMMUNICATION"
    },
    {
      id: "ALT-2026-0084",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      category: "project_closure",
      categoryLabel: "Project Closure Milestone",
      severity: "MEDIUM",
      title: "Mandatory 14/14 Checklist Closure Gate Passed",
      description: "All statutory technical, metering, financial, and warranty obligations have been fulfilled. Project is ready for archival to CLOSED state.",
      dueDate: "15 Nov 2026",
      slaStatus: "Ready for Sign-off",
      escalationLevel: "Project Manager (PMO)",
      status: "ACTIVE",
      recommendedAction: "Archive project record and issue completion token",
      actionType: "CLOSURE"
    },
    {
      id: "ALT-2026-0072",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      category: "net_metering_pending",
      categoryLabel: "Net Metering Synchronisation",
      severity: "RESOLVED",
      title: "Bi-Directional Net Meter Installation Completed",
      description: "L&T ER300P meter installed and sealed by TANGEDCO AEE O&M Salem West. Baseline reading locked at 00000.0 kWh.",
      dueDate: "04 Nov 2026",
      slaStatus: "Resolved on 04 Nov 2026",
      escalationLevel: "DISCOM Desk",
      status: "RESOLVED",
      recommendedAction: "Format NM-1 Card archived",
      actionType: "VIEW"
    },
    {
      id: "ALT-2026-0063",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      category: "payment_pending",
      categoryLabel: "Final Payment Milestone",
      severity: "RESOLVED",
      title: "Final Payment of ₹21,500 Cleared via RTGS",
      description: "Balance payment received and matched with bank UTR HDFCR520261107883921. No-Dues Certificate issued.",
      dueDate: "07 Nov 2026",
      slaStatus: "Resolved on 07 Nov 2026",
      escalationLevel: "Accounts Team",
      status: "RESOLVED",
      recommendedAction: "GST Invoice dispatched",
      actionType: "VIEW"
    },
    {
      id: "ALT-2026-0051",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      category: "inspection_dates",
      categoryLabel: "Statutory CEIG / DISCOM Inspection",
      severity: "RESOLVED",
      title: "Joint Inspection & Anti-Islanding Test Passed",
      description: "Inverter trip time verified at 0.18s (< 0.20s limit). Joint Commissioning Report signed by AEE.",
      dueDate: "03 Nov 2026",
      slaStatus: "Resolved on 03 Nov 2026",
      escalationLevel: "Technical Lead",
      status: "RESOLVED",
      recommendedAction: "Inspection certificate uploaded",
      actionType: "VIEW"
    }
  ]
};

export const ALERT_CATEGORIES = [
  { id: "all", label: "All Alerts" },
  { id: "subsidy_pending", label: "Subsidy Pending", icon: "Landmark" },
  { id: "project_closure", label: "Project Closure", icon: "CheckCircle2" },
  { id: "net_metering_pending", label: "Net Metering", icon: "Activity" },
  { id: "payment_pending", label: "Payments", icon: "CreditCard" },
  { id: "inspection_dates", label: "Inspections", icon: "ShieldCheck" }
];
