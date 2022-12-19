import { router } from "../trpc";
import { authRouter } from "./auth";
import { jobsRouter } from "./jobs";
import { teamsRouter } from "./teams";
import { userRouter } from "./user";

export const appRouter = router({
  teams: teamsRouter,
  jobs: jobsRouter,
  auth: authRouter,
  users: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
