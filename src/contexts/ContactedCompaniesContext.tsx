import { createContext, useCallback, useEffect, useState, type ReactNode } from 'react';
import { loadContactedCompanies, saveContactedCompanies } from '@/utils/localStorage';

interface ContactedCompaniesContextType {
  isContacted: (companyId: string) => boolean;
  toggleContacted: (companyId: string) => void;
  getContactedCount: () => number;
}

export const ContactedCompaniesContext = createContext<ContactedCompaniesContextType>({
  isContacted: () => false,
  toggleContacted: () => {},
  getContactedCount: () => 0,
});

interface ContactedCompaniesProviderProps {
  children: ReactNode;
}

export const ContactedCompaniesProvider = ({ 
  children 
}: ContactedCompaniesProviderProps) => {
  const [contactedCompanies, setContactedCompanies] = useState<Set<string>>(new Set());

  useEffect(() => {
    const loadedContacted = loadContactedCompanies();
    setContactedCompanies(loadedContacted);
  }, []);

  useEffect(() => {
    saveContactedCompanies(contactedCompanies);
  }, [contactedCompanies]);

  const isContacted = useCallback((companyId: string): boolean => {
    return contactedCompanies.has(companyId);
  }, [contactedCompanies]);

  const toggleContacted = useCallback((companyId: string): void => {
    setContactedCompanies(prev => {
      const newSet = new Set(prev);
      if (newSet.has(companyId)) {
        newSet.delete(companyId);
      } else {
        newSet.add(companyId);
      }
      return newSet;
    });
  }, []);

  const getContactedCount = useCallback((): number => {
    return contactedCompanies.size;
  }, [contactedCompanies]);

  const value = {
    isContacted,
    toggleContacted,
    getContactedCount,
  };

  return (
    <ContactedCompaniesContext.Provider value={value}>
      {children}
    </ContactedCompaniesContext.Provider>
  );
};