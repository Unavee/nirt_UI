// BFRD Section 24: Task & Follow-up Management Data Store
// Every activity should have a task.
// Fields: Task name, Project ID, Assigned person, Assigned date, Due date, Priority (High/Medium/Low),
// Status (Pending/In Progress/Completed/Overdue/Cancelled), Remarks, Completion date.

export const INITIAL_PROJECT_TASKS = {
  "NIRT-26-0042": [
    {
      id: "TSK-2026-0181",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Verify MNRE DBT Subsidy Credit in Customer Bank Account",
      assignedPerson: "S. Priya",
      department: "Liaisoning & Central Subsidy",
      assignedDate: "10 Nov 2026",
      dueDate: "13 Nov 2026",
      priority: "High",
      status: "In Progress",
      remarks: "Call customer on 12 Nov to verify ₹78,000 credit reflected in SBI A/c ending 4891 via PFMS portal.",
      completionDate: null
    },
    {
      id: "TSK-2026-0175",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Issue Formal 25-Year Warranty Certificate Package to Consumer",
      assignedPerson: "G. Venkatesh",
      department: "Project Management Office",
      assignedDate: "08 Nov 2026",
      dueDate: "09 Nov 2026",
      priority: "High",
      status: "Completed",
      remarks: "Handed over Waaree TOPCon module warranty, Deye Inverter warranty, and O&M handbook in-person.",
      completionDate: "09 Nov 2026"
    },
    {
      id: "TSK-2026-0164",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Reconcile Balance Payment of ₹21,500 and Issue No-Dues NOC",
      assignedPerson: "K. Raman",
      department: "Finance & Accounts",
      assignedDate: "06 Nov 2026",
      dueDate: "08 Nov 2026",
      priority: "Medium",
      status: "Completed",
      remarks: "RTGS UTR HDFCR520261107883921 verified with HDFC Bank statement. Issued NOC-2026-0042.",
      completionDate: "07 Nov 2026"
    },
    {
      id: "TSK-2026-0152",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Obtain TANGEDCO AEE Joint Commissioning Report & Meter Card",
      assignedPerson: "S. Priya",
      department: "Liaisoning Desk",
      assignedDate: "03 Nov 2026",
      dueDate: "05 Nov 2026",
      priority: "High",
      status: "Completed",
      remarks: "Secured signed JCR from Salem West AEE and uploaded to DISCOM document repository.",
      completionDate: "04 Nov 2026"
    },
    {
      id: "TSK-2026-0143",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Physical Bi-Directional Net Meter Synchronisation & Sealing",
      assignedPerson: "M. Saravanan",
      department: "EPC Technical Lead",
      assignedDate: "02 Nov 2026",
      dueDate: "04 Nov 2026",
      priority: "High",
      status: "Completed",
      remarks: "Synchronised L&T ER300P meter (S/N: 24088192). Baseline Export 00000.0 kWh locked with 3 seals.",
      completionDate: "04 Nov 2026"
    },
    {
      id: "TSK-2026-0130",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Execute Pre-Commissioning Megger, Voc, Isc & Earth Resistance Test",
      assignedPerson: "M. Saravanan",
      department: "Site Engineering",
      assignedDate: "27 Oct 2026",
      dueDate: "28 Oct 2026",
      priority: "Medium",
      status: "Completed",
      remarks: "String Voc 298.4V, Isc 13.82A, Earth pit resistance 2.14 Ohms confirmed inside MNRE tolerances.",
      completionDate: "28 Oct 2026"
    },
    {
      id: "TSK-2026-0118",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Erect Elevated Structure & Mount 6x 550W Waaree Mono PERC Modules",
      assignedPerson: "M. Saravanan",
      department: "Installation Team A",
      assignedDate: "21 Oct 2026",
      dueDate: "26 Oct 2026",
      priority: "High",
      status: "Completed",
      remarks: "Mounted modules with 12 degree south tilt, M10 SS304 fasteners, and chemical anchor grouting.",
      completionDate: "26 Oct 2026"
    },
    {
      id: "TSK-2026-0095",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Store Issue Voucher (SIV) Generation & Site Logistics Dispatch",
      assignedPerson: "N. Murugan",
      department: "Store & Inventory",
      assignedDate: "19 Oct 2026",
      dueDate: "20 Oct 2026",
      priority: "Medium",
      status: "Completed",
      remarks: "Generated SIV-2026-0142. All items dispatched from Salem Central Store via vehicle TN-30-BF-1092.",
      completionDate: "20 Oct 2026"
    },
    {
      id: "TSK-2026-0081",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "Procurement Order Execution for Waaree 550W Modules & Deye Inverter",
      assignedPerson: "R. Kannan",
      department: "Procurement Desk",
      assignedDate: "16 Oct 2026",
      dueDate: "18 Oct 2026",
      priority: "High",
      status: "Completed",
      remarks: "Issued PO-2026-0089 to Waaree Solar & PO-2026-0090 to Deye India distributor.",
      completionDate: "18 Oct 2026"
    },
    {
      id: "TSK-2026-0062",
      projectId: "NIRT-26-0042",
      customerName: "K. R. Sundaram",
      taskName: "TANGEDCO Online Technical Feasibility Application Submission",
      assignedPerson: "S. Priya",
      department: "Liaisoning Desk",
      assignedDate: "14 Oct 2026",
      dueDate: "15 Oct 2026",
      priority: "High",
      status: "Completed",
      remarks: "Submitted Application No. TN-SLM-2026-TF-0492 on TANGEDCO LT Solar Rooftop portal.",
      completionDate: "15 Oct 2026"
    }
  ]
};

export const TASK_PRIORITIES = [
  { id: "all", label: "All Priorities" },
  { id: "High", label: "High Priority", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "Medium", label: "Medium Priority", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "Low", label: "Low Priority", color: "text-slate-700 bg-slate-50 border-slate-200" }
];

export const TASK_STATUSES = [
  { id: "all", label: "All Statuses" },
  { id: "Pending", label: "Pending", color: "text-blue-700 bg-blue-50 border-blue-200" },
  { id: "In Progress", label: "In Progress", color: "text-indigo-700 bg-indigo-50 border-indigo-200" },
  { id: "Completed", label: "Completed", color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
  { id: "Overdue", label: "Overdue", color: "text-rose-700 bg-rose-50 border-rose-200" },
  { id: "Cancelled", label: "Cancelled", color: "text-slate-700 bg-slate-50 border-slate-200" }
];
