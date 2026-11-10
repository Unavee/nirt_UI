import React from "react";
import { X, GitCommit, Download, Calendar, User, FileText, CheckCircle2, Shield, ArrowUpRight } from "lucide-react";

export default function DocumentVersionModal({ isOpen, onClose, document, onUploadNewVersion }) {
  if (!isOpen || !document) return null;

  const versions = document.versions || [
    {
      version: document.version || "v1.0",
      date: document.date || "Just now",
      author: document.uploadedBy || "System Admin",
      reason: "Initial version",
      size: document.fileSize || "1.0 MB"
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl overflow-hidden max-h-[90vh] flex flex-col">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-slate-200 flex items-center justify-between bg-slate-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <GitCommit className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700">
                  {document.categoryLabel || "Project Document"}
                </span>
                <span className="text-xs text-slate-500 font-mono">
                  ID: {document.id}
                </span>
              </div>
              <h3 className="text-base font-bold text-slate-900 mt-0.5">
                {document.name}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Active File Summary Box */}
          <div className="p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-blue-600" />
                <span className="text-sm font-semibold text-slate-900">
                  {document.fileName}
                </span>
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-600 text-white">
                  {document.version} Active
                </span>
              </div>
              <div className="text-xs text-slate-500 flex flex-wrap gap-x-4 gap-y-1">
                <span>Size: <strong className="text-slate-700">{document.fileSize}</strong></span>
                <span>Verification: <strong className="text-emerald-700">{document.status}</strong></span>
                {document.sha256 && (
                  <span className="font-mono text-[11px] text-slate-500 truncate max-w-xs" title={`SHA-256: ${document.sha256}`}>
                    SHA: {document.sha256.substring(0, 16)}...
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => {
                alert(`Simulating download for active version ${document.version} (${document.fileName})`);
              }}
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs font-semibold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50 rounded-lg shadow-sm transition-colors whitespace-nowrap self-start sm:self-auto"
            >
              <Download className="w-3.5 h-3.5" />
              Download Latest
            </button>
          </div>

          {/* Version History Timeline */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500">
                Revision History ({versions.length} Version{versions.length > 1 ? "s" : ""})
              </h4>
              <span className="text-xs text-slate-400">Section 30 Version Control</span>
            </div>

            <div className="relative pl-6 space-y-6 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200">
              {versions.map((ver, idx) => {
                const isCurrent = idx === 0;
                return (
                  <div key={idx} className="relative">
                    {/* Timeline Node Dot */}
                    <div
                      className={`absolute -left-[27px] top-1.5 w-4 h-4 rounded-full border-2 bg-white flex items-center justify-center ${
                        isCurrent
                          ? "border-blue-600 ring-4 ring-blue-100"
                          : "border-slate-300"
                      }`}
                    >
                      {isCurrent && <div className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                    </div>

                    {/* Version Card */}
                    <div
                      className={`p-4 rounded-xl border transition-all ${
                        isCurrent
                          ? "bg-white border-blue-200 shadow-sm ring-1 ring-blue-100/50"
                          : "bg-slate-50/70 border-slate-200"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <span
                              className={`text-xs font-bold px-2 py-0.5 rounded ${
                                isCurrent
                                  ? "bg-blue-100 text-blue-700"
                                  : "bg-slate-200 text-slate-700"
                              }`}
                            >
                              {ver.version}
                            </span>
                            {isCurrent && (
                              <span className="text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3 text-emerald-600" /> Current Production Copy
                              </span>
                            )}
                          </div>

                          <p className="text-sm font-medium text-slate-800 mt-2">
                            {ver.reason || "Updated documentation details"}
                          </p>
                        </div>

                        <button
                          onClick={() => {
                            alert(`Simulating archival download for ${ver.version} (${document.fileName})`);
                          }}
                          className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-100 rounded-lg transition-colors"
                          title={`Download ${ver.version}`}
                        >
                          <Download className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Version Meta */}
                      <div className="mt-3 pt-3 border-t border-slate-100 flex flex-wrap items-center gap-4 text-xs text-slate-500">
                        <span className="flex items-center gap-1.5">
                          <User className="w-3.5 h-3.5 text-slate-400" />
                          {ver.author}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-slate-400" />
                          {ver.date}
                        </span>
                        <span>Size: <strong className="text-slate-600">{ver.size || document.fileSize}</strong></span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 border-t border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            {/* <span>Cryptographic integrity verified</span> */}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-800 hover:bg-slate-200/60 rounded-xl transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                if (onUploadNewVersion) {
                  onUploadNewVersion(document);
                }
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-colors"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
              Upload Revision
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
