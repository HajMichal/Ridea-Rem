import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const newsDataRouter = createTRPCRouter({
  createNewPost: publicProcedure
    .input(
      z.object({
        title: z.string(),
        description: z.string(),
        url: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.image.create({
        data: {
          title: input.title,
          description: input.description,
          url: input.url,
        },
      });
    }),
  getLastPosts: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.image.findMany({
      take: 6,
    });
  }),
});
