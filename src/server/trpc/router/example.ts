import { z } from "zod";

import { router, publicProcedure } from "../trpc";

export const exampleRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      }).nullish()
    )
    .query(({ input }) => {
      return {
        greeting: `Hello ${input?.text ?? "world"}`,
      };
    }),
  goodbye: publicProcedure
    .input(
      z.object({
        adj: z.string().nullish(),
        name: z.string().nullish()
      }).nullish()
    )
    .query(({ input }) => {
      return {
        message: `Goodbye ${input?.adj} ${input?.name}`
      }
    }),
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.example.findMany();
    }),
});
