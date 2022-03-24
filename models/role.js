
const { Schema, model }= require('mongoose');

const RolSchema = new Schema({
    rol: {
        type: String,
        required: [true, 'El rol es requerido']
    },

});


module.exports = model('Role', RolSchema);