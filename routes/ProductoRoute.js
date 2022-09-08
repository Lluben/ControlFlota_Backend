import express from "express";
import {
    getProductos,
    getProducto,
    createProducto,
    updateProducto,
    deleteProducto
} from "../controllers/Productos.js";
import {validarJWT} from "../middleware/validar-jwt.js"
const router = express.Router();

router.get('/', validarJWT, getProductos);
router.get('/:id', validarJWT, getProducto);
router.post('/', validarJWT, createProducto);
router.patch('/:id', updateProducto);
router.delete('/:id', deleteProducto);

export default router;