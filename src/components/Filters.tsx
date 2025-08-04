import { useState, useEffect, memo, useMemo, useCallback, useRef } from 'react';
import type { FilterState } from '@/types/company';
import companiesData from '../data/companies.json';
import { Filter } from 'lucide-react';
import useDebounce from '../hooks/useDebounce';
import FilterInput from './FilterInput';
import { loadFilters, saveFilters } from '@/utils/localStorage';
import { APP_CONFIG, ARIA_LABELS, DESIGN_TOKENS } from '@/config/constants';

interface FiltersProps {
  onFilterChange: (filters: FilterState) => void;
  onScrollToTop?: () => void;
}

const Filters = memo(({ 
  onFilterChange
}: FiltersProps) => {
  const [filters, setFilters] = useState<FilterState>(() => loadFilters());
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const debouncedSearchTerm = useDebounce(filters.searchTerm, APP_CONFIG.DEBOUNCE.SEARCH_DELAY);
  
  const mobileContentRef = useRef<HTMLDivElement>(null);
  const desktopContentRef = useRef<HTMLDivElement>(null);
  const [mobileHeight, setMobileHeight] = useState<number>(0);
  const [desktopHeight, setDesktopHeight] = useState<number>(0);

  // Memoize expensive calculations
  const { uniqueIndustries, uniqueStates } = useMemo(() => ({
    uniqueIndustries: [...new Set(companiesData.map(company => company.industry))].sort(),
    uniqueStates: [...new Set(companiesData.map(company => company.state))].sort(),
  }), []);

  useEffect(() => {
    const currentFilters = {
      searchTerm: debouncedSearchTerm,
      industry: filters.industry,
      location: filters.location
    };
    
    onFilterChange(currentFilters);
    saveFilters(currentFilters);
  }, [debouncedSearchTerm, filters.industry, filters.location, onFilterChange]);

  const updateFilter = useCallback((key: keyof FilterState) => (value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, []);

  const clearFilters = useCallback(() => {
    const emptyFilters = { searchTerm: '', industry: '', location: '' };
    setFilters(emptyFilters);
    saveFilters(emptyFilters);
  }, []);

  const hasActiveFilters = filters.searchTerm || filters.industry || filters.location;

  // Measure content height for smooth animations
  useEffect(() => {
    if (mobileContentRef.current) {
      setMobileHeight(mobileContentRef.current.scrollHeight);
    }
  }, [showFilters, filters]);

  useEffect(() => {
    if (desktopContentRef.current) {
      setDesktopHeight(desktopContentRef.current.scrollHeight);
    }
  }, [showDesktopFilters, filters]);

  const renderFilterContent = () => (
    <div className="space-y-4">
      <FilterInput
        id="search"
        label="Search"
        value={filters.searchTerm}
        onChange={updateFilter('searchTerm')}
        type="search"
        placeholder="Search companies, contacts, locations..."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FilterInput
          id="industry"
          label="Industry"
          value={filters.industry}
          onChange={updateFilter('industry')}
          type="select"
          placeholder="All Industries"
          options={uniqueIndustries}
        />
        
        <FilterInput
          id="location"
          label="Location"
          value={filters.location}
          onChange={updateFilter('location')}
          type="select"
          placeholder="All Locations"
          options={uniqueStates}
        />
      </div>
    </div>
  );

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      {/* Desktop Header */}
      <div className={`hidden md:flex items-center justify-between ${showDesktopFilters ? 'mb-4' : ''}`}>
        <h2 className="text-xl font-bold text-gray-800">Find Your Perfect Job</h2>
        <div className="flex items-center gap-2">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              aria-label={ARIA_LABELS.CLEAR_FILTERS}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 border border-red-300 rounded-md bg-white hover:bg-red-50 transition-colors text-sm text-red-600 font-medium"
            >
              Clear Filters
            </button>
          )}
          
          <button
            onClick={() => setShowDesktopFilters(!showDesktopFilters)}
            aria-label={ARIA_LABELS.TOGGLE_FILTERS}
            aria-expanded={showDesktopFilters}
            className={`flex cursor-pointer items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 ${DESIGN_TOKENS.TRANSITIONS.COLORS} text-sm`}
          >
            <Filter className="h-4 w-4 text-gray-600" />
            <span className="text-gray-700 font-medium">
              {showDesktopFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Header */}
      <div className={`md:hidden flex items-center justify-between ${showFilters ? 'mb-4' : ''}`}>
        <h2 className="text-xl font-bold text-gray-800">Find Your Perfect Job</h2>
        
        <button
          onClick={() => setShowFilters(!showFilters)}
          aria-label={ARIA_LABELS.TOGGLE_FILTERS}
          aria-expanded={showFilters}
          className={`cursor-pointer flex items-center justify-center p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 ${DESIGN_TOKENS.TRANSITIONS.COLORS}`}
        >
          <Filter className="h-5 w-5 text-gray-600" />
        </button>
      </div>

      {/* Clear Filters Button - Mobile */}
      {showFilters && hasActiveFilters && (
        <div className="md:hidden mb-3">
          <button
            onClick={clearFilters}
            aria-label={ARIA_LABELS.CLEAR_FILTERS}
            className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 border border-red-300 rounded-md bg-white hover:bg-red-50 transition-colors text-sm text-red-600 font-medium w-full"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Desktop Layout */}
      <div className="hidden md:block">
        <div 
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            showDesktopFilters 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform -translate-y-3 pointer-events-none'
          }`}
          style={{
            height: showDesktopFilters ? `${desktopHeight}px` : '0px',
            transitionProperty: 'height, opacity, transform'
          }}
        >
          <div ref={desktopContentRef} className="pt-4">
            {renderFilterContent()}
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden">
        <div 
          className={`overflow-hidden transition-all duration-400 ease-in-out ${
            showFilters 
              ? 'opacity-100 transform translate-y-0' 
              : 'opacity-0 transform -translate-y-3 pointer-events-none'
          }`}
          style={{
            height: showFilters ? `${mobileHeight}px` : '0px',
            transitionProperty: 'height, opacity, transform'
          }}
        >
          <div ref={mobileContentRef} className="pt-4">
            {renderFilterContent()}
          </div>
        </div>
      </div>
    </div>
  );
});

Filters.displayName = 'Filters';

export default Filters;