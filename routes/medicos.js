const {Router} = require('express');
const { check } = require('express-validator')


const router = Router();

const {validarCampos} = require('../middlewares/validar-campos')
const {validarJWT} = require('../middlewares/validar-jwt')

const {  getMedico,
    postMedico,
    actualizarMedico,
    borrarMedico} = require('../controllers/medicos')

router.get('/',getMedico)

router.post('/',
    [
        validarJWT,
        check('nombre','El nombre del medico es necesario').not().isEmpty(),
        check('hospital','El id del hospital debe ser valido').isMongoId(),
        validarCampos
    ],postMedico)

router.put('/:id',
    [

], actualizarMedico )

router.delete('/:id',
    [

    ],borrarMedico)

module.exports = router;