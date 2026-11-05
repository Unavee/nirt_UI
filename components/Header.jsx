"use client";

import { useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { Search, Bell, ChevronRight, Zap, PanelLeftClose, PanelLeftOpen, Menu, ChevronDown, Shield, Check } from "lucide-react";
import Link from "next/link";
import CommandPalette from "@/components/CommandPalette";
import { useSidebar } from "@/context/SidebarContext";
import { useRole } from "@/context/RoleContext";

export default function Header() {
  const pathname = usePathname();
  const { isCollapsed, toggleSidebar, toggleMobileSidebar } = useSidebar();
  const { activeRole, switchRole, allRoles } = useRole();
  const [isPaletteOpen, setIsPaletteOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsRoleDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard shortcut listener for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsPaletteOpen((prev) => !prev);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const getBreadcrumbs = () => {
    if (pathname === "/") return ["NIRT Solar", "Dashboard"];
    if (pathname.startsWith("/pipelines")) return ["NIRT Solar", "Pipelines", "Quad-Pipeline Board"];
    if (pathname.startsWith("/projects/")) return ["NIRT Solar", "Projects", "Project Details"];
    if (pathname.startsWith("/projects")) return ["NIRT Solar", "Projects"];
    if (pathname.startsWith("/calculator")) return ["NIRT Solar", "Engineering", "Solar Sizer"];
    if (pathname.startsWith("/settings/users")) return ["NIRT Solar", "Admin", "User Access"];
    if (pathname.startsWith("/settings")) return ["NIRT Solar", "Admin", "Settings"];
    return ["NIRT Solar", "Overview"];
  };

  const breadcrumbs = getBreadcrumbs();
  const currentTitle = breadcrumbs[breadcrumbs.length - 1];

  return (
    <>
      <header className="h-16 bg-white border-b border-zinc-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30 shadow-[0_1px_3px_rgba(0,0,0,0.02)]">
        
        {/* Left: Mobile Hamburger & Desktop Collapse Toggle */}
        <div className="flex items-center space-x-2 sm:space-x-3 text-xs font-mono min-w-0">
          
          <button
            onClick={toggleMobileSidebar}
            className="lg:hidden p-1.5 text-zinc-700 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
            title="Open Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <button
            onClick={toggleSidebar}
            title={isCollapsed ? "Expand Sidebar (Ctrl + B)" : "Collapse Sidebar (Ctrl + B)"}
            className="hidden lg:block p-1.5 text-zinc-400 hover:text-black hover:bg-zinc-100 transition-colors cursor-pointer shrink-0"
          >
            {isCollapsed ? (
              <PanelLeftOpen className="w-4 h-4 text-zinc-700" />
            ) : (
              <PanelLeftClose className="w-4 h-4 text-zinc-700" />
            )}
          </button>

          <div className="hidden sm:block h-4 w-px bg-zinc-200 shrink-0" />

          {/* Breadcrumbs */}
          <div className="flex items-center space-x-1.5 truncate">
            <div className="hidden sm:flex items-center space-x-1.5 truncate">
              {breadcrumbs.map((crumb, idx) => (
                <div key={idx} className="flex items-center space-x-1.5">
                  {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-zinc-300 shrink-0" />}
                  <span className={idx === breadcrumbs.length - 1 ? "font-semibold text-zinc-900 truncate" : "text-zinc-500 hover:text-black cursor-pointer transition-colors"}>
                    {crumb}
                  </span>
                </div>
              ))}
            </div>

            <span className="sm:hidden font-bold text-zinc-900 text-xs truncate">
              {currentTitle}
            </span>
          </div>

        </div>

        {/* Right Tools */}
        <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
          
          {/* Active Role Switcher Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setIsRoleDropdownOpen(!isRoleDropdownOpen)}
              className="flex items-center space-x-2 h-9 px-3 bg-zinc-50 hover:bg-zinc-100 border border-zinc-200 text-xs font-mono text-zinc-900 transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98]"
              title="Switch Active Operational Role"
            >
              <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold max-w-[120px] sm:max-w-[200px] truncate">{activeRole.title}</span>
              <ChevronDown className="w-3.5 h-3.5 text-zinc-400" />
            </button>

            {isRoleDropdownOpen && (
              <div className="absolute right-0 mt-1 w-72 bg-white border border-zinc-300 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="p-2.5 border-b border-zinc-100 bg-zinc-50">
                  <div className="text-[10px] font-mono font-bold uppercase text-zinc-500">Switch Operational Perspective</div>
                  <div className="text-[11px] text-zinc-700 font-sans mt-0.5">Select a role to preview its tailored workspace</div>
                </div>
                <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100">
                  {allRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        switchRole(role.id);
                        setIsRoleDropdownOpen(false);
                      }}
                      className={`w-full text-left p-2.5 text-xs transition-colors flex items-start justify-between ${
                        activeRole.id === role.id ? "bg-zinc-900 text-white" : "hover:bg-zinc-50 text-zinc-800"
                      }`}
                    >
                      <div>
                        <div className="font-semibold">{role.title}</div>
                        <div className={`text-[10px] font-mono mt-0.5 ${activeRole.id === role.id ? "text-zinc-400" : "text-zinc-500"}`}>
                          {role.department}
                        </div>
                      </div>
                      {activeRole.id === role.id && <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Desktop Search Button */}
          <button
            onClick={() => setIsPaletteOpen(true)}
            className="hidden md:flex items-center h-9 w-48 lg:w-60 bg-zinc-50 border border-zinc-200 hover:border-zinc-300 px-3 text-left transition-colors cursor-pointer shadow-2xs group"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400 group-hover:text-black mr-2.5 flex-shrink-0 transition-colors" />
            <span className="flex-1 text-xs text-zinc-400 font-normal truncate">
              Search...
            </span>
            <span className="ml-2 px-1.5 py-0.5 bg-white text-[10px] font-mono text-zinc-500 border border-zinc-200 flex-shrink-0 shadow-2xs">
              Ctrl+K
            </span>
          </button>

          {/* Notifications */}
          <button
            onClick={() => alert("3 Active Notifications: Inspection scheduled in Salem circle, 5kW Surya Ghar application submitted, Earth Pit report awaiting sign-off.")}
            className="relative h-9 w-9 flex items-center justify-center border border-zinc-200 hover:border-zinc-300 bg-white transition-colors cursor-pointer shadow-2xs active:scale-[0.98]"
            title="Notifications"
          >
            <Bell className="w-4 h-4 text-zinc-600" />
            <span className="w-1.5 h-1.5 bg-black absolute top-2 right-2" />
          </button>

        </div>

      </header>

      {/* Global Command Palette */}
      <CommandPalette
        isOpen={isPaletteOpen}
        onClose={() => setIsPaletteOpen(false)}
      />
    </>
  );
}
