"""
BizAgent AI — Master Orchestrator
Powered by Fireworks AI (AMD hardware) + LangChain
"""
import os
from fireworks.client import Fireworks
from dotenv import load_dotenv

load_dotenv()

client = Fireworks(api_key=os.getenv("FIREWORKS_API_KEY"))

SYSTEM_PROMPT = """You are BizAgent AI — an intelligent business assistant built specifically 
for Indian small and medium businesses (SMBs). You help owners with:

1. Customer query automation (reply in Hindi or English)
2. Sales and inventory reports
3. GST and tax compliance guidance  
4. Business insights and alerts
5. Bilingual support (Hindi + English)

You run on AMD GPU infrastructure via Fireworks AI for maximum performance.
Always be helpful, concise, and practical for Indian business owners.
If the user writes in Hindi, respond in Hindi. If English, respond in English.

IMPORTANT: You are a real working product, not a prototype. Give actionable answers."""

AGENT_ROUTER_PROMPT = """You are a routing agent. Analyze the user query and return ONLY 
one of these agent types as JSON:
{
  "agent": "customer|sales|inventory|gst|translation|general",
  "language": "hindi|english",
  "priority": "high|medium|low",
  "summary": "one line summary of query"
}

Query: {query}"""


def route_query(query: str) -> dict:
    """Route incoming query to the right specialist agent."""
    try:
        response = client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-8b-instruct",
            messages=[
                {"role": "system", "content": "You are a JSON-only routing agent. Return only valid JSON."},
                {"role": "user", "content": AGENT_ROUTER_PROMPT.format(query=query)}
            ],
            max_tokens=150,
            temperature=0.1,
        )
        import json
        text = response.choices[0].message.content.strip()
        # Clean markdown fences if present
        text = text.replace("```json", "").replace("```", "").strip()
        return json.loads(text)
    except Exception:
        return {"agent": "general", "language": "english", "priority": "medium", "summary": query}


def run_agent(query: str, agent_type: str, language: str, history: list = None) -> str:
    """Run the appropriate specialist agent."""
    from agents.customer_agent import CustomerAgent
    from agents.sales_agent import SalesAgent
    from agents.gst_agent import GSTAgent
    from agents.inventory_agent import InventoryAgent
    from agents.translation_agent import TranslationAgent

    agents_map = {
        "customer": CustomerAgent,
        "sales": SalesAgent,
        "gst": GSTAgent,
        "inventory": InventoryAgent,
        "translation": TranslationAgent,
    }

    AgentClass = agents_map.get(agent_type, None)
    if AgentClass:
        agent = AgentClass(client=client, language=language)
        return agent.run(query, history or [])
    else:
        return run_general(query, language, history)


def run_general(query: str, language: str, history: list = None) -> str:
    """General purpose agent for mixed queries."""
    messages = [{"role": "system", "content": SYSTEM_PROMPT}]
    if history:
        messages.extend(history[-6:])  # Last 3 exchanges
    messages.append({"role": "user", "content": query})

    response = client.chat.completions.create(
        model="accounts/fireworks/models/llama-v3p1-70b-instruct",
        messages=messages,
        max_tokens=512,
        temperature=0.4,
    )
    return response.choices[0].message.content.strip()


def process_query(query: str, history: list = None) -> dict:
    """Main entry point — route and process any business query."""
    route = route_query(query)
    response = run_agent(
        query=query,
        agent_type=route["agent"],
        language=route["language"],
        history=history
    )
    return {
        "response": response,
        "agent_used": route["agent"],
        "language": route["language"],
        "priority": route["priority"],
    }
