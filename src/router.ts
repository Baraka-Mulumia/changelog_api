import {
  getProduct,
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from './handlers/product';
import { ValidateSchema, Schemas } from './modules/validation';
import { Router, Response } from 'express';

// import { body, validationResult } from 'express-validator';
import { prismaClient } from './utils/dbConnect';

const router = Router();
/**
 * Product
 */
router.get('/product', getProducts);
router.get('/product/:id', getProduct);
router.post('/product', ValidateSchema(Schemas.product), createProduct);
router.put('/product/:id', ValidateSchema(Schemas.product), updateProduct);
router.delete('/product/:id', deleteProduct);

/**
 * Update
 */

router.get('/update', (req, res) => {});

router.get('/update/:id', (req, res) => {});

router.post('/update', (req, res) => {});

router.put('/update/:id', (req, res) => {});

router.delete('/update/:id', (req, res) => {});

/**
 * UpdatePoint
 */

router.get('/updatepoint', (req, res) => {});

router.get('/updatepoint/:id', (req, res) => {});

router.post('/updatepoint', (req, res) => {});

router.put('/updatepoint/:id', (req, res) => {});

router.delete('/updatepoint/:id', (req, res) => {});

export default router;
