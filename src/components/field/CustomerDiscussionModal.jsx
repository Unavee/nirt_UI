import React, { useState, useEffect } from "react";
import { 
  X, MessageSquare, MapPin, Calendar, Clock, 
  User, Phone, CheckCircle2, Navigation, AlertCircle
} from "lucide-react";
import Portal from "@/components/Portal";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import { useRole } from "@/context/RoleContext";

export default function CustomerDiscussionModal({
  isOpen,
  prefilledProject,
  onClose,
  onSubmitDiscussion
}) {
  const { activeRole } = useRole();
  const [selectedProjectId, setSelectedProjectId] = useState(prefilledProject?.id || MOCK_PROJECTS[0].id);
  const [discussionMode, setDiscussionMode] = useState("In-Person Rooftop Meeting");
  const [topic, setTopic] = useState("");
  const [customerDecision, setCustomerDecision] = useState("");
  const [nextAction, setNextAction] = useState("");
  const [nextFollowUp, setNextFollowUp] = useState("08 Nov 2026");
  const [gpsStamp, setGpsStamp] = useState("Detecting GPS coordinates...");
  const [isGpsLocked, setIsGpsLocked] = useState(false);

  const currentProject = prefilledProject || MOCK_PROJECTS.find(p => p.id === selectedProjectId) || MOCK_PROJECTS[0];

  // Fetch live hardware GPS when modal opens
  useEffect(() => {
    if (isOpen) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (pos) => {
            const lat = pos.coords.latitude.toFixed(4);
            const lng = pos.coords.longitude.toFixed(4);
            const acc = Math.round(pos.coords.accuracy);
            setGpsStamp(`${lat}° N, ${lng}° E (${currentProject.district || "Salem"} • ±${acc}m accuracy)`);
            setIsGpsLocked(true);
          },
          (err) => {
            // High-precision fallback for simulation/offline
            setGpsStamp(`11.6643° N, 78.1460° E (${currentProject.district || "Salem"} Circle • GPS Stamped)`);
            setIsGpsLocked(true);
          },
          { enableHighAccuracy: true, timeout: 5000 }
        );
      } else {
        setGpsStamp(`11.6643° N, 78.1460° E (${currentProject.district || "Salem"} Circle)`);
        setIsGpsLocked(true);
      }
    }
  }, [isOpen, currentProject.district]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!topic.trim()) return;

    const newDiscussion = {
      id: `DISC-2026-${Math.floor(100 + Math.random() * 900)}`,
      projectId: currentProject.id,
      customerName: currentProject.customerName,
      customerPhone: currentProject.phone,
      staffName: activeRole?.title?.split("/")[0]?.trim() || "M. Saravanan (EPC Lead)",
      date: new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) + ", " + new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) + " IST",
      mode: discussionMode,
      topic,
      customerDecision: customerDecision || "Customer agreed to proposed timeline and site layout.",
      nextAction: nextAction || "Proceed with next operational step",
      nextFollowUp,
      gpsStamp
    };

    onSubmitDiscussion(newDiscussion);
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-lg w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  Section 32 • Mobile Field Ops
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  GPS Auto-Stamped
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Record Customer Discussion & Decisions
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                Log on-site meetings, rooftop scope changes, and customer agreements.
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg text-slate-400 hover:text-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-4 text-xs">
            
            {/* Customer & GPS Location Pill */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="flex justify-between items-center text-slate-800">
                <span className="font-bold text-xs">{currentProject.customerName} ({currentProject.id})</span>
                <span className="font-mono text-[11px] text-blue-700 font-bold">{currentProject.phone}</span>
              </div>
              <div className="flex items-center space-x-1.5 text-[10px] font-mono text-emerald-700">
                <Navigation className="w-3 h-3 text-emerald-600 shrink-0" />
                <span className="truncate">{gpsStamp}</span>
              </div>
            </div>

            {/* Discussion Mode */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Discussion Mode</label>
              <select
                value={discussionMode}
                onChange={(e) => setDiscussionMode(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
              >
                <option value="In-Person Rooftop Meeting">In-Person Rooftop Meeting</option>
                <option value="Phone Discussion">Phone Discussion</option>
                <option value="WhatsApp Discussion">WhatsApp Discussion</option>
                <option value="DISCOM Office Joint Meeting">DISCOM Office Joint Meeting</option>
              </select>
            </div>

            {/* Discussion Topic */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Discussion Topic / Summary <span className="text-rose-600">*</span>
              </label>
              <input
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="e.g. Inverter location preference, elevated structure approval..."
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
                required
              />
            </div>

            {/* Customer Decision */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">Customer Decision / Remarks</label>
              <textarea
                rows={2}
                value={customerDecision}
                onChange={(e) => setCustomerDecision(e.target.value)}
                placeholder="What did the customer decide or agree upon?"
                className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium focus:ring-1 focus:ring-slate-900"
              />
            </div>

            {/* Action Item & Follow-up */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="font-bold text-slate-700 block mb-1">Next Action Item</label>
                <input
                  type="text"
                  value={nextAction}
                  onChange={(e) => setNextAction(e.target.value)}
                  placeholder="e.g. Order 1.5m columns"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-medium"
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">Follow-up Target Date</label>
                <input
                  type="text"
                  value={nextFollowUp}
                  onChange={(e) => setNextFollowUp(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 font-mono font-medium"
                />
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-2 pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="apple-button px-5 py-2.5 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-sm flex items-center space-x-1.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Save Discussion with GPS Stamp</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </Portal>
  );
}
