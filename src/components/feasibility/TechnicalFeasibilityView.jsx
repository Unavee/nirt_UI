import React from "react";
import { Zap, CheckCircle2, ShieldCheck, Activity, AlertTriangle, FileText, Settings, ArrowUpRight, CheckSquare, Layers } from "lucide-react";
import { FEASIBILITY_STATUSES } from "../../data/technicalFeasibilityData";

export default function TechnicalFeasibilityView({
  feasibilityRecord,
  project,
  onOpenEditModal,
  onOpenSanctionOrder
}) {
  if (!feasibilityRecord) return null;

  const dt = feasibilityRecord.transformerRequirements || {
    dtName: "Fairlands DT-04 (11kV / 433V)",
    dtRatingKva: 250,
    maxHostingCapacityKw: 187.5,
    existingSolarConnectedKw: 105.5,
    availableSolarQuotaKw: 82.0
  };

  const meter = feasibilityRecord.meterRequirements || {};
  const line = feasibilityRecord.lineRequirements || {};
  const statusObj = FEASIBILITY_STATUSES.find(s => s.id === feasibilityRecord.feasibilityStatus) || {
    id: feasibilityRecord.feasibilityStatus,
    label: feasibilityRecord.feasibilityStatus,
    color: "emerald"
  };

  const totalUsedKw = (dt.existingSolarConnectedKw || 105.5) + (feasibilityRecord.approvedCapacityKw || 3.3);
  const usedPercentage = Math.min(100, Math.round((totalUsedKw / (dt.maxHostingCapacityKw || 187.5)) * 100));

  return (
    <div className="space-y-6">
      {/* Console Top Container */}
      <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 mt-0.5">
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Section 13
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  ID: {feasibilityRecord.id}
                </span>
                <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full border ${
                  feasibilityRecord.feasibilityStatus === "Approved"
                    ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                    : feasibilityRecord.feasibilityStatus === "Rejected"
                    ? "bg-rose-50 text-rose-800 border-rose-200"
                    : "bg-blue-50 text-blue-800 border-blue-200"
                }`}>
                  {statusObj.label}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Dedicated Technical Feasibility & Grid Connection Stage
              </h3>
              <p className="text-xs text-slate-500">
                CEA statutory reverse power hosting check, transformer quotas, bidirectional metering, and line parameters.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-auto">
            {feasibilityRecord.feasibilityStatus === "Approved" && (
              <button
                onClick={onOpenSanctionOrder}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-xs transition-colors"
              >
                <FileText className="w-3.5 h-3.5 text-emerald-700" />
                <span>Sanction Order</span>
              </button>
            )}
            <button
              onClick={onOpenEditModal}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
            >
              <Settings className="w-3.5 h-3.5" />
              <span>Update Feasibility Stage</span>
            </button>
          </div>
        </div>

        {/* 75% Transformer Hosting Quota Gauge Bar */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-blue-600" />
                <span>Distribution Transformer (DT) Quota: {dt.dtName}</span>
              </span>
              <span className="text-[11px] text-slate-500">
                Rating: <strong>{dt.dtRatingKva} kVA</strong> • Statutory Hosting Cap: <strong>75% ({dt.maxHostingCapacityKw} kW max)</strong>
              </span>
            </div>
            <div className="text-right">
              <span className="text-xs font-bold text-emerald-700 font-mono">
                {dt.availableSolarQuotaKw} kW Available Quota
              </span>
              <span className="text-[11px] text-slate-400 block">
                {usedPercentage}% capacity utilized
              </span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="w-full h-3 bg-slate-200 rounded-full overflow-hidden flex">
            <div
              style={{ width: `${Math.round((dt.existingSolarConnectedKw / dt.maxHostingCapacityKw) * 100)}%` }}
              className="bg-slate-400 h-full"
              title={`Existing Connected Solar: ${dt.existingSolarConnectedKw} kW`}
            />
            <div
              style={{ width: `${Math.round((feasibilityRecord.approvedCapacityKw / dt.maxHostingCapacityKw) * 100)}%` }}
              className="bg-emerald-500 h-full"
              title={`This Project: ${feasibilityRecord.approvedCapacityKw} kW`}
            />
          </div>

          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-0.5">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                Existing Solar: <strong>{dt.existingSolarConnectedKw} kW</strong>
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                This Project: <strong>{feasibilityRecord.approvedCapacityKw} kW</strong>
              </span>
            </div>
            <span className="font-semibold text-slate-700">
              Total Quota Headroom: {dt.maxHostingCapacityKw} kW Max
            </span>
          </div>
        </div>

        {/* 4 Technical Parameters Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Card 1: Transformer Requirements */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>1. Transformer Requirements</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Verified No Overload
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Transformer Rating:</span>
                <strong className="text-slate-800">{dt.dtRatingKva} kVA (11kV / 433V)</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Substation:</span>
                <span className="text-slate-700">{dt.substation || "Fairlands 11kV Substation"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">CEA 75% Hosting Limit:</span>
                <span className="font-mono text-slate-800">{dt.maxHostingCapacityKw} kW</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">DT Augmentation Required:</span>
                <span className="text-emerald-700 font-semibold">No (Capacity Adequate)</span>
              </div>
            </div>
          </div>

          {/* Card 2: Meter Requirements */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <CheckSquare className="w-3.5 h-3.5 text-indigo-600" />
                <span>2. Meter Requirements</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                DLMS Class 1.0
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Net Meter Specification:</span>
                <strong className="text-slate-800">{meter.meterType || "Bidirectional DLMS Smart Meter"}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Accuracy & Phase:</span>
                <span className="text-slate-700">{meter.meterClass} • {meter.supplyPhase}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Optical Read Port:</span>
                <span className="font-mono text-slate-800">{meter.opticalPort || "IEC 62056-21"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Testing Lab:</span>
                <span className="text-slate-700 text-[11px] truncate max-w-xs">{meter.testingAuthority}</span>
              </div>
            </div>
          </div>

          {/* Card 3: Line Requirements */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-600" />
                <span>3. Line Requirements</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                Voltage Drop &lt; 3%
              </span>
            </div>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">Feeder & Pole Tap:</span>
                <strong className="text-slate-800">{line.feederName}</strong>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Service Cable Length:</span>
                <span className="text-slate-700">{line.serviceCableLengthMeters} Meters from Pole</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Voltage Regulation Drop:</span>
                <span className="font-mono font-bold text-emerald-700">{line.voltageRegulationDrop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Conductor Specification:</span>
                <span className="text-slate-700 text-[11px]">{line.serviceCableSpec}</span>
              </div>
            </div>
          </div>

          {/* Card 4: Technical Conditions */}
          <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>4. Mandatory Technical Conditions</span>
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                Grid Code
              </span>
            </div>
            <div className="space-y-1 text-[11px] text-slate-600">
              {feasibilityRecord.technicalConditions?.map((cond, idx) => (
                <div key={idx} className="flex items-start gap-1.5">
                  <span className="text-emerald-600 font-bold mt-0.5">•</span>
                  <span>{cond}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Additional Requirements Mandated by DISCOM */}
        <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Additional Technical Requirements Mandated by DISCOM
              </h4>
              <p className="text-[11px] text-slate-500">
                Special conditions stipulated by Assistant Executive Engineer during site inspection
              </p>
            </div>
            <span className="text-xs font-mono font-bold text-slate-700">
              {feasibilityRecord.additionalRequirements?.length || 0} Mandated Items
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {feasibilityRecord.additionalRequirements?.map((req) => (
              <div key={req.id} className="p-3 bg-white rounded-xl border border-slate-200 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{req.title}</span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                    <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                    {req.status}
                  </span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{req.desc}</p>
                <div className="flex justify-between items-center pt-1 text-[10px] text-slate-400 font-mono">
                  <span>Complied: {req.complianceDate}</span>
                  <span>Est: ₹{req.estimatedCost?.toLocaleString("en-IN")}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* DISCOM Observations & Approval Reference */}
        <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-2 text-xs">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-800 uppercase tracking-wider text-[11px]">
              DISCOM Field AE Technical Observations
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              Approval Date: <strong>{feasibilityRecord.approvalDate || "25 Oct 2026"}</strong>
            </span>
          </div>
          <p className="text-slate-700 leading-relaxed text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
            "{feasibilityRecord.discomObservations}"
          </p>
          <div className="flex flex-wrap items-center justify-between text-[11px] text-slate-500 pt-1">
            <span>Inspecting Officer: <strong className="text-slate-700">{feasibilityRecord.officerInCharge}</strong></span>
            <span>Sanction Order Ref: <strong className="font-mono text-blue-700">{feasibilityRecord.sanctionOrderRef}</strong></span>
          </div>
        </div>

        {/* Rejection / Resubmission Banner if present */}
        {feasibilityRecord.rejectionDetails?.hasRejection && (
          <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-900 space-y-1.5">
            <div className="flex items-center gap-2 font-bold">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Technical Rejection / Network Deficiency Notice Recorded</span>
            </div>
            <p className="text-[11px] text-rose-800">
              <strong>Reason:</strong> {feasibilityRecord.rejectionDetails.reason}
            </p>
            <p className="text-[11px] text-rose-800">
              <strong>Corrective Action Required:</strong> {feasibilityRecord.rejectionDetails.correctiveActions}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
