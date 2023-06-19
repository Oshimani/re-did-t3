import { FC } from "react"
import { Post, User, Voting } from "@prisma/client"
import { formatDateTime } from "~/utils/formatters"
import Vote from "./Voting"

import { Box, Stack, Typography, useTheme } from "@mui/material"

const PostPreview: FC<Post & { user: User; votings: Voting[] }> = (props) => {
	const { body, createdAt, id, subId, title, updatedAt, user, votings } = props
	const theme = useTheme()
	return (
		<Box
			px={2}
			pt={2}
			pb={0.2}
			mb={2}
			sx={{ backgroundColor: theme.palette.common.white, borderRadius: theme.shape.borderRadius }}
		>
			<Stack direction='row' spacing={2} alignItems={"stretch"} sx={{ position: "relative" }}>
				{/* VOTING */}
				<Vote postId={id} votings={votings} />

				<Stack direction='column' spacing={1} flexGrow={1} justifyContent={"center"}>
					{/* TEXT */}
					<Typography sx={{ fontWeight: "bold" }}>{title}</Typography>

					{/* METADATA FOOTER */}
					<Stack direction='row' spacing={1} sx={{ position: "absolute", bottom: 6 }}>
						<Typography variant='caption' sx={{ color: theme.palette.grey[500] }}>
							Posted by: {user.name}
						</Typography>
						<Typography variant='caption' sx={{ color: theme.palette.grey[500] }}>
							{formatDateTime(createdAt)}
						</Typography>
					</Stack>
				</Stack>
			</Stack>
		</Box>
	)
}

export default PostPreview
