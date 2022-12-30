import { env } from "env/server.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { prisma } from "server/db/client";
import { stripe } from "server/payment/stripe";
import { channels, logsnag } from "server/logs/log-snag";
import { buffer } from "micro";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  const signature = req.headers["stripe-signature"];
  const reqBuffer = await buffer(req);

  const stripeEvent = stripe.webhooks.constructEvent(
    reqBuffer,
    signature as string | string[] | Buffer,
    env.STRIPE_WEBHOOK_SECRET
  );

  const object = stripeEvent.data.object as Stripe.Subscription;
  const subscription = await stripe.subscriptions.retrieve(object.id);

  switch (stripeEvent.type) {
    case "checkout.session.completed":
      const customer = await prisma.subscription.update({
        where: {
          stripe_subscription_id: subscription.id,
        },
        data: {
          stripe_price_id: subscription.items.data[0]?.price.id,
        },
        include: {
          team: true,
        },
      });

      await logsnag.publish({
        channel: channels.subscriptionCreated,
        event: "Subscription Created",
        description: `Subscription created for ${customer.team.id}!`,
        icon: "🎉",
        notify: true,
        tags: subscription.metadata,
      });
      break;
    case "invoice.paid":
      await logsnag.publish({
        channel: channels.invoicePaid,
        event: "Invoice Paid",
        description: `Invoice paid!`,
        icon: "💸",
        notify: true,
        tags: subscription.metadata,
      });
      break;
    case "invoice.payment_failed":
      await logsnag.publish({
        channel: channels.invoiceFailed,
        event: "Invoice Failed",
        description: `Invoice failed!`,
        icon: "⚠️",
        notify: true,
        tags: subscription.metadata,
      });
      break;
    default:
    // Unhandled event type
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

export default handler;
