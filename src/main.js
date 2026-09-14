import { BENCHMARKS } from './benchmarks.js';
import { executeServerlessResearch, synthesizeLocalContext } from './agent.js';

// DOM Elements
const presetContainer = document.getElementById('preset-buttons-container');
const topicInput = document.getElementById('topic-input');
const generateBtn = document.getElementById('generate-brief-btn');
const advancedToggleBtn = document.getElementById('toggle-advanced-btn');
const advancedBox = document.getElementById('advanced-context-box');
const contextInput = document.getElementById('context-input');

const confidenceBadge = document.getElementById('confidence-badge');
const confidenceBadgeText = document.getElementById('confidence-badge-text');
const domainLabel = document.getElementById('evaluation-domain');
const summaryEl = document.getElementById('brief-summary');
const keyPointsEl = document.getElementById('brief-key-points');
const sourcesEl = document.getElementById('brief-sources');
const confidenceBox = document.getElementById('brief-confidence-box');
const confidenceNoteEl = document.getElementById('brief-confidence-note');

const copyBtn = document.getElementById('copy-markdown-btn');
const copyBtnText = document.getElementById('copy-btn-text');
const downloadBtn = document.getElementById('download-brief-btn');
const loadingOverlay = document.getElementById('loading-overlay');
const loadingText = document.getElementById('loading-text');

let currentBrief = null;

// Initialize Presets
function initPresets() {
  presetContainer.innerHTML = '';

  BENCHMARKS.forEach((b, index) => {
    const card = document.createElement('button');
    card.type = 'button';
    card.className = `preset-card-btn ${index === 0 ? 'active' : ''}`;
    card.id = `preset-${b.id}`;

    const tagClass = b.type === 'high' ? 'tag-high' : 'tag-low';

    card.innerHTML = `
      <span class="preset-card-tag ${tagClass}">${b.tag}</span>
      <span class="preset-card-name">${b.title}</span>
      <span class="preset-card-desc">${b.topic}</span>
    `;

    card.addEventListener('click', () => {
      document.querySelectorAll('.preset-card-btn').forEach(btn => btn.classList.remove('active'));
      card.classList.add('active');
      topicInput.value = b.topic;
      renderBrief(b);
    });

    presetContainer.appendChild(card);
  });

  // Load default
  if (BENCHMARKS.length > 0) {
    topicInput.value = BENCHMARKS[0].topic;
    renderBrief(BENCHMARKS[0]);
  }
}

// Render Brief to UI
function renderBrief(data) {
  currentBrief = data;

  // Set confidence badge styling
  const confLevel = data.confidenceLevel || (data.type === 'high' ? 'High' : 'Low');
  confidenceBadge.className = `confidence-badge ${confLevel.toLowerCase()}`;
  confidenceBadgeText.textContent = `${confLevel} Confidence`;
  domainLabel.textContent = data.domain || 'Research Synthesis';

  // 1. Summary
  summaryEl.textContent = data.summary;

  // 2. Key Points
  keyPointsEl.innerHTML = '';
  data.keyPoints.forEach(pt => {
    const li = document.createElement('li');
    li.className = 'point-item';
    li.innerHTML = `
      <span class="point-theme">${pt.theme}:</span> ${pt.detail}
      ${pt.source ? `<span class="point-source">(${pt.source})</span>` : ''}
    `;
    keyPointsEl.appendChild(li);
  });

  // 3. Sources
  sourcesEl.innerHTML = '';
  data.sources.forEach(src => {
    const li = document.createElement('li');
    li.className = 'source-item';
    li.innerHTML = `
      <a href="${src.url || '#'}" target="_blank" rel="noopener noreferrer" class="source-link">${src.name}</a>
      ${src.desc ? `<span class="source-desc">— ${src.desc}</span>` : ''}
    `;
    sourcesEl.appendChild(li);
  });

  // 4. Confidence Note Box
  confidenceBox.className = `confidence-box ${confLevel.toLowerCase()}`;
  confidenceNoteEl.textContent = data.confidenceNote;
}

// Format current brief as Markdown string
function generateMarkdownOutput() {
  if (!currentBrief) return '';

  let md = `# Research Brief: ${topicInput.value.trim() || 'Executive Brief'}\n\n`;
  md += `### 1. Summary\n${currentBrief.summary}\n\n`;

  md += `### 2. Key Points\n`;
  currentBrief.keyPoints.forEach(pt => {
    md += `- **${pt.theme}**: ${pt.detail}${pt.source ? ` (${pt.source})` : ''}\n`;
  });
  md += `\n`;

  md += `### 3. Sources\n`;
  currentBrief.sources.forEach(src => {
    md += `- [${src.name}](${src.url || '#'}) ${src.desc ? `— ${src.desc}` : ''}\n`;
  });
  md += `\n`;

  md += `### 4. Confidence Note\n> ${currentBrief.confidenceNote}\n`;
  return md;
}

// Handle Synthesis Button
generateBtn.addEventListener('click', async () => {
  const query = topicInput.value.trim();
  if (!query) {
    topicInput.focus();
    return;
  }

  // Deselect preset buttons
  document.querySelectorAll('.preset-card-btn').forEach(btn => btn.classList.remove('active'));

  // Check if topic directly matches a benchmark
  const matchedBenchmark = BENCHMARKS.find(b => b.topic.toLowerCase() === query.toLowerCase());
  if (matchedBenchmark) {
    const card = document.getElementById(`preset-${matchedBenchmark.id}`);
    if (card) card.classList.add('active');
    renderBrief(matchedBenchmark);
    return;
  }

  // Show loading
  loadingOverlay.classList.add('active');
  generateBtn.disabled = true;

  try {
    const context = contextInput.value.trim();

    loadingText.textContent = 'Evaluating Evidence & Grounding Safeguards...';
    
    // Attempt secure serverless research if configured on Vercel
    let briefData = await executeServerlessResearch(query, context);

    // If serverless is unavailable or running locally, use deterministic local grounding
    if (!briefData) {
      await new Promise(r => setTimeout(r, 600));
      briefData = synthesizeLocalContext(query, context);
    }

    renderBrief({
      ...briefData,
      title: query,
      topic: query,
      domain: 'Synthesized Brief'
    });
  } catch (err) {
    alert(`Research Brief Agent Error: ${err.message}`);
  } finally {
    loadingOverlay.classList.remove('active');
    generateBtn.disabled = false;
  }
});

// Advanced Accordion Toggle
advancedToggleBtn.addEventListener('click', () => {
  const isOpen = advancedBox.classList.toggle('open');
  advancedToggleBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  advancedToggleBtn.querySelector('span').textContent = isOpen
    ? '▾ Hide Custom Source Context'
    : '▸ Advanced: Provide Custom Source Context Snippets';
});

// Copy Markdown to Clipboard
copyBtn.addEventListener('click', async () => {
  const md = generateMarkdownOutput();
  if (!md) return;

  try {
    await navigator.clipboard.writeText(md);
    copyBtnText.textContent = 'Copied!';
    setTimeout(() => {
      copyBtnText.textContent = 'Copy Markdown';
    }, 2000);
  } catch (err) {
    console.error('Failed to copy', err);
  }
});

// Download Markdown File
downloadBtn.addEventListener('click', () => {
  const md = generateMarkdownOutput();
  if (!md) return;

  const blob = new Blob([md], { type: 'text/markdown;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', 'research_brief.md');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
});

// Allow Enter key to trigger synthesis
topicInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    generateBtn.click();
  }
});

// Launch Presets on Load
initPresets();
