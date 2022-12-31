import { stripe } from "server/payment/stripe";
import { slugify } from "utils/slugify";
import { z } from "zod";
import { router, protectedProcedure } from "../trpc";

export const teamsRouter = router({
  getCurrentTeam: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findUnique({
      where: {
        id: ctx.user?.membership?.team_id,
      },
      include: {
        members: true,
      },
    });
  }),
  getUsage: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.team.findUnique({
      where: {
        id: ctx.user?.membership?.team_id,
      },
      include: {
        subscription: {
          select: {
            active_jobs: true,
            monthly_credits: true,
          },
        },
        _count: {
          select: {
            jobs: true,
            offers: true,
          },
        },
      },
    });
  }),
  updateTeam: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        slug: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      await stripe.customers.update(
        ctx.user?.membership?.team.stripe_customer_id as string,
        {
          name: input.name,
        }
      );
      return await ctx.prisma.team.update({
        where: {
          id: ctx.user?.membership?.team_id,
        },
        data: {
          name: input.name,
          slug: input.slug || slugify(input.name),
        },
      });
    }),
});
