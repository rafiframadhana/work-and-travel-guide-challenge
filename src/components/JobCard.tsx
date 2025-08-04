import { useState, memo, useContext, useEffect, useRef } from 'react';
import type { Company, ViewMode } from "@/types/company";
import JobModal from "./JobModal";
import JobCardList from "./JobCardList";
import JobCardFull from "./JobCardFull";
import { ContactedCompaniesContext } from "@/contexts/ContactedCompaniesContext";
import { DESIGN_TOKENS } from "@/config/constants";

interface JobCardProps {
  company: Company;
  onViewLocation: (company: Company) => void;
  variant?: ViewMode;
}

const JobCard = memo(({ company, onViewLocation, variant = 'card' }: JobCardProps) => {
  const [selectedJob, setSelectedJob] = useState<Company | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState(variant);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { isContacted, toggleContacted } = useContext(ContactedCompaniesContext);
  const cardRef = useRef<HTMLDivElement>(null);

  // Handle variant changes with smooth transition
  useEffect(() => {
    if (variant !== currentVariant) {
      setIsTransitioning(true);
      
      // Brief delay to allow exit animation
      const timer = setTimeout(() => {
        setCurrentVariant(variant);
        setIsTransitioning(false);
      }, 150);

      return () => clearTimeout(timer);
    }
  }, [variant, currentVariant]);

  const handleToggleContacted = () => {
    toggleContacted(company.companyId);
  };

  const openJobModal = () => {
    setSelectedJob(company);
    setIsModalOpen(true);
  };

  const closeJobModal = () => {
    setIsModalOpen(false);
    setSelectedJob(null);
  };

  const isCompanyContacted = isContacted(company.companyId);
  const CardComponent = currentVariant === 'list' ? JobCardList : JobCardFull;

  return (
    <>
      <div 
        ref={cardRef}
        className={`${DESIGN_TOKENS.TRANSITIONS.CARD_VARIANT} ${
          isTransitioning ? 'opacity-75 scale-98' : 'opacity-100 scale-100'
        }`}
      >
        <CardComponent
          company={company}
          isContacted={isCompanyContacted}
          onToggleContacted={handleToggleContacted}
          onOpenModal={openJobModal}
          onViewLocation={onViewLocation}
          isTransitioning={isTransitioning}
        />
      </div>

      <JobModal
        isOpen={isModalOpen}
        job={selectedJob}
        isContacted={isCompanyContacted}
        onClose={closeJobModal}
      />
    </>
  );
});

JobCard.displayName = 'JobCard';

export default JobCard;
