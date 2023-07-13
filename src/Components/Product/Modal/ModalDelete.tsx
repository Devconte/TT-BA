import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

import { useAppDispatch } from '../../../hooks/redux';
import { deleteProducts } from '../../../store/reducers/products';

interface ModalUpdateProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: string;
}

function ModalDelete({ open, setOpen, id }: ModalUpdateProps) {
  const dispatch = useAppDispatch();

  const handleDelete = () => {
    dispatch(deleteProducts(id));
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={() => setOpen(!open)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Do you want to delete this product ?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to confirm this action ?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)} autoFocus>
            No
          </Button>
          <Button onClick={handleDelete} variant="contained" color="error">
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default ModalDelete;
