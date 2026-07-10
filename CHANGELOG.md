# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] - 2026-07-10

### Added
- **Backend Codebase:** Implemented Python-based AWS Lambda function (`backend/lambda_function.py`) for the visitor counter with atomic update operations and CORS integration.
- **Project Governance Docs:** Added project-level repository documents including `CONTRIBUTING.md`, `LICENSE`, `CODE_OF_CONDUCT.md`, `SECURITY.md`, and `CHANGELOG.md`.
- **System Architecture Diagrams:** Added Mermaid-based architectural diagrams and visitor workflow representations to the documentation.

### Changed
- **Documentation Overhaul:** Transformed `README.md` into a comprehensive, recruiter-ready portfolio presentation highlighting AWS services, security practices, and performance metrics.
- **Git Configurations:** Hardened `.gitignore` to prevent leakages of system metadata, python development caches, and infrastructure configuration files.

---

## [0.2.0] - 2026-07-07

### Added
- **Visitor Counter Frontend:** Wired up active `fetch` API calls in `js/script.js` to update the real-time visitor counter badge on page loads.
- **Hardware Acceleration:** Added `will-change` attributes to css scroll targets for smoother GPU rendering of glassmorphic effects.
- **SEO & Accessibility:** Added descriptive metadata tags, Open Graph previews, and aria landmarks.

### Fixed
- **Scroll Handling Performance:** Throttled scroll handlers with `requestAnimationFrame` to eliminate layout thrashing.
- **Event Delegation Security:** Refactored modal triggers to use centralized secure event delegation in `js/script.js`.

---

## [0.1.0] - 2026-07-06

### Added
- **Core Layout:** Developed responsive, mobile-first frontend using semantic HTML5 and vanilla CSS.
- **Design Theme:** Implemented glassmorphic styling, aurora gradients, and responsive timeline layouts.
- **Typewriter Effect:** Integrated dynamic typewriter text animation on the landing section.

[1.0.0]: https://github.com/EngHarshita/cloud-resume-challenge/releases/tag/v1.0.0
[0.2.0]: https://github.com/EngHarshita/cloud-resume-challenge/releases/tag/v0.2.0
[0.1.0]: https://github.com/EngHarshita/cloud-resume-challenge/releases/tag/v0.1.0
