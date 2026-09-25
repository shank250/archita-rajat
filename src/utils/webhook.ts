export interface RsvpWebhookPayload {
  guestName: string;
  recipient?: string;
  eventsAttending: string[];
  eventAttendance: string;
  message: string;
  timestamp?: string;
  secret?: string;
}

// Fallback to the user's Google Apps Script Web App URL if not defined in Vite environment
const DEFAULT_RSVP_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbxwuWPnauzw1vWRJFqqUAWbTg01QBBfA8o2rn5C9edIacJT1blYWQf9G89d3Blh33GY/exec';

const DEFAULT_RSVP_SECRET_KEY = 'archita_rajat_wedding_2026';

export const getRsvpWebhookUrl = (): string => {
  return (import.meta as any).env?.VITE_RSVP_WEBHOOK_URL || DEFAULT_RSVP_WEBHOOK_URL;
};

export const getRsvpSecretKey = (): string => {
  return (import.meta as any).env?.VITE_RSVP_SECRET_KEY || DEFAULT_RSVP_SECRET_KEY;
};

/**
 * Sends RSVP form data to the Google Apps Script Webhook endpoint.
 * Includes a secret verification key to protect against automated spam bots,
 * and uses mode: 'no-cors' and 'text/plain' to prevent CORS preflight blocking in the browser
 * while allowing Google Apps Script e.postData.contents to receive the full JSON payload.
 */
export const sendRsvpToWebhook = async (payload: RsvpWebhookPayload): Promise<boolean> => {
  const webhookUrl = getRsvpWebhookUrl();

  if (!webhookUrl) {
    console.warn('No RSVP Webhook URL configured.');
    return false;
  }

  const payloadWithMetadata = {
    ...payload,
    secret: getRsvpSecretKey(),
    timestamp: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
  };

  try {
    await fetch(webhookUrl, {
      method: 'POST',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payloadWithMetadata),
    });

    return true;
  } catch (error) {
    console.error('Failed to post RSVP to webhook:', error);
    return false;
  }
};
