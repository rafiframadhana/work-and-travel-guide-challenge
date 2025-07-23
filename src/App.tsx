import { useState, useMemo } from "react";
import JobCard from "./components/JobCard";
import MapView from "./components/MapView";
import Filters from "./components/Filters";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import companiesData from "./data/companies.json";

function App() {
  const [filters, setFilters] = useState({
    searchTerm: '',
    industry: '',
    location: ''
  });
  
  const [focusedCompany, setFocusedCompany] = useState<typeof companiesData[0] | null>(null);

  // Filter the companies based on current filters
  const filteredCompanies = useMemo(() => {
    return companiesData.filter(company => {
      const matchesSearch = !filters.searchTerm || 
        company.companyName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        company.firstName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        company.lastName.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        company.address.toLowerCase().includes(filters.searchTerm.toLowerCase());

      const matchesIndustry = !filters.industry || company.industry === filters.industry;
      const matchesLocation = !filters.location || company.state === filters.location;

      return matchesSearch && matchesIndustry && matchesLocation;
    });
  }, [filters]);

  const handleFilterChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
  };

  const handleViewLocation = (company: typeof companiesData[0]) => {
    setFocusedCompany(company);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-0">
        <Filters onFilterChange={handleFilterChange} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <JobCard companies={filteredCompanies} onViewLocation={handleViewLocation} />
          </div>
          <div className="hidden md:block space-y-6">
            <MapView companies={filteredCompanies} focusedCompany={focusedCompany} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
