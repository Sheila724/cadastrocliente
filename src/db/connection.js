require('dotenv').config();
const { Sequelize } = require('sequelize');
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
    process.env.POSTGRES_DB, 
    process.env.POSTGRES_USER, 
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