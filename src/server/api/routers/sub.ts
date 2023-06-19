import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc"

export const SubIdSchema = z.coerce.string().cuid()

export const subRouter = createTRPCRouter({
	getPopular: publicProcedure.query(({ ctx }) => {
		return ctx.prisma.sub.findMany({
			take: 5,
			orderBy: { createdAt: "desc" },
			select: {
				id: true,
				name: true,
				createdAt: true,
				updatedAt: true,
				_count: {
					select: {
						posts: true
					}
				}
			}
		})
	}),

	byId: publicProcedure.input(z.object({ id: SubIdSchema })).query(({ ctx, input: { id } }) => {
		return ctx.prisma.sub.findUniqueOrThrow({ where: { id } })
	}),

	byName: publicProcedure
		.input(z.object({ name: z.string() }))
		.query(({ ctx, input: { name } }) => {
			return ctx.prisma.sub.findUniqueOrThrow({ where: { name } })
		}),

	create: protectedProcedure
		.input(
			z.object({
				name: z.string()
			})
		)
		.mutation(({ input, ctx }) => {
			return ctx.prisma.sub.create({
				data: {
					name: input.name
				}
			})
		})
})
