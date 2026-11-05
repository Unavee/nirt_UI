# NIRT Solar EPC CRM & Project Lifecycle Platform

> **Client:** NIRT Renewable Energy Private Limited (Salem, Tamil Nadu)  
> **Empanelment:** MNRE Empanelled EPC Vendor (PM Surya Ghar: Muft Bijli Yojana)  
> **System Scope:** End-to-End Rooftop Solar EPC CRM, 5-Pipeline Lifecycle, 15 User Roles RBAC & PMO Audit Governance.

---

## 🌟 Key Architecture & Capabilities

1. **5 Operational Pipelines (20 Sequential Steps)**:
   - **Pipeline 1: Sales & Feasibility (Steps 01–06)** — Omnichannel lead intake (11 sources), deduplication, BFRD §6 qualification lifecycle (`New → Contacted → Qualified → Site Survey Required → Not Qualified → Lost → Converted`), DPR, SLD, and quotation.
   - **Pipeline 2: Advance & Approvals (Steps 07–10)** — 80% Advance Gatekeeper, KYC Document Locker, TANGEDCO DISCOM portal online filing, and Feasibility Sanction.
   - **Pipeline 3: Procurement & Stores (Steps 11–13)** — Factory BOM vendor PO generation (unlocked after Stage 7), warehouse QC inwarding (GRN), and site material dispatch.
   - **Pipeline 4: EPC Execution & Testing (Steps 14–17)** — Civil structure erection, electrical cabling, earthing (< 5 Ω), 10% installation receipt, and bi-directional net meter synchronization.
   - **Pipeline 5: Final Settlement, Subsidy & Closure (Steps 18–20)** — 10% final balance collection (Balance = ₹0), PM Surya Ghar National Portal subsidy claim, bank DBT credit, and triple project closure.

2. **Role-Based Access Control (RBAC) — 15 Standard Roles**:
   - Super Admin, Management, CRM Manager, CRM Executive, Sales Team, Site Survey Team, Design/Engineering, Purchase Team, Store Team, Project Manager, Installation Team, Accounts Team, Liaisoning/Documentation, Subsidy Team, Customer.
   - Includes real-time employee provisioning, custom role definition, role-filtered dashboard views, and an interactive RBAC Architecture Flowchart.

3. **BFRD §7 Site Survey Task & Field Audit Suite**:
   - Auto-generated survey tasks with mobile photo capture (4 mandatory slots: Roof, EB Meter, LT Panel, Inverter Wall) and 360° video walkthrough recording.
   - Live tape dimension area calculator, shadow deductions, TANGEDCO DT capacity & saturation checks, and soil earth resistance audit (< 5 Ω pass/fail).

4. **Forensic PMO Audit Log (Append-Only, Zero Delete)**:
   - Captures previous value, new value, actor, date/time, and mandatory written justification for any field update.

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18.x or 20.x
- npm / yarn / pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/Unavee/nirt_UI.git
cd nirt_UI

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

*Powered by ACHISE*
