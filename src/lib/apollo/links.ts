import { ApolloLink, HttpLink } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = new HttpLink({
  uri: process.env.NEXT_PUBLIC_ERXES_ENDPOINT ?? process.env.NEXT_PUBLIC_ERXES_API_URL ?? "/graphql",
  headers: {
    "x-app-token": process.env.NEXT_PUBLIC_ERXES_CP_TOKEN ?? "",
    "erxes-pos-token": process.env.NEXT_PUBLIC_POS_TOKEN ?? "",
  },
});

const authLink = setContext((_, { headers }) => {
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  return {
    headers: {
      ...headers,
      "client-auth-token": token || "",
    },
  };
});

export const link = ApolloLink.from([authLink, httpLink]);
