const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const cityController = require('./Controllers/cityController');
const itemController = require('./Controllers/itemController');
const recController = require('./Controllers/recController');
const mongoose = require('mongoose');
const { MONGODB_URI } = require('./config');

// MongoDB connection
mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch(error => {
    console.error('Error connecting to MongoDB: ' + error);
  });

/* ********************************** PARSE INCOMING JSON AND URL ENCODED ********************************** */

app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../build')));

/* ********************************** SERVE STATIC FILES ********************************** */
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));

/* ********************************** DESTRUCTURE CONTROLLERS ********************************** */

const { addCity, removeCity } = cityController;
const { addRec, removeRec } = itemController;
const { getRecs } = recController;

/* ********************************** SERVER ROUTES********************************** */

//add route here for getting all cities on load

app.post('/cities', addCity, (req, res) => {});
app.delete('/cities', removeCity, (req, res) => {});

app.post('/items', addRec, (req, res) => {});
app.delete('/items', removeRec, (req, res) => {});

app.post('/recs', getRecs, (req, res) => {});

// Route not found
app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for does not exist');
});

/* ********************************** GLOBAL ERROR HANDLER ********************************** */

app.use((err, req, res, next) => {
  //default obj
  const globalErrObj = {
    log: 'error with middleware',
    status: 500,
    message: 'there was an error',
  };
  //err obj. overwrite default obj with err obj from middleware
  const errObj = { ...globalErrObj, ...err };
  res.status(errObj.status).send(errObj.message);
});

/* ********************************** CONNECT TO EXPRESS ********************************** */

const server = app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);

module.exports = server;
