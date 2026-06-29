export type ConfirmationPhase = {
  title: string;
  description: string;
};

export type ConfirmationVariant = {
  headline: string;
  body: string;
  middleTitle: string;
  middleSubtitle?: string;
  buttonText?: string;
  smsBody?: string;
  fallbackTitle: string;
  fallbackSubtitle: string;
  timelineTitle?: string;
  phases?: ConfirmationPhase[];
};

export type ConfirmationPhotoCount = 0 | 1 | 2;

export const confirmationVariants: Record<ConfirmationPhotoCount, ConfirmationVariant> = {
  0: {
    headline: 'We received your quote — we\'ll be in touch soon.',
    body: 'Your details have been submitted and our team will reach out to go over next steps. Sending two quick photos of your current water heater is completely optional, but it helps us verify your installation details remotely and often speeds up the process. In the meantime, you should receive an email confirmation and the details of your submission for your records.',
    middleTitle: 'Optional: Speed Things Up With 2 Photos',
    middleSubtitle: 'A wide shot of the full tank and a close-up of the data sticker are all we need to verify your setup without an in-person visit — and get you a confirmed price faster.',
    buttonText: 'Text Us 2 Photos Now',
    smsBody: 'Hello, here are 2 photos of my water heater for price verification.',
    fallbackTitle: 'Need to reach us directly?',
    fallbackSubtitle: 'We\'ll contact you soon, but if you have an urgent question or need emergency service right now, call or text us at 616-315-0999.',
    timelineTitle: 'What Happens Next',
    phases: []
  },
  1: {
    headline: 'Perfect — that\'s likely all we need.',
    body: 'We received your photo. That\'s likely everything we need to verify your system compatibility and confirm your installed price without an in-person visit. We\'ll follow up to finalize everything. In the meantime, you should receive an email confirmation and the details of your submission for your records.',
    middleTitle: 'What Happens Next',
    middleSubtitle: '',
    buttonText: 'Text Us',
    smsBody: 'Hello, I submitted a photo and wanted to follow up on my quote.',
    fallbackTitle: 'Need immediate assistance?',
    fallbackSubtitle: 'Need an emergency replacement or have an urgent question? Call or text us right now at 616-315-0999.',
    timelineTitle: 'What Happens Next',
    phases: [
      {
        title: 'We Review Your Photo',
        description: 'A technician will check your photo to verify your venting type and system layout. If we need anything else, we\'ll reach out.'
      },
      {
        title: 'Price Confirmation',
        description: 'We\'ll contact you via text or phone to confirm your exact installed price — no surprise fees.'
      },
      {
        title: 'Schedule Your Installation',
        description: 'Once confirmed, we\'ll get you on the calendar for a smooth, fast turnaround.'
      }
    ]
  },
  2: {
    headline: 'Perfect — that\'s likely all we need.',
    body: 'We received both photos. That\'s likely everything we need to verify your system compatibility and confirm your installed price without an in-person visit. We\'ll follow up to finalize everything. In the meantime, you should receive an email confirmation and the details of your submission for your records.',
    middleTitle: 'What Happens Next',
    middleSubtitle: '',
    buttonText: 'Open Verification Options',
    smsBody: 'Hello, I submitted both photos and wanted to follow up on scheduling.',
    fallbackTitle: 'Need immediate assistance?',
    fallbackSubtitle: 'Need an emergency replacement or have an urgent question? Call or text us right now at 616-315-0999.',
    timelineTitle: 'What Happens Next',
    phases: [
      {
        title: 'We Review Your Photos',
        description: 'A technician will cross-reference both photos to verify your venting type, connections, and system layout.'
      },
      {
        title: 'Price Confirmation',
        description: 'We\'ll reach out via text or phone to confirm your exact installed price — no surprise fees.'
      },
      {
        title: 'Schedule Your Installation',
        description: 'Because we can skip the on-site measurement visit, your job moves directly to our installation calendar.'
      }
    ]
  }
};

export function parsePhotoCount(value: string | null | undefined): ConfirmationPhotoCount {
  const parsed = Number.parseInt(value || '', 10);
  if (parsed === 1 || parsed === 2) return parsed;
  return 0;
}

export function getConfirmationVariant(count: ConfirmationPhotoCount): ConfirmationVariant {
  return confirmationVariants[count];
}
