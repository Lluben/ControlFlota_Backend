import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empresas from "./EmpresaModel.js";
import Clientes from "./ClienteModel.js";

const {DataTypes} = Sequelize;

const Ventas = db.define('venta',{
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
    Total:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    FchEmi:{
        type: DataTypes.DATE,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    NroPlaca:{
        type: DataTypes.STRING(9),
        allowNull: true,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});
//Ventas.removeAttribute('id');

Empresas.hasMany(Ventas, {foreignKey: 'empresaId'});
//Ventas.belongsTo(Empresas, {foreignKey: 'empresaId'});
Clientes.hasMany(Ventas, {foreignKey: 'clienteId'});
Ventas.belongsTo(Clientes, {foreignKey: 'clienteId'});

export default Ventas;