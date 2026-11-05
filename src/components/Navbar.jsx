"use client";

import { Link, useLocation } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { 
  Sun, 
  LayoutDashboard, 
  Kanban, 
  FolderKanban, 
  Calculator, 
  Settings, 
  UserCheck, 
  ShieldAlert,
  ChevronDown
} from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const { activeRole, switchRole, allRoles } = useRole();
  const [showRoleMenu, setShowRoleMenu] = useState(false);

  const navLinks = [
    { href: "/", label: "Dashboard", icon: LayoutDashboard },
    { href: "/pipelines", label: "Pipelines (3)", icon: Kanban },
    { href: "/projects", label: "Projects Registry", icon: FolderKanban },
    { href: "/calculator", label: "Solar Sizer & ROI", icon: Calculator },
    { href: "/settings", label: "Settings", icon: Settings },
  ];

  return (
    <header className="border-b-2 border-black bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Brand Logo */}
          <div className="flex items-center space-x-3">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="w-9 h-9 bg-black text-white flex items-center justify-center font-bold tracking-tighter">
                <Sun className="w-5 h-5 text-white" />
              </div>
              <div className="flex flex-col">
                <span className="font-black text-lg tracking-tight uppercase leading-none">
                  NIRT SOLAR
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-500 uppercase mt-0.5">
                  RENEWABLE ENERGY • SALEM
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Links */}
          <nav className="hidden md:flex space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`flex items-center space-x-2 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors border ${
                    isActive
                      ? "bg-black text-white border-black"
                      : "bg-white text-black border-transparent hover:border-black"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Role Switcher Simulator for Demo */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center space-x-2 border-2 border-black px-3 py-1.5 bg-zinc-50 hover:bg-zinc-100 transition-all text-xs font-mono font-bold"
            >
              <UserCheck className="w-4 h-4 text-black" />
              <div className="text-left hidden sm:block">
                <span className="text-[9px] block text-zinc-500 uppercase font-sans font-medium">Demo Perspective</span>
                <span className="text-xs text-black font-bold uppercase">{activeRole.title}</span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-black" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-1 w-64 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] z-50">
                <div className="p-2 border-b border-black bg-zinc-100 flex items-center justify-between">
                  <span className="text-[10px] font-mono font-bold uppercase text-zinc-700">Select Role View</span>
                  <span className="text-[9px] bg-black text-white px-1.5 py-0.5 font-mono">15 ROLES</span>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  {allRoles.map((role) => (
                    <button
                      key={role.id}
                      onClick={() => {
                        switchRole(role.id);
                        setShowRoleMenu(false);
                      }}
                      className={`w-full text-left px-3 py-2 text-xs font-mono border-b border-zinc-200 transition-colors flex items-center justify-between ${
                        activeRole.id === role.id ? "bg-black text-white font-bold" : "hover:bg-zinc-100 text-black"
                      }`}
                    >
                      <span>{role.title}</span>
                      {activeRole.id === role.id && <span className="text-[9px] border border-white px-1">ACTIVE</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>
      </div>
    </header>
  );
}
