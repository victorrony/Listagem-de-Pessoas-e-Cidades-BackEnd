/**
 * This file contains the controller for creating a new city.
 *
 * The validation middleware checks that the request body contains
 * a valid city object with a name that is between 3 and 150
 * characters long.
 *
 * The create function creates a new city in the database using
 * the CidadesProviders class. If the creation fails, it returns a
 * 500 status code with an error message. If the creation succeeds,
 * it returns a 201 status code with the newly created city object.
 *
 * The create function is exported so that it can be used in the
 * routes file.
 */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import * as yup from "yup";
import { validation } from "../../shared/middlewares/Validation";
import { ICidade } from "../../database/models";
import { CidadesProviders } from "../../database/providers/cidades";

/**
 * The IBodyProps interface represents the shape of the request body
 * for the create city endpoint. It extends the ICidade interface,
 * but excludes the id property since the id is automatically
 * generated by the database.
 */
interface IBodyProps extends Omit<ICidade, "id"> {}

/**
 * The createValidation middleware checks that the request body
 * contains a valid city object with a name that is between 3 and
 * 150 characters long.
 */
export const createValidation = validation((getSchema) => ({
  body: getSchema<IBodyProps>(
    yup.object().shape({
      /**
       * The name of the city must be a string that is between 3 and
       * 150 characters long.
       */
      nome: yup.string().required().min(3).max(150),
    })
  ),
}));

/**
 * The create function creates a new city in the database using
 * the CidadesProviders class. If the creation fails, it returns a
 * 500 status code with an error message. If the creation succeeds,
 * it returns a 201 status code with the newly created city object.
 */
export const create = async (req: Request<{}, {}, IBodyProps>, res: Response) => {
  /**
   * Try to create a new city in the database using the request
   * body.
   */
  const result = await CidadesProviders.create(req.body);

  /**
   * If the creation fails, return a 500 status code with an error
   * message.
   */
  if (result instanceof Error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      errors: {
        default: result.message,
      },
    });
  }

  /**
   * If the creation succeeds, return a 201 status code with the
   * newly created city object.
   */
  return res.status(StatusCodes.CREATED).json(result);
};

