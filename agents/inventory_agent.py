"""
BizAgent AI — Inventory Agent
"""

INVENTORY_SYSTEM = """You are an inventory management assistant for Indian SMBs.
Help track stock levels, predict restocking needs, and prevent stockouts.
Always mention amounts in Indian Rupees (₹) and use practical Indian business context."""

SAMPLE_INVENTORY = [
    {"name": "Product A", "stock": 45, "reorder_point": 20, "unit_cost": 150, "status": "OK"},
    {"name": "Product B", "stock": 8, "reorder_point": 15, "unit_cost": 200, "status": "LOW"},
    {"name": "Product C", "stock": 3, "reorder_point": 10, "unit_cost": 350, "status": "CRITICAL"},
    {"name": "Product D", "stock": 120, "reorder_point": 30, "unit_cost": 80, "status": "OK"},
    {"name": "Product E", "stock": 0, "reorder_point": 25, "unit_cost": 500, "status": "OUT"},
]


class InventoryAgent:
    def __init__(self, client, language="english"):
        self.client = client
        self.language = language

    def get_alerts(self) -> list:
        return [item for item in SAMPLE_INVENTORY if item["status"] in ["LOW", "CRITICAL", "OUT"]]

    def run(self, query: str, history: list = None) -> str:
        alerts = self.get_alerts()
        context = f"""
Current Inventory Status:
{chr(10).join([f"- {i['name']}: {i['stock']} units (Status: {i['status']}, Reorder at: {i['reorder_point']})" for i in SAMPLE_INVENTORY])}

Urgent Alerts: {len(alerts)} items need attention
{chr(10).join([f"⚠️ {i['name']}: Only {i['stock']} left (CRITICAL)" for i in alerts])}

User Query: {query}
{'Respond in Hindi.' if self.language == 'hindi' else 'Respond in English.'}
"""
        messages = [
            {"role": "system", "content": INVENTORY_SYSTEM},
            {"role": "user", "content": context}
        ]
        response = self.client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-8b-instruct",
            messages=messages,
            max_tokens=400,
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()


"""
BizAgent AI — Translation Agent
Hindi <-> English for Indian SMB owners
"""

TRANSLATION_SYSTEM = """You are a translation assistant specialized in Indian business language.
Translate naturally and preserve business context.
For Hindi to English: translate clearly and professionally.
For English to Hindi: use simple, everyday Hindi (not formal Sanskrit-heavy Hindi).
Always preserve numbers, product names, and amounts as-is."""


class TranslationAgent:
    def __init__(self, client, language="english"):
        self.client = client
        self.language = language

    def run(self, query: str, history: list = None) -> str:
        direction = "Translate to English" if self.language == "hindi" else "Translate to Hindi"
        messages = [
            {"role": "system", "content": TRANSLATION_SYSTEM},
            {"role": "user", "content": f"{direction}: {query}"}
        ]
        response = self.client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-8b-instruct",
            messages=messages,
            max_tokens=300,
            temperature=0.1,
        )
        return response.choices[0].message.content.strip()
