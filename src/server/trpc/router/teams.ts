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
});
