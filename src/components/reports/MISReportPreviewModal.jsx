import React, { useState } from "react";
import {
  X,
  Download,
  Printer,
  FileSpreadsheet,
  FileText,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowDown
} from "lucide-react";

export default function MISReportPreviewModal({ isOpen, onClose, report }) {
  if (!isOpen || !report) return null;

  const [downloadSuccess, setDownloadSuccess] = useState(false);

  React.useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  const handleExportCSV = () => {
    // Generate actual CSV content
    const headerLine = report.columns.join(",");
    const rowLines = report.sampleRows.map((row) =>
      row
        .map((val) => {
          const stringVal = String(val).replace(/"/g, '""');
          return `"${stringVal}"`;
        })
        .join(",")
    );
    const csvContent = "data:text/csv;charset=utf-8," + [headerLine, ...rowLines].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `NIRT_${report.title.replace(/\s+/g, "_")}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 2500);
  };

  const handlePrintPDF = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 w-screen h-screen z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-4xl max-h-[90vh] bg-white rounded-3xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col print:m-0 print:border-none print:shadow-none print:max-h-none">
        {/* Header */}
        <div className="shrink-0 flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50/80 print:hidden">
          <div className="flex items-center space-x-2.5">
            <div className="p-2 rounded-xl bg-blue-50 border border-blue-200 text-blue-700">
              <FileSpreadsheet className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-100 text-blue-800 font-mono">
                  MIS Report #{report.num}
                </span>
                <span className="text-xs text-slate-500 font-mono">{report.categoryLabel}</span>
              </div>
              <h3 className="text-base font-bold text-slate-900">
                {report.title}
              </h3>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPDF}
              className="p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
              title="Print / Save PDF"
            >
              <Printer className="w-4 h-4" />
            </button>
            <button
              onClick={onClose}
              aria-label="Close modal"
              className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Metadata Banner */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
            <div>
              <span className="text-slate-500 font-medium block">Report Scope & Purpose:</span>
              <p className="font-semibold text-slate-900 mt-0.5">
                {report.description}
              </p>
            </div>
            <div className="flex items-center space-x-3 shrink-0 font-mono">
              <span className="px-2.5 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold">
                Freq: {report.frequency}
              </span>
              <span className="px-2.5 py-1 rounded-xl bg-blue-50 border border-blue-200 text-blue-700 font-bold">
                {report.recordsCount} Active Records
              </span>
            </div>
          </div>

          {/* Table Data Preview */}
          <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
            <div className="px-4 py-2.5 bg-slate-100/70 border-b border-slate-200 flex items-center justify-between">
              <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider font-mono">
                Tabular Data Preview (Showing top {report.sampleRows.length} sample entries)
              </span>
              <span className="text-[10px] text-slate-500 font-mono">
                ISO 27001 Certified Export
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-600 font-mono text-[10px] uppercase border-b border-slate-200">
                  <tr>
                    {report.columns.map((col, idx) => (
                      <th key={idx} className="py-2.5 px-3 font-bold whitespace-nowrap">
                        {col}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {report.sampleRows.map((row, rIdx) => (
                    <tr key={rIdx} className="hover:bg-slate-50/60 transition-colors">
                      {row.map((cell, cIdx) => (
                        <td key={cIdx} className="py-2.5 px-3 text-slate-800 whitespace-nowrap font-medium">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-4 bg-slate-50/80 border-t border-slate-100 print:hidden">
          <div className="text-xs text-slate-500 font-mono">
            Format: Standard CSV (Excel compatible) & Printable PDF
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrintPDF}
              className="apple-button px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print / Save PDF</span>
            </button>

            <button
              onClick={handleExportCSV}
              className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 shadow-xs transition-colors"
            >
              {downloadSuccess ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-300" />
                  <span>Downloaded!</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Excel / CSV</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
