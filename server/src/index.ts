import express, { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import { pool } from '../db';
import { QueryResult } from 'pg';
import authorization from '../middleware/authorization';

interface User {
  id: number;
  name: string;
  email: string;
}

// add User object as property of Request object
declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

const PORT = 3000;
const app = express();

dotenv.config(); // Load environment variables from .env file
const JWT_SECRET = process.env.JWT_SECRET || 'my-secret-key';

// CORS configuration
app.use(
  cors({
    origin: 'http://localhost:5173', // Vite's default port
    credentials: true, // Required for cookies
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

app.use(express.json());
app.use(cookieParser());

app.get('/', (req: Request, res: Response) => {
  res.send('Hello world');
});

app.post('/auth/signup', async (req: Request, res: Response) => {
  try {
    const { name, email, password, confirmPassword } = req.body;

    // Validate input
    if (!name || !email || !password || !confirmPassword) {
      res.status(400).json({ error: 'All fields are required' });
      return;
    }

    if (password !== confirmPassword) {
      res.status(400).json({ error: 'Passwords do not match' });
      return;
    }

    // throw error if email already taken
    const emailQueryResult: QueryResult = await pool.query(
      'SELECT email FROM users WHERE email = $1',
      [email]
    );
    if (emailQueryResult.rowCount != 0) {
      res.status(409).json({ error: 'Email already taken' });
      return;
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // insert user into db
    const insertResult: QueryResult = await pool.query(
      'INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING id',
      [name, email, hashedPassword]
    );

    const { id } = insertResult.rows[0];

    // Create user object from database result
    const user: User = {
      id,
      name,
      email,
    };

    // Generate JWT
    const token = jwt.sign({ id: user.id, name: user.name, email: user.email }, JWT_SECRET, {
      expiresIn: '24h',
    });

    // Set JWT as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // Send success response
    res.status(201).json({
      message: 'User created successfully',
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/auth/login', async (req: Request, res: Response) => {
  try {
    // destructure request body to get email and password
    const { email, password } = req.body;

    // validate input
    if (!email || !password) {
      res.status(400).json({ error: 'Email and password are required' });
      return;
    }

    // query db
    const result: QueryResult = await pool.query(
      'SELECT id, name, email, password_hash FROM users WHERE email = $1',
      [email]
    );

    // if no match, return 401 error
    if (result.rowCount === 0) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // create user object from db result
    const dbUser = result.rows[0];

    // verify password
    const isValidPassword = await bcrypt.compare(password, dbUser.password_hash);
    if (!isValidPassword) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    }

    // generate JWT token
    const user: User = {
      id: dbUser.id,
      name: dbUser.name,
      email: dbUser.email,
    };
    const token = jwt.sign(user, JWT_SECRET, {
      expiresIn: '24h',
    });

    // set JWT as HTTP-only cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    });

    // return success response
    res.status(200).json({
      message: 'Login successful',
      user,
    });
    return;
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/auth/me', authorization, async (req: Request, res: Response) => {
  try {
    const user = req.user as User;
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/auth/logout', (req: Request, res: Response) => {
  try {
    res.clearCookie('token', {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
    });
    res.status(200).json({ message: 'Log out successful' });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/habit', authorization, async (req: Request, res: Response) => {
  interface CreateHabitRequest {
    description: string;
    origin: string;
    destination: string;
    totalDistance: number;
  }

  const { description, origin, destination, totalDistance }: CreateHabitRequest = req.body;

  const user = req.user as User;
  const userId: number = user.id;

  try {
    const query = `
      INSERT INTO habits (user_id, description, origin, destination, total_distance) 
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id
    `;

    const result = await pool.query(query, [
      userId,
      description,
      origin,
      destination,
      totalDistance,
    ]);

    const insertedHabit: { id: number } = result.rows[0];
    const habitId: number = insertedHabit.id;

    res.status(200).json({ message: 'Habit added successfully', habitId });
  } catch (error) {
    console.log(error);
    if (error instanceof Error) {
      res.status(500).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Internal server error' });
    }
  }
});

app.get('/habit/:id', authorization, async (req, res) => {
  const habitId: number = Number(req.params.id);
  const user = req.user as User;
  try {
    const query = `SELECT * FROM habits WHERE id = $1`;
    const result = await pool.query(query, [habitId]);

    if (result.rowCount === 0) {
      res.status(404).json({ message: 'Not found' });
      return;
    }

    const habit = result.rows[0];
    if (user.id != habit.user_id) {
      res.status(401).json({ message: 'You are not authorized to view this' });
      return;
    }

    res.status(200).json(habit);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/habits', authorization, async (req, res) => {
  const userId = req.user?.id;
  try {
    const query = `SELECT id, description FROM habits WHERE user_id = $1`;
    const result = await pool.query(query, [userId]);
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
