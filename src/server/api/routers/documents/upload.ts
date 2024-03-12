import { z } from "zod";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { s3 } from "../../aws";

const setFileToBucket = (key: string) => {
  const params = {
    Bucket: "ridearem",
    Key: key,
  };
  s3.putObject(params, (err, data) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`File uploaded successfully. ETag: ${data.ETag}`);
    }
  });
};

export const uploadDocumentRouter = createTRPCRouter({
  uploadFile: adminProcedure.input(z.string()).mutation(({ input }) => {
    return setFileToBucket("documents/" + input);
  }),
});
