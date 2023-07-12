const express = require('express');
const router = require('./services/router.cjs');
const cors = require('cors');



const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors('*'));
app.use(router);



// Démarrer le serveur
app.listen(3000, () => {
  console.log('Le serveur est en écoute sur le port 3000...');
});

