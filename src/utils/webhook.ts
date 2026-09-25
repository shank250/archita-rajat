export interface RsvpWebhookPayload {
  guestName: string;
  recipient?: string;
  eventsAttending: string[];
  eventAttendance: string;
  message: string;
  timestamp?: string;
}

// Fallback to the user's Google Apps Script Web App URL if not defined in Vite environment
const DEFAULT_RSVP_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbyQckAEM81mlFA3e8joN6gvGYHfFeO_J-I6C2jGzcV2vrsTzld_xETx7KeqXEepz2bF/exec';

export const getRsvpWebhookUrl = (): string => {
  return (import.meta as any).env?.VITE_RSVP_WEBHOOK_URL || DEFAULT_RSVP_WEBHOOK_URL;
};

/**
 * Sends RSVP form data to the Google Apps Script Webhook endpoint.
 * Uses mode: 'no-cors' and 'text/plain' to prevent CORS preflight blocking in the browser
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
