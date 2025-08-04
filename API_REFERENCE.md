# API Reference & Component Documentation

## Table of Contents
- [TypeScript Interfaces](#typescript-interfaces)
- [Components API](#components-api)
- [Hooks API](#hooks-api)
- [Utilities API](#utilities-api)
- [Context API](#context-api)
- [Configuration](#configuration)

## TypeScript Interfaces

### Core Data Models

#### Company
```typescript
interface Company {
  companyId: string;        // Unique identifier
  email: string;           // Contact email
  state: string;           // Australian state (NSW, VIC, etc.)
  firstName: string;       // Contact first name
  lastName: string;        // Contact last name
  phoneNumber: string;     // Contact phone number
  companyName: string;     // Business name
  address: string;         // Full postal address
  latitude: number;        // GPS coordinate for mapping
  longitude: number;       // GPS coordinate for mapping
  industry: string;        // Business industry category
}
```

#### FilterState
```typescript
interface FilterState {
  searchTerm: string;      // Text search query
  industry: string;        // Selected industry filter
  location: string;        // Selected location filter
}
```

#### PaginationInfo
```typescript
interface PaginationInfo {
  currentPage: number;     // Current page number (1-based)
  totalPages: number;      // Total available pages
  totalItems: number;      // Total items in dataset
  itemsPerPage: number;    // Items displayed per page
  startIndex: number;      // Starting index for current page
  endIndex: number;        // Ending index for current page
}
```

#### ViewMode
```typescript
type ViewMode = 'card' | 'list';
```

#### AppError
```typescript
interface AppError {
  message: string;         // User-friendly error message
  code?: string;          // Optional error code
  details?: unknown;      // Optional error details
}
```

#### LoadingState
```typescript
interface LoadingState {
  isLoading: boolean;     // Loading state flag
  error?: AppError | null; // Optional error state
}
```

## Components API

### App Component
**File**: `src/App.tsx`

Main application component managing global state and component coordination.

**Props**: None (root component)

**State**:
- `focusedCompany: Company | null` - Currently focused company for map
- `isLoading: boolean` - Global loading state
- `currentFilteredCompanies: Company[]` - Filtered company results

**Key Methods**:
- `handleFilterChange(filters: FilterState)` - Updates filtered companies
- `handleViewLocation(company: Company)` - Sets focused company for map
- `handleScrollToTop()` - Scrolls to top of page and job list

### JobList Component
**File**: `src/components/JobList.tsx`

Paginated job listings with view mode switching and scroll management.

#### Props
```typescript
interface JobListProps {
  companies: Company[];                    // Array of companies to display
  onViewLocation: (company: Company) => void; // Callback for map focus
  isLoading?: boolean;                     // Optional loading state
}
```

#### Features
- **Pagination**: 15 jobs per page with navigation
- **View Modes**: Card and list view toggle
- **Scroll Management**: Scroll-to-top functionality
- **Loading States**: Integrated loading spinner
- **Responsive**: Mobile and desktop optimized

#### State
- `currentPage: number` - Current pagination page
- `viewMode: ViewMode` - Display mode (card/list)
- `showScrollToTop: boolean` - Scroll button visibility

#### Key Methods
- `goToPage(page: number)` - Navigate to specific page
- `goToPrevious()` - Navigate to previous page
- `goToNext()` - Navigate to next page
- `handleScrollToTop()` - Scroll to top of container

### JobCard Component
**File**: `src/components/JobCard.tsx`

Individual job display with company information and actions.

#### Props
```typescript
interface JobCardProps {
  company: Company;                        // Company data to display
  onViewLocation: (company: Company) => void; // Map focus callback
  variant?: 'card' | 'list';              // Display variant
}
```

#### Features
- **Contact Information**: Email, phone, address display
- **Action Buttons**: View location, contact tracking
- **Responsive Design**: Adaptive layouts
- **Contact Tracking**: Integration with context

### MapView Component
**File**: `src/components/MapView.tsx`

Interactive map displaying job locations using Leaflet.

#### Props
```typescript
interface MapViewProps {
  companies: Company[];                    // Companies to display as markers
  focusedCompany?: Company | null;         // Company to focus/center on
}
```

#### Features
- **Dynamic Markers**: Real-time marker updates
- **Focus Integration**: Centers on focused company
- **Responsive**: Adaptive map sizing
- **Performance**: Efficient marker management

### Filters Component
**File**: `src/components/Filters.tsx`

Search and filter controls with debounced input and dropdown filters.

#### Props
```typescript
interface FiltersProps {
  onFilterChange: (filters: FilterState) => void; // Filter change callback
  onScrollToTop: () => void;               // Scroll callback
  isLoading?: boolean;                     // Loading state
}
```

#### Features
- **Text Search**: Debounced search input (500ms)
- **Industry Filter**: Dropdown with all available industries
- **Location Filter**: Dropdown with all available states
- **Clear Filters**: Reset all filters button
- **Real-time Updates**: Immediate filter application

#### State
- `filters: FilterState` - Current filter values
- `debouncedSearchTerm: string` - Debounced search value

### ErrorBoundary Component
**File**: `src/components/ErrorBoundary.tsx`

Error handling wrapper with fallback UI.

#### Props
```typescript
interface ErrorBoundaryProps {
  children: React.ReactNode;               // Components to wrap
  fallback?: React.ComponentType<ErrorFallbackProps>; // Custom fallback
}
```

#### Features
- **Error Catching**: Catches JavaScript errors in children
- **Fallback UI**: User-friendly error display
- **Error Reporting**: Development error logging
- **Recovery**: Reset error state functionality

### LoadingSpinner Component
**File**: `src/components/LoadingSpinner.tsx`

Customizable loading indicator with text support.

#### Props
```typescript
interface LoadingSpinnerProps {
  text?: string;                           // Loading message
  className?: string;                      // Additional CSS classes
}
```

#### Features
- **Customizable Text**: Optional loading message
- **Styling**: Flexible CSS class integration
- **Accessibility**: Screen reader support

## Hooks API

### useDebounce Hook
**File**: `src/hooks/useDebounce.ts`

Generic debouncing hook for performance optimization.

#### Signature
```typescript
function useDebounce<T>(value: T, delay: number): T
```

#### Parameters
- `value: T` - Value to debounce
- `delay: number` - Delay in milliseconds

#### Returns
- `T` - Debounced value

#### Usage
```typescript
const debouncedSearchTerm = useDebounce(searchTerm, 500);
```

#### Features
- **Generic Type Support**: Works with any data type
- **Cleanup**: Automatic timeout cleanup
- **Performance**: Prevents excessive API calls or calculations

## Utilities API

### Validation Utilities
**File**: `src/utils/validation.ts`

Input validation and sanitization functions.

#### Functions

##### sanitizeInput
```typescript
function sanitizeInput(input: string): string
```
- **Purpose**: Sanitize user input to prevent XSS
- **Parameters**: `input: string` - Raw input string
- **Returns**: Sanitized string

##### validateEmail
```typescript
function validateEmail(email: string): boolean
```
- **Purpose**: Validate email format
- **Parameters**: `email: string` - Email to validate
- **Returns**: `true` if valid email format

##### validatePhone
```typescript
function validatePhone(phone: string): boolean
```
- **Purpose**: Validate Australian phone number format
- **Parameters**: `phone: string` - Phone number to validate
- **Returns**: `true` if valid phone format

##### formatPhoneNumber
```typescript
function formatPhoneNumber(phone: string): string
```
- **Purpose**: Format phone number for display
- **Parameters**: `phone: string` - Raw phone number
- **Returns**: Formatted phone number string

### LocalStorage Utilities
**File**: `src/utils/localStorage.ts`

Browser storage management for application state.

#### Functions

##### loadFilters
```typescript
function loadFilters(): FilterState
```
- **Purpose**: Load saved filter state from localStorage
- **Returns**: FilterState object with saved values

##### saveFilters
```typescript
function saveFilters(filters: FilterState): void
```
- **Purpose**: Save filter state to localStorage
- **Parameters**: `filters: FilterState` - Filter state to save

##### loadContactedCompanies
```typescript
function loadContactedCompanies(): Set<string>
```
- **Purpose**: Load contacted companies from localStorage
- **Returns**: Set of company IDs

##### saveContactedCompanies
```typescript
function saveContactedCompanies(contactedSet: Set<string>): void
```
- **Purpose**: Save contacted companies to localStorage
- **Parameters**: `contactedSet: Set<string>` - Set of company IDs

## Context API

### ContactedCompaniesContext
**File**: `src/contexts/ContactedCompaniesContext.tsx`

Global state management for contacted companies tracking.

#### Context Type
```typescript
interface ContactedCompaniesContextType {
  contactedCompanies: Set<string>;         // Set of contacted company IDs
  toggleContacted: (companyId: string) => void; // Toggle contact status
  isContacted: (companyId: string) => boolean;  // Check contact status
}
```

#### Provider Props
```typescript
interface ContactedCompaniesProviderProps {
  children: React.ReactNode;               // Child components
}
```

#### Features
- **Global State**: Application-wide contact tracking
- **Persistence**: localStorage integration
- **Performance**: Set-based storage for O(1) lookups
- **Type Safety**: Full TypeScript support

#### Usage
```typescript
const { contactedCompanies, toggleContacted, isContacted } = useContext(ContactedCompaniesContext);
```

## Configuration

### App Configuration
**File**: `src/config/constants.ts`

Application constants and configuration values.

#### APP_CONFIG
```typescript
const APP_CONFIG = {
  PAGINATION: {
    JOBS_PER_PAGE: 15,                     // Jobs displayed per page
    MAX_VISIBLE_PAGES: 5,                  // Pagination buttons shown
  },
  SEARCH: {
    DEBOUNCE_DELAY: 500,                   // Search input debounce (ms)
  },
  SCROLL: {
    SCROLL_DELAY: 100,                     // Scroll animation delay (ms)
    SCROLL_TO_TOP_THRESHOLD: 0.3,          // When to show scroll button
  },
  MAP: {
    DEFAULT_ZOOM: 6,                       // Default map zoom level
    DEFAULT_CENTER: [-25.2744, 133.7751], // Australia center coordinates
  }
};
```

#### DESIGN_TOKENS
```typescript
const DESIGN_TOKENS = {
  COLORS: {
    PRIMARY: {
      50: 'bg-blue-50',
      // ... color scale
      600: 'bg-blue-600',
      // ... more colors
    },
  },
  SHADOWS: {
    SM: 'shadow-sm',
    LG: 'shadow-lg',
    XL: 'shadow-xl',
  },
  TRANSITIONS: {
    COLORS: 'transition-colors duration-200',
  },
};
```

#### ARIA_LABELS
```typescript
const ARIA_LABELS = {
  PAGINATION_PREVIOUS: 'Go to previous page',
  PAGINATION_NEXT: 'Go to next page',
  PAGINATION_PAGE: 'Go to page',
  SCROLL_TO_TOP: 'Scroll to top',
  VIEW_LOCATION: 'View location on map',
  TOGGLE_CONTACTED: 'Toggle contacted status',
};
```

## Development Guidelines

### Component Patterns
- **Props Interface**: Define explicit TypeScript interfaces
- **Default Props**: Use default parameters instead of defaultProps
- **Memoization**: Use React.memo for performance-critical components
- **Error Boundaries**: Wrap components that may fail

### State Management
- **Local State**: Use useState for component-specific state
- **Computed State**: Use useMemo for expensive calculations
- **Context**: Use for application-wide state
- **Callbacks**: Use useCallback for stable references

### Performance Best Practices
- **Debouncing**: Use for search inputs and API calls
- **Memoization**: Prevent unnecessary re-renders
- **Code Splitting**: Load components lazily when possible
- **Bundle Analysis**: Monitor bundle size regularly

### Accessibility Standards
- **ARIA Labels**: Provide meaningful labels for screen readers
- **Keyboard Navigation**: Ensure all interactive elements are accessible
- **Focus Management**: Maintain logical focus flow
- **Color Contrast**: Meet WCAG accessibility guidelines

---

*Generated: 2025-08-04*
*Documentation for Work & Travel Guide Challenge*