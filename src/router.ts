import {
  createUpdate,
  deleteUpdate,
  getUpdate,
  getUpdates,
  updateUpdate,
} from './handlers/updates';
import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './handlers/product';
import { ValidateSchema, Schemas } from './modules/validation';
import { Router, Response } from 'express';

const router = Router();
/**
 * Product
 */

router
  .route('/product')
  .get(getProducts)
  .post(ValidateSchema(Schemas.product), createProduct);

router
  .route('/product/:id')
  .get(getProduct)
  .put(ValidateSchema(Schemas.product), updateProduct)
  .delete(deleteProduct);

/**
 * Update
 */
router
  .route('/update')
  .get(getUpdates)
  .post(ValidateSchema(Schemas.update), createUpdate);

router
  .route('/update/:id')
  .get(getUpdate)
  .put(ValidateSchema(Schemas.update), updateUpdate)
  .delete(deleteUpdate);

/**
 * UpdatePoint
 */

router.get('/updatepoint', (req, res) => {});

router.get('/updatepoint/:id', (req, res) => {});

router.post('/updatepoint', (req, res) => {});

router.put('/updatepoint/:id', (req, res) => {});

router.delete('/updatepoint/:id', (req, res) => {});

export default router;
