// src/db/connection.js

require('dotenv').config();
const { Sequelize } = require('sequelize');

console.log('--- Debug de Variáveis de DB ---');
console.log('process.env.POSTGRES_NAME:', process.env.POSTGRES_NAME);
console.log('process.env.POSTGRES_USER:', process.env.POSTGRES_USER); // <-- ADICIONADO AQUI
console.log('process.env.POSTGRES_PASSWORD:', process.env.POSTGRES_PASSWORD ? 'DEFINIDA' : 'NÃO DEFINIDA/VAZIA'); // Não imprima a senha
console.log('process.env.POSTGRES_HOST:', process.env.POSTGRES_HOST);
console.log('process.env.POSTGRES_PORT:', process.env.POSTGRES_PORT);
console.log('---------------------------------');

console.log('DISABLE_DB:', process.env.DISABLE_DB);
if (process.env.DISABLE_DB === 'true') {
    console.log('Database connection disabled. Running in mock mode.');
    module.exports = null;
    return;
}

const password = process.env.POSTGRES_PASSWORD;
if (typeof password !== 'string') {
    throw new Error('POSTGRES_PASSWORD must be a string');
}

const sequelize = new Sequelize(
    process.env.POSTGRES_NAME,
    process.env.POSTGRES_USER, // <--- AQUI DEVE SER 'postgres'
    password,
    {
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        dialect: 'postgres'
    }
);

try {
    sequelize.authenticate()
    .then(() => console.log("Connected to PostgreSQL!"));
} catch(err) {
    console.log(`Unable to connect: ${err}`);
}

module.exports = sequelize;