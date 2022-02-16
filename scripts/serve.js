const express = require('express');
const path = require('path');

const app = express();
const port = 8088;

app.use('/', express.static(path.join(__dirname, '../src')));

app.listen(port, function () {
  console.log(`Express server listening on port ${port}`)
});
