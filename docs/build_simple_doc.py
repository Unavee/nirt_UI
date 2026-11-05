"""
NIRT Solar EPC - Simple Operating Guide (Monochrome, Large Font, Plain English)
Specifically tailored for non-technical business owners (40+ age group).
Footer: 'Powered by ACHISE'.
Covers all sectors: Residential, Commercial, Industrial Factories, and Farm Lands / Agro-Solar.
Synchronized across all 9 pages with the Master 5-Pipeline and 20-Step Model.
Zero color (Strictly Monochrome), 100% Native ReportLab.
"""

import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.units import mm
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, HRFlowable
)
from reportlab.pdfgen import canvas
import pypdf

# Page metrics
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 11 * mm
USABLE_WIDTH = PAGE_WIDTH - 2 * MARGIN

# Strictly Monochrome Palette
COLOR_BLACK = colors.HexColor("#000000")
COLOR_DARK = colors.HexColor("#222222")
COLOR_MUTED = colors.HexColor("#555555")
COLOR_BORDER = colors.HexColor("#777777")
COLOR_BORDER_LIGHT = colors.HexColor("#CCCCCC")
COLOR_BG_HEADER = colors.HexColor("#EEEEEE")
COLOR_BG_LIGHT = colors.HexColor("#F9F9F9")
COLOR_WHITE = colors.HexColor("#FFFFFF")

class SimpleMonochromeCanvas(canvas.Canvas):
    """Clean, simple running header and footer with Powered by ACHISE."""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, total_pages):
        self.saveState()
        self.setStrokeColor(COLOR_BORDER)
        self.setLineWidth(0.5)

        # Header on pages 2+
        if self._pageNumber > 1:
            self.line(MARGIN, PAGE_HEIGHT - 9 * mm, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 9 * mm)
            self.setFont("Helvetica-Bold", 8)
            self.setFillColor(COLOR_DARK)
            self.drawString(MARGIN, PAGE_HEIGHT - 7.5 * mm, "NIRT SOLAR EPC \u2014 5-PIPELINE OPERATIONAL MANUAL")
            self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 7.5 * mm, "ROLE & STEP-BY-STEP GUIDE")

        # Footer on all pages: Powered by ACHISE instead of NIRT
        self.line(MARGIN, 9 * mm, PAGE_WIDTH - MARGIN, 9 * mm)
        self.setFont("Helvetica-Bold", 8)
        self.setFillColor(COLOR_DARK)
        self.drawString(MARGIN, 6.5 * mm, "Powered by ACHISE")
        self.setFont("Helvetica", 8)
        self.setFillColor(COLOR_MUTED)
        self.drawRightString(PAGE_WIDTH - MARGIN, 6.5 * mm, f"Page {self._pageNumber} of {total_pages}")
        self.restoreState()


def get_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=15,
        leading=18,
        textColor=COLOR_BLACK,
        spaceAfter=1.5
    ))
    styles.add(ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9,
        leading=11.5,
        textColor=COLOR_MUTED,
        spaceAfter=4
    ))
    styles.add(ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13.5,
        textColor=COLOR_BLACK,
        spaceBefore=1,
        spaceAfter=1
    ))
    styles.add(ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11,
        textColor=COLOR_DARK,
        spaceBefore=1,
        spaceAfter=1
    ))
    styles.add(ParagraphStyle(
        'BodyComfort',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.8,
        leading=10.2,
        textColor=COLOR_DARK
    ))
    styles.add(ParagraphStyle(
        'BodyComfortBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=7.8,
        leading=10.2,
        textColor=COLOR_BLACK
    ))
    styles.add(ParagraphStyle(
        'StatVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=11,
        leading=13,
        textColor=COLOR_BLACK,
        alignment=1
    ))
    styles.add(ParagraphStyle(
        'StatLbl',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7,
        leading=8.5,
        textColor=COLOR_MUTED,
        alignment=1
    ))
    styles.add(ParagraphStyle('PipelineTH', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=9, textColor=COLOR_BLACK, alignment=1))
    styles.add(ParagraphStyle('PipelineCat', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, leading=8.2, textColor=COLOR_DARK))
    styles.add(ParagraphStyle('PipelineStepNum', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7.5, leading=8.5, textColor=COLOR_BLACK, alignment=1))
    styles.add(ParagraphStyle('PipelineStepName', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=7, leading=8.2, textColor=COLOR_BLACK))
    styles.add(ParagraphStyle('PipelineRole', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, leading=7.8, textColor=COLOR_MUTED))
    styles.add(ParagraphStyle('PipelineAction', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, leading=7.8, textColor=COLOR_DARK))
    styles.add(ParagraphStyle('PipelineGate', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, leading=7.8, textColor=COLOR_DARK))
    styles.add(ParagraphStyle('PipelineFlow', parent=styles['Normal'], fontName='Helvetica', fontSize=6.5, leading=7.8, textColor=COLOR_DARK, alignment=1))
    styles.add(ParagraphStyle('PipelineBanner', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=6.5, leading=8, textColor=COLOR_BLACK, alignment=1))
    return styles


def create_simple_stats_row(stats, styles):
    """Creates a clean, spacious 4-stat box row with large readable numbers."""
    cells = []
    for label, val in stats:
        content = [
            Paragraph(val, styles['StatVal']),
            Spacer(1, 0.5*mm),
            Paragraph(f"<b>{label}</b>", styles['StatLbl'])
        ]
        cells.append(content)
        
    t = Table([cells], colWidths=[USABLE_WIDTH / 4.0] * 4)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3),
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    return t


def create_role_card_with_charts(role_num, role_title, plain_role, pipeline, owned_steps, stats, charts_data, daily_actions, styles):
    """Role cockpit explicitly synchronized with Page 1 Steps, Action Inputs/Uploads, and Edit Rules."""
    head_p = Paragraph(f"<b>ROLE {role_num}: {role_title.upper()}</b>", styles['SectionTitle'])
    sub_p = Paragraph(
        f"<b>Department & Everyday Job:</b> {plain_role}<br/>"
        f"<b>Operating Pipeline:</b> {pipeline} | <b>Owned Pipeline Steps:</b> <u>{owned_steps}</u>",
        styles['BodyComfortBold']
    )
    
    stats_t = create_simple_stats_row(stats, styles)
    
    # 2 Columns: Live Dashboard Metrics vs Operational Action Steps
    left_content = [
        Paragraph("<b>What This Role Sees on Dashboard (Live Status & Data):</b>", styles['SubTitle']),
        Spacer(1, 0.5*mm)
    ]
    for ch_title, ch_type, ch_data in charts_data:
        left_content.append(Paragraph(f"&bull; <b>{ch_title}</b> <i>({ch_type})</i>:<br/>&nbsp;&nbsp;{ch_data}", styles['BodyComfort']))
        left_content.append(Spacer(1, 0.8*mm))
        
    right_content = [
        Paragraph("<b>Operational Execution (Inputs, Uploads & Stage Gates):</b>", styles['SubTitle']),
        Spacer(1, 0.5*mm)
    ]
    for act in daily_actions:
        right_content.append(Paragraph(f"&bull; {act}", styles['BodyComfort']))
        right_content.append(Spacer(1, 0.8*mm))
        
    body_t = Table([
        [left_content, right_content]
    ], colWidths=[USABLE_WIDTH * 0.52, USABLE_WIDTH * 0.48])
    body_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), COLOR_BG_LIGHT),
        ('BACKGROUND', (1,0), (1,0), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    
    return [head_p, sub_p, Spacer(1, 1*mm), stats_t, Spacer(1, 1*mm), body_t, Spacer(1, 2.5*mm)]


def build_pdf(filename="D:/Nirt/docs/NIRT_Solar_Standard_Process.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN,
        bottomMargin=MARGIN
    )
    styles = get_styles()
    story = []

    # =========================================================================
    # PAGE 1: MASTER OPERATIONAL PIPELINE & STEP-BY-STEP PROCESS STEPS
    # =========================================================================
    story.append(Paragraph("NIRT SOLAR EPC \u2014 MASTER PIPELINE & PROCESS STEPS", styles['DocTitle']))
    story.append(Paragraph("OPERATIONAL ACTIONS (INPUTS & UPLOADS), GATES, AND AUDITED EDIT PROTOCOL", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=2.5, spaceBefore=1.5))

    flow_text = "<b>1. Lead</b> &rarr; <b>2. Qualify (A-C/D)</b> &rarr; <b>3. Survey</b> &rarr; <b>4. Design</b> &rarr; <b>5. Quote</b> &rarr; <b>6. Order</b> &rarr; <b>7. 80% Advance</b> &rarr; <b>8. DISCOM</b> &rarr; <b>9. Procure</b> &rarr; <b>10. Delivery</b> &rarr; <b>11. Install</b> &rarr; <b>12. 10% On Installation</b> &rarr; <b>13. Net Meter</b> &rarr; <b>14. 10% Final</b> &rarr; <b>15. Subsidy DBT</b>"
    flow_table = Table([[Paragraph(flow_text, styles['PipelineFlow'])]], colWidths=[USABLE_WIDTH])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_HEADER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 1*mm))

    pipeline_table_data = [
        [
            Paragraph("Pipeline / Phase", styles['PipelineTH']),
            Paragraph("Step", styles['PipelineTH']),
            Paragraph("Process Step", styles['PipelineTH']),
            Paragraph("Responsible Role", styles['PipelineTH']),
            Paragraph("Action: Inputs & Uploads", styles['PipelineTH']),
            Paragraph("Mandatory Gate & Edit Rule", styles['PipelineTH'])
        ]
    ]

    pipeline_steps = [
        ("1. Sales & Feasibility", "01", "Lead Inward & Intake", "Sales Executive", "<b>Input:</b> Name, Phone, Address, Circle, EB #<br/><b>Upload:</b> None (Optional Lead card)", "<b>Gate:</b> Deduplicated Lead Created<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("1. Sales & Feasibility", "02", "Lead Qualification (Viability)", "Sales Executive", "<b>Input:</b> Load, Units, Roof Type, Status<br/><b>Outcome:</b> Qualified (A/B/C) / Unqualified (D)", "<b>Gate:</b> Viability Profile / Drop Reason<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("1. Sales & Feasibility", "03", "Site Survey & Feasibility Audit", "Site Surveyor", "<b>Input:</b> Tape dims, Shadow, Cable mtrs<br/><b>Upload:</b> 4 Photos (Roof, EB, DB, Wall)", "<b>Gate:</b> Survey Dossier Approved<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("1. Sales & Feasibility", "04", "System Design & Engineering DPR", "Design Engineer", "<b>Input:</b> kW sizing, Inverter model, Strings<br/><b>Upload:</b> Single Line Diagram (SLD), CAD", "<b>Gate:</b> Verified SLD & System DPR<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("1. Sales & Feasibility", "05", "Commercial Quotation Sizing", "Sales Executive", "<b>Input:</b> BOM pricing, Discount, Terms<br/><b>Upload:</b> None (Auto-generates PDF)", "<b>Gate:</b> Formal Quotation Dispatched<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("1. Sales & Feasibility", "06", "Customer Order Confirmation", "Sales / Customer", "<b>Input:</b> Payment mode, Target date<br/><b>Upload:</b> Signed Work Order copy", "<b>Gate:</b> Project ID Generated (NIRT-XXXX)<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),

        ("2. Advance & Approvals", "07", "80% Advance Receipt Gatekeeper", "Accounts Executive", "<b>Input:</b> Bank UTR, Amount, Date, Mode<br/><b>Upload:</b> Bank credit counterfoil / slip", "<b>Gate:</b> Stage 7 Cleared (Hard Lock Off)<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("2. Advance & Approvals", "08", "Document Locker KYC Assembly", "Liaison Officer", "<b>Input:</b> Aadhaar #, Consumer #, PAN<br/><b>Upload:</b> KYC, EB Bill, Cheque, Tax Receipt", "<b>Gate:</b> Complete Document Dossier<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("2. Advance & Approvals", "09", "TANGEDCO DISCOM Portal Filing", "Liaison Officer", "<b>Input:</b> Portal App ID, Submission date<br/><b>Upload:</b> DISCOM acknowledgment receipt", "<b>Gate:</b> Online Application Verified<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("2. Advance & Approvals", "10", "Technical Feasibility Sanction", "Liaison / DISCOM", "<b>Input:</b> Sanction Ref #, Sanctioned kW<br/><b>Upload:</b> TANGEDCO Feasibility Sanction", "<b>Gate:</b> Grid Feasibility Sanctioned<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),

        ("3. Procurement & Store", "11", "Vendor PO Issuance", "Procurement Exec", "<b>Input:</b> PO #, Vendor name, Module/Inv specs<br/><b>Upload:</b> Vendor Purchase Order PDF", "<b>Gate:</b> Factory PO Dispatched<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("3. Procurement & Store", "12", "Warehouse QC & Inwarding (GRN)", "Store Executive", "<b>Input:</b> GRN #, Serial numbers, QC status<br/><b>Upload:</b> QC Pass Sheet & Delivery Challan", "<b>Gate:</b> Inward GRN Tagged to Project<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("3. Procurement & Store", "13", "Material Dispatch to Site", "Store / Logistics", "<b>Input:</b> Vehicle #, Driver phone, Dispatch date<br/><b>Upload:</b> Site Delivery Challan / E-way Bill", "<b>Gate:</b> Materials Dispatched to Site<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),

        ("4. EPC Site Execution", "14", "Civil Structure & Module Mounting", "EPC Site Engineer", "<b>Input:</b> Torque check Nm, Tilt angle deg<br/><b>Upload:</b> 4 Erection Milestone Photos", "<b>Gate:</b> Structural Sign-off Recorded<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("4. EPC Site Execution", "15", "Electrical Cabling & Inverter Setup", "EPC Site Engineer", "<b>Input:</b> Earthing resistance Ohms (<5), Polarity<br/><b>Upload:</b> Inverter display photo, Earth report", "<b>Gate:</b> Electrical Readiness Signed<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("4. EPC Site Execution", "16", "10% On Installation Receipt", "Accounts Executive", "<b>Input:</b> Installation UTR, Amount, Receipt #<br/><b>Upload:</b> Bank credit advice / slip", "<b>Gate:</b> 90% Cumulative Funds Received<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("4. EPC Site Execution", "17", "TANGEDCO Net Metering & Sync", "Liaison / DISCOM", "<b>Input:</b> Bi-directional Meter #, Sync date<br/><b>Upload:</b> DISCOM Commissioning Report", "<b>Gate:</b> Grid Synchronized & Generating<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),

        ("5. Closure & Subsidy", "18", "10% Final Balance Collection", "Accounts Executive", "<b>Input:</b> Final UTR, Receipt #, Balance Zero<br/><b>Upload:</b> Final Tax Invoice & Zero Balance", "<b>Gate:</b> Commercial Closure (Balance = Rs. 0)<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("5. Closure & Subsidy", "19", "PM Surya Ghar Subsidy Submission", "Subsidy Desk", "<b>Input:</b> National Portal Claim Ref, Bank IFSC<br/><b>Upload:</b> Combined ICR + Meter photo", "<b>Gate:</b> Portal Subsidy Claim Lodged<br/><b>Edit:</b> Edit with Reason (Logged to Audit)"),
        ("5. Closure & Subsidy", "20", "DBT Subsidy Credit & Formal Closure", "Central PMO", "<b>Input:</b> Subsidy DBT UTR, Sanctioned amount<br/><b>Upload:</b> Bank DBT credit proof / statement", "<b>Gate:</b> Triple Closure (Tech+Comm+Subsidy)<br/><b>Edit:</b> Edit with Reason (Logged to Audit)")
    ]

    for pipe, snum, sname, role, action, gate in pipeline_steps:
        pipeline_table_data.append([
            Paragraph(pipe, styles['PipelineCat']),
            Paragraph(snum, styles['PipelineStepNum']),
            Paragraph(sname, styles['PipelineStepName']),
            Paragraph(role, styles['PipelineRole']),
            Paragraph(action, styles['PipelineAction']),
            Paragraph(gate, styles['PipelineGate'])
        ])

    t_master_pipe = Table(
        pipeline_table_data,
        colWidths=[USABLE_WIDTH * 0.17, USABLE_WIDTH * 0.05, USABLE_WIDTH * 0.21, USABLE_WIDTH * 0.14, USABLE_WIDTH * 0.23, USABLE_WIDTH * 0.20]
    )
    t_master_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_BG_HEADER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BLACK),
        ('INNERGRID', (0,0), (-1,-1), 0.3, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 1.1),
        ('BOTTOMPADDING', (0,0), (-1,-1), 1.1),
        ('LEFTPADDING', (0,0), (-1,-1), 2),
        ('RIGHTPADDING', (0,0), (-1,-1), 2),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('LINEBELOW', (0,0), (-1,0), 1, COLOR_BLACK),
        ('BACKGROUND', (0,1), (-1,6), COLOR_WHITE),
        ('BACKGROUND', (0,7), (-1,10), COLOR_BG_LIGHT),
        ('BACKGROUND', (0,11), (-1,13), COLOR_WHITE),
        ('BACKGROUND', (0,14), (-1,17), COLOR_BG_LIGHT),
        ('BACKGROUND', (0,18), (-1,20), COLOR_WHITE),
        ('LINEBELOW', (0,6), (-1,6), 0.8, COLOR_BORDER),
        ('LINEBELOW', (0,10), (-1,10), 0.8, COLOR_BORDER),
        ('LINEBELOW', (0,13), (-1,13), 0.8, COLOR_BORDER),
        ('LINEBELOW', (0,17), (-1,17), 0.8, COLOR_BORDER),
    ]))
    story.append(t_master_pipe)
    story.append(Spacer(1, 1*mm))

    banner_text = "<b>MANDATORY EDIT & AUDIT POLICY:</b> ZERO DELETE OPTION &bull; EDITS PERMITTED AT ALL STEPS WITH MANDATORY REASON ENTRY &bull; ALL CORRECTIONS, INPUTS & UPLOADS RECORDED FORENSICALLY IN PMO AUDIT LOG"
    banner_table = Table([[Paragraph(banner_text, styles['PipelineBanner'])]], colWidths=[USABLE_WIDTH])
    banner_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_HEADER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 2),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
    ]))
    story.append(banner_table)
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: SECTORS & THE 5 SYNCHRONIZED OPERATIONAL PIPELINES
    # =========================================================================
    story.append(Paragraph("NIRT SOLAR EPC \u2014 SIMPLE OPERATIONS GUIDE", styles['DocTitle']))
    story.append(Paragraph("SECTOR EXECUTION & THE 5 CORE OPERATIONAL PIPELINES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    story.append(Paragraph(
        "<b>Core Operating Reality:</b> Solar projects move across <b>5 synchronized pipelines</b> covering <b>20 sequential steps</b>. "
        "Every department handles specific steps, ensuring complete visibility from lead intake to final central subsidy credit.",
        styles['BodyComfort']
    ))
    story.append(Spacer(1, 2*mm))

    # The 4 Sectors
    sectors_box = [
        Paragraph("<b>THE 4 KEY SECTORS NIRT EXECUTES:</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("&bull; <b>Residential Homes:</b> Concrete slab & sloped roofs, wiping out domestic power bills under PM Surya Ghar.<br/>"
                  "&bull; <b>Commercial Complexes:</b> Hospitals, schools, colleges, showrooms, and retail hubs cutting daytime commercial tariffs.<br/>"
                  "&bull; <b>Industrial Factories & Mills:</b> Manufacturing sheds, spinning mills, and cold storages slashing peak demand charges.<br/>"
                  "&bull; <b>Farm Lands & Agro-Solar:</b> Agricultural borewells, solar water pumps (PM-KUSUM), and ground installations.", styles['BodyComfort'])
    ]
    t_sectors = Table([[sectors_box]], colWidths=[USABLE_WIDTH])
    t_sectors.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_sectors)
    story.append(Spacer(1, 2*mm))

    # The 5 Pipelines Synchronized with Page 1
    pipe_box = [
        Paragraph("<b>THE 5 OPERATIONAL PIPELINES (HOW WORK MOVES ACROSS STEPS 01 TO 20):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. Sales & Feasibility Pipeline (Steps 01 to 06):</b> Lead intake \u2192 Qualification (A/B/C/D) \u2192 Site survey & 4 photos \u2192 System SLD & DPR \u2192 Quotation sizing \u2192 Customer Order.", styles['BodyComfort']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>2. Advance & Approvals Pipeline (Steps 07 to 10):</b> Accounts clears 80% Advance UTR \u2192 KYC Locker \u2192 TANGEDCO online portal filing \u2192 Grid feasibility sanction.", styles['BodyComfort']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>3. Procurement & Store Pipeline (Steps 11 to 13):</b> Tier-1 vendor PO issuance \u2192 Warehouse QC & serial numbering (GRN) \u2192 Dispatch to site with delivery challan.", styles['BodyComfort']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>4. EPC Site Execution Pipeline (Steps 14 to 17):</b> Galvanized structure mounting \u2192 Inverter & earthing (<5 \u03a9) \u2192 10% On Installation payment \u2192 Net-meter grid sync.", styles['BodyComfort']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>5. Closure & Subsidy Pipeline (Steps 18 to 20):</b> 10% Final balance collected (Balance = Rs. 0) \u2192 PM Surya Ghar claim submission \u2192 DBT credit to customer bank.", styles['BodyComfort'])
    ]
    t_pipe = Table([[pipe_box]], colWidths=[USABLE_WIDTH])
    t_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_pipe)
    story.append(Spacer(1, 2*mm))

    # The 3 Golden Money Rules
    rule_box = [
        Paragraph("<b>THE 3 MANDATORY PAYMENT GATES (80 / 10 / 10 CASHFLOW PROTECTION):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. First Payment (80% Advance \u2014 Step 07):</b> Paid upon order confirmation. "
                  "<b>Hard Gate: No factory PO or material dispatch is permitted until Accounts confirms the bank receipt.</b>", styles['BodyComfortBold']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>2. Second Payment (10% On Installation \u2014 Step 16):</b> Collected immediately after mechanical mounting, "
                  "inverter placement, and DC/AC cabling are finished on site before the utility net-meter inspection.", styles['BodyComfort']),
        Spacer(1, 0.5*mm),
        Paragraph("<b>3. Final Payment (10% Final Settlement \u2014 Step 18):</b> Cleared upon bi-directional net-meter sync. "
                  "Customer balance becomes <b>Rs. 0.00</b>.<br/>"
                  "<i>Note: Central DBT subsidy (Rs. 30,000 to Rs. 78,000) is paid directly by government to customer bank account. "
                  "The customer pays 100% of the project contract value directly to NIRT.</i>", styles['BodyComfort'])
    ]
    t_rule = Table([[rule_box]], colWidths=[USABLE_WIDTH])
    t_rule.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_rule)

    # =========================================================================
    # PAGE 3: QUALIFYING LEADS & FEASIBILITY AUDIT (STEPS 02 & 03)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("QUALIFYING LEADS & FEASIBILITY AUDIT (STEPS 02 & 03)", styles['DocTitle']))
    story.append(Paragraph("SECTOR VIABILITY CRITERIA, DROP REASONS & 4-POINT PHOTO SURVEY", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    story.append(Paragraph(
        "Sales and engineering evaluate every project based on practical sector requirements. "
        "Separating viable clients from unviable proposals keeps field operations efficient and profitable:",
        styles['BodyComfort']
    ))
    story.append(Spacer(1, 2*mm))

    # Sector Qualification Box (Step 02)
    qual_box = [
        Paragraph("<b>STEP 02: LEAD QUALIFICATION CRITERIA & OUTCOMES:</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. QUALIFIED PROSPECTS (PROCEED TO STEP 03 SITE SURVEY):</b><br/>"
                  "&bull; <b>Residential Homes (PM Surya Ghar):</b> Property owner with active EB connection seeking to zero out power bills.<br/>"
                  "&bull; <b>Commercial Complexes:</b> Showrooms, hospitals, schools, and offices running heavy daytime loads.<br/>"
                  "&bull; <b>Industrial Plants & Mills:</b> Manufacturing sheds and spinning mills seeking to reduce peak HT/LT tariff slabs.<br/>"
                  "&bull; <b>Farm Lands & Agro-Solar:</b> Borewell agricultural pumps (PM-KUSUM) and ground solar installations.", styles['BodyComfort']),
        Spacer(1, 1*mm),
        Paragraph("<b>2. UNQUALIFIED / DROPPED PROPOSALS (LOG REASON IN CRM \u2014 DO NOT PROCEED):</b><br/>"
                  "&bull; <b>Reason 1: Disputed Property / No Landlord NOC:</b> Title in dispute or tenant without registered owner consent.<br/>"
                  "&bull; <b>Reason 2: Structurally Unsafe Roof:</b> Fragile or corroded metal sheets unable to carry structure and wind load.<br/>"
                  "&bull; <b>Reason 3: Permanent Sun Obstruction:</b> Heavy shading from tall adjacent buildings or dense trees.<br/>"
                  "&bull; <b>Reason 4: Local Transformer Saturation:</b> Local TANGEDCO distribution transformer has zero remaining solar quota.<br/>"
                  "&bull; <b>Reason 5: Out of Territory:</b> Outside operational logistics radius. "
                  "<i>(Note: If entered incorrectly, use Edit with Reason to restore).</i>", styles['BodyComfortBold'])
    ]
    t_qual = Table([[qual_box]], colWidths=[USABLE_WIDTH])
    t_qual.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_qual)
    story.append(Spacer(1, 2.5*mm))

    # Technical Feasibility Check Box (Step 03)
    feas_box = [
        Paragraph("<b>STEP 03: ON-SITE TECHNICAL FEASIBILITY & MANDATORY 4 PHOTOS:</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("Before preparing the commercial proposal, the surveyor audits 3 physical engineering parameters and uploads 4 mandatory photos:<br/>"
                  "<b>1. Sanctioned Electrical Load:</b> Record consumer number, sanctioned kW, 1-Phase vs 3-Phase LT / HT, and breaker capacity.<br/>"
                  "<b>2. Tape Dimensions & Shadow:</b> Measure terrace length x width (usable sq.ft), mumty/tank height, and South orientation.<br/>"
                  "<b>3. Cable Routing & Inverter Wall:</b> Measure DC/AC cable run meters and designate a sheltered wall for inverter and DB boxes.<br/>"
                  "<b>MANDATORY 4 PHOTOS UPLOADED:</b> [1] Panoramic Roof Area, [2] TANGEDCO EB Energy Meter, [3] Main Distribution Board (DB), [4] Inverter Mounting Wall.<br/>"
                  "<i>Correction Rule: If dimensions or photos are wrongly recorded, submit Edit with Reason in CRM to update.</i>", styles['BodyComfort'])
    ]
    t_feas = Table([[feas_box]], colWidths=[USABLE_WIDTH])
    t_feas.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_feas)

    # =========================================================================
    # PAGE 4: ROLE 1 (MANAGEMENT) & ROLE 2 (SALES)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: MANAGEMENT & SALES", styles['DocTitle']))
    story.append(Paragraph("SYNCHRONIZED OPERATIONAL ROLES, OWNED STEPS & STAGE GATES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Role 1: Business Owner / Management
    r1_stats = [
        ("Monthly Sales Booked", "Rs. 48.2 Lakhs"),
        ("Active Ongoing Sites", "42 Sites"),
        ("Profit Margin Yield", "22.4 %"),
        ("Cash Stuck in Field", "Rs. 0.00")
    ]
    r1_charts = [
        ("Monthly Revenue & Margin Trend", "Bar-Line Chart", "May: Rs. 32L (21%) | Jun: Rs. 36L (22%) | Jul: Rs. 41L (22%) | Aug: Rs. 44L (23%) | Oct: Rs. 48.2L (22.4%)"),
        ("Sales by Customer Category", "Donut Chart", "Residential PM Surya Ghar: 62% | Commercial LT/HT: 28% | Solar Water Pumps & Farms: 10%"),
        ("5-Pipeline System Balance", "Stacked Bar", "P1 Sales: 18 leads | P2 Approvals: 9 | P3 Procurement: 6 | P4 Execution: 12 | P5 Subsidy: 7")
    ]
    r1_daily = [
        "<b>Steps 01 to 20 Governance:</b> Inspect 5-Pipeline Master Board daily; track projects pending Step 07 Advance or Step 17 Net-Meter Sync.",
        "<b>Step 05 Discount Approval:</b> Authorize commercial discounts or custom payment terms for factories/complexes before sales dispatches quote.",
        "<b>Audit Log Oversight:</b> Review immutable system audit ledger daily; inspect all 'Edit with Reason' entries for complete operational transparency."
    ]
    story.extend(create_role_card_with_charts(
        "1", "Managing Director / Business Owner", "Executive Strategy & Project Governance",
        "All 5 Pipelines (Master Oversight)", "All 20 Steps (Executive Authority)",
        r1_stats, r1_charts, r1_daily, styles
    ))

    # Role 2: Field Sales Representative
    r2_stats = [
        ("New Leads Assigned", "28 Customers"),
        ("Surveys Booked", "8 Sites"),
        ("Unqualified / Dropped", "6 Inquiries"),
        ("Deals Won (80% Paid)", "Rs. 64.5 Lakhs")
    ]
    r2_charts = [
        ("Sales Funnel Progression", "Funnel Chart", "Inquiries (28) \u2192 Qualified (22) \u2192 Survey Done (14) \u2192 Quote Sent (10) \u2192 Won / 80% Paid (6)"),
        ("Step 02 Disqualification Audit", "Donut Chart", "No Property Title/NOC (35%) | Unsafe Roof (25%) | Grid Saturated (20%) | Extreme Shadow (20%)"),
        ("Lead Source Performance", "Bar Chart", "WhatsApp Campaigns (32%) | Customer References (28%) | Direct Walk-ins (22%) | Electrical Contractors (18%)")
    ]
    r2_daily = [
        "<b>Step 01 (Lead Inward):</b> Input customer name, phone, circle, and EB consumer number. Real-time engine prevents duplicate entries.",
        "<b>Step 02 (Qualification):</b> Verify viability. Assign Qualified (Cat A/B/C) or archive as Unqualified (Cat D Dropped) with mandatory reason.",
        "<b>Steps 05 & 06 (Quote & Order):</b> Generate official BOM proposal, secure signed Work Order, allocate Project ID, and route to Accounts for Step 07.",
        "<b>Edit Rule:</b> If customer contact, address, or load was typed wrongly, click 'Edit' and enter a mandatory reason (logged to PMO Audit)."
    ]
    story.extend(create_role_card_with_charts(
        "2", "Field Sales Representative", "Customer Acquisition & Quotation Sizing",
        "Pipeline 1: Sales & Feasibility", "Steps 01, 02, 05, 06",
        r2_stats, r2_charts, r2_daily, styles
    ))

    # =========================================================================
    # PAGE 5: ROLE 3 (SURVEY) & ROLE 4 (PROCUREMENT)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: SURVEY & PROCUREMENT", styles['DocTitle']))
    story.append(Paragraph("SYNCHRONIZED OPERATIONAL ROLES, OWNED STEPS & STAGE GATES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Role 3: Site Survey Engineer
    r3_stats = [
        ("Surveys Today", "6 Scheduled"),
        ("Surveys Completed MTD", "22 Sites"),
        ("Unfeasible / Rejected", "2 Sites"),
        ("Avg Time per Survey", "2.4 Days")
    ]
    r3_charts = [
        ("Roof & Ground Distribution", "Donut Chart", "RCC Concrete Flat (55%) | Industrial Metal Shed (25%) | Farm Land / Ground (10%) | Superstructure (10%)"),
        ("Electrical Supply Phase", "Bar Chart", "Single-Phase LT: 50% | Three-Phase LT: 40% | High Tension (HT 11kV/22kV): 10%"),
        ("Feasibility Approval Ratio", "Pie Chart", "Feasible Approved: 91% (20 sites) | Load Enhancement Needed: 6% (1 site) | Structurally Rejected: 3% (1 site)")
    ]
    r3_daily = [
        "<b>Step 03 (Physical Survey):</b> Record terrace length x width, usable shadow-free area, mumty height, and South azimuth.",
        "<b>Step 03 (Mandatory 4 Photos):</b> Capture and upload high-res field photos of [1] Roof, [2] EB Meter, [3] DB Panel, and [4] Inverter Wall.",
        "<b>Step 04 Handoff:</b> Measure AC/DC cable distances and submit survey dossier for engineering SLD and CAD layout release.",
        "<b>Edit Rule:</b> If obstacle measurements or photos need correction, use 'Edit with Reason' to log modifications in the audit trail."
    ]
    story.extend(create_role_card_with_charts(
        "3", "Site Survey Engineer", "Field Feasibility & Electrical Audit",
        "Pipeline 1: Sales & Feasibility", "Step 03 (Survey Dossier)",
        r3_stats, r3_charts, r3_daily, styles
    ))

    # Role 4: Purchase & Warehouse Manager
    r4_stats = [
        ("Orders Ready to Pack", "5 Projects"),
        ("Solar Panels in Stock", "180 kW"),
        ("Inverters in Stock", "14 Units"),
        ("Advance 80% Verified", "100 % Orders")
    ]
    r4_charts = [
        ("Warehouse Inventory Stock Level", "Bar Chart", "Mono PERC Panels: 180 kW (Min 50 kW) | Inverters: 14 (Min 5) | DC Cable: 1,200m | Structure: 22 Sets"),
        ("Material Dispatch Turnaround", "Donut Chart", "Same-Day Dispatch (40%) | Within 24 Hours (50%) | Within 48 Hours (10%)"),
        ("Step 07 Gatekeeper Enforcement", "Bar Chart", "100% of dispatched BOMs verified with Accounts 80% Advance UTR (Zero unfunded dispatches)")
    ]
    r4_daily = [
        "<b>Step 11 (Vendor PO):</b> Issue Purchase Orders to Tier-1 module, inverter, and structure vendors only after Accounts clears Step 07 Advance.",
        "<b>Step 12 (Warehouse QC & Inward):</b> Verify supplier deliveries, log serial numbers, and generate Goods Receipt Note (GRN) tagged to Project ID.",
        "<b>Step 13 (Site Dispatch):</b> Kit full BOM, print stamped Delivery Challan, and dispatch vehicle to customer site.",
        "<b>Edit Rule:</b> If PO specs or serial numbers were mistyped, submit 'Edit with Reason' to record the correction in the audit log."
    ]
    story.extend(create_role_card_with_charts(
        "4", "Purchase & Warehouse Manager", "Procurement, QC & Inventory Logistics",
        "Pipeline 3: Procurement & Store", "Steps 11, 12, 13",
        r4_stats, r4_charts, r4_daily, styles
    ))

    # =========================================================================
    # PAGE 6: ROLE 5 (EPC OPS) & ROLE 6 (LIAISON)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: INSTALLATION & TANGEDCO", styles['DocTitle']))
    story.append(Paragraph("SYNCHRONIZED OPERATIONAL ROLES, OWNED STEPS & STAGE GATES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Role 5: EPC Operations Manager
    r5_stats = [
        ("Active Work Sites", "12 Sites"),
        ("Structure & Panels Done", "8 Sites"),
        ("Inverter Tested & Wired", "5 Sites"),
        ("Zero Site Accidents", "420 Days")
    ]
    r5_charts = [
        ("Active Site Milestones", "Stacked Bar", "Structure Erected (12 sites) \u2192 Panels Clamped (10 sites) \u2192 Inverter Wired (8 sites) \u2192 Tested (5 sites)"),
        ("Earthing Resistance Log (&le; 5 &Omega;)", "Donut Chart", "Below 2 Ohms: 60% | 2 to 4 Ohms: 35% | 4 to 5 Ohms: 5% | Above 5 Ohms (Fail): 0%"),
        ("Weekly Site Crew Output", "Bar Chart", "Team Alpha (Urban Sites): 18 kW | Team Beta (Industrial Sheds): 15 kW | Team Gamma (Rural/Farms): 12 kW")
    ]
    r5_daily = [
        "<b>Step 14 (Civil & Mechanical):</b> Anchor GI structure legs, torque-clamp solar modules, and waterproof roof penetrations.",
        "<b>Step 15 (Electrical & Inverter):</b> Mount inverter, run DC/AC cables in UV conduits, and test chemical earth pit resistance (< 5 \u03a9).",
        "<b>Step 16 Milestone Alert:</b> Complete electrical checklist, record string VOC/ISC, and alert Accounts to collect 10% On Installation.",
        "<b>Edit Rule:</b> If torque values or earth resistance readings are entered wrongly, use 'Edit with Reason' to log corrected data."
    ]
    story.extend(create_role_card_with_charts(
        "5", "EPC Operations Manager", "Field Construction & Quality Assurance",
        "Pipeline 4: EPC Site Execution", "Steps 14 & 15",
        r5_stats, r5_charts, r5_daily, styles
    ))

    # Role 6: TANGEDCO Liaison Officer
    r6_stats = [
        ("Applications Filed", "16 Sites"),
        ("Feasibility Approved", "11 Sites"),
        ("Meters for Install", "7 Sites"),
        ("Avg Approval Time", "12.4 Days")
    ]
    r6_charts = [
        ("TANGEDCO Utility Funnel", "Funnel Chart", "Form 1 Submitted (16) \u2192 Feasibility Approved (11) \u2192 Meter Fee Paid (9) \u2192 Meter Sync (7)"),
        ("Approval Speed by Section Office", "Bar Chart", "Section Office A: 10 Days | Section Office B: 12 Days | Section Office C: 14 Days | Section Office D: 13 Days"),
        ("Bi-Directional Meter Readiness", "Donut Chart", "Single-Phase Net Meters Ready (12 units) | Three-Phase Net Meters Ready (8 units)")
    ]
    r6_daily = [
        "<b>Step 08 & 09 (KYC & DISCOM Filing):</b> Assemble KYC documents in digital locker; submit online Form 1 application to TANGEDCO portal.",
        "<b>Step 10 (Feasibility Sanction):</b> Coordinate with local Assistant Engineer (AE) for transformer load inspection; upload sanction letter.",
        "<b>Step 17 (Net Metering Sync):</b> Witness bi-directional net-meter installation, secure signed Joint Commissioning Report (JCR), and upload to CRM.",
        "<b>Edit Rule:</b> If DISCOM application number or sanction reference was mistyped, submit 'Edit with Reason' to correct."
    ]
    story.extend(create_role_card_with_charts(
        "6", "TANGEDCO Liaison Officer", "Utility Approvals & Grid Synchronization",
        "Pipeline 2 (Approvals) & Pipeline 4 (Sync)", "Steps 08, 09, 10, 17",
        r6_stats, r6_charts, r6_daily, styles
    ))

    # =========================================================================
    # PAGE 7: ROLE 7 (ACCOUNTS) & ROLE 8 (SUBSIDY)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: ACCOUNTS & SUBSIDY", styles['DocTitle']))
    story.append(Paragraph("SYNCHRONIZED OPERATIONAL ROLES, OWNED STEPS & STAGE GATES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Role 7: Finance & Accounts Officer
    r7_stats = [
        ("Cash Collected MTD", "Rs. 78.4 Lakhs"),
        ("80% Advances Cleared", "18 Projects"),
        ("Overdue Customer Balance", "Rs. 0.00"),
        ("Tax GST Reconciled", "100 % Clean")
    ]
    r7_charts = [
        ("80 / 10 / 10 Cash Inflow Ratio", "Donut Chart", "80% Upfront Advance (78% of cash) | 10% Assembly Balance (12%) | 10% Net-Meter Final (10%)"),
        ("Payment Mode Breakdown", "Bar Chart", "Bank NEFT / RTGS Transfers: 68% | Digital UPI / QR: 22% | Cheque Clearance: 10%"),
        ("Customer Receivables Aging", "Bar Chart", "Current / Zero Balance: 96% | Under 7 Days Pending: 4% | Over 7 Days Past-Due: 0%")
    ]
    r7_daily = [
        "<b>Step 07 (80% Advance Gatekeeper):</b> Match bank NEFT/RTGS credit, enter UTR, and clear Stage 7 to unlock warehouse material procurement.",
        "<b>Step 16 (10% On Installation):</b> Log customer payment receipt as soon as mounting and inverter cabling are completed on site.",
        "<b>Step 18 (10% Final Balance):</b> Collect final 10% on net-meter sync, reconcile balance to Rs. 0.00, and issue final tax invoice.",
        "<b>Edit Rule:</b> If UTR reference or payment amount is entered with a typo, use 'Edit with Reason' to log correction in audit trail."
    ]
    story.extend(create_role_card_with_charts(
        "7", "Finance & Accounts Officer", "Commercial Gatekeeper & Milestone Billing",
        "Commercial Gatekeeper (Pipelines 2, 4, 5)", "Steps 07, 16, 18 (Hard Gates)",
        r7_stats, r7_charts, r7_daily, styles
    ))

    # Role 8: Central Subsidy Coordinator
    r8_stats = [
        ("National Portal Claims", "34 Claims"),
        ("Subsidy Approved / Paid", "26 Grants"),
        ("Subsidy Benefit Received", "Rs. 19.8 Lakhs"),
        ("Avg Days to Bank Credit", "21.0 Days")
    ]
    r8_charts = [
        ("Subsidy Claims by Tier", "Donut Chart", "1 kW (Rs. 30,000 benefit): 15% | 2 kW (Rs. 60,000 benefit): 25% | 3 kW+ (Rs. 78,000 benefit): 60%"),
        ("National Portal Stage Speed", "Funnel Chart", "Registered (34) \u2192 Feasibility Cleared (31) \u2192 JCR Uploaded (28) \u2192 Subsidy Disbursed (26)"),
        ("Aadhaar Bank Link Verification", "Pie Chart", "Verified Bank Account (97%) | Correction / Re-upload Needed (3%) | Rejected: 0%")
    ]
    r8_daily = [
        "<b>Step 19 (National Portal Claim):</b> Register eligible residential customer on PM Surya Ghar portal using electricity consumer number and Aadhaar.",
        "<b>Step 19 (Documentation Upload):</b> Upload signed JCR commissioning report, installed bi-directional meter photo, and inverter serial number.",
        "<b>Step 20 (DBT Verification):</b> Monitor central DBT transfer queue; confirm credit with customer bank statement and log transaction UTR.",
        "<b>Edit Rule:</b> If portal claim reference or bank IFSC was mistyped, submit 'Edit with Reason' to correct."
    ]
    story.extend(create_role_card_with_charts(
        "8", "Central Subsidy Coordinator", "PM Surya Ghar Consumer DBT Administration",
        "Pipeline 5: Closure & Subsidy", "Steps 19 & 20",
        r8_stats, r8_charts, r8_daily, styles
    ))

    # =========================================================================
    # PAGE 8: ROLE 9 (PROJECT COORDINATOR) & DEPARTMENT RESPONSIBILITY MATRIX
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("PROJECT COORDINATOR & RESPONSIBILITY MATRIX", styles['DocTitle']))
    story.append(Paragraph("CENTRAL STAGE-GATE GOVERNANCE ACROSS STEPS 01 TO 20", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Role 9: Project Coordinator (PMO)
    r9_stats = [
        ("On-Time Completion Rate", "96.2 %"),
        ("Sites Delayed / Stuck", "0 Sites"),
        ("Immutable Audit Logs MTD", "184 Events"),
        ("Customer Feedback Score", "4.9 / 5.0")
    ]
    r9_charts = [
        ("Projects Across 5 Pipelines", "Horizontal Bar", "P1 Sales: 18 | P2 Approvals: 9 | P3 Procurement: 6 | P4 Execution: 12 | P5 Subsidy: 7"),
        ("Average Handover Time (TAT)", "Bar Chart", "Lead to Survey: 1.8 Days | Survey to Quote: 1.0 Day | Advance to Pack: 2.2 Days | Install to Meter: 12.4 Days"),
        ("Departmental On-Time Score", "Scoreboard", "Sales (98%) | Survey (96%) | Warehouse (99%) | Site EPC (95%) | Liaison (92%) | Accounts (100%)")
    ]
    r9_daily = [
        "<b>SLA Velocity Oversight:</b> Track cross-department handoffs (Sales to Survey \u2264 24h, Accounts to Warehouse \u2264 24h, Install to Meter \u2264 12d).",
        "<b>Step 20 (Triple Project Closure):</b> Verify Technical Closure (Step 17), Commercial Closure (Step 18), and Subsidy Closure (Step 20).",
        "<b>Audit Trail Oversight:</b> Inspect daily immutable audit log to review all staff actions, edits with reason, and stage gate clearances."
    ]
    story.extend(create_role_card_with_charts(
        "9", "Project Coordinator (Central PMO)", "Central Project Management Office (PMO)",
        "Central Stage-Gate Governance", "All 20 Steps & Step 20 Triple Closure",
        r9_stats, r9_charts, r9_daily, styles
    ))

    # Synchronized Department Responsibility Table
    story.append(Paragraph("<b>DEPARTMENTAL RESPONSIBILITY MATRIX (MAPPED TO STEPS 01 TO 20):</b>", styles['SubTitle']))
    matrix_simple = [
        [Paragraph("<b>Department</b>", styles['BodyComfortBold']),
         Paragraph("<b>Primary Role</b>", styles['BodyComfortBold']),
         Paragraph("<b>Owned Steps (Page 1)</b>", styles['BodyComfortBold']),
         Paragraph("<b>Key Deliverable / Gate Output</b>", styles['BodyComfortBold'])],
        [Paragraph("1. Sales", styles['BodyComfort']), Paragraph("Sales Executive", styles['BodyComfort']), Paragraph("Steps 01, 02, 05, 06", styles['BodyComfort']), Paragraph("Signed Work Order & Project ID Generated")],
        [Paragraph("2. Engineering", styles['BodyComfort']), Paragraph("Site Surveyor & Design Eng", styles['BodyComfort']), Paragraph("Steps 03, 04", styles['BodyComfort']), Paragraph("Survey Dossier (4 Photos) & Stamped SLD")],
        [Paragraph("3. Accounts", styles['BodyComfort']), Paragraph("Accounts Executive", styles['BodyComfort']), Paragraph("Steps 07, 16, 18", styles['BodyComfort']), Paragraph("80% Advance Clearance & Balance = Rs. 0")],
        [Paragraph("4. Liaison", styles['BodyComfort']), Paragraph("TANGEDCO Officer", styles['BodyComfort']), Paragraph("Steps 08, 09, 10, 17", styles['BodyComfort']), Paragraph("DISCOM Sanction & Net-Meter Grid Sync")],
        [Paragraph("5. Purchase & Stores", styles['BodyComfort']), Paragraph("Warehouse Manager", styles['BodyComfort']), Paragraph("Steps 11, 12, 13", styles['BodyComfort']), Paragraph("Factory PO, Inward GRN & Delivery Challan")],
        [Paragraph("6. Installation (EPC)", styles['BodyComfort']), Paragraph("EPC Site Operations", styles['BodyComfort']), Paragraph("Steps 14, 15", styles['BodyComfort']), Paragraph("Structure Erected & Inverter Earthing < 5 \u03a9")],
        [Paragraph("7. Subsidy Desk", styles['BodyComfort']), Paragraph("Subsidy Coordinator", styles['BodyComfort']), Paragraph("Steps 19, 20", styles['BodyComfort']), Paragraph("National Portal Claim & DBT Bank Credit")],
        [Paragraph("8. Central PMO", styles['BodyComfort']), Paragraph("Project Coordinator", styles['BodyComfort']), Paragraph("Steps 01 to 20 Oversight", styles['BodyComfort']), Paragraph("Triple Project Closure & Audit Integrity")]
    ]
    t_mat_simple = Table(matrix_simple, colWidths=[USABLE_WIDTH * 0.20, USABLE_WIDTH * 0.24, USABLE_WIDTH * 0.24, USABLE_WIDTH * 0.32])
    t_mat_simple.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_BG_HEADER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 2.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 2.5),
        ('LEFTPADDING', (0,0), (-1,-1), 4),
        ('RIGHTPADDING', (0,0), (-1,-1), 4),
    ]))
    story.append(t_mat_simple)

    # =========================================================================
    # PAGE 9: VERIFICATION, THE 3 CLOSURES & IMMUTABLE AUDIT LOG
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("SITE VERIFICATION, CLOSURES & AUDIT LOG", styles['DocTitle']))
    story.append(Paragraph("THE 3 MANDATORY CLOSURES & FORENSIC AUDIT TRAIL ARCHITECTURE", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=5))

    # Field Verification Guidelines Box
    p9_field = [
        Paragraph("<b>CORE FIELD VERIFICATION GUIDELINES (TIED TO PIPELINE GATES):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("&bull; <b>Before Quotation (Step 03):</b> Surveyor inspects EB meter sanctioned load, roof shadow azimuth, and inverter wall location.<br/>"
                  "&bull; <b>Before Procurement (Step 07):</b> Accounts confirms bank UTR credit for the 80% Advance payment.<br/>"
                  "&bull; <b>During Assembly (Steps 14 & 15):</b> EPC team checks structure bolt torque, UV conduit protection, and earthing resistance (&le; 5 &Omega;).<br/>"
                  "&bull; <b>During Grid Sync (Step 17):</b> Liaison officer witnesses TANGEDCO bi-directional net-meter installation and gets official inspection report signed.", styles['BodyComfort'])
    ]
    t_field = Table([[p9_field]], colWidths=[USABLE_WIDTH])
    t_field.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_field)
    story.append(Spacer(1, 2.5*mm))

    # The 3 Closures Box
    p9_closures = [
        Paragraph("<b>THE 3 MANDATORY PROJECT CLOSURES (STEP 20 FORMAL COMPLETION):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. Technical Closure (Step 17):</b> Solar panels generating power, net-meter synchronized, and TANGEDCO AE signs Joint Commissioning Report.<br/>"
                  "<b>2. Commercial Closure (Step 18):</b> Customer has cleared 100% contract value (80% + 10% + 10%). Accounts confirms customer balance is <b>Rs. 0.00</b>.<br/>"
                  "<b>3. Subsidy Closure (Step 20):</b> Commissioning report uploaded to National Portal, and Central DBT subsidy is credited into customer's bank account.", styles['BodyComfort'])
    ]
    t_closures = Table([[p9_closures]], colWidths=[USABLE_WIDTH])
    t_closures.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_closures)
    story.append(Spacer(1, 2.5*mm))

    # Customer Handover Folder Content
    p9_handover = [
        Paragraph("<b>WHAT IS HANDED OVER TO THE CUSTOMER IN THEIR HARD-BOUND DOSSIER:</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("&bull; <b>25-Year Solar Panel Warranty:</b> Factory serial numbers matched with installed TopCon / Mono-PERC panels.<br/>"
                  "&bull; <b>Inverter 5/10-Year Warranty Card:</b> OEM warranty certificate with customer Wi-Fi monitoring portal credentials.<br/>"
                  "&bull; <b>Single Line Wiring Diagram (SLD):</b> Stamped electrical schematic showing DC/AC conduits and safety disconnects.<br/>"
                  "&bull; <b>TANGEDCO Net-Meter Inspection Report:</b> Official utility bi-directional commissioning record.<br/>"
                  "&bull; <b>Emergency Solar Manual:</b> How to clean panels safely with water, and how to operate the DC isolation safety switch.", styles['BodyComfort'])
    ]
    t_handover = Table([[p9_handover]], colWidths=[USABLE_WIDTH])
    t_handover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_handover)
    story.append(Spacer(1, 2.5*mm))

    # Immutable PMO Audit Log Governance Box
    p9_audit = [
        Paragraph("<b>SYSTEM AUDIT LOG & COMPLIANCE GOVERNANCE (PMO VISIBLE ONLY \u2014 NO DELETE OPTION):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. Strictly Append-Only (Zero Delete Option):</b> Every operational action across all 9 roles is written permanently to the system audit ledger. "
                  "No role, technician, or administrator has permission to delete historical audit records.<br/>"
                  "<b>2. Visible Only to PMO & Executive Leadership:</b> The audit trail is restricted strictly to the Project Coordinator (Central PMO) and Managing Director. "
                  "It is completely hidden from operational roles (Sales, Survey, Warehouse, EPC Ops, Liaison, and Accounts).<br/>"
                  "<b>3. 'Edit with Reason' Tracking:</b> If a user enters wrong data at any step (e.g. wrong EB number, incorrect load, or typo in UTR), they can edit by submitting a mandatory reason. "
                  "The system forensically records Date/Timestamp (IST), Staff Name, Role, Project ID, Previous Value \u2192 New Value, and Reason for Edit.", styles['BodyComfort'])
    ]
    t_audit = Table([[p9_audit]], colWidths=[USABLE_WIDTH])
    t_audit.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 6),
        ('RIGHTPADDING', (0,0), (-1,-1), 6),
    ]))
    story.append(t_audit)

    # Build Document
    doc.build(story, canvasmaker=SimpleMonochromeCanvas)
    print(f"Simple Monochrome Guide generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()
