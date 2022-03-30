
const esAdminRol = (req, res, next) => {
    if(!req.usuario) {
        return res.status(500).json({
            ok: false,
            msg: 'Se requiere verificar el rol sin validar el token primero'
        });
    }
    const { rol } = req.usuario;
    if (rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            ok: false,
            msg: 'El usuario no es administrador'
        });
    }
    next();
}

const tieneRol = (...roles) => {
    return (req, res, next) => {
        if(!req.usuario) {
            return res.status(500).json({
                ok: false,
                msg: 'Se requiere verificar el rol sin validar el token primero'
            });
        }
        const { rol } = req.usuario;
        if (roles.indexOf(rol) < 0) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario no tiene el rol necesario'
            });
        }
        next();
    }

}


module.exports = {
    esAdminRol,
    tieneRol
}