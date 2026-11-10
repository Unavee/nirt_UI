"use client";

import React, { useState } from "react";
import { useRole } from "@/context/RoleContext";
import { AppleStatCard } from "@/components/dashboard/AppleStatCard";
import { 
  AppleDonutChart, 
  AppleFunnelChart, 
  AppleBarLineChart, 
  AppleHorizontalBarChart, 
  AppleInventoryChart, 
  AppleScoreboard 
} from "@/components/dashboard/AppleCharts";
import { QuickActionSheet } from "@/components/dashboard/QuickActionSheet";
import { EditWithReasonModal } from "@/components/pipeline/EditWithReasonModal";
import { 
  Plus, 
  ArrowUpRight, 
  FileEdit, 
  ShieldCheck, 
  ChevronRight
} from "lucide-react";

export function RoleDashboardView() {
  const { activeRole, canViewAudit, auditLogs } = useRole();
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState(null);

  const openAction = (act) => {
    setSelectedAction(act);
    setIsActionSheetOpen(true);
  };

  return (
    <div className="space-y-4 sm:space-y-6">
      
      {/* Role Banner Card (Mobile Compact & Desktop Spacious) */}
      <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold font-mono uppercase tracking-wider ${activeRole.badgeColor}`}>
                {activeRole.shortCode}
              </span>
              <span className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate">
                {activeRole.department}
              </span>
            </div>
            <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeRole.title}
            </h1>
            <p className="text-[11px] sm:text-xs text-slate-500">
              Scope: <strong className="text-slate-700">{activeRole.pipelineScope}</strong>
            </p>
          </div>

          {/* Quick Trigger Buttons (Clean 2-Col Grid on Mobile) */}
          <div className="grid grid-cols-2 sm:flex sm:items-center gap-2 pt-1 sm:pt-0 shrink-0">
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="apple-button flex items-center justify-center space-x-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
            >
              <FileEdit className="w-3.5 h-3.5 text-slate-500" />
              <span>Edit Reason</span>
            </button>

            <button
              onClick={() => openAction(activeRole.operationalActions?.[0])}
              className="apple-button flex items-center justify-center space-x-1.5 px-3.5 py-2.5 rounded-xl text-xs font-semibold bg-slate-900 text-white hover:bg-black shadow-md shadow-slate-900/10"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Step Action</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Primary KPI Stat Cards (2x2 on Mobile with zero overflow) */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4">
        {activeRole.stats?.map((stat, idx) => (
          <AppleStatCard
            key={idx}
            index={idx}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            helper={stat.helper}
          />
        ))}
      </div>

      {/* Role-Specific Live Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-6">
        
        {/* Role 1: Managing Director */}
        {activeRole.id === "managing_director" && (
          <>
            <AppleBarLineChart 
              title={activeRole.charts.revenueMargin.title} 
              data={activeRole.charts.revenueMargin.months} 
            />
            <AppleDonutChart 
              title={activeRole.charts.customerCategory.title} 
              segments={activeRole.charts.customerCategory.segments}
              subtitle="Residential vs C&I Demand Split"
            />
            <div className="lg:col-span-2">
              <AppleHorizontalBarChart 
                title={activeRole.charts.systemBalance.title}
                items={activeRole.charts.systemBalance.pipelines}
                labelKey="name"
                valueKey="count"
                subtitle="Distribution of 52 Active Deals across the 5 Stages"
              />
            </div>
          </>
        )}

        {/* Role 2: Field Sales */}
        {activeRole.id === "sales_rep" && (
          <>
            <AppleFunnelChart 
              title={activeRole.charts.salesFunnel.title}
              steps={activeRole.charts.salesFunnel.steps}
              subtitle="Inquiry to 80% Advance Conversion Velocity"
            />
            <AppleDonutChart 
              title={activeRole.charts.disqualificationAudit.title}
              segments={activeRole.charts.disqualificationAudit.segments}
              subtitle="Root Causes Logged for Cat D Dropped Leads"
            />
            <div className="lg:col-span-2">
              <AppleHorizontalBarChart 
                title={activeRole.charts.leadSources.title}
                items={activeRole.charts.leadSources.sources}
                labelKey="source"
                valueKey="value"
                subtitle="Highest Performing Acquisition Channels"
              />
            </div>
          </>
        )}

        {/* Role 3: Site Surveyor */}
        {activeRole.id === "site_surveyor" && (
          <>
            <AppleDonutChart 
              title={activeRole.charts.roofDistribution.title}
              segments={activeRole.charts.roofDistribution.segments}
              subtitle="Roof Type Breakdown across Surveyed Sites"
            />
            <AppleHorizontalBarChart 
              title={activeRole.charts.supplyPhase.title}
              items={activeRole.charts.supplyPhase.phases}
              labelKey="phase"
              valueKey="value"
              subtitle="TANGEDCO Grid Phase Verification"
            />
            <AppleDonutChart 
              title={activeRole.charts.feasibilityApproval.title}
              segments={activeRole.charts.feasibilityApproval.ratios}
              subtitle="Technical Approval vs Structural Rejections"
            />
            {/* Feasibility Criteria Scoreboard to complete the balanced 2x2 grid */}
            <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">Technical Feasibility Criteria</h4>
                <p className="text-[11px] text-slate-500 mt-0.5">Civil & Electrical Load Verification Parameters</p>
              </div>
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 my-auto pt-3">
                <div className="p-3 bg-emerald-50/70 rounded-2xl border border-emerald-100">
                  <div className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Avg Feasible Ratio</div>
                  <div className="text-lg font-bold text-emerald-900 mt-0.5">91.4%</div>
                  <div className="text-[10px] text-emerald-700 mt-0.5 font-medium">Clear for Engineering SLD</div>
                </div>
                <div className="p-3 bg-blue-50/70 rounded-2xl border border-blue-100">
                  <div className="text-[10px] font-bold text-blue-800 uppercase tracking-wider">Avg Shadow-Free Area</div>
                  <div className="text-lg font-bold text-blue-900 mt-0.5">850 sq.ft</div>
                  <div className="text-[10px] text-blue-700 mt-0.5 font-medium">Standard 3–5 kWp Capacity</div>
                </div>
                <div className="p-3 bg-indigo-50/70 rounded-2xl border border-indigo-100">
                  <div className="text-[10px] font-bold text-indigo-800 uppercase tracking-wider">Transformer Headroom</div>
                  <div className="text-lg font-bold text-indigo-900 mt-0.5">&lt; 70% DT Load</div>
                  <div className="text-[10px] text-indigo-700 mt-0.5 font-medium">TANGEDCO Approved</div>
                </div>
                <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
                  <div className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">Surveys Completed</div>
                  <div className="text-lg font-bold text-slate-900 mt-0.5">38 Sites</div>
                  <div className="text-[10px] text-slate-500 mt-0.5 font-medium">This month (Salem Circle)</div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Role 4: Warehouse & Purchase */}
        {activeRole.id === "warehouse_manager" && (
          <>
            <AppleInventoryChart 
              title={activeRole.charts.stockLevels.title}
              inventory={activeRole.charts.stockLevels.inventory}
            />
            <AppleDonutChart 
              title={activeRole.charts.dispatchTurnaround.title}
              segments={activeRole.charts.dispatchTurnaround.segments}
              subtitle="Turnaround from Step 07 Clearance to Site Gate"
            />
          </>
        )}

        {/* Role 5: EPC Site Ops */}
        {activeRole.id === "epc_manager" && (
          <>
            <AppleFunnelChart 
              title={activeRole.charts.siteMilestones.title}
              steps={activeRole.charts.siteMilestones.steps}
              subtitle="Civil Erection to Electrical Testing Progress"
            />
            <AppleDonutChart 
              title={activeRole.charts.earthingResistance.title}
              segments={activeRole.charts.earthingResistance.segments}
              subtitle="Chemical Earth Pit Ohm Log (< 5.0 Ω Mandate)"
            />
          </>
        )}

        {/* Role 6: TANGEDCO Liaison */}
        {activeRole.id === "liaison_officer" && (
          <>
            <AppleFunnelChart 
              title={activeRole.charts.utilityFunnel.title}
              steps={activeRole.charts.utilityFunnel.steps}
              subtitle="TANGEDCO Online Form 1 to Joint Commissioning"
            />
            <AppleDonutChart 
              title={activeRole.charts.meterReadiness.title}
              segments={activeRole.charts.meterReadiness.segments}
              subtitle="Bi-Directional Net-Meter Inventory at Section"
            />
          </>
        )}

        {/* Role 7: Finance & Accounts */}
        {activeRole.id === "accounts_officer" && (
          <>
            <AppleDonutChart 
              title={activeRole.charts.cashInflowRatio.title}
              segments={activeRole.charts.cashInflowRatio.segments}
              subtitle="80% Upfront vs 10% Installation vs 10% Final"
            />
            <AppleHorizontalBarChart 
              title={activeRole.charts.paymentModes.title}
              items={activeRole.charts.paymentModes.modes}
              labelKey="mode"
              valueKey="value"
              subtitle="Customer Transaction Inflow Channel Breakdown"
            />
          </>
        )}

        {/* Role 8: Subsidy Desk */}
        {activeRole.id === "subsidy_coordinator" && (
          <>
            <AppleDonutChart 
              title={activeRole.charts.claimsByTier.title}
              segments={activeRole.charts.claimsByTier.segments}
              subtitle="PM Surya Ghar Capacity Subsidy Slabs"
            />
            <AppleFunnelChart 
              title={activeRole.charts.portalStageSpeed.title}
              steps={activeRole.charts.portalStageSpeed.steps}
              subtitle="Registration to DBT Bank Credit Velocity"
            />
          </>
        )}

        {/* Role 9: Central PMO */}
        {activeRole.id === "project_coordinator" && (
          <>
            <AppleScoreboard 
              title={activeRole.charts.departmentalScore.title}
              departments={activeRole.charts.departmentalScore.departments}
            />
            <AppleHorizontalBarChart 
              title={activeRole.charts.pipelineProjects.title}
              items={activeRole.charts.pipelineProjects.pipelines}
              labelKey="pipeline"
              valueKey="count"
              subtitle="Active Deals Distribution & Bottleneck Monitoring"
            />
          </>
        )}

      </div>

      {/* Operational Gateways (Mobile Compact Grid) */}
      <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
              Operational Step Gateways
            </h3>
            <p className="text-[11px] text-slate-500">
              Steps assigned to {activeRole.title.split("/")[0]}
            </p>
          </div>
          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
            {activeRole.operationalActions?.length || 0} Actions
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {activeRole.operationalActions?.map((act) => (
            <div
              key={act.id}
              onClick={() => openAction(act)}
              className="apple-card p-3 sm:p-4 rounded-xl sm:rounded-2xl bg-white border border-slate-200/80 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-bold font-mono px-1.5 py-0.2 rounded bg-blue-50 text-blue-700 border border-blue-100">
                    Step {act.step}
                  </span>
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-900 transition-colors" />
                </div>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                  {act.title}
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 leading-snug line-clamp-2">
                  {act.desc}
                </p>
              </div>

              <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400">
                <span className="flex items-center space-x-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-500" />
                  <span>Audited</span>
                </span>
                <span className="font-semibold text-slate-700">Launch Gate</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log (Mobile Cards + Desktop Table) - Visible only to PMO & Managing Director / Executive */}
      {canViewAudit && (
        <div id="audit" className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-6 border border-slate-200/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-rose-500" />
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">
                  Audit Log
                </h3>
                <p className="text-[10px] text-slate-500">
                  Visible to PMO & Managing Director / Executive • System Records
                </p>
              </div>
            </div>
            <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200">
              {auditLogs.length} Events
            </span>
          </div>

          {/* Mobile Card List (Eliminates horizontal table scroll on phones) */}
          <div className="sm:hidden space-y-2">
            {auditLogs.slice(0, 4).map((log) => (
              <div key={log.id} className="p-3 rounded-xl bg-white border border-slate-200/70 text-xs space-y-1.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="font-mono font-bold text-slate-900">{log.id}</span>
                  <span className="text-[10px] text-slate-400">{log.timestamp}</span>
                </div>
                <div className="text-[11px] text-slate-700">
                  <strong className="text-slate-900">{log.staffName}</strong> • {log.role.split("/")[0]}
                </div>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center space-x-2 font-mono text-[11px]">
                  <span className="line-through text-slate-400">{log.oldValue}</span>
                  <span className="text-slate-400">→</span>
                  <span className="font-bold text-emerald-600">{log.newValue}</span>
                  <span className="text-slate-400 text-[10px] ml-auto">({log.field})</span>
                </div>
                <p className="text-[11px] text-slate-600 italic">
                  &ldquo;{log.reason}&rdquo;
                </p>
              </div>
            ))}
          </div>

          {/* Desktop Table */}
          <div className="hidden sm:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50/80 text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Audit ID & Time</th>
                  <th className="py-2.5 px-3 font-semibold">Staff & Role</th>
                  <th className="py-2.5 px-3 font-semibold">Project & Step</th>
                  <th className="py-2.5 px-3 font-semibold">Value Shift</th>
                  <th className="py-2.5 px-3 font-semibold">Mandatory Reason</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {auditLogs.slice(0, 5).map((log) => (
                  <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                    <td className="py-2.5 px-3">
                      <span className="font-mono font-bold text-slate-800">{log.id}</span>
                      <span className="block text-[10px] text-slate-400">{log.timestamp}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-semibold text-slate-800">{log.staffName}</span>
                      <span className="block text-[10px] text-slate-500">{log.role}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <span className="font-medium text-blue-600">{log.projectId}</span>
                      <span className="block text-[10px] text-slate-500 truncate max-w-[120px]">{log.step}</span>
                    </td>
                    <td className="py-2.5 px-3">
                      <div className="flex items-center space-x-1.5">
                        <span className="line-through text-slate-400 font-mono">{log.oldValue}</span>
                        <span className="text-slate-400">→</span>
                        <span className="font-bold text-emerald-600 font-mono">{log.newValue}</span>
                      </div>
                      <span className="text-[10px] text-slate-400">{log.field}</span>
                    </td>
                    <td className="py-2.5 px-3 text-slate-600 italic">
                      &ldquo;{log.reason}&rdquo;
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Modals */}
      <QuickActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        defaultAction={selectedAction}
      />

      <EditWithReasonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
      />

    </div>
  );
}
