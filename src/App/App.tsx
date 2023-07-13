/* eslint-disable no-nested-ternary */
import { useEffect, useState } from 'react';
import {
  List,
  Button,
  Stack,
  Alert,
  Snackbar,
  Typography,
  Box,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/products';
import Product from '../Components/Product/Product';
import ModalCreate from './Modal/ModalCreate';

function App() {
  const [openCreate, setOpenCreate] = useState(false);
  const [openAlert, setOpenAlert] = useState(false);

  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.products.alert);

  // vérifie l'état de la BDD et met à jour
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (alert) {
      setOpenAlert(true);
      timer = setTimeout(() => {
        setOpenAlert(false);
      }, 3000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [alert]);

  return (
    <div>
      <Typography
        variant="h1"
        sx={{ textAlign: 'center', mb: 3, fontSize: 50 }}
      >
        {' '}
        Available products
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mr: 5 }}>
        <Button
          variant="contained"
          onClick={() => setOpenCreate(!openCreate)}
          sx={{ mb: 3 }}
        >
          Add a product
        </Button>
      </Box>
      <List sx={{ width: '100%' }}>
        <Stack spacing={2}>
          {' '}
          <Product />{' '}
        </Stack>
      </List>

      <ModalCreate open={openCreate} setOpen={setOpenCreate} />

      {/* Handling alerts for user */}
      <Snackbar
        open={openAlert}
        autoHideDuration={3000}
        onClose={() => setOpenAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <Alert
          onClose={() => setOpenAlert(false)}
          severity={
            alert ? (alert.type === 'success' ? 'success' : 'error') : 'info'
          }
          sx={{ width: '100%' }}
        >
          {alert && alert.message}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default App;
