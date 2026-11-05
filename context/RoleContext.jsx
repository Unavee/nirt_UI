"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ROLES_DEFINITIONS, INITIAL_SYSTEM_AUDIT_LOG } from "@/data/rolesData";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(ROLES_DEFINITIONS[1]);
  const [auditLogs, setAuditLogs] = useState(INITIAL_SYSTEM_AUDIT_LOG);

  // Support persistence in local storage
  useEffect(() => {
    try {
      const savedRoleId = localStorage.getItem("nirt_active_role_id");
      if (savedRoleId && savedRoleId !== "managing_director") {
        const found = ROLES_DEFINITIONS.find((r) => r.id === savedRoleId);
        if (found) setActiveRole(found);
      } else {
        setActiveRole(ROLES_DEFINITIONS[1]);
      }
      
      const savedAudit = localStorage.getItem("nirt_system_audit_logs") || localStorage.getItem("nirt_forensic_audit_logs");
      if (savedAudit) {
        setAuditLogs(JSON.parse(savedAudit));
      }
    } catch {
      // LocalStorage unavailable in SSR
    }
  }, []);

  const switchRole = (roleId) => {
    const found = ROLES_DEFINITIONS.find((r) => r.id === roleId);
    if (found) {
      setActiveRole(found);
      try {
        localStorage.setItem("nirt_active_role_id", roleId);
      } catch {
        // Storage failure fallback
      }
    }
  };

  // Add System Audit Entry (Strictly Append-Only: Zero Delete Rule)
  const addAuditEntry = ({ staffName, projectId, clientName, step, field, oldValue, newValue, reason }) => {
    const newEntry = {
      id: `AUD-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata"
      }).format(new Date()) + " IST",
      staffName: staffName || activeRole.title.split("/")[0].trim(),
      role: activeRole.title,
      projectId: projectId || "NIRT-2610-0042",
      clientName: clientName || "General Project",
      step: step || "Operational Step",
      field: field || "Field Value",
      oldValue: oldValue || "—",
      newValue: newValue || "—",
      reason: reason || "Standard verification update"
    };

    setAuditLogs((prev) => {
      const updated = [newEntry, ...prev];
      try {
        localStorage.setItem("nirt_system_audit_logs", JSON.stringify(updated));
      } catch {
        // Storage fallback
      }
      return updated;
    });

    return newEntry;
  };

  const isExecutive = activeRole.id === "managing_director";
  const isCoordinator = activeRole.id === "project_coordinator";
  // Audit log is strictly visible only to PMO and Managing Director / Executive
  const canViewAudit = isExecutive || isCoordinator;

  const isStepAllowed = (stepNumber) => {
    if (activeRole.ownedSteps?.includes(stepNumber)) return true;
    return false;
  };

  return (
    <RoleContext.Provider 
      value={{ 
        activeRole, 
        switchRole, 
        allRoles: ROLES_DEFINITIONS,
        isExecutive,
        isCoordinator,
        canViewAudit,
        isStepAllowed,
        auditLogs,
        addAuditEntry
      }}
    >
      {children}
    </RoleContext.Provider>
  );
}

export function useRole() {
  const context = useContext(RoleContext);
  if (!context) {
    throw new Error("useRole must be used within a RoleProvider");
  }
  return context;
}
