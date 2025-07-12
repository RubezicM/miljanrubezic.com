import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

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
    }).catch((error) => {
      console.error("❌ Apollo fetch failed:", error);
      throw error;
    });
  },
});

const gqlClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "cache-first",
    },
  },
});

export default gqlClient;
