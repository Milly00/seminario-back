var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var userSchema = Schema({
    usuario: String,
    contrasena: String,
    correo: { type: String, required: true, trim: true, unique: true }
});

const User = mongoose.model('usuario', userSchema);
module.exports = User;