import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Sidebar from "@/components/Sidebar";
import { AppleNavbar } from "@/components/navigation/AppleNavbar";
import { MobileTabBar } from "@/components/navigation/MobileTabBar";
import { useSidebar } from "@/context/SidebarContext";

export default function AppShell({ children }) {
  const location = useLocation();
  const pathname = location.pathname;
  const { isCollapsed } = useSidebar();
  const isLoginPage = pathname === "/login";

  useEffect(() => {
    // Ensure body and html overflow is never locked after route change or HMR
    document.body.style.overflow = "";
    document.documentElement.style.overflow = "";
  }, [pathname]);

  if (isLoginPage) {
    return (
      <main className="min-h-screen w-full">
        {children}
      </main>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50 relative selection:bg-slate-900 selection:text-white">
      {/* Desktop Apple Sidebar */}
      <Sidebar />

      {/* Main Content Area (Dynamically offset based on sidebar collapsed state) */}
      <div 
        className={`flex-1 flex flex-col min-h-screen w-full min-w-0 transition-all duration-300 ease-in-out ${
          isCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        
        {/* Top Frosted Navbar */}
        <AppleNavbar />

        {/* Viewport Content Container (Fluid edge-to-edge on large/ultrawide displays) */}
        <main className="flex-1 w-full p-3 sm:p-6 lg:p-8 pb-28 lg:pb-12">
          {children}
        </main>

        {/* iOS Floating Bottom Bar for Mobile & Tablet */}
        <MobileTabBar />

        {/* Desktop Footer (CIN removed, Powered by ACHISE added) */}
        <footer className="hidden md:block border-t border-slate-200/80 py-4 px-6 text-xs text-slate-500 bg-white/60 backdrop-blur-md">
          <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-2">
            <span className="font-semibold text-slate-800 tracking-tight">
              NIRT RENEWABLE ENERGY PRIVATE LIMITED
            </span>
            <div className="flex items-center space-x-1.5 text-xs text-slate-600 font-medium">
              <span>Powered by</span>
              <span className="font-black text-slate-900 tracking-wider uppercase font-mono">
                ACHISE
              </span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
