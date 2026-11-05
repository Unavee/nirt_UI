// Section 14: Procurement Management Data
// Captures full Material Requirements Planning (MRP) and Bill of Materials (BoM)
// with all 13 mandatory parameters across the 12 major solar material categories:
// 1. Project ID
// 2. Material
// 3. Specification
// 4. Quantity
// 5. Required date
// 6. Purchase request date
// 7. Purchase order date
// 8. Vendor
// 9. Expected delivery date
// 10. Actual delivery date
// 11. Quantity received
// 12. Pending quantity (Auto calculated: Quantity - Quantity Received)
// 13. Purchase status

export const MATERIAL_CATEGORIES = [
  { id: "solar_modules", label: "1. Solar Modules", icon: "Sun", desc: "Mono PERC / Bi-facial TOPCon panels" },
  { id: "inverters", label: "2. Inverters", icon: "Cpu", desc: "Grid-tie on-grid string inverters" },
  { id: "mms", label: "3. MMS (Mounting Structure)", icon: "Grid", desc: "HDGI pre-galvanized elevated structure" },
  { id: "dc_cables", label: "4. DC Cables", icon: "Zap", desc: "Solar grade XLPO UV-resistant DC wiring" },
  { id: "ac_cables", label: "5. AC Cables", icon: "Activity", desc: "Armoured copper/aluminium AC feeder cable" },
  { id: "earthing", label: "6. Earthing Materials", icon: "Shield", desc: "Chemical electrodes, copper rod, BFC compound" },
  { id: "acdb_dcdb", label: "7. ACDB/DCDB", icon: "Box", desc: "Array junction boxes with Type 2 SPDs & MCB" },
  { id: "protection", label: "8. Protection Equipment", icon: "ShieldCheck", desc: "ESE lightning arrester & earth pit chambers" },
  { id: "connectors", label: "9. Connectors", icon: "Link", desc: "IP68 Staubli MC4 branch & string connectors" },
  { id: "mounting_acc", label: "10. Mounting Accessories", icon: "Wrench", desc: "Mid/end clamps, spring nuts, SS 304 fasteners" },
  { id: "civil", label: "11. Civil Materials", icon: "Layers", desc: "M25 concrete ballast blocks, anchoring resin" },
  { id: "other", label: "12. Other Project Materials", icon: "Package", desc: "Heavy PVC conduits, warning boards, safety switches" }
];

export const PURCHASE_STATUSES = [
  { id: "PR Raised", label: "PR Raised", color: "slate" },
  { id: "PO Issued", label: "PO Issued", color: "blue" },
  { id: "In Transit", label: "In Transit", color: "indigo" },
  { id: "Partially Received", label: "Partially Received", color: "blue" },
  { id: "Delivered & QA Cleared", label: "Delivered & QA Cleared", color: "emerald" }
];

export const EMPANELLED_VENDORS = [
  "Waaree Energies Ltd",
  "Growatt New Energy Pvt Ltd",
  "Tata Power Solar Systems",
  "Polycab India Ltd",
  "Staubli Electrical Connectors",
  "Raychem RPG Pvt Ltd",
  "Salem Steel Fabrication Works",
  "Schneider Electric India",
  "UltraTech Cement Ltd (Civil)"
];

export const INITIAL_PROCUREMENT_ITEMS = [
  // 1. Solar Modules
  {
    id: "MAT-26-001",
    projectId: "NIRT-26-0042",
    material: "Solar Modules",
    category: "solar_modules",
    categoryLabel: "1. Solar Modules",
    specification: "Waaree 550Wp Bi-facial TOPCon Glass-to-Glass (ALMM Listed, 144 Half-cut cells)",
    quantity: 6,
    unit: "Nos",
    requiredDate: "2026-10-30",
    purchaseRequestDate: "2026-10-20",
    purchaseOrderDate: "2026-10-21",
    poNumber: "PO-2026-0042-01",
    vendor: "Waaree Energies Ltd",
    expectedDeliveryDate: "2026-10-28",
    actualDeliveryDate: "2026-10-27",
    quantityReceived: 6,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse (Bay 3)",
    grnNumber: "GRN-SLM-2026-0089",
    notes: "Flash test report verified (avg 552.4Wp). Zero micro-cracks under electroluminescence test."
  },

  // 2. Inverters
  {
    id: "MAT-26-002",
    projectId: "NIRT-26-0042",
    material: "Inverters",
    category: "inverters",
    categoryLabel: "2. Inverters",
    specification: "Growatt MIN 3300TL-X Single Phase On-Grid String Inverter (Dual MPPT, WiFi/4G Datalogger)",
    quantity: 1,
    unit: "No",
    requiredDate: "2026-10-30",
    purchaseRequestDate: "2026-10-20",
    purchaseOrderDate: "2026-10-21",
    poNumber: "PO-2026-0042-02",
    vendor: "Growatt New Energy Pvt Ltd",
    expectedDeliveryDate: "2026-10-29",
    actualDeliveryDate: "2026-10-28",
    quantityReceived: 1,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse (Bay 1)",
    grnNumber: "GRN-SLM-2026-0092",
    notes: "10-Year manufacturer replacement warranty certificate logged into Document Locker."
  },

  // 3. MMS (Mounting Structure)
  {
    id: "MAT-26-003",
    projectId: "NIRT-26-0042",
    material: "Module Mounting Structure (MMS)",
    category: "mms",
    categoryLabel: "3. MMS (Mounting Structure)",
    specification: "Hot-Dip Galvanized Iron (HDGI 80-micron coating) Elevated Terrace Structure (15° Tilt, 150 km/h wind rated)",
    quantity: 1,
    unit: "Set",
    requiredDate: "2026-10-28",
    purchaseRequestDate: "2026-10-20",
    purchaseOrderDate: "2026-10-22",
    poNumber: "PO-2026-0042-03",
    vendor: "Salem Steel Fabrication Works",
    expectedDeliveryDate: "2026-10-27",
    actualDeliveryDate: "2026-10-26",
    quantityReceived: 1,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Direct Delivery to Site (Fairlands, Salem)",
    grnNumber: "GRN-SLM-2026-0081",
    notes: "Galvanizing thickness verified with Elcometer gauge (avg 86 microns)."
  },

  // 4. DC Cables
  {
    id: "MAT-26-004",
    projectId: "NIRT-26-0042",
    material: "Solar DC Cables",
    category: "dc_cables",
    categoryLabel: "4. DC Cables",
    specification: "Polycab 1x4 sq.mm Tinned Copper Solar DC Cable UV-resistant, Halogen-Free (EN 50618 certified)",
    quantity: 60,
    unit: "Metres",
    requiredDate: "2026-10-31",
    purchaseRequestDate: "2026-10-21",
    purchaseOrderDate: "2026-10-22",
    poNumber: "PO-2026-0042-04",
    vendor: "Polycab India Ltd",
    expectedDeliveryDate: "2026-10-28",
    actualDeliveryDate: "2026-10-28",
    quantityReceived: 60,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse (Drum #D-401)",
    grnNumber: "GRN-SLM-2026-0095",
    notes: "Batch coil inspected for insulation continuity; red and black outer sheath confirmed."
  },

  // 5. AC Cables
  {
    id: "MAT-26-005",
    projectId: "NIRT-26-0042",
    material: "AC Feeder Cables",
    category: "ac_cables",
    categoryLabel: "5. AC Cables",
    specification: "Polycab 2-Core 4 sq.mm Copper Armoured XLPE Sub-station Feeder Cable (IS 7098 Part 1)",
    quantity: 25,
    unit: "Metres",
    requiredDate: "2026-10-31",
    purchaseRequestDate: "2026-10-21",
    purchaseOrderDate: "2026-10-22",
    poNumber: "PO-2026-0042-04",
    vendor: "Polycab India Ltd",
    expectedDeliveryDate: "2026-10-28",
    actualDeliveryDate: "2026-10-28",
    quantityReceived: 25,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse",
    grnNumber: "GRN-SLM-2026-0096",
    notes: "Armouring inspected; megger insulation test confirmed >1000 MΩ."
  },

  // 6. Earthing Materials
  {
    id: "MAT-26-006",
    projectId: "NIRT-26-0042",
    material: "Earthing Materials & Compound",
    category: "earthing",
    categoryLabel: "6. Earthing Materials",
    specification: "50mm dia 2-metre Copper-bonded Chemical Earthing Electrodes + 2x 25kg Bentonite Backfill Compound",
    quantity: 2,
    unit: "Sets",
    requiredDate: "2026-10-29",
    purchaseRequestDate: "2026-10-21",
    purchaseOrderDate: "2026-10-23",
    poNumber: "PO-2026-0042-05",
    vendor: "Raychem RPG Pvt Ltd",
    expectedDeliveryDate: "2026-10-28",
    actualDeliveryDate: "2026-10-27",
    quantityReceived: 2,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Direct Delivery to Site",
    grnNumber: "GRN-SLM-2026-0085",
    notes: "Both electrode pipes inspected for copper micro-cladding (250 microns)."
  },

  // 7. ACDB/DCDB
  {
    id: "MAT-26-007",
    projectId: "NIRT-26-0042",
    material: "ACDB / DCDB Junction Boxes",
    category: "acdb_dcdb",
    categoryLabel: "7. ACDB/DCDB",
    specification: "IP65 Polycarbonate Enclosure: 1-In/1-Out DCDB with 1000V Type 2 SPD & 1-Phase ACDB with 25A C-Curve MCB",
    quantity: 1,
    unit: "Set",
    requiredDate: "2026-10-30",
    purchaseRequestDate: "2026-10-21",
    purchaseOrderDate: "2026-10-23",
    poNumber: "PO-2026-0042-06",
    vendor: "Schneider Electric India",
    expectedDeliveryDate: "2026-10-29",
    actualDeliveryDate: "2026-10-29",
    quantityReceived: 1,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse",
    grnNumber: "GRN-SLM-2026-0098",
    notes: "Internal busbars, rotary DC isolator, and SPD health indicator flags tested green."
  },

  // 8. Protection Equipment
  {
    id: "MAT-26-008",
    projectId: "NIRT-26-0042",
    material: "Lightning Protection Equipment",
    category: "protection",
    categoryLabel: "8. Protection Equipment",
    specification: "Early Streamer Emission (ESE) Lightning Arrester (107m protection radius) with 25x3mm GI Flat Down-conductor",
    quantity: 1,
    unit: "Set",
    requiredDate: "2026-10-31",
    purchaseRequestDate: "2026-10-22",
    purchaseOrderDate: "2026-10-23",
    poNumber: "PO-2026-0042-07",
    vendor: "Raychem RPG Pvt Ltd",
    expectedDeliveryDate: "2026-10-30",
    actualDeliveryDate: "2026-10-30",
    quantityReceived: 1,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse",
    grnNumber: "GRN-SLM-2026-0102",
    notes: "NFC 17-102 French standard compliance certificate attached."
  },

  // 9. Connectors
  {
    id: "MAT-26-009",
    projectId: "NIRT-26-0042",
    material: "Solar MC4 Connectors",
    category: "connectors",
    categoryLabel: "9. Connectors",
    specification: "Original Staubli MC4 Male/Female Cable Couplers (IP68, 1500V DC rated, snap-in locking)",
    quantity: 8,
    unit: "Pairs",
    requiredDate: "2026-10-31",
    purchaseRequestDate: "2026-10-22",
    purchaseOrderDate: "2026-10-24",
    poNumber: "PO-2026-0042-08",
    vendor: "Staubli Electrical Connectors",
    expectedDeliveryDate: "2026-10-29",
    actualDeliveryDate: "2026-10-29",
    quantityReceived: 8,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Salem Central Warehouse",
    grnNumber: "GRN-SLM-2026-0105",
    notes: "Original Swiss-made Staubli barcode verified."
  },

  // 10. Mounting Accessories
  {
    id: "MAT-26-010",
    projectId: "NIRT-26-0042",
    material: "MMS Clamps & Fasteners",
    category: "mounting_acc",
    categoryLabel: "10. Mounting Accessories",
    specification: "Stainless Steel SS 304 Fasteners (M8 A2-70 bolts), Aluminium Anodized Mid-Clamps (35mm) & End-Clamps",
    quantity: 24,
    unit: "Sets",
    requiredDate: "2026-10-29",
    purchaseRequestDate: "2026-10-22",
    purchaseOrderDate: "2026-10-24",
    poNumber: "PO-2026-0042-03",
    vendor: "Salem Steel Fabrication Works",
    expectedDeliveryDate: "2026-10-28",
    actualDeliveryDate: "2026-10-28",
    quantityReceived: 24,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Direct Delivery to Site",
    grnNumber: "GRN-SLM-2026-0082",
    notes: "Non-magnetic SS 304 test verified. EPDM rubber cushioning pads included."
  },

  // 11. Civil Materials
  {
    id: "MAT-26-011",
    projectId: "NIRT-26-0042",
    material: "Civil Ballast Foundation Blocks",
    category: "civil",
    categoryLabel: "11. Civil Materials",
    specification: "Precast M25 Grade Reinforced Concrete Ballast Blocks (350x350x250mm, 60kg each) + Epoxy Anchor Resin",
    quantity: 8,
    unit: "Blocks",
    requiredDate: "2026-10-27",
    purchaseRequestDate: "2026-10-21",
    purchaseOrderDate: "2026-10-22",
    poNumber: "PO-2026-0042-09",
    vendor: "UltraTech Cement Ltd (Civil)",
    expectedDeliveryDate: "2026-10-26",
    actualDeliveryDate: "2026-10-26",
    quantityReceived: 8,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Direct Delivery to Site (Rooftop Staging)",
    grnNumber: "GRN-SLM-2026-0078",
    notes: "28-day cube compression test report confirmed >25 N/mm²."
  },

  // 12. Other Project Materials
  {
    id: "MAT-26-012",
    projectId: "NIRT-26-0042",
    material: "Conduits, Ties & Safety Signages",
    category: "other",
    categoryLabel: "12. Other Project Materials",
    specification: "25mm Heavy Duty UV-stabilized PVC Conduit Pipes (30m), UV Nylon Ties, Danger Solar High Voltage Signages",
    quantity: 1,
    unit: "Lot",
    requiredDate: "2026-10-31",
    purchaseRequestDate: "2026-10-23",
    purchaseOrderDate: "2026-10-24",
    poNumber: "PO-2026-0042-10",
    vendor: "Salem Central Warehouse",
    expectedDeliveryDate: "2026-10-29",
    actualDeliveryDate: "2026-10-29",
    quantityReceived: 1,
    pendingQuantity: 0,
    purchaseStatus: "Delivered & QA Cleared",
    deliveryLocation: "Direct Delivery to Site",
    grnNumber: "GRN-SLM-2026-0110",
    notes: "All statutory bilingual English/Tamil warning stickers and conduit saddles included."
  }
];
