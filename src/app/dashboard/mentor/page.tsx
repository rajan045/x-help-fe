'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Container, 
  Grid, 
  Card, 
  Text, 
  Button, 
  Stack, 
  Group, 
  Avatar, 
  Badge, 
  Paper, 
  Title, 
  Divider,
  Modal,
  Select,
  Switch,
  NumberInput,
  ActionIcon,
  Menu,
  Alert,
  Tabs,
  Rating,
  Anchor
} from '@mantine/core';
import { 
  IconCurrencyRupee, 
  IconCalendarEvent, 
  IconStar, 
  IconClock, 
  IconTrendingUp,
  IconUsers,
  IconVideo,
  IconSettings,
  IconDownload,
  IconDots,
  IconBell,
  IconMessageCircle,
  IconX,
  IconCalendar
} from '@tabler/icons-react';

// Mock data
const mentorProfile = {
  id: 'mentor-1',
  name: 'Dr. Anjali Gupta',
  avatar: '/images/user.jpg',
  title: 'Senior Product Manager at Microsoft',
  rating: 4.9,
  totalSessions: 156,
  totalEarnings: 425000,
  currentMonthEarnings: 85000,
  availableBalance: 12500,
  mentorSince: 'January 2023'
};

const earningsData = {
  thisMonth: 85000,
  lastMonth: 75000,
  thisYear: 425000,
  pendingPayouts: 12500,
  totalWithdrawn: 380000,
  averageSessionRate: 2500,
  monthlyGrowth: 13.3
};

const upcomingSessions = [
  {
    id: 'session-1',
    menteeId: 'user-1',
    menteeName: 'Rahul Sharma',
    menteeAvatar: '/images/user.jpg',
    topic: 'Product Management Career Transition',
    scheduledTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    duration: 45,
    type: 'video',
    status: 'confirmed',
    earnings: 1875,
    menteeMessage: 'Looking forward to discussing my transition from engineering to PM!'
  },
  {
    id: 'session-2',
    menteeId: 'user-2',
    menteeName: 'Priya Patel',
    menteeAvatar: '/images/user.jpg',
    topic: 'Resume Review & Interview Prep',
    scheduledTime: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
    duration: 60,
    type: 'video',
    status: 'confirmed',
    earnings: 2500,
    menteeMessage: 'Need help preparing for upcoming PM interviews at tech companies.'
  },
  {
    id: 'session-3',
    menteeId: 'user-3',
    menteeName: 'Arjun Singh',
    menteeAvatar: '/images/user.jpg',
    topic: 'Startup Strategy Discussion',
    scheduledTime: new Date(Date.now() + 48 * 60 * 60 * 1000), // Day after tomorrow
    duration: 30,
    type: 'audio',
    status: 'pending',
    earnings: 1250,
    menteeMessage: 'Want to validate my startup idea and discuss go-to-market strategy.'
  }
];

const recentReviews = [
  {
    id: 'review-1',
    menteeId: 'user-4',
    menteeName: 'Meera Reddy',
    menteeAvatar: '/images/user.jpg',
    rating: 5,
    review: 'Anjali was incredibly helpful! Her insights into product strategy were exactly what I needed. She provided actionable advice and was very patient with my questions.',
    sessionTopic: 'Product Strategy & Roadmapping',
    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    sessionDuration: 60,
    helpful: true
  },
  {
    id: 'review-2',
    menteeId: 'user-5',
    menteeName: 'Vikram Kumar',
    menteeAvatar: '/images/user.jpg',
    rating: 5,
    review: 'Amazing session! Anjali helped me understand the nuances of working with engineering teams. Her real-world examples were super valuable.',
    sessionTopic: 'Team Leadership & Collaboration',
    date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    sessionDuration: 45,
    helpful: true
  },
  {
    id: 'review-3',
    menteeId: 'user-6',
    menteeName: 'Sneha Joshi',
    menteeAvatar: '/images/user.jpg',
    rating: 4,
    review: 'Great session overall. Anjali provided good guidance on career progression. Would have liked more specific examples for my industry.',
    sessionTopic: 'Career Growth Planning',
    date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    sessionDuration: 30,
    helpful: true
  }
];

const availabilitySlots = [
  { day: 'Monday', slots: ['09:00', '10:00', '14:00', '15:00', '16:00'] },
  { day: 'Tuesday', slots: ['09:00', '10:00', '14:00', '15:00'] },
  { day: 'Wednesday', slots: ['10:00', '11:00', '16:00', '17:00'] },
  { day: 'Thursday', slots: ['09:00', '14:00', '15:00', '16:00'] },
  { day: 'Friday', slots: ['10:00', '11:00', '14:00', '15:00'] },
  { day: 'Saturday', slots: ['10:00', '11:00'] },
  { day: 'Sunday', slots: [] }
];

export default function MentorDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [withdrawMethod, setWithdrawMethod] = useState('bank');
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [availability, setAvailability] = useState(availabilitySlots);
  const [autoAcceptSessions, setAutoAcceptSessions] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  const handleWithdraw = () => {
    // Handle withdrawal logic
    setShowWithdrawModal(false);
    setWithdrawAmount(0);
  };

  const updateAvailability = (dayIndex: number, newSlots: string[]) => {
    const updatedAvailability = [...availability];
    updatedAvailability[dayIndex].slots = newSlots;
    setAvailability(updatedAvailability);
  };

  const EarningsCard = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <IconCurrencyRupee size={24} className="text-green-600" />
            <Title order={3}>Earnings Overview</Title>
          </Group>
          <Button 
            variant="light" 
            leftSection={<IconDownload size={16} />}
            size="sm"
          >
            Export
          </Button>
        </Group>

        <Grid>
          <Grid.Col span={6}>
            <Paper p="md" bg="green.0" radius="md">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">This Month</Text>
                <Text fw={700} size="xl" c="green.7">
                  ₹{earningsData.thisMonth.toLocaleString()}
                </Text>
                <Group gap="xs">
                  <IconTrendingUp size={16} className="text-green-600" />
                  <Text size="sm" c="green.7">+{earningsData.monthlyGrowth}% from last month</Text>
                </Group>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={6}>
            <Paper p="md" bg="blue.0" radius="md">
              <Stack gap="xs">
                <Text size="sm" c="dimmed">Available to Withdraw</Text>
                <Text fw={700} size="xl" c="blue.7">
                  ₹{earningsData.pendingPayouts.toLocaleString()}
                </Text>
                <Button 
                  size="xs" 
                  onClick={() => setShowWithdrawModal(true)}
                  disabled={earningsData.pendingPayouts === 0}
                >
                  Withdraw
                </Button>
              </Stack>
            </Paper>
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack gap="xs" ta="center">
              <Text size="sm" c="dimmed">Total Earned</Text>
              <Text fw={600} size="lg">₹{earningsData.thisYear.toLocaleString()}</Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack gap="xs" ta="center">
              <Text size="sm" c="dimmed">Avg. Session Rate</Text>
              <Text fw={600} size="lg">₹{earningsData.averageSessionRate}</Text>
            </Stack>
          </Grid.Col>

          <Grid.Col span={4}>
            <Stack gap="xs" ta="center">
              <Text size="sm" c="dimmed">Sessions Completed</Text>
              <Text fw={600} size="lg">{mentorProfile.totalSessions}</Text>
            </Stack>
          </Grid.Col>
        </Grid>
      </Stack>
    </Card>
  );

  const UpcomingSessionsCard = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <IconCalendarEvent size={24} className="text-blue-600" />
            <Title order={3}>Upcoming Sessions</Title>
          </Group>
          <Badge variant="light" color="blue">
            {upcomingSessions.length} sessions
          </Badge>
        </Group>

        <Stack gap="sm">
          {upcomingSessions.map((session) => (
            <Paper key={session.id} p="md" withBorder radius="md">
              <Group justify="space-between" align="flex-start">
                <Group gap="md" align="flex-start">
                  <Avatar src={session.menteeAvatar} size={40} radius="md" />
                  <Stack gap="xs" flex={1}>
                    <Group gap="sm">
                      <Text fw={600}>{session.menteeName}</Text>
                      <Badge 
                        size="xs" 
                        color={session.status === 'confirmed' ? 'green' : 'orange'}
                      >
                        {session.status}
                      </Badge>
                    </Group>
                    <Text size="sm" fw={500} c="dark">{session.topic}</Text>
                    <Text size="sm" c="dimmed" lineClamp={2}>
                      &quot;{session.menteeMessage}&quot;
                    </Text>
                    <Group gap="md">
                      <Group gap="xs">
                        <IconCalendar size={14} />
                        <Text size="xs" c="dimmed">
                          {session.scheduledTime.toLocaleDateString()}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconClock size={14} />
                        <Text size="xs" c="dimmed">
                          {session.scheduledTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </Text>
                      </Group>
                      <Group gap="xs">
                        <IconClock size={14} />
                        <Text size="xs" c="dimmed">{session.duration} min</Text>
                      </Group>
                    </Group>
                  </Stack>
                </Group>

                <Stack gap="xs" align="flex-end">
                  <Text fw={600} c="green.7">₹{session.earnings}</Text>
                  <Group gap="xs">
                    {session.type === 'video' && <IconVideo size={16} />}
                    {session.type === 'audio' && <IconMessageCircle size={16} />}
                    <Menu shadow="md">
                      <Menu.Target>
                        <ActionIcon variant="light" size="sm">
                          <IconDots size={14} />
                        </ActionIcon>
                      </Menu.Target>
                      <Menu.Dropdown>
                        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
                          Message Mentee
                        </Menu.Item>
                        <Menu.Item leftSection={<IconCalendar size={14} />}>
                          Reschedule
                        </Menu.Item>
                        <Menu.Item leftSection={<IconX size={14} />} color="red">
                          Cancel Session
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Stack>
              </Group>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Card>
  );

  const ReviewsCard = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <IconStar size={24} className="text-yellow-600" />
            <Title order={3}>Recent Reviews</Title>
          </Group>
          <Group gap="sm">
            <Badge variant="light" color="yellow">
              {mentorProfile.rating} ★ Rating
            </Badge>
            <Anchor size="sm">View All</Anchor>
          </Group>
        </Group>

        <Stack gap="md">
          {recentReviews.map((review) => (
            <Paper key={review.id} p="md" withBorder radius="md">
              <Stack gap="sm">
                <Group justify="space-between">
                  <Group gap="md">
                    <Avatar src={review.menteeAvatar} size={32} radius="md" />
                    <div>
                      <Text fw={600} size="sm">{review.menteeName}</Text>
                      <Text size="xs" c="dimmed">
                        {review.date.toLocaleDateString()} • {review.sessionTopic}
                      </Text>
                    </div>
                  </Group>
                  <Rating value={review.rating} readOnly size="sm" />
                </Group>
                
                <Text size="sm" c="dark">
                  &quot;{review.review}&quot;
                </Text>
                
                <Group justify="space-between" align="center">
                  <Group gap="xs">
                    <Badge size="xs" variant="outline">
                      {review.sessionDuration} min session
                    </Badge>
                    {review.helpful && (
                      <Badge size="xs" color="green" variant="light">
                        Helpful
                      </Badge>
                    )}
                  </Group>
                  <Button variant="subtle" size="xs" leftSection={<IconMessageCircle size={12} />}>
                    Reply
                  </Button>
                </Group>
              </Stack>
            </Paper>
          ))}
        </Stack>
      </Stack>
    </Card>
  );

  const AvailabilityCard = () => (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Stack gap="md">
        <Group justify="space-between">
          <Group gap="sm">
            <IconSettings size={24} className="text-purple-600" />
            <Title order={3}>Availability Settings</Title>
          </Group>
          <Button 
            variant="light" 
            size="sm"
            onClick={() => setShowAvailabilityModal(true)}
          >
            Edit Schedule
          </Button>
        </Group>

        <Stack gap="md">
          <Group justify="space-between">
            <div>
              <Text fw={500}>Auto-accept session requests</Text>
              <Text size="sm" c="dimmed">
                Automatically confirm sessions that match your availability
              </Text>
            </div>
            <Switch
              checked={autoAcceptSessions}
              onChange={(e) => setAutoAcceptSessions(e.currentTarget.checked)}
            />
          </Group>

          <Group justify="space-between">
            <div>
              <Text fw={500}>Email notifications</Text>
              <Text size="sm" c="dimmed">
                Get notified about new session requests and updates
              </Text>
            </div>
            <Switch
              checked={emailNotifications}
              onChange={(e) => setEmailNotifications(e.currentTarget.checked)}
            />
          </Group>

          <Divider />

          <div>
            <Text fw={500} mb="sm">Weekly Schedule</Text>
            <Stack gap="xs">
              {availability.map((day) => (
                <Group key={day.day} justify="space-between">
                  <Text size="sm" fw={500} w={100}>
                    {day.day}
                  </Text>
                  <Group gap="xs" flex={1}>
                    {day.slots.length === 0 ? (
                      <Text size="sm" c="dimmed">Not available</Text>
                    ) : (
                      day.slots.map((slot, slotIndex) => (
                        <Badge key={slotIndex} size="sm" variant="light">
                          {slot}
                        </Badge>
                      ))
                    )}
                  </Group>
                </Group>
              ))}
            </Stack>
          </div>
        </Stack>
      </Stack>
    </Card>
  );

  return (
    <Container size="xl" py="xl">
      <Stack gap="xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Group justify="space-between" align="flex-start">
            <Group gap="lg">
              <Avatar src={mentorProfile.avatar} size={80} radius="md" />
              <Stack gap="xs">
                <Title order={1}>Welcome back, {mentorProfile.name}!</Title>
                <Text c="dimmed" size="lg">{mentorProfile.title}</Text>
                <Group gap="md">
                  <Badge leftSection={<IconStar size={12} />} color="yellow">
                    {mentorProfile.rating} Rating
                  </Badge>
                  <Badge leftSection={<IconUsers size={12} />} color="blue">
                    {mentorProfile.totalSessions} Sessions
                  </Badge>
                  <Text size="sm" c="dimmed">
                    Mentor since {mentorProfile.mentorSince}
                  </Text>
                </Group>
              </Stack>
            </Group>
            
            <Group gap="sm">
              <Button leftSection={<IconBell size={16} />} variant="light">
                Notifications
              </Button>
              <Button leftSection={<IconSettings size={16} />} variant="outline">
                Settings
              </Button>
            </Group>
          </Group>
        </motion.div>

        {/* Main Content */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'overview')}>
          <Tabs.List>
            <Tabs.Tab value="overview">Overview</Tabs.Tab>
            <Tabs.Tab value="sessions">Sessions</Tabs.Tab>
            <Tabs.Tab value="earnings">Earnings</Tabs.Tab>
            <Tabs.Tab value="reviews">Reviews</Tabs.Tab>
            <Tabs.Tab value="settings">Settings</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="overview" pt="xl">
            <Grid>
              <Grid.Col span={{ base: 12, lg: 8 }}>
                <Stack gap="lg">
                  <EarningsCard />
                  <UpcomingSessionsCard />
                </Stack>
              </Grid.Col>
              <Grid.Col span={{ base: 12, lg: 4 }}>
                <Stack gap="lg">
                  <ReviewsCard />
                  <AvailabilityCard />
                </Stack>
              </Grid.Col>
            </Grid>
          </Tabs.Panel>

          <Tabs.Panel value="sessions" pt="xl">
            <UpcomingSessionsCard />
          </Tabs.Panel>

          <Tabs.Panel value="earnings" pt="xl">
            <EarningsCard />
          </Tabs.Panel>

          <Tabs.Panel value="reviews" pt="xl">
            <ReviewsCard />
          </Tabs.Panel>

          <Tabs.Panel value="settings" pt="xl">
            <AvailabilityCard />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      {/* Withdraw Modal */}
      <Modal
        opened={showWithdrawModal}
        onClose={() => setShowWithdrawModal(false)}
        title="Withdraw Earnings"
        centered
      >
        <Stack gap="md">
          <Alert color="blue">
            <Text size="sm">
              Available balance: ₹{earningsData.pendingPayouts.toLocaleString()}
            </Text>
          </Alert>

          <NumberInput
            label="Withdrawal Amount"
            placeholder="Enter amount"
            value={withdrawAmount}
            onChange={(value) => setWithdrawAmount(Number(value))}
            min={100}
            max={earningsData.pendingPayouts}
            leftSection={<IconCurrencyRupee size={16} />}
          />

          <Select
            label="Withdrawal Method"
            data={[
              { value: 'bank', label: 'Bank Transfer (2-3 business days)' },
              { value: 'upi', label: 'UPI (Instant)' },
              { value: 'wallet', label: 'Digital Wallet' }
            ]}
            value={withdrawMethod}
            onChange={(value) => setWithdrawMethod(value || 'bank')}
          />

          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowWithdrawModal(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleWithdraw}
              disabled={withdrawAmount === 0 || withdrawAmount > earningsData.pendingPayouts}
            >
              Withdraw ₹{withdrawAmount}
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Availability Modal */}
      <Modal
        opened={showAvailabilityModal}
        onClose={() => setShowAvailabilityModal(false)}
        title="Edit Availability"
        size="lg"
        centered
      >
        <Stack gap="md">
          <Text size="sm" c="dimmed">
            Set your available time slots for each day of the week.
          </Text>
          
          {availability.map((day, dayIndex) => (
            <Paper key={day.day} p="md" withBorder>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text fw={500}>{day.day}</Text>
                  <Group gap="xs">
                    <Button 
                      size="xs" 
                      variant="light"
                      onClick={() => {
                        const newSlots = [...day.slots, '09:00'];
                        updateAvailability(dayIndex, newSlots);
                      }}
                    >
                      Add Slot
                    </Button>
                  </Group>
                </Group>
                
                <Group gap="xs">
                  {day.slots.map((slot, slotIndex) => (
                    <Badge 
                      key={slotIndex}
                      variant="light"
                      rightSection={
                        <ActionIcon 
                          size="xs" 
                          color="red" 
                          variant="transparent"
                          onClick={() => {
                            const newSlots = day.slots.filter((_, i) => i !== slotIndex);
                            updateAvailability(dayIndex, newSlots);
                          }}
                        >
                          <IconX size={10} />
                        </ActionIcon>
                      }
                    >
                      {slot}
                    </Badge>
                  ))}
                  {day.slots.length === 0 && (
                    <Text size="sm" c="dimmed">No slots available</Text>
                  )}
                </Group>
              </Stack>
            </Paper>
          ))}

          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowAvailabilityModal(false)}>
              Cancel
            </Button>
            <Button onClick={() => setShowAvailabilityModal(false)}>
              Save Changes
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 