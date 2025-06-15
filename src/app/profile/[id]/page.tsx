'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import BookingModal from '../../../components/BookingModal';
import { 
  Container, 
  Grid, 
  Card, 
  Text, 
  Badge, 
  Avatar, 
  Group, 
  Stack, 
  Button, 
  Title,
  Divider,
  Paper,
  Rating,
  ActionIcon,
  Modal
} from '@mantine/core';
import { 
  IconStar, 
  IconCalendarEvent,
  IconMapPin,
  IconShieldCheck,
  IconUsers,
  IconBulb,
  IconQuestionMark,
  IconHeart,
  IconShare,
  IconMessageCircle,
  IconVideo
} from '@tabler/icons-react';

// Type definitions
interface SeekerProfile {
  type: 'seeker';
  id: string;
  name: string;
  avatar: string;
  location: string;
  joinedDate: string;
  bio: string;
  skillsWorkingOn: string[];
  helpNeeded: string;
  receivedAdvice: Array<{
    id: number;
    mentorName: string;
    mentorTitle: string;
    topic: string;
    rating: number;
    review: string;
    date: string;
    tags: string[];
  }>;
  stats: {
    sessionsCompleted: number;
    mentorsConnected: number;
    avgRating: number;
  };
}

interface MentorProfile {
  type: 'mentor';
  id: string;
  name: string;
  avatar: string;
  location: string;
  joinedDate: string;
  title: string;
  experience: string;
  bio: string;
  about: string;
  tags: string[];
  specialties: string[];
  languages: string[];
  rating: number;
  sessionsCompleted: number;
  menteesHelped: number;
  responseTime: string;
  hourlyRate: number;
  availability: string;
  pastMentees: Array<{
    name: string;
    role: string;
    testimonial: string;
    rating: number;
  }>;
  suggestedQuestions: string[];
  calendarAvailable: boolean;
}

// Mock data
const mockProfiles: Record<string, SeekerProfile | MentorProfile> = {
  'seeker-1': {
    type: 'seeker',
    id: 'seeker-1',
    name: 'Rahul Sharma',
    avatar: '/images/user.jpg',
    location: 'Mumbai, India',
    joinedDate: 'Joined March 2024',
    bio: 'Final year engineering student looking to transition into product management',
    skillsWorkingOn: [
      'Product Management',
      'Data Analysis', 
      'UI/UX Design',
      'Market Research',
      'Business Strategy'
    ],
    helpNeeded: 'Wants help on resume + product management transition + MBA guidance',
    receivedAdvice: [
      {
        id: 1,
        mentorName: 'Priya Patel',
        mentorTitle: 'Senior PM at Google',
        topic: 'Product Management Career Switch',
        rating: 5,
        review: 'Incredibly helpful session! Priya gave me a clear roadmap for transitioning from engineering to PM.',
        date: '2 weeks ago',
        tags: ['Career Switch', 'Product Management']
      },
      {
        id: 2,
        mentorName: 'Vikram Singh',
        mentorTitle: 'MBA, IIM Bangalore',
        topic: 'MBA Application Strategy',
        rating: 4,
        review: 'Great insights on MBA applications and how to strengthen my profile.',
        date: '1 month ago',
        tags: ['MBA', 'Applications']
      },
      {
        id: 3,
        mentorName: 'Sarah Chen',
        mentorTitle: 'Design Lead at Microsoft',
        topic: 'UX Portfolio Review',
        rating: 5,
        review: 'Sarah helped me restructure my UX portfolio and gave actionable feedback.',
        date: '1 month ago',
        tags: ['UI/UX', 'Portfolio']
      }
    ],
    stats: {
      sessionsCompleted: 8,
      mentorsConnected: 5,
      avgRating: 4.7
    }
  },
  'mentor-1': {
    type: 'mentor',
    id: 'mentor-1',
    name: 'Dr. Anjali Gupta',
    avatar: '/images/user.jpg',
    location: 'Bangalore, India',
    joinedDate: 'Mentor since January 2023',
    title: 'Senior Product Manager at Microsoft',
    experience: '8 years in Product Management',
    bio: 'Passionate about helping aspiring product managers break into tech. I\'ve worked at startups and big tech companies, leading products from 0 to 1 and scaling them to millions of users.',
    about: `I'm a Senior Product Manager at Microsoft with over 8 years of experience in building and scaling digital products. My journey started as a software engineer, and I transitioned to product management 6 years ago.

I've worked across different domains including fintech, edtech, and cloud computing. I'm passionate about mentoring because I believe everyone deserves guidance in their career journey - something I wish I had when I was starting out.

In my free time, I love reading about emerging technologies, traveling, and practicing yoga.`,
    tags: [
      'Product Management',
      'Career Transition', 
      'Tech Leadership',
      'Startup Strategy',
      'B2B Products',
      'Data-Driven Decisions'
    ],
    specialties: [
      'Product Strategy',
      'Go-to-Market',
      'Team Leadership',
      'Career Switching'
    ],
    languages: ['English', 'Hindi', 'Tamil'],
    rating: 4.9,
    sessionsCompleted: 156,
    menteesHelped: 89,
    responseTime: '< 2 hours',
    hourlyRate: 2500,
    availability: 'Available',
    pastMentees: [
      {
        name: 'Rajesh Kumar',
        role: 'Software Engineer → PM at Flipkart',
        testimonial: 'Anjali\'s guidance was instrumental in my transition to PM. Her structured approach and real-world insights made all the difference.',
        rating: 5
      },
      {
        name: 'Meera Patel',
        role: 'MBA Student → PM Intern at Google',
        testimonial: 'Amazing mentor! She helped me crack my PM interviews and gave me confidence in my abilities.',
        rating: 5
      },
      {
        name: 'Arjun Singh',
        role: 'Consultant → Senior PM at Zomato',
        testimonial: 'Anjali helped me understand the nuances of product management in the Indian market. Highly recommend!',
        rating: 4
      }
    ],
    suggestedQuestions: [
      'How did you transition from engineering to product management?',
      'What are the most important skills for a PM in 2024?',
      'How do you prioritize features when everyone thinks their request is urgent?',
      'What\'s the difference between working at a startup vs big tech?',
      'How do you measure product success?',
      'What mistakes should new PMs avoid?',
      'How do you work with engineering teams effectively?',
      'What books/resources do you recommend for aspiring PMs?'
    ],
    calendarAvailable: true
  }
};

const SeekerProfile = ({ profile }: { profile: SeekerProfile }) => {
  return (
    <Stack gap="lg">
      {/* Skills Working On */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group gap="xs">
            <IconBulb size={20} className="text-blue-500" />
            <Title order={3}>Skills I&apos;m Working On</Title>
          </Group>
          <Group gap="xs">
            {profile.skillsWorkingOn.map((skill, index) => (
              <Badge key={index} variant="light" size="md" color="blue">
                {skill}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Card>

      {/* Help Needed */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group gap="xs">
            <IconQuestionMark size={20} className="text-green-500" />
            <Title order={3}>What I Need Help With</Title>
          </Group>
          <Text size="md" c="dark">
            {profile.helpNeeded}
          </Text>
        </Stack>
      </Card>

      {/* Received Advice */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group gap="xs">
            <IconStar size={20} className="text-yellow-500" />
            <Title order={3}>Advice Received</Title>
            <Badge variant="light" color="yellow">
              {profile.receivedAdvice.length} sessions
            </Badge>
          </Group>
          
          <Stack gap="md">
            {profile.receivedAdvice.map((advice) => (
              <Card key={advice.id} shadow="xs" padding="md" radius="sm" withBorder>
                <Stack gap="sm">
                  <Group justify="space-between">
                    <div>
                      <Text fw={600} size="sm">{advice.mentorName}</Text>
                      <Text size="xs" c="dimmed">{advice.mentorTitle}</Text>
                    </div>
                    <Group gap="xs">
                      <Rating value={advice.rating} readOnly size="sm" />
                      <Text size="xs" c="dimmed">{advice.date}</Text>
                    </Group>
                  </Group>
                  
                  <Text size="sm" fw={500} c="dark">
                    {advice.topic}
                  </Text>
                  
                  <Text size="sm" c="dimmed">
                    &quot;{advice.review}&quot;
                  </Text>
                  
                  <Group gap="xs">
                    {advice.tags.map((tag, index) => (
                      <Badge key={index} size="xs" variant="outline">
                        {tag}
                      </Badge>
                    ))}
                  </Group>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
};

const MentorProfile = ({ profile }: { profile: MentorProfile }) => {
  const [showCalendar, setShowCalendar] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const router = useRouter();

  return (
    <Stack gap="lg">
      {/* About Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>About</Title>
          <Text size="md" style={{ whiteSpace: 'pre-line' }}>
            {profile.about}
          </Text>
        </Stack>
      </Card>

      {/* Skills & Topics */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Expertise & Topics I Cover</Title>
          <Group gap="xs">
            {profile.tags.map((tag, index) => (
              <Badge key={index} variant="filled" size="md" color="blue">
                {tag}
              </Badge>
            ))}
          </Group>
          
          <Divider />
          
          <div>
            <Text size="sm" fw={500} mb="xs">Specialties:</Text>
            <Group gap="xs">
              {profile.specialties.map((specialty, index) => (
                <Badge key={index} variant="light" size="sm" color="green">
                  {specialty}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>
      </Card>

      {/* Past Mentees */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group gap="xs">
            <IconUsers size={20} className="text-purple-500" />
            <Title order={3}>Success Stories</Title>
            <Badge variant="light" color="purple">
              {profile.menteesHelped} mentees helped
            </Badge>
          </Group>
          
          <Stack gap="md">
            {profile.pastMentees.map((mentee, index) => (
              <Card key={index} shadow="xs" padding="md" radius="sm" withBorder>
                <Stack gap="sm">
                  <Group justify="space-between">
                    <div>
                      <Text fw={600} size="sm">{mentee.name}</Text>
                      <Text size="xs" c="dimmed">{mentee.role}</Text>
                    </div>
                    <Rating value={mentee.rating} readOnly size="sm" />
                  </Group>
                  <Text size="sm" c="dimmed" style={{ fontStyle: 'italic' }}>
                    &quot;{mentee.testimonial}&quot;
                  </Text>
                </Stack>
              </Card>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Suggested Questions */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="lg">
          <Group gap="xs">
            <IconMessageCircle size={20} className="text-teal-500" />
            <Title order={3}>Suggested Questions to Ask</Title>
          </Group>
          
          <Stack gap="xs">
            {profile.suggestedQuestions.map((question, index) => (
              <Paper key={index} p="sm" radius="sm" bg="gray.0" className="hover:bg-gray-50 cursor-pointer transition-colors">
                <Text size="sm" c="dark">
                  💡 {question}
                </Text>
              </Paper>
            ))}
          </Stack>
        </Stack>
      </Card>

      {/* Calendar & Booking */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group gap="xs">
            <IconCalendarEvent size={20} className="text-orange-500" />
            <Title order={3}>Book a Session</Title>
          </Group>
          
          <Group gap="md">
            <div className="flex-1">
              <Text size="sm" c="dimmed" mb={4}>Response Time</Text>
              <Text size="sm" fw={500}>{profile.responseTime}</Text>
            </div>
            <div className="flex-1">
              <Text size="sm" c="dimmed" mb={4}>Session Rate</Text>
              <Text size="sm" fw={500}>₹{profile.hourlyRate}/hour</Text>
            </div>
            <div className="flex-1">
              <Text size="sm" c="dimmed" mb={4}>Languages</Text>
              <Text size="sm" fw={500}>{profile.languages.join(', ')}</Text>
            </div>
          </Group>
          
          <Group gap="sm" mt="md">
            <Button 
              leftSection={<IconVideo size={16} />}
              flex={1}
              onClick={() => setShowBookingModal(true)}
            >
              Book Video Call
            </Button>
            <Button 
              variant="outline"
              leftSection={<IconMessageCircle size={16} />}
              flex={1}
              onClick={() => router.push('/chat/session-123')}
            >
              Send Message
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Calendar Modal */}
      <Modal
        opened={showCalendar}
        onClose={() => setShowCalendar(false)}
        title="Select a Date & Time"
        size="lg"
      >
        <Stack gap="md">
          <Paper p="lg" withBorder radius="md" ta="center">
            <Text size="sm" c="dimmed">
              Calendar integration coming soon. For now, please use the messaging feature to schedule your session.
            </Text>
          </Paper>
          <Group justify="center">
            <Button onClick={() => setShowCalendar(false)}>
              Close
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Booking Modal */}
      <BookingModal
        opened={showBookingModal}
        onClose={() => setShowBookingModal(false)}
        onBookingComplete={() => {
          // Navigate to chat page after booking
          router.push('/chat/session-123');
        }}
      />
    </Stack>
  );
};

export default function ProfilePage() {
    const id = 'mentor-1'

    const profile = mockProfiles[id];

  if (!profile) {
    return (
      <Container size="md" py="xl">
        <Paper p="xl" ta="center">
          <Text size="lg">Profile not found</Text>
        </Paper>
      </Container>
    );
  }

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card shadow="md" padding="xl" radius="md" withBorder>
            <Grid>
              <Grid.Col span={{ base: 12, md: 8 }}>
                <Group gap="lg" align="flex-start">
                  <Avatar
                    src={profile.avatar}
                    size={120}
                    radius="md"
                    alt={profile.name}
                  />
                  
                  <Stack gap="sm" flex={1}>
                    <div>
                      <Group gap="sm" align="center">
                        <Title order={1} size="h2">
                          {profile.name}
                        </Title>
                        {profile.type === 'mentor' && profile.rating >= 4.5 && (
                          <IconShieldCheck size={24} className="text-blue-500" />
                        )}
                      </Group>
                      
                      {profile.type === 'mentor' && (
                        <Text size="lg" c="dimmed" fw={500}>
                          {profile.title}
                        </Text>
                      )}
                      
                      <Group gap="lg" mt="xs">
                        <Group gap={4}>
                          <IconMapPin size={16} className="text-gray-500" />
                          <Text size="sm" c="dimmed">{profile.location}</Text>
                        </Group>
                        <Text size="sm" c="dimmed">{profile.joinedDate}</Text>
                      </Group>
                    </div>

                    <Text size="md" c="dark" lineClamp={3}>
                      {profile.bio}
                    </Text>

                    {profile.type === 'mentor' && (
                      <Group gap="lg" mt="sm">
                        <Group gap="xs">
                          <IconStar size={16} className="text-yellow-500" />
                          <Text size="sm" fw={500}>
                            {profile.rating} ({profile.sessionsCompleted} sessions)
                          </Text>
                        </Group>
                        <Group gap="xs">
                          <IconUsers size={16} className="text-purple-500" />
                          <Text size="sm" fw={500}>
                            {profile.menteesHelped} mentees helped
                          </Text>
                        </Group>
                      </Group>
                    )}
                  </Stack>
                </Group>
              </Grid.Col>

              <Grid.Col span={{ base: 12, md: 4 }}>
                <Stack gap="sm" align="flex-end">
                  <Badge 
                    color={profile.type === 'mentor' && profile.availability === 'Available' ? 'green' : 'blue'}
                    variant="light"
                    size="lg"
                  >
                    {profile.type === 'mentor' ? profile.availability : 'Advice Seeker'}
                  </Badge>
                  
                  <Group gap="xs">
                    <ActionIcon variant="light" size="lg">
                      <IconHeart size={18} />
                    </ActionIcon>
                    <ActionIcon variant="light" size="lg">
                      <IconShare size={18} />
                    </ActionIcon>
                  </Group>
                </Stack>
              </Grid.Col>
            </Grid>
          </Card>
        </motion.div>

        {/* Profile Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {profile.type === 'seeker' ? (
            <SeekerProfile profile={profile} />
          ) : (
            <MentorProfile profile={profile} />
          )}
        </motion.div>
      </Stack>
    </Container>
  );
} 