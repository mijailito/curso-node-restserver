
const usuariosGet = (req, res) => {
    const {q, nombre='no name', apikey, page ="1", limit} = req.query;
    res.json({
        ok: true,
        message: 'Hola mundo desde una ruta de express get api - controlador',
        q,
        nombre,
        apikey,
        page, 
        limit
    });
}

const usuariosPost = (req, res) => {
    const {nombre, edad} = req.body;
    res.json({
        ok: true,
        message: 'Hola mundo desde una ruta de express post api - controlador',
        nombre,
        edad
    });
}

const usuariosPut = (req, res) => {
    const {id} = req.params;

    res.json({
        ok: true,
        message: 'Hola mundo desde una ruta de express put api - controlador',
        id
    });
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
