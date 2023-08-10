const router = require('express').Router()
const PetController = require('../Controller/PetController.js')
const verifyToken = require('../Helpers/verify-token')
const { imageUpload } = require('../Helpers/image-upload.js')

//rotas privadas
router.post('/create', verifyToken, imageUpload.array('images'), PetController.create)
router.get('/mypets', verifyToken, PetController.getAllUserPets)
router.get('/myadoptions', verifyToken, PetController.getAllUserAdoptions)
router.delete('/:id', verifyToken, PetController.removePetById)
router.patch('/:id', verifyToken, imageUpload.array('images'), PetController.updatePet)
router.patch('/schedule/:id', verifyToken, PetController.schedule)
router.patch('/conclude/:id', verifyToken, PetController.concludeAdoption)


//rotas publicas
router.get('/', PetController.getAll)
router.get('/:id', PetController.getPetById)

module.exports = router