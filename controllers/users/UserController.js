const express = require('express');
const router = express.Router();
const User = require('../../models/user');

const {validationResult} = require('express-validator');
router.get('/buscar/:id', (req, res) => {
	var _id = req.params.id;
	User.findById({ _id: _id }, function (err, result) {
		if (err) {
			res.status(500).send({
				message: 'Error al momento de ejecutar la solicitud',
			});
		} else {
			if (!result) {
				res.status(404).send({
					message: 'El registro a buscar no se encuentra disponible',
				});
			} else {
				res.status(200).send({ result, msg: "Usuario encontrado", code: 200 });
			}
		}
	});
});

module.exports = router;