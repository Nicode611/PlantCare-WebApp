import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { Provider } from "next-auth/providers"

// Event handlers
import { signInEvents } from "./app/api/auth/events/signInEvents"

const prisma = new PrismaClient()
 
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
    adapter: PrismaAdapter(prisma),
    providers,
    pages: {
        signIn: "/signin",
    },
    callbacks: {
        async session({ session, user }) {
            // Ajoute l’ID de l’utilisateur dans session.user
            session.user.id = user.id;
            return session;
          }
    },
    events: {
        async signIn({ user }) {
            try {
                await signInEvents();
            } catch (error) {
                console.error("Error in signIn event :", error);
                throw error;
            }
            
        console.log("User signed in:", user.id);
        }
    },
})