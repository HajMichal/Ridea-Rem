import { getAllFilesFromBucket } from "~/utils/aws/";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const getAllDocumentRouter = createTRPCRouter({
  getAllFiles: publicProcedure
    .input(z.union([z.literal("documents"), z.literal("specification")]))
    .query(({ input }) => {
      return getAllFilesFromBucket(input);
    }),
});
