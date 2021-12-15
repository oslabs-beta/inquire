const path = require('path');
const express = require('express');
const expressGraphQL = require('express-graphql').graphqlHTTP;

const mongoose = require('mongoose');
const cors = require('cors');
const authController = require('./controllers/authController');
const PORT = process.env.PORT;
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolvers = require('./graphql/resolvers/index.js');

const app = express();
app.use(express.json());
app.use(cors());
// app.use(authController);

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// VSCode restart may be needed when running for the first time on a new computer in order for env variables to be read

// Statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// Serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

// app.use(express.static(path.resolve(__dirname, '../client')));
// app.get('/test', (req, res) => {
//   return res.status(200).send('hi');
// });

app.use(
  '/graphql',
  expressGraphQL({
    schema: graphqlSchema,
    rootValue: graphqlResolvers,
    graphiql: true,
  })
);

app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@immersive.wo6r5.mongodb.net/topic?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log('db connected!!!!!');
  })
  .catch((err) => {
    console.error(err.message);
  });

app.listen(PORT, () => {
  console.log(`port listening to ${PORT}.......`);
});

module.exports = app;
