import express from "express";
import {
    getClientes,
    getCliente,
    createCliente,
    updateCliente,
    deleteCliente
} from "../controllers/Clientes.js";

const router = express.Router();

router.get('/', getClientes);
router.get('/:id', getCliente);
router.post('/', createCliente);
router.patch('/:id', updateCliente);
router.delete('/:id', deleteCliente);

export default router;