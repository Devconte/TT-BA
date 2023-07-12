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

function Product() {
  const [open, setOpen] = useState(false);

  const [currentId, setCurrentId] = useState('');
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.product);

  const handleClickDelete = (id) => () => {
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
          <Stack spacing={2} direction={'row'} alignItems="center">
            <Typography noWrap>
              <p>{item.name}</p>
            </Typography>
            <p>{item.type}</p>
            <p style={{ width: '50px' }}>{item.price}</p>
            <p>{item.warranty_years}</p>
            {item.available ? (
              <Button variant="outline">Buy</Button>
            ) : (
              <Button disabled>
                {' '}
                <DoNotDisturbAltIcon />{' '}
              </Button>
            )}
            <Button
              variant="outline"
              onClick={() => {
                setOpen(!open);
                setCurrentId(item._id);
              }}
            >
              Update
            </Button>
            <Button variant="outline" onClick={handleClickDelete(item._id)}>
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
