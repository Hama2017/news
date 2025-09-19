"use client"
import { use, useEffect, useState } from "react"
import NewsDetails from "@/app/news/[id]/components/NewsDetails"
import { fetchGetNewsById } from "./helpers/fetchers/getNewsById"
import { News } from "@/types/news"
interface Props {
  params: Promise<{ id: number }>
}

export const NewsDetailsPage = ({ params }: Props) => {
  const resolvedParams = use(params)
  const newsId = resolvedParams.id

  if (!newsId) return null

  const [newsToShow, setNewsToShow] = useState<News | undefined>(undefined)

  useEffect(() => {
    fetchGetNewsById(newsId, setNewsToShow)
  }, [newsId])

  if (!newsToShow) return

  return <NewsDetails news={newsToShow} />
}

export default NewsDetailsPage