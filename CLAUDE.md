# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is the PWA (Progressive Web App) module of BizCom CRM, built with Next.js 16 and React 19. It is part of a larger monorepo that includes:
- `backend/` - Laravel 11 API
- `dashboard/` - React 18 admin dashboard
- `pwa/` - This Next.js application (customer-facing mobile-first experience)

## Commands

```bash
# Development
npm run dev              # Start dev server at localhost:3000

# Production
npm run build            # Create production build
npm start                # Run production server (requires build first)

# Code quality
npm run lint             # ESLint check
npm run lint -- --fix    # Auto-fix ESLint issues
```

## Architecture

### Tech Stack
- **Next.js 16** with App Router
- **React 19**
- **TypeScript** (strict mode)
- **Tailwind CSS v4** via PostCSS

### Project Structure
- `app/` - Next.js App Router pages and layouts
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Routes map to `page.tsx` files
  - `globals.css` - Tailwind imports and CSS variables
- `public/` - Static assets

### Import Aliases
Use `@/*` to import from the project root:
```typescript
import { Component } from "@/app/components/Component";
```

### Styling
- Tailwind CSS v4 with PostCSS integration
- DaisyUI v5 component library
- Light theme only (no dark mode)
- Geist font family (Sans and Mono variants)

### DaisyUI Theme Configuration
Theme colors are customized in `globals.css` using the DaisyUI v5 syntax:
```css
@plugin "daisyui/theme" {
  name: "light";
  default: true;
  --color-primary: #ec4899;
  /* ... other colors */
}
```
**Important**: Do NOT use `:root` CSS variables to override DaisyUI colors - they won't work in v5.

### ESLint Configuration
Uses ESLint 9+ flat config format with:
- Next.js Core Web Vitals rules
- TypeScript support

## Color System

This PWA uses a carefully curated color palette. **Do NOT introduce new colors** without explicit approval.

### Brand Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Burgundy/Primary | `#7f1d40` | `text-primary`, `btn-primary`, `text-burgundy` | Logo, buttons, links, active icons |
| Rose Dark | `#9f1239` | `via-rose-dark`, `text-secondary` | BalanceCard gradient, secondary actions |
| Rose Light | `#be123c` | `to-rose-light`, `text-accent` | BalanceCard gradient end |
| Primary Dark | `#5a1530` | `to-primary-dark` | FAB gradient end |

### Neutral Colors

| Name | Hex | Tailwind Class | Usage |
|------|-----|----------------|-------|
| Background | `#f8f9fa` | `bg-base-200` | Page background |
| Card BG | `#ffffff` | `bg-base-100`, `bg-white` | Cards, modals |
| Border | `#dee2e6` | `border-base-300`, `border-gray-200` | Dividers |
| Text Primary | `#171717` | `text-base-content` | Main text |
| Text Secondary | - | `text-gray-600`, `text-base-content/60` | Labels, hints |
| Text Muted | - | `text-gray-400` | Disabled, inactive |

### Gradients

1. **Balance Card Gradient**:
   ```
   bg-gradient-to-br from-burgundy via-rose-dark to-rose-light
   ```

2. **FAB Button Gradient**:
   ```
   bg-gradient-to-br from-burgundy to-primary-dark
   ```

### Forbidden Colors

**DO NOT USE:**
- Purple (`#8b5cf6`, `#a855f7`, etc.) - AI assistant aesthetic
- Blue (`#3b82f6`, `#60a5fa`, etc.) - Not in brand palette
- Green (`#22c55e`, `#10b981`, etc.) - Not in brand palette
- Orange (`#f97316`, etc.) - Not in brand palette

**Exception**: Error states may use DaisyUI's `text-error` / `input-error` classes.

### Color Usage Guidelines

1. **Primary Actions**: Use `btn-primary` for main CTAs
2. **Secondary Actions**: Use `btn-outline btn-primary`
3. **Inactive Nav Items**: Use `text-gray-400`
4. **Active Nav Items**: Use `text-primary`
5. **Headers/Brand**: Use `text-burgundy`
6. **Card Backgrounds**: Use `bg-base-100`
7. **Page Backgrounds**: Use `bg-base-200` or default body background
