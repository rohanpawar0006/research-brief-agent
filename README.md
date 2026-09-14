# Research Brief Agent

> An AI agent that ingests any research topic or query and synthesizes a structured, strictly source-grounded research brief with an explicit low-confidence degradation path.

*Created for the RemoteInternGlobal Internship Assessment.*

---

## 🌟 Key Features
- **Rigid 4-Part Brief Schema:** Consistent structure (`Summary`, `Key Points`, `Sources`, `Confidence Note`) readable in under 60 seconds.
- **Zero-Tolerance Hallucination Guardrail:** Inherited from the **VaultMind-RAG** architecture, the agent never fabricates stats, founder names, or metrics.
- **Explicit Low-Confidence Degradation:** When context is sparse or non-existent, the agent transparently flags the gap instead of guessing.

---

## 📂 Documentation & Architecture System

This repository follows a strict 6-document architecture system:
- 📄 [PRD.md](PRD.md) — Product requirements, personas, and measurable success criteria.
- 🏗️ [Architecture.md](Architecture.md) — System architecture, data flows, and mermaid diagrams.
- 📜 [Rules.md](Rules.md) — Behavioral constraints, anti-hallucination protocols, and coding rules.
- 🗺️ [Phases.md](Phases.md) — Implementation roadmap and phase-by-phase acceptance criteria.
- 🎨 [Design.md](Design.md) — Output information architecture, typography, and semantic color tokens.
- 🧠 [Memory.md](Memory.md) — Project memory, state tracking, and AI handoff context.

---

## 🚀 Quick Reference: Tested Outputs

- **High-Confidence Baseline Brief:** See [outputs/phase1_baseline_brief.md](outputs/phase1_baseline_brief.md) (Enterprise Agentic AI Case Study with verified Klarna/OpenAI metrics).
- **Low-Confidence Edge Case Brief:** See [outputs/phase2_low_confidence_brief.md](outputs/phase2_low_confidence_brief.md) (Anti-hallucination test on fictional entity *NexusQuantum Dynamics Inc.*).
- **Assessment Report & Key Insights:** See [artifacts/executive_summary.md](artifacts/executive_summary.md).

---

## ⚙️ How to Run / Use the Prompt
The production-ready prompt is located in [prompts/system_prompt.md](prompts/system_prompt.md). Simply configure your LLM workspace (Google AI Studio, OpenAI Playground, Coze, or your platform of choice) with the system prompt, enable web grounding / search, and submit your research query.
