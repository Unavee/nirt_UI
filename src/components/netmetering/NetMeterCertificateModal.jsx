import React from "react";
import { X, Award, CheckCircle2, ShieldCheck, Printer, Gauge, Calendar, Zap, Building2 } from "lucide-react";

export default function NetMeterCertificateModal({
  isOpen,
  onClose,
  meterData
}) {
  if (!isOpen || !meterData) return null;

  const handlePrint = () => {
    window.print();
  };

  const app = meterData.application || {};
  const meter = meterData.meterDetails || {};
  const readings = meterData.readings || {};
  const seals = meter.sealNumbers || [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-3xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/80">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Gauge className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Bi-Directional Net Meter Commissioning Card (Format NM-1)
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Sanction SCO: {app.serviceConnectionOrderNo || "SCO-SLM-2026-4410"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-200 rounded-lg transition-colors flex items-center gap-1.5 text-xs font-semibold px-2.5"
              title="Print Certificate"
            >
              <Printer className="w-4 h-4" />
              <span className="hidden sm:inline">Print</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Certificate Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-slate-800 print:p-0">
          {/* Official Document Banner */}
          <div className="border-2 border-blue-600/30 bg-blue-50/20 rounded-2xl p-6 relative overflow-hidden">
            <div className="text-center pb-4 border-b border-blue-200">
              <div className="text-[10px] font-black uppercase tracking-widest text-blue-800">
                Tamil Nadu Generation and Distribution Corporation (TANGEDCO)
              </div>
              <h1 className="text-lg font-black text-slate-900 mt-1">
                SOLAR ROOFTOP BI-DIRECTIONAL NET METER COMMISSIONING CARD
              </h1>
              <p className="text-xs text-slate-600 mt-0.5">
                Issued Under TNERC Order on Net-Metering Interconnection of Solar Photovoltaic Systems
              </p>
            </div>

            {/* Consumer & Application Details */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mt-4 text-xs">
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">EB Consumer #</span>
                <span className="font-mono font-bold text-slate-900">{meterData.consumerNumber}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Solar Plant Capacity</span>
                <span className="font-bold text-blue-700">{meterData.capacity}</span>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Sanctioned Load</span>
                <span className="font-medium text-slate-800">{meterData.sanctionedLoad}</span>
              </div>
              <div className="col-span-2">
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Consumer Name & Premise</span>
                <span className="font-bold text-slate-900">{meterData.customerName}</span>
                <p className="text-[11px] text-slate-600">SIDCO Industrial Estate, Salem South Section</p>
              </div>
              <div>
                <span className="text-slate-500 block text-[10px] uppercase font-bold">Installation Date</span>
                <span className="font-mono font-bold text-slate-900">{app.installationDate || "2026-11-09"}</span>
              </div>
            </div>
          </div>

          {/* Meter Replacement Comparison Table (Old vs New) */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white">
            <div className="px-4 py-2.5 bg-slate-50 border-b border-slate-200 font-bold text-xs text-slate-800">
              Meter Changeover & Baseline Energy Log
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-slate-200 text-xs">
              {/* Old Meter */}
              <div className="p-4 space-y-2 bg-slate-50/30">
                <span className="text-[10px] uppercase font-bold text-slate-500 block">
                  1. Dismantled Unidirectional Meter
                </span>
                <p>Serial Number: <strong className="font-mono text-slate-800">{readings.oldMeterSerialNumber}</strong></p>
                <p>Final Cumulative kWh: <strong className="font-mono text-slate-900 text-sm">{readings.oldMeterFinalReading}</strong></p>
                <p className="text-[11px] text-slate-500">Status: Removed and returned to TANGEDCO Central Stores.</p>
              </div>

              {/* New Net Meter */}
              <div className="p-4 space-y-2 bg-blue-50/30">
                <span className="text-[10px] uppercase font-bold text-blue-700 block">
                  2. Installed Bi-Directional Net Meter
                </span>
                <p>Make & Model: <strong className="text-slate-800">{meter.make} • {meter.model}</strong></p>
                <p>Serial Number: <strong className="font-mono text-blue-700 font-bold">{meter.serialNumber}</strong></p>
                <p>Precision Class: <span className="font-mono text-slate-700">{meter.accuracyClass} ({meter.ctRatio})</span></p>
              </div>
            </div>
          </div>

          {/* Initial Readings Grid */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/50 space-y-3">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Zap className="w-4 h-4 text-blue-600" />
              Initial Synchronized Baseline Readings
            </h3>
            <div className="grid grid-cols-3 gap-3 text-xs">
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Initial Import (kWh)</span>
                <span className="font-mono font-bold text-slate-900 text-sm">{readings.initialImportKwh}</span>
                <span className="text-[9px] text-slate-500 block mt-0.5">Energy drawn from grid</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Initial Export (kWh)</span>
                <span className="font-mono font-bold text-emerald-700 text-sm">{readings.initialExportKwh}</span>
                <span className="text-[9px] text-emerald-600 block mt-0.5">Solar energy fed to grid</span>
              </div>
              <div className="bg-white p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 text-[10px] block">Net Baseline (kWh)</span>
                <span className="font-mono font-bold text-blue-700 text-sm">{readings.initialNetKwh}</span>
                <span className="text-[9px] text-blue-600 block mt-0.5">Net Billing Baseline</span>
              </div>
            </div>
          </div>

          {/* Polycarbonate Seals Ledger */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
              Statutory TANGEDCO Polycarbonate Tamper-Evident Seals
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs font-mono">
              {seals.map((seal) => (
                <div key={seal.id} className="p-2.5 rounded-lg border border-slate-200 bg-slate-50">
                  <div className="text-[10px] text-slate-500 font-sans">{seal.position}</div>
                  <div className="font-bold text-slate-900 text-xs mt-0.5">{seal.sealNo}</div>
                  <div className="text-[9px] text-emerald-700 font-sans mt-0.5">✓ {seal.type}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tripartite Signatures */}
          <div className="border border-slate-200 rounded-xl p-4 bg-white">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. N. Palanisamy (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. N. Palanisamy</div>
                <div className="text-[10px] text-slate-500">Assistant Engineer (AE / MRT)</div>
                <div className="text-[10px] text-blue-700 font-semibold">TANGEDCO Salem South</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  Er. K. Vasanth (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">Er. K. Vasanth, B.E.</div>
                <div className="text-[10px] text-slate-500">Lead Solar Engineer</div>
                <div className="text-[10px] text-emerald-700 font-semibold">NIRT Solar Renewable Energy</div>
              </div>

              <div className="border border-slate-200 rounded-lg p-3 text-center">
                <div className="h-10 border-b border-dashed border-slate-300 flex items-center justify-center text-xs italic font-serif text-slate-400">
                  K. R. Sengottaiyan (Signed)
                </div>
                <div className="text-xs font-bold text-slate-800 mt-2">K. R. Sengottaiyan</div>
                <div className="text-[10px] text-slate-500">Authorized Consumer / Signatory</div>
                <div className="text-[10px] text-slate-600 font-semibold">Salem Textiles</div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between bg-slate-50">
          <span className="text-[11px] text-slate-500">
            Mandatory document for Section 20 Final Payment and Section 21 Subsidy Claim.
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 text-xs font-bold text-slate-700 bg-white hover:bg-slate-100 border border-slate-200 rounded-xl transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
