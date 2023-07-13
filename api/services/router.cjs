const express = require('express');
const Product = require('./database.cjs');


const router = express.Router();


router.get('/api/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération des produits.' });
  }
});


// Récupérer un produit par son ID
router.get('/api/products/:id', async (req, res) => {
  try {
    const  id  = req.params.id;
   
    const product = await Product.findById(id);
  
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la récupération du produit.' });
  }
});



// Ajouter un produit
router.post('/api/products', async (req, res) => {
 
  try {
    
    const product =  await Product.create(req.body);
 
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de l\'ajout du produit.' });
  }
});

// Modifier un produit
router.put('/api/products/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedProduct) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    res.json(updatedProduct);
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la modification du produit.' });
  }
});

// Supprimer un produit
router.delete('/api/products/:id', async (req, res) => {
  try {
    const id = req.params.id;

    // Vérifier si le produit existe
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Produit non trouvé.' });
    }

    // Supprimer le produit de la base de données
    await Product.findByIdAndRemove(id);

    res.json({ message: 'Produit supprimé avec succès.' });
  } catch (error) {
    res.status(500).json({ error: 'Une erreur s\'est produite lors de la suppression du produit.' });
  }
});


module.exports = router;