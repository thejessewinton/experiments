import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tagsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tag.findMany({
      where: {
        team_id: ctx.user?.membership?.team_id,
      },
    });
  }),
  addTag: protectedProcedure
    .input(
      z.object({
        value: z.string(),
        color: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.tag.create({
        data: {
          value: input.value,
          color: input.color,
          team: {
            connect: {
              id: ctx.user?.membership?.team_id,
            },
          },
        },
      });
    }),
});
