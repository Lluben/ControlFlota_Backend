import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empresas from "./EmpresaModel.js";

const {DataTypes} = Sequelize;

const Clientes = db.define('cliente',{
    TipoDoc:{
        type: DataTypes.CHAR(1),
        allowNull: false,
    },
    NroDoc:{
        type: DataTypes.STRING(25),
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            len: [8, 11]
        }
    },
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
        }
    }
},{
    freezeTableName: true
});

Empresas.hasMany(Clientes, {foreignKey: 'empresaId'});
Clientes.belongsTo(Empresas, {foreignKey: 'empresaId'});

export default Clientes;