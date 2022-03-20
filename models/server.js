const express = require('express');
const Cors = require('cors');
class Server {

    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Middlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }

    middlewares(){
        //Cors
        this.app.use(Cors());

        //BodyParser
        this.app.use(express.json());

        //carpeta public
        this.app.use(express.static('public'));

    }
    routes(){
        this.app.use(this.usuariosPath, require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor en el puerto ${process.env.PORT}!`);
        }
    );
    }
}


module.exports = Server;