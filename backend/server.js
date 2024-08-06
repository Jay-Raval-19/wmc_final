const express = require('express');
const { MongoClient } = require('mongodb');
const fetchDataRoute = require('./api/fetch-data');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', fetchDataRoute);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
