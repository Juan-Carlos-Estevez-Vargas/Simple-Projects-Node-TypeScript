import { Router } from "express"
import { actualizarBarbero, agregarBarbero, eliminarBarbero, obtenerBarbero, obtenerBarberos } from "../controllers/barberoController";
import errorHandler from "../middlewares/error";
import isAdmin from "../middlewares/validationAdmin";

// Función que realiza las operaciones para administrar las rutas del barbero
const barberoRoutes = (app) => {
    // Instanciando un router
    const router = Router();
    // Usando el router
    app.use('/', router);
    // Definiendo rutas para operar con los barberos (CRUD)
    router.get('/obtenerBarberos', obtenerBarberos);
    router.get('/obtenerBarbero/:id', obtenerBarbero);
    router.post('/agregarBarbero', agregarBarbero);
    router.put('/actualizarBarbero/:id', actualizarBarbero);
    router.delete('/eliminarBarbero/:id', isAdmin, eliminarBarbero);
    // Usando el middleware del manejo de errores para todas las rutas
    router.use(errorHandler);
}

// Exportando la funcion 
export default barberoRoutes;