import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { JobPriority, JobStatus } from "@prisma/client";
import { slugify } from "utils/slugify";

export const jobsRouter = router({
  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.job.findMany({
      where: {
        user_id: ctx.user?.id,
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
        description: z.string().max(250),
        priority: z.string(),
        salary: z.number(),
        due_date: z.date(),
        office_type: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.job.create({
        data: {
          ...input,
          priority: input.priority as JobPriority,
          slug: slugify(input.title),
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
        office_type: z.string(),
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
          office_type: input.office_type,
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
