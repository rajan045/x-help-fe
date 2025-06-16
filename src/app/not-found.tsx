'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  Container, 
  Stack, 
  Title, 
  Text, 
  Button, 
  Group,
  Card,
  SimpleGrid
} from '@mantine/core';
import { 
  IconHome, 
  IconSearch, 
  IconArrowLeft,
  IconQuestionMark,
  IconUsers,
  IconMessageCircle
} from '@tabler/icons-react';

export default function NotFound() {
  const quickLinks = [
    {
      title: 'Browse Mentors',
      description: 'Find career guidance from experts',
      href: '/browse',
      icon: IconSearch,
      color: 'blue'
    },
    {
      title: 'Join Community',
      description: 'Connect with professionals',
      href: '/auth/signup',
      icon: IconUsers,
      color: 'green'
    },
    {
      title: 'Get Help',
      description: 'Contact our support team',
      href: '/support',
      icon: IconMessageCircle,
      color: 'orange'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
      <Container size="md" py="xl">
        <Stack align="center" gap="xl">
          {/* 404 Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="text-center"
          >
            <div className="relative">
              {/* Large 404 Text */}
              <motion.div
                initial={{ y: -20 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-8xl sm:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text"
              >
                404
              </motion.div>
              
              {/* Floating Question Mark */}
              <motion.div
                animate={{ 
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5]
                }}
                transition={{ 
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute -top-4 -right-8 w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center shadow-lg"
              >
                <IconQuestionMark size={32} className="text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Error Message */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="text-center space-y-4"
          >
            <Title order={1} size="h2" className="text-gray-800">
              Oops! Page Not Found
            </Title>
            <Text size="lg" c="dimmed" maw={500} mx="auto">
              The page you&apos;re looking for seems to have wandered off. 
              Don&apos;t worry, even the best career paths have unexpected detours!
            </Text>
          </motion.div>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Group gap="md" justify="center">
              <Link href="/" style={{ textDecoration: 'none' }}>
                <Button 
                  leftSection={<IconHome size={16} />}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  Go Home
                </Button>
              </Link>
              
              <Button 
                variant="outline" 
                leftSection={<IconArrowLeft size={16} />}
                size="lg"
                onClick={() => window.history.back()}
              >
                Go Back
              </Button>
            </Group>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="w-full mt-12"
          >
            <Stack gap="lg" align="center">
              <Text size="lg" fw={600} c="dark">
                Or explore these popular sections:
              </Text>
              
              <SimpleGrid cols={{ base: 1, sm: 3 }} spacing="lg" w="100%">
                {quickLinks.map((link, index) => (
                  <motion.div
                    key={link.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 1 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                  >
                    <Link href={link.href} style={{ textDecoration: 'none' }}>
                      <Card 
                        shadow="sm" 
                        padding="lg" 
                        radius="md" 
                        withBorder
                        className="h-full cursor-pointer hover:shadow-lg transition-all duration-300"
                      >
                        <Stack align="center" gap="md" ta="center">
                          <div className={`w-12 h-12 rounded-full bg-${link.color}-100 flex items-center justify-center`}>
                            <link.icon size={24} className={`text-${link.color}-600`} />
                          </div>
                          <div>
                            <Text fw={600} size="md" mb="xs">
                              {link.title}
                            </Text>
                            <Text size="sm" c="dimmed">
                              {link.description}
                            </Text>
                          </div>
                        </Stack>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </SimpleGrid>
            </Stack>
          </motion.div>

          {/* Fun Message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            className="text-center mt-8"
          >
            <Text size="sm" c="dimmed" fs="italic">
              &quot;Every expert was once a beginner. Every pro was once an amateur. 
              Every icon was once an unknown.&quot; - Robin Sharma
            </Text>
          </motion.div>
        </Stack>
      </Container>
    </div>
  );
} 