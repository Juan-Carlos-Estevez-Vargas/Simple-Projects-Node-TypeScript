import { Request, Response } from "express"
import { registerNewUser, loginUser } from "../services/auth.service"

/**
 * Controlador para el registro de usuarios.
 * 
 * @param request cuerpo de la petición. 
 * @param response respuesta de la petición.
 */
const registerController = async ({ body }: Request, response: Response) => {
  const responseUser = await registerNewUser(body);
  response.send(responseUser);
}

/**
 * Controlador para el inicio de sesión d elos usuarios.
 * 
 * @param param0 body o cuerpo de la petición. 
 * @param response respuesta de la petición.
 */
const loginController = async ({ body }: Request, response: Response) => {
  const { email, password } = body
  const responseUser = await loginUser({ email, password });

  if (responseUser === "PASSWORD_INCORRECT") {
    response.status(403);
    response.send(responseUser);
  } else {
    response.send(responseUser);
  }
}

export { registerController, loginController }