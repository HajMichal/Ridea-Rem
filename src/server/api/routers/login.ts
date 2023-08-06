import fs from "fs";
import { z } from "zod";
import bcrypt from "bcrypt";
import { setFileToBucket } from "./dataFlow";
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
      const fileContent = fs.readFileSync("./prisma/db.sqlite");

      setFileToBucket(fileContent, "db.sqlite");
      return { status: 200 };
    }),
});
