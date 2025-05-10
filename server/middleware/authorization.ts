import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

interface User {
  id: number;
  name: string;
  email: string;
}

const JWT_SECRET: string = process.env.JWT_SECRET || ''

const authorization = (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ error: 'No token provided' });
      return;
    }

    // verify jwt token
    const user = jwt.verify(token, JWT_SECRET) as User;

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      res.status(401).json({ error: 'Invalid token' });
      return;
    }
    res.status(500).json({ error: 'Internal server error' });
  }
};

export default authorization;
