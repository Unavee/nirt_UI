"use client";

import { 
  AlertTriangle, 
  Compass, 
  ArrowRight, 
  Pencil, 
  Flame, 
  Clock, 
  Calendar, 
  CheckCircle2
} from "lucide-react";

export default function PipelineCard({
  project,
  stageIndex,
  activePipelineKey,
  nextStage,
  onOpenEdit,
  onOpenQualify,
  onOpenSurvey,
  onOpenAdvance
}) {
  const daysInCurrentStage = project.daysInStage || 1;
  const maxSla = project.slaDays || 2;
  const isOverdue = daysInCurrentStage > maxSla;
  const isDueToday = daysInCurrentStage === maxSla;

  // Qualification Category meta
  const categoryMeta = {
    A: { label: "Cat A: Prime (>4kW)", badge: "bg-emerald-100 text-emerald-800 border-emerald-300", icon: Flame },
    B: { label: "Cat B: Standard (2-3kW)", badge: "bg-blue-100 text-blue-800 border-blue-300", icon: Clock },
    C: { label: "Cat C: Budget (1-2kW)", badge: "bg-violet-100 text-violet-800 border-violet-300", icon: Calendar }
  };
  const qualBadge = project.qualificationCategory ? categoryMeta[project.qualificationCategory] : null;

  return (
    <div
      className={`p-3.5 bg-white border transition-colors duration-150 ease-out shadow-2xs space-y-2.5 rounded-none ${
        isOverdue 
          ? "border-rose-400 ring-1 ring-rose-200" 
          : "border-zinc-200 hover:border-black"
      }`}
    >
      {/* Top Header: Deal ID, Category & SLA Status */}
      <div className="flex justify-between items-center gap-1.5">
        <div className="flex items-center space-x-1.5">
          <span className="font-mono text-[10px] font-bold bg-zinc-100 text-black px-1.5 py-0.5 border border-zinc-200">
            {project.id}
          </span>
          {qualBadge && (
            <span className={`text-[9px] font-mono font-bold px-1.5 py-0.5 border flex items-center space-x-0.5 ${qualBadge.badge}`}>
              <qualBadge.icon className="w-2.5 h-2.5" />
              <span>{project.qualificationCategory}</span>
            </span>
          )}
        </div>

        {/* SLA Status Pill */}
        {isOverdue ? (
          <span className="text-[9px] font-mono font-bold bg-rose-100 text-rose-700 border border-rose-300 px-1.5 py-0.5 flex items-center space-x-1">
            <AlertTriangle className="w-2.5 h-2.5" />
            <span>OVERDUE (+{daysInCurrentStage - maxSla}d)</span>
          </span>
        ) : isDueToday ? (
          <span className="text-[9px] font-mono font-bold bg-sky-100 text-sky-800 border border-sky-300 px-1.5 py-0.5">
            DUE TODAY
          </span>
        ) : (
          <span className="text-[9px] font-mono font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5">
            ON TRACK ({daysInCurrentStage}/{maxSla}d)
          </span>
        )}
      </div>

      {/* Customer Info & EB Details */}
      <div>
        <h4 className="font-bold text-xs text-black leading-snug truncate" title={project.customerName}>
          {project.customerName}
        </h4>
        <div className="text-[11px] text-zinc-500 mt-0.5 flex items-center space-x-1 font-mono">
          <span>{project.district}</span>
          <span>•</span>
          <span className="text-[10px] text-zinc-500 truncate max-w-[140px]">
            EB: {project.ebConsumerNumber || project.ebConsumerNo || "Pending"}
          </span>
        </div>
      </div>

      {/* Capacity & Roof Details */}
      <div className="flex justify-between items-center text-[10px] font-mono bg-zinc-50 px-2 py-1 border border-zinc-100">
        <span className="text-zinc-600 font-medium">
          Cap: <strong className="text-black">{project.capacityKw || 0} kW</strong>
        </span>
        <span className="text-zinc-500 truncate max-w-[110px]" title={project.roofType}>
          {project.roofType || "RCC Flat"}
        </span>
      </div>

      {/* Contextual Action 1: Step 02 Qualification Trigger */}
      {activePipelineKey === "sales" && stageIndex === 1 && (
        <div className="p-2 bg-blue-50/60 border border-blue-200/80 flex items-center justify-between">
          <span className="text-[10px] font-mono font-bold text-blue-900">
            {project.qualificationCategory ? `Cat ${project.qualificationCategory} Verified` : "Needs Assessment"}
          </span>
          <button
            type="button"
            onClick={() => onOpenQualify(project)}
            className="text-[10px] font-mono text-black bg-white hover:bg-zinc-100 px-2 py-0.5 border border-zinc-300 flex items-center space-x-1 cursor-pointer shadow-2xs font-bold transition-transform duration-150 active:scale-[0.97]"
          >
            <Flame className="w-3 h-3 text-blue-600" />
            <span>Qualify / Drop</span>
          </button>
        </div>
      )}

      {/* Contextual Action 2: Step 03 Site Survey Trigger */}
      {activePipelineKey === "sales" && stageIndex === 2 && (
        <div className="p-2 bg-zinc-50 border border-zinc-200 flex items-center justify-between">
          {project.siteSurveyCompleted ? (
            <span className="text-[10px] font-mono text-emerald-700 font-bold flex items-center space-x-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>4 Photos & Dims ✓</span>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => onOpenSurvey(project)}
              className="text-[10px] font-mono text-black bg-white hover:bg-zinc-100 px-2 py-0.5 border border-zinc-300 flex items-center space-x-1 cursor-pointer shadow-2xs font-bold transition-transform duration-150 active:scale-[0.97]"
            >
              <Compass className="w-3 h-3 text-black" />
              <span>Fill Survey (4 Photos)</span>
            </button>
          )}
          <span className="text-[9px] font-mono font-bold text-zinc-600">
            {project.capacityKw} kW
          </span>
        </div>
      )}

      {/* Footer: Deal Value, Edit with Reason & Advance Handoff */}
      <div className="pt-2 border-t border-zinc-100 flex justify-between items-center text-[10px]">
        <div>
          <span className="text-zinc-400 font-mono block text-[9px] uppercase tracking-wider">DEAL VALUE</span>
          <span className="font-bold text-zinc-950 font-mono text-xs">
            Rs. {((project.totalValue || 0) / 100000).toFixed(2)}L
          </span>
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Universal Edit with Reason Action */}
          <button
            type="button"
            onClick={() => onOpenEdit(project)}
            title="Edit input details with mandatory PMO audit reason"
            className="p-1.5 text-zinc-600 hover:text-black bg-white hover:bg-zinc-100 border border-zinc-300 transition-colors duration-150 cursor-pointer shadow-2xs active:scale-[0.97]"
          >
            <Pencil className="w-3 h-3" />
          </button>

          {/* Advance Gatekeeper Button */}
          {nextStage ? (
            <button
              type="button"
              onClick={() => onOpenAdvance(project, nextStage)}
              className="bg-black hover:bg-zinc-800 text-white px-2.5 py-1.5 font-bold flex items-center space-x-1 transition-transform duration-150 cursor-pointer shadow-2xs active:scale-[0.97]"
            >
              <span>Advance</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          ) : (
            <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 font-mono font-bold">
              Done ✓
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
