import { removeFileFromBucket } from "~/utils/aws/";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { z } from "zod";

export const deleteDocumentRouter = createTRPCRouter({
  deleteFile: adminProcedure.input(z.string()).mutation(({ input }) => {
    return removeFileFromBucket(input);
  }),
});
