import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { setFileToBucket } from "~/utils/aws/";
import { z } from "zod";

export const uploadDocumentRouter = createTRPCRouter({
  uploadFile: adminProcedure
    .input(
      z.object({
        base64: z.string(),
        fileName: z.string(),
      })
    )
    .mutation(({ input }) => {
      const decodedPdf = Buffer.from(input.base64, "base64");
      return setFileToBucket(decodedPdf, "documents/" + input.fileName);
    }),
});
