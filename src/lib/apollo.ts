import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

let client: ApolloClient | null = null;

export const getClient = () => {
  const apiUrl = process.env.NEXT_PUBLIC_WORDPRESS_API_URL;

  console.log("🔗 Conectando ao WordPress em:", apiUrl);

  if (!apiUrl) {
    throw new Error(
      "❌ Erro Fatal: A variável NEXT_PUBLIC_WORDPRESS_API_URL não está definida"
    );
  }

  if (typeof window === "undefined" && process.env.NODE_ENV === "development") {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
  }

  if (!client || typeof window === "undefined") {
    client = new ApolloClient({
      link: new HttpLink({
        uri: apiUrl,
      }),
      cache: new InMemoryCache(),
    });
  }

  return client;
};
