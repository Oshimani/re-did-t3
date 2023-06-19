import { Typography, useTheme } from "@mui/material"
import { FC } from "react"
import { api } from "~/utils/api"
import SubCard from "./SubCard"

const PopularSubs: FC = () => {
	const query = api.subs.getPopular.useQuery()
	const theme = useTheme()

	return (
		<>
			<Typography variant='h3'>Popular Subs</Typography>
			{query.data?.map((sub) => (
				<SubCard key={sub.id} {...sub} />
			))}
		</>
	)
}

export default PopularSubs
