var express = require('express');
var func = require('./function');
var cors = require('cors');
var app = express();
app.use(cors());
app.get('/getTranslation', func.getTranslation);
app.post('/addTranslation', func.addTranslation);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});