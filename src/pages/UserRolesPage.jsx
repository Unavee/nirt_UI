import { useState } from "react";
import { Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { NIRT_COMPANY } from "@/data/masterData";
import { 
  Users, 
  UserPlus, 
  Search, 
  ShieldCheck, 
  Key, 
  Copy, 
  Check, 
  X, 
  Lock, 
  Mail, 
  Phone, 
  Building2,
  RefreshCw,
  MoreVertical,
  ChevronRight,
  Share2,
  CheckCircle2,
  ShieldAlert,
  ArrowRight,
  Edit,
  Plus,
  Layers,
  Sparkles,
  AlertCircle,
  Network,
  ArrowDown,
  GitBranch,
  Activity,
  LogIn,
  LogOut,
  Laptop,
  Smartphone,
  Clock,
  Radio
} from "lucide-react";

export default function UserRoleManagementPage() {
  const { activeRole, isExecutive, isCoordinator, addAuditEntry } = useRole();
  const [activeTab, setActiveTab] = useState("users"); // "users" | "roles"
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  
  // Modals state
  const [isProvisionModalOpen, setIsProvisionModalOpen] = useState(false);
  const [isEditUserModalOpen, setIsEditUserModalOpen] = useState(false);
  const [isNewRoleModalOpen, setIsNewRoleModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [credentialNotice, setCredentialNotice] = useState(null);
  const [statusNotification, setStatusNotification] = useState(null);

  const showNotification = (msg) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 4000);
  };

  // Expanded 15 Roles + Dynamic Custom Roles
  const [rolesList, setRolesList] = useState([
    { id: "super_admin", title: "Super Admin", department: "Executive Management", pipelineScope: "All 5 Pipelines", permissions: "Full Organization Oversight, User Governance & Audit Logs" },
    { id: "management", title: "Management / Executive", department: "Executive Leadership", pipelineScope: "All 5 Pipelines", permissions: "Revenue Analytics, Margin Controls, Executive Sign-offs" },
    { id: "crm_manager", title: "CRM Manager", department: "Central PMO", pipelineScope: "All 5 Pipelines", permissions: "Cross-Departmental SLA Governance & Bottleneck Resolution" },
    { id: "crm_executive", title: "CRM Executive", department: "Sales & Intake Desk", pipelineScope: "Pipeline 1: Sales", permissions: "Step 01 Omnichannel Lead Intake & Data Deduplication" },
    { id: "sales_team", title: "Sales Team", department: "Technical Sales", pipelineScope: "Pipeline 1: Sales", permissions: "Lead Feasibility, Commercial Proposals & Work Orders" },
    { id: "site_survey_team", title: "Site Survey Team", department: "Technical Feasibility", pipelineScope: "Pipeline 1: Sales", permissions: "Roof Measurements, Tape Dimensions, 4 Mandatory Geo-photos" },
    { id: "design_team", title: "Design / Engineering Team", department: "Design & Engineering", pipelineScope: "Pipeline 1: Sales", permissions: "Single Line Diagrams (SLD), CAD Layout & System DPR" },
    { id: "purchase_team", title: "Purchase Team", department: "Supply Chain & Procurement", pipelineScope: "Pipeline 3: Stores", permissions: "Vendor PO Generation for Tier-1 TopCon Panels & Inverters" },
    { id: "store_team", title: "Store Team", department: "Warehouse & Logistics", pipelineScope: "Pipeline 3: Stores", permissions: "Warehouse QC Barcode Inwarding (GRN) & Material Site Dispatch" },
    { id: "project_manager", title: "Project Manager", department: "Central PMO", pipelineScope: "All 5 Pipelines", permissions: "Master 5-Pipeline Tracking & Stage-Gate Enforcement" },
    { id: "installation_team", title: "Installation Team", department: "EPC Field Operations", pipelineScope: "Pipeline 4: EPC Execution", permissions: "Civil Structure Assembly & Inverter Electrical Wiring (<5Ω)" },
    { id: "accounts_team", title: "Accounts Team", department: "Commercial Finance", pipelineScope: "P2 Approvals & P5 Subsidy", permissions: "80% Advance Gatekeeper, 10% Install Balance & 10% Final Settlement" },
    { id: "liaison_team", title: "Liaisoning / Documentation Team", department: "Government Liaison", pipelineScope: "P2 Approvals & P4 EPC", permissions: "KYC Locker, TANGEDCO Portal Submissions & Net Meter Synchronization" },
    { id: "subsidy_team", title: "Subsidy Team", department: "Central Subsidy Desk", pipelineScope: "Pipeline 5: Subsidy", permissions: "PM Surya Ghar National Portal Claim Lodging & DBT Credit Audit" },
    { id: "customer", title: "Customer Portal", department: "End Consumer", pipelineScope: "Read-Only Overview", permissions: "Milestone Tracking, Live Progress & Handover Sign-off" },
  ]);

  // Initial Team Directory - Complete 15 Role-to-Employee Mapping with Live Telemetry & Activities
  const [users, setUsers] = useState([
    {
      id: "NIRT-EMP-001",
      name: "Er. A. Syed",
      email: "admin@nirt.net",
      phone: "9655001122",
      roleId: "super_admin",
      roleTitle: "Super Admin",
      pipelineScope: "All 5 Pipelines",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:15 AM",
      lastLogout: "Active Now",
      device: "Chrome 131 • Windows 11",
      deviceType: "laptop",
      recentActivity: {
        action: "Authorized Stage-Gate clearance for Project NIRT-2603-0142",
        time: "14m ago",
        step: "Gatekeeper"
      }
    },
    {
      id: "NIRT-EMP-002",
      name: "Dr. G. Khaja Nazeemudin",
      email: "nazeemudin@nirt.net",
      phone: "9655046464",
      roleId: "management",
      roleTitle: "Management / Executive",
      pipelineScope: "All 5 Pipelines",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:45 AM",
      lastLogout: "Active Now",
      device: "Safari 18 • macOS Sonoma",
      deviceType: "laptop",
      recentActivity: {
        action: "Audited Q3 EPC Gross Margins & DBT Subsidy pipeline balance",
        time: "32m ago",
        step: "Executive"
      }
    },
    {
      id: "NIRT-EMP-003",
      name: "P. Vijayakumar",
      email: "vijayakumar.crm@nirt.net",
      phone: "9842100110",
      roleId: "crm_manager",
      roleTitle: "CRM Manager",
      pipelineScope: "All 5 Pipelines",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:30 AM",
      lastLogout: "Active Now",
      device: "Edge 130 • Windows 11",
      deviceType: "laptop",
      recentActivity: {
        action: "Reallocated 4 commercial leads to Namakkal territory queue",
        time: "25m ago",
        step: "Pipeline 1"
      }
    },
    {
      id: "NIRT-EMP-004",
      name: "K. Anitha",
      email: "anitha.crm@nirt.net",
      phone: "9842100220",
      roleId: "crm_executive",
      roleTitle: "CRM Executive",
      pipelineScope: "Pipeline 1: Sales",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 09:05 AM",
      lastLogout: "Active Now",
      device: "Chrome 131 • Windows 11",
      deviceType: "laptop",
      recentActivity: {
        action: "Logged customer follow-up call & scheduled site feasibility",
        time: "18m ago",
        step: "Step 02"
      }
    },
    {
      id: "NIRT-EMP-005",
      name: "Rajkumar S",
      email: "rajkumar.sales@nirt.net",
      phone: "9842100412",
      roleId: "sales_team",
      roleTitle: "Sales Team",
      pipelineScope: "Pipeline 1: Sales",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 09:20 AM",
      lastLogout: "Active Now",
      device: "Chrome Mobile • Android 14",
      deviceType: "phone",
      recentActivity: {
        action: "Generated Proposal Revision v1.2 with 5.4 kWp TOPCon modules",
        time: "42m ago",
        step: "Step 08"
      }
    },
    {
      id: "NIRT-EMP-006",
      name: "K. Murali",
      email: "murali.survey@nirt.net",
      phone: "9842100891",
      roleId: "site_survey_team",
      roleTitle: "Site Survey Team",
      pipelineScope: "Pipeline 1: Sales",
      branch: "Namakkal",
      status: "Active",
      sessionStatus: "offline",
      lastLogin: "Yesterday, 02:15 PM",
      lastLogout: "Yesterday, 06:45 PM",
      device: "PWA Mobile • Android 14",
      deviceType: "phone",
      recentActivity: {
        action: "Uploaded 4 geo-tagged roof survey photos & shadow analysis",
        time: "Yesterday",
        step: "Step 05"
      }
    },
    {
      id: "NIRT-EMP-007",
      name: "R. Prakash",
      email: "prakash.design@nirt.net",
      phone: "9443210042",
      roleId: "design_team",
      roleTitle: "Design / Engineering Team",
      pipelineScope: "Pipeline 1: Sales",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:50 AM",
      lastLogout: "Active Now",
      device: "Chrome 131 • Windows 11 CAD Station",
      deviceType: "laptop",
      recentActivity: {
        action: "Uploaded Single Line Diagram (SLD) & 3D rooftop CAD layout",
        time: "1h ago",
        step: "Step 06"
      }
    },
    {
      id: "NIRT-EMP-008",
      name: "T. Balaji",
      email: "balaji.purchase@nirt.net",
      phone: "9443215588",
      roleId: "purchase_team",
      roleTitle: "Purchase Team",
      pipelineScope: "Pipeline 3: Stores",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "offline",
      lastLogin: "Yesterday, 10:10 AM",
      lastLogout: "Yesterday, 07:30 PM",
      device: "Edge 130 • Windows 10",
      deviceType: "laptop",
      recentActivity: {
        action: "Issued Purchase Order PO-9082 for Sungrow 5kW Inverter",
        time: "Yesterday",
        step: "Step 11"
      }
    },
    {
      id: "NIRT-EMP-009",
      name: "D. Senthil",
      email: "senthil.stores@nirt.net",
      phone: "9842155661",
      roleId: "store_team",
      roleTitle: "Store Team",
      pipelineScope: "Pipeline 3: Stores",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:00 AM",
      lastLogout: "Active Now",
      device: "Zebra Scanner • Android 13",
      deviceType: "phone",
      recentActivity: {
        action: "Inwarded 48x Waaree 545W Mono PERC panels (QC Passed)",
        time: "2h ago",
        step: "Step 12"
      }
    },
    {
      id: "NIRT-EMP-010",
      name: "S. Karthik",
      email: "karthik.pmo@nirt.net",
      phone: "9443299881",
      roleId: "project_manager",
      roleTitle: "Project Manager",
      pipelineScope: "Pipelines 3 & 4: EPC",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 08:10 AM",
      lastLogout: "Active Now",
      device: "Chrome 131 • Windows 11",
      deviceType: "laptop",
      recentActivity: {
        action: "Scheduled installation gang & dispatched MMS structures",
        time: "48m ago",
        step: "Step 13"
      }
    },
    {
      id: "NIRT-EMP-011",
      name: "M. Saravanan",
      email: "saravanan.epc@nirt.net",
      phone: "9443218709",
      roleId: "installation_team",
      roleTitle: "Installation Team",
      pipelineScope: "Pipeline 4: EPC Execution",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "offline",
      lastLogin: "04 Nov, 08:30 AM",
      lastLogout: "04 Nov, 05:40 PM",
      device: "Samsung Galaxy • Android 13",
      deviceType: "phone",
      recentActivity: {
        action: "Finished civil base foundations & earthing pit test (3.4 Ω)",
        time: "2 days ago",
        step: "Step 14"
      }
    },
    {
      id: "NIRT-EMP-012",
      name: "A. Lakshmi",
      email: "accounts@nirt.net",
      phone: "9944008811",
      roleId: "accounts_team",
      roleTitle: "Accounts Team",
      pipelineScope: "P2 Approvals & P5 Subsidy",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 09:15 AM",
      lastLogout: "Active Now",
      device: "Edge 130 • Windows 11 (Finance Desk)",
      deviceType: "laptop",
      recentActivity: {
        action: "Verified 80% Advance payment ₹1,87,200 via NEFT (UTIB991)",
        time: "10m ago",
        step: "Step 09"
      }
    },
    {
      id: "NIRT-EMP-013",
      name: "V. Thangavel",
      email: "liaison.erd@nirt.net",
      phone: "9788114400",
      roleId: "liaison_team",
      roleTitle: "Liaisoning / Documentation Team",
      pipelineScope: "P2 Approvals & P4 EPC",
      branch: "Erode",
      status: "Active",
      sessionStatus: "offline",
      lastLogin: "Yesterday, 09:00 AM",
      lastLogout: "Yesterday, 06:15 PM",
      device: "Chrome 131 • Windows 10",
      deviceType: "laptop",
      recentActivity: {
        action: "Lodged Net Metering application with TANGEDCO Erode Circle",
        time: "Yesterday",
        step: "Step 10"
      }
    },
    {
      id: "NIRT-EMP-014",
      name: "S. Geetha",
      email: "geetha.subsidy@nirt.net",
      phone: "9788115599",
      roleId: "subsidy_team",
      roleTitle: "Subsidy Team",
      pipelineScope: "Pipeline 5: Subsidy",
      branch: "Salem (HQ)",
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Today, 09:30 AM",
      lastLogout: "Active Now",
      device: "Chrome 131 • Windows 11",
      deviceType: "laptop",
      recentActivity: {
        action: "Submitted PM Surya Ghar DBT claim ₹78,000 on National Portal",
        time: "20m ago",
        step: "Step 17"
      }
    },
    {
      id: "NIRT-EMP-015",
      name: "K. R. Natarajan",
      email: "natarajan.consumer@gmail.com",
      phone: "9842000001",
      roleId: "customer",
      roleTitle: "Customer (Self-Service)",
      pipelineScope: "Portal View (Project NIRT-2603-0142)",
      branch: "Salem Circle",
      status: "Active",
      sessionStatus: "offline",
      lastLogin: "03 Nov, 07:15 PM",
      lastLogout: "03 Nov, 07:42 PM",
      device: "Safari • iPhone 15 Pro",
      deviceType: "phone",
      recentActivity: {
        action: "Digitally signed Proposal v1.2 & approved layout via OTP",
        time: "3 days ago",
        step: "Portal"
      }
    },
  ]);

  // Form states for Provisioning & Editing
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    roleId: "sales_team",
    pipelineScope: "Pipeline 1: Sales",
    branch: "Salem (HQ)"
  });

  const [newRoleForm, setNewRoleForm] = useState({
    title: "",
    department: "",
    pipelineScope: "Pipeline 1: Sales",
    permissions: ""
  });

  const isSuperAdminOrCRM = isExecutive || isCoordinator || activeRole.id === "project_coordinator";

  // Create New User
  const handleCreateUser = (e) => {
    e.preventDefault();
    const roleObj = rolesList.find((r) => r.id === formData.roleId);
    const newEmpId = `NIRT-EMP-00${users.length + 1}`;
    const tempPassword = "Nirt@" + Math.floor(1000 + Math.random() * 9000);

    const newUser = {
      id: newEmpId,
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      roleId: formData.roleId,
      roleTitle: roleObj ? roleObj.title : "Sales Team",
      pipelineScope: formData.pipelineScope || (roleObj ? roleObj.pipelineScope : "Pipeline 1: Sales"),
      branch: formData.branch,
      status: "Active",
      sessionStatus: "online",
      lastLogin: "Just now",
      lastLogout: "Active Now",
      device: "Web Browser • Windows",
      deviceType: "laptop",
      recentActivity: {
        action: "Account provisioned & credentials generated",
        time: "Just now",
        step: "Provisioned"
      }
    };

    setUsers([newUser, ...users]);
    setIsProvisionModalOpen(false);

    setCredentialNotice({
      name: formData.name,
      email: formData.email,
      password: tempPassword,
      role: newUser.roleTitle,
      pipeline: newUser.pipelineScope
    });

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: "USER-MGMT",
      clientName: "System Administration",
      step: "User Provisioning",
      field: "New Staff Credentials",
      oldValue: "Unregistered",
      newValue: `${newUser.name} (${newUser.roleTitle})`,
      reason: `Provisioned by ${activeRole.title.split("/")[0]} for ${newUser.branch} circle`
    });

    showNotification(`✓ Employee ${newUser.name} provisioned successfully with role: ${newUser.roleTitle}`);

    // Reset Form
    setFormData({
      name: "",
      email: "",
      phone: "",
      roleId: "sales_team",
      pipelineScope: "Pipeline 1: Sales",
      branch: "Salem (HQ)"
    });
  };

  // Open Edit User Modal
  const handleOpenEditUser = (user) => {
    setEditingUser({ ...user });
    setIsEditUserModalOpen(true);
  };

  // Save User Edit
  const handleSaveUserEdit = (e) => {
    e.preventDefault();
    if (!editingUser) return;

    const roleObj = rolesList.find((r) => r.id === editingUser.roleId);
    const updatedTitle = roleObj ? roleObj.title : editingUser.roleTitle;

    setUsers((prev) =>
      prev.map((u) => (u.id === editingUser.id ? { ...editingUser, roleTitle: updatedTitle } : u))
    );

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: editingUser.id,
      clientName: editingUser.name,
      step: "Role & Permission Modification",
      field: "User Profile & Scope",
      oldValue: "Previous Assignment",
      newValue: `${updatedTitle} • ${editingUser.pipelineScope}`,
      reason: `Access scope and role modified by ${activeRole.title.split("/")[0]}`
    });

    setIsEditUserModalOpen(false);
    showNotification(`✓ User ${editingUser.name} (${editingUser.id}) updated successfully!`);
  };

  // Create New Role
  const handleCreateNewRole = (e) => {
    e.preventDefault();
    if (!newRoleForm.title.trim()) return;

    const roleSlug = newRoleForm.title.toLowerCase().replace(/[^a-z0-9]/g, "_");
    const newRole = {
      id: roleSlug,
      title: newRoleForm.title,
      department: newRoleForm.department || "Operations",
      pipelineScope: newRoleForm.pipelineScope || "All 5 Pipelines",
      permissions: newRoleForm.permissions || "Standard Role Permissions"
    };

    setRolesList([...rolesList, newRole]);
    setIsNewRoleModalOpen(false);

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: "ROLE-MGMT",
      clientName: "System RBAC",
      step: "Custom Role Definition",
      field: "New Role Authorization",
      oldValue: "Non-existent",
      newValue: `${newRole.title} (${newRole.pipelineScope})`,
      reason: `Custom role authorized by ${activeRole.title.split("/")[0]}`
    });

    showNotification(`✓ New role "${newRole.title}" created and enabled across the CRM.`);

    setNewRoleForm({
      title: "",
      department: "",
      pipelineScope: "Pipeline 1: Sales",
      permissions: ""
    });
  };

  // Toggle user active / suspended
  const handleToggleStatus = (user) => {
    const nextStatus = user.status === "Active" ? "Suspended" : "Active";
    setUsers((prev) =>
      prev.map((u) => (u.id === user.id ? { ...u, status: nextStatus } : u))
    );
    showNotification(`User ${user.name} is now ${nextStatus}.`);
  };

  // Filtered Users
  const filteredUsers = users.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.branch.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.roleTitle.toLowerCase().includes(searchQuery.toLowerCase());
    const matchRole = roleFilter === "all" || u.roleId === roleFilter;
    return matchSearch && matchRole;
  });

  return (
    <div className="space-y-6 pb-12">
      
      {/* Live Status Notification */}
      {statusNotification && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-between shadow-lg shadow-slate-900/10 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
          <button 
            onClick={() => setStatusNotification(null)}
            className="text-slate-400 hover:text-white text-xs font-mono px-2 py-0.5 rounded-md hover:bg-slate-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header Card */}
      <div className="glass-surface p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              CRM Manager & Super Admin Console
            </span>
            <span className="text-xs text-slate-400 font-mono">
              RBAC Governance
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            User Roles & Employee Access Governance
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Configure the 15 RBAC roles, provision employee credentials, assign operational pipelines, and manage access privileges.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2 shrink-0">
          <button
            onClick={() => setIsNewRoleModalOpen(true)}
            className="apple-button flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 text-blue-600" />
            <span>New Custom Role</span>
          </button>

          <button
            onClick={() => setIsProvisionModalOpen(true)}
            className="apple-button flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-md shadow-slate-900/10"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Provision Employee</span>
          </button>
        </div>
      </div>

      {/* Credential Generated Alert Banner */}
      {credentialNotice && (
        <div className="p-5 rounded-2xl bg-white border-2 border-emerald-500 shadow-md space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <h3 className="text-sm font-bold text-slate-900">
                Employee Provisioned: {credentialNotice.name} ({credentialNotice.role})
              </h3>
            </div>
            <button 
              onClick={() => setCredentialNotice(null)}
              className="text-slate-400 hover:text-slate-900 text-xs font-mono"
            >
              Close
            </button>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs font-mono grid grid-cols-1 sm:grid-cols-4 gap-3">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">EMAIL / USERNAME</span>
              <strong className="text-slate-900">{credentialNotice.email}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">ASSIGNED PIPELINE</span>
              <strong className="text-blue-700">{credentialNotice.pipeline}</strong>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase">TEMPORARY PASSWORD</span>
              <strong className="text-slate-900 bg-emerald-100 px-2 py-0.5 rounded font-bold">
                {credentialNotice.password}
              </strong>
            </div>
            <div className="flex items-end">
              <button
                onClick={() => {
                  navigator.clipboard.writeText(`NIRT Solar CRM Credentials:\nUsername: ${credentialNotice.email}\nPassword: ${credentialNotice.password}\nPortal: https://crm.nirt.net`);
                  showNotification("Credentials copied to clipboard!");
                }}
                className="apple-button px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-900 text-white flex items-center space-x-1.5"
              >
                <Copy className="w-3 h-3" />
                <span>Copy Credentials</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tab Switcher: Employees vs Role Definitions vs Flowchart */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-medium">
        <button
          onClick={() => setActiveTab("users")}
          className={`pb-3 transition-colors border-b-2 -mb-[1px] flex items-center space-x-2 ${
            activeTab === "users"
              ? "border-slate-900 text-slate-900 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          <Users className="w-4 h-4" />
          <span>Team Directory ({users.length} Employees)</span>
        </button>

        <button
          onClick={() => setActiveTab("roles")}
          className={`pb-3 transition-colors border-b-2 -mb-[1px] flex items-center space-x-2 ${
            activeTab === "roles"
              ? "border-slate-900 text-slate-900 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-blue-600" />
          <span>15 Master Roles & Pipeline Access</span>
        </button>

        {/* <button
          onClick={() => setActiveTab("architecture")}
          className={`pb-3 transition-colors border-b-2 -mb-[1px] flex items-center space-x-2 ${
            activeTab === "architecture"
              ? "border-slate-900 text-slate-900 font-bold"
              : "border-transparent text-slate-400 hover:text-slate-900"
          }`}
        >
          <Network className="w-4 h-4 text-indigo-600" />
          <span>RBAC Architecture Flowchart</span>
        </button> */}
      </div>

      {/* TAB 1: EMPLOYEE DIRECTORY & UPDATE OPTIONS */}
      {activeTab === "users" && (
        <div className="space-y-4">
          
          {/* Search & Filter Bar */}
          <div className="glass-surface p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
              <input
                type="text"
                placeholder="Search by name, email, employee ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
              />
            </div>

            <div className="flex items-center space-x-2 w-full sm:w-auto justify-end">
              <span className="text-xs text-slate-400 font-medium">Role:</span>
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value)}
                className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:outline-none"
              >
                <option value="all">All Roles ({rolesList.length})</option>
                {rolesList.map((r) => (
                  <option key={r.id} value={r.id}>{r.title}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Users Table */}
          <div className="glass-surface rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="py-3 px-4">Employee / ID</th>
                    <th className="py-3 px-4">Role & Scope</th>
                    <th className="py-3 px-4">Session & Login/Logout</th>
                    <th className="py-3 px-4">Recent Activity</th>
                    <th className="py-3 px-4">Branch Circle</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredUsers.map((u) => (
                    <tr key={u.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <div className="font-bold text-slate-900 text-sm">{u.name}</div>
                        <div className="text-[11px] text-slate-500 font-mono mt-0.5">{u.email} • {u.phone}</div>
                        <span className="text-[10px] font-mono text-blue-600 font-bold block">{u.id}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-800 block text-xs">{u.roleTitle}</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200 inline-block mt-1">
                          {u.pipelineScope}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        {u.sessionStatus === "online" ? (
                          <div className="space-y-1">
                            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                              </span>
                              <span>Online Now</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-600 flex items-center space-x-1">
                              <LogIn className="w-2.5 h-2.5 text-emerald-600 shrink-0" />
                              <span>In: {u.lastLogin}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                              {u.deviceType === "phone" ? (
                                <Smartphone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              ) : (
                                <Laptop className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              )}
                              <span className="truncate max-w-[150px]">{u.device}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-1">
                            <div className="inline-flex items-center space-x-1.5 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-500 border border-slate-200">
                              <span className="h-1.5 w-1.5 rounded-full bg-slate-400"></span>
                              <span>Offline</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                              <LogIn className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              <span>In: {u.lastLogin}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-500 flex items-center space-x-1">
                              <LogOut className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              <span>Out: {u.lastLogout}</span>
                            </div>
                            <div className="text-[10px] font-mono text-slate-400 flex items-center space-x-1">
                              {u.deviceType === "phone" ? (
                                <Smartphone className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              ) : (
                                <Laptop className="w-2.5 h-2.5 text-slate-400 shrink-0" />
                              )}
                              <span className="truncate max-w-[150px]">{u.device}</span>
                            </div>
                          </div>
                        )}
                      </td>

                      <td className="py-3.5 px-4 max-w-[280px]">
                        <div className="text-slate-800 font-semibold text-xs leading-snug">
                          {u.recentActivity?.action || "No activity recorded"}
                        </div>
                        <div className="flex items-center space-x-2 mt-1.5">
                          <span className="px-1.5 py-0.5 rounded text-[9px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                            {u.recentActivity?.step || "System"}
                          </span>
                          <span className="text-[10px] text-slate-400 font-mono inline-flex items-center">
                            <Clock className="w-2.5 h-2.5 mr-1 text-slate-400 shrink-0" />
                            {u.recentActivity?.time || "Recently"}
                          </span>
                        </div>
                      </td>

                      <td className="py-3.5 px-4 text-slate-700 font-semibold whitespace-nowrap">
                        {u.branch}
                      </td>

                      <td className="py-3.5 px-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          u.status === "Active"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}>
                          {u.status}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-right space-x-1.5 whitespace-nowrap">
                        <button
                          onClick={() => handleOpenEditUser(u)}
                          className="apple-button px-2.5 py-1 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white shadow-2xs transition-all"
                        >
                          <Edit className="w-3 h-3 inline mr-1" />
                          <span>Edit</span>
                        </button>

                        <button
                          onClick={() => handleToggleStatus(u)}
                          className={`apple-button px-2.5 py-1 rounded-lg text-xs font-semibold transition-all ${
                            u.status === "Active"
                              ? "bg-slate-100 text-slate-500 hover:text-rose-600"
                              : "bg-emerald-100 text-emerald-800"
                          }`}
                        >
                          {u.status === "Active" ? "Suspend" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filteredUsers.length === 0 && (
                    <tr>
                      <td colSpan={7} className="py-8 text-center text-slate-400">
                        No team members match the search query.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: 15 MASTER ROLES & PIPELINE ACCESS DEFINITIONS */}
      {activeTab === "roles" && (
        <div className="space-y-4">
          <div className="p-4 rounded-3xl bg-blue-50/60 border border-blue-200/80 text-blue-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-2xl bg-blue-600 text-white flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-blue-900">
                  Role-Based Access Control (RBAC) Architecture
                </h3>
                <p className="text-xs text-blue-700 mt-0.5">
                  Every user sees only the information and functions relevant to their authorized role. Step inputs are locked unless assigned to that specific role.
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsNewRoleModalOpen(true)}
              className="apple-button px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-xs shrink-0"
            >
              + Define Custom Role
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
            {rolesList.map((r, idx) => (
              <div
                key={r.id}
                className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-xs apple-card flex flex-col justify-between space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-slate-400">
                      ROLE {idx + 1 < 10 ? `0${idx + 1}` : idx + 1}
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-blue-50 text-blue-700 border border-blue-200">
                      {r.pipelineScope}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900">{r.title}</h4>
                  <p className="text-xs text-slate-500 font-medium mt-0.5">Department: {r.department}</p>
                </div>

                <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600 leading-relaxed">
                  <span className="font-semibold text-slate-700 block text-[10px] uppercase tracking-wider text-slate-400">Authorized Permissions:</span>
                  {r.permissions}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: VISUAL RBAC ARCHITECTURE FLOWCHART */}
      {activeTab === "architecture" && (
        <div className="space-y-6">
          {/* Header Banner */}
          <div className="p-5 rounded-3xl bg-indigo-50/70 border border-indigo-200/80 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start space-x-3.5">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <Network className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-base font-bold text-indigo-950">
                  Role-Based Access Control (RBAC) Architecture & Pipeline Flow
                </h3>
                <p className="text-xs text-indigo-700 mt-0.5 leading-relaxed">
                  Visual mapping of governance tiers, authorization thresholds, and stage-gated functional access across the 15 standard user roles.
                </p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-bold bg-white text-indigo-700 border border-indigo-200 shrink-0">
              4 Governance Tiers • 5 Pipelines • 15 Roles
            </span>
          </div>

          {/* Interactive Flow Container */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/80 shadow-xs space-y-6">
            
            {/* TIER 1: GLOBAL GOVERNANCE & LEADERSHIP */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-900" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Tier 1: Global Governance & Executive Leadership (All 20 Steps)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Unrestricted Master Access</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold text-slate-900">1. Super Admin</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Role 01</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>👤 Er. A. Syed (System Administrator)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Master system configuration, user & role provisioning, pipeline routing rules, and unrestricted review of the append-only PMO Audit Trail.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold text-slate-900">2. Management / Executive</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Role 02</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-blue-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
                    <span>👤 Dr. G. Khaja Nazeemudin (COO / Executive Director)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Corporate P&L analytics, portfolio conversion health, margin discount approvals (&gt; 10%), high-value PO authorizations (&gt; ₹5L), and strategic sign-offs.
                  </p>
                </div>
              </div>
            </div>

            {/* CONNECTOR 1 -> 2 */}
            <div className="flex flex-col items-center justify-center -my-3 py-1">
              <div className="w-0.5 h-6 bg-indigo-300" />
              <div className="px-3 py-0.5 rounded-full bg-indigo-100 text-[10px] font-mono font-bold text-indigo-800 border border-indigo-200">
                Authorizes Operational Delegation
              </div>
              <div className="w-0.5 h-6 bg-indigo-300" />
              <ArrowDown className="w-3.5 h-3.5 text-indigo-500 -mt-1" />
            </div>

            {/* TIER 2: CENTRAL PMO & COORDINATION HUB */}
            <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-600" />
                  <span className="text-xs font-bold text-blue-950 uppercase tracking-wider">
                    Tier 2: Central PMO & Operational Coordination Hub
                  </span>
                </div>
                <span className="text-[11px] font-mono text-blue-700 font-bold">SLA & Stage Gate Authority</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-3.5 rounded-xl bg-white border border-blue-200 shadow-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold text-blue-950">3. CRM Manager & 4. CRM Executive</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Roles 03 & 04</span>
                  </div>
                  <div className="flex flex-col space-y-1 text-xs font-semibold text-indigo-700">
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>👤 P. Vijayakumar (CRM Manager & PMO Lead)</span>
                    </span>
                    <span className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                      <span>👤 K. Anitha (CRM Executive / Lead Intake Desk)</span>
                    </span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Cross-departmental SLA governance, milestone bottleneck resolution, Stage-Gatekeeper overrides with mandatory written justification, and team workload allocation.
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-blue-200 shadow-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <strong className="text-xs font-bold text-blue-950">10. Project Manager (EPC Central)</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-blue-100 text-blue-800 font-bold">Role 10</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-indigo-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                    <span>👤 S. Karthik (Master EPC Project Manager)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Master milestone tracking across Procurement (P3) and EPC Execution (P4), coordinating installer crews, warehouse material delivery sync, and site QA sign-offs.
                  </p>
                </div>
              </div>
            </div>

            {/* CONNECTOR 2 -> 3 */}
            <div className="flex flex-col items-center justify-center -my-3 py-1">
              <div className="w-0.5 h-6 bg-blue-300" />
              <div className="px-3 py-0.5 rounded-full bg-blue-100 text-[10px] font-mono font-bold text-blue-800 border border-blue-200">
                Directs 5 Specialized Operational Pipelines (20 Steps)
              </div>
              <div className="w-0.5 h-6 bg-blue-300" />
              <ArrowDown className="w-3.5 h-3.5 text-blue-500 -mt-1" />
            </div>

            {/* TIER 3: SPECIALIZED DEPARTMENTAL TEAMS (5 PIPELINES) */}
            <div className="space-y-3">
              <div className="flex items-center justify-between px-1">
                <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Tier 3: Specialized Departmental Teams (Locked Pipeline Boundaries)
                </span>
                <span className="text-[11px] font-mono text-slate-500">Function-Restricted RBAC</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
                
                {/* Pipeline 1 */}
                <div className="p-3 rounded-2xl bg-blue-50/50 border border-blue-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-blue-700 uppercase block">Pipeline 1</span>
                    <h5 className="text-xs font-bold text-slate-900">Sales & Feasibility</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Steps 01 to 06</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-blue-100 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white border border-blue-100">
                      <strong className="text-slate-800 block">5. Sales Team</strong>
                      <span className="text-blue-700 font-semibold text-[10px] block">👤 Rajkumar S</span>
                      <span className="text-slate-500 text-[10px]">Leads, Viability A-D, Quotation</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-blue-100">
                      <strong className="text-slate-800 block">6. Site Survey Team</strong>
                      <span className="text-blue-700 font-semibold text-[10px] block">👤 K. Murali</span>
                      <span className="text-slate-500 text-[10px]">Tape Dims, Shadow, 4 Photos</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-blue-100">
                      <strong className="text-slate-800 block">7. Design / Eng.</strong>
                      <span className="text-blue-700 font-semibold text-[10px] block">👤 R. Prakash</span>
                      <span className="text-slate-500 text-[10px]">SLD, CAD Layout, DPR</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline 2 */}
                <div className="p-3 rounded-2xl bg-violet-50/50 border border-violet-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-violet-700 uppercase block">Pipeline 2</span>
                    <h5 className="text-xs font-bold text-slate-900">Advance & Approvals</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Steps 07 to 10</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-violet-100 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white border border-violet-100">
                      <strong className="text-slate-800 block">12. Accounts Team</strong>
                      <span className="text-violet-700 font-semibold text-[10px] block">👤 A. Lakshmi</span>
                      <span className="text-slate-500 text-[10px]">80% Advance UTR Gatekeeper</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-violet-100">
                      <strong className="text-slate-800 block">13. Liaison Team</strong>
                      <span className="text-violet-700 font-semibold text-[10px] block">👤 V. Thangavel</span>
                      <span className="text-slate-500 text-[10px]">KYC Locker & TANGEDCO Sanction</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline 3 */}
                <div className="p-3 rounded-2xl bg-teal-50/50 border border-teal-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-teal-700 uppercase block">Pipeline 3</span>
                    <h5 className="text-xs font-bold text-slate-900">Procure & Stores</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Steps 11 to 13</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-teal-100 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white border border-teal-100">
                      <strong className="text-slate-800 block">8. Purchase Team</strong>
                      <span className="text-teal-700 font-semibold text-[10px] block">👤 T. Balaji</span>
                      <span className="text-slate-500 text-[10px]">Vendor PO for TopCon & Inverters</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-teal-100">
                      <strong className="text-slate-800 block">9. Store Team</strong>
                      <span className="text-teal-700 font-semibold text-[10px] block">👤 D. Senthil</span>
                      <span className="text-slate-500 text-[10px]">Warehouse QC, GRN, Site Dispatch</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline 4 */}
                <div className="p-3 rounded-2xl bg-indigo-50/50 border border-indigo-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-indigo-700 uppercase block">Pipeline 4</span>
                    <h5 className="text-xs font-bold text-slate-900">EPC Site Execution</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Steps 14 to 17</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-indigo-100 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white border border-indigo-100">
                      <strong className="text-slate-800 block">11. Installation Team</strong>
                      <span className="text-indigo-700 font-semibold text-[10px] block">👤 M. Saravanan</span>
                      <span className="text-slate-500 text-[10px]">Civil Erection & Wiring (&lt;5Ω)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-indigo-100">
                      <strong className="text-slate-800 block">12. Accounts Team</strong>
                      <span className="text-indigo-700 font-semibold text-[10px] block">👤 A. Lakshmi</span>
                      <span className="text-slate-500 text-[10px]">10% Installation Receipt</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-indigo-100">
                      <strong className="text-slate-800 block">13. Liaison Team</strong>
                      <span className="text-indigo-700 font-semibold text-[10px] block">👤 V. Thangavel</span>
                      <span className="text-slate-500 text-[10px]">Bi-Directional Net Meter Sync</span>
                    </div>
                  </div>
                </div>

                {/* Pipeline 5 */}
                <div className="p-3 rounded-2xl bg-cyan-50/50 border border-cyan-200/70 space-y-2 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-mono font-bold text-cyan-700 uppercase block">Pipeline 5</span>
                    <h5 className="text-xs font-bold text-slate-900">Closure & Subsidy</h5>
                    <p className="text-[11px] text-slate-500 mt-0.5">Steps 18 to 20</p>
                  </div>
                  <div className="space-y-1.5 pt-2 border-t border-cyan-100 text-[11px]">
                    <div className="p-1.5 rounded-lg bg-white border border-cyan-100">
                      <strong className="text-slate-800 block">12. Accounts Team</strong>
                      <span className="text-cyan-700 font-semibold text-[10px] block">👤 A. Lakshmi</span>
                      <span className="text-slate-500 text-[10px]">10% Final Settlement (₹0)</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-cyan-100">
                      <strong className="text-slate-800 block">14. Subsidy Team</strong>
                      <span className="text-cyan-700 font-semibold text-[10px] block">👤 S. Geetha</span>
                      <span className="text-slate-500 text-[10px]">PM Surya Ghar Portal JCR</span>
                    </div>
                    <div className="p-1.5 rounded-lg bg-white border border-cyan-100">
                      <strong className="text-slate-800 block">Central PMO</strong>
                      <span className="text-cyan-700 font-semibold text-[10px] block">👤 P. Vijayakumar</span>
                      <span className="text-slate-500 text-[10px]">DBT UTR & Triple Closure</span>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* CONNECTOR 3 -> 4 */}
            <div className="flex flex-col items-center justify-center -my-3 py-1">
              <div className="w-0.5 h-6 bg-slate-300" />
              <div className="px-3 py-0.5 rounded-full bg-slate-100 text-[10px] font-mono font-bold text-slate-700 border border-slate-200">
                Automated Milestone Updates Delivered to Customer
              </div>
              <div className="w-0.5 h-6 bg-slate-300" />
              <ArrowDown className="w-3.5 h-3.5 text-slate-500 -mt-1" />
            </div>

            {/* TIER 4: EXTERNAL STAKEHOLDERS (CUSTOMER PORTAL) */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
                  <span className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Tier 4: External Stakeholders (Customer Self-Service Portal)
                  </span>
                </div>
                <span className="text-[11px] font-mono text-slate-500">Read-Only Protected Access</span>
              </div>

              <div className="p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <strong className="text-xs font-bold text-slate-900">15. Customer</strong>
                    <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-100 text-slate-700 font-bold">Role 15</span>
                  </div>
                  <div className="flex items-center space-x-1.5 text-xs font-semibold text-emerald-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                    <span>👤 K. R. Natarajan (Domestic Rooftop Customer - Salem Circle)</span>
                  </div>
                  <p className="text-xs text-slate-600">
                    Restricted strictly to their own project record via OTP / EB Consumer Number. Can view real-time stage progress, download signed quotation & GST tax invoices, inspect warranty certificates, and verify DBT subsidy credit status.
                  </p>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold shrink-0">
                  Zero System Modification Rights
                </span>
              </div>
            </div>

          </div>
        </div>
      )}

      {/* MODAL 1: PROVISION NEW EMPLOYEE */}
      {isProvisionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <UserPlus className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Provision New Employee</h3>
              </div>
              <button onClick={() => setIsProvisionModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="pt-4 space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Full Name:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. S. Vignesh"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Work Email:</label>
                  <input
                    type="email"
                    required
                    placeholder="vignesh@nirt.net"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Mobile Number:</label>
                  <input
                    type="tel"
                    required
                    placeholder="98421XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Selected Role (15 Roles):</label>
                  <select
                    value={formData.roleId}
                    onChange={(e) => {
                      const selId = e.target.value;
                      const roleObj = rolesList.find((r) => r.id === selId);
                      setFormData({ 
                        ...formData, 
                        roleId: selId,
                        pipelineScope: roleObj ? roleObj.pipelineScope : formData.pipelineScope
                      });
                    }}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Pipeline Scope:</label>
                  <select
                    value={formData.pipelineScope}
                    onChange={(e) => setFormData({ ...formData, pipelineScope: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Pipeline 1: Sales">Pipeline 1: Sales (01-06)</option>
                    <option value="Pipeline 2: Approvals">Pipeline 2: Approvals (07-10)</option>
                    <option value="Pipeline 3: Stores">Pipeline 3: Stores (11-13)</option>
                    <option value="Pipeline 4: EPC Execution">Pipeline 4: EPC Execution (14-17)</option>
                    <option value="Pipeline 5: Subsidy">Pipeline 5: Subsidy (18-20)</option>
                    <option value="All 5 Pipelines">All 5 Pipelines (Full Access)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Branch Territory:</label>
                <select
                  value={formData.branch}
                  onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                >
                  {NIRT_COMPANY.branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsProvisionModalOpen(false)}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
                >
                  Create & Issue Credentials
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: UPDATE USER DETAILS & PIPELINE SCOPE */}
      {isEditUserModalOpen && editingUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <Edit className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Update User: {editingUser.name}</h3>
              </div>
              <button onClick={() => setIsEditUserModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSaveUserEdit} className="pt-4 space-y-3.5 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Employee Name:</label>
                  <input
                    type="text"
                    required
                    value={editingUser.name}
                    onChange={(e) => setEditingUser({ ...editingUser, name: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Employee ID:</label>
                  <input
                    type="text"
                    disabled
                    value={editingUser.id}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-slate-100 text-slate-500 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Work Email:</label>
                  <input
                    type="email"
                    required
                    value={editingUser.email}
                    onChange={(e) => setEditingUser({ ...editingUser, email: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Mobile Phone:</label>
                  <input
                    type="tel"
                    required
                    value={editingUser.phone}
                    onChange={(e) => setEditingUser({ ...editingUser, phone: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Role:</label>
                  <select
                    value={editingUser.roleId}
                    onChange={(e) => setEditingUser({ ...editingUser, roleId: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                  >
                    {rolesList.map((r) => (
                      <option key={r.id} value={r.id}>{r.title}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Assigned Pipeline Scope:</label>
                  <select
                    value={editingUser.pipelineScope}
                    onChange={(e) => setEditingUser({ ...editingUser, pipelineScope: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Pipeline 1: Sales">Pipeline 1: Sales (01-06)</option>
                    <option value="Pipeline 2: Approvals">Pipeline 2: Approvals (07-10)</option>
                    <option value="Pipeline 3: Stores">Pipeline 3: Stores (11-13)</option>
                    <option value="Pipeline 4: EPC Execution">Pipeline 4: EPC Execution (14-17)</option>
                    <option value="Pipeline 5: Subsidy">Pipeline 5: Subsidy (18-20)</option>
                    <option value="All 5 Pipelines">All 5 Pipelines (Full Access)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Branch Territory:</label>
                <select
                  value={editingUser.branch}
                  onChange={(e) => setEditingUser({ ...editingUser, branch: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                >
                  {NIRT_COMPANY.branches.map((b) => (
                    <option key={b} value={b}>{b}</option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsEditUserModalOpen(false)}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
                >
                  Save & Apply Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: CREATE NEW CUSTOM ROLE */}
      {isNewRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-slate-200/80 p-6 overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-blue-600" />
                <h3 className="font-bold text-base text-slate-900">Define New Custom Role</h3>
              </div>
              <button onClick={() => setIsNewRoleModalOpen(false)} className="text-slate-400 hover:text-slate-900">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateNewRole} className="pt-4 space-y-3.5 text-xs">
              <div>
                <label className="text-slate-700 font-semibold block mb-1">Role Title:</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Quality Safety Auditor"
                  value={newRoleForm.title}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, title: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Department:</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Quality & Standards"
                    value={newRoleForm.department}
                    onChange={(e) => setNewRoleForm({ ...newRoleForm, department: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                  />
                </div>
                <div>
                  <label className="text-slate-700 font-semibold block mb-1">Pipeline Scope:</label>
                  <select
                    value={newRoleForm.pipelineScope}
                    onChange={(e) => setNewRoleForm({ ...newRoleForm, pipelineScope: e.target.value })}
                    className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-medium focus:outline-none"
                  >
                    <option value="Pipeline 1: Sales">Pipeline 1: Sales</option>
                    <option value="Pipeline 2: Approvals">Pipeline 2: Approvals</option>
                    <option value="Pipeline 3: Stores">Pipeline 3: Stores</option>
                    <option value="Pipeline 4: EPC Execution">Pipeline 4: EPC Execution</option>
                    <option value="Pipeline 5: Subsidy">Pipeline 5: Subsidy</option>
                    <option value="All 5 Pipelines">All 5 Pipelines</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-slate-700 font-semibold block mb-1">Authorized Permissions & Milestone Access:</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe step ownership, read/write gates, and audit capabilities..."
                  value={newRoleForm.permissions}
                  onChange={(e) => setNewRoleForm({ ...newRoleForm, permissions: e.target.value })}
                  className="w-full text-xs p-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-3 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setIsNewRoleModalOpen(false)}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
                >
                  Authorize New Role
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}