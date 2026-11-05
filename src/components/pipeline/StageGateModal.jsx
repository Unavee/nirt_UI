"use client";

import { useState, useEffect } from "react";
import Portal from "@/components/Portal";
import { X, Lock, CheckCircle2, ArrowRight } from "lucide-react";

export default function StageGateModal({
  isOpen,
  project,
  targetStage,
  onClose,
  onConfirmAdvance
}) {
  const [checkedFields, setCheckedFields] = useState({});
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    if (isOpen && targetStage) {
      setIsMounted(true);
      const initialChecked = {};
      (targetStage.mandatoryFields || []).forEach((field) => {
        initialChecked[field] = false;
      });
      setCheckedFields(initialChecked);
    } else {
      setIsMounted(false);
    }
  }, [isOpen, targetStage]);

  if (!isOpen || !project || !targetStage) return null;

  const toggleField = (field) => {
    setCheckedFields((prev) => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const allMandatoryChecked =
    (targetStage.mandatoryFields || []).length > 0 &&
    targetStage.mandatoryFields.every((f) => checkedFields[f] === true);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!allMandatoryChecked) return;
    onConfirmAdvance(project, targetStage);
    onClose();
  };

  return (
    <Portal>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-[9999] p-4 transition-opacity duration-150">
        <div
          className={`bg-white border border-zinc-300 max-w-lg w-full p-6 shadow-2xl space-y-4 rounded-none transform transition-[transform,opacity] duration-180 ease-out ${
            isMounted ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
          style={{ transformOrigin: "center" }}
        >
          {/* Header */}
          <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
            <div>
              <div className="flex items-center space-x-2">
                <span className="text-[10px] font-mono bg-black text-white font-bold px-2 py-0.5 uppercase tracking-wider">
                  Stage Gatekeeper Checkpoint
                </span>
                <span className="text-[10px] font-mono text-zinc-500">
                  Step {targetStage.stepNumber || "Next"}
                </span>
              </div>
              <h3 className="font-bold text-base text-zinc-950 mt-1">
                Advance to: {targetStage.title}
              </h3>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="text-zinc-400 hover:text-black p-1 transition-colors active:scale-[0.95]"
              title="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="p-3 bg-zinc-50 border border-zinc-200 text-xs font-mono space-y-1">
            <div className="flex justify-between text-zinc-600">
              <span>Project ID: <strong className="text-black">{project.id}</strong></span>
              <span>Circle: <strong className="text-black">{project.district}</strong></span>
            </div>
            <div className="text-zinc-700 font-bold">
              Customer: {project.customerName}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-zinc-900 flex items-center space-x-1.5">
                  <Lock className="w-3.5 h-3.5 text-zinc-500" />
                  <span>Mandatory Deliverables Before Advancing:</span>
                </span>
                <span className="text-[10px] font-mono font-bold text-zinc-500">
                  {Object.values(checkedFields).filter(Boolean).length}/{(targetStage.mandatoryFields || []).length} Satisfied
                </span>
              </div>

              <div className="space-y-2 max-h-60 overflow-y-auto p-1">
                {(targetStage.mandatoryFields || []).map((field) => {
                  const isChecked = checkedFields[field] || false;
                  return (
                    <label
                      key={field}
                      onClick={() => toggleField(field)}
                      className={`flex items-start space-x-2.5 p-2.5 border cursor-pointer transition-all rounded-none ${
                        isChecked
                          ? "bg-zinc-50 border-black shadow-2xs"
                          : "bg-white border-zinc-200 hover:border-zinc-300"
                      }`}
                    >
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => {}}
                        className="w-4 h-4 mt-0.5 rounded-none text-black focus:ring-black"
                      />
                      <span className={`text-xs ${isChecked ? "text-zinc-950 font-bold" : "text-zinc-700 font-medium"}`}>
                        {field}
                      </span>
                    </label>
                  );
                })}
              </div>
            </div>

            {targetStage.automation && (
              <p className="text-[10px] font-mono text-zinc-500 p-2 bg-zinc-50 border border-zinc-200">
                <strong>Automation Trigger:</strong> {targetStage.automation}
              </p>
            )}

            {/* Modal Footer */}
            <div className="pt-3 border-t border-zinc-200 flex justify-between items-center">
              <span className="text-[10px] font-mono text-zinc-500">
                {allMandatoryChecked ? "All gate requirements verified ✓" : "Check all items to enable advance"}
              </span>

              <div className="flex space-x-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="border border-zinc-300 px-4 py-2 text-xs font-bold text-zinc-700 hover:bg-zinc-100 rounded-none active:scale-[0.97] transition-transform duration-150"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!allMandatoryChecked}
                  className={`px-5 py-2 text-xs font-bold text-white rounded-none transition-transform active:scale-[0.97] flex items-center space-x-1.5 duration-150 ${
                    allMandatoryChecked
                      ? "bg-black hover:bg-zinc-800 cursor-pointer shadow-xs"
                      : "bg-zinc-300 cursor-not-allowed"
                  }`}
                >
                  <span>Advance Stage</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Portal>
  );
}
