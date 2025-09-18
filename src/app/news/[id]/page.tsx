import NewsDetails from "@/app/news/[id]/components/NewsDetails"

interface Props {
  params: { id: number }
}
export const NewsDetailsPage = ({ params }: Props) => {
  const newsID = params.id
  return (<></>)
  //return <NewsDetails news={news} />
}

export default NewsDetailsPage;
