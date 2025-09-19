import { Button, Stack, TextField, Typography } from "@mui/material"
import { Dispatch, SetStateAction, useEffect, useState } from "react"
import { News } from "@/types/news"
import { handleSearch } from "../helpers/handlers/handleSearch"
import { ModalFormMode } from "@/types/enums"

interface Props {
    setModalFormMode: Dispatch<SetStateAction<ModalFormMode>>
    setOpenAddEditModal: Dispatch<SetStateAction<boolean>>
    setFilteredItems : Dispatch<SetStateAction<News[]>>
    setCurrentPage : Dispatch<SetStateAction<number>>
    items:News[]
}

const NewsHeaderBox = ({ setModalFormMode, setOpenAddEditModal, items, setFilteredItems, setCurrentPage }: Props) => {

    const [searchField, setSearchField] = useState<string>('')

    useEffect(() => { handleSearch(items, setFilteredItems,searchField),setCurrentPage(1) }, [searchField])


    return (
        <>
            <Stack direction="row" justifyContent="space-between" mb={3}>
                <Typography variant="h5" color='primary'>Gestion des News</Typography>
                <TextField label="Recherche..." onChange={e => setSearchField(e.target.value)} />
                <Button
                    variant="contained"
                    onClick={() => {
                        setModalFormMode(ModalFormMode.ADD);
                        setOpenAddEditModal(true);
                    }}>
                    Ajouter
                </Button>
            </Stack>
        </>
    )
}

export default NewsHeaderBox