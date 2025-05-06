// /api/auth/register.js

import { connectToDb } from '../../utils/mongo.js';
import bcrypt from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send('Method Not Allowed');

  const { name, email, password } = req.body;

  if (!name || !email || !password)
    return res.status(400).json({ error: 'All fields are required' });

  const db = await connectToDb();
  const users = db.collection('users');

  const existingUser = await users.findOne({ email });
  if (existingUser) return res.status(400).json({ error: 'User already exists' });

  const hashedPassword = await bcrypt.hash(password, 10);

  await users.insertOne({ name, email, password: hashedPassword });

  res.status(201).json({ message: 'User registered successfully' });
}
