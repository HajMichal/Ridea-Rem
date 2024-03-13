import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllFilesFromBucket } from "../../aws";

export const getAllDocumentRouter = createTRPCRouter({
  getAllFiles: publicProcedure.query(() => {
    return getAllFilesFromBucket();
  }),
});
