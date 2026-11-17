import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useSearchParams } from "react-router-dom";
import {
  PIPELINES,
  PIPELINE_LIST,
  CHECKLIST_BY_NUMBER,
  getStageById,
  getPipelineForStage,
  getStageForStep,
  STAGE_ALIASES
} from "@/data/pipelineStages";
import { useRole } from "@/context/RoleContext";
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
  Building2,
  ArrowRight,
  Sparkles,
  Archive,
  AlertTriangle,
  ChevronRight,
  ShieldAlert,
  PauseCircle,
  PlayCircle,
  Waypoints,
  X,
  FileCheck,
  TrendingUp,
  Banknote,
  Award,
  Info,
  MapPin,
  Calendar,
  Filter
} from "lucide-react";

const PIPELINE_ALIASES = {
  1: "sales",
  s1: "sales",
  sales: "sales",
  2: "execution",
  s2: "execution",
  execution: "execution",
  project_execution: "execution",
  3: "subsidy",
  s3: "subsidy",
  subsidy: "subsidy",
  subsidy_flow: "subsidy"
};

const PIPELINE_THEME = {
  sales: {
    dot: "bg-blue-500",
    pill: "bg-blue-50 text-blue-700 border-blue-200",
    accent: "text-blue-600",
    border: "border-blue-500/20",
    soft: "bg-blue-50/60 text-blue-800 border-blue-200"
  },
  execution: {
    dot: "bg-emerald-500",
    pill: "bg-emerald-50 text-emerald-700 border-emerald-200",
    accent: "text-emerald-600",
    border: "border-emerald-500/20",
    soft: "bg-emerald-50/60 text-emerald-800 border-emerald-200"
  },
  subsidy: {
    dot: "bg-violet-500",
    pill: "bg-violet-50 text-violet-700 border-violet-200",
    accent: "text-violet-600",
    border: "border-violet-500/20",
    soft: "bg-violet-50/60 text-violet-800 border-violet-200"
  }
};

const DISTRICTS = ["All", "Salem", "Namakkal", "Erode", "Dharmapuri", "Coimbatore"];

// Initial Projects mapped across all stages of the 3 client pipelines
const INITIAL_PROJECTS = [
  // 1. SALES PIPELINE (7 Open Stages)
  { id: "NIRT-2610-0043", client: "S. Murugesan", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Salem", stage: "sales_new_enquiry", status: "New enquiry", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0042", client: "Green Agro Cold Storage", capacity: "25 kW", value: "₹12.4L", valueNumeric: 1240000, district: "Namakkal", stage: "sales_contacted", status: "Contacted", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0041", client: "Dr. K. Arulmani", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Namakkal", stage: "sales_qualified", status: "Qualified", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0040", client: "Aravind Hospital", capacity: "40 kW", value: "₹18.8L", valueNumeric: 1880000, district: "Erode", stage: "sales_site_visit_scheduled", status: "Site Visit Scheduled", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0039", client: "Balu Poultry Farm", capacity: "15 kW", value: "₹7.2L", valueNumeric: 720000, district: "Namakkal", stage: "sales_site_visit_completed", status: "Site Visit Completed", advanceCleared: false, daysInStage: 3 },
  { id: "NIRT-2610-0038", client: "V. Thangavel", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Salem", stage: "sales_quotation_sent", status: "Quotation Sent", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0037", client: "R. Jayaprakash", capacity: "10 kW", value: "₹5.1L", valueNumeric: 510000, district: "Coimbatore", stage: "sales_negotiation", status: "Negotiation", advanceCleared: false, daysInStage: 4 },

  // 1. SALES PIPELINE (Closed Stages)
  { id: "NIRT-2610-0036", client: "M. Saravanan", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Salem", stage: "sales_deal_confirmed", status: "Deal Confirmed", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0035", client: "P. Karunakaran", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Dharmapuri", stage: "sales_not_feasible", status: "Not Feasible", advanceCleared: false, daysInStage: 6 },
  { id: "NIRT-2610-0034", client: "V. Mohanraj", capacity: "10 kW", value: "₹5.1L", valueNumeric: 510000, district: "Coimbatore", stage: "sales_lost", status: "Lost", advanceCleared: false, daysInStage: 8 },

  // 2. PROJECT EXECUTION PIPELINE (12 Open Stages)
  { id: "NIRT-2610-0033", client: "K. R. Sengottaiyan", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Namakkal", stage: "exec_advance_pending", status: "Advance Payment Pending", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0032", client: "Sri Balaji Spinning Mill", capacity: "50 kW", value: "₹24.0L", valueNumeric: 2400000, district: "Erode", stage: "exec_advance_received", status: "Advance Received", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0031", client: "S. K. Periasamy", capacity: "6 kW", value: "₹3.1L", valueNumeric: 310000, district: "Salem", stage: "exec_loan_processing", status: "Loan Processing", advanceCleared: true, daysInStage: 3 },
  { id: "NIRT-2610-0030", client: "Annai Medicals", capacity: "8 kW", value: "₹4.2L", valueNumeric: 420000, district: "Salem", stage: "exec_registration", status: "Registration", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0029", client: "Kongu Polytex", capacity: "30 kW", value: "₹14.2L", valueNumeric: 1420000, district: "Erode", stage: "exec_material_planning", status: "Material Planning", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0028", client: "V. C. Palanisamy", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Namakkal", stage: "exec_material_dispatched", status: "Material Dispatched", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0027", client: "Dr. M. Soundararajan", capacity: "12 kW", value: "₹5.9L", valueNumeric: 590000, district: "Salem", stage: "exec_installation_in_progress", status: "Installation In Progress", advanceCleared: true, daysInStage: 3 },
  { id: "NIRT-2610-0026", client: "Lakshmi Tex Mills", capacity: "20 kW", value: "₹9.8L", valueNumeric: 980000, district: "Coimbatore", stage: "exec_installation_completed", status: "Installation Completed", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0025", client: "S. Selvakumar", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Dharmapuri", stage: "exec_eb_application_submitted", status: "EB Application Submitted", advanceCleared: true, daysInStage: 4 },
  { id: "NIRT-2610-0024", client: "Thangavel Poultry", capacity: "15 kW", value: "₹7.2L", valueNumeric: 720000, district: "Namakkal", stage: "exec_eb_inspection_pending", status: "EB Inspection Pending", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0023", client: "K. R. Natarajan", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Salem", stage: "exec_system_activated", status: "System Activated", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0022", client: "Sri Krishna Rice Mill", capacity: "40 kW", value: "₹18.5L", valueNumeric: 1850000, district: "Erode", stage: "exec_final_payment_pending", status: "Final Payment Pending", advanceCleared: true, daysInStage: 2 },

  // 2. PROJECT EXECUTION PIPELINE (Closed Stages)
  { id: "NIRT-2610-0021", client: "M. P. Velusamy", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Salem", stage: "exec_project_completed", status: "Project Completed", advanceCleared: true, daysInStage: 0 },
  { id: "NIRT-2610-0020", client: "Cauvery Water Services", capacity: "10 kW", value: "₹5.1L", valueNumeric: 510000, district: "Erode", stage: "exec_on_hold", status: "On Hold", advanceCleared: false, daysInStage: 14, heldFromStage: "exec_advance_pending" },

  // 3. SUBSIDY FLOW PIPELINE (3 Open Stages)
  { id: "NIRT-2610-0019", client: "Dr. N. Rajendran", capacity: "3 kW", value: "₹78,000", valueNumeric: 78000, district: "Salem", stage: "subsidy_applied", status: "Subsidy Applied", advanceCleared: true, daysInStage: 3 },
  { id: "NIRT-2610-0018", client: "S. Dharmalingam", capacity: "3 kW", value: "₹78,000", valueNumeric: 78000, district: "Namakkal", stage: "subsidy_under_verification", status: "Under Verification", advanceCleared: true, daysInStage: 5 },
  { id: "NIRT-2610-0017", client: "R. Shanmugam", capacity: "3 kW", value: "₹78,000", valueNumeric: 78000, district: "Erode", stage: "subsidy_approved", status: "Subsidy Approved", advanceCleared: true, daysInStage: 2 },

  // 3. SUBSIDY FLOW PIPELINE (Closed Stages)
  { id: "NIRT-2610-0016", client: "P. Subramaniam", capacity: "3 kW", value: "₹78,000", valueNumeric: 78000, district: "Salem", stage: "subsidy_received", status: "Subsidy Received", advanceCleared: true, daysInStage: 0 }
];

const INITIAL_DROPPED_PROJECTS = [
  {
    id: "NIRT-2610-0035",
    client: "P. Karunakaran",
    capacity: "3 kW",
    value: "₹1.65L",
    district: "Dharmapuri",
    status: "Not Feasible",
    droppedAtStage: "1. Sales Pipeline · Site Visit Completed",
    dropReason: "Technical issue",
    dropRemarks: "Old asbestos sheet shed structure cannot support calculated wind uplift load. Client unwilling to reconstruct purlins.",
    droppedDate: "14-Nov-2026",
    droppedBy: "Saravanan (Surveyor)"
  },
  {
    id: "NIRT-2610-0034",
    client: "V. Mohanraj",
    capacity: "10 kW",
    value: "₹5.1L",
    district: "Coimbatore",
    status: "Lost",
    droppedAtStage: "1. Sales Pipeline · Negotiation",
    dropReason: "Price negotiation failed",
    dropRemarks: "Competitor offered substandard non-DCR modules at ₹42/watt. Customer refused Tier-1 mono-PERC DCR quality standard.",
    droppedDate: "13-Nov-2026",
    droppedBy: "K. Boopathi (Sales)"
  }
];

function stageWithMeta(stage, pipeline) {
  return {
    ...stage,
    pipelineId: pipeline.id,
    pipelineTitle: pipeline.titleLong,
    pipelineCode: pipeline.code,
    stageTotal: stage.closed ? pipeline.stages.length + pipeline.closedStages.length : pipeline.stages.length,
    nextStageLabel: stage.nextStage
      ? `${getPipelineForStage(stage.nextStage)?.title || ""} · ${getStageById(stage.nextStage)?.title || "Next stage"}`
      : "Stage clearance complete"
  };
}

function formatINR(amount) {
  if (!amount || Number.isNaN(amount)) return "₹0";
  if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(2)} Cr`;
  if (amount >= 100000) return `₹${(amount / 100000).toFixed(2)} Lakhs`;
  return `₹${amount.toLocaleString("en-IN")}`;
}

export default function PipelinesPage() {
  const { activeRole, isExecutive, isCoordinator, addAuditEntry } = useRole();
  const [searchParams, setSearchParams] = useSearchParams();
  const pipelineParam = searchParams.get("pipeline");
  const stepParam = searchParams.get("step");

  const initialKey = (pipelineParam && PIPELINE_ALIASES[pipelineParam.toLowerCase()]) || "sales";
  const [projects, setProjects] = useState(INITIAL_PROJECTS);
  const [droppedProjects, setDroppedProjects] = useState(INITIAL_DROPPED_PROJECTS);
  const [viewMode, setViewMode] = useState("active"); // "active" | "closed" | "archive"
  const [selectedPipelineKey, setSelectedPipelineKey] = useState(initialKey);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("All");
  const [stageFilterMode, setStageFilterMode] = useState("role");
  const [expandedInfoStageId, setExpandedInfoStageId] = useState(null);

  const [isActionSheetOpen, setIsActionSheetOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedStage, setSelectedStage] = useState(null);
  const [actionTargetProject, setActionTargetProject] = useState(null);
  const [editTargetProject, setEditTargetProject] = useState(null);
  const [statusNotification, setStatusNotification] = useState(null);
  const [reasonDialog, setReasonDialog] = useState(null);
  const [reasonText, setReasonText] = useState("");
  const [reasonError, setReasonError] = useState("");

  const isMasterAdmin = isExecutive || isCoordinator || activeRole.id === "managing_director" || activeRole.id === "project_coordinator";
  const pipeline = PIPELINES[selectedPipelineKey] || PIPELINES.sales;
  const theme = PIPELINE_THEME[pipeline.id] || PIPELINE_THEME.sales;

  const showNotification = (message) => {
    setStatusNotification(message);
    window.setTimeout(() => setStatusNotification(null), 4500);
  };

  const goToPipeline = (key) => {
    const mapped = PIPELINE_ALIASES[String(key).toLowerCase()] || key;
    setSelectedPipelineKey(mapped);
    setSearchParams((prev) => {
      const next = new URLSearchParams(prev);
      next.set("pipeline", mapped);
      next.delete("step");
      return next;
    });
  };

  useEffect(() => {
    const mapped = pipelineParam && PIPELINE_ALIASES[pipelineParam.toLowerCase()];
    if (mapped && mapped !== selectedPipelineKey) {
      setSelectedPipelineKey(mapped);
    }
  }, [pipelineParam]);

  useEffect(() => {
    if (!stepParam) return undefined;
    const stepNumber = parseInt(stepParam.replace(/^[^0-9]+/, ""), 10);
    if (!Number.isFinite(stepNumber)) return undefined;
    const targetStage = pipeline.stages.find((stage) => stage.checklist.includes(stepNumber));
    if (targetStage) {
      const element = document.getElementById(`stage-lane-${targetStage.id}`);
      if (element) {
        element.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [stepParam, pipeline]);

  // Project Stage Progression Logic
  const updateProjectStage = (projectId, nextStage, extraData = {}) => {
    setProjects((prev) =>
      prev.map((project) => {
        if (project.id !== projectId) return project;
        const willBeAdvanceCleared =
          extraData.advanceCleared !== undefined
            ? extraData.advanceCleared
            : nextStage.id === "exec_advance_received" || project.advanceCleared;

        return {
          ...project,
          ...extraData,
          stage: nextStage.id,
          stageName: nextStage.title,
          status: extraData.status || nextStage.title,
          advanceCleared: willBeAdvanceCleared,
          daysInStage: 0
        };
      })
    );
  };

  const handleActionComplete = (payload) => {
    const current = actionTargetProject;
    const stage = selectedStage;
    if (!current || !stage) return;

    if (stage.nextStage) {
      const next = getStageById(stage.nextStage);
      if (next) {
        updateProjectStage(current.id, next, {
          ...(payload.advancePaymentUTR ? { advanceCleared: true } : {})
        });
        showNotification(
          `${current.client} advanced to ${next.title}. Handoff logged in audit trail.`
        );
      }
    } else {
      showNotification(`${current.client} cleared stage requirements for ${stage.title}.`);
    }

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: current.id,
      clientName: current.client,
      step: `${pipeline.titleLong} · ${stage.title}`,
      field: "Stage Clearance / Gate Approval",
      oldValue: stage.title,
      newValue: stage.nextStageLabel || "Completed",
      reason: payload.remarks || "Mandatory checklist cleared per SOP"
    });
  };

  const roleOwnedStages = pipeline.stages.filter(
    (stage) => stage.checklist.some((number) => activeRole.ownedSteps?.includes(number))
  );
  const isFilteringByRole = !isMasterAdmin && stageFilterMode === "role";
  const displayedStages = isFilteringByRole ? roleOwnedStages : pipeline.stages;

  const isStageAuthorized = (stage) => {
    if (isMasterAdmin) return true;
    return Boolean(stage.checklist?.some((number) => activeRole.ownedSteps?.includes(number)));
  };

  const launchStage = (stage, project = null) => {
    setActionTargetProject(project);
    setSelectedStage(stageWithMeta(stage, pipeline));
    setIsActionSheetOpen(true);
  };

  const filteredProjects = projects.filter((project) => {
    const matchesDistrict = selectedDistrict === "All" || project.district === selectedDistrict;
    const matchesSearch =
      !searchQuery.trim() ||
      project.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.district.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDistrict && matchesSearch;
  });

  const pipelineValue = projects
    .filter((project) => {
      const canon = STAGE_ALIASES[project.stage] || project.stage;
      return pipeline.stages.some((stage) => stage.id === canon);
    })
    .reduce((sum, p) => sum + (p.valueNumeric || 0), 0);

  const openStageCount = pipeline.stages.length;
  const closedStageCount = pipeline.closedStages.length;

  const handleDropProject = (project, stage) => {
    const reason = window.prompt(
      `Mark ${project.client} as Dropped / Not Feasible?\n\nEnter mandatory reason for cancellation:`,
      "Commercial non-feasibility"
    );
    if (!reason || !reason.trim()) return;

    setProjects((prev) => prev.filter((p) => p.id !== project.id));
    setDroppedProjects((prev) => [
      {
        id: project.id,
        client: project.client,
        capacity: project.capacity,
        value: project.value,
        district: project.district,
        status: "Not Feasible",
        droppedAtStage: `${pipeline.titleLong} · ${stage.title}`,
        dropReason: reason.trim(),
        dropRemarks: "Manually marked by staff with formal justification.",
        droppedDate: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }),
        droppedBy: activeRole.title.split("/")[0].trim()
      },
      ...prev
    ]);

    addAuditEntry({
      staffName: activeRole.title.split("/")[0].trim(),
      projectId: project.id,
      clientName: project.client,
      step: `${pipeline.titleLong} · ${stage.title}`,
      field: "Project Dropped",
      oldValue: stage.title,
      newValue: "Not Feasible (Archived)",
      reason: reason.trim()
    });

    showNotification(`${project.client} moved to Loss Archive.`);
  };

  const handleReopenClosed = (project) => {
    setReasonDialog({
      mode: "restore",
      project,
      title: `Re-open Lead: ${project.client}`,
      placeholder: "Specify technical/commercial rationale to re-qualify this lead..."
    });
  };

  const handleHoldProject = (project) => {
    setReasonDialog({
      mode: "hold",
      project,
      title: `Place On Hold: ${project.client}`,
      placeholder: "Specify why this installation is temporarily paused (e.g. Roof repair, DISCOM delay)..."
    });
  };

  const handleResumeProject = (project) => {
    const resumeStage = getStageById(project.heldFromStage) || getStageById("exec_material_planning");
    updateProjectStage(project.id, resumeStage, { heldFromStage: null, status: resumeStage.title });
    showNotification(`${project.client} resumed at ${resumeStage.title}.`);
  };

  const closeReasonDialog = () => {
    setReasonDialog(null);
    setReasonText("");
    setReasonError("");
  };

  const submitReasonDialog = (event) => {
    event.preventDefault();
    if (!reasonDialog) return;
    if (reasonText.trim().length < 8) {
      setReasonError("Please provide a clear reason (minimum 8 characters).");
      return;
    }

    const { mode, project } = reasonDialog;
    const actor = activeRole.title.split("/")[0].trim();

    if (mode === "hold") {
      updateProjectStage(project.id, getStageById("exec_on_hold"), {
        heldFromStage: project.stage,
        status: "On Hold"
      });
      addAuditEntry({
        staffName: actor,
        projectId: project.id,
        clientName: project.client,
        step: "2. Project Execution Pipeline · On Hold",
        field: "Project stage",
        oldValue: project.status || project.stage,
        newValue: "On Hold",
        reason: reasonText.trim()
      });
      showNotification(`${project.client} placed on hold.`);
      closeReasonDialog();
      return;
    }

    if (mode === "restore") {
      setDroppedProjects((prev) => prev.filter((lead) => lead.id !== project.id));
      setProjects((prev) => [{
        id: project.id,
        client: project.client,
        capacity: project.capacity,
        district: project.district,
        stage: "sales_qualified",
        stageName: "Qualified",
        status: "Re-opened for re-qualification",
        advanceCleared: false,
        daysInStage: 0,
        value: project.value,
        valueNumeric: project.valueNumeric || 0
      }, ...prev]);
      addAuditEntry({
        staffName: actor,
        projectId: project.id,
        clientName: project.client,
        step: "1. Sales Pipeline · Loss Archive",
        field: "Re-opened lead",
        oldValue: project.dropReason || "Lost",
        newValue: "Re-opened at Qualified",
        reason: reasonText.trim()
      });
      showNotification(`${project.client} restored to 1. Sales Pipeline at Qualified.`);
      closeReasonDialog();
    }
  };

  // Open Stage Swimlane Column Renderer (High-Craft Linear/Attio Style)
  const renderStageLane = (stage) => {
    const stageMeta = stageWithMeta(stage, pipeline);
    const matchedProjects = filteredProjects.filter((project) => {
      const canon = STAGE_ALIASES[project.stage] || project.stage;
      return canon === stage.id;
    });
    const stageTotalVal = matchedProjects.reduce((sum, p) => sum + (p.valueNumeric || 0), 0);
    const authorized = isStageAuthorized(stage);
    const isTargetStep = Boolean(stepParam) && stage.checklist.includes(parseInt(stepParam.replace(/^[^0-9]+/, ""), 10));
    const isInfoOpen = expandedInfoStageId === stage.id;

    return (
      <section
        key={stage.id}
        id={`stage-lane-${stage.id}`}
        className={`w-[290px] sm:w-[310px] shrink-0 bg-slate-100/60 rounded-2xl p-3.5 flex flex-col transition-all duration-200 ${
          isTargetStep ? "ring-2 ring-blue-500 bg-blue-50/40" : ""
        }`}
      >
        {/* Compact Column Header */}
        <div className="pb-2.5 mb-2.5 border-b border-slate-200/60">
          <div className="flex items-center justify-between gap-1.5">
            <div className="flex items-center gap-1.5 min-w-0">
              <span className="w-5 h-5 rounded-md bg-zinc-900 text-white text-[10px] font-mono font-bold flex items-center justify-center shrink-0">
                {String(stage.number).padStart(2, "0")}
              </span>
              <h3 className="text-xs font-bold text-zinc-900 tracking-tight leading-snug truncate" title={stage.title}>
                {stage.title}
              </h3>
            </div>
            
            <div className="flex items-center gap-1 shrink-0">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded-full bg-white text-zinc-700 border border-zinc-200/80 shadow-2xs">
                {matchedProjects.length}
              </span>
              <button
                type="button"
                onClick={() => setExpandedInfoStageId(isInfoOpen ? null : stage.id)}
                className={`p-1 rounded-lg text-zinc-400 hover:text-zinc-700 hover:bg-zinc-200/60 transition-colors ${
                  isInfoOpen ? "bg-zinc-200 text-zinc-900" : ""
                }`}
                title="Stage info, SLA & gate rule"
              >
                <Info className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono mt-1 pt-0.5">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-zinc-400" />
              SLA {stage.slaDays}d
            </span>
            <span className="font-semibold text-zinc-700">
              {stageTotalVal > 0 ? formatINR(stageTotalVal) : "—"}
            </span>
          </div>

          {/* Expandable Stage Details Tray */}
          {isInfoOpen && (
            <div className="mt-2 p-2 rounded-xl bg-white border border-zinc-200/90 text-[11px] space-y-1.5 animate-in fade-in duration-150">
              <p className="text-zinc-600 text-[10px] leading-relaxed">{stage.description}</p>
              <div className="flex items-center gap-1 flex-wrap pt-1 border-t border-zinc-100">
                <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-zinc-100 text-zinc-700">
                  {stage.responsibleRole}
                </span>
                {stage.isHardGate && (
                  <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                    Hard Gate
                  </span>
                )}
              </div>
              <div className="pt-1 border-t border-zinc-100 text-[10px]">
                <strong className="text-zinc-700">Gate: </strong>
                <span className="text-zinc-600">{stage.gateRule}</span>
              </div>
            </div>
          )}
        </div>

        {/* Deals Container */}
        <div className="space-y-2.5 min-h-[140px] flex-1">
          {matchedProjects.map((project) => {
            const hardLocked = Boolean(stage.requiresAdvance) && !project.advanceCleared;
            const canAdvance = authorized && !hardLocked;
            const slaExceeded = (project.daysInStage || 0) > stage.slaDays;
            const slaWarning = (project.daysInStage || 0) >= stage.slaDays * 0.8;
            const slaBadgeStyle = slaExceeded
              ? "bg-rose-50 text-rose-700"
              : slaWarning
              ? "bg-amber-50 text-amber-700"
              : "bg-slate-100 text-slate-600";

            return (
              <article
                key={project.id}
                className={`p-4 rounded-xl bg-white shadow-xs hover:shadow-md transition-all duration-150 group space-y-3 cursor-pointer ${
                  hardLocked ? "ring-1 ring-rose-200 bg-rose-50/15" : "hover:ring-1 hover:ring-slate-200"
                }`}
              >
                {/* Card Header: Tertiary Metadata & Capacity */}
                <div className="flex items-center justify-between gap-2 text-[11px] text-slate-400 font-mono">
                  <span className="font-medium tracking-wide uppercase">
                    {project.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700">
                    {project.capacity || `${project.capacityKw || 0} kW`}
                  </span>
                </div>

                {/* Card Body: Primary Client Name & Location */}
                <div className="min-w-0">
                  <h4 className="text-sm sm:text-base font-semibold text-slate-900 leading-snug tracking-tight truncate group-hover:text-blue-600 transition-colors" title={project.client}>
                    {project.client}
                  </h4>
                  <p className="text-xs text-slate-500 truncate flex items-center gap-1 mt-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{project.district || project.location || "Tamil Nadu"}</span>
                  </p>
                </div>

                {/* Financial Value & SLA Meter */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs font-mono tabular-nums">
                  <span className="font-bold text-slate-900 text-sm">
                    {project.value ? (typeof project.value === 'number' ? formatINR(project.value) : project.value) : "—"}
                  </span>
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-md ${slaBadgeStyle}`}>
                    {project.daysInStage || 0}d / {stage.slaDays}d SLA
                  </span>
                </div>

                {hardLocked && (
                  <div className="p-2 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] flex items-center gap-1.5 font-semibold">
                    <Lock className="w-3.5 h-3.5 shrink-0" />
                    <span>80% Advance Gate Lock</span>
                  </div>
                )}

                {/* Card Action Buttons (Outline & Contextual) */}
                <div className="pt-1.5 flex items-center justify-between gap-1.5">
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditTargetProject(project);
                      setIsEditModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Audit Stage Reassignment"
                  >
                    <FileCheck className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5">
                    {stage.pipelineId === "sales" && stage.id !== "sales_deal_confirmed" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDropProject(project, stage);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Mark as Not Feasible / Lost"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    )}

                    {stage.pipelineId === "execution" && stage.id !== "exec_on_hold" && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleHoldProject(project);
                        }}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-amber-600 hover:bg-amber-50 transition-colors"
                        title="Pause project on hold"
                      >
                        <PauseCircle className="w-3.5 h-3.5" />
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={!canAdvance}
                      onClick={(e) => {
                        e.stopPropagation();
                        launchStage(stage, project);
                      }}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all ${
                        canAdvance
                          ? "border border-slate-200 text-slate-700 bg-white hover:bg-slate-900 hover:text-white hover:border-slate-900 group-hover:border-slate-300 shadow-2xs active:scale-95"
                          : "border border-slate-100 text-slate-300 bg-slate-50 cursor-not-allowed"
                      }`}
                    >
                      <span>{stage.actionLabel || "Advance"}</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {matchedProjects.length === 0 && (
            <div className="h-28 rounded-xl border border-dashed border-zinc-200 flex flex-col items-center justify-center text-center p-3 text-zinc-400">
              <Clock className="w-5 h-5 mb-1 stroke-[1.5] text-zinc-300" />
              <span className="text-[11px] font-medium">No projects in stage</span>
            </div>
          )}
        </div>

        {/* Column Footer */}
        <div className="pt-2 border-t border-zinc-200/60 mt-2">
          {stage.id === "sales_new_enquiry" ? (
            <button
              type="button"
              onClick={() => launchStage(stage, null)}
              className="w-full py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 border border-slate-300 bg-white text-slate-800 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-2xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Enquiry</span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-1 text-[10px] text-zinc-400 font-mono">
              <Waypoints className="w-3 h-3" />
              <span>Advance from prior stage</span>
            </div>
          )}
        </div>
      </section>
    );
  };

  // Closed Stage Swimlane Card Renderer
  const renderClosedLane = (stage) => {
    const matchedProjects = filteredProjects.filter((project) => {
      const canon = STAGE_ALIASES[project.stage] || project.stage;
      return canon === stage.id;
    });
    const isWon = stage.outcome === "won";
    const isPaused = stage.outcome === "paused";
    const isLost = stage.outcome === "lost";

    const badgeStyle = isWon
      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
      : isPaused
        ? "bg-rose-50 text-rose-800 border-rose-200"
        : "bg-rose-50 text-rose-700 border-rose-200";

    const dotStyle = isWon
      ? "bg-emerald-500"
      : isPaused
        ? "bg-rose-500"
        : "bg-rose-500";

    return (
      <section 
        key={stage.id} 
        className={`rounded-2xl border p-4 space-y-3 bg-white shadow-xs ${
          isWon ? "border-emerald-200/80" : "border-zinc-200/90"
        }`}
      >
        <div className="flex items-start justify-between gap-2 pb-2.5 border-b border-zinc-100">
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${dotStyle}`} />
              <h3 className="text-xs font-bold text-zinc-900 uppercase tracking-tight">
                {stage.title}
              </h3>
            </div>
            <p className="text-[11px] text-zinc-500 mt-0.5 leading-snug">{stage.description}</p>
          </div>
          <span className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded-full border ${badgeStyle}`}>
            {matchedProjects.length}
          </span>
        </div>

        <div className="space-y-2">
          {matchedProjects.map((project) => (
            <div key={project.id} className="p-3 rounded-xl bg-zinc-50/80 border border-zinc-200/80 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-zinc-400">{project.id}</span>
                  <div className="text-xs font-bold text-zinc-900 truncate">{project.client}</div>
                </div>
                <span className="text-xs font-bold text-zinc-900 font-mono">{project.value}</span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-zinc-500 font-mono">
                <span>{project.capacity} · {project.district}</span>
                <span className={`font-bold px-1.5 py-0.2 rounded border ${badgeStyle}`}>
                  {stage.title}
                </span>
              </div>

              {/* Action Buttons for Closed Stages */}
              <div className="flex items-center justify-end gap-1.5 pt-1.5 border-t border-zinc-200/60">
                {isLost && (
                  <button
                    type="button"
                    onClick={() => handleReopenClosed(project)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-900 hover:text-white transition-all shadow-2xs"
                  >
                    Re-open Lead
                  </button>
                )}

                {isPaused && (
                  <button
                    type="button"
                    onClick={() => handleResumeProject(project)}
                    className="px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <PlayCircle className="w-3 h-3" />
                    <span>Resume</span>
                  </button>
                )}

                {isWon && (
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Stage Cleared</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {matchedProjects.length === 0 && (
            <div className="h-20 rounded-xl border border-dashed border-zinc-200 flex items-center justify-center text-xs text-zinc-400">
              No projects in {stage.title}
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-4 pb-12">
      {/* Floating Notification */}
      {statusNotification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-zinc-900 text-white text-xs font-semibold shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 border border-zinc-800 max-w-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusNotification(null)}
            className="text-zinc-300 hover:text-white text-xs font-mono px-2 py-1 rounded-md hover:bg-zinc-800 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header - High-Craft Linear/Attio Style */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 sm:p-5 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-zinc-100 text-zinc-700 border border-zinc-200">
              NIRT RENEWABLE ENERGY
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-200">
              3 Client Pipelines
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-zinc-900 tracking-tight mt-1">
            Operations Pipeline Board
          </h1>
          <p className="text-xs text-zinc-500 mt-0.5 font-medium">
            3 Structured Client Operational Flows: <strong>1. Sales Pipeline</strong> (7 Open · 3 Closed), <strong>2. Project Execution Pipeline</strong> (12 Open · 2 Closed), and <strong>3. Subsidy Flow Pipeline</strong> (3 Open · 1 Closed).
          </p>
        </div>

        {/* Live Counters */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-right">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block font-mono">
              Open Stages
            </span>
            <span className="text-sm font-black font-mono text-zinc-900">{openStageCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-right">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block font-mono">
              Closed Stages
            </span>
            <span className="text-sm font-black font-mono text-emerald-700">{closedStageCount}</span>
          </div>
          <div className="px-3 py-1.5 rounded-xl bg-zinc-50 border border-zinc-200 text-right">
            <span className="text-[9px] font-bold uppercase tracking-wider text-zinc-400 block font-mono">
              Active Value
            </span>
            <span className="text-sm font-black font-mono text-blue-700">{formatINR(pipelineValue)}</span>
          </div>
        </div>
      </div>

      {/* 3 Pipeline Switcher Cards (Linear/Apple Segmented Style) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {PIPELINE_LIST.map((item) => {
          const isSelected = selectedPipelineKey === item.id;
          const openCount = projects.filter((project) => {
            const canon = STAGE_ALIASES[project.stage] || project.stage;
            return item.stages.some((stage) => stage.id === canon);
          }).length;
          const closedCount = projects.filter((project) => {
            const canon = STAGE_ALIASES[project.stage] || project.stage;
            return item.closedStages.some((stage) => stage.id === canon);
          }).length;

          return (
            <button
              key={item.id}
              type="button"
              aria-pressed={isSelected}
              onClick={() => goToPipeline(item.id)}
              className={`text-left rounded-2xl p-4 transition-all relative overflow-hidden group ${
                isSelected
                  ? "bg-blue-50/70 text-slate-900 border-2 border-blue-600 shadow-sm ring-1 ring-blue-600/10"
                  : "bg-white text-slate-700 border border-slate-200 hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between gap-1.5">
                <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded-md border ${
                  isSelected ? "bg-blue-100 text-blue-700 border-blue-200" : "bg-slate-100 text-slate-600 border-slate-200"
                }`}>
                  Pipeline {item.code}
                </span>
                <span className={`text-[10px] font-mono font-semibold ${isSelected ? "text-blue-700" : "text-slate-400"}`}>
                  {item.openStagesLabel}
                </span>
              </div>

              <h2 className="text-sm font-bold tracking-tight text-slate-900 mt-1.5">
                {item.titleLong}
              </h2>

              <p className={`text-[11px] mt-0.5 leading-snug line-clamp-1 ${isSelected ? "text-slate-600" : "text-slate-500"}`}>
                {item.description}
              </p>

              <div className={`flex items-center justify-between pt-2.5 mt-2.5 border-t text-xs font-mono tabular-nums ${
                isSelected ? "border-blue-200/60" : "border-slate-100"
              }`}>
                <span className="font-bold text-slate-900">
                  {openCount} Open Projects
                </span>
                <span className={isSelected ? "text-blue-700 font-bold" : "text-slate-500 font-semibold"}>
                  {closedCount} Closed
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Control Toolbar: View Modes, Circle Filter, Search */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-2 rounded-2xl bg-white border border-zinc-200/90 shadow-2xs">
        {/* 3 View Tabs */}
        <div className="flex items-center space-x-1 p-1 bg-zinc-100 rounded-xl">
          <button
            type="button"
            onClick={() => setViewMode("active")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "active" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-blue-600" />
            <span>Open Stages ({pipeline.stages.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("closed")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "closed" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
            <span>Closed Stages ({pipeline.closedStages.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setViewMode("archive")}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
              viewMode === "archive" ? "bg-white text-zinc-900 shadow-xs" : "text-zinc-600 hover:text-zinc-900"
            }`}
          >
            <Archive className="w-3.5 h-3.5 text-zinc-500" />
            <span>Loss Archive ({droppedProjects.length})</span>
          </button>
        </div>

        {/* Search & District Filter */}
        <div className="flex items-center gap-2">
          <div className="relative flex-1 sm:w-56">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search client, ID, district..."
              className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 placeholder:text-zinc-400 font-medium"
            />
          </div>

          <select
            value={selectedDistrict}
            onChange={(e) => setSelectedDistrict(e.target.value)}
            className="text-xs px-3 py-1.5 rounded-xl border border-zinc-200 bg-zinc-50 font-semibold text-zinc-700 focus:outline-none focus:ring-1 focus:ring-zinc-900"
          >
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>{district === "All" ? "All circles" : district}</option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW 1: OPEN STAGES KANBAN BOARD */}
      {viewMode === "active" && (
        <div className="space-y-3">
          {/* Role Filter Banner (Clean & Subtle) */}
          {!isMasterAdmin && (
            <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs">
              <span className="text-zinc-600 font-medium text-[11px]">
                Active Role: <strong className="text-zinc-900">{activeRole.title}</strong> · {isFilteringByRole ? `Showing ${displayedStages.length} assigned stages` : `Full pipeline (${pipeline.stages.length} stages)`}
              </span>
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setStageFilterMode("role")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    stageFilterMode === "role"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900"
                  }`}
                >
                  My Stages ({roleOwnedStages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStageFilterMode("all")}
                  className={`px-2.5 py-1 rounded-lg text-[10px] font-bold transition-all ${
                    stageFilterMode === "all"
                      ? "bg-zinc-900 text-white shadow-xs"
                      : "bg-white text-zinc-600 border border-zinc-200 hover:text-zinc-900"
                  }`}
                >
                  Full Pipeline ({pipeline.stages.length})
                </button>
              </div>
            </div>
          )}

          {/* Kanban Columns (Horizontal Scroll with Custom Scrollbar) */}
          {displayedStages.length === 0 ? (
            <div className="p-8 text-center bg-white rounded-2xl border border-zinc-200 space-y-3">
              <ShieldAlert className="w-8 h-8 text-zinc-400 mx-auto" />
              <h3 className="text-sm font-bold text-zinc-900">
                No stages assigned to {activeRole.title} in {pipeline.titleLong}
              </h3>
              <p className="text-xs text-zinc-500 max-w-md mx-auto">
                Your role does not own steps in this pipeline. Switch to Full Pipeline view to inspect cross-functional progress.
              </p>
              <button
                type="button"
                onClick={() => setStageFilterMode("all")}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-zinc-900 text-white shadow-xs"
              >
                View Full Pipeline Board
              </button>
            </div>
          ) : (
            <div className="flex items-start space-x-3 overflow-x-auto pb-6 pt-1 [-webkit-overflow-scrolling:touch]">
              {displayedStages.map((stage) => renderStageLane(stage))}
            </div>
          )}
        </div>
      )}

      {/* VIEW 2: CLOSED STAGES (Won, Lost, Hold) */}
      {viewMode === "closed" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-sm font-bold text-zinc-900">
                  {pipeline.titleLong} · Closed Stages
                </h3>
                <p className="text-xs text-zinc-500 mt-0.5">
                  Milestone outcomes and terminal project states ({pipeline.closedStages.length} closed classifications).
                </p>
              </div>
              <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-xl bg-zinc-100 text-zinc-700">
                {pipeline.closedStages.length} Closed Categories
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {pipeline.closedStages.map((stage) => renderClosedLane(stage))}
          </div>
        </div>
      )}

      {/* VIEW 3: LOSS ARCHIVE */}
      {viewMode === "archive" && (
        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-white border border-zinc-200 shadow-2xs">
            <h3 className="text-sm font-bold text-zinc-900">
              Pipeline Loss & Cancellation Archive
            </h3>
            <p className="text-xs text-zinc-500 mt-0.5">
              Historical ledger of dropped leads, non-feasible structures, and canceled orders with root cause analysis.
            </p>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white shadow-2xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-bold uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="p-3">Project ID</th>
                  <th className="p-3">Client</th>
                  <th className="p-3">Capacity</th>
                  <th className="p-3">Dropped At</th>
                  <th className="p-3">Root Cause</th>
                  <th className="p-3">Remarks</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y border-zinc-100">
                {droppedProjects.map((item) => (
                  <tr key={item.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="p-3 font-mono font-bold text-zinc-900">{item.id}</td>
                    <td className="p-3 font-semibold text-zinc-900">{item.client}</td>
                    <td className="p-3 font-mono text-zinc-600">{item.capacity}</td>
                    <td className="p-3 text-zinc-600">{item.droppedAtStage}</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-50 text-rose-700 border border-rose-200">
                        {item.dropReason}
                      </span>
                    </td>
                    <td className="p-3 max-w-xs text-zinc-600 truncate" title={item.dropRemarks}>
                      {item.dropRemarks}
                    </td>
                    <td className="p-3 text-zinc-400 font-mono">{item.droppedDate}</td>
                    <td className="p-3 text-right">
                      <button
                        type="button"
                        onClick={() => handleReopenClosed(item)}
                        className="px-2.5 py-1 rounded-lg text-xs font-bold text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors"
                      >
                        Re-open Lead
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Action Sheets & Modals */}
      {isActionSheetOpen && selectedStage && (
        <QuickActionSheet
          isOpen={isActionSheetOpen}
          onClose={() => setIsActionSheetOpen(false)}
          stage={selectedStage}
          project={actionTargetProject}
          onSuccess={handleActionComplete}
        />
      )}

      {isEditModalOpen && editTargetProject && (
        <EditWithReasonModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          project={editTargetProject}
          pipelineStages={pipeline.stages}
          onSave={({ nextStage, reason }) => {
            updateProjectStage(editTargetProject.id, nextStage, { status: nextStage.title });
            addAuditEntry({
              staffName: activeRole.title.split("/")[0].trim(),
              projectId: editTargetProject.id,
              clientName: editTargetProject.client,
              step: `${pipeline.titleLong} · Stage Reassignment`,
              field: "Stage Jump / Reassignment",
              oldValue: editTargetProject.status || editTargetProject.stage,
              newValue: nextStage.title,
              reason: reason.trim()
            });
            showNotification(`${editTargetProject.client} reassigned to ${nextStage.title}.`);
            setIsEditModalOpen(false);
          }}
        />
      )}

      {/* Reason Dialog Portal */}
      {reasonDialog &&
        typeof document !== "undefined" &&
        createPortal(
          <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-zinc-200 p-5 space-y-4 animate-in fade-in zoom-in-95 duration-150">
              <div className="flex items-start justify-between gap-2">
                <h3 className="text-sm font-bold text-zinc-900">{reasonDialog.title}</h3>
                <button
                  type="button"
                  onClick={closeReasonDialog}
                  className="p-1 rounded-lg text-zinc-400 hover:text-zinc-700"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <form onSubmit={submitReasonDialog} className="space-y-3">
                <div>
                  <textarea
                    rows={3}
                    value={reasonText}
                    onChange={(e) => {
                      setReasonText(e.target.value);
                      if (reasonError) setReasonError("");
                    }}
                    placeholder={reasonDialog.placeholder}
                    className="w-full p-2.5 rounded-xl border border-zinc-200 text-xs text-zinc-900 focus:outline-none focus:ring-1 focus:ring-zinc-900 placeholder:text-zinc-400"
                  />
                  {reasonError && <p className="text-[11px] text-rose-600 mt-1">{reasonError}</p>}
                </div>

                <div className="flex items-center justify-end gap-2 pt-2 border-t border-zinc-100">
                  <button
                    type="button"
                    onClick={closeReasonDialog}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold text-zinc-600 hover:bg-zinc-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3.5 py-1.5 rounded-xl text-xs font-semibold bg-zinc-900 text-white hover:bg-black shadow-xs"
                  >
                    Confirm Action
                  </button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
    </div>
  );
}
