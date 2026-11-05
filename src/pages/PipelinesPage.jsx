import React, { useState } from "react";
import { PIPELINES } from "@/data/pipelineStages";
import { useRole } from "@/context/RoleContext";
import { RoleSwitcherPill } from "@/components/navigation/RoleSwitcherPill";
import { QuickActionSheet } from "@/components/dashboard/QuickActionSheet";
import { EditWithReasonModal } from "@/components/pipeline/EditWithReasonModal";
import { 
  Layers, 
  ShieldCheck, 
  Clock, 
  Lock, 
  CheckCircle2, 
  Search, 
  Plus, 
  Filter, 
  Building2, 
  User, 
  Calendar, 
  FileText,
  ArrowRight,
  Sparkles,
  Archive,
  Ban,
  AlertTriangle,
  Check,
  RefreshCw,
  ExternalLink,
  ChevronRight,
  ShieldAlert
} from "lucide-react";

const INITIAL_PROJECTS = [
  { id: "NIRT-2610-0042", client: "Sri Vignesh Textiles", capacity: "25 kW", district: "Salem", stage: "step_01", value: "₹12.5L", status: "Active Lead", advanceCleared: false },
  { id: "NIRT-2610-0041", client: "Dr. K. Arulmani", capacity: "5 kW", district: "Namakkal", stage: "step_02", value: "₹2.6L", status: "Qualified Cat A", advanceCleared: false },
  { id: "NIRT-2610-0040", client: "Aravind Hospital", capacity: "40 kW", district: "Erode", stage: "step_03", value: "₹18.8L", status: "Survey Booked", advanceCleared: false },
  { id: "NIRT-2610-0039", client: "Balu Poultry Farm", capacity: "15 kW", district: "Namakkal", stage: "step_04", value: "₹7.2L", status: "SLD Designed", advanceCleared: false },
  { id: "NIRT-2610-0038", client: "V. Thangavel", capacity: "3 kW", district: "Salem", stage: "step_05", value: "₹1.65L", status: "Quote Sent", advanceCleared: false },
  { id: "NIRT-2610-0037", client: "R. Jayaprakash", capacity: "10 kW", district: "Coimbatore", stage: "step_06", value: "₹5.1L", status: "Signed WO", advanceCleared: false },
  { id: "NIRT-2610-0036", client: "Apex Spinning Mills", capacity: "50 kW", district: "Salem", stage: "step_07", value: "₹24.0L", status: "80% Adv Pending", advanceCleared: false },
  { id: "NIRT-2610-0035", client: "Salem Cold Storage", capacity: "30 kW", district: "Salem", stage: "step_10", value: "₹14.5L", status: "Sanctioned", advanceCleared: true },
  { id: "NIRT-2610-0034", client: "K. Selvam Residencies", capacity: "4 kW", district: "Dharmapuri", stage: "step_14", value: "₹2.1L", status: "Structure Done", advanceCleared: true },
  { id: "NIRT-2610-0033", client: "Murugan Agro Farm", capacity: "7.5 kW", district: "Erode", stage: "step_17", value: "₹3.8L", status: "Net Meter Live", advanceCleared: true },
  { id: "NIRT-2610-0032", client: "R. Meenakshi Sundaram", capacity: "3 kW", district: "Salem", stage: "step_19", value: "₹1.65L", status: "Subsidy Claimed", advanceCleared: true },
  { id: "NIRT-2610-0031", client: "Senthil Kumar", capacity: "3 kW", district: "Salem", stage: "step_20", value: "₹1.65L", status: "Triple Closed", advanceCleared: true },
];

const INITIAL_DROPPED_PROJECTS = [
  {
    id: "NIRT-2610-0030",
    client: "S. Muthusamy Poultry",
    capacity: "10 kW",
    district: "Namakkal",
    stage: "step_02",
    status: "Not Qualified",
    droppedAtStep: "Step 02: Lead Qualification",
    dropReason: "Technical issue",
    dropRemarks: "Old asbestos sheet shed structure cannot support calculated wind uplift load. Client unwilling to reconstruct purlins.",
    value: "₹4.8L",
    droppedDate: "03 Nov 2026",
    droppedBy: "Technical Sales Engineer"
  },
  {
    id: "NIRT-2610-0029",
    client: "K. R. Kandasamy",
    capacity: "3 kW",
    district: "Salem",
    stage: "step_02",
    status: "Lost",
    droppedAtStep: "Step 02: Lead Qualification",
    dropReason: "Price issue",
    dropRemarks: "Bi-monthly EB consumption under 100 units. Customer considers upfront capital investment unviable.",
    value: "₹1.65L",
    droppedDate: "01 Nov 2026",
    droppedBy: "Technical Sales Engineer"
  },
  {
    id: "NIRT-2610-0028",
    client: "Siva Spinning Mills",
    capacity: "25 kW",
    district: "Erode",
    stage: "step_02",
    status: "Lost",
    droppedAtStep: "Step 02: Lead Qualification",
    dropReason: "Competitor selected",
    dropRemarks: "Client selected local non-empanelled vendor offering substandard off-grid inverter solution.",
    value: "₹12.0L",
    droppedDate: "28 Oct 2026",
    droppedBy: "Technical Sales Engineer"
  },
  {
    id: "NIRT-2610-0027",
    client: "Dr. P. Manoharan",
    capacity: "5 kW",
    district: "Salem",
    stage: "step_02",
    status: "Lost",
    droppedAtStep: "Step 02: Lead Qualification",
    dropReason: "Customer postponed",
    dropRemarks: "Customer planning house renovation in late 2027. Requested re-contact next year.",
    value: "₹2.6L",
    droppedDate: "24 Oct 2026",
    droppedBy: "Technical Sales Engineer"
  }
];

export default function PipelinesPage() {
  const { activeRole, isExecutive, isCoordinator, addAuditEntry } = useRole();
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [droppedProjects, setDroppedProjects] = useState(INITIAL_DROPPED_PROJECTS);
  const [viewMode, setViewMode] = useState("active"); // "active" | "dropped"
  const [selectedPipelineKey, setSelectedPipelineKey] = useState("sales");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  
  // Modals state
  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStageAction, setSelectedStageAction] = useState(null);
  const [actionTargetProject, setActionTargetProject] = useState(null);
  const [editTargetProject, setEditTargetProject] = useState(null);
  const [statusNotification, setStatusNotification] = useState(null);

  const pipeline = PIPELINES[selectedPipelineKey] || PIPELINES.sales;

  const showNotification = (msg) => {
    setStatusNotification(msg);
    setTimeout(() => setStatusNotification(null), 4000);
  };

  // Helper to map step number to pipeline key
  const getPipelineForStep = (stepNum) => {
    if (stepNum <= 6) return "sales";
    if (stepNum <= 10) return "approvals";
    if (stepNum <= 13) return "procurement";
    if (stepNum <= 17) return "execution";
    return "subsidy";
  };

  // Launch modal for specific project in a step
  const handleLaunchStepForProject = (project, stage) => {
    setActionTargetProject(project);
    setSelectedStageAction({
      step: stage.stepNumber < 10 ? `0${stage.stepNumber}` : `${stage.stepNumber}`,
      title: stage.title,
      desc: stage.gateRule
    });
    setIsActionSheetOpen(true);
  };

  // Launch modal for lane header / intake
  const handleLaunchStepLane = (stage) => {
    // If Step 01, launch new lead intake
    if (stage.stepNumber === 1) {
      setActionTargetProject(null);
      setSelectedStageAction({
        step: "01",
        title: stage.title,
        desc: stage.gateRule
      });
      setIsActionSheetOpen(true);
      return;
    }

    // For other steps, find the first project in this step or launch general
    const inStep = projects.find((p) => p.stage === stage.id);
    setActionTargetProject(inStep || null);
    setSelectedStageAction({
      step: stage.stepNumber < 10 ? `0${stage.stepNumber}` : `${stage.stepNumber}`,
      title: stage.title,
      desc: stage.gateRule
    });
    setIsActionSheetOpen(true);
  };

  const handleTriggerEdit = (project, stage) => {
    setEditTargetProject(project);
    setIsEditModalOpen(true);
  };

  // Callback when step input is successfully signed & logged in QuickActionSheet
  const handleStepComplete = ({ project, step, formData, isCatDSelected, fileName }) => {
    const stepNum = parseInt(step, 10);

    // 1. Handle BFRD §6 Lead Qualification & Dropped / Lost Leads (Step 02)
    const isLeadLostOrDisqualified = 
      isCatDSelected || 
      (stepNum === 2 && (
        formData.qualificationStatus === "Not Qualified" || 
        formData.qualificationStatus === "Lost" || 
        formData.qualificationStatus === "Lead rejected" || 
        formData.viability === "Cat D: Dropped / Unqualified"
      ));

    if (isLeadLostOrDisqualified) {
      const qualificationOutcome = formData.qualificationStatus || "Not Qualified";
      const droppedLead = {
        id: project?.id || `NIRT-2610-00${projects.length + 42}`,
        client: project?.client || formData.clientName || formData.customerName || "Prospective Client",
        capacity: project?.capacity || (formData.sanctionedLoad ? `${formData.sanctionedLoad} kW` : "3 kW"),
        district: project?.district || formData.districtCircle || "Salem",
        stage: "step_02",
        status: qualificationOutcome,
        droppedAtStep: `Step 02: Lead Qualification (${qualificationOutcome})`,
        dropReason: formData.dropReason || "Technical issue",
        dropRemarks: formData.dropRemarks || "Marked Unqualified / Lost during BFRD §6 qualification audit.",
        value: project?.value || "₹1.65L",
        droppedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        droppedBy: activeRole.title.split("/")[0].trim()
      };

      // Remove from active projects and archive into dropped list
      if (project) {
        setProjects((prev) => prev.filter((p) => p.id !== project.id));
      }
      setDroppedProjects((prev) => [droppedLead, ...prev]);

      showNotification(`⚠️ Lead ${droppedLead.client} (${droppedLead.id}) marked as "${droppedLead.status}" [Reason: ${droppedLead.dropReason}]. Archived in BFRD §6 Archive.`);
      return;
    }

    // 2. Handle Step 01: Sourcing New Lead
    if (stepNum === 1 && !project) {
      const newId = `NIRT-2610-00${projects.length + 43}`;
      const proposedCap = formData.proposedCapacity ? `${formData.proposedCapacity} kW` : "5 kW";
      const capNum = parseFloat(formData.proposedCapacity) || 5;
      const calcValue = `₹${((capNum * 55000) / 100000).toFixed(1)}L`;

      const newProject = {
        id: newId,
        client: formData.customerName || "New Solar Client",
        capacity: proposedCap,
        district: formData.districtCircle || "Salem",
        stage: "step_02", // Advances straight to Step 02 for site qualification
        value: calcValue,
        status: "Pending Qualification",
        advanceCleared: false
      };

      setProjects((prev) => [newProject, ...prev]);
      showNotification(`✓ New Lead ${newId} logged successfully! Advanced to Step 02 (Site & Consumer Qualification).`);
      return;
    }

    // 3. Handle Advancing an Existing Project to the Next Step
    if (project) {
      const nextStepNum = stepNum + 1;
      const nextStageKey = nextStepNum <= 20 ? `step_${nextStepNum < 10 ? `0${nextStepNum}` : nextStepNum}` : "step_20";
      const nextPipelineKey = getPipelineForStep(nextStepNum);

      // Check if this step cleared 80% Advance payment (Step 07)
      const isAdvanceClearedNow = project.advanceCleared || stepNum === 7;

      setProjects((prev) =>
        prev.map((p) => {
          if (p.id === project.id) {
            return {
              ...p,
              stage: nextStageKey,
              advanceCleared: isAdvanceClearedNow,
              status: nextStepNum <= 20 ? `In Step ${nextStepNum}` : "Triple Closed",
              capacity: formData.proposedCapacity ? `${formData.proposedCapacity} kW` : p.capacity,
              value: formData.totalQuoteValue ? `₹${formData.totalQuoteValue}L` : p.value
            };
          }
          return p;
        })
      );

      // If next step moved into another pipeline, auto-switch tab so user sees card in new column
      if (nextPipelineKey !== selectedPipelineKey && nextStepNum <= 20) {
        setSelectedPipelineKey(nextPipelineKey);
      }

      showNotification(`✓ Project ${project.id} (${project.client}) completed Step ${step}! Advanced to Step ${nextStepNum < 10 ? `0${nextStepNum}` : nextStepNum}.`);
    }
  };

  // Handler for restoring a Cat D lead (restricted to MD or Central PMO)
  const handleRestoreLead = (lead) => {
    if (!isExecutive && !isCoordinator) {
      alert("Only the Managing Director (Role 1) or Central PMO (Role 9) can re-open a dropped Cat D lead.");
      return;
    }

    const restoreReason = prompt(`Enter mandatory governance reason for re-opening ${lead.id} (${lead.client}):`);
    if (!restoreReason || restoreReason.trim().length < 8) {
      alert("Re-opening aborted. A detailed governance reason (min 8 characters) is required.");
      return;
    }

    // Log to Audit Log
    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: lead.id,
      clientName: lead.client,
      step: "Step 02: Cat D Lead Re-Evaluation",
      field: "Lead Qualification Status",
      oldValue: `Cat D Dropped (${lead.dropReason})`,
      newValue: "Re-opened for Re-Survey & Qualification",
      reason: restoreReason
    });

    // Remove from dropped, re-insert into active projects at step_02
    setDroppedProjects((prev) => prev.filter((p) => p.id !== lead.id));
    setProjects((prev) => [
      {
        id: lead.id,
        client: lead.client,
        capacity: lead.capacity,
        district: lead.district,
        stage: "step_02",
        value: lead.value,
        status: "Re-Survey Scheduled",
        advanceCleared: false
      },
      ...prev
    ]);

    setSelectedPipelineKey("sales");
    setViewMode("active");
    showNotification(`✓ Lead ${lead.id} re-opened by ${activeRole.title.split("/")[0]} and moved back to Step 02.`);
  };

  // Filter projects by search and district
  const filteredProjects = projects.filter((p) => {
    const matchSearch = p.client.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchDist = selectedDistrict === "All" || p.district === selectedDistrict;
    return matchSearch && matchDist;
  });

  const filteredDropped = droppedProjects.filter((p) => {
    return p.client.toLowerCase().includes(searchQuery.toLowerCase()) || p.id.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div className="space-y-6">
      
      {/* Top Segmented Role Switcher */}
      <RoleSwitcherPill />

      {/* Live Status Toast Banner */}
      {statusNotification && (
        <div className="p-3.5 rounded-2xl bg-slate-900 text-white text-xs font-semibold flex items-center justify-between shadow-lg shadow-slate-900/10 animate-in slide-in-from-top-2 duration-200">
          <div className="flex items-center space-x-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
          <button 
            onClick={() => setStatusNotification(null)}
            className="text-slate-400 hover:text-white text-xs font-mono px-2 py-0.5 rounded-md hover:bg-slate-800"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top View Mode Switcher: Active Board vs Dropped Leads Archive */}
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
          <button
            onClick={() => setViewMode("active")}
            className={`apple-button px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              viewMode === "active"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Active Operations ({projects.length})</span>
          </button>

          <button
            onClick={() => setViewMode("dropped")}
            className={`apple-button px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              viewMode === "dropped"
                ? "bg-white text-rose-700 shadow-xs"
                : "text-slate-600 hover:text-rose-600"
            }`}
          >
            <Ban className="w-3.5 h-3.5 text-rose-600" />
            <span>Dropped Leads Archive ({droppedProjects.length})</span>
          </button>
        </div>

        {/* District Circle Quick Filter */}
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 font-medium">Circle:</span>
          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-700 font-semibold focus:outline-none focus:ring-1 focus:ring-slate-900"
          >
            <option value="All">All Circles</option>
            <option value="Salem">Salem</option>
            <option value="Namakkal">Namakkal</option>
            <option value="Erode">Erode</option>
            <option value="Dharmapuri">Dharmapuri</option>
            <option value="Coimbatore">Coimbatore</option>
          </select>
        </div>
      </div>

      {/* VIEW 1: ACTIVE PIPELINES BOARD */}
      {viewMode === "active" && (
        <>
          {/* 5-Pipeline Segmented Apple Control (Full-width grid: 100% visible on desktop with zero cutoff) */}
          <div className="glass-surface rounded-2xl sm:rounded-3xl p-1.5 sm:p-2 border border-slate-200/80 shadow-xs">
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5">
              {Object.entries(PIPELINES).map(([key, pipe], idx) => {
                const isSelected = selectedPipelineKey === key;
                const code = `P${idx + 1}`;
                const shortName = pipe.title.replace(/^\d+\.\s*/, "").replace(/\s*Pipeline$/, "");
                const range = pipe.stepsRange.replace("Steps ", "");

                return (
                  <button
                    key={key}
                    onClick={() => setSelectedPipelineKey(key)}
                    className={`apple-button w-full text-left p-2.5 sm:p-3 rounded-xl sm:rounded-2xl transition-all flex flex-col justify-between ${
                      isSelected
                        ? "bg-slate-900 text-white font-bold shadow-md shadow-slate-900/15"
                        : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/70 font-medium bg-white/40"
                    } ${idx === 4 ? "col-span-2 sm:col-span-1" : ""}`}
                  >
                    <div className="flex items-center justify-between w-full mb-1">
                      <div className="flex items-center space-x-1.5 min-w-0">
                        <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${isSelected ? "bg-blue-400" : "bg-slate-300"}`} />
                        <span className={`text-[11px] font-mono font-black ${isSelected ? "text-blue-300" : "text-slate-900"}`}>
                          {code}
                        </span>
                      </div>
                      <span className={`text-[10px] font-mono shrink-0 ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                        {range}
                      </span>
                    </div>

                    <div className={`text-xs truncate font-semibold leading-tight ${isSelected ? "text-white" : "text-slate-800"}`} title={shortName}>
                      {shortName}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Pipeline Header Banner */}
          <div className="glass-surface rounded-3xl p-5 border border-slate-200/80 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200">
                  {pipeline.stepsRange}
                </span>
                <span className="text-xs text-slate-400 font-mono">
                  {pipeline.stages.length} Sequential Steps
                </span>
              </div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight mt-1">
                {pipeline.title}
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {pipeline.description}
              </p>
            </div>

            {/* Quick Filter Search */}
            <div className="flex items-center space-x-2 shrink-0">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search Client or Project ID..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-1 focus:ring-slate-900 w-44 sm:w-56"
                />
              </div>
            </div>
          </div>

          {/* Horizontal Kanban Swimlanes */}
          <div className="overflow-x-auto pb-4">
            <div className="flex gap-4 min-w-[840px] items-start">
              {pipeline.stages.map((stage) => {
                const stageStepNum = stage.stepNumber < 10 ? `0${stage.stepNumber}` : `${stage.stepNumber}`;
                const matchedProjects = filteredProjects.filter((p) => p.stage === stage.id);
                const isRoleAuthorized = activeRole.ownedSteps?.includes(stage.stepNumber);

                return (
                  <div
                    key={stage.id}
                    className="w-80 shrink-0 glass-surface rounded-3xl border border-slate-200/80 p-4 flex flex-col justify-between shadow-xs"
                  >
                    {/* Lane Header */}
                    <div className="pb-3 border-b border-slate-100 space-y-1.5">
                      <div className="flex items-center justify-between">
                        <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-md bg-slate-900 text-white">
                          Step {stageStepNum}
                        </span>
                        <span className="text-[10px] text-slate-400 font-medium">
                          SLA: {stage.slaDays}d
                        </span>
                      </div>

                      <h3 className="text-sm font-bold text-slate-900 tracking-tight leading-snug">
                        {stage.title}
                      </h3>

                      <div className="flex items-center justify-between text-[11px] text-slate-500">
                        <span>Role: <strong className="text-slate-700">{stage.responsibleRole}</strong></span>
                        {stage.isHardGate && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                            Hard Gate
                          </span>
                        )}
                        {stage.isClosure && (
                          <span className="px-1.5 py-0.2 rounded text-[10px] font-bold bg-emerald-100 text-emerald-800 border border-emerald-300">
                            Closure Gate
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Gate Rule Box */}
                    <div className="my-3 p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-[11px] text-slate-600">
                      <span className="font-semibold text-slate-800 block text-[10px] uppercase tracking-wider text-slate-400">
                        Mandatory Gate Rule:
                      </span>
                      <p className="mt-0.5 leading-snug">{stage.gateRule}</p>
                    </div>

                    {/* Cards in this Stage */}
                    <div className="space-y-2.5 min-h-[140px]">
                      {matchedProjects.map((p) => {
                        // Check Hard Gate Lock for Step 11 & Step 13
                        const isHardLocked = (stage.stepNumber === 11 || stage.stepNumber === 13) && !p.advanceCleared;

                        return (
                          <div
                            key={p.id}
                            className={`p-3 rounded-2xl bg-white border shadow-xs apple-card space-y-2 transition-all ${
                              isHardLocked ? "border-rose-200 bg-rose-50/20" : "border-slate-200/80"
                            }`}
                          >
                            <div className="flex items-start justify-between">
                              <div>
                                <span className="text-[10px] font-mono text-blue-600 font-bold">{p.id}</span>
                                <h4 className="text-xs font-bold text-slate-900 leading-tight">{p.client}</h4>
                              </div>
                              <span className="text-xs font-mono font-semibold text-slate-800">{p.capacity}</span>
                            </div>

                            {/* Hard Gate 1 Notice on Step 11 & Step 13 if Step 07 UTR not cleared */}
                            {isHardLocked && (
                              <div className="p-2 rounded-xl bg-rose-50 border border-rose-200 text-[10px] text-rose-800 flex items-start space-x-1.5">
                                <Lock className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                                <span><strong>Hard Lock:</strong> Requires Step 07 80% Advance UTR cleared by Accounts before vendor PO/dispatch.</span>
                              </div>
                            )}

                            <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1 border-t border-slate-100">
                              <span>{p.district} • {p.value}</span>
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleTriggerEdit(p, stage)}
                                  className="apple-button text-[10px] font-semibold text-slate-500 hover:text-slate-900 underline"
                                >
                                  Edit Reason
                                </button>
                                <button
                                  disabled={isHardLocked || !isRoleAuthorized}
                                  onClick={() => handleLaunchStepForProject(p, stage)}
                                  className={`apple-button px-2.5 py-1 rounded-lg text-[10px] font-bold flex items-center space-x-1 transition-all ${
                                    isHardLocked || !isRoleAuthorized
                                      ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                                      : "bg-blue-600 text-white hover:bg-blue-700 shadow-2xs"
                                  }`}
                                >
                                  <span>Advance</span>
                                  <ArrowRight className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}

                      {matchedProjects.length === 0 && (
                        <div className="h-28 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-3 text-slate-400">
                          <Clock className="w-5 h-5 mb-1 stroke-[1.5]" />
                          <span className="text-[11px]">No active projects in this gate</span>
                        </div>
                      )}
                    </div>

                    {/* Lane Bottom Action Button */}
                    <div className="pt-3 border-t border-slate-100 mt-2">
                      <button
                        onClick={() => handleLaunchStepLane(stage)}
                        className={`apple-button w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center space-x-1.5 transition-all ${
                          isRoleAuthorized
                            ? "bg-slate-900 text-white hover:bg-black shadow-xs"
                            : "bg-slate-100 text-slate-400 cursor-not-allowed"
                        }`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                        <span>
                          {stage.stepNumber === 1
                            ? "+ New Lead Intake"
                            : isRoleAuthorized
                            ? `Execute Gate Input`
                            : `Requires ${stage.responsibleRole}`}
                        </span>
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* VIEW 2: DROPPED & LOST LEADS ARCHIVE (BFRD §6) */}
      {viewMode === "dropped" && (
        <div className="space-y-4">
          
          {/* Governance Notice Banner */}
          <div className="p-4 rounded-3xl bg-rose-50 border border-rose-200/80 text-rose-950 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 rounded-2xl bg-rose-600 text-white flex items-center justify-center shrink-0">
                <Ban className="w-4 h-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-rose-900">
                  BFRD §6 Lead Qualification: Dropped, Rejected &amp; Lost Archive
                </h3>
                <p className="text-xs text-rose-700 mt-0.5">
                  All unqualified or lost leads (price issues, technical constraints, competitor selected, postponed) are permanently logged here with written audit justification. They are strictly blocked from progressing to Step 03 (Site Survey).
                </p>
              </div>
            </div>
            <div className="text-[11px] font-mono text-rose-800 bg-rose-100/80 px-3 py-1.5 rounded-xl border border-rose-200 shrink-0">
              Total Archived: {droppedProjects.length} Leads
            </div>
          </div>

          {/* Dropped Leads Table */}
          <div className="glass-surface rounded-3xl border border-slate-200/80 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Client Name</th>
                    <th className="py-3 px-4">District &amp; Capacity</th>
                    <th className="py-3 px-4">Lifecycle Status</th>
                    <th className="py-3 px-4">BFRD §6 Reason</th>
                    <th className="py-3 px-4 min-w-[220px]">Logged Audit Remarks</th>
                    <th className="py-3 px-4">Logged By / Date</th>
                    <th className="py-3 px-4 text-right">Governance Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredDropped.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">
                        {lead.id}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {lead.client}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="font-semibold text-slate-900">{lead.capacity}</span> • {lead.district}
                      </td>
                      <td className="py-3.5 px-4 text-slate-600">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-slate-100 text-slate-800 border border-slate-200">
                          {lead.status || "Not Qualified"}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                          {lead.dropReason}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 italic leading-relaxed">
                        &ldquo;{lead.dropRemarks}&rdquo;
                      </td>
                      <td className="py-3.5 px-4 text-slate-500 text-[11px]">
                        <div>{lead.droppedBy}</div>
                        <div className="font-mono text-slate-400 text-[10px]">{lead.droppedDate}</div>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {(isExecutive || isCoordinator) ? (
                          <button
                            onClick={() => handleRestoreLead(lead)}
                            className="apple-button px-3 py-1.5 rounded-xl text-[11px] font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white hover:border-slate-900 shadow-2xs transition-all"
                          >
                            Re-evaluate Lead
                          </button>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-mono italic">
                            Locked (MD/PMO only)
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}

                  {filteredDropped.length === 0 && (
                    <tr>
                      <td colSpan={8} className="py-8 text-center text-slate-400">
                        No dropped leads match the filter criteria.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <QuickActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => setIsActionSheetOpen(false)}
        defaultAction={selectedStageAction}
        project={actionTargetProject}
        onStepComplete={handleStepComplete}
      />

      <EditWithReasonModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        project={editTargetProject}
      />

    </div>
  );
}