const {Router} = require('express');
const { check } = require('express-validator');

const {validarCampos, validarJWT, esAdminRol, tieneRol} = require('../middlewares');

const { usuariosGet, usuariosPost, usuariosPatch, usuariosDelete, usuariosPut } = require('../controllers/usuarios');
const { esRolValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');



const router = Router();

router.get('/', usuariosGet);
router.put('/:id',[
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPut);
router.post('/',[
    check('nombre', 'El nombre es requerido').not().isEmpty(),
    check('password', 'La contrasenia debe ser de mas de 6 caracteres').isLength({min: 6}),
    check('email', 'El correo no es valido').isEmail(),
    check('email', 'El correo ya existe').custom(emailExiste),
    // check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('rol').custom( esRolValido ),
    validarCampos
], usuariosPost); // validacion de email de usuarios
router.delete('/:id',[
    validarJWT,
    // esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
],usuariosDelete);
router.patch('/', usuariosPatch);




module.exports = router;