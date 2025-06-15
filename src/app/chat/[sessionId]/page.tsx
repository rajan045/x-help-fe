'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  Container, 
  Stack, 
  Group, 
  Text, 
  Avatar, 
  Paper, 
  TextInput, 
  Button, 
  Badge, 
  ActionIcon,
  Modal,
  Rating,
  Textarea,
  Card,
  Alert,
  Divider,
  Menu,
  Tooltip
} from '@mantine/core';
import { 
  IconSend, 
  IconVideo, 
  IconPhone, 
  IconDots,
  IconClock,
  IconStar,
  IconThumbUp,
  IconShare,
  IconFlag,
  IconCamera,
  IconMicrophone,
  IconX,
  IconCheck,
  IconExternalLink
} from '@tabler/icons-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  content: string;
  timestamp: Date;
  type: 'text' | 'system' | 'session-start' | 'session-end';
  isRead?: boolean;
}

interface Session {
  id: string;
  mentorId: string;
  mentorName: string;
  mentorAvatar: string;
  mentorTitle: string;
  userId: string;
  userName: string;
  userAvatar: string;
  scheduledTime: Date;
  duration: number; // in minutes
  status: 'scheduled' | 'live' | 'completed' | 'cancelled';
  type: 'video' | 'audio' | 'chat';
  zoomLink?: string;
  topic: string;
  rating?: number;
  feedback?: string;
}

interface ChatPageProps {
  params: {
    sessionId: string;
  };
}

// Mock data
const mockSession: Session = {
  id: 'session-123',
  mentorId: 'mentor-1',
  mentorName: 'Dr. Anjali Gupta',
  mentorAvatar: '/images/user.jpg',
  mentorTitle: 'Senior Product Manager at Microsoft',
  userId: 'user-1',
  userName: 'Rahul Sharma',
  userAvatar: '/images/user.jpg',
  scheduledTime: new Date(Date.now() + 5 * 60 * 1000), // 5 minutes from now
  duration: 45,
  status: 'scheduled',
  type: 'video',
  zoomLink: 'https://zoom.us/j/1234567890',
  topic: 'Product Management Career Transition'
};

const mockMessages: Message[] = [
  {
    id: '1',
    senderId: 'system',
    senderName: 'System',
    content: 'Session booked successfully! Your mentor will join shortly.',
    timestamp: new Date(Date.now() - 60 * 60 * 1000),
    type: 'system'
  },
  {
    id: '2',
    senderId: 'mentor-1',
    senderName: 'Dr. Anjali Gupta',
    content: 'Hi Rahul! I\'m excited to chat with you about product management. I see you\'re looking to transition from engineering - that\'s exactly the path I took 6 years ago!',
    timestamp: new Date(Date.now() - 30 * 60 * 1000),
    type: 'text',
    isRead: true
  },
  {
    id: '3',
    senderId: 'user-1',
    senderName: 'Rahul Sharma',
    content: 'Thank you so much! Yes, I\'m currently a senior software engineer and I\'ve been feeling drawn to the product side. I\'d love to understand how you made the transition and what skills I should focus on.',
    timestamp: new Date(Date.now() - 25 * 60 * 1000),
    type: 'text',
    isRead: true
  },
  {
    id: '4',
    senderId: 'mentor-1',
    senderName: 'Dr. Anjali Gupta',
    content: 'Perfect! I\'ll share my experience and we can discuss your specific situation. Looking forward to our video call in a few minutes.',
    timestamp: new Date(Date.now() - 20 * 60 * 1000),
    type: 'text',
    isRead: true
  }
];

export default function ChatPage({ params }: ChatPageProps) {
  const { sessionId } = params;
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');
  const [session, setSession] = useState<Session>(mockSession);
  const [timeToSession, setTimeToSession] = useState<number>(0);
  const [showRatingModal, setShowRatingModal] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
      const now = new Date();
      const sessionTime = new Date(session.scheduledTime);
      const timeDiff = sessionTime.getTime() - now.getTime();
      setTimeToSession(Math.max(0, timeDiff));

      // Auto-start session when time comes
      if (timeDiff <= 0 && session.status === 'scheduled') {
        setSession(prev => ({ ...prev, status: 'live' }));
        const sessionStartMessage: Message = {
          id: `session-start-${Date.now()}`,
          senderId: 'system',
          senderName: 'System',
          content: 'Session has started! Click the video link to join.',
          timestamp: new Date(),
          type: 'session-start'
        };
        setMessages(prev => [...prev, sessionStartMessage]);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  // Mock session end after duration
  useEffect(() => {
    if (session.status === 'live') {
      const endTimer = setTimeout(() => {
        setSession(prev => ({ ...prev, status: 'completed' }));
        const sessionEndMessage: Message = {
          id: `session-end-${Date.now()}`,
          senderId: 'system',
          senderName: 'System',
          content: 'Session has ended. Please rate your experience!',
          timestamp: new Date(),
          type: 'session-end'
        };
        setMessages(prev => [...prev, sessionEndMessage]);
        setShowRatingModal(true);
      }, 5 * 60 * 1000); // 5 minutes for demo

      return () => clearTimeout(endTimer);
    }
  }, [session.status]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: `msg-${Date.now()}`,
        senderId: session.userId,
        senderName: session.userName,
        content: newMessage,
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, message]);
      setNewMessage('');

      // Mock mentor response
      setTimeout(() => {
        const mentorResponse: Message = {
          id: `msg-${Date.now() + 1}`,
          senderId: session.mentorId,
          senderName: session.mentorName,
          content: 'Thanks for sharing that! Let me think about the best way to approach this...',
          timestamp: new Date(),
          type: 'text'
        };
        setMessages(prev => [...prev, mentorResponse]);
      }, 2000);
    }
  };

  const handleRatingSubmit = () => {
    setSession(prev => ({ ...prev, rating, feedback }));
    setShowRatingModal(false);
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}h ${minutes}m ${seconds}s`;
    } else if (minutes > 0) {
      return `${minutes}m ${seconds}s`;
    } else {
      return `${seconds}s`;
    }
  };

  const MessageBubble = ({ message, isOwn }: { message: Message; isOwn: boolean }) => {
    if (message.type === 'system' || message.type === 'session-start' || message.type === 'session-end') {
      return (
        <div className="flex justify-center my-4">
          <Paper p="sm" radius="md" bg="gray.1" className="max-w-md">
            <Text size="sm" ta="center" c="dimmed">
              {message.content}
            </Text>
            {message.type === 'session-start' && session.zoomLink && (
              <Group justify="center" mt="sm">
                <Button
                  component="a"
                  href={session.zoomLink}
                  target="_blank"
                  leftSection={<IconVideo size={16} />}
                  size="sm"
                >
                  Join Video Call
                </Button>
              </Group>
            )}
          </Paper>
        </div>
      );
    }

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`flex ${isOwn ? 'justify-end' : 'justify-start'} mb-4`}
      >
        <div className={`flex gap-2 max-w-[70%] ${isOwn ? 'flex-row-reverse' : 'flex-row'}`}>
          {!isOwn && (
            <Avatar
              src={message.senderId === session.mentorId ? session.mentorAvatar : session.userAvatar}
              size={32}
              radius="xl"
            />
          )}
          <div className={`flex flex-col ${isOwn ? 'items-end' : 'items-start'}`}>
            <Paper
              p="sm"
              radius="lg"
              bg={isOwn ? 'blue.6' : 'gray.1'}
              className={`${isOwn ? 'text-white' : 'text-gray-900'}`}
            >
              <Text size="sm">{message.content}</Text>
            </Paper>
            <Text size="xs" c="dimmed" mt={4}>
              {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              {isOwn && message.isRead && (
                <IconCheck size={12} className="ml-1 text-blue-500" />
              )}
            </Text>
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <Container size="md" h="100vh" p={0}>
      <Stack h="100vh" gap={0}>
        {/* Header */}
        <Paper shadow="sm" p="md" withBorder>
          <Group justify="space-between">
            <Group gap="md">
              <Avatar src={session.mentorAvatar} size={40} radius="xl" />
              <div>
                <Text fw={600}>{session.mentorName}</Text>
                <Text size="sm" c="dimmed">{session.mentorTitle}</Text>
              </div>
            </Group>
            
            <Group gap="sm">
              {session.status === 'scheduled' && timeToSession > 0 && (
                <Badge leftSection={<IconClock size={12} />} color="orange">
                  Starts in {formatTime(timeToSession)}
                </Badge>
              )}
              
              {session.status === 'live' && (
                <Badge leftSection={<IconVideo size={12} />} color="green">
                  Live Session
                </Badge>
              )}
              
              {session.status === 'completed' && (
                <Badge leftSection={<IconCheck size={12} />} color="blue">
                  Completed
                </Badge>
              )}
              
              <Menu shadow="md" width={200}>
                <Menu.Target>
                  <ActionIcon variant="light">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item leftSection={<IconShare size={14} />}>
                    Share Session
                  </Menu.Item>
                  <Menu.Item leftSection={<IconFlag size={14} />}>
                    Report Issue
                  </Menu.Item>
                  <Menu.Item leftSection={<IconX size={14} />} color="red">
                    End Session
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Group>
        </Paper>

        {/* Session Info Banner */}
        {session.status === 'scheduled' && (
          <Alert color="blue" p="md">
            <Group justify="space-between">
              <div>
                <Text fw={500}>Scheduled Session: {session.topic}</Text>
                <Text size="sm" c="dimmed">
                  {session.scheduledTime.toLocaleDateString()} at {session.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </div>
              {session.zoomLink && timeToSession <= 5 * 60 * 1000 && (
                <Button
                  component="a"
                  href={session.zoomLink}
                  target="_blank"
                  leftSection={<IconExternalLink size={16} />}
                  variant="light"
                >
                  Join Now
                </Button>
              )}
            </Group>
          </Alert>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          <AnimatePresence>
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isOwn={message.senderId === session.userId}
              />
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <div className="flex justify-start mb-4">
              <Group gap="sm">
                <Avatar src={session.mentorAvatar} size={32} radius="xl" />
                <Paper p="sm" radius="lg" bg="gray.1">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                  </div>
                </Paper>
              </Group>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Message Input */}
        <Paper shadow="sm" p="md" withBorder>
          <Group gap="sm">
            <Tooltip label="Send Photo">
              <ActionIcon variant="light" size="lg">
                <IconCamera size={20} />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Voice Message">
              <ActionIcon variant="light" size="lg">
                <IconMicrophone size={20} />
              </ActionIcon>
            </Tooltip>
            <TextInput
              flex={1}
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.currentTarget.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              rightSection={
                <ActionIcon onClick={sendMessage} disabled={!newMessage.trim()}>
                  <IconSend size={18} />
                </ActionIcon>
              }
            />
          </Group>
        </Paper>
      </Stack>

      {/* Rating Modal */}
      <Modal
        opened={showRatingModal}
        onClose={() => setShowRatingModal(false)}
        title="Rate Your Session"
        centered
      >
        <Stack gap="md">
          <div className="text-center">
            <Avatar src={session.mentorAvatar} size={80} mx="auto" mb="md" />
            <Text fw={600} size="lg">{session.mentorName}</Text>
            <Text size="sm" c="dimmed">{session.mentorTitle}</Text>
          </div>
          
          <div className="text-center">
            <Text mb="sm">How was your session?</Text>
            <Rating
              size="lg"
              value={rating}
              onChange={setRating}
            />
          </div>
          
          <Textarea
            label="Feedback (Optional)"
            placeholder="Share your experience to help us improve..."
            value={feedback}
            onChange={(e) => setFeedback(e.currentTarget.value)}
            minRows={3}
          />
          
          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowRatingModal(false)}>
              Skip
            </Button>
            <Button onClick={handleRatingSubmit} disabled={rating === 0}>
              Submit Rating
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 