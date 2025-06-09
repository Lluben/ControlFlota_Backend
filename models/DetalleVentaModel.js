import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Productos from "./ProductoModel.js";
import Ventas from "./VentaModel.js";

const {DataTypes} = Sequelize;

const DetalleVentas = db.define('detalleventa',{
    empresaId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true
    },
   CodDoc:{
        type: DataTypes.STRING(2),
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 2]
        },
        primaryKey: true
    },
    NroDoc:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        },
        primaryKey: true
    },
    NroSerie:{
        type: DataTypes.STRING(4),
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 4]
        },
        primaryKey: true
    },
    Item:{
        type: DataTypes.SMALLINT,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Precio:{
        type: DataTypes.DECIMAL(12,6),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Cantidad:{
        type: DataTypes.DECIMAL(10,3),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    SubTotal:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
    //timestamps: false
});

// Ventas.hasMany(DetalleVentas, {sourceKey: 'empresaId; CodDoc; NroDoc; NroSerie', foreignKey: 'fk_DetalleVP_Venta'});
// DetalleVentas.belongsTo(Ventas, {sourceKey: 'empresaId; CodDoc; NroDoc; NroSerie', foreignKey: 'fk_DetalleVP_Venta'});
// Ventas.hasMany(DetalleVentas, {foreignKey: 'CodDoc'});
// DetalleVentas.belongsTo(Ventas, {foreignKey: 'CodDoc'});
// Ventas.hasMany(DetalleVentas, {foreignKey: 'NroDoc'});
// DetalleVentas.belongsTo(Ventas, {foreignKey: 'NroDoc'});
// Ventas.hasMany(DetalleVentas, {foreignKey: 'NroSerie'});
// DetalleVentas.belongsTo(Ventas, {foreignKey: 'NroSerie'});

//Ventas.hasMany(DetalleVentas, {foreignKey: 'ventaId'});
//DetalleVentas.belongsTo(Ventas, {foreignKey: 'ventaId'});

//Productos.hasMany(DetalleVentas, {foreignKey: 'productoId'});
//DetalleVentas.belongsTo(Productos, {foreignKey: 'productoId'});
//Productos.hasMany(DetalleVentas, {foreignKey: 'productoId'});
//DetalleVentas.belongsTo(Productos, {foreignKey: 'productoId'});

export default DetalleVentas;