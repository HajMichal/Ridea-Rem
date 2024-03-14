import { downloadFileFromBucket } from "~/utils/aws/downloadFileFromBucket";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const downloadDocumentRouter = createTRPCRouter({
  downloadFile: publicProcedure
    .input(z.string())
    .mutation(({ input }): string => {
      return downloadFileFromBucket(input);
    }),
});
