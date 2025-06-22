import { baseApi } from './baseApi';
import { 
  User, 
  LoginCredentials, 
  SignupCredentials, 
  AuthResponse 
} from './types';

// Helper functions for localStorage operations
const setStoredAuth = (user: User, token: string) => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('authToken', token);
  localStorage.setItem('userData', JSON.stringify(user));
  window.dispatchEvent(new Event('authChange'));
};

const clearStoredAuth = () => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('authToken');
  localStorage.removeItem('userData');
  window.dispatchEvent(new Event('authChange'));
};

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Login
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setStoredAuth(data.user, data.token);
        } catch (error) {
          console.error('Login failed:', error);
        }
      },
      invalidatesTags: ['User'],
    }),

    // Signup
    signup: builder.mutation<AuthResponse, SignupCredentials>({
      query: (credentials) => ({
        url: '/auth/signup',
        method: 'POST',
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setStoredAuth(data.user, data.token);
        } catch (error) {
          console.error('Signup failed:', error);
        }
      },
      invalidatesTags: ['User'],
    }),

    // Logout
    logout: builder.mutation<void, void>({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
        } catch (error) {
          console.error('Logout error:', error);
        } finally {
          clearStoredAuth();
        }
      },
      invalidatesTags: ['User'],
    }),

    // Get current user
    getCurrentUser: builder.query<{ user: User }, void>({
      query: () => '/auth/me',
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          // Update stored user data
          const token = localStorage.getItem('authToken');
          if (token) {
            setStoredAuth(data.user, token);
          }
        } catch (error) {
          console.error('Error fetching current user:', error);
          clearStoredAuth();
        }
      },
      providesTags: ['User'],
    }),

    // Verify token
    verifyToken: builder.query<{ valid: boolean }, void>({
      query: () => '/auth/verify',
      providesTags: ['User'],
    }),

    // Google OAuth
    initiateGoogleLogin: builder.mutation<{ redirectUrl: string }, void>({
      query: () => ({
        url: '/auth/google',
        method: 'GET',
      }),
    }),

    // Handle OAuth callback
    handleOAuthCallback: builder.mutation<AuthResponse, { token: string; userData: string }>({
      query: ({ token, userData }) => ({
        url: '/auth/oauth/callback',
        method: 'POST',
        body: { token, userData },
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setStoredAuth(data.user, data.token);
        } catch (error) {
          console.error('OAuth callback failed:', error);
        }
      },
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation,
  useSignupMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
  useVerifyTokenQuery,
  useInitiateGoogleLoginMutation,
  useHandleOAuthCallbackMutation,
} = authApi; 