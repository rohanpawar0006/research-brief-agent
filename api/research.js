/**
 * Vercel Serverless Function — Research Brief Agent
 * Securely executes Gemini API calls using server-side environment variables.
 * Keeps the API key completely hidden from client-side JS bundles.
 */

const SYSTEM_PROMPT = `You are an expert Research Brief Agent. Your sole responsibility is to convert a research query and retrieved source material into an executive-ready, strictly grounded research brief.

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

export default async function handler(req, res) {
  // CORS Headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { topic, context } = req.body || {};

  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }

  // Read API key strictly from server-side environment variables
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    return res.status(503).json({ 
      error: 'GEMINI_API_KEY not configured on server. Use pre-loaded benchmarks or provide context.' 
    });
  }

  try {
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const promptContent = context
      ? `Topic: ${topic}\n\nRetrieved/Provided Source Context:\n${context}\n\nProduce the structured research brief following all system prompt instructions.`
      : `Topic: ${topic}\n\nSearch and retrieve the latest factual information, then produce the structured research brief. Remember to activate the Low-Confidence path if facts are unverified or non-existent.`;

    const payload = {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${SYSTEM_PROMPT}\n\n---\n\n${promptContent}` }]
        }
      ],
      generationConfig: {
        temperature: 0.1,
        maxOutputTokens: 2048
      }
    };

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.error?.message || `API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text || '';

    return res.status(200).json({ rawText });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
