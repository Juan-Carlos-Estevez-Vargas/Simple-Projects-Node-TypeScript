// Middleware encargada de manejar errores de las rutas
const errorHandler = (error, req, res, next) => {
    console.error(`${error}`);
    const message = error.message || error.sqlMessage;
    res.status(error.status || 500);
    res.json({ message: message || 'Internal Server Error' });
};

export default errorHandler;