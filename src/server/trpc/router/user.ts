import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
  updateUser: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const emailCollisions = await ctx.prisma.user.count({
        where: {
          email: input.email,
        },
      });

      if (emailCollisions > 0 && ctx.user?.email !== input.email) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Email already in use",
        });
      }

      return await ctx.prisma.user.update({
        where: {
          id: ctx.user?.id,
        },
        data: {
          ...input,
        },
      });
    }),
});
