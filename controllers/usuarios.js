const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');


const usuariosGet = async (req, res) => {
    const {limite=5, desde=0} = req.query;
    const query = {estado: true};

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

    res.json({
        total,
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

const usuariosDelete = async (req, res) => {
    const {id} = req.params;


    //borrado fisico
    // const usuario = await Usuario.findByIdAndDelete(id);

    //borrado logico recomendado para usuarios y papeleras de reciclaje
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json(usuario);
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
