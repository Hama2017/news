'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material'
import { ModalFormMode } from '@/types/enums'
import { handleSaveItem } from '../helpers/handlers/handleSaveItem'
import { handleUpdateItem } from '../helpers/handlers/handleUpdateItem'
import { News } from '@/types/news'
import { Category } from '@/types/category'
import { handleChangeCategory } from '../helpers/handlers/handleChangeCategory'

interface Props {
    open: boolean
    setOpen: Dispatch<SetStateAction<boolean>>
    mode: ModalFormMode
    categories: Category[] | undefined
    setItems: Dispatch<SetStateAction<News[]>>
    newsToEdit: News | undefined
}

const NewsModal = ({ open, setOpen, mode, categories, setItems, newsToEdit }: Props) => {

    const initNews = { title: '', subtitle: '', id: 0, category: (categories && categories.length > 0) ? categories[0] : { id: 0, label: "" } };
    const [news, setNews] = useState<News>(initNews)

    useEffect(() => { if (newsToEdit && mode === ModalFormMode.EDIT) setNews(newsToEdit) }, [mode, newsToEdit])
    useEffect(() => { if (open && mode === ModalFormMode.ADD) setNews(initNews) }, [open, mode]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>{mode === ModalFormMode.ADD ? "Ajouter" : "Modifier"} une News</DialogTitle>
            <DialogContent>
                <TextField
                    label="Titre"
                    value={news.title}
                    onChange={e => setNews((prev) => ({ ...prev, title: e.target.value }))}
                    fullWidth
                    sx={{ my: 1 }}
                />
                <TextField
                    label="Sous-titre"
                    value={news.subtitle}
                    onChange={e => setNews((prev) => ({ ...prev, subtitle: e.target.value }))}
                    fullWidth
                    sx={{ my: 1 }}
                />
                <FormControl fullWidth sx={{ my: 1 }}>
                    <InputLabel id="category-label">Catégorie</InputLabel>
                    <Select
                        labelId="category-label"
                        value={news.category.id}
                        label="Catégorie"
                        onChange={e => handleChangeCategory(setNews, e.target.value, categories)}
                    >
                        {categories && categories.map(c => (
                            <MenuItem key={c.id} value={c.id}>{c.label}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen(false)}>Annuler</Button>
                <Button
                    variant="contained"
                    onClick={() => mode === ModalFormMode.ADD
                        ? handleSaveItem(
                            news,
                            setItems,
                            setOpen,
                        )
                        : handleUpdateItem(
                            news,
                            setItems,
                            setOpen
                        )
                    }
                >
                    {mode === ModalFormMode.ADD ? "Ajouter" : "Modifier"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default NewsModal
