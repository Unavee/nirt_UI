import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { MOCK_PROJECTS } from "@/data/mockProjects";
import SiteSurveyModal from "@/components/SiteSurveyModal";
import ProposalManager from "@/components/proposal/ProposalManager";
import CustomerConfirmationModal from "@/components/confirmation/CustomerConfirmationModal";
import ComplaintTicketModal from "@/components/service/ComplaintTicketModal";
import TicketLifecycleModal from "@/components/service/TicketLifecycleModal";
import { INITIAL_SERVICE_TICKETS } from "@/data/serviceTicketsData";
import { MASTER_AUDIT_LOGS } from "@/data/auditTrailData";
import { INITIAL_APPROVAL_REQUESTS } from "@/data/approvalsData";
import ApprovalDecisionModal from "@/components/approvals/ApprovalDecisionModal";
import { INITIAL_STORE_INVENTORY } from "@/data/storeInventoryData";
import MaterialIssueModal from "@/components/store/MaterialIssueModal";
import MaterialReturnModal from "@/components/store/MaterialReturnModal";
import StoreManagementView from "@/components/store/StoreManagementView";
import { INITIAL_INSTALLATION_DATA } from "@/data/installationData";
import InstallationManagementView from "@/components/installation/InstallationManagementView";
import UpdateInstallationModal from "@/components/installation/UpdateInstallationModal";
import InstallationSignOffModal from "@/components/installation/InstallationSignOffModal";
import { INITIAL_PROJECT_PROGRESS_MAP } from "@/data/projectProgressData";
import ProjectProgressTrackerView from "@/components/progress/ProjectProgressTrackerView";
import UpdateStageModal from "@/components/progress/UpdateStageModal";
import { INITIAL_INSPECTIONS_DATA } from "@/data/inspectionData";
import InspectionManagementView from "@/components/inspection/InspectionManagementView";
import InspectionStatusModal from "@/components/inspection/InspectionStatusModal";
import CommissioningReportModal from "@/components/inspection/CommissioningReportModal";
import { INITIAL_NET_METERING_DATA } from "@/data/netMeteringData";
import NetMeteringManagementView from "@/components/netmetering/NetMeteringManagementView";
import UpdateNetMeterModal from "@/components/netmetering/UpdateNetMeterModal";
import NetMeterCertificateModal from "@/components/netmetering/NetMeterCertificateModal";
import { INITIAL_FINAL_PAYMENT_DATA } from "@/data/finalPaymentData";
import FinalPaymentManagementView from "@/components/finalpayment/FinalPaymentManagementView";
import RecordFinalPaymentModal from "@/components/finalpayment/RecordFinalPaymentModal";
import SendReminderModal from "@/components/finalpayment/SendReminderModal";
import NoDuesCertificateModal from "@/components/finalpayment/NoDuesCertificateModal";
import { INITIAL_SUBSIDY_DATA } from "@/data/subsidyData";
import SubsidyManagementView from "@/components/subsidy/SubsidyManagementView";
import UpdateSubsidyModal from "@/components/subsidy/UpdateSubsidyModal";
import SubsidySanctionModal from "@/components/subsidy/SubsidySanctionModal";
import { INITIAL_PROJECT_CLOSURE_DATA } from "@/data/projectClosureData";
import ProjectClosureView from "@/components/closure/ProjectClosureView";
import UpdateClosureChecklistModal from "@/components/closure/UpdateClosureChecklistModal";
import ProjectClosureCertificateModal from "@/components/closure/ProjectClosureCertificateModal";
import { INITIAL_PROCUREMENT_ITEMS } from "@/data/procurementData";
import ProcurementModal from "@/components/procurement/ProcurementModal";
import GoodsReceiptModal from "@/components/procurement/GoodsReceiptModal";
import ProcurementView from "@/components/procurement/ProcurementView";
import { INITIAL_TECHNICAL_FEASIBILITY } from "@/data/technicalFeasibilityData";
import FeasibilityAssessmentModal from "@/components/feasibility/FeasibilityAssessmentModal";
import TechnicalFeasibilityView from "@/components/feasibility/TechnicalFeasibilityView";
import { INITIAL_DISCOM_APPLICATIONS, DISCOM_STATUS_STAGES } from "@/data/discomApplicationsData";
import DISCOMStatusModal from "@/components/discom/DISCOMStatusModal";
import DISCOMSanctionCertificateModal from "@/components/discom/DISCOMSanctionCertificateModal";
import { INITIAL_PAYMENTS } from "@/data/paymentsData";
import RecordPaymentModal from "@/components/payments/RecordPaymentModal";
import PaymentReceiptModal from "@/components/payments/PaymentReceiptModal";
import { DOCUMENT_CATEGORIES, INITIAL_PROJECT_DOCUMENTS } from "@/data/projectDocumentsData";
import DocumentVersionModal from "@/components/documents/DocumentVersionModal";
import DocumentUploadModal from "@/components/documents/DocumentUploadModal";

import {
  Plus,
  Headset,
  GitCommit,
  Search,
  Filter,
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
  const [payments, setPayments] = useState(
    INITIAL_PAYMENTS.filter(p => p.projectId === project.id).length > 0
      ? INITIAL_PAYMENTS.filter(p => p.projectId === project.id)
      : INITIAL_PAYMENTS.map(p => ({ ...p, projectId: project.id }))
  );
  const [isRecordPaymentOpen, setIsRecordPaymentOpen] = useState(false);
  const [selectedReceiptPayment, setSelectedReceiptPayment] = useState(null);
  const [discomApp, setDiscomApp] = useState(
    INITIAL_DISCOM_APPLICATIONS.find(d => d.projectId === project.id) || {
      ...INITIAL_DISCOM_APPLICATIONS[0],
      projectId: project.id,
      customerName: project.customerName,
      consumerNumber: project.consumerNumber || "04-219-002-1482",
      appliedCapacityKw: project.capacityKw || 3.3
    }
  );
  const [isDiscomStatusModalOpen, setIsDiscomStatusModalOpen] = useState(false);
  const [isSanctionCertModalOpen, setIsSanctionCertModalOpen] = useState(false);
  const [feasibilityRecord, setFeasibilityRecord] = useState(
    INITIAL_TECHNICAL_FEASIBILITY.find(f => f.projectId === project.id) || {
      ...INITIAL_TECHNICAL_FEASIBILITY[0],
      projectId: project.id,
      customerName: project.customerName,
      consumerNumber: project.consumerNumber || "04-219-002-1482",
      appliedCapacityKw: project.capacityKw || 3.3,
      approvedCapacityKw: project.capacityKw || 3.3
    }
  );
  const [isFeasibilityModalOpen, setIsFeasibilityModalOpen] = useState(false);
  const [discomHubSubTab, setDiscomHubSubTab] = useState("feasibility");
  const [procurementItems, setProcurementItems] = useState(
    INITIAL_PROCUREMENT_ITEMS.filter(i => i.projectId === project.id).length > 0
      ? INITIAL_PROCUREMENT_ITEMS.filter(i => i.projectId === project.id)
      : INITIAL_PROCUREMENT_ITEMS.map(i => ({ ...i, projectId: project.id }))
  );
  const [selectedProcurementItem, setSelectedProcurementItem] = useState(null);
  const [isProcurementModalOpen, setIsProcurementModalOpen] = useState(false);
  const [isGRNModalOpen, setIsGRNModalOpen] = useState(false);
  const [storeInventory, setStoreInventory] = useState(
    INITIAL_STORE_INVENTORY.filter(i => i.projectId === project.id).length > 0
      ? INITIAL_STORE_INVENTORY.filter(i => i.projectId === project.id)
      : INITIAL_STORE_INVENTORY.map(i => ({ ...i, projectId: project.id }))
  );
  const [selectedStoreItem, setSelectedStoreItem] = useState(null);
  const [isIssueModalOpen, setIsIssueModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);

  const [installationState, setInstallationState] = useState(
    INITIAL_INSTALLATION_DATA[project.id] || {
      ...INITIAL_INSTALLATION_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      systemCapacity: project.capacity || "50 kWp",
      siteAddress: project.address || "Project Site"
    }
  );
  const [isUpdateInstallModalOpen, setIsUpdateInstallModalOpen] = useState(false);
  const [isInstallSignOffModalOpen, setIsInstallSignOffModalOpen] = useState(false);

  const [projectProgress, setProjectProgress] = useState(
    INITIAL_PROJECT_PROGRESS_MAP[project.id] || {
      ...INITIAL_PROJECT_PROGRESS_MAP["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp"
    }
  );
  const [selectedStageToUpdate, setSelectedStageToUpdate] = useState(null);
  const [isUpdateStageModalOpen, setIsUpdateStageModalOpen] = useState(false);

  const [inspectionState, setInspectionState] = useState(
    INITIAL_INSPECTIONS_DATA[project.id] || {
      ...INITIAL_INSPECTIONS_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp",
      siteAddress: project.address || "Project Site"
    }
  );
  const [isInspectionStatusModalOpen, setIsInspectionStatusModalOpen] = useState(false);
  const [isCommissioningReportModalOpen, setIsCommissioningReportModalOpen] = useState(false);

  const [netMeterState, setNetMeterState] = useState(
    INITIAL_NET_METERING_DATA[project.id] || {
      ...INITIAL_NET_METERING_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp"
    }
  );
  const [isUpdateMeterModalOpen, setIsUpdateMeterModalOpen] = useState(false);
  const [isNetMeterCertModalOpen, setIsNetMeterCertModalOpen] = useState(false);

  const [finalPaymentState, setFinalPaymentState] = useState(
    INITIAL_FINAL_PAYMENT_DATA[project.id] || {
      ...INITIAL_FINAL_PAYMENT_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp"
    }
  );
  const [isRecordFinalPayModalOpen, setIsRecordFinalPayModalOpen] = useState(false);
  const [isSendReminderModalOpen, setIsSendReminderModalOpen] = useState(false);
  const [isNoDuesModalOpen, setIsNoDuesModalOpen] = useState(false);

  const [subsidyState, setSubsidyState] = useState(
    INITIAL_SUBSIDY_DATA[project.id] || {
      ...INITIAL_SUBSIDY_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp"
    }
  );
  const [isUpdateSubsidyModalOpen, setIsUpdateSubsidyModalOpen] = useState(false);
  const [isSubsidySanctionModalOpen, setIsSubsidySanctionModalOpen] = useState(false);

  const [closureState, setClosureState] = useState(
    INITIAL_PROJECT_CLOSURE_DATA[project.id] || {
      ...INITIAL_PROJECT_CLOSURE_DATA["NIRT-26-0042"],
      projectId: project.id,
      projectName: project.name,
      customerName: project.customerName || "Customer",
      capacity: project.capacity || "50 kWp"
    }
  );
  const [isUpdateClosureModalOpen, setIsUpdateClosureModalOpen] = useState(false);
  const [isClosureCertModalOpen, setIsClosureCertModalOpen] = useState(false);





  const totalReceived = payments.reduce((acc, curr) => acc + (curr.paymentStatus !== "Bounced" ? curr.amount : 0), 0);
  const calculatedBalance = Math.max(0, project.totalValue - totalReceived);
  const advance80PercentRequired = Math.round(project.totalValue * 0.8);
  const is80PercentCleared = totalReceived >= advance80PercentRequired;

  const [projectDocs, setProjectDocs] = useState(
    INITIAL_PROJECT_DOCUMENTS.filter(d => d.projectId === project.id).length > 0
      ? INITIAL_PROJECT_DOCUMENTS.filter(d => d.projectId === project.id)
      : INITIAL_PROJECT_DOCUMENTS.map(d => ({ ...d, projectId: project.id }))
  );
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState("all");
  const [docSearchQuery, setDocSearchQuery] = useState("");
  const [versionModalDoc, setVersionModalDoc] = useState(null);
  const [uploadModalState, setUploadModalState] = useState({ isOpen: false, targetDoc: null, defaultCat: "customer" });

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [projectTickets, setProjectTickets] = useState(
    INITIAL_SERVICE_TICKETS.filter(t => t.projectId === project.id).length > 0
      ? INITIAL_SERVICE_TICKETS.filter(t => t.projectId === project.id)
      : [
          {
            id: `TKT-2026-0091`,
            projectId: project.id,
            customerName: project.customerName,
            customerCode: project.customerCode || "CUST-SLM-0089",
            phone: project.phone,
            branch: project.branch || "Salem (HQ)",
            consumerNumber: project.consumerNumber || "04-219-002-1482",
            category: "inverter",
            categoryLabel: "Inverter Issues",
            title: "Routine Scheduled Generation Audit & Inverter Firmware Check",
            description: "Semi-annual post-commissioning service check for grid frequency stability.",
            priority: "Medium",
            stage: "action",
            assignedTechnician: project.assignedEngineer || "M. Saravanan (EPC Lead)",
            createdDate: "05 Nov 2026, 10:00 IST",
            targetResolutionDate: "07 Nov 2026, 18:00 IST",
            slaStatus: "On Track",
            actionNotes: "Technician inspecting inverter terminals and DC string combiner.",
            resolutionDetails: "",
            customerSignOff: null,
            rating: null,
            warrantyLink: "10-Year Inverter Warranty (Active)"
          }
        ]
  );
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);
  const [selectedServiceTicket, setSelectedServiceTicket] = useState(null);
  const [projectApprovals, setProjectApprovals] = useState(
    INITIAL_APPROVAL_REQUESTS.filter(r => r.projectId === project.id).length > 0
      ? INITIAL_APPROVAL_REQUESTS.filter(r => r.projectId === project.id)
      : INITIAL_APPROVAL_REQUESTS.slice(0, 2).map(r => ({ ...r, projectId: project.id, customerName: project.customerName }))
  );
  const [selectedApprovalForDecision, setSelectedApprovalForDecision] = useState(null);
  const [confirmedGovernance, setConfirmedGovernance] = useState({
    projectId: project.id,
    customerId: project.customerCode || "CUST-SLM-0089",
    registrationDate: project.createdDate || "2026-10-12",
    confirmedCapacity: `${project.capacityKw || 5.4} kWp`,
    projectValue: project.totalValue || 275396,
    customerPayable: project.balanceDue || 197396,
    salesperson: project.salesRep || "Rajkumar S",
    projectManager: project.assignedEngineer || "S. Karthik (PMO)",
    expectedCompletionDate: "12 Nov 2026 (30 Days SLA)"
  });
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
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8 max-w-full pb-16">
      
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
      <div className="p-6 sm:p-7 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
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
              className="border border-slate-200 bg-slate-50/60 hover:bg-white hover:shadow-xs hover:border-slate-300 px-3 py-1.5 rounded-xl text-xs font-semibold text-black transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center space-x-1.5 shadow-2xs"
            >
              <Share2 className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Dispatch</span>
            </button>
            <button
              onClick={() => setShowPrintModal(true)}
              className="bg-slate-900 hover:bg-black text-white px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-transform duration-160 ease-[cubic-bezier(0.23,1,0.32,1)] active:scale-[0.98] flex items-center space-x-1.5 shadow-xs"
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
          { id: "financials", label: "Advance & Payments (Section 10)" },
          { id: "documents", label: `Document Locker (${projectDocs.length})` },
          { id: "proposal", label: "Proposals & Revisions (Section 8)" },
          { id: "service", label: `Service & O&M (${projectTickets.length})` },
          { id: "approvals", label: `Approvals (Section 33)` },
          { id: "audit", label: "Audit Trail (Section 34)" },
          { id: "discom_subsidy", label: "DISCOM & Feasibility (Sec 12-13)" },
          { id: "procurement", label: "Procurement & BoM (Section 14)" },
          { id: "store", label: "Store & Inventory (Section 15)" },
          { id: "installation", label: "Installation & Site (Section 16)" },
          { id: "progress_tracker", label: "Progress Tracker (Section 17)" },
          { id: "inspection", label: "Inspection & Commissioning (Section 18)" },
          { id: "net_metering", label: "Net Metering (Section 19)" },
          { id: "final_payment", label: "Final Payment (Section 20)" },
          { id: "subsidy_management", label: "Subsidy DBT (Section 21)" },
          { id: "project_closure", label: "Project Closure (Section 22)" }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3.5 py-2 rounded-xl whitespace-nowrap transition-all text-xs font-semibold ${
              activeTab === tab.id
                ? "bg-slate-900 text-white shadow-xs font-bold"
                : "text-slate-500 hover:text-slate-900 hover:bg-white hover:shadow-2xs"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* TAB 1: 3.1 ONE CUSTOMER – ONE MASTER RECORD */}
      {activeTab === "overview" && (
        <div className="space-y-6">
          {/* SECTION 17: EXECUTIVE MILESTONE TRACKER BANNER (BFRD Section 17) */}
          <div className="p-4 sm:p-5 bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-3xl shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 font-mono">
                  Section 17 • Progress Tracker
                </span>
                <span className="text-xs text-slate-300 font-mono">
                  Stage {projectProgress.currentStageNumber} of 15 • {projectProgress.stages?.find(s => s.status === 'in_progress')?.name || 'Installation'}
                </span>
              </div>
              <h3 className="text-sm sm:text-base font-bold text-white">
                Project Execution Progress: <span className="text-blue-400 font-mono">{projectProgress.overallPercent}%</span> Complete
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-32 bg-slate-700 h-2 rounded-full overflow-hidden hidden sm:block">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${projectProgress.overallPercent}%` }} />
              </div>
              <button
                onClick={() => setActiveTab("progress_tracker")}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>View Full 15 Stages</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          
          {/* SECTION 9: CONFIRMED PROJECT GOVERNANCE & HANDOVER RECORD */}
          <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                    Section 9 • Customer Confirmed Project
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    8-Point Governance Standard
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Master Project Handover & Execution Specification
                </h3>
                <p className="text-xs text-slate-500">
                  Confirmed commercial parameters locked from accepted proposal with assigned PMO execution leads.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setShowConfirmationModal(true)}
                  className="apple-button px-3.5 py-2 rounded-xl text-xs font-bold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Confirmation Certificate (Sec 9)</span>
                </button>
              </div>
            </div>

            {/* The 8 Parameters Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">1. Unique Project ID</span>
                <span className="font-mono font-bold text-blue-700 text-sm block truncate">{confirmedGovernance.projectId}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">2. Customer ID</span>
                <span className="font-mono font-bold text-slate-800 text-sm block truncate">{confirmedGovernance.customerId}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">3. Registration Date</span>
                <span className="font-mono font-semibold text-slate-800 text-xs block">{confirmedGovernance.registrationDate}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">4. Confirmed Capacity</span>
                <span className="font-mono font-bold text-emerald-700 text-sm block">{confirmedGovernance.confirmedCapacity}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">5. Project Value</span>
                <span className="font-mono font-bold text-slate-900 text-sm block">₹{confirmedGovernance.projectValue?.toLocaleString()}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">6. Salesperson</span>
                <span className="font-semibold text-slate-800 text-xs block truncate">{confirmedGovernance.salesperson}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">7. Project Manager</span>
                <span className="font-semibold text-slate-800 text-xs block truncate">{confirmedGovernance.projectManager}</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[10px] uppercase font-bold text-slate-400 block font-mono">8. Expected Completion</span>
                <span className="font-mono font-bold text-emerald-800 text-xs block truncate">{confirmedGovernance.expectedCompletionDate}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* 1. Identity & Contact Information */}
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
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
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
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
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
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
            <div className="p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-3">
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
            <div className="md:col-span-2 p-5 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
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
                    className="border border-zinc-300 hover:bg-white hover:shadow-xs px-2.5 py-1 text-xs font-semibold text-black flex items-center space-x-1.5 shadow-2xs"
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
                  <div key={log.id} className="p-3.5 rounded-xl border border-zinc-100 bg-zinc-50/60 hover:bg-white hover:shadow-xs transition-colors flex flex-col sm:flex-row sm:items-start justify-between gap-3">
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
                          : "bg-white text-zinc-600 hover:text-black border border-zinc-200 hover:bg-white hover:shadow-xs"
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
                          isInProgress ? "bg-blue-50/50 font-medium" : "hover:bg-white"
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

      {/* TAB 3: SECTION 10 ADVANCE PAYMENT MANAGEMENT & FINANCIAL LEDGER */}
      {activeTab === "financials" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Section 10
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Project: {project.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Advance Payment Management & Milestone Ledger
              </h3>
              <p className="text-xs text-slate-500">
                Automatic calculation of balances, GST statutory breakdown, and digitally retrievable payment receipts.
              </p>
            </div>

            <button
              onClick={() => setIsRecordPaymentOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all self-start sm:self-auto"
            >
              <IndianRupee className="w-3.5 h-3.5" />
              <span>Record Advance Payment</span>
            </button>
          </div>

          {/* Automatic Calculation KPI Summary Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3.5">
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50">
              <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">
                Total Contract Value
              </span>
              <div className="text-xl font-black text-slate-900 font-mono mt-1">
                ₹{project.totalValue.toLocaleString("en-IN")}
              </div>
              <span className="text-[11px] text-slate-400 mt-0.5 block">Approved turnkey quote</span>
            </div>

            <div className="p-4 rounded-xl border border-emerald-200 bg-emerald-50/50">
              <span className="text-emerald-700 block text-[11px] font-bold uppercase tracking-wider">
                Total Amount Received
              </span>
              <div className="text-xl font-black text-emerald-800 font-mono mt-1">
                ₹{totalReceived.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-emerald-600 mt-0.5 font-semibold">
                {Math.round((totalReceived / project.totalValue) * 100)}% of total value realized
              </div>
            </div>

            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/50">
              <span className="text-blue-700 block text-[11px] font-bold uppercase tracking-wider">
                Balance Amount Due (Auto)
              </span>
              <div className="text-xl font-black text-blue-900 font-mono mt-1">
                ₹{calculatedBalance.toLocaleString("en-IN")}
              </div>
              <div className="text-[11px] text-blue-600 mt-0.5">
                Total Value &minus; Received = Balance
              </div>
            </div>

            <div className={`p-4 rounded-xl border ${
              is80PercentCleared
                ? "border-emerald-200 bg-emerald-50/40"
                : "border-slate-200 bg-slate-50"
            }`}>
              <span className="text-slate-500 block text-[11px] font-bold uppercase tracking-wider">
                80% Hard Lock Advance
              </span>
              <div className="flex items-center gap-1.5 mt-1">
                {is80PercentCleared ? (
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    Hard Lock 1 Cleared
                  </span>
                ) : (
                  <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-full">
                    ₹{(advance80PercentRequired - totalReceived).toLocaleString("en-IN")} Required
                  </span>
                )}
              </div>
              <span className="text-[11px] text-slate-400 mt-1 block">
                Target: ₹{advance80PercentRequired.toLocaleString("en-IN")} (80%)
              </span>
            </div>
          </div>

          {/* Section 10 Payment Information Ledger Table */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-bold text-slate-900">Payment Transactions & Tax Slips</h4>
                <p className="text-xs text-slate-500">Every installment recorded with UTR, GST split, and retrievable receipt counterfoil</p>
              </div>
              <span className="text-xs font-mono text-slate-400">
                {payments.length} Transaction{payments.length > 1 ? "s" : ""} Recorded
              </span>
            </div>

            <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                    <tr>
                      <th className="p-3.5 border-r border-slate-200">Receipt & Invoice #</th>
                      <th className="p-3.5 border-r border-slate-200">Date & Mode</th>
                      <th className="p-3.5 border-r border-slate-200">UTR / Ref & Bank Details</th>
                      <th className="p-3.5 border-r border-slate-200">GST Breakdown (18%)</th>
                      <th className="p-3.5 border-r border-slate-200">Amount Paid</th>
                      <th className="p-3.5 border-r border-slate-200">Payment Status</th>
                      <th className="p-3.5 text-right">Receipt Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {payments.map((pmt) => (
                      <tr key={pmt.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="p-3.5 border-r border-slate-100">
                          <div className="font-bold text-slate-900 font-mono">{pmt.id}</div>
                          <div className="text-[11px] text-blue-700 font-mono mt-0.5">Inv: {pmt.invoiceNumber}</div>
                          <div className="text-[10px] text-slate-400 mt-0.5">{pmt.milestoneTag}</div>
                        </td>

                        <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                          <div className="font-semibold text-slate-800">{pmt.paymentDate}</div>
                          <div className="text-[11px] text-slate-500 mt-0.5">{pmt.paymentTime || "11:30 IST"}</div>
                          <span className="inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                            {pmt.paymentMode}
                          </span>
                        </td>

                        <td className="p-3.5 border-r border-slate-100">
                          <div className="font-mono font-bold text-slate-900">{pmt.referenceNumber}</div>
                          <div className="text-[11px] text-slate-600 mt-0.5">{pmt.bankDetails?.bankName} ({pmt.bankDetails?.branch})</div>
                          <div className="text-[10px] text-slate-400 font-mono">IFSC: {pmt.bankDetails?.ifsc}</div>
                        </td>

                        <td className="p-3.5 border-r border-slate-100 font-mono">
                          <div className="text-[11px] text-slate-700">Base: ₹{Math.round(pmt.gstDetails?.taxableAmount || (pmt.amount / 1.18)).toLocaleString("en-IN")}</div>
                          <div className="text-[10px] text-slate-500">CGST (9%): ₹{Math.round(pmt.gstDetails?.cgst || ((pmt.amount - (pmt.amount / 1.18))/2)).toLocaleString("en-IN")}</div>
                          <div className="text-[10px] text-slate-500">SGST (9%): ₹{Math.round(pmt.gstDetails?.sgst || ((pmt.amount - (pmt.amount / 1.18))/2)).toLocaleString("en-IN")}</div>
                        </td>

                        <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                          <div className="font-black text-sm text-emerald-700 font-mono">
                            ₹{pmt.amount.toLocaleString("en-IN")}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">
                            Bal: ₹{pmt.balanceAmount.toLocaleString("en-IN")}
                          </div>
                        </td>

                        <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                          <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full border bg-emerald-50 text-emerald-800 border-emerald-200 flex items-center gap-1 w-fit">
                            <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                            <span>{pmt.paymentStatus}</span>
                          </span>
                        </td>

                        <td className="p-3.5 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1.5">
                            <button
                              onClick={() => setSelectedReceiptPayment(pmt)}
                              className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg border border-blue-200 transition-colors flex items-center gap-1"
                              title="Retrieve Official Tax Receipt"
                            >
                              <FileText className="w-3.5 h-3.5" />
                              <span>Retrieve Receipt</span>
                            </button>
                            <button
                              onClick={() => alert(`Downloading bank slip counterfoil for ${pmt.id}`)}
                              className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                              title="Download Counterfoil"
                            >
                              <Download className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 80/10/10 Milestone Progression Matrix */}
          <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/60 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Commercial 80/10/10 Milestone Progress Tracking
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">1. Booking Advance</span>
                  <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded text-[10px] border border-emerald-200">
                    80% • CLEARED
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">Required prior to engineering drawings & DISCOM filing.</div>
                <div className="text-sm font-bold font-mono text-slate-800 pt-1">₹{advance80PercentRequired.toLocaleString("en-IN")}</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">2. Material Dispatch</span>
                  <span className="font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded text-[10px] border border-blue-200">
                    10% • DUE AT SITE
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">Triggered on module & inverter dispatch from warehouse.</div>
                <div className="text-sm font-bold font-mono text-slate-800 pt-1">₹{Math.round(project.totalValue * 0.1).toLocaleString("en-IN")}</div>
              </div>

              <div className="p-3 rounded-lg bg-white border border-slate-200 space-y-1">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-slate-900">3. Net-Meter Sync</span>
                  <span className="font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[10px] border border-slate-200">
                    10% • ON GRID SYNC
                  </span>
                </div>
                <div className="text-slate-500 text-[11px]">Final settlement upon TANGEDCO bidirectional meter sync.</div>
                <div className="text-sm font-bold font-mono text-slate-800 pt-1">₹{Math.round(project.totalValue * 0.1).toLocaleString("en-IN")}</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: SECTION 30 DIGITAL DOCUMENT MANAGEMENT SYSTEM */}
      {activeTab === "documents" && (
        <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-5">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                  Section 30
                </span>
                <span className="text-xs font-mono font-medium text-slate-500">
                  Project: {project.id}
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-900 mt-1">
                Project Document Management & Version Control
              </h3>
              <p className="text-xs text-slate-500">
                11 statutory and technical categories digitally archived with cryptographic SHA-256 integrity and revision histories.
              </p>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                onClick={() => setUploadModalState({
                  isOpen: true,
                  targetDoc: null,
                  defaultCat: selectedCategoryFilter !== "all" ? selectedCategoryFilter : "customer"
                })}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
              >
                <Upload className="w-3.5 h-3.5" />
                <span>Upload Document</span>
              </button>
            </div>
          </div>

          {/* Quick Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <div className="text-[11px] font-medium text-slate-500 uppercase tracking-wider">Total Documents</div>
              <div className="text-lg font-bold text-slate-900 mt-0.5">{projectDocs.length} Files</div>
            </div>
            <div className="p-3 bg-blue-50/50 rounded-xl border border-blue-200">
              <div className="text-[11px] font-medium text-blue-600 uppercase tracking-wider">Categories Covered</div>
              <div className="text-lg font-bold text-blue-900 mt-0.5">
                {new Set(projectDocs.map(d => d.category)).size} / 11 Active
              </div>
            </div>
            <div className="p-3 bg-emerald-50/50 rounded-xl border border-emerald-200">
              <div className="text-[11px] font-medium text-emerald-700 uppercase tracking-wider">Verified Records</div>
              <div className="text-lg font-bold text-emerald-900 mt-0.5">
                {projectDocs.filter(d => d.status === "Verified").length} Documents
              </div>
            </div>
            <div className="p-3 bg-indigo-50/50 rounded-xl border border-indigo-200">
              <div className="text-[11px] font-medium text-indigo-700 uppercase tracking-wider">Version-Controlled</div>
              <div className="text-lg font-bold text-indigo-900 mt-0.5">
                {projectDocs.filter(d => d.hasVersions).length} Living Files
              </div>
            </div>
          </div>

          {/* 11 Categories Horizontal Scrollable Filters */}
          <div>
            <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>Filter by Document Category</span>
              <span className="text-slate-400 font-normal">11 Standardized EPC Folders</span>
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <button
                onClick={() => setSelectedCategoryFilter("all")}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  selectedCategoryFilter === "all"
                    ? "bg-slate-900 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                <span>All Documents</span>
                <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-white/20">
                  {projectDocs.length}
                </span>
              </button>

              {DOCUMENT_CATEGORIES.map((cat) => {
                const count = projectDocs.filter(d => d.category === cat.id).length;
                const isSelected = selectedCategoryFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategoryFilter(cat.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                      isSelected
                        ? "bg-blue-600 text-white shadow-sm"
                        : "bg-slate-50 border border-slate-200 text-slate-700 hover:bg-slate-100"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span className={`px-1.5 py-0.2 rounded-full text-[10px] ${
                      isSelected ? "bg-white/30 text-white" : "bg-slate-200 text-slate-700"
                    }`}>
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search & Actions Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <div className="relative w-full sm:w-80">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={docSearchQuery}
                onChange={(e) => setDocSearchQuery(e.target.value)}
                placeholder="Search document name, file or author..."
                className="w-full pl-9 pr-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="text-xs text-slate-500 self-end sm:self-auto">
              Showing{" "}
              <strong className="text-slate-800">
                {projectDocs.filter(doc => {
                  const matchesCat = selectedCategoryFilter === "all" || doc.category === selectedCategoryFilter;
                  const matchesSearch = !docSearchQuery ||
                    doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                    doc.fileName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                    doc.uploadedBy.toLowerCase().includes(docSearchQuery.toLowerCase());
                  return matchesCat && matchesSearch;
                }).length}
              </strong>{" "}
              of {projectDocs.length} documents
            </div>
          </div>

          {/* Document Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-2xs">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 border-b border-slate-200 font-bold text-slate-700">
                  <tr>
                    <th className="p-3.5 border-r border-slate-200">Document Specification</th>
                    <th className="p-3.5 border-r border-slate-200">Category</th>
                    <th className="p-3.5 border-r border-slate-200">Version</th>
                    <th className="p-3.5 border-r border-slate-200">Status</th>
                    <th className="p-3.5 border-r border-slate-200">Author & Date</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {projectDocs
                    .filter(doc => {
                      const matchesCat = selectedCategoryFilter === "all" || doc.category === selectedCategoryFilter;
                      const matchesSearch = !docSearchQuery ||
                        doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                        doc.fileName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                        doc.uploadedBy.toLowerCase().includes(docSearchQuery.toLowerCase());
                      return matchesCat && matchesSearch;
                    })
                    .map((doc) => {
                      const hasRevisionHistory = doc.hasVersions || (doc.versions && doc.versions.length > 1);
                      return (
                        <tr key={doc.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="p-3.5 border-r border-slate-100">
                            <div className="flex items-start gap-2.5">
                              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 flex-shrink-0 mt-0.5">
                                <FileText className="w-4 h-4" />
                              </div>
                              <div>
                                <div className="font-semibold text-slate-900">{doc.name}</div>
                                <div className="text-[11px] text-slate-500 font-mono flex items-center gap-2 mt-0.5">
                                  <span>{doc.fileName}</span>
                                  <span>•</span>
                                  <span>{doc.fileSize}</span>
                                </div>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                            <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200">
                              {doc.categoryLabel}
                            </span>
                          </td>

                          <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                                {doc.version}
                              </span>
                              {hasRevisionHistory && (
                                <button
                                  onClick={() => setVersionModalDoc(doc)}
                                  className="text-[11px] font-semibold text-indigo-700 bg-indigo-50 hover:bg-indigo-100 px-1.5 py-0.5 rounded border border-indigo-200 flex items-center gap-1 transition-colors"
                                  title="View revision timeline"
                                >
                                  <GitCommit className="w-3 h-3 text-indigo-600" />
                                  <span>{doc.versions?.length || 2} revs</span>
                                </button>
                              )}
                            </div>
                          </td>

                          <td className="p-3.5 border-r border-slate-100 whitespace-nowrap">
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border flex items-center gap-1 w-fit ${
                              doc.status === "Verified"
                                ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                                : "bg-slate-100 text-slate-600 border-slate-200"
                            }`}>
                              {doc.status === "Verified" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                              <span>{doc.status}</span>
                            </span>
                          </td>

                          <td className="p-3.5 border-r border-slate-100 text-slate-600 whitespace-nowrap">
                            <div className="font-medium text-slate-800">{doc.uploadedBy}</div>
                            <div className="text-[11px] text-slate-400 font-mono mt-0.5">{doc.date}</div>
                          </td>

                          <td className="p-3.5 text-right whitespace-nowrap">
                            <div className="flex items-center justify-end gap-1.5">
                              {/* Inspect details */}
                              <button
                                onClick={() => setSelectedDocPreview(doc)}
                                className="px-2 py-1 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors"
                                title="Inspect Document"
                              >
                                <Eye className="w-3.5 h-3.5" />
                                <span>Inspect</span>
                              </button>

                              {/* Version History */}
                              {hasRevisionHistory && (
                                <button
                                  onClick={() => setVersionModalDoc(doc)}
                                  className="px-2 py-1 text-indigo-600 hover:text-indigo-800 hover:bg-indigo-50 rounded-lg font-semibold text-xs flex items-center gap-1 transition-colors"
                                  title="Revision History & Previous Versions"
                                >
                                  <GitCommit className="w-3.5 h-3.5" />
                                  <span>History</span>
                                </button>
                              )}

                              {/* Upload New Revision */}
                              <button
                                onClick={() => setUploadModalState({
                                  isOpen: true,
                                  targetDoc: doc,
                                  defaultCat: doc.category
                                })}
                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                                title="Upload New Revision"
                              >
                                <Upload className="w-3.5 h-3.5" />
                              </button>

                              {/* Download */}
                              <button
                                onClick={() => alert(`Simulating download of ${doc.name} (${doc.fileName})`)}
                                className="p-1 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
                                title="Download"
                              >
                                <Download className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
            </div>

            {/* Empty state if search or filter yields nothing */}
            {projectDocs.filter(doc => {
              const matchesCat = selectedCategoryFilter === "all" || doc.category === selectedCategoryFilter;
              const matchesSearch = !docSearchQuery ||
                doc.name.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                doc.fileName.toLowerCase().includes(docSearchQuery.toLowerCase()) ||
                doc.uploadedBy.toLowerCase().includes(docSearchQuery.toLowerCase());
              return matchesCat && matchesSearch;
            }).length === 0 && (
              <div className="p-8 text-center text-slate-500 space-y-2">
                <FileText className="w-8 h-8 text-slate-300 mx-auto" />
                <p className="text-xs font-semibold text-slate-700">No documents found matching this filter</p>
                <button
                  onClick={() => setUploadModalState({
                    isOpen: true,
                    targetDoc: null,
                    defaultCat: selectedCategoryFilter !== "all" ? selectedCategoryFilter : "customer"
                  })}
                  className="px-3 py-1.5 text-xs font-semibold text-blue-600 hover:underline"
                >
                  + Upload document into this category
                </button>
              </div>
            )}
          </div>

          {/* Cryptographic Compliance Bar */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-slate-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>
                All 11 category files are indexed under <strong className="text-slate-800 font-mono">Project {project.id}</strong> with immutable revision trails.
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">
              DISCOM & CEA Regulatory Audit Ready
            </span>
          </div>
        </div>
      )}

      {/* TAB 5: PARALLEL DISCOM & SUBSIDY SUB-TRACKS */}
      {activeTab === "proposal" && (
        <ProposalManager project={project} />
      )}

      {/* TAB: SECTION 33 ROLE-BASED APPROVALS */}
      {activeTab === "approvals" && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    Section 33 • Approval Workflows
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                    5-Point Traceable Sign-offs
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Plant Approval Checkpoints for {project.customerName} ({project.id})
                </h3>
                <p className="text-xs text-slate-500">
                  Traceable multi-tier decision tracking across Proposals, Procurement PRs, Subcontractor Payments, and Handover Verification.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="apple-button px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Approvals Register</span>
              </button>
            </div>

            {/* Approval Cards Grid */}
            <div className="grid grid-cols-1 gap-4">
              {projectApprovals.map(req => {
                const isApproved = req.status === "Approved";
                const isPending = req.status === "Pending Approval";

                return (
                  <div
                    key={req.id}
                    className="p-5 rounded-2xl bg-slate-50/60 border border-slate-200/90 space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200 pb-2">
                      <div className="flex items-center space-x-2">
                        <span className="font-mono text-blue-700 font-bold bg-white border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                          {req.id}
                        </span>
                        <span className="font-bold text-slate-900 text-xs">{req.title}</span>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        isApproved ? "bg-emerald-50 text-emerald-800 border border-emerald-200" : "bg-blue-50 text-blue-700 border border-blue-200 animate-pulse"
                      }`}>
                        {req.status}
                      </span>
                    </div>

                    {/* Traceable Decision Block */}
                    {req.history && req.history.length > 0 ? (
                      <div className="p-3.5 rounded-xl bg-white border border-emerald-200 text-xs space-y-1.5 font-mono">
                        <div className="flex justify-between items-center text-[10px] text-emerald-800 font-bold uppercase">
                          <span>Traceable Decision Recorded</span>
                          <span>{req.history[0].decision.toUpperCase()} ✓</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] text-slate-700">
                          <div>Approver: <strong>{req.history[0].approver}</strong></div>
                          <div>Role: <span>{req.history[0].approverRole}</span></div>
                          <div>Date: <strong>{req.history[0].date}</strong></div>
                          <div>Time: <strong>{req.history[0].time}</strong></div>
                        </div>
                        <div className="pt-1.5 border-t border-slate-100 text-slate-700 font-sans text-xs italic">
                          "{req.history[0].remarks}"
                        </div>
                      </div>
                    ) : (
                      <div className="p-3 rounded-xl bg-white border border-slate-200 text-xs flex justify-between items-center">
                        <span className="text-slate-500 font-mono">Awaiting management review and sign-off</span>
                        <button
                          onClick={() => setSelectedApprovalForDecision(req)}
                          className="apple-button px-3 py-1 rounded-xl bg-slate-900 text-white font-bold text-xs"
                        >
                          Review & Decide
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

          </div>
        </div>
      )}

      {/* TAB: SECTION 34 AUDIT TRAIL */}
      {activeTab === "audit" && (
        <div className="space-y-6">
          <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200 font-mono">
                    Section 34 • Governance & Accountability
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                    Plant Mutation History
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Granular Audit Trail for {project.customerName} ({project.id})
                </h3>
                <p className="text-xs text-slate-500">
                  Permanent forensic ledger recording who created, who modified, what changed, date, time, and previous vs. new values.
                </p>
              </div>

              <button
                onClick={() => window.print()}
                className="apple-button px-3.5 py-2 rounded-xl text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 flex items-center space-x-1.5 shadow-2xs"
              >
                <Printer className="w-3.5 h-3.5 text-slate-600" />
                <span>Print Audit Certificate</span>
              </button>
            </div>

            {/* Audit Table with 7 Parameters */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs min-w-[1000px]">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/60 text-slate-400 uppercase tracking-wider text-[10px] font-bold">
                    <th className="py-3 px-4">1. Created By</th>
                    <th className="py-3 px-4">2. Modified By</th>
                    <th className="py-3 px-4">3. What Was Modified</th>
                    <th className="py-3 px-4">4. Date & 5. Time</th>
                    <th className="py-3 px-4">6. Previous Value</th>
                    <th className="py-3 px-4">7. New Value</th>
                    <th className="py-3 px-4">Reason / Justification</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {MASTER_AUDIT_LOGS.filter(l => l.projectId === project.id).map(log => (
                    <tr key={log.id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{log.createdBy.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.createdBy.role}</span>
                        <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{log.createdBy.date}</span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="font-bold text-slate-900 block">{log.modifiedBy.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{log.modifiedBy.role}</span>
                        <span className="text-[9px] text-slate-400 font-mono block mt-0.5">{log.modifiedBy.branch}</span>
                      </td>

                      <td className="py-3.5 px-4 font-bold text-slate-800">
                        {log.fieldModified}
                      </td>

                      <td className="py-3.5 px-4 font-mono whitespace-nowrap">
                        <div className="font-semibold text-slate-800">{log.date}</div>
                        <div className="text-[10px] text-slate-400">{log.time}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono text-rose-700 bg-rose-50 border border-rose-200 line-through block w-fit">
                          {log.previousValue}
                        </span>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 block w-fit">
                          {log.newValue}
                        </span>
                      </td>

                      <td className="py-3.5 px-4 text-slate-600 max-w-[220px]">
                        {log.reason}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* TAB: SECTION 35 CUSTOMER SERVICE & COMPLAINT MANAGEMENT */}
      {activeTab === "service" && (
        <div className="space-y-6">
          
          {/* Plant Warranty & Lifetime O&M Overview Card */}
          <div className="p-5 sm:p-6 bg-white rounded-3xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-rose-50 text-rose-700 border border-rose-200 font-mono">
                    Section 35 • Customer Service
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-50 text-emerald-700 border border-emerald-200 font-mono">
                    25-Year Plant Warranty Protection
                  </span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mt-1">
                  Post-Commissioning O&M & Warranty Specifications
                </h3>
                <p className="text-xs text-slate-500">
                  Customer support, generation monitoring, inverter error codes, and 6-stage lifecycle tracking.
                </p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsServiceModalOpen(true)}
                  className="apple-button px-4 py-2 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black flex items-center space-x-1.5 shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Raise Ticket for this Plant</span>
                </button>
              </div>
            </div>

            {/* Warranty Coverage Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Inverter Warranty</span>
                <span className="font-bold text-slate-900 text-sm block">10 Years</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Sungrow OEM Active</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">Module Linear Yield</span>
                <span className="font-bold text-slate-900 text-sm block">25-30 Years</span>
                <span className="text-[10px] text-emerald-700 font-semibold">Waaree TOPCon OEM</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">MMS Anti-Corrosion</span>
                <span className="font-bold text-slate-900 text-sm block">5 Years</span>
                <span className="text-[10px] text-slate-500 font-semibold">80 Micron HDGI Pass</span>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-100/80">
                <span className="text-[9px] uppercase font-bold text-slate-400 block">NIRT O&M SLA</span>
                <span className="font-bold text-blue-700 text-sm block">&lt; 48 Hours</span>
                <span className="text-[10px] text-blue-600 font-semibold">Turnkey AMC Active</span>
              </div>
            </div>
          </div>

          {/* Plant Service Tickets Ledger */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono flex items-center space-x-1.5">
              <span>Service Complaints & Maintenance History ({projectTickets.length})</span>
            </h4>

            <div className="grid grid-cols-1 gap-3">
              {projectTickets.map(ticket => (
                <div
                  key={ticket.id}
                  className="p-5 rounded-3xl bg-white border border-slate-200/90 shadow-2xs space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
                    <div className="flex items-center space-x-2">
                      <span className="font-mono text-blue-700 font-bold bg-blue-50 border border-blue-200 px-2 py-0.5 rounded text-[10px]">
                        {ticket.id}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold font-mono bg-slate-100 text-slate-800 border border-slate-200">
                        {ticket.categoryLabel}
                      </span>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono ${
                        ticket.priority === "Critical" ? "bg-rose-100 text-rose-800 border border-rose-300"
                          : ticket.priority === "High" ? "bg-rose-50 text-rose-700 border border-rose-200"
                          : "bg-blue-50 text-blue-700 border border-blue-200"
                      }`}>
                        {ticket.priority} Priority
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono text-slate-400">
                        Logged: {ticket.createdDate}
                      </span>
                      <button
                        onClick={() => setSelectedServiceTicket(ticket)}
                        className="apple-button px-3 py-1 rounded-xl text-xs font-bold bg-slate-900 text-white hover:bg-black shadow-2xs"
                      >
                        Manage Stage (1-6)
                      </button>
                    </div>
                  </div>

                  <div>
                    <h5 className="font-bold text-slate-900 text-sm">{ticket.title}</h5>
                    <p className="text-xs text-slate-600 mt-0.5">{ticket.description}</p>
                  </div>

                  {/* 6-Stage Progress Indicator */}
                  <div className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="flex items-center space-x-1.5">
                      <span className="text-[10px] font-bold uppercase text-slate-400 font-mono">Current Stage:</span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold font-mono bg-blue-50 text-blue-700 border border-blue-200">
                        {ticket.stage.toUpperCase()}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2 font-mono text-[10px] text-slate-500">
                      <span>Assigned: <strong>{ticket.assignedTechnician}</strong></span>
                      <span>•</span>
                      <span className="text-emerald-700 font-bold">{ticket.slaStatus}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

      
      {/* TAB: SECTION 14 PROCUREMENT & BILL OF MATERIALS */}
      {activeTab === "procurement" && (
        <ProcurementView
          procurementItems={procurementItems}
          project={project}
          onOpenAddModal={() => {
            setSelectedProcurementItem(null);
            setIsProcurementModalOpen(true);
          }}
          onOpenEditModal={(item) => {
            setSelectedProcurementItem(item);
            setIsProcurementModalOpen(true);
          }}
          onOpenGRNModal={(item) => {
            setSelectedProcurementItem(item);
            setIsGRNModalOpen(true);
          }}
        />
      )}

      
      {/* TAB: SECTION 15 STORE & INVENTORY MANAGEMENT */}
      {activeTab === "store" && (
        <StoreManagementView
          inventoryItems={storeInventory}
          project={project}
          onOpenIssueModal={(item) => {
            setSelectedStoreItem(item);
            setIsIssueModalOpen(true);
          }}
          onOpenReturnModal={(item) => {
            setSelectedStoreItem(item);
            setIsReturnModalOpen(true);
          }}
        />
      )}

      {/* TAB: SECTION 16 INSTALLATION MANAGEMENT */}
      {activeTab === "installation" && (
        <InstallationManagementView
          installationData={installationState}
          onOpenUpdateModal={() => setIsUpdateInstallModalOpen(true)}
          onOpenSignOffModal={() => setIsInstallSignOffModalOpen(true)}
        />
      )}

      {/* TAB: SECTION 17 PROJECT PROGRESS TRACKER */}
      {activeTab === "progress_tracker" && (
        <ProjectProgressTrackerView
          progressData={projectProgress}
          onOpenUpdateModal={(stage) => {
            setSelectedStageToUpdate(stage);
            setIsUpdateStageModalOpen(true);
          }}
        />
      )}

      {/* TAB: SECTION 18 INSPECTION & COMMISSIONING */}
      {activeTab === "inspection" && (
        <InspectionManagementView
          inspectionData={inspectionState}
          onOpenStatusModal={() => setIsInspectionStatusModalOpen(true)}
          onOpenReportModal={() => setIsCommissioningReportModalOpen(true)}
        />
      )}

      {/* TAB: SECTION 19 NET METERING */}
      {activeTab === "net_metering" && (
        <NetMeteringManagementView
          meterData={netMeterState}
          onOpenUpdateModal={() => setIsUpdateMeterModalOpen(true)}
          onOpenCertModal={() => setIsNetMeterCertModalOpen(true)}
        />
      )}

      {/* TAB: SECTION 20 FINAL PAYMENT */}
      {activeTab === "final_payment" && (
        <FinalPaymentManagementView
          paymentData={finalPaymentState}
          onOpenRecordModal={() => setIsRecordFinalPayModalOpen(true)}
          onOpenReminderModal={() => setIsSendReminderModalOpen(true)}
          onOpenNocModal={() => setIsNoDuesModalOpen(true)}
        />
      )}

      {/* TAB: SECTION 21 SUBSIDY MANAGEMENT */}
      {activeTab === "subsidy_management" && (
        <SubsidyManagementView
          subsidyData={subsidyState}
          onOpenUpdateModal={() => setIsUpdateSubsidyModalOpen(true)}
          onOpenSanctionModal={() => setIsSubsidySanctionModalOpen(true)}
        />
      )}

      {/* TAB: SECTION 22 PROJECT CLOSURE */}
      {activeTab === "project_closure" && (
        <ProjectClosureView
          closureData={closureState}
          onOpenChecklistModal={() => setIsUpdateClosureModalOpen(true)}
          onOpenCertModal={() => setIsClosureCertModalOpen(true)}
        />
      )}

      {activeTab === "discom_subsidy" && (
        <div className="space-y-6">
          {/* Segmented Sub-Tab Switcher between Section 13, Section 12, and Subsidy */}
          <div className="flex items-center gap-2 border-b border-slate-200 pb-3 overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <button
              onClick={() => setDiscomHubSubTab("feasibility")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                discomHubSubTab === "feasibility"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-blue-400" />
              <span>Section 13: Technical Feasibility Stage</span>
            </button>

            <button
              onClick={() => setDiscomHubSubTab("application")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                discomHubSubTab === "application"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <Building2 className="w-3.5 h-3.5 text-blue-400" />
              <span>Section 12: DISCOM Application & Filing</span>
            </button>

            <button
              onClick={() => setDiscomHubSubTab("subsidy")}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 ${
                discomHubSubTab === "subsidy"
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200"
              }`}
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>PM Surya Ghar Subsidy Sub-Track</span>
            </button>
          </div>

          {/* VIEW 1: SECTION 13 DEDICATED TECHNICAL FEASIBILITY */}
          {discomHubSubTab === "feasibility" && (
            <TechnicalFeasibilityView
              feasibilityRecord={feasibilityRecord}
              project={project}
              onOpenEditModal={() => setIsFeasibilityModalOpen(true)}
              onOpenSanctionOrder={() => setIsSanctionCertModalOpen(true)}
            />
          )}

          {/* VIEW 2: SECTION 12 DISCOM APPLICATION MANAGEMENT */}
          {discomHubSubTab === "application" && (
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600 font-bold text-lg flex-shrink-0 mt-0.5">
                  ⚡
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-700">
                      Section 12
                    </span>
                    <span className="text-xs font-mono font-medium text-slate-500">
                      App No: {discomApp.applicationNumber}
                    </span>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full border ${
                      discomApp.applicationStatus === "approved"
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : discomApp.applicationStatus === "rejected"
                        ? "bg-rose-50 text-rose-800 border-rose-200"
                        : "bg-blue-50 text-blue-800 border-blue-200"
                    }`}>
                      {DISCOM_STATUS_STAGES.find(s => s.id === discomApp.applicationStatus)?.label || discomApp.applicationStatus}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    DISCOM Application & Technical Feasibility Management
                  </h3>
                  <p className="text-xs text-slate-500">
                    Statutory LT Solar portal filing, 7-stage approval workflow, application fee remittance, and feasibility sanction orders.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 self-start sm:self-auto">
                {discomApp.applicationStatus === "approved" && (
                  <button
                    onClick={() => setIsSanctionCertModalOpen(true)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 border border-emerald-200 rounded-xl shadow-xs transition-colors"
                  >
                    <FileText className="w-3.5 h-3.5 text-emerald-700" />
                    <span>View Sanction Order</span>
                  </button>
                )}
                <button
                  onClick={() => setIsDiscomStatusModalOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-sm transition-all"
                >
                  <Building2 className="w-3.5 h-3.5" />
                  <span>Update DISCOM Status</span>
                </button>
              </div>
            </div>

            {/* 7-Stage Visual Lifecycle Stepper */}
            <div>
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-2.5 flex items-center justify-between">
                <span>7-Stage DISCOM Statutory Lifecycle Workflow</span>
                <span className="text-[11px] text-slate-400 font-normal">Section 12 Regulatory Progression</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-7 gap-2">
                {DISCOM_STATUS_STAGES.map((st) => {
                  const currentStageObj = DISCOM_STATUS_STAGES.find(s => s.id === discomApp.applicationStatus);
                  const currentStep = currentStageObj ? currentStageObj.step : 5;
                  const isCurrent = discomApp.applicationStatus === st.id;
                  const isCompleted = st.step < currentStep && discomApp.applicationStatus !== "rejected";

                  let cardStyle = "bg-slate-50 border-slate-200 text-slate-500";
                  if (isCurrent) {
                    if (st.id === "approved") {
                      cardStyle = "bg-emerald-50 border-emerald-300 ring-2 ring-emerald-100 text-emerald-900 font-bold";
                    } else if (st.id === "rejected") {
                      cardStyle = "bg-rose-50 border-rose-300 ring-2 ring-rose-100 text-rose-900 font-bold";
                    } else {
                      cardStyle = "bg-blue-50 border-blue-300 ring-2 ring-blue-100 text-blue-900 font-bold";
                    }
                  } else if (isCompleted) {
                    cardStyle = "bg-emerald-50/60 border-emerald-200 text-emerald-800 font-medium";
                  }

                  return (
                    <div key={st.id} className={`p-2.5 rounded-xl border text-xs transition-all ${cardStyle}`}>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono opacity-60">0{st.step}</span>
                        {isCompleted && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                        {isCurrent && st.id === "approved" && <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />}
                      </div>
                      <div className="font-semibold mt-1 leading-tight">{st.label}</div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Metric KPI Cards (4 Parameters) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Applied Capacity</span>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  {discomApp.appliedCapacityKw} kWp
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">{discomApp.phase}</div>
              </div>

              <div className="p-3.5 bg-blue-50/50 rounded-xl border border-blue-200">
                <span className="text-[10px] font-bold text-blue-600 uppercase tracking-wider block">Application Number</span>
                <div className="text-base font-bold text-blue-900 font-mono mt-0.5 truncate">
                  {discomApp.applicationNumber}
                </div>
                <div className="text-[11px] text-blue-700 mt-0.5">Filed: {discomApp.applicationDate}</div>
              </div>

              <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Application Fee</span>
                <div className="text-base font-bold text-slate-900 font-mono mt-0.5">
                  ₹{discomApp.applicationFee.toLocaleString("en-IN")}
                </div>
                <div className="text-[11px] text-emerald-700 font-medium mt-0.5">
                  Paid ({discomApp.feePayment?.mode})
                </div>
              </div>

              <div className="p-3.5 bg-emerald-50/50 rounded-xl border border-emerald-200">
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider block">Feasibility Sanction</span>
                <div className="text-base font-bold text-emerald-900 font-mono mt-0.5">
                  {discomApp.approvalDate ? discomApp.approvalDate : "In Process"}
                </div>
                <div className="text-[11px] text-emerald-700 font-mono truncate mt-0.5">
                  {discomApp.sanctionOrderNumber ? discomApp.sanctionOrderNumber.slice(0, 24) + "..." : "Awaiting Inspection"}
                </div>
              </div>
            </div>

            {/* Rejection Alert Banner if status is rejected */}
            {discomApp.applicationStatus === "rejected" && (
              <div className="p-4 rounded-xl border border-rose-200 bg-rose-50 text-xs text-rose-900 space-y-1.5">
                <div className="flex items-center gap-2 font-bold">
                  <AlertCircle className="w-4 h-4 text-rose-600" />
                  <span>DISCOM Application Deficiency Notice Issued</span>
                </div>
                <p className="text-[11px] text-rose-800">
                  <strong>Reason:</strong> {discomApp.rejectionDetails?.reasonCode || "Transformer capacity quota exhausted on DT"}.
                  {discomApp.rejectionDetails?.remarks && ` ${discomApp.rejectionDetails.remarks}`}
                </p>
                <div className="text-[11px] text-rose-700 font-medium pt-1">
                  Corrective Action: Review transformer quota on adjacent feeder or revise Single Line Diagram for immediate resubmission.
                </div>
              </div>
            )}

            {/* Detailed 2-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Left Column: DISCOM Application Parameters & Documents */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-blue-600" />
                    <span>DISCOM Authority & Connection Parameters</span>
                  </h4>
                </div>

                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">DISCOM:</span>
                    <strong className="text-slate-900">{discomApp.discom}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Service Consumer No:</span>
                    <strong className="font-mono text-blue-700">{discomApp.consumerNumber}</strong>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Division / Section:</span>
                    <span className="text-slate-800">{discomApp.divisionSection}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Distribution Transformer (DT):</span>
                    <span className="text-slate-800 text-[11px] font-mono">{discomApp.substationTransformer}</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500">Fee Payment Reference:</span>
                    <span className="font-mono text-slate-800">{discomApp.feePayment?.utr}</span>
                  </div>
                </div>

                {/* Submitted Documents Checklist */}
                <div>
                  <span className="text-[11px] font-bold text-slate-600 block uppercase tracking-wider mb-2">
                    Submitted Statutory Documents Checklist (5/5)
                  </span>
                  <div className="space-y-1.5">
                    {discomApp.documentsSubmitted?.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white border border-slate-200 text-xs">
                        <div className="flex items-center gap-2">
                          <FileText className="w-3.5 h-3.5 text-slate-400" />
                          <span className="text-slate-800 font-medium">{doc.name}</span>
                        </div>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 flex items-center gap-1">
                          <CheckCircle2 className="w-2.5 h-2.5 text-emerald-600" />
                          {doc.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right Column: Feasibility Sanction & Field Remarks */}
              <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/50 space-y-4">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Technical Feasibility & Quota Status</span>
                  </h4>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-2 text-xs">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sanction Order:</span>
                    <strong className="font-mono text-blue-700">{discomApp.sanctionOrderNumber || "In Progress"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Sanctioned Date:</span>
                    <strong className="text-slate-800">{discomApp.approvalDate || "-"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Inspecting Officer:</span>
                    <span className="text-slate-800">{discomApp.officerInCharge}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Feasibility Order Validity:</span>
                    <span className="font-bold text-emerald-700">180 Days from Sanction</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1.5 text-xs">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    Official Field Liaison Remarks
                  </span>
                  <p className="text-slate-700 text-xs leading-relaxed">
                    {discomApp.remarks}
                  </p>
                </div>

                {discomApp.applicationStatus === "approved" && (
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-between">
                    <div className="text-xs text-emerald-900 font-semibold">
                      Official Feasibility Sanction Memo Ready
                    </div>
                    <button
                      onClick={() => setIsSanctionCertModalOpen(true)}
                      className="px-3 py-1.5 text-xs font-bold text-emerald-800 bg-white hover:bg-emerald-100 rounded-lg border border-emerald-300 transition-colors shadow-2xs"
                    >
                      Print Sanction Order
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          )}

          {/* VIEW 3: PM SURYA GHAR SUBSIDY SUB-TRACK */}
          {discomHubSubTab === "subsidy" && (
          <div className="p-6 bg-white rounded-2xl border border-slate-200/90 shadow-xs space-y-4">
            <div className="border-b border-zinc-200 pb-3 flex justify-between items-center">
              <div>
                <h3 className="font-bold text-sm text-black">PM Surya Ghar Subsidy Sub-Track</h3>
                <span className="text-[11px] text-zinc-500 font-mono">National Solar Portal Direct Benefit Transfer (DBT)</span>
              </div>
              <span className="bg-emerald-50 text-emerald-800 text-xs font-mono font-bold px-2.5 py-1 rounded-full border border-emerald-200">
                ₹{project.subsidyEligible.toLocaleString("en-IN")} Eligible Subsidy
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
              {[
                { stage: "National Portal Registration", status: "Done", date: "2026-10-15" },
                { stage: "Customer Bank Verification (DBT)", status: "Done", date: "2026-10-16" },
                { stage: "Commissioning & Sync Report Submission", status: "Pending Net Meter", date: "-" },
                { stage: "MNRE Portal Verification", status: "Pending", date: "-" },
                { stage: "Direct Benefit Transfer (DBT Credit)", status: "Pending", date: "Est: 30 days post-sync" },
              ].map((step, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">Step 0{idx + 1}</span>
                    <span className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                      step.status === "Done" ? "bg-emerald-100 text-emerald-800" : "bg-slate-200 text-slate-600"
                    }`}>
                      {step.status}
                    </span>
                  </div>
                  <div className="font-semibold text-slate-900 leading-snug">{step.stage}</div>
                  <div className="text-[10px] text-slate-400 font-mono pt-1">{step.date}</div>
                </div>
              ))}
            </div>
          </div>
          )}
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
                className="border border-zinc-300 px-4 py-1.5 text-xs font-semibold text-black hover:bg-white hover:shadow-xs"
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
                  className="border border-zinc-300 px-3.5 py-1.5 text-xs font-semibold text-black hover:bg-white hover:shadow-xs"
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

      {/* SECTION 9: CUSTOMER ORDER CONFIRMATION MODAL */}
      <CustomerConfirmationModal
        isOpen={showConfirmationModal}
        proposal={{
          capacityKw: project.capacityKw,
          totalProjectValue: project.totalValue,
          customerPayable: project.balanceDue,
          version: "v1.2",
          subsidy: project.subsidyEligible
        }}
        project={project}
        onClose={() => setShowConfirmationModal(false)}
        onConfirmConversion={(confirmedRecord) => {
          setConfirmedGovernance(confirmedRecord);
        }}
      />

      {/* SECTION 35: SERVICE COMPLAINT MODALS */}
      <ComplaintTicketModal
        isOpen={isServiceModalOpen}
        prefilledProject={project}
        onClose={() => setIsServiceModalOpen(false)}
        onSubmitTicket={(newTkt) => {
          setProjectTickets([newTkt, ...projectTickets]);
        }}
      />

      <TicketLifecycleModal
        isOpen={!!selectedServiceTicket}
        ticket={selectedServiceTicket}
        onClose={() => setSelectedServiceTicket(null)}
        onUpdateTicket={(updatedTkt) => {
          setProjectTickets(projectTickets.map(t => t.id === updatedTkt.id ? updatedTkt : t));
          setSelectedServiceTicket(updatedTkt);
        }}
      />







      {/* SECTION 22: PROJECT CLOSURE MODALS */}
      <UpdateClosureChecklistModal
        isOpen={isUpdateClosureModalOpen}
        onClose={() => setIsUpdateClosureModalOpen(false)}
        closureData={closureState}
        onSaveClosure={(updated) => setClosureState(updated)}
      />

      <ProjectClosureCertificateModal
        isOpen={isClosureCertModalOpen}
        onClose={() => setIsClosureCertModalOpen(false)}
        closureData={closureState}
      />

      {/* SECTION 21: SUBSIDY MODALS */}
      <UpdateSubsidyModal
        isOpen={isUpdateSubsidyModalOpen}
        onClose={() => setIsUpdateSubsidyModalOpen(false)}
        subsidyData={subsidyState}
        onUpdateSubsidy={(updated) => setSubsidyState(updated)}
      />

      <SubsidySanctionModal
        isOpen={isSubsidySanctionModalOpen}
        onClose={() => setIsSubsidySanctionModalOpen(false)}
        subsidyData={subsidyState}
      />

      {/* SECTION 20: FINAL PAYMENT MODALS */}
      <RecordFinalPaymentModal
        isOpen={isRecordFinalPayModalOpen}
        onClose={() => setIsRecordFinalPayModalOpen(false)}
        paymentData={finalPaymentState}
        onSavePayment={(updated) => setFinalPaymentState(updated)}
      />

      <SendReminderModal
        isOpen={isSendReminderModalOpen}
        onClose={() => setIsSendReminderModalOpen(false)}
        paymentData={finalPaymentState}
        onSendReminder={(newReminder) => {
          setFinalPaymentState(prev => ({
            ...prev,
            remindersSent: [newReminder, ...prev.remindersSent]
          }));
        }}
      />

      <NoDuesCertificateModal
        isOpen={isNoDuesModalOpen}
        onClose={() => setIsNoDuesModalOpen(false)}
        paymentData={finalPaymentState}
      />

      {/* SECTION 19: NET METERING MODALS */}
      <UpdateNetMeterModal
        isOpen={isUpdateMeterModalOpen}
        onClose={() => setIsUpdateMeterModalOpen(false)}
        meterData={netMeterState}
        onUpdateMeter={(updated) => setNetMeterState(updated)}
      />

      <NetMeterCertificateModal
        isOpen={isNetMeterCertModalOpen}
        onClose={() => setIsNetMeterCertModalOpen(false)}
        meterData={netMeterState}
      />

      {/* SECTION 18: INSPECTION & COMMISSIONING MODALS */}
      <InspectionStatusModal
        isOpen={isInspectionStatusModalOpen}
        onClose={() => setIsInspectionStatusModalOpen(false)}
        inspectionData={inspectionState}
        onUpdateInspection={(updated) => setInspectionState(updated)}
      />

      <CommissioningReportModal
        isOpen={isCommissioningReportModalOpen}
        onClose={() => setIsCommissioningReportModalOpen(false)}
        inspectionData={inspectionState}
      />

      {/* SECTION 17: PROGRESS TRACKER MODAL */}
      <UpdateStageModal
        isOpen={isUpdateStageModalOpen}
        targetStage={selectedStageToUpdate}
        projectId={project.id}
        onClose={() => setIsUpdateStageModalOpen(false)}
        onSaveStage={(updatedStage) => {
          setProjectProgress(prev => {
            const newStages = prev.stages.map(s => s.id === updatedStage.id ? updatedStage : s);
            const completedCount = newStages.filter(s => s.status === "completed").length;
            const overallPercent = Math.round((completedCount / newStages.length) * 100);
            return {
              ...prev,
              stages: newStages,
              overallPercent
            };
          });
        }}
      />

      {/* SECTION 16: INSTALLATION MODALS */}
      <UpdateInstallationModal
        isOpen={isUpdateInstallModalOpen}
        onClose={() => setIsUpdateInstallModalOpen(false)}
        installationData={installationState}
        onUpdateInstallation={(updated) => setInstallationState(updated)}
      />

      <InstallationSignOffModal
        isOpen={isInstallSignOffModalOpen}
        onClose={() => setIsInstallSignOffModalOpen(false)}
        installationData={installationState}
      />

      {/* SECTION 15: STORE MANAGEMENT MODALS */}
      <MaterialIssueModal
        isOpen={isIssueModalOpen}
        item={selectedStoreItem}
        projectId={project.id}
        onClose={() => setIsIssueModalOpen(false)}
        onConfirmIssue={(updatedItem) => {
          setStoreInventory(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
        }}
      />

      <MaterialReturnModal
        isOpen={isReturnModalOpen}
        item={selectedStoreItem}
        projectId={project.id}
        onClose={() => setIsReturnModalOpen(false)}
        onConfirmReturn={(updatedItem) => {
          setStoreInventory(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
        }}
      />

      {/* SECTION 14: PROCUREMENT MODALS */}
      <ProcurementModal
        isOpen={isProcurementModalOpen}
        targetItem={selectedProcurementItem}
        projectId={project.id}
        onClose={() => setIsProcurementModalOpen(false)}
        onSaveItem={(savedItem) => {
          setProcurementItems(prev => {
            const exists = prev.some(i => i.id === savedItem.id);
            if (exists) {
              return prev.map(i => i.id === savedItem.id ? savedItem : i);
            }
            return [savedItem, ...prev];
          });
        }}
      />

      <GoodsReceiptModal
        isOpen={isGRNModalOpen}
        item={selectedProcurementItem}
        projectId={project.id}
        onClose={() => setIsGRNModalOpen(false)}
        onConfirmReceipt={(updatedItem) => {
          setProcurementItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
        }}
      />

      {/* SECTION 13: TECHNICAL FEASIBILITY MODAL */}
      <FeasibilityAssessmentModal
        isOpen={isFeasibilityModalOpen}
        feasibilityRecord={feasibilityRecord}
        project={project}
        onClose={() => setIsFeasibilityModalOpen(false)}
        onUpdateFeasibility={(updatedRecord) => {
          setFeasibilityRecord(updatedRecord);
        }}
      />

      {/* SECTION 12: DISCOM APPLICATION MODALS */}
      <DISCOMStatusModal
        isOpen={isDiscomStatusModalOpen}
        discomApp={discomApp}
        project={project}
        onClose={() => setIsDiscomStatusModalOpen(false)}
        onUpdateDISCOM={(updatedApp) => {
          setDiscomApp(updatedApp);
        }}
      />

      <DISCOMSanctionCertificateModal
        isOpen={isSanctionCertModalOpen}
        discomApp={discomApp}
        project={project}
        onClose={() => setIsSanctionCertModalOpen(false)}
      />

      {/* SECTION 10: ADVANCE PAYMENT MODALS */}
      <RecordPaymentModal
        isOpen={isRecordPaymentOpen}
        project={project}
        totalReceived={totalReceived}
        onClose={() => setIsRecordPaymentOpen(false)}
        onSubmitPayment={(newPayment) => {
          setPayments([newPayment, ...payments]);
        }}
      />

      <PaymentReceiptModal
        isOpen={!!selectedReceiptPayment}
        payment={selectedReceiptPayment}
        project={project}
        onClose={() => setSelectedReceiptPayment(null)}
      />

      {/* SECTION 30: DOCUMENT VERSION & UPLOAD MODALS */}
      <DocumentVersionModal
        isOpen={!!versionModalDoc}
        document={versionModalDoc}
        onClose={() => setVersionModalDoc(null)}
        onUploadNewVersion={(doc) => {
          setVersionModalDoc(null);
          setUploadModalState({ isOpen: true, targetDoc: doc, defaultCat: doc.category });
        }}
      />

      <DocumentUploadModal
        isOpen={uploadModalState.isOpen}
        targetDocument={uploadModalState.targetDoc}
        defaultCategory={uploadModalState.defaultCat}
        projectId={project.id}
        onClose={() => setUploadModalState({ isOpen: false, targetDoc: null, defaultCat: "customer" })}
        onUploadSuccess={({ type, doc }) => {
          if (type === "UPDATE_VERSION") {
            setProjectDocs(prev => prev.map(d => d.id === doc.id ? doc : d));
          } else {
            setProjectDocs(prev => [doc, ...prev]);
          }
        }}
      />

      {/* SECTION 33: APPROVAL DECISION MODAL */}
      <ApprovalDecisionModal
        isOpen={!!selectedApprovalForDecision}
        request={selectedApprovalForDecision}
        onClose={() => setSelectedApprovalForDecision(null)}
        onSubmitDecision={(reqId, decisionRecord) => {
          setProjectApprovals(prev => prev.map(r => {
            if (r.id === reqId) {
              return {
                ...r,
                status: decisionRecord.decision,
                history: [decisionRecord, ...r.history]
              };
            }
            return r;
          }));
        }}
      />

    </div>
  );
}