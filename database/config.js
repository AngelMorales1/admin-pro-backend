const mongoose = require('mongoose');

const dbConection = async ()=>{
    try{
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true, 
            useUnifiedTopology: true
        });

        console.log('DB Online')

    } catch(error){
        console.log(error);
        throw new Error(' error a la hora de iniciar la bds');
    }

}

module.exports ={
    dbConection
}