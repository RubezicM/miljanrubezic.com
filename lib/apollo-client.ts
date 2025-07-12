import {
  ApolloClient,
  InMemoryCache,
  HttpLink,
  ApolloLink,
} from "@apollo/client";

const httpLink = new HttpLink({
  uri: `${process.env.NEXT_PUBLIC_STRAPI_GRAPHQL_URL}`,
  fetch: function (uri, options) {
    return fetch(uri, {
      ...(options ?? {}),
      headers: {
        ...(options?.headers ?? {}),
        Authorization: `Bearer ${process.env.STRAPI_API_KEY}`,
      },
    });
  },
});

const gqlClient = new ApolloClient({
  link: ApolloLink.from([httpLink]),
  cache: new InMemoryCache(),
  defaultOptions: {
    query: {
      fetchPolicy: "network-only",
    },
  },
});

export default gqlClient;
