import { FC, useState } from "react"
import Head from "next/head"
import { NextPage } from "next"
import { useRouter } from "next/router"
import { api } from "~/utils/api"

import { Alert, Box, Button, CircularProgress, Stack, TextField, useTheme } from "@mui/material"
import { Sub } from "@prisma/client"
import { enqueueSnackbar } from "notistack"
import PostPreview from "~/components/posts/PostPreview"

const SubPage: NextPage = () => {
	const theme = useTheme()
	const router = useRouter()
	const { data, isLoading, isError } = api.subs.byName.useQuery(
		{ name: router.query.subName as string },
		{ enabled: !!router.query.subName }
	)
	if (isError) return <Alert severity='error'>Error loading sub</Alert>
	if (isLoading) return <CircularProgress sx={{ color: theme.palette.primary.main }} />
	if (data && router.query.submit !== undefined) return <SubPageCreateMode {...data} />
	if (data) return <SubPageBrowseMode {...data} />
}

const SubPageCreateMode: FC<Sub> = (props) => {
	const { id } = props
	const theme = useTheme()
	const router = useRouter()

	const [title, setTitle] = useState("")
	const [body, setBody] = useState("")

	const mutation = api.posts.create.useMutation()

	const handleSubmit = () => {
		mutation.mutate(
			{ title, body, subId: id },
			{
				onSuccess: () => {
					router.push(`/s/${router.query.subName}`)
				},
				onError: (err) => {
					enqueueSnackbar(err.message, { variant: "error" })
				}
			}
		)
	}

	return (
		<>
			<TextField
				sx={{ backgroundColor: theme.palette.common.white }}
				label='Title'
				fullWidth
				margin='normal'
				value={title}
				onChange={(e) => setTitle(e.target.value)}
			/>
			<TextField
				sx={{ backgroundColor: theme.palette.common.white }}
				label='Body'
				fullWidth
				margin='normal'
				rows={5}
				multiline
				value={body}
				onChange={(e) => setBody(e.target.value)}
			/>

			{/* BUTTON ROW */}
			<Stack direction='row' spacing={2}>
				<Button color='error' onClick={() => window.history.back()}>
					Cancel
				</Button>
				<Button variant='contained' color='primary' onClick={() => handleSubmit()}>
					Submit
				</Button>
			</Stack>
		</>
	)
}

const SubPageBrowseMode: FC<Sub> = (props) => {
	const { id, name, createdAt, updatedAt } = props
	const theme = useTheme()
	const { data, isLoading, isError } = api.posts.bySubId.useQuery({ id })
	return (
		<>
			<Head>
				<title>Re-DID /s/{name}</title>
			</Head>

			{/* ERROR */}
			{isError && <Alert severity='error'>Error loading posts</Alert>}

			{/* LOADING */}
			{isLoading && <CircularProgress sx={{ color: theme.palette.primary.main }} />}

			{/* NO POSTS */}
			{data && data.length === 0 && <Alert severity='info'>No posts yet</Alert>}

			{/* POSTS */}
			{data && data.length > 0 && data.map((post) => <PostPreview key={post.id} {...post} />)}
		</>
	)
}

export default SubPage
