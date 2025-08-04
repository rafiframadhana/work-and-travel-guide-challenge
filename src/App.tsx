import { useState, useMemo, useCallback } from 'react';
import type { Company, FilterState } from '@/types/company';
import JobList from './components/JobList';
import MapView from './components/MapView';
import Filters from './components/Filters';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary, { MapErrorFallback } from './components/ErrorBoundary';
import { ContactedCompaniesProvider } from './contexts/ContactedCompaniesContext';
import companiesData from './data/companies.json';

function App() {
  const [focusedCompany, setFocusedCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize with all companies
  const filteredCompanies = useMemo(() => {
    return companiesData as Company[];
  }, []);

  const [currentFilteredCompanies, setCurrentFilteredCompanies] = useState<Company[]>(filteredCompanies);

  const handleFilterChange = useCallback((filters: FilterState) => {
    setIsLoading(true);
    
    // Simulate filtering delay for better UX
    setTimeout(() => {
      const filtered = companiesData.filter(company => {
        const matchesSearch = !filters.searchTerm || 
          company.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          company.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          company.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          company.address.toLowerCase().includes(filters.searchTerm.toLowerCase());

        const matchesIndustry = !filters.industry || company.industry === filters.industry;
        const matchesLocation = !filters.location || company.state === filters.location;

        return matchesSearch && matchesIndustry && matchesLocation;
      });
      
      setCurrentFilteredCompanies(filtered);
      setIsLoading(false);
    }, 100);
  }, []);

  const handleViewLocation = useCallback((company: Company) => {
    setFocusedCompany(company);
  }, []);

  return (
    <ContactedCompaniesProvider>
      <ErrorBoundary>
        <div className="min-h-screen bg-gray-50">
          <Navbar />

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
            <ErrorBoundary>
              <Filters 
                onFilterChange={handleFilterChange} 
                isLoading={isLoading}
              />
            </ErrorBoundary>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-h-[100vh] mb-16">
              <div className="space-y-6">
                <ErrorBoundary>
                  <JobList 
                    companies={currentFilteredCompanies} 
                    onViewLocation={handleViewLocation}
                    isLoading={isLoading}
                  />
                </ErrorBoundary>
              </div>
              
              <div className="hidden md:block space-y-6">
                <ErrorBoundary fallback={MapErrorFallback}>
                  <MapView 
                    companies={currentFilteredCompanies} 
                    focusedCompany={focusedCompany} 
                  />
                </ErrorBoundary>
              </div>
            </div>
          </main>

          <Footer />
        </div>
      </ErrorBoundary>
    </ContactedCompaniesProvider>
  );
}

export default App;
