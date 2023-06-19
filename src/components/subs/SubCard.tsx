import { FC } from "react"
import { Sub } from "@prisma/client"
import { Box, Stack, Typography, useTheme } from "@mui/material"
import Link from "next/link"
import { Chat } from "@mui/icons-material"

const SubCard: FC<Sub & { _count: { posts: number } }> = (props) => {
	const { name } = props
	const theme = useTheme()
	return (
		<Box
			key={name}
			px={2}
			py={1}
			m={2}
			sx={{
				backgroundColor: theme.palette.primary.main,
				borderRadius: theme.shape.borderRadius,
				boxShadow: theme.shadows[6]
			}}
		>
			<Stack direction='row' spacing={2} alignItems={"center"}>
				<Typography variant='h4' color='white' flexGrow={1}>
					<Link href={`/s/${name}`}>{name}</Link>
				</Typography>

				<Stack direction='row' spacing={0.5} alignItems='center'>
					<Typography variant='h4' color='white'>
						{props._count.posts}
					</Typography>
					<Chat sx={{ color: theme.palette.common.white }} />
				</Stack>
			</Stack>
		</Box>
	)
}

export default SubCard
