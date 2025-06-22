'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Text, Divider, Group, Alert, Button, Checkbox } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { 
  IconBrandGoogle, 
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconArrowRight,
  IconCheck,
  IconUserPlus
} from '@tabler/icons-react';

export default function SignupPage() {
  const { signup, socialAuth, loading, error, clearError } = useAuth();
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    validate: {
      name: (value) => {
        if (!value) return 'Name is required';
        if (value.length < 2) return 'Name must be at least 2 characters long';
        return null;
      },
      email: (value) => {
        if (!value) return 'Email is required';
        if (!/^\S+@\S+\.\S+$/.test(value)) return 'Please enter a valid email address';
        return null;
      },
      password: (value) => {
        if (!value) return 'Password is required';
        if (value.length < 6) return 'Password must be at least 6 characters long';
        if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) 
          return 'Password must contain uppercase, lowercase, and number';
        return null;
      },
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords do not match' : null,
      agreeToTerms: (value) => (!value ? 'You must agree to the terms and conditions' : null),
    },
  });

  const handleSubmit = async (values: typeof form.values) => {
    if (error) clearError();
    
    try {
      await signup({
        name: values.name,
        email: values.email,
        password: values.password,
        confirmPassword: values.confirmPassword,
        role: 'seeker', // Default role
      });
    } catch (error) {
      console.error('Signup error:', error);
      // Error is handled by the useAuth hook
    }
  };

  const handleSocialSignup = async () => {
    if (error) clearError();
    
    try {
      await socialAuth('google');
    } catch (error) {
      console.error('Social signup error:', error);
      // Error is handled by the useAuth hook
    }
  };

  const getPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^a-zA-Z\d]/.test(password)) strength++;
    return strength;
  };

  const passwordStrength = getPasswordStrength(form.values.password);

  return (
    <div className="space-y-6 w-full">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="text-center space-y-4"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl mb-4">
          <IconUserPlus size={32} className="text-white" />
        </div>
        
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
          Join Our Community
        </h1>
        
        <p className="text-gray-600 text-lg leading-relaxed max-w-sm mx-auto">
          Start your career journey and connect with amazing mentors and professionals
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

      {/* Main Signup Form */}
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
                label="Full Name"
                placeholder="Enter your full name"
                size="md"
                leftSection={<IconUser size={18} className="text-gray-400" />}
                classNames={{
                  label: 'text-gray-800 mb-1.5 font-medium text-sm',
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 rounded-xl',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={loading}
                {...form.getInputProps('name')}
              />
            </div>

            <div>
              <TextInput
                required
                label="Email Address"
                placeholder="Enter your email"
                size="md"
                leftSection={<IconMail size={18} className="text-gray-400" />}
                classNames={{
                  label: 'text-gray-800 mb-1.5 font-medium text-sm',
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 rounded-xl',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={loading}
                {...form.getInputProps('email')}
              />
            </div>

            <div>
              <PasswordInput
                required
                label="Password"
                placeholder="Create a strong password"
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
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 rounded-xl',
                  innerInput: 'h-12',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={loading}
                {...form.getInputProps('password')}
              />
              {form.values.password && (
                <div className="mt-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Text size="xs" className="text-gray-600 font-medium">Password strength:</Text>
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((level) => (
                        <div
                          key={level}
                          className={`h-1.5 w-6 rounded-full transition-colors ${
                            level <= passwordStrength
                              ? passwordStrength < 3
                                ? 'bg-red-400'
                                : passwordStrength < 4
                                ? 'bg-yellow-400'
                                : 'bg-green-500'
                              : 'bg-gray-200'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <Text size="xs" className="text-gray-500">
                    Use 8+ characters with uppercase, lowercase, and numbers
                  </Text>
                </div>
              )}
            </div>

            <div className="relative">
              <PasswordInput
                required
                label="Confirm Password"
                placeholder="Confirm your password"
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
                  input: 'h-12 pl-10 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 rounded-xl',
                  innerInput: 'h-12',
                  error: 'text-red-500 text-xs mt-1 font-medium',
                }}
                disabled={loading}
                {...form.getInputProps('confirmPassword')}
              />
              {form.values.confirmPassword && form.values.password === form.values.confirmPassword && (
                <div className="absolute right-4 top-12 text-green-500">
                  <IconCheck size={18} />
                </div>
              )}
            </div>
          </div>

          <div className="pt-1">
            <Checkbox
              checked={form.values.agreeToTerms}
              onChange={(event) => form.setFieldValue('agreeToTerms', event.currentTarget.checked)}
              label={
                <span className="text-sm text-gray-700 font-medium">
                  I agree to the{' '}
                  <Link href="/terms" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
                    Privacy Policy
                  </Link>
                </span>
              }
              size="sm"
              classNames={{
                label: 'cursor-pointer',
                error: 'text-red-500 text-xs mt-1 font-medium',
              }}
              disabled={loading}
              error={form.errors.agreeToTerms}
            />
          </div>

          <motion.div
            whileHover={{ scale: loading ? 1 : 1.01 }}
            whileTap={{ scale: loading ? 1 : 0.99 }}
            className="flex justify-center pt-2"
          >
            <Button
              type="submit"
              size="md"
              loading={loading}
              className="w-full h-12 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
              disabled={loading}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
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

      {/* Social Signup Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex justify-center"
      >
        <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
          <Button
            variant="outline"
            onClick={handleSocialSignup}
            loading={loading}
            className="px-8 h-12 border-2 border-gray-200 hover:border-red-300 hover:bg-red-50 transition-all duration-200 font-medium text-gray-700 rounded-xl"
            leftSection={<IconBrandGoogle size={20} className="text-red-500" />}
            disabled={loading}
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
            Already have an account?
          </Text>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700 transition-colors"
          >
            Sign in here
            <IconArrowRight size={16} />
          </Link>
        </div>
      </motion.div>
    </div>
  );
} 