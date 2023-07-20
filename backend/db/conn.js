//conn.js
const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('getapet', 'root', 'root', { //alterar o nome do banco, user e senha.
    host: 'localhost',
    dialect: 'mysql'
})


try {
    sequelize.authenticate()
    console.log('conectado ao banco')
} catch (error) {
    console.log('não foi possivel conectar ao banco', error)
}

module.exports = sequelize