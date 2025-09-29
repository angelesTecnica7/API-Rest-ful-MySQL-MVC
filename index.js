import express from 'express'
const app = express()
const PORT = 3000

//OJO!!!! este middlewares debe estar arriba de los routes sino el req. body no llega al controlador
app.use(express.json())

import usersRouter from './src/routes/users.routes.js'
app.use(usersRouter)


//pag inicio
app.get('/', (req, res) => {
    res.send('API REST ful con MySQL')
    console.log(req.body)
})


//Paginas inexistentes - errores de url
app.use((req, res) => {
    res.status(404).json({error: "recurso no encontrado"})
})

app.listen(PORT, () => console.log(`Servidor Corriendo http://localhost:${PORT}`))