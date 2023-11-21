import { z } from "zod";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

AWS.config.update({
  region: "eu-central-1",
});

const s3 = new AWS.S3({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

export const newsDataRouter = createTRPCRouter({
  setNewPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        file: z
          .object({
            lastModifiedDate: z.date(),
            name: z.string(),
            size: z.number(),
            type: z.string(),
            webkitRelativePath: z.string(),
          })
          .optional(),
      })
    )
    .mutation(({ input }) => {
      console.log(input);
    }),
});
