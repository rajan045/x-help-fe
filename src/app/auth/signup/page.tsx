'use client';

import { useState } from 'react';
import { TextInput, PasswordInput, Text, Divider, Group, Alert, Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  IconBrandGoogle, 
  IconBrandLinkedin, 
  IconMail,
  IconLock,
  IconUser,
  IconEye,
  IconEyeOff,
  IconAlertCircle,
  IconArrowRight,
  IconCheck
} from '@tabler/icons-react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showEmailForm, setShowEmailForm] = useState(false);
  
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      agreeToTerms: false,
    },
    validate: {
      name: (value) => (value.length < 2 ? 'Name must be at least 2 characters long' : null),
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Please enter a valid email address'),
      password: (value) => {
        if (value.length < 8) return 'Password must be at least 8 characters long';
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
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement signup logic
      console.log(values);
      await new Promise(resolve => setTimeout(resolve, 2000));
    } catch (error) {
      setError('An error occurred during signup. Please try again.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialSignup = async (provider: 'google' | 'linkedin') => {
    setIsLoading(true);
    setError(null);
    try {
      // TODO: Implement social signup
      console.log(`Signing up with ${provider}`);
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      setError(`Failed to sign up with ${provider}. Please try again.`);
      console.error(error);
    } finally {
      setIsLoading(false);
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
    <div className="space-y-8">
      {/* Header Section */}
      <div className="text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="space-y-4"
        >
          <h1 className="font-heading text-4xl sm:text-5xl font-bold bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent leading-tight">
            Join Our Community
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

      {/* Social Signup Section */}
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
              onClick={() => handleSocialSignup('google')}
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
              onClick={() => handleSocialSignup('linkedin')}
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
                    label="Full Name"
                    placeholder="Enter your full name"
                    size="lg"
                    leftSection={<IconUser size={20} className="text-gray-400" />}
                    classNames={{
                      label: 'text-gray-800 mb-2 font-semibold text-sm',
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
                      error: 'text-red-500 text-sm mt-2 font-medium',
                    }}
                    styles={{
                      input: {
                        borderRadius: '12px',
                        fontSize: '16px',
                        fontWeight: 500,
                      }
                    }}
                    {...form.getInputProps('name')}
                  />
                </div>

                <div className="relative">
                  <TextInput
                    required
                    label="Email Address"
                    placeholder="Enter your email"
                    size="lg"
                    leftSection={<IconMail size={20} className="text-gray-400" />}
                    classNames={{
                      label: 'text-gray-800 mb-2 font-semibold text-sm',
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
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
                    placeholder="Create a strong password"
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
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
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
                      input: 'text-gray-900 h-14 pl-12 border-2 border-gray-200 hover:border-green-300 focus:border-green-500 transition-all duration-200 bg-white/80 backdrop-blur-sm',
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
                    {...form.getInputProps('confirmPassword')}
                  />
                  {form.values.confirmPassword && form.values.password === form.values.confirmPassword && (
                    <div className="absolute right-4 top-12 text-green-500">
                      <IconCheck size={18} />
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="agreeToTerms"
                    className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500 focus:ring-2 transition-all mt-0.5"
                    {...form.getInputProps('agreeToTerms', { type: 'checkbox' })}
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 text-sm text-gray-700 font-medium leading-5">
                    I agree to the{' '}
                    <Link href="/terms" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
                      Terms of Service
                    </Link>{' '}
                    and{' '}
                    <Link href="/privacy" className="text-green-600 hover:text-green-700 hover:underline font-semibold">
                      Privacy Policy
                    </Link>
                  </label>
                </div>
                {form.errors.agreeToTerms && (
                  <Text className="text-red-500 text-sm mt-2 font-medium">{form.errors.agreeToTerms}</Text>
                )}
              </div>

              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                transition={{ duration: 0.1 }}
              >
                <Button
                  type="submit"
                  variant="filled"
                  size="lg"
                  loading={isLoading}
                  className="w-full h-14 text-base font-semibold bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-0 shadow-lg hover:shadow-xl transition-all duration-200"
                  style={{ borderRadius: '12px' }}
                >
                  {isLoading ? 'Creating Account...' : 'Create Account'}
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
            Already have an account?
          </Text>
          <Link
            href="/auth/login"
            className="inline-flex items-center gap-2 font-semibold text-green-600 hover:text-green-700 transition-colors text-lg"
          >
            Sign in here
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