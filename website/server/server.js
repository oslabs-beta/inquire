const path = require('path');
const express = require('express');
const PORT = 3000;

const app = express();
app.use(express.json());

// Statically serve everything in the build folder on the route '/build'
// app.use('/build', express.static(path.join(__dirname, '../build')));
// Serve index.html on the route '/'
app.get('/', (req, res) => {
  return res.status(200).sendFile(path.join(__dirname, '../index.html'));
});

app.listen(PORT, () => {
  console.log(`port listening to ${PORT}`);
});

module.exports = app;