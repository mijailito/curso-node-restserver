const express = require('express');
const Cors = require('cors');
const {dbConnection}   = require('../database/config');
const {createAdmin, createRoles} = require('../helpers/initial-setup');
class Server {
    
    constructor(){
        this.app = express();
        this.port=process.env.PORT;
        this.usuariosPath = '/api/usuarios';
        this.authPath = '/api/auth'; //ruta de autenticacion

        //conexion a base de datos
        this.conectarDB();

        //Configuraciones iniciales
        this.initialSetup();

        //Middlewares
        this.middlewares();
        //rutas de la app
        this.routes();
    }
    
    async conectarDB(){
        await dbConnection();
    }
    initialSetup(){
        createAdmin();
        createRoles();
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
        this.app.use(this.authPath, require('../routes/auth'));
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