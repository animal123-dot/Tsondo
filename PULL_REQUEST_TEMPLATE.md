---
name: "Scaffold: Tsondo — React + Vite SPA"
about: "Add initial scaffold for Tsondo: pages, demo Generate, styles, CI for gh-pages"
labels: ["scaffold", "chore"]
assignees: ["animal123-dot"]

---

This PR adds an initial React + Vite single-page app scaffold for Tsondo.

What’s included:
- Pages: Generate (main), Gallery, About, Privacy
- Demo Generate page with Tone.js, MediaRecorder example, and placeholder canvas visual
- Vite + React setup, basic styles
- GitHub Actions workflow to build and deploy to GitHub Pages (publishes dist on push to main)
- README, LICENSE, .gitignore

Checklist:
- [ ] Review the demo code and assets
- [ ] Confirm GH Actions workflow branch (currently main)
- [ ] Merge to publish to GitHub Pages

Next steps after merge:
- Integrate Three.js visuals driven by WebAudio Analyser
- Add Magenta.js music generator templates and presets
- Add examples & gallery content
