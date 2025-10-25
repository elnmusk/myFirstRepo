# Starship Mission Control

A production-ready Starship mission control simulator built with React, Vite, Tailwind CSS, TypeScript, and packaged as a Tauri desktop application for Windows.

## Features

- Real-time telemetry visualization with smooth transitions and futuristic UI
- Interactive Go/No-Go poll and automated countdown with auto-hold support
- Persistent mission event log stored locally via IndexedDB
- Configurable settings for sounds, auto-hold behavior, simulation speed, and theme
- Audio cues for key mission milestones (commit, Max-Q, landing, abort)
- Responsive layout optimized for 1080p control rooms down to smaller displays
- Ready-to-build Tauri backend that produces a signed Windows `.msi` installer

## Project Structure

```
.
├── index.html
├── package.json
├── public/
├── src/
│   ├── App.tsx
│   ├── components/
│   ├── hooks/
│   ├── lib/
│   ├── main.tsx
│   └── styles.css
├── src-tauri/
│   ├── Cargo.toml
│   ├── build.rs
│   ├── src/main.rs
│   └── tauri.conf.json
└── tailwind.config.cjs
```

## Prerequisites

- [Node.js](https://nodejs.org/) 18+
- [Rust](https://www.rust-lang.org/tools/install) toolchain (stable) with the `cargo` and `rustup` commands available
- [Tauri prerequisites for Windows](https://tauri.app/v1/guides/getting-started/prerequisites) (MSVC build tools, WebView2 runtime)

## Setup

```bash
# Install JS dependencies
npm install

# Verify the web build
npm run dev
npm run build
```

## Running the Desktop App

```bash
# Start the Tauri development shell (opens a desktop window)
npx tauri dev
```

## Building the Windows Installer

```bash
# Produces a signed MSI in src-tauri/target/release/bundle/msi/
npx tauri build
```

> **Tip:** The first Tauri build may take several minutes while Rust dependencies compile.

## Troubleshooting

- If audio cues are muted, interact with the window (click anywhere) to allow the browser engine to resume the audio context.
- Persistent mission logs are stored in IndexedDB under the `mission-control` database. Use the settings controls to toggle auto-hold, sounds, theme, and simulation speed.

Enjoy your mission! 🚀
