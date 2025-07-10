// This file configures the initialization of Sentry on the client.
// The added config here will be used whenever a users loads a page in their browser.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";
const isProduction = process.env.NODE_ENV === "production";
console.log(
  `Sentry client instrumentation is running in ${isProduction ? "production" : "development"} mode.`,
);
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  enabled: isProduction,
  integrations: [
    Sentry.replayIntegration({
      maskAllText: isProduction,
      blockAllMedia: isProduction,
    }),
  ],
  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: isProduction ? 0.1 : 1.0,
  // Session replay settings
  replaysSessionSampleRate: isProduction ? 0.1 : 0.5,
  replaysOnErrorSampleRate: 1.0, // Always capture error sessions

  debug: !isProduction,
  initialScope: {
    tags: {
      component: "portfolio-frontend",
      runtime: "browser",
    },
  },
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
