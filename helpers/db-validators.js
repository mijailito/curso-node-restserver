const Role = require('../models/role');
const Usuario = require('../models/usuario');

const esRolValido = async (rol='') => {
    const rolDB = await Role.findOne({rol});
    if(!rolDB){
        throw new Error('No es un rol valido');
    }
}

const existeUsuarioPorId = async (id) => {
    const usuarioDB = await Usuario.findById(id);
    if(!usuarioDB){
        throw new Error('El id no existe');
    }
}

const emailExiste= async (email='') => {
    const usuarioDB = await Usuario.findOne({email});
    if(usuarioDB){
        throw new Error('El email ya existe');
    }
}


module.exports = {
    esRolValido,
    emailExiste,
    existeUsuarioPorId
}