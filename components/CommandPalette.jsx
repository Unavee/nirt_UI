"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import Portal from "@/components/Portal";
import { 
  Search, 
  X, 
  FolderKanban, 
  Layers, 
  Calculator, 
  Settings, 
  LayoutDashboard, 
  ArrowRight,
  ShieldCheck
} from "lucide-react";

export default function CommandPalette({ isOpen, onClose }) {
  const router = useRouter();
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        onClose(false);
      } else if (e.key === "Escape" && isOpen) {
        e.preventDefault();
        onClose(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const quickNav = [
    { label: "Go to Dashboard", href: "/", icon: LayoutDashboard },
    { label: "Go to Pipelines (Sales, Execution, Subsidy)", href: "/pipelines", icon: Layers },
    { label: "Go to Projects Registry", href: "/projects", icon: FolderKanban },
    { label: "Go to User & Access Control", href: "/settings/users", icon: ShieldCheck },
    { label: "Go to Solar Proposal & Sizing Calculator", href: "/calculator", icon: Calculator },
    { label: "Go to Settings & Master Data Hub", href: "/settings", icon: Settings },
  ];

  const matchedNav = quickNav.filter((n) =>
    n.label.toLowerCase().includes(query.toLowerCase())
  );

  const matchedProjects = MOCK_PROJECTS.filter(
    (p) =>
      p.customerName.toLowerCase().includes(query.toLowerCase()) ||
      p.id.toLowerCase().includes(query.toLowerCase()) ||
      p.consumerNumber.includes(query) ||
      p.district.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelect = (href) => {
    onClose(false);
    setQuery("");
    router.push(href);
  };

  return (
    <Portal>
      <div className="fixed inset-0 w-screen h-screen bg-black/50 backdrop-blur-xs z-[9999] flex items-start justify-center pt-24 p-4 animate-in fade-in duration-100">
        
        {/* Click outside to close */}
        <div className="fixed inset-0 w-full h-full" onClick={() => onClose(false)} />

        {/* Palette Container */}
        <div className="relative bg-white border border-zinc-300 w-full max-w-xl shadow-2xl overflow-hidden z-10 rounded-xl animate-in slide-in-from-top duration-200">
          
          {/* Search Header */}
          <div className="px-4 py-3 border-b  border-zinc-200 flex items-center bg-white">
            <Search className="w-4 h-4 text-zinc-400 mr-3 flex-shrink-0" />
            <input
              type="text"
              placeholder="Type a command or search solar project..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
              className="w-full text-xs text-black px-4 py-3 placeholder-zinc-400 focus:outline-hidden bg-transparent"
            />
            <button
              onClick={() => onClose(false)}
              className="text-[10px] font-mono px-2 py-0.5 bg-zinc-100 border border-zinc-200 text-zinc-500 hover:bg-zinc-200 ml-2"
            >
              ESC
            </button>
          </div>

          {/* Results List */}
          <div className="max-h-80 overflow-y-auto divide-y divide-zinc-100 p-2">
            
            {/* Projects Results */}
            {matchedProjects.length > 0 && (
              <div className="py-1">
                <div className="text-[10px] font-mono font-semibold uppercase text-zinc-400 px-3 py-1">
                  Solar Projects ({matchedProjects.length})
                </div>
                {matchedProjects.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => handleSelect(`/projects/${p.id}`)}
                    className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 flex items-center justify-between group transition-colors"
                  >
                    <div className="flex items-center space-x-2.5">
                      <span className="font-mono text-[10px] font-bold bg-zinc-100 border border-zinc-200 px-1.5 py-0.2">
                        {p.id}
                      </span>
                      <div>
                        <div className="font-semibold text-black">{p.customerName}</div>
                        <div className="text-[10px] text-zinc-500 font-mono">
                          {p.capacityKw} kW • {p.stageName} • {p.district}
                        </div>
                      </div>
                    </div>
                    <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black transition-colors" />
                  </button>
                ))}
              </div>
            )}

            {/* Quick Navigation Results */}
            {matchedNav.length > 0 && (
              <div className="py-1">
                <div className="text-[10px] font-mono font-semibold uppercase text-zinc-400 px-3 py-1">
                  Quick Navigation
                </div>
                {matchedNav.map((n, idx) => {
                  const Icon = n.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(n.href)}
                      className="w-full text-left px-3 py-2 text-xs hover:bg-zinc-100 flex items-center justify-between group transition-colors"
                    >
                      <div className="flex items-center space-x-2.5">
                        <Icon className="w-4 h-4 text-zinc-500" />
                        <span className="font-medium text-black">{n.label}</span>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-zinc-300 group-hover:text-black transition-colors" />
                    </button>
                  );
                })}
              </div>
            )}

            {matchedProjects.length === 0 && matchedNav.length === 0 && (
              <div className="p-8 text-center text-xs font-mono text-zinc-400">
                No matching commands or projects found.
              </div>
            )}

          </div>

          {/* Footer shortcuts */}
          <div className="px-4 py-2.5 bg-zinc-50 border-t border-zinc-200 text-[11px] font-mono text-zinc-500 flex justify-between items-center">
            <span>Navigate with click or Enter</span>
            <span>Press <strong>ESC</strong> to dismiss</span>
          </div>

        </div>

      </div>
    </Portal>
  );
}
