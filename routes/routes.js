const { Router } = require('express');
const router = Router();

const controllerAuth = require('./routerAuth');
const controllerUser = require('./routerUser');


router.use('/auth', controllerAuth);
router.use('/usuario', controllerUser);


module.exports = router;