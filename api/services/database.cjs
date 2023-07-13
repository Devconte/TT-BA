const mongoose = require('mongoose');

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/Products', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Définition du schéma pour les documents de la collection "products"
const productSchema = new mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warranty_years: Number,
  available: Boolean
});

// Écouter l'événement "pre" avant la sauvegarde du document
productSchema.pre('save', function(next) {
  const doc = this;
  if (doc.isNew) {
    // Vérifier s'il s'agit d'une nouvelle création
    mongoose.model('Product', productSchema)
      .findOne({}, {}, { sort: { _id: -1 } })
      .exec()
      .then((lastProduct) => {
        if (lastProduct) {
          // Incrémenter l'_id pour le nouveau document
          doc._id = lastProduct._id + 1;
        } else {
          // Aucun document existant, commencer à 1
          doc._id = 1;
        }
        next();
      })
      .catch((err) => next(err));
  } else {
    next();
  }
});

// Vérifier si le modèle existe déjà avant de le compiler
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);

const Products = [
  { "_id" : 1, "name" : "AC1 Phone1", "type" : "phone", "price" : 200.05, "rating" : 3.8,"warranty_years" : 1, "available" : true },
  { "_id" : 2, "name" : "AC2 Phone2", "type" : "phone", "price" : 147.21, "rating" : 1,"warranty_years" : 3, "available" : false },
  { "_id" : 3, "name" : "AC3 Phone3", "type" : "phone", "price" : 150, "rating" : 2,"warranty_years" : 1, "available" : true },
  { "_id" : 4, "name" : "AC4 Phone4", "type" : "phone", "price" : 50.20, "rating" : 3,"warranty_years" : 2, "available" : true }
]

function fillDatabaseFromArr(productsArr) {
  Product.countDocuments({})
    .then(count => {
      if (count === 0) {
        Product.insertMany(productsArr)
          .then(() => console.log('Database filled with products'))
          .catch(err => console.log("Error when inserting products in database ", err));
      } else {
        console.log('Database is operational');
      }
    })
    .catch(err => console.log("Error when counting documents", err));
}

fillDatabaseFromArr(Products);


module.exports = Product;
