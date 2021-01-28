const fs = require('fs')

const Hospital = require('../models/hospital')
const Usuario = require('../models/usuario')
const Medico = require('../models/medico')


const borrarImagen = (path) =>{
    if (fs.existsSync(path)) {
        // borra imagen vieja
        fs.unlinkSync(path)
    }

}

const actualizarImagen = async (tipo, id, nombreArchivo) =>{

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false
            }

            var pathViejo = `./uploads/medicos/${ medico.img }`

            borrarImagen(pathViejo)

            medico.img = nombreArchivo
            await medico.save();
            return true;

        break

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false
            }

            var pathViejo = `./uploads/hospitales/${ hospital.img }`

            borrarImagen(pathViejo)

            hospital.img = nombreArchivo
            await hospital.save();
            return true;
        break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false
            }

            var pathViejo = `./uploads/usuarios/${ usuario.img }`

            borrarImagen(pathViejo)

            usuario.img = nombreArchivo
            await usuario.save();
            return true;
        break;
        default:
            break;
    }

}

module.exports={
    actualizarImagen
}