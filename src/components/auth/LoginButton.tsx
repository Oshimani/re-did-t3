import { IconButton } from "@mui/material"
import { useSession, signOut, signIn } from "next-auth/react"

import LoginIcon from "@mui/icons-material/Login"
import LogoutIcon from "@mui/icons-material/Logout"

const LoginButton = () => {
	const { data: sessionData } = useSession()

	if (sessionData)
		return (
			<IconButton color='error' onClick={() => signOut()} sx={{ alignSelf: "center" }}>
				<LogoutIcon />
			</IconButton>
		)

	return (
		<IconButton color='error' onClick={() => signIn()} sx={{ alignSelf: "center" }}>
			<LoginIcon />
		</IconButton>
	)
}
export default LoginButton
