// Mock Firebase Authentication Service
// In production, replace with actual Firebase configuration

import type { User } from '../types';

// Mock user data
const MOCK_USERS = [
  {
    id: '1',
    email: 'admin@healthcare.com',
    password: 'admin123',
    name: 'Dr. Sarah Johnson',
    role: 'admin' as const,
    department: 'Administration',
  },
  {
    id: '2',
    email: 'doctor@healthcare.com',
    password: 'doctor123',
    name: 'Dr. Michael Chen',
    role: 'doctor' as const,
    department: 'Cardiology',
  },
  {
    id: '3',
    email: 'nurse@healthcare.com',
    password: 'nurse123',
    name: 'Emily Rodriguez',
    role: 'nurse' as const,
    department: 'Emergency',
  },
];

class FirebaseAuthService {
  private currentUser: User | null = null;

  // Simulated delay for realistic API behavior
  private async simulateNetworkDelay(ms: number = 1000): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // Initialize auth state from localStorage
  async initialize(): Promise<User | null> {
    const storedUser = localStorage.getItem('healthcare_user');
    if (storedUser) {
      this.currentUser = JSON.parse(storedUser);
      return this.currentUser;
    }
    return null;
  }

  // Mock login function
  async login(email: string, password: string): Promise<User> {
    await this.simulateNetworkDelay(800);

    const mockUser = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (!mockUser) {
      throw new Error('Invalid email or password');
    }

    // Create user object without password
    const { password: _, ...userWithoutPassword } = mockUser;
    this.currentUser = userWithoutPassword;

    // Store in localStorage
    localStorage.setItem('healthcare_user', JSON.stringify(this.currentUser));

    return this.currentUser;
  }

  // Mock logout function
  async logout(): Promise<void> {
    await this.simulateNetworkDelay(300);
    this.currentUser = null;
    localStorage.removeItem('healthcare_user');
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Mock password reset
  async resetPassword(email: string): Promise<void> {
    await this.simulateNetworkDelay(1000);
    const user = MOCK_USERS.find((u) => u.email === email);
    if (!user) {
      throw new Error('No user found with this email');
    }
    // In real implementation, this would send a reset email
    console.log(`Password reset email sent to ${email}`);
  }
}

// Export singleton instance
export const authService = new FirebaseAuthService();

// Demo credentials helper
export const getDemoCredentials = () => ({
  admin: { email: 'admin@healthcare.com', password: 'admin123' },
  doctor: { email: 'doctor@healthcare.com', password: 'doctor123' },
  nurse: { email: 'nurse@healthcare.com', password: 'nurse123' },
});
