const bcrypt = require('bcrypt');
const Role = require("../models/role");
const Usuario = require("../models/usuario");

const createRoles = async () => {

    try {

        // Contar documentos
        const count = await Role.countDocuments();

        // Verificar si existen roles
        if (count > 0) return;

        // Crear roles en caso que no existan
        await Promise.all([
            new Role({ rol: 'USER_ROLE' }).save(),
            new Role({ rol: 'ADMIN_ROLE' }).save(),
        ]);

        console.log(`Roles fueron registrados como: "ADMIN_ROLE" y "USER_ROLE"`);

    } catch (error) {

        console.log(error);

    }

};

const createAdmin = async () => {

    // Verificar que exista un usuario administrador
    const user = await Usuario.findOne({ email: 'admin@localhost' });

    try {

        // Si no existe usuario administrador, crearlo
        if (!user) {

            // Encriptar password
            const salt = bcrypt.genSaltSync();
            const password = bcrypt.hashSync('admin', salt);

            // Crear usuario administrador
            await Usuario.create({
                nombre: 'admin',
                email: 'admin@localhost',
                rol: 'ADMIN_ROLE',
                password,
            });

            console.log('Usuario Administrador Creado!')
        }

    } catch (error) {

        console.log(error);

    }
};

module.exports = {
    createRoles,
    createAdmin,
};