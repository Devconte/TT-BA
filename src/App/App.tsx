import { useEffect, useState } from 'react';
import { List, Button, Stack, Alert } from '@mui/material';

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
      <h1> Available products</h1>
      {alert && alert.type === 'error' && (
        <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
          <Alert severity="error">{alert.message}</Alert>
        </Stack>
      )}
      {alert && alert.type === 'success' && (
        <Stack sx={{ width: '100%', mb: 3 }} spacing={2}>
          <Alert severity="success">{alert.message}</Alert>
        </Stack>
      )}
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
