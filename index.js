var app = require('./app');

var mongoose = require('./conexDB/conn.js'); //Importo el archivo d ela conexion

var port = 5000;

app.listen(process.env.PORT || port, function()
{
  console.log("Servidor OK en puerto 5000 :) ")
})