import express from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/Usuarios.js";
import { verifyUser, adminOnly } from "../middleware/AuthUser.js";

const router = express.Router();

//para pruebas iniciales, sin los middlewares
router.get('/', verifyUser, getUsuarios);
router.get('/:id', verifyUser, getUsuario);
router.post('/', verifyUser, createUsuario);
router.patch('/:id', verifyUser, updateUsuario);
router.delete('/:id', verifyUser, deleteUsuario);


export default router;