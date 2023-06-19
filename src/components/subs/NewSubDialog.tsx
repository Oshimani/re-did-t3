import { FC, useState } from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material"
import { api } from "~/utils/api"
import { enqueueSnackbar } from "notistack"

const NewSubDialog: FC<{ open: boolean; onClose: () => void }> = (props) => {
	const { open, onClose } = props

	const [name, setName] = useState("")

	const utils = api.useContext()
	const mutation = api.subs.create.useMutation({
		onSuccess: () => {
			utils.subs.getPopular.invalidate()
			setName("")
			onClose()
			enqueueSnackbar("Sub created", { variant: "success" })
		},
		onError: (error) => {
			enqueueSnackbar(error.message, { variant: "error" })
		}
	})

	const handleSubmit = () => {
		mutation.mutate({ name })
	}

	return (
		<>
			<Dialog open={open} onClose={onClose}>
				<DialogTitle>Create a new sub</DialogTitle>
				<DialogContent>
					<TextField
						margin='normal'
						fullWidth
						label='Name'
						variant='outlined'
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={onClose} color='error'>
						Cancel
					</Button>
					<Button onClick={handleSubmit}>Create</Button>
				</DialogActions>
			</Dialog>
		</>
	)
}

export default NewSubDialog
