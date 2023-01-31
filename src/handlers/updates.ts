import { IRequest } from '../types';
import { Response } from 'express';
import { prismaClient } from '../utils/dbConnect';

// Create a new update
export const createUpdate = async (req: IRequest, res: Response) => {
  const { title, body, status, version, asset, productId } = req.body;

  try {
    const product = await prismaClient.product.findUnique({
      where: {
        id_belongsToId: {
          id: productId,
          belongsToId: req?.user?.id as string,
        },
      },
    });

    if (!product) {
      return res.status(404).json({
        message: 'Product not found',
        success: false,
      });
    }

    const newUpdate = await prismaClient.update.create({
      data: {
        title,
        body,
        status,
        version,
        asset,
        userId: product.belongsToId,
        productId: product.id,
      },
    });

    res.status(201).json({
      message: 'Update created successfully',
      success: true,
      data: newUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create update',
      success: false,
      error,
    });
  }
};

// get all updates
export const getUpdates = async (req: IRequest, res: Response) => {
  try {
    // get product id from  query
    const productId = req.query.product_id as string;
    const userId = req?.user?.id as string;

    const updates = await prismaClient.update.findMany({
      where: {
        productId,
        userId,
      },
    });

    res.status(200).json({
      message: 'Updates fetched successfully',
      success: true,
      data: updates,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch updates',
      success: false,
      error,
    });
  }
};

// get a single update
export const getUpdate = async (req: IRequest, res: Response) => {
  try {
    const productId = req.query.product_id as string,
      id = req.params.id,
      userId = req?.user?.id as string;

    const update = await prismaClient.update.findUnique({
      where: {
        id_productId_userId: {
          id,
          productId,
          userId,
        },
      },
    });

    if (!update) {
      return res.status(404).json({
        message: 'Update not found',
        success: false,
      });
    }

    res.status(200).json({
      message: 'Update fetched successfully',
      success: true,
      data: update,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch update',
      success: false,
      error,
    });
  }
};

// update a single update
export const updateUpdate = async (req: IRequest, res: Response) => {
  try {
    const productId = req.query.product_id as string,
      id = req.params.id,
      userId = req?.user?.id as string;

    const update = await prismaClient.update.findUnique({
      where: {
        id_productId_userId: {
          id,
          productId,
          userId,
        },
      },
    });

    if (!update) {
      return res.status(404).json({
        message: 'Update not found',
        success: false,
      });
    }

    const updatedUpdate = await prismaClient.update.update({
      where: {
        id: req.params.id,
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({
      message: 'Update updated successfully',
      success: true,
      data: updatedUpdate,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update update',
      success: false,
      error,
    });
  }
};

// delete a single update
export const deleteUpdate = async (req: IRequest, res: Response) => {
  try {
    const productId = req.query.product_id as string,
      id = req.params.id,
      userId = req?.user?.id as string;

    const update = await prismaClient.update.findUnique({
      where: {
        id_productId_userId: {
          id,
          productId,
          userId,
        },
      },
    });

    if (!update) {
      return res.status(404).json({
        message: 'Update not found',
        success: false,
      });
    }
    //cascade delete  all update points
    await prismaClient.updatePoint.deleteMany({
      where: {
        updateId: req.params.id,
      },
    });

    const deletedUpate = await prismaClient.update.delete({
      where: {
        id: req.params.id,
      },
    });

    res.status(200).json({
      message: 'Update deleted successfully',
      success: true,
      data: deletedUpate,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete update',
      success: false,
      error,
    });
  }
};
