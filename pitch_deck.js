const pptxgen = require("pptxgenjs");

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "Manisha Baloda";
pres.title = "BizAgent AI — AMD Developer Hackathon ACT II";

// Color palette — AMD Red + Dark theme (premium feel)
const C = {
  bg:      "0A0A0F",
  surface: "13131A",
  card:    "1A1A24",
  border:  "2A2A3A",
  red:     "ED1C24",
  orange:  "FF6B00",
  white:   "F0F0F0",
  muted:   "888888",
  green:   "22C55E",
  yellow:  "F59E0B",
};

const makeShadow = () => ({ type: "outer", color: "000000", blur: 10, offset: 3, angle: 45, opacity: 0.3 });

// ─────────────────────────────────────────
// SLIDE 1 — Title
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Red accent oval top-left
  s.addShape(pres.shapes.OVAL, { x: -0.5, y: -0.5, w: 3, h: 3, fill: { color: C.red, transparency: 85 }, line: { color: C.red, transparency: 85 } });

  // Orange accent oval bottom-right
  s.addShape(pres.shapes.OVAL, { x: 8.5, y: 3.5, w: 2.5, h: 2.5, fill: { color: C.orange, transparency: 80 }, line: { color: C.orange, transparency: 80 } });

  // AMD Badge
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 0.35, w: 2.4, h: 0.38, fill: { color: C.red, transparency: 80 }, line: { color: C.red }, rectRadius: 0.1 });
  s.addText("⚡ AMD GPU POWERED", { x: 0.5, y: 0.35, w: 2.4, h: 0.38, fontSize: 9, bold: true, color: C.red, align: "center", valign: "middle", margin: 0 });

  // Main title
  s.addText("BizAgent AI", { x: 0.5, y: 1.1, w: 9, h: 1.3, fontSize: 60, bold: true, color: C.white, fontFace: "Arial", align: "center" });

  // Gradient subtitle line
  s.addText("AI-Powered Business Assistant for Indian SMBs", {
    x: 0.5, y: 2.5, w: 9, h: 0.55, fontSize: 20, color: C.orange, align: "center", fontFace: "Arial", bold: true,
  });

  // Description
  s.addText("Multi-agent AI system running on AMD GPU Cloud\nAutomate customer support · Sales insights · GST compliance · Bilingual (Hindi + English)", {
    x: 1, y: 3.15, w: 8, h: 0.9, fontSize: 13, color: C.muted, align: "center", fontFace: "Arial",
  });

  // Bottom stats row
  const stats = [["63M+", "Indian SMBs"], ["$2B+", "Market Size"], ["$10K", "Prize Pool"], ["AMD", "GPU Cloud"]];
  stats.forEach(([val, lbl], i) => {
    const x = 0.8 + i * 2.2;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 4.3, w: 1.8, h: 0.9, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.1, shadow: makeShadow() });
    s.addText(val, { x, y: 4.35, w: 1.8, h: 0.4, fontSize: 18, bold: true, color: C.orange, align: "center", fontFace: "Arial" });
    s.addText(lbl, { x, y: 4.72, w: 1.8, h: 0.25, fontSize: 9, color: C.muted, align: "center", fontFace: "Arial" });
  });

  // Hackathon tag bottom
  s.addText("AMD Developer Hackathon: ACT II  |  Track 3: Unicorn Track  |  July 2026", {
    x: 0.5, y: 5.3, w: 9, h: 0.2, fontSize: 9, color: C.muted, align: "center", fontFace: "Arial",
  });

  s.addNotes("Welcome slide. Open with: '63 million Indian SMBs — none of them have an AI assistant. We built one. It runs on AMD GPUs. Here's BizAgent AI.'");
}

// ─────────────────────────────────────────
// SLIDE 2 — Problem
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("THE PROBLEM", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.red, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("63 Million Indian SMBs Are Running Blind", { x: 0.5, y: 0.65, w: 9, h: 0.7, fontSize: 30, bold: true, color: C.white, fontFace: "Arial" });

  const problems = [
    ["❌", "No Automated Support", "Shop owners manually reply to 50+ customer WhatsApp messages daily — wasting 3 hours every day"],
    ["❌", "No Sales Insights", "Most SMBs still use paper registers — no data, no trends, no idea what's selling"],
    ["❌", "GST Confusion", "₹50/day penalty for late GST filing — most owners miss deadlines due to complexity"],
    ["❌", "Language Barrier", "Every business tool is English-only — 500M+ Hindi speakers are left out"],
  ];

  problems.forEach(([icon, title, desc], i) => {
    const x = i % 2 === 0 ? 0.4 : 5.1;
    const y = i < 2 ? 1.55 : 3.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.3, h: 1.5, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.12, shadow: makeShadow() });
    s.addText(icon, { x: x + 0.15, y: y + 0.15, w: 0.5, h: 0.5, fontSize: 20, color: C.white });
    s.addText(title, { x: x + 0.7, y: y + 0.15, w: 3.4, h: 0.35, fontSize: 13, bold: true, color: C.white, fontFace: "Arial" });
    s.addText(desc, { x: x + 0.15, y: y + 0.55, w: 4.0, h: 0.8, fontSize: 10, color: C.muted, fontFace: "Arial" });
  });

  s.addNotes("Pause after each pain point. These are REAL problems — every SMB owner in India faces all four of these every single day.");
}

// ─────────────────────────────────────────
// SLIDE 3 — Solution
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("THE SOLUTION", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.green, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("BizAgent AI — One Product. All Four Problems Solved.", { x: 0.5, y: 0.65, w: 9, h: 0.7, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  const solutions = [
    ["C", "Customer Agent", "Auto-replies to WhatsApp & web queries in Hindi + English. 24/7, zero manual effort."],
    ["$", "Sales Agent", "Weekly revenue reports, top products, trends — all in plain simple language."],
    ["G", "GST Agent", "Filing deadlines, rate lookup, ITC guidance — never miss a deadline again."],
    ["I", "Inventory Agent", "Real-time low stock alerts and reorder reminders before you run out."],
    ["B", "Bilingual AI", "Full Hindi + English support. First AI assistant built for Bharat's businesses."],
    ["A", "AMD GPU Power", "Runs on AMD Developer Cloud via Fireworks AI. Fast, affordable, scalable."],
  ];

  solutions.forEach(([icon, title, desc], i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = 0.4 + col * 3.1;
    const y = 1.55 + row * 1.85;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 2.85, h: 1.65, fill: { color: C.card }, line: { color: i === 5 ? C.red : C.border }, rectRadius: 0.12, shadow: makeShadow() });
    s.addText(icon, { x: x + 0.15, y: y + 0.12, w: 0.5, h: 0.45, fontSize: 22 });
    s.addText(title, { x: x + 0.65, y: y + 0.12, w: 2.05, h: 0.45, fontSize: 12, bold: true, color: i === 5 ? C.orange : C.white, fontFace: "Arial" });
    s.addText(desc, { x: x + 0.15, y: y + 0.65, w: 2.55, h: 0.85, fontSize: 10, color: C.muted, fontFace: "Arial" });
  });

  s.addNotes("Each agent is a specialist. The orchestrator routes every query to the right agent automatically. Users just type naturally — in Hindi or English.");
}

// ─────────────────────────────────────────
// SLIDE 4 — Architecture
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("ARCHITECTURE", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.orange, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("Multi-Agent System on AMD GPU Cloud", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  // Layer 1 — User
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.35, w: 9.2, h: 0.65, fill: { color: "1A2A1A" }, line: { color: "22C55E" }, rectRadius: 0.1 });
  s.addText("USER LAYER  —  Web UI  ·  WhatsApp  ·  REST API  ·  Hindi / English Voice", { x: 0.4, y: 1.35, w: 9.2, h: 0.65, fontSize: 11, color: C.green, align: "center", valign: "middle", bold: true, fontFace: "Arial" });

  // Arrow down
  s.addShape(pres.shapes.LINE, { x: 4.9, y: 2.0, w: 0, h: 0.3, line: { color: C.muted, width: 1.5 } });

  // Layer 2 — Orchestrator
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.5, y: 2.3, w: 5, h: 0.7, fill: { color: "1A1A2A" }, line: { color: C.orange }, rectRadius: 0.1, shadow: makeShadow() });
  s.addText("🧠  ORCHESTRATOR AGENT  —  LangChain + Query Router + Session Memory", { x: 2.5, y: 2.3, w: 5, h: 0.7, fontSize: 10, color: C.orange, align: "center", valign: "middle", bold: true, fontFace: "Arial" });

  // Arrows down to sub-agents
  [1.0, 2.3, 3.6, 4.9, 6.2, 7.5].forEach(x => {
    s.addShape(pres.shapes.LINE, { x: x + 0.35, y: 3.0, w: 0, h: 0.3, line: { color: C.muted, width: 1 } });
  });

  // Layer 3 — Agents
  const agents = ["🤖 Customer", "📊 Sales", "🧾 GST", "📦 Inventory", "🌐 Translate", "💬 General"];
  agents.forEach((a, i) => {
    const x = 0.4 + i * 1.55;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 3.3, w: 1.3, h: 0.7, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.1 });
    s.addText(a, { x, y: 3.3, w: 1.3, h: 0.7, fontSize: 9, color: C.white, align: "center", valign: "middle", fontFace: "Arial" });
  });

  // Arrow
  s.addShape(pres.shapes.LINE, { x: 4.9, y: 4.0, w: 0, h: 0.3, line: { color: C.muted, width: 1.5 } });

  // Layer 4 — AMD
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 4.3, w: 9.2, h: 0.75, fill: { color: "2A0A0A" }, line: { color: C.red }, rectRadius: 0.1, shadow: makeShadow() });
  s.addText("⚡  AMD DEVELOPER CLOUD  —  ROCm  ·  Fireworks AI API  ·  LLaMA 3.1 8B + 70B  ·  GPU Inference", { x: 0.4, y: 4.3, w: 9.2, h: 0.75, fontSize: 11, color: C.red, align: "center", valign: "middle", bold: true, fontFace: "Arial" });

  // Tech stack row
  const tech = ["Python 3.11", "FastAPI", "LangChain", "Docker", "Supabase", "Fireworks AI"];
  tech.forEach((t, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4 + i * 1.55, y: 5.2, w: 1.3, h: 0.3, fill: { color: C.surface }, line: { color: C.border }, rectRadius: 0.05 });
    s.addText(t, { x: 0.4 + i * 1.55, y: 5.2, w: 1.3, h: 0.3, fontSize: 8, color: C.muted, align: "center", valign: "middle", fontFace: "Arial" });
  });

  s.addNotes("Key insight: The orchestrator uses LLaMA 3.1 8B for simple routing (saves tokens/cost) and 70B for complex specialist answers. This intelligent routing is efficient AND powerful.");
}

// ─────────────────────────────────────────
// SLIDE 5 — AMD Integration (KEY SLIDE)
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("AMD INTEGRATION", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.red, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("Built Deep on AMD Infrastructure", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 28, bold: true, color: C.white, fontFace: "Arial" });

  const amdItems = [
    ["AMD Developer Cloud", "All LLM inference runs on AMD GPU instances — not CUDA, not generic cloud. Pure AMD hardware powering every response."],
    ["Fireworks AI API", "AMD-hardware hosted LLaMA 3.1 models for ultra-low latency. Every agent call goes through Fireworks on AMD GPUs."],
    ["ROCm Compatible", "Architecture supports direct ROCm workloads — ready for fine-tuning BizAgent on Indian business data on AMD GPUs."],
    ["Intelligent Cost Routing", "Routes simple queries to LLaMA 3.1 8B (cheaper) and complex ones to 70B — maximizing AMD Cloud credit efficiency."],
  ];

  amdItems.forEach(([title, desc], i) => {
    const y = 1.4 + i * 1.0;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y, w: 9.2, h: 0.85, fill: { color: C.card }, line: { color: i === 0 ? C.red : C.border }, rectRadius: 0.1, shadow: makeShadow() });
    s.addShape(pres.shapes.OVAL, { x: 0.55, y: y + 0.18, w: 0.5, h: 0.5, fill: { color: C.red, transparency: 70 }, line: { color: C.red } });
    s.addText(`0${i + 1}`, { x: 0.55, y: y + 0.18, w: 0.5, h: 0.5, fontSize: 11, bold: true, color: C.red, align: "center", valign: "middle", fontFace: "Arial" });
    s.addText(title, { x: 1.2, y: y + 0.08, w: 3.5, h: 0.3, fontSize: 13, bold: true, color: C.white, fontFace: "Arial" });
    s.addText(desc, { x: 1.2, y: y + 0.42, w: 8.2, h: 0.35, fontSize: 10, color: C.muted, fontFace: "Arial" });
  });

  s.addNotes("CRITICAL slide for judging. Emphasize: we don't just USE AMD — we're built around it. The smart routing is specifically designed to maximize AMD cloud credit efficiency.");
}

// ─────────────────────────────────────────
// SLIDE 6 — Market Opportunity
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("MARKET OPPORTUNITY", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.yellow, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("The Largest Untapped AI Market in the World", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  // Big stats
  const bigStats = [
    ["63M+", "SMBs in India", C.orange],
    ["500M+", "Hindi Speakers", C.green],
    ["₹15,000Cr", "GST Penalty Market", C.red],
    ["$2B+", "Addressable Market", C.yellow],
  ];

  bigStats.forEach(([val, lbl, color], i) => {
    const x = 0.4 + i * 2.3;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.45, w: 2.0, h: 1.3, fill: { color: C.card }, line: { color }, rectRadius: 0.12, shadow: makeShadow() });
    s.addText(val, { x, y: 1.55, w: 2.0, h: 0.6, fontSize: 22, bold: true, color, align: "center", fontFace: "Arial" });
    s.addText(lbl, { x, y: 2.15, w: 2.0, h: 0.5, fontSize: 10, color: C.muted, align: "center", fontFace: "Arial" });
  });

  // Why now
  s.addText("WHY NOW?", { x: 0.5, y: 2.95, w: 9, h: 0.3, fontSize: 10, color: C.muted, bold: true, charSpacing: 3, fontFace: "Arial" });

  const whyNow = [
    ["📱", "UPI Revolution", "600M+ digital payment users — SMBs are already digital-first"],
    ["🏛️", "GST Mandate", "Every business must file GST — compliance tools are essential"],
    ["🤖", "GenAI Moment", "LLMs are now affordable enough for SMB pricing (<₹500/month)"],
    ["🇮🇳", "Hindi AI Gap", "Zero Hindi-first AI business tools exist today — whitespace opportunity"],
  ];

  whyNow.forEach(([icon, title, desc], i) => {
    const x = i % 2 === 0 ? 0.4 : 5.1;
    const y = i < 2 ? 3.3 : 4.35;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.3, h: 0.85, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.1 });
    s.addText(icon, { x: x + 0.1, y: y + 0.18, w: 0.45, h: 0.45, fontSize: 18 });
    s.addText(title, { x: x + 0.6, y: y + 0.08, w: 1.8, h: 0.3, fontSize: 11, bold: true, color: C.white, fontFace: "Arial" });
    s.addText(desc, { x: x + 0.6, y: y + 0.42, w: 3.5, h: 0.35, fontSize: 9, color: C.muted, fontFace: "Arial" });
  });

  s.addNotes("The combination of UPI adoption + GST mandate + affordable LLMs + Hindi language gap = perfect timing. BizAgent AI is a product the market is ready for TODAY.");
}

// ─────────────────────────────────────────
// SLIDE 7 — Demo Screenshot
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("LIVE DEMO", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.green, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("Production-Ready Dashboard — Built on AMD Cloud", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  // Mockup frame
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 1.35, w: 9.2, h: 3.9, fill: { color: C.surface }, line: { color: C.border }, rectRadius: 0.15, shadow: makeShadow() });

  // Browser bar
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.5, y: 1.45, w: 9.0, h: 0.35, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.08 });
  s.addShape(pres.shapes.OVAL, { x: 0.65, y: 1.53, w: 0.12, h: 0.12, fill: { color: "ED1C24" }, line: { color: "ED1C24" } });
  s.addShape(pres.shapes.OVAL, { x: 0.85, y: 1.53, w: 0.12, h: 0.12, fill: { color: "F59E0B" }, line: { color: "F59E0B" } });
  s.addShape(pres.shapes.OVAL, { x: 1.05, y: 1.53, w: 0.12, h: 0.12, fill: { color: "22C55E" }, line: { color: "22C55E" } });
  s.addText("localhost:8000  —  BizAgent AI", { x: 1.3, y: 1.47, w: 7.5, h: 0.3, fontSize: 9, color: C.muted, fontFace: "Arial", valign: "middle" });

  // Simulated UI panels
  // Left sidebar
  s.addShape(pres.shapes.RECTANGLE, { x: 0.5, y: 1.8, w: 2.2, h: 3.35, fill: { color: C.card }, line: { color: C.border } });
  s.addText("📊 ₹47,500\nThis Week", { x: 0.6, y: 1.9, w: 2.0, h: 0.55, fontSize: 11, color: C.orange, fontFace: "Arial", bold: true });
  s.addText("89 Orders  ↑ 12%", { x: 0.6, y: 2.5, w: 2.0, h: 0.3, fontSize: 9, color: C.green, fontFace: "Arial" });
  s.addText("⚠️ 3 Low Stock Alerts", { x: 0.6, y: 2.85, w: 2.0, h: 0.3, fontSize: 9, color: C.yellow, fontFace: "Arial" });
  s.addText("Quick Actions", { x: 0.6, y: 3.2, w: 2.0, h: 0.25, fontSize: 8, color: C.muted, fontFace: "Arial" });
  ["📊 Sales Report", "📦 Inventory", "🧾 GST Help", "💬 Customer"].forEach((btn, i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.6, y: 3.5 + i * 0.35, w: 1.9, h: 0.28, fill: { color: C.surface }, line: { color: C.border }, rectRadius: 0.05 });
    s.addText(btn, { x: 0.6, y: 3.5 + i * 0.35, w: 1.9, h: 0.28, fontSize: 8, color: C.white, fontFace: "Arial", valign: "middle", align: "center" });
  });

  // Chat area
  s.addShape(pres.shapes.RECTANGLE, { x: 2.7, y: 1.8, w: 4.6, h: 3.35, fill: { color: C.bg }, line: { color: C.border } });
  // Chat bubbles
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 4.5, y: 1.95, w: 2.6, h: 0.4, fill: { color: "FF6B0020" }, line: { color: "FF6B0040" }, rectRadius: 0.1 });
  s.addText("मेरी बिक्री कैसी है?", { x: 4.5, y: 1.95, w: 2.6, h: 0.4, fontSize: 9, color: C.white, fontFace: "Arial", valign: "middle", align: "center" });
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.85, y: 2.5, w: 3.8, h: 0.6, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.1 });
  s.addText("📊 इस हफ्ते ₹47,500 की बिक्री! पिछले हफ्ते से 12% ज्यादा। Product A सबसे ज्यादा बिका।", { x: 2.85, y: 2.5, w: 3.8, h: 0.6, fontSize: 8, color: C.white, fontFace: "Arial", valign: "middle" });
  // Input box
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.85, y: 4.8, w: 3.8, h: 0.28, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.08 });
  s.addText("Ask anything about your business...", { x: 2.85, y: 4.8, w: 3.8, h: 0.28, fontSize: 8, color: C.muted, fontFace: "Arial", valign: "middle" });

  // Right panel
  s.addShape(pres.shapes.RECTANGLE, { x: 7.3, y: 1.8, w: 2.3, h: 3.35, fill: { color: C.card }, line: { color: C.border } });
  s.addText("GST Deadlines", { x: 7.4, y: 1.9, w: 2.1, h: 0.25, fontSize: 9, bold: true, color: C.white, fontFace: "Arial" });
  [["GSTR-1", "11th", C.yellow], ["GSTR-3B", "20th", C.yellow], ["GSTR-9", "Dec 31", C.muted]].forEach(([name, due, color], i) => {
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 7.4, y: 2.2 + i * 0.42, w: 2.0, h: 0.35, fill: { color: C.surface }, line: { color: C.border }, rectRadius: 0.06 });
    s.addText(name, { x: 7.45, y: 2.22 + i * 0.42, w: 1.0, h: 0.3, fontSize: 9, color: C.white, fontFace: "Arial", valign: "middle" });
    s.addText(due, { x: 8.2, y: 2.22 + i * 0.42, w: 0.9, h: 0.3, fontSize: 9, color, fontFace: "Arial", valign: "middle", align: "right" });
  });
  s.addText("⚡ AMD GPU Powered", { x: 7.4, y: 4.7, w: 2.1, h: 0.3, fontSize: 8, color: C.red, fontFace: "Arial", bold: true });

  s.addText("▶  Live demo: localhost:8000  |  GitHub: github.com/manishabaloda4-cloud/bizagent-ai", {
    x: 0.5, y: 5.35, w: 9, h: 0.2, fontSize: 9, color: C.muted, align: "center", fontFace: "Arial",
  });

  s.addNotes("SHOW LIVE DEMO HERE. Open the browser to localhost:8000. Type a query in Hindi first — this always impresses judges. Then show the sales report and GST features.");
}

// ─────────────────────────────────────────
// SLIDE 8 — Business Model
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("BUSINESS MODEL", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.green, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("SaaS Model — ₹299 to ₹999/month per business", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  const tiers = [
    ["🌱", "Starter", "₹299/month", ["Customer query agent", "Basic sales reports", "GST deadline reminders", "Hindi + English support"], C.green],
    ["🚀", "Growth", "₹599/month", ["All Starter features", "Inventory management", "Advanced analytics", "WhatsApp integration"], C.orange],
    ["🏆", "Pro", "₹999/month", ["All Growth features", "Custom AI training", "Multi-location support", "Priority AMD GPU compute"], C.red],
  ];

  tiers.forEach(([icon, name, price, features, color], i) => {
    const x = 0.4 + i * 3.15;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y: 1.35, w: 2.85, h: 3.85, fill: { color: C.card }, line: { color: i === 1 ? color : C.border }, rectRadius: 0.15, shadow: makeShadow() });
    if (i === 1) {
      s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: x + 0.7, y: 1.25, w: 1.45, h: 0.28, fill: { color }, line: { color }, rectRadius: 0.08 });
      s.addText("POPULAR", { x: x + 0.7, y: 1.25, w: 1.45, h: 0.28, fontSize: 8, bold: true, color: C.white, align: "center", fontFace: "Arial" });
    }
    s.addText(icon, { x, y: 1.5, w: 2.85, h: 0.45, fontSize: 22, align: "center" });
    s.addText(name, { x, y: 1.95, w: 2.85, h: 0.35, fontSize: 16, bold: true, color: C.white, align: "center", fontFace: "Arial" });
    s.addText(price, { x, y: 2.32, w: 2.85, h: 0.4, fontSize: 18, bold: true, color, align: "center", fontFace: "Arial" });
    features.forEach((f, fi) => {
      s.addText(`✓  ${f}`, { x: x + 0.2, y: 2.85 + fi * 0.45, w: 2.45, h: 0.38, fontSize: 10, color: C.muted, fontFace: "Arial" });
    });
  });

  // Revenue projection
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 0.4, y: 5.2, w: 9.2, h: 0.3, fill: { color: C.surface }, line: { color: C.border }, rectRadius: 0.08 });
  s.addText("Revenue Projection: 1,000 SMBs × ₹500 avg = ₹5L/month ARR  |  10,000 SMBs = ₹5Cr/month ARR", {
    x: 0.4, y: 5.2, w: 9.2, h: 0.3, fontSize: 9, color: C.muted, align: "center", valign: "middle", fontFace: "Arial",
  });

  s.addNotes("Pricing is specifically designed for Indian SMBs — cheaper than a part-time assistant, way more powerful. ₹599/month is what most shop owners spend on chai for their staff monthly.");
}

// ─────────────────────────────────────────
// SLIDE 9 — What We Built (Completeness)
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  s.addText("WHAT WE BUILT", { x: 0.5, y: 0.3, w: 9, h: 0.3, fontSize: 10, color: C.orange, bold: true, charSpacing: 4, fontFace: "Arial" });
  s.addText("A Complete, Runnable Product — Not a Prototype", { x: 0.5, y: 0.65, w: 9, h: 0.55, fontSize: 26, bold: true, color: C.white, fontFace: "Arial" });

  const deliverables = [
    ["✅", "5 Specialist AI Agents", "Customer, Sales, GST, Inventory, Translation — all working"],
    ["✅", "Intelligent Orchestrator", "Auto-routes queries to the right agent in real time"],
    ["✅", "FastAPI Backend", "Production-ready REST API with session memory"],
    ["✅", "Full Dashboard UI", "Real-time sales, inventory alerts, GST deadlines, chat"],
    ["✅", "Bilingual Support", "Hindi + English — first AI assistant built for Bharat"],
    ["✅", "Docker Container", "One command deployment: docker-compose up"],
    ["✅", "Public GitHub Repo", "Open source with complete README and setup guide"],
    ["✅", "AMD GPU Integration", "Fireworks AI API on AMD hardware for all inference"],
  ];

  deliverables.forEach(([check, title, desc], i) => {
    const col = i % 2;
    const row = Math.floor(i / 2);
    const x = col === 0 ? 0.4 : 5.1;
    const y = 1.4 + row * 0.95;
    s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x, y, w: 4.3, h: 0.8, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.1 });
    s.addText(check, { x: x + 0.1, y: y + 0.15, w: 0.4, h: 0.4, fontSize: 16, color: C.green });
    s.addText(title, { x: x + 0.55, y: y + 0.08, w: 3.6, h: 0.3, fontSize: 12, bold: true, color: C.white, fontFace: "Arial" });
    s.addText(desc, { x: x + 0.55, y: y + 0.42, w: 3.6, h: 0.3, fontSize: 10, color: C.muted, fontFace: "Arial" });
  });

  s.addNotes("Completeness is a judging criterion — emphasize that every item here is WORKING, not planned. The judges can run it themselves with 'docker-compose up'.");
}

// ─────────────────────────────────────────
// SLIDE 10 — Closing / CTA
// ─────────────────────────────────────────
{
  const s = pres.addSlide();
  s.background = { color: C.bg };

  // Background accents
  s.addShape(pres.shapes.OVAL, { x: -1, y: -1, w: 5, h: 5, fill: { color: C.red, transparency: 90 }, line: { color: C.red, transparency: 90 } });
  s.addShape(pres.shapes.OVAL, { x: 7.5, y: 2.5, w: 4, h: 4, fill: { color: C.orange, transparency: 88 }, line: { color: C.orange, transparency: 88 } });

  s.addText("THE FUTURE OF INDIAN BUSINESS", { x: 0.5, y: 0.7, w: 9, h: 0.35, fontSize: 11, color: C.red, bold: true, charSpacing: 4, align: "center", fontFace: "Arial" });

  s.addText("Every Indian SMB\nDeserves an AI Assistant", { x: 0.5, y: 1.15, w: 9, h: 1.6, fontSize: 38, bold: true, color: C.white, align: "center", fontFace: "Arial" });

  s.addText("BizAgent AI makes that possible — running on AMD GPU Cloud,\nspeaking Hindi, understanding Indian business, available 24/7.", {
    x: 1, y: 2.85, w: 8, h: 0.65, fontSize: 14, color: C.muted, align: "center", fontFace: "Arial",
  });

  // CTA buttons
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 2.0, y: 3.65, w: 2.5, h: 0.6, fill: { color: C.red }, line: { color: C.red }, rectRadius: 0.1 });
  s.addText("🚀  Live Demo", { x: 2.0, y: 3.65, w: 2.5, h: 0.6, fontSize: 13, bold: true, color: C.white, align: "center", valign: "middle", fontFace: "Arial" });

  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 5.5, y: 3.65, w: 2.5, h: 0.6, fill: { color: C.card }, line: { color: C.orange }, rectRadius: 0.1 });
  s.addText("⚡  GitHub Repo", { x: 5.5, y: 3.65, w: 2.5, h: 0.6, fontSize: 13, bold: true, color: C.orange, align: "center", valign: "middle", fontFace: "Arial" });

  // Links
  s.addText("demo: localhost:8000  |  github.com/manishabaloda4-cloud/bizagent-ai", {
    x: 0.5, y: 4.4, w: 9, h: 0.25, fontSize: 10, color: C.muted, align: "center", fontFace: "Arial",
  });

  // Builder card
  s.addShape(pres.shapes.ROUNDED_RECTANGLE, { x: 3.0, y: 4.75, w: 4.0, h: 0.75, fill: { color: C.card }, line: { color: C.border }, rectRadius: 0.12, shadow: makeShadow() });
  s.addText("Built by Manisha Baloda", { x: 3.0, y: 4.82, w: 4.0, h: 0.3, fontSize: 12, bold: true, color: C.white, align: "center", fontFace: "Arial" });
  s.addText("B.Tech CSE AI/ML • LPU  |  github.com/manishabaloda4-cloud", {
    x: 3.0, y: 5.12, w: 4.0, h: 0.25, fontSize: 9, color: C.muted, align: "center", fontFace: "Arial",
  });

  s.addNotes("Close strong: '63 million SMBs. Zero AI assistants. One AMD GPU cloud. BizAgent AI changes that. Thank you.'");
}

// Write file
const outPath = "/mnt/user-data/outputs/BizAgent_AI_Pitch_Deck.pptx";
pres.writeFile({ fileName: outPath }).then(() => {
  console.log("✅ Pitch deck created:", outPath);
}).catch(e => console.error("Error:", e));
