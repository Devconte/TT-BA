const express = require('express');
const Product = require('./database.cjs');


const router = express.Router();


router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Error when fetching products from database' });
  }
});


// Récupérer un produit par son ID
router.get('/api/products/:id', async (req, res) => {
  try {
    const  id  = req.params.id;
   
    const product = await Product.findById(id);
  
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error when fetching the product from database' });
  }
});



// Ajouter un produit
router.post('/api/products', async (req, res) => {
 
  try {
    
    const product =  await Product.create(req.body);
 
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Error when adding product to the database' });
  }
});

// Modifier un produit
router.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while modifying the product' });
  }
});

// Supprimer un produit
router.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Vérifier si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Supprimer le produit de la base de données
    await Product.findByIdAndRemove(id);

    res.json({ message: 'Product sucessfully deleted' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the product.' });
  }
});


module.exports = router;