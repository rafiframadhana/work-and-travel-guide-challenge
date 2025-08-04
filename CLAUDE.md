# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

**Start development server:**
```bash
npm run dev
# Opens at http://localhost:5173
```

**Build for production:**
```bash
npm run build
# TypeScript compilation followed by Vite build
```

**Lint code:**
```bash
npm run lint
# Uses ESLint with TypeScript support
```

**Preview production build:**
```bash
npm run preview
```

**Host development server on network:**
```bash
npm run host
# Accessible from other devices on network
```

## Project Architecture

This is a React + TypeScript job search application for Work & Travel opportunities in Australia. Built with Vite and styled with Tailwind CSS.

### Core Structure

- **App.tsx**: Main application component managing global state (filters, focused company) and coordinating between JobList and MapView
- **Components**: Modular UI components in `/src/components/`
  - `JobList.tsx`: Paginated job listings with card/list view toggle
  - `MapView.tsx`: Interactive Leaflet map showing job locations
  - `JobCard.tsx`: Individual job display component
  - `Filters.tsx`: Search and filter controls with debounced input
  - `JobModal.tsx`: Detailed job view modal
- **Data**: Static job data in `/src/data/companies.json`
- **Types**: TypeScript interfaces in `/src/types/company.ts`
- **Hooks**: Custom React hooks in `/src/hooks/`

### Key Features

- **Filtering System**: Real-time search across company names, contacts, and addresses with industry/location filters
- **Map Integration**: Uses Leaflet/OpenStreetMap with coordinate-based job markers
- **Pagination**: 15 jobs per page with smooth scrolling
- **View Modes**: Toggle between card and list layouts
- **Contact Tracking**: Mark contacted employers (session state only)
- **Responsive Design**: Mobile-first approach

### State Management

- Local component state using React hooks
- Filter state managed in App.tsx and passed down
- No external state management library used
- Company data filtered in useMemo for performance

### Styling

- **Tailwind CSS 4.x** with Vite plugin
- Mobile-responsive grid layout (single column on mobile, 2-column on desktop)
- Custom scroll-to-top functionality
- Professional card designs with hover states

### Data Flow

1. Companies data loaded from JSON file
2. Filters applied in App.tsx using useMemo
3. Filtered results passed to both JobList and MapView
4. JobList handles pagination and view modes
5. Map markers update based on filtered companies
6. Cross-component communication via callback props

## Development Notes

- Uses `@/` path alias for cleaner imports (configured in tsconfig)
- TypeScript strict mode enabled
- ESLint configured for React and TypeScript
- Vite for fast development and building
- No backend dependencies - fully client-side application