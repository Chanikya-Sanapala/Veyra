import os
import json
from dotenv import load_dotenv

env_path = os.path.abspath(".env")
load_dotenv(env_path)

def generate_questions(job_description: str, language=None):
    api_key = os.getenv("OPENAI_API_KEY")
    if api_key and not api_key.startswith("removed"):
        try:
            from openai import OpenAI
            client = OpenAI(api_key=api_key)
            prompt = f"""
Generate exactly 5 interview questions.
Rules:
- 2-3 technical (1 scenario)
- Remaining HR
- If language or DSA present -> add 1 coding question
Return JSON:
{{"questions":[{{"type":"technical","text":"..."}}]}}
JOB: {job_description}
LANG: {language}
"""
            res = client.chat.completions.create(
                model="gpt-4o-mini",
                messages=[{"role": "user", "content": prompt}]
            )
            content = res.choices[0].message.content
            data = json.loads(content)
            if isinstance(data, dict) and "questions" in data:
                return data["questions"]
        except Exception as e:
            print(f"⚠️ OpenAI API call failed: {e}. Falling back to default question generator.")

    # Graceful Fallback if OpenAI API Key is absent or fails
    tech_skill = language if language else "software engineering"
    return [
        {"type": "technical", "text": f"What experience do you have with {tech_skill} and core tools related to this role?"},
        {"type": "technical", "text": "Describe the architecture of a complex project you recently built or maintained."},
        {"type": "scenario", "text": "How do you handle performance bottlenecks or unexpected bugs in production?"},
        {"type": "hr", "text": "What motivated you to apply for this position?"},
        {"type": "hr", "text": "How do you collaborate with cross-functional teams under tight deadlines?"}
    ]

