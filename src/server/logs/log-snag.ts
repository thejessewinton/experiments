import { env } from "env/server.mjs";
import { LogSnag } from "logsnag";

export const logsnag = new LogSnag({
  token: env.LOGSNAG_API_TOKEN,
  project: env.LOGSNAG_PROJECT,
});

export const channels = {
  userRegister: "user-register",
  subscriptionCreated: "subscription-created",
  invoicePaid: "invoice-paid",
  invoiceFailed: "invoice-failed",
} as const;
