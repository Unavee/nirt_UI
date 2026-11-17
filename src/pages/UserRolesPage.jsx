import { useState, useEffect, useMemo, Fragment } from "react";
import { Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { 
  RBAC_MODULE_GROUPS, 
  RBAC_MODULES, 
  RBAC_ACTIONS, 
  RBAC_ROLES, 
  DEFAULT_RBAC_MATRIX, 
  getRolePermissionsStats, 
  isProtectedCell, 
  exportMatrixToCSV, 
  downloadFile 
} from "@/data/rbacData";
import {
  Shield,
  ShieldCheck,
  ShieldAlert,
  Search,
  Download,
  FileSpreadsheet,
  FileJson,
  RotateCcw,
  Check,
  CheckCircle2,
  Lock,
  Users,
  Building2,
  Layers,
  Eye,
  Plus,
  Edit,
  Trash2,
  CheckSquare,
  Square,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  UserCheck,
  UserPlus,
  Mail,
  Phone,
  Radio,
  X
} from "lucide-react";

export default function UserRoleManagementPage() {
  const { activeRole, activeRbacRoleId, switchRole, addAuditEntry } = useRole();

  // Primary View Mode: "matrix" (RBAC Permission Matrix) | "directory" (Staff & User Directory)
  const [viewMode, setViewMode] = useState("matrix");

  // Inspected Role in Master-Detail Pane (defaults to active session role or super_admin)
  const [selectedRoleId, setSelectedRoleId] = useState(() => {
    return activeRbacRoleId || "super_admin";
  });

  // Role Directory Search & Tier Filters
  const [roleSearchQuery, setRoleSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState("all"); // "all" | "Administrator" | "Regular Department"

  // Live Permission Matrix State (persistent in localStorage)
  const [matrixState, setMatrixState] = useState(() => {
    try {
      const saved = localStorage.getItem("nirt_rbac_matrix_v2");
      if (saved) return JSON.parse(saved);
    } catch {
      // LocalStorage error fallback
    }
    return DEFAULT_RBAC_MATRIX;
  });

  // Last Saved & Audited Timestamp Indicator
  const [lastSavedTimestamp, setLastSavedTimestamp] = useState(() => {
    return new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    }).format(new Date()) + " IST";
  });
  const [showSavedPulse, setShowSavedPulse] = useState(false);

  // Confirmation Modals
  const [isResetModalOpen, setIsResetModalOpen] = useState(false);
  const [statusNotice, setStatusNotice] = useState(null);

  // Sync selected role when activeRbacRoleId changes externally
  useEffect(() => {
    if (activeRbacRoleId && !selectedRoleId) {
      setSelectedRoleId(activeRbacRoleId);
    }
  }, [activeRbacRoleId]);

  const showNotification = (msg) => {
    setStatusNotice(msg);
    setTimeout(() => setStatusNotice(null), 3500);
  };

  // Helper to persist matrix updates and trigger inline audit indicator
  const commitMatrixUpdate = (newMatrix, logDescription = "Permission updated") => {
    setMatrixState(newMatrix);
    try {
      localStorage.setItem("nirt_rbac_matrix_v2", JSON.stringify(newMatrix));
    } catch {
      // Storage fallback
    }

    const timestamp = new Intl.DateTimeFormat("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata"
    }).format(new Date()) + " IST";

    setLastSavedTimestamp(timestamp);
    setShowSavedPulse(true);
    setTimeout(() => setShowSavedPulse(false), 2000);

    // Append to forensic audit log
    if (addAuditEntry) {
      addAuditEntry({
        staffName: activeRole?.title || "Super Admin",
        projectId: "RBAC-GOVERNANCE",
        clientName: "System Security Policy",
        step: "RBAC Matrix",
        field: "Role Permissions",
        oldValue: "Previous Policy",
        newValue: logDescription,
        reason: "Role access governance adjustment"
      });
    }
  };

  // Filtered Roles for Left Pane
  const filteredRoles = useMemo(() => {
    return RBAC_ROLES.filter((role) => {
      const matchesTier = 
        tierFilter === "all" ? true : role.tier === tierFilter;
      const q = roleSearchQuery.toLowerCase().trim();
      const matchesSearch = 
        !q ||
        role.name.toLowerCase().includes(q) ||
        role.department.toLowerCase().includes(q) ||
        role.defaultStaff.toLowerCase().includes(q) ||
        role.id.toLowerCase().includes(q);

      return matchesTier && matchesSearch;
    });
  }, [roleSearchQuery, tierFilter]);

  // Selected Role Object
  const inspectedRole = useMemo(() => {
    return RBAC_ROLES.find((r) => r.id === selectedRoleId) || RBAC_ROLES[0];
  }, [selectedRoleId]);

  // Selected Role Permissions Stats
  const inspectedStats = useMemo(() => {
    return getRolePermissionsStats(inspectedRole.id, matrixState);
  }, [inspectedRole.id, matrixState]);

  // Active Session Role Stats
  const activeSessionStats = useMemo(() => {
    const roleId = activeRbacRoleId || "super_admin";
    const roleObj = RBAC_ROLES.find((r) => r.id === roleId) || RBAC_ROLES[0];
    return {
      role: roleObj,
      stats: getRolePermissionsStats(roleObj.id, matrixState)
    };
  }, [activeRbacRoleId, matrixState]);

  // Toggle Single Action Cell
  const handleToggleAction = (moduleId, actionId) => {
    if (isProtectedCell(inspectedRole.id, moduleId, actionId)) {
      showNotification("Protected cell: Super Administrator RBAC permissions cannot be disabled.");
      return;
    }

    const currentVal = matrixState[inspectedRole.id]?.[moduleId]?.[actionId] || false;
    const nextVal = !currentVal;

    const updated = {
      ...matrixState,
      [inspectedRole.id]: {
        ...matrixState[inspectedRole.id],
        [moduleId]: {
          ...matrixState[inspectedRole.id]?.[moduleId],
          [actionId]: nextVal
        }
      }
    };

    const modName = RBAC_MODULES.find((m) => m.id === moduleId)?.name || moduleId;
    commitMatrixUpdate(
      updated,
      `${inspectedRole.name}: Set ${modName} [${actionId.toUpperCase()}] to ${nextVal ? "GRANTED" : "REVOKED"}`
    );
  };

  // Row-Level Quick Selector: "full" | "view-only" | "none"
  const handleRowQuickSelect = (moduleId, presetType) => {
    const roleId = inspectedRole.id;
    const currentActions = { ...(matrixState[roleId]?.[moduleId] || {}) };

    RBAC_ACTIONS.forEach((action) => {
      if (isProtectedCell(roleId, moduleId, action.id)) {
        // preserve protected cell value
        return;
      }
      if (presetType === "full") {
        currentActions[action.id] = true;
      } else if (presetType === "view-only") {
        currentActions[action.id] = action.id === "view";
      } else if (presetType === "none") {
        currentActions[action.id] = false;
      }
    });

    const updated = {
      ...matrixState,
      [roleId]: {
        ...matrixState[roleId],
        [moduleId]: currentActions
      }
    };

    const modName = RBAC_MODULES.find((m) => m.id === moduleId)?.name || moduleId;
    commitMatrixUpdate(
      updated,
      `${inspectedRole.name}: Applied [${presetType.toUpperCase()}] preset to ${modName}`
    );
  };

  // Bulk Control 1: Grant Read-Only to All Modules
  const handleGrantReadOnlyAll = () => {
    const roleId = inspectedRole.id;
    const updatedRoleMatrix = {};

    RBAC_MODULES.forEach((mod) => {
      updatedRoleMatrix[mod.id] = {};
      RBAC_ACTIONS.forEach((act) => {
        if (isProtectedCell(roleId, mod.id, act.id)) {
          updatedRoleMatrix[mod.id][act.id] = matrixState[roleId]?.[mod.id]?.[act.id] ?? true;
        } else {
          updatedRoleMatrix[mod.id][act.id] = act.id === "view";
        }
      });
    });

    const updated = {
      ...matrixState,
      [roleId]: updatedRoleMatrix
    };

    commitMatrixUpdate(updated, `${inspectedRole.name}: Set Read-Only access across all 10 modules`);
    showNotification(`Applied Read-Only preset to ${inspectedRole.name}`);
  };

  // Bulk Control 2: Clear Non-Core Permissions (Reset to SOP baseline for this role)
  const handleClearNonCore = () => {
    const roleId = inspectedRole.id;
    const defaultForRole = DEFAULT_RBAC_MATRIX[roleId] || {};

    const updated = {
      ...matrixState,
      [roleId]: JSON.parse(JSON.stringify(defaultForRole))
    };

    commitMatrixUpdate(updated, `${inspectedRole.name}: Restored baseline SOP permissions`);
    showNotification(`Restored ${inspectedRole.name} to standard SOP baseline`);
  };

  // Bulk Control 3: Column Header "Toggle All" across 10 modules
  const handleToggleColumnAll = (actionId) => {
    const roleId = inspectedRole.id;
    const currentActions = matrixState[roleId] || {};

    // Check if all unblocked modules currently have this action set to true
    let allEnabled = true;
    RBAC_MODULES.forEach((mod) => {
      if (!isProtectedCell(roleId, mod.id, actionId)) {
        if (!currentActions[mod.id]?.[actionId]) {
          allEnabled = false;
        }
      }
    });

    const targetVal = !allEnabled;
    const updatedRoleMatrix = { ...currentActions };

    RBAC_MODULES.forEach((mod) => {
      if (!isProtectedCell(roleId, mod.id, actionId)) {
        updatedRoleMatrix[mod.id] = {
          ...(updatedRoleMatrix[mod.id] || {}),
          [actionId]: targetVal
        };
      }
    });

    const updated = {
      ...matrixState,
      [roleId]: updatedRoleMatrix
    };

    commitMatrixUpdate(
      updated,
      `${inspectedRole.name}: Toggled all [${actionId.toUpperCase()}] permissions to ${targetVal ? "ENABLED" : "DISABLED"}`
    );
  };

  // Reset Default Matrix to Standard SOP
  const handleResetToDefaults = () => {
    setMatrixState(DEFAULT_RBAC_MATRIX);
    try {
      localStorage.setItem("nirt_rbac_matrix_v2", JSON.stringify(DEFAULT_RBAC_MATRIX));
    } catch {
      // Storage fallback
    }

    commitMatrixUpdate(DEFAULT_RBAC_MATRIX, "Full RBAC Matrix reset to SOP defaults");
    setIsResetModalOpen(false);
    showNotification("All 14 roles restored to initial SOP permissions.");
  };

  // Export CSV
  const handleExportCSV = () => {
    const csvContent = exportMatrixToCSV(matrixState);
    downloadFile(csvContent, "NIRT_Solar_RBAC_Permission_Matrix.csv", "text/csv;charset=utf-8;");
    showNotification("Exported RBAC Permission Matrix as CSV");
  };

  // Export JSON
  const handleExportJSON = () => {
    const exportData = {
      meta: {
        organization: "NIRT Renewable Energy Private Limited",
        generatedAt: new Date().toISOString(),
        version: "2.4.0",
        totalRoles: RBAC_ROLES.length,
        totalModules: RBAC_MODULES.length,
        actions: RBAC_ACTIONS.map((a) => a.id)
      },
      roles: RBAC_ROLES,
      matrix: matrixState
    };
    const jsonStr = JSON.stringify(exportData, null, 2);
    downloadFile(jsonStr, "NIRT_Solar_RBAC_Matrix.json", "application/json");
    showNotification("Downloaded RBAC JSON configuration");
  };

  // Activate Test Session as Inspected Role
  const handleTestSession = (role) => {
    switchRole(role.id);
    showNotification(`Active session switched to ${role.name} (${role.tier})`);
  };

  // User / Staff Directory Mock Data (retaining staff management capabilities)
  const [usersList, setUsersList] = useState([
    {
      id: "NIRT-EMP-001",
      name: "Er. A. Syed",
      email: "admin@nirt.net",
      phone: "+91 96550 01122",
      roleId: "super_admin",
      roleTitle: "Super Administrator",
      department: "Executive Governance",
      status: "Active",
      lastLogin: "Today, 08:15 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-002",
      name: "Dr. G. Khaja Nazeemudin",
      email: "nazeemudin@nirt.net",
      phone: "+91 96550 46464",
      roleId: "management",
      roleTitle: "Executive Leadership / MD",
      department: "Executive Management",
      status: "Active",
      lastLogin: "Today, 08:45 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-003",
      name: "Er. R. Senthil Kumar",
      email: "senthil.kumar@nirt.net",
      phone: "+91 94432 18899",
      roleId: "project_manager",
      roleTitle: "Central PMO Coordinator",
      department: "Central PMO",
      status: "Active",
      lastLogin: "Today, 09:02 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-004",
      name: "S. Priya",
      email: "priya.sales@nirt.net",
      phone: "+91 98421 11201",
      roleId: "crm_executive",
      roleTitle: "Sales Intake Executive",
      department: "Sales & Inward Desk",
      status: "Active",
      lastLogin: "Today, 09:15 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-005",
      name: "M. Karthik",
      email: "karthik.sales@nirt.net",
      phone: "+91 98421 22302",
      roleId: "sales_team",
      roleTitle: "Field Sales Representative",
      department: "Technical Sales",
      status: "Active",
      lastLogin: "Today, 09:20 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-006",
      name: "K. Vignesh",
      email: "vignesh.survey@nirt.net",
      phone: "+91 98421 33403",
      roleId: "site_survey_team",
      roleTitle: "Site Survey Engineer",
      department: "Technical Feasibility",
      status: "Active",
      lastLogin: "Today, 09:30 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-007",
      name: "Er. B. Anitha",
      email: "anitha.cad@nirt.net",
      phone: "+91 98421 44504",
      roleId: "design_team",
      roleTitle: "Design / CAD DPR Engineer",
      department: "Design & Engineering",
      status: "Active",
      lastLogin: "Today, 09:40 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-008",
      name: "T. Rajan",
      email: "rajan.purchase@nirt.net",
      phone: "+91 98421 55605",
      roleId: "purchase_team",
      roleTitle: "Purchase & Procurement Lead",
      department: "Supply Chain & Purchase",
      status: "Active",
      lastLogin: "Today, 09:45 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-009",
      name: "V. Murugan",
      email: "murugan.store@nirt.net",
      phone: "+91 98421 66706",
      roleId: "store_team",
      roleTitle: "Store & Warehouse Manager",
      department: "Warehouse & Logistics",
      status: "Active",
      lastLogin: "Today, 09:50 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-010",
      name: "Er. M. Suresh",
      email: "suresh.epc@nirt.net",
      phone: "+91 98421 77807",
      roleId: "installation_team",
      roleTitle: "EPC Field Construction Lead",
      department: "EPC Field Operations",
      status: "Active",
      lastLogin: "Today, 10:00 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-011",
      name: "CA. R. Deepa",
      email: "deepa.accounts@nirt.net",
      phone: "+91 98421 88908",
      roleId: "accounts_team",
      roleTitle: "Commercial Accounts Officer",
      department: "Commercial Finance",
      status: "Active",
      lastLogin: "Today, 10:05 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-012",
      name: "P. Senthil",
      email: "senthil.liaison@nirt.net",
      phone: "+91 98421 99009",
      roleId: "liaison_team",
      roleTitle: "TANGEDCO Liaison Officer",
      department: "Regulatory & DISCOM",
      status: "Active",
      lastLogin: "Today, 10:10 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-013",
      name: "N. Lakshmi",
      email: "lakshmi.subsidy@nirt.net",
      phone: "+91 98421 00110",
      roleId: "subsidy_team",
      roleTitle: "Government Subsidy Coordinator",
      department: "Central Subsidy Desk",
      status: "Active",
      lastLogin: "Today, 10:15 AM",
      sessionStatus: "online"
    },
    {
      id: "NIRT-EMP-014",
      name: "Valued Client",
      email: "customer.portal@nirt.net",
      phone: "+91 98421 00000",
      roleId: "customer",
      roleTitle: "Customer Portal Desk",
      department: "Client & Handover",
      status: "Active",
      lastLogin: "Today, 10:20 AM",
      sessionStatus: "offline"
    }
  ]);

  // Provision New User Modal
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [newStaffForm, setNewStaffForm] = useState({
    name: "",
    email: "",
    phone: "",
    roleId: "sales_team",
    department: "Technical Sales"
  });

  const handleCreateUser = (e) => {
    e.preventDefault();
    if (!newStaffForm.name || !newStaffForm.email) return;

    const matchedRole = RBAC_ROLES.find((r) => r.id === newStaffForm.roleId) || RBAC_ROLES[4];
    const newId = `NIRT-EMP-0${usersList.length + 1}`;
    const newUser = {
      id: newId,
      name: newStaffForm.name,
      email: newStaffForm.email,
      phone: newStaffForm.phone || "+91 98421 00000",
      roleId: matchedRole.id,
      roleTitle: matchedRole.name,
      department: matchedRole.department,
      status: "Active",
      lastLogin: "Just now",
      sessionStatus: "online"
    };

    setUsersList([newUser, ...usersList]);
    setIsProvisionModalOpen(false);
    setNewStaffForm({ name: "", email: "", phone: "", roleId: "sales_team", department: "Technical Sales" });
    showNotification(`Provisioned credentials for ${newUser.name}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-16 font-sans">
      {/* Toast Notification */}
      {statusNotice && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-2.5 bg-slate-900 text-white text-xs font-medium rounded-md shadow-lg border border-slate-700 animate-in fade-in slide-in-from-bottom-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{statusNotice}</span>
        </div>
      )}

      {/* Main Container */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        {/* 1. Header & Action Bar */}
        <header className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm mb-6">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-4">
            {/* Title & Concise Subtitle */}
            <div className="space-y-1">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-md bg-slate-900 text-white flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                    Role-Based Access Control & Permission Matrix
                  </h1>
                </div>
              </div>
              {/* <p className="text-xs sm:text-sm text-slate-500 pl-12 max-w-3xl">
                Enterprise access governance distinguishing Administrator from Regular Department tiers with immutable, timestamped audit logging across all 3 pipelines.
              </p> */}
            </div>

            {/* Right-aligned Single-Line Toolbar */}
            <div className="flex flex-wrap items-center gap-2 xl:self-center">
              {/* Search Roles Input */}
              <div className="relative w-48 sm:w-56">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search roles..."
                  value={roleSearchQuery}
                  onChange={(e) => setRoleSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500 focus:border-amber-500 text-slate-800 placeholder-slate-400"
                />
                {roleSearchQuery && (
                  <button
                    onClick={() => setRoleSearchQuery("")}
                    className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Export Matrix CSV */}
              <button
                onClick={handleExportCSV}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 shadow-sm"
                title="Download matrix as CSV"
              >
                <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-600" />
                <span>Export Matrix CSV</span>
              </button>

              {/* Download RBAC JSON */}
              <button
                onClick={handleExportJSON}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 hover:text-slate-900 transition-colors whitespace-nowrap shrink-0 shadow-sm"
                title="Download RBAC configuration JSON"
              >
                <FileJson className="w-3.5 h-3.5 text-blue-600" />
                <span>Download RBAC JSON</span>
              </button>

              {/* Reset Default Matrix */}
              <button
                onClick={() => setIsResetModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-rose-700 bg-rose-50/60 border border-rose-200 rounded-md hover:bg-rose-100/80 transition-colors whitespace-nowrap shrink-0 shadow-sm"
                title="Reset all permissions to SOP baseline"
              >
                <RotateCcw className="w-3.5 h-3.5 text-rose-600" />
                <span>Reset Default Matrix</span>
              </button>

              {/* View Mode Toggle: RBAC Matrix vs Staff Directory */}
              <div className="inline-flex items-center p-0.5 bg-slate-100 border border-slate-200 rounded-md ml-1">
                <button
                  onClick={() => setViewMode("matrix")}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    viewMode === "matrix"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Permission Matrix
                </button>
                <button
                  onClick={() => setViewMode("directory")}
                  className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap ${
                    viewMode === "directory"
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  Staff Directory ({usersList.length})
                </button>
              </div>
            </div>
          </div>

          {/* Compact 4-Stat Summary Strip Below Header (No card-inside-card clutter) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-5 mt-5 border-t border-slate-100">
            {/* Stat 1: Total Roles */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-slate-100 text-slate-700 flex items-center justify-center shrink-0">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Total Roles
                </div>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums leading-tight">
                  14
                  <span className="text-xs font-normal text-slate-500 ml-1.5">Roles</span>
                </div>
              </div>
            </div>

            {/* Stat 2: Administrator Tier */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-amber-50 text-amber-700 flex items-center justify-center shrink-0 border border-amber-200/60">
                <ShieldAlert className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Administrator Tier
                </div>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums leading-tight">
                  3
                  <span className="text-xs font-normal text-slate-500 ml-1.5">Governance</span>
                </div>
              </div>
            </div>

            {/* Stat 3: Regular Department Tier */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-blue-50 text-blue-700 flex items-center justify-center shrink-0 border border-blue-200/60">
                <Users className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Regular Department Tier
                </div>
                <div className="text-lg font-bold text-slate-900 font-mono tabular-nums leading-tight">
                  11
                  <span className="text-xs font-normal text-slate-500 ml-1.5">Departments</span>
                </div>
              </div>
            </div>

            {/* Stat 4: Active Session Role + Coverage */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-200/60">
                <UserCheck className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] font-medium uppercase tracking-wider text-slate-500">
                  Active Session Role
                </div>
                <div className="text-sm font-semibold text-slate-900 truncate max-w-[180px]" title={activeSessionStats.role.name}>
                  {activeSessionStats.role.name}
                </div>
                <div className="text-xs text-slate-600 font-mono tabular-nums">
                  Coverage: <span className="font-semibold text-emerald-700">{activeSessionStats.stats.granted}/60</span> ({activeSessionStats.stats.percentage}%)
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* VIEW 1: RBAC PERMISSION MATRIX (Two-Pane Master-Detail Layout) */}
        {viewMode === "matrix" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* LEFT PANE (4 Columns): Directory of Roles */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-white border border-slate-200 rounded-lg p-4 shadow-sm">
                {/* Pane Title & Tier Tabs */}
                <div className="space-y-3 mb-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                      Roles Directory
                    </span>
                    <span className="text-xs font-mono tabular-nums text-slate-400">
                      {filteredRoles.length} of 14 Roles
                    </span>
                  </div>

                  {/* Tier Tabs: All Roles, Administrators, Regular Users */}
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-md text-center text-xs">
                    <button
                      onClick={() => setTierFilter("all")}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        tierFilter === "all"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      All (14)
                    </button>
                    <button
                      onClick={() => setTierFilter("Administrator")}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        tierFilter === "Administrator"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Admins (3)
                    </button>
                    <button
                      onClick={() => setTierFilter("Regular Department")}
                      className={`py-1.5 px-2 rounded font-medium transition-colors ${
                        tierFilter === "Regular Department"
                          ? "bg-white text-slate-900 shadow-xs"
                          : "text-slate-600 hover:text-slate-900"
                      }`}
                    >
                      Regular (11)
                    </button>
                  </div>
                </div>

                {/* Grouped Directory Listing */}
                <div className="space-y-2 max-h-[720px] overflow-y-auto pr-1">
                  {filteredRoles.length === 0 ? (
                    <div className="py-8 text-center text-xs text-slate-400">
                      No roles match the selected filter.
                    </div>
                  ) : (
                    filteredRoles.map((role) => {
                      const stats = getRolePermissionsStats(role.id, matrixState);
                      const isSelected = role.id === inspectedRole.id;
                      const isActiveSession = (activeRbacRoleId || "super_admin") === role.id;

                      return (
                        <div
                          key={role.id}
                          onClick={() => setSelectedRoleId(role.id)}
                          className={`w-full text-left p-3 rounded-md border transition-all cursor-pointer relative ${
                            isSelected
                              ? "bg-slate-50 border-slate-900 shadow-xs"
                              : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/50"
                          }`}
                        >
                          {/* Active Session Crisp Indicator */}
                          {isActiveSession && (
                            <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5 px-1.5 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded text-[10px] font-medium tracking-tight">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                              Active Session
                            </div>
                          )}

                          {/* Role Name & Tier Tag */}
                          <div className="flex items-center gap-2 pr-24">
                            <h3 className={`text-xs font-semibold leading-tight ${isSelected ? "text-slate-900" : "text-slate-800"}`}>
                              {role.name}
                            </h3>
                          </div>

                          {/* Department & Staff Member */}
                          <div className="mt-1 flex items-center justify-between text-[11px] text-slate-500">
                            <span className="truncate max-w-[160px]">{role.department}</span>
                            <span className="truncate max-w-[120px] font-medium text-slate-600">{role.defaultStaff}</span>
                          </div>

                          {/* Numeric Granted-Permissions Count (Monospace Tabular) */}
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                            <span className="text-slate-400">
                              {role.tier === "Administrator" ? "Admin Tier" : "Department Tier"}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="font-mono tabular-nums font-semibold text-slate-800">
                                {stats.granted}/60
                              </span>
                              <div className="w-12 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                                <div
                                  className={`h-full ${
                                    stats.percentage >= 80
                                      ? "bg-emerald-500"
                                      : stats.percentage >= 40
                                      ? "bg-blue-500"
                                      : "bg-amber-500"
                                  }`}
                                  style={{ width: `${stats.percentage}%` }}
                                ></div>
                              </div>
                              <span className="font-mono tabular-nums text-slate-400 text-[10px]">
                                {stats.percentage}%
                              </span>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>

            {/* RIGHT PANE (8 Columns): Sticky Detail, Bulk Presets & Permission Matrix Table */}
            <div className="lg:col-span-8 space-y-4">
              {/* Sticky Role Header sticky top-4  */}
              

              {/* Quick Preset / Bulk Controls Bar */}
              <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 flex flex-wrap items-center justify-between gap-3 text-xs">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium text-slate-600 mr-1">Role Presets:</span>
                  <button
                    onClick={handleGrantReadOnlyAll}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors whitespace-nowrap font-medium text-[11px]"
                  >
                    Grant Read-Only to All Modules
                  </button>
                  <button
                    onClick={handleClearNonCore}
                    className="px-2.5 py-1 bg-white border border-slate-200 rounded hover:bg-slate-100 text-slate-700 transition-colors whitespace-nowrap font-medium text-[11px]"
                  >
                    Clear Non-Core Permissions
                  </button>
                </div>

                {/* Column-Header "Toggle All" Checkboxes */}
                <div className="flex items-center gap-2 text-[11px]">
                  <span className="text-slate-500">Toggle Column:</span>
                  <div className="flex items-center gap-1.5">
                    {RBAC_ACTIONS.map((act) => (
                      <button
                        key={act.id}
                        onClick={() => handleToggleColumnAll(act.id)}
                        className="px-1.5 py-0.5 bg-white border border-slate-200 rounded hover:border-slate-300 text-slate-700 font-medium text-[10px] uppercase tracking-wider"
                        title={`Toggle all ${act.label} permissions for this role`}
                      >
                        {act.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Permission Matrix Table (10 CRM Modules × 6 Actions) */}
              <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse min-w-[760px]">
                    <thead>
                      <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                        {/* Sticky First Column */}
                        <th className="py-2.5 px-4 w-72 sticky left-0 bg-slate-50 z-10 border-r border-slate-200">
                          CRM Module & Scope
                        </th>
                        <th className="py-2.5 px-3 w-36 text-center border-r border-slate-200">
                          Row Preset
                        </th>
                        {RBAC_ACTIONS.map((action) => (
                          <th key={action.id} className="py-2.5 px-3 text-center w-20">
                            <div>{action.label}</div>
                            <div className="text-[9px] font-normal text-slate-400 capitalize">
                              {action.id}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs">
                      {RBAC_MODULE_GROUPS.map((group) => {
                        const groupModules = RBAC_MODULES.filter((m) => group.moduleIds.includes(m.id));

                        return (
                          <Fragment key={group.id}>
                            {/* Group Header Row */}
                            <tr className="bg-slate-100/70 border-y border-slate-200 font-medium text-slate-700 text-[11px]">
                              <td colSpan={8} className="py-1.5 px-4 sticky left-0 z-10">
                                <span className="font-bold text-slate-900 uppercase tracking-wider mr-2">
                                  {group.title}
                                </span>
                                <span className="text-slate-500 font-normal">
                                  — {group.description}
                                </span>
                              </td>
                            </tr>

                            {/* Group Module Rows */}
                            {groupModules.map((module) => {
                              const moduleActions = matrixState[inspectedRole.id]?.[module.id] || {};
                              
                              // Check if row has full, view-only, or none
                              const isAllChecked = RBAC_ACTIONS.every((a) => moduleActions[a.id]);
                              const isViewOnly = moduleActions.view && RBAC_ACTIONS.filter((a) => a.id !== "view").every((a) => !moduleActions[a.id]);
                              const isNone = RBAC_ACTIONS.every((a) => !moduleActions[a.id]);

                              return (
                                <tr key={module.id} className="hover:bg-slate-50/60 transition-colors">
                                  {/* Sticky Module Info Column */}
                                  <td className="py-3 px-4 sticky left-0 bg-white z-10 border-r border-slate-200">
                                    <div className="font-semibold text-slate-900 leading-tight">
                                      {module.name}
                                    </div>
                                    <div className="text-[11px] text-slate-500 line-clamp-1 mt-0.5">
                                      {module.description}
                                    </div>
                                  </td>

                                  {/* Row-Level "Full / View-Only / None" Quick Selector */}
                                  <td className="py-2.5 px-2 text-center border-r border-slate-200">
                                    <div className="inline-flex rounded-md border border-slate-200 bg-slate-50 p-0.5 text-[10px]">
                                      <button
                                        onClick={() => handleRowQuickSelect(module.id, "full")}
                                        className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                                          isAllChecked ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                                        }`}
                                        title="Grant all 6 actions for this module"
                                      >
                                        Full
                                      </button>
                                      <button
                                        onClick={() => handleRowQuickSelect(module.id, "view-only")}
                                        className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                                          isViewOnly ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                                        }`}
                                        title="View-only access for this module"
                                      >
                                        View
                                      </button>
                                      <button
                                        onClick={() => handleRowQuickSelect(module.id, "none")}
                                        className={`px-1.5 py-0.5 rounded font-medium transition-colors ${
                                          isNone ? "bg-slate-900 text-white" : "text-slate-600 hover:text-slate-900"
                                        }`}
                                        title="Revoke all actions for this module"
                                      >
                                        None
                                      </button>
                                    </div>
                                  </td>

                                  {/* 6 Action Checkbox Cells */}
                                  {RBAC_ACTIONS.map((action) => {
                                    const isGranted = Boolean(moduleActions[action.id]);
                                    const locked = isProtectedCell(inspectedRole.id, module.id, action.id);

                                    return (
                                      <td key={action.id} className="py-2.5 px-3 text-center">
                                        <div className="flex items-center justify-center">
                                          {locked ? (
                                            <div
                                              className="relative group cursor-not-allowed"
                                              title="Protected: Root Administrator RBAC cannot be disabled to prevent accidental lockout"
                                            >
                                              <input
                                                type="checkbox"
                                                checked={true}
                                                disabled
                                                className="w-4 h-4 rounded text-slate-400 bg-slate-200 border-slate-300 cursor-not-allowed opacity-60"
                                              />
                                              <Lock className="w-2.5 h-2.5 text-amber-600 absolute -top-1 -right-1 pointer-events-none" />
                                            </div>
                                          ) : (
                                            <input
                                              type="checkbox"
                                              checked={isGranted}
                                              onChange={() => handleToggleAction(module.id, action.id)}
                                              className="w-4 h-4 rounded text-slate-900 border-slate-300 focus:ring-amber-500 focus:ring-offset-0 cursor-pointer accent-amber-600 transition-colors"
                                            />
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              );
                            })}
                          </Fragment>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Table Footer Summary Bar */}
                <div className="bg-slate-50 border-t border-slate-200 p-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-slate-900">Current Role Coverage:</span>
                    <span className="font-mono tabular-nums font-semibold text-slate-800">
                      {inspectedStats.granted} of {inspectedStats.total} Permissions Granted
                    </span>
                    <span className="text-slate-400">({inspectedStats.percentage}%)</span>
                  </div>
                  <div className="flex items-center gap-3 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Lock className="w-3 h-3 text-amber-600" />
                      Locked = Root Admin Protection
                    </span>
                    <span>•</span>
                    <span>All changes logged in immutable forensic audit trail</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* VIEW 2: STAFF & USER DIRECTORY (Enterprise Roster Management) */}
        {viewMode === "directory" && (
          <div className="bg-white border border-slate-200 rounded-lg p-5 shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Staff & Employee Directory ({usersList.length} Active Accounts)
                </h2>
                <p className="text-xs text-slate-500">
                  Operational user credentials, role assignments, contact numbers, and session status.
                </p>
              </div>
              <button
                onClick={() => setIsProvisionModalOpen(true)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors whitespace-nowrap shadow-sm self-start sm:self-auto"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Provision New User</span>
              </button>
            </div>

            {/* Roster Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                    <th className="py-2.5 px-4">Staff Member</th>
                    <th className="py-2.5 px-3">Role & Permissions</th>
                    <th className="py-2.5 px-3">Department</th>
                    <th className="py-2.5 px-3">Contact</th>
                    <th className="py-2.5 px-3">Last Active</th>
                    <th className="py-2.5 px-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {usersList.map((user) => {
                    const matchedRole = RBAC_ROLES.find((r) => r.id === user.roleId) || RBAC_ROLES[0];
                    const stats = getRolePermissionsStats(matchedRole.id, matrixState);

                    return (
                      <tr key={user.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="font-semibold text-slate-900">{user.name}</div>
                          <div className="text-[11px] text-slate-400 font-mono">{user.id}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="font-medium text-slate-800">{user.roleTitle}</div>
                          <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                            {stats.granted}/60 granted ({stats.percentage}%)
                          </div>
                        </td>
                        <td className="py-3 px-3 text-slate-600">{user.department}</td>
                        <td className="py-3 px-3">
                          <div className="text-slate-700">{user.email}</div>
                          <div className="text-[11px] text-slate-400">{user.phone}</div>
                        </td>
                        <td className="py-3 px-3">
                          <div className="flex items-center gap-1.5">
                            <span className={`w-2 h-2 rounded-full ${user.sessionStatus === "online" ? "bg-emerald-500" : "bg-slate-300"}`}></span>
                            <span className="text-slate-600">{user.lastLogin}</span>
                          </div>
                        </td>
                        <td className="py-3 px-3 text-right">
                          <button
                            onClick={() => {
                              setSelectedRoleId(user.roleId);
                              setViewMode("matrix");
                            }}
                            className="px-2.5 py-1 text-[11px] font-medium text-slate-700 bg-white border border-slate-200 rounded hover:bg-slate-50 hover:text-slate-900 transition-colors"
                          >
                            Inspect Matrix
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Confirmation Modal: Reset Default Matrix */}
      {isResetModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center shrink-0 border border-rose-200">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900">
                  Reset RBAC Matrix to Standard SOP Defaults?
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">
                  This action will restore all 14 roles across 10 modules to standard SOP default permissions. Any custom role overrides will be permanently replaced. This event will be logged in the immutable audit trail.
                </p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100">
              <button
                onClick={() => setIsResetModalOpen(false)}
                className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetToDefaults}
                className="px-3 py-1.5 text-xs font-medium text-white bg-rose-600 hover:bg-rose-700 rounded-md transition-colors shadow-xs"
              >
                Reset to SOP Defaults
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Provision New User Modal */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-xs p-4">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-5 space-y-4 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <div className="flex items-center gap-2">
                <UserPlus className="w-4 h-4 text-slate-900" />
                <h3 className="text-sm font-bold text-slate-900">
                  Provision New Operational Staff User
                </h3>
              </div>
              <button
                onClick={() => setIsProvisionModalOpen(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-700 mb-1">Full Staff Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Er. K. Ramesh"
                  value={newStaffForm.name}
                  onChange={(e) => setNewStaffForm({ ...newStaffForm, name: e.target.value })}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Corporate Email *</label>
                  <input
                    type="email"
                    required
                    placeholder="ramesh@nirt.net"
                    value={newStaffForm.email}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, email: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
                <div>
                  <label className="block font-medium text-slate-700 mb-1">Mobile Contact</label>
                  <input
                    type="tel"
                    placeholder="+91 98421 99999"
                    value={newStaffForm.phone}
                    onChange={(e) => setNewStaffForm({ ...newStaffForm, phone: e.target.value })}
                    className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-slate-700 mb-1">Assign Canonical Role</label>
                <select
                  value={newStaffForm.roleId}
                  onChange={(e) => {
                    const sel = RBAC_ROLES.find((r) => r.id === e.target.value);
                    setNewStaffForm({
                      ...newStaffForm,
                      roleId: e.target.value,
                      department: sel?.department || newStaffForm.department
                    });
                  }}
                  className="w-full px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {RBAC_ROLES.map((r) => (
                    <option key={r.id} value={r.id}>
                      {r.name} ({r.tier} Tier — {r.department})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-slate-800 bg-white border border-slate-200 rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3 py-1.5 text-xs font-medium text-white bg-slate-900 hover:bg-slate-800 rounded-md transition-colors shadow-xs"
                >
                  Save & Provision
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
