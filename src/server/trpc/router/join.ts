import { z } from "zod";
import { router, publicProcedure } from "../trpc";

export const joinRouter = router({
  joinWaitlist: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        company: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.waitlist.create({
        data: input,
      });
    }),
});
