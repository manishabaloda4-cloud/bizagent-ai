"""
BizAgent AI — Customer Query Agent
Handles automated customer support for Indian SMBs
"""

CUSTOMER_SYSTEM_EN = """You are a professional customer support agent for an Indian SMB.
Your job is to answer customer queries politely and helpfully.
Keep responses short (2-3 sentences max), professional, and helpful.
If you don't know something specific, ask the business owner to update the FAQ."""

CUSTOMER_SYSTEM_HI = """आप एक भारतीय छोटे व्यापार के लिए एक पेशेवर ग्राहक सेवा एजेंट हैं।
आपका काम ग्राहकों के सवालों का विनम्रता और मददगार तरीके से जवाब देना है।
जवाब छोटे रखें (2-3 वाक्य), पेशेवर और सहायक।"""

COMMON_FAQS = {
    "timing": "We are open Monday to Saturday, 9 AM to 8 PM. Sunday: 10 AM to 6 PM.",
    "delivery": "We offer delivery within 5-7 business days. Express delivery available for extra charge.",
    "return": "Returns accepted within 7 days of purchase with original receipt.",
    "payment": "We accept cash, UPI (GPay, PhonePe, Paytm), credit/debit cards, and net banking.",
    "discount": "We offer 10% discount on orders above ₹500. Seasonal sales available.",
    "contact": "You can reach us at our store or WhatsApp us at the number provided.",
}


class CustomerAgent:
    def __init__(self, client, language="english"):
        self.client = client
        self.language = language
        self.system = CUSTOMER_SYSTEM_HI if language == "hindi" else CUSTOMER_SYSTEM_EN

    def _check_faq(self, query: str) -> str | None:
        """Quick FAQ lookup before calling the LLM."""
        q = query.lower()
        for key, answer in COMMON_FAQS.items():
            if key in q:
                return answer
        return None

    def run(self, query: str, history: list = None) -> str:
        # Try FAQ first (saves API credits)
        faq_answer = self._check_faq(query)
        if faq_answer and self.language == "english":
            return faq_answer

        messages = [{"role": "system", "content": self.system}]
        if history:
            messages.extend(history[-4:])
        messages.append({"role": "user", "content": query})

        response = self.client.chat.completions.create(
            model="accounts/fireworks/models/llama-v3p1-8b-instruct",
            messages=messages,
            max_tokens=256,
            temperature=0.3,
        )
        return response.choices[0].message.content.strip()
