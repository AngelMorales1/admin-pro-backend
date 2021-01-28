const {Router} = require('express');
const { check } = require('express-validator')


const router = Router();
const {getBusqueda,getDocumentosColeccion} = require('../controllers/busquedas')

const {validarJWT} = require('../middlewares/validar-jwt')

router.get('/:busqueda', validarJWT , getBusqueda)

router.get('/coleccion/:tabla/:busqueda', validarJWT , getDocumentosColeccion)

module.exports = router;