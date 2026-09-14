# UI/UX Design System & Output Specification — Research Brief Agent

**Project:** Research Brief Agent  
**Context:** RemoteInternGlobal Internship Assessment Project  
**Status:** Active  
**Version:** 1.0.0  

---

## 1. Design Direction & Philosophy

### 1.1 Visual & Output Philosophy
The Research Brief Agent is built around the principle of **Executive Scannability**: a busy knowledge worker or executive should be able to scan and digest the output in under 60 seconds. Every design decision—from typography to bullet point density—eliminates visual clutter and highlights factual provenance.

### 1.2 Personality & Tone
- **Tone:** Objective, analytical, concise, and rigorous.
- **Voice:** Third-person analytical observer. Zero conversational fluff, zero hedging when facts are clear, and zero hesitation to state when facts are missing.
- **Target Emotional Response:** "This is reliable, clean, and tells me the exact truth without wasting my time."

---

## 2. Output Brief Specification (The Core UI)

Because the MVP agent operates within an LLM workspace or conversational canvas, the output **Markdown layout is the user interface**. 

### 2.1 The 4-Part Information Architecture
The output strictly complies with this visual and structural blueprint:

```markdown
### 1. Summary
[2-3 sentences. High information density. Synthesizes the core situation directly answering the user query without preamble.]

### 2. Key Points
- **[Concrete Theme / Factual Finding]:** [Specific detail, benchmark, or development] ([Source Attribution])
- **[Concrete Theme / Factual Finding]:** [Specific detail, benchmark, or development] ([Source Attribution])
- **[Concrete Theme / Factual Finding]:** [Specific detail, benchmark, or development] ([Source Attribution])

### 3. Sources
- [Primary Source Name / Publisher](https://canonical-url.com) — [Brief description of source context]
- [Secondary Source Name / Publisher](https://canonical-url.com) — [Brief description of source context]

### 4. Confidence Note
> **[Confidence Level: High | Moderate | Low]**: [1 clear sentence explaining evidence completeness and flagging any data voids or unverified aspects.]
```

### 2.2 Section-by-Section Micro-Design
1. **Summary:**
   - **Length:** Strict 2–3 sentences (40–70 words).
   - **Visual density:** Single paragraph.
   - **Purpose:** Answers "What is the baseline reality of this topic right now?"
2. **Key Points:**
   - **Format:** Unordered list of 3 to 5 bold-leaded bullet points.
   - **Structure:** `**[Lead Hook]**: [Fact/Metric] ([Citation])`.
   - **Rule:** No bullet may exceed 3 lines on desktop. No bullet may contain ungrounded speculation.
3. **Sources:**
   - **Format:** Bulleted list of canonical publishers and direct hyperlinks.
   - **Rule:** Only sources that supplied facts in sections 1 & 2 are listed.
4. **Confidence Note:**
   - **Format:** Rendered as a Markdown blockquote (`>`) with bold prefix.
   - **Purpose:** Immediate visual indicator of evidentiary reliability.

---

## 3. Visual Styling & Color System (Semantic Tokens)

For markdown renderers supporting semantic badges, and for the planned future web interface, the following design system tokens apply:

### 3.1 Color Palette
| Token | Hex Code | Purpose / Application |
|---|---|---|
| `--color-bg` | `#0D1117` | Canvas background (dark mode baseline) |
| `--color-surface` | `#161B22` | Card container background |
| `--color-border` | `#30363D` | Structural dividers & card borders |
| `--color-text-primary` | `#F0F6FC` | Headings & primary factual text |
| `--color-text-muted` | `#8B949E` | Source URLs, dates, and secondary labels |
| `--color-accent` | `#58A6FF` | Interactive links and section numbering |
| `--color-confidence-high` | `#238636` | High confidence badge (Deep Emerald) |
| `--color-confidence-moderate`| `#D29922` | Moderate confidence badge (Warm Amber) |
| `--color-confidence-low` | `#DA3633` | Low confidence badge (Ruby Crimson) |

### 3.2 Typography System
- **Heading Font:** Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif.
  - Weight: Semi-Bold (600).
- **Body Font:** Inter, system-ui, sans-serif.
  - Size: 15px / Line Height: 1.6.
- **Code / Citations:** JetBrains Mono, SF Mono, Consolas, monospace.
  - Size: 13px / Line Height: 1.4.

---

## 4. Interaction States & Edge-Case UI

### 4.1 State A: High-Confidence Brief Presentation
- **Visual Cue:** Emerald badge / Clean list of 4–5 bullets / Multiple reputable citations.
- **User Feeling:** Ready to incorporate into content or report immediately.

### 4.2 State B: Low-Confidence Degradation Presentation (The Key Showcase State)
- **Visual Cue:** Ruby/Amber alert callout in the Confidence Note blockquote.
- **Summary:** Transparently opens with: *"Limited verifiable information is publicly available regarding [Topic]..."*
- **Key Points:** Contains 1–2 notes clarifying known perimeter facts or stating explicitly that no verifiable public metrics exist.
- **Confidence Note:**
  ```markdown
  > ⚠️ **Low Confidence**: Insufficient verifiable public sources found for this entity. Claims should not be used in external communications without independent primary-source verification.
  ```
- **User Feeling:** Relief that the AI did not fabricate an answer and clear guidance on next steps.

---

## 5. Future Lightweight Web UI Specification (Post-MVP)

Should the project expand from an agent workspace into a standalone web tool (e.g., Streamlit, React/Vite, or Next.js):

```
+-----------------------------------------------------------------------------+
|  [⚡ Research Brief Agent]                         [RemoteInternGlobal Demo] |
+-----------------------------------------------------------------------------+
|                                                                             |
|  Topic or Research Question:                                                |
|  +-----------------------------------------------------------------------+  |
|  | e.g., Databricks Lakebase Architecture and 2025 roadmap              |  |
|  +-----------------------------------------------------------------------+  |
|                                                     [ Generate Brief -> ]   |
|                                                                             |
+-----------------------------------------------------------------------------+
|  [BRIEF OUTPUT CONTAINER]                                                   |
|                                                                             |
|  STATUS: [ HIGH CONFIDENCE ] (Green Badge)             Generated in 2.4s   |
|  -------------------------------------------------------------------------  |
|  1. Summary                                                                 |
|     Text block with high information density...                             |
|                                                                             |
|  2. Key Points                                                              |
|     * Point 1 with [Source 1] badge                                         |
|     * Point 2 with [Source 2] badge                                         |
|     * Point 3 with [Source 3] badge                                         |
|                                                                             |
|  3. Sources                                                                 |
|     [1] Databricks Official Blog (databricks.com/blog)                      |
|     [2] SiliconANGLE Market Analysis                                        |
|                                                                             |
|  4. Confidence Note                                                         |
|     > High confidence: 3 primary technical announcements corroborate.      |
|                                                                             |
|  [ Copy Markdown ]   [ Download PDF ]   [ Share Brief ]                     |
+-----------------------------------------------------------------------------+
```

### Key UI Features for Web Interface:
1. **Single-Action Input:** Large query input with prominent submit button and keyboard shortcut (`Cmd+Enter` / `Ctrl+Enter`).
2. **Confidence Badge:** Prominently positioned at the top-right of the brief card to give immediate visual feedback.
3. **One-Click Actions:** Copy to Clipboard, Export to Markdown, and Raw Text view.
