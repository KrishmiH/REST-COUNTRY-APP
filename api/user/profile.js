// /api/user/profile.js

import { connectToDb } from '../../utils/mongo.js';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'GET') return res.status(405).send('Method Not Allowed');

  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const db = await connectToDb();
    const users = db.collection('users');

    const user = await users.findOne(
      { _id: new ObjectId(decoded.userId) },
      { projection: { password: 0 } }
    );

    if (!user) return res.status(404).json({ error: 'User not found' });

    // Ensure favorites field exists
    if (!user.favorites) {
      await users.updateOne({ _id: user._id }, { $set: { favorites: [] } });
      user.favorites = [];
    }

    res.status(200).json(user);
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}
