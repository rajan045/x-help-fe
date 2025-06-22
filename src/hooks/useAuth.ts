import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthResponse, SocialProvider } from '@/types/auth';
import { LoginFormData, SignupFormData } from '@/validators/auth';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const login = async (data: LoginFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual login logic with NextAuth
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Login failed');
      }

      router.push('/dashboard');
      return { user: result.user, error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      return { user: null, error: { code: 'LOGIN_ERROR', message } };
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (data: SignupFormData): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement actual signup logic
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();
      
      if (!response.ok) {
        throw new Error(result.message || 'Signup failed');
      }

      router.push('/dashboard');
      return { user: result.user, error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      return { user: null, error: { code: 'SIGNUP_ERROR', message } };
    } finally {
      setIsLoading(false);
    }
  };

  const socialAuth = async (provider: SocialProvider): Promise<AuthResponse> => {
    setIsLoading(true);
    setError(null);
    try {
      // Redirect to backend Google OAuth endpoint
      const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:5001';
      
      // Redirect to backend OAuth
      window.location.href = `${backendUrl}/api/auth/${provider}`;
      
      // Return pending state as the redirect will handle the rest
      return { user: null, error: null };
    } catch (error) {
      const message = error instanceof Error ? error.message : 'An error occurred';
      setError(message);
      return { user: null, error: { code: 'SOCIAL_AUTH_ERROR', message } };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement logout logic
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/auth/login');
    } catch {
      setError('Failed to logout');
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    signup,
    socialAuth,
    logout,
    isLoading,
    error,
  };
}; 