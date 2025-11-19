import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

let client: ApolloClient | null = null;

export const getClient = () => {
  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: process.env.NEXT_PUBLIC_WORDPRESS_API_LINK,
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};
