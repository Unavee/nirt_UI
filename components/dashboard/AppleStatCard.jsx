"use client";

import React from "react";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  IndianRupee, 
  Zap, 
  Building2, 
  Users, 
  Compass, 
  Package, 
  HardHat, 
  BadgePercent, 
  Activity, 
  ShieldCheck 
} from "lucide-react";

export function AppleStatCard({ label, value, change, trend = "up", helper = "", index = 0 }) {
  // Vibrant Apple squircle icon tints
  const iconThemes = [
    { bg: "bg-blue-500/10 text-blue-600 border-blue-500/20", icon: Zap },
    { bg: "bg-emerald-500/10 text-emerald-600 border-emerald-500/20", icon: IndianRupee },
    { bg: "bg-purple-500/10 text-purple-600 border-purple-500/20", icon: Building2 },
    { bg: "bg-indigo-500/10 text-indigo-600 border-indigo-500/20", icon: ShieldCheck }
  ];

  const currentTheme = iconThemes[index % iconThemes.length];
  const IconComponent = currentTheme.icon;

  const isUp = trend === "up";
  const isDown = trend === "down";

  return (
    <div className="glass-surface rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 shadow-xs border border-slate-200/80 apple-card flex flex-col justify-between relative overflow-hidden group">
      {/* Subtle top specular accent highlight */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent" />

      <div className="flex items-center justify-between gap-1">
        <span className="text-[11px] sm:text-xs font-semibold text-slate-500 truncate tracking-tight">
          {label}
        </span>
        <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-xl sm:rounded-2xl flex items-center justify-center border shadow-xs shrink-0 ${currentTheme.bg}`}>
          <IconComponent className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.2]" />
        </div>
      </div>

      <div className="mt-2 sm:mt-3">
        <h3 className="text-lg sm:text-2xl xl:text-3xl font-extrabold tracking-tight text-slate-900 font-sans truncate">
          {value}
        </h3>
        
        <div className="flex items-center flex-wrap gap-1.5 mt-1.5 sm:mt-2">
          <span
            className={`inline-flex items-center space-x-1 px-1.5 sm:px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] font-semibold border shrink-0 ${
              isUp 
                ? "bg-emerald-50 text-emerald-700 border-emerald-200" 
                : isDown 
                ? "bg-rose-50 text-rose-700 border-rose-200" 
                : "bg-slate-100 text-slate-700 border-slate-200"
            }`}
          >
            {isUp && <TrendingUp className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
            {isDown && <TrendingDown className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
            {!isUp && !isDown && <Minus className="w-2.5 h-2.5 sm:w-3 sm:h-3" />}
            <span>{change}</span>
          </span>

          {helper && (
            <span className="text-[10px] sm:text-[11px] text-slate-400 truncate hidden sm:inline font-normal">
              {helper}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
