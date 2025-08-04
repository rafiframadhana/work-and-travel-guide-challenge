export const APP_CONFIG = {
  PAGINATION: {
    JOBS_PER_PAGE: 15,
    MAX_VISIBLE_PAGES: 3,
  },
  DEBOUNCE: {
    SEARCH_DELAY: 500,
  },
  MAP: {
    DEFAULT_CENTER: [-25.2744, 133.7751] as [number, number],
    DEFAULT_ZOOM: 5,
    FOCUSED_ZOOM: 15,
    MIN_ZOOM: 2,
    MAX_ZOOM: 18,
    BOUNDS: [
      [-90, -180],
      [90, 180],
    ] as [[number, number], [number, number]],
  },
  SCROLL: {
    SCROLL_TO_TOP_THRESHOLD: 0.25,
    SCROLL_DELAY: 100,
  },
  STORAGE_KEYS: {
    FILTERS: 'workTravelGuide_filters',
    CONTACTED_COMPANIES: 'workTravelGuide_contactedCompanies',
  },
  VALIDATION: {
    EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PHONE_REGEX: /^\+?[\d\s\-()]+$/,
  },
} as const;

export const DESIGN_TOKENS = {
  COLORS: {
    PRIMARY: {
      50: 'bg-blue-50',
      100: 'bg-blue-100',
      500: 'bg-blue-500',
      600: 'bg-blue-600',
      700: 'bg-blue-700',
    },
    SUCCESS: {
      50: 'bg-green-50',
      400: 'border-green-400',
      500: 'bg-green-500',
      600: 'bg-green-600',
    },
    WARNING: {
      400: 'bg-yellow-400',
      500: 'bg-yellow-500',
    },
    ERROR: {
      50: 'bg-red-50',
      300: 'border-red-300',
      600: 'text-red-600',
    },
  },
  SHADOWS: {
    SM: 'shadow-sm',
    MD: 'shadow-md',
    LG: 'shadow-lg',
    XL: 'shadow-xl',
  },
  TRANSITIONS: {
    DEFAULT: 'transition-all duration-200',
    COLORS: 'transition-colors',
    CARD_VARIANT: 'transition-all duration-300 ease-in-out',
    FADE_IN: 'animate-in fade-in duration-300',
    FADE_OUT: 'animate-out fade-out duration-200',
    SLIDE_IN: 'animate-in slide-in-from-top-2 duration-300',
    SLIDE_OUT: 'animate-out slide-out-to-top-2 duration-200',
  },
} as const;

export const ARIA_LABELS = {
  SEARCH_INPUT: 'Search companies by name, contact, or address',
  INDUSTRY_SELECT: 'Filter by industry',
  LOCATION_SELECT: 'Filter by location',
  CLEAR_FILTERS: 'Clear all active filters',
  TOGGLE_FILTERS: 'Toggle filter visibility',
  VIEW_JOB: 'View job details',
  VIEW_LOCATION: 'View company location on map',
  MARK_CONTACTED: 'Mark company as contacted',
  UNMARK_CONTACTED: 'Remove company from contacted list',
  SCROLL_TO_TOP: 'Scroll to top of page',
  CLOSE_MODAL: 'Close job details modal',
  APPLY_JOB: 'Apply for this job position',
  PAGINATION_PREVIOUS: 'Go to previous page',
  PAGINATION_NEXT: 'Go to next page',
  PAGINATION_PAGE: 'Go to page',
} as const;