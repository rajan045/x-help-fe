const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001';

// Types
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'mentor' | 'seeker' | 'both';
  authProvider?: 'local' | 'google';
}

interface AuthState {
  isLoggedIn: boolean;
  user: User | null;
  token: string | null;
}

interface LoginCredentials {
  email: string;
  password: string;
}

interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'mentor' | 'seeker' | 'both';
}

// Helper functions
const getStoredAuth = (): AuthState => {
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

const setStoredAuth = (user: User, token: string) => {
  if (typeof window === 'undefined') return;

  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
  
  // Dispatch auth change event
  window.dispatchEvent(new Event('authChange'));
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;

  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  
  // Dispatch auth change event
  window.dispatchEvent(new Event('authChange'));
};

// API functions
export const authService = {
  // Get current auth state
  getAuthState(): AuthState {
    return getStoredAuth();
  },

  // Login with email and password
  async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Login failed');
      }

      const data = await response.json();
      
      // Store auth data
      setStoredAuth(data.user, data.token);
      
      return { user: data.user, token: data.token };
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  },

  // Signup with email and password
  async signup(credentials: SignupCredentials): Promise<{ user: User; token: string }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Signup failed');
      }

      const data = await response.json();
      
      // Store auth data
      setStoredAuth(data.user, data.token);
      
      return { user: data.user, token: data.token };
    } catch (error) {
      console.error('Signup error:', error);
      throw error;
    }
  },

  // Logout
  async logout(): Promise<void> {
    try {
      const { token } = getStoredAuth();
      
      if (token) {
        await fetch(`${API_BASE_URL}/api/auth/logout`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Always clear local storage
      clearStoredAuth();
    }
  },

  // Get current user profile
  async getCurrentUser(): Promise<User | null> {
    try {
      const { token } = getStoredAuth();
      
      if (!token) return null;

      const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          // Token is invalid, clear auth
          clearStoredAuth();
          return null;
        }
        throw new Error('Failed to fetch user profile');
      }

      const data = await response.json();
      
      // Update stored user data
      const currentAuth = getStoredAuth();
      if (currentAuth.token) {
        setStoredAuth(data.user, currentAuth.token);
      }
      
      return data.user;
    } catch (error) {
      console.error('Error fetching current user:', error);
      return null;
    }
  },

  // Verify token validity
  async verifyToken(): Promise<boolean> {
    try {
      const user = await this.getCurrentUser();
      return user !== null;
    } catch (error) {
      console.error('Token verification failed:', error);
      return false;
    }
  },

  // Google OAuth login
  initiateGoogleLogin(): void {
    window.location.href = `${API_BASE_URL}/api/auth/google`;
  },

  // Handle OAuth callback
  async handleOAuthCallback(token: string, userData: string): Promise<{ user: User; token: string }> {
    try {
      const user = JSON.parse(decodeURIComponent(userData));
      
      // Store auth data
      setStoredAuth(user, token);
      
      return { user, token };
    } catch (error) {
      console.error('OAuth callback error:', error);
      throw new Error('Failed to process OAuth callback');
    }
  },
};

export type { User, AuthState, LoginCredentials, SignupCredentials }; 