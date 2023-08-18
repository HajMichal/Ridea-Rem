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
      console.log(input);
      if (user) {
        throw new Error("User with this login already exists");
      }

      const saltRounds = 10;
      const salt = await bcrypt.genSalt(saltRounds);
      const hash = await bcrypt.hash(input.password, salt);

      await ctx.prisma.user.create({
        data: {
          name: input.name,
          login: input.login,
          password: hash,
          role: input.role,
        },
      });
      return { status: 200 };
    }),
});
