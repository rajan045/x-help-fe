// User types
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'mentor' | 'seeker' | 'both';
  authProvider?: 'local' | 'google';
}

// Auth types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupCredentials {
  name: string;
  email: string;
  password: string;
  role: 'mentor' | 'seeker' | 'both';
}

export interface AuthResponse {
  user: User;
  token: string;
}

// Settings types
export interface UserProfile {
  bio?: string;
  phone?: string;
  location?: string;
  website?: string;
  linkedin?: string;
  github?: string;
  twitter?: string;
  education?: string;
  experience?: string;
  skills?: string[];
  interests?: string[];
}

export interface Settings {
  notifications: {
    email: boolean;
    push: boolean;
    sms: boolean;
    marketing: boolean;
  };
  privacy: {
    profileVisibility: 'public' | 'private' | 'friends';
    showEmail: boolean;
    showPhone: boolean;
  };
  preferences: {
    language: string;
    timezone: string;
    theme: 'light' | 'dark' | 'auto';
  };
}

export interface SettingsResponse {
  settings: Settings;
  profile: UserProfile;
}

export interface ChangePasswordRequest {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
} 