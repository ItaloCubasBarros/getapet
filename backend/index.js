const express = require('express')
const cors = require('cors')
                   
                
const app = express()

const conn = require('./db/conn')

app.use(express.json())

app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
}))


app.use(express.static('public'))

//rotas
const UserRoutes = require('./Routes/UserRoutes')

const PetRoutes = require('./Routes/PetRoutes')

app.use('/users', UserRoutes)
app.use('/pets', PetRoutes)

conn
    .sync()
    .then(() => {
    app.listen(5000)
    })
    .catch((err)=> console.log(err))
    