import { HttpLink, ApolloClient as kuita } from "@apollo/client";

import { loadEnvConfig } from "@next/env";
const projectDir = process.cwd();
loadEnvConfig(projectDir);

import {
  registerApolloClient,
  ApolloClient,
  InMemoryCache,
} from "@apollo/client-integration-nextjs";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL,
  fetch: function (uri, options) {
    const apiKey = process.env.STRAPI_API_KEY;

    if (!apiKey) {
      console.error("❌ Missing STRAPI_API_KEY");
      throw new Error("STRAPI_API_KEY not found");
    }

    return fetch(uri, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${apiKey}`,
      },
      next: { revalidate: 3600 },
    }).catch((error) => {
      console.error("❌ Apollo fetch failed:", error);
      throw error;
    });
  },
});

export const { query, getClient } = registerApolloClient(() => {
  return new ApolloClient({
    cache: new InMemoryCache(),
    link: httpLink,
    defaultOptions: {
      query: {
        fetchPolicy: "network-only",
        errorPolicy: "all",
      },
    },
  });
});
