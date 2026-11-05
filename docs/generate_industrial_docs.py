# -*- coding: utf-8 -*-
import os
import sys
import subprocess

html_path = r"D:\Nirt\client_doc.html"
pdf_path = r"D:\Nirt\NIRT_Solar_CRM_Client_Documentation.pdf"
md_path = r"D:\Nirt\NIRT_Solar_CRM_Client_Documentation.md"
artifact_md_path = r"C:\Users\admin\.gemini\antigravity-cli\brain\019e4224-984d-4ba2-ab3a-02c8085f427a\NIRT_Solar_CRM_Client_Documentation.md"
chrome_exe = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# ==============================================================================
# 1. VECTOR SVG FLOWCHARTS (INDUSTRIAL GRADE)
# ==============================================================================

# SVG 1: 17-Stage Industrial Solar Lifecycle Flowchart
svg_lifecycle = """
<svg width="100%" height="auto" viewBox="0 0 1000 680" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e4e4e7; margin:14px 0;">
  <defs>
    <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#18181b"/>
    </marker>
    <marker id="arrow-blue" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#2563eb"/>
    </marker>
    <marker id="arrow-green" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
  </defs>

  <!-- Title & Legend Header -->
  <rect x="0" y="0" width="1000" height="45" fill="#09090b"/>
  <text x="20" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="13" font-weight="700" fill="#ffffff" letter-spacing="0.5">
    NIRT SOLAR CRM: 17-STAGE END-TO-END INDUSTRIAL LIFECYCLE &amp; GATEWAY ARCHITECTURE
  </text>
  <text x="980" y="28" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="10" font-weight="600" fill="#a1a1aa" text-anchor="end">
    MANDATORY STAGE GATES &bull; 8 DEPARTMENTS &bull; CONTROL TOWER
  </text>

  <!-- COLUMN 1: PHASE 1 (SALES & ADVANCE) -->
  <rect x="15" y="60" width="230" height="605" rx="4" fill="#f8fafc" stroke="#cbd5e1" stroke-width="1.5"/>
  <rect x="15" y="60" width="230" height="34" rx="4" fill="#1e293b"/>
  <text x="130" y="82" font-family="sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">PHASE 1: SALES &amp; ADVANCE</text>

  <!-- St 01 -->
  <rect x="30" y="105" width="200" height="42" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="105" width="40" height="42" rx="3" fill="#e2e8f0"/>
  <text x="50" y="130" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">01</text>
  <text x="78" y="123" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Lead Capture</text>
  <text x="78" y="137" font-family="sans-serif" font-size="8" fill="#64748b">13 Omnichannel Sources</text>
  <line x1="130" y1="147" x2="130" y2="160" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 02 -->
  <rect x="30" y="162" width="200" height="42" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="162" width="40" height="42" rx="3" fill="#e2e8f0"/>
  <text x="50" y="187" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">02</text>
  <text x="78" y="180" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Lead Qualification</text>
  <text x="78" y="194" font-family="sans-serif" font-size="8" fill="#64748b">Viability Audit (A/B/C/D)</text>
  <line x1="130" y1="204" x2="130" y2="217" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 03 -->
  <rect x="30" y="219" width="200" height="44" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="219" width="40" height="44" rx="3" fill="#e2e8f0"/>
  <text x="50" y="245" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">03</text>
  <text x="78" y="236" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Site Survey</text>
  <text x="78" y="250" font-family="sans-serif" font-size="8" fill="#64748b">Tape Measures + 4 Photos</text>
  <line x1="130" y1="263" x2="130" y2="276" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 04 -->
  <rect x="30" y="278" width="200" height="44" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="278" width="40" height="44" rx="3" fill="#e2e8f0"/>
  <text x="50" y="304" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">04</text>
  <text x="78" y="295" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Engineering Feasibility</text>
  <text x="78" y="309" font-family="sans-serif" font-size="8" fill="#64748b">BOM Sizing &amp; TANGEDCO SLD</text>
  <line x1="130" y1="322" x2="130" y2="335" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 05 -->
  <rect x="30" y="337" width="200" height="44" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="337" width="40" height="44" rx="3" fill="#e2e8f0"/>
  <text x="50" y="363" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">05</text>
  <text x="78" y="354" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Commercial Proposal</text>
  <text x="78" y="368" font-family="sans-serif" font-size="8" fill="#64748b">80/10/10 Policy Quotation</text>
  <line x1="130" y1="381" x2="130" y2="394" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 06 -->
  <rect x="30" y="396" width="200" height="44" rx="3" fill="#ffffff" stroke="#94a3b8" stroke-width="1"/>
  <rect x="30" y="396" width="40" height="44" rx="3" fill="#e2e8f0"/>
  <text x="50" y="422" font-family="sans-serif" font-size="10" font-weight="700" fill="#0f172a" text-anchor="middle">06</text>
  <text x="78" y="413" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#0f172a">Customer Confirmation</text>
  <text x="78" y="427" font-family="sans-serif" font-size="8" fill="#64748b">Work Order &amp; Project ID</text>
  <line x1="130" y1="440" x2="130" y2="455" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 07: HARD GATE -->
  <rect x="25" y="458" width="210" height="85" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
  <text x="130" y="478" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">STAGE 07: HARD GATE</text>
  <text x="130" y="496" font-family="sans-serif" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">80% ADVANCE PAYMENT</text>
  <text x="130" y="513" font-family="sans-serif" font-size="8" fill="#7f1d1d" text-anchor="middle">Paid on Site Visit / Booking</text>
  <text x="130" y="527" font-family="sans-serif" font-size="8" font-weight="700" fill="#991b1b" text-anchor="middle">Accounts Receipt Unlocks Phase 2</text>

  <!-- Connect Phase 1 to Phase 2 -->
  <path d="M 235 500 L 260 500 L 260 125 L 275 125" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>


  <!-- COLUMN 2: PHASE 2 (APPROVALS & PROCUREMENT) -->
  <rect x="260" y="60" width="230" height="605" rx="4" fill="#fffbeb" stroke="#fde68a" stroke-width="1.5"/>
  <rect x="260" y="60" width="230" height="34" rx="4" fill="#b45309"/>
  <text x="375" y="82" font-family="sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">PHASE 2: APPROVALS &amp; PO</text>

  <!-- St 08 -->
  <rect x="275" y="105" width="200" height="44" rx="3" fill="#ffffff" stroke="#d97706" stroke-width="1"/>
  <rect x="275" y="105" width="40" height="44" rx="3" fill="#fef3c7"/>
  <text x="295" y="131" font-family="sans-serif" font-size="10" font-weight="700" fill="#92400e" text-anchor="middle">08</text>
  <text x="323" y="122" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#92400e">Documentation Locker</text>
  <text x="323" y="136" font-family="sans-serif" font-size="8" fill="#b45309">EB Bill, Aadhaar, Cheque</text>
  <line x1="375" y1="149" x2="375" y2="167" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 09 -->
  <rect x="275" y="169" width="200" height="44" rx="3" fill="#ffffff" stroke="#d97706" stroke-width="1"/>
  <rect x="275" y="169" width="40" height="44" rx="3" fill="#fef3c7"/>
  <text x="295" y="195" font-family="sans-serif" font-size="10" font-weight="700" fill="#92400e" text-anchor="middle">09</text>
  <text x="323" y="186" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#92400e">DISCOM Portal Filing</text>
  <text x="323" y="200" font-family="sans-serif" font-size="8" fill="#b45309">TANGEDCO RTS Online Form</text>
  <line x1="375" y1="213" x2="375" y2="231" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 10 -->
  <rect x="275" y="233" width="200" height="44" rx="3" fill="#ffffff" stroke="#d97706" stroke-width="1"/>
  <rect x="275" y="233" width="40" height="44" rx="3" fill="#fef3c7"/>
  <text x="295" y="259" font-family="sans-serif" font-size="10" font-weight="700" fill="#92400e" text-anchor="middle">10</text>
  <text x="323" y="250" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#92400e">Technical Feasibility</text>
  <text x="323" y="264" font-family="sans-serif" font-size="8" fill="#b45309">Distribution Transformer Sanction</text>
  <line x1="375" y1="277" x2="375" y2="295" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 11: Supply Chain -->
  <rect x="275" y="297" width="200" height="85" rx="3" fill="#ffffff" stroke="#d97706" stroke-width="1.5"/>
  <rect x="275" y="297" width="200" height="24" rx="3" fill="#fef3c7"/>
  <text x="375" y="313" font-family="sans-serif" font-size="9" font-weight="800" fill="#92400e" text-anchor="middle">STAGE 11: PROCUREMENT &amp; QC</text>
  <text x="375" y="333" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#0f172a" text-anchor="middle">PO &rarr; Vendor &rarr; QC Audit</text>
  <text x="375" y="348" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#0f172a" text-anchor="middle">&rarr; GRN Inward &rarr; Site Issue</text>
  <text x="375" y="366" font-family="sans-serif" font-size="7.5" fill="#78350f" text-anchor="middle">Traceable to Unified Project ID</text>

  <!-- Connect Phase 2 to Phase 3 -->
  <path d="M 475 340 L 505 340 L 505 125 L 520 125" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>


  <!-- COLUMN 3: PHASE 3 (EPC INSTALLATION & NET METER) -->
  <rect x="505" y="60" width="230" height="605" rx="4" fill="#f5f3ff" stroke="#ddd6fe" stroke-width="1.5"/>
  <rect x="505" y="60" width="230" height="34" rx="4" fill="#6d28d9"/>
  <text x="620" y="82" font-family="sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">PHASE 3: EPC &amp; GRID SYNC</text>

  <!-- St 12 -->
  <rect x="520" y="105" width="200" height="95" rx="3" fill="#ffffff" stroke="#8b5cf6" stroke-width="1"/>
  <rect x="520" y="105" width="200" height="24" rx="3" fill="#ede9fe"/>
  <text x="620" y="121" font-family="sans-serif" font-size="9" font-weight="800" fill="#5b21b6" text-anchor="middle">STAGE 12: 14-STEP INSTALLATION</text>
  <text x="535" y="142" font-family="sans-serif" font-size="7.5" fill="#4c1d95">&bull; Structure Erection &amp; Torque</text>
  <text x="535" y="157" font-family="sans-serif" font-size="7.5" fill="#4c1d95">&bull; TopCon Module Clamping</text>
  <text x="535" y="172" font-family="sans-serif" font-size="7.5" fill="#4c1d95">&bull; Inverter &amp; DC/ACDB Wiring</text>
  <text x="535" y="187" font-family="sans-serif" font-size="7.5" fill="#4c1d95">&bull; Earthing &amp; Lightning Arrester</text>
  <line x1="620" y1="200" x2="620" y2="220" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 13 -->
  <rect x="520" y="222" width="200" height="60" rx="3" fill="#ffffff" stroke="#8b5cf6" stroke-width="1"/>
  <rect x="520" y="222" width="40" height="60" rx="3" fill="#ede9fe"/>
  <text x="540" y="256" font-family="sans-serif" font-size="10" font-weight="700" fill="#5b21b6" text-anchor="middle">13</text>
  <text x="568" y="240" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#5b21b6">Testing &amp; Commissioning</text>
  <text x="568" y="255" font-family="sans-serif" font-size="8" fill="#4c1d95">Earthing Pit &lt; 5 &Omega; &bull; Voc / IR</text>
  <text x="568" y="270" font-family="sans-serif" font-size="8" font-weight="600" fill="#0f172a">ICR Sign-off: 10% Due</text>
  <line x1="620" y1="282" x2="620" y2="302" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 14 -->
  <rect x="520" y="304" width="200" height="60" rx="3" fill="#ffffff" stroke="#8b5cf6" stroke-width="1.5"/>
  <rect x="520" y="304" width="40" height="60" rx="3" fill="#ede9fe"/>
  <text x="540" y="338" font-family="sans-serif" font-size="10" font-weight="700" fill="#5b21b6" text-anchor="middle">14</text>
  <text x="568" y="322" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#5b21b6">Net Metering &amp; Grid Sync</text>
  <text x="568" y="337" font-family="sans-serif" font-size="8" fill="#4c1d95">TANGEDCO Inspection &amp; Meter</text>
  <text x="568" y="352" font-family="sans-serif" font-size="8" font-weight="700" fill="#16a34a">Grid Live &bull; Final 10% Due</text>

  <!-- Connect Phase 3 to Phase 4 -->
  <path d="M 720 334 L 750 334 L 750 125 L 765 125" fill="none" stroke="#2563eb" stroke-width="2" marker-end="url(#arrow-blue)"/>


  <!-- COLUMN 4: PHASE 4 (FINANCIAL & SUBSIDY CLOSURE) -->
  <rect x="750" y="60" width="235" height="605" rx="4" fill="#f0fdf4" stroke="#bbf7d0" stroke-width="1.5"/>
  <rect x="750" y="60" width="235" height="34" rx="4" fill="#15803d"/>
  <text x="867" y="82" font-family="sans-serif" font-size="11" font-weight="700" fill="#ffffff" text-anchor="middle">PHASE 4: SETTLEMENT &amp; CLOSURE</text>

  <!-- St 15: HARD GATE -->
  <rect x="765" y="105" width="205" height="75" rx="4" fill="#fef2f2" stroke="#dc2626" stroke-width="2"/>
  <text x="867" y="125" font-family="sans-serif" font-size="9.5" font-weight="800" fill="#991b1b" text-anchor="middle">STAGE 15: HARD GATE</text>
  <text x="867" y="142" font-family="sans-serif" font-size="11" font-weight="800" fill="#b91c1c" text-anchor="middle">FINAL BILLING &amp; PAYMENT</text>
  <text x="867" y="158" font-family="sans-serif" font-size="8" fill="#7f1d1d" text-anchor="middle">Remaining 20% Fully Collected</text>
  <text x="867" y="171" font-family="sans-serif" font-size="8" font-weight="700" fill="#991b1b" text-anchor="middle">Outstanding Balance = &#8377;0.00</text>
  <line x1="867" y1="180" x2="867" y2="200" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 16 -->
  <rect x="765" y="202" width="205" height="50" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <rect x="765" y="202" width="40" height="50" rx="3" fill="#dcfce7"/>
  <text x="785" y="232" font-family="sans-serif" font-size="10" font-weight="700" fill="#15803d" text-anchor="middle">16</text>
  <text x="813" y="222" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#15803d">Subsidy Claim Submission</text>
  <text x="813" y="237" font-family="sans-serif" font-size="8" fill="#166534">PM Surya Ghar National Portal</text>
  <line x1="867" y1="252" x2="867" y2="272" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow)"/>

  <!-- St 17 -->
  <rect x="765" y="274" width="205" height="55" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="765" y="274" width="40" height="55" rx="3" fill="#dcfce7"/>
  <text x="785" y="306" font-family="sans-serif" font-size="10" font-weight="700" fill="#15803d" text-anchor="middle">17</text>
  <text x="813" y="294" font-family="sans-serif" font-size="9.5" font-weight="700" fill="#15803d">Subsidy Credit (DBT)</text>
  <text x="813" y="309" font-family="sans-serif" font-size="8" fill="#166534">Customer Account Bank Credit</text>
  <text x="813" y="322" font-family="sans-serif" font-size="8" font-weight="700" fill="#0f172a">Verified via Bank UTR No.</text>
  <line x1="867" y1="329" x2="867" y2="350" stroke="#18181b" stroke-width="1.5" marker-end="url(#arrow-green)"/>

  <!-- FINAL TRIPLE CLOSURE BOX -->
  <rect x="760" y="352" width="215" height="110" rx="4" fill="#09090b" stroke="#18181b" stroke-width="2"/>
  <text x="867" y="375" font-family="sans-serif" font-size="10" font-weight="800" fill="#22c55e" text-anchor="middle">&#10003; PROJECT STATUS: CLOSED</text>
  <line x1="775" y1="384" x2="960" y2="384" stroke="#27272a" stroke-width="1"/>
  <text x="778" y="402" font-family="sans-serif" font-size="8" fill="#ffffff">&bull; Technical: ICR + Net Meter Synced</text>
  <text x="778" y="420" font-family="sans-serif" font-size="8" fill="#ffffff">&bull; Commercial: All Invoices &#8377;0 Balance</text>
  <text x="778" y="438" font-family="sans-serif" font-size="8" fill="#ffffff">&bull; Subsidy: DBT Credited to Customer</text>
  <text x="867" y="454" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#a1a1aa" text-anchor="middle">O&amp;M / AMC Mode Activated</text>

  <!-- Bottom Global Footer -->
  <rect x="0" y="650" width="1000" height="30" fill="#18181b"/>
  <text x="20" y="669" font-family="sans-serif" font-size="9" fill="#a1a1aa">NIRT Renewable Energy Private Limited &bull; Salem, Tamil Nadu &bull; CIN: U74999TZ2017PTC028477</text>
  <text x="980" y="669" font-family="sans-serif" font-size="9" font-weight="700" fill="#e4e4e7" text-anchor="end">Powered by ACHISE</text>
</svg>
"""

# SVG 2: Supply Chain & Customer Notification Architecture
svg_supply_chain = """
<svg width="100%" height="auto" viewBox="0 0 1000 440" xmlns="http://www.w3.org/2000/svg" style="background:#ffffff; border:1px solid #e4e4e7; margin:14px 0;">
  <defs>
    <marker id="ar2" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#09090b"/>
    </marker>
    <marker id="ar-wa" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
      <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#16a34a"/>
    </marker>
  </defs>

  <!-- Header -->
  <rect x="0" y="0" width="1000" height="38" fill="#09090b"/>
  <text x="20" y="24" font-family="sans-serif" font-size="12" font-weight="700" fill="#ffffff">
    GROUND SUPPLY-CHAIN TRACEABILITY &amp; AUTOMATED CUSTOMER NOTIFICATION ENGINE
  </text>
  <text x="980" y="24" font-family="sans-serif" font-size="9.5" font-weight="600" fill="#86efac" text-anchor="end">
    WHATSAPP BUSINESS API + TRANSACTIONAL EMAIL
  </text>

  <!-- SWIMLANE 1: SUPPLY CHAIN -->
  <rect x="15" y="48" width="970" height="170" rx="4" fill="#fafafa" stroke="#e4e4e7"/>
  <rect x="15" y="48" width="160" height="26" rx="4" fill="#27272a"/>
  <text x="95" y="65" font-family="sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">MATERIAL SUPPLY CHAIN</text>

  <!-- Box 1: PO -->
  <rect x="35" y="90" width="165" height="90" rx="3" fill="#ffffff" stroke="#09090b" stroke-width="1.5"/>
  <rect x="35" y="90" width="165" height="22" rx="3" fill="#f4f4f5"/>
  <text x="117" y="105" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#09090b" text-anchor="middle">1. PURCHASE ORDER (PO)</text>
  <text x="45" y="125" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Triggered by 80% Advance</text>
  <text x="45" y="140" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Tier-1 TopCon Modules</text>
  <text x="45" y="155" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Inverter &amp; GI Structure</text>
  <text x="45" y="170" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#09090b">&bull; Tagged to Project ID</text>
  <line x1="200" y1="135" x2="235" y2="135" stroke="#09090b" stroke-width="1.5" marker-end="url(#ar2)"/>

  <!-- Box 2: Vendor Factory -->
  <rect x="238" y="90" width="165" height="90" rx="3" fill="#ffffff" stroke="#09090b" stroke-width="1.5"/>
  <rect x="238" y="90" width="165" height="22" rx="3" fill="#f4f4f5"/>
  <text x="320" y="105" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#09090b" text-anchor="middle">2. VENDOR DISPATCH</text>
  <text x="248" y="125" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Factory Flash Test Report</text>
  <text x="248" y="140" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Barcode Serial Register</text>
  <text x="248" y="155" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Freight E-Way Bill</text>
  <text x="248" y="170" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#09090b">&bull; Lorry Inward to Salem</text>
  <line x1="403" y1="135" x2="438" y2="135" stroke="#09090b" stroke-width="1.5" marker-end="url(#ar2)"/>

  <!-- Box 3: QC Audit -->
  <rect x="441" y="90" width="165" height="90" rx="3" fill="#ffffff" stroke="#dc2626" stroke-width="1.5"/>
  <rect x="441" y="90" width="165" height="22" rx="3" fill="#fef2f2"/>
  <text x="523" y="105" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#991b1b" text-anchor="middle">3. QC AUDIT (WAREHOUSE)</text>
  <text x="451" y="125" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Glass Micro-Crack Scan</text>
  <text x="451" y="140" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Galvanization Thickness</text>
  <text x="451" y="155" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Serial Match against PO</text>
  <text x="451" y="170" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#dc2626">&bull; Mandatory Quality Pass</text>
  <line x1="606" y1="135" x2="641" y2="135" stroke="#09090b" stroke-width="1.5" marker-end="url(#ar2)"/>

  <!-- Box 4: GRN -->
  <rect x="644" y="90" width="155" height="90" rx="3" fill="#ffffff" stroke="#09090b" stroke-width="1.5"/>
  <rect x="644" y="90" width="155" height="22" rx="3" fill="#f4f4f5"/>
  <text x="721" y="105" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#09090b" text-anchor="middle">4. GRN GENERATION</text>
  <text x="654" y="125" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Goods Receipt Note</text>
  <text x="654" y="140" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Stock Added to Inventory</text>
  <text x="654" y="155" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Accounts Authorizes Bill</text>
  <text x="654" y="170" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#09090b">&bull; Allocated to Customer</text>
  <line x1="799" y1="135" x2="834" y2="135" stroke="#09090b" stroke-width="1.5" marker-end="url(#ar2)"/>

  <!-- Box 5: Site Issue -->
  <rect x="837" y="90" width="135" height="90" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="837" y="90" width="135" height="22" rx="3" fill="#dcfce7"/>
  <text x="904" y="105" font-family="sans-serif" font-size="8.5" font-weight="800" fill="#15803d" text-anchor="middle">5. SITE ISSUE</text>
  <text x="847" y="125" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Gate Pass Issued</text>
  <text x="847" y="140" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Vehicle Number Log</text>
  <text x="847" y="155" font-family="sans-serif" font-size="7.5" fill="#52525b">&bull; Customer Dispatch</text>
  <text x="847" y="170" font-family="sans-serif" font-size="7.5" font-weight="700" fill="#15803d">&bull; Delivery Tracking</text>


  <!-- SWIMLANE 2: CUSTOMER NOTIFICATION ENGINE -->
  <rect x="15" y="235" width="970" height="185" rx="4" fill="#f0fdf4" stroke="#bbf7d0"/>
  <rect x="15" y="235" width="220" height="26" rx="4" fill="#15803d"/>
  <text x="125" y="252" font-family="sans-serif" font-size="9" font-weight="700" fill="#ffffff" text-anchor="middle">CUSTOMER NOTIFICATION ENGINE</text>

  <!-- WhatsApp Trigger Pills -->
  <!-- Pill 1: Welcome -->
  <rect x="35" y="275" width="105" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <text x="87" y="293" font-family="sans-serif" font-size="8" font-weight="800" fill="#15803d" text-anchor="middle">1. WELCOME</text>
  <text x="87" y="310" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Greetings &bull; NIRT Intro</text>
  <text x="87" y="324" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Consultant Contact</text>

  <!-- Pill 2: Survey -->
  <rect x="155" y="275" width="105" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <text x="207" y="293" font-family="sans-serif" font-size="8" font-weight="800" fill="#15803d" text-anchor="middle">2. SITE VISIT</text>
  <text x="207" y="310" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Visit Date &bull; Time Slot</text>
  <text x="207" y="324" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Surveyor Name/Phone</text>

  <!-- Pill 3: 80% Payment -->
  <rect x="275" y="275" width="125" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="275" y="275" width="125" height="18" rx="3" fill="#dcfce7"/>
  <text x="337" y="288" font-family="sans-serif" font-size="7.5" font-weight="800" fill="#15803d" text-anchor="middle">3. 80% ADVANCE</text>
  <text x="337" y="307" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Formal Receipt &bull; Tax Inv</text>
  <text x="337" y="321" font-family="sans-serif" font-size="7" font-weight="700" fill="#09090b" text-anchor="middle">Project ID Confirmed</text>

  <!-- Pill 4: Factory PO -->
  <rect x="415" y="275" width="115" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <text x="472" y="293" font-family="sans-serif" font-size="8" font-weight="800" fill="#15803d" text-anchor="middle">4. PO PLACED</text>
  <text x="472" y="310" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Factory Order Placed</text>
  <text x="472" y="324" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Tier-1 TopCon Modules</text>

  <!-- Pill 5: Dispatched -->
  <rect x="545" y="275" width="120" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <text x="605" y="293" font-family="sans-serif" font-size="8" font-weight="800" fill="#15803d" text-anchor="middle">5. DISPATCHED</text>
  <text x="605" y="310" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Warehouse QC Passed</text>
  <text x="605" y="324" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Vehicle &amp; Arrival Time</text>

  <!-- Pill 6: Installation -->
  <rect x="680" y="275" width="110" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1"/>
  <text x="735" y="293" font-family="sans-serif" font-size="8" font-weight="800" fill="#15803d" text-anchor="middle">6. INSTALLATION</text>
  <text x="735" y="310" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Site Team Mobilised</text>
  <text x="735" y="324" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Structure &amp; Wiring Log</text>

  <!-- Pill 7: Grid Live -->
  <rect x="805" y="275" width="165" height="65" rx="3" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/>
  <rect x="805" y="275" width="165" height="18" rx="3" fill="#dcfce7"/>
  <text x="887" y="288" font-family="sans-serif" font-size="7.5" font-weight="800" fill="#15803d" text-anchor="middle">7. GRID LIVE &amp; SUBSIDY</text>
  <text x="887" y="307" font-family="sans-serif" font-size="7" fill="#52525b" text-anchor="middle">Net Meter Sync &bull; Solar Active</text>
  <text x="887" y="321" font-family="sans-serif" font-size="7" font-weight="700" fill="#09090b" text-anchor="middle">Subsidy DBT Bank UTR Logged</text>

  <!-- Footer Banner inside SVG -->
  <rect x="35" y="355" width="935" height="50" rx="3" fill="#ffffff" stroke="#cbd5e1"/>
  <text x="50" y="375" font-family="sans-serif" font-size="8.5" font-weight="700" fill="#09090b">Bilingual Support (Tamil &amp; English) &bull; Automatic PDF Tax Invoice &amp; Payment Receipts Attached &bull; Zero Staff Manual Typing</text>
  <text x="50" y="392" font-family="sans-serif" font-size="7.5" fill="#64748b">Ensures 100% customer trust, zero collection friction on the 80% advance payment, and eliminates "Where is my solar panel?" phone calls.</text>
</svg>
"""

# ==============================================================================
# 2. ASSEMBLE COMPLETE EXECUTIVE HTML
# ==============================================================================

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>NIRT Rooftop Solar CRM &amp; Project Control Tower &mdash; Industrial Specification</title>
<style>
@page {{
    size: A4;
    margin: 14mm 12mm 16mm 12mm;
}}

* {{
    box-sizing: border-box;
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
}}

body {{
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
    color: #18181b;
    background-color: #ffffff;
    font-size: 8.8pt;
    line-height: 1.48;
    margin: 0;
    padding: 0;
}}

/* Cover Page */
.cover-page {{
    page-break-after: always;
    min-height: 260mm;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 5px 5px 5px;
}}

.cover-header {{
    border-bottom: 2.5px solid #09090b;
    padding-bottom: 16px;
}}

.brand-badge {{
    display: inline-block;
    background: #09090b;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    padding: 3px 9px;
    margin-bottom: 10px;
}}

.company-title {{
    font-size: 20pt;
    font-weight: 800;
    letter-spacing: -0.5px;
    color: #09090b;
    margin: 0 0 4px 0;
}}

.company-sub {{
    font-size: 9pt;
    color: #52525b;
    font-weight: 500;
    margin: 0;
}}

.cover-hero {{
    margin: 35px 0 25px 0;
}}

.doc-tag {{
    font-size: 8.5pt;
    font-weight: 700;
    color: #2563eb;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin-bottom: 8px;
}}

.doc-title {{
    font-size: 25pt;
    font-weight: 800;
    line-height: 1.15;
    color: #09090b;
    margin: 0 0 14px 0;
    letter-spacing: -0.8px;
}}

.doc-desc {{
    font-size: 10pt;
    color: #52525b;
    line-height: 1.55;
    max-width: 680px;
}}

.cover-meta-grid {{
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    padding: 14px;
    margin-top: 18px;
}}

.meta-item {{
    font-size: 8pt;
}}

.meta-label {{
    font-size: 7pt;
    text-transform: uppercase;
    color: #71717a;
    font-weight: 700;
    letter-spacing: 0.5px;
    margin-bottom: 2px;
}}

.meta-value {{
    color: #09090b;
    font-weight: 600;
}}

.cover-footer {{
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 1px solid #e4e4e7;
    padding-top: 10px;
    font-size: 7.5pt;
    color: #71717a;
}}

/* Typography */
h1 {{
    font-size: 15pt;
    font-weight: 800;
    color: #09090b;
    letter-spacing: -0.4px;
    border-bottom: 1.5px solid #09090b;
    padding-bottom: 4px;
    margin-top: 20px;
    margin-bottom: 8px;
    page-break-after: avoid;
}}

h2 {{
    font-size: 12pt;
    font-weight: 700;
    color: #18181b;
    letter-spacing: -0.3px;
    margin-top: 16px;
    margin-bottom: 6px;
    page-break-after: avoid;
}}

h3 {{
    font-size: 9.5pt;
    font-weight: 700;
    color: #27272a;
    margin-top: 12px;
    margin-bottom: 5px;
    page-break-after: avoid;
}}

p {{
    margin: 0 0 7px 0;
    color: #27272a;
}}

strong {{
    color: #09090b;
    font-weight: 600;
}}

/* Tables */
table {{
    width: 100%;
    border-collapse: collapse;
    margin: 8px 0 12px 0;
    font-size: 7.8pt;
    page-break-inside: avoid;
}}

th {{
    background-color: #f4f4f5;
    color: #09090b;
    font-weight: 700;
    text-align: left;
    padding: 5px 7px;
    border: 1px solid #d4d4d8;
    font-size: 7pt;
    text-transform: uppercase;
    letter-spacing: 0.5px;
}}

td {{
    padding: 5px 7px;
    border: 1px solid #e4e4e7;
    vertical-align: top;
    color: #27272a;
}}

tr:nth-child(even) td {{
    background-color: #fafafa;
}}

/* Callouts */
.callout {{
    background: #f8fafc;
    border-left: 3.5px solid #09090b;
    padding: 8px 12px;
    margin: 9px 0;
    border-top: 1px solid #e2e8f0;
    border-right: 1px solid #e2e8f0;
    border-bottom: 1px solid #e2e8f0;
    font-size: 8pt;
}}

.callout-blue {{
    background: #eff6ff;
    border-left-color: #2563eb;
    border-color: #dbeafe;
}}

.callout-green {{
    background: #f0fdf4;
    border-left-color: #16a34a;
    border-color: #bbf7d0;
}}

/* Lists */
ul, ol {{
    margin: 3px 0 7px 0;
    padding-left: 16px;
}}

li {{
    margin-bottom: 3px;
    color: #27272a;
}}

/* Checklists */
.checklist-item {{
    display: flex;
    align-items: flex-start;
    margin-bottom: 5px;
    font-size: 8pt;
}}

.check-icon {{
    display: inline-block;
    width: 13px;
    height: 13px;
    background: #09090b;
    color: #ffffff;
    font-size: 7.5pt;
    font-weight: 700;
    text-align: center;
    line-height: 13px;
    margin-right: 7px;
    flex-shrink: 0;
    margin-top: 2px;
}}

/* 21 Questions Grid */
.questions-container {{
    background: #fafafa;
    border: 1px solid #e4e4e7;
    padding: 10px 12px;
    margin: 10px 0;
    page-break-inside: avoid;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 5px 12px;
}}

.question-row {{
    display: flex;
    font-size: 7.5pt;
    line-height: 1.35;
}}

.q-num {{
    font-weight: 700;
    color: #2563eb;
    min-width: 24px;
}}

.q-text {{
    color: #18181b;
}}

/* Code Block */
pre {{
    background: #f4f4f5;
    border: 1px solid #e4e4e7;
    padding: 6px 10px;
    font-family: Consolas, monospace;
    font-size: 7pt;
    overflow-x: auto;
    page-break-inside: avoid;
    line-height: 1.3;
}}

code {{
    font-family: Consolas, monospace;
    font-size: 7.5pt;
    background: #f4f4f5;
    padding: 1px 3px;
    border: 1px solid #e4e4e7;
    color: #09090b;
}}

.page-break {{
    page-break-before: always;
}}

.sign-block {{
    margin-top: 20px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 25px;
    page-break-inside: avoid;
}}

.sign-box {{
    border-top: 1.5px solid #09090b;
    padding-top: 6px;
    font-size: 7.5pt;
}}
</style>
</head>
<body>

<!-- ========================================== -->
<!-- COVER PAGE                                 -->
<!-- ========================================== -->
<div class="cover-page">
    <div class="cover-header">
        <div class="brand-badge">CONFIDENTIAL &amp; PROPRIETARY SPECIFICATION</div>
        <div class="company-title">NIRT RENEWABLE ENERGY PRIVATE LIMITED</div>
        <div class="company-sub">CIN: U74999TZ2017PTC028477 &bull; Corporate Headquarters: Salem, Tamil Nadu, India</div>
    </div>

    <div class="cover-hero">
        <div class="doc-tag">Industrial Specification &amp; System Handover Architecture</div>
        <div class="doc-title">Rooftop Solar CRM &amp;<br>Project Control Tower</div>
        <div class="doc-desc">
            An industrial-grade operating platform engineered to govern the complete Rooftop Solar EPC lifecycle: from omnichannel lead intake and 80% upfront advance collection to automated WhatsApp/Email customer tracking, DISCOM net-metering approvals, and PM Surya Ghar subsidy disbursement.
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
        <div>Powered by ACHISE &bull; Antigravity Platform</div>
    </div>
</div>

<!-- ========================================== -->
<!-- SECTION 1: EXECUTIVE SUMMARY               -->
<!-- ========================================== -->
<h1>1. Executive Summary &amp; System Philosophy</h1>
<p>
Rooftop solar engineering, procurement, and construction (EPC) is an operationally intensive business. A single rooftop solar project involves up to <strong>17 sequential milestones</strong>, intersects <strong>8 specialized departments</strong>, requires liaison with external government entities (<strong>TANGEDCO</strong> and the <strong>PM Surya Ghar National Portal</strong>), and demands stringent documentation across physical site surveys, electrical safety audits, civil structure installations, and banking/DBT subsidy workflows.
</p>
<p>
Generic sales CRMs fail because they treat solar as a simple sales transaction. In solar EPC, <strong>the sale is merely the starting line</strong>. The real risks of margin erosion, customer dissatisfaction, and regulatory stalls occur post-sale: during DISCOM net-metering approvals, material staging, physical installation, and subsidy release.
</p>

<div class="callout callout-blue">
<strong>The 5 Immutable System Rules:</strong>
<ol style="margin-top: 4px; margin-bottom: 0;">
    <li><strong>One Customer – One Master Record:</strong> A unified identity eliminating duplicated customer profiles across marketing, sales, and accounts.</li>
    <li><strong>One Project – One Digital Folder:</strong> Every contract, survey photo, SLD drawing, bill, and test certificate is bound permanently to a unified <strong>Project ID</strong> (<code>NIRT-YYMM-XXXX</code>).</li>
    <li><strong>Clear Ownership &amp; Deadlines:</strong> Every single task across all 17 stages has a named responsible owner, department, planned SLA date, and escalation trigger.</li>
    <li><strong>Hard Stage Gates:</strong> Commercial and procurement actions cannot proceed without prerequisite sign-offs (e.g., procurement is hard-locked until Accounts logs the Stage 7 Advance receipt).</li>
    <li><strong>The 3 Mandatory Closures:</strong> A project cannot be marked completed until it achieves <strong>Technical Closure</strong> (commissioning report + net meter sync), <strong>Commercial Closure</strong> (balance = &#8377;0), and <strong>Subsidy Closure</strong> (DBT bank credit confirmed via UTR).</li>
</ol>
</div>

<!-- ========================================== -->
<!-- SECTION 2: 17-STAGE LIFECYCLE FLOWCHART    -->
<!-- ========================================== -->
<h1>2. End-to-End 17-Stage Industrial Process Flowchart</h1>
<p>
The complete project lifecycle is orchestrated across 4 sequential phases. The high-resolution process architecture diagram below illustrates the exact flow, department handoffs, and mandatory gatekeeper checkpoints:
</p>

{svg_lifecycle}

<div class="page-break"></div>

<!-- ========================================== -->
<!-- SECTION 3: DEPARTMENT RESPONSIBILITY MATRIX-->
<!-- ========================================== -->
<h1>3. Departmental Responsibility Matrix &amp; The Control Tower</h1>
<p>
Operational accountability is divided across <strong>8 functional departments</strong> and coordinated by a centralized <strong>Project Coordinator (Control Tower)</strong> who ensures zero drop-off across department handoffs:
</p>

<table>
    <thead>
        <tr>
            <th style="width: 20%;">Department</th>
            <th style="width: 32%;">Operational Scope</th>
            <th style="width: 14%;">Stages</th>
            <th style="width: 34%;">Key Deliverable / Governance Output</th>
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
            <td>Tape measurements, 4-photo dossier, standard TANGEDCO SLD.</td>
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

<!-- ========================================== -->
<!-- SECTION 4: GROUND REALITY VS SOFTWARE ROLE -->
<!-- ========================================== -->
<h1>4. Ground Operations Reality vs. Software System Role</h1>
<p>
To ensure total clarity between site technicians and software users, the system explicitly distinguishes between physical site realities and digital CRM functions:
</p>

<table>
    <thead>
        <tr>
            <th style="width: 25%;">Activity / Requirement</th>
            <th style="width: 37%;">Ground Reality on Site (Domestic Homes)</th>
            <th style="width: 38%;">Role of the NIRT Solar CRM</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td><strong>Rooftop Geometry</strong></td>
            <td>Homeowners do not possess blueprints. Surveyors measure terrace dimensions using a measuring tape/laser meter and sketch obstacles on a clipboard.</td>
            <td>Captures tape measurements (length &times; width), shadow obstacles, and 4 high-res photos (Roof, EB Meter, DB Panel, Inverter Wall).</td>
        </tr>
        <tr>
            <td><strong>TANGEDCO SLD Drawing</strong></td>
            <td>Standard pre-approved electrical single line diagrams for 1 kW, 3 kW, 5 kW, 10 kW indicating Inverter &rarr; Net Meter &rarr; Grid connection.</td>
            <td>Provides digital document locker to store and automatically attach the pre-approved TANGEDCO SLD to the online DISCOM application.</td>
        </tr>
        <tr>
            <td><strong>Commercial Quotation</strong></td>
            <td>Customer needs to know gross cost, PM Surya Ghar subsidy, net payable, and the mandatory 80% upfront advance payable on site visit.</td>
            <td>Automated pricing engine calculates capacity, BOM breakdown, subsidy, net cost, and prints official NIRT quotation with ICICI bank details.</td>
        </tr>
    </tbody>
</table>

<!-- ========================================== -->
<!-- SECTION 5: SUPPLY CHAIN & NOTIFICATIONS    -->
<!-- ========================================== -->
<h1>5. Ground Supply-Chain &amp; Customer Notification Architecture</h1>
<p>
Materials (solar modules, inverters, cables, structures) account for 65% to 75% of total project costs. The diagram below illustrates the physical supply-chain journey (PO &rarr; QC &rarr; GRN &rarr; Site Issue) alongside the automated WhatsApp &amp; Email notification engine that keeps the customer informed in real time:
</p>

{svg_supply_chain}

<div class="page-break"></div>

<!-- ========================================== -->
<!-- SECTION 6: AUTOMATED NOTIFICATION MATRIX   -->
<!-- ========================================== -->
<h1>6. Omnichannel Customer Notification Triggers (WhatsApp &amp; Email)</h1>
<p>
Recognizing that customer peace of mind is vital throughout the 17-stage solar journey, the CRM embeds an automated, event-driven <strong>WhatsApp Business API &amp; Transactional Email Engine</strong>. At key project transition gates, the system automatically triggers personalized, branded bilingual (English &amp; Tamil) notifications directly to the customer:
</p>

<table>
    <thead>
        <tr>
            <th style="width: 24%;">Lifecycle Trigger Event</th>
            <th style="width: 14%;">Channels</th>
            <th style="width: 62%;">Automated Message Content &amp; Customer Payload</th>
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
            <td><strong>5. Material QC Done &amp; Dispatched</strong></td>
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
            <td><strong>8. PM Surya Ghar Subsidy Credit</strong></td>
            <td>WhatsApp + Email</td>
            <td>Official alert confirming National Portal subsidy approval, Direct Benefit Transfer (DBT) credit to customer's bank account, and bank UTR reference.</td>
        </tr>
    </tbody>
</table>

<!-- ========================================== -->
<!-- SECTION 7: THE 21 EXECUTIVE QUESTIONS      -->
<!-- ========================================== -->
<h1>7. The 21 Executive Control Questions (Section 41 Compliance)</h1>
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

<!-- ========================================== -->
<!-- SECTION 8: CORE APPLICATION MODULES        -->
<!-- ========================================== -->
<h1>8. Core Application Modules &amp; Functional Capabilities</h1>

<h3>8.1 Module 1: Lead Capture &amp; Live Deduplication Engine</h3>
<ul>
    <li><strong>Omnichannel Sourcing:</strong> Captures leads from 13 sources (Direct, Referrals, Digital, WhatsApp, Architects, Builders, Electrical Contractors, etc.).</li>
    <li><strong>Real-time Deduplication:</strong> Automatically checks the database as the user types to prevent duplicate entries based on: (1) 10-digit Primary Mobile Number, and (2) TANGEDCO EB Consumer Number.</li>
    <li><strong>Instant Solar &amp; Subsidy Sizer:</strong> Calculates recommended system size (kW), gross capital cost, PM Surya Ghar subsidy (&#8377;30,000 for 1 kW, &#8377;60,000 for 2 kW, &#8377;78,000 for 3 kW+), net outlay, roof area required, and annual savings.</li>
    <li><strong>Dynamic Circle Creator:</strong> Supports all TANGEDCO circles (Salem, Erode, Coimbatore, Namakkal, Dharmapuri) with inline creation for new territories.</li>
</ul>

<h3>8.2 Module 2: Technical Site Survey &amp; Feasibility Audit</h3>
<ul>
    <li><strong>Rooftop Structural Assessment:</strong> Records roof dimensions, usable shadow-free area (sq.ft), roof type (RCC Flat, Sloped Metal Sheet, Tiled), structural health, and orientation.</li>
    <li><strong>Electrical Infrastructure Inspection:</strong> Evaluates sanctioned load, existing service phase (Single Phase vs. 3-Phase 415V), LT panel location, AC/DC cable distances, and chemical earthing space.</li>
    <li><strong>Ground Resistance Standard:</strong> Enforces earthing pit location audit to guarantee soil resistance &lt; 5 &Omega; with dedicated Lightning Arrestor (LA) clearance.</li>
    <li><strong>Mandatory 4-Slot Photo Verification:</strong> Upload slots for (1) Rooftop panoramic view, (2) TANGEDCO EB meter, (3) Main DB / LT panel, and (4) Proposed inverter mounting wall.</li>
</ul>

<h3>8.3 Module 3: Triple Pipeline Control Board</h3>
<ol>
    <li><strong>Sales &amp; Engineering Pipeline:</strong> Lead Inward &rarr; Survey Scheduled &rarr; Feasibility Audit &rarr; Proposal Dispatched &rarr; Negotiation &rarr; Contract Closed.</li>
    <li><strong>Project Execution Pipeline:</strong> Advance Confirmed &rarr; DISCOM Submitted &rarr; BOM Procurement &rarr; Civil &amp; Electrical Installation &rarr; Testing &amp; Commissioning &rarr; Net Meter Sync.</li>
    <li><strong>PM Surya Ghar Subsidy Pipeline:</strong> Customer Verified &rarr; Portal Claim Lodged &rarr; DISCOM Verification &rarr; Subsidy Sanctioned &rarr; DBT Disbursed.</li>
</ol>

<h3>8.4 Module 4: Proposal Sizer &amp; Official Quotation Engine</h3>
<div class="callout callout-green">
<strong>Standard Commercial Payment Terms (NIRT Operational Policy):</strong>
<ul style="margin-top: 4px; margin-bottom: 0;">
    <li><strong>80% — Initial Advance Payment upon Site Visit &amp; Order Confirmation:</strong> NIRT's standard operational model requires an 80% upfront commitment upon successful site survey and feasibility sign-off. This secures immediate factory BOM procurement and eliminates project staging stalls.</li>
    <li><strong>10% — Site Installation &amp; Mechanical/Electrical Testing Completion:</strong> Released upon mechanical mounting of modules, inverter placement, DC/AC cabling, and earthing pit resistance sign-off (&lt; 5 &Omega;).</li>
    <li><strong>10% — Net Metering Synchronization &amp; Handover:</strong> Final settlement upon TANGEDCO bi-directional meter installation, grid synchronization, and handover of warranty certificates.</li>
</ul>
</div>

<h3>8.5 Module 5: 360&deg; Project Dossier</h3>
<ul>
    <li><strong>TANGEDCO Net Metering Tracker:</strong> 8-step tracking matrix (Application &rarr; Feasibility &rarr; Readiness Notice &rarr; Inspection Request &rarr; Field Audit &rarr; Meter Sanction &rarr; Meter Installation &rarr; Grid Sync).</li>
    <li><strong>PM Surya Ghar Subsidy Ledger:</strong> National Portal application tracking, claim reference numbers, bank account verification, and transaction UTR logger.</li>
    <li><strong>Milestone Payment Ledger:</strong> Live balance tracking showing total project value, 80% initial advance received, outstanding balance, and final settlement status.</li>
    <li><strong>Document Locker:</strong> Categorized repository for KYC documents, Aadhaar cards, EB bills, signed contracts, SLD diagrams, and Installation Completion Reports (ICRs).</li>
</ul>

<!-- ========================================== -->
<!-- SECTION 9: TECHNICAL ARCHITECTURE          -->
<!-- ========================================== -->
<h1>9. Technical Architecture &amp; Role-Based Access Control (RBAC)</h1>
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
<p>
The system consolidates permissions into <strong>9 operational user roles</strong>: (1) Super Admin / Management, (2) Sales Lead / Executive, (3) Site Surveyor / Engineer, (4) Design / Technical Engineer, (5) Project Coordinator / Control Tower, (6) Liaison Officer, (7) Procurement &amp; Store Executive, (8) Installation / Site Engineer, and (9) Accounts Executive.
</p>

<!-- ========================================== -->
<!-- SECTION 10: ACCEPTANCE & SIGN-OFF          -->
<!-- ========================================== -->
<h1>10. Verification Checklist &amp; Acceptance Sign-off (UAT Compliance)</h1>
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

# Write HTML file
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
