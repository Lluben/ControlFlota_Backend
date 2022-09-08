import express from "express";
import {
    getEmpresas,
    getEmpresa,
    createEmpresa,
    updateEmpresa,
    deleteEmpresa
} from "../controllers/Empresas.js";

const router = express.Router();

router.get('/', getEmpresas);
router.get('/:id', getEmpresa);
router.post('/', createEmpresa);
router.patch('/:id', updateEmpresa);
router.delete('/:id', deleteEmpresa);

export default router;