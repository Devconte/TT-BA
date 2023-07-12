import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';
import { useAppDispatch } from '../../../hooks/redux';
import { updateProducts } from '../../../store/reducers/products';
import { set } from 'mongoose';

function ModalUpdate({ open, setOpen, id }) {
  const dispatch = useAppDispatch();

  const productType = [
    {
      model: 'Phone',
      value: 'Phone',
    },

    { model: 'Tablet', value: 'Tablet' },
    { model: 'Computer', value: 'Computer' },
  ];

  const [name, setName] = useState('');
  const [type, setType] = useState('');
  const [price, setPrice] = useState('');
  const [rating, setRating] = useState('');
  const [warrantyYears, setWarrantyYears] = useState('');
  const [available, setAvailable] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();

    const payload = {
      json: {
        name,
        type,
        price,
        rating,
        warranty_years: warrantyYears,
        available,
      },
      id,
    };
    dispatch(updateProducts(payload));
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
        <DialogTitle>Product details</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please update your products details
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
            <MenuItem value={true}>Available</MenuItem>
            <MenuItem value={false}>Not available</MenuItem>
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
export default ModalUpdate;
