// Section 18: Inspection & Commissioning Data
// In strict accordance with BFRD Section 18:
// The CRM should track inspection and commissioning across the statutory workflow:
// Requested -> Scheduled -> Inspection Completed -> Rectification -> Approved -> Commissioned

export const INSPECTION_STATUS_STAGES = [
  { id: "requested", label: "1. Requested", step: 1, desc: "Formal inspection request filed with DISCOM & CEIG" },
  { id: "scheduled", label: "2. Scheduled", step: 2, desc: "Site inspection date allocated by DISCOM Assistant Executive Engineer" },
  { id: "inspection_completed", label: "3. Inspection Completed", step: 3, desc: "Joint technical site audit conducted by authorities" },
  { id: "rectification", label: "4. Rectification", step: 4, desc: "Addressing inspector observations / minor snag notices" },
  { id: "approved", label: "5. Approved", step: 5, desc: "CEIG safety clearance & DISCOM technical compliance issued" },
  { id: "commissioned", label: "6. Commissioned", step: 6, desc: "Bi-directional grid sync & commercial plant energization" }
];

export const INITIAL_INSPECTIONS_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    capacity: "50 kWp",
    siteAddress: "Plot No. 48, SIDCO Industrial Estate, Salem, Tamil Nadu - 636004",
    currentStatus: "scheduled", // requested | scheduled | inspection_completed | rectification | approved | commissioned
    statusStep: 2,
    inspectingAuthority: "TANGEDCO (DISCOM) Salem South & CEIG Tamil Nadu",
    assignedInspectors: [
      {
        name: "Er. P. Ramasamy, M.E.",
        designation: "Assistant Executive Engineer (AEE / MRT)",
        organization: "TANGEDCO Salem South Division",
        phone: "+91 94458 51020",
        email: "aee.salem.south@tnebnet.org"
      },
      {
        name: "Er. M. Senthil Kumar, B.E.",
        designation: "Electrical Inspector (CEIG)",
        organization: "Chief Electrical Inspectorate to Govt. of TN",
        phone: "+91 94458 59914",
        email: "ei.salem@tngov.in"
      }
    ],
    dates: {
      requestDate: "2026-11-04",
      scheduledDate: "2026-11-10",
      actualInspectionDate: null,
      rectificationDeadline: "2026-11-12",
      reinspectionDate: null,
      approvalDate: null,
      commissioningDate: null
    },
    observationsAndChecklist: [
      {
        id: "OBS-01",
        item: "Solar PV Array MMS Tilt & Structural Anchor Pull-Out",
        authority: "CEIG Inspector",
        status: "Pass",
        notes: "12° tilt verified with digital inclinometer. SS304 torque sealant marks intact."
      },
      {
        id: "OBS-02",
        item: "Dedicated Chemical Earthing Resistance (< 5.0 Ω)",
        authority: "CEIG Inspector",
        status: "Pass",
        notes: "Measured values: MMS 2.1Ω, Inverter 1.8Ω, LA 2.4Ω. All conform to IS 3043."
      },
      {
        id: "OBS-03",
        item: "Inverter Anti-Islanding Trip Time Test",
        authority: "DISCOM AEE",
        status: "Pass",
        notes: "Inverter tripped within 0.18s upon AC breaker disconnection (statutory limit < 2.0s)."
      },
      {
        id: "OBS-04",
        item: "ACDB / DCDB Enclosures, SPDs & 4P MCCB",
        authority: "DISCOM AEE",
        status: "Pass",
        notes: "1000V DC Type II SPDs and Schneider 100A 4P MCCB verified."
      },
      {
        id: "OBS-05",
        item: "Bilingual 415V Dual Supply Caution Board",
        authority: "CEIG Inspector",
        status: "Rectification",
        notes: "Affix Tamil/English bilingual 415V DANGER plate on AC isolator & caution sticker on canopy.",
        rectified: false
      }
    ],
    rectificationDetails: {
      required: true,
      description: "Affix bilingual (Tamil/English) 415V DANGER caution plate on AC isolator switch and warning sticker on inverter canopy.",
      targetCompletionDate: "2026-11-11",
      responsibleEngineer: "Er. K. Vasanth (Project Field Lead)",
      status: "In Progress",
      rectificationEvidenceUploaded: false
    },
    commissioningReport: {
      reportNumber: "NIRT-COMM-2026-0042",
      gridInterconnectionFeeder: "11 kV SIDCO Industrial Feeder",
      distributionTransformer: "250 kVA DT-04 (Salem South)",
      phaseSequence: "R-Y-B Clockwise Confirmed",
      gridVoltage: "418.2 V",
      gridFrequency: "50.02 Hz",
      antiIslandingTripTime: "0.18 seconds",
      initialGenerationReading: "000004.8 kWh",
      powerFactor: "0.99 (Unity)",
      status: "Scheduled for Final Clearance"
    },
    statutoryDocuments: [
      {
        id: "DOC-INSP-01",
        title: "DISCOM Work Completion Report (WCR)",
        category: "Statutory",
        status: "Submitted & Acknowledged",
        referenceNumber: "WCR-TNEB-SLM-2026-0042",
        fileSize: "1.4 MB"
      },
      {
        id: "DOC-INSP-02",
        title: "CEIG Safety Sanction Drawing Application",
        category: "Statutory",
        status: "Under Joint Inspection",
        referenceNumber: "CEIG-APP-SLM-2026-9182",
        fileSize: "3.2 MB"
      },
      {
        id: "DOC-INSP-03",
        title: "NABL Calibration Certificates (Megger & Earth Tester)",
        category: "Testing",
        status: "Verified",
        referenceNumber: "NABL-CAL-2026-781",
        fileSize: "840 KB"
      }
    ]
  }
};
