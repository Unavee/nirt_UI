"use client";

import { Lock } from "lucide-react";
import PipelineCard from "./PipelineCard";

export default function PipelineLane({
  stage,
  stageIndex,
  projects,
  activePipelineKey,
  nextStage,
  onOpenEdit,
  onOpenQualify,
  onOpenSurvey,
  onOpenAdvance
}) {
  const laneTotalValue = projects.reduce((sum, p) => sum + (p.totalValue || 0), 0);

  return (
    <div className="w-80 shrink-0 bg-white border border-zinc-200 flex flex-col shadow-2xs">
      {/* Lane Header */}
      <div className="p-3 border-b border-zinc-200 bg-zinc-50 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="w-5 h-5 bg-black text-white text-[10px] font-mono font-bold flex items-center justify-center">
            {stageIndex + 1}
          </span>
          <span className="font-bold text-xs text-zinc-900 truncate max-w-[150px]" title={stage.title}>
            {stage.title}
          </span>
        </div>
        <div className="flex items-center space-x-1.5 font-mono">
          <span className="text-[10px] font-bold text-zinc-800">
            Rs. {(laneTotalValue / 100000).toFixed(1)}L
          </span>
          <span className="text-[10px] font-bold px-1.5 py-0.2 bg-zinc-200 text-zinc-700">
            {projects.length}
          </span>
        </div>
      </div>

      {/* Gate Checklist & SLA Benchmarks */}
      <div className="px-3 py-1.5 border-b border-zinc-100 bg-white text-[10px] text-zinc-500 font-mono flex items-center justify-between">
        <span className="flex items-center space-x-1" title={stage.mandatoryFields?.join(", ")}>
          <Lock className="w-3 h-3 text-zinc-400" />
          <span>{stage.mandatoryFields?.length || 0} Gate Rules</span>
        </span>
        <span className="font-bold uppercase tracking-wider text-zinc-600">
          SLA: {stage.slaDays || 2}d
        </span>
      </div>

      {/* Department & Action Rule Bar */}
      <div className="px-3 py-1 bg-zinc-100/70 border-b border-zinc-200 text-[9px] font-mono text-zinc-600 flex items-center justify-between">
        <span className="truncate max-w-[170px]" title={stage.department || "Sales & Technical"}>
          {stage.department || "Sales Dept"}
        </span>
        <span className="text-zinc-500 font-bold uppercase">Input &bull; Upload &bull; Edit</span>
      </div>

      {/* Cards Container */}
      <div className="p-3 space-y-3 flex-1 min-h-[380px] bg-zinc-50/50">
        {projects.map((p) => (
          <PipelineCard
            key={p.id}
            project={p}
            stageIndex={stageIndex}
            activePipelineKey={activePipelineKey}
            nextStage={nextStage}
            onOpenEdit={onOpenEdit}
            onOpenQualify={onOpenQualify}
            onOpenSurvey={onOpenSurvey}
            onOpenAdvance={onOpenAdvance}
          />
        ))}

        {projects.length === 0 && (
          <div className="h-44 border border-dashed border-zinc-300 flex flex-col items-center justify-center p-4 text-center space-y-1">
            <span className="text-xs text-zinc-400 font-mono">No active deals</span>
            <span className="text-[10px] text-zinc-400 font-mono">
              Advance projects from previous step
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
