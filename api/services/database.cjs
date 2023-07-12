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

module.exports = Product;
