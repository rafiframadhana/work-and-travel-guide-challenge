import { memo } from 'react';
import type { Company } from '@/types/company';
import JobCardBase from './JobCardBase';
import { User, Mail, Phone, MapPin, Eye, Navigation } from 'lucide-react';
import { ARIA_LABELS, DESIGN_TOKENS } from '@/config/constants';

interface JobCardFullProps {
  company: Company;
  isContacted: boolean;
  onToggleContacted: () => void;
  onOpenModal: () => void;
  onViewLocation: (company: Company) => void;
  isTransitioning?: boolean;
}

const JobCardFull = memo<JobCardFullProps>(({
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
      className={`rounded-xl p-6 ${isTransitioning ? DESIGN_TOKENS.TRANSITIONS.FADE_OUT : DESIGN_TOKENS.TRANSITIONS.FADE_IN}`}
    >
      <div className={`mb-4 ${
        isTransitioning ? DESIGN_TOKENS.TRANSITIONS.SLIDE_OUT : DESIGN_TOKENS.TRANSITIONS.SLIDE_IN
      }`}>
        <div className="flex items-center space-x-2 text-sm text-gray-600 mb-3">
          <User className="w-4 h-4" />
          <span>
            {company.firstName} {company.lastName}
          </span>
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${DESIGN_TOKENS.COLORS.PRIMARY[100]} text-blue-800`}>
            {company.industry}
          </span>
        </div>
      </div>

      <div className={`space-y-3 mb-4 ${
        isTransitioning ? DESIGN_TOKENS.TRANSITIONS.SLIDE_OUT : DESIGN_TOKENS.TRANSITIONS.SLIDE_IN
      }`}>
        <div className="flex items-center space-x-3">
          <Mail className="w-4 h-4 text-gray-400" />
          <a
            href={`mailto:${company.email}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            aria-label={`Send email to ${company.email}`}
          >
            {company.email}
          </a>
        </div>

        <div className="flex items-center space-x-3">
          <Phone className="w-4 h-4 text-gray-400" />
          <a
            href={`tel:${company.phoneNumber}`}
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
            aria-label={`Call ${company.phoneNumber}`}
          >
            {company.phoneNumber}
          </a>
        </div>

        <div className="flex items-start space-x-3">
          <MapPin className="w-4 h-4 text-gray-400 mt-0.5" />
          <div>
            <p className="text-gray-600 text-sm">{company.address}</p>
            <p className="text-gray-500 text-xs mt-1">
              {company.state}, Australia
            </p>
          </div>
        </div>
      </div>

      <div className={`flex gap-4 items-center pt-4 border-t border-gray-100 ${
        isTransitioning ? DESIGN_TOKENS.TRANSITIONS.SLIDE_OUT : DESIGN_TOKENS.TRANSITIONS.SLIDE_IN
      }`}>
        <button
          onClick={onOpenModal}
          aria-label={`${ARIA_LABELS.VIEW_JOB} for ${company.companyName}`}
          className={`inline-flex items-center px-3 py-2 ${DESIGN_TOKENS.COLORS.WARNING[400]} cursor-pointer rounded-lg text-sm font-medium hover:${DESIGN_TOKENS.COLORS.WARNING[500]} ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} ${DESIGN_TOKENS.SHADOWS.SM} hover:${DESIGN_TOKENS.SHADOWS.MD}`}
        >
          <Eye className="w-4 h-4 mr-2" />
          View Job
        </button>

        <button
          onClick={() => onViewLocation(company)}
          aria-label={`${ARIA_LABELS.VIEW_LOCATION} for ${company.companyName}`}
          className={`hidden md:inline-flex items-center px-3 py-2 ${DESIGN_TOKENS.COLORS.PRIMARY[500]} cursor-pointer text-white rounded-lg text-sm font-medium hover:${DESIGN_TOKENS.COLORS.PRIMARY[600]} ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} ${DESIGN_TOKENS.SHADOWS.SM} hover:${DESIGN_TOKENS.SHADOWS.MD}`}
        >
          <Navigation className="w-4 h-4 mr-2" />
          View Location
        </button>
      </div>
    </JobCardBase>
  );
});

JobCardFull.displayName = 'JobCardFull';

export default JobCardFull;