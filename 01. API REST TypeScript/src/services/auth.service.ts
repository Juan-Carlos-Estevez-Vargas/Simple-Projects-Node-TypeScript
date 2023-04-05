import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UserModel from "../models/user.model"
import { encrypt, verified } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

/**
 * Registra un nuevo usuario en la aplicación.
 * @param param0 cuerpo de la petición con la data del usuario a registrar.
 * @returns data del usuario creado.
 */
const registerNewUser = async ({ email, password, name }: User) => {
  const checkIs = await UserModel.findOne({ email });
  if (checkIs) return "ALREADY_USER";

  const passwordHash = await encrypt(password);
  const registerNewUser = await UserModel.create({
    email,
    password: passwordHash,
    name
  });
  return registerNewUser;
}

/**
 * Realiza el login del usuario verificando sus credenciales de acceso.
 * @param {email, password} credenciales del usuario para el login.
 * @returns data de unicio de sesión (token JWT y usuario).
 */
const loginUser = async ({ email, password }: Auth) => {
  const checkIs = await UserModel.findOne({ email });
  if (!checkIs) return "NOT_FOUND_USER";

  const passwordHash = checkIs.password;
  const isCorrect = await verified(password, passwordHash);
  if (!isCorrect) return "PASSWORD_INCORRECT";

  const token = generateToken(checkIs.email);
  const data = {
    token,
    user: checkIs
  }
  return data;
}

export { registerNewUser, loginUser }