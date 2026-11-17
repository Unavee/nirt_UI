// NIRT Solar EPC - Role & departmental workspace configuration
// Strictly aligned with client specification:
// 1. Sales Pipeline (7 Open, 3 Closed)
// 2. Execution Pipeline (12 Open, 2 Closed)
// 3. Subsidy Pipeline (3 Open, 1 Closed)

export const ROLE_WORKSPACES = {
  sales_rep: {
    roleId: "sales_rep",
    departmentName: "Sales & Intake Desk",
    shortCode: "SALES",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    pipelineKey: "sales",
    pipelineCode: "1",
    menuItems: [
      { label: "Sales Workspace", href: "/", icon: "Users" },
      { label: "1. Sales Pipeline", href: "/pipelines?pipeline=sales", icon: "Layers", badge: "7 Open" },
      { label: "Projects Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Customer Master Record", href: "/projects/NIRT-26-0042", icon: "Building2" },
      { label: "Customer Communication", href: "/projects/NIRT-26-0042", icon: "MessageSquare", tabTarget: "communication" },
      { label: "Tasks & Follow-ups", href: "/projects/NIRT-26-0042", icon: "CheckSquare", tabTarget: "task_management" }
    ],
    assignedSteps: [
      { step: "01", name: "Lead Intake & Inward", pipeline: "Sales", status: "Active Intake" },
      { step: "02", name: "Consumer & Roof Qualification", pipeline: "Sales", status: "Qualification" },
      { step: "05", name: "Commercial Quotation Sizing", pipeline: "Sales", status: "Proposal Generation" },
      { step: "06", name: "Customer Work Order Confirmation", pipeline: "Sales", status: "Contract Closing" }
    ],
    spotlightTabs: ["overview", "proposal", "responsibility", "communication", "task_management", "documents"]
  },

  site_surveyor: {
    roleId: "site_surveyor",
    departmentName: "Technical Feasibility & Survey",
    shortCode: "SURVEY",
    color: "text-sky-700 bg-sky-50 border-sky-200",
    pipelineKey: "sales",
    pipelineCode: "1",
    menuItems: [
      { label: "Survey Workspace", href: "/", icon: "Compass" },
      { label: "1. Sales Pipeline", href: "/pipelines?pipeline=sales", icon: "Layers", badge: "7 Open" },
      { label: "Mobile Field Hub", href: "/field", icon: "Smartphone", badge: "Offline", mobileOnly: true },
      { label: "Projects Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Site Survey & Layout", href: "/projects/NIRT-26-0042", icon: "MapPin", tabTarget: "overview" },
      { label: "Document Locker", href: "/projects/NIRT-26-0042", icon: "FolderKanban", tabTarget: "documents" }
    ],
    assignedSteps: [
      { step: "03", name: "Terrace Survey & Shadow Audit", pipeline: "Sales", status: "Field Audit" },
      { step: "04", name: "Engineering Design & SLD DPR", pipeline: "Sales", status: "Technical Sign-off" }
    ],
    spotlightTabs: ["overview", "discom_subsidy", "documents", "responsibility"]
  },

  warehouse_manager: {
    roleId: "warehouse_manager",
    departmentName: "Stores & BoM Procurement",
    shortCode: "STORE",
    color: "text-teal-700 bg-teal-50 border-teal-200",
    pipelineKey: "execution",
    pipelineCode: "2",
    menuItems: [
      { label: "Store & Inventory Desk", href: "/", icon: "Truck" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "Procurement & BoM", href: "/projects/NIRT-26-0042", icon: "Package", tabTarget: "procurement" },
      { label: "Store & Inventory", href: "/projects/NIRT-26-0042", icon: "Warehouse", tabTarget: "store" },
      { label: "Material Pending Report", href: "/reports", icon: "FileSpreadsheet" }
    ],
    assignedSteps: [
      { step: "11", name: "Vendor PO & Tier-1 BoM Release", pipeline: "Execution", status: "Procurement" },
      { step: "12", name: "Central Warehouse GRN Inward", pipeline: "Execution", status: "Store Intake" },
      { step: "13", name: "Site Dispatch & RTS Return", pipeline: "Execution", status: "Site Staging" }
    ],
    spotlightTabs: ["procurement", "store", "documents", "responsibility"]
  },

  epc_manager: {
    roleId: "epc_manager",
    departmentName: "EPC Site Installation & O&M",
    shortCode: "EPC",
    color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    pipelineKey: "execution",
    pipelineCode: "2",
    menuItems: [
      { label: "EPC Site Operations", href: "/", icon: "Wrench" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "Installation & Site Erection", href: "/projects/NIRT-26-0042", icon: "Activity", tabTarget: "installation" },
      { label: "Inspection & Commissioning", href: "/projects/NIRT-26-0042", icon: "ShieldCheck", tabTarget: "inspection" },
      { label: "Net Metering Synchronisation", href: "/projects/NIRT-26-0042", icon: "Zap", tabTarget: "net_metering" },
      { label: "Mobile Field Hub", href: "/field", icon: "Smartphone", badge: "Technician", mobileOnly: true },
      { label: "Service & Complaints", href: "/service", icon: "Headset", badge: "O&M" }
    ],
    assignedSteps: [
      { step: "14", name: "Civil Structure & Module Mounting", pipeline: "Execution", status: "Mounting Erection" },
      { step: "15", name: "Electrical Cabling & Inverter Setup", pipeline: "Execution", status: "Testing & Sign-off" },
      { step: "17", name: "Net Meter Inspection & Grid Sync", pipeline: "Execution", status: "Grid Connection" }
    ],
    spotlightTabs: ["installation", "progress_tracker", "inspection", "net_metering", "service", "documents"]
  },

  liaison_officer: {
    roleId: "liaison_officer",
    departmentName: "TANGEDCO DISCOM Liaison",
    shortCode: "DISCOM",
    color: "text-violet-700 bg-violet-50 border-violet-200",
    pipelineKey: "execution",
    pipelineCode: "2",
    menuItems: [
      { label: "Liaison Command Desk", href: "/", icon: "Zap" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "TANGEDCO Feasibility Sanctions", href: "/projects/NIRT-26-0042", icon: "Zap", tabTarget: "feasibility" },
      { label: "DISCOM Application Filing", href: "/projects/NIRT-26-0042", icon: "Building2", tabTarget: "discom_application" },
      { label: "Bi-directional Net Metering", href: "/projects/NIRT-26-0042", icon: "Zap", tabTarget: "net_metering" },
      { label: "DISCOM CEIG Inspection", href: "/projects/NIRT-26-0042", icon: "ShieldCheck", tabTarget: "inspection" }
    ],
    assignedSteps: [
      { step: "08", name: "Customer KYC Dossier Assembly", pipeline: "Execution", status: "KYC Verified" },
      { step: "09", name: "TANGEDCO Portal Filing", pipeline: "Execution", status: "Application Lodged" },
      { step: "10", name: "Technical Feasibility Sanction", pipeline: "Execution", status: "Sanction Letter" }
    ],
    spotlightTabs: ["feasibility", "discom_application", "net_metering", "inspection", "documents"]
  },

  accounts_officer: {
    roleId: "accounts_officer",
    departmentName: "Finance & Accounts Command",
    shortCode: "ACCTS",
    color: "text-emerald-700 bg-emerald-50 border-emerald-200",
    pipelineKey: "execution",
    pipelineCode: "2",
    menuItems: [
      { label: "Accounts Desk Home", href: "/", icon: "IndianRupee" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "Financial Dashboard", href: "/dashboards", icon: "BarChart3" },
      { label: "80% Advance Clearance", href: "/projects/NIRT-26-0042", icon: "CreditCard", tabTarget: "financials" },
      { label: "Final Payment & NOC", href: "/projects/NIRT-26-0042", icon: "CheckCircle2", tabTarget: "final_payment" },
      { label: "Payment Outstanding Report", href: "/reports", icon: "FileSpreadsheet" },
      { label: "Billing Approvals", href: "/approvals", icon: "ShieldCheck" }
    ],
    assignedSteps: [
      { step: "07", name: "80% Advance Hard-Gate Clearance", pipeline: "Execution", status: "Hard Gate" },
      { step: "16", name: "10% On-Installation Receipt", pipeline: "Execution", status: "Pre-Commissioning" },
      { step: "18", name: "Final Settlement & No-Dues NOC", pipeline: "Execution", status: "Full Payment" }
    ],
    spotlightTabs: ["financials", "final_payment", "approvals", "documents", "communication"]
  },

  subsidy_coordinator: {
    roleId: "subsidy_coordinator",
    departmentName: "PM Surya Ghar National Portal",
    shortCode: "SUBSIDY",
    color: "text-cyan-700 bg-cyan-50 border-cyan-200",
    pipelineKey: "subsidy",
    pipelineCode: "3",
    menuItems: [
      { label: "PM Surya Ghar Desk", href: "/", icon: "Landmark" },
      { label: "3. Subsidy Pipeline", href: "/pipelines?pipeline=subsidy", icon: "Layers", badge: "3 Open" },
      { label: "Subsidy DBT Management", href: "/projects/NIRT-26-0042", icon: "Landmark", tabTarget: "subsidy_management" },
      { label: "Project Closure & Handover", href: "/projects/NIRT-26-0042", icon: "Award", tabTarget: "project_closure" },
      { label: "Subsidy Status Report", href: "/reports", icon: "FileSpreadsheet" }
    ],
    assignedSteps: [
      { step: "19", name: "PM Surya Ghar Subsidy Claim", pipeline: "Subsidy", status: "National Portal" },
      { step: "20", name: "DBT Subsidy Credit Verification", pipeline: "Subsidy", status: "Bank Credit" }
    ],
    spotlightTabs: ["subsidy_management", "project_closure", "documents", "communication"]
  },

  managing_director: {
    roleId: "managing_director",
    departmentName: "Executive Command & Governance",
    shortCode: "MD",
    color: "text-slate-900 bg-slate-100 border-slate-300",
    pipelineKey: "all",
    pipelineCode: "ALL",
    menuItems: [
      { label: "Executive Command Home", href: "/", icon: "LayoutDashboard" },
      { label: "Executive Dashboards", href: "/dashboards", icon: "BarChart3" },
      { label: "Management MIS Reports", href: "/reports", icon: "FileSpreadsheet", badge: "22" },
      { label: "1. Sales Pipeline", href: "/pipelines?pipeline=sales", icon: "Layers", badge: "7 Open" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "3. Subsidy Pipeline", href: "/pipelines?pipeline=subsidy", icon: "Layers", badge: "3 Open" },
      { label: "Projects Master Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Approvals Governance Hub", href: "/approvals", icon: "ShieldCheck" },
      { label: "Audit Trail", href: "/audit", icon: "ShieldAlert" },
      { label: "Customer Service & Complaints", href: "/service", icon: "Headset" },
      { label: "Mobile Field Hub", href: "/field", icon: "Smartphone", mobileOnly: true }
    ],
    assignedSteps: [
      { step: "P1", name: "Sales Pipeline Overview", pipeline: "Sales", status: "Lead to Order" },
      { step: "P2", name: "Execution & Grid Operations", pipeline: "Execution", status: "Advance to Completion" },
      { step: "P3", name: "Subsidy Disbursal & DBT", pipeline: "Subsidy", status: "Claim to DBT" }
    ],
    spotlightTabs: "ALL"
  },

  project_coordinator: {
    roleId: "project_coordinator",
    departmentName: "Central PMO Coordinator",
    shortCode: "PMO",
    color: "text-slate-900 bg-slate-100 border-slate-300",
    pipelineKey: "all",
    pipelineCode: "ALL",
    menuItems: [
      { label: "PMO Coordination Home", href: "/", icon: "LayoutDashboard" },
      { label: "Executive Dashboards", href: "/dashboards", icon: "BarChart3" },
      { label: "Management MIS Reports", href: "/reports", icon: "FileSpreadsheet", badge: "22" },
      { label: "1. Sales Pipeline", href: "/pipelines?pipeline=sales", icon: "Layers", badge: "7 Open" },
      { label: "2. Execution Pipeline", href: "/pipelines?pipeline=execution", icon: "Layers", badge: "12 Open" },
      { label: "3. Subsidy Pipeline", href: "/pipelines?pipeline=subsidy", icon: "Layers", badge: "3 Open" },
      { label: "Projects Master Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Approvals Governance Hub", href: "/approvals", icon: "ShieldCheck" },
      { label: "Audit Trail", href: "/audit", icon: "ShieldAlert" },
      { label: "Customer Service & Complaints", href: "/service", icon: "Headset" }
    ],
    assignedSteps: [
      { step: "P1", name: "Sales Pipeline Overview", pipeline: "Sales", status: "Lead to Order" },
      { step: "P2", name: "Execution & Grid Operations", pipeline: "Execution", status: "Advance to Completion" },
      { step: "P3", name: "Subsidy Disbursal & DBT", pipeline: "Subsidy", status: "Claim to DBT" }
    ],
    spotlightTabs: "ALL"
  }
};
