const {Router} = require('express');
const { check } = require('express-validator');
const { login} = require('../controllers/auth');
const {validarCampos} = require('../middlewares/validar-campos');



const router = Router();

router.post('/login',[
    check('email', 'El correo es requerido').isEmail(),
    check('password', 'La contrasenia es requerida').not().isEmpty(),
    validarCampos   
] ,login);


module.exports = router;