// Section 16: Installation Management Data
// In strict accordance with BFRD Section 16:
// Once materials are available, installation is assigned to the project team.
// Tracks: Start/Completion Dates, Installation Team, 10 Work Packages, Testing, Photos, Completion Remarks.

export const INSTALLATION_WORK_PACKAGES = [
  {
    id: "pkg_civil",
    key: "civil_works",
    name: "Civil Works & Pedestals",
    category: "Structural",
    description: "Roof anchor bolt pull-out testing, chemical grouting of stub columns/pedestals, waterproofing sealant applied, concrete curing completed.",
    weightage: 10,
    checkpoints: [
      "Roof slab integrity & surface waterproofing verified",
      "Chemical anchor fasteners / base plates anchored (Hilti HY-200)",
      "Concrete stub pedestals (M25 grade) casted with 7-day curing",
      "No puncture to client waterproofing membranes"
    ]
  },
  {
    id: "pkg_mms",
    key: "mms_installation",
    name: "MMS Structure Erection",
    category: "Mechanical",
    description: "Hot-dip galvanized structure (80+ microns), tilt angle verified (11°-13° South-facing), torque marking applied to bolts (M10/M12 torqued to 35-40 Nm).",
    weightage: 15,
    checkpoints: [
      "Galvanization thickness >= 80 microns confirmed with Elcometer gauge",
      "South-facing orientation & 12° optimal tilt angle set via digital inclinometer",
      "SS304/SS316 hardware tightened to specified torque and torque-sealed",
      "Wind load diagonal cross-bracing installed as per structural DPR"
    ]
  },
  {
    id: "pkg_modules",
    key: "module_installation",
    name: "Solar PV Modules Mounting",
    category: "Mechanical",
    description: "Mono PERC/TOPCon modules mounted with anodized aluminum mid/end clamps, zero micro-cracks visual check, string layout matching DPR design.",
    weightage: 15,
    checkpoints: [
      "Modules inspected for zero glass micro-cracks or busbar discoloration",
      "Anodized aluminium mid & end clamps secured with EPDM rubber pads",
      "Proper thermal expansion gap (min 15mm) maintained between modules",
      "Module string arrangement exactly follows electrical DPR layout"
    ]
  },
  {
    id: "pkg_inverter",
    key: "inverter_installation",
    name: "Solar Inverter Mounting",
    category: "Electrical",
    description: "Wall/canopy mounting with 300mm heat sink clearance, IP65 canopy weather protection, DC/AC isolator switch clearances, display orientation check.",
    weightage: 10,
    checkpoints: [
      "Inverter mounted at eye-level with 300mm lateral and top ventilation clearance",
      "Dedicated galvanized sheet canopy protection against direct sunlight & rain",
      "Vibration-damping wall anchors secured tightly",
      "DC isolator and AC isolator switch mounted within 1 meter line-of-sight"
    ]
  },
  {
    id: "pkg_dc_cable",
    key: "dc_cable_installation",
    name: "DC Cabling & String Wiring",
    category: "Electrical",
    description: "1x4 sq.mm UV-resistant XLPO solar cable laid in heavy-duty UV conduits, genuine MC4 connector crimping, string labeling/ferruling (+/-).",
    weightage: 10,
    checkpoints: [
      "TUV certified 1x4 sq.mm solar DC cable routed in UV-protected conduits",
      "Original Staubli MC4 connectors crimped using calibrated ratcheting tool",
      "Positive (+) and Negative (-) heat-shrink ferruling on both ends of each string",
      "Cables clamped every 300mm using SS/UV-grade nylon cable ties (no sagging)"
    ]
  },
  {
    id: "pkg_ac_cable",
    key: "ac_cable_installation",
    name: "AC Cabling & LT Interconnection",
    category: "Electrical",
    description: "4C aluminium armoured XLPE cable from Inverter to ACDB to main LT panel, cable tray routing, brass cable glanding with earthing tags.",
    weightage: 10,
    checkpoints: [
      "Armoured 1.1kV XLPE cable routed through perforated GI cable tray",
      "Heavy-duty brass double compression cable glands with earthing tags fitted",
      "Proper color-coded phase lugging (Red, Yellow, Blue, Black Neutral)",
      "Bending radius of armoured cable kept within IS 1255 standards"
    ]
  },
  {
    id: "pkg_earthing",
    key: "earthing_installation",
    name: "Dedicated Earthing System",
    category: "Safety",
    description: "Independent chemical earth pits (PV array MMS, Inverter body & ACDB, Lightning Arrester), 25x3mm GI earthing strip, earth resistance measured (< 5 Ω).",
    weightage: 10,
    checkpoints: [
      "3 dedicated chemical earth pits installed with backfill compound (BFC)",
      "Pit 1: Array structure bonding (< 2.1 Ω measured)",
      "Pit 2: Inverter enclosure & ACDB/DCDB body (< 1.8 Ω measured)",
      "Pit 3: Lightning Arrester dedicated isolated pit (< 2.4 Ω measured)"
    ]
  },
  {
    id: "pkg_protection",
    key: "protection_system",
    name: "Protection Systems (DCDB / ACDB / LA)",
    category: "Protection",
    description: "DCDB with 1000V DC SPD (Type II) & DC fuses, ACDB with 4P MCB & Class B+C SPD, Early Streamer / Franklin Copper Lightning Arrester at highest rooftop elevation.",
    weightage: 10,
    checkpoints: [
      "DCDB equipped with 1000V Type II Surge Protection Devices & DC gPV fuses",
      "ACDB equipped with Siemens/Schneider 4P MCB and Class B+C SPD",
      "Franklin Lightning Arrester installed on 3m GI mast at highest rooftop point",
      "All warning caution stickers (415V / Dual Supply) affixed visibly"
    ]
  },
  {
    id: "pkg_testing",
    key: "electrical_testing",
    name: "Electrical Works & Pre-Commissioning Testing",
    category: "Testing",
    description: "String open-circuit voltage (Voc) verification, string short-circuit current (Isc) test, 1000V Megger insulation resistance test (> 50 MΩ), earth continuity.",
    weightage: 5,
    checkpoints: [
      "String Voc measured within 1.5% of DPR theoretical calculation",
      "String short-circuit current (Isc) verified under > 750 W/m² irradiance",
      "Megger 1000V DC insulation resistance > 100 MΩ (well above 50 MΩ threshold)",
      "Phase sequence R-Y-B clockwise rotation confirmed with phase meter"
    ]
  },
  {
    id: "pkg_photos",
    key: "photographs_signoff",
    name: "Photographs & Completion Sign-Off",
    category: "Documentation",
    description: "6 mandatory geo-tagged installation photos, field punch-list clearance, and Project Manager installation sign-off certificate.",
    weightage: 5,
    checkpoints: [
      "Geo-tagged Photo 1: PV Array South-facing overview captured",
      "Geo-tagged Photo 2: MMS Structure bracing & torque marks captured",
      "Geo-tagged Photo 3: Inverter, DCDB & ACDB installation wall captured",
      "Geo-tagged Photo 4: Chemical earthing chamber with resistance tag captured",
      "Geo-tagged Photo 5: Cable tray routing & LT panel tie-in captured",
      "Geo-tagged Photo 6: Site safety signboard & customer sign-off captured"
    ]
  }
];

export const INITIAL_INSTALLATION_DATA = {
  "NIRT-26-0042": {
    projectId: "NIRT-26-0042",
    projectName: "Salem Textiles 50kW Rooftop Solar",
    systemCapacity: "50 kWp",
    customerName: "K. R. Sengottaiyan (Salem Textiles)",
    siteAddress: "Plot No. 48, SIDCO Industrial Estate, Salem, Tamil Nadu - 636004",
    status: "in_progress", // "not_started" | "in_progress" | "pending_inspection" | "completed"
    overallProgress: 92, // percentage 0-100
    startDate: "2026-11-01",
    targetCompletionDate: "2026-11-08",
    actualCompletionDate: null,
    weatherConditions: "Clear Sky / 32°C (Optimal for Rooftop Work)",
    installationTeam: {
      leadEngineer: {
        name: "Er. K. Vasanth, B.E. (EEE)",
        role: "Project Field Manager & Certified Solar Lead",
        phone: "+91 98421 88301",
        badge: "Grade-A Solar Professional",
        email: "vasanth.k@nirtsolar.in"
      },
      certifiedWireman: {
        name: "R. Manikandan",
        role: "Licensed Electrical Wireman",
        licenseNo: "TN-EL-WR-2021-9942",
        phone: "+91 97892 44102"
      },
      mechanicalRigger: {
        name: "S. Murugan",
        role: "MMS Structure & Rooftop Specialist",
        phone: "+91 94432 55910"
      },
      safetyOfficer: {
        name: "Er. T. Vignesh, CSP",
        role: "HSE & Quality Inspector",
        certification: "NEBOSH IGC Certified",
        phone: "+91 96291 00219"
      }
    },
    workPackageStatuses: {
      civil_works: { status: "completed", progress: 100, completedAt: "2026-11-02", verifiedBy: "Er. K. Vasanth", remarks: "All 16 concrete pedestals cured for 7 days. Waterproof chemical sealant applied." },
      mms_installation: { status: "completed", progress: 100, completedAt: "2026-11-03", verifiedBy: "S. Murugan", remarks: "Hot-dip galvanized structure erected at 12° tilt. Torque sealed with visual markers." },
      module_installation: { status: "completed", progress: 100, completedAt: "2026-11-04", verifiedBy: "Er. K. Vasanth", remarks: "92x Waaree 550Wp TOPCon panels mounted with anodized mid/end clamps. Zero defects." },
      inverter_installation: { status: "completed", progress: 100, completedAt: "2026-11-04", verifiedBy: "R. Manikandan", remarks: "Growatt 50kW On-Grid inverter wall-mounted with GI canopy. Heat dissipation clearances verified." },
      dc_cable_installation: { status: "completed", progress: 100, completedAt: "2026-11-05", verifiedBy: "R. Manikandan", remarks: "1x4 sq.mm solar cables routed in UV-resistant conduits. Genuine MC4 crimped and ferrules attached." },
      ac_cable_installation: { status: "completed", progress: 100, completedAt: "2026-11-05", verifiedBy: "R. Manikandan", remarks: "3.5C 50 sq.mm aluminium armoured cable routed via GI perforated tray to main LT panel." },
      earthing_installation: { status: "completed", progress: 100, completedAt: "2026-11-05", verifiedBy: "Er. K. Vasanth", remarks: "3 chemical earth pits energized. Measured earth values: MMS 2.1Ω, Inverter 1.8Ω, LA 2.4Ω." },
      protection_system: { status: "completed", progress: 100, completedAt: "2026-11-05", verifiedBy: "R. Manikandan", remarks: "DCDB with 1000V DC SPDs & ACDB with 100A 4P MCCB installed. Lightning arrester mounted." },
      electrical_testing: { status: "in_progress", progress: 85, completedAt: null, verifiedBy: "Er. K. Vasanth", remarks: "String Voc (642V) and Isc (13.4A) verified. Megger insulation test passed (120 MΩ). Phase check ongoing." },
      photographs_signoff: { status: "in_progress", progress: 70, completedAt: null, verifiedBy: "Er. T. Vignesh", remarks: "4 of 6 photos uploaded and validated with GPS coordinates. Final handover sign-off pending." }
    },
    testMeasurements: {
      totalStrings: 4,
      modulesPerString: 23,
      measuredVoc: "642.4 V (Spec: 644.0 V)",
      measuredIsc: "13.42 A (Spec: 13.80 A)",
      insulationResistance: "128 MΩ (Statutory Min: 50 MΩ)",
      earthResistancePits: [
        { pitName: "Pit 1: Array MMS Structure", value: "2.1 Ω", status: "Pass (Standard < 5Ω)" },
        { pitName: "Pit 2: Inverter & Electrical Enclosures", value: "1.8 Ω", status: "Pass (Standard < 5Ω)" },
        { pitName: "Pit 3: Lightning Arrester (LA)", value: "2.4 Ω", status: "Pass (Standard < 5Ω)" }
      ],
      phaseRotation: "RYB Clockwise Confirmed",
      gridVoltageAtInverter: "418.2 V (415V ± 5%)",
      gridFrequency: "50.02 Hz"
    },
    photographs: [
      {
        id: "PHOTO-01",
        title: "PV Array Overview (South-Facing 12°)",
        category: "Array",
        timestamp: "2026-11-04 11:20 AM",
        geoCoordinates: "11.6643° N, 78.1460° E",
        verified: true,
        previewUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "PHOTO-02",
        title: "MMS Structure & Fastener Torque Markings",
        category: "Structure",
        timestamp: "2026-11-03 03:45 PM",
        geoCoordinates: "11.6643° N, 78.1461° E",
        verified: true,
        previewUrl: "https://images.unsplash.com/photo-1508873696983-2df5293cb325?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "PHOTO-03",
        title: "50kW Inverter, DCDB & ACDB Wall Setup",
        category: "Inverter",
        timestamp: "2026-11-05 10:15 AM",
        geoCoordinates: "11.6644° N, 78.1459° E",
        verified: true,
        previewUrl: "https://images.unsplash.com/photo-1497440001374-f26997328c1b?w=600&auto=format&fit=crop&q=80"
      },
      {
        id: "PHOTO-04",
        title: "Chemical Earth Pit Testing & Digital Meter",
        category: "Earthing",
        timestamp: "2026-11-05 02:30 PM",
        geoCoordinates: "11.6641° N, 78.1463° E",
        verified: true,
        previewUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
      }
    ],
    snags: [
      { id: "SNG-01", description: "Tighten mid-clamp #14 on String 3 to specified 38 Nm", reportedBy: "Er. T. Vignesh", severity: "Low", status: "Resolved", resolvedAt: "2026-11-04 04:30 PM" },
      { id: "SNG-02", description: "Add UV cable tie on conduit entry to ACDB enclosure", reportedBy: "Er. K. Vasanth", severity: "Low", status: "Resolved", resolvedAt: "2026-11-05 11:15 AM" },
      { id: "SNG-03", description: "Affix bilingual (Tamil/English) 415V DANGER caution plate on AC isolator", reportedBy: "Er. T. Vignesh", severity: "Medium", status: "Open", resolvedAt: null }
    ],
    completionRemarks: "Civil foundations, MMS structure, 92x PV modules, 50kW Growatt inverter, DC/AC cabling, and 3 dedicated earth pits completed. Pre-commissioning measurements show excellent earth resistance (< 2.4Ω) and 128 MΩ insulation resistance. Ready for DISCOM Section 18 Joint Inspection upon clearing minor caution plate snag."
  }
};
