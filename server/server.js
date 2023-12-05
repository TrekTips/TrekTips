const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();
const cityController = require('/cityController');
const recController = require('/recController');

// Basic Routes
app.use(express.json());
app.use('/', express.static(path.resolve(__dirname, '../build')));
app.use(express.static(path.resolve(__dirname, '../client')));
app.use(express.urlencoded({ extended: true }));

//  Routes Here

const { addCity, removeCity } = cityController;

app.post('/cities', addCity, (req, res) => {});
app.delete('/cities', removeCity, (req, res) => {});

// Global 404 error
app.all('*', (req, res) => {
  res.status(404).send('The page you are looking for does not exist');
});

// Global error handler
app.use((err, req, res, next) => {
  const defaultErrObj = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: 'An error occurred on the server.',
  };

  const errorObj = { ...defaultErrObj, ...err };
  console.error(`Backend Error: ${errorObj.log}`);
  return res.status(errorObj.status).json({ error: errorObj.message });
});

const server = app.listen(PORT, () =>
  console.log(`Server is listening on port ${PORT}`),
);

module.exports = server;
