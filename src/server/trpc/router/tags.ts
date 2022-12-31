import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const tagsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.tag.findMany({
      where: {
        team_id: ctx.user?.membership?.team_id,
      },
      include: {
        _count: {
          select: {
            job: true,
          },
        },
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
  deleteTag: protectedProcedure
    .input(
      z.object({
        tag_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.tag.delete({
        where: {
          id: input.tag_id,
        },
      });
    }),
});
