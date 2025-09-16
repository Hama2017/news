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
import Link from 'next/link'
import { News } from '@/types/news'

interface Props {
  news: News
  onClickEdit: () => void
  onClickDelete: () => void
}

export default function NewsItem({ news: { id, title, subtitle, category }, onClickEdit, onClickDelete }: Props) {
  return (
    <Card variant="outlined" sx={{ mb: 2 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          <Box>
            <Chip label={category} color="primary" sx={{ mb: 1 }} />
            <Typography variant="h6">{title}</Typography>
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>

            {/* Utilise Next.js Link pour une navigation côté client */}
            <Button
              variant="outlined"
              sx={{ mt: 1 }}
              component={Link}
              href={`/news/${id}`}
            >
              Ouvrir la news
            </Button>
          </Box>

          <Stack direction="row" spacing={1}>
            <IconButton onClick={onClickEdit} aria-label="Modifier">
              <EditIcon />
            </IconButton>
            <IconButton onClick={onClickDelete} color="error" aria-label="Supprimer">
              <DeleteIcon />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}
