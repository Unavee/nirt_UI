"use client";

import React, { useState } from "react";

// --- APPLE DONUT CHART ---
export function AppleDonutChart({ title, segments = [], subtitle = "" }) {
  const [hoveredIdx, setHoveredIdx] = useState(null);
  const total = segments.reduce((sum, s) => sum + s.value, 0);

  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  let accumulatedPercent = 0;

  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 my-auto">
        {/* SVG Donut */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 shrink-0 flex items-center justify-center">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r={radius}
              className="stroke-slate-100"
              strokeWidth="10"
              fill="transparent"
            />
            {segments.map((seg, i) => {
              const strokeDasharray = `${(seg.value / total) * circumference} ${circumference}`;
              const strokeDashoffset = -((accumulatedPercent / 100) * circumference);
              accumulatedPercent += (seg.value / total) * 100;

              return (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={radius}
                  stroke={seg.color}
                  strokeWidth={hoveredIdx === i ? "12" : "10"}
                  strokeDasharray={strokeDasharray}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  fill="transparent"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredIdx(i)}
                  onMouseLeave={() => setHoveredIdx(null)}
                />
              );
            })}
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none">
            <span className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              {hoveredIdx !== null ? `${segments[hoveredIdx].value}%` : "100%"}
            </span>
            <span className="text-[9px] uppercase font-semibold text-slate-400 tracking-wider">
              {hoveredIdx !== null ? segments[hoveredIdx].label.split(" ")[0] : "Total"}
            </span>
          </div>
        </div>

        {/* Legend List */}
        <div className="w-full space-y-1.5">
          {segments.map((seg, i) => (
            <div
              key={i}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between p-1.5 sm:p-2 rounded-xl transition-all cursor-pointer ${
                hoveredIdx === i ? "bg-slate-100/90" : "hover:bg-slate-50"
              }`}
            >
              <div className="flex items-center space-x-2 min-w-0">
                <span
                  className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full shrink-0 shadow-2xs"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-[11px] sm:text-xs font-medium text-slate-700 truncate">{seg.label}</span>
              </div>
              <span className="text-[11px] sm:text-xs font-bold text-slate-900 ml-2">{seg.value}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- APPLE FUNNEL CHART ---
export function AppleFunnelChart({ title, steps = [], subtitle = "" }) {
  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="space-y-2 my-auto">
        {steps.map((step, idx) => {
          const widthPercent = Math.max(step.pct, 20);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="font-medium text-slate-700 flex items-center space-x-1.5">
                  <span className="w-3.5 h-3.5 rounded-full bg-slate-200 text-slate-700 text-[9px] font-bold flex items-center justify-center">
                    {idx + 1}
                  </span>
                  <span className="truncate">{step.name}</span>
                </span>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-slate-900">{step.count}</span>
                  <span className="text-[10px] text-slate-400">({step.pct}%)</span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full transition-all duration-500"
                  style={{ width: `${widthPercent}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- APPLE BAR-LINE CHART ---
export function AppleBarLineChart({ title, data = [] }) {
  const maxRevenue = 60;

  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Revenue (Bars) vs Profit Margin</p>
        </div>
        <div className="flex items-center space-x-2 text-[10px]">
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-xs bg-blue-500"></span>
            <span className="text-slate-600">₹L</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
            <span className="text-slate-600">%</span>
          </span>
        </div>
      </div>

      <div className="pt-2 pb-1 my-auto">
        <div className="flex items-end justify-between gap-2 h-36 px-1 border-b border-slate-200">
          {data.map((item, idx) => {
            const heightPercent = (item.revenue / maxRevenue) * 100;
            return (
              <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                <div className="w-full max-w-[28px] sm:max-w-[36px] bg-slate-100 rounded-t-lg h-full flex items-end overflow-hidden">
                  <div
                    className="w-full bg-gradient-to-t from-blue-600 to-sky-400 rounded-t-lg transition-all duration-500 group-hover:brightness-110"
                    style={{ height: `${heightPercent}%` }}
                  />
                </div>

                <span className="text-[9px] sm:text-[10px] font-bold text-indigo-700 bg-indigo-50 px-1 py-0.2 rounded-full border border-indigo-200/60 font-mono">
                  {item.margin}%
                </span>

                <span className="text-[10px] sm:text-xs font-semibold text-slate-500">{item.month}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// --- APPLE HORIZONTAL BAR CHART ---
export function AppleHorizontalBarChart({ title, items = [], labelKey = "name", valueKey = "value", subtitle = "" }) {
  const maxValue = Math.max(...items.map((it) => it[valueKey] || 0), 1);

  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          {subtitle && <p className="text-[11px] text-slate-500 mt-0.5">{subtitle}</p>}
        </div>
      </div>

      <div className="space-y-2.5 my-auto">
        {items.map((item, idx) => {
          const val = item[valueKey];
          const pct = Math.round((val / maxValue) * 100);
          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="font-medium text-slate-700 truncate mr-2">{item[labelKey]}</span>
                <span className="font-bold text-slate-900 shrink-0 font-mono">{val}</span>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- APPLE INVENTORY THRESHOLD BARS ---
export function AppleInventoryChart({ title, inventory = [] }) {
  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">Current Stock vs Minimum Safe Buffer</p>
        </div>
      </div>

      <div className="space-y-3 my-auto">
        {inventory.map((item, idx) => {
          const isSafe = item.current >= item.min;
          const fillPct = Math.min((item.current / (item.min * 2.5)) * 100, 100);

          return (
            <div key={idx} className="space-y-1">
              <div className="flex justify-between items-center text-[11px] sm:text-xs">
                <span className="font-medium text-slate-800 truncate mr-2">{item.item}</span>
                <div className="flex items-center space-x-1.5 shrink-0">
                  <span className="text-[10px] text-slate-400">Min: {item.min}</span>
                  <span className={`font-bold font-mono ${isSafe ? "text-emerald-600" : "text-rose-600"}`}>
                    {item.current}
                  </span>
                </div>
              </div>
              <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden relative">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    isSafe ? "bg-gradient-to-r from-teal-500 to-emerald-500" : "bg-rose-500"
                  }`}
                  style={{ width: `${fillPct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// --- APPLE SLA SCOREBOARD ---
export function AppleScoreboard({ title, departments = [] }) {
  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-4 sm:p-5 shadow-xs border border-slate-200/80 flex flex-col justify-between">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="text-xs sm:text-sm font-bold text-slate-900 tracking-tight">{title}</h4>
          <p className="text-[11px] text-slate-500 mt-0.5">On-Time Task & Handoff Velocity Score</p>
        </div>
        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
          96.2% Avg
        </span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-auto">
        {departments.map((dept, idx) => (
          <div
            key={idx}
            className="p-2.5 rounded-xl bg-slate-50 border border-slate-200/60 flex flex-col justify-between"
          >
            <span className="text-[10px] font-medium text-slate-600 truncate">{dept.name}</span>
            <div className="flex items-baseline justify-between mt-1.5">
              <span className="text-base font-extrabold text-slate-900 font-mono">{dept.score}%</span>
              <span className="text-[9px] font-bold text-emerald-600 bg-emerald-100/60 px-1 py-0.2 rounded">
                {dept.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
