import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import { RoleSwitcherPill } from "@/components/navigation/RoleSwitcherPill";
import { RoleDashboardView } from "@/components/dashboard/RoleDashboardView";
import { 
  AppleDonutChart, 
  AppleBarLineChart, 
  AppleHorizontalBarChart, 
  AppleFunnelChart 
} from "@/components/dashboard/AppleCharts";
import { 
  Clock, 
  Users, 
  MapPin, 
  IndianRupee, 
  AlertCircle, 
  CheckCircle2, 
  Layers, 
  Zap, 
  FolderKanban, 
  Truck, 
  Wrench, 
  ClipboardCheck, 
  Building2, 
  FileText,
  ChevronRight,
  TrendingUp,
  Sparkles,
  AlertTriangle
} from "lucide-react";

export default function DashboardPage() {
  const { activeRole, isExecutive, isCoordinator } = useRole();
  const [selectedCircle, setSelectedCircle] = useState("All Circles");

  // Determine if viewing CRM Management Executive Dashboard
  const isManagementView = isExecutive || isCoordinator || activeRole.id === "project_coordinator";

  // If viewing as specialized field staff (e.g. Sales, Surveyor, Warehouse, Accounts), render their focused workspace
  if (!isManagementView) {
    return (
      <div className="space-y-4 sm:space-y-6">
        <RoleSwitcherPill />
        <RoleDashboardView />
      </div>
    );
  }

  // --- CRM MANAGEMENT EXECUTIVE DATA & CHARTS ---

  // 1. TODAY STATS & CHART
  const todayMetrics = [
    { label: "New Leads", value: "14", change: "+4 since 9 AM", icon: Users, color: "text-blue-600 bg-blue-50 border-blue-100" },
    { label: "Follow-ups Due", value: "8", change: "2 High Priority", icon: Clock, color: "text-violet-600 bg-violet-50 border-violet-100" },
    { label: "Site Surveys Today", value: "5", change: "Salem & Namakkal", icon: MapPin, color: "text-sky-600 bg-sky-50 border-sky-100" },
    { label: "Customer Meetings", value: "3", change: "Commercial C&I", icon: Building2, color: "text-slate-700 bg-slate-100 border-slate-200" },
    { label: "Payments Due", value: "₹4.8L", change: "4 Projects at Stage 7/16", icon: IndianRupee, color: "text-emerald-700 bg-emerald-50 border-emerald-100" },
    { label: "Projects Due for Action", value: "9", change: "Pending Sign-off", icon: Sparkles, color: "text-blue-700 bg-blue-50 border-blue-100" },
    { label: "Overdue Tasks", value: "2", change: "SLA Escalation", icon: AlertCircle, color: "text-rose-700 bg-rose-50 border-rose-200" },
  ];

  const todayCircleBreakdown = [
    { name: "Salem (HQ)", value: 6 },
    { name: "Namakkal", value: 4 },
    { name: "Erode", value: 3 },
    { name: "Coimbatore", value: 2 },
    { name: "Dharmapuri", value: 1 },
  ];

  // 2. PROJECTS STATS & CHARTS
  const projectMetrics = [
    { label: "Total Projects", value: "48", helper: "All-time Active Pipeline", icon: FolderKanban, color: "text-slate-900" },
    { label: "Projects in Progress", value: "26", helper: "Pipelines 1–4", icon: Layers, color: "text-blue-600" },
    { label: "Projects Delayed", value: "3", helper: ">10d SLA Alert", icon: AlertTriangle, color: "text-rose-600" },
    { label: "Projects Completed", value: "19", helper: "Triple Closed", icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Under Execution", value: "185.5 kW", helper: "12 Ongoing Sites", icon: Zap, color: "text-indigo-600" },
    { label: "Commissioned", value: "312.0 kW", helper: "Grid-Connected", icon: TrendingUp, color: "text-teal-600" },
  ];

  const monthlyCapacityTrend = [
    { month: "Jun", revenue: 32, margin: 18 },
    { month: "Jul", revenue: 41, margin: 22 },
    { month: "Aug", revenue: 44, margin: 23 },
    { month: "Sep", revenue: 52, margin: 26 },
    { month: "Oct", revenue: 48, margin: 22 },
    { month: "Nov", revenue: 60, margin: 28 },
  ];

  const pipelineDistribution = [
    { name: "P1: Sales & Feasibility", value: 18 },
    { name: "P2: Advance & Approvals", value: 9 },
    { name: "P3: Procurement & Stores", value: 6 },
    { name: "P4: EPC Site Execution", value: 12 },
    { name: "P5: Closure & Subsidy", value: 7 },
  ];

  // 3. FINANCE STATS & CHARTS
  const financeMetrics = [
    { label: "Total Order Value", value: "₹2.48 Cr", sub: "48 Booked Orders", highlight: "neutral" },
    { label: "Amount Received", value: "₹1.92 Cr", sub: "77.4% Collection Ratio", highlight: "positive" },
    { label: "Outstanding Amount", value: "₹56.0 Lakhs", sub: "Milestone-Bound", highlight: "neutral" },
    { label: "Overdue Amount", value: "₹0.00", sub: "Step 07 Hard Lock Protected", highlight: "positive" },
    { label: "Subsidy Receivable", value: "₹34.2 Lakhs", sub: "14 Claims in National Portal", highlight: "neutral" },
    { label: "Subsidy Received", value: "₹28.4 Lakhs", sub: "Directly Credited to Customer Banks", highlight: "positive" },
  ];

  const financeMilestonesBreakdown = [
    { label: "80% Advance Receipts", value: 68, color: "#3b82f6" },
    { label: "10% Installation Balance", value: 16, color: "#8b5cf6" },
    { label: "10% Final Settlement", value: 10, color: "#10b981" },
    { label: "PM Surya Ghar DBT", value: 6, color: "#06b6d4" },
  ];

  // 4. OPERATIONS STATS & FUNNEL
  const operationsMetrics = [
    { label: "Procurement Pending", count: 4, desc: "Step 11: Vendor POs awaiting dispatch", badge: "P3 Stores", icon: Truck, color: "border-teal-200 bg-teal-50/50 text-teal-800" },
    { label: "Installation Pending", count: 6, desc: "Step 14: Material delivered, team en route", badge: "P4 Civil", icon: Wrench, color: "border-indigo-200 bg-indigo-50/50 text-indigo-800" },
    { label: "Inspection Pending", count: 3, desc: "Step 15: Earth pit (<5Ω) & string tests", badge: "P4 Safety", icon: ClipboardCheck, color: "border-blue-200 bg-blue-50/50 text-blue-800" },
    { label: "Net Metering Pending", count: 5, desc: "Step 17: TANGEDCO meter sync scheduled", badge: "P4 Grid", icon: Zap, color: "border-violet-200 bg-violet-50/50 text-violet-800" },
    { label: "Documentation Pending", count: 2, desc: "Step 08: KYC & Property Tax awaiting upload", badge: "P2 KYC", icon: FileText, color: "border-rose-200 bg-rose-50/50 text-rose-800" },
  ];

  const operationsExecutionFunnel = [
    { name: "Step 11: Vendor PO Issued", count: 18, pct: 100 },
    { name: "Step 12: Warehouse GRN Cleared", count: 14, pct: 78 },
    { name: "Step 13: Site Dispatched", count: 12, pct: 67 },
    { name: "Step 14: Module Erection", count: 9, pct: 50 },
    { name: "Step 17: Net Meter Synchronized", count: 6, pct: 33 },
  ];

  return (
    <div className="space-y-6 sm:space-y-8 pb-10">

      {/* Top Segmented Role Switcher */}
      <RoleSwitcherPill />

      {/* Management Top Header */}
      <div className="glass-surface rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
              CRM Management Portal
            </span>
            <span className="text-xs text-slate-400 font-mono">
              Live Operations & Charts 
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight mt-1">
            CRM Executive Dashboard
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Integrated live analytics across Today&apos;s actions, Project portfolios, Financial cashflow, and Site bottlenecks.
          </p>
        </div>

        {/* Circle Filter & Quick Board Link */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <select
            value={selectedCircle}
            onChange={(e) => setSelectedCircle(e.target.value)}
            className="text-xs px-3.5 py-2 rounded-xl border border-slate-200 bg-white font-semibold text-slate-700 focus:outline-none focus:ring-1 focus:ring-slate-900 shadow-2xs"
          >
            <option value="All Circles">All Circles (HQ)</option>
            <option value="Salem">Salem Circle</option>
            <option value="Namakkal">Namakkal Circle</option>
            <option value="Erode">Erode Circle</option>
            <option value="Dharmapuri">Dharmapuri Circle</option>
            <option value="Coimbatore">Coimbatore Circle</option>
          </select>

          <Link to="/pipelines"
            className="apple-button flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-md shadow-slate-900/10"
          >
            <span>Master 5-Pipeline</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* 1. TODAY SECTION: STATS + CHART */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-blue-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider text-[12px]">
              TODAY • Action & Daily Tasks
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Daily Target Realization</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: 7 Action Pulse Stats Grid */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {todayMetrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border transition-all apple-card flex flex-col justify-between ${item.color} ${idx === 6 ? "col-span-2 sm:col-span-2" : ""}`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-slate-700 leading-tight truncate">{item.label}</span>
                    <Icon className="w-4 h-4 shrink-0 opacity-80" />
                  </div>
                  <div>
                    <div className="text-xl sm:text-2xl font-black font-mono tracking-tight text-slate-900">
                      {item.value}
                    </div>
                    <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                      {item.change}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right: Live Circle Task Distribution Chart */}
          <div className="h-full">
            <AppleHorizontalBarChart 
              title="Today's Actions by Circle" 
              items={todayCircleBreakdown}
              labelKey="name"
              valueKey="value"
              subtitle="Active tasks distributed across Tamil Nadu branches"
            />
          </div>
        </div>
      </section>

      {/* 2. PROJECTS SECTION: STATS + CHARTS */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-indigo-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider text-[12px]">
              PROJECTS • Lifecycle Portfolio & Sizing
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Step 01 to Step 20 Health</span>
        </div>

        {/* 6 Metric Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
          {projectMetrics.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="glass-surface p-3.5 rounded-2xl border border-slate-200/80 shadow-xs flex flex-col justify-between apple-card"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-slate-500 leading-tight truncate">{item.label}</span>
                  <div className={`w-6 h-6 rounded-lg flex items-center justify-center bg-slate-50 border border-slate-100 ${item.color}`}>
                    <Icon className="w-3 h-3" />
                  </div>
                </div>
                <div>
                  <span className={`text-xl sm:text-2xl font-black font-mono tracking-tight block ${item.color}`}>
                    {item.value}
                  </span>
                  <span className="text-[10px] text-slate-400 block truncate mt-0.5">
                    {item.helper}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 2 Live Charts Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <AppleHorizontalBarChart 
            title="Projects across 5 Operational Pipelines" 
            items={pipelineDistribution}
            labelKey="name"
            valueKey="value"
            subtitle="Pipeline flow: Sales → Approvals → Procurement → Site → Subsidy"
          />
          <AppleBarLineChart 
            title="Monthly Commissioned kW & Revenue Trend" 
            data={monthlyCapacityTrend} 
          />
        </div>
      </section>

      {/* 3. FINANCE SECTION: STATS + DONUT CHART */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-emerald-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider text-[12px]">
              FINANCE • Commercial Cashflow & Subsidies
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">80% / 10% / 10% Milestone Security</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: 6 Financial Stats Cards */}
          <div className="lg:col-span-2 grid grid-cols-2 sm:grid-cols-3 gap-2.5">
            {financeMetrics.map((item, idx) => (
              <div
                key={idx}
                className={`p-3.5 rounded-2xl border shadow-xs apple-card flex flex-col justify-between ${
                  item.highlight === "positive"
                    ? "bg-emerald-50/40 border-emerald-200/70"
                    : "bg-white border-slate-200/80"
                }`}
              >
                <div>
                  <span className="text-xs font-semibold text-slate-500 block leading-tight">{item.label}</span>
                  <span className={`text-lg sm:text-xl font-black font-mono tracking-tight mt-1 block ${
                    item.highlight === "positive" ? "text-emerald-700" : "text-slate-900"
                  }`}>
                    {item.value}
                  </span>
                </div>
                <div className="mt-2 pt-1.5 border-t border-slate-100 text-[10px] text-slate-500 truncate">
                  {item.sub}
                </div>
              </div>
            ))}
          </div>

          {/* Right: Cash Inflow Milestones Donut Chart */}
          <div className="h-full">
            <AppleDonutChart 
              title="Milestone Cashflow Breakdown"
              segments={financeMilestonesBreakdown}
              subtitle="Cash realized across 80% Advance, 10% Install & 10% Final"
            />
          </div>
        </div>
      </section>

      {/* 4. OPERATIONS SECTION: STATS + FUNNEL CHART */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 rounded-full bg-teal-600" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 uppercase tracking-wider text-[12px]">
              OPERATIONS • Execution & Bottlenecks Watchlist
            </h2>
          </div>
          <span className="text-xs text-slate-400 font-medium">Pending Tasks Requiring Clearance</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Left: 5 Operations Bottleneck Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {operationsMetrics.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className={`p-3.5 rounded-2xl border shadow-xs flex flex-col justify-between apple-card ${item.color} ${idx === 4 ? "sm:col-span-2" : ""}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-0.5">
                      <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-1.5 py-0.2 rounded bg-white/70 border border-current/20">
                        {item.badge}
                      </span>
                      <h3 className="text-xs font-bold pt-1 leading-snug">{item.label}</h3>
                    </div>
                    <div className="text-lg font-black font-mono px-2 py-0.5 rounded-xl bg-white shadow-2xs">
                      {item.count}
                    </div>
                  </div>
                  <p className="text-[10px] opacity-80 leading-relaxed mt-2 pt-1.5 border-t border-current/15">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right: Site Execution Bottleneck Funnel Chart */}
          <div className="h-full">
            <AppleFunnelChart 
              title="Site Execution Progression"
              steps={operationsExecutionFunnel}
              subtitle="Conversion rate from Vendor PO to Net Meter Synchronization"
            />
          </div>
        </div>
      </section>

    </div>
  );
}