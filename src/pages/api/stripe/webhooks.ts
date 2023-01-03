/// <reference types="stripe-event-types" />

import { env } from "env/server.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { prisma } from "server/db/client";
import { stripe } from "server/payment/stripe";
//import { channels, logsnag } from "server/logs/log-snag";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const signature = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);

  const event = stripe.webhooks.constructEvent(
    reqBuffer,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  ) as Stripe.DiscriminatedEvent;

  if (event.type === "checkout.session.completed") {
    await prisma.team.update({
      where: {
        stripe_customer_id: event.data.object.customer as string,
      },
      data: {
        subscription: {
          update: {
            active_jobs: 1000,
            monthly_credits: 100000,
          },
        },
      },
    });
  } else if (event.type === "customer.subscription.updated") {
    await prisma.team.update({
      where: {
        stripe_customer_id: event.data.object.customer as string,
      },
      data: {
        subscription: {
          update: {
            stripe_subscription_id: event.data.object.id as string,
            stripe_product_id: event.data.object.items.data[0]?.price
              .product as string,
            active_jobs: 1000,
            monthly_credits: 100000,
          },
        },
      },
    });
  } else if (event.type === "invoice.paid") {
  } else if (event.type === "invoice.payment_failed") {
    console.log(event.data.object);
    await prisma.team.update({
      where: {
        stripe_customer_id: event.data.object.customer as string,
      },
      data: {
        subscription: {
          update: {
            active_jobs: 2,
            monthly_credits: 5,
          },
        },
      },
    });
  } else {
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

export default handler;
