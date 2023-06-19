import Image from "next/image"

import { Typography } from "@mui/material"
import { useSession } from "next-auth/react"

const UserName = () => {
	const { data: sessionData } = useSession()

	return (
		<>
			{sessionData?.user ? (
				<>
					<Image src={sessionData?.user.image || ""} alt='Profile Picture' width={32} height={32} />
					<Typography color='primary'>{sessionData?.user.name}</Typography>
				</>
			) : (
				<Typography color='primary'>Login or create an account</Typography>
			)}
		</>
	)
}

export default UserName
