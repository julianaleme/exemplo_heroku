var express = require('express');
var app = express();
const port = process.env.PORT || 3000;

app.get('/',function(req,res) {
    res.send('Arquivo de teste do Deploy heroku');
});

app.listen(port, () => {
    console.log('Servidor online porta ${port}!');
});