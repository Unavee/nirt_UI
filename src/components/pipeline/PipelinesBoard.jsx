"use client";

import { useState } from "react";
import { 
  Zap, 
  Archive, 
  Search, 
  History, 
  X
} from "lucide-react";
import Portal from "@/components/Portal";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import SiteSurveyModal from "@/components/SiteSurveyModal";
import EditWithReasonModal from "./EditWithReasonModal";
import QualificationModal from "./QualificationModal";
import StageGateModal from "./StageGateModal";
import PipelineLane from "./PipelineLane";
import { PIPELINES } from "@/data/pipelineStages";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { useRole } from "@/context/RoleContext";

const DISTRICT_FILTERS = [
  "All Circles",
  "Salem",
  "Namakkal",
  "Erode",
  "Dharmapuri",
  "Coimbatore"
];

export default function PipelinesBoard() {
  const { activeRole } = useRole();
  const [projectsList, setProjectsList] = useState(MOCK_PROJECTS);
  const [unqualifiedList, setUnqualifiedList] = useState([]);
  const [pmoAuditLogs, setPmoAuditLogs] = useState([]);
  const [activePipelineKey, setActivePipelineKey] = useState("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All Circles");

  // Modals state
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [showArchiveModal, setShowArchiveModal] = useState(false);
  const [showAuditLogsModal, setShowAuditLogsModal] = useState(false);
  const [editProject, setEditProject] = useState(null);
  const [qualifyProject, setQualifyProject] = useState(null);
  const [surveyProject, setSurveyProject] = useState(null);
  const [advanceProject, setAdvanceProject] = useState(null);
  const [advanceTargetStage, setAdvanceTargetStage] = useState(null);

  const currentPipeline = PIPELINES[activePipelineKey] || PIPELINES.sales;
  const totalPipelineValue = projectsList.reduce((acc, p) => acc + (p.totalValue || 0), 0);

  // Handlers
  const handleLeadCreated = (newLead) => {
    setProjectsList((prev) => [newLead, ...prev]);
  };

  const handleSaveEdit = (projectId, updatedFields, auditEntry) => {
    setProjectsList((prev) =>
      prev.map((p) => (p.id === projectId ? { ...p, ...updatedFields } : p))
    );
    setPmoAuditLogs((prev) => [auditEntry, ...prev]);
  };

  const handleQualifySuccess = (projectId, category, updatedLead) => {
    setProjectsList((prev) =>
      prev.map((p) =>
        p.id === projectId
          ? {
              ...p,
              qualificationCategory: category,
              ...updatedLead,
              qualificationStatus: "Qualified"
            }
          : p
      )
    );
  };

  const handleDropLead = (projectId, dropRecord) => {
    setUnqualifiedList((prev) => [dropRecord, ...prev]);
    setProjectsList((prev) => prev.filter((p) => p.id !== projectId));
    setPmoAuditLogs((prev) => [
      {
        id: `AUDIT-${Date.now()}`,
        timestamp: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
        staffName: dropRecord.droppedBy,
        role: "Sales Executive",
        projectId: dropRecord.id,
        action: `Lead Disqualified: ${dropRecord.dropReason}`,
        reason: dropRecord.notes,
        stage: "Step 02: Lead Qualification"
      },
      ...prev
    ]);
  };

  const handleSurveyCompleted = (projectId, surveyData) => {
    setProjectsList((prev) =>
      prev.map((p) => {
        if (p.id === projectId) {
          return {
            ...p,
            capacityKw: surveyData.calculatedCapacityKw || p.capacityKw,
            siteSurveyCompleted: true,
            surveyData: surveyData
          };
        }
        return p;
      })
    );
  };

  const handleConfirmAdvance = (project, targetStage) => {
    setProjectsList((prev) =>
      prev.map((p) => {
        if (p.id === project.id) {
          return {
            ...p,
            stage: targetStage.id,
            stageName: targetStage.title,
            daysInStage: 0
          };
        }
        return p;
      })
    );
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <div className="flex items-center space-x-2">
            <span className="text-[10px] font-mono bg-black text-white px-2 py-0.5 uppercase font-bold tracking-wider">
              NIRT Standard Process (5-Pipeline Architecture)
            </span>
            <span className="text-xs font-mono text-zinc-500">
              Active Stage Gatekeeper &bull; Powered by ACHISE
            </span>
          </div>
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight flex items-center space-x-3 mt-1.5">
            <span>{currentPipeline.title}</span>
            <span className="text-xs font-mono font-medium text-zinc-600 bg-white px-2.5 py-0.5 border border-zinc-200">
              Rs. {(totalPipelineValue / 100000).toFixed(1)}L Active Value
            </span>
          </h2>
        </div>

        {/* Global Actions */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            type="button"
            onClick={() => setShowAuditLogsModal(true)}
            className="border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 px-3 py-2 text-xs font-bold flex items-center space-x-1.5 transition-transform duration-150 cursor-pointer shadow-2xs active:scale-[0.97]"
          >
            <History className="w-3.5 h-3.5 text-zinc-600" />
            <span>PMO Edit Logs ({pmoAuditLogs.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setShowArchiveModal(true)}
            className="border border-zinc-300 bg-white hover:bg-zinc-100 text-zinc-800 px-3 py-2 text-xs font-bold flex items-center space-x-1.5 transition-transform duration-150 cursor-pointer shadow-2xs active:scale-[0.97]"
          >
            <Archive className="w-3.5 h-3.5 text-zinc-600" />
            <span>Unqualified Archive ({unqualifiedList.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setIsLeadModalOpen(true)}
            className="bg-black hover:bg-zinc-800 text-white px-4 py-2 text-xs font-bold flex items-center space-x-2 transition-transform duration-150 cursor-pointer shadow-sm active:scale-[0.97]"
          >
            <Zap className="w-3.5 h-3.5 text-yellow-400" />
            <span>+ New Lead Intake</span>
          </button>
        </div>
      </div>

      {/* Tabs & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
        {/* Pipeline Selector Tabs */}
        <div className="flex border border-zinc-200 bg-zinc-100 p-1 space-x-1 max-w-xl">
          {Object.keys(PIPELINES).map((key) => {
            const pipe = PIPELINES[key];
            const isActive = activePipelineKey === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => setActivePipelineKey(key)}
                className={`flex-1 py-1.5 px-3 text-xs font-bold transition-colors duration-150 cursor-pointer ${
                  isActive
                    ? "bg-white text-black shadow-xs"
                    : "text-zinc-600 hover:text-black"
                }`}
              >
                {pipe.title.split(". ")[1] || pipe.title}
              </button>
            );
          })}
        </div>

        {/* Search & District Filter */}
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-zinc-400 absolute left-2.5 top-2.5" />
            <input
              type="text"
              placeholder="Search customer / ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-8 pr-3 py-1.5 text-base md:text-xs border border-zinc-200 bg-white w-48 focus:border-black focus:outline-hidden font-mono"
            />
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="py-1.5 px-2.5 text-base md:text-xs border border-zinc-200 bg-white font-mono focus:border-black cursor-pointer"
          >
            {DISTRICT_FILTERS.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Horizontal Kanban Board */}
      <div className="overflow-x-auto pb-6">
        <div className="flex space-x-4 min-w-[1280px]">
          {currentPipeline.stages.map((stage, sIdx) => {
            const nextStage = currentPipeline.stages[sIdx + 1];

            const stageProjects = projectsList.filter((p) => {
              if (selectedDistrict !== "All Circles" && p.district !== selectedDistrict) return false;
              if (searchQuery.trim()) {
                const query = searchQuery.toLowerCase();
                const matchName = p.customerName?.toLowerCase().includes(query);
                const matchId = p.id?.toLowerCase().includes(query);
                if (!matchName && !matchId) return false;
              }
              if (activePipelineKey === "sales") {
                return (
                  p.stage === stage.id ||
                  (sIdx === 0 && (p.stage === "new_lead" || p.stage === "step_01_lead_inward")) ||
                  (sIdx === 1 && (p.stage === "step_02_qualification" || p.stage === "contacted" || p.stage === "qualified")) ||
                  (sIdx === 2 && (p.stage === "step_03_site_survey" || p.stage === "site_visit_completed")) ||
                  (sIdx === 3 && (p.stage === "step_04_system_design")) ||
                  (sIdx === 4 && (p.stage === "step_05_quotation" || p.stage === "quotation_sent")) ||
                  (sIdx === 5 && (p.stage === "step_06_order_confirmed" || p.stage === "deal_confirmed"))
                );
              }
              return p.stage === stage.id;
            });

            return (
              <PipelineLane
                key={stage.id}
                stage={stage}
                stageIndex={sIdx}
                projects={stageProjects}
                activePipelineKey={activePipelineKey}
                nextStage={nextStage}
                onOpenEdit={(p) => setEditProject(p)}
                onOpenQualify={(p) => setQualifyProject(p)}
                onOpenSurvey={(p) => setSurveyProject(p)}
                onOpenAdvance={(p, next) => {
                  setAdvanceProject(p);
                  setAdvanceTargetStage(next);
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Edit With Reason Modal */}
      <EditWithReasonModal
        isOpen={!!editProject}
        project={editProject}
        onClose={() => setEditProject(null)}
        onSaveEdit={handleSaveEdit}
      />

      {/* Step 02 Qualification / Drop Modal */}
      <QualificationModal
        isOpen={!!qualifyProject}
        project={qualifyProject}
        onClose={() => setQualifyProject(null)}
        onQualifySuccess={handleQualifySuccess}
        onDropLead={handleDropLead}
      />

      {/* Stage Gatekeeper Verification Modal */}
      <StageGateModal
        isOpen={!!advanceProject && !!advanceTargetStage}
        project={advanceProject}
        targetStage={advanceTargetStage}
        onClose={() => {
          setAdvanceProject(null);
          setAdvanceTargetStage(null);
        }}
        onConfirmAdvance={handleConfirmAdvance}
      />

      {/* Lead Intake Modal */}
      <LeadCaptureModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        onLeadCreated={handleLeadCreated}
      />

      {/* Site Survey Modal */}
      <SiteSurveyModal
        isOpen={!!surveyProject}
        project={surveyProject}
        onClose={() => setSurveyProject(null)}
        onSurveyCompleted={handleSurveyCompleted}
      />

      {/* PMO Audit Logs Modal */}
      {showAuditLogsModal && (
        <Portal>
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white border border-zinc-400 max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <div className="flex items-center space-x-2">
                  <History className="w-5 h-5 text-black" />
                  <h3 className="font-bold text-base text-black">
                    PMO Audit Trail: Input Edits with Mandatory Reasons ({pmoAuditLogs.length})
                  </h3>
                </div>
                <button 
                  onClick={() => setShowAuditLogsModal(false)} 
                  className="text-zinc-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {pmoAuditLogs.map((log) => (
                  <div key={log.id} className="p-3 bg-zinc-50 border border-zinc-200 space-y-1 text-xs">
                    <div className="flex justify-between items-start font-mono">
                      <span className="font-bold text-black">{log.projectId}: {log.fieldName || log.action}</span>
                      <span className="text-[10px] text-zinc-500">{log.timestamp}</span>
                    </div>
                    {log.oldValue !== undefined && (
                      <div className="text-[11px] font-mono text-zinc-600">
                        Changed from <strong className="text-rose-700">"{log.oldValue}"</strong> to <strong className="text-emerald-700">"{log.newValue}"</strong>
                      </div>
                    )}
                    <div className="text-slate-800 font-bold text-[11px]">
                      Mandatory Reason: {log.reason}
                    </div>
                    <div className="text-[9px] font-mono text-zinc-400 pt-1 border-t border-zinc-200">
                      Edited by: {log.editedBy || log.staffName}
                    </div>
                  </div>
                ))}

                {pmoAuditLogs.length === 0 && (
                  <div className="p-12 text-center text-xs font-mono text-zinc-400">
                    No field modifications logged in this session yet. All edits require a mandatory reason.
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-zinc-200 text-right">
                <button
                  type="button"
                  onClick={() => setShowAuditLogsModal(false)}
                  className="bg-black text-white px-4 py-2 text-xs font-bold cursor-pointer transition-transform duration-150 active:scale-[0.97]"
                >
                  Close Audit Trail
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* Unqualified Leads Archive Modal */}
      {showArchiveModal && (
        <Portal>
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[9999] p-4">
            <div className="bg-white border border-zinc-400 max-w-2xl w-full p-6 shadow-2xl space-y-4 max-h-[85vh] flex flex-col">
              <div className="flex justify-between items-center border-b border-zinc-200 pb-3">
                <div className="flex items-center space-x-2">
                  <Archive className="w-5 h-5 text-black" />
                  <h3 className="font-bold text-base text-black">
                    Unqualified Leads Archive ({unqualifiedList.length})
                  </h3>
                </div>
                <button 
                  onClick={() => setShowArchiveModal(false)} 
                  className="text-zinc-400 hover:text-black cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3">
                {unqualifiedList.map((lead, idx) => (
                  <div key={idx} className="p-3 bg-zinc-50 border border-zinc-200 space-y-1 text-xs">
                    <div className="flex justify-between items-start font-mono">
                      <span className="font-bold text-black">{lead.customerName} ({lead.id})</span>
                      <span className="text-[10px] text-zinc-500">{lead.district || "Salem"} Circle</span>
                    </div>
                    <div className="text-rose-700 font-bold text-[11px]">
                      Reason: {lead.dropReason}
                    </div>
                    <p className="text-zinc-600 text-[11px] font-sans">
                      "{lead.notes}"
                    </p>
                    <div className="text-[9px] font-mono text-zinc-400 pt-1 border-t border-zinc-200 flex justify-between">
                      <span>Logged by: {lead.droppedBy}</span>
                      <span>Target: {lead.capacityKw} kW</span>
                    </div>
                  </div>
                ))}

                {unqualifiedList.length === 0 && (
                  <div className="p-12 text-center text-xs font-mono text-zinc-400">
                    No leads have been dropped yet. All leads are currently in active pipelines.
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-zinc-200 text-right">
                <button
                  type="button"
                  onClick={() => setShowArchiveModal(false)}
                  className="bg-black text-white px-4 py-2 text-xs font-bold cursor-pointer transition-transform duration-150 active:scale-[0.97]"
                >
                  Close Archive
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </div>
  );
}
