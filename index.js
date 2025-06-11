import express from "express";
import cors from 'cors';
import session from "express-session";
import dotenv from "dotenv";
import db from "./config/Database.js";
import SequelizeStore from "connect-session-sequelize";
import UsuarioRoute from "./routes/UsuarioRoute.js";
import ProductoRoute from "./routes/ProductoRoute.js";
import EmpresaRoute from "./routes/EmpresaRoute.js";
import ClienteRoute from "./routes/ClienteRoute.js";
import VentaRoute from "./routes/VentaRoute.js";
import DetalleVentaRoute from "./routes/DetalleVentaRoute.js";
import AuthRoute from "./routes/AuthRoute.js";

dotenv.config();

const app = express();
const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
    db: db
});

const corsOptions = {
    origin: 'http://54.160.158.246',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type',
};

app.use(cors(corsOptions));
//Activar esta funcion para crear las tablas 
//segun el modelo en la base de datos
//force: true para borrar las tablas y volver a crearlas
 /*(async()=>{
     await db.sync({force: true});
 })();*/ 
// Testing database connection 
try {
    await db.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

app.use(session({
    secret: process.env.SESS_SECRET,
    resave: true,
    saveUninitialized: true,
    store: store,
    cookie: {
        secure: 'auto'
    }
}));

//app.use(cors({
//   credentials: true,
   //origin: ["http://192.168.0.113:3000","http://localhost:3005"]
//   origin: 'http://54.160.158.246:5000'
//}));
//app.use(cors());
//para que se vea el index.html de la carpeta public
// app.use(express.static(path.join(__dirname, 'public')));
//app.use(express.static('public'));
app.use(express.json());
app.use('/api/usuarios',UsuarioRoute);
app.use('/api/productos',ProductoRoute);
app.use('/api/empresas',EmpresaRoute);
app.use('/api/clientes',ClienteRoute);
app.use('/api/ventas',VentaRoute);
app.use('/api/detalleventas',DetalleVentaRoute);
app.use('/api/auth',AuthRoute);

//Activar esta funcion para crear la tabla Sessions en la base de datos
//store.sync();


const PORT = process.env.PORT || 8080; 
app.listen(PORT, ()=> {
    console.log(`Server up and running on port ${PORT}`);
});
