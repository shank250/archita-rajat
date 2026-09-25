import { EventDetails, CoupleProfile } from '../types/wedding';

export const generateGoogleCalendarUrl = (event: EventDetails, couple: CoupleProfile): string => {
  // Format: YYYYMMDDTHHmmSSZ
  // Event date 2026-11-30, start 18:30 (IST is UTC+5:30 -> 13:00 UTC)
  // Simple format: 20261130T130000Z/20261130T183000Z
  const startTimeClean = event.startTime.replace(':', '');
  const endTimeClean = event.endTime.replace(':', '');
  const dateClean = event.date.replace(/-/g, '');

  const text = encodeURIComponent(`${couple.ceremonyTitle}: ${couple.groom.firstName} & ${couple.bride.firstName}`);
  const details = encodeURIComponent(`${event.calendarEvent.description}\n\nVenue: ${event.venue.name}, ${event.venue.address}`);
  const location = encodeURIComponent(`${event.venue.name}, ${event.venue.address}, ${event.venue.city}`);

  // Using local time representation with TZ
  const dates = `${dateClean}T${startTimeClean}00/${dateClean}T${endTimeClean}00`;

  return `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${text}&dates=${dates}&details=${details}&location=${location}`;
};

export const downloadIcsFile = (event: EventDetails, couple: CoupleProfile) => {
  const dateClean = event.date.replace(/-/g, '');
  const startTimeClean = event.startTime.replace(':', '');
  const endTimeClean = event.endTime.replace(':', '');

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Royal Vows//Engagement Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `SUMMARY:${couple.ceremonyTitle} - ${couple.groom.firstName} & ${couple.bride.firstName}`,
    `DESCRIPTION:${event.calendarEvent.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.venue.name}, ${event.venue.address}, ${event.venue.city}`,
    `DTSTART;TZID=Asia/Kolkata:${dateClean}T${startTimeClean}00`,
    `DTEND;TZID=Asia/Kolkata:${dateClean}T${endTimeClean}00`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding Celebration Tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', `${couple.groom.firstName}_${couple.bride.firstName}_Engagement.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
