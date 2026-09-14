# Product Requirements Document (PRD) — Research Brief Agent

**Project Name:** Research Brief Agent  
**Context:** RemoteInternGlobal Internship Assessment Project  
**Status:** Approved / In Progress (Phase 0)  
**Version:** 1.0.0  

---

## 1. Product Overview

### 1.1 One-Line Description
An AI agent that accepts any topic, query, or context and synthesizes a structured, strictly source-grounded research brief with an explicit low-confidence escalation path.

### 1.2 Product Vision
To eliminate manual, error-prone first-pass web research for fast-moving knowledge teams by providing executive-level, trustworthy briefings in seconds—anchored by absolute grounding transparency and refusing to fabricate missing evidence.

### 1.3 Problem Statement
Teams across content marketing, business development, product management, and strategy spend 30–90 minutes scanning search engines, competitor blogs, and industry reports before drafting an outline, outreach sequence, or competitive profile. Common pitfalls include:
- **Information Overload:** Sifting through dozens of redundant or low-quality articles.
- **Hallucination Risk in Generic LLMs:** Standard AI chat tools frequently invent statistics, misattribute quotes, or merge unrelated facts when asked for quick summaries.
- **Unstructured Output:** Freeform LLM queries generate inconsistent walls of text that require extensive manual reformatting and verification.

### 1.4 Proposed Solution
The **Research Brief Agent** compresses preliminary topic research into a 2-minute automated workflow. It enforces:
1. Retrieval of grounded evidence (via live search or supplied context).
2. A strict 4-part briefing schema: *Summary*, *Key Points*, *Sources*, and *Confidence Note*.
3. An explicit **low-confidence / thin-evidence path** (originating from the VaultMind-RAG architectural pattern), guaranteeing that when evidence is sparse or ambiguous, the agent explicitly documents the gap rather than guessing.

---

## 2. Target Users & Personas

### 2.1 Primary Users
- **Content & Marketing Strategists:** Professionals requiring fast topic scans, trend overviews, and factual benchmarks before drafting long-form content or battle cards.
- **Business Development & Sales Reps:** Reps needing rapid due-diligence on prospect companies, recent funding rounds, or product launches prior to outreach.

### 2.2 Secondary Users
- **Product Managers & Analysts:** Anyone conducting initial exploratory research on emerging technologies, market concepts, or competitive landscapes.

### 2.3 User Goals & Pain Points
| User Role | Core Goal | Primary Pain Point | How Agent Solves It |
|---|---|---|---|
| Content Marketer | Rapidly understand a niche topic | Reading 8+ redundant blog posts; fear of citing outdated or fake data | Generates a 3–5 bullet grounded briefing with verified source links |
| BD / Sales | Conduct 3-minute company due diligence | Generic AI hallucinations on company size, revenue, or tech stack | Flags unverified data in the "Confidence Note" instead of guessing |
| Solo Researcher | Scan unfamiliar concepts quickly | Inconsistent notes and lack of clear source provenance | Produces a uniform, predictable briefing structure every time |

---

## 3. Goals & Objectives

### 3.1 Primary Goals
- Deliver a complete, structured research brief in under 2 minutes per query.
- Maintain zero tolerance for fabricated sources, statistics, or unsupported claims.
- Provide clear evidentiary provenance for every key assertion.

### 3.2 Secondary Goals
- Provide a showcase-grade artifact for the RemoteInternGlobal internship assessment demonstrating rigorous prompt engineering, grounding safeguards, and edge-case verification.
- Establish an evaluation harness comparing high-confidence topics against thin-evidence edge cases.

### 3.3 Measurable Success Criteria
1. **Structural Consistency:** 100% compliance with the 4-part brief format (Summary, Key Points, Sources, Confidence Note) across all runs.
2. **Grounding Accuracy:** Every bullet point in the Key Points section must trace directly back to an identified source snippet.
3. **Honest Low-Confidence Handling:** When presented with obscure, non-existent, or thin-evidence topics, the agent must explicitly state the information deficit in the Confidence Note rather than fabricating details.
4. **Scannability:** The complete brief must be readable and digestible by a human in under 60 seconds.

---

## 4. Core Features

### 4.1 MVP Features

#### Feature 1: Topic Intake & Scope Parsing
- **Description:** Accepts a freeform topic, research question, or company name from the user.
- **Why It Exists:** Enables low-friction interaction without complex query syntax.
- **User Interaction:** User inputs a string (e.g., *"Current state of WebAssembly in edge computing"* or *"Post-quantum cryptography adoption roadmap"*).
- **Expected Behavior:** Parses the query and isolates key entities and intent for retrieval.
- **Inputs:** Raw text query.
- **Outputs:** Targeted search terms or parsed inquiry.
- **Dependencies:** None.

#### Feature 2: Evidence Retrieval & Context Ingestion
- **Description:** Retrieves relevant documents, snippets, or web search results corresponding to the topic, or ingests user-provided text passages.
- **Why It Exists:** Grounding requires concrete external context before synthesis can occur.
- **User Interaction:** Automated via built-in platform retrieval or direct document input.
- **Expected Behavior:** Returns top relevant textual snippets with source metadata (URLs, titles, publication dates).
- **Inputs:** Parsed query.
- **Outputs:** Context bundle (text snippets + source metadata).
- **Dependencies:** Platform search tool, web retrieval API, or uploaded context files.

#### Feature 3: Grounded Brief Synthesis
- **Description:** Synthesizes the retrieved snippets into a strictly structured 4-part briefing.
- **Why It Exists:** Provides rapid scannability and prevents prose sprawl.
- **User Interaction:** Reads the generated output.
- **Expected Behavior:** Generates:
  1. *Summary:* 2–3 sentences synthesizing the core reality of the topic.
  2. *Key Points:* 3–5 distinct bullet points, each citing its specific source.
  3. *Sources:* Bulleted list of all reference URLs or document titles actually used.
  4. *Confidence Note:* 1 sentence assessing evidence strength and noting any informational voids.
- **Inputs:** Context bundle + topic prompt.
- **Outputs:** Formatted Markdown brief.
- **Dependencies:** LLM reasoning engine with strict system prompt constraints.

#### Feature 4: Low-Confidence & Evidence-Gap Escalation (VaultMind-RAG Guardrail)
- **Description:** Detects when retrieved evidence is sparse, missing, conflicting, or untrusted, and forces the agent into an honest degradation path.
- **Why It Exists:** The core differentiator. Prevents hallucinations and builds organizational trust.
- **User Interaction:** User submits a niche, speculative, or unindexed topic (e.g., *"Q3 2029 earnings of fictional company X"*).
- **Expected Behavior:** Agent outputs a brief where the Summary states the scarcity of data, Key Points highlights only confirmed or baseline facts (or explicitly states no verified points exist), Sources reflects what was examined, and the Confidence Note explicitly warns: *"Low confidence: insufficient verifiable sources found; further verification required."*
- **Inputs:** Low-overlap or empty context bundle.
- **Outputs:** Transparent, un-hallucinated brief with low-confidence warning.
- **Dependencies:** System prompt grounding rules and negative constraint triggers.

---

### 4.2 Post-MVP Features (Planned Roadmap)
- **Multi-Turn Follow-Up Refinement:** Allowing users to drill down into a specific Key Point without re-running the entire brief.
- **Export to Document (PDF / Notion / Google Docs):** One-click formatting export for team distribution.
- **Source Freshness & Recency Filters:** Time-bounding retrieval to the last 30, 90, or 365 days.
- **Domain Whitelisting / Blacklisting:** Restricting retrieval to academic (arXiv, IEEE), governmental, or financial domains.

---

### 4.3 Out of Scope
- Full-length article, essay, or blog post drafting.
- Automated scheduled real-time news monitoring or RSS alerting.
- Autonomous multi-agent debate or swarm orchestration.
- Persistent user accounts, authentication databases, or credit card billing.

---

## 5. User Stories

1. **US-01 (High-Confidence Research):**  
   *As a Content Marketing Lead,*  
   *I want to enter a trending industry topic (e.g., "Agentic AI workflows in customer support"),*  
   *So that I receive an executive summary, 4 grounded key points, and verified sources in under 2 minutes.*

2. **US-02 (Low-Confidence Guardrail):**  
   *As a Business Development Representative,*  
   *I want the agent to tell me if it cannot find credible evidence on an early-stage startup,*  
   *So that I avoid sending erroneous or fabricated data in my executive outreach.*

3. **US-03 (Format Scannability):**  
   *As a Busy Researcher,*  
   *I want every brief to adhere to the exact same 4-part structure,*  
   *So that I can skim the Confidence Note and Key Points without reading extraneous prose.*

---

## 6. Functional & Non-Functional Requirements

### 6.1 Functional Requirements (FR)
- **FR-01:** System must accept freeform text topics between 3 and 250 characters.
- **FR-02:** System must consume retrieved context and filter out non-pertinent information.
- **FR-03:** System must generate exactly 4 named sections in Markdown: `### 1. Summary`, `### 2. Key Points`, `### 3. Sources`, `### 4. Confidence Note`.
- **FR-04:** Summary section must not exceed 4 sentences.
- **FR-05:** Key Points section must contain between 3 and 5 grounded bullets for standard queries.
- **FR-06:** Sources section must list only sources actually utilized in the generation.
- **FR-07:** Confidence Note must provide a qualitative confidence rating (High / Moderate / Low) and articulate gaps.
- **FR-08:** System must refuse to invent statistics, quotes, or entity relationships not corroborated by the retrieved context.

### 6.2 Non-Functional Requirements (NFR)
- **NFR-01 (Latency):** Total generation time must not exceed 15 seconds from retrieval completion.
- **NFR-02 (Factual Consistency):** 0% tolerance for ungrounded factual claims (anti-hallucination policy).
- **NFR-03 (Determinism & Stability):** Brief structure must remain rigid across diverse LLM temperature variations (recommended temperature: 0.1 to 0.2).
- **NFR-04 (Usability):** Zero learning curve; interaction requires only typing or pasting a query.
- **NFR-05 (Portability):** System prompt and logic must be executable across standard LLM platforms (Gemini Studio, OpenAI Playground, Claude Console, or custom agent web UI).

---

## 7. Project Constraints & Assumptions

### 7.1 Constraints
- **Assessment Scope:** Scaled-down single-agent implementation tailored for the RemoteInternGlobal internship evaluation.
- **Stateless Operation:** No persistent SQL/NoSQL database; each session is independent.
- **Context Window Limitations:** System must operate within standard context windows (8k–32k tokens) without token exhaustion.
- **Platform Agnostic:** The agent prompt must function seamlessly whether deployed in a no-code workspace (Coze, Flowise, Dify, Google AI Studio) or a minimal code harness.

### 7.2 Key Assumptions
- Platform provides either live web browsing / retrieval tools or accepts pasted context blocks.
- The underlying model is an instruction-tuned LLM (e.g., Gemini 1.5/2.0 Flash/Pro, GPT-4o, or Claude 3.5 Sonnet) capable of strict adherence to negative constraints.
