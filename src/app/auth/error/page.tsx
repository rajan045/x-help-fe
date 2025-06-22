'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import { IconAlertTriangle, IconArrowLeft } from '@tabler/icons-react';
import { Button } from '@mantine/core';

export default function AuthError() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [errorMessage, setErrorMessage] = useState('Authentication failed');

  useEffect(() => {
    const error = searchParams.get('error');
    if (error) {
      setErrorMessage(decodeURIComponent(error));
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 to-orange-50 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-md w-full"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-500 to-orange-600 rounded-2xl mb-6">
          <IconAlertTriangle size={32} className="text-white" />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-red-800">
            Authentication Error
          </h2>
          
          <p className="text-gray-600">
            {errorMessage}
          </p>
          
          <div className="pt-4">
            <Button
              onClick={() => router.push('/auth/login')}
              className="bg-blue-600 hover:bg-blue-700"
              leftSection={<IconArrowLeft size={16} />}
            >
              Back to Login
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
} 