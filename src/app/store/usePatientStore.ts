// Patient state management using Zustand

import { create } from 'zustand';
import type { PatientState } from '../types';
import { apiService } from '../services/api';

export const usePatientStore = create<PatientState>((set) => ({
  patients: [],
  selectedPatient: null,
  viewMode: 'grid',
  searchQuery: '',
  filterStatus: 'all',
  isLoading: false,

  setViewMode: (mode) => set({ viewMode: mode }),

  setSearchQuery: (query) => set({ searchQuery: query }),

  setFilterStatus: (status) => set({ filterStatus: status }),

  selectPatient: (patient) => set({ selectedPatient: patient }),

  fetchPatients: async () => {
    set({ isLoading: true });
    try {
      const patients = await apiService.getPatients();
      set({ patients, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch patients:', error);
      set({ isLoading: false });
    }
  },
}));
