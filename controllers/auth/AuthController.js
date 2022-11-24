const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const bcryptjs = require('bcryptjs');
const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');

router.post('/autentificar', async (req, res) => {
	//Revisar si hay errores
	const errores = validationResult(req);
	if (!errores.isEmpty()) {
		return res.status(400).json({ errores: errores.array() });
	}

	const { correo, contrasena } = req.body;

	try {
		//revisar que sea un usuario registrado
		let usuario = await User.findOne({ correo });
		if (!usuario) {
			return res.status(200).json({ msg: 'El usuario no existe' });
		}

		//revisar la password
		/** 
		const passCorrecto = await bcryptjs.compare(contrasena, usuario.contrasena, function (err,result){
			console.log(result);
		});*/
		const passCorrecto = usuario.contrasena === contrasena;
		if (!passCorrecto) {
			return res.status(200).json({ msg: 'Contraseña incorrecta' });
		}

		//Si todo es correcto, crear y firmar el token

		const payload = {
			usuario: { id: usuario.id },
		};

		jwt.sign(
			payload,
			process.env.SECRETA,
			{
				expiresIn: 43200, //1 hora
			},
			(error, token) => {
				if (error) throw error;

				//Mensaje de confirmación
				res.json({ token });
			}
		);
	} catch (error) {
		console.log('Hubo un error');
		console.log(error);
		res.status(400).send('Hubo un error');
	}
});

router.get('/autentificado', async (req, res) => {
	try {
		const usuario = await User.findById(req.usuario.id);
		res.json({ usuario });
	} catch (error) {
		res.status(500).json({ msg: 'Hubo un error' });
	}
});

module.exports = router;
