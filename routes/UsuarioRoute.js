import express from "express";
import {
    getUsuarios,
    getUsuario,
    createUsuario,
    updateUsuario,
    deleteUsuario
} from "../controllers/Usuarios.js";

const router = express.Router();

//para pruebas iniciales, sin los middlewares
router.get('/', getUsuarios);
router.get('/:id', getUsuario);
router.post('/', createUsuario);
router.patch('/:id', updateUsuario);
router.delete('/:id', deleteUsuario);


export default router;