import { Box, Container, Typography, Stack, useTheme } from "@mui/material"
import React from "react"
import LoginButton from "../auth/LoginButton"
import UserName from "../auth/UserName"
import Link from "next/link"

const PageHeader = () => {
	const theme = useTheme()
	return (
		<>
			<Box sx={{ background: theme.palette.primary.dark }}>
				<Container sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
					<Typography variant='h1' color='white' sx={{ flexGrow: 1 }}>
						<Link href='/'>Re-DID</Link>
					</Typography>

					<Stack
						direction={"row"}
						spacing={2}
						px={2}
						py={1}
						alignItems={"center"}
						sx={{ borderRadius: theme.shape.borderRadius, background: theme.palette.common.white }}
					>
						<UserName />
						<LoginButton />
					</Stack>
				</Container>
			</Box>
		</>
	)
}

export default PageHeader
