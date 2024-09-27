import { z } from "zod";
import {
  adminProcedure,
  createTRPCRouter,
  publicProcedure,
} from "~/server/api/trpc";

export const newsDataRouter = createTRPCRouter({
  createNewPost: adminProcedure
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
  getLastPosts: publicProcedure.query(async ({ ctx }) => {
    const data = await ctx.prisma.image.findMany();
    console.log(data);
    return data;
  }),
  updatePost: adminProcedure
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
  deletePost: adminProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      await ctx.prisma.image.delete({
        where: {
          id: input,
        },
      });
    }),
});
