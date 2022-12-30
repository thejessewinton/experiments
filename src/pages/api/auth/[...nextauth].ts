import NextAuth, { type NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { env } from "env/server.mjs";
import { prisma } from "server/db/client";
import { defaultTags } from "client-data/data/default-tags";
import { channels, logsnag } from "server/logs/log-snag";
import { stripe } from "server/payment/stripe";
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
      const newStripeCustomer = await stripe.customers.create({
        email: user.email as string,
        name: user.name as string,
        metadata: {
          id: user.id as string,
        },
      });

      await prisma.user.update({
        where: {
          id: user.id as string,
        },
        data: {
          stripe_customer_id: newStripeCustomer.id,
          membership: {
            create: {
              role: MemberRole.ADMIN,
              team: {
                create: {
                  tags: {
                    create: defaultTags,
                  },
                },
              },
            },
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
          id: user.id as string,
        },
      });
    },
  },
};

export default NextAuth(authOptions);
