//Esse arquivo  irá consumir a API
//AXIOS ao inves de FETCH
import axios from "axios"

export default axios.create({
    baseURL: 'http://localhost:5000'
})

