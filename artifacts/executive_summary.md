# Research Brief Agent — Assessment Report & Executive Summary

**Candidate Project:** Research Brief Agent  
**Program:** RemoteInternGlobal Internship Assessment Task  
**Evaluation Track:** AI Agent Development, Prompt Architecture & Grounding Systems  
**Date:** 2026-09-14  
**Status:** Completed & Verified  

---

## 1. Project Overview & Problem Statement

Knowledge teams across content marketing, business development, and market research spend between 30 and 90 minutes performing preliminary research before writing a blog post, competitor profile, or executive outreach note. 

While generic conversational LLMs can summarize text, standard AI chatbots suffer from two fatal operational flaws:
1. **Unconstrained Hallucination:** When faced with obscure or unindexed topics, generic LLMs frequently invent statistics, founder names, funding rounds, and product features to appear helpful.
2. **Unstructured Output:** Outputs vary unpredictably in length, formatting, and tone, requiring substantial manual editing.

The **Research Brief Agent** solves this by enforcing a deterministic 4-part research brief schema (`Summary`, `Key Points`, `Sources`, `Confidence Note`) coupled with an **explicit low-confidence degradation path**.

---

## 2. The Core Differentiator: Explicit Low-Confidence Path (VaultMind-RAG Guardrail)

Most AI agent demonstrations showcase only "happy path" queries where dense web sources exist. In production, an agent that presents a guess as a fact destroys user trust.

Drawing directly from architectural patterns proven in **VaultMind-RAG**, the Research Brief Agent implements an explicit **Grounding & Evidence Evaluator**:
- **Sufficient Evidence:** The agent compiles 3–5 grounded bullet points, cites verified canonical sources, and assigns a `High Confidence` badge.
- **Sparse, Untrusted, or Zero Evidence:** The agent immediately drops into the **Low-Confidence Degradation Path**. It refuses to invent data, clearly informs the user that verifiable public records do not exist, and flags the gap in the `Confidence Note`.

This distinction is the primary interview-worthy technical achievement of the project.

---

## 3. Empirical Verification Results

To prove this behavior, the agent was tested against two opposing scenarios:

### Test A: Baseline High-Confidence Benchmark (`HC-01`)
- **Query:** *"Current state of Agentic AI workflows in enterprise customer support (2024-2025)"*
- **Outcome:** Passed 100% of formatting and grounding checks.
  - **Summary:** Concise 3-sentence synthesis on scale, cost reduction, and the mid-2025 human-in-the-loop pivot.
  - **Key Points:** 4 verified bullet points referencing Klarna's 2.3M automated chats, 80% resolution drop, $40M profit impact, and the Salesforce/Workday SaaS pricing debate.
  - **Sources:** Corroborated URLs from corporate case studies, Financial Times, and TechCrunch.
  - **Confidence Note:** `High Confidence`.
- **Artifact Reference:** [`outputs/phase1_baseline_brief.md`](../outputs/phase1_baseline_brief.md)

### Test B: Low-Confidence Edge-Case Verification (`LC-01`)
- **Query:** *"Projected 2029 enterprise revenues and customer roster for NexusQuantum Dynamics Inc."* (Fictional / unindexed startup)
- **Outcome:** Successfully triggered the anti-hallucination guardrail.
  - **Refusal / Honest Admission:** The agent performed web search and registry evaluation, verified zero hits, and stated plainly: *"NexusQuantum Dynamics Inc. has no public corporate footprint or verified commercial filings... projected 2029 revenues and customer rosters cannot be established and must not be fabricated."*
  - **Key Points:** Clearly documented that no regulatory filings, audited disclosures, or enterprise clients exist.
  - **Confidence Note:** `Low Confidence: Insufficient verifiable sources found; this entity has no public existence... claims cannot be authenticated.`
- **Artifact Reference:** [`outputs/phase2_low_confidence_brief.md`](../outputs/phase2_low_confidence_brief.md)

---

## 4. Key Insights & Retrospective (Interview Talking Points)

1. **Negative Constraints Require Architectural Reinforcement:** Simply prompting a model *"don't lie"* is insufficient. Enforcing a mandatory `### 4. Confidence Note` forces the model to perform a meta-cognitive reflection step on evidence density before concluding its output.
2. **Deterministic Schemas Accelerate Executive Consumption:** Enforcing an invariant 4-section format transforms freeform LLM prose into a reliable data product that can be read in under 60 seconds or parsed programmatically.
3. **Graceful Degradation is Superior to Silent Refusal:** Rather than failing with a blunt error message or throwing a hallucination, explaining *why* evidence is lacking (e.g., zero SEC filings, zero commercial news hits) provides immediate diagnostic value to researchers.

---

## 5. Artifact Directory & Verification Index

| Document | Purpose | File Link |
|---|---|---|
| **Product Requirements Document** | Full PRD, personas, functional specs | [`PRD.md`](../PRD.md) |
| **System Architecture** | Technical specification, data flows, mermaid diagrams | [`Architecture.md`](../Architecture.md) |
| **Development Rules** | Anti-hallucination protocols, coding rules | [`Rules.md`](../Rules.md) |
| **Implementation Roadmap** | 5-phase roadmap with acceptance criteria | [`Phases.md`](../Phases.md) |
| **UI/UX Design System** | Brief layout micro-design & visual tokens | [`Design.md`](../Design.md) |
| **Project Memory** | Evolving state, decisions & changelog | [`Memory.md`](../Memory.md) |
| **Production System Prompt** | Tested system prompt with grounding rules | [`prompts/system_prompt.md`](../prompts/system_prompt.md) |
| **High-Confidence Output** | Verified enterprise AI brief | [`outputs/phase1_baseline_brief.md`](../outputs/phase1_baseline_brief.md) |
| **Low-Confidence Output** | Anti-hallucination test on fictional entity | [`outputs/phase2_low_confidence_brief.md`](../outputs/phase2_low_confidence_brief.md) |
