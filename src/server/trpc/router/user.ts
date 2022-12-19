import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { type ViewState } from "@prisma/client";

export const userRouter = router({
  updateView: protectedProcedure
    .input(
      z.object({
        state: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.view.upsert({
        where: {
          id: ctx.user?.id,
        },
        update: {
          state: input.state as ViewState,
        },
        create: {
          state: input.state as ViewState,
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
});
