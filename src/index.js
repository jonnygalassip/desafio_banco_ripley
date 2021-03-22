const express = require('express'),
      app = express(),
      path = require('path'),
      bodyParser = require('body-parser'),
      fs = require('fs');

//configuraciones
app.set('port', 8080);
app.set('views', path.join(__dirname,'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//rutas

app.use(require('./routes/index'));

//archivos estáticos

app.use(express.static(path.join(__dirname,'public')));

//escuchando servidor
app.listen(app.get('port'), () => {
  console.log('Servidor en puerto', app.get('port'));
});
