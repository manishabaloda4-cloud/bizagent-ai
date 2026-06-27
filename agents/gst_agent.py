"""
BizAgent AI — GST & Tax Compliance Agent
Helps Indian SMBs with GST queries
"""

GST_KNOWLEDGE = {
    "registration": {
        "keywords": ["register", "registration", "sign up", "enroll", "पंजीकरण"],
        "answer": "GST registration is mandatory if your annual turnover exceeds ₹40 lakhs (₹20 lakhs for services). Register at gst.gov.in — it's free and takes 3-7 working days.",
        "hindi": "GST पंजीकरण अनिवार्य है यदि आपका वार्षिक कारोबार ₹40 लाख से अधिक है। gst.gov.in पर पंजीकरण करें — यह मुफ़्त है।"
    },
    "rate": {
        "keywords": ["rate", "percent", "tax", "दर", "प्रतिशत"],
        "answer": "GST rates: 0% (essentials like milk, vegetables), 5% (packaged food, transport), 12% (business services), 18% (most services, electronics), 28% (luxury goods). Check gst.gov.in/rate-finder for your product.",
        "hindi": "GST दरें: 0% (दूध, सब्जियां), 5% (पैकेज्ड फूड), 12% (व्यापार सेवाएं), 18% (इलेक्ट्रॉनिक्स), 28% (लक्जरी सामान)।"
    },
    "filing": {
        "keywords": ["file", "filing", "return", "gstr", "due date", "भरना", "रिटर्न"],
        "answer": "Key filing dates: GSTR-1 (sales) due 11th, GSTR-3B (summary) due 20th of each month. Annual return GSTR-9 due December 31st. Use ClearTax or GST portal.",
        "hindi": "मुख्य तारीखें: GSTR-1 हर महीने 11 तारीख, GSTR-3B 20 तारीख। वार्षिक रिटर्न GSTR-9 दिसंबर 31।"
    },
    "itc": {
        "keywords": ["itc", "input tax", "credit", "refund", "इनपुट"],
        "answer": "Input Tax Credit (ITC) lets you claim GST paid on business purchases. Claim ITC in GSTR-3B. Make sure your vendor has filed their returns, otherwise your ITC claim may be rejected.",
        "hindi": "इनपुट टैक्स क्रेडिट (ITC) आपको व्यापार खरीदारी पर चुकाए GST को वापस लेने की सुविधा देता है।"
    },
    "penalty": {
        "keywords": ["penalty", "late", "fine", "जुर्माना", "देरी"],
        "answer": "Late filing penalty: ₹50/day (₹25 CGST + ₹25 SGST) up to ₹5,000 max. Interest: 18% per annum on unpaid tax. File on time to avoid penalties!",
        "hindi": "देरी से जमा करने पर जुर्माना: ₹50/दिन, अधिकतम ₹5,000। बकाया कर पर 18% वार्षिक ब्याज।"
    }
}

GST_SYSTEM = """You are a GST and tax compliance expert for Indian small businesses.
Give practical, actionable advice. Always mention relevant GST portal links when helpful.
Keep answers clear and simple — business owners are not tax experts.
For complex cases, always recommend consulting a CA (Chartered Accountant)."""


class GSTAgent:
    def __init__(self, client, language="english"):
        self.client = client
        self.language = language

    def _quick_lookup(self, query: str) -> str | None:
        q = query.lower()
        for topic, data in GST_KNOWLEDGE.items():
            if any(kw in q for kw in data["keywords"]):
                return data["hindi"] if self.language == "hindi" else data["answer"]
        return None

    def run(self, query: str, history: list = None) -> str:
        quick = self._quick_lookup(query)
        if quick:
            return quick

        messages = [{"role": "system", "content": GST_SYSTEM}]
        if history:
            messages.extend(history[-4:])
        messages.append({"role": "user", "content": query})

        response = self.client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-70b-instruct",
            messages=messages,
            max_tokens=400,
            temperature=0.2,
        )
        return response.choices[0].message.content.strip()
