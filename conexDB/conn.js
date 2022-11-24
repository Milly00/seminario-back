/** Estara la coneción de manera global y podrá ser reutilizada */
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/seminario');

require('dotenv').config({ path: 'variables.env' });


const miconexion = mongoose.connection;

miconexion.on('connected', () => {
	console.log('Conexion exitosa a la base de datos MongoDB!!!');
});
miconexion.on('error', () => {
	console.log('Hay un error en la conexion a MongoDB!!!');
});
module.exports = mongoose;