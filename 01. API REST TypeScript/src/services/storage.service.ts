import { Storage } from "../interfaces/storage.interface";
import StorageModel from "../models/storage.model";

/**
 * Registra un nuevo archivo en la aplicación.
 * @param param0 data del archivo a registrar { filename, idUser, path }
 * @returns respuesta de la petición.
 */
const registerUpload = async ({ fileName, idUser, path }: Storage) => {
  const responseItem = await StorageModel.create({ fileName, idUser, path });
  return responseItem;
};

export { registerUpload };