import React, { useState } from "react";
import { 
  X, CheckCircle2, Camera, Upload, Wrench, 
  MapPin, Clock, ShieldCheck, Zap, AlertCircle
} from "lucide-react";
import Portal from "@/components/Portal";
import { INITIAL_INSTALLATION_CHECKLIST } from "@/data/fieldOperationsData";

export default function InstallationProgressModal({
  isOpen,
  project,
  onClose,
  onUpdateMilestones
}) {
  const [checklist, setChecklist] = useState(INITIAL_INSTALLATION_CHECKLIST);
  const [earthReading, setEarthReading] = useState("3.4");
  const [photoPreview, setPhotoPreview] = useState(null);
  const [engineerNotes, setEngineerNotes] = useState("");

  if (!isOpen || !project) return null;

  const toggleStatus = (id) => {
    setChecklist(prev => prev.map(item => {
      if (item.id === id) {
        const nextStatus = item.status === "Completed" ? "In Progress" : "Completed";
        return {
          ...item,
          status: nextStatus,
          completedDate: nextStatus === "Completed" ? new Date().toLocaleDateString("en-IN") : null
        };
      }
      return item;
    }));
  };

  const handleFileCapture = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setPhotoPreview(url);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (onUpdateMilestones) {
      onUpdateMilestones({
        checklist,
        earthReading: `${earthReading} Ω`,
        photoPreview,
        engineerNotes
      });
    }
    onClose();
  };

  const completedCount = checklist.filter(c => c.status === "Completed").length;
  const progressPercent = Math.round((completedCount / checklist.length) * 100);

  return (
    <Portal>
      <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 animate-in fade-in duration-150">
        <div className="bg-white rounded-3xl border border-slate-200 max-w-xl w-full p-6 sm:p-7 shadow-2xl space-y-5 max-h-[92vh] overflow-y-auto">
          
          {/* Header */}
          <div className="flex justify-between items-start border-b border-slate-100 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                  Section 32 • Installation Update
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                  {progressPercent}% Complete
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-1">
                Field Installation Milestones & Testing
              </h3>
              <p className="text-xs text-slate-500 font-mono">
                {project.customerName} ({project.id}) • {project.capacityKw} kWp Rooftop Plant
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
            
            {/* 6 Milestones Checklist */}
            <div className="space-y-2">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 font-mono block">
                Tap Milestone to Toggle Completion
              </span>
              <div className="space-y-2">
                {checklist.map(item => {
                  const isDone = item.status === "Completed";
                  const isInProg = item.status === "In Progress";

                  return (
                    <div
                      key={item.id}
                      onClick={() => toggleStatus(item.id)}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isDone 
                          ? "bg-emerald-50/70 border-emerald-200 text-emerald-950 font-semibold"
                          : isInProg
                          ? "bg-blue-50/50 border-blue-200 text-blue-900"
                          : "bg-white border-slate-200 text-slate-600 hover:bg-slate-50"
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <div className="font-bold text-xs">{item.name}</div>
                        <div className="text-[10px] text-slate-500 truncate mt-0.5">{item.desc}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono shrink-0 ${
                        isDone ? "bg-emerald-100 text-emerald-800"
                          : isInProg ? "bg-blue-100 text-blue-800 animate-pulse"
                          : "bg-slate-100 text-slate-500"
                      }`}>
                        {item.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Earthing Pit Test (<5.0 Ohms Requirement) */}
            <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-3 items-center">
              <div>
                <label className="font-bold text-slate-800 block mb-0.5">
                  Earthing Pit Resistance Reading
                </label>
                <span className="text-[10px] text-slate-400 font-mono block">TANGEDCO Standard: &lt; 5.0 Ω</span>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="number"
                  step="0.1"
                  value={earthReading}
                  onChange={(e) => setEarthReading(e.target.value)}
                  className="w-24 px-3 py-1.5 rounded-xl border border-slate-200 bg-white text-slate-900 font-mono font-bold text-sm"
                />
                <span className="text-xs font-bold text-slate-700">Ohms (Ω)</span>
                {parseFloat(earthReading) < 5.0 && (
                  <span className="text-[10px] text-emerald-700 font-mono font-bold bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded">
                    PASS ✓
                  </span>
                )}
              </div>
            </div>

            {/* Mobile Camera Upload */}
            <div>
              <label className="font-bold text-slate-700 block mb-1">
                Capture / Upload On-Site Installation Photo
              </label>
              <label className="border-2 border-dashed border-slate-200 rounded-2xl p-4 flex flex-col items-center justify-center cursor-pointer hover:bg-slate-50 transition-colors">
                <Camera className="w-6 h-6 text-slate-400 mb-1" />
                <span className="text-xs font-semibold text-slate-700">Tap to Take Photo or Browse</span>
                <span className="text-[10px] text-slate-400 mt-0.5">Direct rear camera trigger on mobile</span>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleFileCapture}
                  className="hidden"
                />
              </label>
              {photoPreview && (
                <div className="mt-2 relative w-24 h-24 rounded-xl overflow-hidden border border-slate-200">
                  <img src={photoPreview} alt="Installation capture" className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-mono text-center py-0.5">
                    GPS Stamped
                  </span>
                </div>
              )}
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
                <span>Save Installation Progress</span>
              </button>
            </div>

          </form>
        </div>
      </div>
    </Portal>
  );
}
