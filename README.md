# Research Brief Agent

> An AI agent that ingests any research topic or query and synthesizes a structured, strictly source-grounded research brief with an explicit low-confidence degradation path.

*Built for the RemoteInternGlobal Internship Assessment.*

---

## 🚀 Live Demo & Web Dashboard
The project includes a production-ready, interactive web dashboard ready for 1-click deployment to **Vercel**:

- **Instant Evaluator Benchmarks:** Test high-confidence enterprise topics vs. the low-confidence anti-hallucination guardrail with 1 click.
- **Strict 4-Part Brief Layout:** Scannable in under 60 seconds (`Summary`, `Key Points`, `Sources`, `Confidence Note`).
- **Live Gemini API Integration:** Optionally input a Gemini API key for live web search grounding.
- **Export Capabilities:** 1-click "Copy Markdown" and "Download .md" buttons.

### Deploy to Vercel
1. Import this repository into [Vercel](https://vercel.com).
2. Framework preset will automatically be detected as **Vite**.
3. Click **Deploy** — zero additional configuration required!

---

## 💻 Local Development Setup

Clone the repository and run locally in seconds:

```bash
# Clone repository
git clone https://github.com/rohanpawar0006/research-brief-agent.git
cd research-brief-agent

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

To create a production build:
```bash
npm run build
```

---

## 🌟 Key Features & Architectural Highlights

### 1. VaultMind-RAG Low-Confidence Safeguard
Most LLM agents hallucinate when queried about obscure or non-existent entities. Inherited from the **VaultMind-RAG** architecture, this agent features an explicit **Low-Confidence Degradation Path**:
- If evidence is missing, conflicting, or thin, the agent refuses to fabricate data and issues an explicit `Low Confidence` alert.
- **Empirical Test:** Review [`outputs/phase2_low_confidence_brief.md`](outputs/phase2_low_confidence_brief.md) for the test against fictional entity *NexusQuantum Dynamics Inc.*

### 2. Rigid 4-Part Brief Schema
Every brief strictly complies with:
1. `### 1. Summary` — 2–3 sentences answering the core inquiry.
2. `### 2. Key Points` — 3–5 bullet points with explicit source attribution.
3. `### 3. Sources` — Canonical URLs and context descriptions.
4. `### 4. Confidence Note` — Objective evaluation of evidence density and remaining gaps.

---

## 📂 Documentation System

This project is governed by a 6-document architecture system:
- 📄 [PRD.md](PRD.md) — Product requirements, user stories, and measurable success criteria.
- 🏗️ [Architecture.md](Architecture.md) — System architecture, bifurcated data flows, and mermaid diagrams.
- 📜 [Rules.md](Rules.md) — Strict behavioral constraints and anti-hallucination protocols.
- 🗺️ [Phases.md](Phases.md) — 5-phase sequential implementation roadmap with acceptance criteria.
- 🎨 [Design.md](Design.md) — Output information architecture, typography, and semantic color tokens.
- 🧠 [Memory.md](Memory.md) — Active project memory and state tracker.

---

## 📁 Repository Structure

```text
research-brief-agent/
│
├── index.html                      # Executive web dashboard
├── style.css                       # Modern dark-mode styling conforming to Design.md
├── package.json                    # Vite configuration and scripts
├── vite.config.js                  # Vite server & build configuration
├── vercel.json                     # Zero-config Vercel deployment specification
│
├── src/
│   ├── main.js                     # DOM event orchestration & UI handlers
│   ├── agent.js                    # Brief synthesis engine & Gemini API integration
│   └── benchmarks.js               # Pre-loaded high/low confidence benchmark datasets
│
├── prompts/
│   └── system_prompt.md            # Production system prompt with negative constraints
│
├── test_cases/
│   ├── high_confidence_topics.json # Benchmark queries with rich documentation
│   └── low_confidence_edge_cases.json # Stress tests for anti-hallucination
│
├── outputs/
│   ├── phase1_baseline_brief.md    # Verified enterprise AI support brief
│   └── phase2_low_confidence_brief.md # Verified low-confidence edge case brief
│
└── artifacts/
    └── executive_summary.md        # Internship assessment report & key insights
```
