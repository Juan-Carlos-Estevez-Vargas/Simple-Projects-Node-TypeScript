// Importando la librería express y el puerto
import express from 'express';
import barberoRoutes from './routes/barbero';
import config from './config/config';

// Declarando express 
const app = express();

// Usando el body de la petición como un json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Código para que el backend sea capaz de recibir peticiones de cualquier dominio
app.use((_, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Padandole express a las rutas de la tabla barbero
barberoRoutes(app);

// Middleware: Función que se ejecuta antes
// Obteniendo ruta la cual tiene su requerimiento y su respuesta
app.get('/', (req, res, next) => {
    // Enviando respuesta al frontend
    res.status(401).send('Prueba servidor');
});

// Montando el servidor con el método listen()
// El método listen recibe como argumentos el puerto y una funcion la cuál se escuchará
app.listen(config.PORT, () => {
    // Retornando la escucha de express
    return console.log(`Servidor corriendo el el puerto ${config.PORT}`);
});