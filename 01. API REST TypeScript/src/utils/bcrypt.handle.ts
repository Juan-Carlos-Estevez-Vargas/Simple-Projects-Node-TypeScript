import { hash, compare } from "bcryptjs"

/**
 * Encripta una contrasela.
 * @param password contraseña a encriptar.
 * @returns contraseña encriptada.
 */
const encrypt = async (password: string) => {
  const passwordHash = await hash(password, 8);
  return passwordHash;
}

/**
 * verifica si una contraseña en texto plano coincide con una contraseña encriptada.
 * @param password contraseña en texto plano.
 * @param passwordHash contraseña encriptada.
 * @returns respuesta de la petición.
 */
const verified = async (password: string, passwordHash: string) => {
  const isCorrect = await compare(password, passwordHash);
  return isCorrect;
}

export { encrypt, verified }