# 🤖 BizAgent AI
### AI-Powered Business Assistant for Indian SMBs
**Built for AMD Developer Hackathon: ACT II | Prize Pool $10,000**

![AMD GPU Powered](https://img.shields.io/badge/AMD-GPU%20Powered-ED1C24?style=for-the-badge&logo=amd)
![Fireworks AI](https://img.shields.io/badge/Fireworks-AI%20API-FF6B00?style=for-the-badge)
![Python](https://img.shields.io/badge/Python-3.11-3776AB?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-0.111-009688?style=for-the-badge&logo=fastapi)
![Docker](https://img.shields.io/badge/Docker-Containerized-2496ED?style=for-the-badge&logo=docker)

---

## 🎯 Problem Statement

India has **63 million+ small and medium businesses (SMBs)** — shopkeepers, traders, service providers — who struggle with:

- ❌ No automated customer support (manually reply to 50+ queries/day)
- ❌ No real-time sales insights (still using paper registers)
- ❌ GST compliance confusion (₹50/day penalty for late filing)
- ❌ Language barrier (most tools only in English, not Hindi)

**BizAgent AI solves all four problems in one product.**

---

## 💡 Solution

BizAgent AI is a **multi-agent AI system** that acts as a 24/7 intelligent business assistant for Indian SMB owners. It runs entirely on **AMD GPU Cloud** via Fireworks AI API, making it fast, affordable, and scalable.

### Core Features

| Feature | Description |
|---|---|
| 🤖 **Customer Query Automation** | Auto-replies to customer FAQs in Hindi & English |
| 📊 **Sales Intelligence** | Weekly revenue reports with actionable insights |
| 📦 **Inventory Alerts** | Real-time low stock detection and reorder reminders |
| 🧾 **GST Compliance** | Filing deadlines, rate lookup, ITC guidance |
| 🇮🇳 **Bilingual Support** | Full Hindi + English language support |
| ⚡ **AMD GPU Powered** | Low latency inference on AMD hardware via Fireworks AI |

---

## 🏗️ Architecture

```
User Input (Web UI / API)
        ↓
  Query Router Agent          ← Fireworks AI (AMD GPU Cloud)
  (LangChain + LLaMA 3.1)
        ↓
  ┌─────────────────────────────────────┐
  │         Specialist Agents           │
  ├──────────────┬──────────────────────┤
  │ Customer     │ GST / Tax Agent      │
  │ Agent        │ Sales Report Agent   │
  │              │ Inventory Agent      │
  │              │ Translation Agent    │
  └──────────────┴──────────────────────┘
        ↓
  AMD Developer Cloud (ROCm + GPU Inference)
        ↓
  FastAPI Backend → Frontend Dashboard
```

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **AI Inference** | Fireworks AI API (AMD GPU hardware) |
| **LLM Models** | LLaMA 3.1 8B + 70B Instruct |
| **Agent Framework** | LangChain + Custom Routing |
| **Backend** | FastAPI + Python 3.11 |
| **Frontend** | Vanilla JS + CSS (no framework needed) |
| **Database** | Supabase (PostgreSQL) |
| **Containerization** | Docker + Docker Compose |
| **AMD Stack** | AMD Developer Cloud + ROCm |

---

## 🚀 Quick Start

### Prerequisites
- Python 3.11+
- Docker
- Fireworks AI API key (free $50 credits from AMD ADP)
- AMD AI Developer Program account

### 1. Clone the Repository
```bash
git clone https://github.com/manishabaloda4-cloud/bizagent-ai.git
cd bizagent-ai
```

### 2. Set Up Environment Variables
```bash
cp .env.example .env
# Edit .env with your API keys
```

Required keys in `.env`:
```
FIREWORKS_API_KEY=your_fireworks_api_key
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. Run with Docker (Recommended)
```bash
docker-compose up --build
```

### 4. Run Locally (Development)
```bash
pip install -r requirements.txt
uvicorn api.main:app --reload --port 8000
```

### 5. Open the App
```
http://localhost:8000
```

---

## 📁 Project Structure

```
bizagent-ai/
├── agents/
│   ├── __init__.py
│   ├── orchestrator.py       # Master routing agent
│   ├── customer_agent.py     # Customer query handler
│   ├── sales_agent.py        # Sales analytics agent
│   ├── gst_agent.py          # GST compliance agent
│   ├── inventory_agent.py    # Stock tracking agent
│   └── translation_agent.py  # Hindi/English translator
├── api/
│   └── main.py               # FastAPI backend
├── frontend/
│   └── index.html            # Full dashboard UI
├── Dockerfile                # Production container
├── docker-compose.yml        # Multi-service setup
├── requirements.txt
├── .env.example
└── README.md
```

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/health` | Health check + AMD status |
| `POST` | `/api/chat` | Main chat endpoint |
| `GET` | `/api/sales/summary` | Weekly sales data |
| `GET` | `/api/inventory/alerts` | Low stock alerts |
| `GET` | `/api/gst/deadlines` | GST filing deadlines |
| `DELETE` | `/api/session/{id}` | Clear chat history |

### Chat API Example
```bash
curl -X POST http://localhost:8000/api/chat \
  -H "Content-Type: application/json" \
  -d '{
    "query": "What are my top selling products this week?",
    "session_id": "user_123"
  }'
```

Response:
```json
{
  "response": "Your top product this week is Product A with ₹17,000 in revenue...",
  "agent_used": "sales",
  "language": "english",
  "priority": "medium",
  "session_id": "user_123"
}
```

---

## 🎯 AMD Platform Integration

BizAgent AI deeply integrates with AMD infrastructure:

1. **AMD Developer Cloud** — All LLM inference runs on AMD GPU instances
2. **Fireworks AI API** — AMD-hardware hosted LLaMA 3.1 models for low-latency responses
3. **ROCm Compatible** — Architecture supports direct ROCm workloads for future fine-tuning
4. **Cost Optimized** — Intelligent routing uses 8B model for simple queries, 70B for complex ones — minimizing AMD Cloud credit usage

---

## 🇮🇳 Why India? Market Opportunity

- 63M+ SMBs in India — fastest growing segment
- 500M+ Hindi speakers — need vernacular AI tools
- GST compliance = ₹15,000 Cr penalty market annually
- UPI payments = digital-first, AI-ready businesses

**BizAgent AI targets a $2B+ addressable market.**

---

## 🏆 Hackathon Track

**Track 3: Unicorn Track** — Building a startup-oriented product with real market potential.

This is not a prototype — BizAgent AI is a **production-ready MVP** that can be deployed for real Indian SMBs today.

---

## 👤 Builder

**Manisha Baloda**
- 🎓 B.Tech CSE (AI/ML) — Lovely Professional University
- 🐙 GitHub: [@manishabaloda4-cloud](https://github.com/manishabaloda4-cloud)
- 🏗️ Projects: FarmSense (Multi-Agent AI), TalentRadar AI, CareerCraft AI

---

## 📄 License

MIT License — Open source and free to use.

---

*Built with ❤️ on AMD GPU Cloud | AMD Developer Hackathon: ACT II 2026*
