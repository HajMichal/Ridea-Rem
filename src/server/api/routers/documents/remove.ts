import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { removeFileFromBucket } from "../../aws";

export const deleteDocumentRouter = createTRPCRouter({
  deleteFile: adminProcedure.input(z.string()).mutation(({ input }) => {
    return removeFileFromBucket(input);
  }),
});
