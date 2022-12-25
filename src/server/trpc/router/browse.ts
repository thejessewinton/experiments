import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { CandidateLevel } from "@prisma/client";

export const browseRouter = router({
  getCandidates: protectedProcedure
    .input(
      z.object({
        years_experience: z.number().optional(),
        languages: z
          .enum(["javascript", "css", "html"])
          .default("javascript")
          .optional(),
        frameworks: z
          .enum(["nextjs", "remix", "solid", "svelte"])
          .default("nextjs")
          .optional(),
        levels: z
          .enum(["JUNIOR", "MID", "SENIOR"])
          .default("JUNIOR")
          .optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.candidate.findMany({
        where: {
          year_of_experience: input.years_experience || undefined,
          level: {
            in: input.levels as CandidateLevel,
          },
          languages: {
            every: {
              language: {
                in: input.languages,
              },
            },
          },
          frameworks: {
            every: {
              name: {
                in: input.frameworks,
              },
            },
          },
        },
        include: {
          user: true,
          _count: {
            select: {
              jobs: true,
            },
          },
        },
      });
    }),
  addToJob: protectedProcedure
    .input(
      z.object({
        job_id: z.string(),
        candidate_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.update({
        where: {
          id: input.job_id,
        },
        data: {
          candidates: {
            connect: {
              id: input.candidate_id,
            },
          },
        },
      });
    }),
});
