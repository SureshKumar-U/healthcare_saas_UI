// Core application types

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'doctor' | 'nurse' | 'staff';
  avatar?: string;
  department?: string;
}

export interface Patient {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  dateOfBirth: string;
  gender: 'male' | 'female' | 'other';
  bloodType: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  emergencyContact: {
    name: string;
    phone: string;
    relationship: string;
  };
  medicalHistory: string[];
  allergies: string[];
  currentMedications: string[];
  lastVisit: string;
  nextAppointment?: string;
  status: 'active' | 'inactive' | 'critical';
  assignedDoctor: string;
  insuranceProvider: string;
  insuranceId: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  doctorId: string;
  doctorName: string;
  date: string;
  time: string;
  type: 'checkup' | 'follow-up' | 'emergency' | 'consultation';
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  notes?: string;
}

export interface AnalyticsData {
  totalPatients: number;
  activePatients: number;
  appointmentsToday: number;
  appointmentsThisWeek: number;
  appointmentsThisMonth: number;
  revenueThisMonth: number;
  patientSatisfaction: number;
  departmentStats: {
    name: string;
    patients: number;
    appointments: number;
  }[];
  monthlyTrends: {
    month: string;
    patients: number;
    appointments: number;
    revenue: number;
  }[];
  appointmentsByType: {
    type: string;
    count: number;
  }[];
  patientsByAge: {
    ageGroup: string;
    count: number;
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: string;
  read: boolean;
  actionUrl?: string;
}

export type ViewMode = 'grid' | 'list';

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

export interface PatientState {
  patients: Patient[];
  selectedPatient: Patient | null;
  viewMode: ViewMode;
  searchQuery: string;
  filterStatus: string;
  isLoading: boolean;
  setViewMode: (mode: ViewMode) => void;
  setSearchQuery: (query: string) => void;
  setFilterStatus: (status: string) => void;
  selectPatient: (patient: Patient | null) => void;
  fetchPatients: () => Promise<void>;
}

export interface NotificationState {
  notifications: Notification[];
  unreadCount: number;
  addNotification: (notification: Omit<Notification, 'id' | 'timestamp' | 'read'>) => void;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  clearNotifications: () => void;
}
