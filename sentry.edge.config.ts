// This file configures the initialization of Sentry for edge features (middleware, edge routes, and so on).
// The config you add here will be used whenever one of the edge features is loaded.
// Note that this config is unrelated to the Vercel Edge Runtime and is also required when running locally.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

const isProduction = process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,

  // Only enable in production
  enabled: isProduction,

  tracesSampleRate: isProduction ? 0.1 : 1.0,
  debug: !isProduction,

  initialScope: {
    tags: {
      component: "portfolio-edge",
      runtime: "edge",
    },
  },
});
