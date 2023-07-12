/* eslint-disable no-underscore-dangle */
import { useState } from 'react';
import {
  Avatar,
  ListItemAvatar,
  ListItem,
  Stack,
  Typography,
  Button,
} from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import DoNotDisturbAltIcon from '@mui/icons-material/DoNotDisturbAlt';
import { deleteProducts } from '../../store/reducers/products';
import ModalUpdate from './Modal/ModalUpdate';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';

interface ProductType {
  _id: string;
  name: string;
  type: string;
  price: number;
  warranty_years: number;
  available: boolean;
}

interface ProductState {
  product: ProductType[];
}

function Product() {
  const [open, setOpen] = useState(false);

  const [currentId, setCurrentId] = useState('');
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: ProductState) => state.products.product
  );

  const handleClickDelete = (id: string) => () => {
    dispatch(deleteProducts(id));
  };

  return (
    <>
      {products.map((item) => (
        <ListItem sx={{ boxShadow: 1 }} key={item._id}>
          <ListItemAvatar>
            <Avatar>
              <PhoneIphoneIcon />
            </Avatar>
          </ListItemAvatar>
          <Stack spacing={2} direction="row" alignItems="center">
            <Typography noWrap>
              <p>{item.name}</p>
            </Typography>
            <p>{item.type}</p>
            <p style={{ width: '50px' }}>{item.price}</p>
            <p>{item.warranty_years}</p>
            {item.available ? (
              <Button variant="outlined">Buy</Button>
            ) : (
              <Button disabled>
                <DoNotDisturbAltIcon />
              </Button>
            )}
            <Button
              variant="outlined"
              onClick={() => {
                setOpen(!open);
                setCurrentId(item._id);
              }}
            >
              Update
            </Button>
            <Button variant="outlined" onClick={handleClickDelete(item._id)}>
              Delete
            </Button>
          </Stack>
        </ListItem>
      ))}

      <ModalUpdate open={open} id={currentId} setOpen={setOpen} />
    </>
  );
}

export default Product;
