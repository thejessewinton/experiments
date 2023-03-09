import type { NextApiRequest, NextApiResponse } from "next";
import { stripe } from "server/payment/stripe";
import type Stripe from "stripe";
import { z } from "zod";
import { prisma } from "server/db/client";
import { env } from "env/server.mjs";

const querySchema = z.object({
  team: z.string(),
  session_id: z.string().min(1),
});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { team: id, session_id } = querySchema.parse(req.query);

  const checkoutSession = await stripe.checkout.sessions.retrieve(session_id, {
    expand: ["subscription"],
  });

  const subscription = checkoutSession.subscription as Stripe.Subscription & {
    plan: Stripe.Plan;
  };

  const product = await stripe.products.retrieve(
    subscription.plan.product as string
  );

  await prisma.team.update({
    where: {
      id: id,
    },
    data: {
      stripe_customer_id: checkoutSession.customer as string,
      subscription: {
        update: {
          stripe_product_id: product.id,
          stripe_subscription_id: subscription.id,
          active_jobs: Number(product.metadata.active_jobs),
          monthly_credits: Number(product.metadata.monthly_credits),
        },
      },
    },
  });

  res.redirect(302, `${env.APP_URL}/settings/billing?upgraded=true`);
};

export default handler;
