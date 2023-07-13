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

import ModalUpdate from './Modal/ModalUpdate';
import { useAppSelector } from '../../hooks/redux';
import ModalDelete from './Modal/ModalDelete';

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
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [currentId, setCurrentId] = useState('');

  const products = useAppSelector(
    (state: ProductState) => state.products.product
  );

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
              <span>Name : {item.name}</span>
            </Typography>
            <span>Type : {item.type}</span>
            <span style={{ width: '50px' }}>Price : {item.price}</span>
            <span>Warranty years: {item.warranty_years}</span>
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
                setOpenUpdate(!openUpdate);
                setCurrentId(item._id);
              }}
            >
              Update
            </Button>
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                setOpenDelete(!openDelete);
                setCurrentId(item._id);
              }}
            >
              Delete
            </Button>
          </Stack>
        </ListItem>
      ))}

      <ModalUpdate open={openUpdate} id={currentId} setOpen={setOpenUpdate} />
      <ModalDelete open={openDelete} id={currentId} setOpen={setOpenDelete} />
    </>
  );
}

export default Product;
