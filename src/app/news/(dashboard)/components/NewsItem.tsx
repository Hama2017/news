'use client'

import { Card, CardContent, Typography, Chip, Button, IconButton, Stack, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import { News } from '@/types/news'
import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { ModalFormMode } from '@/types/enums'
import {fetchGetCategoryById} from "../helpers/fetchers/getCategoryById"

interface Props {
    news: News 
    setNewsToEdit: Dispatch<SetStateAction<News | undefined>>,
    setNewsToDelete: Dispatch<SetStateAction<News | undefined>>,
    setModalFormMode: Dispatch<SetStateAction<ModalFormMode>>,
    setOpenAddEditModal: Dispatch<SetStateAction<boolean>>
    setOpenConfirmDeleteModal: Dispatch<SetStateAction<boolean>>
}


const NewsItem = ({ news, setNewsToEdit, setNewsToDelete, setModalFormMode, setOpenAddEditModal, setOpenConfirmDeleteModal }: Props) => {
   

    return (
        <Card variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Box>
                        <Chip label={ news.category.label} color="primary" sx={{ mb: 1 }} />
                        <Typography variant="h6">{news.title}</Typography>
                        <Typography variant="body2" color="text.secondary">
                            {news.subtitle}
                        </Typography>

                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            component={Link}
                            href={`/news/${news.id}`}
                        >
                            Ouvrir la news
                        </Button>
                    </Box>

                    <Stack direction="row" spacing={1}>
                        <IconButton onClick={() => {
                            setModalFormMode(ModalFormMode.EDIT);
                            setNewsToEdit(news);
                            setOpenAddEditModal(true);}
                            } aria-label="Modifier">
                            <EditIcon />
                        </IconButton>
                        <IconButton onClick={() => {
                             setNewsToDelete(news);
                             setOpenConfirmDeleteModal(true);
                        }} color="error" aria-label="Supprimer">
                            <DeleteIcon />
                        </IconButton>
                    </Stack>
                </Stack>
            </CardContent>
        </Card>
    )
}

export default NewsItem;