// Application constants

/**
 * Application Routes
 */
export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  DASHBOARD: '/dashboard',
  ANALYTICS: '/analytics',
  PATIENTS: '/patients',
} as const;

/**
 * Local Storage Keys
 */
export const STORAGE_KEYS = {
  AUTH_USER: 'healthcare_user',
  AUTH_STORAGE: 'auth-storage',
  THEME: 'theme',
} as const;

/**
 * Patient Status Options
 */
export const PATIENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
  CRITICAL: 'critical',
} as const;

/**
 * Appointment Types
 */
export const APPOINTMENT_TYPES = {
  CHECKUP: 'checkup',
  FOLLOW_UP: 'follow-up',
  EMERGENCY: 'emergency',
  CONSULTATION: 'consultation',
} as const;

/**
 * Appointment Status
 */
export const APPOINTMENT_STATUS = {
  SCHEDULED: 'scheduled',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled',
  NO_SHOW: 'no-show',
} as const;

/**
 * User Roles
 */
export const USER_ROLES = {
  ADMIN: 'admin',
  DOCTOR: 'doctor',
  NURSE: 'nurse',
  STAFF: 'staff',
} as const;

/**
 * Notification Types
 */
export const NOTIFICATION_TYPES = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
} as const;

/**
 * View Modes
 */
export const VIEW_MODES = {
  GRID: 'grid',
  LIST: 'list',
} as const;

/**
 * Blood Types
 */
export const BLOOD_TYPES = [
  'A+',
  'A-',
  'B+',
  'B-',
  'AB+',
  'AB-',
  'O+',
  'O-',
] as const;

/**
 * Gender Options
 */
export const GENDER_OPTIONS = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
} as const;

/**
 * API Configuration
 */
export const API_CONFIG = {
  BASE_URL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  TIMEOUT: 10000,
  RETRY_ATTEMPTS: 3,
} as const;

/**
 * Pagination
 */
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 20,
  PAGE_SIZE_OPTIONS: [10, 20, 50, 100],
} as const;

/**
 * Date Formats
 */
export const DATE_FORMATS = {
  DISPLAY: 'MMM dd, yyyy',
  INPUT: 'yyyy-MM-dd',
  TIMESTAMP: 'yyyy-MM-dd HH:mm:ss',
} as const;

/**
 * Validation Rules
 */
export const VALIDATION = {
  MIN_PASSWORD_LENGTH: 6,
  MAX_PASSWORD_LENGTH: 100,
  MIN_NAME_LENGTH: 2,
  MAX_NAME_LENGTH: 50,
  PHONE_REGEX: /^[\d\s\-\(\)]+$/,
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
} as const;

/**
 * Chart Colors
 */
export const CHART_COLORS = {
  PRIMARY: '#3b82f6',
  SECONDARY: '#8b5cf6',
  SUCCESS: '#10b981',
  WARNING: '#f59e0b',
  DANGER: '#ef4444',
  INFO: '#06b6d4',
} as const;

/**
 * Timeouts
 */
export const TIMEOUTS = {
  TOAST: 3000,
  DEBOUNCE: 300,
  API_REQUEST: 10000,
  NOTIFICATION: 5000,
} as const;

/**
 * Service Worker
 */
export const SERVICE_WORKER = {
  CACHE_NAME: 'healthcare-saas-v1',
  CACHE_URLS: ['/', '/index.html'],
} as const;



export const FIREBASE_API_KEY = import.meta.env.VITE_FIREBASE_API_KEY
export const FIREBASE_AUTH_DOMAIN = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN
export const FIREBASE_PROJECT_ID = import.meta.env.VITE_FIREBASE_PROJECT_ID
export const FIREBASE_STORAGE_BUCKET = import.meta.env.VITE_FIREBASE_STORAGE_BUCKET
export const FIREBASE_MESSAGING_SENDER_ID = import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID
export const FIREBASE_APP_ID = import.meta.env.VITE_FIREBASE_APP_ID
export const FIREBASE_MEASUREMENT_ID = import.meta.env.VITE_FIREBASE_MEASUREMENT_ID