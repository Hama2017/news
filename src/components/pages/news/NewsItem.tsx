'use client'

import {
  Card,
  CardContent,
  Typography,
  Chip,
  Button,
  IconButton,
  Stack,
  Box
} from '@mui/material'
import EditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'

interface Props {
  news: {
    id: number
    title: string
    subtitle: string
    category: string
  }
  onClickEdit: () => void
  onClickDelete: () => void
}

export default function NewsItem({ news, onClickEdit, onClickDelete }: Props) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Chip label={news.category} color="primary" sx={{ mb: 1 }} />
            <Typography variant="h6">{news.title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {news.subtitle}
            </Typography>
            <Button variant="outlined" sx={{ mt: 1 }}  href={`news/${news.id}`} >
              Ouvrir la news
            </Button>
          </Box>
          <Stack direction="row" spacing={1}>
            <IconButton onClick={onClickEdit}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={onClickDelete} color="error">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
