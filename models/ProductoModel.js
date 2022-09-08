import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Empresas from "./EmpresaModel.js";

const {DataTypes} = Sequelize;

const Productos = db.define('producto',{
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

Empresas.hasMany(Productos, {foreignKey: 'empresaId'});
Productos.belongsTo(Empresas, {foreignKey: 'empresaId'});

export default Productos;