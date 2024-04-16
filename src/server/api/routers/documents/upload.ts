import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { setFileToBucket } from "~/utils/aws/";
import { z } from "zod";

export const uploadDocumentRouter = createTRPCRouter({
  uploadFile: adminProcedure
    .input(
      z.object({
        base64: z.string(),
        fileName: z.string(),
        fileFolder: z.string(),
      })
    )
    .mutation(({ input }) => {
      const decodedFile = Buffer.from(input.base64, "base64");
      return setFileToBucket(
        decodedFile,
        input.fileFolder + "/" + input.fileName
      );
    }),
});
