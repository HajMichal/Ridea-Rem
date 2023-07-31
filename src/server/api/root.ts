import { createTRPCRouter } from "~/server/api/trpc";
import { dataFlowRouter } from "./routers/dataFlow";
import { loginRouter } from "./routers/login";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dataFlow: dataFlowRouter,
  login: loginRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
