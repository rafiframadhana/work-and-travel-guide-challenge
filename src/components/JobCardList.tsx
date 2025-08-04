import { memo } from 'react';
import type { Company } from '@/types/company';
import JobCardBase from './JobCardBase';
import { MapPin, Eye, Navigation } from 'lucide-react';
import { ARIA_LABELS, DESIGN_TOKENS } from '@/config/constants';

interface JobCardListProps {
  company: Company;
  isContacted: boolean;
  onToggleContacted: () => void;
  onOpenModal: () => void;
  onViewLocation: (company: Company) => void;
  isTransitioning?: boolean;
}

const JobCardList = memo<JobCardListProps>(({
  company,
  isContacted,
  onToggleContacted,
  onOpenModal,
  onViewLocation,
  isTransitioning = false,
}) => {
  return (
    <JobCardBase
      company={company}
      isContacted={isContacted}
      onToggleContacted={onToggleContacted}
      onOpenModal={onOpenModal}
      className={`p-4 ${isTransitioning ? DESIGN_TOKENS.TRANSITIONS.FADE_OUT : DESIGN_TOKENS.TRANSITIONS.FADE_IN}`}
    >
      <div className="flex items-center mt-1 mb-3">
        <MapPin className="w-3 h-3 text-gray-400 mr-1 flex-shrink-0 mt-1 md:mt-0" />
        <p className="text-sm text-gray-600">
          {company.address}, {company.state}
        </p>
      </div>

      <div className={`flex items-center space-x-2 pt-2 border-t border-gray-100 ${
        isTransitioning ? DESIGN_TOKENS.TRANSITIONS.SLIDE_OUT : DESIGN_TOKENS.TRANSITIONS.SLIDE_IN
      }`}>
        <button
          onClick={onOpenModal}
          aria-label={`${ARIA_LABELS.VIEW_JOB} for ${company.companyName}`}
          className={`inline-flex items-center px-2 py-1.5 ${DESIGN_TOKENS.COLORS.WARNING[400]} cursor-pointer rounded-md text-xs md:text-sm font-medium hover:${DESIGN_TOKENS.COLORS.WARNING[500]} ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} ${DESIGN_TOKENS.SHADOWS.SM} hover:${DESIGN_TOKENS.SHADOWS.MD}`}
        >
          <Eye className="w-3 h-3 mr-1" />
          View
        </button>

        <button
          onClick={() => onViewLocation(company)}
          aria-label={`${ARIA_LABELS.VIEW_LOCATION} for ${company.companyName}`}
          className={`inline-flex items-center px-2 py-1.5 ${DESIGN_TOKENS.COLORS.PRIMARY[500]} cursor-pointer text-white rounded-md text-xs md:text-sm font-medium hover:${DESIGN_TOKENS.COLORS.PRIMARY[600]} ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} ${DESIGN_TOKENS.SHADOWS.SM} hover:${DESIGN_TOKENS.SHADOWS.MD}`}
        >
          <Navigation className="w-3 h-3 mr-1" />
          Location
        </button>
      </div>
    </JobCardBase>
  );
});

JobCardList.displayName = 'JobCardList';

export default JobCardList;