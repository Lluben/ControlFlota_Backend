import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empresas from "./EmpresaModel.js";
import Clientes from "./ClienteModel.js";

const {DataTypes} = Sequelize;

const Ventas = db.define('venta',{
    CodDoc:{
        type: DataTypes.STRING(2),
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [2, 2]
        }
    },
    NroDoc:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    NroSerie:{
        type: DataTypes.STRING(4),
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [1, 4]
        }
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
    }
},{
    freezeTableName: true
});

Empresas.hasMany(Ventas, {foreignKey: 'empresaId'});
Ventas.belongsTo(Empresas, {foreignKey: 'empresaId'});
Clientes.hasMany(Ventas, {foreignKey: 'clienteId'});
Ventas.belongsTo(Clientes, {foreignKey: 'clienteId'});

export default Ventas;