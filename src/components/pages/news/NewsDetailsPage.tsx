'use client'

import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { NewsInterface } from '@/types/news'

interface Props {
  news: NewsInterface
}

export default function NewsDetailsPage({ news }: Props) {
  const router = useRouter()

  const handleBack = () => {
    router.push('/news')
  }

  return (
    <Box sx={{ maxWidth: 600, margin: 'auto', mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
        variant="outlined"
      >
        Retour aux news
      </Button>

      <Card sx={{ p: 2, boxShadow: 3 }}>
        <CardContent>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h5" fontWeight="bold">
              {news.title}
            </Typography>
            <Chip label={news.category} color="primary" />
          </Box>

          <Typography variant="subtitle1" color="text.secondary" mb={2}>
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
