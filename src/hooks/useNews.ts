import { useState, useEffect } from 'react'
import { News, NewsInput } from '@/types/news'
import { localStorageService as newsService } from '@/services/localStorageService'

export const useNews = (options?: {
  page?: number
  limit?: number
  search?: string
  category?: string
}) => {
  const [newsData, setNewsData] = useState<{
    data: News[]
    total: number
    page: number
    totalPages: number
  }>({
    data: [],
    total: 0,
    page: 1,
    totalPages: 0
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadNews = async () => {
    try {
      setLoading(true)
      setError(null)
      const result = await newsService.getAllNews(options)
      setNewsData(result)
    } catch (err) {
      setError('Erreur lors du chargement des news')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const createNews = async (data: NewsInput) => {
    try {
      setLoading(true)
      setError(null)
      const newNews = await newsService.createNews(data)
      await loadNews()
    } catch (err) {
      setError('Erreur lors de la création de la news')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const updateNews = async (id: number, data: NewsInput) => {
    try {
      setLoading(true)
      setError(null)
      await newsService.updateNews(id, data)
      await loadNews()
    } catch (err) {
      setError('Erreur lors de la modification de la news')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  const deleteNews = async (id: number) => {
    try {
      setLoading(true)
      setError(null)
      await newsService.deleteNews(id)
      await loadNews()
    } catch (err) {
      setError('Erreur lors de la suppression de la news')
      console.error(err)
      throw err
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadNews()
  }, [options?.page, options?.limit, options?.search, options?.category])

  return {
    newsList: newsData.data,
    total: newsData.total,
    currentPage: newsData.page,
    totalPages: newsData.totalPages,
    loading,
    error,
    createNews,
    updateNews,
    deleteNews,
    refreshNews: loadNews
  }
}