// Archivo para manipular la conexión a la base de datos
import { query } from "express";
import mysql from 'mysql'
import config from "../config/config";

const obtenerConexion = () => {
    // Creando la conexion a la base de datos
    const connection = mysql.createConnection({
        /* Configurando los parametros de la conexión mediante las 
           variables de entorno */
        port: +config.DB_PORT,
        database: config.DATABASE,
        user: config.DB_USER,
        password: config.DB_PASSWORD,
        host: config.DB_HOST
    });
    // Conectando a la base de datos
    connection.connect((err) => {
        // Manejando el error que manda la conexión a la base de datos
        if(err){
            throw err;
        } else {
            console.log('Conexión exitosa');
        }
    });
    // Retornando la conexión a la base de datos
    return connection;
}

// Método para ejecutar las consultas SQL
const executeQuery = (query: string): Promise<any> => {
    // Retornando una promesa para resolver o rechazar el query
    return new Promise((resolve, reject) => {
        try {
            // Conectando a la base de datos
            const connection = obtenerConexion();
            // Ejecutando el query
            connection.query(query, (error, result) => {
                if (error) {
                    // Si hay un error al ejecutar el query se rechaza la promesa
                    reject(error);
                } else {
                    // Si todo sale bien, se resuleve la promesa con el resultado del método
                    resolve(result);
                }
            });
        } catch(error) {
            reject(error);
        }
    });
}

export default executeQuery;