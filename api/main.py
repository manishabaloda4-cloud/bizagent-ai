"""
BizAgent AI — FastAPI Backend
Powered by AMD GPU Cloud via Fireworks AI
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import Optional
import os
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(
    title="BizAgent AI",
    description="AI-powered business assistant for Indian SMBs — built on AMD GPU Cloud",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---- Request/Response Models ----

class QueryRequest(BaseModel):
    query: str
    session_id: Optional[str] = "default"
    history: Optional[list] = []

class QueryResponse(BaseModel):
    response: str
    agent_used: str
    language: str
    priority: str
    session_id: str

class InventoryAlert(BaseModel):
    name: str
    stock: int
    status: str

# ---- In-memory session store (use Supabase in production) ----
sessions: dict = {}

# ---- Routes ----

@app.get("/")
async def root():
    return FileResponse("frontend/index.html")

@app.get("/health")
async def health():
    return {
        "status": "running",
        "model": "Fireworks AI on AMD GPU Cloud",
        "version": "1.0.0",
        "amd_powered": True
    }

@app.post("/api/chat", response_model=QueryResponse)
async def chat(req: QueryRequest):
    try:
        from agents.orchestrator import process_query

        # Get session history
        history = sessions.get(req.session_id, [])

        # Process query
        result = process_query(req.query, history)

        # Update session history
        history.append({"role": "user", "content": req.query})
        history.append({"role": "assistant", "content": result["response"]})
        sessions[req.session_id] = history[-20:]  # Keep last 10 exchanges

        return QueryResponse(
            response=result["response"],
            agent_used=result["agent_used"],
            language=result["language"],
            priority=result["priority"],
            session_id=req.session_id
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/api/inventory/alerts")
async def inventory_alerts():
    """Get low stock alerts."""
    from agents.inventory_agent import SAMPLE_INVENTORY
    alerts = [i for i in SAMPLE_INVENTORY if i["status"] in ["LOW", "CRITICAL", "OUT"]]
    return {"alerts": alerts, "total": len(alerts)}

@app.get("/api/sales/summary")
async def sales_summary():
    """Get current week sales summary."""
    from agents.sales_agent import SAMPLE_DATA
    return SAMPLE_DATA["this_week"]

@app.get("/api/gst/deadlines")
async def gst_deadlines():
    """Get upcoming GST filing deadlines."""
    return {
        "deadlines": [
            {"name": "GSTR-1", "due": "11th of every month", "description": "Sales return"},
            {"name": "GSTR-3B", "due": "20th of every month", "description": "Summary return"},
            {"name": "GSTR-9", "due": "December 31", "description": "Annual return"},
        ]
    }

@app.delete("/api/session/{session_id}")
async def clear_session(session_id: str):
    """Clear conversation history."""
    sessions.pop(session_id, None)
    return {"message": "Session cleared"}

# Serve frontend
app.mount("/frontend", StaticFiles(directory="frontend"), name="frontend")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("api.main:app", host="0.0.0.0", port=int(os.getenv("PORT", 8000)), reload=True)
