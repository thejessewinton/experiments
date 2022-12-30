import { stripe } from "server/payment/stripe";
import { router, protectedProcedure } from "../trpc";
import { z } from "zod";
import { MemberRole } from "@prisma/client";

export const teamsRouter = router({
  createNew: protectedProcedure.mutation(({ ctx }) => {
    return ctx.prisma.team.create({
      data: {
        slug: "team",
        members: {
          connectOrCreate: {
            where: {
              user_id: ctx.user?.id,
            },
            create: {
              user: {
                connect: {
                  id: ctx.user?.id,
                },
              },
              role: MemberRole.ADMIN,
            },
          },
        },
      },
    });
  }),
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.user.findMany();
  }),
  upgradePlan: protectedProcedure
    .input(
      z.object({
        customer_id: z.string(),
        plan_id: z.string(),
        price_id: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      await stripe.subscriptions.create({
        customer: input.customer_id,
        items: [{ price: input.price_id }],
      });
    }),
});
