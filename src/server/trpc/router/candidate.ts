import { CandidateLevel } from "@prisma/client";
import { z } from "zod";
import { protectedProcedure, router } from "../trpc";

export const candidateRouter = router({
  getCurrent: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.candidate.findUnique({
      where: { user_id: ctx.user?.id },
    });
  }),
  updateCandidate: protectedProcedure
    .input(z.object({ salary: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.candidate.upsert({
        where: { user_id: ctx.user?.id },
        update: { salary: Number(input.salary) },
        create: {
          salary: Number(input.salary),
          github_url: "",
          level: CandidateLevel.JUNIOR,
          job_title: "",
          year_of_experience: 0,
          user_id: ctx.user?.id as string,
        },
      });
    }),
});
