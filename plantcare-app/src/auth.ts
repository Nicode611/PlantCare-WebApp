import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
 
const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "text", placeholder: "name@site.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(
      credentials: Partial<Record<"email" | "password", unknown>>
    ) {
      // Validate and normalize credentials
      if (
        typeof credentials.email !== "string" ||
        typeof credentials.password !== "string"
      ) {
        return null;
      }
      const email = credentials.email;
      // TODO: Replace this stub with your database lookup logic
      const user = { id: "1", name: "Demo User", email };
      if (user) {
        return user;
      }
      return null;
    }
  }),
  Google,
];
 
export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")
 
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  pages: {
    signIn: "/signin",
  },
})