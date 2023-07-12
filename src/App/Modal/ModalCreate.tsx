import { useState, MouseEvent } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../hooks/redux';
import { addProducts } from '../../store/reducers/products';

interface ModalCreateProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface ProductType {
  model: string;
  value: string;
}

function ModalCreate({ open, setOpen }: ModalCreateProps) {
  const dispatch = useAppDispatch();

  const productType: ProductType[] = [
    {
      model: 'Phone',
      value: 'Phone',
    },

    { model: 'Tablet', value: 'Tablet' },
    { model: 'Computer', value: 'Computer' },
  ];

  const [name, setName] = useState<string>('');
  const [type, setType] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [rating, setRating] = useState<string>('');
  const [warrantyYears, setWarrantyYears] = useState<string>('');
  const [available, setAvailable] = useState<string>('');

  const handleSubmit = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const payload = {
      json: JSON.stringify({
        name,
        type,
        price: Number(price),
        rating: Number(rating),
        warranty_years: Number(warrantyYears),
        available: available === 'true',
      }),
    };
    dispatch(addProducts(payload));
    setOpen(false);
    setName('');
    setType('');
    setPrice('');
    setRating('');
    setWarrantyYears('');
    setAvailable('');
  };
  return (
    <div>
      <Dialog open={open} onClose={() => setOpen(!open)}>
        <DialogTitle>Add a product</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please add the details of the product
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <TextField
            sx={{ mt: 3 }}
            id="model"
            select
            label="Select"
            defaultValue="Phone"
            helperText="Please select the product type"
            onChange={(event) => setType(event.target.value)}
            value={type}
          >
            {productType.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.model}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            autoFocus
            margin="dense"
            id="price"
            label="price"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => setPrice(event.target.value)}
            value={price}
          />
          <TextField
            autoFocus
            margin="dense"
            id="rating"
            label="Rating"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => setRating(event.target.value)}
            value={rating}
          />
          <TextField
            autoFocus
            margin="dense"
            id="warranty_years"
            label="Warranty years"
            type="number"
            fullWidth
            variant="standard"
            onChange={(event) => setWarrantyYears(event.target.value)}
            value={warrantyYears}
          />
          <TextField
            sx={{ mt: 3 }}
            id="availability"
            select
            label="Select"
            defaultValue="true"
            helperText="Is the product available ?"
            onChange={(event) => setAvailable(event.target.value)}
            value={available}
          >
            <MenuItem value="true">Available</MenuItem>
            <MenuItem value="false">Not available</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(!open)}>Cancel</Button>
          <Button onClick={handleSubmit}>Submit</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ModalCreate;
