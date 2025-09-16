'use client'
import {
  Box,
  Button,
  Stack,
  TextField,
  FormControl,
  Dialog,
  DialogTitle,
  InputLabel,
  Select,
  MenuItem,
  DialogContent,
  DialogActions,
  Pagination,
  Typography,
  CircularProgress,
  Alert
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useForm, Controller } from 'react-hook-form'
import NewsItem from '@/components/pages/news/NewsItem'
import { News, NewsInput } from '@/types/news'
import { categoriesMock } from '@/mock/data'
import InboxIcon from '@mui/icons-material/Inbox'
import { useNews } from '@/hooks/useNews'

export default function NewsPage() {
  const categories = categoriesMock
  const { register, handleSubmit, reset, control } = useForm<NewsInput>()
  const [search, setSearch] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
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
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<News | null>(null)

  const displayedNews = newsList

  useEffect(() => {
    if (selectedNews) {
      reset({
        title: selectedNews.title,
        subtitle: selectedNews.subtitle,
        category: selectedNews.category
      })
    } else {
      reset({
        title: '',
        subtitle: '',
        category: categories[0]
      })
    }
  }, [selectedNews, reset])

  const handleOpenAdd = () => {
    setSelectedNews(null)
    setOpenModal(true)
  }

  const handleOpenEdit = (news: News) => {
    setSelectedNews(news)
    setOpenModal(true)
  }

  const handleOpenDelete = (news: News) => {
    setSelectedNews(news)
    setOpenDeleteModal(true)
  }

  const handleCloseModal = () => {
    setSelectedNews(null)
    setOpenModal(false)
  }

  const handleCloseDelete = () => {
    setSelectedNews(null)
    setOpenDeleteModal(false)
  }

  const onSubmit = async (data: NewsInput) => {
    try {
      if (selectedNews) {
        await updateNews(selectedNews.id, data)
      } else {
        await createNews(data)
         reset({
        title: '',
        subtitle: '',
        category: categories[0]
      })
      }
      handleCloseModal()
    } catch (err) {
    }
  }

  const handleConfirmDelete = async () => {
    if (selectedNews) {
      try {
        await deleteNews(selectedNews.id)
         if (currentPage > 1 && (total - 1) <= (currentPage - 1) * itemsPerPage) {
        setCurrentPage(currentPage - 1)
      }
        handleCloseDelete()
      } catch (err) {
      }
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search])

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

      <Dialog open={openModal} onClose={handleCloseModal} maxWidth="sm" fullWidth>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {selectedNews ? `Modifier : ${selectedNews.title}` : 'Ajouter une news'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Titre"
              fullWidth
              margin="dense"
              required
              {...register('title', { required: true })}
            />
            <TextField
              label="Sous-titre"
              fullWidth
              margin="dense"
              required
              multiline
              rows={2}
              {...register('subtitle', { required: true })}
            />
            <FormControl fullWidth sx={{ mt: 2 }} margin="dense">
              <InputLabel id="category-label">Catégorie</InputLabel>
              <Controller
                name="category"
                control={control}
                defaultValue={categories[0]}
                render={({ field }) => (
                  <Select
                    labelId="category-label"
                    label="Catégorie"
                    {...field}
                  >
                    {categories.map(cat => (
                      <MenuItem key={cat} value={cat}>
                        {cat}
                      </MenuItem>
                    ))}
                  </Select>
                )}
              />
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal} disabled={loading}>
              Annuler
            </Button>
            <Button 
              type="submit" 
              variant="contained"
              disabled={loading}
            >
              {loading ? <CircularProgress size={20} /> : (selectedNews ? 'Modifier' : 'Ajouter')}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleCloseDelete}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          <Typography variant="body1">
            Êtes-vous sûr de vouloir supprimer cette news ?
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="error"
            sx={{ fontWeight: 'bold', mt: 2 }}
          >
            {selectedNews?.title}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDelete} disabled={loading}>
            Annuler
          </Button>
          <Button 
            onClick={handleConfirmDelete} 
            variant="contained" 
            color="error"
            disabled={loading}
          >
            {loading ? <CircularProgress size={20} /> : 'Supprimer'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
