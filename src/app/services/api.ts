// Mock API service for patient data
// In production, replace with actual API calls

import type { Patient, Appointment, AnalyticsData } from '../types';

// Mock patient data
const generateMockPatients = (): Patient[] => {
  const firstNames = ['John', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Jennifer', 'William', 'Linda', 'James', 'Mary', 'Thomas', 'Patricia', 'Daniel', 'Elizabeth'];
  const lastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez', 'Anderson', 'Taylor', 'Thomas', 'Moore', 'Jackson', 'Martin'];
  const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const statuses: ('active' | 'inactive' | 'critical')[] = ['active', 'active', 'active', 'active', 'inactive', 'critical'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego'];
  const states = ['NY', 'CA', 'IL', 'TX', 'AZ', 'PA', 'TX', 'CA'];

  return Array.from({ length: 50 }, (_, i) => {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const cityIndex = Math.floor(Math.random() * cities.length);
    
    return {
      id: `P${String(i + 1).padStart(4, '0')}`,
      firstName,
      lastName,
      email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@email.com`,
      phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
      dateOfBirth: `19${Math.floor(Math.random() * 50) + 40}-${String(Math.floor(Math.random() * 12) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      gender: Math.random() > 0.5 ? 'male' : 'female',
      bloodType: bloodTypes[Math.floor(Math.random() * bloodTypes.length)],
      address: `${Math.floor(Math.random() * 9999) + 1} ${lastNames[Math.floor(Math.random() * lastNames.length)]} Street`,
      city: cities[cityIndex],
      state: states[cityIndex],
      zipCode: String(Math.floor(Math.random() * 90000) + 10000),
      emergencyContact: {
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        phone: `(${Math.floor(Math.random() * 900) + 100}) ${Math.floor(Math.random() * 900) + 100}-${Math.floor(Math.random() * 9000) + 1000}`,
        relationship: ['Spouse', 'Parent', 'Sibling', 'Child'][Math.floor(Math.random() * 4)],
      },
      medicalHistory: ['Hypertension', 'Diabetes Type 2', 'Asthma', 'None'].slice(0, Math.floor(Math.random() * 3)),
      allergies: ['Penicillin', 'Peanuts', 'Latex', 'None'].slice(0, Math.floor(Math.random() * 2)),
      currentMedications: ['Lisinopril', 'Metformin', 'Albuterol', 'None'].slice(0, Math.floor(Math.random() * 3)),
      lastVisit: `2026-${String(Math.floor(Math.random() * 3) + 1).padStart(2, '0')}-${String(Math.floor(Math.random() * 28) + 1).padStart(2, '0')}`,
      nextAppointment: Math.random() > 0.3 ? `2026-04-${String(Math.floor(Math.random() * 25) + 5).padStart(2, '0')}` : undefined,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      assignedDoctor: `Dr. ${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      insuranceProvider: ['Blue Cross', 'Aetna', 'UnitedHealth', 'Cigna', 'Kaiser'][Math.floor(Math.random() * 5)],
      insuranceId: `INS${String(Math.floor(Math.random() * 900000) + 100000)}`,
    };
  });
};

const MOCK_PATIENTS = generateMockPatients();

class ApiService {
  private async simulateNetworkDelay(ms: number = 500): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Fetch all patients
  async getPatients(): Promise<Patient[]> {
    await this.simulateNetworkDelay();
    return MOCK_PATIENTS;
  }

  // Fetch single patient
  async getPatient(id: string): Promise<Patient | null> {
    await this.simulateNetworkDelay();
    return MOCK_PATIENTS.find((p) => p.id === id) || null;
  }

  // Search patients
  async searchPatients(query: string): Promise<Patient[]> {
    await this.simulateNetworkDelay(300);
    const lowerQuery = query.toLowerCase();
    return MOCK_PATIENTS.filter(
      (p) =>
        p.firstName.toLowerCase().includes(lowerQuery) ||
        p.lastName.toLowerCase().includes(lowerQuery) ||
        p.id.toLowerCase().includes(lowerQuery) ||
        p.email.toLowerCase().includes(lowerQuery)
    );
  }

  // Get analytics data
  async getAnalytics(): Promise<AnalyticsData> {
    await this.simulateNetworkDelay();
    
    const activePatients = MOCK_PATIENTS.filter((p) => p.status === 'active').length;
    
    return {
      totalPatients: MOCK_PATIENTS.length,
      activePatients,
      appointmentsToday: 12,
      appointmentsThisWeek: 47,
      appointmentsThisMonth: 189,
      revenueThisMonth: 145000,
      patientSatisfaction: 4.7,
      departmentStats: [
        { name: 'Cardiology', patients: 124, appointments: 45 },
        { name: 'Neurology', patients: 98, appointments: 32 },
        { name: 'Orthopedics', patients: 156, appointments: 67 },
        { name: 'Pediatrics', patients: 203, appointments: 89 },
        { name: 'Emergency', patients: 87, appointments: 123 },
      ],
      monthlyTrends: [
        { month: 'Oct', patients: 420, appointments: 156, revenue: 125000 },
        { month: 'Nov', patients: 445, appointments: 178, revenue: 138000 },
        { month: 'Dec', patients: 468, appointments: 198, revenue: 152000 },
        { month: 'Jan', patients: 492, appointments: 215, revenue: 168000 },
        { month: 'Feb', patients: 511, appointments: 198, revenue: 142000 },
        { month: 'Mar', patients: 534, appointments: 223, revenue: 171000 },
      ],
      appointmentsByType: [
        { type: 'Checkup', count: 145 },
        { type: 'Follow-up', count: 98 },
        { type: 'Emergency', count: 34 },
        { type: 'Consultation', count: 67 },
      ],
      patientsByAge: [
        { ageGroup: '0-18', count: 89 },
        { ageGroup: '19-35', count: 156 },
        { ageGroup: '36-50', count: 198 },
        { ageGroup: '51-65', count: 134 },
        { ageGroup: '65+', count: 112 },
      ],
    };
  }

  // Get recent appointments
  async getRecentAppointments(): Promise<Appointment[]> {
    await this.simulateNetworkDelay();
    
    return [
      {
        id: 'A001',
        patientId: 'P0001',
        patientName: 'John Smith',
        doctorId: 'D001',
        doctorName: 'Dr. Sarah Johnson',
        date: '2026-04-05',
        time: '09:00 AM',
        type: 'checkup',
        status: 'scheduled',
      },
      {
        id: 'A002',
        patientId: 'P0002',
        patientName: 'Sarah Williams',
        doctorId: 'D002',
        doctorName: 'Dr. Michael Chen',
        date: '2026-04-05',
        time: '10:30 AM',
        type: 'follow-up',
        status: 'scheduled',
      },
      {
        id: 'A003',
        patientId: 'P0003',
        patientName: 'Michael Brown',
        doctorId: 'D003',
        doctorName: 'Dr. Emily Rodriguez',
        date: '2026-04-05',
        time: '02:00 PM',
        type: 'consultation',
        status: 'completed',
      },
    ];
  }
}

export const apiService = new ApiService();
