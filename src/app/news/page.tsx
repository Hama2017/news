'use client'
import {
  Box,
  Button,
  Stack,
  TextField,
  Pagination,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import NewsItem from '@/app/news/components/NewsItem'
import { News } from '@/types/news'
import { categoriesMock } from '@/mock/data'
import InboxIcon from '@mui/icons-material/Inbox'
import { useNews } from '@/hooks/useNews'
import NewsFormModal, { ModalFormMode } from '@/app/news/components/NewsFormModal'
import DeleteConfirmationModal from '@/app/news/components/DeleteConfirmationModal'

const NewsPage = () => {
  const categories = categoriesMock
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [title, setTitle] = useState('')
  const [subtitle, setSubtitle] = useState('')
  const [category, setCategory] = useState(categories[0])
  const itemsPerPage = 5

  const { 
    newsList, 
    total, 
    totalPages, 
    loading, 
    error, 
    createNews, 
    updateNews, 
    deleteNews 
  } = useNews({
    page: currentPage,
    limit: itemsPerPage,
    search: search || undefined
  })
  
  const [openFormModal, setOpenFormModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [formMode, setFormMode] = useState<ModalFormMode>(ModalFormMode.ADD)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [deletingNews, setDeletingNews] = useState<News | null>(null)

  const displayedNews = newsList

  // Fonctions utilitaires
  const resetForm = () => {
    setTitle('')
    setSubtitle('')
    setCategory(categories[0])
  }

  const loadEditData = () => {
    if (formMode === ModalFormMode.EDIT && editingId) {
      const news = newsList.find(n => n.id === editingId)
      if (news) {
        setTitle(news.title)
        setSubtitle(news.subtitle)
        setCategory(news.category)
      }
    } else if (formMode === ModalFormMode.ADD) {
      resetForm()
    }
  }

  const resetPaginationOnSearch = () => {
    setCurrentPage(1)
  }

  // Effects
  useEffect(loadEditData, [formMode, editingId, newsList])
  useEffect(resetPaginationOnSearch, [search])

  // Handlers
  const handleOpenAdd = () => {
    setEditingId(null)
    setFormMode(ModalFormMode.ADD)
    setOpenFormModal(true)
  }

  const handleOpenEdit = (news: News) => {
    setEditingId(news.id)
    setFormMode(ModalFormMode.EDIT)
    setOpenFormModal(true)
  }

  const handleOpenDelete = (news: News) => {
    setDeletingNews(news)
    setOpenDeleteModal(true)
  }

  const handleCloseModal = () => {
    setEditingId(null)
    setOpenFormModal(false)
    resetForm()
  }

  const handleCloseDelete = () => {
    setDeletingNews(null)
    setOpenDeleteModal(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!title.trim() || !subtitle.trim()) {
      return
    }

    try {
      const data = { title, subtitle, category }
      if (formMode === ModalFormMode.EDIT && editingId) {
        await updateNews(editingId, data)
      } else {
        await createNews(data)
        resetForm()
      }
      handleCloseModal()
    } catch (err) {
      // Erreur déjà gérée dans le hook
    }
  }

  const handleConfirmDelete = async () => {
    if (deletingNews) {
      await deleteNews(deletingNews.id)
      if (currentPage > 1 && (total - 1) <= (currentPage - 1) * itemsPerPage) {
        setCurrentPage(currentPage - 1)
      }
      handleCloseDelete()
    }
  }

  return (
    <Box sx={{ p: 3 }}>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Stack direction="row" justifyContent="space-between" spacing={2} mb={3}>
        <Button 
          variant="contained" 
          onClick={handleOpenAdd}
          disabled={loading}
        >
          Ajouter
        </Button>
        <TextField
          placeholder="Rechercher une news..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{ minWidth: 300 }}
        />
      </Stack>

      {loading && newsList.length === 0 ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          {displayedNews.map(news => (
            <NewsItem
              key={news.id}
              news={news}
              onClickEdit={() => handleOpenEdit(news)}
              onClickDelete={() => handleOpenDelete(news)}
            />
          ))}

          {displayedNews.length === 0 && (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
              sx={{ mt: 5, color: 'text.secondary' }}
            >
              <InboxIcon color="primary" sx={{ fontSize: 50, mb: 1 }} />
              <Typography variant="h6" color="primary">
                {search ? 'Aucun résultat trouvé' : 'Aucune news à afficher'}
              </Typography>
              {search && (
                <Typography variant="body2">
                  Essayez avec d'autres mots-clés
                </Typography>
              )}
            </Box>
          )}

          {totalPages > 1 && (
            <Stack alignItems="center" mt={3}>
              <Typography variant="body2" color="text.secondary" mb={1}>
                {total} résultat{total > 1 ? 's' : ''} au total
              </Typography>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, page) => setCurrentPage(page)}
                color="primary"
              />
            </Stack>
          )}
        </>
      )}

      <NewsFormModal
        open={openFormModal}
        mode={formMode}
        title={title}
        subtitle={subtitle}
        category={category}
        categories={categories}
        loading={loading}
        onClose={handleCloseModal}
        onSubmit={handleFormSubmit}
        onTitleChange={setTitle}
        onSubtitleChange={setSubtitle}
        onCategoryChange={setCategory}
      />

      <DeleteConfirmationModal
        open={openDeleteModal}
        news={deletingNews}
        loading={loading}
        onClose={handleCloseDelete}
        onConfirm={handleConfirmDelete}
      />
    </Box>
  )
}

export default NewsPage