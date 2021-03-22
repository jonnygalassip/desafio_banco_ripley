const express = require('express'),
      router = express.Router(),
      path = require('path'),
      bodyParser = require('body-parser'),
      fs = require('fs'),
      https = require('https');

// Inicializo mi base de datos para ser manipulada constantemente
const archivo_clientes = fs.readFileSync('./clientes.json', 'UTF-8');
const listado = JSON.parse(archivo_clientes);

router.get('/', (req, res) => {
  res.render('index.html',{listado});
});

// Valida la existencia de un cliente
router.post('/get_cliente', (req, res) => {
  var existe = "0";
  listado.clientes.forEach((item, i) => {
    if(item.rut == req.body.rut_cliente)
    {
      existe = "1";
    }
  });
  res.setHeader('Content-type', 'text/html');
  res.send(existe);
});

// Obtiene el saldo de un cliente, comprobando inicialmente su rut
router.post('/get_saldo', (req, res) => {

  var saldo = "Rut inválido";
  listado.clientes.forEach((item, i) => {
    if(item.rut == req.body.rut_cliente)
    {
      saldo = item.saldo;
    }
  });
  res.setHeader('Content-type', 'text/html');

  res.send(saldo.toString());
});
// Realiza transferencia entre las cuentas, antes validando que el saldo luego de la transferencia no sea menor a 0
router.post('/realizar_transferencia', (req, res) => {
  let cuenta_emisor = req.body.cuenta_emisor;
  let cuenta_destino = req.body.cuenta_destino;
  let transferencia = parseInt(req.body.monto);
  let indice_cuenta_emisor = null;
  let indice_cuenta_destino = null;
  listado.clientes.forEach((item, i) => {
    if(item.rut == cuenta_emisor)
    {
      indice_cuenta_emisor = i;
      saldo = item.saldo;
    }
    if(item.rut == cuenta_destino)
    {
      indice_cuenta_destino = i;
    }
  });
  res.setHeader('Content-type', 'text/html');
  if((saldo - transferencia) < 0)
  {
    res.send("Sin Saldo");
  }
  else {
    listado.clientes[indice_cuenta_emisor].saldo -= transferencia;
    listado.clientes[indice_cuenta_destino].saldo += transferencia;

    const json_listado = JSON.stringify(listado);
    // actualizamos nuestra base de datos con los cambios realizados por la transferencia
    fs.writeFileSync('./clientes.json', json_listado,'UTF-8')
    res.send("OK");
  }
});
// Obtiene los valores de indicadores económicos, fuente mindicador.cl
router.post('/indicadores_economicos', (req, res) => {
  res.setHeader('Content-type', 'text/html');
  https.get('https://mindicador.cl/api', function(res_indicador) {
      res_indicador.setEncoding('utf-8');
      var data = '';

      res_indicador.on('data', function(chunk) {
          data += chunk;
      });

        res_indicador.on('end', function() {
          var dailyIndicators = JSON.parse(data);
          if(dailyIndicators.error == '404 Not Found')
          {
            res.send('No tenemos esta información disponible en este momento');
          }else{
            res.send('El valor actual de la UF es $' + dailyIndicators.uf.valor + '<br>El valor actual de UTM es $' + dailyIndicators.utm.valor + '<br>El valor actual del Dolar observador es $' + dailyIndicators.dolar.valor);
          }
        });

  }).on('error', function(err) {
    res.send('No tenemos esta información disponible en este momento');
});
});
// Obtiene el mensaje ingresado por el cliente
router.post('/nuevo_mensaje', (req, res) => {
  res.setHeader('Content-type', 'text/html');

  res.send("OK");
});


module.exports = router;
