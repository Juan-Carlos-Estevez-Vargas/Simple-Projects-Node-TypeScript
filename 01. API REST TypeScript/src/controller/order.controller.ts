import { Response } from "express"
import { RequestExt } from "../interfaces/request-ext.interface";
import { handleHttp } from "../utils/error.handle"

/**
 * Obtiene datos para un usuario.
 * 
 * @param request 
 * @param response 
 */
const getItems = async (request: RequestExt, response: Response) => {
  try {
    response.send({
      data: "ESTO SOLO LO VEN LOS USUARIOS CON SESIÓN ACTIVA O JWT VÁLIDO",
      user: request.user

    });
  } catch (e) {
    handleHttp(response, "ERROR_GET_ITEMS");
  }
}

export { getItems }