import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "env/server.mjs";
import { prisma } from "server/db/client";
import { defaultTags } from "client-data/data/default-tags";

export const authOptions: NextAuthOptions = {
  callbacks: {
    session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },
  adapter: PrismaAdapter(prisma),
  providers: [
    EmailProvider({
      server: {
        host: env.SMTP_HOST,
        port: Number(env.SMTP_PORT),
        auth: {
          user: env.SMTP_USER,
          pass: env.SMTP_PASSWORD,
        },
      },
      from: env.SMTP_FROM,
    }),
    GithubProvider({
      clientId: env.GITHUB_CLIENT_ID,
      clientSecret: env.GITHUB_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id as string,
        },
        data: {
          tags: {
            create: defaultTags,
          },
        },
      });
    },
    linkAccount: async ({ user, account }) => {
      const existingUser = await prisma.user.findUnique({
        where: {
          id: user.id,
        },
      });

      if (existingUser) {
        await prisma.user.update({
          where: {
            email: account.email as string,
          },
          data: {
            accounts: {
              create: {
                ...account,
              },
            },
          },
        });
      }
    },
  },
};

export default NextAuth(authOptions);
