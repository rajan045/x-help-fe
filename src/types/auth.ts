export type User = {
  id: string;
  name: string;
  email: string;
  image?: string;
  role: 'user' | 'mentor' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};

export type AuthFormData = {
  email: string;
  password: string;
  name?: string;
  confirmPassword?: string;
};

export type SocialProvider = 'google';

export type AuthError = {
  code: string;
  message: string;
};

export type AuthResponse = {
  user: User | null;
  error: AuthError | null;
}; 