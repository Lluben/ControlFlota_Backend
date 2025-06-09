import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import DetalleVentas from "./DetalleVentaModel.js";
import Empresas from "./EmpresaModel.js";

const {DataTypes} = Sequelize;

const Productos = db.define('producto',{
    productoId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    Precio:{
        type: DataTypes.DECIMAL(12,6),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Empresas.hasMany(Productos, {foreignKey: 'empresaId'});
Productos.belongsTo(Empresas, {foreignKey: 'empresaId'});
Productos.hasMany(DetalleVentas, {foreignKey: 'productoId'});
DetalleVentas.belongsTo(Productos, {foreignKey: 'productoId'});


export default Productos;