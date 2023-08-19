import { z } from "zod";
import bcrypt from "bcrypt";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const loginRouter = createTRPCRouter({
  getAllUsers: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany();
  }),
  createAccount: publicProcedure
    .input(
      z.object({
        name: z.string(),
        login: z.string(),
        password: z.string(),
        role: z.number().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findFirst({
        where: { login: input.login },
      });

      if (user) {
        return { status: 409, message: "Ten login został już użyty" };
      }

      const salt = await bcrypt.genSalt(10);
      const hash = await bcrypt.hash(input.password, salt);

      const userData = await ctx.prisma.user.create({
        data: {
          name: input.name,
          login: input.login,
          password: hash,
          role: input.role,
        },
      });
      return { status: 200, userName: userData.name };
    }),
});
