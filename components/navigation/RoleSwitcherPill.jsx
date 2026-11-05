"use client";

import React, { useRef } from "react";
import { useRole } from "@/context/RoleContext";
import { 
  ShieldCheck, 
  Users, 
  Compass, 
  Package, 
  HardHat, 
  Building2, 
  IndianRupee, 
  BadgePercent, 
  Activity 
} from "lucide-react";

export function RoleSwitcherPill() {
  const { activeRole, switchRole, allRoles } = useRole();
  const scrollContainerRef = useRef(null);

  // Exclude MD tab from the top pill navigation
  const visibleRoles = allRoles.filter(
    (role) => role.id !== "managing_director" && role.shortCode !== "MD"
  );

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case "managing_director": return ShieldCheck;
      case "sales_rep": return Users;
      case "site_surveyor": return Compass;
      case "warehouse_manager": return Package;
      case "epc_manager": return HardHat;
      case "liaison_officer": return Building2;
      case "accounts_officer": return IndianRupee;
      case "subsidy_coordinator": return BadgePercent;
      case "project_coordinator": return Activity;
      default: return Users;
    }
  };

  return (
    <div className="w-full">
      {/* Sleek Horizontal Scrollable Pills */}
      <div 
        ref={scrollContainerRef}
        className="flex items-center space-x-1.5 overflow-x-auto p-1.5 glass-surface rounded-2xl border border-slate-200/80 shadow-xs [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {visibleRoles.map((role) => {
          const isActive = activeRole.id === role.id;
          const Icon = getRoleIcon(role.id);

          return (
            <button
              key={role.id}
              onClick={() => switchRole(role.id)}
              className={`apple-button shrink-0 flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-medium transition-all ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"
              }`}
            >
              <span className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-emerald-400" : "bg-slate-300"}`} />
              <Icon className="w-3.5 h-3.5 stroke-[2.2]" />
              <span className="whitespace-nowrap font-mono text-[11px]">
                {role.shortCode}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
