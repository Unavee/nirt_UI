import React from "react";
import {
  ShieldCheck,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Award,
  Zap,
  FileText,
  Phone,
  Mail,
  Building2,
  ChevronRight,
  ExternalLink,
  Printer
} from "lucide-react";
import { INSPECTION_STATUS_STAGES } from "@/data/inspectionData";

export default function InspectionManagementView({
  inspectionData,
  onOpenStatusModal,
  onOpenReportModal
}) {
  if (!inspectionData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <ShieldCheck className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Inspection Record Found</h3>
      </div>
    );
  }

  const currentStageMeta = INSPECTION_STATUS_STAGES.find(s => s.id === inspectionData.currentStatus) || INSPECTION_STATUS_STAGES[1];
  const dates = inspectionData.dates || {};
  const inspectors = inspectionData.assignedInspectors || [];
  const checklist = inspectionData.observationsAndChecklist || [];
  const rect = inspectionData.rectificationDetails || {};
  const comm = inspectionData.commissioningReport || {};
  const docs = inspectionData.statutoryDocuments || [];

  const getStatusBadge = (status) => {
    switch (status) {
      case "commissioned":
      case "approved":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: status.toUpperCase()
        };
      case "rectification":
        return {
          bg: "bg-rose-50 text-rose-800 border-rose-200",
          icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600" />,
          label: "RECTIFICATION REQUIRED"
        };
      case "inspection_completed":
      case "scheduled":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />,
          label: status.replace("_", " ").toUpperCase()
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
          label: "REQUESTED"
        };
    }
  };

  const currentBadge = getStatusBadge(inspectionData.currentStatus);

  return (
    <div className="space-y-6">
      {/* 1. Top Header & 6-Stage Workflow Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                {inspectionData.projectId}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${currentBadge.bg}`}>
                {currentBadge.icon}
                <span>{currentBadge.label}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                🏛️ {inspectionData.inspectingAuthority}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              DISCOM & CEIG Inspection & Commissioning Management
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{inspectionData.customerName}</strong></span>
              <span>•</span>
              <span>Capacity: <strong className="text-blue-700">{inspectionData.capacity}</strong></span>
              <span>•</span>
              <span className="truncate max-w-sm">📍 {inspectionData.siteAddress}</span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenStatusModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Update Inspection Stage</span>
            </button>
            <button
              onClick={onOpenReportModal}
              className="px-4 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Commissioning Certificate</span>
            </button>
          </div>
        </div>

        {/* 6-Stage Workflow Stepper */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-blue-600" />
              Statutory 6-Stage Inspection Workflow (BFRD Section 18)
            </span>
            <span className="text-xs font-mono text-blue-700 font-bold">
              Step {inspectionData.statusStep || 2} of 6: {currentStageMeta.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {INSPECTION_STATUS_STAGES.map((st) => {
              const isPast = st.step < (inspectionData.statusStep || 2);
              const isCurrent = st.step === (inspectionData.statusStep || 2);

              return (
                <div
                  key={st.id}
                  className={`p-3 rounded-xl border text-center transition-all ${
                    isCurrent
                      ? "bg-blue-50/80 border-blue-300 ring-2 ring-blue-100"
                      : isPast
                      ? "bg-emerald-50/40 border-emerald-200"
                      : "bg-slate-50/50 border-slate-200 opacity-60"
                  }`}
                >
                  <div className="flex items-center justify-center mb-1.5">
                    {isPast ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    ) : isCurrent ? (
                      <Clock className="w-5 h-5 text-blue-600 animate-spin" />
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-600 text-xs font-bold flex items-center justify-center font-mono">
                        {st.step}
                      </span>
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-900 line-clamp-1">{st.label}</div>
                  <p className="text-[10px] text-slate-500 mt-0.5 line-clamp-1">{st.desc}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Key Statutory Dates Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Request Filed</span>
            <span className="font-mono font-bold text-slate-800">{dates.requestDate || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Scheduled Date</span>
            <span className="font-mono font-bold text-blue-700">{dates.scheduledDate || "—"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">CEIG Approval</span>
            <span className="font-mono font-bold text-emerald-700">{dates.approvalDate || "In Inspection"}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Grid Commissioning</span>
            <span className="font-mono font-bold text-slate-800">{dates.commissioningDate || "Pending Clearance"}</span>
          </div>
        </div>
      </div>

      {/* 2. Assigned Inspecting Authorities Card */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-4 flex items-center gap-2">
          <Building2 className="w-4 h-4 text-blue-600" />
          Assigned Inspecting Authorities & Government Officers
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inspectors.map((insp, idx) => (
            <div key={idx} className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] uppercase font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {idx === 0 ? "DISCOM Utility Officer" : "CEIG Statutory Inspector"}
                  </span>
                  <span className="text-[10px] text-emerald-700 font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Authorized</span>
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-900">{insp.name}</div>
                <div className="text-xs text-slate-600 font-medium">{insp.designation}</div>
                <p className="text-[11px] text-slate-500 mt-0.5">{insp.organization}</p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-200 flex items-center justify-between text-xs font-mono text-slate-700">
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5 text-slate-400" />
                  {insp.phone}
                </span>
                <span className="flex items-center gap-1 text-[11px] text-slate-500 truncate max-w-[180px]">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  {insp.email}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Statutory Engineering Checklist & Observations */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-blue-600" />
              Statutory Inspection Checklist & Official Observations
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Comprehensive joint checks conducted under CEA Technical Standards & TNERC Regulations
            </p>
          </div>
          <button
            onClick={onOpenStatusModal}
            className="px-3 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors"
          >
            Update Checkpoints
          </button>
        </div>

        <div className="border border-slate-200 rounded-xl overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
              <tr>
                <th className="p-3.5 border-r border-slate-200 w-12 text-center">#</th>
                <th className="p-3.5 border-r border-slate-200">Engineering Parameter</th>
                <th className="p-3.5 border-r border-slate-200">Inspecting Authority</th>
                <th className="p-3.5 border-r border-slate-200 text-center">Status</th>
                <th className="p-3.5">Observations / Test Findings</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {checklist.map((item, idx) => (
                <tr key={item.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="p-3.5 border-r border-slate-100 text-center font-mono font-bold text-slate-500">
                    {idx + 1}
                  </td>
                  <td className="p-3.5 border-r border-slate-100 font-bold text-slate-900">
                    {item.item}
                  </td>
                  <td className="p-3.5 border-r border-slate-100 text-slate-600 font-medium">
                    {item.authority}
                  </td>
                  <td className="p-3.5 border-r border-slate-100 text-center whitespace-nowrap">
                    <span
                      className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border inline-flex items-center gap-1 ${
                        item.status === "Pass"
                          ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                          : "bg-rose-50 text-rose-800 border-rose-200"
                      }`}
                    >
                      {item.status === "Pass" ? <CheckCircle2 className="w-3 h-3 text-emerald-600" /> : <AlertCircle className="w-3 h-3 text-rose-600" />}
                      <span>{item.status}</span>
                    </span>
                  </td>
                  <td className="p-3.5 text-slate-600">
                    {item.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 4. Rectification Snag Console & Joint Commissioning Report */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Snag & Rectification */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600" />
                CEIG / DISCOM Rectification Notice
              </h2>
              <span
                className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                  rect.status === "Resolved"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : "bg-blue-50 text-blue-800 border-blue-200"
                }`}
              >
                {rect.status}
              </span>
            </div>
            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
              <span className="font-bold text-slate-800 block">Notice Description:</span>
              <p className="text-slate-600 leading-relaxed">{rect.description}</p>
              <div className="pt-2 text-[11px] text-slate-500 space-y-1">
                <p>• Assigned Engineer: <strong className="text-slate-700">{rect.responsibleEngineer}</strong></p>
                <p>• Rectification Target: <strong className="font-mono text-slate-700">{rect.targetCompletionDate}</strong></p>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Section 18 Rectification Gate</span>
            <button
              onClick={onOpenStatusModal}
              className="px-3.5 py-1.5 text-xs font-bold text-blue-700 bg-blue-50 hover:bg-blue-100 border border-blue-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark Notice Resolved</span>
            </button>
          </div>
        </div>

        {/* Technical Commissioning Preview */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <Zap className="w-4 h-4 text-emerald-600" />
              Joint Commissioning Technical Metrics
            </h2>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-mono">Anti-Islanding Trip</span>
                <span className="font-mono font-bold text-emerald-700">{comm.antiIslandingTripTime}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">Pass (&lt; 2.0s standard)</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-mono">Grid Feeder & DT</span>
                <span className="font-mono font-bold text-slate-800">{comm.distributionTransformer}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">{comm.gridInterconnectionFeeder}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-mono">Interconnect Voltage</span>
                <span className="font-mono font-bold text-slate-800">{comm.gridVoltage}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">{comm.phaseSequence}</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-mono">Initial Meter Reading</span>
                <span className="font-mono font-bold text-blue-700">{comm.initialGenerationReading}</span>
                <span className="text-[9px] text-blue-600 block mt-0.5">Power Factor: {comm.powerFactor}</span>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">TNERC Net-Metering Regulation</span>
            <button
              onClick={onOpenReportModal}
              className="px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-3.5 h-3.5" />
              <span>View Official Certificate</span>
            </button>
          </div>
        </div>
      </div>

      {/* 5. Statutory Inspection Documents */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
          <FileText className="w-4 h-4 text-blue-600" />
          Statutory Inspection Dossier & Government Clearances
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {docs.map((doc) => (
            <div key={doc.id} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex flex-col justify-between">
              <div>
                <span className="text-[10px] font-mono text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                  {doc.category}
                </span>
                <h4 className="text-xs font-bold text-slate-900 mt-2">{doc.title}</h4>
                <div className="text-[10px] font-mono text-slate-500 mt-1">{doc.referenceNumber}</div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-200 flex items-center justify-between text-[11px]">
                <span className="text-emerald-700 font-semibold">{doc.status}</span>
                <span className="font-mono text-slate-400">{doc.fileSize}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
