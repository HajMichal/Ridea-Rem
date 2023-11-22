import { z } from "zod";
import bcrypt from "bcrypt";
import AWS from "aws-sdk";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

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
  createPredesignedUrl: protectedProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      if (!ctx.session) {
        throw new Error("Musisz być zalogowany");
      }

      const image = await ctx.prisma.image.create({
        data: {
          title: input.title,
          description: input.description,
        },
      });

      return new Promise((resolve, reject) => {
        s3.createPresignedPost(
          {
            Bucket: "ridearem",
            Fields: {
              key: `images/${image.id}`,
            },
            Conditions: [
              ["starts-with", "$Content-Type", "image/"],
              ["content-length-range", 0, 2000000],
            ],
            Expires: 60,
          },
          (err, signed) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      });
    }),
});
