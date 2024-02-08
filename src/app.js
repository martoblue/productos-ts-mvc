const express = require('express');
const dotenv = require('dotenv');
const { initHydra } = require('./config/hydraConfig');
dotenv.config();

const app = express();
app.use(express.json());

initHydra()
  .then(() => {
    app.use('/', require('./controllers/ProductController'));
    console.log('Hydra and Express initialized');
  })
  .catch((err) => console.error('Error while loading configuration file: ', err));

module.exports = app;
