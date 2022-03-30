const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/generar-jwt');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //verificar si el email exite
        let usuarioDB = await Usuario.findOne({ email });
        if (!usuarioDB) {

            return res.status(404).json({
                ok: false,
                msg: 'El usuario no existe'
            });
        }

        //si el usuario esta activo en db
        if (!usuarioDB.estado) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no esta activo'
            });
        }

        //verificar si el password es correcto
        const validPassword = await bcrypt.compare(password, usuarioDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorrecto'
            });
        }



        //generar JWT
        const token = await generarJWT(usuarioDB.id);


        res.json({
            msg: 'login ok',
            usuarioDB,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    login
}