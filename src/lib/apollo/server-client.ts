import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client/core";
import { cookies } from "next/headers";

export async function getServerApolloClient() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  return new ApolloClient({
    link: new HttpLink({
      uri:
        process.env.NEXT_PUBLIC_ERXES_ENDPOINT ??
        process.env.NEXT_PUBLIC_ERXES_API_URL ??
        "/graphql",
      headers: {
        "x-app-token": process.env.NEXT_PUBLIC_ERXES_CP_TOKEN ?? "",
        "erxes-pos-token": process.env.NEXT_PUBLIC_POS_TOKEN ?? "",
        "client-auth-token": token || "",
      },
      fetchOptions: { cache: "no-store" },
    }),
    cache: new InMemoryCache(),
  });
}
