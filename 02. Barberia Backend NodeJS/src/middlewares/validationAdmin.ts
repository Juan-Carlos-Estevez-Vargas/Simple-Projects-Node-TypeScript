// Middleware para saber si el usuario es administrador
const isAdmin = (req, res, next) => {
    if (req.headers.isadmin) {
        // En caso de ser administrador se pasa al siguiente proceso con next();
        next();
    } else {
        res.status(401).json({ message: 'No tiene autorización' });
    }
};

export default isAdmin;