const { Router } = require('express');

const router = Router();
const usuarioRoute = require('./usuario.js');
const historialRoute = require('./historial.js');
const repositorioRoute = require('./repositorios.js')

router.use('/usuario', usuarioRoute);
router.use('/historial', historialRoute);
router.use('/repositorio',repositorioRoute)

module.exports = router;
