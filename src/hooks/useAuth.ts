import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { authService, User, AuthState } from '@/services/authService';
import { SocialProvider } from '@/types/auth';
import { LoginFormData, SignupFormData } from '@/validators/auth';

interface UseAuthReturn extends AuthState {
  loading: boolean;
  error: string | null;
  login: (data: LoginFormData) => Promise<void>;
  signup: (data: SignupFormData) => Promise<void>;
  socialAuth: (provider: SocialProvider) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  clearError: () => void;
}

export const useAuth = (): UseAuthReturn => {
  const [authState, setAuthState] = useState<AuthState & { loading: boolean; error: string | null }>({
    isLoggedIn: false,
    user: null,
    token: null,
    loading: true,
    error: null,
  });
  
  const router = useRouter();

  // Update auth state from service
  const updateAuthState = useCallback(() => {
    const currentAuth = authService.getAuthState();
    setAuthState(prev => ({
      ...currentAuth,
      loading: prev.loading,
      error: prev.error,
    }));
  }, []);

  // Initialize auth state
  useEffect(() => {
    const initAuth = async () => {
      try {
        // Get current auth state
        const currentAuth = authService.getAuthState();
        
        if (currentAuth.isLoggedIn) {
          // Verify token is still valid
          const isValid = await authService.verifyToken();
          if (!isValid) {
            // Token is invalid, clear auth
            await authService.logout();
            setAuthState(prev => ({
              isLoggedIn: false,
              user: null,
              token: null,
              loading: false,
              error: prev.error,
            }));
            return;
          }
        }
        
        setAuthState(prev => ({
          ...currentAuth,
          loading: false,
          error: prev.error,
        }));
      } catch (error) {
        console.error('Error initializing auth:', error);
        setAuthState(prev => ({
          isLoggedIn: false,
          user: null,
          token: null,
          loading: false,
          error: prev.error,
        }));
      }
    };

    initAuth();

    // Listen for auth changes
    const handleAuthChange = () => {
      updateAuthState();
    };

    window.addEventListener('authChange', handleAuthChange);

    return () => {
      window.removeEventListener('authChange', handleAuthChange);
    };
  }, [updateAuthState]);

  // Login with email and password
  const login = useCallback(async (data: LoginFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await authService.login({
        email: data.email,
        password: data.password,
      });
      
      updateAuthState();
      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Login failed';
      setAuthState(prev => ({ ...prev, error: message }));
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, [updateAuthState, router]);

  // Signup with email and password
  const signup = useCallback(async (data: SignupFormData) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await authService.signup({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role || 'seeker', // Default to 'seeker' if no role specified
      });
      
      updateAuthState();
      router.push('/dashboard');
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Signup failed';
      setAuthState(prev => ({ ...prev, error: message }));
      throw error;
    } finally {
      setAuthState(prev => ({ ...prev, loading: false }));
    }
  }, [updateAuthState, router]);

  // Social authentication
  const socialAuth = useCallback(async (provider: SocialProvider) => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      if (provider === 'google') {
        authService.initiateGoogleLogin();
      } else {
        throw new Error(`${provider} authentication not supported`);
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Social authentication failed';
      setAuthState(prev => ({ ...prev, error: message, loading: false }));
      throw error;
    }
  }, []);

  // Logout
  const logout = useCallback(async () => {
    setAuthState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      await authService.logout();
      setAuthState({
        isLoggedIn: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      });
      router.push('/');
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
      setAuthState({
        isLoggedIn: false,
        user: null,
        token: null,
        loading: false,
        error: null,
      });
      router.push('/');
    }
  }, [router]);

  // Refresh user data
  const refreshUser = useCallback(async () => {
    try {
      const user = await authService.getCurrentUser();
      if (user) {
        updateAuthState();
      }
    } catch (error) {
      console.error('Failed to refresh user:', error);
    }
  }, [updateAuthState]);

  // Clear error
  const clearError = useCallback(() => {
    setAuthState(prev => ({ ...prev, error: null }));
  }, []);

  return {
    isLoggedIn: authState.isLoggedIn,
    user: authState.user,
    token: authState.token,
    loading: authState.loading,
    error: authState.error,
    login,
    signup,
    socialAuth,
    logout,
    refreshUser,
    clearError,
  };
}; 