import { useState, useEffect } from "react";
import type { Company } from "@/types/company";
import JobCard from "./JobCard";
import { ChevronLeft, ChevronRight, Grid3X3, List } from "lucide-react";

interface JobListProps {
  companies: Company[];
  onViewLocation: (company: Company) => void;
}

const JOBS_PER_PAGE = 15;

export default function JobList({ companies, onViewLocation }: JobListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<'card' | 'list'>('card');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Reset to page 1 when companies list changes (filter changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [companies]);

  const totalPages = Math.ceil(companies.length / JOBS_PER_PAGE);
  const startIndex = (currentPage - 1) * JOBS_PER_PAGE;
  const endIndex = startIndex + JOBS_PER_PAGE;
  const currentJobs = companies.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    // Scroll to top of page first
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    // Then scroll the job cards container to the top
    setTimeout(() => {
      const jobCardsScrollContainer = document.querySelector('.job-cards-container .overflow-y-auto');
      if (jobCardsScrollContainer) {
        jobCardsScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, 100);
  };

  const goToPrevious = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  };

  const goToNext = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1);
    }
  };

  // Handle scroll to top button visibility and functionality
  const handleScrollToTop = () => {
    const jobCardsScrollContainer = document.querySelector('.job-cards-container .overflow-y-auto');
    if (jobCardsScrollContainer) {
      jobCardsScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollableHeight = scrollHeight - clientHeight;
    const showButton = scrollTop > scrollableHeight * 0.25;
    setShowScrollToTop(showButton);
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisiblePages = 3;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  };

  return (
    <div className="space-y-3 md:space-y-6">
      {/* Header Info */}
      <div className="space-y-1">
        <div className="flex items-start justify-between">
          <div className="pl-1">
            <h3 className="text-xl font-bold mb-1">
              {companies.length} Job{" "}
              {companies.length === 1 ? "Opportunity" : "Opportunities"} Found
            </h3>
            <p className="text-sm text-gray-600">
              {companies.length > 0 && (
                <>
                  Showing {startIndex + 1}-{Math.min(endIndex, companies.length)} of {companies.length} jobs
                  {totalPages > 1 && ` • Page ${currentPage} of ${totalPages}`}
                </>
              )}
            </p>
          </div>

          {/* View Toggle Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('card')}
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                viewMode === 'card'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Card
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                viewMode === 'list'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </button>
          </div>
        </div>

        {/* View Toggle Buttons - Mobile */}
        <div className="md:hidden flex items-center space-x-1 bg-gray-100 rounded-lg p-1 w-fit">
          <button
            onClick={() => setViewMode('card')}
            className={`inline-flex items-center p-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === 'card'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`inline-flex items-center p-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white text-gray-900 shadow-sm'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Job Cards Container */}
      <div className="job-cards-container relative">
        <div 
          className="space-y-4 overflow-y-auto max-h-[600px]"
          onScroll={handleScroll}
        >
          {companies.length === 0 ? (
            <div className="text-gray-500 text-center p-8">
              No companies match your search criteria.
            </div>
          ) : (
            <>
              {currentJobs.map((job) => (
                <JobCard 
                  key={job.companyId} 
                  company={job} 
                  onViewLocation={onViewLocation}
                  variant={viewMode}
                />
              ))}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200 mt-6">
                  {/* Prev Button */}
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    <ChevronLeft className="w-4 h-4 mr-1" />
                    Prev
                  </button>

                  {/* Page Numbers */}
                  <div className="flex space-x-1">
                    {getPageNumbers().map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                          currentPage === page
                            ? "bg-blue-600 text-white"
                            : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50"
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={goToNext}
                    disabled={currentPage === totalPages}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      currentPage === totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </div>
              )}
            </>
          )}
        </div>

        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <div className="absolute bottom-4 right-6">
            <button
              onClick={handleScrollToTop}
              className="group relative w-10 h-10 rounded-full bg-gray-800 border-none font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden opacity-80 hover:w-32 hover:rounded-full hover:opacity-100 shadow-lg hover:shadow-xl"
            >
              <svg
                className="w-3 h-3 transition-all duration-300 fill-white group-hover:-translate-y-8"
                viewBox="0 0 384 512"
              >
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <span className="absolute text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300">
                Back to Top
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
