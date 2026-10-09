# Taimer Landing Page

A responsive, single-page marketing site for Taimer, built with React, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, and lucide-react. This is a standalone app in `landing-page/`; it does not replace the Electron timer renderer.

## Run locally

```bash
cd landing-page
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Customize release links

The Download CTAs currently point to the GitHub Releases page (`https://github.com/pyrrho15/Taimer/releases`). Update `RELEASES` in `src/App.tsx` if you have direct Windows and Linux asset URLs. Newsletter submission is currently front-end only; connect it to a mailing-list provider before production.

## Motion

GSAP and ScrollTrigger handle entrance animations, scroll reveals, and the small ambient motion in the hero. CSS transitions are used for small hover/focus feedback. Reduced-motion preferences are respected.
