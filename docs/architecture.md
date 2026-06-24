# PIHU Platform Architecture

**Version:** 1.0.0
**Status:** Draft / Phase 1 Implemented
**Author:** PIHU Platform Team

---

## Introduction

PIHU is not designed to be just another desktop application. It is an **AI-native workspace platform** built as a cross-platform desktop layer on top of Windows, macOS, and Linux using Tauri + Rust + React.

The long-term vision is to create a platform where everything—from the UI itself to AI agents—is modular, replaceable, and extensible.

Instead of building one large tightly-coupled application, PIHU is built as a collection of independent engines communicating through a central **Kernel**.

---

## Why a Kernel-Centric Architecture?

Traditional desktop applications usually evolve into a tightly coupled codebase where UI, Business Logic, and Databases depend heavily on one another. As features grow, the application becomes increasingly difficult to maintain.

If we want AI agents, third-party developers, and users to safely modify the OS behavior, we cannot allow direct UI-to-Logic bindings.

### The PIHU Approach
1. **The Kernel**: The heart of the platform. It handles the Event Bus, Command Bus, and Service Registry.
2. **Engines**: Discrete modules (Workspace, Layout, Panel) that provide logic but contain no UI themselves. They register with the Kernel.
3. **Renderer**: A thin layer that subscribes to the Kernel's state and translates it into visual React components.

*Rule of Thumb: If something can become a plugin, it should not live inside the core.*

---

## High-Level Monorepo Structure

```text
pihu-platform/
│
├── apps/               # The final bundles/executables
│   ├── pihu-os/        # The Main Desktop App (Tauri)
│   ├── marketplace/    # (Future) App Store for PIHU
│   └── installer/      # (Future) System installer
│
├── packages/           # The Engine Room
│   ├── kernel/         # ❤️ Heart of PIHU
│   ├── types/          # Shared interfaces & domain models
│   ├── layout-engine/  # Logic for splits and panels
│   ├── ui/             # React rendering logic
│   └── ...
│
├── modules/            # Heavy Plugins (FKVim, FKTerm)
├── widgets/            # Lightweight UI components (Clock, Weather)
└── protocols/          # Standardized communication (MCP, LSP)
```

---

## Current Implementation (Phase 1)

As of the completion of Phase 1, the foundational architecture has been successfully scaffolded and implemented.

### 1. Monorepo Foundation
We are utilizing a **pnpm workspace** paired with **Turborepo** to manage caching and cross-package dependencies efficiently. The `pihu-os` app and the diverse engine `packages` map to each other seamlessly.

### 2. The Kernel (`@pihu/kernel`)
The kernel exposes three primary interfaces that other engines use to coordinate without direct coupling:
- **EventBus**: A publish-subscribe system for broadcasting platform events (e.g., `panel:resized`, `workspace:loaded`).
- **CommandBus**: A request-response handler where systems register capabilities (e.g., `execute("layout:split-vertical")`).
- **ServiceRegistry**: Dependency Injection mechanism. Stores singletons of engines so they can be injected dynamically without hardcoded imports.

### 3. The Layout UI Renderer (`@pihu/ui`)
We have implemented a **recursive Layout Engine** powered by `react-resizable-panels`. 
- **Types (`@pihu/types`)**: The state is driven entirely by JSON representations of a node tree (`LayoutNode`, `SplitNode`, `PanelNode`).
- **Renderer**: The `LayoutRenderer` component iterates through the JSON nodes, rendering `<Group>`, `<Panel>`, and `<Separator>` components dynamically. This allows the workspace configuration to perfectly describe the physical layout of the screen.

### 4. App Shell (`apps/pihu-os`)
The primary execution context is an instance of **Vite + React** wrapped in **Tauri V2**. For testing purposes, it currently hardcodes an initial layout utilizing the newly created `LayoutRenderer` to display resizable, structured placeholders for plugins like `FKVim` and `FKTerm`.

---

## Future Phases

- **Phase 2:** Integrate fully-fledged Engines (`WorkspaceEngine`, `TabEngine`) communicating exclusively via the Kernel.
- **Phase 3:** Abstracting plugin integration to dynamically inject modules like `FKVim` into the UI panels.
- **Phase 4:** AI Integration and the Marketplace ecosystem.
