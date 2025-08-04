import { memo } from 'react';
import { Search, ChevronDown, MapPin } from 'lucide-react';
import { ARIA_LABELS } from '@/config/constants';
import { sanitizeInput } from '@/utils/validation';

interface FilterInputProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type: 'search' | 'select';
  placeholder?: string;
  options?: string[];
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
}

const FilterInput: React.FC<FilterInputProps> = memo(({
  id,
  label,
  value,
  onChange,
  type,
  placeholder,
  options = [],
  icon: Icon = Search,
  className = '',
}) => {
  const handleChange = (newValue: string) => {
    const sanitized = type === 'search' ? sanitizeInput(newValue) : newValue;
    onChange(sanitized);
  };

  if (type === 'search') {
    return (
      <div className={`relative ${className}`}>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-4 w-4 text-gray-400" />
          </div>
          <input
            id={id}
            type="text"
            placeholder={placeholder}
            aria-label={ARIA_LABELS.SEARCH_INPUT}
            className="block w-full pl-9 pr-3 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:border-black transition-all duration-200 placeholder-gray-400 text-sm hover:border-gray-400 bg-white"
            value={value}
            onChange={(e) => handleChange(e.target.value)}
            autoComplete="off"
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <div className="relative">
        <select 
          id={id}
          aria-label={id.includes('industry') ? ARIA_LABELS.INDUSTRY_SELECT : ARIA_LABELS.LOCATION_SELECT}
          className="block w-full px-3 py-2.5 pr-9 border border-gray-300 cursor-pointer rounded-md transition-all duration-200 text-sm appearance-none bg-white hover:border-gray-400 focus:outline-none focus:border-black [&>option]:bg-white [&>option]:text-gray-800 [&>option]:py-2 [&>option]:px-3 [&>option:hover]:bg-gray-50 [&>option:checked]:bg-gray-100 [&>option:checked]:font-medium"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        >
          <option value="" className="text-gray-500">{placeholder}</option>
          {options.map(option => (
            <option key={option} value={option} className="text-gray-800">{option}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          {id.includes('location') ? (
            <MapPin className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </div>
    </div>
  );
});

FilterInput.displayName = 'FilterInput';

export default FilterInput;