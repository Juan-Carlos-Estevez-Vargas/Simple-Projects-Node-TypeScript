import { Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

/**
 * Limpia una ruta para hacerla más intuitiva y dinámica.
 * @param filename ruta a limpiar.
 * @returns ruta modificada.
 */
const cleanFileName = (filename: string) => {
  const file = filename.split(".").shift();
  return file;
}

/**
 * Genera una ruta dinámica.
 */
readdirSync(PATH_ROUTER).filter((filename) => {
  const cleanName = cleanFileName(filename);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
});

export { router };