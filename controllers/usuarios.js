const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res) => {
    // const {q, nombre='no name', apikey, page ="1", limit} = req.query;
    const {limite=5, page} = req.query;
    const usuarios = await Usuario.find()
        .limit(Number(limite))



    res.json({
        usuarios
    });
}

const usuariosPost = async (req, res) => {
    const {nombre, email, password, rol}= req.body;
    const usuario = new Usuario( {nombre, email, password, rol} );



    //Encriptar contraseña
    const salt = bcrypt.genSaltSync(); //genera una semilla para encriptar
    usuario.password = bcrypt.hashSync(usuario.password, salt); // encripta la contraseña

    //guardar usuario en la base de datos
    await usuario.save();
    res.json({
        usuario
    });
}

const usuariosPut = async (req, res) => {
    const {id} = req.params;
    const {_id, password, google, email, ...resto} = req.body;

    //validar contra base de datos
    if(password){
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync(); //genera una semilla para encriptar
        resto.password = bcrypt.hashSync(password, salt); // encripta la contraseña
    }
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosDelete = (req, res) => {
    const {id} = req.params;
    res.json({
        ok: true,
        message: 'Hola mundo desde una ruta de express delete api - controlador',
        id
    });
}

const usuariosPatch = (req, res) => {
    res.json({
        ok: true,
        message: 'Hola mundo desde una ruta de express patch api - controlador'
    });
}




module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete,
    usuariosPatch
}
