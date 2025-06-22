export const AUTH_ROUTES = {
  LOGIN: '/auth/login',
  SIGNUP: '/auth/signup',
  DASHBOARD: '/dashboard',
  PROFILE: '/profile',
} as const;

export const SOCIAL_PROVIDERS = {
  GOOGLE: 'google',
} as const;

export const AUTH_ERROR_MESSAGES = {
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_IN_USE: 'Email is already in use',
  WEAK_PASSWORD: 'Password is too weak',
  NETWORK_ERROR: 'Network error. Please try again',
  UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 6,
  REQUIRE_UPPERCASE: true,
  REQUIRE_LOWERCASE: true,
  REQUIRE_NUMBER: true,
  REQUIRE_SPECIAL: false,
} as const; 