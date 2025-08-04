import { memo, type ReactNode } from 'react';
import type { Company } from '@/types/company';
import { Check } from 'lucide-react';
import { Tooltip } from 'react-tooltip';
import { ARIA_LABELS, DESIGN_TOKENS } from '@/config/constants';

interface JobCardBaseProps {
  company: Company;
  isContacted: boolean;
  onToggleContacted: () => void;
  onOpenModal: () => void;
  children: ReactNode;
  className?: string;
}

const JobCardBase = memo<JobCardBaseProps>(({
  company,
  isContacted,
  onToggleContacted,
  onOpenModal,
  children,
  className = '',
}) => {
  const baseClasses = `group relative bg-white border rounded-lg ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} hover:shadow-md`;
  const contactedClasses = isContacted 
    ? `${DESIGN_TOKENS.COLORS.SUCCESS[400]} ${DESIGN_TOKENS.COLORS.SUCCESS[50]}` 
    : 'border-gray-200 hover:border-gray-300 hover:shadow-lg';

  return (
    <div className={`${baseClasses} ${contactedClasses} ${className}`}>
      <div className="flex justify-between items-start pb-1">
        <button
          onClick={onOpenModal}
          className="text-left cursor-pointer flex-1"
          aria-label={`${ARIA_LABELS.VIEW_JOB} for ${company.companyName}`}
        >
          <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 transition-colors">
            {company.companyName}
          </h3>
        </button>

        <button
          onClick={onToggleContacted}
          data-tooltip-id={`contact-tooltip-${company.companyId}`}
          data-tooltip-content={
            isContacted ? ARIA_LABELS.UNMARK_CONTACTED : ARIA_LABELS.MARK_CONTACTED
          }
          aria-label={isContacted ? ARIA_LABELS.UNMARK_CONTACTED : ARIA_LABELS.MARK_CONTACTED}
          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${DESIGN_TOKENS.TRANSITIONS.DEFAULT} cursor-pointer flex-shrink-0 ${
            isContacted
              ? `${DESIGN_TOKENS.COLORS.SUCCESS[500]} text-white hover:${DESIGN_TOKENS.COLORS.SUCCESS[600]} ${DESIGN_TOKENS.SHADOWS.SM}`
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-300'
          }`}
        >
          <Check className="w-4 h-4" />
        </button>
        
        <Tooltip
          id={`contact-tooltip-${company.companyId}`}
          place="bottom"
          style={{
            backgroundColor: "#374151",
            color: "#ffffff",
            borderRadius: "8px",
            fontSize: "12px",
            padding: "6px 12px",
          }}
        />
      </div>

      {children}
    </div>
  );
});

JobCardBase.displayName = 'JobCardBase';

export default JobCardBase;