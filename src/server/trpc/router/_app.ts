import { router } from "../trpc";
import { authRouter } from "./auth";
import { browseRouter } from "./browse";
import { candidateRouter } from "./candidate";
import { jobsRouter } from "./jobs";
import { stripeRouter } from "./stripe";
import { tagsRouter } from "./tags";
import { teamsRouter } from "./teams";
import { userRouter } from "./user";
import { viewsRouter } from "./views";

export const appRouter = router({
  teams: teamsRouter,
  jobs: jobsRouter,
  auth: authRouter,
  user: userRouter,
  candidate: candidateRouter,
  views: viewsRouter,
  browse: browseRouter,
  tags: tagsRouter,
  stripe: stripeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
