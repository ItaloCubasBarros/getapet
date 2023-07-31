//PetRoutes.js
const router = require('express').Router()
const PetController = require ('../Controller/PetController')
const verifyToken = require ('../Helpers/verify-token')
const { imageUpload } = require ('../Helpers/image-upload')

//Rotas privadas
//criar Pet
router.post('/create', verifyToken, PetController.create)
//filtrar meus Pets
router.get('/mypets', verifyToken, PetController.getAllUserPets)
//deletar um Pet
router.delete('/:id', verifyToken, PetController.removePetById)
//editar um Pet
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)

//agendar pet
router.patch('/schedule/:id', verifyToken, PetController.schedule)

router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)

//ver todas as adoções todos pets adotados
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)

//Rotas publicas
//ver todos os pets
router.get('/', PetController.getAll)
//ver pet pelo ID
router.get('/:id', PetController.getPetById)

module.exports = router

