import { router, protectedProcedure } from "../trpc";
import { z } from "zod";

export const jobsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.job.findMany({
      where: {
        team_id: ctx.user?.membership?.team_id,
      },
    });
  }),
  createNew: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().max(250),
        salary: z.string(),
        office_type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.create({
        data: {
          ...input,
          salary: Number(input.salary),
          team: {
            connect: {
              id: ctx.user?.membership?.team_id,
            },
          },
        },
      });
    }),
});
