import React, { useState } from "react";
import {
  Bell,
  AlertTriangle,
  Clock,
  CheckCircle2,
  Calendar,
  ShieldAlert,
  ArrowRight,
  Search,
  Filter,
  Landmark,
  CreditCard,
  Activity,
  ShieldCheck
} from "lucide-react";
import { ALERT_CATEGORIES } from "../../data/alertsData";

export default function AlertsNotificationView({
  alerts = [],
  project,
  onResolveAlert
}) {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredAlerts = alerts.filter((alert) => {
    const matchesCategory =
      selectedCategory === "all" || alert.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      alert.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      alert.escalationLevel?.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeAlerts = alerts.filter((a) => a.status === "ACTIVE").length;
  const highSeverityAlerts = alerts.filter((a) => a.severity === "HIGH" && a.status === "ACTIVE").length;
  const resolvedAlerts = alerts.filter((a) => a.status === "RESOLVED").length;

  const getSeverityBadge = (severity, status) => {
    if (status === "RESOLVED") {
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    }
    switch (severity) {
      case "CRITICAL":
      case "HIGH":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "MEDIUM":
        return "bg-blue-50 text-blue-700 border-blue-200";
      default:
        return "bg-slate-50 text-slate-700 border-slate-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                BFRD Section 25
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                Management Escalation Engine
              </span>
            </div>
            <h3 className="text-base font-bold text-slate-900 mt-1">
              Automated Project Alerts & SLA Monitoring
            </h3>
            <p className="text-xs text-slate-500 font-medium">
              Real-time surveillance across DISCOM delays, payments, procurement, inspections, and PM Surya Ghar subsidy credits.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white font-mono shadow-xs">
              <Bell className="w-3.5 h-3.5 text-blue-400" />
              <span>{activeAlerts} Active Notifications</span>
            </span>
          </div>
        </div>

        {/* 4 KPI Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80">
            <span className="block text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
              Total Notifications
            </span>
            <span className="text-lg font-bold text-slate-900 font-mono mt-0.5 block">
              {alerts.length} Triggers
            </span>
            <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
              Automated surveillance
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-rose-50/60 border border-rose-200/80">
            <span className="block text-[11px] font-semibold text-rose-800 uppercase tracking-wider">
              High Severity Active
            </span>
            <span className="text-lg font-bold text-rose-900 font-mono mt-0.5 block">
              {highSeverityAlerts} Alerts
            </span>
            <span className="text-[10px] text-rose-700 font-medium mt-0.5 block">
              Requires desk action
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-blue-50/60 border border-blue-200/80">
            <span className="block text-[11px] font-semibold text-blue-800 uppercase tracking-wider">
              SLA Monitoring
            </span>
            <span className="text-lg font-bold text-blue-900 font-mono mt-0.5 block">
              100% On-Time
            </span>
            <span className="text-[10px] text-blue-700 font-medium mt-0.5 block">
              Zero project defaults
            </span>
          </div>

          <div className="p-3.5 rounded-2xl bg-emerald-50/60 border border-emerald-200/80">
            <span className="block text-[11px] font-semibold text-emerald-800 uppercase tracking-wider">
              Resolved Milestones
            </span>
            <span className="text-lg font-bold text-emerald-900 font-mono mt-0.5 block">
              {resolvedAlerts} Cleared
            </span>
            <span className="text-[10px] text-emerald-700 font-medium mt-0.5 block">
              Audited & verified
            </span>
          </div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filters */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {ALERT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-xs font-bold"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search alerts, escalation..."
            className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Alerts Feed */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-xs overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-bold text-slate-900 uppercase tracking-wider font-mono">
              Operational Alerts Queue
            </span>
            <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 font-mono">
              {filteredAlerts.length} Alerts
            </span>
          </div>
          <span className="text-[11px] text-slate-400 font-mono">
            Auto Escalated to PMO
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {filteredAlerts.map((alert) => {
            const isResolved = alert.status === "RESOLVED";
            return (
              <div
                key={alert.id}
                className="p-5 sm:p-6 hover:bg-slate-50/60 transition-colors flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="space-y-2 flex-1">
                  <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold border font-mono ${getSeverityBadge(
                        alert.severity,
                        alert.status
                      )}`}
                    >
                      {alert.status === "RESOLVED" ? "RESOLVED ✓" : `${alert.severity} PRIORITY`}
                    </span>

                    <span className="font-mono text-[11px] text-slate-400">
                      {alert.id}
                    </span>

                    <span className="text-xs text-slate-400">•</span>

                    <span className="text-xs font-semibold text-slate-700">
                      {alert.categoryLabel}
                    </span>

                    <span className="px-2 py-0.5 rounded-lg text-[10px] font-bold bg-slate-100 text-slate-600 font-mono">
                      Escalation: {alert.escalationLevel}
                    </span>
                  </div>

                  <h4
                    className={`text-sm font-bold ${
                      isResolved ? "text-slate-600" : "text-slate-900"
                    }`}
                  >
                    {alert.title}
                  </h4>

                  <p className="text-xs text-slate-500">
                    {alert.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-500 font-mono pt-1">
                    <div className="flex items-center space-x-1.5 text-blue-700">
                      <Clock className="w-3.5 h-3.5 text-blue-600" />
                      <span className="font-semibold">{alert.slaStatus}</span>
                    </div>

                    <div className="flex items-center space-x-1.5 text-slate-500">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>Target Date: {alert.dueDate}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2 shrink-0">
                  {!isResolved ? (
                    <button
                      onClick={() => onResolveAlert?.(alert.id)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all flex items-center space-x-1.5"
                    >
                      <span>{alert.recommendedAction}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold bg-emerald-50 text-emerald-700 border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Resolved</span>
                    </span>
                  )}
                </div>
              </div>
            );
          })}

          {filteredAlerts.length === 0 && (
            <div className="p-12 text-center text-slate-500 text-xs">
              No alerts found for this category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
