const {response} = require('express');
const Hospital = require('../models/hospital');
const Usuario = require('../models/usuario');
const Medicos = require('../models/medico');


const getBusqueda = async (req,res = response)=>{
    const busqueda = req.params.busqueda
    const regex = new RegExp(busqueda,'i');

    const [ usuarios,hospitales,medicos ] = await Promise.all([
        Usuario.find({ nombre: regex }),
        Hospital.find({ nombre: regex }),
        Medicos.find({ nombre: regex })
    ])

    try{
        res.json({
            ok: true,
            usuarios,
            hospitales,
            medicos
        })
    }catch{
        res.status(404).json({
            ok: true,
            msg: 'mal'
        })
    }
}

const getDocumentosColeccion = async (req,res = response)=>{
    const tabla    = req.params.tabla;
    const busqueda = req.params.busqueda;
    const regex    = new RegExp(busqueda,'i');

    let data= []

    switch (tabla) {
        case 'hospitales':
            data = await Hospital.find({ nombre: regex })
                                 .populate('usuario','nombre img')
            break;

        case 'usuarios':
            data = await Usuario.find({ nombre: regex })
            break;

        case 'medicos':
            data = await Medicos.find({ nombre: regex })
                                .populate('usuario','nombre img')
                                .populate('hospital','nombre img')
            break;

        default:
            return res.status(400).json({
                ok: false,
                msg: 'La tabla solicitada no existe'
            })
    }
    
    res.json({
        ok: true,
        resultados: data
    })
}

module.exports = {
    getBusqueda,
    getDocumentosColeccion
}