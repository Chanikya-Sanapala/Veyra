# VEYRA — Card System Architecture

> [!IMPORTANT]
> All card components share a unified base specification:
> Background `white` (`#FFFFFF`), Border `1px solid #E2E8F0`, Radius `8px` (`radius-lg`), Elevation `shadow-sm`.

---

## Card Variant Catalog

1. **Base Card:** Container for general content sections (`padding: 24px`).
2. **Metric / KPI Card:** Recruiter dashboard KPI block (Metric value `36px`, comparison tag `↑ 12.4%`).
3. **Candidate Card:** Candidate summary block (Candidate Name, Match Badge `94% Match`, Status Badge `Interview`, Quick CTA).
4. **Job Card:** Job vacancy listing (Title, Company, Location, Match Badge, `Apply Now` CTA).
5. **Insight Card:** AI synthesis block (Glowing blue accent border `border-l-4 border-primary-600`, AI Summary text).
