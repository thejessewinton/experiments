import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import type { ViewState } from "@prisma/client";

export const viewsRouter = router({
  updateView: protectedProcedure
    .input(
      z.object({
        state: z.enum(["BOARD", "LIST"]),
        route: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.view.upsert({
        where: {
          route_view: {
            route: input.route,
            user_id: ctx.user?.id as string,
          },
        },
        update: {
          state: input.state as ViewState,
          route: input.route,
        },
        create: {
          state: input.state as ViewState,
          route: input.route,
          user: {
            connect: {
              id: ctx.user?.id,
            },
          },
        },
      });
    }),
  getView: protectedProcedure
    .input(
      z.object({
        route: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      return await ctx.prisma.view.findUnique({
        where: {
          route_view: {
            route: input.route,
            user_id: ctx.user?.id as string,
          },
        },
        select: {
          state: true,
        },
      });
    }),
});
