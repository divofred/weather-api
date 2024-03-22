require('dotenv').config();
const express = require('express');
const app = express();
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Weather API',
      version: '1.0.0',
      description: 'This is a weather API built with ExpressJS',
      contact: {
        name: 'OpenReplay',
        url: 'https://blog.openreplay.com',
        email: 'fredrickemmanuelc@gmail.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:8080'
      }
    ]
  },
  apis: ['./routes/*.js']
};

const swaggerSpecs = swaggerJSDoc(options);
app.use('/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs));

app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', require('./routes/router'));

app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
