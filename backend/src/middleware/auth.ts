import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const authenticate = (req: Request, res: Response, next: NextFunction) => {
	const bearerHeader = req.headers['authorization'];

	if (!bearerHeader) {
		res.status(401).json({ error: 'Unauthorized, no token provided' });
		return;
	}

	const bearerToken = bearerHeader.split(' ')[1];
	try {
		const decoded = jwt.verify(bearerToken, process.env.JWT_SECRET as string);
		req.user = decoded;
		next();
	} catch (error) {
		res.status(401).json({ error: 'Unauthorized, invalid token' });
	}
};

export default authenticate;
