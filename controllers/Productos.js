import Producto from "../models/ProductoModel.js";
import Usuario from "../models/UsuarioModel.js";
import Empresa from "../models/EmpresaModel.js";
import {Op} from "sequelize";

export const getProductos = async (req, res) =>{
    try {
        let response;
        if(req.Role === "admin"){
            console.log("Llegaste admin");
            response = await Producto.findAll({
                attributes:['productoId','Nombre','Precio'],
                include:[{
                    model: Empresa,
                    attributes:['Nombre','Ruc']
                }]
            });
        }else{
            console.log("Llegaste otros");
            response = await Producto.findAll({
                attributes:['productoId','Nombre','Precio'],
                where:{
                    empresaId: req.body.empresaId
                },
                include:[{
                    model: Empresa,
                    attributes:['Nombre','Ruc']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getProducto = async(req, res) =>{
    try {
        const producto = await Producto.findOne({
            where:{
                productoId: req.params.id
            }
        });
        if(!producto) return res.status(404).json({msg: "Datos no encontrados"});
        let response;
        if(req.role === "admin"){
            console.log("Llegaste admin");
            response = await Producto.findOne({
                attributes:['productoId','nombre','precio'],
                where:{
                    productoId: producto.productoId
                },
                include:[{
                    model: Usuario,
                    attributes:['nombre','email']
                }]
            });
        }else{
            console.log("Llegaste aquí");
            response = await Producto.findOne({
                attributes:['productoId','nombre','precio'],
                where:{
                    [Op.and]:[{productoId: producto.productoId}, {usuarioId: req.usuarioId}]
                },
                include:[{
                    model: Usuario,
                    attributes:['nombre','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        console.log("Llegaste con error");
        res.status(500).json({msg: error.message});
    }
}

export const createProducto = async(req, res) =>{
    const {Nombre, Precio, empresaId} = req.body;
    try {
        await Producto.create({
            Nombre: Nombre,
            Precio: Precio,
            empresaId: empresaId
        });
        res.status(201).json({msg: "Product Created Successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateProducto = async(req, res) =>{
    try {
        const producto = await Producto.findOne({
            where:{
                id: req.params.id
            }
        });
        if(!producto) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {nombre, precio} = req.body;
        if(req.role === "admin"){
            await Producto.update({nombre, precio},{
                where:{
                    id: producto.id
                }
            });
        }
        res.status(200).json({msg: "Product updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deleteProducto = async(req, res) =>{
    try {
        const producto = await Producto.findOne({
            where:{
                productoId: req.params.productoId
            }
        });
        if(!producto) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {nombre, precio} = req.body;
        if(req.role === "admin"){
            await Producto.destroy({
                where:{
                    productoId: producto.productoId
                }
            });
        }
        res.status(200).json({msg: "Product deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}