

'use client'

import React from 'react'
import { Box, Button, Card, CardContent, Typography, Chip } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { News } from '@/types/news'
import { useRouter } from 'next/navigation'

interface Props {
  news: News
}

const NewsDetails = ({ news } : Props) => {

  const router = useRouter()

  return (
    <Box sx={styles.container}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={()=> router.back()}
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
            <Chip label={news.category.label} color="primary" />
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
    px: 2,
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
  },
}
