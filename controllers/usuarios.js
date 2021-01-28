const { response } = require ('express')
const bcrypt = require('bcryptjs')

const { generarJWT } = require('../helpers/jwt');
const Usuario = require('../models/usuario');

const getUsuarios = async (req,res)=>{
    const desde = Number(req.query.desde)|| 0 ;
    console.log(desde)

    const [usuarios, total] = await Promise.all([
        Usuario.find()
                                  .skip(desde)
                                  .limit(5),

         Usuario.countDocuments()
    ])
    res.json({
            ok: 'true',
            usuarios,
            total
        })
}

const crearUsuarios = async (req,res = response )=>{

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            })
        }

        const usuario = new Usuario(req.body);
        
        // Encriptar contraseña
        const salt = bcrypt.genSaltSync()
        usuario.password = bcrypt.hashSync( password,salt )

        // guardar usuario
        await usuario.save();
    
        // generar token
        const token = await generarJWT(usuario.id);

        res.json({
                ok: 'true',
                usuario,
                token
        })

    } catch (error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: "error inesperado... revisar logs"
        })
    }

   
}

const actualizarUsuarios = async (req,res = response)=>{
    // Validar TOKEN y comprobar q es el usuario correcto
    
    const id = req.params.id;
   
    try {

        const usuarioDB = await Usuario.findById(id)

        if (!usuarioDB) {
            res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese ID'
            })
        }

        // Actualizaciones
        
        const { password, google,email , ...campos} = req.body;

        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({email});
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un usuario con ese email'
                })
            }
        }

        campos.email = email

        const usuarioActualizado = await Usuario.findByIdAndUpdate(id, campos, {new: true})

        res.json({
            ok:true,
            usuarioActualizado
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Error inesperado'
        })
    }
}


const deleteUsuario = async (req, res = response)=>{

    const id  = req.params.id
    
    try{

        const usuarioDB = await Usuario.findById(id)

        if (!usuarioDB) {
            res.status(404).json({
                ok:false,
                msg: 'No existe un usuario con ese ID'
            })
        }

        await Usuario.findByIdAndDelete( id )

        res.json({
            ok:false,
            msg: 'Usuario eliminado'
        })
        
    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'nope salio algo mal'
        })
    }
}


module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    deleteUsuario
};