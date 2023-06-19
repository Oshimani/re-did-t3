import { type Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { type AppType } from "next/app"
import { api } from "~/utils/api"
import "~/styles/globals.css"
import PageHeader from "~/components/layout/PageHeader"
import { Container, Grid, useTheme } from "@mui/material"
import SideNav from "~/components/layout/SideNav"
import { SnackbarProvider } from "notistack"

const MyApp: AppType<{ session: Session | null }> = ({
	Component,
	pageProps: { session, ...pageProps }
}) => {
	const theme = useTheme()

	return (
		<SnackbarProvider >
			<SessionProvider session={session}>
				{/* PAGE HEADER */}
				<PageHeader />

				<Container sx={{ py: 2, background: theme.palette.grey[200] }}>
					<Grid container spacing={2}>
						{/* CONTENT */}
						<Grid item xs={12} md={9}>
							<Component {...pageProps} />
						</Grid>

						{/* SIDEBAR */}
						<SideNav />
					</Grid>
				</Container>
			</SessionProvider>
		</SnackbarProvider>
	)
}

export default api.withTRPC(MyApp)
