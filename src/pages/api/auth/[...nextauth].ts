import { loginWithGoogle, signIn } from "@/services/services";
import { compare } from "bcrypt";
import nextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      type: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user: any = await signIn(email);

        if (user) {
          const passwordConfirm = await compare(password, user.password);
          if (passwordConfirm) return user;
          return null;
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_OAUTH_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async jwt({ token, account, profile, user }: any) {
      if (account?.provider === "credentials") {
        token.fullname = user.fullname;
        token.email = user.email;
        token.role = user.role;
      }

      if (account?.provider === "google") {
        const data = {
          fullname: user.name,
          email: user.email,
          type: "google",
        };

        await loginWithGoogle(data, (data: any) => {
          token.fullname = data.fullname;
          token.email = data.email;
          token.role = data.role;
        });
      }

      return token;
    },
    async session({ session, token }: any) {
      if ("fullname" in token) {
        session.user.fullname = token.fullname;
      }
      if ("email" in token) {
        session.user.email = token.email;
      }
      if ("role" in token) {
        session.user.role = token.role;
      }

      const accessToken = jwt.sign(token, process.env.NEXTAUTH_SECRET || "", {
        algorithm: "HS256",
      });

      session.accessToken = accessToken;

      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default nextAuth(authOptions);
