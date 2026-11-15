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
  Building2,
  ArrowRight,
  Sparkles,
  Archive,
  AlertTriangle,
  Check,
  ChevronRight,
  ShieldAlert,
  PauseCircle,
  PlayCircle,
  ListChecks,
  Waypoints,
  X,
  FileCheck,
  TrendingUp,
  Banknote,
  Award
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
    soft: "bg-blue-50 text-blue-700 border-blue-200",
    border: "border-t-blue-500",
    bar: "bg-blue-500",
    text: "text-blue-700",
    badge: "1. Sales"
  },
  execution: {
    dot: "bg-indigo-500",
    soft: "bg-indigo-50 text-indigo-700 border-indigo-200",
    border: "border-t-indigo-500",
    bar: "bg-indigo-500",
    text: "text-indigo-700",
    badge: "2. Execution"
  },
  subsidy: {
    dot: "bg-emerald-500",
    soft: "bg-emerald-50 text-emerald-700 border-emerald-200",
    border: "border-t-emerald-500",
    bar: "bg-emerald-500",
    text: "text-emerald-700",
    badge: "3. Subsidy Flow"
  }
};

// Initial Projects mapped across all stages of the 3 client pipelines
const INITIAL_PROJECTS = [
  // 1. SALES PIPELINE (7 Open Stages)
  { id: "NIRT-2610-0042", client: "Sri Vignesh Textiles", capacity: "25 kW", value: "₹12.5L", valueNumeric: 1250000, district: "Salem", stage: "sales_new_enquiry", status: "New enquiry", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0014", client: "Velan Dairy", capacity: "6 kW", value: "₹3.1L", valueNumeric: 310000, district: "Salem", stage: "sales_contacted", status: "Contacted", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0041", client: "Dr. K. Arulmani", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Namakkal", stage: "sales_qualified", status: "Qualified", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0040", client: "Aravind Hospital", capacity: "40 kW", value: "₹18.8L", valueNumeric: 1880000, district: "Erode", stage: "sales_site_visit_scheduled", status: "Site Visit Scheduled", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0039", client: "Balu Poultry Farm", capacity: "15 kW", value: "₹7.2L", valueNumeric: 720000, district: "Namakkal", stage: "sales_site_visit_completed", status: "Site Visit Completed", advanceCleared: false, daysInStage: 3 },
  { id: "NIRT-2610-0038", client: "V. Thangavel", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Salem", stage: "sales_quotation_sent", status: "Quotation Sent", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0037", client: "R. Jayaprakash", capacity: "10 kW", value: "₹5.1L", valueNumeric: 510000, district: "Coimbatore", stage: "sales_negotiation", status: "Negotiation", advanceCleared: false, daysInStage: 4 },
  
  // 1. SALES PIPELINE (Closed Stages)
  { id: "NIRT-2610-0019", client: "M. Chinnasamy", capacity: "3.3 kW", value: "₹1.85L", valueNumeric: 185000, district: "Salem", stage: "sales_deal_confirmed", status: "Deal Confirmed", advanceCleared: false, daysInStage: 1 },
  { id: "NIRT-2610-0018", client: "A. Perumal", capacity: "5 kW", value: "₹2.55L", valueNumeric: 255000, district: "Erode", stage: "sales_not_feasible", status: "Not Feasible", advanceCleared: false, daysInStage: 0 },
  { id: "NIRT-2610-0027", client: "Dr. P. Manoharan", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Salem", stage: "sales_lost", status: "Lost", advanceCleared: false, daysInStage: 0 },

  // 2. PROJECT EXECUTION PIPELINE (12 Open Stages)
  { id: "NIRT-2610-0036", client: "Apex Spinning Mills", capacity: "50 kW", value: "₹24.0L", valueNumeric: 2400000, district: "Salem", stage: "exec_advance_pending", status: "Advance Payment Pending", advanceCleared: false, daysInStage: 2 },
  { id: "NIRT-2610-0043", client: "Sri Murugan Tex Processors", capacity: "25 kW", value: "₹12.8L", valueNumeric: 1280000, district: "Erode", stage: "exec_advance_received", status: "Advance Received", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0026", client: "Sri Lakshmi Modern Rice Mill", capacity: "18 kW", value: "₹8.8L", valueNumeric: 880000, district: "Salem", stage: "exec_loan_processing", status: "Loan Processing", advanceCleared: true, daysInStage: 5 },
  { id: "NIRT-2610-0035", client: "Salem Cold Storage", capacity: "30 kW", value: "₹14.5L", valueNumeric: 1450000, district: "Salem", stage: "exec_registration", status: "Registration", advanceCleared: true, daysInStage: 6 },
  { id: "NIRT-2610-0025", client: "P. R. Educational Trust", capacity: "12 kW", value: "₹5.9L", valueNumeric: 590000, district: "Erode", stage: "exec_material_planning", status: "Material Planning", advanceCleared: true, daysInStage: 4 },
  { id: "NIRT-2610-0024", client: "Kongu Auto Components", capacity: "35 kW", value: "₹16.8L", valueNumeric: 1680000, district: "Coimbatore", stage: "exec_material_dispatched", status: "Material Dispatched", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0034", client: "K. Selvam Residencies", capacity: "4 kW", value: "₹2.1L", valueNumeric: 210000, district: "Dharmapuri", stage: "exec_installation_in_progress", status: "Installation In Progress", advanceCleared: true, daysInStage: 3 },
  { id: "NIRT-2610-0044", client: "Annai Meenakshi Mills", capacity: "20 kW", value: "₹9.5L", valueNumeric: 950000, district: "Salem", stage: "exec_installation_completed", status: "Installation Completed", advanceCleared: true, daysInStage: 2 },
  { id: "NIRT-2610-0045", client: "Vasantham Supermarket", capacity: "10 kW", value: "₹4.9L", valueNumeric: 490000, district: "Namakkal", stage: "exec_eb_application_submitted", status: "EB Application Submitted", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0023", client: "Sakthi Bricks", capacity: "20 kW", value: "₹9.8L", valueNumeric: 980000, district: "Namakkal", stage: "exec_eb_inspection_pending", status: "EB Inspection Pending", advanceCleared: true, daysInStage: 4 },
  { id: "NIRT-2610-0033", client: "Murugan Agro Farm", capacity: "7.5 kW", value: "₹3.8L", valueNumeric: 380000, district: "Erode", stage: "exec_system_activated", status: "System Activated", advanceCleared: true, daysInStage: 1 },
  { id: "NIRT-2610-0022", client: "S. Kavitha", capacity: "5 kW", value: "₹2.5L", valueNumeric: 250000, district: "Salem", stage: "exec_final_payment_pending", status: "Final Payment Pending", advanceCleared: true, daysInStage: 3 },

  // 2. PROJECT EXECUTION PIPELINE (Closed Stages)
  { id: "NIRT-2610-0020", client: "Rasi Seeds Depot", capacity: "30 kW", value: "₹14.5L", valueNumeric: 1450000, district: "Salem", stage: "exec_project_completed", status: "Project Completed", advanceCleared: true, daysInStage: 0 },
  { id: "NIRT-2610-0021", client: "VKS Poultry", capacity: "8 kW", value: "₹3.9L", valueNumeric: 390000, district: "Dharmapuri", stage: "exec_on_hold", status: "On Hold", advanceCleared: true, daysInStage: 9, heldFromStage: "exec_material_planning" },

  // 3. SUBSIDY FLOW PIPELINE (3 Open Stages)
  { id: "NIRT-2610-0016", client: "Sree Amman Textiles", capacity: "20 kW", value: "₹9.9L", valueNumeric: 990000, district: "Erode", stage: "subsidy_applied", status: "Subsidy Applied", advanceCleared: true, daysInStage: 6 },
  { id: "NIRT-2610-0032", client: "R. Meenakshi Sundaram", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Salem", stage: "subsidy_under_verification", status: "Under Verification", advanceCleared: true, daysInStage: 8 },
  { id: "NIRT-2610-0015", client: "K. Balasubramaniam", capacity: "5 kW", value: "₹2.6L", valueNumeric: 260000, district: "Coimbatore", stage: "subsidy_approved", status: "Subsidy Approved", advanceCleared: true, daysInStage: 4 },

  // 3. SUBSIDY FLOW PIPELINE (Closed Stages)
  { id: "NIRT-2610-0031", client: "Senthil Kumar", capacity: "3 kW", value: "₹1.65L", valueNumeric: 165000, district: "Salem", stage: "subsidy_received", status: "Subsidy Received", advanceCleared: true, daysInStage: 0 }
];

const INITIAL_DROPPED_PROJECTS = [
  {
    id: "NIRT-2610-0030",
    client: "S. Muthusamy Poultry",
    capacity: "10 kW",
    district: "Namakkal",
    stage: "sales_not_feasible",
    status: "Not Feasible",
    droppedAtStage: "1. Sales Pipeline · Site Visit Completed",
    dropReason: "Technical issue",
    dropRemarks: "Old asbestos sheet shed structure cannot support calculated wind uplift load. Client unwilling to reconstruct purlins.",
    value: "₹4.8L",
    valueNumeric: 480000,
    droppedDate: "03 Nov 2026",
    droppedBy: "Technical Sales Engineer"
  },
  {
    id: "NIRT-2610-0029",
    client: "K. R. Kandasamy",
    capacity: "3 kW",
    district: "Salem",
    stage: "sales_lost",
    status: "Lost",
    droppedAtStage: "1. Sales Pipeline · Qualified",
    dropReason: "Price issue",
    dropRemarks: "Bi-monthly EB consumption under 100 units. Customer considers upfront capital investment unviable.",
    value: "₹1.65L",
    valueNumeric: 165000,
    droppedDate: "01 Nov 2026",
    droppedBy: "Technical Sales Engineer"
  },
  {
    id: "NIRT-2610-0028",
    client: "Siva Spinning Mills",
    capacity: "25 kW",
    district: "Erode",
    stage: "sales_lost",
    status: "Lost",
    droppedAtStage: "1. Sales Pipeline · Negotiation",
    dropReason: "Competitor selected",
    dropRemarks: "Client selected local non-empanelled vendor offering substandard off-grid inverter solution.",
    value: "₹12.0L",
    valueNumeric: 1200000,
    droppedDate: "28 Oct 2026",
    droppedBy: "Technical Sales Engineer"
  }
];

const DISTRICTS = ["All", "Salem", "Namakkal", "Erode", "Dharmapuri", "Coimbatore"];

function stageWithMeta(stage, pipeline) {
  return {
    ...stage,
    pipelineId: pipeline.id,
    pipelineTitle: pipeline.titleLong,
    pipelineCode: pipeline.code,
    stageTotal: stage.closed ? pipeline.stages.length + pipeline.closedStages.length : pipeline.stages.length,
    nextStageTitle: stage.nextStage
      ? `${getPipelineForStage(stage.nextStage)?.title || ""} · ${getStageById(stage.nextStage)?.title || "Next stage"}`
      : null,
    checklistTitles: Object.fromEntries(
      (stage.checklist || []).map((number) => [number, CHECKLIST_BY_NUMBER[number]?.title || `Step ${number}`])
    )
  };
}

function formatINR(value) {
  if (!value) return "₹0";
  if (value >= 10000000) return `₹${(value / 10000000).toFixed(2)}Cr`;
  if (value >= 100000) return `₹${(value / 100000).toFixed(1)}L`;
  return `₹${value.toLocaleString("en-IN")}`;
}

function getNextProjectId(projects) {
  const numbers = projects
    .map((project) => Number(String(project.id).split("-").pop()))
    .filter((number) => Number.isFinite(number));
  const next = Math.max(60, ...numbers) + 1;
  return `NIRT-2610-${String(next).padStart(4, "0")}`;
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
    if (!targetStage) return undefined;
    const timer = window.setTimeout(() => {
      document.getElementById(`stage-lane-${targetStage.id}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center"
      });
    }, 150);
    return () => window.clearTimeout(timer);
  }, [stepParam, selectedPipelineKey, pipeline.stages]);

  // Counts based on canonical stages
  const openStageCount = projects.filter((project) => {
    const canon = STAGE_ALIASES[project.stage] || project.stage;
    return pipeline.stages.some((stage) => stage.id === canon);
  }).length;

  const closedStageCount = projects.filter((project) => {
    const canon = STAGE_ALIASES[project.stage] || project.stage;
    return pipeline.closedStages.some((stage) => stage.id === canon);
  }).length;

  const pipelineValue = projects
    .filter((project) => {
      const canon = STAGE_ALIASES[project.stage] || project.stage;
      return pipeline.stages.some((stage) => stage.id === canon);
    })
    .reduce((sum, project) => sum + (project.valueNumeric || 0), 0);

  const filteredProjects = projects.filter((project) => {
    const query = searchQuery.trim().toLowerCase();
    const matchesSearch = !query
      || project.client.toLowerCase().includes(query)
      || project.id.toLowerCase().includes(query)
      || project.district.toLowerCase().includes(query);
    const matchesDistrict = selectedDistrict === "All" || project.district === selectedDistrict;
    return matchesSearch && matchesDistrict;
  });

  const filteredDropped = droppedProjects.filter((project) => {
    const query = searchQuery.trim().toLowerCase();
    return !query
      || project.client.toLowerCase().includes(query)
      || project.id.toLowerCase().includes(query);
  });

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

  const updateProjectStage = (projectId, nextStage, extra = {}) => {
    setProjects((prev) => prev.map((project) => {
      if (project.id !== projectId) return project;
      return {
        ...project,
        ...extra,
        stage: nextStage.id,
        stageName: nextStage.title,
        status: extra.status || nextStage.title,
        daysInStage: 0
      };
    }));
  };

  const handleStageComplete = ({ project, stage, formData, isCatDSelected }) => {
    if (!stage) return;

    if (isCatDSelected) {
      const outcome = formData.qualificationStatus === "Not Feasible (technical)" ||
        formData.qualificationStatus === "Not Qualified" ||
        formData.viability?.includes("Cat D")
        ? "sales_not_feasible"
        : "sales_lost";
      const dropped = {
        id: project?.id || getNextProjectId(projects),
        client: project?.client || formData.customerName || "Prospective client",
        capacity: project?.capacity || "5 kW",
        district: project?.district || formData.circle || "Salem",
        stage: outcome,
        status: formData.qualificationStatus || "Lost",
        droppedAtStage: `${pipeline.titleLong} · ${stage.title}`,
        dropReason: formData.dropReason || "Not qualified",
        dropRemarks: formData.dropRemarks || "Lead closed during qualification.",
        value: project?.value || "₹1.65L",
        valueNumeric: project?.valueNumeric || 165000,
        droppedDate: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
        droppedBy: activeRole.title.split("/")[0].trim()
      };
      if (project) {
        setProjects((prev) => prev.filter((item) => item.id !== project.id));
      }
      setDroppedProjects((prev) => [dropped, ...prev]);
      showNotification(`Lead ${dropped.client} recorded as ${dropped.status}. Reason: ${dropped.dropReason}.`);
      return;
    }

    if (!project) {
      const proposedCapacity = Number(formData.proposedCapacity || formData.proposedKw || 5);
      const valueNumeric = Math.round(proposedCapacity * 55000);
      const newProject = {
        id: getNextProjectId(projects),
        client: formData.customerName || "New solar customer",
        capacity: `${proposedCapacity} kW`,
        district: formData.circle || formData.districtCircle || "Salem",
        stage: "sales_new_enquiry",
        stageName: "New enquiry",
        status: "New enquiry",
        advanceCleared: false,
        daysInStage: 0,
        value: formatINR(valueNumeric),
        valueNumeric
      };
      setProjects((prev) => [newProject, ...prev]);
      showNotification(`New enquiry ${newProject.id} created for ${newProject.client}.`);
      return;
    }

    if (stage.id === "exec_on_hold") {
      const resumeStage = getStageById(project.heldFromStage) || getStageById("exec_material_planning");
      updateProjectStage(project.id, resumeStage, { heldFromStage: null, status: resumeStage.title });
      showNotification(`${project.client} resumed at ${resumeStage.title}.`);
      return;
    }

    const nextStage = stage.nextStage ? getStageById(stage.nextStage) : null;
    if (!nextStage) {
      showNotification(`${project.client}: ${stage.title} is complete.`);
      return;
    }

    const capValue = formData.proposedCapacity || formData.proposedKw || formData.kwSizing || formData.sanctionedKw;
    const quoted = Number(formData.totalQuotedValue || formData.bomPricing || 0);
    const advanceCleared = stage.id === "exec_advance_pending" || stage.id === "exec_advance_received"
      ? true
      : project.advanceCleared;

    updateProjectStage(project.id, nextStage, {
      advanceCleared,
      heldFromStage: null,
      capacity: capValue ? `${capValue} kW` : project.capacity,
      valueNumeric: quoted > 0 ? quoted : project.valueNumeric,
      value: quoted > 0 ? formatINR(quoted) : project.value
    });

    const nextPipeline = getPipelineForStage(nextStage.id);
    if (nextPipeline.id !== selectedPipelineKey) {
      goToPipeline(nextPipeline.id);
    }

    showNotification(
      `${project.id} (${project.client}) advanced to ${nextStage.title}.`
    );
  };

  const handleMoveProject = (project, stageId) => {
    const nextStage = getStageById(stageId);
    if (!nextStage) return;
    updateProjectStage(project.id, nextStage, {
      advanceCleared: nextStage.id === "exec_advance_pending" ? false : project.advanceCleared,
      status: nextStage.title
    });
    const nextPipeline = getPipelineForStage(nextStage.id);
    if (nextPipeline.id !== selectedPipelineKey) goToPipeline(nextPipeline.id);
    showNotification(`${project.id} moved to ${nextStage.title}.`);
  };

  const openReasonDialog = (mode, project) => {
    setReasonDialog({ mode, project });
    setReasonText("");
    setReasonError("");
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
      showNotification(`${project.client} restored to 1. Sales Pipeline · Qualified.`);
      closeReasonDialog();
    }
  };

  const handleReopenClosed = (project) => openReasonDialog("restore", project);

  const handleResumeProject = (project) => {
    const resumeStage = getStageById(project.heldFromStage) || getStageById("exec_material_planning");
    updateProjectStage(project.id, resumeStage, { heldFromStage: null, status: resumeStage.title });
    showNotification(`${project.client} resumed at ${resumeStage.title}.`);
  };

  // Open Stage Swimlane Column Renderer
  const renderStageLane = (stage) => {
    const stageMeta = stageWithMeta(stage, pipeline);
    const matchedProjects = filteredProjects.filter((project) => {
      const canon = STAGE_ALIASES[project.stage] || project.stage;
      return canon === stage.id;
    });
    const authorized = isStageAuthorized(stage);
    const isTargetStep = Boolean(stepParam) && stage.checklist.includes(parseInt(stepParam.replace(/^[^0-9]+/, ""), 10));

    return (
      <section
        key={stage.id}
        id={`stage-lane-${stage.id}`}
        className={`w-[290px] sm:w-[310px] shrink-0 glass-surface rounded-3xl border border-slate-200/90 border-t-4 ${theme.border} p-3.5 sm:p-4 flex flex-col transition-all duration-300 shadow-2xs ${
          isTargetStep ? "ring-4 ring-blue-500/20 border-blue-500" : ""
        }`}
      >
        {/* Column Header */}
        <div className="pb-3 border-b border-slate-100 space-y-2">
          <div className="flex items-center justify-between gap-1.5">
            <span className="text-[10px] font-mono font-black px-2 py-0.5 rounded-md bg-slate-900 text-white">
              Stage {String(stage.number).padStart(2, "0")} / {String(pipeline.stages.length).padStart(2, "0")}
            </span>
            <span className="text-[10px] text-slate-500 font-medium flex items-center gap-1 font-mono">
              <Clock className="w-3 h-3 text-slate-400" />
              SLA {stage.slaDays}d
            </span>
          </div>

          <div className="flex items-start justify-between gap-2">
            <h3 className="text-sm font-black text-slate-900 tracking-tight leading-snug">
              {stage.title}
            </h3>
            <span className="text-xs font-mono font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700 shrink-0">
              {matchedProjects.length}
            </span>
          </div>
          <p className="text-[11px] text-slate-500 leading-relaxed">{stage.description}</p>

          <div className="flex items-center gap-1.5 flex-wrap pt-0.5">
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md border ${theme.soft}`}>
              {stage.responsibleRole}
            </span>
            {(stage.checklist || []).map((number) => (
              <span
                key={number}
                title={CHECKLIST_BY_NUMBER[number]?.title}
                className="text-[9px] font-mono font-bold px-1.5 py-0.5 rounded bg-slate-50 text-slate-600 border border-slate-200"
              >
                Step {String(number).padStart(2, "0")}
              </span>
            ))}
            {stage.isHardGate && (
              <span className="text-[9px] font-bold px-1.5 py-0.5 rounded bg-rose-50 text-rose-700 border border-rose-200">
                Hard Gate
              </span>
            )}
          </div>
        </div>

        {/* Gate Rule Box */}
        <div className="my-2.5 p-2 rounded-xl bg-slate-50/80 border border-slate-200/80 text-[11px]">
          <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
            Gate Rule:
          </span>
          <p className="text-slate-700 mt-0.5 leading-snug font-medium">{stage.gateRule}</p>
        </div>

        {/* Cards Container */}
        <div className="space-y-2.5 min-h-[140px] flex-1">
          {matchedProjects.map((project) => {
            const hardLocked = Boolean(stage.requiresAdvance) && !project.advanceCleared;
            const canAdvance = authorized && !hardLocked;

            return (
              <article
                key={project.id}
                className={`p-3 rounded-2xl bg-white border shadow-2xs space-y-2.5 transition-all hover:shadow-xs ${
                  hardLocked ? "border-rose-200 bg-rose-50/20" : "border-slate-200/90"
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono text-blue-700 font-bold">{project.id}</span>
                    <h4 className="text-xs font-bold text-slate-900 leading-tight truncate mt-0.5" title={project.client}>
                      {project.client}
                    </h4>
                  </div>
                  <span className="text-[11px] font-mono font-extrabold text-slate-900 shrink-0 bg-slate-50 px-1.5 py-0.5 rounded border border-slate-200">
                    {project.capacity}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-600 font-mono">
                  <span className="flex items-center gap-1 min-w-0">
                    <Building2 className="w-3 h-3 text-slate-400 shrink-0" />
                    <span className="truncate">{project.district}</span>
                  </span>
                  <span className="font-bold text-slate-900">{project.value}</span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono pt-1 border-t border-slate-100">
                  <span className="text-slate-600 font-medium truncate max-w-[140px]">{project.status}</span>
                  <span>{project.daysInStage || 0}d in stage</span>
                </div>

                {hardLocked && (
                  <div className="p-1.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-[10px] flex items-center gap-1 font-semibold">
                    <Lock className="w-3 h-3 shrink-0" />
                    <span>Locked until 80% Advance cleared</span>
                  </div>
                )}

                {/* Card Actions */}
                <div className="pt-1 flex items-center justify-between gap-1.5">
                  <button
                    type="button"
                    onClick={() => {
                      setEditTargetProject(project);
                      setIsEditModalOpen(true);
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                    title="Audit Stage Reassignment"
                  >
                    <Waypoints className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-1.5 ml-auto">
                    {pipeline.id === "execution" && stage.id !== "exec_on_hold" && (
                      <button
                        type="button"
                        onClick={() => openReasonDialog("hold", project)}
                        className="px-2 py-1 rounded-lg text-[10px] font-bold text-slate-500 hover:text-rose-700 hover:bg-rose-50 transition-colors"
                        title="Place project on hold"
                      >
                        Hold
                      </button>
                    )}
                    <button
                      type="button"
                      disabled={!canAdvance}
                      onClick={() => launchStage(stage, project)}
                      className={`px-3 py-1.5 rounded-xl text-[11px] font-bold flex items-center gap-1 transition-all ${
                        canAdvance
                          ? "bg-slate-900 text-white hover:bg-black shadow-xs active:scale-95"
                          : "bg-slate-100 text-slate-400 cursor-not-allowed"
                      }`}
                    >
                      <span>{stage.actionLabel || "Advance"}</span>
                      <ChevronRight className="w-3 h-3" />
                    </button>
                  </div>
                </div>
              </article>
            );
          })}

          {matchedProjects.length === 0 && (
            <div className="h-28 rounded-2xl border border-dashed border-slate-200 flex flex-col items-center justify-center text-center p-3 text-slate-400">
              <Clock className="w-5 h-5 mb-1 stroke-[1.5] text-slate-300" />
              <span className="text-[11px] font-medium">No projects in this stage</span>
            </div>
          )}
        </div>

        {/* Column Footer */}
        <div className="pt-2.5 border-t border-slate-100 mt-2">
          {stage.id === "sales_new_enquiry" ? (
            <button
              type="button"
              onClick={() => launchStage(stage, null)}
              className="apple-button w-full py-2 px-3 rounded-xl text-xs font-bold flex items-center justify-center gap-1.5 bg-slate-900 text-white hover:bg-black shadow-xs active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Enquiry</span>
            </button>
          ) : (
            <div className="flex items-center justify-center gap-1 text-[10px] text-slate-400 font-mono">
              <Waypoints className="w-3 h-3" />
              <span>Advance card from prior stage</span>
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
        className={`rounded-3xl border p-4 space-y-3 bg-white shadow-2xs ${
          isWon ? "border-emerald-200/80" : "border-slate-200/90"
        }`}
      >
        <div className="flex items-start justify-between gap-2 pb-2 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-1.5">
              <span className={`w-2.5 h-2.5 rounded-full ${dotStyle}`} />
              <h3 className="text-xs font-black text-slate-900 uppercase tracking-tight">
                {stage.title}
              </h3>
            </div>
            <p className="text-[11px] text-slate-500 mt-0.5 leading-snug">{stage.description}</p>
          </div>
          <span className={`text-[11px] font-mono font-black px-2 py-0.5 rounded-full border ${badgeStyle}`}>
            {matchedProjects.length}
          </span>
        </div>

        <div className="space-y-2">
          {matchedProjects.map((project) => (
            <div key={project.id} className="p-3 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <span className="text-[10px] font-mono font-bold text-slate-500">{project.id}</span>
                  <div className="text-xs font-bold text-slate-900 truncate">{project.client}</div>
                </div>
                <span className="text-xs font-bold text-slate-900 font-mono">{project.value}</span>
              </div>
              
              <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono">
                <span>{project.capacity} · {project.district}</span>
                <span className={`font-bold px-1.5 py-0.2 rounded border ${badgeStyle}`}>
                  {stage.title}
                </span>
              </div>

              {/* Action Buttons for Closed Stages */}
              <div className="flex items-center justify-end gap-1.5 pt-1 border-t border-slate-200/60">
                {isLost && (
                  <button
                    type="button"
                    onClick={() => handleReopenClosed(project)}
                    className="apple-button px-2.5 py-1 rounded-lg text-[10px] font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-900 hover:text-white transition-all shadow-2xs"
                  >
                    Re-open Lead
                  </button>
                )}

                {isPaused && (
                  <button
                    type="button"
                    onClick={() => handleResumeProject(project)}
                    className="apple-button px-2.5 py-1 rounded-lg text-[10px] font-bold bg-slate-900 text-white hover:bg-black transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <PlayCircle className="w-3 h-3 text-emerald-400" />
                    <span>Resume Project</span>
                  </button>
                )}

                {isWon && stage.id === "sales_deal_confirmed" && (
                  <button
                    type="button"
                    onClick={() => {
                      updateProjectStage(project.id, getStageById("exec_advance_pending"));
                      goToPipeline("execution");
                      showNotification(`${project.client} transitioned to 2. Project Execution Pipeline.`);
                    }}
                    className="apple-button px-2.5 py-1 rounded-lg text-[10px] font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <span>To Execution Pipeline</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {isWon && stage.id === "exec_project_completed" && (
                  <button
                    type="button"
                    onClick={() => {
                      updateProjectStage(project.id, getStageById("subsidy_applied"));
                      goToPipeline("subsidy");
                      showNotification(`${project.client} transitioned to 3. Subsidy Flow Pipeline.`);
                    }}
                    className="apple-button px-2.5 py-1 rounded-lg text-[10px] font-bold bg-emerald-600 text-white hover:bg-emerald-700 transition-all flex items-center gap-1 shadow-2xs"
                  >
                    <span>To Subsidy Flow</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                )}

                {isWon && stage.id === "subsidy_received" && (
                  <span className="text-[10px] font-mono font-bold text-emerald-700 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span>DBT Settled ✓</span>
                  </span>
                )}
              </div>
            </div>
          ))}

          {matchedProjects.length === 0 && (
            <div className="py-6 text-center text-slate-400 text-[11px] font-medium border border-dashed border-slate-200 rounded-2xl">
              No projects in this stage
            </div>
          )}
        </div>
      </section>
    );
  };

  return (
    <div className="space-y-5 pb-20 max-w-[1700px] mx-auto">
      {/* Role Switcher Pill */}
      <RoleSwitcherPill />

      {/* Floating Notification */}
      {statusNotification && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-slate-900 text-white text-xs font-semibold shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-2 border border-slate-800 max-w-md">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-400 shrink-0" />
            <span>{statusNotification}</span>
          </div>
          <button
            type="button"
            onClick={() => setStatusNotification(null)}
            className="text-slate-300 hover:text-white text-xs font-mono px-2 py-1 rounded-md hover:bg-slate-800 shrink-0"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Top Header - Strictly Redesigned per Client Spreadsheet */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 glass-surface p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] font-mono font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-900 text-white">
              NIRT RENEWABLE ENERGY PRIVATE LIMITED
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Client Multi-Pipeline Architecture
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-950 tracking-tight mt-1.5">
            Operations Pipeline Board
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl font-medium">
            Strictly structured into 3 client operational pipelines: <strong>1. Sales Pipeline</strong> (7 Open, 3 Closed), <strong>2. Project Execution Pipeline</strong> (12 Open, 2 Closed), and <strong>3. Subsidy Flow Pipeline</strong> (3 Open, 1 Closed).
          </p>
        </div>

        {/* Summary Stat Counters */}
        <div className="grid grid-cols-3 gap-2 sm:gap-3 shrink-0">
          <div className="px-3.5 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Open Stages
            </span>
            <span className="text-lg font-black font-mono text-slate-900">{openStageCount}</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Closed Stages
            </span>
            <span className="text-lg font-black font-mono text-emerald-700">{closedStageCount}</span>
          </div>
          <div className="px-3.5 py-2 rounded-2xl bg-white border border-slate-200 shadow-2xs">
            <span className="text-[9px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
              Active Value
            </span>
            <span className="text-lg font-black font-mono text-blue-700">{formatINR(pipelineValue)}</span>
          </div>
        </div>
      </div>

      {/* 3 Pipeline Switcher Cards (Client Spreadsheet Columns) */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {PIPELINE_LIST.map((item) => {
          const isSelected = selectedPipelineKey === item.id;
          const itemTheme = PIPELINE_THEME[item.id];
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
              className={`apple-button text-left rounded-3xl p-4 sm:p-5 border transition-all relative overflow-hidden ${
                isSelected
                  ? "bg-slate-900 text-white border-slate-900 shadow-lg shadow-slate-900/15 ring-2 ring-slate-900"
                  : "bg-white text-slate-700 border-slate-200 hover:border-slate-300 hover:shadow-xs"
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className={`text-xs font-mono font-black px-2 py-0.5 rounded-lg border ${
                  isSelected ? "bg-white/10 text-white border-white/20" : itemTheme.soft
                }`}>
                  Pipeline {item.code}
                </span>
                <span className={`text-[10px] font-mono font-bold ${isSelected ? "text-slate-300" : "text-slate-400"}`}>
                  {item.openStagesLabel}
                </span>
              </div>

              <h2 className={`text-base font-black tracking-tight mt-2 ${isSelected ? "text-white" : "text-slate-900"}`}>
                {item.titleLong}
              </h2>

              <p className={`text-[11px] mt-1 leading-snug line-clamp-2 ${isSelected ? "text-slate-300" : "text-slate-500"}`}>
                {item.description}
              </p>

              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100/20 text-xs font-mono">
                <span className={`font-bold ${isSelected ? "text-white" : "text-slate-900"}`}>
                  {openCount} Open Projects
                </span>
                <span className={isSelected ? "text-emerald-400 font-bold" : "text-slate-500 font-semibold"}>
                  {closedCount} Closed
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Action Bar & Search / Filter Controls */}
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-3 glass-surface p-3 sm:p-4 rounded-3xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center gap-2 flex-wrap">
          {/* View Mode Toggle */}
          <div className="inline-flex p-1 rounded-2xl bg-slate-100 border border-slate-200/80">
            <button
              type="button"
              onClick={() => setViewMode("active")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "active" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Open Stages ({pipeline.stages.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("closed")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "closed" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Closed Stages ({pipeline.closedStages.length})</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode("archive")}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                viewMode === "archive" ? "bg-white text-slate-900 shadow-xs" : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Archive className="w-3.5 h-3.5 text-slate-500" />
              <span>Loss Archive ({droppedProjects.length})</span>
            </button>
          </div>

          <span className={`text-[11px] font-bold px-2.5 py-1 rounded-xl border ${theme.soft}`}>
            {pipeline.titleLong}
          </span>
        </div>

        {/* Search & District Filter */}
        <div className="flex items-center gap-2 flex-wrap">
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="search"
              aria-label="Search projects"
              placeholder="Search client, ID or district…"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
              className="text-xs pl-8 pr-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 w-full sm:w-64 shadow-2xs"
            />
          </div>
          <select
            aria-label="Filter by district"
            value={selectedDistrict}
            onChange={(event) => setSelectedDistrict(event.target.value)}
            className="text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold focus:outline-none focus:ring-2 focus:ring-slate-900/10 shadow-2xs"
          >
            {DISTRICTS.map((district) => (
              <option key={district} value={district}>{district === "All" ? "All circles" : district}</option>
            ))}
          </select>
        </div>
      </div>

      {/* VIEW 1: OPEN STAGES KANBAN BOARD */}
      {viewMode === "active" && (
        <div className="space-y-4">
          {/* Stage Count & Role Filter Pill */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3 rounded-2xl bg-slate-50 border border-slate-200/90 text-xs">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider font-mono">
                Pipeline Stages
              </span>
              <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold font-mono border ${activeRole.badgeColor || "bg-blue-50 text-blue-700 border-blue-200"}`}>
                Role: {activeRole.title}
              </span>
              <span className="text-slate-600 font-medium">
                {isMasterAdmin
                  ? `Viewing all ${pipeline.stages.length} open stages`
                  : isFilteringByRole
                    ? `Showing ${displayedStages.length} stages assigned to your role`
                    : `Full pipeline · ${pipeline.stages.length} open stages`}
              </span>
            </div>

            {!isMasterAdmin && (
              <div className="flex items-center gap-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setStageFilterMode("role")}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                    stageFilterMode === "role"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  My Stages ({roleOwnedStages.length})
                </button>
                <button
                  type="button"
                  onClick={() => setStageFilterMode("all")}
                  className={`px-3 py-1 rounded-xl text-[11px] font-bold transition-all ${
                    stageFilterMode === "all"
                      ? "bg-slate-900 text-white shadow-xs"
                      : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200"
                  }`}
                >
                  Full Pipeline ({pipeline.stages.length})
                </button>
              </div>
            )}
          </div>

          {/* Kanban Columns */}
          {displayedStages.length === 0 ? (
            <div className="p-8 text-center glass-surface rounded-3xl border border-slate-200/80 space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto text-slate-500">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-sm font-bold text-slate-900">
                No stages assigned to {activeRole.title} in {pipeline.titleLong}
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto">
                Your role owns checklist steps in another pipeline. Switch to your designated pipeline or click "View Full Pipeline".
              </p>
              <div className="flex items-center justify-center gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setStageFilterMode("all")}
                  className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-slate-900 text-white shadow-xs"
                >
                  View full pipeline ({pipeline.stages.length} stages)
                </button>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <div className="flex gap-3.5 min-w-max items-stretch">
                {displayedStages.map(renderStageLane)}
              </div>
            </div>
          )}

          {/* Summary Row for Closed Stages */}
          <div className="glass-surface rounded-3xl border border-slate-200/80 p-4 sm:p-5 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h2 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Closed Stages in {pipeline.titleLong}</span>
                </h2>
                <p className="text-[11px] text-slate-500 mt-0.5">
                  Exit outcomes per client specification ({pipeline.closedStagesLabel}).
                </p>
              </div>
              <button
                type="button"
                onClick={() => setViewMode("closed")}
                className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 self-start sm:self-auto"
              >
                <span>View Full Closed Board</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 ${pipeline.closedStages.length >= 3 ? "xl:grid-cols-3" : ""}`}>
              {pipeline.closedStages.map(renderClosedLane)}
            </div>
          </div>
        </div>
      )}

      {/* VIEW 2: CLOSED STAGES VIEW */}
      {viewMode === "closed" && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md shadow-slate-900/10">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
                <h2 className="text-sm font-black uppercase tracking-tight">
                  {pipeline.titleLong} · {pipeline.closedStagesLabel}
                </h2>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                Formal project exit stages. Won deals advance to the next pipeline; dropped leads are archived with reasons.
              </p>
            </div>
            <div className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 font-bold">
              {closedStageCount} Closed Projects
            </div>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-2 gap-4 ${pipeline.closedStages.length >= 3 ? "xl:grid-cols-3" : ""}`}>
            {pipeline.closedStages.map(renderClosedLane)}
          </div>
        </div>
      )}

      {/* VIEW 3: LOSS & ARCHIVE VIEW */}
      {viewMode === "archive" && (
        <div className="space-y-4">
          <div className="p-4 sm:p-5 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-md shadow-slate-900/10">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-2xl bg-white/10 text-slate-200 flex items-center justify-center shrink-0 border border-white/10">
                <Archive className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-sm font-black uppercase tracking-tight">
                  Loss, Rejection & Not Feasible Archive
                </h2>
                <p className="text-xs text-slate-300 mt-0.5 max-w-2xl">
                  Every unviable lead or lost deal keeps a mandatory written reason. Re-opening is an audited governance action.
                </p>
              </div>
            </div>
            <div className="text-xs font-mono text-slate-300 bg-white/10 px-3 py-1.5 rounded-xl border border-white/10 shrink-0 font-bold">
              {droppedProjects.length} Archived Leads
            </div>
          </div>

          <div className="glass-surface rounded-3xl border border-slate-200/90 overflow-hidden shadow-xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-slate-400 uppercase tracking-wider text-[10px] font-bold font-mono">
                    <th className="py-3 px-4">Lead ID</th>
                    <th className="py-3 px-4">Client</th>
                    <th className="py-3 px-4">District / Capacity</th>
                    <th className="py-3 px-4">Outcome</th>
                    <th className="py-3 px-4">Reason</th>
                    <th className="py-3 px-4 min-w-[220px]">Audit Remarks</th>
                    <th className="py-3 px-4">Logged By</th>
                    <th className="py-3 px-4 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredDropped.map((lead) => (
                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-slate-900">{lead.id}</td>
                      <td className="py-3.5 px-4 font-bold text-slate-800">{lead.client}</td>
                      <td className="py-3.5 px-4 text-slate-600 font-mono">
                        <span className="font-semibold text-slate-900">{lead.capacity}</span> · {lead.district}
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded-md text-[10px] font-bold bg-rose-50 text-rose-800 border border-rose-200 font-mono">
                          {lead.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-4">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-100 text-slate-700 border border-slate-200">
                          {lead.dropReason}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 text-slate-600 leading-snug">{lead.dropRemarks}</td>
                      <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">{lead.droppedBy}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          type="button"
                          onClick={() => handleReopenClosed(lead)}
                          className="apple-button px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black transition-all shadow-2xs"
                        >
                          Re-open
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* QUICK ACTION SHEET MODAL */}
      <QuickActionSheet
        isOpen={isActionSheetOpen}
        onClose={() => {
          setIsActionSheetOpen(false);
          setSelectedStage(null);
          setActionTargetProject(null);
        }}
        stage={selectedStage}
        project={actionTargetProject}
        onStageComplete={handleStageComplete}
      />

      {/* REASON MODAL FOR STAGE MUTATION */}
      <EditWithReasonModal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditTargetProject(null);
        }}
        project={editTargetProject}
        currentPipeline={pipeline}
        onSaveStage={handleMoveProject}
      />

      {/* DIALOG FOR HOLD / REOPEN */}
      {reasonDialog && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">
              {reasonDialog.mode === "hold" ? "Place Project On Hold" : "Re-open Archived Lead"}
            </h3>
            <p className="text-xs text-slate-500">
              {reasonDialog.mode === "hold"
                ? `Enter reason for placing ${reasonDialog.project.client} on hold (e.g. client terrace renovation / delayed DISCOM CEIG approval):`
                : `Enter justification to re-open ${reasonDialog.project.client} for re-qualification:`}
            </p>
            <textarea
              rows={3}
              value={reasonText}
              onChange={(e) => setReasonText(e.target.value)}
              placeholder="Minimum 8 characters justification..."
              className="w-full text-xs p-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900/20"
            />
            {reasonError && <p className="text-xs text-rose-600 font-medium">{reasonError}</p>}
            <div className="flex justify-end gap-2 pt-2">
              <button
                type="button"
                onClick={closeReasonDialog}
                className="apple-button px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={submitReasonDialog}
                className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
              >
                Submit & Log
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
