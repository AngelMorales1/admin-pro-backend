const {Router} = require('express');
const router = Router();
const expressFileUpload = require('express-fileupload');


const {validarJWT} = require('../middlewares/validar-jwt')

const { fileUpload,retornaImagen } = require('../controllers/uploads');

router.use( expressFileUpload() );

router.put('/:tipo/:id', validarJWT , fileUpload)

router.get('/:tipo/:foto' , retornaImagen)

module.exports = router;