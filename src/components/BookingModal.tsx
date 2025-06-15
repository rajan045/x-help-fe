'use client';

import { useState } from 'react';
import { 
  Modal, 
  Stack, 
  Group, 
  Button, 
  Text, 
  Select, 
  Textarea, 
  Paper, 
  Badge, 
  Divider,
  Radio,
  Checkbox,
  Title,
  Timeline
} from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { 
  IconCalendarEvent, 
  IconCreditCard, 
  IconCheck,
  IconMessageCircle
} from '@tabler/icons-react';

interface BookingData {
  date: Date | null;
  time: string;
  duration: number;
  type: string;
  question: string;
  context: string;
  totalCost: number;
  paymentMethod: string;
  bookingId: string;
  status: string;
}

interface BookingModalProps {
  opened: boolean;
  onClose: () => void;
  onBookingComplete: (bookingData: BookingData) => void;
}

export default function BookingModal({ opened, onClose, onBookingComplete }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState('');
  const [sessionDuration, setSessionDuration] = useState(30);
  const [sessionType, setSessionType] = useState('video');
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const totalCost = 2500;
  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM'
  ];

  const steps = [
    { title: 'Date & Time', icon: IconCalendarEvent },
    { title: 'Details', icon: IconMessageCircle },
    { title: 'Payment', icon: IconCreditCard },
    { title: 'Confirmation', icon: IconCheck }
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleBooking = () => {
    const bookingData = {
      date: selectedDate,
      time: selectedTime,
      duration: sessionDuration,
      type: sessionType,
      question,
      context,
      totalCost,
      paymentMethod,
      bookingId: `BK${Date.now()}`,
      status: 'confirmed'
    };
    
    onBookingComplete(bookingData);
    onClose();
    
    // Reset form
    setCurrentStep(1);
    setSelectedDate(null);
    setSelectedTime('');
    setQuestion('');
    setContext('');
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1: return selectedDate && selectedTime;
      case 2: return question.trim() !== '';
      case 3: return paymentMethod && agreeToTerms;
      default: return true;
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <Stack gap="md">
            <Title order={3}>Select Date & Time</Title>
            <DatePicker
              value={selectedDate}
              minDate={new Date()}
            />
            
            <div>
              <Text size="sm" fw={500} mb="xs">Available Time Slots</Text>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'filled' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTime(time)}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </div>

            <Group gap="md">
              <div className="flex-1">
                <Text size="sm" fw={500} mb="xs">Duration</Text>
                <Select
                  data={[
                    { value: '30', label: '30 minutes' },
                    { value: '45', label: '45 minutes' },
                    { value: '60', label: '1 hour' }
                  ]}
                  value={sessionDuration.toString()}
                  onChange={(value) => setSessionDuration(parseInt(value || '30'))}
                />
              </div>
              <div className="flex-1">
                <Text size="sm" fw={500} mb="xs">Session Type</Text>
                <Select
                  data={[
                    { value: 'video', label: 'Video Call' },
                    { value: 'audio', label: 'Audio Call' },
                    { value: 'chat', label: 'Text Chat' }
                  ]}
                  value={sessionType}
                  onChange={(value) => setSessionType(value || 'video')}
                />
              </div>
            </Group>
          </Stack>
        );

      case 2:
        return (
          <Stack gap="md">
            <Title order={3}>Session Details</Title>
            <Textarea
              label="What would you like to discuss?"
              placeholder="e.g., Career transition, Resume review, Interview preparation..."
              value={question}
              onChange={(e) => setQuestion(e.currentTarget.value)}
              minRows={3}
              required
            />
            <Textarea
              label="Additional Context (Optional)"
              placeholder="Share any relevant background or specific challenges..."
              value={context}
              onChange={(e) => setContext(e.currentTarget.value)}
              minRows={3}
            />
          </Stack>
        );

      case 3:
        return (
          <Stack gap="md">
            <Title order={3}>Payment & Confirmation</Title>
            
            <Paper p="md" withBorder>
              <Stack gap="sm">
                <Group justify="space-between">
                  <Text>Session Duration</Text>
                  <Text>{sessionDuration} minutes</Text>
                </Group>
                <Group justify="space-between">
                  <Text>Date & Time</Text>
                  <Text>{selectedDate?.toLocaleDateString()} at {selectedTime}</Text>
                </Group>
                <Divider />
                <Group justify="space-between">
                  <Text fw={600}>Total Amount</Text>
                  <Text fw={600} size="lg" color="blue">₹{totalCost}</Text>
                </Group>
              </Stack>
            </Paper>

            <div>
              <Text size="sm" fw={500} mb="xs">Payment Method</Text>
              <Radio.Group value={paymentMethod} onChange={setPaymentMethod}>
                <Stack gap="xs">
                  <Radio value="card" label="Credit/Debit Card" />
                  <Radio value="upi" label="UPI" />
                  <Radio value="wallet" label="Digital Wallet" />
                </Stack>
              </Radio.Group>
            </div>

            <Checkbox
              checked={agreeToTerms}
              onChange={(e) => setAgreeToTerms(e.currentTarget.checked)}
              label="I agree to the terms and conditions"
            />
          </Stack>
        );

      case 4:
        return (
          <Stack gap="md" align="center">
            <div className="text-center">
              <IconCheck size={64} className="text-green-500 mx-auto mb-4" />
              <Title order={2} c="green">Session Booked Successfully!</Title>
              <Text c="dimmed" mt="sm">
                You&apos;ll receive a confirmation email shortly.
              </Text>
            </div>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title={
        <Group gap="md">
          <Text fw={600} size="lg">Book a Session</Text>
          <Badge variant="light">Step {currentStep} of {steps.length}</Badge>
        </Group>
      }
      size="lg"
      centered
    >
      <Stack gap="lg">
        <Timeline active={currentStep - 1} bulletSize={24} lineWidth={2}>
          {steps.map((step, index) => (
            <Timeline.Item 
              key={index}
              bullet={<step.icon size={12} />}
              title={step.title}
            />
          ))}
        </Timeline>

        <div className="min-h-[300px]">
          {renderStepContent()}
        </div>

        <Group justify="space-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
          >
            Back
          </Button>
          
          <Group gap="sm">
            <Button variant="subtle" onClick={onClose}>
              Cancel
            </Button>
            {currentStep === steps.length ? (
              <Button onClick={handleBooking}>
                Complete Booking
              </Button>
            ) : (
              <Button
                onClick={handleNext}
                disabled={!canProceed()}
              >
                Next
              </Button>
            )}
          </Group>
        </Group>
      </Stack>
    </Modal>
  );
} 