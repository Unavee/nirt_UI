import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import SiteSurveyModal from "@/components/SiteSurveyModal";
import ProposalManager from "@/components/proposal/ProposalManager";
import { 
  ArrowLeft, 
  Zap, 
  IndianRupee, 
  ShieldCheck, 
  FileText, 
  Upload, 
  Share2, 
  Printer, 
  User,
  Activity,
  ChevronRight,
  ExternalLink,
  Building2,
  CheckCircle2,
  Clock,
  AlertTriangle,
  X,
  Eye,
  Download,
  AlertCircle,
  HelpCircle,
  Phone,
  Mail,
  MapPin,
  Calendar,
  Lock
} from "lucide-react";

export default function ProjectDetailPage() {
  const { id: projectId } = useParams();
  const project = MOCK_PROJECTS.find((p) => p.id === projectId) || MOCK_PROJECTS[0];

  const [activeTab, setActiveTab] = useState("overview");
  const [selectedDocPreview, setSelectedDocPreview] = useState(null);
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [isSurveyModalOpen, setIsSurveyModalOpen] = useState(false);

  // Section 3.1: Interactive Communication History Trail
  const [communicationLogs, setCommunicationLogs] = useState([
    {
      id: "COMM-104",
      channel: "WhatsApp",
      date: "30 Oct 2026, 14:32 IST",
      staff: "M. Saravanan (EPC Lead)",
      type: "Material Dispatch Update",
      summary: "Customer notified regarding delivery vehicle TN-30-AZ-4102 and stamped delivery challan #DC-901 for Waaree TOPCon modules.",
      status: "Delivered & Read ✓"
    },
    {
      id: "COMM-103",
      channel: "Phone Call",
      date: "25 Oct 2026, 11:15 IST",
      staff: "V. Thangavel (Liaison Officer)",
      type: "Site Inspection Coordination",
      summary: "Customer confirmed terrace accessibility for TANGEDCO AEE field feasibility check tomorrow morning. Inverter location verified.",
      status: "Connected (3m 40s)"
    },
    {
      id: "COMM-102",
      channel: "Email",
      date: "19 Oct 2026, 17:45 IST",
      staff: "A. Lakshmi (Accounts Officer)",
      type: "Payment Confirmation Receipt",
      summary: "Official NIRT receipt #REC-SLM-041 for 80% advance payment (₹1,50,000) sent to sengottaiyan.k@gmail.com with UTR ICIC202610190042.",
      status: "Delivered"
    },
    {
      id: "COMM-101",
      channel: "In-Person",
      date: "13 Oct 2026, 10:30 IST",
      staff: "K. Murali (Survey Engineer)",
      type: "Terrace Survey & Layout Sign-off",
      summary: "Met customer at installation site. Shadow analysis and 6-module layout finalized with customer and family members.",
      status: "Signed & Documented"
    }
  ]);

  const [showAddLogModal, setShowAddLogModal] = useState(false);
  const [newLogChannel, setNewLogChannel] = useState("WhatsApp");
  const [newLogType, setNewLogType] = useState("General Customer Update");
  const [newLogSummary, setNewLogSummary] = useState("");

  const handleAddLog = (e) => {
    e.preventDefault();
    if (!newLogSummary.trim()) return;

    const newEntry = {
      id: `COMM-${Math.floor(100 + Math.random() * 900)}`,
      channel: newLogChannel,
      date: new Intl.DateTimeFormat("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        timeZone: "Asia/Kolkata"
      }).format(new Date()) + " IST",
      staff: "Project Coordinator (PMO)",
      type: newLogType,
      summary: newLogSummary.trim(),
      status: "Logged ✓"
    };

    setCommunicationLogs((prev) => [newEntry, ...prev]);
    setNewLogSummary("");
    setShowAddLogModal(false);
  };

  // Complete 20-Step Activity Responsibility Matrix (Section 3.3)
  const responsibilityActivities = [
    {
      step: "01",
      process: "P1",
      name: "Lead Inward & Intake",
      responsiblePerson: "S. Rajkumar",
      department: "Sales & Marketing",
      assignedDate: "10 Oct 2026",
      targetDate: "11 Oct 2026",
      actualDate: "10 Oct 2026",
      status: "COMPLETED",
      remarks: "Direct consumer inquiry sourced via PM Surya Ghar campaign. Deduplicated."
    },
    {
      step: "02",
      process: "P1",
      name: "Site & Consumer Qualification",
      responsiblePerson: "S. Rajkumar",
      department: "Sales & Marketing",
      assignedDate: "11 Oct 2026",
      targetDate: "12 Oct 2026",
      actualDate: "11 Oct 2026",
      status: "COMPLETED",
      remarks: "Qualified Cat A (High Feasibility). 5 kW sanctioned load, RCC roof."
    },
    {
      step: "03",
      process: "P1",
      name: "Site Survey & Geo-Photo Audit",
      responsiblePerson: "K. Murali",
      department: "Technical Feasibility",
      assignedDate: "12 Oct 2026",
      targetDate: "13 Oct 2026",
      actualDate: "13 Oct 2026",
      status: "COMPLETED",
      remarks: "Roof dimensions 28ft x 18ft surveyed. Zero parapet shading. 4 geo-photos uploaded."
    },
    {
      step: "04",
      process: "P1",
      name: "Engineering Design & SLD DPR",
      responsiblePerson: "R. Prakash",
      department: "Design & Engineering",
      assignedDate: "13 Oct 2026",
      targetDate: "14 Oct 2026",
      actualDate: "14 Oct 2026",
      status: "COMPLETED",
      remarks: "Single Line Diagram (SLD) signed. 6x Waaree TOPCon 550W string layout approved."
    },
    {
      step: "05",
      process: "P1",
      name: "Commercial Quotation Sizing",
      responsiblePerson: "S. Rajkumar",
      department: "Sales & Marketing",
      assignedDate: "14 Oct 2026",
      targetDate: "15 Oct 2026",
      actualDate: "15 Oct 2026",
      status: "COMPLETED",
      remarks: "System quote ₹2.15L issued. Standard 3% seasonal discount applied."
    },
    {
      step: "06",
      process: "P1",
      name: "Customer Work Order Confirmation",
      responsiblePerson: "S. Rajkumar",
      department: "Sales & Marketing",
      assignedDate: "15 Oct 2026",
      targetDate: "16 Oct 2026",
      actualDate: "16 Oct 2026",
      status: "COMPLETED",
      remarks: "Work order signed by consumer. Project ID NIRT-26-0042 officially created."
    },
    {
      step: "07",
      process: "P2",
      name: "80% Upfront Advance Collection",
      responsiblePerson: "A. Lakshmi",
      department: "Commercial Accounts",
      assignedDate: "16 Oct 2026",
      targetDate: "19 Oct 2026",
      actualDate: "19 Oct 2026",
      status: "COMPLETED",
      remarks: "₹1,50,000 received via RTGS. Bank UTR: ICIC202610190042 verified. Hard Lock 1 cleared."
    },
    {
      step: "08",
      process: "P2",
      name: "Document Locker KYC Assembly",
      responsiblePerson: "V. Thangavel",
      department: "Government Liaison",
      assignedDate: "19 Oct 2026",
      targetDate: "20 Oct 2026",
      actualDate: "20 Oct 2026",
      status: "COMPLETED",
      remarks: "Aadhaar, bi-monthly EB bills, and property tax receipt verified in Document Locker."
    },
    {
      step: "09",
      process: "P2",
      name: "TANGEDCO DISCOM Portal Filing",
      responsiblePerson: "V. Thangavel",
      department: "Government Liaison",
      assignedDate: "20 Oct 2026",
      targetDate: "21 Oct 2026",
      actualDate: "21 Oct 2026",
      status: "COMPLETED",
      remarks: "TANGEDCO LT Solar Form submitted online. App Ref: TANG/SLM/2026/0411."
    },
    {
      step: "10",
      process: "P2",
      name: "Technical Feasibility Sanction",
      responsiblePerson: "V. Thangavel",
      department: "Government Liaison",
      assignedDate: "21 Oct 2026",
      targetDate: "28 Oct 2026",
      actualDate: "25 Oct 2026",
      status: "COMPLETED",
      remarks: "Feasibility letter issued by TANGEDCO Salem Urban AEE. Transformer quota confirmed."
    },
    {
      step: "11",
      process: "P3",
      name: "Vendor PO Issuance",
      responsiblePerson: "D. Senthil",
      department: "Procurement & Stores",
      assignedDate: "25 Oct 2026",
      targetDate: "26 Oct 2026",
      actualDate: "26 Oct 2026",
      status: "COMPLETED",
      remarks: "Factory PO-26-9042 dispatched to Waaree (Panels) and Growatt (Inverter)."
    },
    {
      step: "12",
      process: "P3",
      name: "Warehouse QC & Inwarding (GRN)",
      responsiblePerson: "D. Senthil",
      department: "Procurement & Stores",
      assignedDate: "26 Oct 2026",
      targetDate: "29 Oct 2026",
      actualDate: "29 Oct 2026",
      status: "COMPLETED",
      remarks: "GRN-8910 logged. Barcodes scanned: W-550-9811 through 9816. Flash test verified."
    },
    {
      step: "13",
      process: "P3",
      name: "Material Dispatch to Site",
      responsiblePerson: "D. Senthil",
      department: "Procurement & Stores",
      assignedDate: "29 Oct 2026",
      targetDate: "31 Oct 2026",
      actualDate: "30 Oct 2026",
      status: "COMPLETED",
      remarks: "Vehicle TN-30-AZ-4102. Delivery challan stamped by consumer on 30 Oct 2026."
    },
    {
      step: "14",
      process: "P4",
      name: "Civil Structure & Module Mounting",
      responsiblePerson: "M. Saravanan",
      department: "EPC Site Operations",
      assignedDate: "31 Oct 2026",
      targetDate: "03 Nov 2026",
      actualDate: null,
      status: "IN PROGRESS",
      remarks: "Galvanized rails anchored. Torque check (24 Nm) underway. 4 panels mounted."
    },
    {
      step: "15",
      process: "P4",
      name: "Electrical Cabling & Inverter Commissioning",
      responsiblePerson: "M. Saravanan",
      department: "EPC Site Operations",
      assignedDate: "03 Nov 2026",
      targetDate: "05 Nov 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: Earth resistance testing (<5Ω). Scheduled immediately upon structure lock."
    },
    {
      step: "16",
      process: "P4",
      name: "10% On Installation Milestone Receipt",
      responsiblePerson: "A. Lakshmi",
      department: "Commercial Accounts",
      assignedDate: "05 Nov 2026",
      targetDate: "07 Nov 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: ₹21,500 milestone invoice to be raised upon Step 14/15 site sign-off."
    },
    {
      step: "17",
      process: "P4",
      name: "TANGEDCO Net Metering & Grid Sync",
      responsiblePerson: "V. Thangavel",
      department: "Government Liaison",
      assignedDate: "07 Nov 2026",
      targetDate: "12 Nov 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: Awaiting DISCOM field inspection and bi-directional meter release."
    },
    {
      step: "18",
      process: "P5",
      name: "10% Final Balance Collection",
      responsiblePerson: "A. Lakshmi",
      department: "Commercial Accounts",
      assignedDate: "12 Nov 2026",
      targetDate: "14 Nov 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: Final commercial balance ₹21,500 for zero balance commercial closure."
    },
    {
      step: "19",
      process: "P5",
      name: "PM Surya Ghar Subsidy Claim",
      responsiblePerson: "S. Priya",
      department: "Central Subsidy Desk",
      assignedDate: "14 Nov 2026",
      targetDate: "16 Nov 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: Work completion report & net-meter sync certificate upload to National Portal."
    },
    {
      step: "20",
      process: "P5",
      name: "DBT Subsidy Credit & Triple Closure",
      responsiblePerson: "G. Venkatesh",
      department: "Central PMO / Coordinator",
      assignedDate: "16 Nov 2026",
      targetDate: "16 Dec 2026",
      actualDate: null,
      status: "PENDING",
      remarks: "Pending: ₹78,000 DBT credit verification in consumer bank. Final Triple Closure."
    }
  ];

  // Process Pipeline Filters State
  const [selectedProcessFilter, setSelectedProcessFilter] = useState("all");
  const [selectedStatusFilter, setSelectedStatusFilter] = useState("all");

  const PROCESS_STAGES = [
    { id: "all", label: "All Processes", range: "01-20", count: 20 },
    { id: "P1", label: "P1: Sales", range: "01-06", count: 6 },
    { id: "P2", label: "P2: Approvals", range: "07-10", count: 4 },
    { id: "P3", label: "P3: Stores", range: "11-13", count: 3 },
    { id: "P4", label: "P4: EPC Execution", range: "14-17", count: 4 },
    { id: "P5", label: "P5: Subsidy", range: "18-20", count: 3 },
  ];

  const filteredActivities = responsibilityActivities.filter((act) => {
    const matchesProcess = selectedProcessFilter === "all" || act.process === selectedProcessFilter;
    const matchesStatus = selectedStatusFilter === "all" || act.status === selectedStatusFilter;
    return matchesProcess && matchesStatus;
  });

  // Active activity (Step 14)
  const currentActiveStep = responsibilityActivities.find((a) => a.status === "IN PROGRESS") || responsibilityActivities[13];

  return (
    <div className="space-y-6 bg-white pb-12">
      
      {/* Back Breadcrumb */}
      <div>
        <Link to="/projects"
          className="inline-flex items-center space-x-1.5 text-xs text-zinc-500 hover:text-black font-mono transition-colors active:scale-[0.98]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Projects / {project.id}</span>
        </Link>
      </div>

      {/* Top Banner Card: Section 3.2 One Project – One Complete Digital File */}
      <div className="p-5 sm:p-6 bg-white border border-zinc-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div className="space-y-1">
            <div className="flex items-center space-x-2.5 flex-wrap gap-y-1">
              <span className={`w-2.5 h-2.5 rounded-full ${project.status === "ACTIVE" ? "bg-emerald-500" : "bg-blue-500"}`} />
              <h1 className="text-xl sm:text-2xl font-bold text-black tracking-tight">
                {project.customerName}
              </h1>
              <span className="font-mono text-xs bg-zinc-100 text-zinc-800 px-2 py-0.5 border border-zinc-300 font-bold">
                {project.id}
              </span>
              <span className="font-mono text-[11px] bg-blue-50 text-blue-700 px-2 py-0.5 border border-blue-200 font-semibold">
                {project.customerCode || "CUST-SLM-0089"}
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-x-3 text-xs text-zinc-500 font-mono pt-0.5">
              <span>{project.branch} Division</span>
              <span>•</span>
              <span>EB Connection: <strong>{project.consumerNumber}</strong></span>
              <span>•</span>
              <span className="text-zinc-800 font-semibold">{project.category}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2 shrink-0">
            <button
              onClick={() => {
                const message = encodeURIComponent(`NIRT Energy Update for ${project.customerName} (Project ${project.id}): Current Stage is ${project.stageName}.`);
                window.open(`https://wa.me/91${project.phone.replace(/[^0-9]/g, "")}?text=${message}`, "_blank");
              }}
              className="border border-zinc-300 hover:bg-zinc-50 px-3 py-1.5 text-xs font-semibold text-black transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center space-x-1.5 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Dispatch</span>
            </button>
            <button
              onClick={() => setShowPrintModal(true)}
              className="bg-black hover:bg-zinc-800 text-white px-3.5 py-1.5 text-xs font-semibold transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center space-x-1.5 shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>Print Project Summary</span>
            </button>
          </div>
        </div>

        {/* Financial & Capacity Specs Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-zinc-100 text-xs font-mono">
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">CAPACITY</span>
            <strong className="text-black text-sm">{project.capacityKw} kW Peak</strong>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">CONTRACT VALUE</span>
            <strong className="text-black text-sm">₹{project.totalValue.toLocaleString("en-IN")}</strong>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">80% ADVANCE STATUS</span>
            <strong className={`text-sm ${project.advancePaid >= project.totalValue * 0.8 ? "text-emerald-700 font-bold" : "text-blue-700 font-bold"}`}>
              ₹{project.advancePaid.toLocaleString("en-IN")} ({Math.round((project.advancePaid / project.totalValue) * 100)}%)
            </strong>
          </div>
          <div>
            <span className="text-zinc-400 block text-[10px] uppercase">LIFECYCLE STATUS</span>
            <strong className="text-black text-sm">{project.stageName}</strong>
          </div>
        </div>
      </div>

      {/* Refined Tab Navigation */}
      <div className="flex border-b border-slate-200 space-x-6 text-xs font-medium overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {[
          { id: "overview", label: "Customer Master Record" },
          { id: "responsibility", label: "Responsibility & Governance" },
          { id: "financials", label: "Financial Ledger (80/10/10)" },
          { id: "documents", label: `Document Locker (${project.documents?.length || 9})` },
          { id: "proposal", label: "Proposals & Revisions (Section 8)" },
          { id: "discom_subsidy", label: "DISCOM & Subsidy Sync" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`pb-3 whitespace-nowrap transition-colors border-b-2 -mb-[1px] ${
              activeTab === tab.id
                ? "border-slate-900 text-slate-900 font-bold"
                : "border-transparent text-slate-400 hover:text-slate-900"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 3.1 ONE CUSTOMER – ONE MASTER RECORD */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Identity & Contact Information */}
            <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-zinc-200 pb-2 flex items-center space-x-2">
                <User className="w-3.5 h-3.5 text-blue-600" />
                <span>Customer Identity & Contact</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Legal Name:</span>
                  <strong className="text-black">{project.customerName}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Master Customer ID:</span>
                  <strong className="text-black font-mono">{project.customerCode || "CUST-SLM-0089"}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Contact Number:</span>
                  <strong className="text-black font-mono">{project.phone}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Email Address:</span>
                  <strong className="text-black">{project.email}</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Aadhaar Verified:</span>
                  <strong className="text-emerald-700 font-mono">XXXX-XXXX-8912 ✓</strong>
                </div>
              </div>
            </div>

            {/* 2. Site Address & EB Connection Details */}
            <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-zinc-200 pb-2 flex items-center space-x-2">
                <MapPin className="w-3.5 h-3.5 text-indigo-600" />
                <span>Site Address & EB Connection</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Billing Address:</span>
                  <span className="text-black text-right font-medium">{project.address}</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Site Terrace Location:</span>
                  <span className="text-black text-right font-medium">{project.district} Circle (RCC Roof)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">TANGEDCO Consumer #:</span>
                  <strong className="text-black font-mono">{project.consumerNumber}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Sanctioned Load & Phase:</span>
                  <strong className="text-black font-mono">{project.sanctionedLoad} (Single Phase 230V)</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Tariff Classification:</span>
                  <strong className="text-zinc-800">LT Tariff 1A (Domestic Subsidy)</strong>
                </div>
              </div>
            </div>

            {/* 3. Engineering BOM & Project Details */}
            <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-zinc-200 pb-2 flex items-center space-x-2">
                <Zap className="w-3.5 h-3.5 text-blue-600" />
                <span>Project Specifications & BOM</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">System Capacity:</span>
                  <strong className="text-black font-mono">{project.capacityKw} kW Peak (DC)</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Solar Modules:</span>
                  <strong className="text-black text-right">{project.moduleBrand}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Grid Inverter:</span>
                  <strong className="text-black text-right">{project.inverterBrand}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Available Roof Area:</span>
                  <strong className="text-black font-mono">{project.usableAreaSqft} sq.ft</strong>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Structure Mounting:</span>
                  <strong className="text-zinc-800">Hot-dip GI Elevated Structure (Tilt 12°)</strong>
                </div>
              </div>
            </div>

            {/* 4. Subsidy & Communication History */}
            <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-black border-b border-zinc-200 pb-2 flex items-center space-x-2">
                <Activity className="w-3.5 h-3.5 text-emerald-600" />
                <span>Subsidy & Communication Trail</span>
              </h3>
              <div className="space-y-2 text-xs">
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">National Portal App #:</span>
                  <strong className="text-black font-mono">{project.subsidyStatus?.split("(")[1]?.replace(")", "") || "TN-SLM-2026-981"}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">MNRE Subsidy Eligibility:</span>
                  <strong className="text-emerald-700 font-mono">₹{project.subsidyEligible.toLocaleString("en-IN")}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">DISCOM Sanction Ref:</span>
                  <strong className="text-black font-mono">{project.discomAppNo}</strong>
                </div>
                <div className="flex justify-between py-1 border-b border-zinc-100">
                  <span className="text-zinc-500">Communication Logs:</span>
                  <span className="text-zinc-800 font-semibold">{communicationLogs.length} Recorded Touchpoints</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-zinc-500">Lead Responsible Staff:</span>
                  <strong className="text-black">{project.assignedEngineer}</strong>
                </div>
              </div>
            </div>

            {/* 5. Complete Customer Communication History (Section 3.1) */}
            <div className="md:col-span-2 p-5 bg-white border border-zinc-200 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-zinc-200 gap-2">
                <div>
                  <h3 className="font-bold text-xs uppercase tracking-wider text-black flex items-center space-x-2">
                    <Activity className="w-3.5 h-3.5 text-blue-600" />
                    <span>Customer Communication History & Dispatch Trail (Section 3.1)</span>
                  </h3>
                  <p className="text-[11px] text-zinc-500 mt-0.5">
                    Immutable chronological record of customer touchpoints across WhatsApp, Phone calls, Email receipts, and Site visits.
                  </p>
                </div>
                <div className="flex items-center space-x-2 shrink-0">
                  <button
                    onClick={() => {
                      const msg = encodeURIComponent(`NIRT Solar Update for ${project.customerName} (Project ${project.id}): Work is in progress on Step 14.`);
                      window.open(`https://wa.me/91${project.phone.replace(/[^0-9]/g, "")}?text=${msg}`, "_blank");
                    }}
                    className="border border-zinc-300 hover:bg-zinc-50 px-2.5 py-1 text-xs font-semibold text-black flex items-center space-x-1.5 shadow-2xs"
                  >
                    <Share2 className="w-3 h-3 text-emerald-600" />
                    <span>Quick WhatsApp</span>
                  </button>
                  <button
                    onClick={() => setShowAddLogModal(true)}
                    className="bg-black hover:bg-zinc-800 text-white px-3 py-1 text-xs font-semibold flex items-center space-x-1.5 shadow-2xs"
                  >
                    <span>+ Log New Touchpoint</span>
                  </button>
                </div>
              </div>

              {/* Timeline Items */}
              <div className="space-y-3">
                {communicationLogs.map((log) => (
                  <div key={log.id} className="p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/60 hover:bg-zinc-50 transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                          log.channel === "WhatsApp"
                            ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                            : log.channel === "Phone Call"
                            ? "bg-blue-100 text-blue-900 border border-blue-300"
                            : log.channel === "Email"
                            ? "bg-violet-100 text-violet-900 border border-violet-300"
                            : "bg-zinc-200 text-zinc-800"
                        }`}>
                          {log.channel}
                        </span>
                        <strong className="text-xs text-black">{log.type}</strong>
                        <span className="text-[10px] text-zinc-400 font-mono">• Logged by {log.staff}</span>
                      </div>
                      <p className="text-xs text-zinc-700 leading-relaxed pt-0.5">
                        {log.summary}
                      </p>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-[11px] font-mono text-zinc-500 block">{log.date}</span>
                      <span className="text-[10px] text-emerald-700 font-semibold">{log.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: RESPONSIBILITY & GOVERNANCE MATRIX */}
      {activeTab === "responsibility" && (
        <div className="space-y-6">
          
          {/* Executive Governance Card (Apple Frosted Glass) */}
          <div className="glass-surface p-5 sm:p-6 rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            
            {/* Top Sub-Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                  Active Milestone: Step {currentActiveStep.step} • {currentActiveStep.name}
                </span>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Project File: <strong className="text-slate-700">{project.id}</strong>
              </span>
            </div>

            {/* 2 Balanced Executive Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* Card 1: Responsible Activity Owner */}
              <div className="p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80 space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 flex items-center space-x-1.5">
                  <User className="w-3.5 h-3.5 text-blue-600" />
                  <span>Responsible Activity Owner</span>
                </span>
                
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-900 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs font-mono">
                    MS
                  </div>
                  <div className="min-w-0">
                    <h4 className="text-sm font-bold text-slate-900 truncate">
                      {currentActiveStep.responsiblePerson}
                    </h4>
                    <p className="text-xs text-slate-500 truncate">
                      {currentActiveStep.department} • Field Lead
                    </p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 font-mono">Assigned: {currentActiveStep.assignedDate}</span>
                  <a 
                    href={`https://wa.me/91${project.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank" 
                    rel="noreferrer"
                    className="text-emerald-700 font-semibold hover:underline flex items-center space-x-1"
                  >
                    <span>Contact Lead</span>
                  </a>
                </div>
              </div>

              {/* Card 2: Current Status & Pending Reason */}
              <div className="p-4 rounded-2xl bg-blue-50/40 border border-blue-100/90 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-blue-700 flex items-center space-x-1.5">
                    <AlertCircle className="w-3.5 h-3.5 text-blue-600" />
                    <span>Current Status & Pending Reason</span>
                  </span>
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-100 text-blue-800 border border-blue-200">
                    Target: {currentActiveStep.targetDate}
                  </span>
                </div>

                <div className="p-2.5 rounded-xl bg-white border border-blue-200/60 text-xs text-slate-800 leading-relaxed font-medium shadow-2xs">
                  {currentActiveStep.remarks}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-500 font-mono pt-1">
                  <span>SLA Status: <strong className="text-emerald-700">On Track</strong></span>
                  <span>Lifecycle Stage: {currentActiveStep.step} of 20</span>
                </div>
              </div>

            </div>
          </div>

          {/* 20-Step Responsibility Matrix Table with Process Filter */}
          <div className="border border-zinc-200 overflow-hidden shadow-xs">
            <div className="p-4 bg-zinc-50 border-b border-zinc-200 space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-black">
                    Complete 20-Step Activity Responsibility Matrix
                  </h3>
                  <p className="text-xs text-zinc-500">
                    Strict departmental accountability: named owner, assigned date, target SLA date, actual date, and field audit remarks.
                  </p>
                </div>
                
                {/* Status Dropdown Filter */}
                <div className="flex items-center space-x-2 shrink-0">
                  <span className="text-[11px] text-zinc-500 font-medium">Status:</span>
                  <select
                    value={selectedStatusFilter}
                    onChange={(e) => setSelectedStatusFilter(e.target.value)}
                    className="text-xs px-2.5 py-1 rounded-lg border border-zinc-300 bg-white font-medium text-zinc-800 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="all">All Statuses (20)</option>
                    <option value="IN PROGRESS">In Progress (1)</option>
                    <option value="COMPLETED">Completed (13)</option>
                    <option value="PENDING">Pending (6)</option>
                  </select>
                </div>
              </div>

              {/* Segmented 5-Process Pipeline Switcher Pills */}
              <div className="flex items-center space-x-1.5 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                {PROCESS_STAGES.map((proc) => {
                  const isSelected = selectedProcessFilter === proc.id;
                  return (
                    <button
                      key={proc.id}
                      onClick={() => setSelectedProcessFilter(proc.id)}
                      className={`apple-button shrink-0 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center space-x-1.5 ${
                        isSelected
                          ? "bg-slate-900 text-white shadow-xs"
                          : "bg-white text-zinc-600 hover:text-black border border-zinc-200 hover:bg-zinc-100/80"
                      }`}
                    >
                      <span>{proc.label}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                        isSelected ? "bg-slate-800 text-blue-300" : "bg-zinc-100 text-zinc-500"
                      }`}>
                        {proc.range}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-zinc-100/70 border-b border-zinc-200 text-zinc-600 font-bold uppercase text-[10px] tracking-wider">
                  <tr>
                    <th className="p-3 border-r border-zinc-200">Step</th>
                    <th className="p-3 border-r border-zinc-200">Process</th>
                    <th className="p-3 border-r border-zinc-200">Activity Name</th>
                    <th className="p-3 border-r border-zinc-200">Responsible Person</th>
                    <th className="p-3 border-r border-zinc-200">Department</th>
                    <th className="p-3 border-r border-zinc-200">Assigned / Target Date</th>
                    <th className="p-3 border-r border-zinc-200">Actual Date</th>
                    <th className="p-3 border-r border-zinc-200">Status</th>
                    <th className="p-3 min-w-[260px]">Remarks (What is Pending & Why)</th>
                  </tr>
                </thead>
                <tbody className="divide-y border-zinc-100">
                  {filteredActivities.map((act) => {
                    const isCompleted = act.status === "COMPLETED";
                    const isInProgress = act.status === "IN PROGRESS";

                    return (
                      <tr 
                        key={act.step}
                        className={`transition-colors ${
                          isInProgress ? "bg-blue-50/50 font-medium" : "hover:bg-zinc-50/70"
                        }`}
                      >
                        <td className="p-3 border-r border-zinc-100 font-mono font-bold text-black">
                          {act.step}
                        </td>
                        <td className="p-3 border-r border-zinc-100 font-mono font-bold text-[10px] text-zinc-500">
                          {act.process}
                        </td>
                        <td className="p-3 border-r border-zinc-100 font-semibold text-zinc-900">
                          {act.name}
                        </td>
                        <td className="p-3 border-r border-zinc-100 text-black font-semibold">
                          {act.responsiblePerson}
                        </td>
                        <td className="p-3 border-r border-zinc-100 text-zinc-600">
                          {act.department}
                        </td>
                        <td className="p-3 border-r border-zinc-100 font-mono text-[11px] text-zinc-600">
                          <div>Assigned: {act.assignedDate}</div>
                          <div className="text-zinc-400">Target: {act.targetDate}</div>
                        </td>
                        <td className="p-3 border-r border-zinc-100 font-mono text-[11px]">
                          {act.actualDate ? (
                            <span className="text-emerald-700 font-semibold">{act.actualDate}</span>
                          ) : (
                            <span className="text-zinc-400 italic">Pending</span>
                          )}
                        </td>
                        <td className="p-3 border-r border-zinc-100">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono inline-block ${
                            isCompleted
                              ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                              : isInProgress
                              ? "bg-blue-100 text-blue-900 border border-blue-300 animate-pulse"
                              : "bg-zinc-100 text-zinc-500 border border-zinc-200"
                          }`}>
                            {act.status}
                          </span>
                        </td>
                        <td className="p-3 text-zinc-700 leading-relaxed text-[11px]">
                          <div>{act.remarks}</div>
                          {act.step === "03" && (
                            <button
                              type="button"
                              onClick={() => setIsSurveyModalOpen(true)}
                              className="mt-1.5 apple-button inline-flex items-center space-x-1.5 text-[10px] font-bold text-blue-700 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-lg hover:bg-blue-100 transition-colors shadow-2xs"
                            >
                              <span>BFRD §7 Survey Task &amp; Audit Dossier →</span>
                            </button>
                          )}
                        </td>
                      </tr>
                    );
                  })}

                  {filteredActivities.length === 0 && (
                    <tr>
                      <td colSpan={9} className="p-8 text-center text-zinc-400">
                        No activities match the selected process and status filter.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: 80/10/10 FINANCIAL LEDGER */}
      {activeTab === "financials" && (
        <div className="p-6 bg-white border border-zinc-200 shadow-xs space-y-6">
          <div className="border-b border-zinc-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-black">80/10/10 Milestone Financial Ledger</h3>
              <p className="text-xs text-zinc-500">Working capital security structure per NIRT commercial policy</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-zinc-500">Total Contract Value:</span>
              <div className="text-xl font-bold text-black font-mono">₹{project.totalValue.toLocaleString("en-IN")}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
            <div className="border border-zinc-200 p-3 bg-zinc-50">
              <span className="text-zinc-500 block text-[11px]">80% Upfront Advance Required:</span>
              <strong className="text-base text-black font-mono">₹{Math.round(project.totalValue * 0.8).toLocaleString("en-IN")}</strong>
            </div>
            <div className="border border-zinc-200 p-3 bg-zinc-50">
              <span className="text-zinc-500 block text-[11px]">Total Realized to Date:</span>
              <strong className="text-base text-emerald-700 font-mono">₹{project.advancePaid.toLocaleString("en-IN")}</strong>
            </div>
            <div className="border border-zinc-200 p-3 bg-zinc-50">
              <span className="text-zinc-500 block text-[11px]">Remaining Receivables:</span>
              <strong className="text-base text-blue-700 font-mono">₹{project.balanceDue.toLocaleString("en-IN")}</strong>
            </div>
          </div>

          <div className="border border-zinc-200 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-700">
                <tr>
                  <th className="p-3 border-r border-zinc-200">Milestone Stage</th>
                  <th className="p-3 border-r border-zinc-200">Ratio</th>
                  <th className="p-3 border-r border-zinc-200">Milestone Amount</th>
                  <th className="p-3 border-r border-zinc-200">Settlement Status</th>
                  <th className="p-3">Audit Reference & UTR</th>
                </tr>
              </thead>
              <tbody className="divide-y border-zinc-100 font-mono">
                <tr>
                  <td className="p-3 border-r border-zinc-100 font-sans font-semibold">1. Booking Advance & Feasibility Approval</td>
                  <td className="p-3 border-r border-zinc-100">80%</td>
                  <td className="p-3 border-r border-zinc-100">₹{Math.round(project.totalValue * 0.8).toLocaleString("en-IN")}</td>
                  <td className="p-3 border-r border-zinc-100 font-sans">
                    <span className="bg-emerald-100 text-emerald-900 border border-emerald-300 px-2 py-0.5 text-[10px] font-semibold">
                      RECONCILED
                    </span>
                  </td>
                  <td className="p-3 text-[10px] text-zinc-600">UTR: ICIC202610190042 • Receipt #REC-SLM-041</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-zinc-100 font-sans font-semibold">2. Structural Assembly & Module Mounting</td>
                  <td className="p-3 border-r border-zinc-100">10%</td>
                  <td className="p-3 border-r border-zinc-100">₹{Math.round(project.totalValue * 0.1).toLocaleString("en-IN")}</td>
                  <td className="p-3 border-r border-zinc-100 font-sans">
                    <span className="border border-zinc-300 px-2 py-0.5 text-[10px] text-zinc-600">
                      INVOICE DISPATCHED
                    </span>
                  </td>
                  <td className="p-3 text-[10px] text-zinc-500">Invoice #INV-26-089 (Due at physical installation)</td>
                </tr>
                <tr>
                  <td className="p-3 border-r border-zinc-100 font-sans font-semibold">3. TANGEDCO Net-Meter Synchronization</td>
                  <td className="p-3 border-r border-zinc-100">10%</td>
                  <td className="p-3 border-r border-zinc-100">₹{Math.round(project.totalValue * 0.1).toLocaleString("en-IN")}</td>
                  <td className="p-3 border-r border-zinc-100 font-sans">
                    <span className="text-zinc-400 text-[10px]">UPON NET-METER SYNC</span>
                  </td>
                  <td className="p-3 text-[10px] text-zinc-400">Triggered on bidirectional meter install</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: UNIFIED CUSTOMER DOCUMENT LOCKER (3.2) */}
      {activeTab === "documents" && (
        <div className="p-6 bg-white border border-zinc-200 shadow-xs space-y-4">
          <div className="border-b border-zinc-200 pb-3 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-base text-black">Unified Customer Document Locker</h3>
              <p className="text-xs text-zinc-500">Statutory documents and certificates permanently bound to Project ID {project.id}</p>
            </div>
            <button
              onClick={() => alert("Upload dialog: Accepts PDF, JPG, PNG up to 25MB")}
              className="bg-black hover:bg-zinc-800 text-white px-3 py-1.5 text-xs font-semibold transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center space-x-1.5 shadow-xs"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Document</span>
            </button>
          </div>

          <div className="border border-zinc-200 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-zinc-50 border-b border-zinc-200 font-semibold text-zinc-700">
                <tr>
                  <th className="p-3 border-r border-zinc-200">Document Specification</th>
                  <th className="p-3 border-r border-zinc-200">Verification Status</th>
                  <th className="p-3 border-r border-zinc-200">Filing Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y border-zinc-100">
                {project.documents.map((doc, idx) => (
                  <tr key={idx} className="hover:bg-zinc-50/80 transition-colors">
                    <td className="p-3 border-r border-zinc-100 font-medium flex items-center space-x-2">
                      <FileText className="w-4 h-4 text-zinc-500" />
                      <span>{doc.name}</span>
                    </td>
                    <td className="p-3 border-r border-zinc-100">
                      <span className={`px-2 py-0.5 text-[10px] font-semibold ${
                        doc.status === "Verified"
                          ? "bg-zinc-100 text-black border border-zinc-300"
                          : "bg-zinc-50 text-zinc-500 border border-zinc-200"
                      }`}>
                        {doc.status}
                      </span>
                    </td>
                    <td className="p-3 border-r border-zinc-100 text-zinc-500 font-mono">
                      {doc.date || "Awaiting Verification"}
                    </td>
                    <td className="p-3 text-right">
                      <button
                        onClick={() => setSelectedDocPreview(doc)}
                        className="text-xs text-black font-semibold hover:underline flex items-center justify-end space-x-1 ml-auto"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 5: PARALLEL DISCOM & SUBSIDY SUB-TRACKS */}
      {activeTab === "proposal" && (
        <ProposalManager project={project} />
      )}

      {activeTab === "discom_subsidy" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-4">
            <div className="border-b border-zinc-200 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-black">DISCOM & Net-Metering Sub-Track</h3>
                <span className="text-[10px] text-zinc-500 font-mono">TANGEDCO {project.branch} Circle</span>
              </div>
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono px-2 py-0.5 border border-zinc-200">
                PARALLEL
              </span>
            </div>

            <div className="space-y-3">
              {[
                { stage: "Portal Application Submitted", status: "Done", date: "2026-10-14", appNo: project.discomAppNo },
                { stage: "Technical Feasibility Sanctioned", status: "Done", date: "2026-10-18", appNo: "TF-8941" },
                { stage: "Work Execution & Plant Readiness", status: "In Progress", date: "2026-10-24", appNo: "-" },
                { stage: "DISCOM AE Field Inspection", status: "Upcoming", date: "Target: Nov 05", appNo: "-" },
                { stage: "Bidirectional Net Meter Installed", status: "Pending", date: "-", appNo: "-" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs border-l-2 border-zinc-200 pl-3 py-1">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${step.status === "Done" ? "bg-black" : "bg-zinc-300"}`} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-black">{step.stage}</span>
                      <span className="text-zinc-400 text-[10px] font-mono">{step.date}</span>
                    </div>
                    {step.appNo !== "-" && (
                      <span className="text-[10px] text-zinc-500 font-mono">Ref: {step.appNo}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-5 bg-white border border-zinc-200 shadow-xs space-y-4">
            <div className="border-b border-zinc-200 pb-2 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-black">PM Surya Ghar Subsidy Sub-Track</h3>
                <span className="text-[10px] text-zinc-500 font-mono">National Solar Portal</span>
              </div>
              <span className="bg-zinc-100 text-zinc-700 text-[10px] font-mono px-2 py-0.5 border border-zinc-200">
                ₹{project.subsidyEligible.toLocaleString("en-IN")}
              </span>
            </div>

            <div className="space-y-3">
              {[
                { stage: "National Portal Registration", status: "Done", date: "2026-10-15" },
                { stage: "Customer Bank Verification (DBT)", status: "Done", date: "2026-10-16" },
                { stage: "Commissioning & Sync Report Submission", status: "Pending Net Meter", date: "-" },
                { stage: "MNRE Portal Verification", status: "Pending", date: "-" },
                { stage: "Direct Benefit Transfer (DBT Credit)", status: "Pending", date: "Est: 30 days post-sync" },
              ].map((step, idx) => (
                <div key={idx} className="flex items-start space-x-3 text-xs border-l-2 border-zinc-200 pl-3 py-1">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${step.status === "Done" ? "bg-black" : "bg-zinc-300"}`} />
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <span className="font-semibold text-black">{step.stage}</span>
                      <span className="text-zinc-400 text-[10px] font-mono">{step.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Document Inspector Modal */}
      {selectedDocPreview && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 max-w-lg w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
              <div>
                <h4 className="font-bold text-sm text-black">{selectedDocPreview.name}</h4>
                <p className="text-xs text-zinc-500">Document Specification & Verification Record</p>
              </div>
              <button onClick={() => setSelectedDocPreview(null)} className="text-zinc-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="h-44 bg-zinc-50 border border-dashed border-zinc-300 flex flex-col items-center justify-center text-center p-4">
              <FileText className="w-10 h-10 text-zinc-400 mb-2" />
              <span className="text-xs font-semibold text-black">{selectedDocPreview.name}</span>
              <span className="text-[10px] text-zinc-500 mt-1">Verified on {selectedDocPreview.date || "2026-10-18"} • SHA-256 Validated</span>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-emerald-700 font-semibold font-mono">Status: Verified ✓</span>
              <button 
                onClick={() => setSelectedDocPreview(null)}
                className="bg-black text-white text-xs px-4 py-1.5 font-semibold"
              >
                Close Inspector
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Executive Printable Summary Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4">
          <div className="bg-white border border-zinc-300 max-w-2xl w-full p-6 shadow-xl space-y-5">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
              <div>
                <h4 className="font-bold text-base text-black">NIRT Energy Project Summary Report</h4>
                <p className="text-xs text-zinc-500">Official execution sheet & compliance certificate summary</p>
              </div>
              <button onClick={() => setShowPrintModal(false)} className="text-zinc-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono border-b border-zinc-200 pb-4">
              <div>
                <span className="text-zinc-400 block text-[10px]">CLIENT</span>
                <strong className="text-black text-sm font-sans">{project.customerName}</strong>
                <span className="text-zinc-500 block">{project.address}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">PROJECT IDENTIFIER</span>
                <strong className="text-black text-sm">{project.id}</strong>
                <span className="text-zinc-500 block">EB: {project.consumerNumber}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">CAPACITY & SPECS</span>
                <strong className="text-black">{project.capacityKw} kW Peak</strong>
                <span className="text-zinc-500 block">{project.moduleBrand}</span>
              </div>
              <div>
                <span className="text-zinc-400 block text-[10px]">COMMERCIAL TOTAL</span>
                <strong className="text-black">₹{project.totalValue.toLocaleString("en-IN")}</strong>
                <span className="text-emerald-700 block font-semibold">Advance: ₹{project.advancePaid.toLocaleString("en-IN")}</span>
              </div>
            </div>

            <div className="flex justify-end space-x-2 pt-2">
              <button
                onClick={() => setShowPrintModal(false)}
                className="border border-zinc-300 px-4 py-1.5 text-xs font-semibold text-black hover:bg-zinc-50"
              >
                Close
              </button>
              <button
                onClick={() => {
                  window.print();
                  setShowPrintModal(false);
                }}
                className="bg-black text-white px-4 py-1.5 text-xs font-semibold hover:bg-zinc-800 flex items-center space-x-1.5"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Execute Print</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Log New Touchpoint Modal (Section 3.1) */}
      {showAddLogModal && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border border-zinc-300 max-w-md w-full p-6 shadow-xl space-y-4">
            <div className="flex justify-between items-start border-b border-zinc-200 pb-3">
              <div>
                <h4 className="font-bold text-sm text-black">Log Customer Touchpoint</h4>
                <p className="text-xs text-zinc-500">Append new communication record to Project {project.id}</p>
              </div>
              <button onClick={() => setShowAddLogModal(false)} className="text-zinc-400 hover:text-black">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddLog} className="space-y-3.5">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">Communication Channel</label>
                  <select
                    value={newLogChannel}
                    onChange={(e) => setNewLogChannel(e.target.value)}
                    className="w-full text-xs p-2 border border-zinc-300 rounded bg-white text-zinc-800 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="WhatsApp">WhatsApp</option>
                    <option value="Phone Call">Phone Call</option>
                    <option value="Email">Email</option>
                    <option value="In-Person">In-Person Visit</option>
                    <option value="SMS">SMS Alert</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[11px] font-bold text-zinc-700 block">Touchpoint Type</label>
                  <select
                    value={newLogType}
                    onChange={(e) => setNewLogType(e.target.value)}
                    className="w-full text-xs p-2 border border-zinc-300 rounded bg-white text-zinc-800 focus:outline-none focus:ring-1 focus:ring-black"
                  >
                    <option value="General Customer Update">General Update</option>
                    <option value="Site Survey Coordination">Site Survey</option>
                    <option value="Payment Follow-up">Payment Follow-up</option>
                    <option value="Material Dispatch Update">Material Dispatch</option>
                    <option value="DISCOM Inspection Sync">DISCOM Sync</option>
                    <option value="Subsidy Verification">Subsidy Query</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[11px] font-bold text-zinc-700 block">Detailed Notes & Discussion Summary</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter details of conversation, customer confirmation, or update dispatched..."
                  value={newLogSummary}
                  onChange={(e) => setNewLogSummary(e.target.value)}
                  className="w-full text-xs p-2.5 border border-zinc-300 rounded bg-white text-zinc-800 focus:outline-none focus:ring-1 focus:ring-black"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddLogModal(false)}
                  className="border border-zinc-300 px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-black text-white px-4 py-1.5 text-xs font-semibold hover:bg-zinc-800"
                >
                  Save to Customer File
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BFRD §7 Site Survey Task & Field Audit Modal */}
      <SiteSurveyModal
        isOpen={isSurveyModalOpen}
        project={project}
        onClose={() => setIsSurveyModalOpen(false)}
        onSurveyCompleted={(projId, data) => {
          setIsSurveyModalOpen(false);
        }}
      />

    </div>
  );
}