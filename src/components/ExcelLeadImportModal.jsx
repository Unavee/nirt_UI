import React, { useState, useRef } from "react";
import * as XLSX from "xlsx";
import { 
  X, 
  UploadCloud, 
  FileSpreadsheet, 
  Download, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  Layers, 
  ArrowRight,
  Info,
  RefreshCw,
  FileCheck
} from "lucide-react";
import Portal from "@/components/Portal";
import { useRole } from "@/context/RoleContext";
import { useNavigate } from "react-router-dom";

// The 37 Canonical Sales Pipeline Fields with comprehensive alias matching
export const SALES_PIPELINE_FIELDS = [
  // 1. Required Core (3)
  { key: "customerName", label: "Customer Name *", required: true, group: "Required Core", aliases: ["customer name", "client name", "customer", "client", "name", "prospect name", "lead name", "consumer name"] },
  { key: "mobile", label: "Mobile Number *", required: true, group: "Required Core", aliases: ["mobile", "mobile number", "phone", "phone number", "contact", "contact number", "cell", "telephone", "whatsapp", "whatsapp number"] },
  { key: "location", label: "Location / District *", required: true, group: "Required Core", aliases: ["location", "district", "city", "town", "area", "place", "taluk", "circle"] },

  // 2. New Enquiry (3)
  { key: "requirementType", label: "Requirement Type", group: "New Enquiry", aliases: ["requirement type", "category", "project type", "segment", "tariff", "type", "solar type", "consumer type"] },
  { key: "leadSource", label: "Lead Source", group: "New Enquiry", aliases: ["lead source", "source", "enquiry source", "channel", "referral", "campaign", "source channel"] },
  { key: "ebBillCopy", label: "EB Bill Copy", group: "New Enquiry", aliases: ["eb bill copy", "eb bill", "electricity bill", "eb copy", "eb bill status", "bill copy", "eb upload"] },

  // 3. Contacted (6)
  { key: "capacityKw", label: "Capacity (kW)", group: "Contacted", aliases: ["capacity", "capacity kw", "kw", "system capacity", "plant capacity", "solar capacity", "proposed capacity", "system size", "size in kw", "plant size"] },
  { key: "preferredCapacity", label: "Preferred Capacity", group: "Contacted", aliases: ["preferred capacity", "preferred kw", "customer preferred kw", "demanded kw"] },
  { key: "interestedCapacity", label: "Interested Capacity", group: "Contacted", aliases: ["interested capacity", "interested kw", "target kw"] },
  { key: "contactStatus", label: "Contact Status", group: "Contacted", aliases: ["contact status", "call status", "reach status", "disposition", "status of contact"] },
  { key: "followUpDate", label: "Follow-up Date", group: "Contacted", aliases: ["follow up date", "followup date", "next follow up", "next call date", "callback date"] },
  { key: "discussionNotes", label: "Discussion Notes", group: "Contacted", aliases: ["discussion notes", "notes", "remarks", "customer discussion", "call remarks", "conversation notes", "comments"] },

  // 4. Qualified (8)
  { key: "avgMonthlyBill", label: "Avg Monthly Bill (₹)", group: "Qualified", aliases: ["avg monthly bill", "monthly bill", "eb bill amount", "bill amount", "current bill", "average bill", "bimonthly bill", "eb cost"] },
  { key: "roofType", label: "Roof Type", group: "Qualified", aliases: ["roof type", "terrace type", "roof structure", "roofing", "surface type", "roof"] },
  { key: "connectionType", label: "Connection Type", group: "Qualified", aliases: ["connection type", "phase", "power phase", "voltage phase", "meter phase", "service connection"] },
  { key: "budgetInterest", label: "Budget Interest", group: "Qualified", aliases: ["budget interest", "funding", "financing", "payment mode", "budget", "loan requirement"] },
  { key: "discom", label: "DISCOM Circle", group: "Qualified", aliases: ["discom", "discom circle", "tangedco section", "electricity board", "utility", "edc"] },
  { key: "consumerNumber", label: "Consumer Number", group: "Qualified", aliases: ["consumer number", "eb consumer number", "service number", "eb number", "sc no", "consumer no"] },
  { key: "email", label: "Email Address", group: "Qualified", aliases: ["email", "email address", "mail", "e-mail"] },
  { key: "siteAddress", label: "Site Address", group: "Qualified", aliases: ["site address", "address", "premise address", "street address", "installation address"] },

  // 5. Site Visit (6)
  { key: "googleLocation", label: "Google Location / GPS", group: "Site Visit", aliases: ["google location", "gps", "coordinates", "maps link", "map location", "google pin", "lat long"] },
  { key: "siteVisitDate", label: "Site Visit Date", group: "Site Visit", aliases: ["site visit date", "survey date", "visit date", "field inspection date"] },
  { key: "assignedEngineer", label: "Assigned Engineer", group: "Site Visit", aliases: ["assigned engineer", "survey engineer", "surveyor", "engineer", "field engineer", "technician"] },
  { key: "shadowAnalysis", label: "Shadow Analysis", group: "Site Visit", aliases: ["shadow analysis", "shadow clearance", "shade", "shadow profiling", "shading"] },
  { key: "availableRoofArea", label: "Available Roof Area (sq.ft)", group: "Site Visit", aliases: ["available roof area", "roof area", "terrace area", "area sqft", "usable area", "shade free area"] },
  { key: "suggestedSystemSize", label: "Suggested System Size", group: "Site Visit", aliases: ["suggested system size", "suggested kw", "technical sizing kw", "surveyor recommended kw"] },

  // 6. Quotation & Negotiation (8)
  { key: "quotationNumber", label: "Quotation Number", group: "Quotation & Negotiation", aliases: ["quotation number", "quote no", "quote id", "quotation ref", "proposal no"] },
  { key: "finalCapacity", label: "Final Capacity (kW)", group: "Quotation & Negotiation", aliases: ["final capacity", "quoted capacity", "contracted kw", "agreed capacity"] },
  { key: "estimatedCost", label: "Estimated Cost (₹)", group: "Quotation & Negotiation", aliases: ["estimated cost", "quotation value", "system cost", "quote amount", "total cost", "gross cost", "price inr"] },
  { key: "expectedSavings", label: "Expected Savings (₹)", group: "Quotation & Negotiation", aliases: ["expected savings", "annual savings", "monthly savings", "estimated savings", "roi savings"] },
  { key: "revisedPrice", label: "Revised Price (₹)", group: "Quotation & Negotiation", aliases: ["revised price", "discounted price", "final price", "negotiated price", "final agreed cost"] },
  { key: "customerConcerns", label: "Customer Concerns", group: "Quotation & Negotiation", aliases: ["customer concerns", "concerns", "customer objections", "questions", "queries"] },
  { key: "competitorDetails", label: "Competitor Details", group: "Quotation & Negotiation", aliases: ["competitor details", "competitor", "other quotes", "rival vendor", "competitor price"] },
  { key: "expectedClosingDate", label: "Expected Closing Date", group: "Quotation & Negotiation", aliases: ["expected closing date", "target close date", "closing date", "deal date", "expected sign date"] },

  // 7. Routing & Stage Targeting (3)
  { key: "subsidyEligible", label: "Subsidy Eligible", group: "Routing", aliases: ["subsidy eligible", "subsidy", "pm surya ghar", "dbt eligible", "subsidy claim"] },
  { key: "salesStage", label: "Target Sales Stage", group: "Routing", aliases: ["sales stage", "stage", "target stage", "pipeline stage", "initial stage", "status"] },
  { key: "salesOwner", label: "Sales Owner / Rep", group: "Routing", aliases: ["sales owner", "sales rep", "assigned to", "owner", "account executive", "rep"] }
];

export default function ExcelLeadImportModal({ isOpen, onClose, onImportSuccess }) {
  const { can, activeRole, addAuditEntry } = useRole();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  // Check RBAC permission for sales:create
  const hasCreatePermission = can("sales", "create");

  // State Management
  const [workbook, setWorkbook] = useState(null);
  const [sheetNames, setSheetNames] = useState([]);
  const [selectedSheet, setSelectedSheet] = useState("");
  const [rawRows, setRawRows] = useState([]);
  const [detectedHeaders, setDetectedHeaders] = useState([]);
  const [columnMapping, setColumnMapping] = useState({});
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState(0);
  const [skipDuplicates, setSkipDuplicates] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  if (!isOpen) return null;

  // Header Normalization Helper
  const normalizeHeader = (str) => {
    return String(str || "")
      .toLowerCase()
      .replace(/[_\-]+/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  };

  // Auto-Detect Mappings based on Aliases
  const autoDetectMappings = (headers) => {
    const mapping = {};
    const usedHeaders = new Set();

    SALES_PIPELINE_FIELDS.forEach((field) => {
      // 1. Exact match on field.key or field.label
      const exactHeader = headers.find((h) => {
        const norm = normalizeHeader(h);
        return norm === normalizeHeader(field.key) || norm === normalizeHeader(field.label);
      });

      if (exactHeader && !usedHeaders.has(exactHeader)) {
        mapping[field.key] = exactHeader;
        usedHeaders.add(exactHeader);
        return;
      }

      // 2. Alias matching
      const aliasMatch = headers.find((h) => {
        if (usedHeaders.has(h)) return false;
        const norm = normalizeHeader(h);
        return field.aliases.some((alias) => norm === alias || norm.includes(alias) || alias.includes(norm));
      });

      if (aliasMatch) {
        mapping[field.key] = aliasMatch;
        usedHeaders.add(aliasMatch);
      } else {
        mapping[field.key] = "";
      }
    });

    return mapping;
  };

  // Handle File Ingestion
  const handleFileUpload = async (file) => {
    if (!file) return;
    setFileName(file.name);
    setFileSize(file.size);

    try {
      const buffer = await file.arrayBuffer();
      const wb = XLSX.read(buffer, { type: "array" });
      setWorkbook(wb);
      setSheetNames(wb.SheetNames);

      const firstSheet = wb.SheetNames[0];
      setSelectedSheet(firstSheet);
      processWorksheet(wb.Sheets[firstSheet]);
    } catch (err) {
      console.error("SheetJS Parse Error:", err);
      alert("Error parsing file. Please ensure it is a valid .xlsx, .xls, or .csv document.");
    }
  };

  const processWorksheet = (ws) => {
    const json = XLSX.utils.sheet_to_json(ws, { defval: "" });
    if (!json || json.length === 0) {
      setRawRows([]);
      setDetectedHeaders([]);
      setColumnMapping({});
      return;
    }

    const headers = Object.keys(json[0]);
    setRawRows(json);
    setDetectedHeaders(headers);

    const initialMapping = autoDetectMappings(headers);
    setColumnMapping(initialMapping);
  };

  const handleSheetChange = (sheetName) => {
    setSelectedSheet(sheetName);
    if (workbook && workbook.Sheets[sheetName]) {
      processWorksheet(workbook.Sheets[sheetName]);
    }
  };

  // Drag and Drop handlers
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  // Data Sanitizers & Parsing
  const sanitizeNumber = (val) => {
    if (val === null || val === undefined || val === "") return 0;
    const str = String(val).replace(/,/g, "").replace(/[^\d.]/g, "");
    const num = parseFloat(str);
    return isNaN(num) ? 0 : num;
  };

  const sanitizeBoolean = (val, defaultVal = false) => {
    if (val === null || val === undefined || val === "") return defaultVal;
    const s = String(val).trim().toLowerCase();
    if (["yes", "y", "true", "1", "uploaded", "available", "submitted", "eligible"].includes(s)) return true;
    if (["no", "n", "false", "0", "pending", "none", "ineligible"].includes(s)) return false;
    return defaultVal;
  };

  const sanitizeMobile = (val) => {
    const digits = String(val || "").replace(/\D/g, "");
    return digits.slice(-10);
  };

  const sanitizeStage = (val) => {
    const s = String(val || "").toLowerCase().trim();
    if (s.includes("contact")) return "sales_contacted";
    if (s.includes("qualif")) return "sales_qualified";
    if (s.includes("scheduled") || s.includes("site visit sched")) return "sales_site_visit_scheduled";
    if (s.includes("completed") || s.includes("survey done")) return "sales_site_visit_completed";
    if (s.includes("quote") || s.includes("quotation")) return "sales_quotation_sent";
    if (s.includes("negotiat") || s.includes("terms")) return "sales_negotiation";
    if (s.includes("confirm") || s.includes("won") || s.includes("deal")) return "sales_deal_confirmed";
    if (s.includes("unfeasible") || s.includes("not feasible")) return "sales_not_feasible";
    if (s.includes("lost") || s.includes("drop")) return "sales_lost";
    return "sales_new_enquiry";
  };

  const getStageTitle = (stageId) => {
    const map = {
      sales_new_enquiry: "New enquiry",
      sales_contacted: "Contacted",
      sales_qualified: "Qualified",
      sales_site_visit_scheduled: "Site Visit Scheduled",
      sales_site_visit_completed: "Site Visit Completed",
      sales_quotation_sent: "Quotation Sent",
      sales_negotiation: "Negotiation",
      sales_deal_confirmed: "Deal Confirmed",
      sales_not_feasible: "Not Feasible",
      sales_lost: "Lost"
    };
    return map[stageId] || "New enquiry";
  };

  // Get Existing CRM Mobiles for Deduplication
  const getExistingMobiles = () => {
    try {
      const stored = localStorage.getItem("nirt_crm_projects");
      const list = stored ? JSON.parse(stored) : [];
      return new Set(list.map((p) => sanitizeMobile(p.phone || p.mobile || "")));
    } catch {
      return new Set();
    }
  };

  const existingMobiles = getExistingMobiles();

  // Validate & Transform Rows
  const processedRows = rawRows.map((row, idx) => {
    const getVal = (key) => {
      const header = columnMapping[key];
      return header ? String(row[header] || "").trim() : "";
    };

    const customerName = getVal("customerName");
    const rawMobile = getVal("mobile");
    const mobile = sanitizeMobile(rawMobile);
    const location = getVal("location") || "Salem";
    const capacityKw = sanitizeNumber(getVal("capacityKw")) || sanitizeNumber(getVal("preferredCapacity")) || 3.0;
    const rawStage = getVal("salesStage");
    const salesStage = sanitizeStage(rawStage);
    const isDuplicate = existingMobiles.has(mobile);

    // Validation checks
    const missing = [];
    if (!customerName) missing.push("Name");
    if (!mobile || mobile.length < 10) missing.push("10-digit Mobile");
    if (!location) missing.push("Location");

    let status = "ready";
    let statusText = "Ready";

    if (missing.length > 0) {
      status = "error";
      statusText = `Missing: ${missing.join(", ")}`;
    } else if (isDuplicate && skipDuplicates) {
      status = "skipped";
      statusText = "Skipped (Duplicate mobile)";
    }

    return {
      rowIndex: idx + 1,
      raw: row,
      customerName,
      mobile,
      location,
      capacityKw,
      salesStage,
      status,
      statusText,
      getVal
    };
  });

  const validRows = processedRows.filter((r) => r.status === "ready");
  const errorRows = processedRows.filter((r) => r.status === "error");
  const skippedRows = processedRows.filter((r) => r.status === "skipped");

  // Sample Excel Generation
  const downloadSampleTemplate = () => {
    const sampleData = [
      {
        "Customer Name": "S. Murugesan",
        "Mobile Number": "9842100411",
        "Location / District": "Salem West, Fairlands",
        "Requirement Type": "Residential",
        "Lead Source": "WhatsApp Campaign",
        "EB Bill Copy": "Submitted",
        "Capacity (kW)": 3.0,
        "Preferred Capacity": 3.0,
        "Contact Status": "Interested - Qualify Now",
        "Follow-up Date": "2026-11-20",
        "Discussion Notes": "Interested in 3kW residential solar under PM Surya Ghar. High daytime load.",
        "Avg Monthly Bill (₹)": 3500,
        "Roof Type": "RCC Flat Concrete",
        "Connection Type": "Single Phase (230V LT)",
        "Budget Interest": "Self-Funded / Full Cash",
        "DISCOM Circle": "Salem",
        "Consumer Number": "04-219-002-1482",
        "Email Address": "murugesan.s@gmail.com",
        "Site Address": "Plot 14, Fairlands 3rd Cross, Salem",
        "Google Location / GPS": "11.6643, 78.1460",
        "Site Visit Date": "2026-11-22",
        "Assigned Engineer": "M. Saravanan",
        "Shadow Analysis": "Shadow-Free (100% Daylight Clearance)",
        "Available Roof Area (sq.ft)": 450,
        "Suggested System Size": 3.3,
        "Quotation Number": "NIRT-QT-2026-0091",
        "Final Capacity (kW)": 3.3,
        "Estimated Cost (₹)": 185000,
        "Expected Savings (₹)": "₹36,000 / Year",
        "Revised Price (₹)": 175000,
        "Customer Concerns": "Needs prompt net-meter sanction from TANGEDCO",
        "Competitor Details": "Local vendor quoted lower with tier-2 modules",
        "Expected Closing Date": "2026-11-25",
        "Subsidy Eligible": "Yes",
        "Target Sales Stage": "Qualified",
        "Sales Owner": "Rajkumar S"
      },
      {
        "Customer Name": "Sri Murugan Agro Cold Storage",
        "Mobile Number": "9443219800",
        "Location / District": "Namakkal Circle",
        "Requirement Type": "Commercial",
        "Lead Source": "Customer Reference",
        "EB Bill Copy": "Submitted",
        "Capacity (kW)": 25.0,
        "Preferred Capacity": 25.0,
        "Contact Status": "Interested - Qualify Now",
        "Follow-up Date": "2026-11-21",
        "Discussion Notes": "Cold storage unit running compressors 18h daily. Needs commercial 25kW system.",
        "Avg Monthly Bill (₹)": 42000,
        "Roof Type": "Industrial Metal Sheet",
        "Connection Type": "Three Phase (415V LT)",
        "Budget Interest": "Bank Solar Loan / EMI",
        "DISCOM Circle": "Namakkal",
        "Consumer Number": "03-112-005-0911",
        "Email Address": "accounts@muruganagro.in",
        "Site Address": "SF 240, Paramathi Road, Namakkal",
        "Google Location / GPS": "11.2189, 78.1674",
        "Site Visit Date": "2026-11-23",
        "Assigned Engineer": "K. Vetrivel",
        "Shadow Analysis": "Shadow-Free (100% Daylight Clearance)",
        "Available Roof Area (sq.ft)": 2800,
        "Suggested System Size": 25.0,
        "Quotation Number": "NIRT-QT-2026-0092",
        "Final Capacity (kW)": 25.0,
        "Estimated Cost (₹)": 1150000,
        "Expected Savings (₹)": "₹2,80,000 / Year",
        "Revised Price (₹)": 1125000,
        "Customer Concerns": "Needs minimum generation guarantee",
        "Competitor Details": "Coimbatore vendor",
        "Expected Closing Date": "2026-11-28",
        "Subsidy Eligible": "No",
        "Target Sales Stage": "Site Visit Scheduled",
        "Sales Owner": "P. Vignesh"
      },
      {
        "Customer Name": "Dr. K. Arulmani Residence",
        "Mobile Number": "9842144550",
        "Location / District": "Erode Urban",
        "Requirement Type": "Residential",
        "Lead Source": "Direct Enquiry",
        "EB Bill Copy": "Pending",
        "Capacity (kW)": 5.0,
        "Preferred Capacity": 5.0,
        "Contact Status": "Interested - Follow Up Later",
        "Follow-up Date": "2026-11-24",
        "Discussion Notes": "Independent bungalow with terrace garden. Prefers elevated structure.",
        "Avg Monthly Bill (₹)": 6800,
        "Roof Type": "Elevated Superstructure Needed",
        "Connection Type": "Three Phase (415V LT)",
        "Budget Interest": "PM Surya Ghar DBT Subsidy Dependent",
        "DISCOM Circle": "Erode",
        "Consumer Number": "02-140-008-0124",
        "Email Address": "arulmani.k@yahoo.com",
        "Site Address": "28, Brough Road, Erode",
        "Google Location / GPS": "11.3410, 77.7172",
        "Site Visit Date": "",
        "Assigned Engineer": "",
        "Shadow Analysis": "Minor Morning / Evening Parapet Shadow (<10%)",
        "Available Roof Area (sq.ft)": 750,
        "Suggested System Size": 5.0,
        "Quotation Number": "",
        "Final Capacity (kW)": 5.0,
        "Estimated Cost (₹)": 275000,
        "Expected Savings (₹)": "₹54,000 / Year",
        "Revised Price (₹)": 265000,
        "Customer Concerns": "Wants high clearance under modules for terrace walkway",
        "Competitor Details": "None",
        "Expected Closing Date": "2026-12-05",
        "Subsidy Eligible": "Yes",
        "Target Sales Stage": "New enquiry",
        "Sales Owner": "Rajkumar S"
      }
    ];

    const ws = XLSX.utils.json_to_sheet(sampleData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sales_Leads_Template");
    XLSX.writeFile(wb, "NIRT_Sales_Leads_Template.xlsx");
  };

  // Execute Batch Pipeline Loader
  const handleExecuteImport = () => {
    if (validRows.length === 0) return;
    setIsProcessing(true);

    try {
      // 1. Fetch current projects
      const stored = localStorage.getItem("nirt_crm_projects");
      const currentProjects = stored ? JSON.parse(stored) : [];

      let runningNumber = currentProjects.length + 100;
      let totalCapacityKw = 0;

      // 2. Transform valid rows into full CRM Project entities
      const newProjects = validRows.map((r, i) => {
        const getV = r.getVal;
        const projectNum = runningNumber + i;
        const leadId = `NIRT-LD-26${String(projectNum).slice(-2)}`;
        const projectId = `NIRT-PRJ-2026-0${projectNum}`;

        const reqType = getV("requirementType") || "Residential";
        const isResidential = reqType.toLowerCase().includes("res");
        const capacity = r.capacityKw;
        totalCapacityKw += capacity;

        // Financial defaults
        const explicitCost = sanitizeNumber(getV("estimatedCost")) || sanitizeNumber(getV("revisedPrice"));
        const fallbackCost = Math.round(capacity * (isResidential ? 62000 : 45000));
        const totalValue = explicitCost > 0 ? explicitCost : fallbackCost;

        const isSubsidy = sanitizeBoolean(getV("subsidyEligible"), isResidential);
        const subsidyAmount = isSubsidy ? Math.min(78000, Math.round(capacity * 18000)) : 0;

        const stageId = r.salesStage;
        const stageTitle = getStageTitle(stageId);

        // Pre-fill stageData dictionary with all 37 mapped values
        const stageData = {
          customerName: r.customerName,
          phone: r.mobile,
          mobile: r.mobile,
          location: r.location,
          requirementType: reqType,
          leadSource: getV("leadSource") || "Excel Batch Import",
          ebBillCopy: getV("ebBillCopy") || (sanitizeBoolean(getV("ebBillCopy")) ? "Submitted" : "Pending"),
          capacityKw: capacity,
          preferredCapacity: sanitizeNumber(getV("preferredCapacity")) || capacity,
          interestedCapacity: sanitizeNumber(getV("interestedCapacity")) || capacity,
          contactStatus: getV("contactStatus") || "Interested - Qualify Now",
          followUpDate: getV("followUpDate") || new Date(Date.now() + 86400000 * 2).toISOString().split("T")[0],
          discussionNotes: getV("discussionNotes") || "Batch imported via Excel lead sheet.",
          avgMonthlyEbBill: sanitizeNumber(getV("avgMonthlyBill")) || 3500,
          roofType: getV("roofType") || "RCC Flat Concrete",
          connectionType: getV("connectionType") || "Single Phase (230V LT)",
          budgetInterest: getV("budgetInterest") || "Self-Funded / Full Cash",
          discom: getV("discom") || r.location,
          consumerNumber: getV("consumerNumber") || `04-${Math.floor(100+Math.random()*900)}-${Math.floor(100+Math.random()*900)}`,
          email: getV("email") || "",
          siteAddress: getV("siteAddress") || r.location,
          googleLocation: getV("googleLocation") || "",
          siteVisitDate: getV("siteVisitDate") || "",
          assignedEngineer: getV("assignedEngineer") || "M. Saravanan",
          shadowAnalysis: getV("shadowAnalysis") || "Shadow-Free (100% Daylight Clearance)",
          availableRoofArea: sanitizeNumber(getV("availableRoofArea")) || Math.round(capacity * 100),
          suggestedSystemSize: sanitizeNumber(getV("suggestedSystemSize")) || capacity,
          quotationNumber: getV("quotationNumber") || `NIRT-QT-2026-${projectNum}`,
          finalCapacity: sanitizeNumber(getV("finalCapacity")) || capacity,
          estimatedCost: totalValue,
          expectedSavings: getV("expectedSavings") || `₹${Math.round(capacity * 12000)} / Year`,
          revisedPrice: sanitizeNumber(getV("revisedPrice")) || totalValue,
          customerConcerns: getV("customerConcerns") || "Standard commercial delivery warranty requested.",
          competitorDetails: getV("competitorDetails") || "None reported.",
          expectedClosingDate: getV("expectedClosingDate") || new Date(Date.now() + 86400000 * 7).toISOString().split("T")[0],
          subsidyEligible: isSubsidy,
          salesOwner: getV("salesOwner") || activeRole.title.split("/")[0].trim()
        };

        // If Deal Confirmed, auto-initialize execution and subsidy stages
        const isDealConfirmed = stageId === "sales_deal_confirmed";
        const executionStage = isDealConfirmed ? "exec_advance_pending" : null;
        const subsidyStage = isDealConfirmed && isSubsidy ? "subsidy_applied" : null;

        return {
          id: projectId,
          leadId,
          client: r.customerName,
          customerName: r.customerName,
          phone: r.mobile,
          mobile: r.mobile,
          email: stageData.email,
          capacity: `${capacity} kW`,
          capacityKw: capacity,
          value: `₹${(totalValue / 100000).toFixed(1)}L`,
          valueNumeric: totalValue,
          totalValue,
          advanceCleared: false,
          district: r.location,
          branch: r.location,
          pipeline: "sales",
          stage: stageId,
          status: stageTitle,
          salesStage: stageId,
          executionStage,
          subsidyStage,
          subsidyEligible: isSubsidy ? subsidyAmount : 0,
          createdDate: new Date().toISOString().split("T")[0],
          daysInStage: 1,
          stageData,
          documents: [
            {
              name: "EB Bill Copy",
              status: stageData.ebBillCopy === "Submitted" ? "Submitted" : "Pending",
              date: new Date().toISOString().split("T")[0]
            }
          ]
        };
      });

      // 3. Persist to localStorage
      const updatedProjects = [...newProjects, ...currentProjects];
      localStorage.setItem("nirt_crm_projects", JSON.stringify(updatedProjects));

      // 4. Log Batch Audit Trail Entry
      const firstId = newProjects[0]?.id;
      const lastId = newProjects[newProjects.length - 1]?.id;
      addAuditEntry({
        staffName: activeRole.title.split("/")[0].trim(),
        projectId: `${firstId} ... ${lastId}`,
        clientName: `Bulk Ingest: ${newProjects.length} Leads`,
        step: "Sales Pipeline Lead Intake",
        field: "Batch Ingestion",
        oldValue: "0 Leads",
        newValue: `${newProjects.length} Leads (${totalCapacityKw.toFixed(1)} kW)`,
        reason: `Uploaded Excel File: "${fileName}" with automated 37-field parameter mapping.`
      });

      // 5. Broadcast to other open browser tabs
      try {
        const bc = new BroadcastChannel("nirt_crm_sync");
        bc.postMessage({ type: "PROJECTS_UPDATED", count: newProjects.length });
        bc.close();
      } catch {
        // Fallback if BroadcastChannel unavailable
      }

      // 6. Push system notification
      try {
        const notifStored = localStorage.getItem("nirt_system_notifications");
        const notifs = notifStored ? JSON.parse(notifStored) : [];
        const newNotif = {
          id: `NOTIF-${Date.now()}`,
          title: "Bulk Excel Leads Ingested",
          message: `Successfully loaded ${newProjects.length} leads (${totalCapacityKw.toFixed(1)} kW) from ${fileName}.`,
          timestamp: "Just now",
          read: false
        };
        localStorage.setItem("nirt_system_notifications", JSON.stringify([newNotif, ...notifs]));
      } catch {}

      // 7. Success callback & navigation
      if (onImportSuccess) {
        onImportSuccess(newProjects);
      }

      onClose();
      navigate("/pipelines?pipeline=sales");
    } catch (err) {
      console.error("Batch Import Failed:", err);
      alert("Failed to import leads. Please check console for details.");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Portal>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 backdrop-blur-[1px] p-3 sm:p-5 animate-in fade-in duration-150">
        <div className="max-w-5xl w-full max-h-[92vh] flex flex-col rounded-lg border border-slate-200 bg-white shadow-2xl overflow-hidden">
          
          {/* Modal Header */}
          <div className="px-6 py-4 border-b border-slate-200 bg-slate-50/70 flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2">
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase tracking-wider bg-amber-100 text-amber-800 border border-amber-300">
                  1. Sales Pipeline · Bulk Excel / CSV Ingestion
                </span>
                <span className="text-xs text-slate-400 font-mono">SheetJS v0.20</span>
              </div>
              <h2 className="text-base font-bold text-slate-900 tracking-tight mt-1 flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-amber-600" />
                Upload Excel Leads into Sales Pipeline
              </h2>
            </div>

            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={downloadSampleTemplate}
                className="rounded-md border border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 hover:text-slate-900 transition-colors shadow-2xs flex items-center gap-1.5"
                title="Download formatted sample template (.xlsx)"
              >
                <Download className="w-3.5 h-3.5 text-slate-500" />
                <span>Download Sample .xlsx</span>
              </button>

              <button
                type="button"
                onClick={onClose}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200/60 transition-colors"
                title="Close Modal (Esc)"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* RBAC Warning Banner if user lacks permission */}
          {!hasCreatePermission && (
            <div className="mx-6 mt-4 p-3 rounded-md border border-red-200 bg-red-50 text-red-800 text-xs flex items-center gap-2.5">
              <ShieldAlert className="w-4 h-4 text-red-600 shrink-0" />
              <span>
                <strong>Read-Only Mode:</strong> Your active role (<strong>{activeRole.title}</strong>) does not have <code>sales:create</code> permission. You can inspect and parse sheets, but pipeline import is restricted.
              </span>
            </div>
          )}

          {/* Modal Body (Scrollable) */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
            
            {/* Step 1: Drag-and-Drop Dropzone */}
            <div
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`rounded-lg border border-dashed px-6 py-6 text-center cursor-pointer transition-all ${
                dragActive
                  ? "border-amber-600 bg-amber-50/60 ring-2 ring-amber-600/20"
                  : fileName
                  ? "border-emerald-300 bg-emerald-50/30"
                  : "border-slate-300 bg-slate-50/70 hover:bg-slate-100/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls,.csv"
                onChange={(e) => e.target.files && handleFileUpload(e.target.files[0])}
                className="hidden"
              />

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="w-10 h-10 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-2xs">
                  <UploadCloud className={`w-5 h-5 ${fileName ? "text-emerald-600" : "text-amber-600"}`} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">
                    {fileName ? (
                      <span className="text-emerald-700 font-bold">{fileName} ({(fileSize / 1024).toFixed(1)} KB)</span>
                    ) : (
                      <>Click to browse or drag and drop your lead sheet here</>
                    )}
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Supports Microsoft Excel (<code>.xlsx</code>, <code>.xls</code>) and <code>.csv</code> files
                  </p>
                </div>
              </div>
            </div>

            {/* Step 2: Multi-Sheet Selection Bar */}
            {sheetNames.length > 1 && (
              <div className="flex items-center justify-between p-2.5 rounded-md border border-slate-200 bg-slate-50 text-xs">
                <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-slate-500" />
                  Multiple sheets found in workbook:
                </span>
                <select
                  value={selectedSheet}
                  onChange={(e) => handleSheetChange(e.target.value)}
                  className="px-2.5 py-1 rounded border border-slate-300 bg-white text-xs font-medium text-slate-800 focus:outline-none focus:ring-1 focus:ring-amber-500"
                >
                  {sheetNames.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Step 3: 37-Field Flexible Column Mapping Section */}
            {detectedHeaders.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Flexible Column Mapping (37 Canonical Sales Inputs)
                    </h3>
                    <span className="text-[11px] font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
                      {detectedHeaders.length} Columns Detected
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setColumnMapping(autoDetectMappings(detectedHeaders))}
                    className="text-[11px] font-semibold text-amber-700 hover:text-amber-800 flex items-center gap-1"
                  >
                    <RefreshCw className="w-3 h-3" />
                    Reset Auto-Mapping
                  </button>
                </div>

                <div className="max-h-56 overflow-y-auto rounded-md border border-slate-200 bg-slate-50 p-3.5">
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                    {SALES_PIPELINE_FIELDS.map((f) => (
                      <div key={f.key} className="space-y-1">
                        <label className="text-[11px] font-medium text-slate-700 truncate block">
                          {f.label}
                        </label>
                        <select
                          value={columnMapping[f.key] || ""}
                          onChange={(e) => setColumnMapping({ ...columnMapping, [f.key]: e.target.value })}
                          className={`w-full px-2 py-1 rounded text-xs border font-medium focus:outline-none ${
                            columnMapping[f.key]
                              ? "border-amber-300 bg-amber-50/30 text-slate-900 font-semibold"
                              : f.required
                              ? "border-red-300 bg-red-50/20 text-red-800"
                              : "border-slate-200 bg-white text-slate-500"
                          }`}
                        >
                          <option value="">— Unmapped / Default —</option>
                          {detectedHeaders.map((h) => (
                            <option key={h} value={h}>{h}</option>
                          ))}
                        </select>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Live Validation Preview Table */}
            {rawRows.length > 0 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-700 font-mono">
                      Validation & Ingestion Preview
                    </h3>
                    <div className="flex items-center gap-1.5 text-[11px] font-mono">
                      <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                        {validRows.length} Ready
                      </span>
                      {errorRows.length > 0 && (
                        <span className="px-2 py-0.5 rounded bg-red-50 text-red-800 font-bold border border-red-200">
                          {errorRows.length} Errors
                        </span>
                      )}
                      {skippedRows.length > 0 && (
                        <span className="px-2 py-0.5 rounded bg-amber-50 text-amber-800 font-bold border border-amber-200">
                          {skippedRows.length} Duplicates
                        </span>
                      )}
                    </div>
                  </div>

                  <label className="flex items-center gap-1.5 text-xs font-medium text-slate-700 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={skipDuplicates}
                      onChange={(e) => setSkipDuplicates(e.target.checked)}
                      className="rounded border-slate-300 text-amber-600 focus:ring-amber-500"
                    />
                    <span>Skip duplicate mobile numbers already in CRM</span>
                  </label>
                </div>

                <div className="max-h-60 overflow-auto rounded-md border border-slate-200">
                  <table className="w-full text-left text-xs min-w-[700px]">
                    <thead className="bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider font-mono sticky top-0 border-b border-slate-200">
                      <tr>
                        <th className="py-2 px-3 w-12">Row</th>
                        <th className="py-2 px-3">Customer & Mobile</th>
                        <th className="py-2 px-3">Location & Circle</th>
                        <th className="py-2 px-3 text-right">Capacity (kW)</th>
                        <th className="py-2 px-3">Sales Stage Target</th>
                        <th className="py-2 px-3">Validation Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {processedRows.map((r) => (
                        <tr
                          key={r.rowIndex}
                          className={`hover:bg-slate-50 transition-colors ${
                            r.status === "error"
                              ? "bg-red-50/20"
                              : r.status === "skipped"
                              ? "bg-amber-50/20 opacity-75"
                              : ""
                          }`}
                        >
                          <td className="py-2 px-3 font-mono tabular-nums text-slate-400 text-[11px]">
                            #{r.rowIndex}
                          </td>
                          <td className="py-2 px-3">
                            <div className="font-semibold text-slate-900">{r.customerName || "—"}</div>
                            <div className="text-[11px] text-slate-500 font-mono tabular-nums">
                              {r.mobile ? `+91 ${r.mobile}` : "—"}
                            </div>
                          </td>
                          <td className="py-2 px-3 text-slate-700">
                            {r.location}
                          </td>
                          <td className="py-2 px-3 font-mono tabular-nums text-right font-semibold text-slate-800">
                            {r.capacityKw.toFixed(1)} kW
                          </td>
                          <td className="py-2 px-3">
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-100 text-slate-700 border border-slate-200">
                              {getStageTitle(r.salesStage)}
                            </span>
                          </td>
                          <td className="py-2 px-3">
                            <span
                              className={`text-[11px] font-semibold ${
                                r.status === "ready"
                                  ? "text-emerald-700 flex items-center gap-1"
                                  : r.status === "skipped"
                                  ? "text-amber-700"
                                  : "text-red-700"
                              }`}
                            >
                              {r.status === "ready" && <CheckCircle2 className="w-3 h-3 text-emerald-600" />}
                              {r.statusText}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>

          {/* Modal Footer Controls */}
          <div className="px-6 py-3.5 border-t border-slate-200 bg-slate-50/60 flex items-center justify-between">
            <div className="text-xs text-slate-500 font-mono">
              {validRows.length > 0 ? (
                <span>
                  Ready to ingest <strong className="text-slate-900 font-bold">{validRows.length}</strong> valid leads into Sales Pipeline
                </span>
              ) : (
                <span>Upload a valid spreadsheet to begin</span>
              )}
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                type="button"
                onClick={onClose}
                className="rounded-md border border-slate-300 bg-white px-3.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors shadow-2xs"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleExecuteImport}
                disabled={!hasCreatePermission || validRows.length === 0 || isProcessing}
                className={`rounded-md px-4 py-2 text-xs font-bold flex items-center gap-2 transition-all shadow-sm ${
                  !hasCreatePermission || validRows.length === 0 || isProcessing
                    ? "bg-slate-200 text-slate-400 border border-slate-300 cursor-not-allowed"
                    : "border border-amber-600 bg-amber-500 text-slate-950 hover:bg-amber-400 active:scale-[0.99] cursor-pointer"
                }`}
              >
                <FileSpreadsheet className="w-4 h-4" />
                <span>
                  {isProcessing
                    ? "Importing Leads..."
                    : `Import ${validRows.length > 0 ? validRows.length : ""} Leads into Pipeline`}
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>
    </Portal>
  );
}
