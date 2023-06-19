import { z } from "zod"
import { createTRPCRouter, publicProcedure, protectedProcedure } from "~/server/api/trpc"
import { SubIdSchema } from "./sub"

export const PostCreatePayloadSchema = z.object({
	title: z.string(),
	body: z.string().max(1000),

	subId: SubIdSchema
})

export const postRouter = createTRPCRouter({
	create: protectedProcedure.input(PostCreatePayloadSchema).mutation(({ input, ctx }) => {
		return ctx.prisma.post.create({
			data: {
				...input,
				userId: ctx.session.user.id
			}
		})
	}),

	bySubId: publicProcedure.input(z.object({ id: SubIdSchema })).query(({ ctx, input: { id } }) => {
		return ctx.prisma.post.findMany({
			where: { subId: id },
			include: { user: true, votings: true }
		})
	}),

	vote: protectedProcedure
		.input(z.object({ postId: z.string(), value: z.number().min(-1).max(1).int() }))
		.mutation(({ input, ctx }) => {
			const { postId, value } = input
			const userId = ctx.session.user.id
			const vote = value === 1 ? 1 : -1
			return ctx.prisma.voting.upsert({
				where: {
					userId_postId: { postId, userId }
				},
				create: {
					postId,
					userId,
					vote
				},
				update: {
					vote
				}
			})
		})
})
