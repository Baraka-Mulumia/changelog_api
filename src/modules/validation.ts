import Joi, { ObjectSchema } from 'joi';
import { Request, Response, NextFunction } from 'express';
import { IRequest } from '../types';
import { prismaClient } from '../utils/dbConnect';

export const ValidateSchema = (schema: ObjectSchema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (error: any) {
      return res
        .status(422)
        .json({ success: false, message: error.details[0].message });
    }
  };
};

export const Schemas = {
  product: Joi.object({
    name: Joi.string().required(),
  }),

  update: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
    version: Joi.string().optional(),
    asset: Joi.string().optional(),
    productId: Joi.string().required(),
    status: Joi.string()
      .valid('IN_PROGRESS', 'LIVE', 'DEPRECATED', 'ARCHIVED')
      .required(),
  }),

  updatePoint: Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    updateId: Joi.string().required(),
  }),
};
