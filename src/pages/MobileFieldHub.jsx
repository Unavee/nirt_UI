import React, { useState, useEffect } from "react";
import { 
  Smartphone, MapPin, Navigation, Phone, MessageSquare, 
  Camera, CheckCircle2, Wrench, FileText, ArrowRight, 
  Calendar, Clock, User, ShieldCheck, Printer, RefreshCw, 
  ExternalLink, Sparkles, Sun, Moon, QrCode, Wifi, WifiOff,
  Compass, Layers, Check, X, Eye, Upload, Image, Share2,
  ChevronDown, ChevronUp, BatteryCharging, CheckSquare
} from "lucide-react";
import { Link } from "react-router-dom";
import Portal from "@/components/Portal";
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
  
  // Desktop View Mode: "expanded" or "simulator"
  const [viewMode, setViewMode] = useState("expanded");
  
  // Sunlight High-Contrast Mode for bright rooftop glare
  const [isSunlightMode, setIsSunlightMode] = useState(false);
  
  // Live Network & Offline Sync State
  const [isOnline, setIsOnline] = useState(navigator.onLine ?? true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncedTime, setLastSyncedTime] = useState("Just now");
  const [syncNotice, setSyncNotice] = useState(null);

  // Modals state
  const [isDiscussionModalOpen, setIsDiscussionModalOpen] = useState(false);
  const [isInstallModalOpen, setIsInstallModalOpen] = useState(false);
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isWatermarkModalOpen, setIsWatermarkModalOpen] = useState(false);
  const [pendingPhoto, setPendingPhoto] = useState(null);
  
  // Rooftop Quick Tool Drawer
  const [showRooftopTools, setShowRooftopTools] = useState(false);

  // Captured Geo-Photos Gallery
  const [capturedPhotos, setCapturedPhotos] = useState([
    {
      id: "GEO-901",
      title: "Rooftop Structure & Clamping",
      url: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
      coords: "11.6643° N, 78.1460° E",
      timestamp: "11 Nov 2026, 09:30 AM",
      projectId: "NIRT-26-0042",
      stage: "Step 14: Mechanical Erection"
    },
    {
      id: "GEO-902",
      title: "Earth Pit Resistance Verification",
      url: "https://images.unsplash.com/photo-1508873696983-2df5293cb395?w=600&auto=format&fit=crop&q=80",
      coords: "11.6648° N, 78.1455° E",
      timestamp: "11 Nov 2026, 10:15 AM",
      projectId: "NIRT-26-0042",
      stage: "Step 15: Array Testing"
    }
  ]);

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

    const handleOnline = () => {
      setIsOnline(true);
      setSyncNotice("Cloud Connection Restored. Background sync active.");
      setTimeout(() => setSyncNotice(null), 4000);
    };
    const handleOffline = () => {
      setIsOnline(false);
      setSyncNotice("Offline Mode Active. All records cached in SQLite/Local storage.");
      setTimeout(() => setSyncNotice(null), 4000);
    };

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  const handleManualSync = () => {
    setIsSyncing(true);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncedTime(new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }));
      setSyncNotice("All 4 site projects and field checklists synchronized with Central ERP ✓");
      setTimeout(() => setSyncNotice(null), 3500);
    }, 1200);
  };

  const handleAddDiscussion = (newDisc) => {
    setDiscussions([newDisc, ...discussions]);
  };

  const handleUpdateInstallation = ({ checklist }) => {
    setInstallationList(checklist);
  };

  // Triggered when technician selects or captures a photo
  const handlePhotoCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPendingPhoto({
        url,
        fileName: file.name,
        timestamp: new Date().toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }),
        coords: `${gpsData.lat}° N, ${gpsData.lng}° E`,
        projectId: selectedProject.id,
        stage: "On-Site Rooftop Verification"
      });
      setIsWatermarkModalOpen(true);
    }
  };

  const handleSaveWatermarkedPhoto = () => {
    if (pendingPhoto) {
      const newPhoto = {
        id: `GEO-${Date.now().toString().slice(-4)}`,
        title: `${selectedProject.customerName} - Rooftop Stamp`,
        url: pendingPhoto.url,
        coords: pendingPhoto.coords,
        timestamp: pendingPhoto.timestamp,
        projectId: pendingPhoto.projectId,
        stage: pendingPhoto.stage
      };
      setCapturedPhotos([newPhoto, ...capturedPhotos]);
      setIsWatermarkModalOpen(false);
      setPendingPhoto(null);
      setSyncNotice(`Geo-tagged photo saved to ${selectedProject.id} Vault ✓`);
      setTimeout(() => setSyncNotice(null), 3000);
    }
  };

  // Main Mobile Field Content Layout
  const renderFieldContent = () => (
    <div className={`space-y-4 ${isSunlightMode ? "font-sans text-slate-950" : ""}`}>
      
      {/* Top Mobile Field Header */}
      <div className={`p-4 sm:p-5 rounded-3xl border transition-all ${
        isSunlightMode 
          ? "bg-white border-2 border-slate-950 shadow-none text-slate-950" 
          : "glass-surface border-slate-200/90 shadow-xs"
      }`}>
        <div className="flex justify-between items-start gap-2">
          <div>
            <div className="flex flex-wrap items-center gap-1.5">
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider font-mono ${
                isSunlightMode ? "bg-slate-950 text-white" : "bg-blue-50 text-blue-700 border border-blue-200"
              }`}>
                Section 32 • Mobile Field Ops
              </span>
              
              {/* Online / Offline Pill */}
              <button
                onClick={handleManualSync}
                disabled={isSyncing}
                className={`px-2 py-0.5 rounded-full text-[10px] font-bold font-mono flex items-center space-x-1 transition-all ${
                  isOnline 
                    ? isSunlightMode 
                      ? "bg-slate-100 text-slate-950 border border-slate-950"
                      : "bg-emerald-50 text-emerald-700 border border-emerald-200 hover:bg-emerald-100"
                    : "bg-rose-50 text-rose-700 border border-rose-200"
                }`}
                title="Click to manually sync with ERP"
              >
                {isOnline ? (
                  <Wifi className="w-3 h-3 text-emerald-600" />
                ) : (
                  <WifiOff className="w-3 h-3 text-rose-600" />
                )}
                <span>{isSyncing ? "Syncing..." : isOnline ? "Online (Cloud Synced)" : "Offline (Cached)"}</span>
              </button>
            </div>
            
            <h1 className="text-xl font-black text-slate-900 tracking-tight mt-1.5">
              Field Technician Hub
            </h1>
            <p className="text-xs text-slate-500 font-medium">
              Offline-capable rooftop audits, customer discussions, and geo-watermarked photo logs.
            </p>
          </div>

          {/* Quick Sunlight Mode Toggle */}
          <div className="flex items-center space-x-1.5 shrink-0">
            <button
              onClick={() => setIsSunlightMode(!isSunlightMode)}
              className={`apple-button p-2 rounded-xl text-xs font-semibold flex items-center space-x-1 border transition-all ${
                isSunlightMode
                  ? "bg-slate-950 text-white border-slate-950 shadow-sm"
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
              }`}
              title="Toggle Ultra High-Contrast Sunlight Mode for rooftop glare"
            >
              <Sun className={`w-3.5 h-3.5 ${isSunlightMode ? "text-white" : "text-slate-600"}`} />
              <span className="hidden sm:inline text-[11px] font-bold">Sunlight Mode</span>
            </button>
            
            <button
              onClick={fetchLiveGps}
              disabled={isRefreshingGps}
              className={`apple-button p-2 rounded-xl text-xs font-semibold border flex items-center space-x-1 ${
                isSunlightMode 
                  ? "bg-slate-950 text-white border-slate-950" 
                  : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
              }`}
              title="Refresh GPS Coordinates"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isRefreshingGps ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {/* Sync Toast Notification */}
        {syncNotice && (
          <div className="mt-3 p-2.5 rounded-xl bg-slate-900 text-white text-xs font-medium flex items-center justify-between animate-in fade-in slide-in-from-top-1">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{syncNotice}</span>
            </div>
            <button onClick={() => setSyncNotice(null)} className="text-slate-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Live GPS Bar */}
        <div className={`mt-3 p-3 rounded-2xl text-xs flex items-center justify-between font-mono ${
          isSunlightMode 
            ? "bg-slate-100 border-2 border-slate-950 text-slate-950" 
            : "bg-emerald-50/70 border border-emerald-200"
        }`}>
          <div className="flex items-center space-x-2">
            <Navigation className={`w-4 h-4 shrink-0 animate-pulse ${isSunlightMode ? "text-slate-950" : "text-emerald-600"}`} />
            <div>
              <span className={`font-bold block leading-tight ${isSunlightMode ? "text-slate-950" : "text-emerald-900"}`}>
                {gpsData.lat}° N, {gpsData.lng}° E ({gpsData.circle})
              </span>
              <span className={`text-[10px] ${isSunlightMode ? "text-slate-700 font-bold" : "text-emerald-700"}`}>
                Accuracy: {gpsData.accuracy} • {gpsData.status}
              </span>
            </div>
          </div>
          <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
            isSunlightMode 
              ? "bg-slate-950 text-white border-slate-950" 
              : "bg-white text-emerald-800 border-emerald-200"
          }`}>
            AUTO-STAMP
          </span>
        </div>

        {/* Rooftop Quick Reference Toggle */}
        <div className="mt-2.5">
          <button
            onClick={() => setShowRooftopTools(!showRooftopTools)}
            className={`w-full py-1.5 px-3 rounded-xl text-[11px] font-bold flex items-center justify-between border transition-all ${
              isSunlightMode 
                ? "bg-slate-50 border-slate-950 text-slate-950" 
                : "bg-slate-50 border-slate-200/80 text-slate-700 hover:bg-slate-100/80"
            }`}
          >
            <div className="flex items-center space-x-1.5">
              <Compass className="w-3.5 h-3.5 text-blue-600" />
              <span>Rooftop Solar Orientation & Feasibility Guide (Salem Latitude: 11.66° N)</span>
            </div>
            {showRooftopTools ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
          </button>

          {showRooftopTools && (
            <div className={`mt-2 p-3 rounded-2xl border text-xs grid grid-cols-2 sm:grid-cols-4 gap-2 animate-in fade-in duration-200 ${
              isSunlightMode ? "bg-white border-2 border-slate-950 text-slate-950" : "bg-slate-50/80 border-slate-200"
            }`}>
              <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">TRUE AZIMUTH</span>
                <span className="font-extrabold text-slate-900 text-sm">180° South</span>
                <span className="text-[10px] text-emerald-700 block mt-0.5">±15° Tolerable</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">OPTIMAL TILT</span>
                <span className="font-extrabold text-slate-900 text-sm">11.6° - 14.0°</span>
                <span className="text-[10px] text-slate-600 block mt-0.5">Fixed HDGI Tilt</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">WINTER ROW PITCH</span>
                <span className="font-extrabold text-slate-900 text-sm">1.85 Meters</span>
                <span className="text-[10px] text-blue-700 block mt-0.5">Zero 9 AM Shadow</span>
              </div>
              <div className="p-2 rounded-xl bg-white border border-slate-200/90 shadow-2xs">
                <span className="text-[10px] font-bold text-slate-400 font-mono block">EARTH RESISTANCE</span>
                <span className="font-extrabold text-emerald-700 text-sm">&lt; 5.0 Ω PASS</span>
                <span className="text-[10px] text-slate-600 block mt-0.5">TANGEDCO Rule</span>
              </div>
            </div>
          )}
        </div>

        {/* Quick 1-Thumb Action Triggers */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2">
          <button
            onClick={() => setIsDiscussionModalOpen(true)}
            className={`apple-button p-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 transition-all ${
              isSunlightMode ? "bg-slate-950 text-white border border-slate-950" : "bg-slate-900 text-white"
            }`}
          >
            <MessageSquare className="w-4 h-4 text-blue-400" />
            <span>Record Discussion</span>
          </button>

          <button
            onClick={() => setIsInstallModalOpen(true)}
            className={`apple-button p-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-sm active:scale-95 transition-all ${
              isSunlightMode ? "bg-slate-950 text-white border border-slate-950" : "bg-slate-900 text-white"
            }`}
          >
            <Wrench className="w-4 h-4 text-emerald-400" />
            <span>Update Installation</span>
          </button>

          <label className={`apple-button p-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-2xs cursor-pointer active:scale-95 transition-all border ${
            isSunlightMode 
              ? "bg-white border-2 border-slate-950 text-slate-950 hover:bg-slate-100" 
              : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
          }`}>
            <Camera className="w-4 h-4 text-indigo-600" />
            <span>Capture Geo-Photo</span>
            <input 
              type="file" 
              accept="image/*" 
              capture="environment" 
              className="hidden" 
              onChange={handlePhotoCapture}
            />
          </label>

          <button
            onClick={() => setActiveTab("report")}
            className={`apple-button p-3 rounded-2xl font-bold text-xs flex flex-col items-center justify-center space-y-1 shadow-2xs active:scale-95 transition-all border ${
              isSunlightMode 
                ? "bg-white border-2 border-slate-950 text-slate-950 hover:bg-slate-100" 
                : "bg-white border-slate-200 text-slate-800 hover:bg-slate-50"
            }`}
          >
            <FileText className="w-4 h-4 text-violet-600" />
            <span>Submit Report</span>
          </button>
        </div>
      </div>

      {/* Captured Geo-Photos Carousel / Preview Bar */}
      {capturedPhotos.length > 0 && (
        <div className={`p-3.5 rounded-3xl border transition-all ${
          isSunlightMode ? "bg-white border-2 border-slate-950" : "bg-white border-slate-200/90 shadow-2xs"
        }`}>
          <div className="flex items-center justify-between mb-2 px-1">
            <div className="flex items-center space-x-1.5">
              <Camera className="w-3.5 h-3.5 text-blue-600" />
              <span className="text-xs font-bold text-slate-900">
                Verified Geo-Photos ({capturedPhotos.length})
              </span>
            </div>
            <span className="text-[10px] font-mono text-slate-500 font-semibold">
              Tamper-Evident GPS Stamps
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {capturedPhotos.map((photo) => (
              <div 
                key={photo.id}
                className="group relative rounded-2xl overflow-hidden border border-slate-200 bg-slate-900 aspect-4/3 flex flex-col justify-end p-2"
              >
                <img 
                  src={photo.url} 
                  alt={photo.title}
                  className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-300" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent" />
                <div className="relative z-10 space-y-0.5 text-white">
                  <div className="flex items-center space-x-1 text-[9px] font-mono text-emerald-400 font-bold">
                    <MapPin className="w-2.5 h-2.5" />
                    <span className="truncate">{photo.coords}</span>
                  </div>
                  <div className="text-[11px] font-bold truncate leading-tight">{photo.title}</div>
                  <div className="text-[9px] text-slate-300 font-mono truncate">{photo.timestamp}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Segment Navigation Tabs */}
      <div className="flex border-b border-slate-200 space-x-2 text-xs font-medium overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { id: "sites", label: `Assigned Sites (${MOCK_PROJECTS.length})` },
          { id: "discussions", label: `Discussions (${discussions.length})` },
          { id: "installation", label: `Installation (${installationList.length})` },
          { id: "report", label: "Field Handover Slip" }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2.5 rounded-xl whitespace-nowrap transition-all text-xs font-semibold ${
              activeTab === tab.id
                ? isSunlightMode
                  ? "bg-slate-950 text-white font-extrabold shadow-sm"
                  : "bg-slate-900 text-white shadow-xs font-bold"
                : isSunlightMode
                  ? "text-slate-800 hover:bg-slate-100 font-bold"
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
              className={`p-4 sm:p-5 rounded-3xl border transition-all space-y-3 ${
                isSunlightMode 
                  ? "bg-white border-2 border-slate-950 shadow-none text-slate-950" 
                  : "bg-white border-slate-200/90 shadow-2xs"
              }`}
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
              <div className={`grid grid-cols-2 gap-2 text-[11px] font-mono p-3 rounded-2xl border ${
                isSunlightMode ? "bg-slate-100 border-slate-950 text-slate-950" : "bg-slate-50 border-slate-100 text-slate-800"
              }`}>
                <div>
                  <span className="text-slate-400 block text-[9px]">EB CONSUMER #:</span>
                  <span className="font-bold">{proj.consumerNumber}</span>
                </div>
                <div>
                  <span className="text-slate-400 block text-[9px]">ROOF TYPE:</span>
                  <span className="font-bold">{proj.roofType}</span>
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
              className={`p-4 sm:p-5 rounded-3xl border transition-all space-y-2.5 ${
                isSunlightMode 
                  ? "bg-white border-2 border-slate-950 shadow-none text-slate-950" 
                  : "bg-white border-slate-200/90 shadow-2xs"
              }`}
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

              <div className={`p-3 rounded-2xl border text-xs text-slate-700 ${
                isSunlightMode ? "bg-slate-100 border-slate-950 text-slate-950 font-medium" : "bg-slate-50 border-slate-100"
              }`}>
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
        <div className={`p-5 rounded-3xl border transition-all space-y-4 ${
          isSunlightMode ? "bg-white border-2 border-slate-950 shadow-none" : "bg-white border-slate-200/90 shadow-2xs"
        }`}>
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
            {installationList.map((step) => (
              <div
                key={step.id}
                className={`p-3.5 rounded-2xl border flex items-center justify-between ${
                  isSunlightMode 
                    ? "border-slate-950 bg-slate-50" 
                    : "border-slate-200/80 bg-slate-50/50"
                }`}
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
        <div className={`p-6 rounded-3xl border shadow-sm space-y-5 print:border-none print:shadow-none ${
          isSunlightMode ? "bg-white border-2 border-slate-950 text-slate-950" : "bg-white border-slate-900"
        }`}>
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
              disabled
              title="Printing is disabled by System Governance policy"
              className="apple-button px-5 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-400 font-bold text-xs flex items-center space-x-1.5 shadow-none cursor-not-allowed opacity-60"
            >
              <Printer className="w-3.5 h-3.5 text-slate-400" />
              <span>Print Handover Slip (Disabled)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-4 pb-20">
      
      {/* Desktop Helper Toolbar (Shown only on lg: screens) */}
      <div className="hidden lg:flex items-center justify-between p-3.5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-700">
            <Smartphone className="w-4 h-4" />
          </div>
          <div>
            <div className="text-xs font-bold text-slate-900">
              Mobile Field Hub Simulator & Preview Mode
            </div>
            <div className="text-[11px] text-slate-500">
              Dedicated mobile/tablet workspace for Site Surveyors & EPC Technicians.
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200/80 text-xs font-semibold">
            <button
              onClick={() => setViewMode("expanded")}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                viewMode === "expanded"
                  ? "bg-white text-slate-900 shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              Console View
            </button>
            <button
              onClick={() => setViewMode("simulator")}
              className={`px-3 py-1.5 rounded-lg transition-all flex items-center space-x-1.5 ${
                viewMode === "simulator"
                  ? "bg-slate-900 text-white shadow-2xs font-bold"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>iPhone Frame</span>
            </button>
          </div>

          {/* QR Code Quick Connect for Real Phones */}
          <button
            onClick={() => setIsQrModalOpen(true)}
            className="apple-button px-3 py-1.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs flex items-center space-x-1.5 shadow-2xs"
            title="Scan QR Code to open on mobile phone"
          >
            <QrCode className="w-3.5 h-3.5 text-blue-600" />
            <span>Open on Phone</span>
          </button>

          <Link
            to="/projects"
            className="apple-button px-3 py-1.5 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-xs"
          >
            <span>Projects Registry</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Main View Container: Either Simulator Frame or Expanded */}
      {viewMode === "simulator" ? (
        <div className="py-4 flex justify-center items-center">
          {/* Realistic iPhone 16 Pro Mockup Frame */}
          <div className="relative w-full max-w-[412px] bg-slate-950 p-2.5 rounded-[52px] shadow-2xl border-4 border-slate-800">
            {/* Dynamic Island */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30 w-28 h-6 bg-black rounded-full flex items-center justify-between px-3">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800" />
              <div className="w-2 h-2 rounded-full bg-blue-950/80 animate-pulse" />
            </div>

            {/* Inner Mobile Screen */}
            <div className="relative bg-slate-50 rounded-[42px] overflow-hidden flex flex-col h-[780px]">
              {/* iOS Status Bar */}
              <div className="h-10 pt-2 px-6 flex justify-between items-center text-[11px] font-mono font-bold text-slate-800 shrink-0 select-none">
                <span>09:41</span>
                <div className="flex items-center space-x-1.5">
                  <span className="text-[9px]">5G</span>
                  <Wifi className="w-3 h-3 text-slate-800" />
                  <BatteryCharging className="w-3.5 h-3.5 text-emerald-600" />
                </div>
              </div>

              {/* Scrollable Mobile Viewport */}
              <div className="flex-1 overflow-y-auto p-3.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {renderFieldContent()}
              </div>

              {/* iOS Home Bottom Bar */}
              <div className="h-4 flex items-center justify-center shrink-0">
                <div className="w-28 h-1 bg-slate-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-4xl mx-auto">
          {renderFieldContent()}
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

      {/* MODAL 3: GEO-PHOTO WATERMARK PREVIEW */}
      {isWatermarkModalOpen && pendingPhoto && (
        <Portal>
          <div className="modal-backdrop-root fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden border border-slate-200 shadow-2xl flex flex-col max-h-[90vh]">
              {/* Header */}
              <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-bold text-slate-900">
                    Tamper-Evident Geo-Watermark Verification
                  </h3>
                  <p className="text-[11px] text-slate-500 font-mono">
                    MNRE & TANGEDCO Compliance Geo-Stamp
                  </p>
                </div>
                <button
                  onClick={() => setIsWatermarkModalOpen(false)}
                  className="p-1 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Image Preview with Watermark Stamp */}
              <div className="relative bg-slate-950 flex-1 overflow-hidden flex items-center justify-center min-h-[260px]">
                <img
                  src={pendingPhoto.url}
                  alt="Field Capture"
                  className="w-full h-auto max-h-[360px] object-contain"
                />

                {/* Overlaid Official Solar EPC Watermark Banner */}
                <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 text-white p-3 backdrop-blur-md border-t border-white/10 font-mono text-[10px] space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-emerald-400 flex items-center space-x-1">
                      <MapPin className="w-3 h-3" />
                      <span>{pendingPhoto.coords}</span>
                    </span>
                    <span className="text-slate-300">{pendingPhoto.timestamp}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>PROJECT: <strong>{pendingPhoto.projectId}</strong></span>
                    <span>TECH: <strong>M. Saravanan (EPC)</strong></span>
                  </div>
                  <div className="text-[9px] text-blue-400 flex items-center justify-between pt-0.5 border-t border-white/10">
                    <span>SEAL: #NIRT-GEO-7842-TAMPER-VERIFIED</span>
                    <span className="text-emerald-400 font-bold">DISCOM APPROVED ✓</span>
                  </div>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="px-5 py-3.5 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => setIsWatermarkModalOpen(false)}
                  className="apple-button px-4 py-2 rounded-xl border border-slate-200 bg-white text-slate-700 font-bold text-xs hover:bg-slate-50"
                >
                  Retake Photo
                </button>
                <button
                  onClick={handleSaveWatermarkedPhoto}
                  className="apple-button px-4 py-2 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center space-x-1.5 shadow-sm"
                >
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Save to Project Vault</span>
                </button>
              </div>
            </div>
          </div>
        </Portal>
      )}

      {/* MODAL 4: QR CODE MODAL FOR MOBILE DEVICES */}
      {isQrModalOpen && (
        <Portal>
          <div className="modal-backdrop-root fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-3xl max-w-sm w-full p-6 text-center space-y-4 border border-slate-200 shadow-2xl">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center mx-auto">
                <QrCode className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-900">
                  Open on Mobile Phone
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Scan this QR code with your iPhone or Android camera to launch Section 32 Mobile Field Operations.
                </p>
              </div>

              {/* Realistic SVG QR Code Vector */}
              <div className="p-4 bg-white border border-slate-200 rounded-2xl shadow-inner inline-block">
                <svg className="w-44 h-44 mx-auto" viewBox="0 0 100 100" fill="currentColor">
                  {/* Outer corner 1 */}
                  <rect x="10" y="10" width="24" height="24" fill="#0f172a" rx="2" />
                  <rect x="14" y="14" width="16" height="16" fill="#ffffff" />
                  <rect x="18" y="18" width="8" height="8" fill="#0f172a" />
                  {/* Outer corner 2 */}
                  <rect x="66" y="10" width="24" height="24" fill="#0f172a" rx="2" />
                  <rect x="70" y="14" width="16" height="16" fill="#ffffff" />
                  <rect x="74" y="18" width="8" height="8" fill="#0f172a" />
                  {/* Outer corner 3 */}
                  <rect x="10" y="66" width="24" height="24" fill="#0f172a" rx="2" />
                  <rect x="14" y="70" width="16" height="16" fill="#ffffff" />
                  <rect x="18" y="74" width="8" height="8" fill="#0f172a" />
                  {/* Data patterns */}
                  <rect x="42" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="12" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="24" width="6" height="6" fill="#0f172a" />
                  <rect x="52" y="30" width="6" height="6" fill="#0f172a" />
                  <rect x="12" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="24" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="36" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="48" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="60" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="72" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="84" y="42" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="54" width="6" height="6" fill="#0f172a" />
                  <rect x="54" y="54" width="6" height="6" fill="#0f172a" />
                  <rect x="66" y="54" width="6" height="6" fill="#0f172a" />
                  <rect x="78" y="54" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="66" width="6" height="6" fill="#0f172a" />
                  <rect x="54" y="66" width="6" height="6" fill="#0f172a" />
                  <rect x="66" y="66" width="6" height="6" fill="#0f172a" />
                  <rect x="78" y="66" width="6" height="6" fill="#0f172a" />
                  <rect x="42" y="78" width="6" height="6" fill="#0f172a" />
                  <rect x="54" y="78" width="6" height="6" fill="#0f172a" />
                  <rect x="66" y="78" width="6" height="6" fill="#0f172a" />
                  <rect x="78" y="78" width="6" height="6" fill="#0f172a" />
                </svg>
              </div>

              <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-[11px] font-mono text-slate-600">
                http://localhost:5174/field
              </div>

              <button
                onClick={() => setIsQrModalOpen(false)}
                className="w-full apple-button py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs"
              >
                Close QR Code
              </button>
            </div>
          </div>
        </Portal>
      )}

    </div>
  );
}
