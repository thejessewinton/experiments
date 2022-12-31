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
  const signature = req.headers["stripe-signature"] as string;
  const reqBuffer = await buffer(req);

  const stripeEvent = stripe.webhooks.constructEvent(
    reqBuffer,
    signature,
    env.STRIPE_WEBHOOK_SECRET
  );

  const object = stripeEvent.data.object as Stripe.Subscription;

  console.log(object);

  const customer = await prisma.team.findUnique({
    where: {
      stripe_customer_id: object.customer as string,
    },
  });

  switch (stripeEvent.type) {
    case "checkout.session.completed":
      await logsnag.publish({
        channel: channels.subscriptionCreated,
        event: "Subscription Created",
        description: `Subscription created for ${customer?.name}.`,
        icon: "🎉",
        notify: true,
        tags: {
          customer: customer?.name as string,
        },
      });
      break;
    case "invoice.paid":
      await logsnag.publish({
        channel: channels.invoicePaid,
        event: "Invoice Paid",
        description: `Invoice paid by ${customer?.name}.`,
        icon: "🎉",
        notify: true,
        tags: {
          customer: customer?.name as string,
        },
      });
      break;
    case "invoice.payment_failed":
      await logsnag.publish({
        channel: channels.invoiceFailed,
        event: "Invoice Failed",
        description: `Invoice failed for ${customer?.name}.`,
        icon: "🎉",
        notify: true,
        tags: {
          customer: customer?.name as string,
        },
      });
      break;
    default:
  }

  // Return a response to acknowledge receipt of the event
  res.status(200).json({ received: true });
};

export default handler;
