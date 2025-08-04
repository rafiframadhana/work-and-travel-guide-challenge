import { useState, useEffect, memo, useMemo, useCallback } from 'react';
import type { Company, ViewMode, PaginationInfo } from '@/types/company';
import JobCard from './JobCard';
import LoadingSpinner from './LoadingSpinner';
import { ChevronLeft, ChevronRight, Grid3X3, List } from 'lucide-react';
import { APP_CONFIG, ARIA_LABELS, DESIGN_TOKENS } from '@/config/constants';

interface JobListProps {
  companies: Company[];
  onViewLocation: (company: Company) => void;
  isLoading?: boolean;
}

const JobList = memo(({ 
  companies, 
  onViewLocation, 
  isLoading = false 
}: JobListProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('card');
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Reset to page 1 when companies list changes (filter changes)
  useEffect(() => {
    setCurrentPage(1);
  }, [companies]);

  // Memoize pagination calculations
  const paginationInfo: PaginationInfo = useMemo(() => {
    const totalItems = companies.length;
    const itemsPerPage = APP_CONFIG.PAGINATION.JOBS_PER_PAGE;
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      startIndex,
      endIndex,
    };
  }, [companies.length, currentPage]);

  const currentJobs = useMemo(() => 
    companies.slice(paginationInfo.startIndex, paginationInfo.endIndex),
    [companies, paginationInfo.startIndex, paginationInfo.endIndex]
  );

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      const jobCardsScrollContainer = document.querySelector('.job-cards-container .overflow-y-auto');
      if (jobCardsScrollContainer) {
        jobCardsScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }, APP_CONFIG.SCROLL.SCROLL_DELAY);
  }, []);

  const goToPage = useCallback((page: number) => {
    setCurrentPage(page);
    scrollToTop();
  }, [scrollToTop]);

  const goToPrevious = useCallback(() => {
    if (currentPage > 1) {
      goToPage(currentPage - 1);
    }
  }, [currentPage, goToPage]);

  const goToNext = useCallback(() => {
    if (currentPage < paginationInfo.totalPages) {
      goToPage(currentPage + 1);
    }
  }, [currentPage, paginationInfo.totalPages, goToPage]);

  const handleScrollToTop = useCallback(() => {
    const jobCardsScrollContainer = document.querySelector('.job-cards-container .overflow-y-auto');
    if (jobCardsScrollContainer) {
      jobCardsScrollContainer.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  const handleScroll = useCallback((e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const scrollTop = target.scrollTop;
    const scrollHeight = target.scrollHeight;
    const clientHeight = target.clientHeight;
    const scrollableHeight = scrollHeight - clientHeight;
    const showButton = scrollTop > scrollableHeight * APP_CONFIG.SCROLL.SCROLL_TO_TOP_THRESHOLD;
    setShowScrollToTop(showButton);
  }, []);

  // Memoize page numbers calculation
  const pageNumbers = useMemo(() => {
    const pages = [];
    const maxVisiblePages = APP_CONFIG.PAGINATION.MAX_VISIBLE_PAGES;
    
    if (paginationInfo.totalPages <= maxVisiblePages) {
      for (let i = 1; i <= paginationInfo.totalPages; i++) {
        pages.push(i);
      }
    } else {
      const start = Math.max(1, currentPage - 2);
      const end = Math.min(paginationInfo.totalPages, start + maxVisiblePages - 1);
      
      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }
    
    return pages;
  }, [paginationInfo.totalPages, currentPage]);

  if (isLoading) {
    return <LoadingSpinner text="Loading job opportunities..." className="py-12" />;
  }

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
            <p className="text-sm text-gray-600" aria-live="polite">
              {companies.length > 0 && (
                <>
                  Showing {paginationInfo.startIndex + 1}-{Math.min(paginationInfo.endIndex, companies.length)} of {companies.length} jobs
                  {paginationInfo.totalPages > 1 && ` • Page ${currentPage} of ${paginationInfo.totalPages}`}
                </>
              )}
            </p>
          </div>

          {/* View Toggle Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-1 bg-gray-100 rounded-lg p-1" role="tablist">
            <button
              onClick={() => setViewMode('card')}
              role="tab"
              aria-selected={viewMode === 'card'}
              aria-label="Switch to card view"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} cursor-pointer ${
                viewMode === 'card'
                  ? `bg-white text-gray-900 ${DESIGN_TOKENS.SHADOWS.SM}`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Grid3X3 className="w-4 h-4 mr-2" />
              Card
            </button>
            <button
              onClick={() => setViewMode('list')}
              role="tab"
              aria-selected={viewMode === 'list'}
              aria-label="Switch to list view"
              className={`inline-flex items-center px-3 py-2 rounded-md text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} cursor-pointer ${
                viewMode === 'list'
                  ? `bg-white text-gray-900 ${DESIGN_TOKENS.SHADOWS.SM}`
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <List className="w-4 h-4 mr-2" />
              List
            </button>
          </div>
        </div>

        {/* View Toggle Buttons - Mobile */}
        <div className="md:hidden flex items-center space-x-1 bg-gray-100 rounded-lg p-1 w-fit" role="tablist">
          <button
            onClick={() => setViewMode('card')}
            role="tab"
            aria-selected={viewMode === 'card'}
            aria-label="Switch to card view"
            className={`inline-flex items-center p-2 rounded-md text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} cursor-pointer ${
              viewMode === 'card'
                ? `bg-white text-gray-900 ${DESIGN_TOKENS.SHADOWS.SM}`
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Grid3X3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            role="tab"
            aria-selected={viewMode === 'list'}
            aria-label="Switch to list view"
            className={`inline-flex items-center p-2 rounded-md text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} cursor-pointer ${
              viewMode === 'list'
                ? `bg-white text-gray-900 ${DESIGN_TOKENS.SHADOWS.SM}`
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
              {paginationInfo.totalPages > 1 && (
                <nav className="flex items-center justify-center space-x-2 pt-6 border-t border-gray-200 mt-6" aria-label="Pagination Navigation">
                  {/* Prev Button */}
                  <button
                    onClick={goToPrevious}
                    disabled={currentPage === 1}
                    aria-label={ARIA_LABELS.PAGINATION_PREVIOUS}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} ${
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
                    {pageNumbers.map((page) => (
                      <button
                        key={page}
                        onClick={() => goToPage(page)}
                        aria-label={`${ARIA_LABELS.PAGINATION_PAGE} ${page}`}
                        aria-current={currentPage === page ? 'page' : undefined}
                        className={`px-3 py-2 rounded-lg text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} cursor-pointer ${
                          currentPage === page
                            ? `${DESIGN_TOKENS.COLORS.PRIMARY[600]} text-white`
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
                    disabled={currentPage === paginationInfo.totalPages}
                    aria-label={ARIA_LABELS.PAGINATION_NEXT}
                    className={`inline-flex items-center px-3 py-2 rounded-lg text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.COLORS} ${
                      currentPage === paginationInfo.totalPages
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-50 cursor-pointer"
                    }`}
                  >
                    Next
                    <ChevronRight className="w-4 h-4 ml-1" />
                  </button>
                </nav>
              )}
            </>
          )}
        </div>

        {/* Scroll to Top Button */}
        {showScrollToTop && (
          <div className="absolute bottom-4 right-6">
            <button
              onClick={handleScrollToTop}
              aria-label={ARIA_LABELS.SCROLL_TO_TOP}
              className={`group relative w-10 h-10 rounded-full bg-gray-800 border-none font-semibold flex items-center justify-center cursor-pointer transition-all duration-300 overflow-hidden opacity-80 hover:w-32 hover:rounded-full hover:opacity-100 ${DESIGN_TOKENS.SHADOWS.LG} hover:${DESIGN_TOKENS.SHADOWS.XL}`}
            >
              <svg
                className="w-3 h-3 transition-all duration-300 fill-white group-hover:-translate-y-8"
                viewBox="0 0 384 512"
                aria-hidden="true"
              >
                <path d="M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z" />
              </svg>
              <span className="absolute text-white text-xs opacity-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true">
                Back to Top
              </span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

JobList.displayName = 'JobList';

export default JobList;
