import { News, NewsInput } from '@/types/news'
import { newsMock } from '@/mock/data'

const NEWS_STORAGE_KEY = 'news_app_data'

class LocalStorageService {
  private getNewsFromStorage(): News[] {
    try {
      const stored = localStorage.getItem(NEWS_STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
      this.setNewsToStorage(newsMock)
      return newsMock
    } catch (error) {
      console.error('Erreur lecture localStorage:', error)
      return newsMock
    }
  }

  private setNewsToStorage(news: News[]): void {
    try {
      localStorage.setItem(NEWS_STORAGE_KEY, JSON.stringify(news))
    } catch (error) {
      console.error('Erreur écriture localStorage:', error)
    }
  }

  private generateId(): number {
    const news = this.getNewsFromStorage()
    return news.length > 0 ? Math.max(...news.map(n => n.id)) + 1 : 1
  }
  private delay(ms: number = 300): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms))
  }
  async getAllNews(options?: {
    page?: number
    limit?: number
    search?: string
    category?: string
  }): Promise<{
    data: News[]
    total: number
    page: number
    totalPages: number
  }> {
    await this.delay()
    
    let news = this.getNewsFromStorage().sort((a, b) => b.id - a.id)
    
    if (options?.search) {
      const searchTerm = options.search.toLowerCase()
      news = news.filter(n => 
        n.title.toLowerCase().includes(searchTerm) ||
        n.subtitle.toLowerCase().includes(searchTerm)
      )
    }
    
    if (options?.category) {
      news = news.filter(n => n.category === options.category)
    }
    
    const total = news.length
    const page = options?.page || 1
    const limit = options?.limit || 10
    const totalPages = Math.ceil(total / limit)
    
    const startIndex = (page - 1) * limit
    const endIndex = startIndex + limit
    const paginatedNews = news.slice(startIndex, endIndex)
    
    return {
      data: paginatedNews,
      total,
      page,
      totalPages
    }
  }

  async getNewsById(id: number): Promise<News | null> {
    await this.delay()
    const news = this.getNewsFromStorage()
    return news.find(n => n.id === id) || null
  }

  async createNews(data: NewsInput): Promise<News> {
    await this.delay(500) 
    
    const newNews: News = {
      id: this.generateId(),
      ...data
    }
    
    const currentNews = this.getNewsFromStorage()
    const updatedNews = [newNews, ...currentNews]
    this.setNewsToStorage(updatedNews)
    
    return newNews
  }

  async updateNews(id: number, data: NewsInput): Promise<News> {
    await this.delay(500)
    
    const currentNews = this.getNewsFromStorage()
    const newsIndex = currentNews.findIndex(n => n.id === id)
    
    if (newsIndex === -1) {
      throw new Error('News non trouvée')
    }
    
    const updatedNews = {
      ...currentNews[newsIndex],
      ...data
    }
    
    currentNews[newsIndex] = updatedNews
    this.setNewsToStorage(currentNews)
    
    return updatedNews
  }

  async deleteNews(id: number): Promise<void> {
    await this.delay()
    
    const currentNews = this.getNewsFromStorage()
    const filteredNews = currentNews.filter(n => n.id !== id)
    
    if (filteredNews.length === currentNews.length) {
      throw new Error('News non trouvée')
    }
    
    this.setNewsToStorage(filteredNews)
  }

  async resetData(): Promise<void> {
    this.setNewsToStorage(newsMock)
  }

  exportData(): News[] {
    return this.getNewsFromStorage()
  }
}

export const localStorageService = new LocalStorageService()