import { Request, Response } from "express"
import { deleteCar, getCar, getCars, insertCar, updateCar } from "../services/item.service";
import { handleHttp } from "../utils/error.handle";

/**
 * Obtiene un item por su identificador (_id).
 * 
 * @param param0 parámetros de la petición donde se extrae el id.
 * @param response respuesta d ela petición.
 */
const getItem = async ({ params }: Request, response: Response) => {
  try {
    const { id } = params;
    const responseGet = await getCar(id);
    const data = responseGet ? responseGet : "NOT FOUND";
    response.send(data);
  } catch (e) {
    handleHttp(response, "ERROR_GET_ITEM");
  }
}

/**
 * Obtiene toda la data de la base de datos.
 * 
 * @param request petición.
 * @param response respuesta.
 */
const getItems = async (request: Request, response: Response) => {
  try {
    const responseGet = await getCars();
    response.send(responseGet);
  } catch (e) {
    handleHttp(response, "ERROR_GET_ITEMS");
  }
}

/**
 * Actualiza un item por su identificador (_id).
 * 
 * @param request petición. 
 * @param response respuesta.
 */
const updateItem = async (request: Request, response: Response) => {
  try {
    const responseUpdate = await updateCar(request.params.id, request.body);
    response.send(responseUpdate);
  } catch (e) {
    handleHttp(response, "ERROR_UPDATE_ITEM");
  }
}

/**
 * Guarda un item en la aplicación (base de datos).
 * @param param0 cuerpo de la petición con la data del item a insertar.
 * @param response respuesta de la petición.
 */
const postItem = async ({ body }: Request, response: Response) => {
  try {
    const responseInsert = await insertCar(body);
    response.send(responseInsert);
  } catch (e) {
    handleHttp(response, "ERROR_POST_ITEM");
  }
}

/**
 * Elimina un item de la base de datos por su identificador (_id).
 * @param param0 parámetros de la petición donde se extrae el id del usuario a eliminar.
 * @param response respuesta de la petición.
 */
const deleteItem = async ({ params }: Request, response: Response) => {
  try {
    const { id } = params
    const responseDelete = await deleteCar(id);
    response.send(responseDelete);
  } catch (e) {
    handleHttp(response, "ERROR_DELETE_ITEM");
  }
}

export { getItem, getItems, updateItem, postItem, deleteItem }