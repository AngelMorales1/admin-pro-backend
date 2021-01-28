const {response} = require('express')
const Hospital = require('../models/hospital') 

const getHospitales = async (req,res)=>{
    const hospitales = await Hospital.find()
                                     .populate('usuario','nombre')

    res.json({
        ok: true,
        hospitales
    })
}


const crearHospitales = async (req,res = response)=>{

    const uid = req.uid
    const hospital = new Hospital ({
        usuario: uid,
        ...req.body
    });

    try{

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB

        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            ok: false,
            msg: 'hable con el administraador'
        })
    }


}

const actualizarHospitales = (req,res)=>{
    res.json({
        ok: true,
        msg: 'actHospital'
    })
}

const borrarHospitales = (req,res)=>{
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getHospitales,
    crearHospitales,
    actualizarHospitales,
    borrarHospitales
}