const jwt = require('jsonwebtoken');

const generarJWT = (uid ='') => {

    return new Promise((resolve, reject) => {
        const payload = {
            uid
        };

        jwt.sign(payload, process.env.SECRETORPRIVATEKEY, {
            expiresIn: '4h' //4 horas
        }, (err, token) => {
            if (err) {
                reject('No se pudo generar el JWT');
                console.log(err);
            } else {
                resolve(token);
            }
        });
    });
}

module.exports = {
    generarJWT
}
