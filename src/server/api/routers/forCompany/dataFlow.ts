import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";
import { s3, setFileToBucket } from "../photovoltaic/dataFlow";

// const getParsedJsonObject = async () => {
//     const dataFile = await s3
//       .getObject({
//         Bucket: "ridearem",
//         Key: "heatpump.json",
//       })
//       .promise();
//     // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
//     const convertedFile: HeatPumpCalculatorType = JSON.parse(
//       dataFile?.Body?.toString() ?? "null"
//     );
//     return convertedFile;
//   };

export const heatPumpDataFlowRouter = createTRPCRouter({});
