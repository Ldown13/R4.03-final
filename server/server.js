// server/server.js

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://127.0.0.1:27017/mon-magasin', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(error => {
  console.error('Error connecting to MongoDB:', error);
});

const articlesRouter = require('./routes/articles');
const achatsRouter = require('./routes/achats');

app.use('/articles', articlesRouter);
app.use('/achats', achatsRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
