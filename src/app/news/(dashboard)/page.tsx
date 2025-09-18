'use client'

import React, { useState } from 'react'
import { Box, Typography, List, Button } from '@mui/material'
import { categoriesMock as defaultCategories } from '@/mock/data'
import { News } from '@/types/news'
import { ModalFormMode } from "@/types/enums"
import NewsAddEditModal from "@/app/news/(dashboard)/components/NewsAddEditModal"
import NewsConfirmDeleteModal from "@/app/news/(dashboard)/components/NewsConfirmDeleteModal"
import NewsItem from './components/NewsItem'
import NewsHeaderBox from './components/NewsHeaderBox'
import { fetchGetNews } from './helpers/fetchers/getNews'

const NewsPage = () => {

    const [categories] = useState<string[]>(defaultCategories)
    const [items, setItems] = useState<News[]>([])
    const [filteredItems, setFilteredItems] = useState<News[]>([])
    const [newsToEdit, setNewsToEdit] = useState<News | undefined>(undefined)
    const [newsToDelete, setNewsToDelete] = useState<News | undefined>(undefined)
    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false)
    const [openConfirmDelteModal, setOpenConfirmDelteModal] = useState<boolean>(false)
    const [modalFormMode, setModalFormMode] = useState<ModalFormMode>(ModalFormMode.ADD)

    return (
        <Box sx={styles.box}>

            <Button onClick={() => fetchGetNews()}>fetch API</Button>

            <NewsHeaderBox
                setModalFormMode={setModalFormMode}
                setOpenAddEditModal={setOpenAddEditModal}
                setFilteredItems = {setFilteredItems}
                items={items} 
            />

            {items.length === 0 && (<Typography color="text.secondary" align="center">Aucune news pour le moment</Typography>)}

            <List>
                {filteredItems.map((news: News) => (
                <NewsItem key={news.id} news={news} setNewsToEdit={setNewsToEdit} setNewsToDelete={setNewsToDelete} setModalFormMode={setModalFormMode} setOpenAddEditModal={setOpenAddEditModal} setOpenConfirmDeleteModal={setOpenConfirmDelteModal} />
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