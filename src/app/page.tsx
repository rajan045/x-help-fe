'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { 
  IconCalendarEvent,
  IconBell,
  IconMessageCircle,
  IconTrendingUp,
  IconUserCheck,
  IconSchool,
  IconBriefcase,
  IconStar,
  IconClock,
  IconArrowRight,
  IconSparkles,
  IconUsers,
  IconTarget
} from '@tabler/icons-react';
import { Card, Text, Badge, Avatar, Group, Stack, Button, Notification } from '@mantine/core';

// Mock data - replace with actual data from your backend
const mockUser = {
  isLoggedIn: true, // Change to false to see new user view
  name: 'Alex Johnson',
  avatar: '/images/user.jpg'
};

const upcomingSessions = [
  {
    id: 1,
    mentorName: 'Dr. Sarah Chen',
    mentorTitle: 'Senior Software Engineer at Google',
    mentorAvatar: '/images/user.jpg',
    time: '2:00 PM Today',
    topic: 'Breaking into Tech',
    duration: '30 min'
  },
  {
    id: 2,
    mentorName: 'Rajesh Kumar',
    mentorTitle: 'IAS Officer & UPSC Mentor',
    mentorAvatar: '/images/user.jpg',
    time: '4:30 PM Tomorrow',
    topic: 'Civil Services Preparation',
    duration: '45 min'
  }
];

const notifications = [
  {
    id: 1,
    type: 'message',
    title: 'New message from Priya Sharma',
    message: 'Thanks for the career advice! I have a follow-up question...',
    time: '5 minutes ago',
    unread: true
  },
  {
    id: 2,
    type: 'session',
    title: 'Session reminder',
    message: 'Your session with Dr. Sarah Chen starts in 2 hours',
    time: '1 hour ago',
    unread: true
  },
  {
    id: 3,
    type: 'reply',
    title: 'Reply to your question',
    message: 'Amit Singh replied to your question about MBA programs',
    time: '3 hours ago',
    unread: false
  }
];

const mentorSuggestions = [
  {
    id: 1,
    name: 'Sanya Gupta',
    title: 'MBA, IIM Ahmedabad',
    tagline: 'Career switcher mentor',
    avatar: '/images/user.jpg',
    specialties: ['Career Switch', 'MBA', 'Consulting'],
    rating: 4.9,
    sessions: 150,
    prompt: 'Talk to someone who switched careers successfully'
  },
  {
    id: 2,
    name: 'Vikram Patel',
    title: 'IAS Officer',
    tagline: 'UPSC mentor & civil services expert',
    avatar: '/images/user.jpg',
    specialties: ['UPSC', 'Civil Services', 'Public Policy'],
    rating: 4.8,
    sessions: 200,
    prompt: 'Talk to someone who cracked UPSC'
  },
  {
    id: 3,
    name: 'Arjun Sharma',
    title: 'Senior Developer at Microsoft',
    tagline: 'Tech career guidance specialist',
    avatar: '/images/user.jpg',
    specialties: ['Software Engineering', 'BCA', 'BTech'],
    rating: 4.7,
    sessions: 120,
    prompt: 'Confused about BCA vs BTech?'
  },
  {
    id: 4,
    name: 'Meera Reddy',
    title: 'CA & Financial Advisor',
    tagline: 'Finance career expert',
    avatar: '/images/user.jpg',
    specialties: ['Finance', 'CA', 'Investment Banking'],
    rating: 4.9,
    sessions: 95,
    prompt: 'Navigate your finance career path'
  }
];

// New User Welcome Component
const NewUserWelcome = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
            <IconSparkles size={32} className="text-white" />
          </div>
          
          <h1 className="font-heading text-4xl sm:text-6xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              Welcome to Your Career Journey
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Connect with mentors, get expert advice, and accelerate your career growth
          </p>
          
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-semibold text-gray-800 mb-8">
              What are you here for?
            </h2>
            
            {/* Action Cards */}
            <div className="grid md:grid-cols-2 gap-6">
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/browse">
                  <Card className="p-8 bg-gradient-to-br from-blue-500 to-blue-600 text-white hover:shadow-2xl transition-all duration-300 cursor-pointer border-0">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                        <IconTarget size={28} />
                      </div>
                      <h3 className="text-2xl font-bold">Get Career Advice</h3>
                      <p className="text-blue-100 text-lg">
                        Connect with experienced mentors in your field
                      </p>
                      <div className="flex items-center justify-center gap-2 text-blue-100 font-medium">
                        <span>Find your mentor</span>
                        <IconArrowRight size={18} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
              
              <motion.div
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2 }}
              >
                <Link href="/become-mentor">
                  <Card className="p-8 bg-gradient-to-br from-green-500 to-emerald-600 text-white hover:shadow-2xl transition-all duration-300 cursor-pointer border-0">
                    <div className="text-center space-y-4">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-4">
                        <IconUsers size={28} />
                      </div>
                      <h3 className="text-2xl font-bold">Become a Mentor</h3>
                      <p className="text-green-100 text-lg">
                        Share your expertise and help others grow
                      </p>
                      <div className="flex items-center justify-center gap-2 text-green-100 font-medium">
                        <span>Start mentoring</span>
                        <IconArrowRight size={18} />
                      </div>
                    </div>
                  </Card>
                </Link>
              </motion.div>
            </div>
        </div>
        </motion.div>
        
        {/* Featured Mentors Preview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-16"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">Meet Our Expert Mentors</h3>
            <p className="text-gray-600">Get a preview of the amazing professionals ready to help you</p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {mentorSuggestions.slice(0, 4).map((mentor) => (
              <Link key={mentor.id} href="/profile/mentor-1" style={{ textDecoration: 'none' }}>
                <Card className="p-4 hover:shadow-lg transition-shadow duration-200 cursor-pointer">
                  <div className="text-center space-y-3">
                    <Avatar 
                      src={mentor.avatar} 
                      size={60} 
                      className="mx-auto"
                      style={{ backgroundColor: '#f0f0f0' }}
                    />
                    <div>
                      <Text className="font-semibold text-gray-800">{mentor.name}</Text>
                      <Text size="sm" className="text-gray-600">{mentor.title}</Text>
                      <Text size="xs" className="text-blue-600 font-medium">{mentor.tagline}</Text>
                    </div>
                    <div className="flex items-center justify-center gap-1">
                      <IconStar size={14} className="text-yellow-400 fill-current" />
                      <Text size="sm" className="text-gray-600">{mentor.rating}</Text>
                    </div>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Link href="/browse">
              <Button size="lg" className="bg-blue-600 hover:bg-blue-700">
                Browse All Mentors
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Logged-in User Dashboard Component
const UserDashboard = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Welcome back, {mockUser.name}! 👋
              </h1>
              <p className="text-gray-600 mt-1">Here's what's happening with your career journey</p>
            </div>
            <Link href="/profile/seeker-1" style={{ textDecoration: 'none' }}>
              <Avatar src={mockUser.avatar} size={50} style={{ backgroundColor: '#3b82f6' }} className="cursor-pointer hover:opacity-80 transition-opacity" />
            </Link>
          </div>
        </motion.div>
        
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <IconCalendarEvent size={28} className="text-blue-600" />
                  Upcoming Sessions
                </h2>
                <Link href="/sessions" className="text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </Link>
              </div>
              
              <div className="space-y-4">
                {upcomingSessions.map((session) => (
                  <Card key={session.id} className="p-6 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-center gap-4">
                      <Avatar 
                        src={session.mentorAvatar} 
                        size={60}
                        style={{ backgroundColor: '#f0f0f0' }}
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 className="font-semibold text-gray-900">{session.mentorName}</h3>
                            <p className="text-gray-600 text-sm">{session.mentorTitle}</p>
                            <p className="text-blue-600 font-medium mt-1">{session.topic}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-2 text-gray-600 text-sm">
                              <IconClock size={16} />
                              <span>{session.time}</span>
                            </div>
                            <p className="text-gray-500 text-sm mt-1">{session.duration}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-3">
                      <Button variant="filled" size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Join Session
                      </Button>
                      <Button variant="outline" size="sm">
                        Reschedule
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
            
            {/* Mentor Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                  <IconUserCheck size={28} className="text-green-600" />
                  Suggested Mentors
                </h2>
                <Link href="/mentors" className="text-blue-600 hover:text-blue-700 font-medium">
                  View all
                </Link>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-6">
                {mentorSuggestions.map((mentor) => (
                  <Card key={mentor.id} className="p-6 hover:shadow-lg transition-shadow duration-200">
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <Avatar 
                          src={mentor.avatar} 
                          size={50}
                          style={{ backgroundColor: '#f0f0f0' }}
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900">{mentor.name}</h3>
                          <p className="text-gray-600 text-sm">{mentor.title}</p>
                          <p className="text-blue-600 text-sm font-medium">{mentor.tagline}</p>
                        </div>
                        <div className="text-right text-sm text-gray-500">
                          <div className="flex items-center gap-1">
                            <IconStar size={14} className="text-yellow-400 fill-current" />
                            <span>{mentor.rating}</span>
                          </div>
                          <p>{mentor.sessions} sessions</p>
                        </div>
                      </div>
                      
                      <div className="border-t pt-4">
                        <p className="text-gray-700 font-medium mb-3">💡 {mentor.prompt}</p>
                        <div className="flex flex-wrap gap-2 mb-4">
                          {mentor.specialties.map((specialty) => (
                            <Badge key={specialty} variant="light" size="sm">
                              {specialty}
                            </Badge>
                          ))}
                        </div>
                        <Button 
                          variant="filled" 
                          size="sm" 
                          className="w-full bg-blue-600 hover:bg-blue-700"
                        >
                          Book Session
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          </div>
          
          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Notifications */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                    <IconBell size={24} className="text-orange-600" />
                    Notifications
                  </h3>
                  <Badge variant="filled" size="sm">
                    {notifications.filter(n => n.unread).length}
                  </Badge>
                </div>
                
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className={`p-3 rounded-lg border-l-4 ${
                      notification.unread 
                        ? 'bg-blue-50 border-blue-500' 
                        : 'bg-gray-50 border-gray-300'
                    }`}>
                      <div className="flex items-start gap-3">
                        <div className="flex-shrink-0 mt-1">
                          {notification.type === 'message' && <IconMessageCircle size={16} className="text-blue-600" />}
                          {notification.type === 'session' && <IconCalendarEvent size={16} className="text-green-600" />}
                          {notification.type === 'reply' && <IconTrendingUp size={16} className="text-purple-600" />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-medium text-gray-900 text-sm">{notification.title}</p>
                          <p className="text-gray-600 text-xs mt-1 line-clamp-2">{notification.message}</p>
                          <p className="text-gray-500 text-xs mt-2">{notification.time}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <Button variant="outline" size="sm" className="w-full mt-4">
                  View All Notifications
                </Button>
              </Card>
            </motion.div>
            
            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Your Progress</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                                             <IconSchool size={20} className="text-blue-600" />
                      <span className="text-gray-700">Sessions Completed</span>
                    </div>
                    <span className="font-semibold text-gray-900">12</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconBriefcase size={20} className="text-green-600" />
                      <span className="text-gray-700">Goals Achieved</span>
                    </div>
                    <span className="font-semibold text-gray-900">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <IconUsers size={20} className="text-purple-600" />
                      <span className="text-gray-700">Mentors Connected</span>
                    </div>
                    <span className="font-semibold text-gray-900">5</span>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Main Home Page Component
export default function HomePage() {
  return (
    <>
      {mockUser.isLoggedIn ? <UserDashboard /> : <NewUserWelcome />}
    </>
  );
}
