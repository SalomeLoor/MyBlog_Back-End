import express from 'express';
import cors from "cors";
import { PORT } from './src/Config/config.js';
import { RouterUser } from './src/Routes/users.router.js';
import { sequelize } from "./src/DB/connection.js";
import { RouterPost } from './src/Routes/post.router.js';
import morgan from 'morgan'; // Importa morgan para mostrar las peticiones en consola


const _PORT = process.env.PORT || PORT || 3000;
const app = express();
app.use(cors({
    origin: [
        'http://localhost:8100',
        'https://myblog-front-end.onrender.com'
    ],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}));
app.use(express.json());
app.use(morgan('dev')); // Middleware para mostrar las peticiones en consola

// ✅ Configuración actualizada de CORS

//app.options("*", cors());



// ✅ Rutas
app.use('/api', RouterUser);
app.use('/api', RouterPost);

// ✅ Inicializar
const main = async () => {
    try {
        await sequelize.authenticate();
        console.log('Base de datos conectada.');
        await sequelize.sync({ alter: false });
        app.listen(_PORT, () => {
            console.log(`Servidor corriendo en el puerto => ${_PORT}`);
        });
    } catch (error) {
        console.log(`Error ${error}`);
    }
};
main();