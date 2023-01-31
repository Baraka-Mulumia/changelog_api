import { IRequest } from '../types';
import { Response } from 'express';
import { prismaClient } from '../utils/dbConnect';

//Create a new updatePoint
export const createUpdatePoint = async (req: IRequest, res: Response) => {
  const { name, description, updateId } = req.body;

  try {
    const updatePoint = await prismaClient.updatePoint.create({
      data: {
        name,
        description,
        update: {
          connect: {
            id: updateId,
          },
        },
      },
    });

    res.status(201).json({
      success: true,
      message: 'UpdatePoint created successfully',
      data: updatePoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating updatePoint',
      error,
    });
  }
};

//Get all updatePoints
export const getUpdatePoints = async (req: IRequest, res: Response) => {
  try {
    const updateId = req.query.updateId as string;

    const updatePoints = await prismaClient.updatePoint.findMany({
      where: {
        updateId,
      },

      include: {
        update: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'UpdatePoints fetched successfully',
      data: updatePoints,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching updatePoints',
      error,
    });
  }
};

//Get a single updatePoint
export const getUpdatePoint = async (req: IRequest, res: Response) => {
  try {
    const updateId = req.query.updateId as string;
    const id = req.query.id as string;

    const updatePoint = await prismaClient.updatePoint.findUnique({
      where: {
        id_updateId: {
          id,
          updateId,
        },
      },
      include: {
        update: true,
      },
    });

    res.status(200).json({
      success: true,
      message: 'UpdatePoint fetched successfully',
      data: updatePoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching updatePoint',
      error,
    });
  }
};

//Update a single updatePoint
export const updateUpdatePoint = async (req: IRequest, res: Response) => {
  try {
    const updateId = req.query.updateId as string;
    const id = req.query.id as string;

    const updatePoint = await prismaClient.updatePoint.update({
      where: {
        id_updateId: {
          id,
          updateId,
        },
      },
      data: {
        ...req.body,
      },
    });

    res.status(200).json({
      success: true,
      message: 'UpdatePoint updated successfully',
      data: updatePoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating updatePoint',
      error,
    });
  }
};

//Delete a single updatePoint
export const deleteUpdatePoint = async (req: IRequest, res: Response) => {
  try {
    const updateId = req.query.updateId as string;
    const id = req.query.id as string;

    const updatePoint = await prismaClient.updatePoint.delete({
      where: {
        id_updateId: {
          id,
          updateId,
        },
      },
    });

    res.status(200).json({
      success: true,
      message: 'UpdatePoint deleted successfully',
      data: updatePoint,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting updatePoint',
      error,
    });
  }
};
