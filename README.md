# PIHU Platform

PIHU is an AI-native workspace platform built as a cross-platform desktop layer on top of Windows, macOS, and Linux. It leverages a modern technology stack including **Tauri, Rust, and React** to deliver a performant, extensible, and beautifully integrated environment.

Unlike traditional desktop applications, PIHU is built as a modular collection of independent engines communicating through a central **Kernel**. This ensures maximum extensibility, allowing almost every aspect of the platform—from UI layouts to background services—to be swapped, customized, or extended.

## Repository Structure (Monorepo)

This repository uses **pnpm workspaces** and **Turborepo** to manage its various components efficiently.

```text
pihu-platform/
│
├── apps/                 # End-user applications
│   ├── pihu-os/          # Main Desktop App (Tauri + React + Vite)
│   └── docs/             # Documentation App (To be built)
│
├── packages/             # Shared libraries and engines
│   ├── kernel/           # Core platform logic (EventBus, CommandBus, ServiceRegistry)
│   ├── types/            # Shared TypeScript definitions
│   ├── ui/               # Core React UI components & Layout Renderers
│   ├── layout-engine/    # Manages UI splits and resizable panel logic
│   ├── panel-engine/     # Panel state and management
│   ├── tab-engine/       # Tab management within panels
│   ├── workspace-engine/ # High-level workspace states
│   └── theme/            # Theme definitions and styling system
│
├── modules/              # Plugins and heavy integrations (e.g., FKVim, FKTerm, Browser)
├── widgets/              # UI Add-ons (e.g., Clock, Sysmon)
└── protocols/            # Communication contracts (e.g., LSP, MCP)
```

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/en/)
- [pnpm](https://pnpm.io/installation)
- [Rust](https://www.rust-lang.org/tools/install) (for Tauri)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/the-mayankjha/Pihu.git
   cd PihuOS
   ```
2. Install dependencies:
   ```bash
   pnpm install
   ```

### Running Locally

To run the main PIHU OS desktop application:

```bash
cd apps/pihu-os
pnpm run tauri dev
```

*(Alternatively, you can just run `pnpm tauri dev` from inside the `apps/pihu-os` directory.)*

## Architecture

For a deep dive into the philosophy and architectural design of PIHU, see the [Architecture Documentation](./docs/architecture.md).
