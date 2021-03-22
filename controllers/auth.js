const {response} = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');

const { generarJWT } = require('../helpers/jwt');
const {googleVerify} = require('../helpers/google-verify');


const login = async(req, res = response)=>{

    const {email, password} = req.body;

    try{
        // Verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if ( !usuarioDB ) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valido'
            })
        }

        // Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password );
        if( !validPassword ){
            return res.status(400).json({
                ok: false,
                msg: 'Constraseña no valida'
            })
        }

        // Generar Token

        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok:true,
            token
        })
    } catch (error){
        console.log(error)
        res.status(500).json({
            ok:false,
            msg: 'Hable con alguien'
        })
    }
}

const googleSingIn = async(req,res = response)=>{
    const googleToken = req.body.token

    try {
        const {name, email, picture} = await googleVerify(googleToken)
        const usuarioDB = await Usuario.findOne({email})
        let usuario;

        if (!usuarioDB) {
            // No existe usuario

            usuario = new Usuario({
                nombre: name,
                email,
                password: '',
                img: picture,
                google: true
            })
        }else{
            // Existe usuario
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guardar en BD
        await usuario.save();
        
        // Generar Token 
        const token = await generarJWT(usuarioDB.id);
        
        res.json({
            ok:true,
            msg:'Google Singin',
            token
        })
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Token no es correcto'
        })
    }


}

const renewToken = async(req,res = response)=>{
    
    const uid = req.uid

    // Generar Token 
    const token = await generarJWT(uid);
    const usuarioLogeado = await Usuario.findById(uid)

    res.json({
        ok:true,
        token,
        usuarioLogeado
    })
}

module.exports= {
    login,
    googleSingIn,
    renewToken
}