import { APP_CONFIG } from '@/config/constants';

export interface FilterState {
  searchTerm: string;
  industry: string;
  location: string;
}

export const loadFilters = (): FilterState => {
  try {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.FILTERS);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch (error) {
    console.warn('Failed to load filters from localStorage:', error);
  }
  return { searchTerm: '', industry: '', location: '' };
};

export const saveFilters = (filters: FilterState): void => {
  try {
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.FILTERS, JSON.stringify(filters));
  } catch (error) {
    console.warn('Failed to save filters to localStorage:', error);
  }
};

export const loadContactedCompanies = (): Set<string> => {
  try {
    const saved = localStorage.getItem(APP_CONFIG.STORAGE_KEYS.CONTACTED_COMPANIES);
    if (saved) {
      return new Set(JSON.parse(saved));
    }
  } catch (error) {
    console.warn('Failed to load contacted companies from localStorage:', error);
  }
  return new Set();
};

export const saveContactedCompanies = (contactedSet: Set<string>): void => {
  try {
    const array = Array.from(contactedSet);
    localStorage.setItem(APP_CONFIG.STORAGE_KEYS.CONTACTED_COMPANIES, JSON.stringify(array));
  } catch (error) {
    console.warn('Failed to save contacted companies to localStorage:', error);
  }
};