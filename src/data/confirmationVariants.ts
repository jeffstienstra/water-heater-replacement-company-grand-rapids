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
    headline: 'You are all set. We will take it from here.',
    body: 'Thank you for submitting your project details! Our team will reach out to you via text or phone to confirm next steps. If you want the fastest possible quote verification, you can text us two quick photos now using the shortcut below.',
    middleTitle: 'Optional Shortcut: Text Us 2 Quick Photos',
    middleSubtitle: 'If you would like to help us verify your system layout without an on-site visit, snap a wide shot and a close-up of the data label and send them over.',
    buttonText: 'Start A Text Message',
    smsBody: 'Hello, here are 2 photos of my water heater for price verification.',
    fallbackTitle: 'Prefer a phone call or site visit instead?',
    fallbackSubtitle: 'No problem at all. Sit back and relax. We will reach out shortly to guide you through the rest of the process. Need immediate assistance? Feel free to call or text us right now.',
    timelineTitle: 'What Happens Next',
    phases: []
  },
  1: {
    headline: 'Perfect. First photo received.',
    body: 'Thank you for being proactive! We received your photo, which gives us a great head start. You do not need to send anything else. Our team will review the details to see if we can verify your system from this view, and we will follow up with you via text or phone to handle the next steps.',
    middleTitle: 'What Happens Next',
    middleSubtitle: '',
    buttonText: 'Continue',
    smsBody: 'Hello, I submitted my photo and wanted to follow up on my quote verification.',
    fallbackTitle: 'Immediate Assistance',
    fallbackSubtitle: 'Need an emergency replacement immediately or have an urgent question? Feel free to call or text us right now at 616-315-0999.',
    timelineTitle: 'What Happens Next',
    phases: [
      {
        title: 'Technical Review',
        description: 'A local technician will look over your details and the provided photo to determine if your system can be verified remotely or if we need a quick follow-up question.'
      },
      {
        title: 'Quote Verification',
        description: 'We will reach out via text or phone to discuss your project layout and confirm your final, all-inclusive installation total.'
      },
      {
        title: 'Priority Scheduling',
        description: 'Once confirmed, your project moves straight to our local calendar for a smooth, fast turnaround.'
      }
    ]
  },
  2: {
    headline: 'Perfect. You are on the absolute fastest track.',
    body: 'Thank you for being proactive! Because you uploaded both critical photos, our team can most likely verify your entire system layout at a glance. Sit back and relax while we review your plumbing specs-we will contact you next via text or phone to finalize everything.',
    middleTitle: 'What Happens Next',
    middleSubtitle: '',
    buttonText: 'Open Verification Options',
    smsBody: 'Hello, I submitted both photos and wanted to follow up on scheduling.',
    fallbackTitle: 'Immediate Assistance',
    fallbackSubtitle: 'Need an emergency replacement immediately or have an urgent question? Feel free to call or text us right now at 616-315-0999.',
    timelineTitle: 'What Happens Next',
    phases: [
      {
        title: 'Visual System Verification',
        description: 'A local technician will cross-reference your photos to verify your venting, gas lines, and clearances against your selected model.'
      },
      {
        title: 'Guaranteed Price Confirmation',
        description: 'We will reach out via text or phone to confirm your exact, all-inclusive installation total with zero surprise fees.'
      },
      {
        title: 'Fast-Track Scheduling',
        description: 'Because we can skip the traditional on-site consultation step entirely, your job moves directly to our priority installation calendar.'
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
