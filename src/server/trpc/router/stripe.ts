import { stripe } from "server/payment/stripe";
import type Stripe from "stripe";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const stripeRouter = router({
  getProducts: protectedProcedure.query(async () => {
    const products = (await stripe.products.list({
      expand: ["data.default_price"],
    })) as Stripe.Response<
      Stripe.ApiList<Stripe.Product & { default_price: Stripe.Price }>
    >;

    products.data.sort((a, b) => {
      if (a.default_price?.unit_amount && b.default_price?.unit_amount) {
        return a.default_price.unit_amount - b.default_price.unit_amount;
      }

      return 0;
    });

    return products.data;
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
        cancel_url: "http://localhost:3000/settings/billing?canceled=true",
        success_url: "http://localhost:3000/settings/billing?success=true",
      });

      return subscription;
    }),
  manageSubscription: protectedProcedure.mutation(async ({ ctx }) => {
    return await stripe.billingPortal.sessions.create({
      customer: ctx.user?.membership?.team.stripe_customer_id as string,
      return_url: "http://localhost:3000/settings/billing",
    });
  }),
  getSubscription: protectedProcedure.query(async ({ ctx }) => {
    return await stripe.customers.retrieve(
      ctx.user?.membership?.team.stripe_customer_id as string,
      {
        expand: ["subscriptions.data"],
      }
    );
  }),
});
