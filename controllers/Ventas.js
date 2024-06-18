import Venta from "../models/VentaModel.js";
import { Op } from "sequelize";

export const getVentas = async (req, res) => {
    try {
       
        const response = await Venta.findAll({
            attributes:['empresaId','CodDoc','NroDoc','NroSerie','Total','FchEmi']
        });
        
        
        res.status(200).json(response);

    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};
export const getVenta = async(req, res) =>{
    try {
       
        const { fecha } = req.params;
       
        const initialDate = new Date(fecha);

      
        initialDate.setFullYear(2022, 8, 20); 
        initialDate.setHours(5, 0, 0, 0);

        const formattedDate = initialDate.toISOString();

        console.log({formattedDate});
        const response = await Venta.findAll({
            attributes: ['empresaId', 'CodDoc', 'NroDoc', 'NroSerie', 'Total', 'FchEmi'],
            where: {
                FchEmi: {
                    [Op.eq]: formattedDate
                }
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.status(500).json({ msg: error.message });
    }
};
export const createVenta = async (req, res) =>{
    const {empresaId,clienteId,CodDoc,NroDoc,NroSerie,Total,FchEmi} = req.body;
    try {
        const venta = await Venta.create({
            empresaId: empresaId,
            clienteId: clienteId,
            CodDoc: CodDoc,
            NroDoc: NroDoc,
            NroSerie: NroSerie,
            Total: Total,
            FchEmi: FchEmi
        });
        res.status(201).json({msg: "Venta creado con éxito !!!", idVenta: venta.id});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};
export const updateVenta = (req, res) =>{
    res.json({msg: "updateVenta"})
};
export const deleteVenta = (req, res) =>{
    res.json({msg: "borrar venta"})
};
