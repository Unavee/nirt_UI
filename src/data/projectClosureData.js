// Section 22: Project Closure & Handover Data
// In strict accordance with BFRD Section 22:
// A project should not be marked Closed until all mandatory activities are completed.
// Mandates the 14-Point Project Closure Checklist:
// 1. Installation completed
// 2. Testing completed
// 3. Inspection completed
// 4. Commissioning completed
// 5. Net meter installed
// 6. Customer documentation completed
// 7. Final payment received
// 8. Subsidy application completed
// 9. Subsidy received
// 10. Customer handover completed
// 11. Warranty documents issued
// 12. Completion certificate issued
// 13. Project photographs uploaded
// 14. Customer feedback recorded

export const BFRD_CLOSURE_CHECKLIST = [
  {
    id: "chk_install",
    title: "1. Installation Completed",
    category: "Execution",
    description: "Civil pedestals, MMS structure, 92x PV modules, inverter, AC/DC cabling completed.",
    mandatory: true,
    sectionRef: "Section 16"
  },
  {
    id: "chk_testing",
    title: "2. Electrical Testing Completed",
    category: "Technical",
    description: "String Voc (642V), Isc (13.4A), Megger (128 MΩ), and earth resistance (< 2.4Ω) passed.",
    mandatory: true,
    sectionRef: "Section 16"
  },
  {
    id: "chk_inspection",
    title: "3. Inspection Completed",
    category: "Regulatory",
    description: "Joint site audit conducted by TANGEDCO AEE and CEIG Electrical Inspector.",
    mandatory: true,
    sectionRef: "Section 18"
  },
  {
    id: "chk_commissioning",
    title: "4. Commissioning Completed",
    category: "Technical",
    description: "Anti-islanding protection (0.18s) trip test verified and plant synchronized to 11kV grid.",
    mandatory: true,
    sectionRef: "Section 18"
  },
  {
    id: "chk_net_meter",
    title: "5. Net Meter Installed & Sealed",
    category: "Regulatory",
    description: "L&T bi-directional tri-vector net meter installed with 3 statutory TANGEDCO seals.",
    mandatory: true,
    sectionRef: "Section 19"
  },
  {
    id: "chk_cust_docs",
    title: "6. Customer Documentation Completed",
    category: "Governance",
    description: "Document Locker verified with Aadhaar, EB card, title deed, and notarized affidavit.",
    mandatory: true,
    sectionRef: "Section 11"
  },
  {
    id: "chk_payment",
    title: "7. Final Payment Received",
    category: "Finance",
    description: "100% project value (₹25,00,000) reconciled with zero outstanding dues.",
    mandatory: true,
    sectionRef: "Section 20"
  },
  {
    id: "chk_subsidy_app",
    title: "8. Subsidy Application Completed",
    category: "Subsidy",
    description: "PM Surya Ghar National Portal registration and DISCOM consumer linkage completed.",
    mandatory: true,
    sectionRef: "Section 21"
  },
  {
    id: "chk_subsidy_rcvd",
    title: "9. Subsidy Received via DBT",
    category: "Subsidy",
    description: "Central Financial Assistance (₹78,000) sanctioned and credited to customer's SBI account.",
    mandatory: true,
    sectionRef: "Section 21"
  },
  {
    id: "chk_handover",
    title: "10. Customer Handover Completed",
    category: "Handover",
    description: "Physical rooftop walkthrough, system operation training, and emergency shutdown briefing.",
    mandatory: true,
    sectionRef: "Section 22"
  },
  {
    id: "chk_warranty",
    title: "11. Warranty Documents Issued",
    category: "Governance",
    description: "25-year solar PV warranty card and 5-year inverter manufacturer warranty dossier issued.",
    mandatory: true,
    sectionRef: "Section 22"
  },
  {
    id: "chk_completion_cert",
    title: "12. Completion Certificate Issued",
    category: "Governance",
    description: "Official Solar EPC Handover & Installation Completion Certificate signed by Director.",
    mandatory: true,
    sectionRef: "Section 22"
  },
  {
    id: "chk_photos",
    title: "13. Project Photographs Uploaded",
    category: "Documentation",
    description: "6 mandatory geo-tagged high-resolution site installation photos archived.",
    mandatory: true,
    sectionRef: "Section 16"
  },
  {
    id: "chk_feedback",
    title: "14. Customer Feedback Recorded",
    category: "Quality",
    description: "Formal Customer Satisfaction (CSAT) rating, review, and testimonial signed.",
    mandatory: true,
    sectionRef: "Section 22"
  }
];

export const INITIAL_PROJECT_CLOSURE_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    consumerNumber: "04-201-002-884",
    capacity: "50 kWp",
    closureStatus: "pending_closure", // "pending_closure" | "closed"
    targetHandoverDate: "2026-11-15",
    actualClosureDate: null,
    checklistState: {
      chk_install: { checked: true, verifiedBy: "Er. K. Vasanth", verifiedDate: "2026-11-05" },
      chk_testing: { checked: true, verifiedBy: "Er. K. Vasanth", verifiedDate: "2026-11-05" },
      chk_inspection: { checked: true, verifiedBy: "Er. M. Senthil Kumar (CEIG)", verifiedDate: "2026-11-09" },
      chk_commissioning: { checked: true, verifiedBy: "Er. P. Ramasamy (AEE)", verifiedDate: "2026-11-10" },
      chk_net_meter: { checked: true, verifiedBy: "Er. N. Palanisamy (AE)", verifiedDate: "2026-11-09" },
      chk_cust_docs: { checked: true, verifiedBy: "P. Murugesan", verifiedDate: "2026-10-25" },
      chk_payment: { checked: true, verifiedBy: "A. Lakshmi (Accounts)", verifiedDate: "2026-11-09" },
      chk_subsidy_app: { checked: true, verifiedBy: "K. Priya", verifiedDate: "2026-10-29" },
      chk_subsidy_rcvd: { checked: true, verifiedBy: "PFMS Central Treasury", verifiedDate: "2026-11-10" },
      chk_handover: { checked: true, verifiedBy: "Er. K. Vasanth", verifiedDate: "2026-11-10" },
      chk_warranty: { checked: true, verifiedBy: "Er. S. Prakash", verifiedDate: "2026-11-10" },
      chk_completion_cert: { checked: true, verifiedBy: "Er. S. Prakash", verifiedDate: "2026-11-10" },
      chk_photos: { checked: true, verifiedBy: "Er. T. Vignesh", verifiedDate: "2026-11-05" },
      chk_feedback: { checked: true, verifiedBy: "Customer (Self)", verifiedDate: "2026-11-10" }
    },
    customerFeedback: {
      rating: 5, // 5 stars
      review: "Exceptional engineering and execution by NIRT Solar team. The system is generating an average of 210 units per day, reducing our factory power bills significantly. Smooth CEIG and net metering coordination.",
      netPromoterScore: 10,
      feedbackDate: "2026-11-10",
      signedBy: "K. R. Sengottaiyan (Managing Director)"
    },
    warrantyPackage: {
      moduleWarranty: "Waaree 25-Year Linear Power Warranty (min 84.8% at Year 25)",
      inverterWarranty: "Growatt 5-Year Comprehensive Product Replacement Warranty",
      workmanshipWarranty: "NIRT 5-Year Comprehensive O&M & Free Maintenance Package",
      generationGuarantee: "Guaranteed minimum 72,000 units/year generation",
      supportHelpline: "1800-425-NIRT (Toll-Free 24x7 O&M Support)"
    },
    closureCertificate: {
      certificateNumber: "NIRT-PROJ-CLOSE-2026-0042",
      issuedBy: "Er. S. Prakash, Director",
      issuedDate: "2026-11-10",
      pmoSeal: "NIRT Solar Projects Directorate Seal Affixed",
      status: "Closed & Commissioned"
    }
  }
};
