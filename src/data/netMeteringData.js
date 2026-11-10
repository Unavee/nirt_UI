// Section 19: Net Metering Management Data
// In strict accordance with BFRD Section 19:
// The CRM should have a separate Net Metering module.
// Tracks: Application date/number, Meter details, Net meter installation date,
// Meter number, Meter readings (Import/Export/Net), Status, DISCOM communications, Documents, Completion date.
// Status Lifecycle: Not Applied -> Applied -> Under Process -> Approved -> Meter Installed -> Completed

export const NET_METERING_STAGES = [
  { id: "not_applied", label: "1. Not Applied", step: 1, desc: "Awaiting preliminary site inspection / CEIG clearance" },
  { id: "applied", label: "2. Applied", step: 2, desc: "Requisition filed with DISCOM MRT Laboratory with testing fees" },
  { id: "under_process", label: "3. Under Process", step: 3, desc: "Meter precision bench testing & calibration at MRT lab" },
  { id: "approved", label: "4. Approved", step: 4, desc: "Service Connection Order (SCO) issued by Executive Engineer" },
  { id: "meter_installed", label: "5. Meter Installed", step: 5, desc: "Bi-directional net meter installed & sealed at consumer premise" },
  { id: "completed", label: "6. Completed", step: 6, desc: "First billing cycle configured & active net export tracking" }
];

export const INITIAL_NET_METERING_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    consumerNumber: "04-201-002-884",
    capacity: "50 kWp",
    sanctionedLoad: "65 kW (LT Tariff III-B Industrial)",
    currentStatus: "meter_installed", // not_applied | applied | under_process | approved | meter_installed | completed
    statusStep: 5,
    application: {
      applicationNumber: "NM-TNEB-SLM-2026-08412",
      applicationDate: "2026-10-28",
      approvalDate: "2026-11-06",
      installationDate: "2026-11-09",
      completionDate: null,
      discomDivision: "TANGEDCO Salem South / MRT Section",
      serviceConnectionOrderNo: "SCO-SLM-2026-4410",
      testingFeeUtr: "HDFC20261028774102 (₹2,500 Paid)"
    },
    meterDetails: {
      meterType: "Bi-Directional 4-Quadrant Tri-Vector Net Meter",
      make: "L&T Electrical & Automation",
      model: "ER300P DLMS Tri-Vector Solar Net Meter",
      serialNumber: "LT-2026-NM-884210",
      accuracyClass: "Class 0.5s (High Precision CT Operated)",
      ctRatio: "100/5 A (Dual Core Resin Cast CTs)",
      ptRatio: "Direct 415V (3-Phase 4-Wire)",
      mrtLabTestCert: "MRT-SLM-TEST-2026-9914 (Error: +0.02%)",
      opticalPort: "DLMS / COSEM Compliant (RS-485 / GSM Modem Ready)",
      sealNumbers: [
        { id: "SEAL-01", position: "Meter Terminal Cover Seal", sealNo: "TNEB-SLM-TC-4819", type: "Polycarbonate Lead Wire" },
        { id: "SEAL-02", position: "Optical Port Communication Seal", sealNo: "TNEB-SLM-OP-1102", type: "Holographic Tamper-Proof" },
        { id: "SEAL-03", position: "External CT Chamber Box Seal", sealNo: "TNEB-SLM-CT-7740", type: "Polycarbonate Anchor Seal" }
      ]
    },
    readings: {
      initialImportKwh: "042180.0", // Grid energy consumed
      initialExportKwh: "000004.8", // Solar energy exported into grid
      initialNetKwh: "042175.2", // (Import - Export)
      initialKvah: "043010.0",
      powerFactor: "0.99 (Lag)",
      oldMeterSerialNumber: "SLM-LT-098214 (L&T Static)",
      oldMeterFinalReading: "184920.0 kWh (Old Unidirectional Meter Removed)",
      readingLoggedAt: "2026-11-09 04:30 PM",
      loggedByOfficer: "Er. N. Palanisamy (AE / MRT TANGEDCO)"
    },
    discomCommunications: [
      {
        id: "COMM-01",
        date: "2026-10-28",
        type: "Requisition",
        subject: "Net Meter Requisition Form filed with MRT testing fee receipt",
        sender: "NIRT Liaison Team",
        recipient: "AEE / MRT Salem South",
        status: "Acknowledged"
      },
      {
        id: "COMM-02",
        date: "2026-11-02",
        type: "MRT Calibration",
        subject: "Bi-directional Meter accuracy bench testing passed (+0.02% error)",
        sender: "TANGEDCO MRT Laboratory",
        recipient: "NIRT Solar / Consumer",
        status: "Test Passed (Cert #9914)"
      },
      {
        id: "COMM-03",
        date: "2026-11-06",
        type: "Sanction",
        subject: "Service Connection Order (SCO) issued for meter replacement",
        sender: "Executive Engineer (EE / Distribution)",
        recipient: "AE / O&M Salem South",
        status: "Approved"
      },
      {
        id: "COMM-04",
        date: "2026-11-09",
        type: "Meter Replacement",
        subject: "Physical meter changeover completed, 3 seals affixed, joint card signed",
        sender: "AE / MRT & NIRT Field Team",
        recipient: "Consumer Record",
        status: "Installed & Synchronized"
      }
    ],
    documents: [
      {
        id: "DOC-NM-01",
        title: "TANGEDCO Net Metering Sanction Order (SCO)",
        referenceNumber: "SCO-SLM-2026-4410",
        date: "2026-11-06",
        status: "Sanctioned",
        fileSize: "1.1 MB"
      },
      {
        id: "DOC-NM-02",
        title: "MRT Laboratory Calibration & Test Certificate",
        referenceNumber: "MRT-SLM-TEST-2026-9914",
        date: "2026-11-02",
        status: "Certified",
        fileSize: "890 KB"
      },
      {
        id: "DOC-NM-03",
        title: "Joint Meter Card (Old Meter Final / New Meter Initial)",
        referenceNumber: "JMC-SLM-2026-08412",
        date: "2026-11-09",
        status: "Signed & Sealed",
        fileSize: "1.6 MB"
      }
    ]
  }
};
