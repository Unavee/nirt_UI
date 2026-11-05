# -*- coding: utf-8 -*-
import os
import sys
import subprocess

html_path = r"D:\Nirt\client_doc.html"
pdf_path = r"D:\Nirt\NIRT_Solar_CRM_Client_Documentation.pdf"
chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

html_content = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NIRT Rooftop Solar CRM & Project Control Tower — Specification</title>
<style>
@page {
    size: A4;
    margin: 16mm 14mm 18mm 14mm;
}

* {
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #18181b;
    background-color: #ffffff;
    font-size: 9pt;
    line-height: 1.5;
    margin: 0;
    padding: 0;
}

/* Cover Page */
.cover-page {
    page-break-after: always;
    min-height: 250mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 20px 0 10px 0;
}

.cover-header {
    border-bottom: 2px solid #09090b;
    padding-bottom: 16px;
}

.brand-badge {
    display: inline-block;
    background: #09090b;
    color: #ffffff;
    font-size: 8pt;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 4px 10px;
    margin-bottom: 12px;
}

.company-title {
    font-size: 20pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #09090b;
    margin: 0 0 4px 0;
}

.company-sub {
    font-size: 9.5pt;
    color: #52525b;
    font-weight: 500;
    margin: 0;
}

.cover-hero {
    margin: 45px 0 35px 0;
}

.doc-tag {
    font-size: 9pt;
    font-weight: 700;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 10px;
}

.doc-title {
    font-size: 26pt;
    font-weight: 800;
    line-height: 1.18;
    color: #09090b;
    margin: 0 0 16px 0;
    letter-spacing: -0.8px;
}

.doc-desc {
    font-size: 10.5pt;
    color: #52525b;
    line-height: 1.6;
    max-width: 650px;
}

.cover-meta-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    padding: 16px;
    margin-top: 18px;
}

.meta-item {
    font-size: 8.5pt;
}

.meta-label {
    font-size: 7.5pt;
    text-transform: uppercase;
    color: #71717a;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
}

.meta-value {
    color: #09090b;
    font-weight: 600;
}

.cover-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e4e4e7;
    padding-top: 12px;
    font-size: 8pt;
    color: #71717a;
}

/* Typography */
h1 {
    font-size: 16pt;
    font-weight: 800;
    color: #09090b;
    letter-spacing: -0.5px;
    border-bottom: 1.5px solid #09090b;
    padding-bottom: 5px;
    margin-top: 22px;
    margin-bottom: 10px;
    page-break-after: avoid;
}

h2 {
    font-size: 12.5pt;
    font-weight: 700;
    color: #18181b;
    letter-spacing: -0.3px;
    margin-top: 18px;
    margin-bottom: 8px;
    page-break-after: avoid;
}

h3 {
    font-size: 10pt;
    font-weight: 700;
    color: #27272a;
    margin-top: 14px;
    margin-bottom: 6px;
    page-break-after: avoid;
}

p {
    margin: 0 0 8px 0;
    color: #27272a;
}

strong {
    color: #09090b;
    font-weight: 600;
}

/* Tables */
table {
    width: 100%;
    border-collapse: collapse;
    margin: 10px 0 14px 0;
    font-size: 8pt;
    page-break-inside: avoid;
}

th {
    background-color: #f4f4f5;
    color: #09090b;
    font-weight: 700;
    text-align: left;
    padding: 6px 8px;
    border: 1px solid #d4d4d8;
    font-size: 7.5pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}

td {
    padding: 6px 8px;
    border: 1px solid #e4e4e7;
    vertical-align: top;
    color: #27272a;
}

tr:nth-child(even) td {
    background-color: #fafafa;
}

/* Callout Boxes */
.callout {
    background: #f8fafc;
    border-left: 3.5px solid #09090b;
    padding: 10px 14px;
    margin: 10px 0;
    border-top: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 8.5pt;
}

.callout-blue {
    background: #eff6ff;
    border-left-color: #2563eb;
    border-color: #dbeafe;
}

.callout-green {
    background: #f0fdf4;
    border-left-color: #16a34a;
    border-color: #bbf7d0;
}

/* Lists */
ul, ol {
    margin: 4px 0 8px 0;
    padding-left: 18px;
}

li {
    margin-bottom: 4px;
    color: #27272a;
}

/* Checklists */
.checklist-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 6px;
    font-size: 8.5pt;
}

.check-icon {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: #09090b;
    color: #ffffff;
    font-size: 8pt;
    font-weight: 700;
    text-align: center;
    line-height: 14px;
    margin-right: 8px;
    flex-shrink: 0;
    margin-top: 2px;
}

/* 21 Questions Grid */
.questions-container {
    background: #fafafa;
    border: 1px solid #e4e4e7;
    padding: 12px 14px;
    margin: 12px 0;
    page-break-inside: avoid;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 6px 14px;
}

.question-row {
    display: flex;
    font-size: 8pt;
    line-height: 1.35;
}

.q-num {
    font-weight: 700;
    color: #2563eb;
    min-width: 26px;
}

.q-text {
    color: #18181b;
}

/* Visual Lifecycle Grid */
.lifecycle-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin: 12px 0;
    page-break-inside: avoid;
}

.phase-card {
    border: 1px solid #d4d4d8;
    background: #ffffff;
    padding: 10px 12px;
}

.phase-header {
    font-size: 8pt;
    font-weight: 700;
    text-transform: uppercase;
    color: #09090b;
    border-bottom: 1.5px solid #09090b;
    padding-bottom: 4px;
    margin-bottom: 6px;
    letter-spacing: 0.5px;
}

.stage-step {
    display: flex;
    align-items: center;
    font-size: 7.5pt;
    padding: 3px 0;
    border-bottom: 1px dashed #e4e4e7;
}

.stage-step:last-child {
    border-bottom: none;
}

.stage-badge {
    display: inline-block;
    background: #f4f4f5;
    color: #18181b;
    font-weight: 700;
    font-size: 6.5pt;
    padding: 1px 5px;
    margin-right: 6px;
    border: 1px solid #e4e4e7;
    min-width: 42px;
    text-align: center;
}

.gatekeeper-badge {
    background: #fef2f2;
    color: #991b1b;
    border-color: #fecaca;
}

/* Code Block */
pre {
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    padding: 8px 12px;
    font-family: Consolas, monospace;
    font-size: 7.5pt;
    overflow-x: auto;
    page-break-inside: avoid;
    line-height: 1.35;
}

code {
    font-family: Consolas, monospace;
    font-size: 8pt;
    background: #f4f4f5;
    padding: 1px 3px;
    border: 1px solid #e4e4e7;
    color: #09090b;
}

.page-break {
    page-break-before: always;
}

.sign-block {
    margin-top: 25px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 30px;
    page-break-inside: avoid;
}

.sign-box {
    border-top: 1.5px solid #09090b;
    padding-top: 8px;
    font-size: 8pt;
}
</style>
</head>
<body>

<!-- COVER PAGE -->
<div class="cover-page">
    <div class="cover-header">
        <div class="brand-badge">CONFIDENTIAL &amp; PROPRIETARY</div>
        <div class="company-title">NIRT RENEWABLE ENERGY PRIVATE LIMITED</div>
        <div class="company-sub">CIN: U74999TZ2017PTC028477 &bull; Salem, Tamil Nadu, India</div>
    </div>

    <div class="cover-hero">
        <div class="doc-tag">Solution Architecture &amp; Functional Specification</div>
        <div class="doc-title">Rooftop Solar CRM &amp;<br>Project Control Tower</div>
        <div class="doc-desc">
            An integrated enterprise operating platform engineered for end-to-end Rooftop Solar EPC lifecycle governance: from omnichannel lead acquisition and 80% upfront milestone collection to automated WhatsApp/Email customer tracking, DISCOM net-metering approvals, and PM Surya Ghar subsidy disbursement.
        </div>

        <div class="cover-meta-grid">
            <div class="meta-item">
                <div class="meta-label">Client Organization</div>
                <div class="meta-value">NIRT Renewable Energy Pvt Ltd</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Commercial Policy</div>
                <div class="meta-value">80% Initial Advance on Site Visit</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Customer Communication</div>
                <div class="meta-value">Automated WhatsApp &amp; Email Engine</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Software Architecture</div>
                <div class="meta-value">Next.js 15 &bull; React 19 &bull; Render UI</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Statutory Alignment</div>
                <div class="meta-value">TANGEDCO RTS &bull; PM Surya Ghar</div>
            </div>
            <div class="meta-item">
                <div class="meta-label">Operating Standard</div>
                <div class="meta-value">Mandatory Quality Gates &bull; 9 Roles</div>
            </div>
        </div>
    </div>

    <div class="cover-footer">
        <div>NIRT Renewable Energy Private Limited &copy; 2026. All rights reserved.</div>
        <div>Powered by ACHISE</div>
    </div>
</div>

<!-- SECTION 1 -->
<h1>1. Executive Summary &amp; Business Vision</h1>

<h3>1.1 The Business Need</h3>
<p>
Rooftop solar engineering, procurement, and construction (EPC) is an operationally intensive business. A single rooftop solar project involves up to <strong>17 sequential milestones</strong>, intersects <strong>8 specialized departments</strong>, requires liaison with external government entities (<strong>TANGEDCO</strong> and the <strong>PM Surya Ghar National Portal</strong>), and demands stringent documentation across physical site surveys, electrical safety audits, civil structure installations, and banking/DBT subsidy workflows.
</p>
<p>
Generic customer relationship management tools fail because they treat solar as a simple sales transaction. In solar EPC, <strong>the sale is merely the starting line</strong>. The real risks of margin erosion, customer dissatisfaction, and regulatory stalls occur post-sale: during DISCOM net-metering approvals, material staging, physical installation, and subsidy release.
</p>

<h3>1.2 Core Architectural Principles</h3>
<div class="callout callout-blue">
<strong>The 5 Immutable System Rules:</strong>
<ol style="margin-top: 6px; margin-bottom: 0;">
    <li><strong>One Customer – One Master Record:</strong> A unified identity eliminating duplicate records across marketing, sales, and accounts.</li>
    <li><strong>One Project – One Digital Folder:</strong> Every contract, survey photo, SLD drawing, bill, and test certificate is bound permanently to a unified <strong>Project ID</strong> (<code>NIRT-YYMM-XXXX</code>).</li>
    <li><strong>Clear Ownership &amp; Deadlines:</strong> Every single task across all 17 stages has a named responsible owner, department, planned SLA date, and escalation trigger.</li>
    <li><strong>Hard Stage Gates:</strong> Commercial and procurement actions cannot proceed without prerequisite sign-offs (e.g., procurement is hard-locked until Accounts logs the Stage 7 Advance receipt).</li>
    <li><strong>The 3 Mandatory Closures:</strong> A project cannot be marked completed until it achieves <strong>Technical Closure</strong> (commissioning report + net meter sync), <strong>Commercial Closure</strong> (balance = &#8377;0), and <strong>Subsidy Closure</strong> (DBT bank credit confirmed via UTR).</li>
</ol>
</div>

<!-- SECTION 2 -->
<h1>2. End-to-End 17-Stage Project Lifecycle</h1>
<p>
The NIRT system digitizes the entire journey from initial lead capture to post-commissioning subsidy release across 4 unified phases:
</p>

<div class="lifecycle-grid">
    <div class="phase-card">
        <div class="phase-header">Phase 1: Sales &amp; Commercials (Sales + Accounts)</div>
        <div class="stage-step"><span class="stage-badge">ST 01</span> Lead Capture (13 Omnichannel Sources)</div>
        <div class="stage-step"><span class="stage-badge">ST 02</span> Lead Qualification (A/B/C/D Viability Check)</div>
        <div class="stage-step"><span class="stage-badge">ST 03</span> Technical Site Survey (Shadow + 9 Photos)</div>
        <div class="stage-step"><span class="stage-badge">ST 04</span> System Design &amp; DPR (SLD + Roof CAD Layout)</div>
        <div class="stage-step"><span class="stage-badge">ST 05</span> Commercial Proposal (BOM + 80/10/10 Policy)</div>
        <div class="stage-step"><span class="stage-badge">ST 06</span> Customer Confirmation (Work Order + Project ID)</div>
        <div class="stage-step"><span class="stage-badge gatekeeper-badge">ST 07</span> <strong>Advance Gatekeeper (80% Payment Clearance)</strong></div>
    </div>

    <div class="phase-card">
        <div class="phase-header">Phase 2: Approvals &amp; Procurement (Liaison + Purchase)</div>
        <div class="stage-step"><span class="stage-badge">ST 08</span> Documentation Locker (KYC, EB Bill, Cheque)</div>
        <div class="stage-step"><span class="stage-badge">ST 09</span> DISCOM Portal Application (TANGEDCO Online)</div>
        <div class="stage-step"><span class="stage-badge">ST 10</span> Technical Feasibility Approval (Load Sanction)</div>
        <div class="stage-step"><span class="stage-badge">ST 11</span> Procurement &amp; QC (PO &rarr; QC &rarr; GRN &rarr; Site Issue)</div>
    </div>

    <div class="phase-card">
        <div class="phase-header">Phase 3: Site Execution &amp; Grid Sync (EPC + Inspector)</div>
        <div class="stage-step"><span class="stage-badge">ST 12</span> 14-Step Site Installation (Structure &rarr; Inverter)</div>
        <div class="stage-step"><span class="stage-badge">ST 13</span> Testing &amp; Commissioning (Torque, Earth &lt; 5 &Omega;)</div>
        <div class="stage-step"><span class="stage-badge">ST 14</span> DISCOM Inspection &amp; Net Metering (Grid Sync)</div>
    </div>

    <div class="phase-card">
        <div class="phase-header">Phase 4: Financial &amp; Subsidy Settlement (Accounts + Desk)</div>
        <div class="stage-step"><span class="stage-badge gatekeeper-badge">ST 15</span> <strong>Final Billing &amp; Collection (Balance = &#8377;0)</strong></div>
        <div class="stage-step"><span class="stage-badge">ST 16</span> PM Surya Ghar Subsidy Claim (National Portal)</div>
        <div class="stage-step"><span class="stage-badge">ST 17</span> Subsidy Credit &amp; Handover (DBT Bank UTR Verified)</div>
    </div>
</div>

<div class="page-break"></div>

<!-- SECTION 3 -->
<h1>3. Departmental Responsibility Matrix &amp; The Control Tower</h1>
<p>
Operational accountability is structured across <strong>8 functional departments</strong> and coordinated by a centralized <strong>Project Coordinator (Control Tower)</strong>:
</p>

<table>
    <thead>
        <tr>
            <th style="width: 22%;">Department</th>
            <th style="width: 32%;">Operational Scope</th>
            <th style="width: 14%;">Stages</th>
            <th style="width: 32%;">Key Deliverable / Governance Output</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Sales</strong></td>
            <td>Lead intake, qualification, client pitch, proposal presentation.</td>
            <td>1, 2, 5, 6</td>
            <td>Qualified Lead profile, Signed Quotation, Customer Work Order.</td>
        </tr>
        <tr>
            <td><strong>Engineering &amp; Survey</strong></td>
            <td>Field feasibility, shadow analysis, electrical DB checks, DPR, and SLD.</td>
            <td>3, 4</td>
            <td>9-Point Photo Dossier, Roof Layout, Single Line Diagram (SLD).</td>
        </tr>
        <tr>
            <td><strong>Accounts</strong></td>
            <td>Financial gating, 80% advance verification, tax invoicing.</td>
            <td>7, 15</td>
            <td>Advance Clearance Certificate, Final Invoice, Balance Zero Receipt.</td>
        </tr>
        <tr>
            <td><strong>Liaison &amp; Documentation</strong></td>
            <td>DISCOM (TANGEDCO) approvals, portal filings, statutory coordination.</td>
            <td>8, 9, 10, 14</td>
            <td>TANGEDCO Application No, Feasibility Sanction, Net Meter Report.</td>
        </tr>
        <tr>
            <td><strong>Purchase &amp; Stores</strong></td>
            <td>Vendor PO generation, inwarding, QC, GRN allocation.</td>
            <td>11</td>
            <td>Purchase Orders, Inward GRN tagged to Project ID, Dispatch Slip.</td>
        </tr>
        <tr>
            <td><strong>EPC / Site Projects</strong></td>
            <td>Civil erection, electrical wiring, inverter placement, safety, testing.</td>
            <td>12, 13</td>
            <td>14-Step Installation Checklist, Testing Report (ICR).</td>
        </tr>
        <tr>
            <td><strong>Subsidy Desk</strong></td>
            <td>National Portal claim processing, verification, DBT tracking.</td>
            <td>16, 17</td>
            <td>National Portal Claim Ref, Subsidy Sanction, Bank UTR Match.</td>
        </tr>
        <tr>
            <td><strong>Management / Super Admin</strong></td>
            <td>Strategy, margin discount authorizations, MIS analytics, governance.</td>
            <td>Executive</td>
            <td>System Configuration, Discount Approvals (&gt;10%), Audit Reviews.</td>
        </tr>
        <tr>
            <td><strong>Project Coordinator</strong></td>
            <td><strong>Control Tower:</strong> End-to-end monitoring, preventing cross-team stalls.</td>
            <td>1 &ndash; 17</td>
            <td>Planned vs. Actual SLA compliance, cross-department clearance.</td>
        </tr>
    </tbody>
</table>

<!-- SECTION 4 -->
<h1>4. The 21 Executive Control Questions</h1>
<p>
In compliance with <strong>Section 41 of the NIRT BFRD</strong>, the CRM interface enables senior management to inspect any project and obtain immediate, single-click answers to the following 21 questions:
</p>

<div class="questions-container">
    <div class="question-row"><div class="q-num">[01]</div><div class="q-text">Who is the customer?</div></div>
    <div class="question-row"><div class="q-num">[02]</div><div class="q-text">What is the project capacity (kW)?</div></div>
    <div class="question-row"><div class="q-num">[03]</div><div class="q-text">What is the total contract value (&#8377;)?</div></div>
    <div class="question-row"><div class="q-num">[04]</div><div class="q-text">How much money has been received to date?</div></div>
    <div class="question-row"><div class="q-num">[05]</div><div class="q-text">How much customer balance is currently pending?</div></div>
    <div class="question-row"><div class="q-num">[06]</div><div class="q-text">What exact stage is the project currently in?</div></div>
    <div class="question-row"><div class="q-num">[07]</div><div class="q-text">Who is the named employee responsible for the current stage?</div></div>
    <div class="question-row"><div class="q-num">[08]</div><div class="q-text">What specific milestone or item is pending?</div></div>
    <div class="question-row"><div class="q-num">[09]</div><div class="q-text">How many days has this stage been pending?</div></div>
    <div class="question-row"><div class="q-num">[10]</div><div class="q-text">Why is it pending (root cause / blocker notes)?</div></div>
    <div class="question-row"><div class="q-num">[11]</div><div class="q-text">What is the exact next action required?</div></div>
    <div class="question-row"><div class="q-num">[12]</div><div class="q-text">Who is assigned to take this next action?</div></div>
    <div class="question-row"><div class="q-num">[13]</div><div class="q-text">When must this action be completed (SLA deadline)?</div></div>
    <div class="question-row"><div class="q-num">[14]</div><div class="q-text">What mandatory documents are currently pending?</div></div>
    <div class="question-row"><div class="q-num">[15]</div><div class="q-text">What physical materials / BOM items are pending issue?</div></div>
    <div class="question-row"><div class="q-num">[16]</div><div class="q-text">What statutory or internal approvals are pending?</div></div>
    <div class="question-row"><div class="q-num">[17]</div><div class="q-text">Is the project delayed against the baseline schedule?</div></div>
    <div class="question-row"><div class="q-num">[18]</div><div class="q-text">What is the revised expected project completion date?</div></div>
    <div class="question-row"><div class="q-num">[19]</div><div class="q-text">Is government subsidy (PM Surya Ghar) applicable?</div></div>
    <div class="question-row"><div class="q-num">[20]</div><div class="q-text">Has the subsidy been credited to the customer account?</div></div>
    <div class="question-row" style="grid-column: 1 / -1;"><div class="q-num">[21]</div><div class="q-text"><strong>Can the project be formally closed (Technical + Commercial + Subsidy)?</strong></div></div>
</div>

<div class="page-break"></div>

<!-- SECTION 5 -->
<h1>5. Core Application Modules &amp; Functional Capabilities</h1>

<h3>5.1 Module 1: Lead Capture &amp; Live Deduplication Engine</h3>
<ul>
    <li><strong>Omnichannel Sourcing:</strong> Captures leads from 13 sources (Direct, Referrals, Digital, WhatsApp, Architects, Builders, Electrical Contractors, etc.).</li>
    <li><strong>Real-time Deduplication:</strong> Automatically checks the database as the user types to prevent duplicate entries based on: (1) 10-digit Primary Mobile Number, and (2) TANGEDCO EB Consumer Number.</li>
    <li><strong>Instant Solar &amp; Subsidy Sizer:</strong> Calculates recommended system size (kW), gross capital cost, PM Surya Ghar subsidy (&#8377;30,000 for 1 kW, &#8377;60,000 for 2 kW, &#8377;78,000 for 3 kW+), net outlay, roof area required, and annual savings.</li>
    <li><strong>Dynamic Circle Creator:</strong> Supports all TANGEDCO circles (Salem, Erode, Coimbatore, Namakkal, Dharmapuri) with inline creation for new territories.</li>
</ul>

<h3>5.2 Module 2: Technical Site Survey &amp; Feasibility Audit</h3>
<ul>
    <li><strong>Rooftop Structural Assessment:</strong> Records roof dimensions, usable shadow-free area (sq.ft), roof type (RCC Flat, Sloped Metal Sheet, Tiled), structural health, and orientation.</li>
    <li><strong>Electrical Infrastructure Inspection:</strong> Evaluates sanctioned load, existing service phase (Single Phase vs. 3-Phase 415V), LT panel location, AC/DC cable distances, and chemical earthing space.</li>
    <li><strong>Ground Resistance Standard:</strong> Enforces earthing pit location audit to guarantee soil resistance &lt; 5 &Omega; with dedicated Lightning Arrestor (LA) clearance.</li>
    <li><strong>Mandatory 4-Slot Photo Verification:</strong> Upload slots for (1) Rooftop panoramic view, (2) TANGEDCO EB meter, (3) Main DB / LT panel, and (4) Proposed inverter mounting wall.</li>
</ul>

<h3>5.3 Module 3: Triple Pipeline Control Board</h3>
<p>
The visual pipeline system is separated into three dedicated operational tracks:
</p>
<ol>
    <li><strong>Sales &amp; Engineering Pipeline:</strong> Lead Inward &rarr; Survey Scheduled &rarr; Feasibility Audit &rarr; Proposal Dispatched &rarr; Negotiation &rarr; Contract Closed.</li>
    <li><strong>Project Execution Pipeline:</strong> Advance Confirmed &rarr; DISCOM Submitted &rarr; BOM Procurement &rarr; Civil &amp; Electrical Installation &rarr; Testing &amp; Commissioning &rarr; Net Meter Sync.</li>
    <li><strong>PM Surya Ghar Subsidy Pipeline:</strong> Customer Verified &rarr; Portal Claim Lodged &rarr; DISCOM Verification &rarr; Subsidy Sanctioned &rarr; DBT Disbursed.</li>
</ol>
<p>
<strong>Stage Gatekeeper Checkpoints:</strong> Moving project cards across stages prompts mandatory gatekeeper checklists that validate whether prerequisites have been fulfilled before advancing.
</p>

<h3>5.4 Module 4: Proposal Sizer &amp; Official Quotation Engine</h3>
<ul>
    <li><strong>BOM Costing Engine:</strong> Dynamic generation of Bill of Materials (Tier-1 Bifacial TopCon panels, high-efficiency grid-tied inverters, pre-galvanized structure, UV-resistant DC solar cables, chemical earth pits).</li>
    <li><strong>Corporate Letterhead Generation:</strong> Produces printable quotations with NIRT Salem corporate branding, CIN, GSTIN, technical scope of work, warranty guarantees (25-year module performance, 5&ndash;10 year inverter warranty), and ICICI Bank payment details.</li>
</ul>

<div class="callout callout-green">
<strong>Standard Commercial Payment Terms (NIRT Operational Policy):</strong>
<ul style="margin-top: 4px; margin-bottom: 0;">
    <li><strong>80% — Initial Advance Payment upon Site Visit &amp; Order Confirmation:</strong> NIRT's standard operational model requires an 80% upfront commitment upon successful site survey and feasibility sign-off. This secures immediate factory BOM procurement and eliminates project staging stalls.</li>
    <li><strong>10% — Site Installation &amp; Mechanical/Electrical Testing Completion:</strong> Released upon mechanical mounting of modules, inverter placement, DC/AC cabling, and earthing pit resistance sign-off (&lt; 5 &Omega;).</li>
    <li><strong>10% — Net Metering Synchronization &amp; Handover:</strong> Final settlement upon TANGEDCO bi-directional meter installation, grid synchronization, and handover of warranty certificates.</li>
</ul>
</div>

<h3>5.5 Module 5: 360&deg; Project Dossier</h3>
<ul>
    <li><strong>TANGEDCO Net Metering Tracker:</strong> 8-step tracking matrix (Application &rarr; Feasibility &rarr; Readiness Notice &rarr; Inspection Request &rarr; Field Audit &rarr; Meter Sanction &rarr; Meter Installation &rarr; Grid Sync).</li>
    <li><strong>PM Surya Ghar Subsidy Ledger:</strong> National Portal application tracking, claim reference numbers, bank account verification, and transaction UTR logger.</li>
    <li><strong>Milestone Payment Ledger:</strong> Live balance tracking showing total project value, 80% initial advance received, outstanding balance, and final settlement status.</li>
    <li><strong>Document Locker:</strong> Categorized repository for KYC documents, Aadhaar cards, EB bills, signed contracts, SLD diagrams, and Installation Completion Reports (ICRs).</li>
</ul>

<div class="page-break"></div>

<!-- SECTION 6: AUTOMATED WHATSAPP & EMAIL NOTIFICATION ENGINE -->
<h1>6. Omnichannel Customer Notification Engine (WhatsApp &amp; Email Automation)</h1>
<p>
Recognizing that customer peace of mind is vital throughout the 17-stage solar journey, the CRM embeds an automated, event-driven <strong>WhatsApp Business API &amp; Transactional Email Engine</strong>. At key project transition gates, the system automatically triggers personalized, branded bilingual (English &amp; Tamil) notifications directly to the customer:
</p>

<table>
    <thead>
        <tr>
            <th style="width: 28%;">Lifecycle Trigger Event</th>
            <th style="width: 14%;">Channels</th>
            <th style="width: 58%;">Automated Message Content &amp; Customer Payload</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>1. Lead Inward &amp; Welcome</strong></td>
            <td>WhatsApp + Email</td>
            <td>Formal welcome greetings from NIRT Renewable Energy, sharing executive credentials, assigned solar consultant contact card, and informational solar brochure.</td>
        </tr>
        <tr>
            <td><strong>2. Site Visit Date Confirmed</strong></td>
            <td>WhatsApp + Email</td>
            <td>Exact site visit date, time window, assigned site surveyor name, mobile number, and site readiness checklist (access to roof and EB meter).</td>
        </tr>
        <tr>
            <td><strong>3. Initial 80% Payment Done</strong></td>
            <td>WhatsApp + Email</td>
            <td>Instant financial receipt acknowledgment, transaction reference, GST tax invoice copy, and allocation of the customer's unified <strong>Project ID</strong>.</td>
        </tr>
        <tr>
            <td><strong>4. Material Procurement Start</strong></td>
            <td>WhatsApp + Email</td>
            <td>Notification that factory BOM procurement is initiated for Tier-1 TopCon bifacial modules, inverter, and pre-galvanized mounting structures.</td>
        </tr>
        <tr>
            <td><strong>5. Material Procurement Done &amp; Dispatched</strong></td>
            <td>WhatsApp + Email</td>
            <td>Alert confirming materials have cleared warehouse quality audit and are dispatched to the customer site, along with delivery vehicle details and expected arrival time.</td>
        </tr>
        <tr>
            <td><strong>6. Site Installation Mobilised</strong></td>
            <td>WhatsApp + Email</td>
            <td>Introduction of the assigned site installation team, safety protocols, and daily erection milestone progress.</td>
        </tr>
        <tr>
            <td><strong>7. Net Metering &amp; Grid Synchronized</strong></td>
            <td>WhatsApp + Email</td>
            <td>Congratulations alert on successful TANGEDCO bi-directional meter synchronization, commercial commissioning, and solar power generation commencement.</td>
        </tr>
        <tr>
            <td><strong>8. PM Surya Ghar Subsidy Sanction &amp; Credit</strong></td>
            <td>WhatsApp + Email</td>
            <td>Official alert confirming National Portal subsidy approval, Direct Benefit Transfer (DBT) credit to customer's bank account, and bank UTR reference.</td>
        </tr>
    </tbody>
</table>

<!-- SECTION 7 & 8 -->
<h1>7. UI/UX Craft Standards &amp; Design Engineering</h1>
<p>
The software is constructed following modern <strong>Render dashboard design aesthetics</strong> and <strong>Emil Kowalski design engineering principles</strong>:
</p>
<ul>
    <li><strong>Visual Architecture:</strong> Sharp 90&deg; precision edges (<code>rounded-none</code>), subtle hairline borders (<code>border-zinc-200/80</code>), deep contrast typography, and an uncluttered <code>#fafafa</code> canvas.</li>
    <li><strong>Mobile-First &amp; Touch Ergonomics:</strong> Form inputs configured with a minimum of 16px font size to prevent automatic iOS mobile zoom; mobile slide-in navigation drawer with backdrop blur; active tap feedback (<code>:active</code>) without lingering hover states.</li>
    <li><strong>Keyboard Productivity:</strong> Instant sidebar toggle via global shortcut <strong><code>Ctrl + B</code></strong> with floating quick-switch menus in collapsed mode.</li>
    <li><strong>Corporate Attribution:</strong> Every screen features subtle, unyielding corporate footer branding: <code>Powered by ACHISE</code>.</li>
</ul>

<h1>8. Technical Architecture &amp; Technology Stack</h1>
<pre>
+------------------------------------------------------------------------+
|                        FRONTEND PRESENTATION TIER                      |
|   Next.js 15 (App Router)  |  React 19  |  Tailwind CSS v4 (Render UI)  |
|   Lucide Icons             |  Emil Kowalski Design Engineering Rules   |
+-----------------------------------┬------------------------------------+
                                    |
+-----------------------------------v------------------------------------+
|                       STATE &amp; CONTEXT MANAGEMENT                       |
|   RoleContext (9 Unified Roles)    |  SidebarContext (Ctrl+B / Drawer) |
|   Master Data Registry             |  Browser Local Storage Persistence|
+-----------------------------------┬------------------------------------+
                                    |
+-----------------------------------v------------------------------------+
|                         BACKEND &amp; AUTOMATION TIER                      |
|   REST API Route Handlers          |  WhatsApp &amp; Email Dispatch Engine  |
|   Role-Based Access Control (RBAC) |  Supabase PostgreSQL Schema Ready |
+------------------------------------------------------------------------+
</pre>

<div class="page-break"></div>

<!-- SECTION 9 -->
<h1>9. Role-Based Access Control (RBAC) &mdash; 9 Consolidated Roles</h1>
<p>
In alignment with NIRT&rsquo;s operational structure (clarified in Annexure C of the technical agreement), the system consolidates theoretical roles into <strong>9 functional profiles</strong>:
</p>
<ol>
    <li><strong>Super Admin / Management:</strong> Global oversight, company KPI dashboards, discount approval authority, and system configuration.</li>
    <li><strong>Sales Lead / Executive:</strong> Lead registration, customer follow-up, quotation dispatch, and sales pipeline management.</li>
    <li><strong>Site Surveyor / Engineer:</strong> Mobile survey forms, shadow analysis recording, roof measurements, and 4-point photo uploads.</li>
    <li><strong>Design / Technical Engineer:</strong> Roof CAD layout, SLD generation, string calculation, and DPR technical documents.</li>
    <li><strong>Project Coordinator (Control Tower):</strong> Project scheduling, cross-department tracking, SLA delay monitoring, and milestone sign-offs.</li>
    <li><strong>Liaison Officer:</strong> TANGEDCO DISCOM portal tracking, CEIG inspectorate filings, and net meter liaison.</li>
    <li><strong>Procurement &amp; Store Executive:</strong> BOM reviews, vendor PO issuance, store inwarding (GRN), and site material dispatch.</li>
    <li><strong>Installation / Site Engineer:</strong> Daily site progress reporting, 14-step checklist completion, and testing &amp; commissioning logs.</li>
    <li><strong>Accounts Executive:</strong> Milestone invoicing, 80% advance verification, GST documentation, and financial closure verification.</li>
</ol>

<!-- SECTION 10 -->
<h1>10. Verification &amp; Acceptance Checklist (UAT Compliance)</h1>
<p>
To satisfy <strong>Section 46 (User Acceptance Testing)</strong> of the BFRD, the system enables NIRT stakeholders to verify a complete end-to-end project journey:
</p>

<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Lead Intake &amp; Welcome Trigger:</strong> Created via Lead Capture Modal; duplicate prevention verified; WhatsApp/Email greeting dispatched.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Site Survey &amp; Date Confirmation:</strong> Site Survey Modal scheduled; customer notified of visit date &amp; surveyor via WhatsApp/Email; shadow analysis logged.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Commercial Proposal:</strong> Solar Sizer calculates capacity, BOM, net cost, and 80/10/10 milestone schedule.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>80% Initial Advance Gate:</strong> Accounts confirms 80% payment received; automated WhatsApp/Email receipt and Project ID sent to customer; procurement unlocked.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Material Procurement Alerts:</strong> Customer receives automated WhatsApp/Email when procurement starts and when materials are QC-approved and dispatched.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Execution Tracking:</strong> 14-step installation checklist and TANGEDCO 8-step net metering tracker active.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Subsidy Release:</strong> PM Surya Ghar portal tracker logs DBT sanction, bank transaction UTR, and final customer notification.</div></div>
<div class="checklist-item"><span class="check-icon">&#10003;</span><div><strong>Triple Project Closure:</strong> Verification of Technical Closure, Commercial Closure (&#8377;0 balance), and Subsidy Closure.</div></div>

<!-- SIGN-OFF BLOCK -->
<div class="sign-block">
    <div class="sign-box">
        <strong>For NIRT Renewable Energy Private Limited</strong><br>
        Managing Director / Chief Operating Officer<br>
        Corporate HQ: Salem, Tamil Nadu, India<br>
        CIN: U74999TZ2017PTC028477
    </div>
    <div class="sign-box">
        <strong>For Development &amp; Architecture Team</strong><br>
        Chief Solutions Architect &amp; Engineering Lead<br>
        Powered by ACHISE<br>
        Antigravity Platform
    </div>
</div>

</body>
</html>
"""

with open(html_path, "w", encoding="utf-8") as f:
    f.write(html_content)

print(f"HTML written to {html_path} ({len(html_content)} chars)")

# Execute headless Chrome to generate PDF
cmd = [
    chrome_exe,
    "--headless=new",
    "--disable-gpu",
    "--no-pdf-header-footer",
    f"--print-to-pdf={pdf_path}",
    html_path
]

print("Executing Chrome print-to-pdf...")
result = subprocess.run(cmd, capture_output=True, text=True)
print("Chrome exit code:", result.returncode)

if os.path.exists(pdf_path):
    size_kb = os.path.getsize(pdf_path) / 1024
    print(f"SUCCESS: Generated PDF at {pdf_path} ({size_kb:.1f} KB)")
else:
    print("ERROR: PDF file was not created!")
    if result.stderr:
        print("STDERR:", result.stderr)
