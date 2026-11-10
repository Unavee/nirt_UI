import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  FileSpreadsheet,
  Download,
  Eye,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowRight,
  TrendingUp,
  Clock,
  Sparkles,
  BarChart3,
  Printer
} from "lucide-react";
import {
  MIS_REPORT_CATEGORIES,
  STATUTORY_MIS_REPORTS
} from "@/data/misReportsData";
import MISReportPreviewModal from "@/components/reports/MISReportPreviewModal";

export default function MISReportsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPreviewReport, setSelectedPreviewReport] = useState(null);

  const filteredReports = STATUTORY_MIS_REPORTS.filter((rep) => {
    const matchesCategory =
      selectedCategory === "all" || rep.category === selectedCategory;
    const matchesSearch =
      searchQuery === "" ||
      rep.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      rep.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      String(rep.num).includes(searchQuery);
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-6 sm:space-y-8 pb-12 max-w-full">
      {/* Top Header Card */}
      <div className="glass-surface rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
              BFRD Section 27
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
              Statutory 22 MIS Reports
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight mt-1.5">
            Management MIS Reports Hub
          </h1>
          <p className="text-xs text-slate-500 mt-0.5 max-w-2xl font-medium">
            Downloadable analytical and statutory reports in Excel, CSV, and printable PDF formats across Sales, EPC execution, Accounts, and Board governance.
          </p>
        </div>

        {/* Executive Action Quick Links */}
        <div className="flex items-center space-x-2.5 shrink-0">
          <Link
            to="/dashboards"
            className="apple-button flex items-center space-x-1.5 px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <BarChart3 className="w-3.5 h-3.5 text-blue-600" />
            <span>5-Pillar Dashboards</span>
          </Link>
          <button
            onClick={() => setSelectedPreviewReport(STATUTORY_MIS_REPORTS[21])}
            className="apple-button flex items-center space-x-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-400" />
            <span>Monthly Board Pack (MIS #22)</span>
          </button>
        </div>
      </div>

      {/* 4 KPI Summary Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="block text-[11px] font-bold text-slate-500 uppercase tracking-wider font-mono">
            Statutory Reports
          </span>
          <span className="text-2xl font-black text-slate-900 font-mono mt-0.5 block">
            22 Reports
          </span>
          <span className="text-[10px] text-slate-500 font-medium mt-0.5 block">
            100% BFRD specification
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="block text-[11px] font-bold text-blue-700 uppercase tracking-wider font-mono">
            Real-Time Feeds
          </span>
          <span className="text-2xl font-black text-blue-700 font-mono mt-0.5 block">
            7 Feeds
          </span>
          <span className="text-[10px] text-blue-600 font-medium mt-0.5 block">
            Leads, status & inventory
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="block text-[11px] font-bold text-indigo-700 uppercase tracking-wider font-mono">
            Weekly Operational
          </span>
          <span className="text-2xl font-black text-indigo-700 font-mono mt-0.5 block">
            9 Reports
          </span>
          <span className="text-[10px] text-indigo-600 font-medium mt-0.5 block">
            Procurement, sites & billing
          </span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs">
          <span className="block text-[11px] font-bold text-emerald-700 uppercase tracking-wider font-mono">
            Executive Governance
          </span>
          <span className="text-2xl font-black text-emerald-700 font-mono mt-0.5 block">
            6 Reports
          </span>
          <span className="text-[10px] text-emerald-600 font-medium mt-0.5 block">
            EBITDA & monthly MIS
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
        {/* Category Filter Pills */}
        <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 sm:pb-0 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {MIS_REPORT_CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                selectedCategory === cat.id
                  ? "bg-slate-900 text-white shadow-xs"
                  : "bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="relative min-w-[240px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search all 22 MIS reports..."
            className="w-full pl-9 pr-3 py-2 text-xs rounded-xl border border-slate-200 bg-white font-medium text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />
        </div>
      </div>

      {/* Reports Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredReports.map((report) => (
          <div
            key={report.id}
            className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs hover:shadow-md transition-shadow flex flex-col justify-between space-y-4"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="w-6 h-6 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center font-bold text-xs font-mono">
                    #{report.num}
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-100 text-slate-600 font-mono">
                    {report.categoryLabel}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">
                  {report.frequency}
                </span>
              </div>

              <h3 className="text-sm font-bold text-slate-900 tracking-tight">
                {report.title}
              </h3>

              <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                {report.description}
              </p>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-700">
                {report.recordsCount} Rows
              </span>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setSelectedPreviewReport(report)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center space-x-1.5 transition-colors"
                >
                  <Eye className="w-3.5 h-3.5 text-slate-500" />
                  <span>Preview</span>
                </button>

                <button
                  onClick={() => setSelectedPreviewReport(report)}
                  className="px-3 py-1.5 rounded-xl text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white flex items-center space-x-1.5 shadow-2xs transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        {filteredReports.length === 0 && (
          <div className="col-span-full p-12 text-center text-slate-500 text-xs bg-white rounded-3xl border border-slate-200">
            No MIS reports found matching the query.
          </div>
        )}
      </div>

      {/* Preview & Export Modal */}
      <MISReportPreviewModal
        isOpen={!!selectedPreviewReport}
        report={selectedPreviewReport}
        onClose={() => setSelectedPreviewReport(null)}
      />
    </div>
  );
}
