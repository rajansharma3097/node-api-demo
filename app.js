const express = require('express');
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: 'Content-Type, Origin, X-Requested-With, Accept'
}));

app.use(bodyParser.json());

app.use('/api/products', require('./routes/products'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});