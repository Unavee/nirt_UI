// Section 13: Technical Feasibility Data
// Captures comprehensive grid-connection engineering parameters:
// 1. Feasibility application date
// 2. Feasibility status (Approved, Conditional Approval, Under Inspection, Rejected, Resubmission)
// 3. Approved capacity
// 4. Technical conditions (Harmonics THD < 5%, Anti-islanding, Voltage regulation)
// 5. Additional requirements (Dedicated earthing, Type 2 SPD, phase balance)
// 6. Transformer requirements (Distribution Transformer rating, 75% hosting quota calculation, available headroom)
// 7. Meter requirements (Bidirectional DLMS net meter Class 1.0, optical port, MRT lab)
// 8. Line requirements (Service cable gauge, pole distance, voltage drop <3%)
// 9. DISCOM observations
// 10. Approval date
// 11. Remarks
// 12. Technical rejection or additional requirements recording

export const FEASIBILITY_STATUSES = [
  { id: "Approved", label: "Feasibility Approved", color: "emerald", desc: "Grid feasibility sanction issued" },
  { id: "Conditional Approval", label: "Conditional Approval", color: "blue", desc: "Approved subject to additional requirements" },
  { id: "Under Inspection", label: "Under AE Field Inspection", color: "indigo", desc: "Field officer verifying DT and feeder" },
  { id: "Rejected", label: "Technical Rejection", color: "rose", desc: "Transformer overload or line capacity exhausted" },
  { id: "Resubmission", label: "Technical Resubmission", color: "slate", desc: "Revised engineering drawings resubmitted" }
];

export const INITIAL_TECHNICAL_FEASIBILITY = [
  {
    id: "TF-SLM-2026-0042",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    consumerNumber: "04-219-002-1482",
    feasibilityAppDate: "2026-10-18",
    feasibilityStatus: "Approved",
    appliedCapacityKw: 3.3,
    approvedCapacityKw: 3.3,
    technicalConditions: [
      "Solar Inverter must feature auto-disconnect anti-islanding relay compliant with IEC 62116 / IEEE 1547 standards.",
      "Total Harmonic Distortion (THD) for current injection into the LT grid must remain < 5% per IEEE 519 guidelines.",
      "DC injection into the AC network must remain strictly below 0.5% of rated inverter output current.",
      "Inverter power factor must operate within 0.95 lagging to 0.95 leading range across all generation curves."
    ],
    additionalRequirements: [
      {
        id: "REQ-001",
        title: "Dual Chemical Earthing Pits",
        desc: "Dedicated <5Ω earthing electrode for solar MMS structure and separate neutral earthing.",
        status: "Complied",
        complianceDate: "2026-10-22",
        estimatedCost: 12000
      },
      {
        id: "REQ-002",
        title: "Class 2 Surge Protective Device (SPD)",
        desc: "Type 2 AC & DC surge arresters installed in distribution combiner box prior to inverter input.",
        status: "Complied",
        complianceDate: "2026-10-23",
        estimatedCost: 4500
      }
    ],
    transformerRequirements: {
      dtName: "Fairlands DT-04 (11kV / 433V)",
      dtRatingKva: 250,
      statutoryHostingPercent: 75,
      maxHostingCapacityKw: 187.5, // 250 * 0.75
      existingSolarConnectedKw: 105.5,
      availableSolarQuotaKw: 82.0,
      isDtOverloaded: false,
      dtAugmentationNeeded: false,
      substation: "Fairlands 11kV Substation, SEDC"
    },
    meterRequirements: {
      meterType: "Bidirectional DLMS Tri-Vector Smart Meter",
      meterClass: "Class 1.0 Accuracy",
      supplyPhase: "Single Phase 240V, 5-30A",
      opticalPort: "IEC 62056-21 Optical Port for automated DISCOM AMR reading",
      testingAuthority: "TANGEDCO Central Meter Relay Testing (MRT) Lab, Salem",
      meterEnclosure: "Polycarbonate IP65 Weatherproof Tamper-evident Seal Box"
    },
    lineRequirements: {
      feederName: "Fairlands Residential Feeder (Pole #FL-14)",
      serviceCableLengthMeters: 18,
      voltageRegulationDrop: "1.4% (well within statutory 3.0% CEA limit)",
      serviceCableSpec: "2-Core 16 sq.mm Aluminium Armoured Cable",
      lineAugmentationNeeded: false,
      poleTappingStatus: "Direct Overhead LT Line Tap Verified"
    },
    discomObservations: "Inspected by Er. K. Murugan (AEE / O&M). Feeder loading is balanced on R-phase. Transformer DT-04 has ample capacity (82 kW unutilized headroom). No network augmentation required.",
    approvalDate: "2026-10-25",
    sanctionOrderRef: "TANG/SLM/AEE/TECH-SANCTION/2026/1089",
    remarks: "Feasibility granted for 3.3 kWp. Quota locked in TANGEDCO LT Solar registry for 180 days.",
    officerInCharge: "Er. K. Murugan, AEE / O&M / Fairlands",
    rejectionDetails: {
      hasRejection: false,
      reason: "",
      discomNoticeDate: null,
      correctiveActions: ""
    }
  }
];
