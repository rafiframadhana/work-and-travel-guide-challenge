import { APP_CONFIG } from '@/config/constants';

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '');
};

export const validateEmail = (email: string): boolean => {
  return APP_CONFIG.VALIDATION.EMAIL_REGEX.test(email);
};

export const validatePhone = (phone: string): boolean => {
  return APP_CONFIG.VALIDATION.PHONE_REGEX.test(phone);
};

export const formatPhoneNumber = (phone: string): string => {
  return phone.replace(/(\+\d{2})(\d{1})(\d{4})(\d{4})/, '$1 $2 $3 $4');
};