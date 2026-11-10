import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  Users,
  TrendingUp,
  FolderKanban,
  IndianRupee,
  Wrench,
  Layers,
  MapPin,
  Calendar,
  Download,
  ChevronRight,
  Filter,
  Sparkles,
  ShieldCheck,
  CheckCircle2
} from "lucide-react";
import { MANAGEMENT_DASHBOARD_DATA } from "@/data/managementDashboardData";
import LeadDashboardView from "@/components/dashboard/LeadDashboardView";
import SalesDashboardView from "@/components/dashboard/SalesDashboardView";
import ProjectDashboardView from "@/components/dashboard/ProjectDashboardView";
import FinancialDashboardView from "@/components/dashboard/FinancialDashboardView";
import OperationsDashboardView from "@/components/dashboard/OperationsDashboardView";

export default function ManagementDashboardPage() {
  const [activePillar, setActivePillar] = useState("lead");
  const [selectedCircle, setSelectedCircle] = useState("All Circles");
  const [selectedTimeframe, setSelectedTimeframe] = useState("Q3 FY26");

  const pillars = [
    { id: "lead", label: "Lead Dashboard", icon: Users, badge: "Sec 26.1" },
    { id: "sales", label: "Sales Dashboard", icon: TrendingUp, badge: "Sec 26.2" },
    { id: "project", label: "Project Dashboard", icon: FolderKanban, badge: "Sec 26.3" },
    { id: "financial", label: "Financial Dashboard", icon: IndianRupee, badge: "Sec 26.4" },
    { id: "operations", label: "Operations Dashboard", icon: Wrench, badge: "Sec 26.5" }
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 max-w-full">
      {/* Top Header Card */}
      <div className="glass-surface rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              BFRD Section 26
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-700 border border-slate-200 font-mono">
              5-Pillar Executive Command Hub
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Executive Management Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl font-medium">
            Unified statutory executive surveillance across Leads, Sales order book, Project capacity, Financial collections, and Site bottlenecks.
          </p>
        </div>

        {/* Filters and Actions */}
        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <select
            value={selectedCircle}
            onChange={(e) => setSelectedCircle(e.target.value)}
            className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
          >
            <option value="All Circles">All Circles (HQ)</option>
            <option value="Salem">Salem Circle</option>
            <option value="Namakkal">Namakkal Circle</option>
            <option value="Erode">Erode Circle</option>
            <option value="Coimbatore">Coimbatore Circle</option>
            <option value="Dharmapuri">Dharmapuri Circle</option>
          </select>

          <select
            value={selectedTimeframe}
            onChange={(e) => setSelectedTimeframe(e.target.value)}
            className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20 shadow-2xs"
          >
            <option value="Q3 FY26">Q3 FY26 (Oct-Dec)</option>
            <option value="Q2 FY26">Q2 FY26 (Jul-Sep)</option>
            <option value="Q1 FY26">Q1 FY26 (Apr-Jun)</option>
            <option value="FY 2025-26">FY 2025–26 (Full Year)</option>
          </select>

          <Link
            to="/pipelines"
            className="apple-button flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>5-Pipeline Board</span>
          </Link>
        </div>
      </div>

      {/* 5-Pillar Segmented Switcher */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-medium overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activePillar === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => setActivePillar(pillar.id)}
              className={`px-4 py-2.5 rounded-2xl whitespace-nowrap transition-all text-xs font-bold flex items-center space-x-2 ${
                isActive
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? "text-blue-400" : "text-slate-500"}`} />
              <span>{pillar.label}</span>
              <span
                className={`px-1.5 py-0.5 rounded-md text-[10px] font-mono ${
                  isActive ? "bg-white/20 text-white" : "bg-slate-100 text-slate-500"
                }`}
              >
                {pillar.badge}
              </span>
            </button>
          );
        })}
      </div>

      {/* Pillar Content Views */}
      <div className="transition-opacity duration-200">
        {activePillar === "lead" && (
          <LeadDashboardView data={MANAGEMENT_DASHBOARD_DATA.leadDashboard} />
        )}

        {activePillar === "sales" && (
          <SalesDashboardView data={MANAGEMENT_DASHBOARD_DATA.salesDashboard} />
        )}

        {activePillar === "project" && (
          <ProjectDashboardView data={MANAGEMENT_DASHBOARD_DATA.projectDashboard} />
        )}

        {activePillar === "financial" && (
          <FinancialDashboardView data={MANAGEMENT_DASHBOARD_DATA.financialDashboard} />
        )}

        {activePillar === "operations" && (
          <OperationsDashboardView data={MANAGEMENT_DASHBOARD_DATA.operationsDashboard} />
        )}
      </div>
    </div>
  );
}
