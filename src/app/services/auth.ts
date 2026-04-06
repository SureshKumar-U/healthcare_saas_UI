// Firebase Authentication Service

import type { User } from '../types';
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendPasswordResetEmail,
  updateProfile,
  type Auth,
  type UserCredential,
} from 'firebase/auth';
import { app } from '../utils/firebaseConfig';''

class FirebaseAuthService {
  private auth: Auth;
  private currentUser: User | null = null;

  constructor() {
    this.auth = getAuth(app);
  }

  // Initialize auth state listener
  async initialize(): Promise<User | null> {
    return new Promise((resolve) => {
      const unsubscribe = onAuthStateChanged(this.auth, async (firebaseUser) => {
        if (firebaseUser) {
          // Construct User object from Firebase user
          const user: User = {
            id: firebaseUser.uid,
            email: firebaseUser.email || '',
            name: firebaseUser.displayName || 'User',
            role: 'staff' as const, // Default role, can be customized
            department: 'General',
            avatar: firebaseUser.photoURL || undefined,
          };
          this.currentUser = user;
          localStorage.setItem('healthcare_user', JSON.stringify(user));
          resolve(user);
        } else {
          this.currentUser = null;
          localStorage.removeItem('healthcare_user');
          resolve(null);
        }
        unsubscribe();
      });
    });
  }

  // Signup function
  async signup(name: string, email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await createUserWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      // Update profile with display name
      await updateProfile(userCredential.user, {
        displayName: name,
      });

      const user: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: name,
        role: 'staff' as const, // New users start as staff
        department: 'General',
      };

      this.currentUser = user;
      localStorage.setItem('healthcare_user', JSON.stringify(user));

      return user;
    } catch (error) {
      throw this.formatFirebaseError(error);
    }
  }

  // Login function
  async login(email: string, password: string): Promise<User> {
    try {
      const userCredential: UserCredential = await signInWithEmailAndPassword(
        this.auth,
        email,
        password
      );

      const user: User = {
        id: userCredential.user.uid,
        email: userCredential.user.email || '',
        name: userCredential.user.displayName || 'User',
        role: 'staff' as const, // Can be fetched from Firestore
        department: 'General',
        avatar: userCredential.user.photoURL || undefined,
      };

      this.currentUser = user;
      localStorage.setItem('healthcare_user', JSON.stringify(user));

      return user;
    } catch (error) {
      throw this.formatFirebaseError(error);
    }
  }

  // Logout function
  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUser = null;
      localStorage.removeItem('healthcare_user');
    } catch (error) {
      throw this.formatFirebaseError(error);
    }
  }

  // Get current user
  getCurrentUser(): User | null {
    return this.currentUser;
  }

  // Check if user is authenticated
  isAuthenticated(): boolean {
    return this.currentUser !== null;
  }

  // Password reset
  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(this.auth, email);
      console.log(`Password reset email sent to ${email}`);
    } catch (error) {
      throw this.formatFirebaseError(error);
    }
  }

  // Format Firebase errors
  private formatFirebaseError(error: unknown): Error {
    if (error instanceof Error) {
      const message = error.message;

      if (message.includes('auth/email-already-in-use')) {
        return new Error('Email is already registered');
      } else if (message.includes('auth/invalid-email')) {
        return new Error('Invalid email address');
      } else if (message.includes('auth/weak-password')) {
        return new Error('Password is too weak. Use at least 6 characters');
      } else if (message.includes('auth/user-not-found')) {
        return new Error('No user found with this email');
      } else if (message.includes('auth/wrong-password')) {
        return new Error('Invalid email or password');
      } else if (message.includes('auth/invalid-credential')) {
        return new Error('Invalid email or password');
      } else if (message.includes('auth/operation-not-allowed')) {
        return new Error('This operation is not allowed');
      } else if (message.includes('auth/too-many-requests')) {
        return new Error('Too many login attempts. Please try again later');
      }

      return error;
    }

    return new Error('An authentication error occurred');
  }
}

// Export singleton instance
export const authService = new FirebaseAuthService();

