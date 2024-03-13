import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { downloadFileFromBucket } from "../../aws";

export const downloadDocumentRouter = createTRPCRouter({
  downloadFile: publicProcedure
    .input(z.string())
    .mutation(({ input }): string => {
      return downloadFileFromBucket(input);
    }),
});
