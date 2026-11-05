"""
NIRT Solar EPC - Simple Operating Guide (Monochrome, Large Font, Plain English)
Specifically tailored for non-technical business owners (40+ age group).
Footer: 'Powered by ACHISE'.
Covers all sectors: Residential, Commercial, Industrial Factories, and Farm Lands / Agro-Solar.
Removed the negative 200 units free restriction; replaced with universal industrial/commercial/farm qualification criteria.
Zero color (Strictly Monochrome), 100% Native ReportLab (No HTML).
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

# Page metrics
PAGE_WIDTH, PAGE_HEIGHT = A4
MARGIN = 13 * mm
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
            self.line(MARGIN, PAGE_HEIGHT - 10 * mm, PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 10 * mm)
            self.setFont("Helvetica-Bold", 8.5)
            self.setFillColor(COLOR_DARK)
            self.drawString(MARGIN, PAGE_HEIGHT - 8 * mm, "NIRT SOLAR EPC \u2014 SIMPLE OPERATIONS & DASHBOARDS GUIDE")
            self.drawRightString(PAGE_WIDTH - MARGIN, PAGE_HEIGHT - 8 * mm, "ROLE-BY-ROLE MANUAL")

        # Footer on all pages: Powered by ACHISE instead of NIRT
        self.line(MARGIN, 10 * mm, PAGE_WIDTH - MARGIN, 10 * mm)
        self.setFont("Helvetica-Bold", 8.5)
        self.setFillColor(COLOR_DARK)
        self.drawString(MARGIN, 7 * mm, "Powered by ACHISE")
        self.setFont("Helvetica", 8.5)
        self.setFillColor(COLOR_MUTED)
        self.drawRightString(PAGE_WIDTH - MARGIN, 7 * mm, f"Page {self._pageNumber} of {total_pages}")
        self.restoreState()


def get_styles():
    styles = getSampleStyleSheet()
    
    styles.add(ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=17,
        leading=21,
        textColor=COLOR_BLACK,
        spaceAfter=2
    ))
    styles.add(ParagraphStyle(
        'DocSubtitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10,
        leading=13,
        textColor=COLOR_MUTED,
        spaceAfter=6
    ))
    styles.add(ParagraphStyle(
        'SectionTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=COLOR_BLACK,
        spaceBefore=2,
        spaceAfter=2
    ))
    styles.add(ParagraphStyle(
        'SubTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=9.5,
        leading=13,
        textColor=COLOR_DARK,
        spaceBefore=1.5,
        spaceAfter=1.5
    ))
    styles.add(ParagraphStyle(
        'BodyComfort',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_DARK
    ))
    styles.add(ParagraphStyle(
        'BodyComfortBold',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=8.5,
        leading=11.5,
        textColor=COLOR_BLACK
    ))
    styles.add(ParagraphStyle(
        'StatVal',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=15,
        textColor=COLOR_BLACK,
        alignment=1
    ))
    styles.add(ParagraphStyle(
        'StatLbl',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=7.5,
        leading=10,
        textColor=COLOR_MUTED,
        alignment=1
    ))
    return styles


def create_simple_stats_row(stats, styles):
    """Creates a clean, spacious 4-stat box row with large readable numbers."""
    cells = []
    for label, val in stats:
        content = [
            Paragraph(val, styles['StatVal']),
            Spacer(1, 0.8*mm),
            Paragraph(f"<b>{label}</b>", styles['StatLbl'])
        ]
        cells.append(content)
        
    t = Table([cells], colWidths=[USABLE_WIDTH / 4.0] * 4)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4),
        ('LEFTPADDING', (0,0), (-1,-1), 3),
        ('RIGHTPADDING', (0,0), (-1,-1), 3),
        ('VALIGN', (0,0), (-1,-1), 'MIDDLE'),
        ('ALIGN', (0,0), (-1,-1), 'CENTER'),
    ]))
    return t


def create_role_card_with_charts(role_num, role_title, plain_role, pipeline, stats, charts_data, daily_actions, styles):
    """Role cockpit with explicit Dashboard Charts, sample data, and pipeline details."""
    head_p = Paragraph(f"<b>ROLE {role_num}: {role_title.upper()}</b>", styles['SectionTitle'])
    sub_p = Paragraph(f"<b>Department & Everyday Job:</b> {plain_role}<br/><br/><b>Active Operating Pipeline:</b> <u>{pipeline}</u>", styles['BodyComfortBold'])
    
    stats_t = create_simple_stats_row(stats, styles)
    
    # 2 Columns: Dashboard Charts with Live Data vs Daily Action Steps
    left_content = [
        Paragraph("<b>What This Role Sees on Their Dashboard (Live Charts & Data):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm)
    ]
    for ch_title, ch_type, ch_data in charts_data:
        left_content.append(Paragraph(f"&bull; <b>{ch_title}</b> <i>({ch_type})</i>:<br/>&nbsp;&nbsp;{ch_data}", styles['BodyComfort']))
        left_content.append(Spacer(1, 1*mm))
        
    right_content = [
        Paragraph("<b>Daily Action Steps (What to do from Morning to Evening):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm)
    ]
    for i, act in enumerate(daily_actions, 1):
        right_content.append(Paragraph(f"<b>Step {i}:</b> {act}", styles['BodyComfort']))
        right_content.append(Spacer(1, 1.2*mm))
        
    body_t = Table([
        [left_content, right_content]
    ], colWidths=[USABLE_WIDTH * 0.54, USABLE_WIDTH * 0.46])
    body_t.setStyle(TableStyle([
        ('VALIGN', (0,0), (-1,-1), 'TOP'),
        ('BACKGROUND', (0,0), (0,0), COLOR_BG_LIGHT),
        ('BACKGROUND', (1,0), (1,0), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    
    return [head_p, sub_p, Spacer(1, 1.5*mm), stats_t, Spacer(1, 1.5*mm), body_t, Spacer(1, 4*mm)]


def build_pdf(filename="D:/Nirt/docs/NIRT_Solar_Standard_Process.pdf"):
    os.makedirs(os.path.dirname(filename), exist_ok=True)
    doc = SimpleDocTemplate(
        filename,
        pagesize=A4,
        leftMargin=MARGIN,
        rightMargin=MARGIN,
        topMargin=MARGIN + 2*mm,
        bottomMargin=MARGIN + 2*mm
    )
    styles = get_styles()
    story = []

    # =========================================================================
    # PAGE 1: SIMPLE SOLAR OPERATIONS ACROSS ALL SECTORS & 4 PIPELINES
    # =========================================================================
    story.append(Paragraph("NIRT SOLAR EPC \u2014 SIMPLE OPERATIONS GUIDE", styles['DocTitle']))
    story.append(Paragraph("HANDBOOK FOR RESIDENTIAL, COMMERCIAL, INDUSTRIAL & FARM LAND PROJECTS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    story.append(Paragraph(
        "<b>Why this guide exists:</b> Solar installation is simple when everyone knows their exact steps. "
        "NIRT delivers solar energy projects across <b>Homes, Commercial Spaces, Industrial Factories, and Farm Lands</b>. "
        "This guide explains how work moves across <b>4 clear pipelines</b> in plain everyday language.",
        styles['BodyComfort']
    ))
    story.append(Spacer(1, 2.5*mm))

    # The 4 Sectors We Serve
    sectors_box = [
        Paragraph("<b>THE 4 KEY SECTORS NIRT EXECUTES:</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("&bull; <b>Residential Homes:</b> Concrete slab & sloped roofs, wiping out domestic electricity bills under PM Surya Ghar.<br/>"
                  "&bull; <b>Commercial Spaces:</b> Hospitals, schools, colleges, showrooms, and retail complexes reducing heavy commercial LT tariffs.<br/>"
                  "&bull; <b>Industrial Factories & Warehouses:</b> Large metal sheds, textile mills, and manufacturing plants slashing peak demand charges.<br/>"
                  "&bull; <b>Farm Lands & Agro-Solar:</b> Agricultural borewells, solar water pumping systems (PM-KUSUM), and ground-mount installations.", styles['BodyComfort'])
    ]
    t_sectors = Table([[sectors_box]], colWidths=[USABLE_WIDTH])
    t_sectors.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_sectors)
    story.append(Spacer(1, 2.5*mm))

    # The 4 Pipelines Plain English Box
    pipe_box = [
        Paragraph("<b>THE 4 OPERATIONAL PIPELINES (HOW WORK FLOWS):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. Sales Pipeline (Pre-Contract):</b> Customer inquiry \u2192 Bill & Load review \u2192 Feasibility inspection \u2192 Quotation \u2192 Deal Won.", styles['BodyComfort']),
        Spacer(1, 0.6*mm),
        Paragraph("<b>2. Project Execution Pipeline (Engineering & Installation):</b> Customer pays 80% \u2192 Warehouse packs equipment \u2192 Site team builds & wires \u2192 Utility connects net-meter.", styles['BodyComfort']),
        Spacer(1, 0.6*mm),
        Paragraph("<b>3. Financial & Settlement Pipeline (Money Flow):</b> 80% Advance on order \u2192 10% on assembly completion \u2192 10% on net-meter sync \u2192 Final Balance is ZERO.", styles['BodyComfort']),
        Spacer(1, 0.6*mm),
        Paragraph("<b>4. PM Surya Ghar Subsidy Pipeline (Government Subsidy):</b> Register on National Portal \u2192 Upload net-meter inspection report \u2192 Government credits subsidy to customer bank.", styles['BodyComfort'])
    ]
    t_pipe = Table([[pipe_box]], colWidths=[USABLE_WIDTH])
    t_pipe.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_pipe)
    story.append(Spacer(1, 2.5*mm))

    # The 3 Golden Money Rules (80 / 10 / 10)
    rule_box = [
        Paragraph("<b>THE 3 SIMPLE MONEY RULES (PROTECT COMPANY CASH):</b>", styles['SubTitle']),
        Spacer(1, 0.8*mm),
        Paragraph("<b>1. First Payment (80% Advance):</b> Customer pays 80% upon contract signing. "
                  "<b>Strict rule: Never order or dispatch solar panels or inverters until Accounts confirms the bank receipt.</b>", styles['BodyComfortBold']),
        Spacer(1, 0.6*mm),
        Paragraph("<b>2. Second Payment (10% Installation Balance):</b> Collected as soon as mounting structures, panels, "
                  "and inverters are mechanically installed and wired at the site before utility inspection.", styles['BodyComfort']),
        Spacer(1, 0.6*mm),
        Paragraph("<b>3. Final Payment (10% Final Balance):</b> Customer clears remaining 10% upon bi-directional net-meter sync. "
                  "Customer balance becomes <b>ZERO</b>.<br/>"
                  "<i>Note: PM Surya Ghar central subsidy (Rs. 30,000 to Rs. 78,000) is credited directly to customer bank account via DBT. "
                  "Customer pays 100% of the project cost directly to NIRT.</i>", styles['BodyComfort'])
    ]
    t_rule = Table([[rule_box]], colWidths=[USABLE_WIDTH])
    t_rule.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_rule)

    # =========================================================================
    # PAGE 2: SECTOR QUALIFICATION & FEASIBILITY (HOMES, C&I, FARMS)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("HOW LEADS & FEASIBILITY WORK ACROSS ALL SECTORS", styles['DocTitle']))
    story.append(Paragraph("QUALIFYING HOMES, COMMERCIAL BUILDINGS, FACTORIES & FARMS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    story.append(Paragraph(
        "Sales and engineering evaluate every project based on practical sector requirements. "
        "Separating ready clients from unviable proposals keeps field operations efficient and profitable:",
        styles['BodyComfort']
    ))
    story.append(Spacer(1, 2.5*mm))

    # Sector Qualification Box
    qual_box = [
        Paragraph("<b>CHECK 1: QUALIFIED PROJECTS ACROSS SECTORS (PROCEED TO SURVEY):</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("&bull; <b>Residential Homes:</b> Building owner with active EB connection, wanting to eliminate high bi-monthly power bills.<br/>"
                  "&bull; <b>Commercial Complexes:</b> Showrooms, hospitals, schools, and offices running high daytime loads (ACs, computers, lighting).<br/>"
                  "&bull; <b>Industrial Plants & Mills:</b> Manufacturing sheds, spinning mills, cold storages cutting peak HT/LT tariff rates.<br/>"
                  "&bull; <b>Farm Lands & Agro-Solar:</b> Agricultural plots, borewell irrigation pumps, and ground installations requiring daytime pumping.", styles['BodyComfort']),
        Spacer(1, 1.5*mm),
        Paragraph("<b>UNQUALIFIED / DROPPED PROPOSALS (LOG REASON IN CRM \u2014 DO NOT WASTE TIME):</b><br/>"
                  "&bull; <b>Reason 1: Disputed Property / No Landlord NOC:</b> Property title in dispute or tenant without registered owner consent.<br/>"
                  "&bull; <b>Reason 2: Structurally Unsafe Roof or Foundation:</b> Severely corroded metal sheets or fragile roofs unable to take structure load.<br/>"
                  "&bull; <b>Reason 3: Permanent Sun Obstruction:</b> Heavy shading from tall adjacent buildings or dense hills blocking solar irradiance.<br/>"
                  "&bull; <b>Reason 4: Local Grid Transformer Saturation:</b> Local TANGEDCO distribution transformer has zero remaining solar capacity.<br/>"
                  "&bull; <b>Reason 5: Unviable Location / Out of Territory:</b> Outside reachable operational logistics and maintenance radius.", styles['BodyComfortBold'])
    ]
    t_qual = Table([[qual_box]], colWidths=[USABLE_WIDTH])
    t_qual.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_qual)
    story.append(Spacer(1, 3*mm))

    # Technical Feasibility Check Box
    feas_box = [
        Paragraph("<b>CHECK 2: TECHNICAL FEASIBILITY (ON-SITE ENGINEERING AUDIT):</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("Before preparing the formal quotation, the site surveyor evaluates 3 practical parameters:<br/>"
                  "<b>1. Sanctioned Electrical Load:</b> Verify service number, connected kW, and whether 1-Phase or 3-Phase. (For larger systems, check if TANGEDCO load enhancement is required).<br/>"
                  "<b>2. Solar Space & Shadow Azimuth:</b> For rooftop: measure clean shadow-free area (approx. 80-100 sq.ft per kW). For farm lands: check ground slope and soil stability.<br/>"
                  "<b>3. Cable Routing & Inverter Placement:</b> Identify shaded, ventilated wall for inverters and safe conduit path to main distribution board.", styles['BodyComfort'])
    ]
    t_feas = Table([[feas_box]], colWidths=[USABLE_WIDTH])
    t_feas.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_feas)

    # =========================================================================
    # PAGE 3: ROLE 1 (BUSINESS OWNER) & ROLE 2 (FIELD SALES)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: MANAGEMENT & SALES", styles['DocTitle']))
    story.append(Paragraph("CLEAR EVERYDAY DUTIES, PIPELINES & DASHBOARD CHARTS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    # Role 1: Business Owner
    r1_stats = [
        ("Monthly Sales Booked", "Rs. 48.2 Lakhs"),
        ("Active Ongoing Sites", "42 Sites"),
        ("Profit Margin Yield", "22.4 %"),
        ("Cash Stuck in Field", "Rs. 0.00")
    ]
    r1_charts = [
        ("Monthly Revenue & Margin Trend", "Bar-Line Chart", "May: Rs. 32L (21%) | Jun: Rs. 36L (22%) | Jul: Rs. 41L (22%) | Aug: Rs. 44L (23%) | Sep: Rs. 46L (22%) | Oct: Rs. 48.2L (22.4%)"),
        ("Sales by Customer Category", "Donut Chart", "Residential PM Surya Ghar: 62% | Commercial LT/HT: 28% | Solar Water Pumps & Farms: 10%"),
        ("Company Pipeline Balance", "Stacked Bar", "Sales Pipeline: 18 leads | Execution Pipeline: 12 sites | Accounts Billing: 7 sites | Subsidy: 5 sites")
    ]
    r1_daily = [
        "Check overall project status board every morning: see how many sites are waiting for materials or TANGEDCO net-meters.",
        "Approve high-value quotations for commercial factories or schools before sales issues the final proposal.",
        "Review weekly bank collections with Accounts: ensure 80% advances are collected before approving factory POs."
    ]
    story.extend(create_role_card_with_charts(
        "1", "Business Owner / Managing Director", "Executive Governance & Strategy Oversight",
        "Quad-Pipeline Consolidated Master View", r1_stats, r1_charts, r1_daily, styles
    ))

    # Role 2: Field Sales Representative
    r2_stats = [
        ("New Leads Assigned", "28 Customers"),
        ("Roof Surveys Booked", "8 Sites"),
        ("Unqualified / Dropped", "6 Inquiries"),
        ("Deals Closed (80% Paid)", "Rs. 64.5 Lakhs")
    ]
    r2_charts = [
        ("Sales Funnel Progression", "Funnel Chart", "Inquiries (28) \u2192 Qualified (22) \u2192 Survey Done (14) \u2192 Quote Sent (10) \u2192 Won / 80% Paid (6)"),
        ("Unqualified Leads Breakdown", "Donut Chart", "No Property Title/NOC (35%) | Unsafe Roof (25%) | Grid Saturated (20%) | Extreme Shadow (20%)"),
        ("Lead Source Performance", "Bar Chart", "WhatsApp Ads (32%) | Customer References (28%) | Walk-ins & Direct (22%) | Contractors (18%)")
    ]
    r2_daily = [
        "Call incoming customer inquiries: evaluate property type (home, commercial, factory, farm) and drop unviable calls with logged reason.",
        "Arrange site survey visits for qualified prospects with the engineering surveyor within 24 hours.",
        "Deliver quotation, explain savings and payback timeline, secure signed contract, and collect the 80% Advance."
    ]
    story.extend(create_role_card_with_charts(
        "2", "Field Sales Representative", "Commercial & Business Development",
        "Pipeline 1: Sales & Customer Acquisition", r2_stats, r2_charts, r2_daily, styles
    ))

    # =========================================================================
    # PAGE 4: ROLE 3 (SITE SURVEYOR) & ROLE 4 (PURCHASE MANAGER)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: SURVEY & PROCUREMENT", styles['DocTitle']))
    story.append(Paragraph("CLEAR EVERYDAY DUTIES, PIPELINES & DASHBOARD CHARTS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    # Role 3: Site Survey Engineer
    r3_stats = [
        ("Surveys Today", "6 Scheduled"),
        ("Surveys Completed MTD", "22 Sites"),
        ("Unfeasible / Rejected", "2 Sites"),
        ("Avg Time per Survey", "2.4 Days")
    ]
    r3_charts = [
        ("Structure / Site Distribution", "Donut Chart", "RCC Flat Concrete (55%) | Industrial Metal Shed (25%) | Farm Land / Ground (10%) | Superstructure (10%)"),
        ("Electricity Phase Breakdown", "Bar Chart", "Single-Phase LT: 50% | Three-Phase LT: 40% | High Tension (HT 11kV/22kV): 10%"),
        ("Survey Feasibility Outcome", "Pie Chart", "Feasible Approved: 91% (20 sites) | Load Enhancement Needed: 6% (1 site) | Rejected: 3% (1 site)")
    ]
    r3_daily = [
        "Visit site (house, commercial roof, factory shed, or farm): measure available space and check solar orientation (South facing).",
        "Inspect electricity connection: check meter plate, sanctioned load, breaker rating, and 1-Phase vs 3-Phase supply.",
        "Upload complete survey dimensions and single-line drawing (SLD) into CRM for engineering design release."
    ]
    story.extend(create_role_card_with_charts(
        "3", "Site Survey Engineer", "Technical Feasibility & Site Assessment",
        "Pipeline 2: Project Execution (Pre-Engineering)", r3_stats, r3_charts, r3_daily, styles
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
        ("BOM Advance Clearance Audit", "Bar Chart", "100% of dispatched BOMs verified with Accounts 80% Advance UTR (Zero unfunded dispatches)")
    ]
    r4_daily = [
        "Check system for Accounts 80% Advance Clearance Stamp: never pack materials without verified bank payment.",
        "Pack solar panels, inverter, mounting structure, DC/AC cables, and lightning arrester for each project job number.",
        "Print Delivery Challan, inspect materials for zero damage, and dispatch delivery vehicle to the work site."
    ]
    story.extend(create_role_card_with_charts(
        "4", "Purchase & Warehouse Manager", "Supply Chain & Warehouse Logistics",
        "Pipeline 2: Project Execution (Material Staging)", r4_stats, r4_charts, r4_daily, styles
    ))

    # =========================================================================
    # PAGE 5: ROLE 5 (EPC OPS) & ROLE 6 (TANGEDCO LIAISON)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: INSTALLATION & TANGEDCO", styles['DocTitle']))
    story.append(Paragraph("CLEAR EVERYDAY DUTIES, PIPELINES & DASHBOARD CHARTS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

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
        "Supervise site team: build galvanized iron structure, clamp solar panels tightly, and seal anchor holes leak-proof.",
        "Mount inverter on shaded wall, run DC wires through protective pipe, and connect dual chemical earthing pits.",
        "Turn on DC switch, test panel string voltage, verify working inverter, and notify Accounts for 10% milestone."
    ]
    story.extend(create_role_card_with_charts(
        "5", "EPC Operations Manager", "Engineering Construction & Field Quality",
        "Pipeline 2: Project Execution (Field Installation)", r5_stats, r5_charts, r5_daily, styles
    ))

    # Role 6: TANGEDCO Liaison Officer
    r6_stats = [
        ("Applications Submitted", "16 Sites"),
        ("Feasibility Approvals Given", "11 Sites"),
        ("Meters Slated for Install", "7 Sites"),
        ("Avg Approval Time", "12.4 Days")
    ]
    r6_charts = [
        ("TANGEDCO Utility Funnel", "Funnel Chart", "Form 1 Submitted (16) \u2192 Feasibility Approved (11) \u2192 Meter Fee Paid (9) \u2192 Meter Sync (7)"),
        ("Approval Speed by Section Office", "Bar Chart", "Section Office A: 10 Days | Section Office B: 12 Days | Section Office C: 14 Days | Section Office D: 13 Days"),
        ("Bi-Directional Meter Readiness", "Donut Chart", "Single-Phase Meters Ready (12 units) | Three-Phase Meters Ready (8 units)")
    ]
    r6_daily = [
        "Submit Form 1 net-meter application on TANGEDCO online portal with customer EB receipt and single-line diagram.",
        "Coordinate with local Assistant Engineer (AE / O&M section office) for transformer load inspection.",
        "Attend meter installation: witness bi-directional net-meter synchronization, get Joint Inspection Report signed, and upload to office."
    ]
    story.extend(create_role_card_with_charts(
        "6", "TANGEDCO Liaison Officer", "Government Liaison & Utility Net-Metering",
        "Pipeline 2: Project Execution (Utility Permitting)", r6_stats, r6_charts, r6_daily, styles
    ))

    # =========================================================================
    # PAGE 6: ROLE 7 (ACCOUNTS) & ROLE 8 (SUBSIDY COORDINATOR)
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("ROLES & DAILY WORK: ACCOUNTS & SUBSIDY", styles['DocTitle']))
    story.append(Paragraph("CLEAR EVERYDAY DUTIES, PIPELINES & DASHBOARD CHARTS", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

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
        "Check bank statement daily: match incoming NEFT / RTGS / UPI transfers with customer name and enter UTR number.",
        "Click 'Approve 80% Advance' in system to unlock equipment packing in warehouse for approved customers.",
        "Collect 10% on roof assembly, collect final 10% upon net-meter sync, and issue final GST invoice showing balance ZERO."
    ]
    story.extend(create_role_card_with_charts(
        "7", "Finance & Accounts Officer", "Commercial Finance & Milestone Billing",
        "Pipeline 3: Financial & Revenue Assurance", r7_stats, r7_charts, r7_daily, styles
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
        "Register eligible residential customer projects on PM Surya Ghar National Portal using electricity consumer number and Aadhaar.",
        "Upload TANGEDCO Joint Commissioning Report (JCR), photo of installed bi-directional meter, and inverter serial number.",
        "Track central government DBT disbursement queue and confirm with customer once subsidy reaches their bank account."
    ]
    story.extend(create_role_card_with_charts(
        "8", "Central Subsidy Coordinator", "PM Surya Ghar Consumer DBT Administration",
        "Pipeline 4: Consumer Government Subsidy", r8_stats, r8_charts, r8_daily, styles
    ))

    # =========================================================================
    # PAGE 7: ROLE 9 (PROJECT COORDINATOR) & THE 8 DEPARTMENTS
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("PROJECT COORDINATOR & RESPONSIBILITY MATRIX", styles['DocTitle']))
    story.append(Paragraph("WHO DOES WHAT & HOW TO PREVENT STALLED SITES", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    # Role 9: Project Coordinator (PMO)
    r9_stats = [
        ("On-Time Completion Rate", "96.2 %"),
        ("Sites Delayed / Stuck", "0 Sites"),
        ("Immutable Audit Logs MTD", "184 Events"),
        ("Customer Feedback Score", "4.9 / 5.0")
    ]
    r9_charts = [
        ("Projects Across 4 Pipelines", "Horizontal Bar", "Sales Pipeline: 18 projects | Execution Pipeline: 12 projects | Billing: 7 projects | Subsidy: 5 projects"),
        ("Average Handover Time (TAT)", "Bar Chart", "Lead to Survey: 1.8 Days | Survey to Quote: 1.0 Day | Advance to Pack: 2.2 Days | Install to Meter: 12.4 Days"),
        ("Departmental On-Time Score", "Scoreboard", "Sales (98%) | Engineering (96%) | Warehouse (99%) | Site EPC (95%) | Liaison (92%) | Accounts (100%)")
    ]
    r9_daily = [
        "Monitor cross-department handoffs: ensure Sales passes lead to Survey within 24h, and Accounts unlocks BOM within 24h.",
        "Audit daily immutable event log: review stage transitions across all roles (zero delete / tamper-proof accountability).",
        "Conduct weekly project review meeting with team leaders to review site velocity and upcoming TANGEDCO meter dates."
    ]
    story.extend(create_role_card_with_charts(
        "9", "Project Coordinator (Central PMO)", "Central Project Management Office (PMO)",
        "Quad-Pipeline Central Stage-Gate Governance", r9_stats, r9_charts, r9_daily, styles
    ))

    # Simple 8-Department Responsibility Table
    story.append(Paragraph("<b>SUMMARY TABLE: WHO IS RESPONSIBLE FOR WHAT?</b>", styles['SubTitle']))
    matrix_simple = [
        [Paragraph("<b>Department</b>", styles['BodyComfortBold']),
         Paragraph("<b>Primary Responsible Person</b>", styles['BodyComfortBold']),
         Paragraph("<b>Main Duty</b>", styles['BodyComfortBold']),
         Paragraph("<b>What They Hand Over</b>", styles['BodyComfortBold'])],
        [Paragraph("1. Sales", styles['BodyComfort']), Paragraph("Sales Representative", styles['BodyComfort']), Paragraph("Customer calls & quotations", styles['BodyComfort']), Paragraph("Signed order & 80% Advance")],
        [Paragraph("2. Engineering", styles['BodyComfort']), Paragraph("Site Surveyor", styles['BodyComfort']), Paragraph("Site check & measurements", styles['BodyComfort']), Paragraph("Site Feasibility & SLD")],
        [Paragraph("3. Purchase & Stores", styles['BodyComfort']), Paragraph("Procurement Manager", styles['BodyComfort']), Paragraph("Pack panels & inverters", styles['BodyComfort']), Paragraph("Signed Delivery Challan")],
        [Paragraph("4. Installation (EPC)", styles['BodyComfort']), Paragraph("Operations Manager", styles['BodyComfort']), Paragraph("Mounting & wiring at site", styles['BodyComfort']), Paragraph("Finished Site & Tested Inverter")],
        [Paragraph("5. Liaison", styles['BodyComfort']), Paragraph("TANGEDCO Officer", styles['BodyComfort']), Paragraph("Net-meter application", styles['BodyComfort']), Paragraph("Installed Net-Meter & Signed Report")],
        [Paragraph("6. Accounts", styles['BodyComfort']), Paragraph("Accounts Officer", styles['BodyComfort']), Paragraph("Bank transfers & billing", styles['BodyComfort']), Paragraph("Customer Ledger = ZERO Balance")],
        [Paragraph("7. Subsidy", styles['BodyComfort']), Paragraph("Subsidy Coordinator", styles['BodyComfort']), Paragraph("PM Surya Ghar Portal", styles['BodyComfort']), Paragraph("Subsidy Bank Credit Proof")],
        [Paragraph("8. PMO Coordination", styles['BodyComfort']), Paragraph("Project Coordinator", styles['BodyComfort']), Paragraph("Keeps everyone moving", styles['BodyComfort']), Paragraph("On-time Handover to Customer")]
    ]
    t_mat_simple = Table(matrix_simple, colWidths=[USABLE_WIDTH * 0.22, USABLE_WIDTH * 0.26, USABLE_WIDTH * 0.26, USABLE_WIDTH * 0.26])
    t_mat_simple.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,0), COLOR_BG_HEADER),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('INNERGRID', (0,0), (-1,-1), 0.5, COLOR_BORDER_LIGHT),
        ('TOPPADDING', (0,0), (-1,-1), 3.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 3.5),
        ('LEFTPADDING', (0,0), (-1,-1), 5),
        ('RIGHTPADDING', (0,0), (-1,-1), 5),
    ]))
    story.append(t_mat_simple)

    # =========================================================================
    # PAGE 8: VERIFICATION, THE 3 CLOSURES & HANDOVER DOSSIER
    # =========================================================================
    story.append(PageBreak())
    story.append(Paragraph("SITE VERIFICATION, CLOSURES & HANDOVER", styles['DocTitle']))
    story.append(Paragraph("THE 3 MANDATORY CLOSURES & CUSTOMER WARRANTY FOLDER", styles['DocSubtitle']))
    story.append(HRFlowable(width="100%", thickness=1, color=COLOR_BLACK, spaceAfter=6))

    # Field Verification Guidelines Box (Clean, no '9 photos')
    p8_field = [
        Paragraph("<b>CORE FIELD VERIFICATION GUIDELINES:</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("&bull; <b>Before Quotation:</b> Surveyor inspects EB meter sanctioned load (1-Ph / 3-Ph / HT), solar shadow azimuth, and inverter wall location.<br/>"
                  "&bull; <b>Before Material Packing:</b> Warehouse verifies bank UTR clearance for the 80% Advance payment.<br/>"
                  "&bull; <b>During Assembly:</b> Installation team checks galvanized structure bolt torque, UV conduit protection, and earthing resistance (&le; 5 &Omega;).<br/>"
                  "&bull; <b>During Utility Synchronization:</b> Liaison officer witnesses TANGEDCO bi-directional net-meter installation and gets official inspection report signed.", styles['BodyComfort'])
    ]
    t_field = Table([[p8_field]], colWidths=[USABLE_WIDTH])
    t_field.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_field)
    story.append(Spacer(1, 3.5*mm))

    # The 3 Closures Box
    p8_closures = [
        Paragraph("<b>THE 3 MANDATORY PROJECT CLOSURES (WHEN IS A PROJECT TRULY FINISHED?):</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("<b>1. Technical Closure:</b> Solar panels are generating electricity, net-meter is synchronized, and TANGEDCO Assistant Engineer has signed the Joint Commissioning Report.<br/>"
                  "<b>2. Commercial Closure:</b> Customer has paid 100% of the contract value (80% + 10% + 10%). Accounts confirms customer balance is <b>ZERO</b>.<br/>"
                  "<b>3. Subsidy Closure:</b> Commissioning report uploaded to National Portal, and Central DBT subsidy is credited into customer's bank account.", styles['BodyComfort'])
    ]
    t_closures = Table([[p8_closures]], colWidths=[USABLE_WIDTH])
    t_closures.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_closures)
    story.append(Spacer(1, 3.5*mm))

    # Customer Handover Folder Content
    p8_handover = [
        Paragraph("<b>WHAT IS HANDED OVER TO THE CUSTOMER IN THEIR HARD-BOUND FOLDER:</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("&bull; <b>25-Year Solar Panel Warranty:</b> Factory serial numbers matched with installed panels.<br/>"
                  "&bull; <b>Inverter 5/10-Year Warranty Card:</b> OEM certificate with customer Wi-Fi monitoring login.<br/>"
                  "&bull; <b>Single Line Wiring Diagram (SLD):</b> Stamped diagram showing AC/DC cable paths.<br/>"
                  "&bull; <b>TANGEDCO Net-Meter Inspection Report:</b> Official utility commissioning record.<br/>"
                  "&bull; <b>Emergency Solar Manual:</b> How to clean panels with water, and how to operate the DC safety switch.", styles['BodyComfort'])
    ]
    t_handover = Table([[p8_handover]], colWidths=[USABLE_WIDTH])
    t_handover.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_BG_LIGHT),
        ('BOX', (0,0), (-1,-1), 0.5, COLOR_BORDER),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_handover)
    story.append(Spacer(1, 3*mm))

    # Immutable PMO Audit Log Governance Box
    p8_audit = [
        Paragraph("<b>SYSTEM AUDIT LOG & COMPLIANCE GOVERNANCE (PMO VISIBLE ONLY \u2014 NO DELETE OPTION):</b>", styles['SubTitle']),
        Spacer(1, 1*mm),
        Paragraph("<b>1. Strictly Append-Only (Zero Delete / Zero Edit):</b> Every action taken by any role is written permanently to the system audit ledger. "
                  "No role, technician, or administrator has permission to modify or delete audit log records.<br/>"
                  "<b>2. Visible Only to PMO & Executive Leadership:</b> The audit trail is restricted to the Project Coordinator (Central PMO) and Managing Director. "
                  "It is completely hidden from all other roles (Sales, Survey, Warehouse, EPC Ops, Liaison, and Accounts).<br/>"
                  "<b>3. Recorded Data Points:</b> Captures exact Date/Timestamp (IST), Staff Name, Role, Project ID, Action Executed "
                  "(e.g. Lead Qualified, 80% Advance UTR Verified, BOM Dispatched, Meter Sync Signed, Zero-Balance Cleared, Subsidy Logged), "
                  "and Previous State \u2192 New State transition.", styles['BodyComfort'])
    ]
    t_audit = Table([[p8_audit]], colWidths=[USABLE_WIDTH])
    t_audit.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), COLOR_WHITE),
        ('BOX', (0,0), (-1,-1), 0.8, COLOR_BLACK),
        ('TOPPADDING', (0,0), (-1,-1), 4.5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 4.5),
        ('LEFTPADDING', (0,0), (-1,-1), 7),
        ('RIGHTPADDING', (0,0), (-1,-1), 7),
    ]))
    story.append(t_audit)



    # Build Document
    doc.build(story, canvasmaker=SimpleMonochromeCanvas)
    print(f"Simple Monochrome Guide generated successfully: {filename}")

if __name__ == "__main__":
    build_pdf()
