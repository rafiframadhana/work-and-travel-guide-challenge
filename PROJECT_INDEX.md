# Work & Travel Guide - Project Index

## Overview
A React + TypeScript job search application for Work & Travel opportunities in Australia. Built with Vite, styled with Tailwind CSS, and features an interactive map using Leaflet/OpenStreetMap.

## Quick Start
```bash
npm run dev     # Start development server (http://localhost:5173)
npm run build   # Build for production
npm run lint    # Lint code with ESLint
npm run preview # Preview production build
npm run host    # Host development server on network
```

## Project Architecture

### Core Application Structure
```
src/
├── App.tsx                 # Main application component
├── main.tsx               # Application entry point
├── components/            # UI components
├── contexts/              # React contexts
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript type definitions
├── utils/                 # Utility functions
├── config/                # Configuration constants
└── data/                  # Static data files
```

### Key Features
- **Dual-View Interface**: Job listings (left) with interactive map (right)
- **Advanced Filtering**: Real-time search across multiple fields with industry/location filters
- **Contact Tracking**: Mark contacted employers (session state)
- **Responsive Design**: Mobile-first approach with adaptive layouts
- **Performance Optimized**: Debounced filtering, memoized calculations, pagination

## Core Components

### 🏠 App.tsx
**Main Application Controller**
- **Purpose**: Orchestrates global state and component coordination
- **State Management**: Filters, focused company, loading states
- **Key Features**: 
  - Unified filter system with debounced search
  - Cross-component communication via callback props
  - Error boundary integration

### 📋 JobList.tsx
**Job Listings Manager**
- **Purpose**: Paginated job display with view mode switching
- **Features**:
  - Card/List view toggle
  - Pagination (15 jobs per page)
  - Scroll-to-top functionality
  - Loading states and error handling
- **Performance**: Memoized pagination calculations, virtualized scrolling

### 🗺️ MapView.tsx
**Interactive Map Component**
- **Purpose**: Visual job location display using Leaflet
- **Features**:
  - Real-time marker updates based on filtered companies
  - Company focus integration
  - Responsive map sizing
- **Integration**: OpenStreetMap tiles, coordinate-based positioning

### 🎛️ Filters.tsx
**Search & Filter Controls**
- **Purpose**: Advanced filtering interface
- **Features**:
  - Debounced text search (500ms delay)
  - Industry and location dropdowns
  - Real-time result updates
  - Clear filters functionality

### 🃏 JobCard.tsx
**Individual Job Display**
- **Purpose**: Company information presentation
- **Variants**: Card view (detailed) and List view (compact)
- **Features**:
  - Contact information display
  - Location viewing integration
  - Responsive design patterns

## Data Architecture

### 📊 TypeScript Interfaces

#### Company Data Model
```typescript
interface Company {
  companyId: string;
  email: string;
  state: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  companyName: string;
  address: string;
  latitude: number;
  longitude: number;
  industry: string;
}
```

#### Application State Models
```typescript
interface FilterState {
  searchTerm: string;
  industry: string;
  location: string;
}

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  startIndex: number;
  endIndex: number;
}
```

### 🗃️ Data Sources
- **Static Data**: `src/data/companies.json` - Complete job opportunities dataset
- **Session State**: Contact tracking (localStorage integration)
- **Computed State**: Filtered results, pagination info

## Technical Stack

### Core Technologies
- **React 19.1.0** - UI framework with latest features
- **TypeScript ~5.8.3** - Type-safe development
- **Vite 7.0.4** - Fast build tool and dev server
- **Tailwind CSS 4.1.11** - Utility-first styling

### Key Dependencies
- **Leaflet 1.9.4** - Interactive maps
- **React-Leaflet 5.0.0** - React integration for Leaflet
- **Lucide React 0.525.0** - Icon library
- **React Tooltip 5.29.1** - Enhanced tooltips

### Development Tools
- **ESLint 9.30.1** - Code linting with React/TypeScript rules
- **TypeScript ESLint 8.35.1** - TypeScript-specific linting
- **Vite Plugin React 4.6.0** - React integration for Vite

## Component Organization

### 🧩 Component Categories

#### **UI Components**
- `JobCard.tsx` - Job information display
- `JobList.tsx` - Paginated job listings
- `MapView.tsx` - Interactive map
- `Filters.tsx` - Search and filter controls
- `LoadingSpinner.tsx` - Loading state indicators

#### **Layout Components**
- `Navbar.tsx` - Application header
- `Footer.tsx` - Application footer
- `ErrorBoundary.tsx` - Error handling wrapper

#### **Specialized Components**
- `JobModal.tsx` - Detailed job view modal
- `JobCardBase.tsx` - Base job card component
- `JobCardFull.tsx` - Full job card variant
- `JobCardList.tsx` - List job card variant
- `FilterInput.tsx` - Specialized filter input

### 🎣 Custom Hooks
- `useDebounce.ts` - Input debouncing for performance

### 🔧 Utility Modules
- `validation.ts` - Input validation and sanitization
- `localStorage.ts` - Browser storage management

### ⚙️ Configuration
- `constants.ts` - Application constants and design tokens

### 🌐 Context Providers
- `ContactedCompaniesContext.tsx` - Global contact tracking state

## Development Patterns

### 🎯 Performance Optimizations
- **Memoization**: `useMemo` for expensive calculations
- **Debouncing**: 500ms delay on search inputs
- **Lazy Loading**: Component-level code splitting
- **Efficient Re-renders**: `useCallback` for event handlers

### 🛡️ Error Handling
- **Error Boundaries**: Component-level error isolation
- **Graceful Degradation**: Fallback UI for map failures
- **Type Safety**: Comprehensive TypeScript coverage

### ♿ Accessibility Features
- **ARIA Labels**: Screen reader support
- **Keyboard Navigation**: Full keyboard accessibility
- **Semantic HTML**: Proper HTML structure
- **Focus Management**: Logical focus flow

### 📱 Responsive Design
- **Mobile-First**: Progressive enhancement approach
- **Breakpoint System**: Tailwind's responsive utilities
- **Grid Layouts**: Adaptive column layouts
- **Touch-Friendly**: Optimized touch targets

## File Organization

### Directory Structure
```
work-and-travel-guide-challenge/
├── public/                # Static assets
├── src/                   # Source code
│   ├── components/        # React components
│   ├── contexts/          # React contexts
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript definitions
│   ├── utils/             # Utility functions
│   ├── config/            # Configuration
│   └── data/              # Static data
├── .claude/               # Claude Code settings
├── node_modules/          # Dependencies
└── configuration files    # Various config files
```

### Import Strategy
- **Path Aliases**: `@/` for clean imports
- **Barrel Exports**: Organized component exports
- **Type Imports**: Explicit type-only imports

## Key Features Deep Dive

### 🔍 Advanced Search System
- **Multi-field Search**: Company name, contact name, address
- **Real-time Filtering**: Immediate visual feedback
- **Debounced Input**: Performance-optimized search
- **Filter Persistence**: Session-based filter memory

### 🗺️ Map Integration
- **Coordinate-based Mapping**: Precise location markers
- **Dynamic Updates**: Real-time marker synchronization
- **Company Focus**: Click-to-focus functionality
- **Responsive Sizing**: Adaptive map dimensions

### 📄 Pagination System
- **Configurable Page Size**: 15 jobs per page default
- **Smart Navigation**: Previous/Next with page numbers
- **State Management**: Page persistence across filters
- **Performance**: Virtualized rendering for large datasets

### 📱 Responsive Interface
- **Adaptive Layout**: Single column mobile, dual column desktop
- **Touch Optimization**: Mobile-friendly interactions
- **Progressive Enhancement**: Feature scaling by device
- **Performance**: Mobile-first loading strategies

## Development Workflow

### 🚀 Getting Started
1. Clone repository
2. Install dependencies: `npm install`
3. Start development: `npm run dev`
4. Open browser: `http://localhost:5173`

### 🧪 Quality Assurance
- **Linting**: `npm run lint` for code quality
- **Type Checking**: TypeScript compilation validation
- **Build Testing**: `npm run build` for production readiness

### 📦 Deployment
- **Production Build**: `npm run build`
- **Preview**: `npm run preview`
- **Network Hosting**: `npm run host`

## Configuration Files

### 📋 Key Configuration
- `package.json` - Dependencies and scripts
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - Linting rules
- `vite.config.ts` - Build configuration
- `tailwind.config.js` - Styling configuration

### 🎨 Design System
- **Color Palette**: Professional blue/gray scheme
- **Typography**: Responsive text scaling
- **Spacing**: Consistent margin/padding system
- **Components**: Reusable design tokens

## Best Practices

### 💡 Code Quality
- **TypeScript Strict Mode**: Maximum type safety
- **ESLint Rules**: Comprehensive code standards
- **Component Patterns**: Consistent component structure
- **Performance**: Optimized rendering strategies

### 🔒 Security
- **Input Sanitization**: XSS prevention
- **Type Validation**: Runtime type checking
- **Error Boundaries**: Secure error handling
- **Data Privacy**: No persistent sensitive storage

### 🎯 User Experience
- **Loading States**: Clear progress indicators
- **Error Messages**: User-friendly error communication
- **Accessibility**: WCAG compliance
- **Performance**: Sub-3s load times

## Future Enhancements

### 🔮 Potential Features
- **Backend Integration**: API-based data loading
- **User Authentication**: Personal job tracking
- **Advanced Filters**: Salary range, job type
- **Export Functions**: PDF/CSV job list export
- **Favorites System**: Bookmark preferred jobs

### 🛠️ Technical Improvements
- **PWA Features**: Offline functionality
- **Virtualization**: Enhanced performance for large datasets
- **Caching**: Intelligent data caching strategies
- **Testing**: Comprehensive test coverage

---

*Generated: 2025-08-04*
*Last Updated: Current Development Session*