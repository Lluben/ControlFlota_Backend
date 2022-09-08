// import sequelize
import { Sequelize } from "sequelize";
 
// create connection
const db = new Sequelize('DBControlFlota', 'postgres', 'Lima2022*.', {
    host: 'control-flota1.cqxhthdj2ifw.us-east-1.rds.amazonaws.com',
    dialect: 'postgres'
});
 
// export connection
export default db;