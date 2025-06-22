import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { 
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useVerifyTokenQuery 
} from '../lib/api/authApi';
import type { User, LoginCredentials, SignupCredentials } from '../lib/api/types';
import { SocialProvider } from '@/types/auth';
import { LoginFormData, SignupFormData } from '@/validators/auth';

interface UseAuthReturn {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  socialAuth: (provider: SocialProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => void;
  clearError: () => void;
}

// Helper to get stored auth
const getStoredAuth = () => {
  if (typeof window === 'undefined') {
    return { isLoggedIn: false, user: null, token: null };
  }

  try {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (token && userData) {
      return {
        isLoggedIn: true,
        user: JSON.parse(userData),
        token,
      };
    }
  } catch (error) {
    console.error('Error reading auth from localStorage:', error);
  }

  return { isLoggedIn: false, user: null, token: null };
};

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState(() => ({
    ...getStoredAuth(),
    error: null as string | null,
  }));
  
  const router = useRouter();

  // RTK Query hooks
  const [loginMutation, { isLoading: loginLoading }] = useLoginMutation();
  const [signupMutation, { isLoading: signupLoading }] = useSignupMutation();
  const [logoutMutation, { isLoading: logoutLoading }] = useLogoutMutation();
  
  // Only query current user if we have a token
  const { 
    data: currentUserData,
    isLoading: userLoading,
    refetch: refetchUser 
  } = useGetCurrentUserQuery(undefined, {
    skip: !authState.token,
  });

  const { 
    data: tokenVerification,
    isLoading: verifyLoading 
  } = useVerifyTokenQuery(undefined, {
    skip: !authState.token,
  });

  // Update auth state from localStorage changes
  useEffect(() => {
    const handleAuthChange = () => {
      setAuthState(prev => ({
        ...getStoredAuth(),
        error: prev.error,
      }));
    };

    window.addEventListener('authChange', handleAuthChange);
    
    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, []);

  // Handle token verification
  useEffect(() => {
    if (tokenVerification && !tokenVerification.valid) {
      // Token is invalid, clear auth
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        window.dispatchEvent(new Event('authChange'));
      }
    }
  }, [tokenVerification]);

  // Login with email and password
  const login = useCallback(async (data: LoginFormData) => {
    setAuthState(prev => ({ ...prev, error: null }));
    
    try {
      await loginMutation({
        email: data.email,
        password: data.password,
      }).unwrap();
      
      router.push('/dashboard');
    } catch (error: any) {
      const message = error?.data?.message || error?.message || 'Login failed';
      setAuthState(prev => ({ ...prev, error: message }));
      throw error;
    }
  }, [loginMutation, router]);

  // Signup with email and password
  const signup = useCallback(async (data: SignupFormData) => {
    setAuthState(prev => ({ ...prev, error: null }));
    
    try {
      await signupMutation({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'seeker', // Default to 'seeker' if no role specified
      }).unwrap();
      
      router.push('/dashboard');
    } catch (error: any) {
      const message = error?.data?.message || error?.message || 'Signup failed';
      setAuthState(prev => ({ ...prev, error: message }));
      throw error;
    }
  }, [signupMutation, router]);

  // Social authentication
  const socialAuth = useCallback(async (provider: SocialProvider) => {
    setAuthState(prev => ({ ...prev, error: null }));
    
    try {
      if (provider === 'google') {
        // For Google auth, we redirect to the backend OAuth URL
        window.location.href = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001'}/api/auth/google`;
      } else {
        throw new Error(`${provider} authentication not supported`);
      }
    } catch (error: any) {
      const message = error?.message || 'Social authentication failed';
      setAuthState(prev => ({ ...prev, error: message }));
      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, error: null }));
    
    try {
      await logoutMutation().unwrap();
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
    } finally {
      router.push('/');
    }
  }, [logoutMutation, router]);

  // Refresh user data
  const refreshUser = useCallback(() => {
    refetchUser();
  }, [refetchUser]);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  // Calculate loading state
  const loading = loginLoading || signupLoading || logoutLoading || userLoading || verifyLoading;

  return {
    isLoggedIn: authState.isLoggedIn,
    user: authState.user,
    token: authState.token,
    loading,
    error: authState.error,
    login,
    signup,
    socialAuth,
    logout,
    refreshUser,
    clearError,
  };
}; 