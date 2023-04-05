import { Response } from "express";
import { RequestExt } from "../interfaces/request-ext.interface";
import { Storage } from "../interfaces/storage.interface";
import { registerUpload } from "../services/storage.service";
import { handleHttp } from "../utils/error.handle";

/**
 * Obtiene un archivo a subir al servidor.
 * @param req petición.
 * @param res respuesta.
 */
const getFile = async (req: RequestExt, res: Response) => {
  try {
    const { user, file } = req;
    const dataToRegister: Storage = {
      fileName: `${file?.filename}`,
      idUser: `${user?.id}`,
      path: `${file?.path}`,
    };
    const response = await registerUpload(dataToRegister);
    res.send(response);
  } catch (e) {
    handleHttp(res, "ERROR_GET_BLOG");
  }
};

export { getFile };