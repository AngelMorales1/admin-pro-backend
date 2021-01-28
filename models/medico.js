const { Schema, model }= require('mongoose')

const medicoSchema = Schema({
    nombre: {
        type: String,
        require: true
    },
    img: {
        type: String
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    hospital: {
        type: Schema.Types.ObjectId,
        ref: 'Hospital',
        required: true
    }

},{collection: 'medicos'})


medicoSchema.method('toJSON',function(){
    const { __v,password, ...object} = this.toObject();

    return object;
})


module.exports = model('Medico', medicoSchema);