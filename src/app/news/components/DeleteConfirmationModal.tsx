import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  CircularProgress
} from '@mui/material'
import { News } from '@/types/news'

interface DeleteConfirmationModalProps {
  open: boolean
  news: News | null
  loading: boolean
  onClose: () => void
  onConfirm: () => Promise<void>
}

const DeleteConfirmationModal = ({ 
  open, 
  news, 
  loading, 
  onClose, 
  onConfirm 
}: DeleteConfirmationModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirmer la suppression</DialogTitle>
      <DialogContent>
        <Typography variant="body1">
          Êtes-vous sûr de vouloir supprimer cette news ?
        </Typography>
        <Typography
          variant="h6"
          align="center"
          color="error"
          sx={{ fontWeight: 'bold', mt: 2 }}
        >
          {news?.title}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} disabled={loading}>
          Annuler
        </Button>
        <Button 
          onClick={onConfirm} 
          variant="contained" 
          color="error"
          disabled={loading}
        >
          {loading ? <CircularProgress size={20} /> : 'Supprimer'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteConfirmationModal