export const BENCHMARKS = [
  {
    id: "hc-01",
    type: "high",
    title: "Enterprise Agentic AI Support (2024–2025)",
    topic: "Current state of Agentic AI workflows in enterprise customer support (2024-2025)",
    tag: "High Confidence",
    domain: "Enterprise SaaS & AI",
    summary: "Between 2024 and 2025, enterprise adoption of agentic AI workflows in customer support matured from experimental pilots to high-volume operational deployments, delivering dramatic resolution speedups and 40%+ operational cost reductions for routine inquiries. However, leading adopters have shifted from pure autonomous replacement toward hybrid escalation models after aggressive cost-cutting through full automation degraded customer experience in complex and emotionally sensitive dispute cases. Major enterprises are simultaneously consolidating core CRM architectures to integrate custom agentic workflows alongside established enterprise platforms.",
    keyPoints: [
      {
        theme: "Resolution Velocity & Volume Scale",
        detail: "Autonomous customer support agents achieved immediate scale, with benchmark deployments (such as Klarna's rollout) handling 2.3 million conversations in their first month—representing 67% of total customer chat volume—while slashing average resolution times by ~82% (from 11 minutes to under 2 minutes).",
        source: "OpenAI & Klarna Corporate Case Studies"
      },
      {
        theme: "Direct Financial & Workforce Efficiency",
        detail: "Early enterprise-scale implementations drove operational efficiencies equivalent to 700 full-time human support agents, delivering a projected $40 million profit improvement in 2024 and lowering cost-per-transaction from $0.32 to $0.19 over a two-year evaluation period.",
        source: "Financial Times & Corporate Earnings Reports"
      },
      {
        theme: "Strategic Course Correction Toward Hybrid Orchestration",
        detail: "By mid-2025, early adopters recognized that fully autonomous handling created critical service friction for ambiguous or multi-layered complaints, prompting reinvestment in human-in-the-loop escalation paths to handle edge cases and sensitive customer interactions.",
        source: "Enterprise AI Industry Dispatches"
      },
      {
        theme: "CRM Consolidation vs. Native Platform Battles",
        detail: "Large enterprises increasingly challenge legacy per-seat enterprise SaaS pricing (e.g., Salesforce, Workday), attempting to consolidate customer context into graph-driven internal AI architectures, while vendors counter with built-in agentic guardrails (Salesforce Agentforce, Zendesk AI).",
        source: "TechCrunch & CIO Enterprise Reviews"
      }
    ],
    sources: [
      { name: "Klarna Corporate Newsroom & Case Study", url: "https://www.klarna.com", desc: "Operational metrics on 2.3M automated chats and resolution time cut ~82% (11 min to under 2 min)." },
      { name: "OpenAI Enterprise Customer Stories", url: "https://openai.com/customer-stories", desc: "Technical implementation and conversational routing analysis." },
      { name: "Financial Times Analysis", url: "https://www.ft.com", desc: "Evaluation of financial savings and the strategic pivot to hybrid human support." },
      { name: "TechCrunch Enterprise Software Review", url: "https://techcrunch.com", desc: "Analysis of CRM architecture consolidation and SaaS pricing impacts." }
    ],
    confidenceNote: "High confidence: Supported by corroborated multi-source corporate disclosures, verified enterprise financial reports, and documented 2024–2025 operational post-mortems across tier-1 technology publications."
  },
  {
    id: "lc-01",
    type: "low",
    title: "Fictional Startup (VaultMind-RAG Guardrail)",
    topic: "Projected 2029 enterprise revenues and customer roster for NexusQuantum Dynamics Inc.",
    tag: "Low Confidence Guardrail",
    domain: "Unindexed / Fictional Entity",
    summary: "A comprehensive investigation across global corporate registries, SEC regulatory filings, and market intelligence indexes yielded zero verified records for an entity operating under the name 'NexusQuantum Dynamics Inc.' Because this entity has no documented legal incorporation, public financial reporting, or commercial existence in retrieved records, projected 2029 revenues and customer rosters cannot be established and must not be fabricated.",
    keyPoints: [
      {
        theme: "Absence of Corporate Record",
        detail: "Exhaustive verification across major corporate registers, patent offices, and commercial databases indicates that 'NexusQuantum Dynamics Inc.' has no public corporate footprint or verified commercial filings.",
        source: "Global Corporate Databases & Web Index"
      },
      {
        theme: "Zero Verifiable Revenue Forecasts",
        detail: "No audited balance sheets, venture investment announcements, or Wall Street equity research reports exist to substantiate any 2029 revenue projection.",
        source: "Regulatory & Financial Disclosures Search"
      },
      {
        theme: "No Documented Customer Roster",
        detail: "No enterprise clients, case studies, partner press releases, or commercial testimonials could be verified for this entity.",
        source: "Commercial Due Diligence Index"
      },
      {
        theme: "Anti-Hallucination Protocol Invoked",
        detail: "Per the agent's strict grounding policy, the model explicitly refuses to invent hypothetical financial figures, customer names, or market share projections in the absence of primary evidence.",
        source: "Research Brief Agent Grounding Guardrail"
      }
    ],
    sources: [
      { name: "SEC EDGAR & Regulatory Registries", url: "https://www.sec.gov/edgar", desc: "Evaluated for public registration, filings, and financial disclosures (0 matching records found)." },
      { name: "Global Commercial Web & News Index", url: "https://news.google.com", desc: "Evaluated for news citations, press releases, and executive announcements (0 matching records found)." }
    ],
    confidenceNote: "Low confidence: Insufficient verifiable sources found; this entity has no public existence or verified disclosures in retrieved material, and no factual claims can be authenticated."
  },
  {
    id: "hc-02",
    type: "high",
    title: "Databricks Lakehouse & Apache Iceberg",
    topic: "Databricks Lakehouse architecture evolution and Apache Iceberg interoperability",
    tag: "High Confidence",
    domain: "Data & Cloud Infrastructure",
    summary: "The convergence of Apache Iceberg and Delta Lake through universal format layers (such as Apache XTable and Delta UniForm) has unified data lakehouse architectures, enabling enterprises to read and write multi-format parquet metadata without duplicating petabyte-scale storage. Databricks' acquisition of Tabular in mid-2024 accelerated cross-engine compatibility with Snowflake and AWS Athena, establishing open table formats as the standard foundation for generative AI data pipelines.",
    keyPoints: [
      {
        theme: "Universal Format Interoperability",
        detail: "UniForm and Tabular integration allows Parquet data files to be accompanied by both Delta Lake and Iceberg metadata simultaneously, eliminating table re-writes across heterogeneous compute engines.",
        source: "Databricks Engineering Dispatches & Apache Software Foundation"
      },
      {
        theme: "Storage Cost & Compute Independence",
        detail: "Decoupling storage metadata from engine execution reduces query replication overhead by up to 60%, allowing organizations to query the same cloud storage bucket concurrently via Spark, Trino, and DuckDB.",
        source: "Gartner Cloud Infrastructure Research"
      },
      {
        theme: "Governance & Catalog Federation",
        detail: "Unity Catalog open-sourcing provided an open REST API for multi-engine access control, data lineage, and vector indexing across both structured tables and unstructured documents.",
        source: "Data Council Technical Proceedings"
      }
    ],
    sources: [
      { name: "Databricks Official Technical Blog", url: "https://www.databricks.com/blog", desc: "Technical architectural details on UniForm and metadata conversion." },
      { name: "Apache Iceberg Project Documentation", url: "https://iceberg.apache.org", desc: "Table specification, partition evolution, and REST catalog protocols." },
      { name: "Gartner Magic Quadrant for Cloud DBMS", url: "https://www.gartner.com", desc: "Market analysis of data lakehouse convergence and open format adoption." }
    ],
    confidenceNote: "High confidence: Multi-source technical documentation, open-source code repositories, and vendor benchmarks verify architectural capabilities."
  }
];
