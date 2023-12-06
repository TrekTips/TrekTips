const PORT = process.env.PORT || 3000;
const express = require('express');
const path = require('path');
const app = express();

// Basic Routes
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Webpack sets the NODE_ENV value based on which script is run in package.json "scripts"
// If NODE_ENV gets set to "production", serve files from the build folder
// If NODE_END gets set to "development", serve files from the client folder
// This eliminates the size warnings during the webpack compile process
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, '../build')));
} else {
  app.use(express.static(path.resolve(__dirname, '../client')));
}


// Add API Routes Here



// Global 404 error
app.all('*', (req, res) => {
    res.status(404).send('The page you are looking for does not exist');
  });
  
// Global error handler
app.use((err, req, res, next) => {
res.status(err.status || 500).json({ error: err.message });
});

const server = app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = server;