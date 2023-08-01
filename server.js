const express = require('express');
const mongoose = require('mongoose');
const db = require('./config/connection');
const routes = require('./routes');
const app = express();

const PORT = process.env.PORT || 3001;


// const { ApolloServer } = require('apollo-server-express');
// const { typeDefs, resolvers } = require('./schemas');
// const { authMiddleware } = require('./utils/auth');
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authMiddleware
// });

// server.applyMiddleware({ app });
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
  