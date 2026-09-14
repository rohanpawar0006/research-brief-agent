import os
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image as RLImage, 
    Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.pdfgen import canvas
from PIL import Image as PILImage

class NumberedCanvas(canvas.Canvas):
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
            self.draw_page_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_page_decorations(self, page_count):
        self.saveState()
        self.setFont("Helvetica", 8)
        self.setFillColor(colors.HexColor("#64748B"))
        
        # Running Header (pages > 1)
        if self._pageNumber > 1:
            self.drawString(54, 746, "RemoteInternGlobal — AI Workflow Assessment Submission")
            self.drawRightString(612 - 54, 746, "Research Brief Agent | Rohan Pawar")
            self.setStrokeColor(colors.HexColor("#E2E8F0"))
            self.setLineWidth(0.75)
            self.line(54, 738, 612 - 54, 738)

        # Running Footer (all pages)
        self.setStrokeColor(colors.HexColor("#E2E8F0"))
        self.setLineWidth(0.75)
        self.line(54, 46, 612 - 54, 46)
        self.drawString(54, 32, "github.com/rohanpawar0006/research-brief-agent")
        page_str = f"Page {self._pageNumber} of {page_count}"
        self.drawRightString(612 - 54, 32, page_str)
        
        self.restoreState()

def get_scaled_image(img_path, target_width):
    with PILImage.open(img_path) as im:
        orig_w, orig_h = im.size
    aspect = orig_h / orig_w
    target_h = target_width * aspect
    return RLImage(img_path, width=target_width, height=target_h)

def create_assessment_pdf(output_path):
    doc = SimpleDocTemplate(
        output_path,
        pagesize=letter,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )
    
    usable_width = 612 - 108  # 504 pt

    styles = getSampleStyleSheet()

    # Custom typography
    doc_title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=22,
        leading=26,
        textColor=colors.HexColor('#0F172A'),
        alignment=1,
        spaceAfter=3
    )

    doc_sub_style = ParagraphStyle(
        'DocSub',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#475569'),
        alignment=1,
        spaceAfter=12
    )

    meta_style = ParagraphStyle(
        'MetaStyle',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13,
        textColor=colors.HexColor('#334155'),
        alignment=1
    )

    h1_style = ParagraphStyle(
        'Heading1_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13,
        leading=17,
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=10,
        spaceAfter=5,
        keepWithNext=True
    )

    h2_style = ParagraphStyle(
        'Heading2_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=10.5,
        leading=14,
        textColor=colors.HexColor('#1E293B'),
        spaceBefore=8,
        spaceAfter=4,
        keepWithNext=True
    )

    body_style = ParagraphStyle(
        'Body_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9.2,
        leading=13.5,
        textColor=colors.HexColor('#1E293B'),
        spaceAfter=6
    )

    bullet_style = ParagraphStyle(
        'Bullet_Custom',
        parent=styles['Normal'],
        fontName='Helvetica',
        fontSize=9,
        leading=13.5,
        textColor=colors.HexColor('#1E293B'),
        leftIndent=14,
        firstLineIndent=-10,
        spaceAfter=5
    )

    code_block_style = ParagraphStyle(
        'CodeStyle',
        parent=styles['Normal'],
        fontName='Courier',
        fontSize=7.2,
        leading=9.2,
        textColor=colors.HexColor('#0F172A')
    )

    caption_style = ParagraphStyle(
        'Caption_Custom',
        parent=styles['Normal'],
        fontName='Helvetica-Oblique',
        fontSize=7.8,
        leading=10.5,
        textColor=colors.HexColor('#64748B'),
        alignment=1,
        spaceBefore=3,
        spaceAfter=6
    )

    story = []

    # =========================================================================
    # PAGE 1: Foundations, Objective & Production System Prompt
    # =========================================================================
    story.append(Paragraph("Research Brief Agent", doc_title_style))
    story.append(Paragraph("AI Workflow Assessment Submission &mdash; RemoteInternGlobal", doc_sub_style))
    
    meta_html = (
        "<b>Candidate:</b> Rohan Pawar &nbsp;&nbsp;|&nbsp;&nbsp; "
        "<b>GitHub:</b> <font color='#0284C7'><u>github.com/rohanpawar0006/research-brief-agent</u></font>"
    )
    meta_table = Table([[Paragraph(meta_html, meta_style)]], colWidths=[usable_width])
    meta_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 0.75, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 5),
        ('BOTTOMPADDING', (0,0), (-1,-1), 5),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(meta_table)
    story.append(Spacer(1, 8))

    # 1. Objective
    story.append(Paragraph("1. Objective", h1_style))
    story.append(Paragraph(
        "The <b>Research Brief Agent</b> is an AI assistant that converts a research topic or question into a "
        "structured, source-grounded executive brief in seconds. Teams doing content, marketing, or business-development "
        "work routinely spend 30&ndash;90 minutes on first-pass research before writing anything &mdash; scanning articles, "
        "cross-checking figures, and assembling a summary. This agent compresses that first pass into a consistent "
        "four-part brief (Summary, Key Points, Sources, Confidence Note), so a human's time goes into judgment "
        "and writing rather than initial legwork.",
        body_style
    ))
    story.append(Paragraph(
        "The core design goal was not speed alone but <b>trustworthiness</b>: an agent that reliably admits when it "
        "doesn't have enough evidence is more useful to a business team than one that always sounds confident. "
        "This mirrors the grounding logic from an earlier project (<b>VaultMind-RAG</b>, a retrieval assistant for personal "
        "knowledge bases) &mdash; here adapted into an explicit low-confidence degradation path rather than a "
        "general-purpose refusal.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # 2. Configuration Details
    story.append(Paragraph("2. Configuration Details", h1_style))
    story.append(Paragraph("2.1 System Prompt", h2_style))
    story.append(Paragraph(
        "The following system prompt governs the agent's behavior end-to-end. It enforces a fixed output schema "
        "and a mandatory low-confidence path so the agent cannot silently fabricate facts when evidence is thin.",
        body_style
    ))

    prompt_content = (
        "You are an expert Research Brief Agent. Your sole responsibility is to convert a research\n"
        "query and retrieved source material into an executive-ready, strictly grounded research brief.\n\n"
        "Core Behavioral Directives:\n"
        "1. Zero Hallucination Policy: You must NEVER invent, fabricate, or extrapolate statistics,\n"
        "   metrics, company valuations, executive names, publication titles, or dates.\n"
        "2. Grounding Requirement: Every factual claim must be directly supported by retrieved\n"
        "   context. If a claim cannot be verified, do not state it as a fact.\n"
        "3. Low-Confidence Graceful Degradation: If retrieved material is sparse, conflicting,\n"
        "   unverified, or non-existent, you MUST activate the Low-Confidence Path. Do NOT generate\n"
        "   speculative bullet points. Explicitly state the absence of verifiable public records in the\n"
        "   Summary and set the Confidence Note to Low Confidence.\n\n"
        "Output Format Specification (exact headers):\n"
        "### 1. Summary\n"
        "[2-3 sentence synthesis based ONLY on verified source material. If evidence is thin or missing,\n"
        "state this clearly here.]\n\n"
        "### 2. Key Points\n"
        "- [Theme]: [Concrete factual insight, metric, or event] (Source Attribution)\n"
        "(3-5 bullet points for verified topics. For zero-evidence topics: 'No verifiable factual points\n"
        "could be established from available records.')\n\n"
        "### 3. Sources\n"
        "- [Publisher / Canonical Name] (URL or Reference) - [brief description]\n\n"
        "### 4. Confidence Note\n"
        "[Confidence Level: High | Moderate | Low]: [1 sentence evaluating evidentiary completeness\n"
        "and identifying any specific gaps.]"
    )

    prompt_table = Table(
        [[Paragraph(prompt_content.replace("\n", "<br/>").replace(" ", "&nbsp;"), code_block_style)]],
        colWidths=[usable_width]
    )
    prompt_table.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F8FAFC')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#CBD5E1')),
        ('TOPPADDING', (0,0), (-1,-1), 6),
        ('BOTTOMPADDING', (0,0), (-1,-1), 6),
        ('LEFTPADDING', (0,0), (-1,-1), 8),
        ('RIGHTPADDING', (0,0), (-1,-1), 8),
    ]))
    story.append(prompt_table)

    # Clean transition to Page 2
    story.append(PageBreak())

    # =========================================================================
    # PAGE 2: Architecture & Output Verification (Dashboard Overview)
    # =========================================================================
    story.append(Paragraph("2.2 Architecture & Logic", h1_style))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Flow:</b> User topic &rarr; retrieval (web search / provided context) &rarr; grounding filter &rarr; synthesis against the fixed 4-part schema &rarr; structured brief.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Bifurcated path:</b> The same prompt handles two distinct operational regimes &mdash; a High-Confidence path for well-documented topics (dense key points, cited sources) and a Low-Confidence path for sparse, unindexed, or fictional topics (explicit admission of an evidence deficit instead of a guess).",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Static benchmark mode:</b> The evaluator showcase presets (Klarna case study, fictional NexusQuantum Dynamics Inc.) run off pre-verified, bundled data with zero live API calls, guaranteeing that evaluation is 100% reproducible and immune to rate limits or API outages.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Live research mode:</b> Optional custom queries are routed through a server-side serverless function (<code>/api/research.js</code>); no Gemini API key is ever exposed in client-side bundles or browser dev tools.",
        bullet_style
    ))
    story.append(Spacer(1, 10))

    # 3. Output Verification
    story.append(Paragraph("3. Output Verification", h1_style))
    story.append(Paragraph(
        "The screenshots below depict the deployed dashboard and both benchmark outputs, demonstrating the agent's "
        "deterministic behavior on a well-documented enterprise topic versus a query with zero verifiable evidence.",
        body_style
    ))
    story.append(Spacer(1, 4))

    # 3.1 Dashboard Overview
    story.append(Paragraph("3.1 Dashboard Overview", h2_style))
    img1_path = "d:/research-brief-agent/artifacts/screenshots/dashboard_overview.png"
    img1 = get_scaled_image(img1_path, usable_width)
    story.append(img1)
    story.append(Paragraph(
        "Figure 1 &mdash; Dashboard landing view with evaluator showcase benchmarks (High Confidence and Low Confidence presets).",
        caption_style
    ))

    # Clean transition to Page 3
    story.append(PageBreak())

    # =========================================================================
    # PAGE 3: High-Confidence vs. Low-Confidence Empirical Test Comparison
    # =========================================================================
    story.append(Paragraph("3.2 High-Confidence Output &mdash; Enterprise Agentic AI Support (Klarna Case Study)", h2_style))
    img2_path = "d:/research-brief-agent/artifacts/screenshots/high_confidence_klarna.png"
    # Sized to 460 pt width so both Figure 2 and Figure 3 fit perfectly on Page 3
    test_img_width = 460
    img2 = get_scaled_image(img2_path, test_img_width)
    story.append(img2)
    story.append(Paragraph(
        "Figure 2 &mdash; Grounded brief on a well-documented topic, citing verified figures (2.3M chats in month one, resolution time cut ~82%, $40M projected profit improvement).",
        caption_style
    ))
    story.append(Spacer(1, 12))

    # 3.3 Low-Confidence Output — Fictional Entity Guardrail
    story.append(Paragraph("3.3 Low-Confidence Output &mdash; Fictional Entity Guardrail (NexusQuantum Dynamics Inc.)", h2_style))
    img3_path = "d:/research-brief-agent/artifacts/screenshots/low_confidence_nexusquantum.png"
    img3 = get_scaled_image(img3_path, test_img_width)
    story.append(img3)
    story.append(Paragraph(
        "Figure 3 &mdash; Low-confidence path triggered for a fictional company (&ldquo;NexusQuantum Dynamics Inc.&rdquo;): "
        "the agent explicitly reports the absence of records instead of fabricating a revenue forecast.",
        caption_style
    ))

    # Clean transition to Page 4
    story.append(PageBreak())

    # =========================================================================
    # PAGE 4: Evaluation, Key Insights & Deliverables
    # =========================================================================
    story.append(Paragraph("4. Evaluation & Key Insights", h1_style))
    story.append(Paragraph(
        "&bull;&nbsp; <b>The explicit Confidence Note acts as a meta-cognitive check:</b> Forcing the model to rate its own "
        "evidentiary support as a required output field (rather than leaving confidence implicit) measurably "
        "reduced confident-sounding but unsupported claims during testing.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Graceful degradation builds more trust than speculative completeness:</b> The fictional-company "
        "test shows the agent explicitly declaring a data void rather than generating a plausible-looking but "
        "invented forecast &mdash; for a business tool, an honest &ldquo;I don't know&rdquo; is substantially more valuable than a wrong "
        "answer delivered confidently.",
        bullet_style
    ))
    story.append(Paragraph(
        "&bull;&nbsp; <b>Main area for optimization:</b> The current retrieval step relies on whatever context is supplied or "
        "searched at query time; a production version would benefit from a source-recency filter and a "
        "lightweight fact cross-check against a second source before a claim is marked verified, to catch cases "
        "where a single source is stale or inaccurate.",
        bullet_style
    ))
    story.append(Spacer(1, 12))

    # Production Recommendations & Engineering Notes
    story.append(Paragraph("5. Architectural Retrospective & Recommendations", h1_style))
    story.append(Paragraph(
        "Building a reliable research agent for business workflows requires treating <b>anti-hallucination guardrails as first-class citizens</b>. "
        "Most LLM applications prioritize generation fluency over factual verification. By pairing a rigid 4-part information architecture with "
        "negative constraints that penalize fabrication, this workflow transforms probabilistic language model outputs into dependable, "
        "auditable knowledge briefs ready for executive decision-making.",
        body_style
    ))
    story.append(Spacer(1, 14))

    # Bottom Callout Box with Deliverables & Links
    repo_box = Table(
        [[
            Paragraph(
                "<b>Project Deliverables & Submission Links:</b><br/>"
                "&bull; <b>GitHub Repository:</b> <font color='#0284C7'><u>https://github.com/rohanpawar0006/research-brief-agent</u></font><br/>"
                "&bull; <b>Interactive Web Dashboard:</b> Deployed on Vercel / Local Host on port 4173<br/>"
                "&bull; <b>Specification Docs:</b> PRD.md, Architecture.md, Rules.md, Phases.md, Design.md, Memory.md<br/>"
                "&bull; <b>Core Differentiator:</b> Grounding & low-confidence fallback logic carried over from <i>VaultMind-RAG</i>",
                body_style
            )
        ]],
        colWidths=[usable_width]
    )
    repo_box.setStyle(TableStyle([
        ('BACKGROUND', (0,0), (-1,-1), colors.HexColor('#F0FDF4')),
        ('BOX', (0,0), (-1,-1), 1, colors.HexColor('#86EFAC')),
        ('TOPPADDING', (0,0), (-1,-1), 10),
        ('BOTTOMPADDING', (0,0), (-1,-1), 10),
        ('LEFTPADDING', (0,0), (-1,-1), 12),
        ('RIGHTPADDING', (0,0), (-1,-1), 12),
    ]))
    story.append(repo_box)

    doc.build(story, canvasmaker=NumberedCanvas)
    print(f"Successfully generated: {output_path}")

if __name__ == "__main__":
    create_assessment_pdf("RemoteInternGlobal_AI_Assessment_Rohan_Pawar.pdf")
