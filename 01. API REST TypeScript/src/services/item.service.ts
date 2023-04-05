import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/item.model";

/**
 * Inserta un nuevo vehículo en el sistema.
 * @param item data del vehículo a insertar.
 * @returns data del vehículo insertado.
 */
const insertCar = async (item: Car) => {
  const responseIns = await ItemModel.create(item);
  return responseIns;
}

/**
 * Obtiene un listado con todos los vehículos registrados en el sistema.
 * @returns listado de vehículos traido de la base de datos.
 */
const getCars = async () => {
  const response = await ItemModel.find({});
  return response;
}

/**
 * Obtiene un vehículo en específico.
 * @param id del vehículo a obtener.
 * @returns vehículo obtenido.
 */
const getCar = async (id: string) => {
  const response = await ItemModel.findOne({ _id: id });
  return response;
}

/**
 * Actualiza un vehículo en específico.
 * @param id del vehículo a actualizar.
 * @param data datos del vehículo a actualizar.
 * @returns data del vehículo actualizado.
 */
const updateCar = async (id: string, data: Car) => {
  const response = await ItemModel.findOneAndUpdate({ _id: id }, data, { new: true });
  return response;
}

/**
 * Elimina un vehículo del sistema.
 * @param id identificador del vehículo a eliminar.
 * @returns data del vehículo eliminado.
 */
const deleteCar = async (id: string) => {
  const response = await ItemModel.findOneAndDelete({ _id: id });
  return response;
}

export { insertCar, getCars, getCar, updateCar, deleteCar };