import Empresa from "../models/EmpresaModel.js";

export const getEmpresas = async(req, res) =>{
    try {
        const response = await Empresa.findAll({
            attributes:['nombre','ruc']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getEmpresa = async(req, res) =>{
    try {
        const response = await Empresa.findOne({
            attributes:['nombre','ruc'],
            where: {
                EmpresaId: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createEmpresa = async(req, res) =>{
    const {Nombre, Ruc, Estado} = req.body;
    try {
        await Empresa.create({
            Nombre: Nombre,
            Ruc: Ruc,
            Estado: Estado
        });
        res.status(201).json({msg: "Empresa creado con éxito !!!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateEmpresa = async(req, res) =>{
    const empresa = await Empresa.findOne({
        where: {
            ruc: req.params.ruc
        }
    });
    const {nombre} = req.body;
    try {
        await Empresa.update({
            Nombre: nombre
        },{
            where:{
                ruc: empresa.ruc
            }
        });
        res.status(200).json({msg: "Empresa Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteEmpresa = async(req, res) =>{
    const empresa = await Empresa.findOne({
        where: {
            ruc: req.params.ruc
        }
    });
    if(!empresa) return res.status(404).json({msg: "Empresa no existe "});
    try {
        await Empresa.destroy({
            where:{
                id: Empresa.ruc
            }
        });
        res.status(200).json({msg: "Empresa Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
} 