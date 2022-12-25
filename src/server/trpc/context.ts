import { type inferAsyncReturnType } from "@trpc/server";
import { type CreateNextContextOptions } from "@trpc/server/adapters/next";

import { getServerAuthSession } from "../common/get-server-auth-session";
import { prisma } from "../db/client";

/**
 * This is the actual context you'll use in your router
 * @link https://trpc.io/docs/context
 **/
export const createContext = async (opts: CreateNextContextOptions) => {
  const { req, res } = opts;

  const session = await getServerAuthSession({ req, res });

  const user = await prisma.user.findUnique({
    where: {
      id: session?.user?.id,
    },
    include: {
      membership: true,
    },
  });

  return {
    session,
    user,
    prisma,
  };
};

export type Context = inferAsyncReturnType<typeof createContext>;
