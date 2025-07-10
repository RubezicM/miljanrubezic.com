// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Only enable in production
  enabled: isProduction,

  // Performance monitoring settings
  tracesSampleRate: isProduction ? 0.1 : 1.0,

  // Debug logging
  debug: !isProduction,

  initialScope: {
    tags: {
      component: "portfolio-backend",
      runtime: "nodejs",
    },
  },
});
