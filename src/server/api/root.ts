import { createTRPCRouter } from "~/server/api/trpc";
import { dataFlowRouter } from "./routers/photovoltaic/dataFlow";
import { loginRouter } from "./routers/users/userDataHandling";
import { photovoltaics_calculator } from "./routers/photovoltaic/photovoltaics_calculator";
import { heatPump_calculator } from "./routers/heatpump/heatPumps_calculator";
import { heatPumpDataFlowRouter } from "./routers/heatpump/dataFlow";
import { forCompanyCalculator } from "./routers/forCompany/forCompany_calculator";
import { forCompanyDataFlowRouter } from "./routers/forCompany/dataFlow";
import { newsDataRouter } from "./routers/news/newsData";
import { heatHomeCalculator } from "./routers/heatHome/heatHome_calculator";
import { heatHomeDataFlowRouter } from "./routers/heatHome/dataFlow";
import { uploadDocumentRouter } from "./routers/documents/upload";
import { getAllDocumentRouter } from "./routers/documents/getAll";
import { downloadDocumentRouter } from "./routers/documents/download";
import { deleteDocumentRouter } from "./routers/documents/remove";
import { airConditionDataFlowRouter } from "./routers/airCondition/dataFlow";
import { airConditionCalculator } from "./routers/airCondition/airCondition_calculator";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  newsDataRouter: newsDataRouter,
  userDataHandling: loginRouter,

  uploadDocumentRouter: uploadDocumentRouter,
  getAllDocumentRouter: getAllDocumentRouter,
  downloadDocumentRouter: downloadDocumentRouter,
  deleteDocumentRouter: deleteDocumentRouter,

  dataFlow: dataFlowRouter,
  photovoltaics: photovoltaics_calculator,
  heatPump: heatPump_calculator,
  heatPumpDataFlowRouter: heatPumpDataFlowRouter,
  forCompany: forCompanyCalculator,
  forCompanyDataFlowRouter: forCompanyDataFlowRouter,
  heatHome: heatHomeCalculator,
  heatHomeDataFlowRouter: heatHomeDataFlowRouter,
  airCondition: airConditionCalculator,
  airConditionDataFlowRouter: airConditionDataFlowRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
