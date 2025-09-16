'use client'

import { Box, Card, CardContent, Typography, Chip, Button } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useRouter } from 'next/navigation'
import { News } from '@/types/news'

interface Props {
  news: News
}

export default function NewsDetailsPage({ news: { id, title, subtitle, category } }: Props) {
  const router = useRouter()

  const handleBack = () => router.back()

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
              {title}
            </Typography>
            <Chip label={category} color="primary" />
          </Box>

          <Typography variant="subtitle1" color="text.secondary" mb={2}>
            {subtitle}
          </Typography>

          <Typography variant="body2" color="text.disabled">
            ID: {id}
          </Typography>
        </CardContent>
      </Card>
    </Box>
  )
}
