'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material'
import { News } from '@/types/news'
import { handleDeleteItem } from '../helpers/handlers/handleDeleteItem'

interface Props {
    open: boolean,
    setOpen: Dispatch<SetStateAction<boolean>>,
    setItems: Dispatch<SetStateAction<News[]>>,
    newsToDelete: News | undefined
}

const NewsConfirmDeleteModal = ({ open, setOpen, setItems, newsToDelete}: Props) => {

    if (!newsToDelete) return null

    return (
        <Dialog open={open} onClose={() => setOpen(false)}>
            <DialogTitle>Confirmer la suppression</DialogTitle>

            <DialogContent>
                <Typography>
                    Voulez-vous vraiment supprimer&nbsp;
                    <strong>{newsToDelete?.title ?? 'cette news'}</strong> ?
                </Typography>
            </DialogContent>

            <DialogActions>
                <Button onClick={() => setOpen(false)}>Annuler</Button>
                <Button color="error" variant="contained" onClick={() => handleDeleteItem(newsToDelete, setItems, setOpen)}>
                    Supprimer
                </Button>
            </DialogActions>
        </Dialog>
    )
}
export default NewsConfirmDeleteModal
