import { Schemas, ValidateSchema } from './modules/validation';
import {
  createProduct,
  deleteProduct,
  getProduct,
  getProducts,
  updateProduct,
} from './handlers/product';
import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/updates';
import {
  createUpdatePoint,
  deleteUpdatePoint,
  getUpdatePoint,
  getUpdatePoints,
  updateUpdatePoint,
} from './handlers/updatePoint';

import { Router } from 'express';

const APIRouter = Router();
/**
 * Product
 */

APIRouter.route('/product')
  .get(getProducts)
  .post(ValidateSchema(Schemas.product), createProduct);

APIRouter.route('/product/:id')
  .get(getProduct)
  .put(ValidateSchema(Schemas.product), updateProduct)
  .delete(deleteProduct);

/**
 * Update
 */
APIRouter.route('/update')
  .get(getUpdates)
  .post(ValidateSchema(Schemas.update), createUpdate);

APIRouter.route('/update/:id')
  .get(getUpdate)
  .put(ValidateSchema(Schemas.update), updateUpdate)
  .delete(deleteUpdate);

/**
 * UpdatePoint
 */

APIRouter.route('/updatepoint')
  .get(getUpdatePoints)
  .post(ValidateSchema(Schemas.updatePoint), createUpdatePoint);

APIRouter.route('/updatepoint/:id')
  .get(getUpdatePoint)
  .put(ValidateSchema(Schemas.updatePoint), updateUpdatePoint)
  .delete(deleteUpdatePoint);

export default APIRouter;
