/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_RSVP_WEBHOOK_URL?: string;
  readonly VITE_RSVP_SECRET_KEY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
