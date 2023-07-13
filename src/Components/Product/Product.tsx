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
import InfoText from '../InfoText/InfoText';

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
            <InfoText name="Name" data={item.name} />
            <InfoText name="Type" data={item.type} />
            <InfoText name="Price" data={`${item.price} €`} />
            <InfoText name="Rating" data={`${item.rating} / 5`} />
            <InfoText
              name="Warranty"
              data={`${item.warranty_years} ${
                item.warranty_years > 1 ? 'years' : 'year'
              }`}
            />

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
