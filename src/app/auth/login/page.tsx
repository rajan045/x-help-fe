'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Text, Divider, Group, Alert, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { 
  IconMail, 
  IconLock, 
  IconBrandGoogle, 
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconArrowRight,
  IconShield
} from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { type LoginFormData } from '@/validators/auth';
import { useAuth } from '@/hooks/useAuth';
import { SOCIAL_PROVIDERS } from '@/constants/auth';

export default function LoginPage() {
  const { login, socialAuth, isLoading, error } = useAuth();
  const [rememberMe, setRememberMe] = useState(false);
  
  const form = useForm<LoginFormData>({
    validate: {
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
        return null;
      },
      password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters';
        return null;
      },
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    const result = await login(values);
    if (result.error) {
      form.setErrors({ email: result.error.message });
    }
  };

  const handleSocialLogin = async () => {
    await socialAuth(SOCIAL_PROVIDERS.GOOGLE);
  };

  return (
    <div className="space-y-6 w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-4">
          <IconShield size={32} className="text-white" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Welcome Back
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
          Sign in to continue your career journey and connect with amazing mentors
        </p>
      </motion.div>

      {/* Error Alert */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <Alert
              icon={<IconAlertCircle size={18} />}
              color="red"
              variant="light"
              className="border border-red-200 bg-red-50 rounded-xl"
            >
              <Text className="text-red-700 font-medium text-sm">{error}</Text>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Login Form */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-6"
      >
        <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-5">
          <div className="space-y-4">
            <div>
              <TextInput
                required
                label="Email Address"
                placeholder="Enter your email"
                size="md"
                leftSection={<IconMail size={18} className="text-gray-400" />}
                classNames={{
                  label: 'text-gray-800 mb-1.5 font-medium text-sm',
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 rounded-xl',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={isLoading}
                {...form.getInputProps('email')}
              />
            </div>

            <div>
              <PasswordInput
                required
                label="Password" 
                placeholder="Enter your password"
                size="md"
                leftSection={<IconLock size={18} className="text-gray-400" />}
                visibilityToggleIcon={({ reveal }) =>
                  reveal ? (
                    <IconEyeOff size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  ) : (
                    <IconEye size={18} className="text-gray-400 hover:text-gray-600 transition-colors" />
                  )
                }
                classNames={{
                  label: 'text-gray-800 mb-1.5 font-medium text-sm',
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 rounded-xl',
                  innerInput: 'h-12',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={isLoading}
                {...form.getInputProps('password')}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <Checkbox
              checked={rememberMe}
              onChange={(event) => setRememberMe(event.currentTarget.checked)}
              label="Remember me"
              size="sm"
              classNames={{
                label: 'text-sm text-gray-700 font-medium cursor-pointer',
              }}
              disabled={isLoading}
            />
            <Link
              href="/auth/forgot-password"
              className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline transition-colors"
            >
              Forgot password?
            </Link>
          </div>

          <motion.div
            whileHover={{ scale: isLoading ? 1 : 1.01 }}
            whileTap={{ scale: isLoading ? 1 : 0.99 }}
             className="flex justify-center pt-2"
          >
            <Button
              type="submit"
              size="md"
              loading={isLoading}
              className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={isLoading}
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </Button>
          </motion.div>
        </form>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.2 }}
      >
        <Divider 
          label={
            <span className="text-gray-500 text-sm font-medium px-3 py-1">
              Or continue with
            </span>
          }
          labelPosition="center"
        />
      </motion.div>

      {/* Social Login Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center"
      >
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}  className="flex justify-center">
          <Button
            variant="outline"
            onClick={handleSocialLogin}
            loading={isLoading}
            className="px-8 h-12 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-medium text-gray-700 rounded-xl"
            leftSection={<IconBrandGoogle size={20} className="text-red-500" />}
            disabled={isLoading}
          >
            Continue with Google
          </Button>
        </motion.div>
      </motion.div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="text-center pt-4"
      >
        <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
          <Text className="text-gray-600 text-sm mb-3">
            New to our community?
          </Text>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors"
          >
            Create your free account
            <IconArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 