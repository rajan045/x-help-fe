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
  Modal,
  TextInput,
  Textarea,
  Switch,
  MultiSelect,
  ActionIcon,
  Alert,
  Tabs,
  FileInput,
  NumberInput,
  PasswordInput
} from '@mantine/core';
import { 
  IconUser, 
  IconBell, 
  IconShield, 
  IconTrash, 
  IconEdit,
  IconCamera,
  IconMail,
  IconPhone,
  IconMapPin,
  IconBriefcase,
  IconSchool,
  IconHeart,
  IconCheck,
  IconAlertTriangle,
  IconUpload,
  IconBrandLinkedin,
  IconBrandGithub,
  IconBrandTwitter,
  IconWorld,
  IconLock
} from '@tabler/icons-react';

// Mock user data
const currentUser = {
  id: 'user-1',
  name: 'Rahul Sharma',
  email: 'rahul.sharma@email.com',
  phone: '+91 98765 43210',
  avatar: '/images/user.jpg',
  bio: 'Aspiring Product Manager with 3+ years of software engineering experience. Looking to transition into product management and learn from experienced professionals.',
  location: 'Bangalore, India',
  profession: 'Software Engineer',
  company: 'Tech Solutions Inc.',
  education: 'B.Tech Computer Science, IIT Delhi',
  experience: '3 years',
  linkedin: 'https://linkedin.com/in/rahulsharma',
  github: 'https://github.com/rahulsharma',
  twitter: 'https://twitter.com/rahulsharma',
  website: '',
  interests: ['Product Management', 'UI/UX Design', 'Data Analytics', 'Entrepreneurship'],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'SQL', 'Product Strategy'],
  userType: 'seeker', // 'seeker' or 'mentor'
  mentorRate: 0,
  verified: true
};

const availableInterests = [
  'Product Management', 'Software Engineering', 'Data Science', 'UI/UX Design',
  'Marketing', 'Sales', 'Finance', 'Consulting', 'Entrepreneurship', 'Startup',
  'Data Analytics', 'Machine Learning', 'AI', 'Blockchain', 'DevOps',
  'Cloud Computing', 'Cybersecurity', 'Digital Marketing', 'Content Writing',
  'Graphic Design', 'Business Development', 'HR', 'Operations', 'Strategy'
];

const availableSkills = [
  // Technical Skills
  'JavaScript', 'Python', 'Java', 'React', 'Node.js', 'Angular', 'Vue.js',
  'SQL', 'MongoDB', 'PostgreSQL', 'AWS', 'Docker', 'Kubernetes', 'Git',
  'TypeScript', 'PHP', 'Ruby', 'Go', 'Rust', 'Swift', 'Kotlin',
  
  // Business Skills
  'Product Strategy', 'Project Management', 'Agile', 'Scrum', 'Leadership',
  'Team Management', 'Strategic Planning', 'Business Analysis', 'Market Research',
  'Financial Analysis', 'Budgeting', 'Negotiation', 'Communication',
  
  // Design Skills
  'Figma', 'Sketch', 'Adobe Creative Suite', 'Wireframing', 'Prototyping',
  'User Research', 'Information Architecture', 'Visual Design',
  
  // Marketing Skills
  'SEO', 'SEM', 'Social Media Marketing', 'Content Strategy', 'Email Marketing',
  'Google Analytics', 'Facebook Ads', 'LinkedIn Marketing'
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [user, setUser] = useState(currentUser);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [deleteConfirmation, setDeleteConfirmation] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [newPasswordVisible, setNewPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  
  // Form states
  const [profileForm, setProfileForm] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
    bio: user.bio,
    location: user.location,
    profession: user.profession,
    company: user.company,
    education: user.education,
    experience: user.experience,
    linkedin: user.linkedin,
    github: user.github,
    twitter: user.twitter,
    website: user.website
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    emailNotifications: true,
    pushNotifications: true,
    sessionReminders: true,
    messageNotifications: true,
    marketingEmails: false,
    weeklyDigest: true,
    mentorUpdates: true,
    systemUpdates: true
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleProfileUpdate = () => {
    setUser({ ...user, ...profileForm });
    // Here you would typically make an API call to update the profile
  };

  const handleInterestsUpdate = (newInterests: string[]) => {
    setUser({ ...user, interests: newInterests });
  };

  const handleSkillsUpdate = (newSkills: string[]) => {
    setUser({ ...user, skills: newSkills });
  };

  const handleNotificationUpdate = (key: string, value: boolean) => {
    setNotificationPrefs({ ...notificationPrefs, [key]: value });
  };

  const handlePasswordChange = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    // Here you would typically make an API call to change the password
    setShowPasswordModal(false);
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  const handleDeleteAccount = () => {
    if (deleteConfirmation !== 'DELETE') {
      alert('Please type DELETE to confirm');
      return;
    }
    // Here you would typically make an API call to delete the account
    alert('Account deletion initiated. You will receive a confirmation email.');
    setShowDeleteModal(false);
  };

  const ProfileTab = () => (
    <Stack gap="lg">
      {/* Profile Picture Section */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Profile Picture</Title>
          <Group align="center" gap="lg">
            <div className="relative">
              <Avatar src={user.avatar} size={120} radius="md" />
              <ActionIcon
                size="sm"
                radius="xl"
                color="blue"
                className="absolute -bottom-2 -right-2"
              >
                <IconCamera size={16} />
              </ActionIcon>
            </div>
            <Stack gap="xs">
              <Text fw={600}>{user.name}</Text>
              <Text size="sm" c="dimmed">{user.profession} at {user.company}</Text>
              <Group gap="xs">
                {user.verified && (
                  <Badge leftSection={<IconCheck size={12} />} color="green" size="sm">
                    Verified
                  </Badge>
                )}
                <Badge color="blue" size="sm" style={{ textTransform: 'capitalize' }}>
                  {user.userType}
                </Badge>
              </Group>
              <Group gap="sm">
                <FileInput
                  accept="image/*"
                  placeholder="Upload new photo"
                  size="sm"
                  leftSection={<IconUpload size={16} />}
                />
                <Button variant="outline" size="sm" color="red">
                  Remove
                </Button>
              </Group>
            </Stack>
          </Group>
        </Stack>
      </Card>

      {/* Basic Information */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Basic Information</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Full Name"
                placeholder="Enter your full name"
                value={profileForm.name}
                onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                leftSection={<IconUser size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Email"
                placeholder="Enter your email"
                value={profileForm.email}
                onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                leftSection={<IconMail size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Phone"
                placeholder="Enter your phone number"
                value={profileForm.phone}
                onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                leftSection={<IconPhone size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Location"
                placeholder="Enter your location"
                value={profileForm.location}
                onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                leftSection={<IconMapPin size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={12}>
              <Textarea
                label="Bio"
                placeholder="Tell us about yourself"
                value={profileForm.bio}
                onChange={(e) => setProfileForm({ ...profileForm, bio: e.target.value })}
                minRows={3}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      {/* Professional Information */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Professional Information</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="Profession"
                placeholder="Enter your profession"
                value={profileForm.profession}
                onChange={(e) => setProfileForm({ ...profileForm, profession: e.target.value })}
                leftSection={<IconBriefcase size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Company"
                placeholder="Enter your company"
                value={profileForm.company}
                onChange={(e) => setProfileForm({ ...profileForm, company: e.target.value })}
                leftSection={<IconBriefcase size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Education"
                placeholder="Enter your education"
                value={profileForm.education}
                onChange={(e) => setProfileForm({ ...profileForm, education: e.target.value })}
                leftSection={<IconSchool size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Experience"
                placeholder="Years of experience"
                value={profileForm.experience}
                onChange={(e) => setProfileForm({ ...profileForm, experience: e.target.value })}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      {/* Social Links */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Social Links</Title>
          <Grid>
            <Grid.Col span={6}>
              <TextInput
                label="LinkedIn"
                placeholder="LinkedIn profile URL"
                value={profileForm.linkedin}
                onChange={(e) => setProfileForm({ ...profileForm, linkedin: e.target.value })}
                leftSection={<IconBrandLinkedin size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="GitHub"
                placeholder="GitHub profile URL"
                value={profileForm.github}
                onChange={(e) => setProfileForm({ ...profileForm, github: e.target.value })}
                leftSection={<IconBrandGithub size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Twitter"
                placeholder="Twitter profile URL"
                value={profileForm.twitter}
                onChange={(e) => setProfileForm({ ...profileForm, twitter: e.target.value })}
                leftSection={<IconBrandTwitter size={16} />}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <TextInput
                label="Website"
                placeholder="Personal website URL"
                value={profileForm.website}
                onChange={(e) => setProfileForm({ ...profileForm, website: e.target.value })}
                leftSection={<IconWorld size={16} />}
              />
            </Grid.Col>
          </Grid>
        </Stack>
      </Card>

      <Group justify="flex-end">
        <Button onClick={handleProfileUpdate} leftSection={<IconCheck size={16} />}>
          Save Changes
        </Button>
      </Group>
    </Stack>
  );

  const InterestsSkillsTab = () => (
    <Stack gap="lg">
      {/* Interests */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Interests</Title>
            <Text size="sm" c="dimmed">
              Select topics you&apos;re interested in learning about
            </Text>
          </Group>
          <MultiSelect
            data={availableInterests}
            value={user.interests}
            onChange={handleInterestsUpdate}
            placeholder="Select your interests"
            searchable
            clearable
            maxValues={10}
          />
          <Group gap="xs">
            {user.interests.map((interest) => (
              <Badge key={interest} leftSection={<IconHeart size={12} />} color="pink">
                {interest}
              </Badge>
            ))}
          </Group>
        </Stack>
      </Card>

      {/* Skills */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Group justify="space-between">
            <Title order={3}>Skills</Title>
            <Text size="sm" c="dimmed">
              Add your technical and professional skills
            </Text>
          </Group>
          <MultiSelect
            data={availableSkills}
            value={user.skills}
            onChange={handleSkillsUpdate}
            placeholder="Select your skills"
            searchable
            clearable
            maxValues={20}
          />
          <div>
            <Text size="sm" fw={500} mb="xs">Your Skills:</Text>
            <Group gap="xs">
              {user.skills.map((skill) => (
                <Badge key={skill} variant="light" color="blue">
                  {skill}
                </Badge>
              ))}
            </Group>
          </div>
        </Stack>
      </Card>

      {/* User Type Specific Settings */}
      {user.userType === 'mentor' && (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
          <Stack gap="md">
            <Title order={3}>Mentor Settings</Title>
            <Group>
              <NumberInput
                label="Hourly Rate (₹)"
                value={user.mentorRate}
                onChange={(value) => setUser({ ...user, mentorRate: Number(value) })}
                min={0}
                max={10000}
                step={100}
              />
            </Group>
          </Stack>
        </Card>
      )}
    </Stack>
  );

  const NotificationsTab = () => (
    <Stack gap="lg">
      {/* Email Notifications */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Email Notifications</Title>
          <Stack gap="sm">
            <Group justify="space-between">
              <div>
                <Text fw={500}>Email Notifications</Text>
                <Text size="sm" c="dimmed">Receive notifications via email</Text>
              </div>
              <Switch
                checked={notificationPrefs.emailNotifications}
                onChange={(e) => handleNotificationUpdate('emailNotifications', e.currentTarget.checked)}
              />
            </Group>
            
            <Group justify="space-between">
              <div>
                <Text fw={500}>Session Reminders</Text>
                <Text size="sm" c="dimmed">Get reminded about upcoming sessions</Text>
              </div>
              <Switch
                checked={notificationPrefs.sessionReminders}
                onChange={(e) => handleNotificationUpdate('sessionReminders', e.currentTarget.checked)}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Message Notifications</Text>
                <Text size="sm" c="dimmed">Get notified about new messages</Text>
              </div>
              <Switch
                checked={notificationPrefs.messageNotifications}
                onChange={(e) => handleNotificationUpdate('messageNotifications', e.currentTarget.checked)}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Weekly Digest</Text>
                <Text size="sm" c="dimmed">Receive weekly summary emails</Text>
              </div>
              <Switch
                checked={notificationPrefs.weeklyDigest}
                onChange={(e) => handleNotificationUpdate('weeklyDigest', e.currentTarget.checked)}
              />
            </Group>
          </Stack>
        </Stack>
      </Card>

      {/* Push Notifications */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Push Notifications</Title>
          <Stack gap="sm">
            <Group justify="space-between">
              <div>
                <Text fw={500}>Push Notifications</Text>
                <Text size="sm" c="dimmed">Receive notifications on your device</Text>
              </div>
              <Switch
                checked={notificationPrefs.pushNotifications}
                onChange={(e) => handleNotificationUpdate('pushNotifications', e.currentTarget.checked)}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>Mentor Updates</Text>
                <Text size="sm" c="dimmed">Get updates about your mentors</Text>
              </div>
              <Switch
                checked={notificationPrefs.mentorUpdates}
                onChange={(e) => handleNotificationUpdate('mentorUpdates', e.currentTarget.checked)}
              />
            </Group>

            <Group justify="space-between">
              <div>
                <Text fw={500}>System Updates</Text>
                <Text size="sm" c="dimmed">Important platform announcements</Text>
              </div>
              <Switch
                checked={notificationPrefs.systemUpdates}
                onChange={(e) => handleNotificationUpdate('systemUpdates', e.currentTarget.checked)}
              />
            </Group>
          </Stack>
        </Stack>
      </Card>

      {/* Marketing */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Marketing & Promotions</Title>
          <Group justify="space-between">
            <div>
              <Text fw={500}>Marketing Emails</Text>
              <Text size="sm" c="dimmed">Receive promotional content and offers</Text>
            </div>
            <Switch
              checked={notificationPrefs.marketingEmails}
              onChange={(e) => handleNotificationUpdate('marketingEmails', e.currentTarget.checked)}
            />
          </Group>
        </Stack>
      </Card>
    </Stack>
  );

  const SecurityTab = () => (
    <Stack gap="lg">
      {/* Password */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Password</Title>
          <Group justify="space-between">
            <div>
              <Text fw={500}>Change Password</Text>
              <Text size="sm" c="dimmed">Last changed 3 months ago</Text>
            </div>
            <Button 
              variant="outline" 
              leftSection={<IconLock size={16} />}
              onClick={() => setShowPasswordModal(true)}
            >
              Change Password
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Two Factor Authentication */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Two-Factor Authentication</Title>
          <Group justify="space-between">
            <div>
              <Text fw={500}>2FA Status</Text>
              <Text size="sm" c="dimmed">Add an extra layer of security</Text>
            </div>
            <Badge color="red" variant="light">Disabled</Badge>
          </Group>
          <Button variant="outline" leftSection={<IconShield size={16} />}>
            Enable 2FA
          </Button>
        </Stack>
      </Card>

      {/* Login Activity */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3}>Recent Login Activity</Title>
          <Stack gap="xs">
            <Paper p="sm" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500}>Current Session</Text>
                  <Text size="xs" c="dimmed">Chrome on macOS • Bangalore, India</Text>
                </div>
                <Badge color="green" size="sm">Active</Badge>
              </Group>
            </Paper>
            <Paper p="sm" withBorder>
              <Group justify="space-between">
                <div>
                  <Text size="sm" fw={500}>2 hours ago</Text>
                  <Text size="xs" c="dimmed">Safari on iPhone • Bangalore, India</Text>
                </div>
                <Button size="xs" variant="subtle" color="red">Revoke</Button>
              </Group>
            </Paper>
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );

  const DangerZoneTab = () => (
    <Stack gap="lg">
      <Alert color="red" icon={<IconAlertTriangle size={16} />}>
        <Text fw={500}>Danger Zone</Text>
        <Text size="sm">
          These actions are permanent and cannot be undone. Please proceed with caution.
        </Text>
      </Alert>

      {/* Deactivate Account */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3} c="red">Deactivate Account</Title>
          <Text size="sm" c="dimmed">
            Temporarily deactivate your account. You can reactivate it anytime by logging in.
          </Text>
          <Group>
            <Button variant="outline" color="red">
              Deactivate Account
            </Button>
          </Group>
        </Stack>
      </Card>

      {/* Delete Account */}
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Stack gap="md">
          <Title order={3} c="red">Delete Account</Title>
          <Text size="sm" c="dimmed">
            Permanently delete your account and all associated data. This action cannot be reversed.
          </Text>
          <Alert color="red" variant="light">
            <Text size="sm">
              <strong>This will permanently:</strong>
            </Text>
            <ul style={{ margin: '8px 0', paddingLeft: '16px' }}>
              <li>Delete your profile and all personal information</li>
              <li>Remove all your sessions and chat history</li>
              <li>Cancel any upcoming bookings</li>
              <li>Remove you from all mentor-mentee relationships</li>
            </ul>
          </Alert>
          <Group>
            <Button 
              color="red" 
              leftSection={<IconTrash size={16} />}
              onClick={() => setShowDeleteModal(true)}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
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
            <Stack gap="xs">
              <Title order={1}>Account Settings</Title>
              <Text c="dimmed" size="lg">
                Manage your account preferences and security settings
              </Text>
            </Stack>
            <Button variant="outline" leftSection={<IconEdit size={16} />}>
              Quick Edit
            </Button>
          </Group>
        </motion.div>

        {/* Settings Tabs */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value || 'profile')}>
          <Tabs.List>
            <Tabs.Tab value="profile" leftSection={<IconUser size={16} />}>
              Profile
            </Tabs.Tab>
            <Tabs.Tab value="interests" leftSection={<IconHeart size={16} />}>
              Interests & Skills
            </Tabs.Tab>
            <Tabs.Tab value="notifications" leftSection={<IconBell size={16} />}>
              Notifications
            </Tabs.Tab>
            <Tabs.Tab value="security" leftSection={<IconShield size={16} />}>
              Security
            </Tabs.Tab>
            <Tabs.Tab value="danger" leftSection={<IconTrash size={16} />} color="red">
              Account
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile" pt="xl">
            <ProfileTab />
          </Tabs.Panel>

          <Tabs.Panel value="interests" pt="xl">
            <InterestsSkillsTab />
          </Tabs.Panel>

          <Tabs.Panel value="notifications" pt="xl">
            <NotificationsTab />
          </Tabs.Panel>

          <Tabs.Panel value="security" pt="xl">
            <SecurityTab />
          </Tabs.Panel>

          <Tabs.Panel value="danger" pt="xl">
            <DangerZoneTab />
          </Tabs.Panel>
        </Tabs>
      </Stack>

      {/* Password Change Modal */}
      <Modal
        opened={showPasswordModal}
        onClose={() => setShowPasswordModal(false)}
        title="Change Password"
        centered
      >
        <Stack gap="md">
          <PasswordInput
            label="Current Password"
            placeholder="Enter current password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
            visible={passwordVisible}
            onVisibilityChange={setPasswordVisible}
          />
          
          <PasswordInput
            label="New Password"
            placeholder="Enter new password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
            visible={newPasswordVisible}
            onVisibilityChange={setNewPasswordVisible}
          />
          
          <PasswordInput
            label="Confirm New Password"
            placeholder="Confirm new password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
            visible={confirmPasswordVisible}
            onVisibilityChange={setConfirmPasswordVisible}
          />

          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowPasswordModal(false)}>
              Cancel
            </Button>
            <Button onClick={handlePasswordChange}>
              Change Password
            </Button>
          </Group>
        </Stack>
      </Modal>

      {/* Delete Account Modal */}
      <Modal
        opened={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Account"
        centered
      >
        <Stack gap="md">
          <Alert color="red" icon={<IconAlertTriangle size={16} />}>
            <Text fw={500}>This action cannot be undone!</Text>
            <Text size="sm">
              All your data will be permanently deleted and cannot be recovered.
            </Text>
          </Alert>

          <Text size="sm">
            To confirm account deletion, please type <strong>DELETE</strong> in the box below:
          </Text>

          <TextInput
            placeholder="Type DELETE to confirm"
            value={deleteConfirmation}
            onChange={(e) => setDeleteConfirmation(e.target.value)}
          />

          <Group justify="space-between">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button 
              color="red" 
              onClick={handleDeleteAccount}
              disabled={deleteConfirmation !== 'DELETE'}
            >
              Delete Account
            </Button>
          </Group>
        </Stack>
      </Modal>
    </Container>
  );
} 