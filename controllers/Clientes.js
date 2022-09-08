import Cliente from "../models/ClienteModel.js";

export const getClientes = async(req, res) =>{
    try {
        const response = await Cliente.findAll({
            attributes:['tipoDoc','nroDoc','nombre']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getCliente = async(req, res) =>{
    try {
        const cliente = await Cliente.findOne({
            attributes:['TipoDoc','NroDoc','Nombre'],
            where: {
                NroDoc: req.params.id
            }
        });
        if(!cliente) return res.status(404).json({msg: "Cliente no existe"});
        res.status(200).json(cliente);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createCliente = async(req, res) =>{
    const {TipoDoc, NroDoc, Nombre, empresaId} = req.body;
    //Primero vemos si el cliente existe
    try {
        const cliente = await Cliente.findOne({
            where: {
                NroDoc: NroDoc
            }
        });
        if(cliente) return res.status(200).json({msg: "Cliente ya existe", id: cliente.id});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
    //Si el cliente no existe, lo creamos
    try {
        const cliente = await Cliente.create({
            TipoDoc: TipoDoc,
            NroDoc: NroDoc,
            Nombre: Nombre,
            empresaId: empresaId
        });
        res.status(201).json({msg: "Cliente creado con éxito !!!", id: cliente.id});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const updateCliente = async(req, res) =>{
    const cliente = await Cliente.findOne({
        where: {
            id: req.params.id
        }
    });
    const {nombre} = req.body;
    try {
        await Cliente.update({
            nombre: nombre
        },{
            where:{
                id: cliente.id
            }
        });
        res.status(200).json({msg: "Cliente Updated"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
}

export const deleteCliente = async(req, res) =>{
    const cliente = await Cliente.findOne({
        where: {
            id: req.params.id
        }
    });
    if(!empresa) return res.status(404).json({msg: "Cliente no existe "});
    try {
        await Cliente.destroy({
            where:{
                id: cliente.id
            }
        });
        res.status(200).json({msg: "Cliente Deleted"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
} 