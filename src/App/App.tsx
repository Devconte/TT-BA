import { useEffect, useState } from 'react';
import List from '@mui/material/List';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/products';
import Product from '../Components/Product/Product';
import ModalCreate from './Modal/ModalCreate';

function App() {
  const [openCreate, setOpenCreate] = useState(false);

  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.products.alert);

  // vérifie l'état de la BDD et met à jour
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <>
      {alert && <p>{alert.message}</p>}
      <h1> Available products</h1>
      <Button variant="contained" onClick={() => setOpenCreate(!openCreate)}>
        Add a product
      </Button>
      <List sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {' '}
          <Product />{' '}
        </Stack>
      </List>
      <ModalCreate open={openCreate} setOpen={setOpenCreate} />
    </>
  );
}

export default App;
