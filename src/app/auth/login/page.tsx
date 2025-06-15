'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Text, Divider, Group, Alert } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  IconMail, 
  IconLock, 
  IconBrandGoogle, 
  IconBrandLinkedin, 
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconArrowRight
} from '@tabler/icons-react';
import { Button } from '@mantine/core';
import { type LoginFormData } from '@/validators/auth';
import { useAuth } from '@/hooks/useAuth';
import { SOCIAL_PROVIDERS } from '@/constants/auth';

export default function LoginPage() {
  const { login, socialAuth, isLoading, error } = useAuth();
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const form = useForm<LoginFormData>({
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Please enter a valid email address'),
      password: (value) => (value.length < 6 ? 'Password must be at least 6 characters' : null),
    },
  });

  const handleSubmit = async (values: LoginFormData) => {
    const result = await login(values);
    if (result.error) {
      form.setErrors({ email: result.error.message });
    }
  };

  const handleSocialLogin = async (provider: 'google' | 'linkedin') => {
    await socialAuth(provider);
  };

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent leading-tight">
            Welcome Back
          </h1>
          
          {/* Main CTA */}
          <div className="relative">
            <Text className="text-xl sm:text-2xl font-semibold text-gray-800 mb-2">
              Get or Give Career Advice Today
            </Text>
            <Text className="text-gray-600 text-base sm:text-lg">
              Connect with professionals and mentors in your field
            </Text>
          </div>
        </motion.div>
      </div>

      {/* Social Login Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="space-y-4"
      >
        <Group grow className="flex flex-col gap-4">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin(SOCIAL_PROVIDERS.GOOGLE)}
              loading={isLoading}
              className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold text-gray-700"
              leftSection={<IconBrandGoogle size={24} className="text-red-500" />}
              style={{ borderRadius: '12px' }}
            >
              Continue with Google
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => handleSocialLogin(SOCIAL_PROVIDERS.LINKEDIN)}
              loading={isLoading}
              className="w-full h-14 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 hover:shadow-md transition-all duration-200 font-semibold text-gray-700"
              leftSection={<IconBrandLinkedin size={24} className="text-blue-600" />}
              style={{ borderRadius: '12px' }}
            >
              Continue with LinkedIn
            </Button>
          </motion.div>
        </Group>
      </motion.div>

      {/* Divider */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.4 }}
      >
        <Divider 
          label={
            <button
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="text-gray-500 text-sm font-semibold hover:text-gray-700 transition-colors cursor-pointer flex items-center gap-2"
            >
              Or continue with email
              <motion.div
                animate={{ rotate: showEmailForm ? 90 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <IconArrowRight size={16} />
              </motion.div>
            </button>
          }
          labelPosition="center"
          classNames={{
            root: 'relative',
          }}
        />
      </motion.div>

      {/* Email Form Section */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: showEmailForm ? 1 : 0, 
          height: showEmailForm ? 'auto' : 0 
        }}
        transition={{ duration: 0.3 }}
        style={{ overflow: 'hidden' }}
      >
        {showEmailForm && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <form onSubmit={form.onSubmit(handleSubmit)} className="space-y-6">
              <div className="space-y-5">
                <div className="relative">
                  <TextInput
                    required
                    label="Email Address"
                    placeholder="Enter your email"
                    size="lg"
                    leftSection={<IconMail size={20} className="text-gray-400" />}
                    classNames={{
                      label: 'text-gray-800 mb-2 font-semibold text-sm',
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
                      error: 'text-red-500 text-sm mt-2 font-medium',
                    }}
                    styles={{
                      input: {
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 500,
                      }
                    }}
                    {...form.getInputProps('email')}
                  />
                </div>

                <div className="relative">
                  <PasswordInput
                    required
                    label="Password"
                    placeholder="Enter your password"
                    size="lg"
                    leftSection={<IconLock size={20} className="text-gray-400" />}
                    visibilityToggleIcon={({ reveal }) =>
                      reveal ? (
                        <IconEyeOff size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
                      ) : (
                        <IconEye size={20} className="text-gray-400 hover:text-gray-600 transition-colors" />
                      )
                    }
                    classNames={{
                      label: 'text-gray-800 mb-2 font-semibold text-sm',
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-blue-300 focus:border-blue-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
                      innerInput: 'h-14 text-base font-medium',
                      error: 'text-red-500 text-sm mt-2 font-medium',
                    }}
                    styles={{
                      input: {
                        borderRadius: '12px',
                      },
                      innerInput: {
                        fontSize: '16px',
                      }
                    }}
                    {...form.getInputProps('password')}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 focus:ring-2 transition-all"
                  />
                  <label htmlFor="remember" className="ml-3 text-sm text-gray-700 font-medium">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  loading={isLoading}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ borderRadius: '12px' }}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </motion.div>
            </form>
          </motion.div>
        )}
      </motion.div>

      {/* Footer Section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="text-center pt-6"
      >
        <div className="p-6 bg-white/40 backdrop-blur-sm rounded-2xl border border-white/20">
          <Text className="text-gray-700 text-base font-medium mb-3">
            New to our community?
          </Text>
          <Link
            href="/auth/signup"
            className="inline-flex items-center gap-2 font-semibold text-blue-600 hover:text-blue-700 transition-colors text-lg"
          >
            Create your free account
            <IconArrowRight size={18} />
          </Link>
        </div>
      </motion.div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Alert
            icon={<IconAlertCircle size={18} />}
            color="red"
            variant="light"
            className="border border-red-200 bg-red-50/80 backdrop-blur-sm"
            styles={{
              root: {
                borderRadius: '12px',
              }
            }}
          >
            <Text className="text-red-700 font-medium">{error}</Text>
          </Alert>
        </motion.div>
      )}
    </div>
  );
} 