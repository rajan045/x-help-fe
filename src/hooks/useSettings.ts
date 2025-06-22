import { useState, useEffect, useCallback } from 'react';
import { settingsService, UserProfile, Settings } from '@/services/settingsService';
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
  refetch: () => Promise<void>;
}

export const useSettings = (): UseSettingsReturn => {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch settings and profile data
  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await settingsService.getSettings();
      setSettings(data.settings);
      setProfile(data.profile);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch settings';
      setError(errorMessage);
      console.error('Error fetching settings:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Update settings
  const updateSettings = useCallback(async (newSettings: Partial<Settings>) => {
    try {
      const updatedSettings = await settingsService.updateSettings(newSettings);
      setSettings(updatedSettings);
      
      notifications.show({
        title: 'Success',
        message: 'Settings updated successfully',
        color: 'green',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update settings';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, []);

  // Update profile
  const updateProfile = useCallback(async (newProfile: Partial<UserProfile>) => {
    try {
      const updatedProfile = await settingsService.updateProfile(newProfile);
      setProfile(updatedProfile);
      
      notifications.show({
        title: 'Success',
        message: 'Profile updated successfully',
        color: 'green',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, []);

  // Change password
  const changePassword = useCallback(async (
    currentPassword: string,
    newPassword: string,
    confirmPassword: string
  ) => {
    try {
      await settingsService.changePassword(currentPassword, newPassword, confirmPassword);
      
      notifications.show({
        title: 'Success',
        message: 'Password changed successfully',
        color: 'green',
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to change password';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, []);

  // Delete account
  const deleteAccount = useCallback(async (password?: string) => {
    try {
      await settingsService.deleteAccount(password);
      
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
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to delete account';
      
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
      
      throw err;
    }
  }, []);

  // Refetch data
  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  // Fetch data on mount
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    settings,
    profile,
    loading,
    error,
    updateSettings,
    updateProfile,
    changePassword,
    deleteAccount,
    refetch,
  };
}; 