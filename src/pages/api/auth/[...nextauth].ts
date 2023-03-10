import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "env/server.mjs";
import { prisma } from "server/db/client";
import { defaultTags } from "client-data/data/default-tags";
import { MemberRole } from "@prisma/client";
import { postmark } from "server/email/postmark";

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
      sendVerificationRequest: async ({ identifier, url }) => {
        const result = await postmark.sendEmail({
          From: env.SMTP_FROM,
          To: identifier,
          Subject: "Verify your email address",
          HtmlBody: `<a href="${url}">Verify your email address</a>`,
        });

        if (result.ErrorCode) {
          throw new Error(result.Message);
        }
      },
    }),
    GoogleProvider({
      clientId: env.GOOGLE_CLIENT_ID,
      clientSecret: env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  pages: {
    signIn: "/sign-in",
    newUser: "/onboarding",
    verifyRequest: "/verify-request",
    error: "/error",
  },
  events: {
    createUser: async ({ user }) => {
      await prisma.user.update({
        where: {
          id: user.id as string,
        },
        data: {
          membership: {
            create: {
              role: MemberRole.ADMIN,
              team: {
                create: {
                  tags: {
                    create: defaultTags,
                  },
                  subscription: {
                    create: {},
                  },
                },
              },
            },
          },
        },
      });
    },
  },
};

export default NextAuth(authOptions);
