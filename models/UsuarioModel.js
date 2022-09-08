import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empresas from "./EmpresaModel.js";

const {DataTypes} = Sequelize;

const Usuarios = db.define('usuario',{
    Nombre:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    Email:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    Password:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    Role:{
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    },
    empresaId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Empresas.hasMany(Usuarios, {foreignKey: 'empresaId'});
Usuarios.belongsTo(Empresas, {foreignKey: 'empresaId'});

export default Usuarios;