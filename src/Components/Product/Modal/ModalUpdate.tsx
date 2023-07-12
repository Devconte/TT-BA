import { useState }from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import MenuItem from '@mui/material/MenuItem';

function ModalUpdate({open, setOpen}) {
  const productType = [
    {
      model: 'Phone',
    value: 'Phone'}, 

     { model: 'Tablet',
     value: 'Tablet'
    },
    { model: 'Computer',
    value: 'Computer'
    },
  ];

const [name, setName] = useState('');
const [type, setType] = useState('');
const [price, setPrice] =useState('');
const [rating, setRating] = useState('');
const [warranty_years, setWarranty_years] = useState('');
const [available, setAvailable] = useState('');
  
const handleSubmit = (event) => {event.preventDefault()};
  return (
    <div>
      
      <Dialog open={open} onClose={()=> setOpen(!open)}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here. We
            will send updates occasionally.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Product name"
            type="name"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value) }
            value={name}
          />
            <TextField sx={{mt: 3}}
          id="model"
          select
          label="Select"
          defaultValue="EUR"
          helperText="Please select the product type"
        >{productType.map((option) => (
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
            type="price"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="rating"
            label="Rating"
            type="rating"
            fullWidth
            variant="standard"
          />
           <TextField
            autoFocus
            margin="dense"
            id="warranty_years"
            label="Warranty years"
            type="warranty years"
            fullWidth
            variant="standard"
          />
    <TextField sx={{mt: 3}}
          id="availability"
          select
          label="Select"
          defaultValue="true"
          helperText="Is the product available ?">
            <MenuItem  value={true}>
            Available
          </MenuItem>
          <MenuItem  value={false}>
            Not available
          </MenuItem>
            
              </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=> setOpen(!open)}>Cancel</Button>
          <Button onClick={()=> setOpen(!open)}>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default ModalUpdate;
