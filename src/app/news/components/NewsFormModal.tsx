import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  CircularProgress
} from '@mui/material'

enum ModalFormMode {
  ADD = 'add',
  EDIT = 'edit'
}

interface NewsFormModalProps {
  open: boolean
  mode: ModalFormMode
  title: string
  subtitle: string
  category: string
  categories: string[]
  loading: boolean
  onClose: () => void
  onSubmit: (e: React.FormEvent) => void
  onTitleChange: (value: string) => void
  onSubtitleChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

const NewsFormModal = ({ 
  open, 
  mode, 
  title,
  subtitle,
  category,
  categories,
  loading, 
  onClose, 
  onSubmit,
  onTitleChange,
  onSubtitleChange,
  onCategoryChange
}: NewsFormModalProps) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <form onSubmit={onSubmit}>
        <DialogTitle>
          {mode === ModalFormMode.EDIT ? `Modifier : ${title}` : 'Ajouter une news'}
        </DialogTitle>
        <DialogContent>
          <TextField
            label="Titre"
            fullWidth
            margin="dense"
            required
            value={title}
            onChange={e => onTitleChange(e.target.value)}
          />
          <TextField
            label="Sous-titre"
            fullWidth
            margin="dense"
            required
            multiline
            rows={2}
            value={subtitle}
            onChange={e => onSubtitleChange(e.target.value)}
          />
          <FormControl fullWidth sx={{ mt: 2 }} margin="dense">
            <InputLabel id="category-label">Catégorie</InputLabel>
            <Select
              labelId="category-label"
              label="Catégorie"
              value={category}
              onChange={e => onCategoryChange(e.target.value)}
            >
              {categories.map(cat => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} disabled={loading}>
            Annuler
          </Button>
          <Button 
            type="submit" 
            variant="contained"
            disabled={loading || !title.trim() || !subtitle.trim()}
          >
            {loading ? <CircularProgress size={20} /> : (mode === ModalFormMode.EDIT ? 'Modifier' : 'Ajouter')}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export { ModalFormMode }
export default NewsFormModal