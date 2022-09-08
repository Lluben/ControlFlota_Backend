import Venta from "../models/VentaModel.js";

export const getVentas = async (req, res) =>{
    try {
        const response = await Venta.findAll({
            attributes:['empresaId','CodDoc','NroDoc','NroSerie','Total','FchEmi']
        });
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
};
export const getVenta = (req, res) =>{
    res.json({msg: "getVenta"})
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
