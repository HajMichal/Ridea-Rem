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
interface FileData {
  fields: Record<string, string>;
  url: string;
}
interface ImageMetadata extends Image {
  url: string;
}
export const newsDataRouter = createTRPCRouter({
  createPredesignedUrl: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
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
          (err: Error, signed: FileData) => {
            if (err) return reject(err);
            resolve(signed);
          }
        );
      });
    }),
  getImagesFromS3: publicProcedure.query(async ({ ctx }) => {
    const imagesWithData = await ctx.prisma.image.findMany({
      take: 6,
    });

    const extendedImages: ImageMetadata[] = await Promise.all(
      imagesWithData.map(async (image) => {
        return {
          ...image,
          url: await s3.getSignedUrlPromise("getObject", {
            Bucket: "ridearem",
            Key: `images/${image.id}`,
          }),
        };
      })
    );
    return extendedImages;
  }),
});
