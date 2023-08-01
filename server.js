const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();
const path = require('path');


const PORT = process.env.PORT || 3001;


// server.applyMiddleware({ app });

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/social-network-api', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(routes);
// app.use(express.static(path.join(__dirname, '../client/build')));
// app.get('*', (req, res) => {


db.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
    });
  });
  




