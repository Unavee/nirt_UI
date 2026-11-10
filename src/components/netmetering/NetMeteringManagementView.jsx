import React from "react";
import {
  Gauge,
  CheckCircle2,
  Clock,
  AlertCircle,
  Calendar,
  Zap,
  Award,
  FileText,
  Lock,
  ArrowRightLeft,
  Building2,
  ExternalLink,
  ShieldCheck,
  TrendingDown,
  TrendingUp
} from "lucide-react";
import { NET_METERING_STAGES } from "@/data/netMeteringData";

export default function NetMeteringManagementView({
  meterData,
  onOpenUpdateModal,
  onOpenCertModal
}) {
  if (!meterData) {
    return (
      <div className="p-8 text-center text-slate-500 bg-white rounded-2xl border border-slate-200">
        <Gauge className="w-10 h-10 text-slate-300 mx-auto mb-3" />
        <h3 className="text-sm font-bold text-slate-700">No Net Metering Record Found</h3>
      </div>
    );
  }

  const app = meterData.application || {};
  const meter = meterData.meterDetails || {};
  const readings = meterData.readings || {};
  const comms = meterData.discomCommunications || [];
  const docs = meterData.documents || [];
  const currentStageMeta = NET_METERING_STAGES.find(s => s.id === meterData.currentStatus) || NET_METERING_STAGES[4];

  const getStatusBadge = (status) => {
    switch (status) {
      case "completed":
        return {
          bg: "bg-emerald-50 text-emerald-800 border-emerald-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
          label: "COMPLETED"
        };
      case "meter_installed":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />,
          label: "METER INSTALLED & SEALED"
        };
      case "approved":
        return {
          bg: "bg-indigo-50 text-indigo-800 border-indigo-200",
          icon: <Award className="w-3.5 h-3.5 text-indigo-600" />,
          label: "SCO APPROVED"
        };
      case "under_process":
      case "applied":
        return {
          bg: "bg-blue-50 text-blue-800 border-blue-200",
          icon: <Clock className="w-3.5 h-3.5 text-blue-600 animate-spin" />,
          label: status.replace("_", " ").toUpperCase()
        };
      default:
        return {
          bg: "bg-slate-100 text-slate-700 border-slate-200",
          icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
          label: "NOT APPLIED"
        };
    }
  };

  const badge = getStatusBadge(meterData.currentStatus);

  return (
    <div className="space-y-6">
      {/* 1. Header Overview & 6-Stage Stepper */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 pb-6 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className="font-mono text-xs font-bold text-slate-700 bg-slate-100 px-2.5 py-1 rounded-lg border border-slate-200">
                EB Consumer: {meterData.consumerNumber}
              </span>
              <span className={`text-xs font-bold px-3 py-1 rounded-full border flex items-center gap-1.5 ${badge.bg}`}>
                {badge.icon}
                <span>{badge.label}</span>
              </span>
              <span className="text-xs font-semibold text-slate-500 bg-slate-50 px-2.5 py-1 rounded-lg border border-slate-100">
                ⚡ {meterData.sanctionedLoad}
              </span>
            </div>
            <h1 className="text-xl font-bold text-slate-900">
              Bi-Directional Net Metering & Grid Interconnection
            </h1>
            <p className="text-xs text-slate-500 mt-1 flex items-center gap-2">
              <span>Customer: <strong className="text-slate-800">{meterData.customerName}</strong></span>
              <span>•</span>
              <span>Solar Capacity: <strong className="text-blue-700">{meterData.capacity}</strong></span>
              <span>•</span>
              <span>Division: <strong className="text-slate-800">{app.discomDivision}</strong></span>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={onOpenUpdateModal}
              className="px-4 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Gauge className="w-4 h-4" />
              <span>Update Meter Status</span>
            </button>
            <button
              onClick={onOpenCertModal}
              className="px-4 py-2.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl transition-colors flex items-center gap-2"
            >
              <Award className="w-4 h-4" />
              <span>Joint Meter Card</span>
            </button>
          </div>
        </div>

        {/* 6-Stage Stepper */}
        <div className="mt-6">
          <div className="flex justify-between items-center mb-3">
            <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
              Statutory 6-Stage Net Metering Lifecycle (BFRD Section 19)
            </span>
            <span className="text-xs font-mono text-blue-700 font-bold">
              Step {meterData.statusStep || 5} of 6: {currentStageMeta.label}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {NET_METERING_STAGES.map((st) => {
              const isPast = st.step < (meterData.statusStep || 5);
              const isCurrent = st.step === (meterData.statusStep || 5);

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

        {/* Application Identifiers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 text-xs">
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Application #</span>
            <span className="font-mono font-bold text-slate-800">{app.applicationNumber}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Service Order (SCO)</span>
            <span className="font-mono font-bold text-blue-700">{app.serviceConnectionOrderNo}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Application Date</span>
            <span className="font-mono font-semibold text-slate-700">{app.applicationDate}</span>
          </div>
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
            <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">Meter Install Date</span>
            <span className="font-mono font-bold text-emerald-700">{app.installationDate}</span>
          </div>
        </div>
      </div>

      {/* 2. Active Meter Hardware & Polycarbonate Seals */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Meter Technical Specs */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Gauge className="w-4 h-4 text-blue-600" />
            Installed Net Meter Hardware Specification
          </h2>
          <div className="space-y-2.5 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Meter Type & Make</span>
              <strong className="text-slate-900">{meter.make} • {meter.model}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Meter Serial Number</span>
              <strong className="font-mono text-blue-700">{meter.serialNumber}</strong>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">Accuracy & CT/PT Class</span>
              <span className="font-mono text-slate-800">{meter.accuracyClass} • {meter.ctRatio}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-100">
              <span className="text-slate-500">MRT Calibration Certificate</span>
              <span className="font-mono text-emerald-700 font-semibold">{meter.mrtLabTestCert}</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Communication & Optical Port</span>
              <span className="text-slate-700">{meter.opticalPort}</span>
            </div>
          </div>
        </div>

        {/* Polycarbonate Seals */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Lock className="w-4 h-4 text-blue-600" />
            TANGEDCO Statutory Tamper-Evident Seals (3 Affixed)
          </h2>
          <div className="space-y-3">
            {(meter.sealNumbers || []).map((seal) => (
              <div key={seal.id} className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-slate-800">{seal.position}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{seal.type}</div>
                </div>
                <div className="text-right">
                  <div className="font-mono font-bold text-blue-700 bg-white px-2 py-0.5 rounded border border-slate-200">
                    {seal.sealNo}
                  </div>
                  <span className="text-[10px] text-emerald-700 font-semibold block mt-0.5">✓ Sealed on Site</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 3. Baseline Synchronized Energy Readings Console */}
      <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
              <Zap className="w-4 h-4 text-blue-600" />
              Synchronized Baseline Meter Readings (Day 1 Energization)
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Logged by: {readings.loggedByOfficer} on {readings.readingLoggedAt}
            </p>
          </div>
          <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Grid Synchronized</span>
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 text-xs">
          {/* Import */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Import (kWh)</span>
              <TrendingDown className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-mono font-black text-slate-900 mt-1">{readings.initialImportKwh}</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Grid draw initial baseline</span>
          </div>

          {/* Export */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Export (kWh)</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-xl font-mono font-black text-emerald-700 mt-1">{readings.initialExportKwh}</div>
            <span className="text-[10px] text-emerald-600 font-semibold mt-1 block">Solar feed to grid</span>
          </div>

          {/* Net */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Net Cumulative (kWh)</span>
              <ArrowRightLeft className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-xl font-mono font-black text-blue-700 mt-1">{readings.initialNetKwh}</div>
            <span className="text-[10px] text-blue-600 font-semibold mt-1 block">Billing starting point</span>
          </div>

          {/* Old Meter */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div className="flex items-center justify-between">
              <span className="text-slate-500 text-[10px] uppercase font-bold">Old Meter Removed</span>
              <Clock className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-sm font-mono font-bold text-slate-800 mt-1">184,920.0 kWh</div>
            <span className="text-[10px] text-slate-500 mt-1 block">Final billing settled</span>
          </div>
        </div>
      </div>

      {/* 4. DISCOM Communications & Orders */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Communications Timeline */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4">
          <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
            <Building2 className="w-4 h-4 text-blue-600" />
            DISCOM MRT Communication & Action Log
          </h2>
          <div className="space-y-3">
            {comms.map((comm) => (
              <div key={comm.id} className="p-3 bg-slate-50/50 rounded-xl border border-slate-200 text-xs space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] text-slate-500">{comm.date} • {comm.type}</span>
                  <span className="text-[10px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded border border-blue-200">
                    {comm.status}
                  </span>
                </div>
                <div className="font-semibold text-slate-800">{comm.subject}</div>
                <div className="text-[10px] text-slate-500">
                  From: {comm.sender} ➔ To: {comm.recipient}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents Locker */}
        <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-xs space-y-4 flex flex-col justify-between">
          <div>
            <h2 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-600" />
              Statutory Net Metering Clearances
            </h2>
            <div className="space-y-2.5">
              {docs.map((doc) => (
                <div key={doc.id} className="p-3 rounded-xl border border-slate-200 bg-slate-50/50 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-slate-900">{doc.title}</div>
                    <div className="text-[10px] font-mono text-slate-500">{doc.referenceNumber} • {doc.date}</div>
                  </div>
                  <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                    {doc.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
            <span className="text-[11px] text-slate-400">Ready for Section 20 Final Payment</span>
            <button
              onClick={onOpenCertModal}
              className="px-4 py-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-lg transition-colors flex items-center gap-1.5"
            >
              <Award className="w-4 h-4" />
              <span>View Format NM-1 Card</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
