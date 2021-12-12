const path = require('path');
const express = require('express');
const app = express();

const PORT = 3000;

// Statically serve everything in the build folder on the route '/build'
app.use('/build', express.static(path.join(__dirname, '../build')));
// Serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.use(express.static(path.resolve(__dirname, '../client')));

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

app.listen(PORT, () => {
  console.log(`port listening to ${PORT}...`);
});

module.exports = app;
