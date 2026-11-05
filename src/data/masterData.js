export const NIRT_COMPANY = {
  legalName: "NIRT RENEWABLE ENERGY PRIVATE LIMITED",
  shortName: "NIRT Solar",
  cin: "U74999TZ2017PTC028477",
  gstin: "33AAFCN4764L1Z5",
  pan: "AAFCN4764L",
  headOffice: "104/7, 1st Floor, SPC Bhawan, Manivannan Street, Opp. New Bus Stand, Salem - 636 004",
  phone: "9655046464",
  email: "admin@nirt.net",
  website: "www.nirt.net",
  bankDetails: {
    bank: "ICICI BANK",
    branch: "SALEM BRANCH",
    accountNumber: "611905057857",
    ifsc: "ICIC0006119"
  },
  authorizedSignatory: "Dr. G. KHAJA NAZEEMUDIN",
  designation: "Chief Operating Officer",
  branches: ["Salem (HQ)", "Coimbatore", "Erode", "Namakkal", "Dharmapuri", "Tirupur"]
};

export const MASTER_DATA = {
  projectCategories: [
    { id: "residential", label: "Residential (PM Surya Ghar)" },
    { id: "commercial", label: "Commercial (LT/HT)" },
    { id: "industrial", label: "Industrial (C&I Metal Shed / RCC)" },
    { id: "institutional", label: "Institutional / Educational" },
    { id: "solar_pump", label: "Solar Agricultural Pump" }
  ],
  roofTypes: ["RCC Flat Roof", "Industrial Metal Sheet", "Tiled Roof", "Asbestos Sheet", "Elevated Superstructure", "Ground Mount"],
  connectionTypes: ["Single Phase LT (Up to 4 kW)", "Three Phase LT (Above 4 kW)", "High Tension (HT) 11kV/22kV"],
  solarModules: [
    { brand: "Waaree", model: "Bifacial TOPCon 550W", wattage: 550, warrantyYears: 25 },
    { brand: "Adani Solar", model: "Mono PERC 540W", wattage: 540, warrantyYears: 25 },
    { brand: "Vikram Solar", model: "Paranoid Mono 545W", wattage: 545, warrantyYears: 25 },
    { brand: "Tata Power Solar", model: "Mono Crystalline 535W", wattage: 535, warrantyYears: 25 }
  ],
  inverters: [
    { brand: "Growatt", model: "MIC 3300TL-X (3.3 kW 1-Ph)", capacityKw: 3.3, phase: "1-Phase", warrantyYears: 10 },
    { brand: "Growatt", model: "MOD 5000TL3-X (5 kW 3-Ph)", capacityKw: 5.0, phase: "3-Phase", warrantyYears: 10 },
    { brand: "Solis", model: "S5-GR3P10K (10 kW 3-Ph)", capacityKw: 10.0, phase: "3-Phase", warrantyYears: 10 },
    { brand: "Sungrow", model: "SG15KTL-M (15 kW 3-Ph)", capacityKw: 15.0, phase: "3-Phase", warrantyYears: 10 },
    { brand: "Deye", model: "SUN-20K-G04 (20 kW 3-Ph)", capacityKw: 20.0, phase: "3-Phase", warrantyYears: 10 }
  ],
  discoms: [
    { id: "tangedco", name: "TANGEDCO (Tamil Nadu)", divisions: ["Salem Urban", "Salem Rural", "Coimbatore South", "Erode North", "Namakkal Central"] },
    { id: "bescom", name: "BESCOM (Bangalore / Karnataka)", divisions: ["South Circle", "East Circle"] }
  ],
  subsidySlabsPM: [
    { minKw: 1, maxKw: 2, subsidyRs: 30000, description: "₹30,000 for 1 kW systems" },
    { minKw: 2, maxKw: 3, subsidyRs: 60000, description: "₹60,000 for 2 kW systems" },
    { minKw: 3, maxKw: 10, subsidyRs: 78000, description: "₹78,000 fixed for 3 kW and above" }
  ],
  userRoles: [
    { 
      id: "management", 
      title: "Executive / Super Admin", 
      department: "Executive Management",
      permissions: "Full Organization Oversight, Financial Audits, Executive Approvals, Revenue Analytics" 
    },
    { 
      id: "sales", 
      title: "Sales & Business Development", 
      department: "Sales",
      permissions: "Lead Intake, Sizing Calculator, Survey Scheduling, Commercial Proposals" 
    },
    { 
      id: "surveyor", 
      title: "Survey & Technical Feasibility", 
      department: "Technical Survey",
      permissions: "Physical Site Surveys, Tape Measurements, 4-Photo Validation, Shadow Assessment" 
    },
    { 
      id: "purchase_store", 
      title: "Purchase & Inventory Store", 
      department: "Supply Chain & Procurement",
      permissions: "BOM Generation, Factory POs, Supplier GRN Verification, Dispatch to Site" 
    },
    { 
      id: "project_manager", 
      title: "EPC & Field Installation Ops", 
      department: "Field Operations",
      permissions: "Civil & Electrical Staging, 14-Step Quality Checklist, Earth Resistance Log (< 5 Ω)" 
    },
    { 
      id: "liaison", 
      title: "Liaison & DISCOM Desk", 
      department: "DISCOM Liaison",
      permissions: "TANGEDCO Portal Submissions, CEIG Safety Clearances, Net Meter Sync" 
    },
    { 
      id: "accounts", 
      title: "Accounts & Commercial Finance", 
      department: "Finance & Accounts",
      permissions: "80% Advance Receipts, 10% Installation Balance, Invoicing, Tax Receipts" 
    },
    { 
      id: "subsidy", 
      title: "PM Surya Ghar Subsidy Desk", 
      department: "Government Subsidy Desk",
      permissions: "National Portal Claims, Aadhaar/EB Match, Commissioning Uploads, DBT Verification" 
    },
    { 
      id: "coordinator", 
      title: "Project Coordinator (Central PMO)", 
      department: "Central PMO",
      permissions: "Cross-Department SLA Monitoring, Delay Escalation, Bottleneck Clearance, Handover Sign-off" 
    }
  ]
};
