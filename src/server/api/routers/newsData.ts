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
  updatePost: publicProcedure
    .input(
      z.object({
        id: z.string(),
        title: z.string().optional(),
        description: z.string().optional(),
        url: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      return await ctx.prisma.image.update({
        where: { id: input.id },
        data: {
          description: input.description,
          title: input.title,
          url: input.url,
        },
      });
    }),
  deletePost: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.image.delete({
        where: {
          id: input,
        },
      });
    }),
});
