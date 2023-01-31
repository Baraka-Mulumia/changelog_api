import { IRequest } from '../types';
import { Response } from 'express';
import { prismaClient } from '../utils/dbConnect';

//Get all products
export const getProducts = async (req: IRequest, res: Response) => {
  try {
    const userProducts = await prismaClient.user.findUnique({
      where: {
        id: req?.user?.id,
      },
      select: {
        products: {
          include: {
            updates: true,
          },
        },
        username: true,
        id: true,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Success', data: userProducts });
  } catch (error) {
    return res

      .status(500)
      .json({ success: false, message: 'Failed to get products', error });
  }
};

// Get a single product
export const getProduct = async (req: IRequest, res: Response) => {
  try {
    const product = await prismaClient.product.findFirst({
      where: {
        id: req.params.id,
        belongsToId: req?.user?.id,
      },
    });

    if (!product) {
      return res
        .status(404)
        .json({ success: false, message: 'Product not found' });
    }

    return res
      .status(200)
      .json({ success: true, message: 'Success', data: product });
  } catch (error) {
    return res
      .status(500)
      .json({ success: false, message: 'Failed to get product', error });
  }
};

// Create a product
export const createProduct = async (req: IRequest, res: Response) => {
  const userId = req?.user?.id || '1';

  try {
    const product = await prismaClient.product.create({
      data: {
        name: req.body.name,
        belongsTo: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Created', data: product });
  } catch (error) {
    return res
      .status(422)
      .json({ success: false, message: 'Failed to create product', error });
  }
};

// Update a product
export const updateProduct = async (req: IRequest, res: Response) => {
  try {
    const product = await prismaClient.product.update({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req?.user?.id || '1',
        },
      },
      data: {
        name: req.body.name,
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Updated', data: product });
  } catch (error) {
    return res
      .status(422)
      .json({ success: false, message: 'Failed to update product', error });
  }
};

// Delete a product
export const deleteProduct = async (req: IRequest, res: Response) => {
  try {
    // cascade delete all updates
    await prismaClient.update.deleteMany({
      where: {
        productId: req.params.id,
      },
    });

    const product = await prismaClient.product.delete({
      where: {
        id_belongsToId: {
          id: req.params.id,
          belongsToId: req?.user?.id || '1',
        },
      },
    });

    return res
      .status(200)
      .json({ success: true, message: 'Deleted', data: product });
  } catch (error) {
    return res
      .status(422)
      .json({ success: false, message: 'Failed to delete product', error });
  }
};
