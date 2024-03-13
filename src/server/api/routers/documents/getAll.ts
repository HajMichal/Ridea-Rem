import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { getAllFilesFromBucket } from "../../aws";

export const getAllDocumentRouter = createTRPCRouter({
  uploadFile: publicProcedure.query(() => {
    return getAllFilesFromBucket();
  }),
});
