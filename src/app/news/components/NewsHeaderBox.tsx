import { Button, Stack, Typography } from "@mui/material"

interface Props {

    onClickAddButton: () => void

}

const NewsHeaderBox = ({ onClickAddButton }: Props) => {

    return (
        <>

            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5" color='primary'>Gestion des News</Typography>
                <Button variant="contained" onClick={onClickAddButton}>
                    Ajouter
                </Button>
            </Stack>

        </>
    )
}

export default NewsHeaderBox