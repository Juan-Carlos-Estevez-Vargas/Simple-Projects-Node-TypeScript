//------------- CRUD BARBERO -----------------

// Importando la función para ejecutar sentencias SQL
import executeQuery from "../services/mysql.service";

// Función para obtener todos los barberos
const obtenerBarberos = async(req, res, next) => {
    /* Ejecutando el query y si se responde la promesa se imprime
       un json con la data */
    await executeQuery('SELECT * FROM barbero').then(response => {
        // Cuando se cumpla la promesa se envia esta data en forma de json
        const data = {
            message: `${response.length} datos encontrados`,
            data : response.length > 0 ? response : null
        };
        // Enviando respuesta al frontend
        res.json(data);
    }).catch(error => {
        // Si no se cumple la promesa se envía el siguiente error
        next(error);
    });
};

// Función para obtener un único barbero
const obtenerBarbero = async(req, res, next) => {
    try {
        // Guardando en una variable la respuesta de la ejecución del query SQL
        const respuesta = await executeQuery(`SELECT * FROM barbero WHERE id_barbero = ${req.params.id}`);
        // Enviando respuesta al frontend
        res.send(respuesta);
    } catch (error) {
        // Si no se cumple la promesa se envía el siguiente error
        next(error);
    }
};

// Función para agregar un barbero a la base de datos
const agregarBarbero = async (req, res, next) => {
    // Desestructurando el body que se envía desde el frontend
    const {id, dni,nombre, apellido, direccion, telefono, correo} = req.body;
    try {
        // Ejecutando el query
        const respuesta = await executeQuery(`INSERT INTO barbero (dni, nombre, apellido, direccion, telefono, correo) VALUES (${dni}, '${nombre}', '${apellido}', '${direccion}', '${telefono}', '${correo}')`);
        // Si la promesa se cumple le enviamos al frontend la siguiente información
        res.status(201).json({ message: 'created', id: respuesta.insertId});
    } catch (error){
        // Si no se cumple la promesa se envía el siguiente error
        next(error);
    }
};

// Función para actualizar un barbero
const actualizarBarbero = (req, res, next) => {
    // Desestructurando el body  y el id que se pasa por parámetro que se envía desde el frontend
    const {dni,nombre, apellido, direccion, telefono, correo} = req.body;
    const {id} = req.params;
    // Ejecutando la sentencia SQL con los parámetros de la desestructuración
    executeQuery(`UPDATE barbero SET dni = ${dni}, nombre = '${nombre}', apellido = '${apellido}', direccion = '${direccion}', telefono = '${telefono}', correo = '${correo}' WHERE id = ${id}`)
        .then(response => {
            // Si se cumple la promesa se responde el frontend la siguiente información
            res.json({ message: response.affectedRows > 0 ? 'Updated' : 'No se actualizó el registro' });
    }).catch(error => {
        // Si no se cumple la promesa se envía el siguiente error
        next(error);
    });
};

// Función para eliminar un barbero
const eliminarBarbero = (req, res, next) => {
    // Desestructurando el id proveniente del parámetro de la url
    const {id} = req.params;
    // Ejecutando la sentencia SQL para eliminar un barbero de la base de datos
    executeQuery(`DELETE FROM barbero WHERE id = ${id}`).then(response => {
            // Si se cumple la promesa se responde el frontend la siguiente información
        res.json({ message: response.affectedRows > 0 ? 'deleted' : 'No hay coincidencias' });
    }).catch(error => {
        // Si no se cumple la promesa se envía el siguiente error
        next(error);
    });
};

// Exportando los controladores (CRUD)
export { obtenerBarbero, obtenerBarberos, agregarBarbero, actualizarBarbero, eliminarBarbero };