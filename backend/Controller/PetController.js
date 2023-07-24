//PetController.js
const Pet = require ('../Model/Pet')
const User = require ('../Model/User')
const getToken = require ('../Helpers/get-token')
const jwt = require ('jsonwebtoken')

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
        }
        res.status(200).json({ pet: pet })

    }
}