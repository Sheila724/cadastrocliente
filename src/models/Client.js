const { DataTypes } = require('sequelize')
const db = require('../db/connection')

const Client = db.define('Client', {
    tipo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'Física', // Define um valor padrão para evitar erros
    },
    cpf_cnpj: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: '00000000000', // Define um valor padrão para evitar erros
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    rg: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    orgao: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    endereco: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    phone: {
        type: DataTypes.STRING,
        allowNull: true,
    },
})

module.exports = Client