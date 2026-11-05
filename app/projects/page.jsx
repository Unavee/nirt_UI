"use client";

import { useState } from "react";
import Link from "next/link";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import LeadCaptureModal from "@/components/LeadCaptureModal";
import { 
  FolderKanban, 
  Search, 
  ChevronRight, 
  Plus
} from "lucide-react";

export default function ProjectsRegistryPage() {
  const [projectsList, setProjectsList] = useState(MOCK_PROJECTS);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [pipelineFilter, setPipelineFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredProjects = projectsList.filter((p) => {
    const matchesSearch =
      (p.customerName || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.id || "").toLowerCase().includes(searchTerm.toLowerCase()) ||
      (p.ebConsumerNumber || p.consumerNumber || "").includes(searchTerm) ||
      (p.district || "").toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "all" || (p.category || "").toLowerCase().includes(categoryFilter);

    const matchesPipeline =
      pipelineFilter === "all" || p.pipeline === pipelineFilter;

    return matchesSearch && matchesCategory && matchesPipeline;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-6 border-b border-zinc-200/80">
        <div>
          <h2 className="text-2xl font-black text-zinc-950 tracking-tight">
            Projects Master Registry
          </h2>
          <p className="text-xs text-zinc-500 mt-1">
            Central repository of all ongoing, installed, and commissioned rooftop solar plants
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-zinc-950 hover:bg-black text-white px-4 py-2.5 text-xs font-semibold flex items-center space-x-2 transition-all shadow-sm active:scale-[0.99] cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Customer Project</span>
        </button>
      </div>

      {/* Filter and Search Bar with Exact Padding & Alignment */}
      <div className="p-4 bg-white border border-zinc-200/80 shadow-2xs flex flex-col sm:flex-row gap-3 items-center justify-between">
        
        {/* Search Input */}
        <div className="relative w-full sm:w-80 flex items-center">
          <Search className="w-3.5 h-3.5 absolute left-3 text-zinc-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search Name, Project ID, EB No, District..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full h-9 pl-9 pr-3 text-xs border border-zinc-200 bg-zinc-50/50 focus:bg-white focus:outline-hidden focus:border-black transition-colors shadow-2xs"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="h-9 border border-zinc-200 px-3 text-xs bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="residential">Residential (Surya Ghar)</option>
            <option value="commercial">Commercial / Industrial</option>
            <option value="pump">Solar Pump</option>
          </select>

          <select
            value={pipelineFilter}
            onChange={(e) => setPipelineFilter(e.target.value)}
            className="h-9 border border-zinc-200 px-3 text-xs bg-white focus:outline-hidden cursor-pointer"
          >
            <option value="all">All Pipelines</option>
            <option value="sales">Sales Pipeline</option>
            <option value="execution">Execution Pipeline</option>
            <option value="subsidy">Subsidy Pipeline</option>
          </select>

        </div>
      </div>

      {/* Mobile Card List (< md) */}
      <div className="md:hidden space-y-3">
        {filteredProjects.map((p) => (
          <div key={p.id} className="p-4 bg-white border border-zinc-200 shadow-2xs space-y-3">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-mono text-[10px] font-bold bg-zinc-100 text-black px-2 py-0.5 border border-zinc-200">
                  {p.id}
                </span>
                <span className="text-[10px] text-zinc-500 font-mono ml-2">
                  {p.district || "Salem"}
                </span>
              </div>
              <span className="text-xs font-mono font-bold bg-zinc-50 border border-zinc-200 px-2 py-0.5 text-black">
                {p.capacityKw} kW
              </span>
            </div>

            <div>
              <h3 className="font-bold text-sm text-black leading-tight">{p.customerName}</h3>
              <div className="text-[11px] text-zinc-500 font-mono mt-0.5">
                EB: {p.ebConsumerNumber || p.consumerNumber || "Pending"} • {p.phone || p.customerPhone || "Mobile on file"}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2.5 bg-zinc-50 border border-zinc-100 text-[11px] font-mono">
              <div>
                <span className="text-zinc-400 block text-[9px] uppercase">Total Value</span>
                <span className="font-bold text-black">₹{p.totalValue ? p.totalValue.toLocaleString("en-IN") : "0"}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[9px] uppercase">Stage</span>
                <span className="font-semibold text-emerald-800 truncate block">
                  {p.stageName || p.stage || "Lead Captured"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-zinc-100 flex justify-between items-center">
              <span className="text-[10px] text-zinc-500 font-mono truncate max-w-[160px]">
                {p.discomStatus || "TANGEDCO Pending"}
              </span>
              <Link
                href={`/projects/${p.id}`}
                className="bg-black hover:bg-zinc-800 text-white px-3.5 py-1.5 text-xs font-semibold flex items-center space-x-1 shadow-2xs active:scale-[0.98]"
              >
                <span>View Project</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}

        {filteredProjects.length === 0 && (
          <div className="p-8 bg-white border border-zinc-200 text-center text-xs text-zinc-400 font-mono">
            No projects found matching the filter criteria.
          </div>
        )}
      </div>

      {/* Desktop / Tablet Table (>= md) */}
      <div className="hidden md:block bg-white border border-zinc-200/80 shadow-[0_1px_3px_rgba(0,0,0,0.02)] overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-zinc-200/80 bg-zinc-50/80 text-zinc-600 font-semibold uppercase text-[11px] tracking-wider">
              <th className="py-3.5 px-5 border-r border-zinc-200/60">Project Code</th>
              <th className="py-3.5 px-5 border-r border-zinc-200/60">Customer Details</th>
              <th className="py-3.5 px-5 border-r border-zinc-200/60">Capacity</th>
              <th className="py-3.5 px-5 border-r border-zinc-200/60">Current Stage</th>
              <th className="py-3.5 px-5 border-r border-zinc-200/60">Financials (₹)</th>
              <th className="py-3.5 px-5 border-r border-zinc-200/60">DISCOM / Subsidy</th>
              <th className="py-3.5 px-5 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-zinc-100">
            {filteredProjects.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50/70 transition-colors">
                
                {/* Project Code */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top">
                  <span className="bg-zinc-100 border border-zinc-200 text-zinc-900 font-mono font-bold px-2 py-0.5 block w-fit">
                    {p.id}
                  </span>
                  <span className="text-[10px] text-zinc-500 block mt-1">
                    {p.branch}
                  </span>
                </td>

                {/* Customer Details */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top">
                  <div className="font-bold text-black text-sm">{p.customerName}</div>
                  <div className="text-[11px] text-zinc-500 mt-0.5 font-mono">
                    EB: {p.consumerNumber} • {p.phone}
                  </div>
                  <div className="text-[11px] text-zinc-400">
                    {p.address}, {p.district}
                  </div>
                </td>

                {/* Capacity */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top">
                  <span className="text-black font-bold block">{p.capacityKw} kW</span>
                  <span className="text-[10px] bg-zinc-100 px-1.5 py-0.2 uppercase block w-fit mt-1 text-zinc-600">
                    {p.category.split(" ")[0]}
                  </span>
                </td>

                {/* Stage */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top">
                  <span className="font-semibold text-black block">{p.stageName}</span>
                  <span className="text-[10px] text-zinc-400 uppercase block mt-0.5">
                    Pipeline: {p.pipeline}
                  </span>
                </td>

                {/* Financials */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top font-mono">
                  <div>Total: <strong>₹{p.totalValue.toLocaleString("en-IN")}</strong></div>
                  <div className="text-zinc-500 text-[11px]">Adv: ₹{p.advancePaid.toLocaleString("en-IN")}</div>
                  <div className="text-[10px] text-zinc-400">Bal: ₹{p.balanceDue.toLocaleString("en-IN")}</div>
                </td>

                {/* DISCOM / Subsidy */}
                <td className="py-4 px-5 border-r border-zinc-100 align-top text-[11px]">
                  <div className="text-zinc-800 font-medium">{p.discomStatus}</div>
                  <div className="text-zinc-400 text-[10px] mt-0.5">{p.subsidyStatus}</div>
                </td>

                {/* Actions */}
                <td className="py-4 px-5 text-right align-top">
                  <Link
                    href={`/projects/${p.id}`}
                    className="bg-zinc-950 hover:bg-black text-white h-9 px-3.5 text-xs font-semibold transition-all inline-flex items-center space-x-1 shadow-2xs active:scale-[0.98]"
                  >
                    <span>View Project</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>

              </tr>
            ))}
          </tbody>
        </table>

        {filteredProjects.length === 0 && (
          <div className="p-12 text-center text-xs text-zinc-400 font-mono">
            No projects found matching the filter criteria.
          </div>
        )}
      </div>

      {/* Lead Capture & Project Provisioning Modal */}
      <LeadCaptureModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onLeadCreated={(newLead) => {
          setProjectsList((prev) => [newLead, ...prev]);
        }}
      />

    </div>
  );
}
