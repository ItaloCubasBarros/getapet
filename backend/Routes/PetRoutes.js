//PetRoutes.js
const router = require('express').Router()
const PetController = require ('../Controller/PetController')
const verifyToken = require ('../Helpers/verify-token')
const { imageUpload } = require ('../Helpers/image-upload')

//Rotas privadas
//criar pet
router.post('/create', verifyToken, PetController.create)
//filtrar meus pets
router.get('/mypets', verifyToken, PetController.getAllUserPets)
//Rotas publicas
//ver todos os pets
router.get('/', PetController.getAll)
//ver pet pelo ID
router.get('/:id', PetController.getPetById)
module.exports = router