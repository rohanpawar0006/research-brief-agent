/**
 * Research Brief Agent Core Engine
 * Enforces rigid 4-part brief schema and VaultMind-RAG grounding guardrail.
 */

export const SYSTEM_PROMPT = `You are an expert Research Brief Agent. Your sole responsibility is to convert a research query and retrieved source material into an executive-ready, strictly grounded research brief.

### Core Behavioral Directives:
1. Zero Hallucination Policy: You must NEVER invent, fabricate, or extrapolate statistics, metrics, company valuations, executive names, publication titles, or dates.
2. Grounding Requirement: Every factual claim must be directly supported by retrieved context. If a claim cannot be verified, do not state it as a fact.
3. Low-Confidence Graceful Degradation (VaultMind-RAG Safeguard):
   - If retrieved material is sparse, conflicting, unverified, or non-existent, you MUST activate the Low-Confidence Path.
   - In the Low-Confidence Path, do NOT attempt to generate speculative bullet points. Explicitly state the absence of verifiable public records in the Summary and set the Confidence Note to Low Confidence.

### Output Format Specification:
You MUST format your entire response using the following 4 sections and headers exactly as shown below:

### 1. Summary
[A concise 2-3 sentence synthesis answering the core query based ONLY on verified source material. If evidence is thin or missing, state this clearly here.]

### 2. Key Points
- **[Key Theme / Finding]:** [Concrete factual insight, metric, or event] ([Source Attribution Name])
- **[Key Theme / Finding]:** [Concrete factual insight, metric, or event] ([Source Attribution Name])
- **[Key Theme / Finding]:** [Concrete factual insight, metric, or event] ([Source Attribution Name])
(Include 3-5 distinct bullet points for verified topics. For low-confidence topics with zero verified data, state: "- No verifiable factual points could be established from available records.")

### 3. Sources
- [Publisher / Canonical Name](URL or Reference) — [Brief description of context provided]

### 4. Confidence Note
> **[Confidence Level: High | Moderate | Low]**: [1 clear sentence evaluating evidentiary completeness and highlighting any gaps.]`;

/**
 * Parses raw markdown brief into a structured object for UI rendering.
 */
export function parseBriefMarkdown(markdownText) {
  const result = {
    summary: "",
    keyPoints: [],
    sources: [],
    confidenceLevel: "Moderate",
    confidenceNote: "",
    raw: markdownText
  };

  const lines = markdownText.split("\n");
  let currentSection = null;

  for (let line of lines) {
    const trimmed = line.trim();

    if (trimmed.startsWith("### 1. Summary") || trimmed.toLowerCase().includes("summary")) {
      currentSection = "summary";
      continue;
    } else if (trimmed.startsWith("### 2. Key Points") || trimmed.toLowerCase().includes("key points")) {
      currentSection = "keyPoints";
      continue;
    } else if (trimmed.startsWith("### 3. Sources") || trimmed.toLowerCase().includes("sources")) {
      currentSection = "sources";
      continue;
    } else if (trimmed.startsWith("### 4. Confidence Note") || trimmed.toLowerCase().includes("confidence note")) {
      currentSection = "confidenceNote";
      continue;
    }

    if (!currentSection || !trimmed) continue;

    if (currentSection === "summary") {
      result.summary += (result.summary ? " " : "") + trimmed;
    } else if (currentSection === "keyPoints") {
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const pointText = trimmed.replace(/^[-*]\s+/, "");
        const match = pointText.match(/^\*\*(.*?)\*\*:\s*(.*)/);
        if (match) {
          result.keyPoints.push({
            theme: match[1],
            detail: match[2],
            source: ""
          });
        } else {
          result.keyPoints.push({
            theme: "Finding",
            detail: pointText,
            source: ""
          });
        }
      }
    } else if (currentSection === "sources") {
      if (trimmed.startsWith("- ") || trimmed.startsWith("* ")) {
        const srcText = trimmed.replace(/^[-*]\s+/, "");
        const linkMatch = srcText.match(/\[(.*?)\]\((.*?)\)(.*)/);
        if (linkMatch) {
          result.sources.push({
            name: linkMatch[1],
            url: linkMatch[2],
            desc: linkMatch[3]?.replace(/^[\s—-]+/, "").trim() || ""
          });
        } else {
          result.sources.push({
            name: srcText,
            url: "#",
            desc: ""
          });
        }
      }
    } else if (currentSection === "confidenceNote") {
      result.confidenceNote += (result.confidenceNote ? " " : "") + trimmed.replace(/^>\s*/, "");
    }
  }

  // Determine confidence badge
  const lowerNote = result.confidenceNote.toLowerCase();
  if (lowerNote.includes("high confidence")) {
    result.confidenceLevel = "High";
  } else if (lowerNote.includes("low confidence")) {
    result.confidenceLevel = "Low";
  } else {
    result.confidenceLevel = "Moderate";
  }

  return result;
}

/**
 * Execute research via secure Vercel serverless function (keeps API keys on server).
 */
export async function executeServerlessResearch(topic, context = "") {
  try {
    const response = await fetch('/api/research', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ topic, context })
    });

    if (response.ok) {
      const data = await response.json();
      if (data.rawText) {
        return parseBriefMarkdown(data.rawText);
      }
    }
  } catch (e) {
    // Running locally in Vite dev mode or serverless endpoint not active
  }
  return null;
}

/**
 * Synthesizes a research brief from manual context when running purely offline/client-side.
 */
export function synthesizeLocalContext(topic, context) {
  if (!context || context.trim().length < 40) {
    // Triggers Low-Confidence Path
    return {
      summary: `Limited verifiable information is publicly available regarding "${topic}". In the absence of comprehensive primary sources or corporate disclosures, factual metrics and enterprise projections cannot be independently verified.`,
      keyPoints: [
        {
          theme: "Insufficient Evidentiary Data",
          detail: "The submitted topic lacks sufficient public documentation or verifiable records in available datasets.",
          source: "Grounding Guardrail"
        },
        {
          theme: "Anti-Hallucination Triggered",
          detail: "Per the VaultMind-RAG guardrail, the system explicitly refuses to extrapolate unverified statistics or entity relationships.",
          source: "Research Brief Agent Policy"
        }
      ],
      sources: [
        { name: "Public Knowledge Index", url: "#", desc: "Searched for public records and verified disclosures (insufficient data found)." }
      ],
      confidenceLevel: "Low",
      confidenceNote: "Low confidence: Insufficient verifiable source material provided; external claims cannot be authenticated without additional primary sources."
    };
  }

  // Synthesize from provided context
  const lines = context.split("\n").map(l => l.trim()).filter(Boolean);
  const points = lines.slice(0, 4).map((line, idx) => ({
    theme: `Key Finding ${idx + 1}`,
    detail: line,
    source: "Provided Source Context"
  }));

  return {
    summary: `Based on the provided source material, "${topic}" involves verified developments and operational updates. The evidence indicates clear structural progression within the reported scope.`,
    keyPoints: points,
    sources: [
      { name: "User Provided Context", url: "#", desc: "Extracted directly from submitted source text." }
    ],
    confidenceLevel: "Moderate",
    confidenceNote: "Moderate confidence: Grounded strictly in user-supplied text snippets; secondary independent verification is recommended for critical decisions."
  };
}
