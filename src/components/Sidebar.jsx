import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { useSidebar } from "@/context/SidebarContext";
import { 
  LayoutDashboard, 
  Layers, 
  FolderKanban, 
  Calculator, 
  ShieldCheck, 
  ChevronDown, 
  Plus, 
  LogOut, 
  Activity, 
  Settings,
  Users,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { QuickActionSheet } from "@/components/dashboard/QuickActionSheet";

export default function Sidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { activeRole, switchRole, allRoles, canViewAudit } = useRole();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);

  const mainNavigation = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "5-Pipeline Board", href: "/pipelines", icon: Layers, badge: "20" },
    { label: "Projects Registry", href: "/projects", icon: FolderKanban },
    { label: "Solar Proposal Sizer", href: "/calculator", icon: Calculator },
  ];

  const pipelineStages = [
    { code: "P1", name: "Sales & Feasibility", range: "01-06", color: "bg-blue-500" },
    { code: "P2", name: "Advance & Approvals", range: "07-10", color: "bg-violet-500" },
    { code: "P3", name: "Procurement & Store", range: "11-13", color: "bg-teal-500" },
    { code: "P4", name: "EPC Site Execution", range: "14-17", color: "bg-indigo-500" },
    { code: "P5", name: "Closure & Subsidy", range: "18-20", color: "bg-cyan-500" },
  ];

  return (
    <>
      <aside 
        className={`hidden lg:flex h-screen fixed left-0 top-0 z-40 flex-col justify-between glass-surface border-r border-slate-200/80 bg-white/85 backdrop-blur-2xl select-none transition-all duration-300 ease-in-out ${
          isCollapsed ? "w-20" : "w-64"
        }`}
      >
        
        {/* Top Scrollable Container */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          
          {/* NIRT Brand Header & Toggle Button */}
          <div className="flex items-center justify-between px-1">
            <Link to="/" className="flex items-center space-x-2.5 overflow-hidden group">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
                <img
                  src="/brandLogo.png"
                  alt="NIRT Solar Logo"
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              {!isCollapsed && (
                <div className="min-w-0 animate-in fade-in duration-200">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-sm font-black tracking-tight text-slate-900 leading-none">
                      NIRT SOLAR
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-medium truncate mt-0.5">
                    Project Lifecycle & PMO
                  </p>
                </div>
              )}
            </Link>

            {/* Sidebar Collapse Toggle Button */}
            <button
              onClick={toggleSidebar}
              className="apple-button p-1.5 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
              title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4" />
              ) : (
                <PanelLeftClose className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* Active Role Selector Card */}
          <div className="relative">
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className={`apple-button w-full p-2 rounded-2xl bg-slate-50 border border-slate-200 hover:border-slate-300 text-left transition-all flex items-center justify-between group ${
                isCollapsed ? "justify-center" : ""
              }`}
              title={isCollapsed ? `${activeRole.title} (Click to switch)` : ""}
            >
              <div className="flex items-center space-x-2.5 min-w-0">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black uppercase font-mono shrink-0 shadow-2xs ${activeRole.badgeColor}`}>
                  {activeRole.shortCode}
                </div>
                {!isCollapsed && (
                  <div className="min-w-0 animate-in fade-in duration-200">
                    <span className="text-xs font-bold text-slate-900 block truncate leading-tight">
                      {activeRole.title.split("/")[0]}
                    </span>
                    <span className="text-[10px] text-slate-400 block truncate">
                      {activeRole.department.split("&")[0]}
                    </span>
                  </div>
                )}
              </div>
              {!isCollapsed && (
                <ChevronDown className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-600 shrink-0 ml-1" />
              )}
            </button>

            {/* Apple Role Dropdown */}
            {isRoleDropdownOpen && (
              <>
                <div
                  className="fixed inset-0 z-30"
                  onClick={() => setIsRoleDropdownOpen(false)}
                />
                <div className="absolute left-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-2xl shadow-2xl border border-slate-200/90 py-1.5 z-40 max-h-64 overflow-y-auto animate-in zoom-in-95 duration-150">
                  <span className="px-3 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider block">
                    Switch Active Role (8 Roles)
                  </span>
                  {allRoles.filter((r) => r.id !== "managing_director").map((role) => {
                    const isCur = activeRole.id === role.id;
                    return (
                      <button
                        key={role.id}
                        onClick={() => {
                          switchRole(role.id);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-left px-3 py-2 flex items-center justify-between text-xs transition-colors ${
                          isCur ? "bg-slate-100 font-bold text-slate-900" : "text-slate-600 hover:bg-slate-50"
                        }`}
                      >
                        <div className="truncate mr-2">
                          <span className="block font-medium text-slate-900 leading-tight">
                            {role.title.split("/")[0]}
                          </span>
                          <span className="text-[10px] text-slate-400 block truncate">
                            {role.department}
                          </span>
                        </div>
                        {isCur && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                      </button>
                    );
                  })}
                </div>
              </>
            )}
          </div>

          {/* Quick Action Button */}
          <button
            onClick={() => setIsActionSheetOpen(true)}
            className={`apple-button w-full py-2.5 px-3 rounded-2xl text-xs font-semibold bg-slate-900 hover:bg-black text-white shadow-md shadow-slate-900/15 flex items-center justify-center transition-all ${
              isCollapsed ? "p-2.5" : "space-x-2"
            }`}
            title="Perform Step Action"
          >
            <Plus className="w-4 h-4" />
            {!isCollapsed && <span>Perform Step Action</span>}
          </button>

          {/* Main Navigation Group */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block animate-in fade-in duration-200">
                Core Operations
              </span>
            )}
            {mainNavigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`apple-button flex items-center justify-between px-3 py-2.5 rounded-2xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-slate-900 text-white font-semibold shadow-xs"
                      : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                  } ${isCollapsed ? "justify-center px-2" : ""}`}
                  title={isCollapsed ? item.label : ""}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className={`w-4 h-4 ${isActive ? "text-white" : "text-slate-500"}`} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </div>
                  {!isCollapsed && item.badge && (
                    <span className="text-[10px] font-mono px-1.5 py-0.2 rounded-md bg-white/20 text-white">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </div>

          {/* 5 Operational Pipelines Direct Links */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block animate-in fade-in duration-200">
                5 Operational Pipelines
              </span>
            )}
            {pipelineStages.map((stage) => (
              <Link
                key={stage.code}
                to="/pipelines"
                className={`apple-button flex items-center justify-between px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 transition-all group ${
                  isCollapsed ? "justify-center px-2" : ""
                }`}
                title={isCollapsed ? `${stage.code}: ${stage.name} (${stage.range})` : ""}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <span className={`w-2 h-2 rounded-full ${stage.color} shrink-0`} />
                  {!isCollapsed && <span className="truncate">{stage.name}</span>}
                </div>
                {!isCollapsed && (
                  <span className="text-[10px] font-mono text-slate-400 group-hover:text-slate-600">
                    {stage.range}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Governance & Admin (Restricted by Role) */}
          <div className="space-y-1">
            {!isCollapsed && (
              <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block animate-in fade-in duration-200">
                Governance & Safety
              </span>
            )}
            {canViewAudit && (
              <Link
                to="/#audit"
                className={`apple-button flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-rose-700 bg-rose-50/60 border border-rose-200/60 hover:bg-rose-100/80 font-medium transition-all ${
                  isCollapsed ? "justify-center px-2" : ""
                }`}
                title={isCollapsed ? "Audit Log" : ""}
              >
                <Activity className="w-4 h-4 text-rose-600 shrink-0" />
                {!isCollapsed && <span className="truncate">Audit Log</span>}
              </Link>
            )}
            <Link
              to="/settings/users"
              className={`apple-button flex items-center space-x-3 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                pathname === "/settings/users"
                  ? "bg-slate-900 text-white shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
              } ${isCollapsed ? "justify-center px-2" : ""}`}
              title={isCollapsed ? "Users & Roles Governance" : ""}
            >
              <Users className={`w-4 h-4 shrink-0 ${pathname === "/settings/users" ? "text-white" : "text-blue-600"}`} />
              {!isCollapsed && <span>Users & Roles</span>}
            </Link>
            <Link
              to="/settings"
              className={`apple-button flex items-center space-x-3 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium transition-all ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
              title={isCollapsed ? "System Settings" : ""}
            >
              <Settings className="w-4 h-4 text-slate-500 shrink-0" />
              {!isCollapsed && <span>System Settings</span>}
            </Link>
          </div>

        </div>

        {/* Bottom Profile / Compliance Footer */}
        <div className="p-3 border-t border-slate-200/80 bg-slate-50/60 space-y-2">
          {!isCollapsed ? (
            <>
              {/* <div className="flex items-center justify-between px-1 text-[11px]">
                <span className="flex items-center space-x-1.5 text-slate-500">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>SLA Velocity 96.2%</span>
                </span>
                <span className="font-mono text-[10px] text-slate-400">v2.0 PROD</span>
              </div> */}

              <Link
                to="/login"
                className="apple-button w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all font-medium"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Switch Session</span>
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="apple-button w-full flex items-center justify-center p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-white transition-all"
              title="Sign Out / Switch Session"
            >
              <LogOut className="w-4 h-4" />
            </Link>
          )}
        </div>

      </aside>

      {/* Floating Action Sheet for Steps */}
      <QuickActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
      />
    </>
  );
}
