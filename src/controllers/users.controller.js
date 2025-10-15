//getAllUsers
//getUserById
//createUser
//updateUser
//deleteUser
import * as model from "../models/users.model.js"

//Obtener todos los usuarios
export const getAllUsers = async (req, res) => {
    const rows = await model.getAllUsers()
    if (rows.length > 0) {
        res.json(rows)
    } else {
        res.status(500).send(`Error en consulta ${rows.errno}`)
    }
}

//Obtener un usuario identificado por un ID
export const getUserById = async (req, res) => {
    const id = parseInt(req.params.id)
    const rows = (await model.getUserById(id))

    //si row trae el error del catch este es un objeto que tiene una propiedad "errno" cod. de error
    if (rows.errno) {
        return res.status(500).send(`Error en consulta ${rows.errno}`)
    }
    //row devuelve un array que contiene un objeto, con [0] tomo solo el objeto  
    (!rows[0]) ? res.status(404).send('El usuario no existe') : res.json(rows[0])
}

//Escribir un nuevo usuario
export const createUser = async (req, res) => {
    // console.log(req.body)
    const rows = await model.createUser(req.body)

    //si row trae el error del catch este es un objeto que tiene una propiedad "errno" cod. de error
    if (rows.errno) {
        return res.status(500).send(`Error en consulta ${rows.errno}`)
    }
    //row devuelve muchos datos entre ellos el id creado, es lo que retorno
    res.status(201).send(`${req.body.Name} Usuario Creado con id ${rows.insertId} `)
}

//Modificar datos de un usuario identificado por un  ID
export const updateUser = async (req, res) => {
    const rows = await model.updateUser(req.params.id, req.body)

    //si row trae el error del catch este es un objeto que tiene una propiedad "errno" cod. de error
    if (rows.errno) {
        return res.status(500).send(`Error en consulta ${rows.errno}`)
    }
    //row devuelve muchos datos entre ellos "affectedRows" cantidad de registros afectados, si es igual a cero no se modifico ningun registro
    if (rows.affectedRows == 0) { return res.status(404).send('Usuario no existe') }
    res.send('Usuario actualizado')
}

//Eliminar un usuario
export const deleteUser = async (req, res) => {
    const rows = await model.deleteUser(req.params.id)

    //si row trae el error del catch este es un objeto que tiene una propiedad "errno" cod. de error
    if (rows.errno) {
        return res.status(500).send(`Error en consulta ${rows.errno}`)
    }
    
    //row devuelve muchos datos entre ellos "affectedRows" cantidad de registros afectados, si es igual a cero no se modifico ningun registro
    if (rows.affectedRows == 0) { return res.status(404).send('Usuario no existe') }
    res.send('Registro de usuario eliminado')
}