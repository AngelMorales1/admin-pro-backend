const {response} = require('express')
const Medico = require('../models/medico')

const getMedico = async (req,res = response)=>{
    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

    res.json({
        ok: true,
        medicos
    })
}


const getMedicoById = async (req,res = response)=>{

    const id = req.params.id

    try {
        const medico = await Medico.findById(id)
                                .populate('usuario','nombre')
                                .populate('hospital','nombre')

        res.json({
            ok: true,
            medico
        })
    } catch (error) {
        res.json({
            ok: true,
            msg:'hable con el administrador'
        })
    }

    
}

const postMedico = async (req,res = response)=>{
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

const actualizarMedico = async (req,res = response)=>{
    const id = req.params.id
    const uid = req.uid

    try {
        const medico = await Medico.findById(id)
        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg:'medico no encontrado'
            })
        }
        const cambiosMedico= {
            ...req.body,
            usuario: uid
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id,cambiosMedico,{new: true})
    
        res.json({
            ok: true,
            medicoActualizado
        })
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }


}

const borrarMedico = async (req,res = response)=>{
    const id = req.params.id
    
    try {
        const medico = await Medico.findById(id);
        if (!medico) {
            return res.status(404).json({
                ok: true,
                msg: 'hospital no encontrado'
            })
        }
        
        await Medico.findByIdAndDelete(id)
        
        res.json({
            ok: true,
            msg: 'exito al borrar'
        })

    }catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador'
        })
    }
}

module.exports = {
    getMedico,
    postMedico,
    actualizarMedico,
    borrarMedico,
    getMedicoById
}