import { useEffect, useState } from 'react';
import List from '@mui/material/List';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';


import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchProducts } from '../store/reducers/products';
import Product from '../Components/Product/Product';





function App() {
  const dispatch = useAppDispatch();
  const alert = useAppSelector((state) => state.products.alert)
  
  // vérifie l'état de la BDD et met à jour
  useEffect(() => {
    dispatch(fetchProducts());
  },
  [dispatch]) 

  return (
    <> 
    {alert && <p>{alert.message}</p>}
    <h1> Available products</h1>
    <Button variant="contained">Add a product</Button>
    <List sx={{ width: '100%' }}>
      <Stack spacing={2}> <Product/> </Stack>
    </List>
    </>

  )
}


export default App
