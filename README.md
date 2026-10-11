# EngineerPoint Project

A modern, high-performance website for **EngineerPoint — Digital Solutions to All**, featuring Three.js 3D animations, GSAP scroll triggers, interactive service lists, and a responsive modular architecture.

## Project Structure

```
engineerpoint/
├── index.html          # Clean HTML5 markup
├── css/
│   └── styles.css      # Custom styling, dark mode, responsive rules, glassmorphism
├── js/
│   ├── config.js       # Form endpoint and social/contact link configuration
│   ├── services.js     # Service catalogue data & mega-menu navigation generator
│   ├── hero3d.js       # Three.js 3D stage, particle cloud & GSAP ScrollTrigger
│   ├── projects.js     # Portfolio projects, category filter, and modal details
│   └── main.js         # Interactive hover cards, scroll reveals, and contact form
└── README.md
```

## How to Run

1. Open [index.html](file:///C:/Users/D%20E%20L%20L/.gemini/antigravity-ide/scratch/engineerpoint/index.html) in your browser.
2. Alternatively, serve using a static web server:
   ```bash
   npx serve .
   ```
   or with Python:
   ```bash
   python -m http.server 8000
   ```
