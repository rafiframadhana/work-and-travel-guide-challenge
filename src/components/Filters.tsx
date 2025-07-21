import { useState } from 'react'
import companiesData from '../data/companies.json'
import { Search, ChevronDown, MapPin, Filter } from 'lucide-react'

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

  // Extract unique industries and states from the data
  const uniqueIndustries = [...new Set(companiesData.map(company => company.industry))].sort();
  const uniqueStates = [...new Set(companiesData.map(company => company.state))].sort();

  const updateFilters = (newSearchTerm: string, newIndustry: string, newLocation: string) => {
    onFilterChange({
      searchTerm: newSearchTerm,
      industry: newIndustry,
      location: newLocation
    });
  };

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
    updateFilters(value, industry, location);
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    updateFilters(searchTerm, value, location);
  };

  const handleLocationChange = (value: string) => {
    setLocation(value);
    updateFilters(searchTerm, industry, value);
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">Find Your Perfect Job</h2>
        
        {/* Desktop Layout */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search"
                type="text"
                placeholder="Company name, contact, or address..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="industry" className="block text-sm font-medium text-gray-700 mb-2">
              Industry
            </label>
            <div className="relative">
              <select 
                id="industry"
                className="block w-full px-3 py-3 border border-gray-300 cursor-pointer rounded-lg transition-colors text-sm appearance-none bg-white"
                value={industry}
                onChange={(e) => handleIndustryChange(e.target.value)}
              >
                <option value="">All Industries</option>
                {uniqueIndustries.map(industryOption => (
                  <option key={industryOption} value={industryOption}>{industryOption}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <ChevronDown className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
          
          <div className="relative">
            <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <div className="relative">
              <select 
                id="location"
                className="block w-full px-3 py-3 border border-gray-300 cursor-pointer rounded-lg transition-colors text-sm appearance-none bg-white"
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
              >
                <option value="">All Locations</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                <MapPin className="h-5 w-5 text-gray-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="md:hidden space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <label htmlFor="search-mobile" className="block text-sm font-medium text-gray-700 mb-2">
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                id="search-mobile"
                type="text"
                placeholder="Company name, contact, or address..."
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors placeholder-gray-400 text-sm"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
              />
            </div>
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="w-full cursor-pointer flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
          >
            <Filter className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700 font-medium">
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </span>
          </button>

          {/* Filter Select */}
          {showFilters && (
            <div className="space-y-4">
              <div className="relative">
                <label htmlFor="industry-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Industry
                </label>
                <div className="relative">
                  <select 
                    id="industry-mobile"
                    className="block w-full px-3 py-3 border border-gray-300 cursor-pointer rounded-lg transition-colors text-sm appearance-none bg-white"
                    value={industry}
                    onChange={(e) => handleIndustryChange(e.target.value)}
                  >
                    <option value="">All Industries</option>
                    {uniqueIndustries.map(industryOption => (
                      <option key={industryOption} value={industryOption}>{industryOption}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <label htmlFor="location-mobile" className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <div className="relative">
                  <select 
                    id="location-mobile"
                    className="block w-full px-3 py-3 border border-gray-300 cursor-pointer rounded-lg transition-colors text-sm appearance-none bg-white"
                    value={location}
                    onChange={(e) => handleLocationChange(e.target.value)}
                  >
                    <option value="">All Locations</option>
                    {uniqueStates.map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                    <MapPin className="h-5 w-5 text-gray-400" />
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