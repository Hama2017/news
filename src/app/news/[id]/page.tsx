import NewsDetails from "@/app/news/[id]/components/NewsDetails"
import { newsMock } from "@/mock/data"
interface Props {
  params: { id: number }
}
export const NewsDetailsPage = ({ params }: Props) => {
  const newsID = params.id
  const news = newsMock.find(item=> item.id == newsID) ;
  if(!news) return null
  return <NewsDetails news={news} />
}

export default NewsDetailsPage;
