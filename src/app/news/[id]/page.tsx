import { NewsInterface } from '@/types/news'
import { newsMock } from '@/mock/data'
import NewsDetailsPage from '@/components/pages/news/NewsDetailsPage'
import { notFound } from 'next/navigation'

const mockNewsList: NewsInterface[] = newsMock

export default async function NewsDetails({ params }: { params: { id: string } }) {
  const foundNews = mockNewsList.find(n => n.id === Number(params.id))
  if (!foundNews) {
    notFound()
  }
  return <NewsDetailsPage news={foundNews} />
}