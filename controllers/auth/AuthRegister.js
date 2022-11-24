const express = require('express');
const router = express.Router();

const User = require('../../models/user');
const bcryptjs = require('bcryptjs'); //HASH para contraseñas

const {validationResult} = require('express-validator');

router.post("/crear",(req,res)=>{
    User.find({ correo: req.body.correo }, function (err, result) {
		if (result) {
			const usuario = result[0];
			if (usuario) {
				//console.log(usuario.email);
				return res.status(200).send({ msg: 'El Usuario ya existe' });
			}
		}
		const password = req.body.contrasena;
		if (password.length < 6) {
			//console.log(password);
			return res.status(200).send({
				msg: 'La contraseña debe contener al menos 6 caracteres',
			});
		}
		var myUsuario = new User(req.body);
		myUsuario.save((err, result) => {
			res.status(200).send({ result: result , code: 200 , msg: "Usuario creado exitosamente !!!"});
			myUsuario.contrasena = bcryptjs.hash(password, 10);
			//Firmar el JWT
			const payload = {
				usuario: { id: usuario.id },
			};
			jwt.sign(
				payload,
				process.env.SECRETA,
				{
					expiresIn: 3600, //1 hora
				},
				(error, token) => {
					if (error) throw error;

					//Mensaje de confirmación
					res.json({ token });
				}
			);
		});
	});
});

module.exports = router;