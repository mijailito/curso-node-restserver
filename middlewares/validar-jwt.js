const jwt = require('jsonwebtoken');
const usuario = require('../models/usuario');

const Usuario = require('../models/usuario');

const validarJWT = async (req, res, next) => {

    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const {uid}= jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uid del token
        const usuario = await Usuario.findById(uid);

        if(!usuario){
            return res.status(401).json({
                ok: false,
                msg: 'Token no es valido'
            });
        }

        // si el ui tiene el estado en true
        if (!usuario.estado) {
            return res.status(401).json({
                ok: false,
                msg: 'Token no valido'
            });
        }





        req.usuario = usuario;
        next();

    } catch (error) {
        res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }


}

module.exports = {
    validarJWT
}