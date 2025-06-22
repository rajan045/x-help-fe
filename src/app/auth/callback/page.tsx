'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader } from '@mantine/core';
import { motion } from 'framer-motion';
import { IconShield } from '@tabler/icons-react';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Processing authentication...');

  useEffect(() => {
    const token = searchParams.get('token');
    const user = searchParams.get('user');
    const error = searchParams.get('error');

    if (error) {
      setStatus('error');
      setMessage('Authentication failed. Please try again.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
      return;
    }

    if (token && user) {
      try {
        // Store token in localStorage
        localStorage.setItem('auth_token', token);
        
        // Parse and store user data
        const userData = JSON.parse(decodeURIComponent(user));
        localStorage.setItem('user_data', JSON.stringify(userData));
        
        setStatus('success');
        setMessage('Authentication successful! Redirecting...');
        
        // Redirect to home page
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } catch (error) {
        console.error('Error processing auth callback:', error);
        setStatus('error');
        setMessage('Failed to process authentication data.');
        setTimeout(() => {
          router.push('/auth/login');
        }, 3000);
      }
    } else {
      setStatus('error');
      setMessage('Invalid authentication response.');
      setTimeout(() => {
        router.push('/auth/login');
      }, 3000);
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl mb-6">
          <IconShield size={32} className="text-white" />
        </div>
        
        <div className="space-y-4">
          {status === 'loading' && (
            <>
              <Loader size="lg" className="mx-auto" />
              <h2 className="text-xl font-semibold text-gray-800">
                Authenticating...
              </h2>
            </>
          )}
          
          {status === 'success' && (
            <>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-green-800">
                Success!
              </h2>
            </>
          )}
          
          {status === 'error' && (
            <>
              <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </div>
              <h2 className="text-xl font-semibold text-red-800">
                Authentication Failed
              </h2>
            </>
          )}
          
          <p className="text-gray-600">{message}</p>
        </div>
      </motion.div>
    </div>
  );
} 