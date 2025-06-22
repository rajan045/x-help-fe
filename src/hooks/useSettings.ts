import { useCallback } from 'react';
import { 
  useGetSettingsQuery,
  useUpdateSettingsMutation,
  useUpdateProfileMutation,
  useChangePasswordMutation,
  useDeleteAccountMutation,
} from '../lib/api/settingsApi';
import type { UserProfile, Settings } from '../lib/api/types';
import { notifications } from '@mantine/notifications';

interface UseSettingsReturn {
  settings: Settings | null;
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  updateSettings: (newSettings: Partial<Settings>) => Promise<void>;
  updateProfile: (newProfile: Partial<UserProfile>) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string, confirmPassword: string) => Promise<void>;
  deleteAccount: (password?: string) => Promise<void>;
  refetch: () => void;
}

export const useSettings = (): UseSettingsReturn => {
  // RTK Query hooks
  const { 
    data: settingsData, 
    isLoading: settingsLoading, 
    error: settingsError,
    refetch 
  } = useGetSettingsQuery();

  const [updateSettingsMutation, { isLoading: updateSettingsLoading }] = useUpdateSettingsMutation();
  const [updateProfileMutation, { isLoading: updateProfileLoading }] = useUpdateProfileMutation();
  const [changePasswordMutation, { isLoading: changePasswordLoading }] = useChangePasswordMutation();
  const [deleteAccountMutation, { isLoading: deleteAccountLoading }] = useDeleteAccountMutation();

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    try {
      await updateSettingsMutation(newSettings).unwrap();
      
      notifications.show({
        title: 'Success',
        message: 'Settings updated successfully',
        color: 'green',
      });
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to update settings';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, [updateSettingsMutation]);

  // Update profile
  const updateProfile = useCallback(async (newProfile: Partial<UserProfile>) => {
    try {
      await updateProfileMutation(newProfile).unwrap();
      
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to update profile';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, [updateProfileMutation]);

  // Change password
  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await changePasswordMutation({
        currentPassword,
        newPassword,
        confirmPassword,
      }).unwrap();
      
      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to change password';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, [changePasswordMutation]);

  // Delete account
  const deleteAccount = useCallback(async (password?: string) => {
    try {
      await deleteAccountMutation({ password }).unwrap();
      
      // Clear local storage
      localStorage.removeItem('authToken');
      localStorage.removeItem('userData');
      
      // Dispatch auth change event
      window.dispatchEvent(new Event('authChange'));
      
      notifications.show({
        title: 'Account Deleted',
        message: 'Your account has been successfully deleted',
        color: 'green',
      });
    } catch (err: any) {
      const errorMessage = err?.data?.message || err?.message || 'Failed to delete account';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, [deleteAccountMutation]);

  // Calculate loading state
  const loading = settingsLoading || updateSettingsLoading || updateProfileLoading || 
                  changePasswordLoading || deleteAccountLoading;

  // Calculate error state
  const error = settingsError ? 
    (settingsError as any)?.data?.message || (settingsError as any)?.message || 'An error occurred' : 
    null;

  return {
    settings: settingsData?.settings || null,
    profile: settingsData?.profile || null,
    loading,
    error,
    updateSettings,
    updateProfile,
    changePassword,
    deleteAccount,
    refetch,
  };
}; 