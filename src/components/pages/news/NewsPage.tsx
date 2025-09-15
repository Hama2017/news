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
  Pagination
} from '@mui/material'
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import NewsItem from '@/components/pages/news/NewsItem'
import { NewsInterface, NewsFormInterface } from '@/types/news'
import { newsMock, categoriesMock } from '@/mock/data'

export default function NewsPage() {
  const categories = categoriesMock

  const { register, handleSubmit, reset } = useForm<NewsFormInterface>()

  const [search, setSearch] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [selectedNews, setSelectedNews] = useState<NewsInterface | null>(null)
  const [newsList, setNewsList] = useState<NewsInterface[]>(newsMock)

  const itemsPerPage = 5
  const [currentPage, setCurrentPage] = useState(1)

  const filteredNews = newsList.filter(n =>
    n.title.toLowerCase().includes(search.toLowerCase())
  )


  const pageCount = Math.ceil(filteredNews.length / itemsPerPage)
  const displayedNews = filteredNews.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

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

  const handleOpenEdit = (news: NewsInterface) => {
    setSelectedNews(news)
    setOpenModal(true)
  }

  const handleOpenDelete = (news: NewsInterface) => {
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

  const onSubmit = (data: NewsFormInterface) => {
    if (selectedNews) {
      setNewsList(prev =>
        prev.map(n =>
          n.id === selectedNews.id ? { ...n, ...data } : n
        )
      )
    } else {
      const newNews: NewsInterface = {
        id: newsList.length + 1,
        ...data
      }
      setNewsList(prev => [...prev, newNews])
    }
    handleCloseModal()
  }

  const handleConfirmDelete = () => {
    if (selectedNews) {
      setNewsList(prev => prev.filter(n => n.id !== selectedNews.id))
      handleCloseDelete()
    }
  }

  useEffect(() => {
    setCurrentPage(1)
  }, [search, newsList])

  return (
    <Box sx={{ p: 3 }}>
      <Stack direction="row" justifyContent="space-between" spacing={2} mb={3}>
        <Button variant="contained" onClick={handleOpenAdd}>
          Ajouter
        </Button>
        <TextField
          placeholder="Rechercher une news"
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
        />
      </Stack>

      {displayedNews.map(news => (
        <NewsItem
          key={news.id}
          news={news}
          onClickEdit={() => handleOpenEdit(news)}
          onClickDelete={() => handleOpenDelete(news)}
        />
      ))}

      {pageCount > 1 && (
        <Stack alignItems="center" mt={2}>
          <Pagination
            count={pageCount}
            page={currentPage}
            onChange={(_, page) => setCurrentPage(page)}
            color="primary"
          />
        </Stack>
      )}

      <Dialog open={openModal} onClose={handleCloseModal}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <DialogTitle>
            {selectedNews ? `Modifier : ${selectedNews.title}` : 'Ajouter une news'}
          </DialogTitle>
          <DialogContent>
            <TextField
              label="Titre"
              fullWidth
              margin="dense"
              {...register('title')}
            />
            <TextField
              label="Sous-titre"
              fullWidth
              margin="dense"
              {...register('subtitle')}
            />
            <FormControl fullWidth sx={{ mt: 2 }}>
              <InputLabel>Catégorie</InputLabel>
              <Select {...register('category')} defaultValue={categories[0]}>
                {categories.map(cat => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Annuler</Button>
            <Button type="submit" variant="contained">
              {selectedNews ? 'Modifier' : 'Ajouter'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Dialog open={openDeleteModal} onClose={handleCloseDelete}>
        <DialogTitle>Confirmer la suppression du news {selectedNews?.title}</DialogTitle>
        <DialogActions>
          <Button onClick={handleCloseDelete}>Annuler</Button>
          <Button onClick={handleConfirmDelete} variant="contained" color="error">
            Supprimer
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
