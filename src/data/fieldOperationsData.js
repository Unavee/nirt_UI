// Section 32: Mobile Accessibility & Field Operations Data
// Supports on-site field activities:
// - Assigned projects & tasks
// - Geo-tagged photograph uploads
// - Survey information & installation status updates
// - Customer discussion logs
// - Real-time GPS coordinate stamping
// - Mobile field inspection reports

export const INITIAL_FIELD_DISCUSSIONS = [
  {
    id: "DISC-2026-041",
    projectId: "NIRT-26-0042",
    customerName: "K. Sengottaiyan",
    customerPhone: "9842178234",
    staffName: "M. Saravanan (EPC Lead)",
    date: "05 Nov 2026, 03:30 PM IST",
    mode: "In-Person Rooftop Meeting",
    topic: "Parapet Wall Shadow & Inverter Utility Wall Location",
    customerDecision: "Customer approved elevating the MMS structure to 1.5m clearance to retain terrace utility space. Agreed to mount the Sungrow inverter on the ground-floor staircase wall.",
    nextAction: "Issue elevated HDGI column fabrication request to warehouse",
    nextFollowUp: "08 Nov 2026",
    gpsStamp: "11.6643° N, 78.1460° E (Fairlands, Salem)"
  },
  {
    id: "DISC-2026-042",
    projectId: "NIRT-26-0043",
    customerName: "Sri Murugan Tex Processors",
    customerPhone: "9443219800",
    staffName: "V. Thangavel (Liaison Officer)",
    date: "04 Nov 2026, 11:15 AM IST",
    mode: "Phone Discussion",
    topic: "TANGEDCO Inspection Date & Net Meter Calibration Schedule",
    customerDecision: "Factory manager confirmed presence for joint inspection on Nov 07. Authorized liaison team to submit calibration fee voucher.",
    nextAction: "File formal inspection intimation letter with Erode Electricity Distribution Circle",
    nextFollowUp: "07 Nov 2026",
    gpsStamp: "11.3410° N, 77.7172° E (SIPCOT, Erode)"
  },
  {
    id: "DISC-2026-043",
    projectId: "NIRT-26-0044",
    customerName: "P. Shanmugam",
    customerPhone: "9842144550",
    staffName: "K. Murali (Surveyor)",
    date: "02 Nov 2026, 01:45 PM IST",
    mode: "In-Person Rooftop Meeting",
    topic: "Rooftop Cable Tray Routing & AC Distribution Box Position",
    customerDecision: "Customer requested routing the DC solar cables along the western parapet wall inside UV-resistant conduit to avoid rainwater drain obstruction.",
    nextAction: "Adjust SLD drawing cable length by +6 meters",
    nextFollowUp: "05 Nov 2026",
    gpsStamp: "11.2189° N, 78.1674° E (Namakkal)"
  }
];

export const INITIAL_INSTALLATION_CHECKLIST = [
  {
    id: "step_civil",
    name: "1. Civil Foundation & Pedestals",
    desc: "M20 concrete pedestals casting, column grouting & chemical waterproofing curing",
    status: "Completed",
    completedDate: "03 Nov 2026",
    engineer: "M. Saravanan",
    photoUrl: "/assets/logScreen1.avif"
  },
  {
    id: "step_mms",
    name: "2. MMS Structure Assembly & Bolt Torque",
    desc: "Elevated 80-micron HDGI column erection, purlin alignment & torque tightening to 45 Nm",
    status: "Completed",
    completedDate: "04 Nov 2026",
    engineer: "M. Saravanan",
    photoUrl: "/assets/logScreen2.avif"
  },
  {
    id: "step_modules",
    name: "3. Solar Modules Mounting & String Clamping",
    desc: "Mounting 10x Waaree 540W TOPCon bifacial modules, mid & end clamp fastening",
    status: "In Progress",
    completedDate: null,
    engineer: "M. Saravanan",
    photoUrl: null
  },
  {
    id: "step_wiring",
    name: "4. Inverter Mounting & AC/DC Cabling",
    desc: "Sungrow 5kW inverter wall mounting, Polycab 4 sq.mm DC string wiring & AC armored cable",
    status: "Pending",
    completedDate: null,
    engineer: "M. Saravanan",
    photoUrl: null
  },
  {
    id: "step_earthing",
    name: "5. Earthing Pit Resistance Test (< 5.0 Ω)",
    desc: "3 maintenance-free chemical gel earthing pits & lightning arrester cone bonding",
    status: "Pending",
    completedDate: null,
    engineer: "M. Saravanan",
    photoUrl: null
  },
  {
    id: "step_netmeter",
    name: "6. TANGEDCO Net Metering Synchronization",
    desc: "DISCOM bidirectional meter installation, safety inspection & anti-islanding test",
    status: "Pending",
    completedDate: null,
    engineer: "V. Thangavel",
    photoUrl: null
  }
];
