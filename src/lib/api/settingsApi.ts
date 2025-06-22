import { baseApi } from './baseApi';
import { 
  Settings, 
  UserProfile, 
  SettingsResponse,
  ChangePasswordRequest 
} from './types';

export const settingsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Get settings and profile
    getSettings: builder.query<SettingsResponse, void>({
      query: () => '/settings',
      transformResponse: (response: any): SettingsResponse => ({
        settings: response.settings || {
          notifications: {
            email: true,
            push: true,
            sms: false,
            marketing: false,
          },
          privacy: {
            profileVisibility: 'public',
            showEmail: false,
            showPhone: false,
          },
          preferences: {
            language: 'en',
            timezone: 'UTC',
            theme: 'light',
          },
        },
        profile: response.profile || {},
      }),
      providesTags: ['Settings', 'Profile'],
    }),

    // Update settings
    updateSettings: builder.mutation<{ settings: Settings }, Partial<Settings>>({
      query: (settings) => ({
        url: '/settings',
        method: 'PUT',
        body: { settings },
      }),
      invalidatesTags: ['Settings'],
    }),

    // Update profile
    updateProfile: builder.mutation<{ profile: UserProfile }, Partial<UserProfile>>({
      query: (profile) => ({
        url: '/profile',
        method: 'PUT',
        body: profile,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Change password
    changePassword: builder.mutation<void, ChangePasswordRequest>({
      query: (passwordData) => ({
        url: '/settings/password',
        method: 'PUT',
        body: passwordData,
      }),
    }),

    // Delete account
    deleteAccount: builder.mutation<void, { password?: string }>({
      query: ({ password }) => ({
        url: '/settings/account',
        method: 'DELETE',
        body: { password },
      }),
      invalidatesTags: ['User', 'Settings', 'Profile'],
    }),

    // Upload avatar (if needed)
    uploadAvatar: builder.mutation<{ avatarUrl: string }, FormData>({
      query: (formData) => ({
        url: '/settings/avatar',
        method: 'POST',
        body: formData,
        formData: true,
      }),
      invalidatesTags: ['User', 'Profile'],
    }),
  }),
});

export const {
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
  useUploadAvatarMutation,
} = settingsApi; 