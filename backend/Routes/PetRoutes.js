//PetRoutes.js
const router = require('express').Router()
const PetController = require ('../Controller/PetController')
const verifyToken = require ('../Helpers/verify-token')
const { imageUpload } = require ('../Helpers/image-upload')


module.exports = router