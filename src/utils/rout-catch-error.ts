import { Response } from 'express';

export interface DefaultRespons {
  status: number;
  message: string;
  data?: {};
}

export const catchError = async (res: Response, fn: () => DefaultRespons | Promise<DefaultRespons>) => {
  const fnName = fn.name || (this as any)?.name || 'unknown';
  try {
    const response = await fn();
    res.json(response);
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: error + '',
      data: null,
    } as DefaultRespons);
    console.error(`Error [${fnName}]: ${error}`);
  }
};
