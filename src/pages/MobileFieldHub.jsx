import React, { useState, useEffect } from "react";
import { 
  Smartphone, MapPin, Navigation, Phone, MessageSquare, 
  Camera, CheckCircle2, Wrench, FileText, ArrowRight, 
  Calendar, Clock, User, ShieldCheck, Printer, RefreshCw, 
  ExternalLink, Sparkles
} from "lucide-react";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { 
  INITIAL_FIELD_DISCUSSIONS, 
  INITIAL_INSTALLATION_CHECKLIST 
} from "@/data/fieldOperationsData";
import CustomerDiscussionModal from "@/components/field/CustomerDiscussionModal";
import InstallationProgressModal from "@/components/field/InstallationProgressModal";

export default function MobileFieldHub() {
  const [activeTab, setActiveTab] = useState("sites"); // "sites" | "discussions" | "installation" | "report"
  const [discussions, setDiscussions] = useState(INITIAL_FIELD_DISCUSSIONS);
  const [installationList, setInstallationList] = useState(INITIAL_INSTALLATION_CHECKLIST);
  const [selectedProject, setSelectedProject] = useState(MOCK_PROJECTS[0]);
  
  // Modals state
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);

  // Live Hardware GPS State
  const [gpsData, setGpsData] = useState({
    lat: "11.6643",
    lng: "78.1460",
    accuracy: "±4m",
    circle: "Salem Urban",
    status: "GPS Auto-Locked"
  });
  const [isRefreshingGps, setIsRefreshingGps] = useState(false);

  const fetchLiveGps = () => {
    setIsRefreshingGps(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4),
            accuracy: `±${Math.round(pos.coords.accuracy)}m`,
            circle: "Salem Circle",
            status: "Live Hardware GPS Locked ✓"
          });
          setIsRefreshingGps(false);
        },
        () => {
          setGpsData({
            lat: "11.6643",
            lng: "78.1460",
            accuracy: "±6m",
            circle: "Salem Circle",
            status: "Simulated Geolocation Active"
          });
          setIsRefreshingGps(false);
        },
        { enableHighAccuracy: true, timeout: 6000 }
      );
    } else {
      setIsRefreshingGps(false);
    }
  };

  useEffect(() => {
    fetchLiveGps();
  }, []);

  const handleAddDiscussion = (newDisc) => {
    setDiscussions([newDisc, ...discussions]);
  };

  const handleUpdateInstallation = ({ checklist }) => {
    setInstallationList(checklist);
  };

  return (
    <div className="space-y-5 pb-20 max-w-4xl mx-auto">
      
      {/* Top Mobile Field Header */}
      <div className="glass-surface p-4 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-3">
        <div className="flex justify-between items-start">
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                Section 32 • Mobile Field Ops
              </span>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                PWA Ready
              </span>
            </div>
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1">
              Field Operations Console
            </h1>
          </div>

          <button
            onClick={fetchLiveGps}
            disabled={isRefreshingGps}
            className="apple-button p-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs flex items-center space-x-1"
            title="Refresh GPS Coordinates"
          >
            <RefreshCw className={`w-3.5 h-3.5 text-blue-600 ${isRefreshingGps ? "animate-spin" : ""}`} />
            <span className="hidden sm:inline">Refresh GPS</span>
          </button>
        </div>

        {/* Live GPS Bar */}
        <div className="p-3 rounded-2xl bg-emerald-50/70 border border-emerald-200 text-xs flex items-center justify-between font-mono">
          <div className="flex items-center space-x-2">
            <Navigation className="w-4 h-4 text-emerald-600 shrink-0 animate-pulse" />
            <div>
              <span className="font-bold text-emerald-900 block leading-tight">
                {gpsData.lat}° N, {gpsData.lng}° E ({gpsData.circle})
              </span>
              <span className="text-[10px] text-emerald-700">Accuracy: {gpsData.accuracy} • {gpsData.status}</span>
            </div>
          </div>
          <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-white text-emerald-800 border border-emerald-200">
            AUTO-STAMP
          </span>
        </div>

        {/* Quick 1-Thumb Action Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1">
          <button
            onClick={() => setIsDiscussionModalOpen(true)}
            className="apple-button p-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 transition-all"
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Record Discussion</span>
          </button>

          <button
            onClick={() => setIsInstallModalOpen(true)}
            className="apple-button p-3 rounded-2xl bg-slate-900 text-white font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 transition-all"
          >
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Update Installation</span>
          </button>

          <label className="apple-button p-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-2xs hover:bg-slate-50 cursor-pointer active:scale-95 transition-all">
            <Camera className="w-4 h-4 text-indigo-600" />
            <span>Capture Geo-Photo</span>
            <input type="file" accept="image/*" capture="environment" className="hidden" />
          </label>

          <button
            onClick={() => setActiveTab("report")}
            className="apple-button p-3 rounded-2xl bg-white border border-slate-200 text-slate-800 font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-2xs hover:bg-slate-50 active:scale-95 transition-all"
          >
            <FileText className="w-4 h-4 text-violet-600" />
            <span>Submit Report</span>
          </button>
        </div>
      </div>

      {/* Segment Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-medium overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { id: "sites", label: `Assigned Sites (${MOCK_PROJECTS.length})` },
          { id: "discussions", label: `Discussions (${discussions.length})` },
          { id: "installation", label: "Installation Milestones" },
          { id: "report", label: "Field Inspection Report" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all text-xs font-semibold ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900 hover:bg-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: ASSIGNED SITES FEED */}
      {activeTab === "sites" && (
        <div className="space-y-3">
          {MOCK_PROJECTS.map(proj => (
            <div
              key={proj.id}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
            >
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className="font-mono text-blue-700 font-bold text-xs bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                      {proj.id}
                    </span>
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                      {proj.capacityKw} kWp
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mt-1">{proj.customerName}</h3>
                  <div className="text-xs text-slate-500 font-medium">{proj.address}, {proj.district} Circle</div>
                </div>

                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-emerald-50 text-emerald-700 border border-emerald-200">
                  {proj.stageName}
                </span>
              </div>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-3 rounded-2xl bg-slate-50 border border-slate-100">
                <div>
                  <span className="text-slate-400 block text-[9px]">EB CONSUMER #:</span>
                  <span className="font-bold text-slate-800">{proj.consumerNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">ROOF TYPE:</span>
                  <span className="font-bold text-slate-800">{proj.roofType}</span>
                </div>
              </div>

              {/* Thumb Action Buttons */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-xs">
                <a
                  href={`tel:${proj.phone}`}
                  className="apple-button p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Phone className="w-3.5 h-3.5 text-blue-600" />
                  <span>Call Client</span>
                </a>

                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${proj.address}, ${proj.district}, Tamil Nadu`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="apple-button p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-600" />
                  <span>GPS Route</span>
                </a>

                <button
                  onClick={() => {
                    setSelectedProject(proj);
                    setIsDiscussionModalOpen(true);
                  }}
                  className="apple-button p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 font-bold flex items-center justify-center space-x-1.5 shadow-2xs"
                >
                  <MessageSquare className="w-3.5 h-3.5 text-indigo-600" />
                  <span>Log Meeting</span>
                </button>

                <button
                  onClick={() => {
                    setSelectedProject(proj);
                    setIsInstallModalOpen(true);
                  }}
                  className="apple-button p-2.5 rounded-xl bg-slate-900 text-white font-bold flex items-center justify-center space-x-1.5 shadow-xs"
                >
                  <Wrench className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Update Work</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 2: CUSTOMER DISCUSSION HISTORY */}
      {activeTab === "discussions" && (
        <div className="space-y-3">
          {discussions.map(disc => (
            <div
              key={disc.id}
              className="p-4 sm:p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-2.5"
            >
              <div className="flex justify-between items-center text-xs">
                <div className="flex items-center space-x-2">
                  <span className="font-mono text-blue-700 font-bold text-[10px] bg-blue-50 border border-blue-200 px-2 py-0.5 rounded">
                    {disc.id}
                  </span>
                  <span className="font-mono font-bold text-slate-800">{disc.mode}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400">{disc.date}</span>
              </div>

              <div>
                <h4 className="font-bold text-slate-900 text-sm">{disc.topic}</h4>
                <div className="text-[11px] font-mono text-slate-500 mt-0.5">
                  Client: <strong>{disc.customerName}</strong> ({disc.projectId}) • Staff: {disc.staffName}
                </div>
              </div>

              <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                <span className="text-[9px] uppercase font-bold text-slate-400 font-mono block mb-0.5">CUSTOMER DECISION:</span>
                "{disc.customerDecision}"
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 text-[10px] font-mono text-slate-500 pt-1 border-t border-slate-100">
                <div className="flex items-center space-x-1 text-emerald-700 font-semibold">
                  <MapPin className="w-3 h-3 text-emerald-600" />
                  <span>GPS: {disc.gpsStamp}</span>
                </div>
                <div>Follow-up: <strong>{disc.nextFollowUp}</strong></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* TAB 3: INSTALLATION MILESTONES */}
      {activeTab === "installation" && (
        <div className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-3">
            <div>
              <h3 className="font-bold text-slate-900 text-sm">Site Installation Progress</h3>
              <p className="text-xs text-slate-500 font-mono">Project: NIRT-26-0042 • 5.4 kWp Elevated HDGI</p>
            </div>
            <button
              onClick={() => setIsInstallModalOpen(true)}
              className="apple-button px-3.5 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Update Status
            </button>
          </div>

          <div className="space-y-3">
            {installationList.map((step, idx) => (
              <div
                key={step.id}
                className="p-3.5 rounded-2xl border border-slate-200/80 bg-slate-50/50 flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-xs text-slate-900">{step.name}</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">{step.desc}</div>
                  {step.completedDate && (
                    <span className="text-[9px] font-mono text-emerald-700 font-bold block mt-1">
                      Completed on {step.completedDate} by {step.engineer} ✓
                    </span>
                  )}
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                  step.status === "Completed" ? "bg-emerald-100 text-emerald-800"
                    : step.status === "In Progress" ? "bg-blue-100 text-blue-800"
                    : "bg-slate-100 text-slate-500"
                }`}>
                  {step.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: FIELD INSPECTION & SIGN-OFF REPORT */}
      {activeTab === "report" && (
        <div className="p-6 rounded-3xl bg-white border border-slate-900 shadow-sm space-y-5 print:border-none print:shadow-none">
          <div className="flex justify-between items-start border-b-2 border-slate-900 pb-3">
            <div>
              <div className="text-base font-black text-slate-900 font-mono">NIRT ENERGIES PRIVATE LIMITED</div>
              <div className="text-[10px] text-slate-500 font-mono">Mobile Field Inspection & Customer Sign-off Certificate</div>
            </div>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-emerald-100 text-emerald-800 border border-emerald-300">
              PHYSICALLY VERIFIED ✓
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs font-mono">
            <div>Project ID: <strong>NIRT-26-0042</strong></div>
            <div>Customer: <strong>K. Sengottaiyan</strong></div>
            <div>Site Terrace: <strong>Fairlands, Salem</strong></div>
            <div>GPS Coords: <strong>{gpsData.lat}° N, {gpsData.lng}° E</strong></div>
            <div>Earthing Test: <strong className="text-emerald-700">3.4 Ω (Pass &lt; 5.0 Ω)</strong></div>
            <div>System Capacity: <strong>5.4 kWp TOPCon</strong></div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 text-xs space-y-2">
            <span className="font-bold text-slate-900 block text-[11px] uppercase font-mono">
              On-Site Customer Declaration & Verification
            </span>
            <p className="text-slate-700 text-xs leading-relaxed italic">
              "I hereby confirm that the rooftop solar structure assembly, module fastening, and inverter wiring have been completed satisfactorily to the sanctioned capacity without any roof leakage or terrace damage."
            </p>
            <div className="flex justify-between items-end pt-4 font-mono text-[11px]">
              <div>
                <span className="text-slate-400 block text-[9px]">FIELD ENGINEER SIGN:</span>
                <strong>M. Saravanan (EPC Lead)</strong>
              </div>
              <div className="text-right">
                <span className="text-slate-400 block text-[9px]">CUSTOMER OTP SIGN:</span>
                <strong className="text-emerald-700">VERIFIED VIA OTP (9842178234) ✓</strong>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-2">
            <button
              onClick={() => window.print()}
              className="apple-button px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Official Handover Slip</span>
            </button>
          </div>
        </div>
      )}

      {/* MODAL 1: CUSTOMER DISCUSSION */}
      <CustomerDiscussionModal
        isOpen={isDiscussionModalOpen}
        prefilledProject={selectedProject}
        onClose={() => setIsDiscussionModalOpen(false)}
        onSubmitDiscussion={handleAddDiscussion}
      />

      {/* MODAL 2: INSTALLATION PROGRESS */}
      <InstallationProgressModal
        isOpen={isInstallModalOpen}
        project={selectedProject}
        onClose={() => setIsInstallModalOpen(false)}
        onUpdateMilestones={handleUpdateInstallation}
      />

    </div>
  );
}
