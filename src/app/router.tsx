// React Router configuration

import { createBrowserRouter, Navigate } from 'react-router';
import  DashboardLayout  from './components/layouts/DashboardLayout';
import AuthLayout  from './components/layouts/AuthLayout';
import LoginPage from './components/auth/LoginPage';
import DashboardPage from './components/dashboard/DashboardPage';
import AnalyticsPage from './components/analytics/AnalyticsPage';
import PatientsPage from './components/patients/PatientsPage';
import { useAuthStore } from './store/useAuthStore';

// Protected route wrapper
function ProtectedRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
}

// Public route wrapper (redirect to dashboard if already authenticated)
function PublicRoute({ children }: { children: React.ReactNode }) {
    const { isAuthenticated } = useAuthStore();

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return <>{children}</>;
}

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Navigate to="/dashboard" replace />,
    },
    {
        path: '/login',
        element: (
            <PublicRoute>
                <AuthLayout>
                    <LoginPage />
                </AuthLayout>
            </PublicRoute>
        ),
    },
    {
        path: '/',
        element: (
            <ProtectedRoute>
                <DashboardLayout />
            </ProtectedRoute>
        ),
        children: [
            {
                path: 'dashboard',
                element: <DashboardPage />,
            },
            {
                path: 'analytics',
                element: <AnalyticsPage />,
            },
            {
                path: 'patients',
                element: <PatientsPage />,
            },
        ],
    },
    {
        path: '*',
        element: (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
                    <p className="text-gray-600 mb-6">Page not found</p>
                    <a
                        href="/dashboard"
                        className="text-blue-600 hover:underline"
                    >
                        Go back to dashboard
                    </a>
                </div>
            </div>
        ),
    },
]);
