require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());

// Define your routes here
app.get('/', (req, res) => {
  res.send('Hello, World!');
});
app.use('/api', require('./router'));

app.all('*', (req, res) => {
  res.status(404).send('Not Found');
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
