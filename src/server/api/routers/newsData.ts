import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { Image } from "@prisma/client";
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3 } from "../routers/photovoltaic/dataFlow";
interface ImageMetadata extends Image {
  url: string;
}

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
  createPredesignedUrl: publicProcedure
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
          (err: Error, signed: unknown) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      });
    }),
  // completeMultipartUpload: publicProcedure
  //   .input(
  //     z.object({
  //       key: z.string(),
  //       uploadId: z.string(),
  //       parts: z.array(
  //         z.object({
  //           ETag: z.string(),
  //           PartNumber: z.number(),
  //         })
  //       ),
  //     })
  //   )
  //   .mutation(async ({ ctx, input }) => {
  //     const { key, uploadId, parts } = input;
  //     const { s3 } = ctx;

  //     const completeMultipartUploadOutput = s3.completeMultipartUpload({
  //       Bucket: "ridearem",
  //       Key: key,
  //       UploadId: uploadId,
  //       MultipartUpload: {
  //         Parts: parts,
  //       },
  //     });

  //     return completeMultipartUploadOutput;
  //   }),
});
