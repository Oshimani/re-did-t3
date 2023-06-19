import { FC, ReactNode, useState } from "react"
import NewSubDialog from "../subs/NewSubDialog"
import {
	Collapse,
	Grid,
	List,
	ListItemButton,
	ListItemIcon,
	ListItemText,
	useTheme
} from "@mui/material"
import {
	Add,
	ExpandLess,
	ExpandMore,
	Mail,
	Person,
	StarBorder,
	ViewList,
	Home
} from "@mui/icons-material"
import { useRouter } from "next/router"
import Link from "next/link"

const SideNav: FC = () => {
	const [showNewSubDialog, setShowNewSubDialog] = useState(false)

	const theme = useTheme()
	const router = useRouter()

	return (
		<>
			<Grid item xs={12} md={3}>
				<List
					sx={{
						width: "100%",
						maxWidth: 360,
						bgcolor: theme.palette.common.white,
						borderRadius: theme.shape.borderRadius
					}}
					component='nav'
				>
					{/* CURRENT SUB */}
					{router.query.subName && (
						<NestingEntry label={router.query.subName as string} icon={<Home />} openByDefault>
							<Link href={`/s/${router.query.subName}?submit`}>
								<ListItemButton sx={{ pl: 4 }}>
									<ListItemIcon>
										<Add />
									</ListItemIcon>
									<ListItemText primary='Create Post' />
								</ListItemButton>
							</Link>

							<ListItemButton sx={{ pl: 4 }}>
								<ListItemIcon>
									<StarBorder />
								</ListItemIcon>
								<ListItemText primary='Star' />
							</ListItemButton>
						</NestingEntry>
					)}

					{/* ME */}
					<NestingEntry label='Me' icon={<Person />}>
						<ListItemButton sx={{ pl: 4 }} disabled>
							<ListItemIcon>
								<Mail />
							</ListItemIcon>
							<ListItemText primary='Inbox' />
						</ListItemButton>
					</NestingEntry>

					{/* SUBS */}
					<NestingEntry label='Subs' icon={<ViewList />}>
						<ListItemButton sx={{ pl: 4 }} onClick={() => setShowNewSubDialog(true)}>
							<ListItemIcon>
								<Add />
							</ListItemIcon>
							<ListItemText primary='Create' />
						</ListItemButton>
						<ListItemButton sx={{ pl: 4 }}>
							<ListItemIcon>
								<StarBorder />
							</ListItemIcon>
							<ListItemText primary='Starred' />
						</ListItemButton>
					</NestingEntry>
				</List>
			</Grid>

			{/* NEW SUB DIALOG */}
			<NewSubDialog open={showNewSubDialog} onClose={() => setShowNewSubDialog(false)} />
		</>
	)
}

const NestingEntry: FC<{
	label: string
	icon: ReactNode
	children: ReactNode
	openByDefault?: boolean
}> = (props) => {
	const { children, icon, label, openByDefault = false } = props
	const [showContent, setShowContent] = useState(openByDefault)
	return (
		<>
			<ListItemButton onClick={() => setShowContent((prev: boolean) => !prev)}>
				<ListItemIcon>{icon}</ListItemIcon>
				<ListItemText primary={label} />
				{showContent ? <ExpandLess /> : <ExpandMore />}
			</ListItemButton>

			<Collapse in={showContent} timeout='auto' unmountOnExit>
				<List component='div' disablePadding>
					{children}
				</List>
			</Collapse>
		</>
	)
}

export default SideNav
