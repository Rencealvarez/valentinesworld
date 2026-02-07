# Our Valentine's World 💕

A React web app for couples to celebrate their love story with a **timeline of milestones** and an **interactive virtual scene** where you can leave hearts, flowers, and messages.

## Features

### Love Story Timeline
- Add, edit, and delete relationship milestones (date, title, message)
- Drag-and-drop or click to upload photos for each milestone
- Heart animation when you add a new milestone
- Customize timeline accent color, font, and background theme
- All data saved in `localStorage` (private, stays on your device)
- Export timeline as JSON or share as text

### Virtual Valentine Scene
- Choose a scene: **Park**, **Beach**, or **Candlelight**
- Click on the scene to place hearts, flowers, roses, or love notes
- Leave messages for each other (with optional name)
- Smooth animations with Framer Motion
- Optional background music (toggle in toolbar)
- Snapshot: download the scene as a PNG image
- Scene state (items + messages) saved in `localStorage`

### General
- Responsive layout for mobile and desktop
- Romantic pink/red/pastel theme with TailwindCSS
- Navigation: Home, Love Story, Virtual Scene

## Setup

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

## Tech Stack

- React 18 + Vite
- TailwindCSS
- Framer Motion
- React Router

## Music

Background music in the Virtual Scene uses an external sample. To use your own track, replace the `src` of the `<audio>` element in `src/pages/VirtualScene.jsx` with a URL or local file path.
