//model/ImagePet.js
const { DataTypes } = require('sequelize')

const db = require('../db/conn')

const Pet = require('./Pet')

const ImagePet = db.define('ImagePet', {
    image: {
        type: DataTypes.STRING,
        allowNull: false
    }
})

//uma imagem pertence a 1 pet
ImagePet.belongsTo(Pet)
//1 pet tem varias imagens
Pet.hasMany(ImagePet)

module.exports = ImagePet