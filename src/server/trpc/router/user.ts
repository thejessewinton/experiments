import { protectedProcedure, router } from "../trpc";

export const userRouter = router({
  getCurrent: protectedProcedure.query(({ ctx }) => {
    return ctx.user;
  }),
});
