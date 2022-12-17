import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),
});
