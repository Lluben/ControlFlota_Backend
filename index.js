import express from "express";
import cors from 'cors';
import dotenv from "dotenv";
import db from "./config/Database.js";
import UsuarioRoute from "./routes/UsuarioRoute.js";
import ProductoRoute from "./routes/ProductoRoute.js";
import EmpresaRoute from "./routes/EmpresaRoute.js";
import ClienteRoute from "./routes/ClienteRoute.js";
import VentaRoute from "./routes/VentaRoute.js";
import DetalleVentaRoute from "./routes/DetalleVentaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
//Activar esta funcion para crear las tablas 
//segun el modelo en la base de datos
/* (async()=>{
     await db.sync({force: false});
 })();*/
// Testing database connection 
/*try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}*/
app.use(cors());
app.use(express.json());
app.use('/api/usuarios',UsuarioRoute);
app.use('/api/productos',ProductoRoute);
app.use('/api/empresas',EmpresaRoute);
app.use('/api/clientes',ClienteRoute);
app.use('/api/ventas',VentaRoute);
app.use('/api/detalleventas',DetalleVentaRoute);
app.use('/api/auth',AuthRoute);

const PORT = process.env.PORT || 3000; 
app.listen(PORT, ()=> {
    console.log(`Server up and running on port ${PORT}`);
});