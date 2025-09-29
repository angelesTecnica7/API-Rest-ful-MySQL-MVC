//getAllUsers
//getUserById
//createUser
//updateUser
//deleteUser
import * as model from "../models/users.model.js"


export const getAllUsers = async (req, res) => {
    res.json(await model.getAllUsers())
}

export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const user = (await model.getUserById(id))
    if (!user) {
        return res.status(404).send('El usuario no existe')
    }
    res.json(user)
}

export const createUser = async(req, res) => {
    // console.log(req.body)
    const id_new_user = await model.createUser(req.body)
    if (!id_new_user) {
        return res.send('No se pudo guardar el nuevo usuario')
    }
    res.status(201).send(`${req.body.Name} Usuario Creado con id ${id_new_user} `) 
}

export const updateUser = async (req, res) => {
    const rows_affectedRows = await model.updateUser(req.params.id, req.body)
    if (rows_affectedRows == 0) { return res.status(404).send('Usuario no existe') }
        res.send('Usuario actualizado')
}

export const deleteUser = async (req, res) => {
        const rows_affectedRows = await model.deleteUser(req.params.id)
    if (rows_affectedRows == 0) { return res.status(404).send('Usuario no existe') }
        res.send('Registro de usuario eliminado') 
}