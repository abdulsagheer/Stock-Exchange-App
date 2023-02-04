import { Response, NextFunction } from 'express';

const sendError = (res: Response, error: string, statusCode: number = 401) => {
	res.status(statusCode).json({ error });
};

export default sendError;
