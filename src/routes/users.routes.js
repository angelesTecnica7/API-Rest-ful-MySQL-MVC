import { Router } from "express";
const router = Router()

import {
    getAllUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser
} from "../controllers/users.controller.js";

//Obtener todos los usuarios
router.get('/users', getAllUsers)

//Obtener un usuario identificado por un  ID
router.get('/users/:id', getUserById)

//Escribir un nuevo usuario
router.post('/users', createUser)

//Modificar datos de un usuario identificado por un  ID
router.put('/users/:id', updateUser)

//Eliminar un usuario
router.delete('/users/:id', deleteUser)

export default router