// NIRT Solar EPC - Role & Departmental Workspace Configuration
// Maps each of the 9 roles to their specific Department Workspace, Process Steps, and Tab Visibilities.
// Strict Zero Amber Compliance: Blue, Indigo, Violet, Emerald, Slate, Rose.

export const ROLE_WORKSPACES = {
  sales_rep: {
    roleId: "sales_rep",
    departmentName: "Sales & Intake Desk",
    shortCode: "SALES",
    color: "text-blue-700 bg-blue-50 border-blue-200",
    pipelineKey: "sales",
    pipelineCode: "P1",
    menuItems: [
      { label: "Sales Workspace", href: "/", icon: "Users" },
      { label: "P1: Sales Pipeline (01-06)", href: "/pipelines", icon: "Layers", badge: "P1" },
      { label: "Projects Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Customer Master Record", href: "/projects/NIRT-26-0042", icon: "Building2" },
      { label: "Customer Communication", href: "/projects/NIRT-26-0042", icon: "MessageSquare", tabTarget: "communication" },
      { label: "Tasks & Follow-ups", href: "/projects/NIRT-26-0042", icon: "CheckSquare", tabTarget: "task_management" }
    ],
    assignedSteps: [
      { step: "01", name: "Lead Intake & Inward", pipeline: "P1", status: "Active Intake" },
      { step: "02", name: "Consumer & Roof Qualification", pipeline: "P1", status: "Qualification" },
      { step: "05", name: "Commercial Quotation Sizing", pipeline: "P1", status: "Proposal Generation" },
      { step: "06", name: "Customer Work Order Confirmation", pipeline: "P1", status: "Contract Closing" }
    ],
    spotlightTabs: ["overview", "proposal", "responsibility", "communication", "task_management", "documents"]
  },

  site_surveyor: {
    roleId: "site_surveyor",
    departmentName: "Technical Feasibility & Survey",
    shortCode: "SURVEY",
    color: "text-sky-700 bg-sky-50 border-sky-200",
    pipelineKey: "sales",
    pipelineCode: "P1",
    menuItems: [
      { label: "Survey Workspace", href: "/", icon: "Compass" },
      { label: "P1: Feasibility Pipeline", href: "/pipelines", icon: "Layers", badge: "P1" },
      { label: "Mobile Field Hub (PWA)", href: "/field", icon: "Smartphone", badge: "Offline" },
      { label: "Projects Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Site Survey & Layout", href: "/projects/NIRT-26-0042", icon: "MapPin", tabTarget: "overview" },
      { label: "Document Locker", href: "/projects/NIRT-26-0042", icon: "FolderKanban", tabTarget: "documents" }
    ],
    assignedSteps: [
      { step: "03", name: "Terrace Survey & Shadow Audit", pipeline: "P1", status: "Field Audit" },
      { step: "04", name: "Engineering Design & SLD DPR", pipeline: "P1", status: "Technical Sign-off" }
    ],
    spotlightTabs: ["overview", "discom_subsidy", "documents", "responsibility"]
  },

  warehouse_manager: {
    roleId: "warehouse_manager",
    departmentName: "Stores & BoM Procurement",
    shortCode: "STORE",
    color: "text-teal-700 bg-teal-50 border-teal-200",
    pipelineKey: "procurement",
    pipelineCode: "P3",
    menuItems: [
      { label: "Store & Inventory Desk", href: "/", icon: "Truck" },
      { label: "P3: Stores & BoM Pipeline", href: "/pipelines", icon: "Layers", badge: "P3" },
      { label: "Procurement & BoM (Sec 14)", href: "/projects/NIRT-26-0042", icon: "Package", tabTarget: "procurement" },
      { label: "Store & Inventory (Sec 15)", href: "/projects/NIRT-26-0042", icon: "Warehouse", tabTarget: "store" },
      { label: "Material Pending Report", href: "/reports", icon: "FileSpreadsheet", badge: "MIS #12" }
    ],
    assignedSteps: [
      { step: "11", name: "Vendor PO & Tier-1 BoM Release", pipeline: "P3", status: "Procurement" },
      { step: "12", name: "Central Warehouse GRN Inward", pipeline: "P3", status: "Store Intake" },
      { step: "13", name: "Site SIV Dispatch & RTS Return", pipeline: "P3", status: "Site Staging" }
    ],
    spotlightTabs: ["procurement", "store", "documents", "responsibility"]
  },

  epc_manager: {
    roleId: "epc_manager",
    departmentName: "EPC Site Installation & O&M",
    shortCode: "EPC",
    color: "text-indigo-700 bg-indigo-50 border-indigo-200",
    pipelineKey: "execution",
    pipelineCode: "P4",
    menuItems: [
      { label: "EPC Site Operations", href: "/", icon: "Wrench" },
      { label: "P4: Site Execution Pipeline", href: "/pipelines", icon: "Layers", badge: "P4" },
      { label: "Installation & Site (Sec 16)", href: "/projects/NIRT-26-0042", icon: "Activity", tabTarget: "installation" },
      { label: "Inspection & Commissioning", href: "/projects/NIRT-26-0042", icon: "ShieldCheck", tabTarget: "inspection" },
      { label: "Net Metering (Sec 19)", href: "/projects/NIRT-26-0042", icon: "Zap", tabTarget: "net_metering" },
      { label: "Mobile Field Hub", href: "/field", icon: "Smartphone", badge: "Technician" },
      { label: "Service & Complaints (Sec 35)", href: "/service", icon: "Headset", badge: "O&M" }
    ],
    assignedSteps: [
      { step: "14", name: "Mechanical Erection & Clamping", pipeline: "P4", status: "Civil & Mounting" },
      { step: "15", name: "Array Megger & Earth Testing", pipeline: "P4", status: "Safety Sign-off" },
      { step: "17", name: "Joint Commissioning & Meter Sync", pipeline: "P4", status: "Grid Connection" }
    ],
    spotlightTabs: ["installation", "progress_tracker", "inspection", "net_metering", "service", "documents"]
  },

  liaison_officer: {
    roleId: "liaison_officer",
    departmentName: "TANGEDCO & DISCOM Liaison",
    shortCode: "LIAISON",
    color: "text-violet-700 bg-violet-50 border-violet-200",
    pipelineKey: "approvals",
    pipelineCode: "P2",
    menuItems: [
      { label: "DISCOM & Liaison Desk", href: "/", icon: "Building2" },
      { label: "P2: Approvals Pipeline", href: "/pipelines", icon: "Layers", badge: "P2" },
      { label: "DISCOM & Feasibility (Sec 12-13)", href: "/projects/NIRT-26-0042", icon: "FileText", tabTarget: "discom_subsidy" },
      { label: "Net Metering (Sec 19)", href: "/projects/NIRT-26-0042", icon: "Zap", tabTarget: "net_metering" },
      { label: "Statutory Approvals Hub", href: "/approvals", icon: "ShieldCheck", badge: "Sec 33" }
    ],
    assignedSteps: [
      { step: "08", name: "KYC & Document Verification", pipeline: "P2", status: "Customer KYC" },
      { step: "09", name: "DISCOM Portal Application", pipeline: "P2", status: "Online Filing" },
      { step: "10", name: "Technical Feasibility Sanction", pipeline: "P2", status: "DT Headroom" },
      { step: "17", name: "Bi-Directional Net Meter Sync", pipeline: "P4", status: "TNEB Metering" }
    ],
    spotlightTabs: ["discom_subsidy", "inspection", "net_metering", "approvals", "documents"]
  },

  accounts_officer: {
    roleId: "accounts_officer",
    departmentName: "Finance & Commercial Accounts",
    shortCode: "ACCOUNTS",
    color: "text-rose-700 bg-rose-50 border-rose-200",
    pipelineKey: "approvals",
    pipelineCode: "P2",
    menuItems: [
      { label: "Accounts & Financial Desk", href: "/", icon: "IndianRupee" },
      { label: "Financial Dashboard", href: "/dashboards", icon: "BarChart3", badge: "Sec 26.4" },
      { label: "Advance 80% Hard-Lock (Sec 10)", href: "/projects/NIRT-26-0042", icon: "CreditCard", tabTarget: "financials" },
      { label: "Final Payment & NOC (Sec 20)", href: "/projects/NIRT-26-0042", icon: "CheckCircle2", tabTarget: "final_payment" },
      { label: "Payment Outstanding MIS", href: "/reports", icon: "FileSpreadsheet", badge: "MIS #16" },
      { label: "Billing Approvals", href: "/approvals", icon: "ShieldCheck" }
    ],
    assignedSteps: [
      { step: "07", name: "80% Advance Hard-Lock Clearance", pipeline: "P2", status: "Hard-Gate" },
      { step: "16", name: "Interim Milestone Invoicing", pipeline: "P4", status: "Pre-Commissioning" },
      { step: "18", name: "Final Settlement & No-Dues NOC", pipeline: "P5", status: "Full Payment" }
    ],
    spotlightTabs: ["financials", "final_payment", "approvals", "documents", "communication"]
  },

  subsidy_coordinator: {
    roleId: "subsidy_coordinator",
    departmentName: "PM Surya Ghar National Portal",
    shortCode: "SUBSIDY",
    color: "text-cyan-700 bg-cyan-50 border-cyan-200",
    pipelineKey: "subsidy",
    pipelineCode: "P5",
    menuItems: [
      { label: "PM Surya Ghar Desk", href: "/", icon: "Landmark" },
      { label: "P5: Subsidy & Closure Pipeline", href: "/pipelines", icon: "Layers", badge: "P5" },
      { label: "Subsidy DBT Console (Sec 21)", href: "/projects/NIRT-26-0042", icon: "Landmark", tabTarget: "subsidy_management" },
      { label: "Project Closure & Handover", href: "/projects/NIRT-26-0042", icon: "Award", tabTarget: "project_closure" },
      { label: "Subsidy Status MIS Report", href: "/reports", icon: "FileSpreadsheet", badge: "MIS #17" }
    ],
    assignedSteps: [
      { step: "19", name: "PM Surya Ghar Subsidy Claim", pipeline: "P5", status: "National Portal" },
      { step: "20", name: "DBT Subsidy Credit Verification", pipeline: "P5", status: "Bank Credit" }
    ],
    spotlightTabs: ["subsidy_management", "project_closure", "documents", "communication"]
  },

  // Managing Director & PMO (Master Access)
  managing_director: {
    roleId: "managing_director",
    departmentName: "Executive Command & Governance",
    shortCode: "MD",
    color: "text-slate-900 bg-slate-100 border-slate-300",
    pipelineKey: "all",
    pipelineCode: "ALL",
    menuItems: [
      { label: "Executive Command Home", href: "/", icon: "LayoutDashboard" },
      { label: "5-Pillar Dashboards", href: "/dashboards", icon: "BarChart3", badge: "Sec 26" },
      { label: "22 Management MIS Reports", href: "/reports", icon: "FileSpreadsheet", badge: "Sec 27" },
      { label: "Master 5-Pipeline (20 Steps)", href: "/pipelines", icon: "Layers", badge: "20" },
      { label: "Projects Master Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Approvals Governance Hub", href: "/approvals", icon: "ShieldCheck", badge: "Sec 33" },
      { label: "Forensic Audit Trail", href: "/audit", icon: "ShieldAlert", badge: "Sec 34" },
      { label: "Service & Complaints (AMC)", href: "/service", icon: "Headset", badge: "Sec 35" },
      { label: "Mobile Field Hub (PWA)", href: "/field", icon: "Smartphone", badge: "Sec 32" }
    ],
    assignedSteps: [
      { step: "P1", name: "Sales & Feasibility", pipeline: "01-06", status: "Active Pipeline" },
      { step: "P2", name: "Advance & Approvals", pipeline: "07-10", status: "Hard-Gate" },
      { step: "P3", name: "Procurement & Stores", pipeline: "11-13", status: "Supply Chain" },
      { step: "P4", name: "EPC Site Execution", pipeline: "14-17", status: "Installation" },
      { step: "P5", name: "Subsidy & Triple Closure", pipeline: "18-20", status: "Settlement" }
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
      { label: "5-Pillar Dashboards", href: "/dashboards", icon: "BarChart3", badge: "Sec 26" },
      { label: "22 Management MIS Reports", href: "/reports", icon: "FileSpreadsheet", badge: "Sec 27" },
      { label: "Master 5-Pipeline (20 Steps)", href: "/pipelines", icon: "Layers", badge: "20" },
      { label: "Projects Master Registry", href: "/projects", icon: "FolderKanban" },
      { label: "Approvals Governance Hub", href: "/approvals", icon: "ShieldCheck", badge: "Sec 33" },
      { label: "Forensic Audit Trail", href: "/audit", icon: "ShieldAlert", badge: "Sec 34" },
      { label: "Service & Complaints (AMC)", href: "/service", icon: "Headset", badge: "Sec 35" }
    ],
    assignedSteps: [
      { step: "P1", name: "Sales & Feasibility", pipeline: "01-06", status: "Active Pipeline" },
      { step: "P2", name: "Advance & Approvals", pipeline: "07-10", status: "Hard-Gate" },
      { step: "P3", name: "Procurement & Stores", pipeline: "11-13", status: "Supply Chain" },
      { step: "P4", name: "EPC Site Execution", pipeline: "14-17", status: "Installation" },
      { step: "P5", name: "Subsidy & Triple Closure", pipeline: "18-20", status: "Settlement" }
    ],
    spotlightTabs: "ALL"
  }
};
