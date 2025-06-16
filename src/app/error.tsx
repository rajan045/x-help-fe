'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Button, 
  Group,
  Alert,
  Code
} from '@mantine/core';
import { 
  IconHome, 
  IconRefresh,
  IconAlertTriangle,
  IconBug
} from '@tabler/icons-react';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Application Error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center">
      <Container size="md" py="xl">
        <Stack align="center" gap="xl">
          {/* Error Icon Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, -10, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="w-24 h-24 bg-gradient-to-br from-red-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg mx-auto"
            >
              <IconAlertTriangle size={48} className="text-white" />
            </motion.div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center space-y-4"
          >
            <Title order={1} size="h2" className="text-gray-800">
              Something went wrong!
            </Title>
            <Text size="lg" c="dimmed" maw={500} mx="auto">
              We encountered an unexpected error. Don't worry, our team has been notified 
              and we're working to fix it.
            </Text>
          </motion.div>

          {/* Error Details (Development Mode) */}
          {process.env.NODE_ENV === 'development' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="w-full"
            >
              <Alert 
                icon={<IconBug size={16} />} 
                title="Development Error Details" 
                color="red"
                variant="light"
              >
                <Stack gap="sm">
                  <Text size="sm" fw={500}>Error Message:</Text>
                  <Code block>{error.message}</Code>
                  
                  {error.digest && (
                    <>
                      <Text size="sm" fw={500} mt="md">Error Digest:</Text>
                      <Code>{error.digest}</Code>
                    </>
                  )}
                  
                  {error.stack && (
                    <>
                      <Text size="sm" fw={500} mt="md">Stack Trace:</Text>
                      <Code block style={{ maxHeight: '200px', overflow: 'auto' }}>
                        {error.stack}
                      </Code>
                    </>
                  )}
                </Stack>
              </Alert>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Group gap="md" justify="center">
              <Button 
                leftSection={<IconRefresh size={16} />}
                size="lg"
                onClick={reset}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Try Again
              </Button>
              
              <Button 
                variant="outline" 
                leftSection={<IconHome size={16} />}
                size="lg"
                onClick={() => window.location.href = '/'}
              >
                Go Home
              </Button>
            </Group>
          </motion.div>

          {/* Help Text */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center"
          >
            <Text size="sm" c="dimmed">
              If this problem persists, please contact our support team at{' '}
              <Text component="a" href="mailto:support@x-help.com" c="blue" td="underline">
                support@x-help.com
              </Text>
            </Text>
          </motion.div>

          {/* Motivational Quote */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
            className="text-center mt-8"
          >
            <Text size="sm" c="dimmed" fs="italic">
              "Failure is simply the opportunity to begin again, this time more intelligently." 
              - Henry Ford
            </Text>
          </motion.div>
        </Stack>
      </Container>
    </div>
  );
} 