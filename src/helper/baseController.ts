import { Request, Response } from 'express';

abstract class BaseController<T> {
  protected abstract model: T;

  protected async handleRequest(
    operation: () => Promise<any>,
    successMessage: string,
    errorMessage: string,
    res: Response
  ) {
    try {
      const result = await operation();
      console.log(successMessage);
      res.status(200).json(result);
    } catch (error) {
      console.error(errorMessage, error);
      res.status(500).json({ error: errorMessage });
    }
  }

  
}

export default BaseController;
