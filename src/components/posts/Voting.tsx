import { FC } from "react"
import { Stack, IconButton, Typography } from "@mui/material"
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward"
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward"
import { api } from "~/utils/api"
import { enqueueSnackbar } from "notistack"
import { Voting } from "@prisma/client"
import { useSession } from "next-auth/react"

const Vote: FC<{ postId: string; votings: Voting[] }> = (props) => {
	const { postId, votings } = props

	const session = useSession()

	const utils = api.useContext()
	const mutation = api.posts.vote.useMutation({
		onSuccess: () => {
			enqueueSnackbar("Voted successfully", { variant: "success" })
			utils.posts.bySubId.invalidate()
		},
		onError: (error) => {
			enqueueSnackbar(error.message, { variant: "error" })
		}
	})

	const userVote = votings.find((voting) => voting.userId === session.data?.user?.id)?.vote || 0

	return (
		<Stack direction='column' alignItems='center' spacing={1}>
			{/* UPVOTE */}
			<IconButton
				color={userVote > 0 ? "success" : "default"}
				onClick={() => mutation.mutate({ postId, value: 1 })}
			>
				<ArrowUpwardIcon />
			</IconButton>
			{/* SCORE */}
			<Typography variant='h6' sx={{ lineHeight: 1 }}>
				{votings.reduce((acc, curr) => acc + curr.vote, 0)}
			</Typography>
			{/* DOWNVOTE */}
			<IconButton
				color={userVote < 0 ? "error" : "default"}
				onClick={() => mutation.mutate({ postId, value: -1 })}
			>
				<ArrowDownwardIcon />
			</IconButton>
		</Stack>
	)
}

export default Vote
