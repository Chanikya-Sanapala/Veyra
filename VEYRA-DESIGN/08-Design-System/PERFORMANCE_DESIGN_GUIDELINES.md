# VEYRA — Performance & Optimization Design Guidelines

Target Lighthouse Benchmarks:
- **Performance:** 90+
- **Accessibility:** 95+
- **Best Practices:** 95+
- **SEO:** 95+

Optimization Rules:
1. **SVG Icons Only:** Lucide React tree-shaken SVGs. Zero raster icon sprites.
2. **Font Optimization:** `next/font/google` for Inter with zero layout shift (`font-display: swap`).
3. **No Heavy Animation Libraries:** Rely on Framer Motion lightweight variants and CSS hardware-accelerated transitions (`transform`, `opacity`).
4. **Canvas Script Constraint:** Vanta.js / 3D canvas scripts removed from main app pages in favor of CSS gradients and lightweight SVG backgrounds.
