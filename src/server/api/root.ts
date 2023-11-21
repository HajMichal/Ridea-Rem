import { createTRPCRouter } from "~/server/api/trpc";
import { dataFlowRouter } from "./routers/photovoltaic/dataFlow";
import { loginRouter } from "./routers/userDataHandling";
import { photovoltaics_calculator } from "./routers/photovoltaic/photovoltaics_calculator";
import { heatPump_calculator } from "./routers/heatpump/heatPumps_calculator";
import { heatPumpDataFlowRouter } from "./routers/heatpump/dataFlow";
import { forCompanyCalculator } from "./routers/forCompany/forCompany_calculator";
import { forCompanyDataFlowRouter } from "./routers/forCompany/dataFlow";
import { newsDataRouter } from "./routers/newsData";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  dataFlow: dataFlowRouter,
  newsDataRouter: newsDataRouter,
  userDataHandling: loginRouter,

  heatPumpDataFlowRouter: heatPumpDataFlowRouter,
  photovoltaics: photovoltaics_calculator,
  heatPump: heatPump_calculator,
  forCompany: forCompanyCalculator,
  forCompanyDataFlowRouter: forCompanyDataFlowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
