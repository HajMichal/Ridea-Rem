import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { getAllFilesFromBucket } from "../../aws";

export const getAllDocumentRouter = createTRPCRouter({
  uploadFile: adminProcedure.query(() => {
    return getAllFilesFromBucket("documents");
  }),
});
