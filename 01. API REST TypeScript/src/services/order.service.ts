import { Car } from "../interfaces/car.interface";
import ItemModel from "../models/item.model";

/**
 * Obtiene un listado de Items.
 * @returns items encontrados.
 */
const getOrders = async () => {
  const response = await ItemModel.find({});
  return response;
}

export { getOrders };