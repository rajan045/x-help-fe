'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { 
  Group, 
  Button, 
  Avatar, 
  Menu, 
  Text, 
  Badge,
  ActionIcon,
  Container,
  Burger,
  Drawer,
  Stack,
  Divider,
  Paper
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { 
  IconBell, 
  IconSettings, 
  IconLogout, 
  IconUser, 
  IconDashboard,
  IconMessageCircle,
  IconCalendarEvent,
  IconSearch
} from '@tabler/icons-react';

// Get authentication status from localStorage
const getAuthStatus = () => {
  if (typeof window === 'undefined') return { isLoggedIn: false, user: null };
  
  const token = localStorage.getItem('auth_token');
  const userData = localStorage.getItem('user_data');
  
  if (!token || !userData) {
    return { isLoggedIn: false, user: null };
  }
  
  try {
    const user = JSON.parse(userData);
    return {
      isLoggedIn: true,
      user: {
        name: user.name || 'User',
        email: user.email || '',
        avatar: user.avatar || '/images/user.jpg',
        role: user.role || 'user',
        id: user.id
      }
    };
  } catch {
    return { isLoggedIn: false, user: null };
  }
};

interface HeaderProps {
  variant?: 'default' | 'transparent';
}

export default function Header({ variant = 'default' }: HeaderProps) {
  const router = useRouter();
  const [opened, { toggle, close }] = useDisclosure(false);
  const [authState, setAuthState] = useState<{ isLoggedIn: boolean; user: any }>({ isLoggedIn: false, user: null });

  useEffect(() => {
    // Check auth status on component mount and when localStorage changes
    const checkAuth = () => {
      setAuthState(getAuthStatus());
    };

    checkAuth();

    // Listen for storage changes (when user logs in/out in another tab)
    window.addEventListener('storage', checkAuth);
    
    // Custom event for same-tab auth changes
    window.addEventListener('authChange', checkAuth);

    return () => {
      window.removeEventListener('storage', checkAuth);
      window.removeEventListener('authChange', checkAuth);
    };
  }, []);

  const handleLogout = () => {
    // Clear auth data
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    
    // Update auth state
    setAuthState({ isLoggedIn: false, user: null });
    
    // Trigger custom event for other components
    window.dispatchEvent(new Event('authChange'));
    
    // Redirect to login
    router.push('/auth/login');
  };

  const LoggedInHeader = () => (
    <>
      {/* Desktop Navigation */}
      <Group gap="md" visibleFrom="md">
        <Link href="/browse" style={{ textDecoration: 'none' }}>
          <Button variant="subtle" leftSection={<IconSearch size={16} />}>
            Browse Mentors
          </Button>
        </Link>
        
        <Link href="/chat" style={{ textDecoration: 'none' }}>
          <Button variant="subtle" leftSection={<IconMessageCircle size={16} />}>
            Messages
          </Button>
        </Link>
        
        <Link href="/sessions" style={{ textDecoration: 'none' }}>
          <Button variant="subtle" leftSection={<IconCalendarEvent size={16} />}>
            Sessions
          </Button>
        </Link>
        
        {authState.user?.role === 'mentor' && (
          <Link href="/dashboard/mentor" style={{ textDecoration: 'none' }}>
            <Button variant="subtle" leftSection={<IconDashboard size={16} />}>
              Dashboard
            </Button>
          </Link>
        )}
      </Group>

      {/* User Actions */}
      <Group gap="sm">
        {/* Notifications */}
        <ActionIcon variant="light" size="lg" pos="relative">
          <IconBell size={18} />
          {/* You can add notification count from user data if available */}
          <Badge
            size="xs"
            variant="filled"
            color="red"
            pos="absolute"
            top={-2}
            right={-2}
            style={{ minWidth: 16, height: 16, padding: 0 }}
          >
            3
          </Badge>
        </ActionIcon>

        {/* User Menu */}
        <Menu shadow="md" width={200}>
          <Menu.Target>
            <Group gap="sm" style={{ cursor: 'pointer' }}>
              <Avatar src={authState.user?.avatar} size={32} radius="xl" />
              <Text size="sm" fw={500} visibleFrom="sm">
                {authState.user?.name}
              </Text>
            </Group>
          </Menu.Target>
          
          <Menu.Dropdown>
            <Menu.Label>Account</Menu.Label>
            <Menu.Item 
              leftSection={<IconUser size={14} />}
              onClick={() => router.push(`/profile/${authState.user?.id || 'me'}`)}
            >
              View Profile
            </Menu.Item>
            <Menu.Item 
              leftSection={<IconSettings size={14} />}
              onClick={() => router.push('/settings')}
            >
              Settings
            </Menu.Item>
            
            {authState.user?.role === 'mentor' && (
              <>
                <Menu.Divider />
                <Menu.Label>Mentor</Menu.Label>
                <Menu.Item 
                  leftSection={<IconDashboard size={14} />}
                  onClick={() => router.push('/dashboard/mentor')}
                >
                  Mentor Dashboard
                </Menu.Item>
              </>
            )}
            
            <Menu.Divider />
            <Menu.Item 
              leftSection={<IconLogout size={14} />}
              color="red"
              onClick={handleLogout}
            >
              Logout
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>

        {/* Mobile Menu Burger */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
    </>
  );

  const LoggedOutHeader = () => (
    <>
      {/* Desktop Navigation */}
      <Group gap="md" visibleFrom="md">
        <Link href="/browse" style={{ textDecoration: 'none' }}>
          <Button variant="subtle">
            Browse Mentors
          </Button>
        </Link>
        
        <Button variant="subtle">
          How it Works
        </Button>
        
        <Button variant="subtle">
          Become a Mentor
        </Button>
      </Group>

      {/* Auth Actions */}
      <Group gap="sm">
        <Link href="/auth/login" style={{ textDecoration: 'none' }}>
          <Button variant="subtle">
            Login
          </Button>
        </Link>
        
        <Link href="/auth/signup" style={{ textDecoration: 'none' }}>
          <Button>
            Sign Up
          </Button>
        </Link>

        {/* Mobile Menu Burger */}
        <Burger opened={opened} onClick={toggle} hiddenFrom="md" size="sm" />
      </Group>
    </>
  );

  return (
    <>
      <Paper 
        h={70} 
        style={{ 
          backgroundColor: variant === 'transparent' ? 'transparent' : 'white',
          borderBottom: variant === 'transparent' ? 'none' : '1px solid #e9ecef',
          position: 'sticky',
          top: 0,
          zIndex: 100
        }}
        shadow={variant === 'transparent' ? 'none' : 'sm'}
      >
        <Container size="xl" h="100%">
          <Group justify="space-between" h="100%">
            {/* Logo */}
            <Link href="/" style={{ textDecoration: 'none' }}>
              <Group gap="sm">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                  <Text c="white" fw={700} size="sm">X</Text>
                </div>
                <Text fw={700} size="xl" c="dark">
                  X-Help
                </Text>
              </Group>
            </Link>

            {/* Navigation based on auth status */}
            {authState.isLoggedIn ? <LoggedInHeader /> : <LoggedOutHeader />}
          </Group>
        </Container>
      </Paper>

      {/* Mobile Drawer */}
      <Drawer
        opened={opened}
        onClose={close}
        title={
          <Group gap="sm">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
              <Text c="white" fw={700} size="sm">X</Text>
            </div>
            <Text fw={700} size="lg">X-Help</Text>
          </Group>
        }
        padding="md"
        size="sm"
      >
        <Stack gap="md">
          {authState.isLoggedIn ? (
            <>
              {/* User Info */}
              <Group gap="md" p="md" style={{ backgroundColor: '#f8f9fa', borderRadius: 8 }}>
                <Avatar src={authState.user?.avatar} size={40} radius="xl" />
                <div>
                  <Text fw={500}>{authState.user?.name}</Text>
                  <Text size="sm" c="dimmed" tt="capitalize">{authState.user?.role}</Text>
                </div>
              </Group>

              <Divider />

              {/* Navigation Links */}
              <Button 
                variant="subtle" 
                leftSection={<IconSearch size={16} />}
                justify="flex-start"
                onClick={() => { router.push('/browse'); close(); }}
              >
                Browse Mentors
              </Button>
              
              <Button 
                variant="subtle" 
                leftSection={<IconMessageCircle size={16} />}
                justify="flex-start"
                onClick={() => { router.push('/chat'); close(); }}
              >
                Messages
              </Button>
              
              <Button 
                variant="subtle" 
                leftSection={<IconCalendarEvent size={16} />}
                justify="flex-start"
                onClick={() => { router.push('/sessions'); close(); }}
              >
                Sessions
              </Button>
              
              {authState.user?.role === 'mentor' && (
                <Button 
                  variant="subtle" 
                  leftSection={<IconDashboard size={16} />}
                  justify="flex-start"
                  onClick={() => { router.push('/dashboard/mentor'); close(); }}
                >
                  Dashboard
                </Button>
              )}

              <Divider />

              <Button 
                variant="subtle" 
                leftSection={<IconUser size={16} />}
                justify="flex-start"
                onClick={() => { router.push(`/profile/${authState.user?.id || 'me'}`); close(); }}
              >
                Profile
              </Button>
              
              <Button 
                variant="subtle" 
                leftSection={<IconSettings size={16} />}
                justify="flex-start"
                onClick={() => { router.push('/settings'); close(); }}
              >
                Settings
              </Button>
              
              <Button 
                variant="subtle" 
                leftSection={<IconLogout size={16} />}
                justify="flex-start"
                color="red"
                onClick={() => { handleLogout(); close(); }}
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Button 
                variant="subtle" 
                justify="flex-start"
                onClick={() => { router.push('/browse'); close(); }}
              >
                Browse Mentors
              </Button>
              
              <Button 
                variant="subtle" 
                justify="flex-start"
              >
                How it Works
              </Button>
              
              <Button 
                variant="subtle" 
                justify="flex-start"
              >
                Become a Mentor
              </Button>

              <Divider />

              <Button 
                variant="outline"
                onClick={() => { router.push('/auth/login'); close(); }}
              >
                Login
              </Button>
              
              <Button 
                onClick={() => { router.push('/auth/signup'); close(); }}
              >
                Sign Up
              </Button>
            </>
          )}
        </Stack>
      </Drawer>
    </>
  );
} 