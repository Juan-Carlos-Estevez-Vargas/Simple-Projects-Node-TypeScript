import { sign, verify } from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "token.123123";

/**
 * Genera un nuevo Token JWT.
 * @param id identificador por el cual se genera el token JWT.
 * @returns token JWT generado.
 */
const generateToken = (id: string) => {
  const jwt = sign({ id }, JWT_SECRET, { expiresIn: "2h" });
  return jwt;
}

/**
 * Veerifica si un token JWT es válido.
 * @param jwt token a verificar.
 * @returns respuesta de la petición.
 */
const verifyToken = (jwt: string) => {
  const isOk = verify(jwt, JWT_SECRET);
  return isOk;
}

export { generateToken, verifyToken }