import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { JobStatus } from "@prisma/client";

export const jobsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.job.findMany({
      where: {
        team_id: ctx.user?.membership?.team_id,
      },
      include: {
        user: {
          include: {
            view: {
              select: {
                state: true,
              },
            },
          },
        },
        _count: {
          select: {
            candidates: true,
          },
        },
      },
    });
  }),
  createNew: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string().max(250),
        category: z.string(),
        salary: z.string(),
        office_type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.create({
        data: {
          ...input,
          salary: Number(input.salary),
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
  getJob: protectedProcedure
    .input(
      z.object({
        job_id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.job.findUnique({
        where: {
          id: input.job_id,
        },
        include: {
          candidates: {
            orderBy: {
              salary: "desc",
            },
          },
        },
      });
    }),
  deleteJob: protectedProcedure
    .input(
      z.object({
        job_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.delete({
        where: {
          id: input.job_id,
        },
      });
    }),

  updateStatus: protectedProcedure
    .input(
      z.object({
        job_id: z.string(),
        status: z
          .enum(["OPEN", "CLOSED", "OFFERED", "INTERVIEWING"])
          .nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.update({
        where: {
          id: input.job_id,
        },
        data: {
          status: input.status as JobStatus,
        },
      });
    }),
});
