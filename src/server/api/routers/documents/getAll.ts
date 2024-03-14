import { getAllFilesFromBucket } from "~/utils/aws/getAllFilesFromBucket";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const getAllDocumentRouter = createTRPCRouter({
  getAllFiles: publicProcedure.query(() => {
    return getAllFilesFromBucket();
  }),
});
