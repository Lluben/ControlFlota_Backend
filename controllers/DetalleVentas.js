import DetalleVenta from "../models/DetalleVentaModel.js";

export const getDetalleVentas = (req, res) =>{};
export const getDetalleVenta = (req, res) =>{};
export const createDetalleVenta = async (req, res) =>{
    const {ventaId,productoId,CodDoc,NroDoc,NroSerie,Item,Precio,SubTotal,Cantidad} = req.body;
    try {
        await DetalleVenta.create({
            ventaId: ventaId,
            productoId: productoId,
            CodDoc: CodDoc,
            NroDoc: NroDoc,
            NroSerie: NroSerie,
            Item: Item,
            Precio: Precio,
            Cantidad: Cantidad,
            SubTotal: SubTotal
        });
        res.status(201).json({msg: "DetalleVenta creado con éxito !!!"});
    } catch (error) {
        res.status(400).json({msg: error.message});
    }
};
export const updateDetalleVenta = (req, res) =>{};
export const deleteDetalleVenta = (req, res) =>{};
