'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
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
  Select,
  TextInput,
  MultiSelect,
  Title,
  Divider,
  Paper
} from '@mantine/core';
import { 
  IconSearch, 
  IconFilter, 
  IconStar, 
  IconCalendarEvent,
  IconMail,
  IconMapPin,
  IconShieldCheck
} from '@tabler/icons-react';

// Mock data for mentors
const mockMentors = [
  {
    id: 1,
    name: 'Dr. Sarah Chen',
    profilePicture: '/images/user.jpg',
    tags: ['UPSC', 'Civil Services', 'Public Policy'],
    experience: '8 yrs in Civil Services · IAS Officer · From JNU',
    rating: 4.9,
    sessionsCompleted: 250,
    languages: ['English', 'Hindi'],
    availability: 'Available',
    isPaid: true,
    hourlyRate: 2000,
    topics: ['UPSC', 'Civil Services'],
    location: 'Delhi, India'
  },
  {
    id: 2,
    name: 'Rajesh Kumar',
    profilePicture: '/images/user.jpg',
    tags: ['WebDev', 'React', 'JavaScript'],
    experience: '5 yrs in IT · Senior Developer at Google · From IIT Delhi',
    rating: 4.8,
    sessionsCompleted: 180,
    languages: ['English', 'Hindi', 'Tamil'],
    availability: 'Busy',
    isPaid: false,
    topics: ['Web Development', 'Programming'],
    location: 'Bangalore, India'
  },
  {
    id: 3,
    name: 'Priya Sharma',
    profilePicture: '/images/user.jpg',
    tags: ['StudyAbroad', 'MBA', 'Consulting'],
    experience: '6 yrs in Consulting · MBA from Wharton · Ex-McKinsey',
    rating: 4.9,
    sessionsCompleted: 320,
    languages: ['English', 'Hindi'],
    availability: 'Available',
    isPaid: true,
    hourlyRate: 3500,
    topics: ['MBA', 'Study Abroad', 'Consulting'],
    location: 'Mumbai, India'
  },
  {
    id: 4,
    name: 'Amit Patel',
    profilePicture: '/images/user.jpg',
    tags: ['Finance', 'CA', 'Investment'],
    experience: '7 yrs in Finance · CA · VP at Goldman Sachs',
    rating: 4.7,
    sessionsCompleted: 195,
    languages: ['English', 'Gujarati', 'Hindi'],
    availability: 'Available',
    isPaid: true,
    hourlyRate: 2800,
    topics: ['Finance', 'CA', 'Investment Banking'],
    location: 'Mumbai, India'
  },
  {
    id: 5,
    name: 'Neha Gupta',
    profilePicture: '/images/user.jpg',
    tags: ['GATE', 'Engineering', 'Research'],
    experience: '4 yrs in Research · PhD from IISc · GATE AIR 15',
    rating: 4.8,
    sessionsCompleted: 120,
    languages: ['English', 'Hindi'],
    availability: 'Available',
    isPaid: false,
    topics: ['GATE', 'Engineering', 'Research'],
    location: 'Bangalore, India'
  },
  {
    id: 6,
    name: 'Arjun Singh',
    profilePicture: '/images/user.jpg',
    tags: ['Startup', 'Entrepreneurship', 'Business'],
    experience: '10 yrs Entrepreneur · Founded 3 startups · From BITS Pilani',
    rating: 4.6,
    sessionsCompleted: 85,
    languages: ['English', 'Hindi', 'Punjabi'],
    availability: 'Available',
    isPaid: true,
    hourlyRate: 4000,
    topics: ['Entrepreneurship', 'Startup', 'Business Development'],
    location: 'Gurgaon, India'
  }
];

interface Mentor {
  id: number;
  name: string;
  profilePicture: string;
  tags: string[];
  experience: string;
  rating: number;
  sessionsCompleted: number;
  languages: string[];
  availability: string;
  isPaid: boolean;
  hourlyRate?: number;
  topics: string[];
  location: string;
}

const MentorCard = ({ mentor }: { mentor: Mentor }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      <Card 
        shadow="md" 
        padding="lg" 
        radius="md" 
        withBorder
        className="h-full hover:shadow-xl transition-shadow duration-300"
      >
        <Stack gap="md">
          {/* Profile Header */}
          <Group gap="md">
            <Avatar
              src={mentor.profilePicture}
              size={60}
              radius="md"
              alt={mentor.name}
            />
            <div className="flex-1">
              <Group gap="xs" align="center">
                <Link href={`/profile/mentor-1`} style={{ textDecoration: 'none' }}>
                  <Text fw={600} size="lg" lineClamp={1} className="hover:text-blue-600 cursor-pointer transition-colors">
                    {mentor.name}
                  </Text>
                </Link>
                {mentor.rating >= 4.5 && (
                  <IconShieldCheck size={18} className="text-blue-500" />
                )}
              </Group>
              <Group gap="xs" mt={4}>
                <IconStar size={14} className="text-yellow-500" />
                <Text size="sm" c="dimmed">
                  {mentor.rating} ({mentor.sessionsCompleted} sessions)
                </Text>
              </Group>
            </div>
            <div className="text-right">
              <Badge 
                color={mentor.availability === 'Available' ? 'green' : 'orange'}
                variant="light"
                size="sm"
              >
                {mentor.availability}
              </Badge>
              {mentor.isPaid && (
                <Text size="xs" c="dimmed" mt={4}>
                  ₹{mentor.hourlyRate}/hr
                </Text>
              )}
            </div>
          </Group>

          {/* Tags */}
          <Group gap="xs">
            {mentor.tags.map((tag: string, index: number) => (
              <Badge 
                key={index}
                variant="light"
                size="sm"
                color="blue"
              >
                #{tag}
              </Badge>
            ))}
          </Group>

          {/* Experience */}
          <Text size="sm" c="dimmed" lineClamp={2}>
            {mentor.experience}
          </Text>

          {/* Location and languages */}
          <Group gap="lg" className="text-xs text-gray-500">
            <Group gap={4}>
              <IconMapPin size={14} />
              <Text size="xs">{mentor.location}</Text>
            </Group>
            <Group gap={4}>
              <Text size="xs">{mentor.languages.join(', ')}</Text>
            </Group>
          </Group>

          <Divider />

          {/* Action Buttons */}
          <Group gap="sm">
            <Link href={`/profile/mentor-1`} style={{ textDecoration: 'none', flex: 1 }}>
              <Button 
                variant="outline" 
                size="sm" 
                fullWidth
                leftSection={<IconMail size={16} />}
              >
                View Profile
              </Button>
            </Link>
            <Button 
              size="sm" 
              flex={1}
              leftSection={<IconCalendarEvent size={16} />}
              disabled={mentor.availability !== 'Available'}
            >
              Book Session
            </Button>
          </Group>
        </Stack>
      </Card>
    </motion.div>
  );
};

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [availabilityFilter, setAvailabilityFilter] = useState<string | null>(null);
  const [paidFilter, setPaidFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  const topicOptions = [
    'UPSC', 'Web Development', 'MBA', 'Study Abroad', 'Finance', 'CA', 
    'Engineering', 'GATE', 'Civil Services', 'Startup', 'Entrepreneurship'
  ];

  const skillOptions = [
    'React', 'JavaScript', 'Python', 'Consulting', 'Investment Banking',
    'Research', 'Public Policy', 'Business Development', 'Teaching'
  ];

  const languageOptions = [
    'English', 'Hindi', 'Tamil', 'Telugu', 'Bengali', 'Marathi', 'Gujarati', 'Punjabi'
  ];

  const filteredMentors = mockMentors.filter(mentor => {
    const matchesSearch = mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.experience.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         mentor.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesTopics = selectedTopics.length === 0 || 
                         selectedTopics.some(topic => mentor.topics.some(mentorTopic => 
                           mentorTopic.toLowerCase().includes(topic.toLowerCase())));
    
    const matchesSkills = selectedSkills.length === 0 ||
                         selectedSkills.some(skill => mentor.tags.some(tag =>
                           tag.toLowerCase().includes(skill.toLowerCase())));
    
    const matchesLanguages = selectedLanguages.length === 0 ||
                            selectedLanguages.some(lang => mentor.languages.includes(lang));
    
    const matchesAvailability = !availabilityFilter || mentor.availability === availabilityFilter;
    
    const matchesPaid = paidFilter === null || 
                       (paidFilter === 'paid' && mentor.isPaid) ||
                       (paidFilter === 'free' && !mentor.isPaid);

    return matchesSearch && matchesTopics && matchesSkills && matchesLanguages && 
           matchesAvailability && matchesPaid;
  });

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <div className="text-center">
          <Title order={1} size="h1" fw={700} mb="md">
            Browse Mentors & Career Guides
          </Title>
          <Text size="lg" c="dimmed" maw={600} mx="auto">
            Connect with experienced professionals and get personalized career guidance
          </Text>
        </div>

        {/* Search and Filters */}
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Stack gap="md">
            <Group gap="md" align="flex-end">
              <TextInput
                placeholder="Search mentors, skills, or topics..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.currentTarget.value)}
                leftSection={<IconSearch size={16} />}
                flex={1}
                size="md"
              />
              <Button
                variant={showFilters ? 'filled' : 'outline'}
                leftSection={<IconFilter size={16} />}
                onClick={() => setShowFilters(!showFilters)}
                size="md"
              >
                Filters
              </Button>
            </Group>

            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Divider my="md" />
                <Grid>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <MultiSelect
                      label="Topics"
                      placeholder="Select topics"
                      data={topicOptions}
                      value={selectedTopics}
                      onChange={setSelectedTopics}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <MultiSelect
                      label="Skills"
                      placeholder="Select skills"
                      data={skillOptions}
                      value={selectedSkills}
                      onChange={setSelectedSkills}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <MultiSelect
                      label="Languages"
                      placeholder="Select languages"
                      data={languageOptions}
                      value={selectedLanguages}
                      onChange={setSelectedLanguages}
                      searchable
                      clearable
                    />
                  </Grid.Col>
                  <Grid.Col span={{ base: 12, md: 6, lg: 3 }}>
                    <Select
                      label="Availability"
                      placeholder="Any"
                      data={['Available', 'Busy']}
                      value={availabilityFilter}
                      onChange={setAvailabilityFilter}
                      clearable
                    />
                  </Grid.Col>
                </Grid>
                <Group mt="md">
                  <Text size="sm" fw={500}>Session Type:</Text>
                  <Button.Group>
                    <Button
                      variant={paidFilter === null ? 'filled' : 'outline'}
                      onClick={() => setPaidFilter(null)}
                      size="xs"
                    >
                      All
                    </Button>
                    <Button
                      variant={paidFilter === 'free' ? 'filled' : 'outline'}
                      onClick={() => setPaidFilter('free')}
                      size="xs"
                    >
                      Free
                    </Button>
                    <Button
                      variant={paidFilter === 'paid' ? 'filled' : 'outline'}
                      onClick={() => setPaidFilter('paid')}
                      size="xs"
                    >
                      Paid
                    </Button>
                  </Button.Group>
                </Group>
              </motion.div>
            )}
          </Stack>
        </Paper>

        {/* Results */}
        <div>
          <Group justify="space-between" mb="md">
            <Text size="lg" fw={500}>
              {filteredMentors.length} mentors found
            </Text>
          </Group>

          <Grid>
            {filteredMentors.map((mentor) => (
              <Grid.Col key={mentor.id} span={{ base: 12, md: 6, lg: 4 }}>
                <MentorCard mentor={mentor} />
              </Grid.Col>
            ))}
          </Grid>

          {filteredMentors.length === 0 && (
            <Paper p="xl" ta="center" c="dimmed">
              <Text size="lg" mb="md">No mentors found</Text>
              <Text size="sm">Try adjusting your search criteria or filters</Text>
            </Paper>
          )}
        </div>
      </Stack>
    </Container>
  );
} 