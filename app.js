//mongoDB pass: Damascene1
//mongoDB connection: mongodb+srv://donat:<PASSWORD>@cluster0-nzopz.mongodb.net/test?retryWrites=true

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const sourcesRoutes = require('./routes/sauces');
const userRoutes = require('./routes/user');

const app = express();

mongoose.connect('mongodb+srv://donat:Damascene1@cluster0-nzopz.mongodb.net/test?retryWrites=true')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.use(express.static(path.join(__dirname, 'public')));

  app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});

app.get('*', (req, res) => {
  res.sendFile(path.json(__dirname, 'public/index.html'));
});

  app.use('/images', express.static(path.join(__dirname, 'images')));

  app.use('/api/sauces', sourcesRoutes);
  app.use('/api/auth', userRoutes);

module.exports = app;