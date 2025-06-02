import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { PrismaClient } from "@prisma/client"
import type { AdapterSession } from "next-auth/adapters";
import type { JWT } from "next-auth/jwt";
import type { Session, User } from "next-auth";
import type { Provider } from "next-auth/providers"
import * as bcrypt from 'bcryptjs';

// Event handlers
import { signInEvents } from "./app/api/auth/events/signInEvents"

const prisma = new PrismaClient()
 
const providers: Provider[] = [
  CredentialsProvider({
    name: "Credentials",
    credentials: {
      fullname: { label: "Full Name", type: "text", placeholder: "John Doe" },
      email: { label: "Email", type: "text", placeholder: "name@site.com" },
      password: { label: "Password", type: "password" }
    },
    async authorize(credentials) {
      try {
        // Validate and normalize credentials
        if (!credentials || typeof credentials.email !== "string" || typeof credentials.password !== "string") {
          console.log("Invalid credentials provided 1");
          return null;
        }
        const email = credentials.email;
        const password = credentials.password;
        const fullname = typeof credentials.fullname === 'string' ? credentials.fullname : undefined;

        // recherche utilisateur existant
        const existingUser = await prisma.user.findUnique({ where: { email } });
        // si pas d’utilisateur et présence de fullname => inscription
        if (!existingUser && fullname) {
          const hashed = await bcrypt.hash(password, 10);
          const newUser = await prisma.user.create({
            data: { email: email, name: fullname, password: hashed, theme: "light" }
          });
          console.log("authorize: created newUser:", newUser);
          return { id: newUser.id, name: newUser.name, email: newUser.email, theme: newUser.theme };
        }
        // si utilisateur existant => connexion
        if (existingUser && existingUser.password) {
          const match = await bcrypt.compare(password, existingUser.password);
          if (match) {
            console.log("authorize: returning existing user:", { id: existingUser.id, name: existingUser.name, email: existingUser.email });
            return { id: existingUser.id, name: existingUser.name, email: existingUser.email, theme: existingUser.theme };
          }
        }
        console.log("Invalid credentials provided");
        return null;
      } catch (error) {
        console.error("Authorize error:", error);
        return null;
      }
    }
  }),
  GoogleProvider({
    clientId: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!
  }),
];
 
// Map providers to a simpler format for easier access
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
    newUser: "/signup" 
  },
  session: {
    strategy: "database"
  },
  callbacks: {
      async session({ session, user }: { session: Session; user: User }) {
          session.user.id = user.id!;
          session.user.theme = user.theme!;
          console.log("Session callback:", session);
          return session;
        }
  },
  events: {
      async signIn({ user }: { user: User }) {
          try {
              await signInEvents();
          } catch (error) {
              console.error("Error in signIn event :", error);
              throw error;
          }
          
      console.log("User signed in:", user.id);
      },
      async signOut(message: { session: void | AdapterSession | null | undefined } | { token: JWT | null }) {
          const userId = "token" in message
              ? message.token?.sub
              : message.session?.userId;
          console.log("User signed out:", userId);
      }
  },
})