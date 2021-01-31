const {Router} = require('express');
const { check } = require('express-validator')


const router = Router();

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

const {  getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales} = require('../controllers/hospitales')

router.get('/', getHospitales)

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
        validarCampos
    ],crearHospitales)

router.put('/:id',
    [
        validarJWT,
        check('nombre','El nombre del hospital es necesario').not().isEmpty(),
    ], actualizarHospitales )

router.delete('/:id',
    [

    ],borrarHospitales)

module.exports = router;