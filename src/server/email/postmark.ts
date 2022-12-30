import { env } from "env/server.mjs";
import { Client } from "postmark";

export const postmark = new Client(env.POSTMARK_API_TOKEN);
