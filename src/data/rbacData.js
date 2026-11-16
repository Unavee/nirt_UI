// NIRT Solar EPC CRM - Role-Based Access Control (RBAC) & Permission Matrix Data Model
// 14 Roles (3 Administrator Tier, 11 Regular Department Tier) × 10 CRM Modules × 6 Standard Actions

export const RBAC_MODULE_GROUPS = [
  {
    id: "pipelines",
    title: "Pipelines",
    description: "Core revenue generation and delivery workflows",
    moduleIds: ["dashboard", "sales", "execution", "subsidy"]
  },
  {
    id: "operations",
    title: "Operations & Finance",
    description: "Supply chain, commercial payments, and stage clearances",
    moduleIds: ["finance", "procurement", "approvals"]
  },
  {
    id: "governance",
    title: "Governance",
    description: "Enterprise compliance, audit trails, and system access",
    moduleIds: ["rbac", "audit", "gap_analysis"]
  }
];

export const RBAC_MODULES = [
  // 1. Pipelines
  {
    id: "dashboard",
    name: "Executive Dashboard",
    category: "pipelines",
    description: "Master overview, revenue metrics, KPI charts and pipeline velocity"
  },
  {
    id: "sales",
    name: "Sales Pipeline (S1)",
    category: "pipelines",
    description: "Inquiry intake, roof survey, DPR CAD design, quotation and work orders"
  },
  {
    id: "execution",
    name: "Execution Pipeline (S2)",
    category: "pipelines",
    description: "Vendor POs, warehouse GRN, civil & electrical EPC, net metering sync"
  },
  {
    id: "subsidy",
    name: "Subsidy Flow Pipeline (S3)",
    category: "pipelines",
    description: "PM Surya Ghar portal claims, DISCOM commissioning cert, DBT release"
  },

  // 2. Operations & Finance
  {
    id: "finance",
    name: "Commercial Finance & Payments",
    category: "operations",
    description: "80% advance gatekeeper, 10% installation balance, 10% final settlement"
  },
  {
    id: "procurement",
    name: "Stores, Inventory & Procurement",
    category: "operations",
    description: "Tier-1 TopCon BOM, inverter purchase orders, warehouse delivery kits"
  },
  {
    id: "approvals",
    name: "Departmental Gate Approvals",
    category: "operations",
    description: "Pre-execution clearances, commercial discounts >5%, DISCOM filings"
  },

  // 3. Governance
  {
    id: "rbac",
    name: "RBAC & User Administration",
    category: "governance",
    description: "Role permissions, credential resets, tier assignments, session locks"
  },
  {
    id: "audit",
    name: "Forensic Audit Trail",
    category: "governance",
    description: "Immutable append-only timestamped system log with tamper-proof records"
  },
  {
    id: "gap_analysis",
    name: "Gap & Bottleneck Analysis",
    category: "governance",
    description: "SLA deviations, stage aging analysis, project blockage root-cause tracking"
  }
];

export const RBAC_ACTIONS = [
  { id: "view", label: "View", desc: "Read-only inspection of module records" },
  { id: "create", label: "Create", desc: "Add new leads, records, POs, or entries" },
  { id: "edit", label: "Edit", desc: "Update existing project details and field data" },
  { id: "approve", label: "Approve", desc: "Authorize stage-gate advancement and sign-offs" },
  { id: "delete", label: "Delete", desc: "Purge or archive records (restricted)" },
  { id: "export", label: "Export", desc: "Download CSV, Excel, or PDF audit reports" }
];

export const RBAC_ROLES = [
  // Administrator Tier (3 Roles)
  {
    id: "super_admin",
    name: "Super Administrator",
    tier: "Administrator",
    department: "Executive Governance",
    defaultStaff: "Er. A. Syed",
    staffEmail: "admin@nirt.net",
    staffPhone: "+91 96550 01122",
    description: "Full root governance across all 3 pipelines, user provisioning, security policies & immutable audit log.",
    contextRoleId: "managing_director",
    isSuperAdmin: true
  },
  {
    id: "management",
    name: "Executive Leadership / MD",
    tier: "Administrator",
    department: "Executive Management",
    defaultStaff: "Dr. G. Khaja Nazeemudin",
    staffEmail: "nazeemudin@nirt.net",
    staffPhone: "+91 96550 46464",
    description: "Strategic enterprise oversight, monthly revenue margin sign-offs, and commercial discount thresholds.",
    contextRoleId: "managing_director",
    isSuperAdmin: false
  },
  {
    id: "project_manager",
    name: "Central PMO Coordinator",
    tier: "Administrator",
    department: "Central PMO",
    defaultStaff: "Er. R. Senthil Kumar",
    staffEmail: "senthil.kumar@nirt.net",
    staffPhone: "+91 94432 18899",
    description: "Cross-pipeline gate enforcement, stage advancement governance, and inter-department SLA tracking.",
    contextRoleId: "project_coordinator",
    isSuperAdmin: false
  },

  // Regular Department Tier (11 Roles)
  {
    id: "crm_executive",
    name: "Sales Intake Executive",
    tier: "Regular Department",
    department: "Sales & Inward Desk",
    defaultStaff: "S. Priya",
    staffEmail: "priya.sales@nirt.net",
    staffPhone: "+91 98421 11201",
    description: "Omnichannel lead intake, deduplication, TANGEDCO consumer verification, and field qualification.",
    contextRoleId: "sales_rep",
    isSuperAdmin: false
  },
  {
    id: "sales_team",
    name: "Field Sales Representative",
    tier: "Regular Department",
    department: "Technical Sales",
    defaultStaff: "M. Karthik",
    staffEmail: "karthik.sales@nirt.net",
    staffPhone: "+91 98421 22302",
    description: "Customer technical sizing, quotation generation, proposal delivery, and 80% work order booking.",
    contextRoleId: "sales_rep",
    isSuperAdmin: false
  },
  {
    id: "site_survey_team",
    name: "Site Survey Engineer",
    tier: "Regular Department",
    department: "Technical Feasibility",
    defaultStaff: "K. Vignesh",
    staffEmail: "vignesh.survey@nirt.net",
    staffPhone: "+91 98421 33403",
    description: "Roof physical dimensions, tape measurements, shadow analysis, and 4 mandatory geo-tagged photos.",
    contextRoleId: "site_surveyor",
    isSuperAdmin: false
  },
  {
    id: "design_team",
    name: "Design / CAD DPR Engineer",
    tier: "Regular Department",
    department: "Design & Engineering",
    defaultStaff: "Er. B. Anitha",
    staffEmail: "anitha.cad@nirt.net",
    staffPhone: "+91 98421 44504",
    description: "System DPR preparation, Single Line Diagrams (SLD), string sizing, and CAD roof layouts.",
    contextRoleId: "project_coordinator",
    isSuperAdmin: false
  },
  {
    id: "purchase_team",
    name: "Purchase & Procurement Lead",
    tier: "Regular Department",
    department: "Supply Chain & Purchase",
    defaultStaff: "T. Rajan",
    staffEmail: "rajan.purchase@nirt.net",
    staffPhone: "+91 98421 55605",
    description: "Tier-1 TopCon solar module and string inverter vendor purchase orders and vendor terms.",
    contextRoleId: "warehouse_manager",
    isSuperAdmin: false
  },
  {
    id: "store_team",
    name: "Store & Warehouse Manager",
    tier: "Regular Department",
    department: "Warehouse & Logistics",
    defaultStaff: "V. Murugan",
    staffEmail: "murugan.store@nirt.net",
    staffPhone: "+91 98421 66706",
    description: "Inward QC inspections, barcode scanning, Goods Received Notes (GRN), and site kit dispatch.",
    contextRoleId: "warehouse_manager",
    isSuperAdmin: false
  },
  {
    id: "installation_team",
    name: "EPC Field Construction Lead",
    tier: "Regular Department",
    department: "EPC Field Operations",
    defaultStaff: "Er. M. Suresh",
    staffEmail: "suresh.epc@nirt.net",
    staffPhone: "+91 98421 77807",
    description: "Mechanical structure erection, inverter mounting, AC/DC cabling, and earthing test (<5 Ω).",
    contextRoleId: "epc_manager",
    isSuperAdmin: false
  },
  {
    id: "accounts_team",
    name: "Commercial Accounts Officer",
    tier: "Regular Department",
    department: "Commercial Finance",
    defaultStaff: "CA. R. Deepa",
    staffEmail: "deepa.accounts@nirt.net",
    staffPhone: "+91 98421 88908",
    description: "Commercial payment verification: 80% advance gatekeeper, 10% installation, and 10% final.",
    contextRoleId: "accounts_officer",
    isSuperAdmin: false
  },
  {
    id: "liaison_team",
    name: "TANGEDCO Liaison Officer",
    tier: "Regular Department",
    department: "Regulatory & DISCOM",
    defaultStaff: "P. Senthil",
    staffEmail: "senthil.liaison@nirt.net",
    staffPhone: "+91 98421 99009",
    description: "TANGEDCO portal filing, technical feasibility sanction, CEIG inspection, and bi-directional meter.",
    contextRoleId: "liaison_officer",
    isSuperAdmin: false
  },
  {
    id: "subsidy_team",
    name: "Government Subsidy Coordinator",
    tier: "Regular Department",
    department: "Central Subsidy Desk",
    defaultStaff: "N. Lakshmi",
    staffEmail: "lakshmi.subsidy@nirt.net",
    staffPhone: "+91 98421 00110",
    description: "National PM Surya Ghar portal submission, commissioning cert upload, and DBT subsidy release.",
    contextRoleId: "subsidy_desk",
    isSuperAdmin: false
  },
  {
    id: "customer",
    name: "Customer Portal Desk",
    tier: "Regular Department",
    department: "Client & Handover",
    defaultStaff: "Valued Client",
    staffEmail: "customer.portal@nirt.net",
    staffPhone: "+91 98421 00000",
    description: "Customer milestone visibility, real-time stage tracking, warranty cards, and handover sign-off.",
    contextRoleId: "managing_director",
    isSuperAdmin: false
  }
];

// Helper to generate a blank matrix
const buildEmptyMatrix = () => {
  const matrix = {};
  RBAC_ROLES.forEach(role => {
    matrix[role.id] = {};
    RBAC_MODULES.forEach(mod => {
      matrix[role.id][mod.id] = {
        view: false,
        create: false,
        edit: false,
        approve: false,
        delete: false,
        export: false
      };
    });
  });
  return matrix;
};

// Default Enterprise Matrix Configuration (100% compliant with standard NIRT Solar SOP)
export const DEFAULT_RBAC_MATRIX = (() => {
  const m = buildEmptyMatrix();

  // 1. Super Admin: Full Root Access (60/60)
  RBAC_MODULES.forEach(mod => {
    m.super_admin[mod.id] = { view: true, create: true, edit: true, approve: true, delete: true, export: true };
  });

  // 2. Executive Management: 52/60 (View all, approve all, export all, edit pipelines & finance, cannot delete audit or RBAC)
  RBAC_MODULES.forEach(mod => {
    m.management[mod.id] = { view: true, create: false, edit: false, approve: true, delete: false, export: true };
  });
  ["dashboard", "sales", "execution", "subsidy", "finance", "approvals"].forEach(modId => {
    m.management[modId].create = true;
    m.management[modId].edit = true;
  });

  // 3. Central PMO Coordinator: 46/60 (Pipeline control, approvals, stage advancement, audit view)
  RBAC_MODULES.forEach(mod => {
    m.project_manager[mod.id] = { view: true, create: false, edit: false, approve: false, delete: false, export: true };
  });
  ["dashboard", "sales", "execution", "subsidy", "approvals", "gap_analysis"].forEach(modId => {
    m.project_manager[modId].create = true;
    m.project_manager[modId].edit = true;
    m.project_manager[modId].approve = true;
  });
  m.project_manager.procurement.edit = true;
  m.project_manager.finance.view = true;
  m.project_manager.rbac.view = true;
  m.project_manager.audit.view = true;

  // 4. Sales Intake Executive: 16/60 (Lead intake, qualification, sales dashboard)
  m.crm_executive.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.crm_executive.sales = { view: true, create: true, edit: true, approve: false, delete: false, export: true };
  m.crm_executive.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.crm_executive.subsidy = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.crm_executive.approvals = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.crm_executive.gap_analysis = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  // 5. Field Sales Representative: 24/60 (Quotation, work order closing, sales export)
  m.sales_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.sales_team.sales = { view: true, create: true, edit: true, approve: false, delete: false, export: true };
  m.sales_team.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.sales_team.subsidy = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.sales_team.finance = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.sales_team.approvals = { view: true, create: true, edit: false, approve: false, delete: false, export: false };
  m.sales_team.gap_analysis = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  // 6. Site Survey Engineer: 14/60 (Upload survey dimensions & 4 geo photos)
  m.site_survey_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.site_survey_team.sales = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.site_survey_team.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.site_survey_team.approvals = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  // 7. Design / CAD DPR Engineer: 16/60 (SLD diagrams, DPR generation)
  m.design_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.design_team.sales = { view: true, create: false, edit: true, approve: true, delete: false, export: true };
  m.design_team.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.design_team.procurement = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  // 8. Purchase & Procurement Lead: 20/60 (Vendor POs, Tier-1 module purchase)
  m.purchase_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.purchase_team.execution = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.purchase_team.procurement = { view: true, create: true, edit: true, approve: true, delete: false, export: true };
  m.purchase_team.finance = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.purchase_team.approvals = { view: true, create: true, edit: false, approve: false, delete: false, export: false };

  // 9. Store & Warehouse Manager: 18/60 (Warehouse QC, GRN generation, site kit dispatch)
  m.store_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.store_team.execution = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.store_team.procurement = { view: true, create: true, edit: true, approve: true, delete: false, export: true };
  m.store_team.approvals = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  // 10. EPC Field Construction Lead: 16/60 (Structure mounting, electrical wiring <5Ω, inverter logs)
  m.installation_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.installation_team.execution = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.installation_team.procurement = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.installation_team.approvals = { view: true, create: true, edit: false, approve: false, delete: false, export: false };

  // 11. Commercial Accounts Officer: 26/60 (80% advance gatekeeper, 10% install, 10% final)
  m.accounts_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: true };
  m.accounts_team.sales = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.accounts_team.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.accounts_team.subsidy = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.accounts_team.finance = { view: true, create: true, edit: true, approve: true, delete: false, export: true };
  m.accounts_team.procurement = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.accounts_team.approvals = { view: true, create: true, edit: true, approve: true, delete: false, export: true };

  // 12. TANGEDCO Liaison Officer: 18/60 (DISCOM portal filing, technical feasibility, net meter)
  m.liaison_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.liaison_team.execution = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.liaison_team.subsidy = { view: true, create: false, edit: true, approve: false, delete: false, export: false };
  m.liaison_team.approvals = { view: true, create: true, edit: false, approve: false, delete: false, export: false };

  // 13. Government Subsidy Coordinator: 20/60 (PM Surya Ghar portal claims, DBT audit)
  m.subsidy_team.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.subsidy_team.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.subsidy_team.subsidy = { view: true, create: true, edit: true, approve: true, delete: false, export: true };
  m.subsidy_team.finance = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.subsidy_team.approvals = { view: true, create: true, edit: false, approve: false, delete: false, export: false };

  // 14. Customer Portal Desk: 4/60 (Read-only stage visibility)
  m.customer.dashboard = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.customer.sales = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.customer.execution = { view: true, create: false, edit: false, approve: false, delete: false, export: false };
  m.customer.subsidy = { view: true, create: false, edit: false, approve: false, delete: false, export: false };

  return m;
})();

// Calculate permissions count and coverage % for a given role
export const getRolePermissionsStats = (roleId, matrix = DEFAULT_RBAC_MATRIX) => {
  const roleMatrix = matrix[roleId] || {};
  let granted = 0;
  const total = RBAC_MODULES.length * RBAC_ACTIONS.length; // 10 * 6 = 60

  RBAC_MODULES.forEach(mod => {
    const modActions = roleMatrix[mod.id] || {};
    RBAC_ACTIONS.forEach(act => {
      if (modActions[act.id]) granted += 1;
    });
  });

  const percentage = Math.round((granted / total) * 100);
  return { granted, total, percentage };
};

// Check if a specific cell is protected from self-lockout
export const isProtectedCell = (roleId, moduleId, actionId) => {
  // Super Admin cannot disable view, edit, or delete on RBAC module
  if (roleId === "super_admin" && moduleId === "rbac" && ["view", "edit", "delete"].includes(actionId)) {
    return true;
  }
  return false;
};

// Export matrix to CSV format
export const exportMatrixToCSV = (matrix) => {
  const headers = ["Role ID", "Role Name", "Tier", "Department", "Staff Member", "Granted", "Coverage %"];
  RBAC_MODULES.forEach(mod => {
    RBAC_ACTIONS.forEach(act => {
      headers.push(`${mod.name} [${act.label}]`);
    });
  });

  const rows = [headers.join(",")];

  RBAC_ROLES.forEach(role => {
    const stats = getRolePermissionsStats(role.id, matrix);
    const row = [
      `"${role.id}"`,
      `"${role.name}"`,
      `"${role.tier}"`,
      `"${role.department}"`,
      `"${role.defaultStaff}"`,
      `"${stats.granted}/${stats.total}"`,
      `"${stats.percentage}%"`
    ];

    RBAC_MODULES.forEach(mod => {
      const actions = matrix[role.id]?.[mod.id] || {};
      RBAC_ACTIONS.forEach(act => {
        row.push(actions[act.id] ? '"YES"' : '"NO"');
      });
    });

    rows.push(row.join(","));
  });

  return rows.join("\r\n");
};

// Trigger browser file download
export const downloadFile = (content, fileName, mimeType) => {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};
