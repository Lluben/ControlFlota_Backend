import express from "express";
import {
    getDetalleVentas,
    getDetalleVenta,
    createDetalleVenta,
    updateDetalleVenta,
    deleteDetalleVenta
} from "../controllers/DetalleVentas.js";
import {validarJWT} from "../middleware/validar-jwt.js"
const router = express.Router();

router.get('/', validarJWT, getDetalleVentas);
router.get('/:id', validarJWT, getDetalleVenta);
router.post('/', validarJWT,createDetalleVenta);
router.patch('/:id', updateDetalleVenta);
router.delete('/:id', deleteDetalleVenta);

export default router;