import NextAuth, { type NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "env/server.mjs";
import { prisma } from "server/db/client";
import { defaultTags } from "client-data/data/default-tags";
import { channels, logsnag } from "backend/logs/log-snag";
import { stripe } from "backend/payment/stripe";

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

      await logsnag.publish({
        channel: channels.userRegister,
        event: "User Registered",
        description: `name: ${user.name}, email: ${user.email}`,
        icon: "🔥",
        notify: true,
        tags: {
          name: user.name as string,
          email: user.email as string,
          uid: user.id as string,
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
