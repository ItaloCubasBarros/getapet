//PetController.js
const Pet = require ('../Model/Pet')
const User = require ('../Model/User')
const getToken = require ('../Helpers/get-token')
const jwt = require ('jsonwebtoken')
const ImagePet = require ('../Model/ImagePet')

module.exports = class PetController{
    static async create(req,res){
        const {name, age, weight, color, } = req.body
        const available = true //Sempre que um novo pet for cadastrado será disponivel

        //validações
        if(!name){
            res.status(422).json({message: 'O nome é obrigatório'})
            return
        }
        if(!age){
            res.status(422).json({message: 'A idade  é obrigatório'})
            return
        }
        if(!weight){
            res.status(422).json({message: 'O peso é obrigatório'})
            return
        }
        if(!color){
            res.status(422).json({message: 'A cor é obrigatório'})
            return
        }
        
        //Definindo quem cadastrou o pet
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')//Decodificação de token. Para obter o Id
        currentUser = await User.findByPk(decoded.id)

        //criando o pet
        const pet = new Pet({
            name: name,
            age: age,
            weight: weight,
            color: color,
            available: available,
            UserId: currentUser.id
        })

        try {
            const newPet = await pet.save()
            res.status(200).json({message: 'Pet cadastrado com sucesso', newPet})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    static async getAll(req, res){
        const pets = await Pet.findAll({
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({pets: pets})
    }

    //Filtrar pets por usuario SAYONARAAAA <3 
    static async getAllUserPets(req, res){
        //Verificação de usuario logado
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        const pets = await Pet.findAll({ 
            where: { UserId : currentUserId}, 
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({ pets })
    }

    //filtrando o ID do pet
    static async getPetById(req, res){
        const id = req.params.id

        if(isNaN(id)){//isNan == é um NOT A NUMBER
            res.status(422).json({message: 'ID Invalido'})
        }

        //buscar pet pelo id
        const pet = await Pet.findByPk(id)

        //validando se o pet existe
        if(!pet){
            res.status(422).json({message: 'Pet não existe'})
            return
        }
        res.status(200).json({ pet: pet })

    }

    static async removePetById(req, res){
        const id = req.params.id

        if(isNaN(id)){
            res.status(422).json({message: 'ID Invalido'})
        }
        const pet = await Pet.findByPk(id)

        if(!pet){
            res.status(422).json({message: 'Pet não existe'})
            return
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(pet.UserId !== currentUserId){
            res.status(422).json({message: 'Id Invalido'})
            return
        }

        await Pet.destroy({ where: {id: id} })
        res.status(200).json({message: 'Pet deletado com sucesso!'})
    }

    static async updatePet(req, res){
        const id = req.params.id

        const {name, age, weight, color} = req.body

        const updatedPet = {}

        if(isNaN(id)){
            res.status(422).json({message: 'ID Invalido'})
        }
        const pet = await Pet.findByPk(id)

        if(!pet){
            res.status(422).json({message: 'Pet não existe'})
            return
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(pet.UserId !== currentUserId){
            res.status(422).json({message: 'Id Invalido'})
            return
        }

        if(!name){
            res.status(422).json({message: 'O nome é obrigatorio'})
            return
        } else {
            updatedPet.name = name
        }
        if(!age){
            res.status(422).json({message: 'O age é obrigatorio'})
            return
        } else {
            updatedPet.age = age
        }
        if(!weight){
            res.status(422).json({message: 'O weight é obrigatorio'})
            return
        } else {
            updatedPet.weight = weight
        }
        if(!color){
            res.status(422).json({message: 'A cor é obrigatorio'})
            return
        } else {
            updatedPet.color = color
        }

        //trabalhar as imagens
        const images = req.files
        if(!images || images.length === 0 ){
            res.status(422).json({message: 'Imagem é obrigatoria'})
            return
        } else{
            const imageFilesnames = images.map((image) => image.name)
            //remover as imagens antigas
            await ImagePet.destroy({ where: {PetId: pet.id} })
            //Adicionar novas imagens
            for(let i = 0; i< imageFilesnames.length; i++) {
                const fileName = imageFilenames[i]
                const newImagePet = new ImagePet ({ Image: fileName, PetId: pet.id })
                await newImagePet.save()
            }
        }
        await Pet.update(updatedPet, {where: {id: id}})

        res.status(200).json({message: 'Pet atualizado com sucesso'})
    }


    static async schedule(req, res) {
        const id = req.params.id

        const pet = await Pet.findByPk(id)

        if(!pet){
            res.status(422).json({message: 'Pet não existe'})
            return
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(pet.UserId === currentUserId){
            res.status(422).json({message: 'Pet já é seu'})
            return
        }

        //checar se o usuario já agendou a visita
        if(pet.adopter){
            if(pet.adopter === currentUserId){
                res.status(422).json({message: 'Você já agendou uma visita para este pet'})
                return
            }
        }
        pet.adopter = currentUserId

        await pet.save()
        res.status(200).json({message: `Visita agendada por ${currentUser.name}`})
    }

    static async concludeAdoption(req, res){
        const id = req.params.id

        const pet = await Pet.findByPk(id)

        if(!pet){
            res.status(422).json({message: 'Pet não existe'})
            return
        }

        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        if(pet.UserId !== currentUserId){
            res.status(422).json({message: 'Id Invalido.'})
            return
        }

        pet.available = false

        await pet.save()

        res.status(200).json({message: 'adoção concluida'})
    }

    static async getAllUserAdoptions(req, res){
        
        let currentUser
        const token = getToken(req)
        const decoded = jwt.verify(token, 'nossosecret')
        currentUser = await User.findByPk(decoded.id)
        const currentUserId = currentUser.id

        const pets = await Pet.findAll({
            where: {adopter: currentUserId},
            order: [['createdAt', 'DESC']]
        })
        res.status(200).json({ pets })
    }
}