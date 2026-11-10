import React, { useState } from "react";
import {
  Wrench,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Shield,
  Zap,
  Camera,
  FileText,
  Phone,
  HardHat,
  ChevronDown,
  ChevronUp,
  Award,
  Layers,
  MapPin,
  CheckSquare
} from "lucide-react";
import { INSTALLATION_WORK_PACKAGES } from "@/data/installationData";

export default function InstallationManagementView({
  installationData,
  onOpenUpdateModal,
  onOpenSignOffModal
}) {
  const [expandedPkg, setExpandedPkg] = useState(null);
  const [activeTabFilter, setActiveTabFilter] = useState("all");

  if (!installationData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <Wrench className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Installation Record Found</h3>
        <p className="text-xs text-slate-400 mt-1">
          Installation is initiated once store materials are issued.
        </p>
      </div>
    );
  }

  const team = installationData.installationTeam || {};
  const tests = installationData.testMeasurements || {};
  const photos = installationData.photographs || [];
  const snags = installationData.snags || [];
  const workStatuses = installationData.workPackageStatuses || {};

  const toggleExpand = (key) => {
    setExpandedPkg(expandedPkg === key ? null : key);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "Completed"
        };
      case "in_progress":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />,
          label: "In Progress"
        };
      case "pending_inspection":
        return {
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          icon: <Award className="w-3.5 h-3.5 text-indigo-600" />,
          label: "Ready for Inspection"
        };
      case "issues_reported":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "Issues / Snags"
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
          label: "Pending"
        };
    }
  };

  const overallBadge = getStatusBadge(installationData.status);

  // Filter packages if needed
  const filteredPackages = INSTALLATION_WORK_PACKAGES.filter((pkg) => {
    if (activeTabFilter === "all") return true;
    const st = workStatuses[pkg.key]?.status || "pending";
    return st === activeTabFilter;
  });

  return (
    <div className="space-y-6">
      {/* 1. Header Overview & Progress Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          {/* Left Title & Status */}
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {installationData.projectId}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${overallBadge.bg}`}>
                {overallBadge.icon}
                <span>{overallBadge.label.toUpperCase()}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                ☀️ {installationData.weatherConditions || "Clear Rooftop Weather"}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Solar EPC Installation & Site Commissioning
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{installationData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{installationData.systemCapacity}</strong></span>
              <span>•</span>
              <span className="truncate max-w-sm">📍 {installationData.siteAddress}</span>
            </p>
          </div>

          {/* Right Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpdateModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Wrench className="w-4 h-4" />
              <span>Update Progress</span>
            </button>
            <button
              onClick={onOpenSignOffModal}
              className="px-4 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Handover Certificate</span>
            </button>
          </div>
        </div>

        {/* Progress & Milestone Milestones Row */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          {/* Overall Progress Gauge */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 col-span-1 md:col-span-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-blue-600" />
                Physical Installation Progress
              </span>
              <span className="text-sm font-mono font-black text-blue-700">
                {installationData.overallProgress}%
              </span>
            </div>
            <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden">
              <div
                className="bg-blue-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${installationData.overallProgress}%` }}
              />
            </div>
            <div className="flex justify-between items-center text-[11px] text-slate-500 mt-2 font-mono">
              <span>Start: {installationData.startDate}</span>
              <span>Target: {installationData.targetCompletionDate}</span>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Work Packages</span>
            <div className="text-lg font-mono font-bold text-slate-900 mt-1">
              {Object.values(workStatuses).filter(s => s.status === "completed").length} / {INSTALLATION_WORK_PACKAGES.length} Done
            </div>
            <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
              ✓ All structural civil & MMS complete
            </span>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-500 block">Site Snags & Punch List</span>
            <div className="text-lg font-mono font-bold text-slate-900 mt-1">
              {snags.filter(s => s.status === "Open").length} Open / {snags.length} Logged
            </div>
            <span className="text-[11px] text-indigo-700 font-semibold block mt-1">
              {snags.filter(s => s.status === "Open").length === 0 ? "✓ 100% Cleared" : "⚠️ 1 Pending plate label"}
            </span>
          </div>
        </div>
      </div>

      {/* 2. Assigned Project Installation Team Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <HardHat className="w-4 h-4 text-blue-600" />
          Assigned EPC Field Team & Licensed Specialists
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Lead Engineer */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                ENG
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{team.leadEngineer?.name}</div>
                <div className="text-[10px] text-blue-700 font-semibold">{team.leadEngineer?.badge}</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">{team.leadEngineer?.role}</p>
            <div className="text-[11px] font-mono text-slate-700 flex items-center gap-1.5 pt-2 border-t border-slate-200">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{team.leadEngineer?.phone}</span>
            </div>
          </div>

          {/* Certified Wireman */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs">
                ELE
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{team.certifiedWireman?.name}</div>
                <div className="text-[10px] text-emerald-700 font-mono font-semibold">{team.certifiedWireman?.licenseNo}</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">{team.certifiedWireman?.role}</p>
            <div className="text-[11px] font-mono text-slate-700 flex items-center gap-1.5 pt-2 border-t border-slate-200">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{team.certifiedWireman?.phone}</span>
            </div>
          </div>

          {/* Mechanical Rigger */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center font-bold text-xs">
                MMS
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{team.mechanicalRigger?.name}</div>
                <div className="text-[10px] text-indigo-700 font-semibold">Rooftop Structural Specialist</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">{team.mechanicalRigger?.role}</p>
            <div className="text-[11px] font-mono text-slate-700 flex items-center gap-1.5 pt-2 border-t border-slate-200">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{team.mechanicalRigger?.phone}</span>
            </div>
          </div>

          {/* Safety & Quality Officer */}
          <div className="border border-slate-200 rounded-xl p-3.5 bg-slate-50/50">
            <div className="flex items-center gap-2.5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-violet-100 text-violet-700 flex items-center justify-center font-bold text-xs">
                HSE
              </div>
              <div>
                <div className="text-xs font-bold text-slate-900">{team.safetyOfficer?.name}</div>
                <div className="text-[10px] text-violet-700 font-semibold">{team.safetyOfficer?.certification}</div>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 mb-2">{team.safetyOfficer?.role}</p>
            <div className="text-[11px] font-mono text-slate-700 flex items-center gap-1.5 pt-2 border-t border-slate-200">
              <Phone className="w-3.5 h-3.5 text-slate-400" />
              <span>{team.safetyOfficer?.phone}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. The 10 Work Packages Breakdown */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Layers className="w-4 h-4 text-blue-600" />
              BFRD 10 Work Packages & Sub-Systems
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Detailed tracking of civil, structure, electrical, testing, and photo documentation
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5">
            {["all", "completed", "in_progress", "pending"].map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveTabFilter(filter)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-colors ${
                  activeTabFilter === filter
                    ? "bg-slate-800 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {filter.replace("_", " ")}
              </button>
            ))}
          </div>
        </div>

        {/* Work Packages Accordion List */}
        <div className="space-y-3">
          {filteredPackages.map((pkg, idx) => {
            const current = workStatuses[pkg.key] || {
              status: "pending",
              progress: 0,
              completedAt: null,
              verifiedBy: "Pending",
              remarks: "Awaiting preceding stage."
            };
            const badge = getStatusBadge(current.status);
            const isExpanded = expandedPkg === pkg.key;

            return (
              <div
                key={pkg.key}
                className="border border-slate-200 rounded-xl overflow-hidden hover:border-slate-300 transition-colors"
              >
                {/* Header Row */}
                <div
                  onClick={() => toggleExpand(pkg.key)}
                  className="p-4 bg-white flex items-center justify-between cursor-pointer hover:bg-slate-50/70 select-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-700 font-mono font-bold text-xs flex items-center justify-center">
                      {idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-slate-900">{pkg.name}</span>
                        <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                          {pkg.category} ({pkg.weightage}% wt)
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 mt-0.5 line-clamp-1">{pkg.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Progress Bar Mini */}
                    <div className="hidden sm:flex items-center gap-2 w-32">
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${current.progress}%` }}
                        />
                      </div>
                      <span className="text-[11px] font-mono font-bold text-slate-700 w-8 text-right">
                        {current.progress}%
                      </span>
                    </div>

                    {/* Status Pill */}
                    <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border flex items-center gap-1 ${badge.bg}`}>
                      {badge.icon}
                      <span>{badge.label}</span>
                    </span>

                    {/* Expand Arrow */}
                    <button className="text-slate-400 hover:text-slate-600">
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && (
                  <div className="p-4 bg-slate-50/80 border-t border-slate-100 space-y-3">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Checkpoints */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <CheckSquare className="w-3.5 h-3.5 text-emerald-600" />
                          Mandatory Engineering Checkpoints
                        </h4>
                        <div className="space-y-1.5">
                          {pkg.checkpoints.map((cp, cIdx) => (
                            <div key={cIdx} className="flex items-start gap-2 text-xs text-slate-600">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                              <span>{cp}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Log & Attribution */}
                      <div className="bg-white p-3.5 rounded-xl border border-slate-200 space-y-2">
                        <h4 className="text-[11px] font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                          <FileText className="w-3.5 h-3.5 text-blue-600" />
                          Field Inspection Log
                        </h4>
                        <div className="text-xs space-y-1">
                          <p>
                            <span className="text-slate-500">Verified By: </span>
                            <strong className="text-slate-800">{current.verifiedBy || "Er. K. Vasanth"}</strong>
                          </p>
                          <p>
                            <span className="text-slate-500">Completion Date: </span>
                            <span className="font-mono text-slate-800">{current.completedAt || "In Progress"}</span>
                          </p>
                          <p>
                            <span className="text-slate-500">Field Remarks: </span>
                            <span className="text-slate-700 italic">{current.remarks || "No remarks logged."}</span>
                          </p>
                        </div>
                        <div className="pt-2">
                          <button
                            onClick={onOpenUpdateModal}
                            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
                          >
                            <Wrench className="w-3 h-3" />
                            <span>Edit Package Status</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. Pre-Commissioning Electrical Testing & Earth Pit Measurements */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <Zap className="w-4 h-4 text-blue-600" />
          Pre-Commissioning Electrical Testing & Statutory Earth Resistance
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">String Voc Test</span>
            <div className="text-base font-mono font-bold text-slate-900 mt-1">{tests.measuredVoc}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ Within 1.5% DPR limit</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">String Isc Test</span>
            <div className="text-base font-mono font-bold text-slate-900 mt-1">{tests.measuredIsc}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ Tested under 820 W/m²</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Megger Insulation</span>
            <div className="text-base font-mono font-bold text-slate-900 mt-1">{tests.insulationResistance}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ Exceeds 50 MΩ mandate</span>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <span className="text-slate-500 text-[10px] uppercase font-bold block">Grid Sync Voltage</span>
            <div className="text-base font-mono font-bold text-slate-900 mt-1">{tests.gridVoltageAtInverter}</div>
            <span className="text-[10px] text-emerald-700 font-semibold mt-1 block">✓ {tests.phaseRotation}</span>
          </div>
        </div>

        {/* Chemical Earth Pits Cards */}
        <div className="pt-2">
          <div className="text-xs font-bold text-slate-700 mb-2">
            Chemical Earth Pit Verification (Mandatory Statutory Resistance &lt; 5.0 Ω):
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {(tests.earthResistancePits || []).map((pit, idx) => (
              <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-800">{pit.pitName}</div>
                  <div className="text-[10px] text-emerald-700 font-semibold">{pit.status}</div>
                </div>
                <div className="text-sm font-mono font-black text-slate-900 bg-white px-2.5 py-1 rounded-lg border border-slate-200 shadow-2xs">
                  {pit.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 5. Geo-Tagged Field Photographs Gallery */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Camera className="w-4 h-4 text-blue-600" />
              Geo-Tagged Site Installation Photographs ({photos.length} Captured)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Statutory verification photos required for Section 18 DISCOM & CEIG Inspection
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>GPS Verified</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {photos.map((photo) => (
            <div
              key={photo.id}
              className="group border border-slate-200 rounded-xl overflow-hidden bg-slate-50 hover:shadow-md transition-all flex flex-col"
            >
              <div className="relative aspect-video overflow-hidden bg-slate-800">
                <img
                  src={photo.previewUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-0.5 rounded">
                  {photo.category}
                </div>
                <div className="absolute bottom-2 left-2 right-2 bg-slate-900/80 backdrop-blur-xs text-white text-[9px] font-mono px-2 py-1 rounded truncate">
                  📍 {photo.geoCoordinates}
                </div>
              </div>
              <div className="p-3 flex-1 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold text-slate-900 line-clamp-1">{photo.title}</h4>
                  <p className="text-[10px] text-slate-500 mt-0.5 font-mono">{photo.timestamp}</p>
                </div>
                <div className="mt-2 pt-2 border-t border-slate-200 flex justify-between items-center text-[10px]">
                  <span className="text-emerald-700 font-semibold">✓ Timestamped</span>
                  <span className="font-mono text-slate-400">{photo.id}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Field Snags & Completion Remarks */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Snag List */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-blue-600" />
            Field Punch List & Snag Tracker
          </h2>
          <div className="space-y-2.5">
            {snags.map((snag) => (
              <div
                key={snag.id}
                className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-3 text-xs"
              >
                <div>
                  <div className="font-semibold text-slate-800">{snag.description}</div>
                  <div className="text-[10px] text-slate-500 mt-1">
                    Reported by: {snag.reportedBy} • Severity:{" "}
                    <strong className={snag.severity === "Medium" ? "text-indigo-700" : "text-slate-600"}>
                      {snag.severity}
                    </strong>
                  </div>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                    snag.status === "Resolved"
                      ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                      : "bg-blue-50 text-blue-800 border-blue-200"
                  }`}
                >
                  {snag.status}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Completion Remarks */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-emerald-600" />
              Project Field Manager Sign-Off Statement
            </h2>
            <div className="p-4 bg-emerald-50/40 rounded-xl border border-emerald-200 text-xs text-slate-700 leading-relaxed font-serif italic">
              "{installationData.completionRemarks}"
            </div>
            <div className="text-xs text-slate-500 mt-3 space-y-1">
              <p>• Lead Engineer: <strong className="text-slate-800">{team.leadEngineer?.name}</strong></p>
              <p>• Licensed Wireman: <strong className="text-slate-800">{team.certifiedWireman?.name}</strong> ({team.certifiedWireman?.licenseNo})</p>
              <p>• Status: <strong className="text-emerald-700">Ready for Section 18 Joint DISCOM Inspection</strong></p>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Section 16 BFRD Mandate</span>
            <button
              onClick={onOpenSignOffModal}
              className="px-4 py-2 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
