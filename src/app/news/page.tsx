'use client'
import React, { useState } from 'react'
import { Box, Typography, List } from '@mui/material'
import { categoriesMock as defaultCategories } from '@/mock/data'
import { News } from '@/types/news'
import { ModalFormMode } from "@/types/enums"
import { handleOpenAddModal } from "@/app/news/helpers/handlers/handleOpenAddModal"
import { handleOpenEditModal } from "@/app/news/helpers/handlers/handleOpenEditModal"
import { handleOpenConfirmDeleteModal } from "@/app/news/helpers/handlers/handleOpenConfirmDeleteModal"
import NewsAddEditModal from "@/app/news/components/NewsAddEditModal"
import NewsConfirmDeleteModal from "@/app/news/components/NewsConfirmDeleteModal"
import NewsItem from './components/NewsItem'
import NewsHeaderBox from './components/NewsHeaderBox'

const NewsPage = () => {
    const [categories] = useState<string[]>(defaultCategories)
    const [items, setItems] = useState<News[]>([])
    const [newsToEdit, setNewsToEdit] = useState<News | undefined>(undefined)
    const [newsToDelete, setNewsToDelete] = useState<News | undefined>(undefined)
    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false)
    const [openConfirmDelteModal, setOpenConfirmDelteModal] = useState<boolean>(false)
    const [modalFormMode, setModalFormMode] = useState<ModalFormMode>(ModalFormMode.ADD)
    return (
        <Box sx={styles.box}>
            <NewsHeaderBox onClickAddButton={()=>handleOpenAddModal(setModalFormMode,setOpenAddEditModal)} />
            {items.length === 0 && (<Typography color="text.secondary" align="center">Aucune news pour le moment</Typography>)}
            <List>
                {items.map((news: News) => (
                    <NewsItem key={news.id} news={news}
                        onClickDelete={() => handleOpenConfirmDeleteModal(news, setNewsToDelete, setOpenConfirmDelteModal)}
                        onClickEdit={() => handleOpenEditModal(news, setNewsToEdit, setModalFormMode, setOpenAddEditModal)}
                    />
                ))}
            </List>

            <NewsConfirmDeleteModal
                open={openConfirmDelteModal}
                setOpen={setOpenConfirmDelteModal}
                setItems={setItems}
                newsToDelete={newsToDelete}
            />
    
            <NewsAddEditModal
                open={openAddEditModal}
                setOpen={setOpenAddEditModal}
                mode={modalFormMode}
                categories={categories}
                setItems={setItems}
                newsToEdit={newsToEdit}
            />
        </Box>
    )
}
export default NewsPage
const styles = {
    box: { p: 3, maxWidth: 700, mx: 'auto' },
}
