import { Sequelize } from "sequelize";
import db from "../config/Database.js";

const {DataTypes} = Sequelize;

const Empresas = db.define('empresa',{
    empresaId:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    Ruc:{
        type: DataTypes.STRING(11),
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
    },
    Estado:{
        type: DataTypes.CHAR(1)
    }
},{
    freezeTableName: true
});

export default Empresas;