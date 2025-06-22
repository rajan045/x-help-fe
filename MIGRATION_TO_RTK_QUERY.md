# Migration to RTK Query

This guide explains how to migrate from the manual fetch-based API calls to RTK Query.

## What Was Changed

### 1. Dependencies Added

- `@reduxjs/toolkit` - Includes RTK Query
- `react-redux` - For React-Redux integration

### 2. New File Structure

```
src/
├── lib/
│   ├── api/
│   │   ├── baseApi.ts       # Base API configuration
│   │   ├── authApi.ts       # Auth endpoints
│   │   ├── settingsApi.ts   # Settings endpoints
│   │   └── types.ts         # Shared types
│   ├── providers/
│   │   └── ReduxProvider.tsx # Redux provider
│   ├── hooks/
│   │   └── redux.ts         # Typed Redux hooks
│   └── store.ts             # Redux store configuration
```

### 3. Provider Setup

The Redux provider has been added to `app/providers.tsx`:

```tsx
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReduxProvider>
      <MantineProvider theme={theme}>{children}</MantineProvider>
    </ReduxProvider>
  );
}
```

## Migration Examples

### Before (Manual Fetch)

```tsx
// Old way in services/authService.ts
export const authService = {
  async login(credentials: LoginCredentials) {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    setStoredAuth(data.user, data.token);
    return data;
  },
};

// Usage in component
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);

const handleLogin = async () => {
  setLoading(true);
  try {
    await authService.login({ email, password });
  } catch (err) {
    setError(err.message);
  } finally {
    setLoading(false);
  }
};
```

### After (RTK Query)

```tsx
// New way in lib/api/authApi.ts
export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<AuthResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      async onQueryStarted(arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          setStoredAuth(data.user, data.token);
        } catch (error) {
          console.error("Login failed:", error);
        }
      },
      invalidatesTags: ["User"],
    }),
  }),
});

// Usage in component
const [login, { isLoading, error }] = useLoginMutation();

const handleLogin = async () => {
  try {
    await login({ email, password }).unwrap();
  } catch (err) {
    // Error is automatically handled by RTK Query
  }
};
```

## Key Benefits

### 1. Automatic Caching

RTK Query automatically caches responses and serves them from cache when appropriate.

### 2. Background Refetching

Data is automatically refetched on:

- Window focus
- Network reconnection
- Component remount (if stale)

### 3. Loading & Error States

No need to manually manage loading and error states:

```tsx
const { data, isLoading, error } = useGetCurrentUserQuery();
```

### 4. Optimistic Updates

RTK Query supports optimistic updates and automatic rollback on failure.

### 5. Request Deduplication

Multiple components requesting the same data will only trigger one network request.

### 6. Cache Invalidation

Automatic cache invalidation with tags:

```tsx
// After login, invalidate User cache
invalidatesTags: ["User"];
```

## Available Hooks

### Auth API

- `useLoginMutation()`
- `useSignupMutation()`
- `useLogoutMutation()`
- `useGetCurrentUserQuery()`
- `useVerifyTokenQuery()`
- `useInitiateGoogleLoginMutation()`
- `useHandleOAuthCallbackMutation()`

### Settings API

- `useGetSettingsQuery()`
- `useUpdateSettingsMutation()`
- `useUpdateProfileMutation()`
- `useChangePasswordMutation()`
- `useDeleteAccountMutation()`
- `useUploadAvatarMutation()`

## Updated Hooks

### useAuth Hook

The `useAuth` hook has been updated to use RTK Query internally while maintaining the same interface:

```tsx
const { isLoggedIn, user, loading, login, logout } = useAuth();
```

### useSettings Hook

The `useSettings` hook now uses RTK Query for all settings operations:

```tsx
const { settings, profile, loading, updateSettings } = useSettings();
```

## Error Handling

RTK Query provides detailed error information:

```tsx
const [updateUser, { error }] = useUpdateUserMutation();

// Error can be either FetchBaseQueryError or SerializedError
if (error) {
  if ("status" in error) {
    // FetchBaseQueryError
    const errMsg = "error" in error ? error.error : JSON.stringify(error.data);
  } else {
    // SerializedError
    const errMsg = error.message;
  }
}
```

## Cache Management

### Manual Cache Updates

```tsx
// Refetch data
const { refetch } = useGetSettingsQuery();
refetch();

// Skip query conditionally
const { data } = useGetCurrentUserQuery(undefined, {
  skip: !isAuthenticated,
});
```

### Cache Tags

RTK Query uses tags for cache invalidation:

- `User` - User-related data
- `Settings` - User settings
- `Profile` - User profile data

## Migration Checklist

- [x] Install RTK Query dependencies
- [x] Create base API configuration
- [x] Set up Redux store and providers
- [x] Create auth API slice
- [x] Create settings API slice
- [x] Update useAuth hook
- [x] Update useSettings hook
- [x] Create usage examples
- [x] Update all components to use new hooks
- [x] Remove old service files

## Next Steps

1. Update your components to use RTK Query hooks
2. Remove manual loading/error state management
3. Take advantage of automatic caching and background refetching
4. Consider removing the old service files once migration is complete

For examples of how to use RTK Query in components, see `src/examples/RTKQueryUsage.tsx`.
