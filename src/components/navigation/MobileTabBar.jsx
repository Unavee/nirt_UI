import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Layers, 
  Plus, 
  FolderKanban, 
  Settings,
  ShieldCheck 
} from "lucide-react";
import { QuickActionSheet } from "@/components/dashboard/QuickActionSheet";

export function MobileTabBar() {
  const location = useLocation();
  const pathname = location.pathname;
  const [isActionOpen, setIsActionOpen] = useState(false);

  const navItems = [
    { label: "Dashboard", href: "/", icon: LayoutDashboard },
    { label: "5 Pipelines", href: "/pipelines", icon: Layers },
    { label: "Action", href: "#action", icon: Plus, isAction: true },
    { label: "Projects", href: "/projects", icon: FolderKanban },
    { label: "Settings", href: "/settings", icon: Settings },
  ];

  return (
    <>
      <nav className="fixed bottom-0 inset-x-0 z-40 glass-tabbar md:hidden pb-safe px-3 pt-2">
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
          {navItems.map((item, idx) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            if (item.isAction) {
              return (
                <button
                  key={idx}
                  onClick={() => setIsActionOpen(true)}
                  className="apple-button -mt-6 w-12 h-12 rounded-full bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/30 border-2 border-white focus:outline-none"
                  aria-label="New Operational Action"
                >
                  <Plus className="w-6 h-6 stroke-[2.5]" />
                </button>
              );
            }

            return (
              <Link
                key={idx}
                to={item.href}
                className={`apple-button flex flex-col items-center justify-center py-1 px-3 rounded-2xl transition-all ${
                  isActive ? "text-slate-900 font-bold" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Icon className={`w-5 h-5 ${isActive ? "stroke-[2.3]" : "stroke-[1.8]"}`} />
                <span className="text-[10px] mt-0.5 tracking-tight">{item.label}</span>
                {isActive && <span className="w-1 h-1 rounded-full bg-slate-900 mt-0.5" />}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Floating Action Sheet on Mobile */}
      <QuickActionSheet
        isOpen={isActionOpen}
        onClose={() => setIsActionOpen(false)}
      />
    </>
  );
}
