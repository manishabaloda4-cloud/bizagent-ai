"""
BizAgent AI — Sales Report Agent
Generates intelligent sales summaries and insights
"""
import json

SALES_SYSTEM = """You are a business analytics assistant for Indian SMBs.
Analyze sales data and provide:
1. Clear weekly/monthly summaries
2. Top performing products
3. Revenue trends
4. Actionable recommendations in simple language
Always mention amounts in Indian Rupees (₹).
Keep it practical and easy to understand for non-technical business owners."""

SAMPLE_DATA = {
    "this_week": {
        "total_revenue": 47500,
        "total_orders": 89,
        "avg_order_value": 534,
        "top_products": [
            {"name": "Product A", "units": 34, "revenue": 17000},
            {"name": "Product B", "units": 28, "revenue": 14000},
            {"name": "Product C", "units": 27, "revenue": 16500},
        ],
        "vs_last_week": "+12%",
        "best_day": "Saturday",
        "payment_split": {"UPI": "62%", "Cash": "28%", "Card": "10%"}
    }
}


class SalesAgent:
    def __init__(self, client, language="english"):
        self.client = client
        self.language = language

    def run(self, query: str, history: list = None) -> str:
        context = f"""
Current sales data for this week:
- Total Revenue: ₹{SAMPLE_DATA['this_week']['total_revenue']:,}
- Total Orders: {SAMPLE_DATA['this_week']['total_orders']}
- Average Order Value: ₹{SAMPLE_DATA['this_week']['avg_order_value']}
- Growth vs Last Week: {SAMPLE_DATA['this_week']['vs_last_week']}
- Best Day: {SAMPLE_DATA['this_week']['best_day']}
- Payment Methods: {json.dumps(SAMPLE_DATA['this_week']['payment_split'])}
- Top Products: {json.dumps(SAMPLE_DATA['this_week']['top_products'])}

User Query: {query}
{'Respond in Hindi.' if self.language == 'hindi' else 'Respond in English.'}
"""
        messages = [
            {"role": "system", "content": SALES_SYSTEM},
            {"role": "user", "content": context}
        ]

        response = self.client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-70b-instruct",
            messages=messages,
            max_tokens=512,
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()
