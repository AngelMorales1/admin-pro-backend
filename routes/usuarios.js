const {Router} = require('express');
const { check } = require('express-validator')


const router = Router();
const {getUsuarios,crearUsuarios,actualizarUsuarios,deleteUsuario} = require('../controllers/usuarios')

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

router.get('/', validarJWT , getUsuarios)

router.post('/',
    [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password','La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El mail es obligatorio').isEmail(),
        validarCampos,
    ]
    , crearUsuarios)

router.put('/:id',
    [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('role', 'El mail es obligatorio').not().isEmpty(),
    validarCampos
], 
actualizarUsuarios)

router.delete('/:id',
    [
    validarJWT,
    deleteUsuario
    ]
    , deleteUsuario)

module.exports = router;