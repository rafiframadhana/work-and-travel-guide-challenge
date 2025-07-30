import { useState, useEffect } from 'react'
import companiesData from '../data/companies.json'
import { Search, ChevronDown, MapPin, Filter } from 'lucide-react'
import useDebounce from '../hooks/useDebounce'

interface FiltersProps {
  onFilterChange: (filters: {
    searchTerm: string;
    industry: string;
    location: string;
  }) => void;
}

function Filters({ onFilterChange }: FiltersProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [industry, setIndustry] = useState('');
  const [location, setLocation] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Extract unique industries and states from the data
  const uniqueIndustries = [...new Set(companiesData.map(company => company.industry))].sort();
  const uniqueStates = [...new Set(companiesData.map(company => company.state))].sort();

  useEffect(() => {
    onFilterChange({
      searchTerm: debouncedSearchTerm,
      industry,
      location
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm, industry, location]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setIndustry('');
    setLocation('');
  };

  const hasActiveFilters = searchTerm || industry || location;

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        {/* Desktop Header */}
        <div className={`hidden md:flex items-center justify-between ${showDesktopFilters ? 'mb-4' : ''}`}>
          <h2 className="text-xl font-bold text-gray-800">Find Your Perfect Job</h2>
          {/* Clear Filters Button - Desktop */}
          <div className="flex items-center gap-2">
            {hasActiveFilters && (
              <button
                onClick={clearFilters}
                className="flex cursor-pointer items-center gap-2 px-3 py-2 border border-red-300 rounded-md bg-white hover:bg-red-50 transition-colors text-sm text-red-600"
              >
                Clear Filters
              </button>
            )}
            
            {/* Desktop Filter Toggle Button */}
            <button
              onClick={() => setShowDesktopFilters(!showDesktopFilters)}
              className="flex cursor-pointer items-center gap-2 px-3 py-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors text-sm"
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
          
          {/* Mobile Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="cursor-pointer flex items-center justify-center p-2 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 text-gray-600" />
          </button>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          {showDesktopFilters && (
            <div className="space-y-3">
              <div className="relative">
                <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="search"
                    type="text"
                    placeholder="Search companies..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-sm"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="relative">
                  <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <div className="relative">
                    <select 
                      id="industry"
                      className="block w-full px-3 py-2 border border-gray-300 cursor-pointer rounded-md transition-colors text-sm appearance-none bg-white"
                      value={industry}
                      onChange={(e) => handleIndustryChange(e.target.value)}
                    >
                      <option value="">All Industries</option>
                      {uniqueIndustries.map(industryOption => (
                        <option key={industryOption} value={industryOption}>{industryOption}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <div className="relative">
                    <select 
                      id="location"
                      className="block w-full px-3 py-2 border border-gray-300 cursor-pointer rounded-md transition-colors text-sm appearance-none bg-white"
                      value={location}
                      onChange={(e) => handleLocationChange(e.target.value)}
                    >
                      <option value="">All Locations</option>
                      {uniqueStates.map(state => (
                        <option key={state} value={state}>{state}</option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                      <MapPin className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-3">
          {showFilters && (
            <div className="space-y-3">
              {/* Clear Filters Button - Mobile */}
              {hasActiveFilters && (
                <button
                  onClick={clearFilters}
                  className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 border border-red-300 rounded-md bg-white hover:bg-red-50 transition-colors text-sm text-red-600 w-full"
                >
                  Clear Filters
                </button>
              )}
              
              <div className="relative">
                <label htmlFor="search-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Search
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-4 w-4 text-gray-400" />
                  </div>
                  <input
                    id="search-mobile"
                    type="text"
                    placeholder="Search companies..."
                    className="block w-full pl-9 pr-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-sm"
                    value={searchTerm}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label htmlFor="industry-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Industry
                </label>
                <div className="relative">
                  <select 
                    id="industry-mobile"
                    className="block w-full px-3 py-2 border border-gray-300 cursor-pointer rounded-md transition-colors text-sm appearance-none bg-white"
                    value={industry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                  >
                    <option value="">All Industries</option>
                    {uniqueIndustries.map(industryOption => (
                      <option key={industryOption} value={industryOption}>{industryOption}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="location-mobile" className="block text-sm font-medium text-gray-700 mb-1">
                  Location
                </label>
                <div className="relative">
                  <select 
                    id="location-mobile"
                    className="block w-full px-3 py-2 border border-gray-300 cursor-pointer rounded-md transition-colors text-sm appearance-none bg-white"
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MapPin className="h-4 w-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
    </div>
  )
}

export default Filters