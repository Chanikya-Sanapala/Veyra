# VEYRA — Form System Architecture

## 1. Input Controls Token Specs
- **Default State:** Background `white`, Border `1px solid #E2E8F0`, Text `#1E293B`, Placeholder `#94A3B8`.
- **Focus State:** Border `1px solid #2563EB`, Focus Ring `0 0 0 2px rgba(37, 99, 235, 0.2)`.
- **Error State:** Border `1px solid #DC2626`, Focus Ring `0 0 0 2px rgba(220, 38, 38, 0.2)`, Helper Text `#DC2626`.

---

## 2. Core Resume Upload Dropzone Component Spec
The resume upload control (`/api/profile/upload-resume`) receives custom visual emphasis:

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                                                                             │
│                        [ 📄 RESUME UPLOAD DROPZONE ]                        │
│                                                                             │
│              Drag and drop your resume file here, or [ Browse ]             │
│                        Supports PDF and DOCX (Max 10MB)                     │
│                                                                             │
└─────────────────────────────────────────────────────────────────────────────┘
```
- Border: `2px dashed #CBD5E1` (Hover: `#2563EB`).
- Background: `#F8FAFC` (Hover: `#EFF6FF`).
- Status Feedback: Step indicator (Parsing → Extracting Skills → Mapping Experience).
