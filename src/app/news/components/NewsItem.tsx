'use client'

import { Card, CardContent, Typography, Chip, Button, IconButton, Stack, Box } from '@mui/material'
import EditIcon from '@mui/icons-material/ModeEdit'
import DeleteIcon from '@mui/icons-material/Delete'
import Link from 'next/link'
import { News } from '@/types/news'

interface Props {
    news: News
    onClickEdit: () => void
    onClickDelete: () => void
}

const NewsItem = ({ news, onClickEdit, onClickDelete }: Props) => {
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

                        <Button
                            variant="outlined"
                            sx={{ mt: 1 }}
                            component={Link}
                            href={`/news/${news.id}`}
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

export default NewsItem;