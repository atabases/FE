# Biobank & Genomics Platform — Frontend Implementation Plan

This plan details the frontend architecture and development roadmap for the unified Biobank platform, focusing on the **Genomics-First** Phase 1 requirements.

---

## Technical Stack

| Layer | Technology | Purpose |
|-------|-----------|---------|
| **Framework** | React 18 + Vite 5 | Core UI and build system |
| **Language** | TypeScript 5 | Type safety for biological data structures |
| **State (Server)** | TanStack Query v5 | Data fetching, caching, and polling (LIMS updates) |
| **State (Global)** | Zustand | UI state (sidebar, selected participants, filters) |
| **Styling** | Tailwind CSS 3 | Premium, dark-mode first responsive design |
| **Routing** | React Router v6 | Navigation between Dashboard, Inventory, and Genomics |
| **Viz (Custom)** | D3.js v7 | OncoPrints, Lollipop plots, and Heatmaps |
| **Viz (Charts)** | Recharts | Standard bar, scatter, and line charts |
| **Viz (Networks)**| Cytoscape.js | Pathway and gene interaction graphs |

---

## Component Architecture

### 1. Layout & Navigation
- `MainLayout`: Sidebar + Header + Page Content.
- `Navigation`: Links to Participant List, Inventory, and Genomics Workbench.
- `GlobalSearch`: Command-K style search for Participants, Genes, or Samples.

### 2. Core Modules
#### **Participant Module**
- `ParticipantList`: Searchable table with clinical metadata.
- `Participant360`: A "central hub" view for a single patient.
  - `ClinicalSummary`: Demographic and diagnosis cards.
  - `SampleTimeline`: Vertical timeline of collections (Blood -> DNA -> Sequencing).
  - `ConsentBadge`: Status indicator (Active/Withdrawn).

#### **Inventory Module (LIMS Visualizer)**
- `FreezerMap`: High-level view of freezers/shelves.
- `BoxGrid`: Interactive 9x9 or 10x10 grid.
  - **Hover**: Shows sample type, volume, and participant ID.
  - **Click**: Highlights the sample in the Sidebar/Timeline.
  - **Drag & Drop**: Logic for moving samples between slots.

#### **Genomics Workbench**
- `GenomicsHeader`: Summary of the sequencing run (Run ID, Quality, Pipeline).
- `TabbedWorkbench`:
  - **Variants Tab**: Sortable `VariantTable` + `LollipopPlot`.
  - **Expression Tab**: `RNASeqChart` (Recharts) + `Heatmap` (D3).
  - **Pathways Tab**: `PathwayGraph` (Cytoscape).

---

## State Management Strategy

### Zustand Store (`uiStore.ts`)
```typescript
interface UIState {
  selectedParticipantId: string | null;
  selectedSampleId: string | null;
  activeBank: 'genomics' | 'imaging' | 'clinical';
  sidebarExpanded: boolean;
}
```

### TanStack Query Hooks
- `useParticipants()`: Fetch list of donors.
- `useSampleInventory(boxId)`: Fetch contents of a specific freezer box.
- `useGenomicData(sampleId)`: Fetch variants and expression for a specific sample.

---

## Design Tokens (Aesthetics)
- **Base**: Slate-900 (Deep background)
- **Primary**: Cyan-500 (Genomics accents)
- **Secondary**: Emerald-500 (Biobank/Sample accents)
- **Alert**: Amber-500 (Low volume / Consent issues)
- **Glassmorphism**: `backdrop-blur-md bg-white/5 border border-white/10` for cards.

---

## Development Phases

### Phase 1: Core Shell & Biobank UI (Days 1–5)
- [ ] Setup Vite + Tailwind + Router.
- [ ] Build `MainLayout` with responsive Sidebar.
- [ ] Implement `ParticipantList` and `Participant360` layout.
- [ ] Build the interactive `BoxGrid` for sample tracking.

### Phase 2: Genomics Visualizations (Days 6–10)
- [ ] Integrate D3 for the `LollipopPlot`.
- [ ] Build the `VariantTable` with advanced filtering.
- [ ] Implement Recharts for expression data.
- [ ] Add the `PathwayGraph` using Cytoscape.js.

### Phase 3: Integration & Polish (Days 11–15)
- [ ] Connect to Backend API via TanStack Query.
- [ ] Implement Global Search (Command Palette).
- [ ] Add smooth transitions using Framer Motion.
- [ ] Add "Coming Soon" placeholders for Imaging and Clinical banks.

---

## Verification Plan

### Manual UI Audit
1.  **Responsiveness**: Test on Desktop, Tablet, and Mobile.
2.  **Visualization**: Ensure Lollipop plots render correctly for 100+ mutations.
3.  **Performance**: Verify `BoxGrid` renders smoothly with 100 slots.
4.  **Interactivity**: Drag a sample in the `BoxGrid` and verify the UI updates correctly.
