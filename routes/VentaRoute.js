import express from "express";
import {
    getVentas,
    getVenta,
    createVenta,
    updateVenta,
    deleteVenta
} from "../controllers/Ventas.js";
import {validarJWT} from "../middleware/validar-jwt.js"
import { verifyUser } from "../middleware/AuthUser.js";
const router = express.Router();

router.get('/', verifyUser, getVentas);
router.get('/:id', validarJWT, getVenta);
router.post('/', validarJWT, createVenta);
router.patch('/:id', validarJWT, updateVenta);
router.delete('/:id', validarJWT, deleteVenta);

export default router;