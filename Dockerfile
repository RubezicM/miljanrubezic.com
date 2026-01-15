# 1️⃣ Use the official Node.js image as the base
FROM node:18-alpine AS builder

# 2️⃣ Set the working directory inside the container
WORKDIR /app

# Enable & activate pnpm
RUN corepack enable \
 && corepack prepare pnpm@latest --activate

# 3️⃣ Copy package.json and package-lock.json (if exists) to leverage Docker caching
COPY package.json pnpm-lock.yaml ./

# 4️⃣ Install dependencies
RUN pnpm install --frozen-lockfile

# 5️⃣ Copy all Next.js app files into the container
COPY . .

# 6️⃣ Add env vars
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_STRAPI_GRAPHQL_URL
ARG STRAPI_API_KEY
ARG NEXT_PUBLIC_STRAPI_URL
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN

ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_STRAPI_GRAPHQL_URL=${NEXT_PUBLIC_STRAPI_GRAPHQL_URL}
ENV STRAPI_API_KEY=${STRAPI_API_KEY}
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}


# 6 run the codegen
RUN pnpm run codegen
# 6️⃣ Build the Next.js application

RUN pnpm run build

# 7️⃣ Use a lightweight Node.js image for production
FROM node:18-alpine AS runner

# 8️⃣ Set environment to production
ENV NODE_ENV=production

# ADD THESE LINES ↓
ARG NEXT_PUBLIC_GA_ID
ARG NEXT_PUBLIC_STRAPI_GRAPHQL_URL
ARG STRAPI_API_KEY
ARG NEXT_PUBLIC_STRAPI_URL
ARG SENTRY_AUTH_TOKEN
ARG NEXT_PUBLIC_SENTRY_DSN

ENV NEXT_PUBLIC_GA_ID=${NEXT_PUBLIC_GA_ID}
ENV NEXT_PUBLIC_STRAPI_GRAPHQL_URL=${NEXT_PUBLIC_STRAPI_GRAPHQL_URL}
ENV STRAPI_API_KEY=${STRAPI_API_KEY}
ENV NEXT_PUBLIC_STRAPI_URL=${NEXT_PUBLIC_STRAPI_URL}
ENV SENTRY_AUTH_TOKEN=${SENTRY_AUTH_TOKEN}
ENV NEXT_PUBLIC_SENTRY_DSN=${NEXT_PUBLIC_SENTRY_DSN}

# 9️⃣ Set the working directory
WORKDIR /app

# � Copy built files from the builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./
COPY --from=builder /app/public ./public

# 1️⃣1️⃣ Expose the port Next.js runs on
EXPOSE 3000

# 1️⃣2️⃣ Start the Next.js app
CMD ["node_modules/.bin/next", "start"]
