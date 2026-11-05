"use client";

import { useState } from "react";
import Portal from "@/components/Portal";
import { 
  X, 
  Sun, 
  Zap, 
  Upload, 
  CheckCircle2, 
  AlertTriangle, 
  FileCheck2, 
  Ruler, 
  ShieldCheck, 
  Camera,
  Video,
  Check,
  FileText,
  Building2,
  Calendar,
  UserCheck,
  MapPin,
  Clock,
  Layers,
  ArrowRight
} from "lucide-react";

export default function SiteSurveyModal({ isOpen, project, onClose, onSurveyCompleted }) {
  // Geometry & Area calculations
  const [tapeLength, setTapeLength] = useState(30);
  const [tapeWidth, setTapeWidth] = useState(20);
  const [shadowDeduction, setShadowDeduction] = useState(100);

  const totalRoofArea = tapeLength * tapeWidth;
  const usableShadowFreeArea = Math.max(0, totalRoofArea - shadowDeduction);
  const calculatedCapacityKw = Math.round((usableShadowFreeArea / 100) * 10) / 10;

  // Complete BFRD §7 Survey Information State
  const [surveyData, setSurveyData] = useState({
    taskId: `TASK-SRV-${project?.id?.replace("NIRT-", "") || "2610-0042"}`,
    surveyDate: new Date().toISOString().split("T")[0],
    surveyorName: "K. Murali (Site Survey Specialist)",
    customerName: project?.customerName || project?.client || "K. Sundaramoorthy",
    customerPhone: project?.customerPhone || "+91 98421 00891",
    siteAddress: project?.siteAddress || "14/2, Gandhi Nagar, 4th Cross, Salem - 636 008",
    buildingType: "Independent House / Villa",
    roofType: "RCC Flat Slab",
    structuralCondition: "Good - Sound Concrete (No Cracks)",
    sanctionedLoadKw: project?.sanctionedLoadKw || 5.0,
    connectedLoadKw: 4.2,
    avgMonthlyUnits: 480,
    existingElectricalSystem: "Three Phase LT (415V)",
    meterSerialNumber: "TN-SLM-984210",
    meterReadingKwh: "14820",
    dtCapacityKva: "250 kVA",
    dtSaturationStatus: "Pass - 42% Load (Within 70% Limit)",
    proposedModuleLocation: "Main South-Facing Terrace (Zero Obstruction)",
    inverterLocation: "Ground Floor Shaded Utility Wall near DB",
    dcCableMeters: 28,
    acCableMeters: 14,
    earthResistanceOhms: 3.8,
    chemicalPitCount: 2,
    selectedSldTemplate: "TANGEDCO Standard 3-Phase (3kW - 10kW) Net-Meter SLD",
    customerSignOffName: project?.customerName || project?.client || "",
    customerAgreed: true,
    surveyorNotes: "Terrace clear with excellent true-south azimuth. Chemical earthing pit can be placed near north-east garden border. Transformer capacity confirmed with TANGEDCO AE.",
    uploadedPhotos: {
      rooftop: true,
      ebMeter: true,
      ltPanel: true,
      inverterWall: false,
    },
    uploadedVideo: false,
  });

  if (!isOpen || !project) return null;

  const handlePhotoUpload = (slotKey) => {
    setSurveyData((prev) => ({
      ...prev,
      uploadedPhotos: {
        ...prev.uploadedPhotos,
        [slotKey]: true,
      },
    }));
  };

  const handleVideoUpload = () => {
    setSurveyData((prev) => ({
      ...prev,
      uploadedVideo: true,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSurveyCompleted(project.id, {
      ...surveyData,
      totalRoofArea,
      usableShadowFreeArea,
      calculatedCapacityKw,
      tapeLength,
      tapeWidth,
      shadowDeduction
    });
    onClose();
  };

  const allPhotosUploaded = Object.values(surveyData.uploadedPhotos).every(Boolean);

  const photoSlots = [
    { key: "rooftop", label: "1. Rooftop Panoramic View", desc: "Clear 360° terrace panoramic view & parapet shadows" },
    { key: "ebMeter", label: "2. TANGEDCO EB Energy Meter", desc: "Close-up showing meter serial number & reading" },
    { key: "ltPanel", label: "3. Main LT Distribution Board", desc: "Main switchgear, busbars & incoming breaker" },
    { key: "inverterWall", label: "4. Proposed Inverter Mounting Wall", desc: "Shaded wall space & DC cable routing access" },
  ];

  return (
    <Portal>
      <div className="fixed inset-0 w-screen h-screen bg-black/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-2 sm:p-4">
        {/* Backdrop click to dismiss */}
        <div className="fixed inset-0 w-full h-full cursor-pointer" onClick={onClose} />

        {/* Modal Container */}
        <div className="relative bg-white border border-slate-300 max-w-4xl w-full shadow-2xl rounded-2xl overflow-hidden z-10 flex flex-col max-h-[94vh] animate-in fade-in duration-150">
          
          {/* Header & Task Generation Banner (BFRD §7) */}
          <div className="px-5 py-4 border-b border-slate-200 flex justify-between items-center bg-slate-50 shrink-0">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shrink-0 shadow-xs">
                <Sun className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <span className="text-[10px] font-mono bg-blue-600 text-white px-2 py-0.5 rounded font-bold uppercase">
                    BFRD §7 Site Survey Task
                  </span>
                  <span className="text-xs font-mono font-bold text-slate-800">{surveyData.taskId}</span>
                  <span className="text-[10px] font-mono bg-emerald-100 text-emerald-800 border border-emerald-300 px-1.5 py-0.2 rounded font-bold">
                    Task Active
                  </span>
                </div>
                <h3 className="font-bold text-base text-slate-900 mt-0.5">
                  Technical Site Feasibility &amp; Solar Audit: {project.customerName || project.client}
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-200/80 rounded-xl transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form Body - Full BFRD §7 Requirements */}
          <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-6 overflow-y-auto text-xs">
            
            {/* 1. Customer & Task Details Overview */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-400 block">
                01. Survey Task &amp; Customer Information (BFRD §7)
              </span>
              
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 font-mono text-[11px]">
                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">CUSTOMER / PROJECT ID</span>
                  <span className="font-bold text-slate-900">{project.customerName || project.client}</span>
                  <span className="text-slate-500 block text-[10px]">{project.id}</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">TANGEDCO EB NO / CIRCLE</span>
                  <span className="font-bold text-slate-900">{project.ebConsumerNo || project.ebConsumerNumber || "04-205-014-9821"}</span>
                  <span className="text-slate-500 block text-[10px]">{project.district || "Salem"} Circle</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">SURVEY DATE &amp; SLA</span>
                  <input
                    type="date"
                    value={surveyData.surveyDate}
                    onChange={(e) => setSurveyData({ ...surveyData, surveyDate: e.target.value })}
                    className="font-bold text-slate-900 bg-transparent text-[11px] focus:outline-none"
                  />
                  <span className="text-emerald-700 block text-[10px] font-semibold">On-Schedule ✓</span>
                </div>

                <div className="p-2.5 rounded-lg bg-white border border-slate-200">
                  <span className="text-slate-400 block text-[10px] uppercase">ASSIGNED SURVEYOR</span>
                  <span className="font-bold text-blue-700">K. Murali</span>
                  <span className="text-slate-500 block text-[10px]">Site Survey Team</span>
                </div>
              </div>

              {/* Site Address */}
              <div>
                <label className="text-slate-700 block font-semibold mb-1">
                  Site Installation Physical Address:
                </label>
                <input
                  type="text"
                  required
                  value={surveyData.siteAddress}
                  onChange={(e) => setSurveyData({ ...surveyData, siteAddress: e.target.value })}
                  placeholder="Street, door no, landmark, pincode"
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:outline-none focus:border-slate-900"
                />
              </div>
            </div>

            {/* 2. Building, Roof Dimensions & Shadow Analysis */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <Ruler className="w-4 h-4 text-blue-600" />
                  <span>02. Building, Roof Geometry &amp; Shadow Analysis (BFRD §7)</span>
                </h4>
                <span className="text-[10px] text-slate-500 font-mono font-medium">Standard Sizing: 100 sq.ft ≈ 1 kW DC</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Building Type:</label>
                  <select
                    value={surveyData.buildingType}
                    onChange={(e) => setSurveyData({ ...surveyData, buildingType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900"
                  >
                    <option value="Independent House / Villa">Independent House / Villa</option>
                    <option value="Commercial Complex / Office">Commercial Complex / Office</option>
                    <option value="Factory / Industrial Shed">Factory / Industrial Shed</option>
                    <option value="Farmhouse / Agricultural Pump">Farmhouse / Agricultural Pump</option>
                    <option value="Educational / Hospital">Educational / Hospital</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Roof Type:</label>
                  <select
                    value={surveyData.roofType}
                    onChange={(e) => setSurveyData({ ...surveyData, roofType: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900"
                  >
                    <option value="RCC Flat Slab">RCC Flat Concrete Slab</option>
                    <option value="Trapezoidal Sheet">Trapezoidal Metal / Tin Sheet</option>
                    <option value="Tiled Roof">Mangalore / Clay Tiled Roof</option>
                    <option value="Elevated Superstructure">Elevated Superstructure (&gt; 8ft)</option>
                    <option value="Ground Mount">Ground Mounted Solar</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Tape Length (Feet):</label>
                  <input
                    type="number"
                    value={tapeLength}
                    onChange={(e) => setTapeLength(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Tape Width (Feet):</label>
                  <input
                    type="number"
                    value={tapeWidth}
                    onChange={(e) => setTapeWidth(Number(e.target.value))}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Area & Shadow Results Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 pt-1">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Total Roof Area</span>
                  <div className="text-base font-mono font-bold text-slate-900">{totalRoofArea} sq.ft</div>
                  <span className="text-[10px] text-slate-400 font-mono">Gross Physical Tape Area</span>
                </div>

                <div className="p-3 rounded-lg bg-slate-50 border border-slate-200">
                  <span className="text-[10px] text-slate-500 font-mono uppercase block">Shadow Deductions</span>
                  <input
                    type="number"
                    value={shadowDeduction}
                    onChange={(e) => setShadowDeduction(Number(e.target.value))}
                    placeholder="Mumty, tank shadows"
                    className="w-full border border-slate-300 rounded p-1 bg-white text-xs font-mono font-bold text-rose-700 mt-0.5"
                  />
                  <span className="text-[10px] text-slate-400 font-mono">Mumty, tank, tree shadows</span>
                </div>

                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-300">
                  <span className="text-[10px] text-emerald-800 font-mono uppercase block font-bold">Available Solar Area</span>
                  <div className="text-base font-mono font-bold text-emerald-900">{usableShadowFreeArea} sq.ft</div>
                  <span className="text-[10px] text-emerald-700 font-mono">100% Shadow-Free Usable</span>
                </div>

                <div className="p-3 rounded-lg bg-blue-50 border border-blue-300">
                  <span className="text-[10px] text-blue-800 font-mono uppercase block font-bold">Recommended Capacity</span>
                  <div className="text-base font-mono font-bold text-blue-900">{calculatedCapacityKw} kW Peak</div>
                  <span className="text-[10px] text-blue-700 font-mono">Calculated Solar Capacity</span>
                </div>
              </div>

              {/* Structural Observations */}
              <div>
                <label className="text-slate-700 block font-semibold mb-1">Structural Health &amp; Wind Observations:</label>
                <input
                  type="text"
                  value={surveyData.structuralCondition}
                  onChange={(e) => setSurveyData({ ...surveyData, structuralCondition: e.target.value })}
                  placeholder="e.g. Parapet height 3ft, concrete slab cured, zero vibration issues"
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900"
                />
              </div>
            </div>

            {/* 3. Existing Electrical System & Transformer Details */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <Zap className="w-4 h-4 text-violet-600" />
                  <span>03. Electrical Infrastructure &amp; Distribution Transformer (BFRD §7)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Existing Electrical System:</label>
                  <select
                    value={surveyData.existingElectricalSystem}
                    onChange={(e) => setSurveyData({ ...surveyData, existingElectricalSystem: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900"
                  >
                    <option value="Single Phase LT (230V)">Single Phase LT (230V - Up to 4kW)</option>
                    <option value="Three Phase LT (415V)">Three Phase LT (415V - Standard)</option>
                    <option value="High Tension HT (11kV)">High Tension HT (11kV / 22kV)</option>
                  </select>
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Sanctioned Load (kW):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={surveyData.sanctionedLoadKw}
                    onChange={(e) => setSurveyData({ ...surveyData, sanctionedLoadKw: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Connected Load (kW):</label>
                  <input
                    type="number"
                    step="0.1"
                    value={surveyData.connectedLoadKw}
                    onChange={(e) => setSurveyData({ ...surveyData, connectedLoadKw: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Avg Consumption (Units/mo):</label>
                  <input
                    type="number"
                    value={surveyData.avgMonthlyUnits}
                    onChange={(e) => setSurveyData({ ...surveyData, avgMonthlyUnits: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>
              </div>

              {/* Meter Details & Distribution Transformer Grid Feasibility */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Existing Meter Serial &amp; Reading:</label>
                  <input
                    type="text"
                    value={`${surveyData.meterSerialNumber} (Reading: ${surveyData.meterReadingKwh} kWh)`}
                    onChange={(e) => setSurveyData({ ...surveyData, meterSerialNumber: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Distribution Transformer (DT) Rating:</label>
                  <input
                    type="text"
                    value={surveyData.dtCapacityKva}
                    onChange={(e) => setSurveyData({ ...surveyData, dtCapacityKva: e.target.value })}
                    placeholder="e.g. 250 kVA (Gandhi Nagar SS)"
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">DT Load Saturation (&lt; 70% Limit):</label>
                  <input
                    type="text"
                    value={surveyData.dtSaturationStatus}
                    onChange={(e) => setSurveyData({ ...surveyData, dtSaturationStatus: e.target.value })}
                    className="w-full border border-emerald-300 bg-emerald-50 rounded-lg p-2 text-xs font-mono font-bold text-emerald-900 focus:border-emerald-600"
                  />
                </div>
              </div>
            </div>

            {/* 4. Equipment Locations, Cabling & Earthing Pit */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="border-b border-slate-200 pb-2">
                <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                  <Layers className="w-4 h-4 text-teal-600" />
                  <span>04. Proposed Equipment Locations, Cable Routes &amp; Earthing (BFRD §7)</span>
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Proposed Solar Module Location:</label>
                  <input
                    type="text"
                    value={surveyData.proposedModuleLocation}
                    onChange={(e) => setSurveyData({ ...surveyData, proposedModuleLocation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Proposed Inverter Mounting Wall:</label>
                  <input
                    type="text"
                    value={surveyData.inverterLocation}
                    onChange={(e) => setSurveyData({ ...surveyData, inverterLocation: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs focus:border-slate-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">DC Cable Run (Meters):</label>
                  <input
                    type="number"
                    value={surveyData.dcCableMeters}
                    onChange={(e) => setSurveyData({ ...surveyData, dcCableMeters: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">AC Cable Run (Meters):</label>
                  <input
                    type="number"
                    value={surveyData.acCableMeters}
                    onChange={(e) => setSurveyData({ ...surveyData, acCableMeters: Number(e.target.value) })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                  />
                </div>

                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Chemical Earth Pit Soil Resistance (Ω):</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="number"
                      step="0.1"
                      value={surveyData.earthResistanceOhms}
                      onChange={(e) => setSurveyData({ ...surveyData, earthResistanceOhms: Number(e.target.value) })}
                      className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-mono font-bold focus:border-slate-900"
                    />
                    <span className={`px-2 py-1.5 rounded-lg text-[10px] font-mono font-bold shrink-0 border ${
                      surveyData.earthResistanceOhms < 5
                        ? "bg-emerald-100 text-emerald-800 border-emerald-300"
                        : "bg-rose-100 text-rose-800 border-rose-300"
                    }`}>
                      {surveyData.earthResistanceOhms < 5 ? "PASS (< 5Ω)" : "FAIL (≥ 5Ω)"}
                    </span>
                  </div>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block font-semibold mb-1">Standard TANGEDCO SLD Template Attachment:</label>
                <select
                  value={surveyData.selectedSldTemplate}
                  onChange={(e) => setSurveyData({ ...surveyData, selectedSldTemplate: e.target.value })}
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900"
                >
                  <option value="TANGEDCO Standard 1-Phase (1kW - 3kW) Net-Meter SLD">
                    TANGEDCO Standard 1-Phase (1kW - 3kW) Net-Meter SLD (Standard Rooftop)
                  </option>
                  <option value="TANGEDCO Standard 3-Phase (3kW - 10kW) Net-Meter SLD">
                    TANGEDCO Standard 3-Phase (3kW - 10kW) Net-Meter SLD (Standard Residential / Commercial LT)
                  </option>
                  <option value="TANGEDCO Standard Commercial 3-Phase (> 10kW) SLD">
                    TANGEDCO Standard Commercial 3-Phase (&gt; 10kW) SLD with CT/PT Metering
                  </option>
                </select>
              </div>
            </div>

            {/* 5. Mobile-Ready Photographs & Video Capture Slots */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <div className="border-b border-slate-200 pb-2 flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Camera className="w-4 h-4 text-slate-900" />
                  <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px]">
                    05. Mobile Photographs &amp; Video Walkthrough (BFRD §7)
                  </h4>
                </div>
                <span className={`text-[10px] font-mono font-bold px-2.5 py-1 rounded-lg border ${
                  allPhotosUploaded ? "bg-emerald-100 text-emerald-800 border-emerald-300" : "bg-slate-100 text-slate-700 border-slate-300"
                }`}>
                  {allPhotosUploaded ? "4 of 4 Photos Attached ✓" : "Incomplete (Mandatory for sign-off)"}
                </span>
              </div>

              {/* 4 Photo Upload Slots */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {photoSlots.map((slot) => {
                  const isUploaded = surveyData.uploadedPhotos[slot.key];
                  return (
                    <div
                      key={slot.key}
                      onClick={() => handlePhotoUpload(slot.key)}
                      className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isUploaded
                          ? "bg-emerald-50/70 border-emerald-300"
                          : "bg-slate-50 border-dashed border-slate-300 hover:border-slate-600"
                      }`}
                    >
                      <div className="space-y-0.5 pr-2">
                        <span className="font-bold text-slate-900 block text-xs">{slot.label}</span>
                        <span className="text-[10px] text-slate-500 block font-mono">{slot.desc}</span>
                      </div>
                      <div className="shrink-0">
                        {isUploaded ? (
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white font-mono text-[10px] font-bold flex items-center space-x-1">
                            <Check className="w-3 h-3" />
                            <span>Attached</span>
                          </span>
                        ) : (
                          <label className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center space-x-1 cursor-pointer hover:bg-black transition-colors">
                            <Upload className="w-3 h-3" />
                            <span>Attach</span>
                            <input 
                              type="file" 
                              accept="image/*" 
                              capture="environment" 
                              className="hidden" 
                              onChange={() => handlePhotoUpload(slot.key)} 
                            />
                          </label>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Video Walkthrough Slot */}
              <div
                onClick={handleVideoUpload}
                className={`p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                  surveyData.uploadedVideo
                    ? "bg-indigo-50/70 border-indigo-300"
                    : "bg-slate-50 border-dashed border-slate-300 hover:border-slate-600"
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center shrink-0">
                    <Video className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-bold text-slate-900 block text-xs">
                      5. Terrace 360° Walkthrough Video / Drone Footage (BFRD §7)
                    </span>
                    <span className="text-[10px] text-slate-500 block font-mono">
                      Capture terrace video walkthrough directly from mobile phone camera
                    </span>
                  </div>
                </div>

                <div className="shrink-0">
                  {surveyData.uploadedVideo ? (
                    <span className="px-2.5 py-1 rounded-lg bg-indigo-600 text-white font-mono text-[10px] font-bold flex items-center space-x-1">
                      <Check className="w-3 h-3" />
                      <span>Video Attached</span>
                    </span>
                  ) : (
                    <label className="px-2.5 py-1 rounded-lg bg-slate-900 text-white font-mono text-[10px] font-bold flex items-center space-x-1 cursor-pointer hover:bg-black transition-colors">
                      <Video className="w-3 h-3" />
                      <span>Record / Upload</span>
                      <input 
                        type="file" 
                        accept="video/*" 
                        capture="environment" 
                        className="hidden" 
                        onChange={handleVideoUpload} 
                      />
                    </label>
                  )}
                </div>
              </div>
            </div>

            {/* 6. Customer Concurrence & Technical Remarks */}
            <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-4">
              <h4 className="font-bold text-slate-900 uppercase tracking-wider text-[11px] flex items-center space-x-1.5">
                <FileCheck2 className="w-4 h-4 text-emerald-600" />
                <span>06. Surveyor Technical Remarks &amp; Customer Concurrence (BFRD §7)</span>
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-slate-700 block font-semibold mb-1">Customer Sign-off Name:</label>
                  <input
                    type="text"
                    required
                    value={surveyData.customerSignOffName}
                    onChange={(e) => setSurveyData({ ...surveyData, customerSignOffName: e.target.value })}
                    className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs font-semibold focus:border-slate-900"
                  />
                </div>

                <div className="flex items-center pt-4">
                  <label className="flex items-center space-x-2.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={surveyData.customerAgreed}
                      onChange={(e) => setSurveyData({ ...surveyData, customerAgreed: e.target.checked })}
                      className="w-4 h-4 text-slate-900 border-slate-300 rounded focus:ring-slate-900 cursor-pointer"
                    />
                    <span className="text-xs font-semibold text-slate-900">
                      Customer concurred with proposed layout and shadow-free area on site
                    </span>
                  </label>
                </div>
              </div>

              <div>
                <label className="text-slate-700 block font-semibold mb-1">Surveyor Technical Remarks &amp; Recommendations:</label>
                <textarea
                  rows={2}
                  value={surveyData.surveyorNotes}
                  onChange={(e) => setSurveyData({ ...surveyData, surveyorNotes: e.target.value })}
                  placeholder="Record obstacle details, cable pathway specifics, and earthing pit suggestions..."
                  className="w-full border border-slate-300 rounded-lg p-2 bg-white text-xs text-slate-900 focus:border-slate-900 resize-none"
                />
              </div>
            </div>

            {/* Modal Actions */}
            <div className="pt-3 border-t border-slate-200 flex justify-between items-center shrink-0">
              <div className="text-[11px] font-mono">
                {!allPhotosUploaded && (
                  <span className="text-rose-600 flex items-center space-x-1 font-semibold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                    <span>Upload all 4 photo slots to sign-off feasibility</span>
                  </span>
                )}
              </div>

              <div className="flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-slate-300 px-4 py-2 text-xs font-semibold text-slate-700 rounded-xl hover:bg-slate-100 transition-colors"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="apple-button bg-slate-900 hover:bg-black text-white px-5 py-2 text-xs font-bold rounded-xl transition-all flex items-center space-x-1.5 shadow-sm active:scale-95"
                >
                  <FileCheck2 className="w-4 h-4" />
                  <span>Submit Feasibility Audit (Sign-off Step 03)</span>
                </button>
              </div>
            </div>

          </form>

        </div>
      </div>
    </Portal>
  );
}
