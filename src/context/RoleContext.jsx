"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { ROLES_DEFINITIONS, INITIAL_SYSTEM_AUDIT_LOG } from "@/data/rolesData";
import { DEFAULT_RBAC_MATRIX } from "@/data/rbacData";

const RoleContext = createContext(null);

export function RoleProvider({ children }) {
  const [activeRole, setActiveRole] = useState(ROLES_DEFINITIONS[0]);
  const [activeRbacRoleId, setActiveRbacRoleId] = useState("super_admin");
  const [auditLogs, setAuditLogs] = useState(INITIAL_SYSTEM_AUDIT_LOG);

  const RBAC_ROLE_ALIAS_MAP = {
    super_admin: "managing_director",
    management: "managing_director",
    project_manager: "project_coordinator",
    crm_manager: "project_coordinator",
    crm_executive: "sales_rep",
    sales_team: "sales_rep",
    site_survey_team: "site_surveyor",
    design_team: "project_coordinator",
    purchase_team: "warehouse_manager",
    store_team: "warehouse_manager",
    installation_team: "epc_manager",
    accounts_team: "accounts_officer",
    liaison_team: "liaison_officer",
    subsidy_team: "subsidy_desk",
    customer: "managing_director"
  };

  // Support persistence in local storage
  useEffect(() => {
    try {
      const savedRbacId = localStorage.getItem("nirt_active_rbac_role_id");
      if (savedRbacId) {
        setActiveRbacRoleId(savedRbacId);
      }
      const savedRoleId = localStorage.getItem("nirt_active_role_id");
      if (savedRoleId) {
        const found = ROLES_DEFINITIONS.find((r) => r.id === savedRoleId);
        if (found) setActiveRole(found);
        else setActiveRole(ROLES_DEFINITIONS[0]);
      } else {
        setActiveRole(ROLES_DEFINITIONS[0]);
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
    const targetId = RBAC_ROLE_ALIAS_MAP[roleId] || roleId;
    const found = ROLES_DEFINITIONS.find((r) => r.id === targetId || r.id === roleId);
    if (found) {
      setActiveRole(found);
      setActiveRbacRoleId(roleId);
      try {
        localStorage.setItem("nirt_active_role_id", targetId);
        localStorage.setItem("nirt_active_rbac_role_id", roleId);
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

  // RBAC Permission Check: can(moduleId, actionId)
  const can = (moduleId, actionId = "view") => {
    try {
      const stored = localStorage.getItem("nirt_rbac_permission_matrix");
      const matrix = stored ? JSON.parse(stored) : DEFAULT_RBAC_MATRIX;
      const roleId = activeRbacRoleId || "super_admin";
      const rolePermissions = matrix[roleId];
      if (!rolePermissions) return true;
      if (rolePermissions[moduleId] && rolePermissions[moduleId][actionId] !== undefined) {
        return Boolean(rolePermissions[moduleId][actionId]);
      }
      return true;
    } catch {
      return true;
    }
  };

  return (
    <RoleContext.Provider 
      value={{ 
        activeRole, 
        activeRbacRoleId,
        switchRole, 
        allRoles: ROLES_DEFINITIONS,
        isExecutive,
        isCoordinator,
        canViewAudit,
        isStepAllowed,
        can,
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
