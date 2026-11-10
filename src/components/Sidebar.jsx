import React, { useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { useSidebar } from "@/context/SidebarContext";
import { ROLE_WORKSPACES } from "@/data/roleWorkspaceConfig";
import {
  LayoutDashboard,
  Layers,
  FolderKanban,
  ShieldCheck,
  ChevronDown,
  LogOut,
  Activity,
  Settings,
  Users,
  PanelLeftClose,
  PanelLeftOpen,
  Headset,
  Smartphone,
  BarChart3,
  FileSpreadsheet,
  Building2,
  MessageSquare,
  CheckSquare,
  Compass,
  MapPin,
  Truck,
  Package,
  Warehouse,
  Wrench,
  Zap,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  Landmark,
  Award,
  ShieldAlert,
  FileText,
  UserCheck,
  RefreshCw,
  Sparkles
} from "lucide-react";

// Icon Map Resolver
const ICON_MAP = {
  LayoutDashboard,
  Layers,
  FolderKanban,
  ShieldCheck,
  Activity,
  Settings,
  Users,
  Headset,
  Smartphone,
  BarChart3,
  FileSpreadsheet,
  Building2,
  MessageSquare,
  CheckSquare,
  Compass,
  MapPin,
  Truck,
  Package,
  Warehouse,
  Wrench,
  Zap,
  IndianRupee,
  CreditCard,
  CheckCircle2,
  Landmark,
  Award,
  ShieldAlert,
  FileText
};

export default function Sidebar() {
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const pathname = location.pathname;
  const { activeRole, switchRole, allRoles, isExecutive, isCoordinator } = useRole();
  const { isCollapsed, toggleSidebar } = useSidebar();

  // Resolve current active workspace configuration
  const currentWorkspace =
    ROLE_WORKSPACES[activeRole.id] || ROLE_WORKSPACES.managing_director;

  return (
    <aside
      className={`hidden lg:flex h-screen fixed left-0 top-0 z-40 flex-col justify-between glass-surface border-r border-slate-200/80 bg-white/95 backdrop-blur-2xl select-none overflow-x-hidden transition-all duration-300 ease-in-out ${
        isCollapsed ? "w-20" : "w-64"
      }`}
    >
      {/* Top Scrollable Container */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* NIRT Brand Header & Toggle */}
        <div className="flex items-center justify-between px-1">
          <Link to="/" className="flex items-center space-x-2.5 overflow-hidden group">
            <div className="relative w-9 h-9 rounded-2xl overflow-hidden bg-white border border-slate-200/90 shadow-xs flex items-center justify-center p-1 shrink-0 group-hover:scale-105 transition-transform">
              <img
                src="/brandLogo.png"
                alt="NIRT Solar Logo"
                width={32}
                height={32}
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

          {/* Sidebar Collapse Toggle */}
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

        {/* Dynamic Active Role & Team Login Card */}
        {!isCollapsed ? (
          <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/90 shadow-2xs space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
                Team Login / Role
              </span>
              <span
                className={`px-1.5 py-0.2 rounded-md text-[10px] font-bold font-mono border ${currentWorkspace.color}`}
              >
                {currentWorkspace.shortCode}
              </span>
            </div>

            <div className="space-y-1">
              <div className="text-xs font-bold text-slate-900 leading-tight truncate">
                {activeRole.title}
              </div>
              <div className="text-[10px] text-slate-500 font-medium truncate">
                {currentWorkspace.departmentName}
              </div>
            </div>

            {/* Quick Role Switcher Dropdown */}
            <select
              value={activeRole.id}
              onChange={(e) => switchRole(e.target.value)}
              className="w-full text-[11px] font-semibold text-slate-700 bg-white border border-slate-200 rounded-xl px-2 py-1.5 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              title="Switch role for demonstration"
            >
              {allRoles.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.shortCode} • {r.title.split("/")[0]}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="flex justify-center">
            <button
              onClick={() => {
                const nextIdx = (allRoles.findIndex((r) => r.id === activeRole.id) + 1) % allRoles.length;
                switchRole(allRoles[nextIdx].id);
              }}
              className="w-9 h-9 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-xs font-bold font-mono text-slate-700 hover:bg-slate-200"
              title={`Active: ${activeRole.title}. Click to switch role.`}
            >
              {currentWorkspace.shortCode}
            </button>
          </div>
        )}

        {/* Section 1: My Department Workspace Navigation */}
        <div className="space-y-1">
          {!isCollapsed && (
            <div className="px-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <span>Department Workspace</span>
              <span className="text-[9px] text-blue-600 font-normal">Active</span>
            </div>
          )}

          {currentWorkspace.menuItems
            .filter((item) => !item.mobileOnly && item.href !== "/field")
            .map((item, idx) => {
            const Icon = ICON_MAP[item.icon] || LayoutDashboard;
            const targetUrl = item.tabTarget 
              ? `${item.href.split("?")[0]}?tab=${item.tabTarget}` 
              : item.href;

            const currentTab = searchParams.get("tab");
            const currentPipe = searchParams.get("pipeline");
            
            let isActive = false;
            if (item.tabTarget) {
              isActive = pathname.startsWith("/projects/") && currentTab === item.tabTarget;
            } else if (item.href.includes("?pipeline=")) {
              const targetPipe = new URLSearchParams(item.href.split("?")[1]).get("pipeline");
              isActive = pathname === "/pipelines" && (currentPipe === targetPipe || (!currentPipe && targetPipe === "sales"));
            } else {
              isActive = pathname === item.href && !currentTab;
            }

            return (
              <Link
                key={idx}
                to={targetUrl}
                className={`apple-button flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  isActive
                    ? "bg-slate-900 text-white font-semibold shadow-xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? item.label : ""}
              >
                <div className="flex items-center space-x-2.5 min-w-0">
                  <Icon className={`w-4 h-4 shrink-0 ${isActive ? "text-white" : "text-slate-500"}`} />
                  {!isCollapsed && <span className="truncate">{item.label}</span>}
                </div>
                {!isCollapsed && item.badge && (
                  <span
                    className={`text-[9px] font-mono font-bold px-1.5 py-0.2 rounded-md ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-slate-100 text-slate-600"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Section 2: My Assigned BFRD Process Steps */}
        <div className="space-y-1 pt-1">
          {!isCollapsed && (
            <div className="px-3 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">
              <span>Assigned Process Steps</span>
              <span className="text-[9px] text-emerald-600 font-mono font-bold">
                {currentWorkspace.assignedSteps.length} Steps
              </span>
            </div>
          )}

          {currentWorkspace.assignedSteps.map((step, idx) => {
            let pipeKey = "sales";
            if (step.pipeline === "P1" || step.step === "P1") pipeKey = "sales";
            else if (step.pipeline === "P2" || step.step === "P2") pipeKey = "approvals";
            else if (step.pipeline === "P3" || step.step === "P3") pipeKey = "procurement";
            else if (step.pipeline === "P4" || step.step === "P4") pipeKey = "execution";
            else if (step.pipeline === "P5" || step.step === "P5") pipeKey = "subsidy";
            else {
              const num = parseInt(step.step, 10);
              if (!isNaN(num)) {
                if (num <= 6) pipeKey = "sales";
                else if (num <= 10) pipeKey = "approvals";
                else if (num <= 13) pipeKey = "procurement";
                else if (num <= 17) pipeKey = "execution";
                else pipeKey = "subsidy";
              }
            }

            const stepUrl = `/pipelines?pipeline=${pipeKey}&step=${step.step}`;
            const currentPipe = searchParams.get("pipeline") || "sales";
            const isStepActive = pathname === "/pipelines" && currentPipe === pipeKey && searchParams.get("step") === step.step;

            return (
              <Link
                key={idx}
                to={stepUrl}
                className={`apple-button flex items-center justify-between px-3 py-1.5 rounded-xl text-xs transition-all group ${
                  isStepActive
                    ? "bg-blue-50 text-blue-900 font-semibold border border-blue-200/80 shadow-2xs"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? `Step ${step.step}: ${step.name}` : ""}
              >
                <div className="flex items-center space-x-2 min-w-0">
                  <span className={`w-5 h-5 rounded-md font-mono font-bold text-[10px] flex items-center justify-center shrink-0 border ${
                    isStepActive
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-blue-50 text-blue-700 border-blue-200/70"
                  }`}>
                    {step.step}
                  </span>
                  {!isCollapsed && <span className="truncate text-[11px] font-medium">{step.name}</span>}
                </div>
                {!isCollapsed && (
                  <span className={`text-[9px] font-mono shrink-0 ${
                    isStepActive ? "text-blue-700 font-semibold" : "text-slate-400 group-hover:text-slate-600"
                  }`}>
                    {step.pipeline}
                  </span>
                )}
              </Link>
            );
          })}
        </div>

        {/* Section 3: Governance / Mode Switcher */}
        <div className="space-y-1 pt-1 border-t border-slate-100">
          {!isCollapsed && (
            <span className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider block font-mono">
              {isExecutive || isCoordinator ? "Governance & Security" : "Quick View Mode"}
            </span>
          )}

          {isExecutive || isCoordinator ? (
            <>
              <Link
                to="/audit"
                className={`apple-button flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  pathname === "/audit"
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? "Forensic Audit Trail" : ""}
              >
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                {!isCollapsed && <span className="truncate">Forensic Audit Trail</span>}
              </Link>
              <Link
                to="/settings/users"
                className={`apple-button flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                  pathname === "/settings/users"
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70"
                } ${isCollapsed ? "justify-center px-2" : ""}`}
                title={isCollapsed ? "Users & Roles Governance" : ""}
              >
                <Users className="w-4 h-4 text-blue-600 shrink-0" />
                {!isCollapsed && <span>Users & Roles</span>}
              </Link>
              <Link
                to="/settings"
                className={`apple-button flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium transition-all ${
                  isCollapsed ? "justify-center px-2" : ""
                }`}
                title={isCollapsed ? "System Settings" : ""}
              >
                <Settings className="w-4 h-4 text-slate-500 shrink-0" />
                {!isCollapsed && <span>System Settings</span>}
              </Link>
            </>
          ) : (
            <button
              onClick={() => switchRole("managing_director")}
              className={`apple-button w-full flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs font-bold text-blue-700 bg-blue-50/70 hover:bg-blue-100/80 border border-blue-200/70 transition-all ${
                isCollapsed ? "justify-center px-2" : ""
              }`}
              title="Switch to Management View (Executive Mode)"
            >
              <Sparkles className="w-4 h-4 text-blue-600 shrink-0" />
              {!isCollapsed && <span className="truncate">Switch to Executive Mode</span>}
            </button>
          )}
        </div>
      </div>

      {/* Bottom Profile Footer */}
      <div className="p-3 border-t border-slate-200/80 bg-slate-50/60 space-y-2">
        {!isCollapsed ? (
          <Link
            to="/login"
            className="apple-button w-full flex items-center justify-center space-x-2 py-2 px-3 rounded-xl text-xs text-slate-600 hover:text-slate-900 hover:bg-white border border-slate-200 transition-all font-medium"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Switch Session / Sign Out</span>
          </Link>
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
  );
}
