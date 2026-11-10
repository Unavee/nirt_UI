import React, { useState } from "react";
import { X, CheckCircle2, Clock, AlertCircle, Wrench, Calendar, User, FileText } from "lucide-react";
import { INSTALLATION_WORK_PACKAGES } from "@/data/installationData";

export default function UpdateInstallationModal({
  isOpen,
  onClose,
  installationData,
  onUpdateInstallation
}) {
  if (!isOpen || !installationData) return null;

  const [selectedPackageKey, setSelectedPackageKey] = useState("electrical_testing");
  const selectedPkgMeta = INSTALLATION_WORK_PACKAGES.find(p => p.key === selectedPackageKey) || INSTALLATION_WORK_PACKAGES[0];
  const currentStatus = installationData.workPackageStatuses?.[selectedPackageKey] || {
    status: "in_progress",
    progress: 50,
    completedAt: null,
    verifiedBy: "Er. K. Vasanth",
    remarks: ""
  };

  const [status, setStatus] = useState(currentStatus.status);
  const [progress, setProgress] = useState(currentStatus.progress);
  const [verifiedBy, setVerifiedBy] = useState(currentStatus.verifiedBy || "Er. K. Vasanth");
  const [completionDate, setCompletionDate] = useState(currentStatus.completedAt || new Date().toISOString().split("T")[0]);
  const [remarks, setRemarks] = useState(currentStatus.remarks || "");
  const [overallRemarks, setOverallRemarks] = useState(installationData.completionRemarks || "");

  const handlePackageChange = (key) => {
    setSelectedPackageKey(key);
    const pkg = installationData.workPackageStatuses?.[key] || {
      status: "pending",
      progress: 0,
      completedAt: null,
      verifiedBy: "Er. K. Vasanth",
      remarks: ""
    };
    setStatus(pkg.status);
    setProgress(pkg.progress);
    setVerifiedBy(pkg.verifiedBy || "Er. K. Vasanth");
    setCompletionDate(pkg.completedAt || new Date().toISOString().split("T")[0]);
    setRemarks(pkg.remarks || "");
  };

  const handleSave = (e) => {
    e.preventDefault();

    const updatedStatuses = {
      ...installationData.workPackageStatuses,
      [selectedPackageKey]: {
        status,
        progress: Number(progress),
        completedAt: status === "completed" ? completionDate : null,
        verifiedBy,
        remarks
      }
    };

    // Calculate weighted overall progress
    let totalWeight = 0;
    let earnedWeight = 0;
    INSTALLATION_WORK_PACKAGES.forEach(pkg => {
      totalWeight += pkg.weightage;
      const pkgProgress = updatedStatuses[pkg.key]?.progress || 0;
      earnedWeight += (pkgProgress * pkg.weightage) / 100;
    });
    const calculatedOverallProgress = Math.min(100, Math.round((earnedWeight / totalWeight) * 100));

    // Determine overall status
    let newOverallStatus = "in_progress";
    if (calculatedOverallProgress === 100) {
      newOverallStatus = "completed";
    } else if (calculatedOverallProgress > 85) {
      newOverallStatus = "pending_inspection";
    }

    const updatedInstallation = {
      ...installationData,
      overallProgress: calculatedOverallProgress,
      status: newOverallStatus,
      actualCompletionDate: calculatedOverallProgress === 100 ? (completionDate || new Date().toISOString().split("T")[0]) : null,
      completionRemarks: overallRemarks,
      workPackageStatuses: updatedStatuses
    };

    onUpdateInstallation(updatedInstallation);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[92vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center shadow-xs">
              <Wrench className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Update Installation Package Progress
              </h2>
              <p className="text-xs text-slate-500 font-mono">
                Project ID: {installationData.projectId} • {installationData.systemCapacity}
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
        <form onSubmit={handleSave} className="flex-1 overflow-y-auto p-6 space-y-5">
          {/* Work Package Selector */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Select Work Package / Sub-System
            </label>
            <select
              value={selectedPackageKey}
              onChange={(e) => handlePackageChange(e.target.value)}
              className="w-full text-xs font-semibold px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            >
              {INSTALLATION_WORK_PACKAGES.map((pkg, idx) => (
                <option key={pkg.key} value={pkg.key}>
                  {idx + 1}. {pkg.name} ({pkg.category} - {pkg.weightage}% Weight)
                </option>
              ))}
            </select>
            <p className="text-[11px] text-slate-500 mt-1.5 leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-100">
              ℹ️ {selectedPkgMeta.description}
            </p>
          </div>

          {/* Status & Progress Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status */}
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Package Status
              </label>
              <select
                value={status}
                onChange={(e) => {
                  const newSt = e.target.value;
                  setStatus(newSt);
                  if (newSt === "completed") setProgress(100);
                  if (newSt === "pending") setProgress(0);
                }}
                className="w-full text-xs font-medium px-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
              >
                <option value="pending">⏳ Pending (Not Started)</option>
                <option value="in_progress">⚙️ In Progress</option>
                <option value="completed">✅ Completed & Verified</option>
                <option value="issues_reported">⚠️ Issues / Snag Reported</option>
              </select>
            </div>

            {/* Progress Percentage */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                  Completion Progress
                </label>
                <span className="text-xs font-mono font-bold text-blue-700">
                  {progress}%
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={progress}
                onChange={(e) => {
                  const val = Number(e.target.value);
                  setProgress(val);
                  if (val === 100) setStatus("completed");
                  else if (val === 0) setStatus("pending");
                  else if (status !== "issues_reported") setStatus("in_progress");
                }}
                className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-blue-600"
              />
            </div>
          </div>

          {/* Verification Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Inspected & Verified By
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  value={verifiedBy}
                  onChange={(e) => setVerifiedBy(e.target.value)}
                  placeholder="e.g. Er. K. Vasanth"
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
                Completion / Log Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="date"
                  value={completionDate}
                  onChange={(e) => setCompletionDate(e.target.value)}
                  className="w-full text-xs pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 font-mono"
                />
              </div>
            </div>
          </div>

          {/* Checkpoint Reference */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Mandatory Engineering Checkpoints
            </label>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 space-y-2">
              {selectedPkgMeta.checkpoints.map((cp, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{cp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Package Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Package Field Remarks / Technical Observations
            </label>
            <textarea
              rows={2}
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              placeholder="e.g. Inclinometer tilt confirmed at 12°. Fasteners torqued to 38 Nm with torque paint markers."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Master Completion Remarks */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-2">
              Overall Project Installation Remarks
            </label>
            <textarea
              rows={2}
              value={overallRemarks}
              onChange={(e) => setOverallRemarks(e.target.value)}
              placeholder="Project Manager overall handover notes for Section 18 DISCOM inspection..."
              className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 bg-white text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>

          {/* Footer Actions */}
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
              <span>Save Progress</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
