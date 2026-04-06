// Login page component

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { Heart, Loader2, Eye, EyeOff } from 'lucide-react';
import { useAuthStore } from '../../store/useAuthStore';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();
  

  const validateForm = () => {
    const errors: Record<string, string> = {};

    if (!email) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = 'Email is invalid';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();

    if (!validateForm()) {
      return;
    }

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      // Error is handled by the store
      console.error('Login error:', err);
    }
  };

  return (
    <div className="space-y-4">
      {/* Logo and Title */}
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-4">
          <Heart className="w-8 h-8 text-white" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">HealthCare SaaS</h1>
        <p className="mt-2 text-gray-600">Sign in to your account</p>
      </div>

      {/* Login Card */}
      <Card className='  md:w-[400px] mx-auto shadow-md'>
        <CardHeader>
          <CardTitle>Welcome Back</CardTitle>
          <CardDescription>Enter your credentials to access your dashboard</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@healthcare.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setValidationErrors((prev) => ({ ...prev, email: '' }));
                }}
                className={validationErrors.email ? 'border-red-500' : 'border-gray-300'}
                disabled={isLoading}
              />
              {validationErrors.email && (
                <p className="text-sm text-red-500">{validationErrors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setValidationErrors((prev) => ({ ...prev, password: '' }));
                  }}
                  className={validationErrors.password ? 'border-red-500' : 'border-gray-300'}
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {validationErrors.password && (
                <p className="text-sm text-red-500">{validationErrors.password}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign in'
              )}
            </Button>

            {/* Signup Link */}
            <p className="text-center text-sm text-gray-600">
              Don't have an account?{' '}
              <Link to="/signup" className="text-blue-600 hover:underline font-medium">
                Sign up here
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>



    </div>
  );
}
export default LoginPage;