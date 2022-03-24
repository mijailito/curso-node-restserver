require('dotenv').config();
const mongoose = require('mongoose');

const dbConnection = async () => {

    try{
        await mongoose.connect(process.env.URLDB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Base de datos ONLINE');
    } catch(error){
        console.log(error);
        throw new Error(console.log('Error de conexion a la base de datos'));
    }
}

module.exports = 
{   dbConnection

}