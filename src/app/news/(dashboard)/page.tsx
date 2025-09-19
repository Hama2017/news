'use client'

import React, { useEffect, useState } from 'react'
import { Box, Typography, List, Pagination, Stack } from '@mui/material'
import { News } from '@/types/news'
import { ModalFormMode } from "@/types/enums"
import NewsAddEditModal from "@/app/news/(dashboard)/components/NewsAddEditModal"
import NewsConfirmDeleteModal from "@/app/news/(dashboard)/components/NewsConfirmDeleteModal"
import NewsItem from './components/NewsItem'
import NewsHeaderBox from './components/NewsHeaderBox'
import { fetchGetNews } from './helpers/fetchers/getNews'
import { fetchGetCategories } from './helpers/fetchers/getCategories'
import { Category } from '@/types/category'


const NewsPage = () => {
    const [categories, setCategories] = useState<Category[]>([])
    const [items, setItems] = useState<News[]>([])
    const [filteredItems, setFilteredItems] = useState<News[]>([])
    const [newsToEdit, setNewsToEdit] = useState<News | undefined>(undefined)
    const [newsToDelete, setNewsToDelete] = useState<News | undefined>(undefined)
    const [openAddEditModal, setOpenAddEditModal] = useState<boolean>(false)
    const [openConfirmDelteModal, setOpenConfirmDelteModal] = useState<boolean>(false)
    const [modalFormMode, setModalFormMode] = useState<ModalFormMode>(ModalFormMode.ADD)

    const [currentPage, setCurrentPage] = useState<number>(1)
    const itemsPerPage = 2

    const totalItems = filteredItems.length
    const totalPages = Math.ceil(totalItems / itemsPerPage)

    const startIndex = (currentPage - 1) * itemsPerPage
    const endIndex = startIndex + itemsPerPage
    const currentItems = filteredItems.slice(startIndex, endIndex)

    useEffect(() => { setFilteredItems(items) }, [items])
    useEffect(() => { fetchGetNews(setItems) }, [])
    useEffect(() => { fetchGetCategories(setCategories) }, [])

    return (
        <Box sx={styles.box}>
            <NewsHeaderBox
                setModalFormMode={setModalFormMode}
                setOpenAddEditModal={setOpenAddEditModal}
                setFilteredItems={setFilteredItems}
                setCurrentPage={setCurrentPage}
                items={items}
            />

            {items.length === 0 && (
                <Typography color="text.secondary" align="center">
                    Aucune news pour le moment
                </Typography>
            )}

            {items.length > 0 && filteredItems.length === 0 && (
                <Typography color="text.secondary" align="center">
                    Aucune news trouvée pour cette recherche
                </Typography>
            )}

            <List>
                {currentItems.map((news: News) => (
                    <NewsItem
                        key={news.id}
                        news={news}
                        setNewsToEdit={setNewsToEdit}
                        setNewsToDelete={setNewsToDelete}
                        setModalFormMode={setModalFormMode}
                        setOpenAddEditModal={setOpenAddEditModal}
                        setOpenConfirmDeleteModal={setOpenConfirmDelteModal}
                    />
                ))}
            </List>

            {totalPages > 1 && (
                <Stack direction="row" justifyContent="center" sx={{ mt: 3 }}>
                    <Pagination
                        count={totalPages}
                        page={currentPage}
                        onChange={(_, value) => { setCurrentPage(value) }}
                        color="primary"
                        size="large"
                        showFirstButton
                        showLastButton
                    />
                </Stack>
            )}

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