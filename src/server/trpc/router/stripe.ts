import { stripe } from "server/payment/stripe";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const stripeRouter = router({
  getProducts: protectedProcedure.query(async () => {
    const { data } = await stripe.products.list();

    return data;
  }),
  createCheckoutSession: protectedProcedure
    .input(
      z.object({
        price_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const subscription = await stripe.checkout.sessions.create({
        mode: "subscription",
        line_items: [
          {
            price: input.price_id,
            quantity: 1,
          },
        ],
        metadata: {
          id: ctx.user?.id as string,
          name: ctx.user?.name as string,
          email: ctx.user?.email as string,
        },
        cancel_url: "https://example.com/cancel",
        success_url: "https://example.com/success",
      });

      await ctx.prisma.subscription.upsert({
        where: {
          user_id: ctx.user?.id,
        },
        update: {
          stripe_subscription_id: subscription.id,
        },
        create: {
          user_id: ctx.user?.id as string,
          stripe_subscription_id: subscription.id,
        },
      });

      return subscription;
    }),
  manageSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    return await stripe.billingPortal.sessions.create({
      customer: ctx.user?.stripe_customer_id as string,
      return_url: "https://example.com",
    });
  }),
});
