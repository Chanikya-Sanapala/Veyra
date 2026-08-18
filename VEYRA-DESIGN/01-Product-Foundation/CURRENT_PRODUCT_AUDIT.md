# VEYRA — Current Product Audit (CHANIX Codebase)

> [!IMPORTANT]
> **Audit Status:** Inspection complete. No code changes, file deletions, API modifications, or database mutations were performed during this audit. All secret values and credentials have been excluded.

---

## 1. System Architecture & Tech Stack Overview

| Layer | Technology / Framework | Configuration / Details |
| :--- | :--- | :--- |
| **Frontend** | Next.js 15.1.7 (React 19) | Tailwind CSS v3, Framer Motion, Recharts, Lucide React, Vanta.js (Three.js) |
| **Backend** | Node.js (v18+) / Express (v4.21) | ES Modules (`"type": "module"`), CORS, Helmet, Rate Limiter |
| **AI Engine** | Python (v3.9+) / FastAPI | Uvicorn, scikit-learn (TF-IDF), RapidFuzz, pdfplumber, python-docx, spacy |
| **Database** | MongoDB | Managed via Mongoose (v8.9), schema validation, indexes |
| **Authentication**| JWT & Google OAuth2 | `jsonwebtoken` (v9.0), `bcryptjs` (v2.4), `google-auth-library` (v9.15) |
| **File Storage** | Local Disk Storage | Files stored in `/uploads/` directory on backend server |

---

## 2. Codebase Structure

```
CHANIX-FUTURE-OF-AI-RECRUITMENT-main/
├── backend/
│   ├── src/
│   │   ├── app.js               # Express application setup & middleware
│   │   ├── config/              # DB connection & JWT settings
│   │   ├── controllers/         # Auth, Profile, Interview, Connection, Analytics controllers
│   │   ├── middleware/          # Auth middleware & rate limiters
│   │   ├── models/              # Mongoose schemas (User, JobSeekerProfile, RecruiterProfile, Job, Application, Interview, etc.)
│   │   ├── routes/              # Express route definitions
│   │   └── utils/               # Response handlers, email dispatchers, schedulers
│   ├── server.js                # Backend entry point
│   ├── package.json
│   └── uploads/                 # Storage for uploaded resumes
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── (components)/    # Landing page, Dashboards, Matcher, Profile, Auth screens
│   │   │   ├── globals.css      # Custom styles, supercar-theme gradients, Tailwind directives
│   │   │   └── layout.js        # Root layout wrapper
│   │   └── components/          # ProfilePage component
│   ├── package.json
│   └── next.config.mjs
└── ai/
    ├── api_server.py            # FastAPI server entry point
    ├── resume_matchmaker2.py    # Resume ↔ JD matching algorithm (TF-IDF + Fuzzy + N-gram)
    ├── interview.py             # Audio/TTS interview session logic
    ├── question_gen.py          # Dynamic question generation
    ├── booking.py               # ICS calendar invitation generation
    └── requirements.txt
```

---

## 3. Existing Core Flow Implementation Locations

### Resume Parsing & Extraction Location
- **AI Engine:** [`ai/resume_matchmaker2.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/resume_matchmaker2.py) (`read_file`, `extract_terms`, `pdfplumber`, `python-docx`).
- **Backend Controller:** [`backend/src/controllers/profileController.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/controllers/profileController.js) (handles resume upload endpoint `/api/profile/upload-resume`).

### Resume Matching Engine & Resume Match Score Location
- **AI Matching Module:** [`ai/resume_matchmaker2.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/resume_matchmaker2.py) — calculates TF-IDF cosine similarity, fuzzy term matching via `rapidfuzz`, term coverage, missing terms, and actionable match suggestions.
- **FastAPI Endpoint:** [`ai/api_server.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/api_server.py) (`/api/match`).
- **Backend Subprocess Endpoint:** [`backend/src/routes/matchResumes.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/routes/matchResumes.js) — executes `resume_matchmaker2.py` via Node `child_process.spawn`.
- **Application Scoring Integration:** [`backend/src/routes/applicationRoutes.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/routes/applicationRoutes.js) — updates candidate application record with calculated match score.

### AI Interview Module Location
- **AI Logic:** [`ai/interview.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/interview.py), [`ai/question_gen.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/question_gen.py), [`ai/api_server.py`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/ai/api_server.py).
- **Backend Routes & Controller:** [`backend/src/routes/interviewRoutes.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/routes/interviewRoutes.js) and [`backend/src/controllers/interviewController.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/controllers/interviewController.js).
- **Database Schema:** [`backend/src/models/Interview.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/models/Interview.js).

### Authentication & Authorization Location
- **Backend Controller:** [`backend/src/controllers/authController.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/controllers/authController.js) (registration, login, Google OAuth, password reset).
- **Middleware:** [`backend/src/middleware/authMiddleware.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/middleware/authMiddleware.js) (JWT verification).
- **Database Schema:** [`backend/src/models/User.js`](file:///c:/Users/sanap/Downloads/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/CHANIX-FUTURE-OF-AI-RECRUITMENT-main/backend/src/models/User.js).

---

## 4. Existing API Routes Audit

| Endpoint Route | Method | Description | Redesign Classification |
| :--- | :--- | :--- | :--- |
| `/api/auth/register` | POST | User registration (jobseeker/recruiter) | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/auth/login` | POST | Authenticate user & return JWT token | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/auth/google-auth` | POST | Google OAuth login/signup | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/profile/jobseeker` | GET/PUT | Candidate profile management | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/profile/recruiter` | GET/PUT | Recruiter profile management | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/profile/upload-resume` | POST | Resume document upload | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/jobs` | GET/POST | Job listing creation & discovery | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/applications` | GET/POST | Submit application & track status | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/interviews` | GET/POST | Schedule & evaluate AI interviews | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/match-resume` | POST | Standalone resume matching tool | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/analytics` | GET | Recruiter analytics & dashboard stats | **KEEP** (Backend) / **REDESIGN UI** (Frontend) |
| `/api/assessments` | GET/POST | Assessment tests & quizzes | **REFACTOR LATER** |
| `/api/games` | GET/POST | Candidate streak/games feature | **REFACTOR LATER** |
| `/api/events` | GET/POST | Recruitment events | **REFACTOR LATER** |
| `/api/competitions` | GET/POST | Hackathons & coding competitions | **REFACTOR LATER** |
| `/api/connections` | GET/POST | Networking connection requests | **REFACTOR LATER** |

---

## 5. Existing Feature Audit & Classification Table

| Feature Component | Current Implementation | Proposed VEYRA Action |
| :--- | :--- | :--- |
| **Authentication Flow** | Working JWT + Google OAuth | **KEEP Backend / REDESIGN UI** |
| **MongoDB Schemas** | User, Profiles, Job, Application, Interview | **KEEP Intact** |
| **Resume Matching Algorithm** | Python TF-IDF + RapidFuzz (`resume_matchmaker2.py`) | **KEEP Intact (Core Logic)** |
| **Resume Match Score Calculation** | Multi-factor python calculations | **KEEP Intact (Core Logic)** |
| **AI Interview Question Generator** | Python script + OpenAI/Local fallback | **KEEP Intact** |
| **Landing Page** | High-contrast supercar themed landing page | **REDESIGN UI (VEYRA Brand)** |
| **Recruiter Dashboard** | Dark-mode metrics dashboard | **REDESIGN UI (VEYRA Workspace)** |
| **Jobseeker Dashboard** | Candidate portal with streak widget | **REDESIGN UI (VEYRA Portal)** |
| **Resume Matcher Interface** | Basic upload form & raw output | **REDESIGN UI (Transparent Breakdown)** |
| **AI Interview Portal** | Basic web interface | **REDESIGN UI (Product-First UX)** |
| **Gamification / Games** | Daily workout / streak games | **REFACTOR LATER** |
| **Events & Competitions** | Secondary community routes | **REFACTOR LATER** |

---

## 6. Technical Risks & Integration Mitigation Plan

1. **Python Subprocess Dependency:** Node.js executes Python via `child_process.spawn` in `matchResumes.js`. Environment differences (Python binary path) can cause runtime failures if not configured via environment variables (`PYTHON_EXEC`).
   - *Mitigation:* Ensure robust fallback to FastAPI `/api/match` service or standard env configuration.
2. **FastAPI & Express Dual Server Setup:** Running two standalone servers (Express on 5000, FastAPI on 8000) requires precise CORS configuration and port management during local dev and production deployment.
   - *Mitigation:* Maintain clean environment variable mapping for API targets in Next.js.
3. **Preservation of Business Logic:** During upcoming UI redesign stages (Stages 09-13), visual changes must strictly avoid altering API payload structures, model definitions, or match score calculation inputs.
