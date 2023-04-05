import { NextFunction, Response } from "express";
import { RequestExt } from "../interfaces/request-ext.interface";
import { verifyToken } from "../utils/jwt.handle";

/**
 * Verifica el token JWT del usuario, si es válido o inválido.
 * @param req 
 * @param res 
 * @param next 
 */
const checkJwt = (req: RequestExt, res: Response, next: NextFunction) => {
  try {
    const jwtByUser = req.headers.authorization || "";
    const jwt = jwtByUser.split(" ").pop(); // 11111
    const isUser = verifyToken(`${jwt}`) as { id: string };
    if (!isUser) {
      res.status(401);
      res.send("NO_TIENES_UN_JWT_VALIDO");
    } else {
      req.user = isUser;
      next();
    }
  } catch (e) {
    console.log({ e });
    res.status(400);
    res.send("SESSION_NO_VALIDAD");
  }
};

export { checkJwt };