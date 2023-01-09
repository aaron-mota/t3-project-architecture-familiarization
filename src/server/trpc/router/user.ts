import { string, z } from "zod";

import { router, publicProcedure } from "../trpc";

export const userRouter = router({

  // SINGLE
  ////////////

  createOne: publicProcedure
    .input(z.object({first_name: z.string(), last_name: z.string(), email: z.string(), gender: z.string()}))
    .mutation(async ({ ctx, input }) => {
      const doc = input
      const createdDoc = await ctx.prisma.user.create({
        data: doc,
      })  // [createdDoc] createdDoc (id, not _id (mongodb))
      return createdDoc
    }),
  getOneById: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const doc = await ctx.prisma.user.findFirst({
        where: {
          id: input
        }
      }) // [doc] doc (id, not _id (mongodb))
      return doc
    }),
  updateOne: publicProcedure
    .input(z.object({id: z.string(), first_name: z.string(), last_name: z.string(), email: z.string(), gender: z.string()}))
    .mutation(async ({ ctx, input }) => {
      let doc: Partial<typeof input> = input
      const id = doc.id
      delete doc.id
      const updatedDoc = await ctx.prisma.user.update({
        where: {
          id: id
        },
        data: doc
      }) // [updatedDoc] doc (id, not _id (mongodb))
      console.log("updatedDoc", updatedDoc)
      doc.id = id
      return doc
    }),
  deleteOne: publicProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const deletedDoc = await ctx.prisma.user.delete({
        where: {
          id: input
        }
      })  // [deletedDoc] deletedDoc (id, not _id (mongodb))
      const bool = Boolean(deletedDoc.id)
      return bool
    }),


  // MANY
  ////////////
  getAll: publicProcedure
    .query(({ ctx }) => {
      return ctx.prisma.user.findMany();
    }),
});

