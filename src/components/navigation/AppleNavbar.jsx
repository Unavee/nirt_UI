import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { useSidebar } from "@/context/SidebarContext";
import { 
  Bell, 
  ChevronDown, 
  Plus,
  PanelLeftClose,
  PanelLeftOpen
} from "lucide-react";
import { QuickActionSheet } from "@/components/dashboard/QuickActionSheet";

export function AppleNavbar() {
  const { activeRole, switchRole, allRoles } = useRole();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isActionOpen, setIsActionOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-30 w-full glass-nav pt-safe">
        <div className="w-full px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Left: Desktop Sidebar Toggle & Ticker */}
          <div className="hidden lg:flex items-center space-x-3">
            <button
              onClick={toggleSidebar}
              className="apple-button p-2 text-slate-500 hover:text-slate-900 rounded-xl hover:bg-slate-100 transition-colors"
              title={isCollapsed ? "Expand sidebar (Ctrl+B)" : "Collapse sidebar (Ctrl+B)"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </button>

            <span className="flex items-center space-x-1.5 text-xs text-slate-500 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Operational Pipeline: <strong className="text-slate-800">{activeRole.pipelineScope}</strong></span>
            </span>
          </div>

          {/* Brand identity on Mobile / Tablet (Desktop has Sidebar) */}
          <Link to="/" className="flex items-center space-x-2.5 group lg:hidden">
            <div className="relative w-9 h-9 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center p-1 shrink-0 overflow-hidden">
              <img
                src="/brandLogo.png"
                alt="NIRT Solar Logo"
                width={36}
                height={36}
                className="object-contain"
              />
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-sm font-extrabold tracking-tight text-slate-900">
                  NIRT SOLAR
                </span>
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-blue-500/10 text-blue-700 border border-blue-500/20">
                  EPC
                </span>
              </div>
            </div>
          </Link>

          {/* Right side items & Role Dropdown */}
          <div className="flex items-center space-x-2.5">
            
            {/* Quick Action Button on Desktop Top Bar */}
            <button
              onClick={() => setIsActionOpen(true)}
              className="apple-button hidden sm:flex items-center space-x-1.5 px-3 py-1.5 rounded-full bg-slate-900 text-white text-xs font-semibold hover:bg-black shadow-xs"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Step Action</span>
            </button>

            {/* Quick Role Trigger Pill */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="apple-button flex items-center space-x-2 px-3 py-1.5 rounded-full glass-surface border border-slate-200 text-xs font-medium text-slate-800 shadow-xs hover:border-slate-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="font-semibold">{activeRole.shortCode}</span>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {/* Apple-style floating popover */}
              {isDropdownOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setIsDropdownOpen(false)} 
                  />
                  <div className="absolute right-0 mt-2 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-200/90 py-2 z-50 animate-in zoom-in-95 duration-150">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        Switch Active Role
                      </span>
                      <span className="text-xs font-semibold text-slate-800">
                        {activeRole.title}
                      </span>
                    </div>

                    <div className="max-h-72 overflow-y-auto py-1">
                      {allRoles.filter((r) => r.id !== "managing_director").map((role) => {
                        const isCur = activeRole.id === role.id;
                        return (
                          <button
                            key={role.id}
                            onClick={() => {
                              switchRole(role.id);
                              setIsDropdownOpen(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 flex items-center justify-between text-xs transition-colors ${
                              isCur ? "bg-slate-100/90 font-bold text-slate-900" : "text-slate-600 hover:bg-slate-50"
                            }`}
                          >
                            <div className="truncate mr-2">
                              <span className="block font-medium text-slate-900">{role.title.split("/")[0]}</span>
                              <span className="text-[10px] text-slate-400 block">{role.department}</span>
                            </div>
                            {isCur && <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Quick Notification Bell */}
            <button className="apple-button w-9 h-9 rounded-full glass-surface border border-slate-200 flex items-center justify-center text-slate-600 hover:text-slate-900">
              <Bell className="w-4 h-4" />
            </button>

          </div>

        </div>
      </header>

      <QuickActionSheet
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
      />
    </>
  );
}
