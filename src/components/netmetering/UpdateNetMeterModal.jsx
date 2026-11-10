import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Calendar, Gauge, FileText, Zap, ShieldCheck } from "lucide-react";
import { NET_METERING_STAGES } from "@/data/netMeteringData";

export default function UpdateNetMeterModal({
  isOpen,
  onClose,
  meterData,
  onUpdateMeter
}) {
  if (!isOpen || !meterData) return null;

  const [status, setStatus] = useState(meterData.currentStatus || "meter_installed");
  const [installationDate, setInstallationDate] = useState(meterData.application?.installationDate || "");
  const [completionDate, setCompletionDate] = useState(meterData.application?.completionDate || "");
  const [meterSerial, setMeterSerial] = useState(meterData.meterDetails?.serialNumber || "");
  const [meterMake, setMeterMake] = useState(meterData.meterDetails?.make || "L&T Electrical & Automation");
  const [importKwh, setImportKwh] = useState(meterData.readings?.initialImportKwh || "042180.0");
  const [exportKwh, setExportKwh] = useState(meterData.readings?.initialExportKwh || "000004.8");
  const [serviceOrderNo, setServiceOrderNo] = useState(meterData.application?.serviceConnectionOrderNo || "");

  const handleSave = (e) => {
    e.preventDefault();

    const selectedStage = NET_METERING_STAGES.find(s => s.id === status);
    const stepNum = selectedStage ? selectedStage.step : 5;

    const netKwhCalc = (parseFloat(importKwh || 0) - parseFloat(exportKwh || 0)).toFixed(1);

    const updated = {
      ...meterData,
      currentStatus: status,
      statusStep: stepNum,
      application: {
        ...meterData.application,
        installationDate,
        completionDate: status === "completed" ? (completionDate || new Date().toISOString().split("T")[0]) : null,
        serviceConnectionOrderNo: serviceOrderNo
      },
      meterDetails: {
        ...meterData.meterDetails,
        serialNumber: meterSerial,
        make: meterMake
      },
      readings: {
        ...meterData.readings,
        initialImportKwh: importKwh,
        initialExportKwh: exportKwh,
        initialNetKwh: netKwhCalc
      }
    };

    onUpdateMeter(updated);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Update Net Metering & Grid Changeover
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Consumer #{meterData.consumerNumber} • {meterData.capacity}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-4">
          {/* Stage Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Net Metering Stage
            </label>
            <select
              value={status}
              onChange={(e) => {
                const newSt = e.target.value;
                setStatus(newSt);
                if (newSt === "completed" && !completionDate) {
                  setCompletionDate(new Date().toISOString().split("T")[0]);
                }
              }}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {NET_METERING_STAGES.map((st) => (
                <option key={st.id} value={st.id}>
                  {st.label} — {st.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Meter Serial & Make */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Meter Serial Number
              </label>
              <input
                type="text"
                value={meterSerial}
                onChange={(e) => setMeterSerial(e.target.value)}
                placeholder="e.g. LT-2026-NM-884210"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Meter Make / Brand
              </label>
              <input
                type="text"
                value={meterMake}
                onChange={(e) => setMeterMake(e.target.value)}
                placeholder="e.g. L&T / Schneider"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800"
              />
            </div>
          </div>

          {/* Dates & SCO */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Physical Installation Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={installationDate || ""}
                  onChange={(e) => setInstallationDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Service Order (SCO #)
              </label>
              <input
                type="text"
                value={serviceOrderNo}
                onChange={(e) => setServiceOrderNo(e.target.value)}
                placeholder="e.g. SCO-SLM-2026-4410"
                className="w-full text-xs px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono"
              />
            </div>
          </div>

          {/* Initial Meter Readings (Import / Export) */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <span className="text-xs font-bold text-slate-800 block">
              Initial Baseline Net Meter Readings
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Initial Import Reading (kWh)
                </label>
                <input
                  type="text"
                  value={importKwh}
                  onChange={(e) => setImportKwh(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
                />
              </div>

              <div>
                <label className="block text-[11px] text-slate-500 mb-1">
                  Initial Export Reading (kWh)
                </label>
                <input
                  type="text"
                  value={exportKwh}
                  onChange={(e) => setExportKwh(e.target.value)}
                  className="w-full text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-800 font-mono"
                />
              </div>
            </div>
            <div className="text-[11px] text-slate-500 font-mono flex items-center justify-between pt-1">
              <span>Calculated Net Baseline:</span>
              <strong className="text-blue-700 font-bold">
                {(parseFloat(importKwh || 0) - parseFloat(exportKwh || 0)).toFixed(1)} kWh
              </strong>
            </div>
          </div>

          {/* Actions */}
          <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Save Net Meter Record</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
