//Resolver o nosso login utilizando HOOKS
//hooks
import { useState, useEffect} from "react"
//util
import api from '../utils/api'
//react-router-dom
import { useNavigate } from "react-router-dom"

function useAuth(){
    //verificar o estado atual do login
    const [authenticated, setAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('token')
        //verificar  se existe token e encaminhar para a api
        if(token) {
            api.defaults.headers.Authorization = `Bearer ${JSON.parse(token)}`
            //mudar o estado do usuario para autenticado
            setAuthenticated(true) 
        }
    }, [])


    //função para registrar um novo usuario.
    async function register (user) {
        try {
            //rota da api para se cadastrar um usuario
            const data = await api.post('/users/register', user)
            .then((response)=>{
                return response.data
            })
            alert(data.message)

            await authUser(data)
        } catch (error) {
            console.log('Erro ao se cadastrar' + error)
            alert(error.response.data.message)
        }
    }

    
    async function login(user){
        try {
            const data = await api.post('/users/login', user)
            .then((response) => {
                return response.data
            })
            await authUser(data)
            alert(data.message)
            //mudar para a rota desejada apos o login
            navigate('/user/profile')
        } catch (error) {
            alert(error.response.data.message)
        }
    }

    //função para autenticar o usuario
    async function authUser(data){
        setAuthenticated(true)
        localStorage.setItem('token', JSON.stringify(data.token))
        navigate('/')
    }

    async function logout(){
        setAuthenticated(false)
        localStorage.removeItem('token')
        api.defaults.headers.Authorization =  undefined
        navigate('/')
        alert('Logout realizado com sucesso!!')
    }

    return { authenticated, register, login, logout}
}

export default useAuth