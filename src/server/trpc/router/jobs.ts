import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { JobPriority, JobStatus } from "@prisma/client";
import { slugify } from "utils/slugify";

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
        tags: {
          select: {
            id: true,
            value: true,
            color: true,
          },
        },
        candidates: {
          select: {
            id: true,
            user: {
              select: {
                image: true,
              },
            },
          },
        },
        _count: {
          select: {
            candidates: true,
            tags: true,
          },
        },
      },
    });
  }),
  addTag: protectedProcedure
    .input(
      z.object({
        tag_id: z.string(),
        job_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.update({
        where: {
          id: input.job_id,
        },
        data: {
          tags: {
            connect: {
              id: input.tag_id,
            },
          },
        },
      });
    }),
  removeTag: protectedProcedure
    .input(
      z.object({
        tag_id: z.string(),
        job_id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.update({
        where: {
          id: input.job_id,
        },
        data: {
          tags: {
            disconnect: {
              id: input.tag_id,
            },
          },
        },
      });
    }),
  createNew: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.any(),
        priority: z.string(),
        salary: z.number(),
        due_date: z.date().optional(),
        tags: z.array(z.string()).optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.create({
        data: {
          title: input.title,
          salary: input.salary,
          due_date: input.due_date,
          description: input.description,
          priority: input.priority as JobPriority,
          slug: slugify(input.title),
          tags: {
            connect: input.tags?.map((tag) => {
              return {
                id: tag,
              };
            }),
          },
          team: {
            connect: {
              id: ctx.user?.membership?.team_id,
            },
          },
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
  edit: protectedProcedure
    .input(
      z.object({
        job_id: z.string(),
        title: z.string(),
        description: z.string().max(250),
        salary: z.number(),
        due_date: z.date().nullable(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.update({
        where: {
          id: input.job_id,
        },
        data: {
          salary: input.salary,
          description: input.description,
          title: input.title,
          due_date: input.due_date,
        },
      });
    }),
  getJob: protectedProcedure
    .input(
      z.object({
        slug: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.job.findUnique({
        where: {
          slug: input.slug,
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
          tags: {
            select: {
              id: true,
              value: true,
              color: true,
            },
          },
          _count: {
            select: {
              candidates: true,
              tags: true,
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
