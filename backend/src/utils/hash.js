const bcrypt = require("bcrypt");

// Función para hashear la contraseña
async function hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// Función para comparar la contraseña con el hash almacenado
async function comparePasswords(password, hashedPassword) {
    return await bcrypt.compare(password, hashedPassword);
}

module.exports = { hashPassword, comparePasswords};
