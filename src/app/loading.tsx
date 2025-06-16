'use client';

import { motion } from 'framer-motion';
import { Container, Stack, Text, Loader } from '@mantine/core';
import { IconSparkles } from '@tabler/icons-react';

export default function Loading() {
  const loadingMessages = [
    "Connecting you with amazing mentors...",
    "Preparing your career journey...",
    "Loading expert advice...",
    "Setting up your dashboard...",
    "Almost there..."
  ];

  const randomMessage = loadingMessages[Math.floor(Math.random() * loadingMessages.length)];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <Container size="sm">
        <Stack align="center" gap="xl">
          {/* Animated Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <motion.div
              animate={{ 
                rotate: [0, 360],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                rotate: { duration: 3, repeat: Infinity, ease: "linear" },
                scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
              }}
              className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg mx-auto mb-4"
            >
              <IconSparkles size={40} className="text-white" />
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Text fw={700} size="xl" c="dark">
                X-Help
              </Text>
            </motion.div>
          </motion.div>

          {/* Loading Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center"
          >
            <Loader size="lg" className="mb-4" />
            
            <motion.div
              key={randomMessage}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Text size="lg" c="dimmed" fw={500}>
                {randomMessage}
              </Text>
            </motion.div>
          </motion.div>

          {/* Animated Dots */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-2"
          >
            {[0, 1, 2].map((index) => (
              <motion.div
                key={index}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: index * 0.2,
                  ease: "easeInOut"
                }}
                className="w-3 h-3 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
              />
            ))}
          </motion.div>

          {/* Progress Indicator */}
          <motion.div
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="w-full max-w-xs"
          >
            <div className="h-1 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                animate={{ x: ["-100%", "100%"] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
              />
            </div>
          </motion.div>
        </Stack>
      </Container>
    </div>
  );
} 