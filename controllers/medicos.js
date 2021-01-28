const {respones} = require('express')
const Medico = require('../models/medico')

const getMedico = async (req,res)=>{
    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

    res.json({
        ok: true,
        medicos
    })
}


const postMedico = async (req,res)=>{
    const uid = req.uid
    const medico = new Medico ({
        usuario: uid,
        ...req.body
    });

    try{
        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administraador'
        })
    }


}

const actualizarMedico = (req,res)=>{
    res.json({
        ok: true,
        msg: 'actHospital'
    })
}

const borrarMedico = (req,res)=>{
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getMedico,
    postMedico,
    actualizarMedico,
    borrarMedico
}