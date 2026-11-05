import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRole } from "@/context/RoleContext";
import logScreen1 from "@/assets/logScreen1.avif";
import logScreen2 from "@/assets/logScreen2.avif";
import logScreen3 from "@/assets/logScreen3.avif";
import { 
  Lock, 
  Mail, 
  ArrowRight, 
  Fingerprint, 
  Eye, 
  EyeOff,
  ChevronDown,
  Check,
  ShieldCheck,
  Building2,
  Users,
  Compass,
  Package,
  HardHat,
  IndianRupee,
  BadgePercent,
  Activity,
  X
} from "lucide-react";

const HERO_SLIDES = [
  {
    image: logScreen1,
    tag: "Commercial & Industrial Rooftop Solar",
    title: "High-Efficiency Solar Power for Manufacturing & Mills",
    subtitle: "Slashing peak HT/LT demand charges with Tier-1 bifacial TOPCon & Mono PERC modules."
  },
  {
    image: logScreen2,
    tag: "Residential Rooftop Solar",
    title: "Zero Domestic Electricity Bills with Central DBT Subsidy",
    subtitle: "Complete rooftop turnkey installation with seamless TANGEDCO bi-directional net-metering."
  },
  {
    image: logScreen3,
    tag: "Agro-Solar & Ground Mounts",
    title: "Robust Galvanized Engineering & High-Yield Performance",
    subtitle: "Continuous chemical earthing (< 5.0 Ω), string inverter diagnostics, and 25-year panel longevity."
  }
];

export default function LoginPage() {
  const navigate = useNavigate();
  const { allRoles, switchRole } = useRole();
  const [selectedRole, setSelectedRole] = useState(allRoles[0]);
  const [email, setEmail] = useState("dr.khaja@nirt.net");
  const [password, setPassword] = useState("••••••••••••");
  const [showPassword, setShowPassword] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-scroll / cycle smoothly through all 3 project images every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getRoleIcon = (roleId) => {
    switch (roleId) {
      case "managing_director": return ShieldCheck;
      case "sales_rep": return Users;
      case "site_surveyor": return Compass;
      case "warehouse_manager": return Package;
      case "epc_manager": return HardHat;
      case "liaison_officer": return Building2;
      case "accounts_officer": return IndianRupee;
      case "subsidy_coordinator": return BadgePercent;
      case "project_coordinator": return Activity;
      default: return Users;
    }
  };

  const handleSelectRole = (role) => {
    setSelectedRole(role);
    setEmail(`${role.id}@nirt.net`);
    setIsRoleModalOpen(false);
  };

  const handleLogin = (e) => {
    e?.preventDefault();
    setIsLoading(true);
    switchRole(selectedRole.id);

    setTimeout(() => {
      navigate("/");
    }, 450);
  };

  const activeSlide = HERO_SLIDES[currentSlide];
  const ActiveRoleIcon = getRoleIcon(selectedRole.id);

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row select-none relative bg-slate-950 lg:bg-white font-sans">
      
      {/* ========================================================
          1. MOBILE FULL-SCREEN BACKGROUND IMAGE (assets/logScreen1.avif)
          ======================================================== */}
      <div className="lg:hidden fixed inset-0 z-0">
        <img src={logScreen1}
          alt="Solar Rooftop Installation"
          fill
          priority
          className="object-cover object-center"
         />
        {/* Soft darkened scrim so text & glass elements pop with high contrast */}
        <div className="absolute inset-0 bg-slate-950/65 backdrop-blur-[3px]" />
      </div>

      {/* ========================================================
          2. LEFT COLUMN: Auto-Scrolling Solar Project Showcase
             (With Captions & Pure Blue / White Tones - Zero Amber)
          ======================================================== */}
      <div className="hidden lg:flex lg:w-1/2 relative min-h-screen flex-col justify-between p-12 text-white overflow-hidden bg-slate-950 z-10">
        
        {/* Auto-Cycling Cross-Fading Images */}
        {HERO_SLIDES.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              currentSlide === idx 
                ? "opacity-100 scale-100" 
                : "opacity-0 scale-105 pointer-events-none"
            }`}
          >
            <img src={slide.image}
              alt={`NIRT Solar Installation ${idx + 1}`}
              fill
              priority={idx === 0}
              className="object-cover object-center"
             />
            {/* Dark gradient scrim for clean branding contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/35 to-slate-950/40" />
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/70 via-transparent to-transparent" />
          </div>
        ))}

        {/* Ambient colored lighting (Deep Blue / Indigo - No Amber) */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-blue-600/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

        {/* Top: Brand Header */}
        <div className="relative z-10 flex items-center space-x-3.5">
          <div className="w-12 h-12 rounded-2xl bg-white p-1.5 shadow-2xl flex items-center justify-center shrink-0">
            <img src="/brandLogo.png"
              alt="NIRT Solar Logo"
              width={42}
              height={42}
              className="object-contain"
               />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight text-white leading-none">
              NIRT Renewable
            </h1>
            <p className="text-xs text-slate-300 font-medium mt-1">
              NIRT Renewable Energy Private Limited
            </p>
          </div>
        </div>

        {/* Center: Dynamic Carousel Caption & Subtitle (Restored with Smooth Fade) */}
        <div className="relative z-10 my-auto space-y-3.5 max-w-lg transition-all duration-700">
          <span className="inline-block text-xs font-bold uppercase tracking-wider text-blue-400 font-mono">
            {activeSlide.tag}
          </span>

          <h2 className="text-3xl xl:text-4xl font-extrabold tracking-tight text-white leading-tight">
            {activeSlide.title}
          </h2>

          {/* <p className="text-xl text-slate-200 leading-relaxed font-normal">
            {activeSlide.subtitle}
          </p> */}
        </div>

        {/* Bottom Bar: Smooth Blue Progress Bars + Powered by ACHISE */}
        <div className="relative z-10 pt-6 border-t border-white/10 flex items-center justify-between">
          
          {/* Apple-style Smooth Animated Progress Bars (Blue / White - No Amber) */}
          <div className="flex items-center space-x-2.5">
            {HERO_SLIDES.map((_, i) => {
              const isActive = currentSlide === i;
              const isPast = i < currentSlide;

              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => setCurrentSlide(i)}
                  className="apple-button h-1.5 w-12 rounded-full bg-white/20 hover:bg-white/35 overflow-hidden relative cursor-pointer transition-all"
                  aria-label={`Jump to slide ${i + 1}`}
                >
                  {isActive && (
                    <div 
                      key={currentSlide} 
                      className="h-full bg-blue-500 rounded-full animate-slide-fill shadow-sm shadow-blue-500/50" 
                    />
                  )}
                  {isPast && (
                    <div className="h-full w-full bg-blue-500/90 rounded-full" />
                  )}
                  {!isActive && !isPast && (
                    <div className="h-full w-0 bg-transparent rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Clean White / Slate Attribution */}
          <div className="flex items-center space-x-1.5 text-xs text-slate-400 font-medium">
            <span>Powered by</span>
            <span className="font-black text-white uppercase tracking-widest font-mono text-xs">
              ACHISE
            </span>
          </div>
        </div>

      </div>

      {/* ========================================================
          3. RIGHT COLUMN: Industry-Standard Apple Login
             (Desktop: Pristine Pure White, Mobile: Native Glass Sheet)
          ======================================================== */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-4 sm:p-8 lg:p-14 xl:p-16 min-h-screen relative z-10 overflow-y-auto lg:bg-white bg-transparent">
        
        <div className="w-full max-w-md space-y-6">
          
          {/* Mobile Brand Header */}
          <div className="text-center lg:hidden mb-2">
            <div className="w-16 h-16 rounded-3xl bg-white border border-slate-200/90 mx-auto flex items-center justify-center p-2 shadow-xl mb-3">
              <img src="/brandLogo.png"
                alt="NIRT Solar Logo"
                width={56}
                height={56}
                className="object-contain"
                 />
            </div>
            <h1 className="text-2xl font-black text-white tracking-tight">
              NIRT SOLAR
            </h1>
            <p className="text-xs text-slate-200 font-medium mt-0.5">
              Project Lifecycle &amp; Governance
            </p>
          </div>

          {/* Login Card (Pure white on desktop, Frosted Glass on Mobile) */}
          <div className="bg-white/95 backdrop-blur-2xl lg:backdrop-blur-none lg:bg-white rounded-3xl p-6 sm:p-8 shadow-2xl lg:shadow-none border border-white/40 lg:border-none space-y-6">
            
            {/* Header */}
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
                Welcome back
              </h2>
              <p className="text-xs sm:text-sm text-slate-500">
                Sign in to manage your solar pipelines and project gates.
              </p>
            </div>

            {/* Apple Interactive Role Selection Card */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">Operational Workspace Role</span>
                <button
                  type="button"
                  onClick={() => setIsRoleModalOpen(true)}
                  className="text-xs font-semibold text-blue-600 hover:text-blue-700 underline"
                >
                  Change Role
                </button>
              </div>

              <div 
                onClick={() => setIsRoleModalOpen(true)}
                className="p-3.5 rounded-2xl bg-slate-50 hover:bg-slate-100/80 border border-slate-200/90 cursor-pointer flex items-center justify-between transition-all group"
              >
                <div className="flex items-center space-x-3 min-w-0">
                  <ActiveRoleIcon className="w-5 h-5 text-slate-700 shrink-0" />
                  <div className="min-w-0">
                    <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-blue-600 transition-colors">
                      {selectedRole.title}
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      {selectedRole.department}
                    </span>
                  </div>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0 ml-2" />
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-slate-700">Staff Email</label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full text-xs font-medium pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 transition-all placeholder:text-slate-400"
                    placeholder="name@nirt.net"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold text-slate-700">Passcode / PIN</label>
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center space-x-1"
                  >
                    {showPassword ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                    <span>{showPassword ? "Hide" : "Show"}</span>
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full text-xs font-medium pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 bg-white text-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900/10 focus:border-slate-900 font-mono transition-all"
                    required
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="apple-button w-full py-3.5 px-4 rounded-2xl text-xs font-bold text-white bg-slate-900 hover:bg-black shadow-lg shadow-slate-900/20 flex items-center justify-center space-x-2 transition-all"
                >
                  {isLoading ? (
                    <>
                      <Fingerprint className="w-4 h-4 animate-spin text-blue-400" />
                      <span>Authorizing Session...</span>
                    </>
                  ) : (
                    <>
                      <span>Continue to {selectedRole.shortCode} Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* Clean Security Note */}
            <div className="pt-2 text-center border-t border-slate-100 flex items-center justify-center space-x-2 text-[11px] text-slate-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>System Audit Log • Verified Activity Tracking</span>
            </div>

          </div>

          {/* Footer Attribution (Mobile & Desktop) */}
          <div className="text-center text-xs text-slate-400 font-medium">
            Powered by <strong className="text-white lg:text-slate-900 font-mono uppercase tracking-wider">ACHISE</strong>
          </div>

        </div>

      </div>

      {/* ========================================================
          ROLE SELECTION MODAL / BOTTOM SHEET
          (With Explicit Hardware-Accelerated Apple Spring Animation)
          ======================================================== */}
      {isRoleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 apple-backdrop-animate bg-slate-950/60 backdrop-blur-sm">
          
          {/* Backdrop Tap to Close */}
          <div className="fixed inset-0" onClick={() => setIsRoleModalOpen(false)} />

          <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200/90 overflow-hidden flex flex-col max-h-[85dvh] z-10 apple-sheet-animate">
            
            {/* iOS Sheet Handle on Mobile */}
            <div className="sm:hidden w-12 h-1 bg-slate-200 rounded-full mx-auto mt-2.5 mb-1" />

            <div className="p-5 border-b border-slate-100 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-slate-900 tracking-tight">
                  Choose Operational Workspace
                </h3>
                <p className="text-xs text-slate-500">
                  Select which of the 9 synchronized team hats you are signing into.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsRoleModalOpen(false)}
                className="apple-button p-2 text-slate-400 hover:text-slate-600 rounded-full hover:bg-slate-100 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Role List with Smooth Transitions */}
            <div className="p-4 overflow-y-auto space-y-2">
              {allRoles.map((role) => {
                const isSelected = selectedRole.id === role.id;
                const Icon = getRoleIcon(role.id);

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => handleSelectRole(role)}
                    className={`apple-button w-full p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all duration-150 ${
                      isSelected
                        ? "bg-blue-50/90 border-blue-500 shadow-xs ring-1 ring-blue-500/20 text-slate-900"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50/90 hover:border-slate-300"
                    }`}
                  >
                    <div className="flex items-center space-x-3.5 min-w-0">
                      {/* Crisp bare icon with NO background box */}
                      <Icon className={`w-5 h-5 shrink-0 transition-colors ${
                        isSelected ? "text-blue-600" : "text-slate-400"
                      }`} />

                      <div className="min-w-0">
                        <div className="flex items-center space-x-2">
                          <span className={`text-xs font-bold block truncate ${
                            isSelected ? "text-blue-950 font-extrabold" : "text-slate-900"
                          }`}>
                            {role.title}
                          </span>
                          <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded font-bold ${
                            isSelected ? "bg-blue-100 text-blue-700" : "bg-slate-100 text-slate-600"
                          }`}>
                            {role.shortCode}
                          </span>
                        </div>
                        <span className="text-[11px] text-slate-500 block truncate mt-0.5">
                          {role.department}
                        </span>
                      </div>
                    </div>

                    {isSelected && (
                      <Check className="w-4 h-4 text-blue-600 shrink-0 ml-2 stroke-[2.5]" />
                    )}
                  </button>
                );
              })}
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
