import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tagsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tag.findMany({
      where: {
        user_id: ctx.user?.id,
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
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
});
