import { env } from "env/server.mjs";
import type { NextApiRequest, NextApiResponse } from "next";
import type Stripe from "stripe";
import { prisma } from "server/db/client";
import { stripe } from "server/payment/stripe";
import { channels, logsnag } from "server/logs/log-snag";

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // Retrieve the event by verifying the signature using the raw body and secret.
  const signature = req.headers["stripe-signature"];

  const stripeEvent = stripe.webhooks.constructEvent(
    req.body,
    signature as string | string[] | Buffer,
    env.STRIPE_WEBHOOK_SECRET
  );

  const object = stripeEvent.data.object as Stripe.Subscription;

  switch (stripeEvent.type) {
    case "checkout.session.completed":
      const subscription = await stripe.subscriptions.retrieve(object.id);

      const customer = await prisma.subscription.update({
        where: {
          stripe_subscription_id: subscription.id,
        },
        data: {
          stripe_price_id: subscription.items.data[0]?.price.id,
        },
        include: {
          user: true,
        },
      });

      await logsnag.publish({
        channel: channels.subscriptionCreated,
        event: "Subscription Created",
        description: `Subscription created for ${customer.user.email}!`,
        icon: "🎉",
        notify: true,
        tags: subscription.metadata,
      });
      break;
    case "invoice.paid":
      // Continue to provision the subscription as payments continue to be made.
      // Store the status in your database and check when a user accesses your service.
      // This approach helps you avoid hitting rate limits.
      break;
    case "invoice.payment_failed":
      // The payment failed or the customer does not have a valid payment method.
      // The subscription becomes past_due. Notify your customer and send them to the
      // customer portal to update their payment information.
      break;
    default:
    // Unhandled event type
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

export default handler;
