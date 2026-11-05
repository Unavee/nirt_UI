import React, { useState, useEffect } from "react";
import { X, UploadCloud, FileText, CheckCircle2, AlertCircle, ArrowUpRight } from "lucide-react";
import { DOCUMENT_CATEGORIES } from "../../data/projectDocumentsData";

export default function DocumentUploadModal({
  isOpen,
  onClose,
  onUploadSuccess,
  defaultCategory = "customer",
  targetDocument = null,
  projectId = "NIRT-26-0042"
}) {
  const isVersionUpdate = !!targetDocument;

  // Calculate next version string e.g. v1.2 -> v1.3
  const calculateNextVersion = (currentVer) => {
    if (!currentVer) return "v1.1";
    const match = currentVer.match(/v(\d+)\.(\d+)/);
    if (match) {
      const major = match[1];
      const minor = parseInt(match[2], 10) + 1;
      return `v${major}.${minor}`;
    }
    return `${currentVer}.1`;
  };

  const nextVersion = isVersionUpdate ? calculateNextVersion(targetDocument.version) : "v1.0";

  const [category, setCategory] = useState(
    isVersionUpdate ? targetDocument.category : defaultCategory
  );
  const [docName, setDocName] = useState(
    isVersionUpdate ? targetDocument.name : ""
  );
  const [version, setVersion] = useState(nextVersion);
  const [uploader, setUploader] = useState("Rajkumar S (Sales Lead)");
  const [revisionReason, setRevisionReason] = useState("");
  const [selectedFileName, setSelectedFileName] = useState("");
  const [fileSize, setFileSize] = useState("");
  const [status, setStatus] = useState("Verified");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (isOpen) {
      if (targetDocument) {
        setCategory(targetDocument.category);
        setDocName(targetDocument.name);
        setVersion(calculateNextVersion(targetDocument.version));
        setRevisionReason("");
        setSelectedFileName("");
        setError("");
      } else {
        setCategory(defaultCategory);
        setDocName("");
        setVersion("v1.0");
        setRevisionReason("");
        setSelectedFileName("");
        setError("");
      }
    }
  }, [isOpen, targetDocument, defaultCategory]);

  if (!isOpen) return null;

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFileName(file.name);
      const sizeMb = (file.size / (1024 * 1024)).toFixed(1);
      setFileSize(`${sizeMb > 0 ? sizeMb : "0.5"} MB`);
      if (!docName && !isVersionUpdate) {
        // Auto populate title from filename
        const cleanName = file.name.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ");
        setDocName(cleanName.charAt(0).toUpperCase() + cleanName.slice(1));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!docName.trim()) {
      setError("Please enter a document name / title.");
      return;
    }
    if (isVersionUpdate && !revisionReason.trim()) {
      setError("Please provide a reason / summary for this revision.");
      return;
    }

    setIsSubmitting(true);
    setError("");

    // Simulate upload delay
    setTimeout(() => {
      const now = new Date();
      const dateStr = `${now.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}, ${now.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })} IST`;

      const categoryObj = DOCUMENT_CATEGORIES.find((c) => c.id === category);

      if (isVersionUpdate) {
        const newVersionEntry = {
          version: version,
          date: dateStr,
          author: uploader,
          reason: revisionReason,
          size: fileSize || "2.4 MB"
        };

        const updatedDoc = {
          ...targetDocument,
          version: version,
          hasVersions: true,
          date: dateStr,
          uploadedBy: uploader,
          fileName: selectedFileName || targetDocument.fileName,
          fileSize: fileSize || targetDocument.fileSize,
          versions: [newVersionEntry, ...(targetDocument.versions || [])]
        };

        onUploadSuccess({ type: "UPDATE_VERSION", doc: updatedDoc });
      } else {
        const newDoc = {
          id: `DOC-${category.toUpperCase().slice(0, 4)}-${Math.floor(100 + Math.random() * 900)}`,
          projectId: projectId,
          category: category,
          categoryLabel: categoryObj?.label || "Project Document",
          name: docName,
          fileName: selectedFileName || `${docName.toLowerCase().replace(/\s+/g, "_")}.pdf`,
          fileSize: fileSize || "1.5 MB",
          status: status,
          version: version,
          hasVersions: false,
          uploadedBy: uploader,
          date: dateStr,
          sha256: "a9b8c7d6e5f4a3b2c1d0e9f8a7b6c5d4e3f2a1b0",
          versions: [
            {
              version: version,
              date: dateStr,
              author: uploader,
              reason: revisionReason || "Initial document upload",
              size: fileSize || "1.5 MB"
            }
          ]
        };

        onUploadSuccess({ type: "CREATE_DOCUMENT", doc: newDoc });
      }

      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-xl overflow-hidden max-h-[92vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <UploadCloud className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                {isVersionUpdate ? "Upload New Version" : "Upload Project Document"}
              </h3>
              <p className="text-xs text-slate-500">
                Digitally archived under Project ID <strong className="text-blue-700">{projectId}</strong>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-4 flex-1">
          {error && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {isVersionUpdate && (
            <div className="p-3.5 bg-blue-50/70 border border-blue-200 rounded-xl">
              <div className="text-xs font-semibold text-blue-900">
                Updating: {targetDocument.name}
              </div>
              <div className="text-xs text-blue-700 mt-0.5 flex items-center gap-2">
                <span>Current: <strong>{targetDocument.version}</strong></span>
                <span>&rarr;</span>
                <span className="font-bold text-emerald-700">Next Revision: {nextVersion}</span>
              </div>
            </div>
          )}

          {/* Category Dropdown (11 categories) */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Category (Section 30)
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              disabled={isVersionUpdate}
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {DOCUMENT_CATEGORIES.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.label}
                </option>
              ))}
            </select>
          </div>

          {/* Document Title */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Document Title / Name *
            </label>
            <input
              type="text"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
              placeholder="e.g. Approved Single Line Diagram (SLD)"
              className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3 py-2.5 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          {/* Version & Author row */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Version Tag
              </label>
              <input
                type="text"
                value={version}
                onChange={(e) => setVersion(e.target.value)}
                placeholder="v1.0"
                className="w-full text-xs font-semibold bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Uploaded By
              </label>
              <input
                type="text"
                value={uploader}
                onChange={(e) => setUploader(e.target.value)}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Mandatory Revision Reason if updating version */}
          {isVersionUpdate && (
            <div>
              <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Revision Change Summary / Reason *
              </label>
              <textarea
                value={revisionReason}
                onChange={(e) => setRevisionReason(e.target.value)}
                rows={2}
                placeholder="Detail what changed (e.g. updated inverter model to Growatt 5kW after DISCOM inspection)..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-xl p-3 text-slate-800 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          )}

          {/* File Picker / Dropzone */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Select Digital File
            </label>
            <div className="border-2 border-dashed border-slate-300 hover:border-blue-400 rounded-2xl p-4 text-center transition-colors bg-slate-50/50 hover:bg-blue-50/20">
              <input
                type="file"
                id="doc-file-input"
                className="hidden"
                onChange={handleFileChange}
                accept=".pdf,.dwg,.dxf,.png,.jpg,.jpeg,.xlsx,.csv,.doc,.docx"
              />
              <label
                htmlFor="doc-file-input"
                className="cursor-pointer flex flex-col items-center justify-center space-y-1"
              >
                <div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mb-1">
                  <UploadCloud className="w-5 h-5" />
                </div>
                <span className="text-xs font-semibold text-blue-600 hover:text-blue-700">
                  {selectedFileName ? selectedFileName : "Click to browse or drag file here"}
                </span>
                <span className="text-[11px] text-slate-400">
                  PDF, DWG, CAD, JPG, PNG or XLSX up to 25 MB
                </span>
              </label>
            </div>
          </div>

          {/* Verification Status */}
          <div className="flex items-center justify-between p-3 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <div className="text-xs font-bold text-slate-700">Verification State</div>
              <div className="text-[11px] text-slate-500">Flag whether document has passed QA/compliance check</div>
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="text-xs font-semibold px-2.5 py-1.5 bg-white border border-slate-300 rounded-lg text-slate-800"
            >
              <option value="Verified">Verified</option>
              <option value="Pending Review">Pending Review</option>
              <option value="Awaiting DISCOM Sign">Awaiting DISCOM Sign</option>
            </select>
          </div>

          {/* Footer Actions */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="px-4 py-2.5 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>Archiving...</span>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isVersionUpdate ? "Save Revision" : "Archive Document"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
