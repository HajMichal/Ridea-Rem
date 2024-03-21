import { getAllFilesFromBucket } from "~/utils/aws/";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getAllDocumentRouter = createTRPCRouter({
  getAllFiles: publicProcedure.query(() => {
    return getAllFilesFromBucket();
  }),
});
