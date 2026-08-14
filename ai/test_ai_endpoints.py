import requests
import json

BASE_URL = "http://127.0.0.1:8000"

def test_health():
    print("--- 1. Testing GET /health ---")
    res = requests.get(f"{BASE_URL}/health")
    print("Status:", res.status_code)
    print("Response:", res.json())
    assert res.status_code == 200, "Health check failed"
    print("PASSED: /health")

def test_resume_matching():
    print("\n--- 2. Testing POST /api/match ---")
    files = {
        "jd": ("test_jd.txt", open("test_jd.txt", "rb"), "text/plain"),
        "resume": ("test_resume.txt", open("test_resume.txt", "rb"), "text/plain")
    }
    data = {"topk": 35, "fuzzy": 85}
    res = requests.post(f"{BASE_URL}/api/match", files=files, data=data)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
    assert res.status_code == 200, "Resume matching failed"
    assert "score" in res.json(), "Missing score in response"
    print("PASSED: /api/match")

def test_question_generation():
    print("\n--- 3. Testing POST /generate ---")
    payload = {
        "job": "Python Software Engineer with React and AWS experience",
        "lang": "Python"
    }
    res = requests.post(f"{BASE_URL}/generate", json=payload)
    print("Status:", res.status_code)
    print("Response:", json.dumps(res.json(), indent=2))
    assert res.status_code == 200, "Question generation failed"
    assert res.json().get("ok") is True, "ok flag false"
    print("PASSED: /generate")

if __name__ == "__main__":
    try:
        test_health()
        test_resume_matching()
        test_question_generation()
        print("\nALL AI ENDPOINT TESTS PASSED SUCCESSFULLY!")
    except Exception as e:
        print("\nAI ENDPOINT TEST FAILED:", e)
