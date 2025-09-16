'use client'

import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { News } from '@/types/news'
import { newsMock } from '@/mock/data'
import { notFound } from 'next/navigation'

interface Props {
  params: { id: string }
}

const NewsDetails = ({ params }: Props) => {
  const router = useRouter()
  const news: News | undefined = newsMock.find(n => n.id === Number(params.id))

  if (!news) {
    notFound()
  }

  const handleBack = () => router.back()

  return (
    <Box sx={styles.container}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={styles.backButton}
        variant="outlined"
      >
        Retour aux news
      </Button>

      <Card sx={styles.card}>
        <CardContent>
          <Box sx={styles.header}>
            <Typography variant="h5" fontWeight="bold">
              {news.title}
            </Typography>
            <Chip label={news.category} color="primary" />
          </Box>

          <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 2 }}>
            {news.subtitle}
          </Typography>

          <Typography variant="body2" color="text.disabled">
            ID: {news.id}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}

export default NewsDetails

const styles = {
  container: {
    maxWidth: 600,
    margin: 'auto',
    mt: 4,
  },
  backButton: {
    mb: 2,
  },
  card: {
    p: 2,
    boxShadow: 3,
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 2,
  }
}
