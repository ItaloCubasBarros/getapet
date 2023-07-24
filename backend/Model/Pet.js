//Model/Pet.Js
const { DataTypes } = require('sequelize')
const User = require('./User')
const db = require('../db/conn')

const Pet = db.define('Pet', {
    name : {
        type: DataTypes.STRING, //Aqui permite mudar os tipos de types
        allowNull: false//Aqui não permite vazio, para permitir é true
    },
    age:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    weight:{
        type: DataTypes.FLOAT,
        allowNull: false
    },
    available:{
        type: DataTypes.BOOLEAN,
        allowNull: false 
    },
    color:{
        type: DataTypes.STRING,
        allowNull: false

    },
    adopter:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
})

Pet.belongsTo(User)
User.hasMany(Pet)

module.exports = Pet